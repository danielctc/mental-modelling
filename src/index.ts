/**
 * Mental Modelling — sixty thinking tools, a router, and a step that applies
 * the chosen model to the problem you actually described.
 *
 * Deploys as a single Cloudflare Worker with no database and no state. The
 * model key belongs to whoever is using the page: it lives in their browser,
 * rides one request, and is never stored, logged or persisted here.
 */
import { BY_ID, MODELS } from "./models.gen";
import { browse, guide, modelPage, notFound, settings } from "./views";
import { runGuide, type Turn } from "./guide";
import { runReport } from "./report";
import { credentialsFrom } from "./llm";
import { BASE } from "./ui";

export interface Env {
  /** Optional server-side key for a private instance. Unset = readers bring their own. */
  LLM_API_KEY?: string;
  LLM_PROVIDER?: string;
  LLM_MODEL?: string;
  LLM_BASE_URL?: string;
}

const json = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), {
    status,
    headers: { "content-type": "application/json;charset=utf-8", "cache-control": "no-store" },
  });

const bad = (msg: string, status = 400) => json({ error: msg }, status);

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    let path = url.pathname;
    if (path.startsWith(BASE)) path = path.slice(BASE.length) || "/";
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

    const creds = credentialsFrom(req, env as unknown as Record<string, unknown>);

    if (path === "/api/guide") {
      if (req.method !== "POST") return bad("method not allowed", 405);
      let history: Turn[] = [];
      try {
        const b = (await req.json()) as { history?: Turn[] } | null;
        if (!b || typeof b !== "object") return bad("Bad request.");
        history = (b.history ?? [])
          .filter(
            (t) =>
              t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string",
          )
          .map((t) => ({ role: t.role, content: t.content.slice(0, 4000) }))
          .slice(-8);
      } catch {
        return bad("Bad request.");
      }
      if (!history.length) return bad("Tell me what's on your mind first.");
      return runGuide(history, creds);
    }

    if (path === "/api/report") {
      if (req.method !== "POST") return bad("method not allowed", 405);
      let body: { history?: Turn[]; modelId?: string } | null;
      try {
        body = (await req.json()) as typeof body;
      } catch {
        return bad("Bad request.");
      }
      // JSON.parse("null") succeeds, so the guard above is not enough.
      if (!body || typeof body !== "object") return bad("Bad request.");
      const m = BY_ID.get(String(body.modelId ?? ""));
      if (!m) return bad("Unknown model.");
      const history = (body.history ?? [])
        .filter((t) => t && t.role === "user" && typeof t.content === "string")
        .map((t) => ({ role: "user" as const, content: t.content.slice(0, 6000) }))
        .slice(-6);
      if (!history.length) return bad("Tell me the situation first.");
      return runReport(m, history, creds);
    }

    /** Does this deployment carry its own key? The page uses this to decide
     *  whether to nag for one. Never returns the key itself. */
    if (path === "/api/config") {
      return json({ serverKey: Boolean(env.LLM_API_KEY) });
    }

    if (path === "/api/models") {
      const list = MODELS.map(({ id, title, category, blurb, question, trigger }) => ({
        id,
        title,
        category,
        blurb,
        question,
        trigger,
        href: `${BASE}/m/${id}`,
      }));
      return new Response(JSON.stringify({ count: list.length, models: list }, null, 1), {
        headers: {
          "content-type": "application/json;charset=utf-8",
          "access-control-allow-origin": "*",
        },
      });
    }

    if (path === "/settings") return settings();
    if (path === "/guide") return guide();
    if (path === "/") return browse();

    const hit = path.match(/^\/m\/([a-z0-9-]+)$/);
    if (hit) {
      const m = BY_ID.get(hit[1]);
      return m ? modelPage(m) : notFound();
    }

    return notFound();
  },
};

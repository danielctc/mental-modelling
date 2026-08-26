/**
 * Bring-your-own-key LLM client.
 *
 * The key is supplied by the person using the page, held in their browser, and
 * forwarded on each request. This worker never stores it, never logs it, and
 * never writes it anywhere — it is read off the request, used once, and
 * discarded when the request ends.
 *
 * Two providers, because between them they cover most people: Anthropic direct,
 * and any OpenAI-compatible endpoint (OpenRouter, Groq, Together, a local
 * llama.cpp server) via the compatible path.
 */
export type Provider = "anthropic" | "openai-compatible";

export type Credentials = {
  provider: Provider;
  apiKey: string;
  /** Model id. Falls back to the provider default. */
  model?: string;
  /** OpenAI-compatible only. Defaults to OpenRouter. */
  baseUrl?: string;
};

export const DEFAULTS: Record<Provider, { model: string; baseUrl: string }> = {
  anthropic: { model: "claude-haiku-4-5-20251001", baseUrl: "https://api.anthropic.com" },
  "openai-compatible": { model: "z-ai/glm-5.3-flash", baseUrl: "https://openrouter.ai/api" },
};

/** A stronger default for the report, which is the deliverable rather than a lookup. */
export const REPORT_MODEL: Record<Provider, string> = {
  anthropic: "claude-sonnet-4-6",
  "openai-compatible": "z-ai/glm-5.3-flash",
};

export type LlmResult =
  | { ok: true; text: string }
  | { ok: false; reason: "no-key" | "auth" | "network" | "upstream"; detail?: string };

/** Read credentials off the request. Header first (the page), then env (self-hosted). */
export function credentialsFrom(req: Request, env: Record<string, unknown>): Credentials | null {
  const headerKey = req.headers.get("x-llm-key");
  if (headerKey) {
    const provider = (req.headers.get("x-llm-provider") as Provider) || "anthropic";
    return {
      provider: provider === "openai-compatible" ? provider : "anthropic",
      apiKey: headerKey,
      model: req.headers.get("x-llm-model") || undefined,
      baseUrl: req.headers.get("x-llm-base-url") || undefined,
    };
  }
  const envKey = typeof env.LLM_API_KEY === "string" ? env.LLM_API_KEY : "";
  if (!envKey) return null;
  const p = env.LLM_PROVIDER === "openai-compatible" ? "openai-compatible" : "anthropic";
  return {
    provider: p,
    apiKey: envKey,
    model: typeof env.LLM_MODEL === "string" ? env.LLM_MODEL : undefined,
    baseUrl: typeof env.LLM_BASE_URL === "string" ? env.LLM_BASE_URL : undefined,
  };
}

export async function callLlm(
  creds: Credentials | null,
  opts: {
    system: string;
    user: string;
    maxTokens: number;
    temperature?: number;
    /** Override the model — the report asks for a stronger one than the router. */
    model?: string;
    /** Anthropic only. Marks the system block cacheable when it is large and static. */
    cacheSystem?: boolean;
  },
): Promise<LlmResult> {
  if (!creds?.apiKey) return { ok: false, reason: "no-key" };

  const model = opts.model || creds.model || DEFAULTS[creds.provider].model;
  const base = (creds.baseUrl || DEFAULTS[creds.provider].baseUrl).replace(/\/$/, "");

  const [url, headers, body] =
    creds.provider === "anthropic"
      ? [
          `${base}/v1/messages`,
          {
            "x-api-key": creds.apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          {
            model,
            max_tokens: opts.maxTokens,
            temperature: opts.temperature ?? 0.3,
            system: opts.cacheSystem
              ? [{ type: "text", text: opts.system, cache_control: { type: "ephemeral" } }]
              : opts.system,
            messages: [{ role: "user", content: opts.user }],
          },
        ]
      : [
          `${base}/v1/chat/completions`,
          { authorization: `Bearer ${creds.apiKey}`, "content-type": "application/json" },
          {
            model,
            max_tokens: opts.maxTokens,
            temperature: opts.temperature ?? 0.3,
            messages: [
              { role: "system", content: opts.system },
              { role: "user", content: opts.user },
            ],
          },
        ];

  let res: Response;
  try {
    res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  } catch {
    return { ok: false, reason: "network" };
  }

  if (res.status === 401 || res.status === 403) return { ok: false, reason: "auth" };
  if (!res.ok) return { ok: false, reason: "upstream", detail: String(res.status) };

  const data = (await res.json()) as any;
  const text =
    creds.provider === "anthropic"
      ? (data.content ?? [])
          .filter((c: any) => c.type === "text")
          .map((c: any) => c.text ?? "")
          .join("")
      : (data.choices?.[0]?.message?.content ?? "");

  return { ok: true, text: String(text ?? "") };
}

/**
 * Long replies can hit the token ceiling and end mid-string, which JSON.parse
 * rejects outright. Rather than bin a reply that is 90% complete, walk back to
 * the last position that closes cleanly and shut the structure by hand.
 */
export function parseLoose(raw: string): any | null {
  try {
    return JSON.parse(raw);
  } catch {
    /* fall through to salvage */
  }
  const open = raw.indexOf("[", raw.indexOf('"sections"'));
  if (open < 0) return null;
  for (let i = raw.lastIndexOf("}"); i > open; i--) {
    if (raw[i] !== "}") continue;
    try {
      const o = JSON.parse(raw.slice(0, i + 1) + "]}");
      if (Array.isArray(o.sections) && o.sections.length) return o;
    } catch {
      /* keep walking back */
    }
  }
  return null;
}

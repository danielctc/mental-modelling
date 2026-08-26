/**
 * "Help me think" — routes a plain-English description of a stuck situation to
 * the right thinking tools.
 *
 * Deliberately NOT decision-shaped. People arrive with "this keeps happening",
 * "I have to tell someone something awkward", "I don't understand this system"
 * far more often than with "should I do A or B", and a decision-first funnel
 * sends all of those to the wrong shelf.
 *
 * The LLM picks from a fixed catalogue and may only return ids that exist; a
 * deterministic keyword fallback covers an outage or a malformed reply, so the
 * tool never dead-ends.
 */
import { MODELS, BY_ID } from "./models.gen";
import { BASE, CATEGORY_COLOUR } from "./ui";
import { callLlm, type Credentials } from "./llm";

export type Turn = { role: "user" | "assistant"; content: string };

const CATALOGUE = MODELS.map(
  (m) => `${m.id} | ${m.title} | ${m.category} | ${m.blurb} | asks: ${m.question}`,
).join("\n");

const SYSTEM = `You are the guide for an internal library of 60 thinking tools. Someone has
described something they are stuck on. Route them to the tools that fit.

THE CATALOGUE (id | title | category | what it does | the question it answers):
${CATALOGUE}

RULES
- Not everything is a decision. People arrive needing to diagnose, understand, create,
  communicate, evaluate, prioritise or just get unstuck. Read what they actually said.
  Never force a decision framing onto a problem that isn't one.
- "reading": one sentence, max 30 words, playing back what you understand their situation
  to be and what kind of help it needs. Plain, warm, not a summary of their words verbatim.
  This is how they check you understood before they trust the picks.
- "followUp": ONLY if you genuinely cannot pick without knowing one more thing. One short
  question. Omit the field entirely when you can pick. Never ask more than one at a time,
  and never ask a second time in a conversation.
- "picks": 1 to 3 tools, best first. Use ONLY ids from the catalogue above, spelled exactly.
  Prefer 1 or 2 strong picks over 3 weak ones. Do not pick two tools that do the same job.
- "why": one sentence, max 25 words, saying why THIS tool fits THEIR situation. Reference
  the specifics they gave you. Never a generic description of the tool.
- "first": the single first move they should make, concretely, in their situation. An
  instruction they could carry out in the next ten minutes. Max 30 words.

STYLE: UK English (organise, prioritise, behaviour, judgement, analyse). Second person.
No em dashes. No colons in headings. Do not flatter. Do not pad.

Return ONLY a JSON object: {"reading": "...", "followUp": "...", "picks": [{"id":"...","why":"...","first":"..."}]}`;

/* ─── deterministic fallback ─── */
const STOP = new Set(
  "the a an and or but if to of in on for with is are was were be been it its this that i we my our you your they them he she do does did how what why when who not no am is dont don't cant can't im i'm ive i've about into out up down over under again more most some any all".split(
    " ",
  ),
);

export function keywordPicks(text: string, n = 3) {
  const words = text
    .toLowerCase()
    .split(/[^a-z']+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  if (!words.length) return [];
  const scored = MODELS.map((m) => {
    const hay = `${m.title} ${m.blurb} ${m.question} ${m.description} ${m.trigger}`.toLowerCase();
    let score = 0;
    for (const w of new Set(words)) {
      if (hay.includes(w)) score += 1;
      if (m.question.toLowerCase().includes(w)) score += 2; // the user's-question field is the strongest signal
      if (m.title.toLowerCase().includes(w)) score += 2;
    }
    return { m, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
  return scored.map(({ m }) => ({
    id: m.id,
    why: m.blurb,
    first: m.trigger.slice(0, 220),
  }));
}

/* ─── shape a pick for the client ─── */
const decorate = (p: { id: string; why?: string; first?: string }) => {
  const m = BY_ID.get(p.id);
  if (!m) return null;
  return {
    id: m.id,
    title: m.title,
    category: m.category,
    colour: CATEGORY_COLOUR[m.category] ?? "#2563eb",
    href: `${BASE}/m/${m.id}`,
    icon: m.icon,
    why: (p.why || m.blurb).trim(),
    first: (p.first || "").trim(),
  };
};

export async function runGuide(history: Turn[], creds: Credentials | null): Promise<Response> {
  const lastUser = [...history].reverse().find((t) => t.role === "user")?.content ?? "";
  const alreadyAsked = history.some((t) => t.role === "assistant" && /"followUp"\s*:\s*"[^"]/.test(t.content));

  const fallback = (reading: string, error?: string) => {
    const picks = keywordPicks(lastUser).map(decorate).filter(Boolean);
    return json({
      reading,
      picks,
      raw: "",
      ...(error ? { degraded: error } : {}),
      ...(picks.length ? {} : { error: "Nothing matched. Try describing what you want to be true once it's sorted." }),
    });
  };

  // The whole exchange as one user turn — the router is a classifier, not a chat.
  const conversation = history
    .map((t) => (t.role === "user" ? `THEM: ${t.content}` : `YOU EARLIER: ${t.content}`))
    .join("\n\n");

  const res = await callLlm(creds, {
    maxTokens: 1600,
    temperature: 0.3,
    // The catalogue is ~3,200 tokens and identical on every call.
    cacheSystem: true,
    // System stays byte-identical so the cache hits; the one conditional
    // instruction rides the user turn instead.
    system: SYSTEM,
    user: alreadyAsked
      ? `${conversation}\n\n(You have already asked a follow-up. Pick now; do not ask another.)`
      : conversation,
  });

  if (!res.ok) {
    const why = {
      "no-key": "Matched on keywords — add your own model key to get a proper reading.",
      auth: "Matched on keywords — that key was rejected. Check it in Settings.",
      network: "Matched on keywords — could not reach the model.",
      upstream: "Matched on keywords — the model returned an error.",
    }[res.reason];
    return fallback(why, res.reason);
  }

  const m = res.text.match(/\{[\s\S]*\}/);
  if (!m) return fallback("Matched on keywords — the guide returned nothing usable.", "unparseable");

  let parsed: any;
  try {
    parsed = JSON.parse(m[0]);
  } catch {
    return fallback("Matched on keywords — the guide returned nothing usable.", "bad json");
  }

  const picks = (Array.isArray(parsed.picks) ? parsed.picks : []).map(decorate).filter(Boolean).slice(0, 3);
  const followUp = !alreadyAsked && typeof parsed.followUp === "string" && parsed.followUp.trim()
    ? parsed.followUp.trim()
    : undefined;

  // A reply with neither picks nor a question is a dead end; fall back rather than show nothing.
  if (!picks.length && !followUp) return fallback(String(parsed.reading || "Here's what I found."));

  return json({
    reading: String(parsed.reading ?? "").trim(),
    followUp,
    picks,
    raw: m[0],
  });
}

const json = (o: unknown) =>
  new Response(JSON.stringify(o), {
    headers: { "content-type": "application/json;charset=utf-8", "cache-control": "no-store" },
  });

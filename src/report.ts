/**
 * "Work it through" — Claude runs the chosen model against the person's actual
 * situation and produces the artefact the model is supposed to produce, not a
 * description of the model.
 *
 * A fishbone returns a populated fishbone. SBI returns the actual script you
 * could say. Minto returns the message rewritten. That difference is the whole
 * point of the step: the library tells you WHICH tool, this tells you what the
 * tool says about YOUR problem.
 *
 * Runs on whichever key the reader supplied. Nothing is stored: the key arrives
 * on the request, is used once, and goes when the request ends.
 */
import type { Model } from "./models.gen";
import type { Turn } from "./guide";
import { callLlm, parseLoose, REPORT_MODEL, type Credentials } from "./llm";



/* ── sanitiser ── Claude returns HTML fragments so tables and lists survive;
   everything outside this allowlist is stripped, attributes included. ── */
const ALLOWED = new Set([
  "p","ul","ol","li","strong","em","code","pre","br","hr",
  "table","thead","tbody","tr","th","td","blockquote","h4","h5",
]);

const ALLOWED_TAG_RE = new RegExp(`^</?(?:${[...ALLOWED].join("|")})>`);

export function sanitise(html: string): string {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?(script|style|iframe|object|embed|link|meta|form|input|svg|img|a)\b[^>]*>/gi, "");
  // Drop every attribute, and any tag outside the allowlist (keeping its text).
  out = out.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (_m, slash: string, tag: string) =>
    ALLOWED.has(tag.toLowerCase()) ? `<${slash}${tag.toLowerCase()}>` : "",
  );
  // Both regexes above need a literal ">", so an UNTERMINATED tag at the end of
  // a fragment ("<img src=x onerror=...") passes through untouched — and the
  // caller concatenates the next section's "<h3>", supplying the ">" and making
  // it live. Escape every "<" that isn't one of the bare tags we just emitted.
  out = out.replace(/</g, (m, i: number) =>
    ALLOWED_TAG_RE.test(out.slice(i)) ? m : "&lt;",
  );
  return out.trim();
}

const SYSTEM = (m: Model) => `You are running one specific thinking tool against a real situation
someone has described, and producing the artefact that tool is supposed to produce.

THE TOOL — ${m.title}
${m.blurb}

ITS METHOD (follow it, step by step, do not summarise it):
${m.method}

WHAT YOU PRODUCE
Do the work. Do not explain the tool — they can read the method themselves. Apply it to
THEIR situation and output what falls out of it. Concretely:
- A cause-mapping tool outputs a populated map of THEIR likely causes.
- A feedback tool outputs the actual words they could say, in quotes.
- A writing tool outputs their message, rewritten.
- A decision tool outputs a scored comparison of THEIR options.
- A systems tool outputs THEIR loops, named.
If the method has a table, produce the filled-in table. If it has steps, work each step
with their specifics.

WHERE YOU DON'T KNOW
You will be missing facts. Never invent them. Write the gap explicitly as a bracketed
placeholder they can fill, e.g. [how many times has this happened?], and list the important
ones under "gaps". A report full of confident invention is worse than one with honest holes.

STYLE
UK English (organise, prioritise, behaviour, judgement, analyse). Second person. Plain and
direct. No flattery, no preamble, no "great question". No em dashes. No colons in headings.
Every sentence should carry something checkable — a name, a number, a mechanism, or a
stance they could argue with. Do not pad to look thorough.

OUTPUT — return ONLY this JSON object, nothing before or after:
{
  "title": "short name for this piece of work, 3-7 words, no colon",
  "situation": "one paragraph, max 60 words, what you understand their situation to be",
  "sections": [{"heading": "...", "html": "..."}],
  "next": ["concrete action they can take", "..."],
  "gaps": ["a fact you had to guess or leave blank", "..."],
  "watchOut": "one sentence on where this analysis is most likely to be wrong"
}

"sections" is 2 to 4 entries and carries the actual work. Keep each section under 220 words
so the whole object fits in one response — a truncated report is a broken one. "html" may use only these tags:
p ul ol li strong em code pre table thead tbody tr th td blockquote h4 h5 br hr.
No attributes, no classes, no links, no images. Use a table when the method calls for one.
"next" is 2 to 5 items, each a thing they could start within a day.
"gaps" may be empty if you genuinely needed nothing.`;



const json = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), {
    status,
    headers: { "content-type": "application/json;charset=utf-8", "cache-control": "no-store" },
  });

export async function runReport(
  m: Model,
  history: Turn[],
  creds: Credentials | null,
): Promise<Response> {
  const situation = history
    .filter((t) => t.role === "user")
    .map((t) => t.content)
    .join("\n\n");
  if (!situation.trim()) return json({ error: "Nothing to work through yet." }, 400);

  const res = await callLlm(creds, {
    // The report is the deliverable, so it gets a stronger model than routing.
    model: creds ? REPORT_MODEL[creds.provider] : undefined,
    maxTokens: 8000,
    temperature: 0.3,
    system: SYSTEM(m),
    user: `Here is my situation:\n\n${situation}`,
  });

  if (!res.ok) {
    const msg = {
      "no-key": "Add your own model key in Settings to work a model through.",
      auth: "That key was rejected. Check it in Settings.",
      network: "Could not reach the model. Try again.",
      upstream: "The model returned an error. Try again.",
    }[res.reason];
    return json({ error: msg }, res.reason === "no-key" ? 503 : 502);
  }

  const match = res.text.match(/\{[\s\S]*\}/);
  const p = match ? parseLoose(match[0]) : null;
  if (!p) return json({ error: "Claude returned nothing usable." }, 502);

  const sections = (Array.isArray(p.sections) ? p.sections : [])
    .map((s: any) => ({
      heading: String(s?.heading ?? "").slice(0, 120),
      html: sanitise(String(s?.html ?? "")),
    }))
    .filter((s: { heading: string; html: string }) => s.heading && s.html)
    .slice(0, 5);
  if (!sections.length) return json({ error: "Claude returned nothing usable." }, 502);

  const strings = (v: unknown, n: number) =>
    (Array.isArray(v) ? v : []).map((x) => String(x)).filter(Boolean).slice(0, n);

  return json({
    modelId: m.id,
    modelTitle: m.title,
    title: String(p.title ?? m.title).slice(0, 140),
    situation: String(p.situation ?? "").slice(0, 800),
    sections,
    next: strings(p.next, 5),
    gaps: strings(p.gaps, 6),
    watchOut: String(p.watchOut ?? "").slice(0, 400),
  });
}

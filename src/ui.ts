/**
 * Shared chrome for the Mental Models tool.
 *
 * Deliberately white. A catalogue only reads as a catalogue when nothing on the
 * page competes with the cards, so the chrome stays out of the way and the
 * accents do the categorising.
 */

/** Everything is served from the root. Set this if you mount it under a path. */
export const BASE = "";

/** One accent per category. Blues, greens, teals, amber, slate. Never purple. */
export const CATEGORY_COLOUR: Record<string, string> = {
  "Problem solving": "#2563eb",
  "Decision making": "#0f766e",
  "Systems thinking": "#0369a1",
  Communication: "#b45309",
  Risk: "#b91c1c",
  Innovation: "#15803d",
  Evaluation: "#4d7c0f",
  Estimation: "#0e7490",
  "Self-awareness": "#475569",
};

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const CSS = `
*,*::before,*::after{box-sizing:border-box}
/* .card sets display:block, which outranks the UA's [hidden]{display:none}.
   Without this the category filter sets the attribute and nothing moves. */
[hidden]{display:none!important}
:root{
  --bg:#fff; --ink:#16181d; --dim:#4b5563; --mute:#6b7280;
  --line:#e5e7eb; --line-soft:#f1f2f4; --wash:#fafafa;
  --accent:#2563eb; --max:1120px;
  --sans:ui-sans-serif,-apple-system,"Segoe UI",Inter,Helvetica,Arial,sans-serif;
  --mono:ui-monospace,SFMono-Regular,"SF Mono",Menlo,monospace;
}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);
  font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
.wrap{max-width:var(--max);margin:0 auto;padding:0 24px}
.prose-wrap{max-width:760px;margin:0 auto;padding:0 24px}

/* ── header ── */
header.top{border-bottom:1px solid var(--line);background:#fff;position:sticky;top:0;z-index:20}
.top .wrap{display:flex;align-items:center;gap:20px;height:60px}
.brand{font-weight:650;letter-spacing:-.01em;color:var(--ink);font-size:15px;display:flex;align-items:center;gap:9px}
.brand .dot{width:9px;height:9px;border-radius:50%;background:var(--accent);flex:none}
.top nav{margin-left:auto;display:flex;gap:22px;font-size:14px}
.top nav a{color:var(--dim)}
.top nav a.on{color:var(--ink);font-weight:600}

/* ── hero ── */
.hero{padding:56px 0 28px}
.hero h1{font-size:clamp(28px,4vw,40px);line-height:1.15;letter-spacing:-.025em;margin:0 0 12px;font-weight:680}
.hero p{margin:0;color:var(--dim);font-size:17px;max-width:62ch}
.hero .cta{margin-top:22px;display:inline-flex;align-items:center;gap:8px;background:var(--ink);color:#fff;
  padding:11px 18px;border-radius:8px;font-size:14.5px;font-weight:560}
.hero .cta:hover{background:#000;text-decoration:none}

/* ── filters ── */
.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:22px 0 6px;
  border-top:1px solid var(--line-soft);margin-top:34px}
.chip{border:1px solid var(--line);background:#fff;color:var(--dim);border-radius:999px;
  padding:6px 13px;font-size:13.5px;cursor:pointer;font-family:inherit;transition:.12s}
.chip:hover{border-color:#cbd0d8;color:var(--ink)}
.chip[aria-pressed=true]{background:var(--ink);border-color:var(--ink);color:#fff}
#q{margin-left:auto;border:1px solid var(--line);border-radius:8px;padding:8px 12px;
  font-size:14px;font-family:inherit;min-width:220px;color:var(--ink)}
#q:focus{outline:none;border-color:var(--accent)}
.count{color:var(--mute);font-size:13px;padding:14px 0 0}

/* ── icons: one charcoal geometric mark per model, no text ── */
.ico svg{display:block;width:100%;height:100%}
.card .ico{width:38px;height:38px;margin:0 0 14px}
.card .ico svg{opacity:.9}
.card:hover .ico svg{opacity:1}
.hero-ico{width:66px;height:66px;margin:0 0 20px}
.pick .ico{width:30px;height:30px;float:left;margin:2px 13px 6px 0}

/* ── card grid ── */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(272px,1fr));gap:16px;padding:16px 0 72px}
.card{display:block;border:1px solid var(--line);border-radius:12px;padding:20px;background:#fff;
  color:var(--ink);transition:.14s;position:relative;overflow:hidden}
.card::before{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:var(--c,var(--accent));opacity:0}
.card:hover{border-color:#d2d7df;transform:translateY(-2px);box-shadow:0 6px 20px -8px rgba(16,24,40,.14);text-decoration:none}
.card:hover::before{opacity:1}
.card .cat{font-size:10.5px;font-weight:680;letter-spacing:.09em;text-transform:uppercase;color:var(--c,var(--accent))}
.card h3{margin:9px 0 7px;font-size:17px;font-weight:640;letter-spacing:-.012em;line-height:1.3}
.card p{margin:0;color:var(--dim);font-size:14px;line-height:1.55}
.empty{padding:48px 0 80px;color:var(--mute)}

/* ── model page ── */
.crumb{font-size:13px;color:var(--mute);padding:26px 0 0;display:flex;gap:7px;align-items:center;flex-wrap:wrap}
.crumb a{color:var(--mute)}
.title{padding:14px 0 6px}
.title .cat{font-size:11px;font-weight:680;letter-spacing:.09em;text-transform:uppercase;color:var(--c,var(--accent))}
.title .hero-ico{margin-bottom:18px}
.title h1{margin:10px 0 10px;font-size:clamp(26px,3.4vw,36px);line-height:1.16;letter-spacing:-.026em;font-weight:680}
.title .lede{margin:0;color:var(--dim);font-size:17.5px;line-height:1.55}
.prose{padding:14px 0 90px;font-size:16px}
.prose h2{margin:44px 0 12px;font-size:21px;font-weight:650;letter-spacing:-.017em;
  padding-top:20px;border-top:1px solid var(--line-soft)}
.prose h2:first-of-type{border-top:0;padding-top:0;margin-top:28px}
.prose h3{margin:28px 0 8px;font-size:16.5px;font-weight:640}
.prose p{margin:0 0 15px}
.prose ul,.prose ol{margin:0 0 15px;padding-left:22px}
.prose li{margin:0 0 6px}
.prose li.chk{list-style:none;position:relative;padding-left:26px}
.prose li.chk::before{content:"";position:absolute;left:0;top:5px;width:14px;height:14px;
  border:1.5px solid #c9cfd8;border-radius:3.5px}
.prose strong{font-weight:640}
.prose code{font-family:var(--mono);font-size:.86em;background:var(--wash);border:1px solid var(--line-soft);
  padding:1.5px 5px;border-radius:5px}
.prose a.xref{border-bottom:1px solid #c7d7fb;text-decoration:none}
.prose pre{background:var(--wash);border:1px solid var(--line);border-radius:10px;padding:16px 18px;
  overflow-x:auto;margin:0 0 18px;line-height:1.5}
.prose pre code{background:none;border:0;padding:0;font-size:12.8px;white-space:pre}
.prose blockquote{margin:0 0 18px;padding:12px 18px;border-left:3px solid var(--c,var(--accent));
  background:var(--wash);border-radius:0 8px 8px 0;color:var(--dim)}
.prose blockquote p:last-child{margin:0}
.prose table{width:100%;border-collapse:collapse;margin:0 0 20px;font-size:14.5px;display:block;overflow-x:auto}
.prose th,.prose td{border:1px solid var(--line);padding:9px 12px;text-align:left;vertical-align:top}
.prose th{background:var(--wash);font-weight:640;white-space:nowrap}
.prose hr{border:0;border-top:1px solid var(--line);margin:32px 0}

/* ── boxed sections: the three that carry the method ── */
.prose .box{border:1px solid var(--line);border-radius:14px;padding:4px 22px 18px;margin:34px 0 26px;
  background:var(--wash);position:relative;overflow:hidden}
.prose .box::before{content:"";position:absolute;inset:0 auto 0 0;width:4px;background:var(--c,var(--accent))}
.prose .box > h2{border-top:0;padding-top:0;margin:22px 0 12px;font-size:14px;letter-spacing:.07em;
  text-transform:uppercase;color:var(--c,var(--accent));font-weight:700}
.prose .box p:last-child,.prose .box ol:last-child,.prose .box ul:last-child{margin-bottom:0}
.prose .box.trigger{background:#f7faff;border-color:#dfe9fb}
.prose .box.trigger > h2::after{content:" — start here";letter-spacing:0;text-transform:none;
  font-weight:600;color:var(--mute);font-size:12.5px}
.prose .box.trigger ol{counter-reset:step;list-style:none;padding-left:0;margin-top:14px}
.prose .box.trigger ol > li{counter-increment:step;position:relative;padding-left:38px;margin-bottom:11px}
.prose .box.trigger ol > li::before{content:counter(step);position:absolute;left:0;top:-1px;width:25px;height:25px;
  border-radius:50%;background:var(--c,var(--accent));color:#fff;font-size:12.5px;font-weight:700;
  display:flex;align-items:center;justify-content:center}
.prose .box.caution{background:#fffaf5;border-color:#f6e3cd}
.prose .box.caution > h2{color:#b45309}
.prose .box.caution::before{background:#d97706}
.prose .box.check{background:#f6fbf7;border-color:#d9ecdf}
.prose .box.check > h2{color:#15803d}
.prose .box.check::before{background:#16a34a}
.prose .box.check li.chk::before{border-color:#9ccbab}

/* ── related rail ── */
.rail{border-top:1px solid var(--line);padding:30px 0 80px}
.rail h4{margin:0 0 14px;font-size:12px;font-weight:680;letter-spacing:.09em;text-transform:uppercase;color:var(--mute)}
.rail .grid{padding:0;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}

/* ── guide ── */
.guide{max-width:720px;margin:0 auto;padding:0 24px 90px}
.guide h1{font-size:clamp(26px,3.4vw,34px);letter-spacing:-.026em;margin:52px 0 10px;font-weight:680}
.guide .sub{color:var(--dim);font-size:17px;margin:0 0 26px;max-width:56ch}
textarea#ask{width:100%;min-height:118px;border:1px solid var(--line);border-radius:12px;padding:15px 16px;
  font:inherit;font-size:16px;resize:vertical;color:var(--ink);line-height:1.55}
textarea#ask:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.seeds{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0}
.seed{border:1px solid var(--line);background:#fff;border-radius:999px;padding:6px 13px;font-size:13.5px;
  color:var(--dim);cursor:pointer;font-family:inherit;text-align:left}
.seed:hover{border-color:#cbd0d8;color:var(--ink)}
.row{display:flex;align-items:center;gap:14px;margin-top:18px}
button.go{background:var(--ink);color:#fff;border:0;border-radius:9px;padding:12px 22px;font:inherit;
  font-size:15px;font-weight:560;cursor:pointer}
button.go:hover{background:#000}
button.go[disabled]{opacity:.45;cursor:default}
.hint{color:var(--mute);font-size:13px}
.turn{border:1px solid var(--line);border-radius:12px;padding:18px 20px;margin:22px 0 0;background:#fff}
.turn.you{background:var(--wash);border-color:var(--line-soft)}
.turn .who{font-size:10.5px;font-weight:680;letter-spacing:.09em;text-transform:uppercase;color:var(--mute);margin-bottom:8px}
.turn p{margin:0 0 10px}.turn p:last-child{margin:0}
.pick{border:1px solid var(--line);border-radius:12px;padding:20px;margin:14px 0 0;background:#fff}
.pick.primary{border-color:#bfd3fb;box-shadow:0 0 0 3px rgba(37,99,235,.07)}
.pick .cat{font-size:10.5px;font-weight:680;letter-spacing:.09em;text-transform:uppercase;color:var(--c,var(--accent))}
.pick h3{margin:8px 0 6px;font-size:18px;font-weight:650;letter-spacing:-.014em}
.pick .why{color:var(--dim);font-size:14.5px;margin:0 0 12px}
.pick .open{font-size:14px;font-weight:560}
.pick .first{background:var(--wash);border-radius:9px;padding:12px 14px;font-size:14.5px;margin:0 0 12px;
  border-left:3px solid var(--c,var(--accent))}
.pick .first b{display:block;font-size:10.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--mute);
  margin-bottom:5px;font-weight:680}
.err{border:1px solid #fecaca;background:#fef2f2;color:#991b1b;border-radius:10px;padding:14px 16px;margin-top:18px;font-size:14.5px}
.spin{display:inline-block;width:15px;height:15px;border:2px solid var(--line);border-top-color:var(--accent);
  border-radius:50%;animation:sp .7s linear infinite;vertical-align:-2px}
@keyframes sp{to{transform:rotate(360deg)}}
/* ── report ── the artefact the model produced, not a description of it ── */
.pick .work{display:inline-block;margin-left:14px;background:none;border:0;padding:0;font:inherit;
  font-size:14px;font-weight:560;color:var(--c,var(--accent));cursor:pointer;text-decoration:underline}
.pick .work[disabled]{opacity:.45;cursor:default;text-decoration:none}
.report{border:1px solid var(--line);border-left:4px solid var(--c,var(--accent));border-radius:12px;
  padding:24px 26px;margin:16px 0 0;background:#fff}
.report .kicker{font-size:10.5px;font-weight:680;letter-spacing:.09em;text-transform:uppercase;color:var(--mute)}
.report h2{margin:9px 0 4px;font-size:21px;font-weight:660;letter-spacing:-.018em;line-height:1.25}
.report .situ{color:var(--dim);font-size:15px;margin:8px 0 20px;padding-bottom:18px;border-bottom:1px solid var(--line-soft)}
.report h3{margin:22px 0 9px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--c,var(--accent))}
.report h4,.report h5{margin:16px 0 6px;font-size:15px;font-weight:640}
.report p{margin:0 0 11px;font-size:15.5px}
.report ul,.report ol{margin:0 0 11px;padding-left:21px;font-size:15.5px}
.report li{margin:0 0 5px}
.report code{font-family:var(--mono);font-size:.86em;background:var(--wash);padding:1.5px 5px;border-radius:5px;
  border:1px solid var(--line-soft)}
.report pre{background:var(--wash);border:1px solid var(--line);border-radius:9px;padding:14px 16px;
  overflow-x:auto;font-size:12.8px;line-height:1.5;margin:0 0 14px;white-space:pre}
.report blockquote{margin:0 0 14px;padding:11px 16px;background:var(--wash);border-left:3px solid var(--c,var(--accent));
  border-radius:0 8px 8px 0;font-size:15.5px}
.report blockquote p:last-child{margin:0}
.report table{width:100%;border-collapse:collapse;font-size:14px;margin:0 0 14px;display:block;overflow-x:auto}
.report th,.report td{border:1px solid var(--line);padding:8px 11px;text-align:left;vertical-align:top}
.report th{background:var(--wash);font-weight:640;white-space:nowrap}
.report .next{background:#f6fbf7;border:1px solid #d9ecdf;border-radius:10px;padding:14px 18px;margin:20px 0 0}
.report .next h3{color:#15803d;margin-top:4px}
.report .gaps{background:#fffaf5;border:1px solid #f6e3cd;border-radius:10px;padding:14px 18px;margin:12px 0 0}
.report .gaps h3{color:#b45309;margin-top:4px}
.report .watch{margin:16px 0 0;padding-top:14px;border-top:1px solid var(--line-soft);
  color:var(--mute);font-size:13.5px}
.report .acts{margin:18px 0 0;display:flex;gap:14px;align-items:center}
.report .acts button{background:none;border:1px solid var(--line);border-radius:7px;padding:7px 13px;
  font:inherit;font-size:13px;color:var(--dim);cursor:pointer}
.report .acts button:hover{border-color:#cbd0d8;color:var(--ink)}
@media print{header.top,footer.foot,.seeds,.row,textarea,.pick .work,.report .acts{display:none!important}
  .report{border:0;padding:0}body{font-size:12pt}}

/* ── settings ── */
.field{margin:0 0 18px}
.field label{display:block;font-size:13.5px;font-weight:600;margin:0 0 6px}
.field .opt{font-weight:400;color:var(--mute)}
.field input,.field select{width:100%;border:1px solid var(--line);border-radius:9px;padding:10px 12px;
  font:inherit;font-size:15px;color:var(--ink);background:#fff}
.field input:focus,.field select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.field .note{margin:6px 0 0;font-size:13px;color:var(--mute)}
button.ghost{background:none;border:1px solid var(--line);border-radius:9px;padding:11px 16px;
  font:inherit;font-size:14.5px;color:var(--dim);cursor:pointer}
button.ghost:hover{border-color:#cbd0d8;color:var(--ink)}
.hint.good{color:#15803d}.hint.bad{color:#b91c1c}
.privacy{margin:34px 0 0;border-top:1px solid var(--line);padding-top:22px}
.privacy h3{margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.privacy ul{margin:0;padding-left:20px;color:var(--dim);font-size:14.5px}
.privacy li{margin:0 0 6px}
.nokey{border:1px solid #f6e3cd;background:#fffaf5;border-radius:10px;padding:13px 16px;
  margin:0 0 16px;font-size:14.5px;color:#8a5a12}
.nokey a{color:#b45309;font-weight:560}

footer.foot{border-top:1px solid var(--line);padding:22px 0 42px;color:var(--mute);font-size:13px}
@media (max-width:640px){.top nav{gap:14px}.hero{padding:36px 0 20px}#q{margin-left:0;width:100%}}
`;

export function page(opts: {
  title: string;
  nav: "browse" | "guide" | "settings";
  body: string;
  head?: string;
  script?: string;
}): Response {
  const html = `<!doctype html><html lang="en-GB"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(opts.title)} — Mental Models</title>
<style>${CSS}</style>${opts.head ?? ""}</head><body>
<header class="top"><div class="wrap">
  <a class="brand" href="${BASE}"><span class="dot"></span>Mental Models</a>
  <nav>
    <a href="${BASE}"${opts.nav === "browse" ? ' class="on"' : ""}>Browse</a>
    <a href="${BASE}/guide"${opts.nav === "guide" ? ' class="on"' : ""}>Help me think</a>
    <a href="${BASE}/settings"${opts.nav === "settings" ? ' class="on"' : ""}>Settings</a>
  </nav>
</div></header>
${opts.body}
<footer class="foot"><div class="wrap">
  60 thinking tools. Your model key stays in your browser.
  <a href="https://github.com/danielctc/mental-modelling">Source</a>
</div></footer>
${opts.script ? `<script>${opts.script}</script>` : ""}
</body></html>`;
  return new Response(html, {
    headers: { "content-type": "text/html;charset=utf-8", "cache-control": "no-store" },
  });
}

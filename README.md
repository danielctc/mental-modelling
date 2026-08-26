# Mental Modelling

**Sixty thinking tools.** Browse them, describe what you're stuck on and get
routed to the right one, or have a model work your actual problem through and
hand back the result.

Bring your own API key. It stays in your browser.

---

## Why this exists

Most collections of thinking tools are a list you scroll past. The hard part was
never finding a list — it's knowing *which* one applies at 4pm on a Tuesday when
something has gone wrong and you don't have a name for it yet.

So there are three layers here:

1. **A catalogue** — sixty models, eight categories, searchable. No key needed.
2. **A router** — describe the situation in your own words and it picks the tools
   that fit, with a reason and a first move.
3. **An applier** — it runs the chosen model against your situation and returns
   the thing the model is supposed to produce.

That third one is the point. A cause-mapping tool returns a populated map of
*your* likely causes. A feedback tool returns the actual words you could say. A
writing tool returns *your* message, rewritten. Where it had to guess, it says
so under "I had to guess these" instead of inventing a number.

## The router is deliberately not decision-shaped

People arrive with "this keeps happening", "I have to tell someone something
awkward" and "I don't understand this system" far more often than with "should I
do A or B". Those three route to Iceberg/Archetypes, Radical Candor/SBI and
Concept Map — a decision-first funnel would send all of them to the wrong shelf,
so the routing prompt rules it out explicitly.

With no key it falls back to keyword matching **and says on the page that it
did**, rather than pretending the rough answer is the good one.

## Your key, your browser

There is no database in this project. Nothing to leak.

- The key is saved to `localStorage` on your device. Not a cookie, so it is never
  sent automatically.
- It is attached to exactly two requests — routing and the report — and used once
  each.
- The worker reads it off the request, calls the provider, and drops it when the
  request ends. It is never logged, stored or persisted.
- Clearing it in Settings, or clearing your browser data, removes it completely.
- Browsing all sixty models needs no key at all.

Works with **Anthropic** directly, or anything speaking the **OpenAI
chat-completions** API — OpenRouter, Groq, Together, or a local llama.cpp server.

## Run it

```bash
bun install          # or npm install
npm run data         # models/*.md -> src/models.gen.ts
npm run dev
```

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

That's it — no database, no bindings, no build step beyond `npm run data`.

### A private instance with a server-side key

Leave the vars unset and every visitor brings their own key, which is the right
shape for anything shared. For a private deployment where you'd rather hold the
key yourself:

```bash
wrangler secret put LLM_API_KEY
# then in wrangler.toml [vars]:
#   LLM_PROVIDER = "anthropic"   # or "openai-compatible"
#   LLM_MODEL    = "claude-haiku-4-5-20251001"
```

## Adding or editing a model

Every model is one markdown file in `models/`, with frontmatter and a fixed set
of headings. Add a file, run `npm run data`, and it appears in the catalogue,
the router and the API.

```markdown
---
name: thinking-your-model
description: One sentence on when to reach for it and what it does.
---

# Your Model

## Trigger Card
The four-step version, for someone who already knows it.

## Overview
## When to Use
## When NOT to Use          <- please write this one honestly
## The Process
## Verification Checklist
## Key Questions
## Source
```

`When NOT to Use` matters more than it looks. A tool that claims to fit
everything is useless for choosing between tools, and the router leans on these
sections to keep models in their lane.

**PRs welcome** — new models, better examples, corrections, translations.

### Regenerating the cards and icons

Both are committed, so you only need these if you've changed the model set.
They call an LLM and need `OPENROUTER_API_KEY` / `GEMINI_API_KEY` in your env.

```bash
npm run cards    # writes each card's category, one-line blurb and question
npm run icons    # draws the SVG icons
```

## What's in the box

| Route | |
|---|---|
| `/` | Card catalogue, eight categories, filter and search |
| `/m/:id` | One model, full method |
| `/guide` | Describe a situation, get routed |
| `/settings` | Your key |
| `/api/models` | The whole catalogue as JSON, CORS-open |
| `/api/guide` | Routing |
| `/api/report` | Applies a model to a situation |

`/api/models` is deliberately open — if you want to build something else on this
catalogue, take it.

## Notes from building it

- **Routing wants a fast model, not a clever one.** An early version used a
  reasoning model and took ~40 seconds, which reads as broken. Routing is
  classification; latency is the thing people feel. The report is the
  deliverable, so that gets the stronger model.
- **The catalogue is ~3,200 identical tokens on every routing call** and is
  marked cacheable, so repeat calls read it at a fraction of the cost.
- **`.card{display:block}` outranks the UA's `[hidden]{display:none}`.** The
  category filter set the attribute and nothing moved.
- **`\n` inside a JS template literal is a real newline.** A regex written as
  `/\nCopy/` inside an inline page script became a syntax error and silently
  killed the whole script.
- The prose is UK English, except "Situation-Behavior-Impact" and "Center for
  Creative Leadership" — a trademark and a proper noun.

## Credit

The models are not ours. They belong to the people who worked them out — Kaoru
Ishikawa, Barbara Minto, Edward de Bono, Eliyahu Goldratt, Chris Argyris,
Marshall Rosenberg, Kim Scott, Fritz Zwicky, Joseph Novak and Alberto Cañas,
Donella Meadows, Tim Hurson, and others credited in each file's `Source`
section. What's here is a way to find them and apply them.

## Licence

MIT. Take it, fork it, run it, sell it. These tools should be free.

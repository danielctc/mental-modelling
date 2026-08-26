# Contributing

New models, better examples, corrections and fixes are all welcome.

## Adding a model

One markdown file in `models/`, named `thinking-<slug>.md`. Copy the shape of an
existing one — `models/thinking-ishikawa-diagram.md` is a good template.

Then `npm run data` and it's in the catalogue, the router and the API.

### What makes a good model file

- **Write `When NOT to Use` honestly.** It is the most useful section in the file
  and the one people skip. A tool that fits everything can't be chosen between.
- **Examples need real specifics** — a number, a name, a date, a mechanism.
  "Improve the process" teaches nothing; "p95 is 1.8s and the index is 900MB"
  teaches the shape of the thinking. Invent concrete examples rather than vague
  ones, and keep them generic enough that anyone recognises the situation.
- **Credit the originator** in `## Source`. If the model has a book, name it.
- Cross-link with `` `thinking-other-model` `` in backticks — those become links
  automatically.

### Please don't

- Add a model that's a rephrasing of one already here. Sixty is already a lot to
  choose between; the router gets worse with near-duplicates, not better.
- Put company-specific or personal examples in. This is public.

## Running it

```bash
bun install
npm run data
npm run dev
```

`npm run typecheck` before opening a PR.

## Regenerating cards and icons

Only if you changed the model set. Both are committed.

```bash
npm run cards    # needs OPENROUTER_API_KEY
npm run icons    # needs GEMINI_API_KEY
```

If you add a model and can't run these, say so in the PR and a maintainer will.

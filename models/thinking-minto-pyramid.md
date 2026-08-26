---
name: thinking-minto-pyramid
description: When writing a message, report, update or recommendation for a busy audience, lead with the conclusion, then key arguments, then supporting detail — so the reader gets the point in the first line and can stop reading whenever they like.
---

# Minto Pyramid (BLUF)

## Trigger Card

Before sending any written communication where the reader is busy:

1. **Write the conclusion / recommendation as the first sentence.** Not context. Not background. The answer.
2. **Add 2-4 key arguments** — short summaries that explain the "why" behind the conclusion.
3. **Support each argument with detail** — facts, numbers, evidence, results. Optional if the arguments already stand up.
4. **Check the reader could stop after line one and still act correctly.**

Skip if the piece is narrative, persuasive-by-suspense, or a document whose whole job is exploration rather than a recommendation.

## Overview

The Minto Pyramid Principle, developed by Barbara Minto at McKinsey, gives communication a top-down structure. The same idea appears in the US military as **BLUF** — "bottom line up front."

Most of us were taught to build to a conclusion: background, then analysis, then the point. That works for essays and it fails for business. People are busy. The point arrives after they've stopped reading.

**Core Principle:** Lead with the answer. Everything below it exists to justify the answer, not to build to it.

```
                 ┌─────────────────┐
                 │   CONCLUSION    │  ← first sentence
                 └────────┬────────┘
            ┌─────────────┼─────────────┐
        ┌───▼───┐     ┌───▼───┐     ┌───▼───┐
        │ Key   │     │ Key   │     │ Key   │  ← the "why"
        │ point │     │ point │     │ point │
        └───┬───┘     └───┬───┘     └───┬───┘
       ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
       │ Detail  │   │ Detail  │   │ Detail  │  ← evidence, numbers
       └─────────┘   └─────────┘   └─────────┘
```

## When to Use

- Status updates, briefings and stakeholder emails
- Recommendations where you want a decision, not a discussion
- Incident reports and postmortems
- Slack/chat messages longer than three lines
- Executive summaries, proposals, PR descriptions
- Any time the audience has limited time or attention
- Presentations where the key info would otherwise land on the last slide

## When NOT to Use

- **Narrative or teaching writing** where the discovery sequence IS the value (a tutorial, a story, a walkthrough).
- **You don't have a conclusion yet.** Don't manufacture one to fit the shape — say "no recommendation yet, here's what I know."
- **The reader needs to reach the conclusion themselves** to buy into it (some negotiations, some coaching conversations).
- **Bad news to one person** where a cold opening reads as brutal. Even then, put the point in paragraph one, not paragraph six.
- The message is two lines long. Structure is overhead.

## The Process

### Step 1: State the conclusion
One sentence. The recommendation, the takeaway, the decision you want.

```
✅ "We should move search onto a dedicated index — the database's own full-text
    is now the p95 bottleneck at 1.8s."
❌ "I've been looking at search performance over the last two weeks and wanted to
    share some thoughts on where we are."
```

### Step 2: Give the key points
2-4 summaries that answer "why should I believe that?" Each should be a complete claim, not a topic label.

```
- Database full-text hits 1.8s p95 on the 200,000-row table; a dedicated index benchmarks at 40ms.
- The index fits in 900MB, inside the headroom we already pay for.
- Migration is reversible: we keep the old path behind a flag for a week.
```

### Step 3: Support with detail
Facts, evidence, numbers, results. This is where you can go long — the busy reader will skip it, and that's fine. The detail exists so that the sceptical reader can verify, not so that the busy reader can understand.

### Step 4: Cut the runway
Delete every sentence before the conclusion. Context-setting ("As you know...", "Following on from our chat...") is almost always runway. If context is genuinely needed, put it under the relevant key point.

## Application Patterns

### Status update
```
CONCLUSION:  Launch is on track for Friday; one open risk.
KEY POINTS:  - All 12 workers deployed and green.
             - Email deliverability verified on both domains.
             - RISK: the Access app change is untested against staff SSO.
DETAIL:      [links, run IDs, test output]
```

### Incident report
```
CONCLUSION:  Search was down 14:02-14:31; caused by an unindexed
             migration; fixed and guarded.
KEY POINTS:  - Migration 0043 dropped the GIN index without recreating it.
             - Nothing alerted because the probe only checks HTTP 200.
             - Guard added: migrations now run an index-count assertion in CI.
DETAIL:      [timeline, queries, PR links]
```

### Pull request description
```
CONCLUSION:  Fixes the double-send on notification emails (#412).
KEY POINTS:  - Root cause: the job re-enqueued on a non-idempotent success path.
             - Fix: dedupe key on (recipient_id, iso_week).
             - Test: added a failing test that reproduced the double-send first.
DETAIL:      [diff notes, migration, rollback plan]
```

### Asking for a decision
State the decision you want, then the options, then the detail. Never make the reader hunt for what you're actually asking.

## Common Failure Modes

| Failure | Looks like | Fix |
|---------|-----------|-----|
| Buried lede | Three paragraphs of context first | Delete them; start at the point |
| Topic labels not claims | "Performance", "Cost", "Risk" | Rewrite as full sentences with a verdict |
| Fake conclusion | "There are several considerations here" | That's not a conclusion. Take a position or say you can't |
| Pyramid inverted mid-way | Conclusion up front, then a chronological story | Reorder detail under its key point |
| Too many key points | 9 bullets of equal weight | Group into 3; the rest is detail |

## Verification Checklist
- [ ] First sentence contains the conclusion or recommendation
- [ ] 2-4 key points, each a complete claim rather than a topic label
- [ ] Each key point explains the "why", not the "what happened next"
- [ ] Detail sits under the point it supports
- [ ] A reader who stops after line one would act correctly
- [ ] No runway sentences before the conclusion

## Key Questions
- "If they read one sentence, what must it say?"
- "Is my first line a conclusion, or a throat-clear?"
- "Does each key point answer 'why should I believe you'?"
- "Can the reader stop here and still be right?"
- "Am I building suspense in a document that shouldn't have any?"

## Related Models
- `thinking-situation-behavior-impact` — the equivalent structure for spoken feedback
- `thinking-issue-trees` — MECE structure for the layer beneath the conclusion
- `thinking-steel-manning` — pressure-test the conclusion before you lead with it

## Source
"The Minto Pyramid Principle" by Barbara Minto; BLUF (US military writing standard).

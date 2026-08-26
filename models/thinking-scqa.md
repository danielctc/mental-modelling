---
name: thinking-scqa
description: When opening a document, pitch or email, set up Situation (agreed facts), Complication (what changed), Question (what it forces), Answer (your recommendation) — so the reader arrives at your point already believing they needed it.
---

# SCQA (Situation-Complication-Question-Answer)

## Trigger Card

When writing the opening of anything that argues for something:

1. **Situation** — facts the reader already accepts. No news here.
2. **Complication** — what changed, broke, or is now at risk.
3. **Question** — the question the complication forces. Often implied.
4. **Answer** — your recommendation. This is also your Minto conclusion.

Skip for routine updates where nothing has changed — just lead with the conclusion.

## Overview

Barbara Minto's companion to the Pyramid. The Pyramid orders your *argument*; SCQA writes your *opening*. Together: SCQA is the first paragraph, the Pyramid is everything under it.

The mechanism is agreement-then-tension. Situation gets the reader nodding. Complication breaks the nod. By the time the Answer lands, they want it — because you've made the Question theirs.

**Core Principle:** Earn agreement first, then disturb it, then resolve it. The reader should feel the question before you answer it.

```
S ─ "Search runs on the database's own full-text index, as it has since 2023."
C ─ "Rows tripled to 200,000 and p95 is now 1.8 seconds."               (nod breaks)
Q ─ [implied: so what do we do about search?]
A ─ "Move search to a dedicated index this sprint."                     (your point)
```

## When to Use

- Executive summaries and proposals
- Pitch decks — SCQA is the first three slides
- Emails asking for a decision or budget
- Article and blog openings
- The framing paragraph of a strategy doc
- Any time you need the reader to care before you ask for something

## When NOT to Use

- **Routine status updates.** Nothing has changed, so there's no Complication. Lead with the conclusion (`thinking-minto-pyramid`) and stop.
- **The reader already knows the problem** and is waiting for your answer. Skip S and C; you'd be padding.
- **Manufactured urgency.** If the Complication isn't real, SCQA becomes a sales trick and readers can smell it.
- Short messages. Four moves in a two-line Slack message is comedy.

## The Process

### Step 1: Situation — only what they already accept
Facts, uncontested. The test: could the reader disagree with any sentence here? If yes, it belongs in the argument, not the setup. Keep it to 1-3 sentences.

```
✅ "We publish four articles a week across two domains."
❌ "Our content strategy has been highly effective."   (contested — that's a claim)
```

### Step 2: Complication — what changed
The disturbance. New data, a deadline, a failure, a competitor, a regulation. This is where your specific, checkable fact goes — a number, a date, a named event.

```
✅ "Since the June core update, organic sessions are down 31% and
    Bing has stopped indexing new URLs within 48 hours."
❌ "Things have become more challenging."
```

### Step 3: Question — usually implied
The question the Complication forces. Often you don't write it; the reader supplies it. Write it explicitly when the Complication could lead to several questions and you need to pick one.

### Step 4: Answer — your recommendation
One sentence. This is the same sentence that tops your Minto Pyramid. Everything after it is the argument.

## The Four Openings

The order can shift depending on the audience:

| Order | Use when | Effect |
|-------|----------|--------|
| **S-C-Q-A** | Standard — reader needs context | Builds to the point |
| **A-S-C-Q** | Busy reader, or a follow-up | BLUF: answer first, justify after |
| **Q-S-C-A** | The question is already live | Direct, slightly urgent |
| **C-S-Q-A** | You need attention immediately | Dramatic; use sparingly |

A good default: **A-S-C-Q** for anything internal, **S-C-Q-A** for anything persuading someone new.

## Application Patterns

### Budget request
```
S: "Press releases are handled by a Worker that processes submissions nightly."
C: "It double-sent 14 releases in August and flagged two successful runs as failed."
Q: [implied: do we fix or replace?]
A: "Two days of work fixes both bugs — the alternative is switching vendor at £4k/yr."
```

### Article opening
```
S: "Every team we work with now has someone asking what the new rules mean."
C: "There is no UK AI Act. There's an EU one, and Article 50 bites on 2 August 2026,
    and it applies to any UK firm with EU users."
Q: [implied: what does anyone actually have to do?]
A: "Three obligations, and only one of them is technical."
```

### Bad news
```
S: "The migration was scheduled to complete on Friday."
C: "The D1 schema change failed on the second-largest table and we rolled back."
Q: [implied: what now?]
A: "New date is Wednesday. Here's what changed and what it costs."
```

## Verification Checklist
- [ ] Situation contains nothing the reader could dispute
- [ ] Complication names a specific, checkable change — number, date, event
- [ ] The Question follows inevitably from the Complication
- [ ] Answer is one sentence and is your actual recommendation
- [ ] Order chosen for this audience, not by habit
- [ ] The Complication is real, not manufactured

## Key Questions
- "What does my reader already accept without argument?"
- "What changed, exactly, and when?"
- "What question does that force?"
- "Is my answer one sentence?"
- "Would a busy reader prefer A first?"

## Related Models
- `thinking-minto-pyramid` — SCQA is its opening; the Pyramid is everything below
- `thinking-issue-trees` — structures the argument the Answer needs

## Source
Barbara Minto, "The Minto Pyramid Principle".

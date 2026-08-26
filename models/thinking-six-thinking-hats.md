---
name: thinking-six-thinking-hats
description: When a decision or discussion keeps circling one perspective, run it through six deliberate lenses in turn — benefits, risks, data, feelings, ideas, process — so no angle gets skipped and no one person owns "the negative one".
---

# Six Thinking Hats

## Trigger Card

When a decision needs a rounded view (or a meeting is stuck in one mode):

1. **Put on each hat in turn** and think only in that mode.
2. **Blue hat runs the process** — decides which hat is next and when to move on.
3. **In a group, either everyone wears the same hat at once, or assign hats round the table.**
4. **Capture what each hat surfaced before switching.**

Skip if the decision is a no-brainer or already well-analysed. This is overhead you pay for high-stakes or stuck discussions.

## Overview

Created by Edward de Bono. The insight: most discussions fail because people argue *modes* at each other — the optimist and the pessimist talk past one another all meeting. Separating the modes in time means everyone is optimistic at the same moment, then everyone is critical at the same moment. Conflict drops; coverage rises.

**Core Principle:** Think in one mode at a time, deliberately, and cover all six.

| Hat | Mode | Ask |
|-----|------|-----|
| 🟡 Yellow | Positivity | What are the benefits? What does this open up? |
| ⚫️ Black | Caution | What's the worst case? What won't work? |
| ⚪️ White | Data | What do the numbers actually say? |
| 🔴 Red | Emotion | How do I/we feel about this? Gut reaction? |
| 🟢 Green | Creativity | What else could we do? No censoring. |
| 🔵 Blue | Process | Are we stuck? Which hat next? |

## When to Use

- Group decisions where one loud voice dominates one mode
- Any decision where you suspect you've only looked at the upside (or only the downside)
- Meetings that keep going round in circles
- Strategy sessions, product bets, architecture choices
- Solo, when you notice you've already made up your mind and want to check

## When NOT to Use

- **Low-stakes, reversible decisions.** Six passes on a Tuesday deploy is theatre.
- **The blocker is missing information, not missing perspective.** Go and get the data (white hat alone).
- **A group with no psychological safety** — red hat requires people to say how they actually feel.
- When one specific lens is clearly the one you need: go straight to it (`thinking-pre-mortem` for risk, `thinking-first-principles` for a breakthrough).

## The Process

### Step 1: Blue hat first
Define what you're deciding, and set the running order. A common order: Blue → White (facts) → Yellow (upside) → Black (downside) → Red (gut) → Green (alternatives) → Blue (decide).

### Step 2: Wear each hat properly
The discipline is thinking ONLY in that mode. Under the yellow hat you do not raise risks, even good ones — note them and save them for black. Half the value is in the constraint.

### Step 3: Escalate hats to their own tools
Each hat has a heavier tool behind it if the shallow pass isn't enough:

- ⚫️ Black → `thinking-pre-mortem`, `thinking-inversion`, `thinking-red-team`
- 🟢 Green → `thinking-first-principles`, `thinking-triz`, `thinking-zwicky-box`, `thinking-productive-thinking-model`
- ⚪️ White → `thinking-fermi-estimation`, `thinking-probabilistic`, `thinking-bayesian`
- 🟡 Yellow → `thinking-second-order` (upside compounding)

### Step 4: Blue hat closes
Summarise what each hat produced and name the decision — or name what would resolve it.

## Application Patterns

### Architecture decision (should we move search onto a dedicated index?)
```
⚪️ White:  p95 is 1.8s; the dedicated index benchmarks 40ms and needs 900MB.
🟡 Yellow: Search stops being the complaint; unblocks facets and typo tolerance.
⚫️ Black:  New service to run, back up and monitor. Reindex on every write.
           If it dies, search dies — the database at least fails with the app.
🔴 Red:    Nervous. We added a service last year and it rotted.
🟢 Green:  Keep both behind a flag? Or fix the existing index first and re-measure?
🔵 Blue:   Green raised a cheaper test. Do that before deciding.
```

### Hiring, pricing, or a big content bet
Same structure. Red hat matters most here — gut reactions about people and money are data, and they never make it into the doc otherwise.

## Group Facilitation Notes

- **Same hat together** works better than assigned hats for most teams — it stops anyone becoming "the difficult one".
- **Assigned hats** are useful when the group has an entrenched split; give the optimist the black hat.
- **Timebox each hat** (3-5 min). The constraint produces the value.
- **Always end on blue.** Groups that skip it feel great and decide nothing.

## Verification Checklist
- [ ] All six hats used, or a deliberate reason given for skipping one
- [ ] Each hat was worn purely — no smuggling risks into the yellow pass
- [ ] Red hat actually surfaced feelings, not more rationalisation
- [ ] Green hat produced options that didn't exist at the start
- [ ] Blue hat closed with a decision or a named next step

## Key Questions
- "Which hat am I wearing right now — and which am I avoiding?"
- "Have we looked at this from a mode nobody in the room naturally occupies?"
- "Is the group arguing modes at each other rather than arguing the decision?"
- "What did the green hat produce that we'd never have got from analysis?"

## Related Models
- `thinking-pre-mortem`, `thinking-red-team` — the black hat, done properly
- `thinking-decision-matrix` — score the options the hats produced
- `thinking-model-combination` — hats as a combination pattern

## Source
Edward de Bono, "Six Thinking Hats".

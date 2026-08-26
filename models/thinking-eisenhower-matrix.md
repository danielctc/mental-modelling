---
name: thinking-eisenhower-matrix
description: When the task list is long and progress feels absent, sort every item by importance and urgency into four quadrants — do, schedule, delegate, drop — and work the important-but-not-urgent quadrant first.
---

# Eisenhower Matrix

## Trigger Card

When busy but not moving forward:

1. **List everything** competing for your time.
2. **Ask two questions per item:** is it important? is it urgent?
3. **Place it:** Important+Urgent → **Do**. Important+Not urgent → **Schedule**. Urgent+Not important → **Delegate**. Neither → **Don't**.
4. **Work quadrant 2 before quadrant 3.** That's the whole point.

Skip if you have three tasks. This is for lists long enough to hide the important ones.

## Overview

Named for Dwight D. Eisenhower. The observation: urgency is loud and importance is quiet, so urgent-unimportant work crowds out important-non-urgent work indefinitely. Quadrant 2 — deep work, long-term projects, prevention — never announces itself, and so never happens.

**Core Principle:** Urgent ≠ important. Protect quadrant 2 deliberately, because nothing else will.

```
                 URGENT              NOT URGENT
              ┌─────────────────┬─────────────────┐
              │ 1. DO           │ 2. SCHEDULE     │
   IMPORTANT  │ Crises,         │ Deep work,      │
              │ pressing        │ long-term       │
              │ problems        │ projects        │
              ├─────────────────┼─────────────────┤
   NOT        │ 3. DELEGATE     │ 4. DON'T DO     │
   IMPORTANT  │ Admin, most     │ Busy work,      │
              │ email, others'  │ avoidance,      │
              │ deadlines       │ distraction     │
              └─────────────────┴─────────────────┘
```

## When to Use

- Weekly or daily planning
- The list has grown past what you can hold in your head
- You feel constantly busy and are making no progress on anything that matters
- Triaging after time away
- Deciding what a team should stop doing

## When NOT to Use

- **Prioritising by value-vs-cost** rather than time pressure → `thinking-impact-effort-matrix`.
- **Everything genuinely is urgent** (a live incident). Run the incident; sort later.
- **The list is short.** Just do them.
- **You have no ability to delegate or decline** — the matrix will just tell you something you can't act on. Fix the constraint instead (`thinking-theory-of-constraints`).

## The Process

### Step 1: Separate urgent from important
This is the only hard part.

| | Signal |
|---|---|
| **Urgent** | Has a deadline, or someone is waiting, or it reacts to something. Emails, tickets, "can you just..." |
| **Important** | Advances a long-term goal or a project you actually care about. Writing, designing, learning, preventing |

An item can be both. Most aren't.

### Step 2: Place every item
Don't agonise. First instinct is usually right, and re-sorting is cheap.

### Step 3: Act by quadrant
- **Q1 Do** — now, today. If Q1 is permanently full, that's a symptom: you're not doing Q2 prevention.
- **Q2 Schedule** — put it in the calendar with a real block. Unscheduled Q2 becomes never.
- **Q3 Delegate** — hand it over. If you can't, schedule it *after* Q2.
- **Q4 Drop** — actually delete it. Don't "get to it later".

### Step 4: Check the shape
A healthy matrix is Q2-heavy. A Q1-heavy matrix means you're firefighting; a Q3-heavy matrix means you're a service desk for other people's priorities.

## Application Patterns

### A working week
```
                URGENT                        NOT URGENT
IMPORTANT       Fix the prod 500s             Rewrite the deploy pipeline
                Client deck due Thursday      Write the Q4 strategy doc
                                              Learn the new Workers API

NOT IMPORTANT   Reply to vendor emails        Reorganise the bookmarks
                Book the conference ticket    Scroll #random
                Approve the expense report    "Quick look" at a new tool
```

### Team level
Run it on the backlog. Q4 is usually the most valuable quadrant to fill honestly — it's the list of things you'll now stop pretending you'll do.

### Combining with impact-effort
Eisenhower answers *when*; Impact-Effort answers *whether it's worth it at all*. Run Impact-Effort on Q1+Q2 to sequence within them.

## Common Failure Modes

| Failure | Fix |
|---------|-----|
| Everything marked important | Ask: what happens in three months if this never gets done? |
| Q2 scheduled but never done | Block it in the calendar as an appointment, not a to-do |
| Q3 kept because "it's quicker to do myself" | True once. False by the tenth time |
| Q4 kept "just in case" | Delete it. It'll come back if it mattered |
| Re-sorting instead of working | Timebox the sort to ten minutes |

## Verification Checklist
- [ ] Every item placed, none left floating
- [ ] Urgency judged by deadline/reaction, importance by long-term goals
- [ ] Q2 items have real calendar blocks, not just a list entry
- [ ] Q4 items actually deleted
- [ ] Matrix shape reviewed — is Q1 permanently full? Why?

## Key Questions
- "Is this urgent, or just loud?"
- "What happens in three months if I never do this?"
- "Whose deadline is this?"
- "When exactly is the Q2 block?"
- "What am I refusing to put in Q4?"

## Related Models
- `thinking-impact-effort-matrix` — prioritise by value vs cost rather than time
- `thinking-opportunity-cost` — what saying yes to Q3 costs you
- `thinking-theory-of-constraints` — when the real problem is the bottleneck, not the ordering
- `thinking-via-negativa` — Q4 as a discipline

## Source
Attributed to Dwight D. Eisenhower; popularised by Stephen Covey.

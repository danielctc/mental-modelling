---
name: thinking-conflict-resolution-diagram
description: When two positions look mutually exclusive, work backwards from each demand to the need beneath it to the shared goal beneath both — then attack the assumption that makes them exclusive, and build a solution that meets both needs.
---

# Conflict Resolution Diagram (Evaporating Cloud)

## Trigger Card

When a conflict can't be resolved by one side simply winning:

1. **Write both demands** — what each side is arguing for.
2. **Find the need under each** — what does that proposal actually satisfy?
3. **Find the shared goal** — what would meeting both needs achieve?
4. **Surface the assumption** that makes the demands mutually exclusive — and break it.

Skip if one option is simply better and the disagreement is about facts, not needs.

## Overview

From Eliyahu Goldratt's Theory of Constraints thinking processes. Also called the Evaporating Cloud, because a well-run one makes the conflict evaporate rather than resolving it by compromise.

The key claim: demands conflict, needs usually don't, and goals almost never do. The exclusivity between the two demands rests on an assumption — and that assumption is usually unexamined and often false.

```
                              ┌── NEED A ──── DEMAND A
   SHARED GOAL ───────────────┤       ⇡              ⇕  (assumed exclusive)
                              └── NEED B ──── DEMAND B
                                      ⇡
                          [ work right to left ]
```

## When to Use

- A debate that's been going an hour with no movement
- Team disagreements about approach where both sides are competent and sincere
- Negotiations (internal or external)
- Internal conflict — you want two things that seem incompatible
- Whenever the framing has become "A or B" and neither is acceptable
- Resource fights: two teams, one engineer

## When NOT to Use

- **One option is simply better** and the disagreement is factual → get the data, use `thinking-decision-matrix`.
- **The conflict is about values, not means.** Some conflicts have no shared goal, and pretending otherwise is worse than acknowledging it.
- **A power imbalance makes "shared goal" a euphemism** for one side conceding.
- **Speed matters more than buy-in** — a decision-maker should just decide, and say so.
- When you'd manufacture a shared goal so abstract it's meaningless ("we both want the company to succeed").

## The Process

Work right to left — from demands back to the goal.

### Step 1: State both demands
Neutrally. "Redesign the website" vs "Don't redesign the website." Write both in the other side's words, not your paraphrase.

### Step 2: Find the need behind each
Ask: *what does this proposal satisfy?* Not "why do you want it" (which invites re-arguing the demand) but "what would it get you".

```
Demand: "Redesign the site."      → Need: a better conversion rate.
Demand: "Don't redesign."         → Need: engineering time for the migration.
```

### Step 3: Find the shared goal
Ask: *what would be achieved by meeting both needs?* This is the critical step. If you can't find one, either you're not high enough (climb — see `thinking-abstraction-laddering`), or the conflict is genuinely values-based.

```
Shared goal: more revenue from the site without stalling the platform work.
```

### Step 4: Surface the assumptions
List every assumption that makes the demands mutually exclusive:
- "Improving conversion requires a full redesign."
- "A redesign needs the same engineers as the migration."
- "It has to happen this quarter."

### Step 5: Break one
Attack the weakest assumption. Usually at least one is plainly false, and when it goes the conflict evaporates rather than being split down the middle.

```
"Improving conversion requires a full redesign" — false. Test three landing-page
variants first. Costs two days, not two months, and produces evidence for the
redesign decision either way.
```

## Application Patterns

### Team standoff
Build vs buy, monolith vs services, ship now vs harden first. In almost every case the needs (speed, reliability) are compatible and only the proposals conflict.

### Personal
"Take the senior role" vs "join the startup". Needs: security and impact. Assumption: they're only available separately. Sometimes true — but check before accepting it.

### Negotiation
Classic: two parties want the same orange. One needs the juice, one needs the peel. You only find that out by asking what the demand satisfies.

## Verification Checklist
- [ ] Both demands stated in the other side's own words
- [ ] The need behind each named — a need, not a restated demand
- [ ] A shared goal found that isn't a meaningless abstraction
- [ ] Exclusivity assumptions listed explicitly
- [ ] At least one assumption tested and broken
- [ ] Proposed solution meets both needs, rather than splitting the difference

## Key Questions
- "What does each proposal actually get you?"
- "What would be achieved if both needs were met?"
- "What has to be true for these two to be incompatible?"
- "Which of those assumptions is weakest?"
- "Am I compromising, or have I actually dissolved the conflict?"

## Related Models
- `thinking-theory-of-constraints` — the parent body of work
- `thinking-steel-manning` — build the other side's case before you diagram it
- `thinking-abstraction-laddering` — climb to find the shared goal
- `thinking-situation-behavior-impact` — when the conflict is interpersonal, not structural
- `thinking-triz` — resolving contradictions in technical systems

## Source
Eliyahu Goldratt, Theory of Constraints thinking processes.

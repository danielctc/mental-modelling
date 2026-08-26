---
name: thinking-abstraction-laddering
description: When the problem statement you were handed may be the wrong one, ask "why?" to climb to a broader framing and "how?" to descend to concrete ones — then choose which rung to solve at.
---

# Abstraction Laddering

## Trigger Card

Before solving a stated problem:

1. **Write the initial problem statement** in the middle of a ladder.
2. **Ask "why do we need this?"** to climb — each answer is a broader problem statement.
3. **Ask "how might we do this?"** to descend — each answer is a more concrete statement.
4. **Pick the rung to solve at** — usually not the one you were handed.

Takes minutes. Do it whenever someone hands you a solution disguised as a requirement.

## Overview

A framing tool. Most bad work is well-executed work aimed at the wrong problem statement, and the wrong statement usually arrives pre-baked as a feature request.

**Core Principle:** "Why?" goes up (more abstract, more solution space). "How?" goes down (more concrete, more actionable). The rung you start on is rarely the right one.

```
  ▲  WHY?     "Feed people conveniently"          ← too abstract to act on
  │            ▲
  │           "Get soup out of the can"           ← reframed: new solutions appear
  │            ▲
  ●           "Design a better can opener"        ← what you were handed
  │            ▼
  │           "Make it more appealing"
  ▼  HOW?     "Add a rubber grip"                 ← too concrete, locked in
```

Wes O'Haire's canonical example: "design a better can opener" climbs to "get soup out of the can" — at which point ring-pull lids become possible, and the can opener disappears entirely.

## When to Use

- A feature request arrives phrased as a solution ("add a button that...")
- Kicking off any design or product work
- The team is stuck generating ideas — you're probably too low on the ladder
- Scoping a project, before writing the brief
- Reviewing a brief that feels oddly narrow

## When NOT to Use

- **The problem statement is genuinely fixed** by contract, regulation or a decision already made. Climbing produces frustration, not options.
- **You're mid-implementation** — reframing now is scope creep.
- **A bug.** A null pointer is not an invitation to reconsider the product.
- When climbing would be used to avoid doing the concrete work. One climb, then commit.

## The Process

### Step 1: Write the statement you were given
Verbatim. Don't improve it yet.

### Step 2: Climb — ask "why?"
"Why do we need this?" Each answer is a new, broader problem statement. Two or three rungs is usually enough; above that you hit statements so abstract nothing is excluded ("make people happy").

### Step 3: Descend — ask "how?"
From any rung, "how might we achieve this?" Each answer is a more concrete statement. Descending from a *higher* rung than you started on is where new solutions come from — the same "how" question against a wider problem gives different answers.

### Step 4: Choose the rung
Pick the highest rung you can actually act on within your constraints. Too high and you can't start; too low and you've pre-committed to a solution.

## Application Patterns

### Feature request
```
Given:  "Add a CSV export button to the directory."
  ▲ Why?  → "Let customers get their listing data out."
  ▲ Why?  → "Let customers use their data in their own tools."
  ▼ How?  → API? Scheduled email? Webhook? Google Sheets sync? CSV?

Result: the CSV button may still win — but now it's chosen, not inherited.
```

### Content brief
```
Given:  "Write an article about the new reporting rules."
  ▲ Why? → "Help small teams know what changes before the new rules land."
  ▲ Why? → "Be the place people check when regulation changes."
  ▼ How? → Article? Checklist? Deadline tracker? Email series?
```

### Internal tooling
```
Given:  "Build a dashboard for deploy status."
  ▲ Why? → "Know when a deploy broke something."
  ▼ How? → Dashboard? Alert to chat? A probe that pages? Auto-rollback?

The dashboard nobody opens loses to the alert nobody can miss.
```

## Verification Checklist
- [ ] Original statement written down before reframing
- [ ] At least two rungs climbed with "why?"
- [ ] Descended with "how?" from a rung above the starting one
- [ ] Solution options generated at the chosen rung
- [ ] Chosen rung is actionable within actual constraints
- [ ] Reframing didn't become an excuse not to start

## Key Questions
- "Why do we need this — what's it actually for?"
- "What problem does the requester believe this solves?"
- "If I solve the rung above, does this rung disappear?"
- "Am I too low (locked into a solution) or too high (can't act)?"

## Related Models
- `thinking-first-principles` — strip to fundamentals once you've picked the rung
- `thinking-jobs-to-be-done` — the "why" climb from the user's side
- `thinking-issue-trees` — decompose the chosen rung rigorously
- `thinking-productive-thinking-model` — a full framing-to-execution process

## Source
Wes O'Haire (Dropbox), "Mental models for designers"; Autodesk.

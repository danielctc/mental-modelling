---
name: thinking-decision-matrix
description: When choosing between several options on several factors, score each option per factor, weight the factors, multiply and total — turning an argument about preferences into an argument about weights, which is the argument worth having.
---

# Decision Matrix (Weighted Scoring)

## Trigger Card

When you have 2+ options and 2+ factors that matter:

1. **List the options** as rows.
2. **List the deciding factors** as columns.
3. **Score each option on each factor** (1-5).
4. **Weight each factor** (1-5) by how much it matters.
5. **Multiply and total.** Highest score wins — or tells you where your gut disagrees.

Skip for no-brainers and for decisions where one factor dominates everything else.

## Overview

A weighted scoring table. Its real value is not the number at the end — it's that it forces the implicit weights into the open. Most disagreements about options are actually disagreements about weights, and they can't be resolved while they stay hidden.

**Core Principle:** Make the factors and their weights explicit. Then argue about those, not about the conclusion.

## When to Use

- Vendor, tool or technology selection
- Hiring between shortlisted candidates
- Choosing between several viable designs
- Prioritising a shortlist where several dimensions matter
- A group is deadlocked and can't say why
- Downstream of `thinking-hard-choice-model` when it says "Big choice" or "Hard choice"

## When NOT to Use

- **One factor dominates.** If cost is a hard ceiling, filter first, then compare survivors.
- **Options are genuinely incomparable** ("apples and oranges" in `thinking-hard-choice-model`) — a total score there is false precision dressed as rigour.
- **Reversible, low-stakes decisions.** Just pick one.
- **You'll rig the weights to get the answer you already want.** That happens a lot. Set weights *before* scoring, and get someone else to set them if you can.
- Missing information is the real blocker → go and get the data.

## The Process

### Step 1: State the decision
One sentence, so the matrix doesn't drift into a different question.

### Step 2: List options
Real, available options. Include "do nothing" if it's viable — it often scores better than expected.

### Step 3: Identify factors
The things that actually matter. 3-6. If you have twelve, most are sub-factors of a few real ones.

### Step 4: Score each option per factor
Use 1-5 (1 worst, 5 best). Be consistent about direction — for cost, higher score = cheaper. Score from evidence where evidence exists.

### Step 5: Weight the factors — before you look at totals
1-5 on how much each factor matters to this decision. **Set weights before scoring if you can**, or at least before totalling. Weights set afterwards are rationalisation.

### Step 6: Multiply, total, and check your gut
Multiply each score by its factor weight, sum per option. If the winner surprises you, that's the useful moment: either your weights are wrong, or a factor is missing, or your gut was wrong. Find out which.

## Worked Example

Choosing a design tool for the team:

| Option | Cost (w5) | Prototyping (w4) | Collaboration (w3) | **Total** |
|--------|-----------|------------------|--------------------|-----------|
| Sketch | 4 → 20 | 2 → 8 | 3 → 9 | **37** |
| Figma  | 3 → 15 | 3 → 12 | 5 → 15 | **42** |
| Framer | 3 → 15 | 5 → 20 | 3 → 9 | **44** |

Framer wins narrowly. That narrowness is information: the decision hinges almost entirely on whether prototyping really outweighs collaboration. That's now the conversation to have — and it's a much better conversation than "I prefer Framer."

## Application Patterns

### Sensitivity check (do this)
Change one weight by ±1 and re-total. If the winner flips, the decision is weight-sensitive and you should discuss weights rather than trusting the total. If it holds across several perturbations, you have a robust answer.

### Group use
Have everyone weight the factors independently, then compare. The spread in weights *is* the disagreement, made visible. Score the options together.

### Hard constraints
Handle absolute requirements as a filter before the matrix, not as a heavily-weighted column. "Must run in the EU" is a gate, not a score.

## Verification Checklist
- [ ] Decision stated in one sentence
- [ ] "Do nothing" considered as an option
- [ ] 3-6 factors, non-overlapping
- [ ] Scores based on evidence where evidence exists
- [ ] Weights set before totals were seen
- [ ] Sensitivity checked — does the winner survive a ±1 weight change?
- [ ] Gut disagreement, if any, investigated rather than overruled

## Key Questions
- "What factors actually matter here?"
- "Did I set the weights before or after I knew the answer?"
- "If the winner flips when one weight moves by one point, is this really decided?"
- "What factor am I leaving out because it's hard to score?"
- "Does my gut disagree — and which of us is wrong?"

## Related Models
- `thinking-hard-choice-model` — decide whether this decision deserves a matrix at all
- `thinking-opportunity-cost` — what the losing options would have given you
- `thinking-reversibility` — cheap to undo? Then decide faster than this
- `thinking-six-thinking-hats` — generate and pressure-test the options first

## Source

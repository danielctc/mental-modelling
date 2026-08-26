---
name: thinking-issue-trees
description: When a problem is too big to attack whole, break it into MECE branches — mutually exclusive, collectively exhaustive — by asking "why?" for a problem tree or "how?" for a solution tree, then apply 80/20 to pick the branch to work.
---

# Issue Trees

## Trigger Card

When a problem is too big to solve in one piece:

1. **Write the problem** at the root.
2. **Break into branches** that are **MECE** — no overlap, complete coverage.
3. **Keep asking "why?"** (problem tree) until branches are testable.
4. **Apply 80/20** — pick the branches carrying most of the problem, from data not hunch.
5. **Then ask "how?"** on the chosen branch (solution tree).

Skip if the problem is already small or has one obvious cause.

## Overview

The consulting workhorse (McKinsey issue trees). Two kinds:

- **Problem tree** — built by asking "Why?" Decomposes a problem into its parts.
- **Solution tree** — built by asking "How?" Decomposes a chosen part into interventions.

Its discipline is **MECE**: **M**utually **E**xclusive (branches don't overlap) and **C**ollectively **E**xhaustive (branches cover the whole problem). Overlap means you'll double-count; incompleteness means the answer may be in the gap you didn't draw.

Issue trees are also a communication tool — they give other people a map of the problem, which is why they survive handover better than a list of findings.

## When to Use

- Big, vague problems: "sign-ups are down", "the platform is slow"
- Divide-and-conquer work across a team
- You need to justify *why* you're working on one part and not another
- Explaining a problem to someone who wasn't there
- Structuring an audit, an investigation, or a strategy doc

## When NOT to Use

- **Small problems.** A tree for a two-line bug is ceremony.
- **The cause space isn't cleanly separable** — complex systems with feedback resist MECE → `thinking-connection-circles`, `thinking-systems`, `thinking-iceberg-model`.
- **You need breadth of hypotheses fast** rather than rigour → `thinking-ishikawa-diagram` is quicker and messier.
- When you'd force MECE at the cost of truth. Real causes sometimes overlap; a slightly non-MECE true tree beats a tidy false one — just say which branches overlap.

## The Process

### Problem tree — asking "Why?"

**Step 1: State the root problem** with a number and a timeframe.

**Step 2: First-level branches, MECE.** The first level is usually and correctly boring:
```
Low adoption of feature X
├─ Customers don't know about the feature
└─ Customers know about it but don't use it
```
Basic — but genuinely mutually exclusive and genuinely exhaustive. That's the standard.

**Step 3: Branch further.** Keep splitting until branches are specific enough to test with data.
```
Low adoption of feature X
├─ Customers don't know about it
│   ├─ Not discoverable in the product
│   └─ Not communicated outside the product
└─ Customers know about it but don't use it
    ├─ Haven't tried it
    │   └─ Don't believe it will help them
    └─ Tried it and stopped
        ├─ Not usable
        └─ Doesn't deliver the value promised
```

**Step 4: Don't go into specific hypotheses too early.** Capture the broad categories first; the detail belongs at the leaves.

**Step 5: Apply 80/20 — from data.** Which branches carry most of the problem? Base this on measurement, not on which branch you find most interesting. This is the step that decides where the work goes.

### Solution tree — asking "How?"

**Step 6:** Take the branch you chose. Ask "How might we improve or fix this?" Map solution categories, then generate ideas within each.

The constraint helps: ideas generated against a specific branch beat ideas generated against "improve adoption".

## Application Patterns

### Revenue decomposition
```
Revenue
├─ New customers
│   ├─ Traffic × conversion rate
│   └─ Average first order value
└─ Existing customers
    ├─ Retention rate
    └─ Expansion revenue
```
Arithmetically MECE, which makes it easy to attribute a change to a branch.

### Performance investigation
```
p95 latency
├─ Time to first byte
│   ├─ Edge/cache
│   └─ Origin compute
│       ├─ Database
│       └─ Application
└─ Time to interactive
    ├─ Payload size
    └─ Client execution
```

### Structuring an audit
Each branch becomes a section, and the MECE property is your evidence of coverage — the reason you can say "we looked at everything", and mean it.

## Verification Checklist
- [ ] Root problem stated with a number and timeframe
- [ ] First-level branches genuinely mutually exclusive
- [ ] First-level branches genuinely exhaustive (what's in the gap?)
- [ ] Broad categories before specific hypotheses
- [ ] 80/20 applied using data, not preference
- [ ] Leaves are specific enough to test
- [ ] Any deliberate overlaps flagged rather than hidden

## Key Questions
- "Do these branches overlap?"
- "What's missing — what falls outside all of these?"
- "Which branch carries most of the problem, and how do I know?"
- "Is this leaf specific enough to test with data?"
- "Am I forcing MECE at the cost of the truth?"

## Related Models
- `thinking-ishikawa-diagram` — faster, category-based, tolerates overlap
- `thinking-five-whys-plus` — depth on one chain once you've picked it
- `thinking-abstraction-laddering` — check you're solving the right root first
- `thinking-theory-of-constraints` — the 80/20 branch is often the bottleneck
- `thinking-minto-pyramid` — the tree becomes the key-points layer when you write it up

## Source
Consulting problem-structuring canon (MECE, McKinsey).

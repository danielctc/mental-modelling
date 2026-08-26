---
name: thinking-confidence-speed-quality
description: When trading off shipping speed against build quality, let confidence decide — low confidence in the problem means ship fast and learn; high confidence in both problem and solution means build it properly.
---

# Confidence Determines Speed vs. Quality

## Trigger Card

Before deciding how polished to build something:

1. **How confident are you that the problem matters?** (evidence, not opinion)
2. **How confident are you that this solution is right?**
3. **Read off:** low problem confidence → **speed**. High in both → **quality**. High problem, low solution → **balance both**.
4. **Check the confidence is grounded in data, not enthusiasm.**

Always worth 30 seconds before starting a build.

## Overview

From Brandon Chu's product management mental models. Speed and quality genuinely trade off; the question is which to buy. The answer is not temperament — it's how much you actually know.

```
                          CONFIDENCE IN SOLUTION
                          Low              High
                    ┌──────────────┬──────────────┐
   CONFIDENCE  High │ BALANCE      │ QUALITY      │
   IN PROBLEM       │ Problem is   │ Build it     │
                    │ real, answer │ properly     │
                    │ isn't known  │              │
                    ├──────────────┼──────────────┤
                Low │ SPEED        │ SPEED        │
                    │ Learn before │ Doesn't      │
                    │ you invest   │ matter yet   │
                    └──────────────┴──────────────┘
```

**Core Principle:** Quality is an investment. Invest where you're confident the problem is real. Everywhere else, buy information instead.

Confidence isn't binary — it's a scale, so the answer is usually a blend rather than a corner.

## When to Use

- Starting any feature or product build
- Deciding how much test coverage, error handling and polish something needs
- Prototype vs production decisions
- Arguing with someone about whether to "do it properly"
- Deciding whether technical debt here is acceptable

## When NOT to Use

- **Safety, security, payments, auth, data integrity.** Quality is non-negotiable regardless of confidence — a throwaway prototype that handles real credentials is not a throwaway.
- **Regulatory or contractual requirements.**
- **Your confidence is a feeling.** The model explicitly requires confidence grounded in data. Enthusiasm scores zero.
- **The "fast" version will silently become permanent.** Very common. If there's no realistic path to replacing it, build the real thing.

## The Three Outcomes

### Low confidence in the problem → **speed**
You don't know if this matters. Don't invest. Build the cheapest thing that produces real evidence — a prototype, a fake door, a manual process behind a form. The output you want is information, not software.

### High confidence in problem AND solution → **quality**
You know it matters and you know how to solve it. Now quality pays: it's going to be used, extended and maintained. Cutting corners here is borrowing against a debt you will definitely be asked to repay.

### High confidence in problem, low in solution → **balance**
The problem is real; the answer isn't known. Build well enough to test properly but not so well that you can't throw it away. Concretely: solid data model, honest instrumentation, disposable UI.

## Application Patterns

### The dangerous quadrant
Low problem confidence + high solution confidence. You know exactly how to build something nobody has asked for. This is where enthusiasm produces the most waste, and it always feels productive.

### Grounding the confidence
Before scoring, ask what the evidence actually is:

| Claimed confidence | Real evidence? |
|--------------------|----------------|
| "Customers want this" | How many asked? Unprompted? |
| "This is the right approach" | Has it been built before? By whom? What happened? |
| "It'll take a week" | Compared to which past estimate that was right? |

### Interaction with reversibility
A one-way door deserves quality even at low confidence, because you can't buy the information back later. Cross-reference `thinking-reversibility`.

## Verification Checklist
- [ ] Problem confidence stated with the evidence behind it
- [ ] Solution confidence stated with the evidence behind it
- [ ] Quadrant read and approach chosen deliberately
- [ ] Safety/security/data-integrity exemptions applied regardless
- [ ] Honest answer to "will the fast version become permanent?"
- [ ] Reversibility checked

## Key Questions
- "What's my actual evidence that this problem matters?"
- "Am I confident, or am I keen?"
- "What's the cheapest thing that would raise my confidence?"
- "If I build this fast, what's the realistic path to replacing it?"
- "Is this a one-way door?"

## Related Models
- `thinking-reversibility` — one-way doors override the speed answer
- `thinking-bayesian` — how evidence should actually move confidence
- `thinking-margin-of-safety` — when the downside is severe, buy quality anyway
- `thinking-hard-choice-model` — match effort to decision type
- `thinking-impact-effort-matrix` — where the build sits in the wider queue

## Source
Brandon Chu, "Product management mental models for everyone".

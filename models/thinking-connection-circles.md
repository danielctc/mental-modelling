---
name: thinking-connection-circles
description: When causes and effects in a situation are tangled, write the key elements around a circle, draw arrows for what causes what with + or -, and look for closed loops — the loops are what actually drive the behaviour.
---

# Connection Circles

## Trigger Card

When a situation has several interacting moving parts:

1. **Draw a circle.** Write 5-10 key elements around it (nouns that increase or decrease).
2. **Draw an arrow** from each element to anything it directly causes.
3. **Mark each arrow + or −** (does it increase or decrease the target?).
4. **Find closed loops.** Those are the feedback loops running the system.

Skip if the causal chain is linear — a fishbone or five-whys is cheaper.

## Overview

The entry-level systems mapping tool: quick, visual, and it surfaces loops that linear analysis structurally cannot see. It's the drawing you make on a whiteboard when everyone in the room has a different theory of what's causing what.

**Core Principle:** Systems behave the way their loops make them behave. Find the loops.

Element selection criteria — a key element:
- matters to changes in the system,
- increases or decreases,
- can be named with a noun.

"Frustration" qualifies. "Refactor the API" does not (that's an intervention, not an element).

## When to Use

- Untangling a messy situation with multiple interacting causes
- A metric moves and nobody can agree why
- Organisational or team dynamics
- Product/growth dynamics (churn, support load, quality, velocity)
- Before proposing an intervention, to see what else it will move
- Group sessions where people hold competing causal theories

## When NOT to Use

- **Linear cause and effect** → `thinking-five-whys-plus` or `thinking-ishikawa-diagram`.
- **More than ~10 elements.** The circle stops being readable; move to a proper causal loop diagram or `thinking-concept-map`.
- **You need hierarchy or definitions** rather than causality → `thinking-concept-map`.
- **You need depth on structure and beliefs** → `thinking-iceberg-model`.
- When you'd be inventing the arrows. Hypothesised arrows are allowed but must be labelled as hypotheses.

## The Process

### Step 1: Circle and elements
Write 5-10 elements around the circumference. Nouns only, things that can go up or down. Fewer is better — the discipline of choosing is part of the work.

### Step 2: Arrows
For each pair, ask: does A *directly* cause B to change? Only direct links. Indirect ones will emerge as paths.

### Step 3: Signs
- **+** : A increases → B increases (same direction)
- **−** : A increases → B decreases (opposite direction)

### Step 4: Find the loops
Trace closed paths. Then classify:
- **Even number of − signs (including zero) → reinforcing loop.** It amplifies. Growth or collapse.
- **Odd number of − signs → balancing loop.** It stabilises, resists change, and defeats interventions.

### Step 5: Read the behaviour
Reinforcing loops explain runaway growth and death spirals. Balancing loops explain why your intervention worked for a fortnight and then stopped.

## Worked Example

Unhappy customers:

```
                    unhappy customers
                      ╱            ╲  (+)
              (+)    ╱              ▼
        bugs ◄──── new features   support tickets
          │                            │ (+)
      (+) ▼                            ▼
     unhappy customers ◄───────── response time
                          (+)

Loop found: unhappy customers → +tickets → +response time → +unhappy customers
            Zero minus signs → REINFORCING. It runs away on its own.

Second loop: unhappy customers → +new features → −unhappy customers  (balancing)
             ...but also: new features → +bugs → +unhappy customers  (reinforcing)

The fix "ship more features" feeds both loops at once. That's why it isn't working.
```

That last line is the payoff. You cannot get it from a list of causes.

## Application Patterns

### Support load
Elements: tickets, response time, customer frustration, agent burnout, agent headcount, documentation quality. The burnout loop is nearly always reinforcing and nearly always invisible until drawn.

### Delivery velocity
Elements: deadline pressure, testing time, defects, rework, velocity. The classic reinforcing trap: pressure → less testing → more defects → more rework → less velocity → more pressure.

### Content/SEO
Elements: publishing rate, article quality, rankings, traffic, revenue, headcount. Shows why raising volume can lower traffic.

## Verification Checklist
- [ ] 5-10 elements, all nouns that can increase or decrease
- [ ] Only direct causal links drawn
- [ ] Every arrow signed + or −
- [ ] At least one closed loop traced and classified
- [ ] Hypothesised arrows marked as hypotheses
- [ ] Proposed intervention checked against every loop it touches

## Key Questions
- "Which of these actually increase or decrease?"
- "Does A directly cause B, or is there something in between?"
- "Where are the closed loops?"
- "Is this loop reinforcing or balancing?"
- "Does my intervention feed a loop I didn't mean to feed?"

## Related Models
- `thinking-feedback-loops` — the mechanics of reinforcing and balancing loops
- `thinking-systems` — the wider frame
- `thinking-iceberg-model` — connection circles draw the structure layer
- `thinking-leverage-points` — where to intervene once the loops are visible
- `thinking-concept-map` — for relationships that aren't causal

## Source
Systems thinking canon (Waters Foundation lineage).

---
name: thinking-iceberg-model
description: When reacting to an event won't stop it recurring, dig down four levels — events, patterns, structures, mental models — because leverage increases the deeper you go and the visible event is the least useful layer.
---

# Iceberg Model

## Trigger Card

When something bad happened and you're about to just fix it:

1. **Event** — what happened right now?
2. **Pattern** — has this happened before? What's the trend over time?
3. **Structure** — what in the system produces that pattern? Rules, incentives, feedback loops, process.
4. **Mental model** — what beliefs, values or assumptions hold that structure in place?

Skip only if it's genuinely a one-off with no pattern behind it — and check before assuming that.

## Overview

A core systems-thinking tool. The visible event is the tip; most of the causal mass is below the waterline. Fixing at the event level guarantees repetition.

**Core Principle:** Events and patterns tell you *what*. Structures and mental models tell you *why*. Leverage grows as you go deeper.

```
              🔺  EVENTS          "A bug shipped."          ← react
        ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ waterline ─ ─ ─ ─ ─ ─ ─ ─
             ███  PATTERNS        "Every release has bugs."  ← anticipate
            █████  STRUCTURES     "QA happens after release; ← redesign
                                   deadlines are fixed."
           ███████  MENTAL MODELS "Shipping on time matters  ← transform
                                   more than quality, and
                                   pushing back isn't our place."
```

## When to Use

- Recurring incidents that keep getting "fixed"
- Postmortems, especially the second one about the same thing
- Organisational dysfunction — why does this team always miss?
- Metrics that drift back after every intervention
- Before proposing a process change, to check you're aimed below the waterline

## When NOT to Use

- **True one-offs.** A cable came out. Plug it in.
- **Live incident.** Stop the bleeding at the event level; run the iceberg at the postmortem.
- **You can't influence the deeper levels.** Naming a mental model you have no standing to change can be demoralising theatre — though naming it honestly to someone who does have standing is often the point.
- **The problem is technical, not systemic** — a race condition has a cause, not a culture.

## The Process

### Step 1: Events — what is happening right now?
State the specific, visible occurrence. One sentence.

### Step 2: Patterns — what has been happening over time?
Go and look at the history. This step needs data, not memory. Count incidents, plot the trend, check the last six occurrences. If there's no pattern, stop — it's a one-off.

### Step 3: Structures — what produces the pattern?
Structures are the relationships, rules, incentives and feedback loops inside the system:
- What's the process? Who decides? What's measured? What's rewarded?
- Where are the delays between action and consequence?
- What's the pipeline shape — where does work queue?

### Step 4: Mental models — what beliefs hold the structure up?
The hardest layer. These are rarely written down, and people rarely state them out loud because they feel like facts rather than beliefs. Signals: "that's just how it works here", "we've always...", "they'd never approve that".

### Step 5: Choose your intervention level
| Level | Intervention | Leverage | Cost |
|-------|-------------|----------|------|
| Event | Fix it | Low | Low |
| Pattern | Anticipate, add monitoring | Medium | Low |
| Structure | Redesign process/incentives | High | Medium |
| Mental model | Change the belief | Highest | Very high |

Most real progress comes from structural change. Mental-model change is the highest leverage and by far the slowest.

## Application Patterns

### Bugs in every release
```
Event:        Two bugs in the feature we shipped yesterday.
Pattern:      Every release for six months has shipped with 1-4 bugs.
Structure:    QA runs after release. Deadlines are set before scoping.
              No one is measured on defect rate.
Mental model: "Shipping on time is what we're judged on."
              "It's not our place to push back on a date."

Event fix:    Fix the two bugs.            (they'll be back next release)
Structure fix: Move QA before release; make defect rate a visible metric.
Model fix:    Leadership publicly changes a date because of quality. Once.
```

### A metric that keeps drifting back
Churn drops after every retention push and returns within a quarter. That's a balancing loop at the structure level — the intervention doesn't touch what's actually regulating it. See `thinking-feedback-loops`.

## Verification Checklist
- [ ] Pattern layer backed by actual data, not impression
- [ ] At least two structural elements named (process, incentive, loop, delay)
- [ ] At least one mental model stated as a sentence someone would actually say
- [ ] Intervention chosen at the deepest level you can genuinely influence
- [ ] Honest about which levels are out of your control

## Key Questions
- "Has this happened before? How many times?"
- "What in the system makes this the normal outcome?"
- "What would have to be true for people to behave this way rationally?"
- "What belief is holding this structure in place?"
- "Am I fixing the event because it's the only level I'm allowed to touch?"

## Related Models
- `thinking-systems` — the wider frame
- `thinking-leverage-points` — where to intervene once you can see the structure
- `thinking-feedback-loops` — the loop mechanics inside the structure layer
- `thinking-connection-circles` — draw the structure layer explicitly
- `thinking-five-whys-plus` — a lighter, more linear descent

## Source
Systems thinking canon (Donella Meadows lineage).

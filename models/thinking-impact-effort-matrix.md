---
name: thinking-impact-effort-matrix
description: When a backlog is longer than the time available, place every item by impact against effort — quick wins, major projects, fill-ins, thankless tasks — and do the quick wins first.
---

# Impact-Effort Matrix

## Trigger Card

When prioritising a list of work:

1. **For each item ask two things:** how impactful? how much effort?
2. **Place it:** High impact + Low effort → **Quick win**. High + High → **Major project**. Low + Low → **Fill-in**. Low + High → **Thankless**.
3. **Sequence:** quick wins → major projects → fill-ins. Drop the thankless.
4. **Re-run periodically** — impact and effort estimates both drift.

Skip if the list is short or the ordering is already obvious.

## Overview

A 2×2 on value versus cost. Distinct from Eisenhower, which sorts by *time pressure*; this sorts by *return on effort*. Both are useful and they answer different questions.

```
                 LOW EFFORT           HIGH EFFORT
              ┌──────────────────┬──────────────────┐
   HIGH       │ QUICK WINS       │ MAJOR PROJECTS   │
   IMPACT     │ Do first         │ Plan and commit  │
              ├──────────────────┼──────────────────┤
   LOW        │ FILL-INS         │ THANKLESS TASKS  │
   IMPACT     │ Spare time only  │ Avoid            │
              └──────────────────┴──────────────────┘
```

**Core Principle:** Return on effort, not urgency. Quick wins buy the credibility and the room to do the major projects.

## When to Use

- Backlog grooming and roadmap planning
- Post-audit: you have 40 findings and time for 6
- Technical debt triage
- Deciding where a small team's week goes
- Any long list where everything looks worth doing

## When NOT to Use

- **Deadlines are the constraint** → `thinking-eisenhower-matrix`.
- **Items are dependent on each other.** A low-impact task that unblocks three major projects is not a fill-in — sequence dependencies first.
- **Effort estimates are pure guesswork.** Garbage in. Spike the unknown ones first.
- **The list is one strategic bet.** A 2×2 on a single decision is theatre → `thinking-decision-matrix`.
- When "impact" hasn't been defined. Impact on *what*? Revenue, retention, risk, and developer time are not interchangeable.

## The Process

### Step 1: Define impact on one axis of value
Before placing anything, say what impact means here: revenue, user pain removed, risk reduced, time saved. Mixing them silently is the most common way this tool produces nonsense.

### Step 2: Estimate effort honestly
The default bias is to underestimate effort and overestimate impact — both in the same direction, both inflating the quick-wins quadrant. Get an outside estimate on anything you're keen on.

### Step 3: Place everything
Fast. First instinct, then adjust.

### Step 4: Sequence
1. **Quick wins** — do them now. They compound: they free capacity and buy trust.
2. **Major projects** — pick a small number and commit properly. Don't run four at once.
3. **Fill-ins** — genuine spare-time work only.
4. **Thankless** — delete, or ask what would shrink the effort. Sometimes a thankless task is a major project with a bad approach.

### Step 5: Re-run
Impact changes with context; effort changes as you learn. A quarterly re-placement usually moves several items.

## Application Patterns

### After a site audit
```
                 LOW EFFORT                    HIGH EFFORT
HIGH IMPACT      Fix the 12 duplicate slugs    Rebuild the search index layer
                 Add meta descriptions         Migrate the CMS
                 Unblock the WAF bot rule

LOW IMPACT       Tidy the footer links         Rewrite the 2019 archive pages
                 Update the favicon            Custom analytics dashboard
```

### Technical debt
Impact = risk reduced + developer time saved. This is where "thankless" is most valuable to name honestly: some refactors are genuinely not worth it, and saying so beats carrying them in the backlog for two years.

### Combining with Eisenhower
Impact-Effort answers *is it worth doing*. Eisenhower answers *when*. Run Impact-Effort on the backlog to decide what's in; run Eisenhower on the week to decide what's now.

## Common Failure Modes

| Failure | Fix |
|---------|-----|
| Everything lands in quick wins | Your effort estimates are optimistic. Ask someone who'd have to build it |
| Impact means five different things | Define one value axis before placing anything |
| Dependencies ignored | Map blockers first; an unblocker's impact is the impact of what it unblocks |
| Major projects all started at once | Pick one or two. Parallel major projects finish never |
| Never re-run | Diary a quarterly re-placement |

## Verification Checklist
- [ ] "Impact" defined as one thing before placing items
- [ ] Effort estimates sanity-checked by someone who'd do the work
- [ ] Dependencies identified and sequenced ahead of raw scoring
- [ ] Quick wins actually scheduled, not just admired
- [ ] Major projects limited to a number the team can finish
- [ ] Thankless quadrant either deleted or re-scoped

## Key Questions
- "Impact on what, specifically?"
- "Who estimated the effort — the person who wants it, or the person who'd build it?"
- "What does this unblock?"
- "Are we running more major projects than we can finish?"
- "Is this thankless, or is it a good outcome via a bad approach?"

## Related Models
- `thinking-eisenhower-matrix` — sequence by urgency once you know what's worth doing
- `thinking-theory-of-constraints` — the highest-impact item is usually at the bottleneck
- `thinking-opportunity-cost` — every major project is several quick wins not done
- `thinking-fermi-estimation` — size impact and effort when you have no data

## Source

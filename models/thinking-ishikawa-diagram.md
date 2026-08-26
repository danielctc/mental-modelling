---
name: thinking-ishikawa-diagram
description: When a problem has several plausible causes across different areas, map them as a fishbone — problem at the head, contributing categories as bones, candidate root causes branching off each — so you get breadth before you commit to one theory.
---

# Ishikawa Diagram (Fishbone / Cause-and-Effect)

## Trigger Card

When a problem probably has more than one cause:

1. **Write the problem** at the head of a horizontal line.
2. **Add contributing categories** as diagonal bones (People, Process, Tooling, Data, Environment, or your own).
3. **Under each, ask "why is this happening?"** and branch out candidate causes.
4. **Analyse** — gather evidence for the most likely candidates, don't just pick one.

Skip if the cause is already obvious or a single `thinking-five-whys-plus` chain resolves it cleanly.

## Overview

Created by Kaoru Ishikawa. Its job is **breadth before depth**. Five Whys drills one chain and can miss that three things went wrong at once. The fishbone forces you to populate several categories before you start believing any of them.

**Core Principle:** Enumerate causes across categories first; test them second. The diagram is a structure for thinking, not an answer.

```
   People ╲            Process ╲            Tooling ╲
     ├─ cause           ├─ cause             ├─ cause
     ├─ cause           ├─ cause             ├─ cause
      ╲                  ╲                    ╲
  ─────────────────────────────────────────────────────▶ [ PROBLEM ]
      ╱                  ╱                    ╱
     ├─ cause           ├─ cause             ├─ cause
   Data ╱            Environment ╱         Measurement ╱
```

## When to Use

- Incident and outage postmortems with more than one contributing factor
- Declining metrics (sign-ups, retention, conversion) where the cause is unknown
- Recurring problems that "get fixed" and come back
- Quality problems that span teams
- Group debugging sessions — the categories give everyone a place to contribute

## When NOT to Use

- **Single obvious cause.** Fix it. Don't hold a workshop.
- **You have logs/traces that will just tell you.** Go and read them — a fishbone of guesses is worse than one query. (Use `mcp__maple__*` or the actual traces first.)
- **You need depth on one known chain** → `thinking-five-whys-plus`.
- **The system is complex-adaptive** and causes aren't separable → `thinking-systems`, `thinking-iceberg-model`, `thinking-connection-circles`.
- As a substitute for evidence. The diagram generates hypotheses; it does not confirm them.

## The Process

### Step 1: Define the problem precisely
"Sign-ups are down" is too loose. "New sign-ups fell 34% between 1 and 20 August, concentrated on mobile" gives the bones something to attach to.

### Step 2: Choose categories
Use your own if the domain suggests them. Generic starting sets:

| Set | Categories |
|-----|-----------|
| Classic (6M) | People, Methods, Machines, Materials, Measurement, Environment |
| Software | Code, Infrastructure, Data, Deployment, Third-party, People/Process |
| Product/growth | Acquisition, Landing page, Onboarding, Product, Competition, Pricing |
| Content/SEO | Crawling, Indexing, Content quality, Backlinks, Technical, Competitors |

3-6 categories. More than that and the diagram stops helping.

### Step 3: Branch causes under each
Ask "why would this category cause the problem?" repeatedly. Write everything down, even partial explanations — real problems usually have several causes each contributing a share.

### Step 4: Analyse — the step people skip
The completed diagram is not the answer. Now:
- Which candidates can you cheaply disprove? Do those first.
- Which have data available? Pull it.
- Which would explain the *timing* as well as the effect?
- Rank by (likelihood × ease of testing).

## Application Patterns

### Sign-ups falling
```
                 Landing page ╲          Marketing ╲
                   ├─ Hero rewritten 3 Aug   ├─ Paid spend paused
                   ├─ CTA below the fold     ├─ Newsletter skipped 2 weeks
                    ╲                         ╲
  ──────────────────────────────────────────────────▶ [ Sign-ups -34% ]
                    ╱                         ╱
                   ├─ Signup 500s on iOS     ├─ New competitor free tier
                   ├─ Email verify delayed   ├─ Seasonality (August)
                 Product ╱                 Competition ╱

  → Test cheapest first: is conversion rate flat while traffic fell (marketing),
    or is traffic flat while conversion fell (page/product)?
```

### Incident postmortem
Categories: Code, Config, Infra, Monitoring, Process, Human factors. Naming "Monitoring" as a bone is what surfaces "nothing alerted for 29 minutes" — which is usually a bigger finding than the original bug.

## Verification Checklist
- [ ] Problem stated with a number and a timeframe
- [ ] 3-6 categories, chosen for this domain
- [ ] Every category populated — an empty bone means you didn't look
- [ ] Multiple candidate causes allowed to coexist
- [ ] Ranked by likelihood × cost-to-test
- [ ] At least one candidate actually tested against evidence, not just argued

## Key Questions
- "Which category have we not populated at all?"
- "Does this cause explain the timing as well as the effect?"
- "What's the cheapest candidate to disprove?"
- "Are we assuming one cause when the evidence allows three?"

## Related Models
- `thinking-five-whys-plus` — depth on one chain once the fishbone points at it
- `thinking-issue-trees` — MECE structure when you need rigour over speed
- `thinking-iceberg-model` — when the causes are structural rather than local
- `thinking-scientific-method` — testing the candidates the fishbone produced

## Source
Kaoru Ishikawa.

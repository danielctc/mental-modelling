---
name: thinking-concept-map
description: When you need to understand or explain how the parts of a domain relate, list its entities, sort general to specific, and connect them with labelled linking phrases so every pair reads as a true sentence.
---

# Concept Map

## Trigger Card

When learning, documenting or aligning on how something works:

1. **Write a focus question** — "How does X work?", "What's the context Y sits in?"
2. **List 15-25 key entities** — people, places, systems, actions, processes.
3. **Sort general → specific.**
4. **Lay them out and connect with labelled verbs** ("contributes to", "is made of", "triggers").
5. **Test:** any two connected entities plus the link should read as a true sentence.

Skip if you need causality and feedback loops rather than structure — use connection circles.

## Overview

Developed by Joseph Novak and Alberto Cañas. Concept maps externalise understanding: they show not just what the parts are, but *how* they relate, via labelled links. That label is what separates a concept map from a box-and-arrow diagram — "Designer → creates → concept map" is a claim you can be wrong about.

Novak and Cañas: *"Concept mapping has been shown to help learners learn, researchers create new knowledge, administrators to better structure and manage organisations, writers to write, and evaluators assess learning."*

**Core Principle:** Every link is labelled, and every entity-link-entity triple must read as a true sentence.

## When to Use

- Learning a new codebase, domain or system
- Documenting architecture in a way that survives being read
- Group workshops — surfaces where two people mean different things by the same word
- Before writing anything long, to map the territory
- Onboarding material
- Making sense of a domain before building a schema or a knowledge graph

## When NOT to Use

- **You need causality and feedback** → `thinking-connection-circles` or `thinking-systems`.
- **You're outside your knowledge** — a map of guesses looks authoritative and is worse than nothing. Have a reasonable base of knowledge first, or mark unknowns explicitly.
- **The structure is a simple hierarchy** — a list or a tree is cheaper.
- **Root-cause work** → `thinking-ishikawa-diagram`, `thinking-issue-trees`.
- When the map becomes the deliverable and the understanding never gets used.

## The Process

### Step 1: Formulate a focus question
Maps without focus sprawl. Good focus questions:
- "How does a support ticket get from submitted to resolved?"
- "What does a customer interact with between signing up and first value?"
- "What sits between a git push and bytes on the edge?"

Pick your angle deliberately: inner workings, or surrounding relationships? They produce different maps.

### Step 2: Identify key entities
People, places, organisations, actions, processes, activities, methods. Just a list at this stage. **15-25 is typical**; more is fine for a genuinely complex domain, but past ~40 the map stops being readable.

### Step 3: Sort general → specific
An intermediate step that pays off: sorting first gives the map a usable hierarchy rather than a hairball.

### Step 4: Outline the map
Put entities on movable objects (post-its, a whiteboard, any canvas tool). Movable matters — you'll rearrange repeatedly as relationships emerge.

Connect with lines, and **label every line with a linking verb or phrase**: "contributes to", "is made of", "creates", "depends on", "blocks", "validates".

### Step 5: Complete and test
Read each connected pair as a sentence. "Worker → validates → webhook payload." If it doesn't read as a true sentence, the link is wrong, the label is lazy, or an entity is missing between them.

Expect a few passes. The rewriting *is* the learning.

## Application Patterns

### Learning a codebase
Focus question: "What happens when a request comes in?" Entities: routes, middleware, handlers, services, models, queues, external APIs, caches. Links: "routes to", "authenticates", "reads from", "enqueues".

Where you can't label a link, you've found the part you don't understand yet. That's the map's most useful output.

### Aligning a team
Everyone maps the same focus question independently, then compare. The differences are the misalignment — usually two people using one word for two things.

### Before a knowledge graph or schema
A concept map is the human-readable draft. Entities become nodes, linking phrases become edge types. Cheaper to be wrong here than in a database.

## Verification Checklist
- [ ] Focus question written down first
- [ ] 15-25 entities identified (more only if genuinely complex)
- [ ] Sorted general → specific before laying out
- [ ] Every link labelled with a verb or phrase — no bare arrows
- [ ] Every entity-link-entity triple reads as a true sentence
- [ ] Unknown areas marked as unknown rather than guessed
- [ ] Map rearranged at least once

## Key Questions
- "What exactly am I trying to understand here?"
- "What are the entities — the nouns that matter?"
- "What verb describes this relationship precisely?"
- "Does this read as a true sentence?"
- "Which link can't I label? That's the gap."

## Related Models
- `thinking-connection-circles` — when the relationships are causal, not structural
- `thinking-systems` — the wider systems frame
- `thinking-issue-trees` — hierarchical decomposition rather than a network
- `thinking-map-territory` — the map is not the thing
- `/graphify` — the automated route once the manual map shows what the entity types are

## Source
Joseph Novak and Alberto Cañas.

---
name: thinking-situation-behavior-impact
description: When giving feedback to a person, name the situation, describe the observed behaviour without interpretation, then state the impact it had — then ask about intent. Removes judgement, lowers defensiveness, makes the feedback actionable.
---

# Situation-Behavior-Impact (SBI)

## Trigger Card

Before giving anyone feedback, structure it as:

1. **Situation** — when and where. "In yesterday's product review..."
2. **Behaviour** — what you actually observed. Not what you concluded. "...you didn't share any recent customer learnings..."
3. **Impact** — what it caused: on you, on others, on the work. "...which made me worry we're not talking to customers at all."
4. **Intent (ask, don't assume)** — "What was behind that?"

Skip if the feedback is purely factual and impersonal (a code review comment about a null check). Use it the moment a person's conduct is the subject.

## Overview

SBI™ was developed by the Center for Creative Leadership. When we perceive someone's behaviour negatively, we jump straight to a conclusion about *why* they did it, and then we deliver the conclusion as if it were the observation. "You don't care about customers" is a conclusion. "You didn't mention customer feedback" is an observation.

The recipient can argue with your conclusion. They cannot argue with what they did. That's the whole trick.

**Core Principle:** Describe what you saw, not what you decided it meant.

Works for positive feedback too — "you did great" is as unactionable as "you were sloppy."

## When to Use

- Giving critical feedback to a report, peer or manager
- 1:1s, performance conversations, retros
- Praising someone specifically enough that they can repeat it
- Raising something that's been annoying you for weeks
- Any time you notice yourself starting a sentence with "You always..." or "You never..."

## When NOT to Use

- **The issue is about the artefact, not the person.** A bug in a PR is a code review comment, not feedback about them.
- **You haven't actually observed the behaviour.** Second-hand reports don't survive the Behaviour step. Go and look first, or say explicitly that you're relaying.
- **You're too angry to describe rather than interpret.** Wait. A poorly-executed SBI reads as a prosecution.
- **It's a safeguarding, HR or legal matter.** Different process entirely.
- The relationship has no trust at all — SBI won't fix that, it will just sound clinical.

## The Process

### Step 1: Situation
Anchor the feedback in a specific time and place. Vague feedback ("sometimes in meetings") invites the recipient to picture a different meeting than the one you mean, and then disagree with you about something neither of you is actually discussing.

```
✅ "In yesterday's 10am product review, during your team's update..."
❌ "In meetings generally..."
```

### Step 2: Behaviour
Describe only what a camera would have captured. Strip every interpretation.

```
✅ "...you didn't mention any recent customer conversations..."
❌ "...you clearly haven't bothered speaking to customers..."   (conclusion)
❌ "...you seemed disengaged..."                                 (interpretation)
```

Test: could two people who were in the room both agree that this happened? If not, it's not a behaviour, it's an inference. (See `thinking-ladder-of-inference` for why this happens.)

### Step 3: Impact
Say what it caused. This is where your subjectivity is legitimate — it's YOUR reaction, named as yours.

```
✅ "...which made me worry that we're shipping without customer input,
    and I noticed two people in the room look at each other."
❌ "...which was unprofessional."                (a judgement, not an impact)
```

Impact can be personal ("I felt..."), team-level ("the room went quiet"), or business-level ("we shipped the wrong thing").

### Step 4: Ask about intent
Do not assume you know why. You are usually wrong.

```
"What was going on there?"
"Why didn't you include it this time?"
```

You will often discover there was a sound reason you couldn't see. If there wasn't, the gap between their intent and the actual impact becomes the useful conversation.

### Step 5: Encourage reflection
Feedback that isn't acted on was just criticism. Close with the forward-looking half: "What would you do differently?" — and let them answer rather than prescribing it.

## Application Patterns

### Critical feedback
```
S: "In Tuesday's incident call..."
B: "...you deployed the fix to production before the rollback plan was written."
I: "...which meant we had no way back for eleven minutes, and I was
    making decisions blind."
?: "What made you go early?"
```

### Positive feedback (be as specific)
```
S: "In the client review on Monday..."
B: "...you stopped and rewrote the pricing slide live when they pushed back."
I: "...which turned a defensive meeting into a working session — they
    signed two days later."
```

### Upward feedback (to a manager)
```
S: "When the roadmap changed last Thursday..."
B: "...the first I heard was in the all-hands."
I: "...which meant I'd spent three days building something that was
    already cut, and I couldn't answer my team's questions."
?: "How is that decision usually communicated?"
```

## Common Failure Modes

| Failure | Looks like | Fix |
|---------|-----------|-----|
| Interpretation as behaviour | "You were dismissive" | "You interrupted twice and didn't respond to the question" |
| Impact as judgement | "It was unprofessional" | "It made me lose confidence in the estimate" |
| No situation | "You always do this" | Pick one instance and describe it |
| Assumed intent | "You did it because you don't care" | Ask instead |
| Feedback sandwich | Praise / criticism / praise | Dilutes both. Give each separately and honestly |

## Verification Checklist
- [ ] One specific situation named (time and place)
- [ ] Behaviour is camera-observable — no adjectives about the person
- [ ] Impact is owned ("I felt", "the team", "the result was") not judged
- [ ] Intent was asked about, not assumed
- [ ] Recipient was invited to reflect, not told what to do
- [ ] I'd be comfortable if they repeated this conversation back to me verbatim

## Key Questions
- "What would a camera have recorded?"
- "Am I describing what they did, or what I decided it meant?"
- "What was the actual impact — on me, the team, the work?"
- "What might their reason have been that I can't see?"
- "Would they recognise this description of the event?"

## Related Models
- `thinking-ladder-of-inference` — why we mistake conclusions for observations
- `thinking-minto-pyramid` — the equivalent structure for written communication
- `thinking-steel-manning` — build their strongest reason before you talk to them
- `thinking-conflict-resolution-diagram` — when feedback becomes a standoff

## Source
"Use Situation-Behavior-Impact (SBI)™ to Understand Intent", Center for Creative Leadership. SBI and Situation-Behavior-Impact are trademarks of CCL.

---
name: thinking-ladder-of-inference
description: When you've reached a conclusion about someone or something fast, climb back down the seven rungs — data, selection, interpretation, assumption, conclusion, belief, action — to find where you left reality behind.
---

# Ladder of Inference

## Trigger Card

When you notice a strong conclusion arriving quickly:

1. **Find your rung** — are you about to act? Do you already "know" what happened?
2. **Climb down**, questioning each rung: belief → conclusion → assumption → interpretation → selected data → available data.
3. **At the bottom, ask what you ignored.**
4. **Climb back up deliberately**, this time noticing each step.

Skip when you genuinely have direct evidence and no interpretation is involved.

## Overview

Developed by Chris Argyris. We take in a tiny slice of available reality, interpret it, assume, conclude, believe, and act — usually in under a second, entirely unconsciously. The ladder makes the staircase visible so you can audit it.

```
   7. ACTIONS          "I'll stop giving them the client work."
   6. BELIEFS          "They're not reliable."
   5. CONCLUSIONS      "They don't care about this project."
   4. ASSUMPTIONS      "People who care would have prepared."
   3. INTERPRETATIONS  "They were unprepared."
   2. SELECTED DATA    "They didn't have the numbers to hand."
   1. AVAILABLE DATA    [the whole meeting; their week; everything else]
```

**Core Principle:** Everything above rung 2 is something you built. Only rung 1 happened.

The reflexive loop makes it worse: your beliefs at rung 6 feed back down and determine what data you select at rung 2. That's how a wrong conclusion becomes self-confirming.

## When to Use

- Before giving feedback about someone's conduct (pairs with `thinking-situation-behavior-impact`)
- When you're certain and it happened fast
- Conflict — yours or refereeing someone else's
- Hiring decisions and performance reviews
- Debugging, when you've decided what's wrong before reading the logs
- Reading a metric and immediately knowing why it moved

## When NOT to Use

- **You have direct, complete evidence.** The build failed; the log says why. No inference happened.
- **Time-critical action** — decide, act, then audit afterwards.
- **As a weapon in an argument.** "You're on the ladder" is a way to dismiss someone, not a tool.
- Trivial conclusions. You don't need to audit your belief that the kettle is boiling.

## The Process

### Step 1: Locate yourself
Which rung are you on? Most people notice at rung 6 or 7 — when they're about to act, or have already decided what someone is like.

### Step 2: Climb down, one question per rung

| Rung | Ask |
|------|-----|
| **Actions** | Why do I believe this is the right action? What alternatives exist? |
| **Beliefs** | What do I believe here? What conclusions is that built on? |
| **Conclusions** | Why did I conclude that? What assumption sits under it? |
| **Assumptions** | Is that assumption valid? Why am I assuming it? |
| **Interpretations** | Am I reading this objectively? What else could it mean? |
| **Selected data** | What did I ignore? What sources didn't I look at? |
| **Available data** | What was actually there? |

### Step 3: Notice the reasoning change
Your conclusion often shifts during the descent. That's the tool working, not a failure.

### Step 4: Climb back up deliberately
Rebuild — this time with the data you'd skipped, and stating each interpretation as an interpretation.

### Step 5: Test it out loud
"I noticed X, and I read that as Y — is that right?" This converts a private ladder into a shared one, and it's how you use it on someone else's reasoning without accusing them of anything.

## Application Patterns

### About a person
```
Action:         "Stop assigning them client work."
Belief:         "They're unreliable."
Conclusion:     "They don't care about the project."
Assumption:     "Anyone who cared would have brought numbers."
Interpretation: "They were unprepared."
Selected data:  "They didn't have last week's figures."
Available data:  They joined the meeting from a hospital car park.
                 They'd sent the figures by email that morning.
```

### About a system
```
Action:         "Roll back the deploy."
Conclusion:     "The deploy broke search."
Assumption:     "Nothing else changed at 14:02."
Interpretation: "Search went down right after the deploy."
Selected data:  "Error rate spiked at 14:02; deploy was 14:01."
Available data:  A migration ran at 14:00. Traffic tripled at 13:58.
```

Post-hoc reasoning in incidents is a ladder problem, and it's expensive.

### About a metric
"Traffic is down because Google penalised us" is rung 5. Rung 1 might be that a redirect chain broke, or the property is www and you've been reading the non-www one.

## Verification Checklist
- [ ] Current rung identified
- [ ] Each rung questioned on the way down, not skipped
- [ ] At rung 2, actively named what was ignored
- [ ] Rung 1 distinguished from rung 3 (what happened vs what it meant)
- [ ] Interpretation stated as interpretation when shared with others
- [ ] Checked whether an existing belief shaped what data got selected

## Key Questions
- "What did I actually observe, versus what did I decide it meant?"
- "What data did I ignore because it didn't fit?"
- "What would have to be true for their behaviour to be reasonable?"
- "Am I selecting evidence to confirm what I already believe?"
- "Could I say this out loud as 'I noticed X and read it as Y'?"

## Related Models
- `thinking-situation-behavior-impact` — deliver the feedback once you've climbed down
- `thinking-debiasing` — the biases that make the climb automatic
- `thinking-steel-manning` — build their best reasoning, not your worst reading of it
- `thinking-map-territory` — your model of them is not them
- `thinking-scientific-method` — test the conclusion instead of acting on it

## Source
Chris Argyris; popularised in Peter Senge's "The Fifth Discipline".

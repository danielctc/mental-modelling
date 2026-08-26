#!/usr/bin/env python3
"""An LLM writes the catalogue card (category, blurb, question) for each model."""
import os, json, re, sys, time, urllib.request

KEY = os.environ["OPENROUTER_API_KEY"]
MODEL = "z-ai/glm-5.3-flash"
CATS = ["Problem solving","Decision making","Systems thinking","Communication",
        "Risk","Innovation","Evaluation","Estimation","Self-awareness"]

SYS = f"""You write catalogue cards for a library of thinking tools.

For each tool you are given a slug, a title and a long description, output:
  category  — EXACTLY one of: {", ".join(CATS)}
  blurb     — ONE sentence, 8-16 words, plain UK English, sentence case, no full stop at the end.
              It says what the tool DOES FOR YOU, not what it is. Imperative or descriptive.
              Examples of the target register:
                "Identify root causes of problems"
                "Prioritise your actions and tasks by importance and urgency"
                "Give clearer feedback to others without judgement"
                "Make your communication more efficient and clear"
  question  — the one plain-English question a person would be asking when they need this tool.
              Written as they'd think it, first person, ending in a question mark.
              e.g. "Why does this keep happening?" / "How do I tell them without a row?"

UK English (organise, prioritise, behaviour, judgement). No em dashes. No colons in the blurb.
Never invent capability the description doesn't support.
Return ONLY a JSON array, one object per tool, keys: slug, category, blurb, question."""

def call(batch):
    payload = json.dumps({
        "model": MODEL,
        "messages": [
            {"role":"system","content":SYS},
            {"role":"user","content":json.dumps(batch, ensure_ascii=False)},
        ],
        "max_tokens": 8000,
        "temperature": 0.3,
    }).encode()
    req = urllib.request.Request("https://openrouter.ai/api/v1/chat/completions", data=payload,
        headers={"Authorization":f"Bearer {KEY}","Content-Type":"application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        d = json.load(r)
    txt = d["choices"][0]["message"]["content"] or ""
    m = re.search(r'\[.*\]', txt, re.S)
    if not m: raise SystemExit("no JSON in ox reply:\n"+txt[:2000])
    return json.loads(m.group(0)), d["usage"]

import concurrent.futures as cf
models = json.load(open("data/models.raw.json"))
slim = [{"slug":m["slug"],"title":m["title"],"description":m["description"]} for m in models]
B = 5
batches = [slim[i:i+B] for i in range(0, len(slim), B)]
def work(b):
    for attempt in range(4):
        try: return call(b)
        except Exception as e:
            print("  retry", attempt+1, type(e).__name__, e, flush=True); time.sleep(4)
    raise SystemExit("ox failed on "+b[0]["slug"])
cards, cost = [], 0.0
with cf.ThreadPoolExecutor(max_workers=6) as ex:
    for got, usage in ex.map(work, batches):
        cost += usage.get("cost", 0); cards += got
        print(f"  {len(cards):>2}/{len(slim)}", flush=True)
by = {c["slug"]: c for c in cards}
missing = [m["slug"] for m in models if m["slug"] not in by]
if missing: raise SystemExit("missing cards: "+", ".join(missing))
bad = [c["slug"] for c in cards if c["category"] not in CATS]
if bad: raise SystemExit("bad categories: "+", ".join(bad))
json.dump(by, open("data/cards.json","w"), indent=1, ensure_ascii=False)
print(f"ok: {len(cards)} cards, ${cost:.4f}")

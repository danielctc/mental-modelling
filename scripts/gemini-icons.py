#!/usr/bin/env python3
"""Gemini draws one icon per model. Charcoal geometry on white, no text."""
import os, json, re, time, urllib.request, xml.etree.ElementTree as ET
import concurrent.futures as cf

KEY = os.environ["GEMINI_API_KEY"]
# 3.1 Pro over 3.7 Flash: Flash drew looser, less consistent marks across the set.
MODEL = os.environ.get("ICON_MODEL", "gemini-3.1-pro-preview")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={KEY}"

SPEC = """You draw icons for a library of thinking tools.

THE STYLE — follow it exactly, every icon must look like it came from the same set:
- A single 64x64 viewBox. Artwork occupies roughly x/y 8..56 so it breathes.
- ONE colour only: #31363B. No fills other than #31363B, no gradients, no white shapes,
  no opacity, no other hex values anywhere.
- Built from primitive geometry: circles, lines, rectangles, simple paths, arrows.
- Two circle treatments, used together for contrast:
    SOLID node:   <circle cx=".." cy=".." r="5.5" fill="#31363B"/>
    RING node:    <circle cx=".." cy=".." r="5.5" fill="none" stroke="#31363B" stroke-width="4"/>
- Connectors: <line> or <path> with stroke="#31363B" stroke-width="4" stroke-linecap="round"
  and fill="none". Never thinner than 3.5, never thicker than 5.
- Chunky and confident. Few elements — 3 to 9 shapes. Legible at 28px.
- ABSOLUTELY NO TEXT, no letters, no numbers, no <text> element.
- No <script>, <image>, <foreignObject>, <style>, <defs>, <use>, or CSS classes.

THE IDEA: the icon must diagram the SHAPE of the tool's thinking, not illustrate its topic.
A hierarchy of causes is a branching tree of nodes. A 2x2 is four squares. A pyramid is a
triangle of stacked bands. A loop is a circle with an arrowhead. A ladder is rungs. An
iceberg is a shape with a horizontal waterline crossing it. Someone who knows the tool
should recognise it; someone who doesn't should still see a clean abstract mark.

Return ONLY a JSON array, one object per tool: {"id": "...", "svg": "<svg viewBox=\\"0 0 64 64\\" ...>...</svg>"}
The svg element must carry viewBox="0 0 64 64" and nothing else except xmlns."""

OK = {"svg","g","circle","line","path","rect","polygon","polyline","ellipse"}

def call(batch):
    body = json.dumps({
        "systemInstruction": {"parts": [{"text": SPEC}]},
        "contents": [{"role":"user","parts":[{"text": json.dumps(batch, ensure_ascii=False)}]}],
        "generationConfig": {"temperature": 0.55, "maxOutputTokens": 32000},
    }).encode()
    req = urllib.request.Request(URL, data=body, headers={"Content-Type":"application/json"})
    with urllib.request.urlopen(req, timeout=600) as r:
        d = json.load(r)
    parts = d["candidates"][0]["content"]["parts"]
    txt = "".join(p.get("text","") for p in parts)
    m = re.search(r'\[.*\]', txt, re.S)
    if not m: raise ValueError("no JSON array in reply: " + txt[:400])
    return json.loads(m.group(0))

def clean(svg: str, mid: str) -> str:
    svg = svg.strip()
    if not svg.startswith("<svg"): raise ValueError(f"{mid}: not an svg")
    low = svg.lower()
    for bad in ("<script","<image","<foreignobject","<style","<use","javascript:","<text"):
        if bad in low: raise ValueError(f"{mid}: contains {bad}")
    root = ET.fromstring(re.sub(r'\sxmlns="[^"]*"', "", svg))   # parse without ns for tag checks
    for el in root.iter():
        tag = el.tag.split("}")[-1]
        if tag not in OK: raise ValueError(f"{mid}: disallowed <{tag}>")
    hexes = set(h.lower() for h in re.findall(r'#[0-9a-fA-F]{3,6}', svg))
    if hexes - {"#31363b"}: raise ValueError(f"{mid}: stray colours {hexes}")
    root.set("viewBox", "0 0 64 64")
    root.attrib.pop("width", None); root.attrib.pop("height", None)
    root.attrib.pop("xmlns", None)
    out = ET.tostring(root, encoding="unicode")
    out = re.sub(r'\s+', ' ', out).replace("> <", "><").strip()
    if len(out) > 4000: raise ValueError(f"{mid}: {len(out)} bytes, too big")
    return out

models = json.load(open("data/models.raw.json"))
cards = json.load(open("data/cards.json"))
slim = [{"id": m["slug"].removeprefix("thinking-"), "title": m["title"],
         "what": cards[m["slug"]]["blurb"],
         "shape": m["description"][:260]} for m in models]

B = 5
batches = [slim[i:i+B] for i in range(0, len(slim), B)]
def work(b):
    ids = {x["id"] for x in b}
    for attempt in range(4):
        try:
            got = call(b)
            out = {}
            for g in got:
                if g.get("id") in ids:
                    out[g["id"]] = clean(g["svg"], g["id"])
            if set(out) == ids: return out
            raise ValueError(f"got {sorted(out)} want {sorted(ids)}")
        except Exception as e:
            print("  retry", attempt+1, type(e).__name__, str(e)[:160], flush=True); time.sleep(4)
    raise SystemExit("gemini failed on " + ",".join(sorted(ids)))

icons = {}
with cf.ThreadPoolExecutor(max_workers=5) as ex:
    for got in ex.map(work, batches):
        icons.update(got); print(f"  {len(icons):>2}/{len(slim)}", flush=True)

json.dump(icons, open("data/icons.json","w"), indent=1)
print(f"ok: {len(icons)} icons, avg {sum(len(v) for v in icons.values())//len(icons)} bytes")

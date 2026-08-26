#!/usr/bin/env python3
"""models/*.md -> data/models.raw.json. Run after scripts/sync-models.sh."""
import os, re, json

SRC = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models")
out = []
for f in sorted(os.listdir(SRC)):
    if not f.endswith(".md"):
        continue
    t = open(os.path.join(SRC, f)).read()
    m = re.search(r"^---\n(.*?)\n---\n(.*)$", t, re.S)
    if not m:
        raise SystemExit(f"{f}: no frontmatter")
    fm, body = m.group(1), m.group(2)
    desc = re.search(r"^description:\s*(.*?)(?=\n[a-z_]+:|\Z)", fm, re.S | re.M)
    title = re.search(r"^#\s+(.+)$", body, re.M)
    out.append({
        "slug": f[:-3],
        "description": " ".join(desc.group(1).split()) if desc else "",
        "title": title.group(1).strip() if title else f[:-3],
        "markdown": body.strip(),
        "chars": len(body),
    })
json.dump(out, open("data/models.raw.json", "w"), indent=1)
print(f"{len(out)} models, {sum(m['chars'] for m in out)//1000}k chars")

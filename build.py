#!/usr/bin/env python3
"""Validate Tollgate content and build dist/index.html."""
import json, re, sys, glob, os, importlib, difflib
from pathlib import Path
import yaml, markdown
from scipy import stats

ROOT = Path(__file__).parent
STRICT = "--strict" in sys.argv
errors, warnings = [], []

def err(m): errors.append(m)
def warn(m): warnings.append(m)

# ---------- load ----------
bok = json.loads((ROOT / "content/bok.json").read_text())
PHASES = [p["key"] for p in bok["phases"]]
CODE = {p["key"]: p["code"] for p in bok["phases"]}
SECTIONS = {}   # "2.4" -> {phase, title, subtopics}
for p in bok["phases"]:
    for s in p["sections"]:
        SECTIONS[s["id"]] = {"phase": p["key"], "title": s["title"], "subtopics": s["subtopics"]}
SCHEDULE = {d["day"]: d for d in bok["schedule"]}
LESSON_DAYS = {d for d, v in SCHEDULE.items() if v["kind"] == "lesson"}

glossary = json.loads((ROOT / "content/glossary.json").read_text()) if (ROOT / "content/glossary.json").exists() else []
gl_terms = {}
for g in glossary:
    for k in [g["term"]] + g.get("aliases", []):
        key = k.lower()
        if key in gl_terms: err(f"glossary: duplicate term/alias '{k}'")
        gl_terms[key] = g["term"]
    if g.get("lesson_day") not in LESSON_DAYS: err(f"glossary '{g['term']}': lesson_day {g.get('lesson_day')} is not a lesson day")

questions = []
for f in sorted(glob.glob(str(ROOT / "content/questions/*.json"))):
    try:
        qs = json.loads(Path(f).read_text())
    except Exception as e:
        err(f"{f}: invalid JSON: {e}"); continue
    for q in qs:
        q["_file"] = os.path.basename(f)
    questions += qs

lessons = []
for f in sorted(glob.glob(str(ROOT / "content/lessons/*.md"))):
    txt = Path(f).read_text()
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", txt, re.S)
    if not m: err(f"{f}: missing front matter"); continue
    try:
        fm = yaml.safe_load(m.group(1))
    except Exception as e:
        err(f"{f}: bad YAML: {e}"); continue
    fm["_file"] = os.path.basename(f); fm["_body"] = m.group(2)
    lessons.append(fm)

# ---------- validate questions ----------
ids = set(); stems = []
REQ = ["id", "phase", "section", "subtopic", "type", "difficulty", "stem", "options", "answer", "explanation", "distractor_notes", "lesson_day"]
for q in questions:
    qid = q.get("id", "?")
    for k in REQ:
        if k not in q: err(f"{qid}: missing '{k}'")
    if qid in ids: err(f"duplicate id {qid}")
    ids.add(qid)
    if q.get("phase") not in PHASES: err(f"{qid}: bad phase {q.get('phase')}")
    sec = SECTIONS.get(q.get("section"))
    if not sec: err(f"{qid}: unknown section {q.get('section')}")
    else:
        if sec["phase"] != q.get("phase"): err(f"{qid}: section {q['section']} belongs to {sec['phase']}, not {q['phase']}")
        if q.get("subtopic") not in sec["subtopics"]: err(f"{qid}: subtopic '{q.get('subtopic')}' not in section {q['section']}")
    m = re.match(r"^([DMAIC])-(\d\.\d)-(\d{3})$", qid)
    if not m: err(f"{qid}: id format")
    elif q.get("phase") in CODE and (m.group(1) != CODE[q["phase"]] or m.group(2) != q.get("section")): err(f"{qid}: id does not match phase/section")
    if q.get("type") not in ("concept", "calculation", "interpretation"): err(f"{qid}: bad type")
    if q.get("difficulty") not in (1, 2, 3): err(f"{qid}: difficulty must be 1-3")
    opts = q.get("options", [])
    if not (isinstance(opts, list) and len(opts) == 4): err(f"{qid}: need 4 options")
    elif len({o.strip().lower() for o in opts}) != 4: err(f"{qid}: options not distinct")
    if not isinstance(q.get("answer"), int) or not 0 <= q.get("answer", -1) <= 3: err(f"{qid}: answer index")
    dn = q.get("distractor_notes")
    if not (isinstance(dn, list) and len(dn) == 4): err(f"{qid}: distractor_notes must have 4 entries")
    else:
        if isinstance(q.get("answer"), int) and 0 <= q["answer"] <= 3:
            if dn[q["answer"]] is not None: err(f"{qid}: distractor_notes at the correct index must be null")
            if any(dn[i] in (None, "") for i in range(4) if i != q["answer"]): err(f"{qid}: missing distractor note")
    if q.get("lesson_day") not in LESSON_DAYS: err(f"{qid}: lesson_day {q.get('lesson_day')} is not a lesson day")
    for o in opts:
        if re.search(r"\b(all|none) of the above\b", o, re.I): err(f"{qid}: '{o}' not allowed")
    if len(q.get("explanation", "")) < 40: err(f"{qid}: explanation too short")
    stems.append((qid, re.sub(r"\W+", " ", q.get("stem", "")).lower().strip()))
    if q.get("type") == "calculation":
        if "generator" not in q or "params" not in q: err(f"{qid}: calculation question needs generator and params")
        else:
            try:
                mod, fn = q["generator"].split(":")
                g = importlib.import_module(f"generators.{mod[:-3] if mod.endswith('.py') else mod}")
                res = getattr(g, fn)(**q["params"])
                correct, tol = res["correct"], res.get("tolerance", 0.0)
                def num(s):
                    m = re.search(r"-?\d[\d,]*\.?\d*", s.replace("−", "-"))
                    return float(m.group(0).replace(",", "")) if m else None
                vals = [num(o) for o in opts]
                ans = vals[q["answer"]] if 0 <= q["answer"] <= 3 else None
                if ans is None or abs(ans - correct) > tol + 1e-9:
                    err(f"{qid}: keyed option value {ans} != generator result {correct:.6g} (tol {tol})")
                for i, v in enumerate(vals):
                    if i != q["answer"] and v is not None and abs(v - correct) <= tol + 1e-9:
                        err(f"{qid}: distractor {i} also matches the correct value")
            except Exception as e:
                err(f"{qid}: generator failed: {e!r}")

# near-duplicate stems
for i in range(len(stems)):
    for j in range(i + 1, len(stems)):
        a, b = stems[i][1], stems[j][1]
        if len(a) > 40 and difflib.SequenceMatcher(None, a, b).ratio() > 0.92:
            warn(f"near-duplicate stems: {stems[i][0]} / {stems[j][0]}")

# ---------- validate lessons ----------
BLOCKS = ["## The Idea", "## Worked Example", "## Formula Card", "## Exam Traps", "## Check Questions", "## Applied Task"]
seen_days = set()
ACRONYM_OK = {"USL", "LSL", "PDF", "HTML", "JSON", "ID", "OK", "IASSC", "PEOPLECERT", "AU", "UK", "US", "USA", "GE", "AM", "PM"}
for L in lessons:
    f = L["_file"]
    for k in ["day", "week", "phase", "title", "minutes", "bok_sections", "objectives", "glossary_terms"]:
        if k not in L: err(f"{f}: front matter missing {k}")
    d = L.get("day")
    if d not in LESSON_DAYS: err(f"{f}: day {d} is not a lesson day in the schedule")
    if d in seen_days: err(f"{f}: duplicate day {d}")
    seen_days.add(d)
    if d in SCHEDULE and SCHEDULE[d]["kind"] == "lesson":
        if SCHEDULE[d]["phase"] != L.get("phase"): err(f"{f}: phase should be {SCHEDULE[d]['phase']}")
        if SCHEDULE[d]["week"] != L.get("week"): err(f"{f}: week should be {SCHEDULE[d]['week']}")
    for s in L.get("bok_sections", []):
        if s not in SECTIONS: err(f"{f}: unknown bok section {s}")
    body = L["_body"]
    pos = -1
    for b in BLOCKS:
        p = body.find(b + "\n")
        if p < 0: err(f"{f}: missing block '{b}'")
        elif p < pos: err(f"{f}: block '{b}' out of order")
        pos = max(pos, p)
    m = re.search(r"## Check Questions\n(.*?)\n## ", body, re.S)
    cq = re.findall(r"^- +([DMAIC]-\d\.\d-\d{3})\s*$", m.group(1), re.M) if m else []
    if len(cq) != 5: err(f"{f}: Check Questions must list exactly 5 ids (found {len(cq)})")
    for c in cq:
        if c not in ids: err(f"{f}: check question {c} not in bank")
    L["_check"] = cq
    for t in L.get("glossary_terms", []):
        if t.lower() not in gl_terms: err(f"{f}: glossary term '{t}' not defined in glossary.json")
    # acronym-before-expansion heuristic: any ALLCAPS token 3+ letters must appear in parentheses or be a glossary term
    plain = re.sub(r"`[^`]*`|```.*?```", " ", body, flags=re.S)
    for acr in sorted(set(re.findall(r"\b[A-Z]{3,}\b", plain))):
        if acr in ACRONYM_OK or acr.lower() in gl_terms: continue
        if not re.search(r"\(" + acr + r"\)", plain) and not re.search(acr + r"\s*\(", plain):
            warn(f"{f}: acronym {acr} used without expansion or glossary entry")
    words = len(plain.split())
    if words < 900: warn(f"{f}: lesson is short ({words} words)")

# ---------- coverage ----------
from collections import Counter, defaultdict
by_phase = Counter(q["phase"] for q in questions if "phase" in q)
by_sec = Counter(q["section"] for q in questions if "section" in q)
by_sub = Counter((q["section"], q["subtopic"]) for q in questions if "section" in q)
lessons_by_sec = defaultdict(list)
for L in lessons:
    for s in L.get("bok_sections", []): lessons_by_sec[s].append(L.get("day"))
print("\n=== Coverage ===")
for p in bok["phases"]:
    print(f"{p['key']}: {by_phase.get(p['key'],0)} questions")
    for s in p["sections"]:
        print(f"  {s['id']} {s['title']}: {by_sec.get(s['id'],0)} q, lessons {sorted(lessons_by_sec.get(s['id'],[]))}")
        for st in s["subtopics"]:
            n = by_sub.get((s["id"], st), 0)
            flag = "" if n >= 3 else "  <-- fewer than 3"
            print(f"      {st}: {n}{flag}")
            if n < 3: (err if STRICT else warn)(f"subtopic '{st}' ({s['id']}) has {n} questions")
        if not lessons_by_sec.get(s["id"]): (err if STRICT else warn)(f"section {s['id']} has no lesson")
types = Counter(q.get("type") for q in questions); diff = Counter(q.get("difficulty") for q in questions)
print(f"Total {len(questions)} | types {dict(types)} | difficulty {dict(diff)} | lessons {len(lessons)} | glossary {len(glossary)}")
missing_lessons = sorted(LESSON_DAYS - seen_days)
if missing_lessons: (err if STRICT else warn)(f"lesson days without a lesson file: {missing_lessons}")

# ---------- report ----------
for w in warnings: print("WARN", w)
for e in errors: print("ERROR", e)
if errors:
    print(f"\n{len(errors)} error(s). Build failed."); sys.exit(1)

# ---------- build ----------
md = markdown.Markdown(extensions=["tables", "fenced_code", "sane_lists"])
out_lessons = []
for L in sorted(lessons, key=lambda x: x["day"]):
    body = L["_body"]
    # split blocks
    parts = {}
    for i, b in enumerate(BLOCKS):
        start = body.find(b + "\n") + len(b) + 1
        end = body.find(BLOCKS[i + 1] + "\n") if i + 1 < len(BLOCKS) else len(body)
        parts[b[3:]] = body[start:end].strip()
    html = {k: md.reset().convert(v) for k, v in parts.items() if k != "Check Questions"}
    out_lessons.append({"day": L["day"], "week": L["week"], "phase": L["phase"], "title": L["title"], "minutes": L["minutes"],
                        "sections": L["bok_sections"], "objectives": L["objectives"], "terms": L["glossary_terms"],
                        "check": L["_check"], "html": html})
for q in questions:
    q.pop("_file", None)
    q["stem_html"] = md.reset().convert(q["stem"])
    q["options_html"] = [md.reset().convert(o) for o in q["options"]]
    q["explanation_html"] = md.reset().convert(q["explanation"])
    q["distractor_html"] = [md.reset().convert(d) if d else None for d in q["distractor_notes"]]
    for k in ("stem", "options", "explanation", "distractor_notes", "params"): q.pop(k, None)
for g in glossary:
    g["definition_html"] = md.reset().convert(g["definition"])

# Z table 0.00..3.99 cumulative
ztable = [[round(float(stats.norm.cdf(z + c / 100)), 4) for c in range(10)] for z in [i / 10 for i in range(0, 40)]]
data = {"bok": bok, "lessons": out_lessons, "questions": questions, "glossary": glossary, "ztable": ztable,
        "built": __import__("datetime").date.today().isoformat()}
tpl = (ROOT / "app/index.html").read_text()
js = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</script", "<\\/script")
out = tpl.replace("/*__DATA__*/null", js).replace("/*__APP__*/", (ROOT / "app/app.js").read_text().replace("</script", "<\\/script"))
(ROOT / "dist").mkdir(exist_ok=True)
(ROOT / "dist/index.html").write_text(out)
print(f"\nBuilt dist/index.html ({len(out)/1024:.0f} KB)")

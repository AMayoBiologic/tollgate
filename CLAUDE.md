# Tollgate — Claude Code instructions

Tollgate is a single-file self-study app for the IASSC Certified Lean Six Sigma Green Belt exam (100 multiple-choice questions, 180 minutes, 70% to pass, on-screen calculator and reference sheet). One learner, starting from zero knowledge, studying ~2 hours a day for 6 weeks on a phone and a laptop.

The app shell, build pipeline, validation, calculators, mocks and the design are **done**. Your job in this repo is **content**: lessons, glossary and the question bank, delivered in batches, each validated by `build.py` and reviewed blind.

## Layout

- `content/bok.json` — the official IASSC Green Belt Body of Knowledge (sections and subtopics) plus the 30-day schedule. **Scope is this file and nothing else.** Design of experiments is Black Belt and is out.
- `content/lessons/NN-slug.md` — one file per lesson day. Format in `CONTENT_FORMAT.md`. Day 1 is written and is the model for tone, depth and structure.
- `content/glossary.json` — every defined term. The learner asked for a large glossary; err towards more terms, each 1–3 plain sentences.
- `content/questions/{define,measure,analyse,improve,control}.json` — the bank. Schema in `CONTENT_FORMAT.md`.
- `generators/stats.py` — numpy/scipy functions that compute answers for calculation questions. Every calculation question carries `"generator": "stats:<fn>"` and `"params": {...}`; the build recomputes and fails on mismatch. Add functions there if a question needs one; never hand-type a computed answer.
- `build.py` — validates everything and writes `dist/index.html`. Run `python3 build.py` after every change. Run `python3 build.py --strict` for the final batch (coverage warnings become errors).
- `app/` — the app template and JS. Do not change these for content work. If you find a rendering bug, fix it minimally and re-run `node tests/smoke.mjs` (needs `npm i playwright`; Chromium via `npx playwright install chromium`).
- `.github/workflows/pages.yml` — builds and publishes `dist/` to GitHub Pages on push to `main`.

## Content rules (apply to every batch)

1. The learner has never heard of Lean, Six Sigma or statistics. Define every term at first use; expand every acronym at first use; no "simply", "obviously", "just".
2. Plain Australian English (analyse, centre, programme). Directive and clear. No motivational lines, no hyperbole, no rhetorical questions as section closers.
3. Lessons are ~50 minutes of study: 1 000–1 600 words in The Idea, a worked example with numbers the learner can follow on a calculator, a formula card naming every symbol, exam traps listing the specific mistakes questions exploit, exactly 5 check-question IDs, and an applied task that asks the learner to apply the tool to **their own improvement project using their organisation's historical data** and produce something they can paste to a coach.
4. Every subtopic in `bok.json` that a lesson's `bok_sections` covers must be taught in that lesson. Check with the coverage report `build.py` prints.
5. Questions: ~40% concept, ~30% calculation, ~30% interpretation (reading ANOVA tables, regression output, capability reports, control-chart descriptions, gage R&R tables, rendered as Markdown tables or fenced software-style output). Contexts: generic manufacturing, logistics, healthcare, service, matching the real exam. One correct answer; no "all/none of the above"; 4 distinct, plausible options. Difficulty spread 30/50/20 (1/2/3). At least 1 in 10 needs two steps (compute, then interpret against a limit).
6. Distractors come from named common errors: sample vs population standard deviation, one- vs two-tailed, Cp vs Cpk, wrong degrees of freedom, p-value vs alpha misread, forgetting or double-applying the 1.5 shift, %study variation vs %tolerance, "accept H₀" wording, confusing Type I and Type II. Every distractor note says which error produces it.
7. Explanations: 2–4 plain sentences, name the lesson day in brackets, e.g. "(Day 11)".
8. Mark exactly 5 questions per lesson with `"check": true` and list those IDs in the lesson's Check Questions block. Check questions should be difficulty 1–2 and cover different subtopics of the lesson.
9. Glossary: add every term the lesson introduces. `lesson_day` is the day that teaches it. Use `aliases` for acronyms and synonyms.

## Batch procedure

For each batch below:

1. Write the lessons first, then the glossary entries, then the questions. Use the coverage report to hit the per-section targets.
2. Run `python3 build.py`. Fix every ERROR. Warnings about future batches are expected.
3. **Blind re-answer review.** Spawn a fresh subagent (Task tool) that has not seen the authoring. Give it only the stem and options of every non-calculation question in the batch (no key, no explanation) and ask it, as a Master Black Belt, to answer each and to flag any question it considers ambiguous or having more than one defensible answer. Compare its answers with the keys. Every disagreement or flag is fixed or deleted. Record the agreement rate in `REVIEW.md`.
4. **Lesson review.** Spawn a second fresh subagent to read each lesson for teaching errors, terms used before they are defined, anything outside Green Belt scope, and anything a zero-knowledge reader would not follow. Fix what it finds.
5. Append what changed to `REVIEW.md` under a heading for the batch.
6. Run `python3 build.py` again, then `git add -A && git commit -m "Batch N: ..."` and push. Pages publishes `dist/index.html`.

If a batch is too large for one run, do lessons, then questions, then reviews as separate runs.

## Batches

Targets are minimums. Bank total after Batch 6: ~370 (Define 70, Measure 80, Analyse 80, Improve 70, Control 70). Every subtopic ≥3 questions.

### Batch 1 — Define (Days 1–5). Day 1 is done; write Days 2–5.
- Day 2 "Lean and the Seven Wastes" — BoK 1.4: understanding Lean, history of Lean, Lean and Six Sigma together, the seven wastes (IASSC counts seven: transport, inventory, motion, waiting, overproduction, over-processing, defects), 5S.
- Day 3 "Variation, Metrics and the Cost of Poor Quality" — BoK 1.2: variation as the enemy, DPU, DPO, DPMO, FTY, RTY, cycle time, cost of poor quality categories, Pareto analysis and the 80:20 rule. Introduce the 1.5-sigma shift here in plain terms.
- Day 4 "Customers, CTQs and the Project Charter" — BoK 1.1 (VOC/VOB/VOE deeper), 1.2 (CTQs, defining a process), 1.3 (business case, charter elements: problem statement, goal statement, scope, team, timeline, business case).
- Day 5 "SIPOC, Project Metrics and Benefits" — BoK 1.2 (defining a process), 1.3 (developing project metrics, primary and secondary metrics, financial evaluation, hard vs soft benefits, benefits capture), 2.1 (SIPOC introduced here; process mapping proper is Day 9).
- Questions: Define total 70 (1.1 has 20; add ~50 across 1.2, 1.3, 1.4).

### Batch 2 — Measure I (Days 6–10)
- Day 6 data types (continuous vs discrete/attribute), sampling basics and techniques (random, stratified, systematic; BoK 3.2 sampling introduced here), data collection plans, operational definitions.
- Day 7 descriptive statistics (mean, median, mode, range, variance, standard deviation sample vs population, quartiles) and graphical analysis (histogram, box plot, Pareto, run chart, scatter, dot plot). Explain how to read each picture.
- Day 8 normal distribution, normality (probability plot, Anderson-Darling p-value reading), Z-scores, using the Z table.
- Day 9 process mapping levels, swimlanes, value stream map elements (cycle time, lead time, process cycle efficiency, takt time), value-added vs non-value-added classification.
- Day 10 measurement system analysis: precision vs accuracy, bias, linearity, stability, gage R&R (repeatability, reproducibility, %study variation, %tolerance, ndc), attribute agreement analysis (kappa in plain terms).
- Questions: 40 across 2.2 and 2.3.

### Batch 3 — Measure II and Analyse I (Days 11–14)
- Day 11 process capability: specification limits, Cp, Cpk, Cpu, Cpl, Pp, Ppk, short- vs long-term, concept of stability (capability only means something for a stable process), sigma level from Cpk.
- Day 12 capability practice: attribute and discrete capability (DPMO → sigma, yield), monitoring techniques, a practice set of 8 worked problems inside the lesson.
- Day 13 finding causes: cause-and-effect (fishbone) categories, X-Y (cause-and-effect matrix) diagram scoring, FMEA (severity, occurrence, detection, RPN, action priority).
- Day 14 inference: population vs sample, understanding inference, central limit theorem, standard error, confidence intervals in plain terms; hypothesis testing concepts: null and alternative, alpha and beta risk, Type I and Type II, power, p-value, practical vs statistical significance, types of test (one- and two-sample, one- and two-tailed).
- Questions: 40 across 2.1 and 2.4 (Measure total 80); 40 across 3.1–3.3.

### Batch 4 — Analyse II (Days 16–20)
- Day 16 t-tests: 1-sample, 2-sample (pooled vs Welch), paired; 1-sample variance (chi-square) test; reading software output.
- Day 17 one-way ANOVA: hypotheses, F statistic, ANOVA table reading, assumptions, when to use.
- Day 18 one- and two-sample proportion tests, chi-square test of independence (contingency tables, expected counts, degrees of freedom).
- Day 19 tests for non-normal data: Mann-Whitney, Kruskal-Wallis, Mood's median, Friedman, 1-sample sign, 1-sample Wilcoxon; a "which test do I use" decision table (data type × number of groups × normality).
- Day 20 multi-vari analysis (positional, cyclical, temporal variation) and classes of distributions (normal, exponential, Poisson, binomial, Weibull in plain terms).
- Questions: 40 across 3.4–3.5 (Analyse total 80).

### Batch 5 — Improve (Days 21–22)
- Day 21 correlation (Pearson r, r², strength and direction, correlation is not causation), simple linear regression (equation, slope, intercept, reading output, p-value of slope), residuals analysis (what to look for).
- Day 22 multiple linear regression (adjusted r², reading coefficient tables, multicollinearity in plain terms), non-linear regression (curved fits), confidence vs prediction intervals, residuals again, data transformation and Box-Cox (why and when).
- Questions: 70 across 4.1–4.2.

### Batch 6 — Control (Days 23–25) and final checks
- Day 23 Lean controls: control methods for 5S (audits, standards), kanban (pull, signals, sizing in plain terms), poka-yoke (prevention vs detection, examples).
- Day 24 SPC: data collection for SPC (rational subgroups), I-MR, Xbar-R, Xbar-S, P, NP, C, U charts (which chart for which data), CuSum and EWMA in plain terms, control limits vs specification limits, control methods and the common run rules (points beyond limits, 8/9 in a row one side, 6 trending, etc.).
- Day 25 control plans: cost-benefit analysis, elements of the control plan, elements of the response plan, handover; include choosing and piloting solutions with FMEA revisited.
- Questions: 70 across 5.1–5.3.
- Then run `python3 build.py --strict`, confirm every subtopic has ≥3 questions and every section a lesson, run one whole-bank blind review for cross-batch duplicates and contradictions between lessons and explanations, update `REVIEW.md`, commit and push.

## Commit and publish

Repo on GitHub, Pages enabled with source "GitHub Actions". Every push to `main` rebuilds and publishes. The learner opens the Pages URL on phone and laptop and moves progress between them with Export/Import in Settings.

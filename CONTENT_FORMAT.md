# Tollgate content format

## Lesson: `content/lessons/NN-slug.md`

```
---
day: 11
week: 3
phase: Measure            # Define | Measure | Analyse | Improve | Control
title: Process Capability
minutes: 50
bok_sections: ["2.4"]
objectives:
  - Explain what a specification limit is and where it comes from
  - Calculate Cp and Cpk from a mean, standard deviation and specification limits
glossary_terms: ["specification limit", "Cp", "Cpk", "process capability"]
---

## The Idea
Plain-English teaching. Several short sub-sections with `###` headings are fine.
Define every term at first use. Expand every acronym at first use.

## Worked Example
Numbered steps. Use numbers the learner can follow on a calculator.
Show the arithmetic.

## Formula Card
A short list or table of formulas with each symbol named. Omit the section only
for lessons with no formulas (write "No formulas in this lesson.").

## Exam Traps
Bulleted list of the specific mistakes exam questions exploit.

## Check Questions
A bulleted list of exactly 5 question IDs from the bank, e.g. `- M-2.4-003`.

## Applied Task
One task the learner does on their own improvement project using their
organisation's historical data, producing something they can paste to a coach.
```

Markdown only. Tables are allowed. Inline math is written in plain text
(e.g. `Cpk = min(USL − mean, mean − LSL) / (3 × s)`), inside backticks.
Software-style output goes in fenced code blocks.

## Glossary: `content/glossary.json`

```json
[{"term": "Cpk", "definition": "...", "lesson_day": 11, "aliases": ["process capability index"]}]
```

`term` unique, case-insensitive. Definitions: 1–3 plain sentences, no undefined jargon.

## Questions: `content/questions/{define,measure,analyse,improve,control}.json`

An array of:

```json
{
  "id": "M-2.4-017",
  "phase": "Measure",
  "section": "2.4",
  "subtopic": "Capability Analysis",
  "type": "concept",
  "difficulty": 2,
  "stem": "Markdown. May include a table or a fenced code block of software-style output.",
  "options": ["A text", "B text", "C text", "D text"],
  "answer": 2,
  "explanation": "Why the correct option is right. 2–4 plain sentences. Name the lesson day.",
  "distractor_notes": ["why A is wrong", "why B is wrong", null, "why D is wrong"],
  "lesson_day": 11,
  "check": false
}
```

- `id`: `<PhaseCode>-<section>-<3 digits>`; phase codes D M A I C.
- `subtopic`: must match a subtopic string in `content/bok.json` exactly.
- `type`: `concept` | `calculation` | `interpretation`.
- `difficulty`: 1 easy, 2 medium, 3 hard.
- `answer`: 0-based index of the correct option.
- `distractor_notes`: length 4, `null` at the correct index.
- `check`: true for the 5 questions a lesson uses as its check questions.
- Calculation questions also carry `"generator": "file.py:function"` and
  `"params": {...}`; the build recomputes the answer from those and fails on mismatch.

---
day: 10
week: 2
phase: Measure
title: Can You Trust Your Measurements? (MSA)
minutes: 50
bok_sections: ["2.3"]
objectives:
  - Explain why a measurement system is checked before its data are believed, and separate precision from accuracy
  - Define bias, linearity and stability and say how each is detected
  - Describe how a gage R&R study is run and what repeatability and reproducibility mean
  - Interpret %study variation, %tolerance and the number of distinct categories against the standard acceptance limits
  - Describe an attribute agreement analysis and read its results, including kappa in plain terms
glossary_terms: ["measurement system analysis", "measurement system", "gage", "precision", "accuracy", "bias", "linearity", "stability", "resolution", "gage R&R", "repeatability", "reproducibility", "part-to-part variation", "total variation", "equipment variation", "appraiser variation", "percent study variation", "percent tolerance", "number of distinct categories", "attribute agreement analysis", "kappa", "reference value", "calibration", "appraiser"]
---

## The Idea

### The data are only as good as the gauge

Every number in the Measure phase comes from a **measurement system**: the instrument (the **gage**, also spelt gauge), the person using it, the procedure, the environment and the way the result is recorded. If the measurement system wobbles, the data wobble, and the project will chase variation that does not exist in the process at all. **Measurement system analysis** (MSA) is the set of studies that checks the measurement system before its data are trusted. It is a Measure deliverable and a routine exam topic.

The observed variation in any data set is the process variation plus the measurement variation:

`σ²observed = σ²process + σ²measurement`

Variances add, which is why the study works with variances and then reports standard deviations. MSA estimates the measurement term and asks whether it is small enough to ignore.

Two terms from Day 4 recur throughout: the customer's upper and lower specification limits are written USL and LSL, and the **tolerance** is the width between them, USL − LSL. Several MSA results are judged as a percentage of the tolerance.

### Precision and accuracy

Two independent properties. Think of a target.

**Accuracy** is whether the measurements are centred on the true value: on average, does the gauge read what the part really is? Shots clustered around the bullseye are accurate.

**Precision** is whether repeated measurements of the same thing agree with each other: how tight is the cluster, wherever it sits? Shots in a tight group in the top-left corner are precise but not accurate.

A gauge can be either, both or neither. Accuracy problems are fixed by adjustment (calibration); precision problems are fixed by improving the instrument, the method or the training. The exam describes a set of readings and asks which property is lacking: readings that scatter widely lack precision; readings that agree with each other but sit consistently above the true value lack accuracy.

### The accuracy family: bias, linearity, stability

Accuracy is broken into three things, all measured by comparing the gauge against a **reference value**: a part whose true value is known, usually because it has been measured on a much better instrument, or a certified reference standard.

**Bias** is the difference between the average of repeated measurements and the reference value. Measure a 10.00 mm reference block ten times, average 10.06 mm: the bias is +0.06 mm. Bias is expressed as a percentage of the tolerance to judge whether it matters; a common rule is that bias should be under 10% of tolerance. It is corrected by **calibration**: adjusting the instrument against the reference.

**Linearity** is whether the bias stays the same across the operating range of the gauge. A scale that reads 0.1 g high at 10 g and 2 g high at 500 g has a linearity problem. It is checked by measuring several reference parts spread across the range and plotting bias against reference value; a sloping line means non-linearity.

**Stability** is whether the bias stays the same over time. Measure the same reference part every day and plot it on a run chart or control chart; drift or shifts show the gauge is unstable and needs recalibration at shorter intervals.

**Resolution** (discrimination) is a fourth property: the smallest difference the gauge can display. A rule that reads to the nearest millimetre cannot support a tolerance of ±0.2 mm. The rule of thumb is that the gauge should resolve to at least one-tenth of the tolerance, or one-tenth of the process variation, whichever is being studied.

### The precision family: gage R&R

Precision is studied with a **gage R&R** study (gage repeatability and reproducibility), the most heavily examined item in this section. Precision is split into two sources:

- **Repeatability**: variation when the *same* person measures the *same* part with the *same* gauge several times. It is the instrument's own noise, so it is also called **equipment variation** (EV).
- **Reproducibility**: variation between *different* people (**appraisers**) measuring the same parts with the same gauge. It comes from technique, and it is also called **appraiser variation** (AV).

The standard study: 10 parts chosen to span the normal process range, 3 appraisers, each measuring every part 2 or 3 times in random order without seeing the others' results or their own earlier readings. Software (or the average-and-range method by hand) then separates the variation into repeatability, reproducibility, and **part-to-part variation** (PV), the real differences between the parts, and combines them:

- `GRR = √(EV² + AV²)` — the total measurement system standard deviation.
- `Total variation TV = √(GRR² + PV²)`.

Three results are reported, and each has an acceptance rule:

**Percent study variation** (%SV, also written %GRR): GRR ÷ TV × 100. It says what share of the observed spread is the measurement system.

**Percent tolerance** (%P/T): 6 × GRR ÷ (USL − LSL) × 100. It says how much of the customer's tolerance the measurement system would consume. Some software uses 5.15 instead of 6; the exam uses whichever it states, and 6 is the current standard.

The acceptance rule for both:

| Result | Verdict |
|---|---|
| Under 10% | Acceptable |
| 10% to 30% | Marginal: may be acceptable depending on the cost of the gauge and the importance of the measure |
| Over 30% | Unacceptable: fix the measurement system before using its data |

Software also prints **percent contribution**, which uses variances rather than standard deviations (GRR² ÷ TV² × 100) and so gives smaller numbers: the acceptance limits for contribution are 1% and 9%. A question that quotes a %contribution of 6.3% is describing the same gauge as one with a %study variation of 25.1%.

**Number of distinct categories** (ndc): 1.41 × PV ÷ GRR, rounded *down* to a whole number. It is how many separate groups the gauge can reliably sort the process output into. An ndc of 1 means the gauge cannot tell parts apart at all; the acceptance rule is ndc ≥ 5.

Which of %study variation and %tolerance matters depends on the purpose. If the gauge is used to sort good parts from bad against a specification, %tolerance is the one. If it is used to study process variation in a project, %study variation is the one. Both are usually reported.

Reading the diagnosis: if repeatability dominates, the instrument is the problem (worn, a loose fixture (the holder that positions the part in the gauge), inadequate resolution). If reproducibility dominates, the people are the problem (different technique, unclear procedure), which is fixed by standardised method and training, not by buying a new gauge.

### Attribute measurement systems

Many measurements are judgements: pass/fail, acceptable/not, defect type A/B/C. These are attribute measurement systems and they are checked with an **attribute agreement analysis**: typically 30 to 50 items whose true classification is known (agreed by an expert panel), assessed by 2 or 3 appraisers, each twice, in random order. The output reports:

- **Within-appraiser agreement** (repeatability): how often each appraiser gives the same answer to the same item both times.
- **Between-appraiser agreement** (reproducibility): how often all appraisers agree with each other.
- **Agreement with the standard** (accuracy): how often each appraiser matches the known true classification. This is the one that catches the inspector who is consistent but consistently wrong.

Software also reports **kappa**, a statistic that corrects the agreement rate for the agreement that would happen by chance. Kappa runs from −1 to 1: 1 is perfect agreement, 0 is agreement no better than guessing. The usual rules: kappa above 0.9 is excellent, 0.7 to 0.9 acceptable, below 0.7 the measurement system needs work (operational definitions, reference samples, training). The plain-English reading: an inspector who agrees with the standard 80% of the time on a 50:50 pass/fail decision would score about 50% by chance alone, so 80% is less impressive than it sounds, and kappa says so.

## Worked Example

A machine shop measures a shaft diameter with a digital micrometer. Tolerance 9.75 mm to 10.25 mm (width 0.50 mm). Three operators each measure ten shafts three times. The software reports standard deviations:

```
Gage R&R Study
Source            StdDev (SD)
Total Gage R&R       0.0233
  Repeatability      0.0200
  Reproducibility    0.0120
Part-To-Part         0.0900
Total Variation      0.0930
```

1. **Confirm GRR.** √(0.0200² + 0.0120²) = √(0.000400 + 0.000144) = √0.000544 = 0.0233 mm.
2. **Confirm total variation.** √(0.0233² + 0.0900²) = √(0.000543 + 0.008100) = √0.008643 = 0.0930 mm.
3. **Percent study variation.** 0.0233 ÷ 0.0930 × 100 = 25.1%. Marginal (10% to 30%).
4. **Percent tolerance.** 6 × 0.0233 ÷ 0.50 × 100 = 0.1398 ÷ 0.50 × 100 = 28.0%. Also marginal.
5. **Number of distinct categories.** 1.41 × 0.0900 ÷ 0.0233 = 5.4, rounded down to 5. Acceptable, with no margin.
6. **Percent contribution** (for recognition): (0.0233 ÷ 0.0930)² × 100 = 6.3%. Marginal on the 1%–9% scale, consistent with step 3.
7. **Diagnosis.** Repeatability (0.0200) is larger than reproducibility (0.0120), so most of the measurement noise is the micrometer itself, not the operators. Checking the fixture and the resolution comes before retraining.
8. **Decision.** The gauge is usable for the project with caution: the data will carry about 25% measurement noise. Because the project's Y is the diameter itself, the team fixes the fixturing and repeats the study before the capability analysis on Day 11.

A bias check on the same micrometer: a certified 10.000 mm reference pin measured 15 times averages 10.006 mm. Bias = +0.006 mm, which is 0.006 ÷ 0.50 × 100 = 1.2% of tolerance, well under the 10% rule. The micrometer is accurate enough, and its problem is precision.

An attribute check on the shop's visual inspection: 50 shafts of known status, two inspectors, two assessments each. Inspector A matched the standard on 87 of 100 assessments (87%); Inspector B on 84 of 100 (84%). Kappa for agreement with the standard: 0.72 for A and 0.66 for B. B's agreement is below the 0.7 line, so the team writes reference photographs of each defect type and retrains before using visual inspection data.

## Formula Card

- `σ²observed = σ²process + σ²measurement` — variances add.
- `Bias = average measured value − reference value`; `Bias % of tolerance = bias ÷ (USL − LSL) × 100`.
- `GRR = √(EV² + AV²)` — EV repeatability (equipment), AV reproducibility (appraiser).
- `TV = √(GRR² + PV²)` — PV part-to-part.
- `%Study variation = GRR ÷ TV × 100` — accept < 10%, marginal 10–30%, reject > 30%.
- `%Tolerance = 6 × GRR ÷ (USL − LSL) × 100` — same limits.
- `%Contribution = (GRR ÷ TV)² × 100` — accept < 1%, marginal 1–9%, reject > 9%.
- `ndc = 1.41 × PV ÷ GRR`, rounded down — accept ≥ 5.
- Kappa: > 0.9 excellent, 0.7–0.9 acceptable, < 0.7 needs work.

## Exam Traps

- Precision is agreement between repeated readings; accuracy is agreement with the true value. Tight but off-centre readings are precise, not accurate.
- Repeatability = same operator, same part, same gauge (equipment). Reproducibility = different operators (appraisers). Questions swap them.
- Bias is a constant offset; linearity is bias changing across the range; stability is bias changing over time.
- %Study variation and %tolerance both use standard deviations and share the 10%/30% limits; %contribution uses variances and has 1%/9% limits. Do not apply the wrong limits.
- %Tolerance uses 6 × GRR in the numerator (older texts 5.15). Forgetting the 6 gives a number six times too small.
- ndc is rounded down, never up, and must be at least 5.
- GRR combines EV and AV by squares and a square root, not by adding them.
- A gauge that passes %tolerance can still fail %study variation when the process variation is small, and vice versa. Which matters depends on whether the gauge sorts against specifications or studies the process.
- Attribute agreement analysis checks agreement with the standard as well as with oneself and with others. High self-consistency with low agreement to the standard means a consistently wrong inspector.
- Kappa corrects for chance agreement; a plain percentage does not.
- MSA is done before the baseline and before capability. A capability study on an unverified gauge is meaningless.

## Check Questions

- M-2.3-001
- M-2.3-003
- M-2.3-006
- M-2.3-010
- M-2.3-014

## Applied Task

Identify the measurement system behind your own project's primary metric. If it is a continuous measurement, plan and, where possible, run a gage R&R study using your organisation's instrument: 10 items spanning the normal range, 2 or 3 people who normally take the measurement, 2 or 3 repeats each in random order. If you cannot run it live, use historical repeat measurements from your organisation's records (re-tests, re-weighs, duplicate entries). Report EV, AV, PV, GRR, TV, %study variation, %tolerance against your customer's specification, and ndc, with a verdict against the acceptance limits and a diagnosis of whether the equipment or the appraisers dominate. If your metric is a judgement (pass/fail, category), run an attribute agreement analysis on 30 historical items whose true classification you can establish, with two assessors, and report within-appraiser, between-appraiser and agreement-with-standard percentages. Paste the table and your verdict to your coach.

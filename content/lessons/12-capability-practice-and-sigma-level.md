---
day: 12
week: 3
phase: Measure
title: Capability Practice and Sigma Level
minutes: 50
bok_sections: ["2.4", "1.2"]
objectives:
  - Calculate the capability of an attribute or discrete characteristic from defect counts using DPMO, yield and the sigma table
  - Convert between DPMO, yield, short-term and long-term sigma level and Cpk without confusing the 1.5 shift
  - Read a capability report and a sigma-level table and say what the process will deliver
  - Describe how capability is monitored over time and why a capability index on its own is not enough
  - Work eight capability problems of the kinds the exam sets, under time
glossary_terms: ["attribute capability", "discrete capability", "Z bench", "sigma table", "capability monitoring", "long-term capability", "short-term capability", "PPM"]
---

## The Idea

### Capability when you cannot measure

Day 11's indices need a continuous measurement with a mean and a standard deviation. Many Green Belt projects have neither: the Y is a proportion of late deliveries, a count of errors per form, a pass/fail inspection. **Attribute capability** (also **discrete capability**) is the way to state how well such a process meets requirements, and it uses the metrics from Day 3 rather than Cp and Cpk.

The route is:

1. Count units, opportunities per unit and defects over a representative period (stable, as always: an attribute process can be checked for stability with the P or U charts on Day 24).
2. Calculate DPU, DPO and DPMO.
3. Convert DPMO to yield (1 − DPO, as a percentage) and to a sigma level from the **sigma table**.
4. Report DPMO, yield and sigma level as the process's capability. Software reports the same figures as **PPM** (parts per million defective) and, for continuous data, as Z bench (defined below).

There is no Cpk for attribute data, but the two worlds meet at the sigma level: a continuous process with Cpk = 1.33 (4 sigma short-term) and an attribute process at 6 210 DPMO (4 sigma on the table) are at the same sigma level under the standard convention.

### Short-term and long-term sigma

The two families from Day 11 reappear as two sigma levels, and the 1.5-sigma shift from Day 3 is the bridge between them.

**Short-term capability** is what a process does within a subgroup, under one set of conditions: its potential. **Long-term capability** is what it delivers over months, including every drift and shift. The convention, built into every published sigma table, is that the difference is 1.5 sigma:

`Z short-term = Z long-term + 1.5`

The number read from a standard sigma table for a given DPMO is the short-term sigma level, because the table's authors assumed the DPMO was measured long-term and added 1.5 to report the process's potential. So:

- DPMO measured over a long period → look up the table → short-term sigma (the "sigma level" everyone quotes).
- Subtract 1.5 → long-term sigma, which is the Z that actually corresponds to that DPMO on the normal curve.
- Cpk × 3 gives short-term sigma directly, because Cpk uses within-subgroup variation. Ppk × 3 gives long-term sigma. For the Day 11 shaft process that is 3 × 0.79 = 2.37 long-term against 3.18 short-term: an actual shift of 0.81 for that process, not 1.5.

**Z bench** is the name software uses for the sigma level derived from a continuous capability study: the single Z whose one-tailed area equals the total expected proportion outside both limits. Z bench (within) is the short-term figure; Z bench (overall) the long-term one. Subtracting them gives an empirical shift for that process, which may or may not be 1.5.

The exam expects this table, and the landmarks should be memorised:

| Short-term sigma | Long-term Z | DPMO (long-term) | Yield |
|---|---|---|---|
| 2 | 0.5 | 308 538 | 69.1% |
| 3 | 1.5 | 66 807 | 93.32% |
| 3.5 | 2.0 | 22 750 | 97.7% |
| 4 | 2.5 | 6 210 | 99.379% |
| 4.5 | 3.0 | 1 350 | 99.865% |
| 5 | 3.5 | 233 | 99.977% |
| 6 | 4.5 | 3.4 | 99.99966% |

### Monitoring capability

A capability study is a snapshot. **Capability monitoring** is keeping the picture current so that the gain from a project holds and drift is seen early. The syllabus expects the Green Belt to know the main techniques:

- Recalculate Cpk or DPMO at agreed intervals (monthly, per batch, per 25 subgroups) from ongoing data, and plot the index over time so a decline is visible. A single index number with no history hides drift.
- Keep the control chart running (Day 24). The chart shows stability continuously; capability only means something while the chart shows control. Control limits move only when the process is deliberately changed; specification limits never move.
- Trend the defect rate from the same data used for DPMO on a P or U chart, so attribute capability is watched in the same way.
- Re-verify the measurement system at intervals (Day 10), since a drifting gauge looks like a drifting process.
- Record the capability figures in the control plan (Day 25) alongside the response if they fall below the agreed level.

A common exam framing: "Which tool tracks capability over time?" The answer is the control chart with periodic capability recalculation, not a one-off histogram.

### How the exam asks

Capability questions come in a small number of shapes, and the practice set below covers all of them:

1. Cp and Cpk from mean, standard deviation and limits (Day 11).
2. Cpk from a one-sided limit.
3. Sigma level from Cpk, or the Cpk needed for a target sigma.
4. DPMO from counts, then sigma from the table.
5. Sigma from DPMO with and without the shift.
6. Expected DPMO or PPM from Z (the tail area × 1 000 000).
7. Reading a capability report: which index to quote, what the gap between within and overall means.
8. The standard deviation or the mean shift needed to reach a target index.

Most are two-step: compute something, then compare it with a limit or read it against the table. Write the formula, substitute the numbers, and check the result against the benchmarks before choosing an option.

## Worked Example

Eight practice problems. Work each on paper before reading the solution.

**1. Cp and Cpk.** Specification 48 to 52; mean 50.6; short-term standard deviation 0.5.
Cp = (52 − 48) ÷ (6 × 0.5) = 4 ÷ 3 = 1.33. Cpu = (52 − 50.6) ÷ 1.5 = 1.4 ÷ 1.5 = 0.93. Cpl = (50.6 − 48) ÷ 1.5 = 2.6 ÷ 1.5 = 1.73. Cpk = 0.93. Off-centre: if centred at 50, Cpk would rise to 1.33.

**2. One-sided limit.** Response time must not exceed 20 seconds (USL only). Mean 17, standard deviation 2.
Cpu = (20 − 17) ÷ (3 × 2) = 3 ÷ 6 = 0.50. Cpk = 0.50. No Cp exists. Sigma level 3 × 0.5 = 1.5. Poor: about 6.7% of responses exceed the limit (Z = 1.5, tail 0.0668).

**3. Cpk to sigma and back.** A process has Cpk = 1.06. Sigma level = 3 × 1.06 = 3.18. A customer demands 5 sigma: Cpk needed = 5 ÷ 3 = 1.67.

**4. Attribute capability from counts.** 2 000 loan applications, 3 opportunities each, 38 defects.
DPU = 38 ÷ 2 000 = 0.019. DPO = 38 ÷ 6 000 = 0.00633. DPMO = 6 333. Yield = 99.37%. Sigma table: 6 333 DPMO is slightly more than the 4-sigma landmark of 6 210, so the sigma level is slightly below 4: 3.99.

**5. With and without the shift.** DPMO = 22 750. Table: 3.5 sigma short-term. Long-term Z = 3.5 − 1.5 = 2.0. Check on the Z table: the tail beyond Z = 2.0 is 0.02275, which is 22 750 per million. The table added 1.5.

**6. DPMO from a Z.** A capability report gives Z bench (overall) = 2.5. Expected PPM = tail beyond 2.5 × 1 000 000 = 0.00621 × 1 000 000 = 6 210 PPM. By the 1.5 convention, short-term sigma = 2.5 + 1.5 = 4.0.

**7. Reading a report.**

```
Process Capability Report for Shaft Diameter
LSL 9.5   USL 10.5   Target 10.0
Sample Mean 10.12   Sample N 100
StDev (Within) 0.12   StDev (Overall) 0.16
Potential (Within) Capability   Cp 1.39   CPL 1.72   CPU 1.06   Cpk 1.06
Overall Capability              Pp 1.04   PPL 1.29   PPU 0.79   Ppk 0.79
Expected PPM (Within) 771   Expected PPM (Overall) 8 800
```

Quote Ppk = 0.79 for what the customer received; quote Cpk = 1.06 for the potential once the process is stabilised. Cp 1.39 against Cpk 1.06: off-centre high. Within 771 PPM against overall 8 800 PPM: the between-subgroup shifts multiply the defect rate by more than ten. Priorities: find the special causes, then centre the mean.

**8. What has to change.** Same shaft process. To reach Cpk = 1.33 without changing the standard deviation, where must the mean be? Cpu = (10.5 − mean) ÷ 0.36 = 1.33 → 10.5 − mean = 0.48 → mean = 10.02 (and Cpl at that mean is (10.02 − 9.5) ÷ 0.36 = 1.44, so the upper side still governs). To reach Cp = 2.0 at the current tolerance, σ must be 1.0 ÷ 12 = 0.083.

## Formula Card

- `DPMO = D ÷ (U × O) × 1 000 000`; `Yield = (1 − DPO) × 100%`.
- `Sigma (short-term) = table lookup of DPMO`; `Z long-term = sigma short-term − 1.5`.
- `Expected PPM = tail area beyond Z × 1 000 000` (add both tails for two-sided limits).
- `Short-term sigma = 3 × Cpk`; `Long-term sigma = 3 × Ppk`; `Cpk needed = target sigma ÷ 3`.
- `Mean needed for target Cpu = USL − 3 × σ × Cpu`; `σ needed for target Cp = (USL − LSL) ÷ (6 × Cp)`.
- Landmarks: 2σ 308 538; 3σ 66 807; 4σ 6 210; 5σ 233; 6σ 3.4 DPMO.

## Exam Traps

- The sigma table already includes the 1.5 shift. Reading the table and then adding 1.5 again is the classic double-application error; a DPMO of 6 210 is 4 sigma, not 5.5.
- "Long-term sigma" or "Z long-term" means subtract 1.5 from the table figure. "Sigma level" with no qualifier means the table figure (short-term).
- Attribute data have no Cpk; report DPMO, yield and sigma level.
- Yield = 1 − DPO, not 1 − DPU, when opportunities per unit are more than one.
- PPM and DPMO are both "per million" but PPM usually counts defective units (or out-of-specification measurements) while DPMO counts defects per opportunity. Read the question.
- A capability index is a snapshot; monitoring means recalculating over time on a control chart, not filing the report.
- Reading a report: Ppk describes actual delivered performance; Cpk describes potential. Software labels within and overall; do not quote Cp when asked what the customer experienced.
- Z bench within minus Z bench overall is that process's actual shift; 1.5 is a convention, not a law.
- For a one-sided specification, Cpk is Cpu or Cpl and there is no Cp.

## Check Questions

- M-2.4-011
- M-2.4-013
- M-2.4-015
- M-2.4-017
- M-2.4-019

## Applied Task

If your own project's primary metric is attribute or count data, use your organisation's records for the last three months to count units, define and justify opportunities per unit, and count defects. Calculate DPU, DPO, DPMO, yield, short-term sigma from the table and long-term Z, and state the capability in one sentence a manager would understand. If your metric is continuous, take the Day 11 results and add: Z bench within and overall from the expected PPM figures, the actual shift between them, the mean shift or standard deviation reduction needed to reach Cpk = 1.33, and a plan for monitoring capability monthly (which chart, which recalculation interval, who reviews it). In both cases finish with a note on whether the data period was stable enough for the figures to mean anything. Paste the calculations and the sentence to your coach.

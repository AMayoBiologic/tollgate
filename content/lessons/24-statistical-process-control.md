---
day: 24
week: 5
phase: Control
title: Statistical Process Control
minutes: 50
bok_sections: ["5.2"]
objectives:
  - Explain what a control chart is, how control limits are set and how they differ from specification limits
  - Choose the right chart for the data: I-MR, Xbar-R, Xbar-S, P, NP, C or U
  - Calculate control limits for an I-MR chart, an Xbar-R chart and a P chart from summary data
  - Apply the standard run rules to detect special causes and say what to do when one appears
  - Describe what CuSum and EWMA charts add, and how a chart is used as a control method after the project
glossary_terms: ["statistical process control", "control chart", "centre line", "upper control limit", "lower control limit", "I-MR chart", "moving range", "Xbar-R chart", "Xbar-S chart", "P chart", "NP chart", "C chart", "U chart", "CuSum chart", "EWMA chart", "run rules", "out of control", "control chart constants", "rational subgrouping", "phase I and phase II"]
---

## The Idea

### Watching the process, not the product

Day 3 separated common cause variation (the ever-present scatter of a stable process) from special cause variation (something unusual). **Statistical process control** (SPC) is the set of methods, built around the **control chart**, that tell the two apart while the process runs, so that people react to special causes and leave common causes alone. Reacting to common cause variation as if it were special (adjusting the machine after every slightly high reading) makes a process worse; that is called tampering. Ignoring a special cause lets a real problem run. The chart is the referee.

A control chart is a run chart (Day 7) with three added lines calculated from the process's own data:

- The **centre line**: the average of the plotted statistic.
- The **upper control limit** (UCL) and **lower control limit** (LCL): the centre line plus and minus three standard deviations of the plotted statistic. For a stable process, 99.73% of points fall inside them, so a point outside is a signal worth investigating.

Because the limits come from the data, they describe what the process *does*. Specification limits (Day 11) describe what the customer *wants* and never appear on a control chart. A process can be in control and incapable, or out of control and, for now, within specification. Control charts are about stability; capability is judged separately, once stability is confirmed.

### Data collection for SPC

Charts are built on **rational subgrouping** (Day 11): small samples taken close together in time so that only common cause variation can occur within a subgroup, while special causes show up as differences between subgroups. Typical subgroups are 3 to 5 consecutive units taken every hour or every batch. When units are made slowly, or each measurement is a batch or a day's total, the subgroup size is 1 and the individuals chart is used.

Charting has two stages. In **phase I** the chart is built: at least 20 to 25 subgroups are collected, the limits are calculated, any special causes are found and removed, and the limits are recalculated from the clean data. In **phase II** those limits are frozen and new points are plotted against them to monitor the process. Limits are only recalculated when the process has been deliberately changed and confirmed stable at its new level; they are not recomputed every month.

### Which chart

The choice depends on the data type and the subgroup size.

| Data | Subgroup | Chart | Plots |
|---|---|---|---|
| Continuous, one value at a time | 1 | **I-MR chart** (individuals and moving range) | Each value; the range between consecutive values |
| Continuous, small subgroups | 2 to 10 | **Xbar-R chart** | Subgroup mean; subgroup range |
| Continuous, larger subgroups | more than 10 | **Xbar-S chart** | Subgroup mean; subgroup standard deviation |
| Attribute: defective units, proportion | constant or varying size | **P chart** | Proportion defective per subgroup |
| Attribute: defective units, count | constant size | **NP chart** | Number defective per subgroup |
| Attribute: defects, count | constant area of opportunity | **C chart** | Number of defects per unit or sample |
| Attribute: defects, rate | constant or varying area of opportunity | **U chart** | Defects per unit, with varying units per sample |

Two distinctions carry the exam. Defective units (a unit is good or bad; binomial, Day 20) go on P or NP charts; defects (a count per unit; Poisson) go on C or U charts. And the count charts (NP, C) need a constant subgroup size, while the rate charts (P, U) work with constant or varying sizes, their limits changing with each subgroup's size when it varies. (The C chart is not named in the IASSC syllabus, but it is the natural pair of the U chart and the exam's chart-selection questions assume you know it.)

The continuous charts come in pairs: the top chart tracks the centre, the bottom chart tracks the spread. Read the spread chart first; if the spread is out of control, the limits on the mean chart are not trustworthy.

### Calculating the limits

The formulas use **control chart constants** (A2, D3, D4, A3, B3, B4, d2), which depend on the subgroup size n and are tabulated on the reference sheet. The exam gives the constants; you apply them.

**I-MR chart.** With individual values x and the **moving range** MR = |xᵢ − xᵢ₋₁| between consecutive points:

- Centre line (individuals) = x̄; UCL = x̄ + 2.66 × MR̄; LCL = x̄ − 2.66 × MR̄.
- Centre line (MR) = MR̄; UCL = 3.267 × MR̄; LCL = 0.
- The 2.66 is 3 ÷ d2 for n = 2 (d2 = 1.128), so the estimated process standard deviation is MR̄ ÷ 1.128.

**Xbar-R chart.** With subgroup means x̄ and ranges R, their averages x̿ and R̄:

- UCL(x̄) = x̿ + A2 × R̄; LCL(x̄) = x̿ − A2 × R̄.
- UCL(R) = D4 × R̄; LCL(R) = D3 × R̄ (D3 = 0 for n ≤ 6, so the R chart has no lower limit for small subgroups).
- Estimated standard deviation = R̄ ÷ d2.

**Xbar-S chart.** Same shape with the subgroup standard deviations: UCL(x̄) = x̿ + A3 × s̄; UCL(s) = B4 × s̄; LCL(s) = B3 × s̄. For n = 5: A3 = 1.427, B3 = 0, B4 = 2.089.

**P chart.** With p̄ the overall proportion defective and n the subgroup size:

- UCL = p̄ + 3 × √(p̄(1 − p̄) ÷ n); LCL = p̄ − 3 × √(p̄(1 − p̄) ÷ n), set to 0 if negative.

**NP chart.** UCL = n p̄ + 3 × √(n p̄ (1 − p̄)); LCL = n p̄ − 3 × √(n p̄ (1 − p̄)), floored at 0.

**C chart.** With c̄ the average count: UCL = c̄ + 3√c̄; LCL = c̄ − 3√c̄, floored at 0.

**U chart.** With ū the average defects per unit and n units in the sample: UCL = ū + 3√(ū ÷ n); LCL = ū − 3√(ū ÷ n), floored at 0.

The pattern is the same throughout: centre ± 3 × (standard deviation of the plotted statistic), with the standard deviation coming from the binomial for P/NP and from the Poisson (variance = mean) for C/U.

### Run rules

A point beyond a control limit is the loudest signal, but not the only one. The **run rules** turn patterns into signals. Two published sets exist, the Western Electric rules from a 1956 handbook and the Nelson rules of 1984; the list below follows Nelson, which is why rule 2 says nine (Western Electric says eight). The ones the exam uses:

1. One point beyond 3σ (outside a control limit).
2. Nine (some texts: eight or seven) points in a row on the same side of the centre line: a shift in the mean.
3. Six points in a row steadily increasing or decreasing: a trend.
4. Fourteen points in a row alternating up and down: systematic over-adjustment or two mixed sources.
5. Two of three consecutive points beyond 2σ on the same side.
6. Four of five consecutive points beyond 1σ on the same side.
7. Fifteen points in a row within 1σ of the centre line: stratification, usually mixed subgroups or a measurement problem.
8. Eight points in a row beyond 1σ on either side with none inside: mixture.

Any rule firing means the process is **out of control**: a special cause is likely and should be found and removed. The chart says *when*, not *why*; finding why uses the tools of Days 13 to 22. When no rule fires, the process is in control and the right action is to leave it alone.

### CuSum and EWMA

Shewhart charts (all of the charts above, named after Walter Shewhart, who invented the control chart in 1924) react to the current point only, which makes them quick to catch large shifts and slow to catch small ones. Two charts remember earlier points:

- The **CuSum chart** (cumulative sum) adds up the deviations of each point from the target, after subtracting an allowance k (usually half the shift you want to detect, in standard deviation units). The running total climbs steadily if the mean has shifted, and a signal is raised when it exceeds a decision limit h. It detects shifts of about 0.5σ to 1.5σ far faster than a Shewhart chart.
- The **EWMA chart** (exponentially weighted moving average) plots a weighted average in which the newest point gets weight λ (lambda, typically 0.1 to 0.3) and the previous EWMA gets the rest: EWMAₜ = λ xₜ + (1 − λ) EWMAₜ₋₁. Noise is smoothed away and small sustained shifts become visible. Its limits start narrow and widen towards a steady value.

Green Belts need to know when to use them (small shifts matter, such as fill weight drifting by half a standard deviation) and what they trade away (sensitivity to single large spikes, and interpretability).

### Charts as control methods

A control chart in the Control phase is not a report; it is a **control method**, and the control plan (Day 25) records for each chart the characteristic, the chart type, the subgroup size and frequency, who plots it, the run rules in force, and the response when a rule fires. The response is the out-of-control action plan: stop or continue, who to call, what to check first, how to contain suspect product, and how to record the cause. A chart without a written response is a chart nobody acts on.

## Worked Example

**Part A: I-MR chart.** The invoice team tracks daily hands-on processing minutes for a sample invoice each day. Twenty values have mean x̄ = 41.95 and average moving range MR̄ = 1.305 (from 19 moving ranges).

1. Individuals limits: UCL = 41.95 + 2.66 × 1.305 = 41.95 + 3.47 = 45.42; LCL = 41.95 − 3.47 = 38.48.
2. Moving range limits: UCL = 3.267 × 1.305 = 4.26; LCL = 0.
3. Estimated standard deviation = 1.305 ÷ 1.128 = 1.157 minutes.
4. All twenty points are inside the limits, no run rule fires: the process is in control at about 42 minutes with day-to-day noise of about 1.2 minutes. The limits are frozen for phase II.

**Part B: Xbar-R chart.** Bottle fill weight, subgroups of 5 every hour, 25 subgroups: x̿ = 250.0 g, R̄ = 4.6 g. Constants for n = 5: A2 = 0.577, D3 = 0, D4 = 2.114, d2 = 2.326.

1. UCL(x̄) = 250.0 + 0.577 × 4.6 = 250.0 + 2.65 = 252.65 g; LCL(x̄) = 247.35 g.
2. UCL(R) = 2.114 × 4.6 = 9.72 g; LCL(R) = 0.
3. Estimated σ = 4.6 ÷ 2.326 = 1.98 g.
4. A subgroup mean of 253.1 g would be beyond the UCL: special cause, investigate. Nine consecutive means above 250.0 would also signal, even with every point inside the limits.
5. Note the limits on the mean chart are ±2.65 g while the specification is ±8 g: control limits are for subgroup means and have nothing to do with the customer's limits.

**Part C: P chart.** Invoice errors, 300 invoices sampled each month, p̄ = 0.09.

1. Standard deviation of p = √(0.09 × 0.91 ÷ 300) = √0.000273 = 0.01652.
2. UCL = 0.09 + 3 × 0.01652 = 0.09 + 0.0496 = 0.1396; LCL = 0.09 − 0.0496 = 0.0404.
3. The 15% month from Day 18 (45 of 300) plots at 0.15, above the UCL: special cause, which the team attributed to the year-end surge.
4. After the Improve changes the chart is expected to signal at once, with points below the LCL: a special cause, and a welcome one. The team switches to weekly samples of 75 invoices so that 25 subgroups accumulate in about six months, and sets provisional limits from the pilot's measured rate of 2.7% (the 3% goal is never used to set limits; limits come from the process): 0.027 ± 3 × √(0.027 × 0.973 ÷ 75) = 0.027 ± 0.056, so 0 to 0.083. Once 25 weekly subgroups exist the limits are recalculated from that data and frozen.

**Part D: choosing charts.** Scratches per panel, one panel checked each hour: C chart. Scratches per square metre on panels of different sizes: U chart. Late deliveries out of exactly 200 each day: NP chart. Late deliveries out of a varying daily total: P chart. Individual daily lead times: I-MR. Fill weights in fives: Xbar-R. Fill weights in twenties: Xbar-S.

**Part E: EWMA and CuSum.** Fill target 250.0, λ = 0.2, previous EWMA 250.0, new subgroup mean 251.4: EWMA = 0.2 × 251.4 + 0.8 × 250.0 = 250.28. A CuSum with an allowance k = 0.5 g (k is usually set at half the shift to be detected; the team wants to see a 1 g shift, about half a standard deviation) starting at 0: after a reading of 251.4, the upper sum is max(0, 0 + (251.4 − 250.0) − 0.5) = 0.9; after a further 251.1, it is max(0, 0.9 + 1.1 − 0.5) = 1.5. The sum keeps climbing while the mean stays high, and signals when it passes h.

## Formula Card

- All charts: `centre line ± 3 × (standard deviation of the plotted statistic)` — for a subgroup mean that is σ ÷ √n, smaller than the spread of individual values.
- I-MR: `UCL/LCL(x) = x̄ ± 2.66 × MR̄`; `UCL(MR) = 3.267 × MR̄`; `σ̂ = MR̄ ÷ 1.128`.
- Xbar-R: `UCL/LCL(x̄) = x̿ ± A2 × R̄`; `UCL(R) = D4 × R̄`; `LCL(R) = D3 × R̄`; `σ̂ = R̄ ÷ d2`.
- Xbar-S: `UCL/LCL(x̄) = x̿ ± A3 × s̄`; `UCL(s) = B4 × s̄`; `LCL(s) = B3 × s̄`.
- P: `p̄ ± 3√(p̄(1 − p̄) ÷ n)`; NP: `n p̄ ± 3√(n p̄(1 − p̄))`.
- C: `c̄ ± 3√c̄`; U: `ū ± 3√(ū ÷ n)`. Negative lower limits become 0.
- EWMA: `EWMAₜ = λ xₜ + (1 − λ) EWMAₜ₋₁`. CuSum: `Sₜ = max(0, Sₜ₋₁ + (xₜ − target) − k)`.
- Run rules: 1 beyond 3σ; 9 in a row one side; 6 trending; 14 alternating; 2 of 3 beyond 2σ; 4 of 5 beyond 1σ; 15 within 1σ; 8 beyond 1σ.

## Exam Traps

- Control limits are calculated from the process data at ±3 standard deviations of the plotted statistic; specification limits come from the customer and never go on a control chart.
- Defective units (P, NP) versus defects (C, U); constant subgroup size (NP, C) versus varying (P, U). Questions describe the data and ask for the chart.
- I-MR is for individual values (subgroup size 1); Xbar-R for subgroups of 2 to 10; Xbar-S above 10.
- The moving range uses consecutive pairs; there are n − 1 moving ranges for n values.
- The Xbar chart's limits use A2 × R̄, not 3 × R̄ and not 3 × σ of individuals. Its limits are much narrower than the spread of individual values.
- D3 is zero for subgroups of 6 or fewer, so the R chart has no lower limit there.
- Read the range (or S) chart first; an unstable spread invalidates the mean chart's limits.
- A run of 9 (or 8) on one side, or 6 trending, is a signal even with no point outside the limits.
- In control does not mean capable; a stable process can make defects. Out of control does not mean out of specification.
- Limits are frozen after phase I and recalculated only after a confirmed, deliberate process change, not on a calendar.
- CuSum and EWMA detect small sustained shifts faster than Shewhart charts; Shewhart charts catch large single shifts faster.
- Tampering (adjusting on common cause variation) increases variation.

## Check Questions

- C-5.2-001
- C-5.2-003
- C-5.2-006
- C-5.2-010
- C-5.2-014

## Applied Task

Build two control charts from your own project's historical data. First, choose the correct chart for your primary metric (say why: data type, subgroup size, constant or varying), take at least 20 subgroups or points from your organisation's records, calculate the centre line and control limits by hand using the formulas and the constants table, and plot the chart. Apply the run rules and list every signal with its date. Second, build an I-MR or P chart for one consequential metric. For each chart, write the control-method entry for the control plan: characteristic, chart, subgroup size and frequency, who plots it, the rules in force, and a three-line response plan for a signal. State whether your process was in control over the period and, if not, what the signals coincided with. Paste both charts, the limit calculations and the two entries to your coach.

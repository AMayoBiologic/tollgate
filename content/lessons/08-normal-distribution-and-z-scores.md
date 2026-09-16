---
day: 8
week: 2
phase: Measure
title: The Normal Distribution and Z-Scores
minutes: 50
bok_sections: ["2.2"]
objectives:
  - Describe the normal distribution and the 68–95–99.7 rule
  - Convert any value to a Z-score and back
  - Use the Z table to find the proportion of a process below, above or between limits
  - Read a probability plot and an Anderson-Darling p-value to decide whether data are normal enough
  - Say what to do when data are not normal
glossary_terms: ["normal distribution", "bell curve", "empirical rule", "Z-score", "standard normal distribution", "Z table", "cumulative probability", "normality test", "probability plot", "Anderson-Darling test", "p-value", "tail", "percentile"]
---

## The Idea

### The shape most measurements take

Measure enough of almost anything produced by a stable process (fill weights, bolt diameters, coating thickness, exam scores) and the histogram takes a familiar shape: a symmetric hump, highest at the mean, falling away smoothly on both sides. This is the **normal distribution**, also called the **bell curve** because of its shape. It is the most important distribution in the course because so many process measurements follow it, because averages of samples follow it even when the raw data do not (Day 14), and because capability (Day 11) and most of the statistical tests in Week 4 (which compare groups and are called hypothesis tests) assume it.

A normal distribution is completely described by two numbers: its mean μ, which fixes where the centre is, and its standard deviation σ, which fixes how wide it is. Every normal curve has the same proportions relative to those two numbers. That is what makes the Z table possible.

### The 68–95–99.7 rule

For any normal distribution, the **empirical rule** says:

- about 68% of values lie within 1 standard deviation of the mean (μ ± 1σ);
- about 95% lie within 2 standard deviations (μ ± 2σ);
- about 99.7% lie within 3 standard deviations (μ ± 3σ).

The remainder sits in the two **tails**, split equally: about 16% beyond 1σ on each side, 2.5% beyond 2σ on each side, 0.15% beyond 3σ on each side. This rule alone answers many exam questions. If fill weight is normal with mean 250 g and standard deviation 4 g, then 95% of bottles weigh between 242 g and 258 g, and about 2.5% weigh more than 258 g.

The "six sigma" name comes from the same idea. Specification limits at μ ± 6σ leave essentially nothing in the tails: about 0.001 per million on each side, 0.002 in total, or 3.4 per million after the 1.5-sigma shift from Day 3.

### Z-scores: measuring in standard deviations

A **Z-score** says how many standard deviations a value sits above or below the mean:

`Z = (x − μ) ÷ σ`

A Z of +2.0 means two standard deviations above the mean; −1.5 means one and a half below. Converting a value to Z strips away the units and the scale, so that a 258 g bottle (Z = 2.0) and a 31-minute call from a process with mean 25 and standard deviation 4 (Z = 1.5) can be compared directly. The distribution of Z-scores is the **standard normal distribution**: a normal distribution with mean 0 and standard deviation 1.

The formula runs backwards too: `x = μ + Z × σ`. If you want the value that 95% of bottles fall below, look up the Z that has 95% below it (1.645) and compute 250 + 1.645 × 4 = 256.6 g. A value with a given percentage of the data below it is a **percentile**; 256.6 g is the 95th percentile.

### Reading the Z table

The **Z table** (the reference sheet in this app has one, and the exam provides one) lists, for each Z, the **cumulative probability**: the proportion of the standard normal distribution that lies *below* that Z. Rows give Z to one decimal place; columns give the second decimal. Look up Z = 2.00 and the table says 0.9772: 97.72% of values lie below two standard deviations above the mean.

Every question is a variation on three cases:

1. **Proportion below x.** Compute Z, read the table. P(below) = table value.
2. **Proportion above x.** Compute Z, read the table, subtract from 1. P(above) = 1 − table value.
3. **Proportion between two values.** Compute both Z's, read both, subtract the smaller cumulative from the larger.

For a negative Z, use symmetry: the proportion below −Z equals the proportion above +Z, which is 1 − table(Z). Some tables print negative Z rows directly; the result is the same.

The exam's favourite mistakes are reading the table value when the question asked for "above", and forgetting to subtract when asked for "between". Drawing a quick sketch of the curve and shading the region asked for prevents both.

### Is the data normal? Normality testing

Because so many tools assume normality, Measure includes a check. Looking at a histogram is a start, but small samples make ragged histograms. The standard tools are:

**Probability plot** (normal probability plot): the data are sorted and plotted against the values a perfect normal distribution would give. If the data are normal, the points fall close to a straight line. Curvature at the ends means skew or heavy tails; an S-shape means the data are more peaked or flatter than normal; a step pattern means the data are rounded or discrete.

**Anderson-Darling test**: a **normality test** that produces a statistic (AD) and a **p-value**. The p-value is the probability of seeing data at least this far from normal if the population really were normal. The decision rule is:

- p-value ≥ 0.05: no evidence against normality; treat the data as normal.
- p-value < 0.05: the data are significantly non-normal; do not use normal-based tools without adjusting.

Note the direction. A **high** p-value is what you want when testing normality, which is the opposite of most tests in Week 4 where a low p-value is the interesting result. Day 14 explains p-values in full; for now, remember "p low, normality no".

A typical software output looks like this:

```
Probability Plot of Fill Weight
Normal
Mean     250.1
StDev      3.98
N            60
AD        0.312
P-Value   0.541
```

P = 0.541 is above 0.05, so the fill weights can be treated as normal.

Very large samples make the test oversensitive: with 5 000 values, tiny departures from normality produce p < 0.05 even though the histogram looks fine. Use the probability plot as well as the p-value.

### When the data are not normal

Non-normal data are common: times and costs bounded at zero and skewed right, counts, proportions. Three responses, all met later in the course:

1. Check for mixing or outliers first. A bimodal histogram is two processes; stratify. One wild value may be a recording error.
2. Use a tool that does not assume normality: the median instead of the mean, a test that works on the ranks of the values rather than the values themselves (a non-parametric test, Day 19), or an attribute capability method (Day 12).
3. Transform the data so it becomes normal (Box-Cox, Day 22) and work in the transformed scale.

What you must not do is run a normal-based capability analysis or a Week 4 comparison test on clearly non-normal data and report the answer as if it meant something.

## Worked Example

A bottling line fills to a label weight of 250 g. Sixty bottles are weighed; the Anderson-Darling p-value is 0.541, so the data are treated as normal. Mean 250 g, standard deviation 4 g (the software output above shows the unrounded 250.1 and 3.98). The specification is 242 g to 258 g.

1. **Proportion above the upper limit.** Z = (258 − 250) ÷ 4 = 2.00. Table: 0.9772 below. Above = 1 − 0.9772 = 0.0228, or 2.28%.
2. **Proportion below the lower limit.** Z = (242 − 250) ÷ 4 = −2.00. By symmetry, the proportion below −2.00 equals the proportion above +2.00: 0.0228, or 2.28%.
3. **Proportion inside the specification.** 1 − 0.0228 − 0.0228 = 0.9544, or 95.44%. This matches the empirical rule's 95% for μ ± 2σ.
4. **Proportion above 255 g.** Z = (255 − 250) ÷ 4 = 1.25. Table: 0.8944. Above = 1 − 0.8944 = 0.1056, or 10.56%.
5. **The 95th percentile.** Z with 0.95 below is 1.645 (halfway between the table's 0.9495 at 1.64 and 0.9505 at 1.65). x = 250 + 1.645 × 4 = 256.6 g. Ninety-five percent of bottles weigh less than 256.6 g.
6. **Defects per million.** 4.56% of bottles are outside specification. On the DPMO scale that is 45 600 per million, which the sigma table reads as roughly 3.2 sigma. Day 11 turns this into a capability index.

A second process: call handling time, mean 25 minutes, standard deviation 4 minutes, treated as normal. Proportion of calls longer than 31 minutes: Z = (31 − 25) ÷ 4 = 1.50; table 0.9332; above = 6.68%. Proportion between 20 and 30 minutes: Z = −1.25 and +1.25; table for 1.25 is 0.8944, so below −1.25 is 0.1056; between = 0.8944 − 0.1056 = 0.7888, or 78.9%.

## Formula Card

- `Z = (x − μ) ÷ σ` — x is the value, μ the mean, σ the standard deviation.
- `x = μ + Z × σ` — value from a Z (for percentiles).
- P(below x) = table(Z). P(above x) = 1 − table(Z). P(between a and b) = table(Z_b) − table(Z_a).
- Symmetry: P(below −Z) = P(above +Z) = 1 − table(Z).
- Empirical rule: ±1σ ≈ 68%, ±2σ ≈ 95%, ±3σ ≈ 99.7%.
- Useful Z values: 1.645 leaves 5% in one tail; 1.96 leaves 2.5% in one tail (5% in both); 2.33 leaves 1%; 3.0 leaves 0.135%.
- Normality: Anderson-Darling p ≥ 0.05, treat as normal; p < 0.05, non-normal.

## Exam Traps

- The Z table gives the area *below* Z. For "above", subtract from 1. For "between", subtract two table values. Sketch and shade.
- Negative Z: use symmetry. P(below −1.5) = P(above +1.5) = 1 − 0.9332 = 0.0668.
- Z uses the standard deviation, not the variance. If a question gives the variance, take the square root first.
- 1.96 is the two-tailed 5% value (2.5% each side); 1.645 is the one-tailed 5% value. Questions swap them.
- Normality test: high p-value means normal. This is the reverse of the usual "low p is significant" habit. p < 0.05 means the data are not normal.
- A straight line on a probability plot means normal; curvature means not.
- The empirical rule is 68–95–99.7, for 1, 2 and 3 standard deviations. Not 50–95–99.
- The normal distribution is defined by its mean and standard deviation only. Skewness is zero and mean = median = mode.
- Large samples make normality tests reject for trivial departures; use the plot as well.

## Check Questions

- M-2.2-017
- M-2.2-018
- M-2.2-020
- M-2.2-022
- M-2.2-024

## Applied Task

Using the continuous historical data you collected on Day 7 (at least 30 values from your own project), calculate the mean and sample standard deviation in a spreadsheet, then draw a normal probability plot and run an Anderson-Darling normality test (free tools and most spreadsheet add-ins can do this; record the p-value). State whether the data can be treated as normal and why. If they can, calculate by hand, using Z-scores and the Z table, the percentage of values you would expect beyond your customer's specification limit or target in each direction, and compare with the actual percentage in the data. If they cannot, describe the shape (skewed, bimodal, bounded) and name which of the three responses you would use. Paste the statistics, the plot, the p-value and your calculation to your coach.

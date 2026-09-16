---
day: 16
week: 4
phase: Analyse
title: t-Tests and the 1-Sample Variance Test
minutes: 50
bok_sections: ["3.4"]
objectives:
  - Choose between the 1-sample, 2-sample and paired t-tests from a description of the data
  - Calculate a 1-sample t statistic and compare it with the critical value and the p-value
  - Explain the difference between the pooled and Welch versions of the 2-sample t-test and read their software output
  - Run a 1-sample variance (chi-square) test and read its output
  - State the assumptions of each test and what to do when they fail
glossary_terms: ["t-test", "t distribution", "1-sample t-test", "2-sample t-test", "paired t-test", "pooled t-test", "Welch's t-test", "equal variances", "1-sample variance test", "chi-square distribution", "assumption", "independence"]
---

## The Idea

### One family, three questions

Day 14 set up the machinery: null and alternative hypotheses, alpha, a test statistic, a p-value and a decision. Today applies it to the commonest question in a Green Belt project: is the average different? The tool is the **t-test**, which comes in three forms depending on what is being compared.

| Test | Question | Example |
|---|---|---|
| **1-sample t-test** | Is the mean of one population equal to a target value? | Is mean fill weight 250 g? |
| **2-sample t-test** | Are the means of two independent populations equal? | Do the day and night shifts produce the same mean cycle time? |
| **paired t-test** | Is the mean difference between two measurements on the same units zero? | Do the same ten machines run faster after maintenance? |

All three use the **t distribution**, a bell-shaped curve slightly wider than the normal to allow for the fact that the standard deviation is estimated from the sample rather than known. Its width depends on the degrees of freedom: with few observations it is much wider than normal; by about 30 degrees of freedom it is nearly the same, which is why 1.96 and 2.03 sit so close together. The t table lists critical values by degrees of freedom and alpha, and software gives the exact p-value.

### The 1-sample t-test

Hypotheses: H₀: μ = μ₀ (the target); H₁: μ ≠ μ₀ (or one-sided if the question has a direction).

`t = (x̄ − μ₀) ÷ (s ÷ √n)`, with `df = n − 1`.

The numerator is how far the sample mean is from the target; the denominator is the standard error from Day 14. So t is the distance to the target measured in standard errors. A t beyond the critical value (or a p-value at or below alpha) rejects H₀. The Day 14 worked example was a 1-sample t-test: t = 2.0 on 35 degrees of freedom, p = 0.053, fail to reject.

Assumptions: the observations are independent (one does not influence the next), and the data are roughly normal, or the sample is large enough (about 30) for the central limit theorem to cover the mean.

### The 2-sample t-test

Hypotheses: H₀: μ₁ = μ₂; H₁: μ₁ ≠ μ₂ (or one-sided).

The statistic is the difference between the two sample means divided by the standard error of that difference:

`t = (x̄₁ − x̄₂) ÷ SE of the difference`

The exam expects you to know that there are two versions, distinguished by what they assume about the two groups' spreads.

- **Pooled t-test** (assuming **equal variances**): the two sample variances are averaged (weighted by their degrees of freedom) into one pooled estimate, and `df = n₁ + n₂ − 2`. Slightly more powerful when the assumption holds.
- **Welch's t-test** (not assuming equal variances): each variance is used separately in the standard error, `SE = √(s₁²/n₁ + s₂²/n₂)`, and the degrees of freedom are calculated by a formula that gives a smaller (usually non-integer, rounded down) value. This is the safer default and what most software uses unless told otherwise.

Software can compare the two spreads first with a test of equal variances (an F-test or Levene's test; both are beyond this syllabus and you only need to know they exist). In practice: if the two standard deviations are within a factor of about two and the sample sizes are similar, either t-test gives nearly the same answer. When in doubt, use Welch.

Assumptions: the two samples are independent of each other, observations within each are independent, and each group is roughly normal or large enough.

### The paired t-test

When the two sets of numbers come from the *same* units (before and after on the same machines, two gauges on the same parts, two methods on the same operators), the variation between units is not of interest and would swamp a 2-sample test. Instead, take the difference for each unit, then run a 1-sample t-test on the differences against a target of zero:

`t = d̄ ÷ (s_d ÷ √n)`, with `df = n − 1`, where d̄ is the mean difference and s_d the standard deviation of the differences.

The exam's question is usually about recognising the design: same units measured twice means paired. Analysing paired data with a 2-sample test breaks that test's independence assumption and throws away the pairing, so it usually fails to find a real effect.

### The 1-sample variance test

Sometimes the question is about spread rather than centre: has the new fixture reduced the variation in shaft diameter? The **1-sample variance test** (also called the chi-square test for a variance) compares a sample variance with a hypothesised population variance σ₀²:

`χ² = (n − 1) × s² ÷ σ₀²`, with `df = n − 1`.

Hypotheses: H₀: σ² = σ₀²; H₁: σ² ≠ σ₀² (or one-sided, most often "less than" when testing for an improvement).

The statistic follows the **chi-square distribution** (written χ², "kai-square"), a right-skewed distribution that starts at zero. Because it is not symmetric, the two-tailed critical values are different at each end: for α = 0.05 and 24 degrees of freedom, reject if χ² is below 12.40 or above 39.36. For a one-sided test of "greater than", reject if χ² exceeds the upper 5% value, 36.42. Software prints the p-value and a confidence interval for the standard deviation, and the exam usually gives that output rather than expecting a table lookup.

This test is sensitive to non-normality; with non-normal data, transform first (Day 22) or rely on the software's robust alternative.

### Reading software output

The exam presents output like the block below and asks for the conclusion. The routine: find the p-value, compare with alpha, state reject or fail to reject, then say what that means in the process's terms. Check the confidence interval agrees (it excludes the null value when the test rejects).

```
Two-Sample T-Test and CI: Sort time (seconds) by shift
            N   Mean  StDev  SE Mean
Day        20  38.20   5.10     1.14
Night      18  42.90   6.40     1.51

Difference = mu (Day) - mu (Night)
Estimate for difference:  -4.70
95% CI for difference:  (-8.55, -0.85)
T-Test of difference = 0 (vs not =): T-Value = -2.49  P-Value = 0.018  DF = 32
```

p = 0.018 < 0.05: reject H₀. The night shift's mean sort time per parcel is higher by an estimated 4.7 seconds, and the interval (−8.55 to −0.85) excludes zero, agreeing with the test. DF = 32 rather than 36 tells you this was the Welch version.

### Assumptions and what to do if they fail

Every test today assumes **independence** of observations and approximate normality (or large samples). An **assumption** is a condition the test's mathematics relies on; when it fails, the p-value is not trustworthy. Check normality with the Day 8 tools. If the data are clearly non-normal and the samples are small, use the equivalent non-parametric test from Day 19: the 1-sample sign or Wilcoxon test for one sample or paired differences, and Mann-Whitney for two samples. Independence usually fails because of time order (autocorrelation: each value related to the one before it) or because units were measured in batches; there is no easy fix, so it is a sampling design problem to prevent on Day 6.

## Worked Example

Part A returns to the invoice team. Parts B and C move to the courier depot from Day 1, where parcels are sorted on a day shift and a night shift and the Y is the time to sort one parcel, in seconds. Part D returns to the shaft from Day 11.

**Part A: 1-sample.** The Day 14 example was a 1-sample t-test: 36 invoices, hands-on time mean 42.0 minutes, s = 6.0, target 40. t = (42 − 40) ÷ (6 ÷ √36) = 2.0, df = 35, critical 2.03, p = 0.053: fail to reject. The same arithmetic, now with its name.

**Part B: 2-sample.** Sort time per parcel. Day shift: n = 20, mean 38.2 seconds, s = 5.1. Night shift: n = 18, mean 42.9, s = 6.4.

1. Hypotheses: H₀: μday = μnight; H₁: μday ≠ μnight. α = 0.05.
2. Standard deviations 5.1 and 6.4 are within a factor of two; either version is fine. Use Welch.
3. SE of the difference = √(5.1²/20 + 6.4²/18) = √(1.3005 + 2.2756) = √3.576 = 1.891.
4. t = (38.2 − 42.9) ÷ 1.891 = −4.7 ÷ 1.891 = −2.49.
5. Welch df ≈ 32. Critical t (two-tailed, 0.05, 32 df) = 2.04. |−2.49| > 2.04: reject. Software: p = 0.018.
6. For comparison, the pooled version: pooled variance = (19 × 5.1² + 17 × 6.4²) ÷ 36 = (494.2 + 696.3) ÷ 36 = 33.07; SE = √(33.07 × (1/20 + 1/18)) = √(33.07 × 0.1056) = 1.868; t = −2.52 on 36 df, p = 0.017. Same conclusion.
7. Conclusion: the night shift takes longer per parcel, by about 4.7 seconds (95% CI 0.85 to 8.55). Whether that matters is a practical question: on a 40-second task it is 12%, worth a look at what differs on nights (lighting and the sort-screen freeze from Day 1 are candidates).

**Part C: paired.** Ten sorters were each timed on a standard batch of 20 parcels before and after the sort screen was rearranged, and each sorter's average time per parcel was recorded both times. Differences (before − after, seconds): 3.1, −0.4, 2.2, 1.8, 0.6, 2.9, 1.1, −0.2, 2.4, 1.5.

1. H₀: mean difference = 0; H₁: mean difference > 0 (one-sided: the change was meant to reduce time, decided in advance).
2. d̄ = 15.0 ÷ 10 = 1.50 seconds. s_d = 1.22.
3. t = 1.50 ÷ (1.22 ÷ √10) = 1.50 ÷ 0.386 = 3.89, df = 9.
4. One-sided critical t (0.05, 9 df) = 1.833. 3.89 > 1.833: reject. p ≈ 0.002.
5. Conclusion: the new layout saves about 1.5 seconds per parcel (a small but consistent effect: 8 of 10 sorters improved). Had this been run as a 2-sample test on the before and after columns, the sorter-to-sorter spread (several seconds) would have hidden it.

**Part D: variance.** The shaft process from Day 11 had a within-subgroup standard deviation of 0.12 mm, variance 0.0144. After a new fixture, 25 shafts give s = 0.10, s² = 0.0100. Has variation fallen? H₁: σ² < 0.0144 (one-sided). χ² = (25 − 1) × 0.0100 ÷ 0.0144 = 24 × 0.694 = 16.67, df = 24. For a "less than" test, reject if χ² falls below the lower 5% value, 13.85. 16.67 is above it: fail to reject; p = 0.14. The sample is consistent with a smaller variance but does not prove it; 25 shafts is a small sample for a variance test.

A second case, testing for an *increase*: historical variance 0.25, a new sample of 25 gives s² = 0.36. χ² = 24 × 0.36 ÷ 0.25 = 24 × 1.44 = 34.56, df = 24. Upper one-sided critical value at 0.05 = 36.42. 34.56 < 36.42: fail to reject; p ≈ 0.075. Again the estimate is higher but not significantly so.

## Formula Card

- `1-sample t = (x̄ − μ₀) ÷ (s ÷ √n)`, `df = n − 1`.
- `2-sample t (Welch) = (x̄₁ − x̄₂) ÷ √(s₁²/n₁ + s₂²/n₂)`, df from the Welch formula (software), smaller than n₁ + n₂ − 2.
- `2-sample t (pooled)`: `s_p² = [(n₁ − 1)s₁² + (n₂ − 1)s₂²] ÷ (n₁ + n₂ − 2)`; `t = (x̄₁ − x̄₂) ÷ √(s_p² (1/n₁ + 1/n₂))`; `df = n₁ + n₂ − 2`.
- `Paired t = d̄ ÷ (s_d ÷ √n)`, `df = n − 1`, on the differences.
- `1-sample variance χ² = (n − 1) s² ÷ σ₀²`, `df = n − 1`; asymmetric critical values.
- Decision: reject H₀ if p ≤ α, or if |t| > critical t.

## Exam Traps

- Same units measured twice means paired. "Ten machines before and after" is a paired test; "ten machines from plant A and ten from plant B" is a 2-sample test.
- 1-sample tests compare with a fixed target; 2-sample tests compare two groups. A target value in the stem is the giveaway.
- Pooled t uses df = n₁ + n₂ − 2 and assumes equal variances; Welch does not assume equal variances and has smaller df. Output showing non-integer or reduced DF is Welch.
- The t statistic uses the standard error (s ÷ √n), not s. Dividing by s alone gives a t that is too small by √n.
- Degrees of freedom for 1-sample and paired tests are n − 1, where n is the number of pairs, not the number of measurements.
- The chi-square distribution is not symmetric: the two-tailed critical values are different numbers at each end. Reject in the lower tail if testing for reduced variance.
- The variance test uses variances (s²), not standard deviations. If the question gives standard deviations, square them first.
- A confidence interval for the difference that includes zero corresponds to failing to reject; one that excludes zero corresponds to rejecting.
- Non-normal small samples: use the non-parametric equivalent, not a t-test.
- Reject or fail to reject; never accept H₀.

## Check Questions

- A-3.4-001
- A-3.4-002
- A-3.4-004
- A-3.4-007
- A-3.4-010

## Applied Task

From your own project's historical data, run one 2-sample t-test on the continuous measure comparing two groups that the Day 13 short list suggests differ (two shifts, two sites, two clerks, two suppliers), with at least 15 values per group. State the hypotheses, check normality of each group, choose pooled or Welch and say why, and calculate t, degrees of freedom and the p-value (software or spreadsheet), and the 95% confidence interval for the difference. If your records also contain a before-and-after measurement on the same units, run a paired t-test as well. Finish with two sentences: the statistical conclusion, and whether the estimated difference is practically significant for your business case. Paste the output and the two sentences to your coach.

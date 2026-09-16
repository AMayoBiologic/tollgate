---
day: 14
week: 3
phase: Analyse
title: Inference and Hypothesis Testing Concepts
minutes: 50
bok_sections: ["3.2", "3.3"]
objectives:
  - Explain what statistical inference is and why a sample statistic is only an estimate
  - State the central limit theorem and calculate a standard error
  - Build and read a confidence interval for a mean in plain terms
  - Write a null and an alternative hypothesis, and explain alpha, beta, Type I and Type II error, power and the p-value
  - Distinguish statistical from practical significance and choose between one- and two-tailed, one- and two-sample tests
glossary_terms: ["inference", "estimate", "sampling distribution", "standard error", "central limit theorem", "confidence interval", "confidence level", "margin of error", "hypothesis test", "null hypothesis", "alternative hypothesis", "alpha", "beta", "Type I error", "Type II error", "power", "test statistic", "critical value", "statistical significance", "practical significance", "one-tailed test", "two-tailed test", "one-sample test", "two-sample test", "paired test", "degrees of freedom", "effect size"]
---

## The Idea

### From the sample to the population

Day 6 made the distinction: a parameter describes the population, a statistic describes the sample, and you almost never see the population. **Inference** is the set of methods for saying something about the population from the sample, together with a statement of how sure you can be. Every test in Weeks 3 and 4 is inference. Today covers the ideas they all share, so that the individual tests on Days 16 to 19 become variations on one theme rather than twenty separate procedures.

The starting point is that the sample mean is not the population mean. If you take 36 invoices and find a mean processing time of 42 minutes, the population mean is not 42; it is somewhere near 42, and a different 36 invoices would have given a different number. The sample mean is an **estimate**. Inference is about how far off it might be.

### The central limit theorem and the standard error

Imagine taking not one sample of 36 but thousands of them, and calculating the mean of each. Those thousands of sample means form their own distribution, the **sampling distribution** of the mean. The **central limit theorem** (CLT) says three things about it:

1. Its mean is the population mean μ. Sample means are not biased; they scatter around the truth.
2. Its standard deviation is `σ ÷ √n`, called the **standard error** of the mean (SE). Sample means scatter less than individual values, and the scatter shrinks with the square root of the sample size. Four times the sample halves the standard error.
3. Its shape is approximately normal *whatever the shape of the population*, provided n is reasonably large (30 is the usual rule of thumb; less if the population is itself near-normal).

The third point is why the normal distribution and the Z table run through the whole course. Even when individual cycle times are heavily skewed, the *average* of 36 of them behaves normally, so tools built on the normal distribution work on averages. Because σ is usually unknown, s from the sample stands in for it, and the standard error is estimated as `s ÷ √n`.

### Confidence intervals

A **confidence interval** (CI) turns an estimate into a range: the values of the population parameter that are consistent with the sample. For a mean:

`x̄ ± (critical value) × (s ÷ √n)`

The critical value comes from the **confidence level** the analyst chooses, most often 95%. For large samples the value is the Z from Day 8: 1.96 for 95%, 1.645 for 90%, 2.576 for 99%. For small samples with s standing in for σ, the value comes from the t distribution (Day 16), slightly larger than Z to allow for the extra uncertainty in s; with n = 36 it is 2.03. The half-width of the interval is the **margin of error**.

Reading a 95% confidence interval of 40.0 to 44.0 minutes: "the method that produced this interval captures the true mean 95% of the time; we are 95% confident the population mean is between 40.0 and 44.0". Three things make an interval narrower: a larger sample, less variation in the data, or a lower confidence level. Only the first two are genuine improvements.

Intervals and tests are the same information in two forms: if a confidence interval includes the hypothesised value, the matching two-tailed test does not reject; if it excludes it, the test rejects. Day 16 uses this for the difference between two means, where the hypothesised value is zero.

### Hypothesis testing: the logic

A **hypothesis test** is a formal way of deciding whether an effect seen in a sample is real or could be an accident of sampling. It always starts with two statements.

- The **null hypothesis**, written H₀, is the statement of no effect, no difference, no change: the two shifts have the same mean; the new method has the same defect rate as the old; the process mean is 50. It is the default that the data have to overturn.
- The **alternative hypothesis**, H₁ or Hₐ, is what you are trying to demonstrate: the means differ; the new rate is lower; the process mean is not 50.

The test assumes H₀ is true, calculates how surprising the sample would be if it were, and reports that surprise as the **p-value**: the probability of getting a result at least as extreme as the one observed, if the null hypothesis were true. A small p-value means the data would be very unlikely under H₀, so H₀ is rejected in favour of H₁. A large p-value means the data are compatible with H₀, so H₀ is not rejected.

The cut-off is **alpha** (α), the significance level, chosen before the test and almost always 0.05:

- p ≤ α: reject H₀. The result is **statistically significant**.
- p > α: fail to reject H₀. The result is not significant.

The wording matters and the exam is strict about it. You never "accept" the null hypothesis; failing to find a difference is not proof that there is none, only that this sample did not show one. "Fail to reject H₀" is the only correct phrase.

Under the hood, each test computes a **test statistic** (a Z or t value for means and proportions, a chi-square value for variances and counts, or an F value in ANOVA, analysis of variance, on Day 17) from the data and compares it with a **critical value** from a table at the chosen α; the p-value is the tail area beyond the test statistic. Reject if the statistic is beyond the critical value, which is the same decision as p ≤ α. Software prints the p-value, so that is what you use. Many tables need the **degrees of freedom** (df), roughly the number of independent pieces of information in the estimate; for a one-sample mean it is n − 1, and each test's df formula appears with the test.

### The two ways to be wrong

Because the decision is made from a sample, it can be wrong in two ways, and the syllabus names both.

| | H₀ actually true | H₀ actually false |
|---|---|---|
| Reject H₀ | **Type I error** (false alarm), probability α | Correct: **power** = 1 − β |
| Fail to reject H₀ | Correct | **Type II error** (missed effect), probability **beta** (β) |

A **Type I error** is concluding there is an effect when there is none, and it happens with probability α, which is why α is chosen small. A **Type II error** is missing an effect that is real, with probability β. **Power** is 1 − β, the probability of detecting an effect that is really there. Power rises with sample size, with the size of the effect, and with α (a looser α catches more, at the cost of more false alarms). Common targets: α = 0.05, power = 0.80 (β = 0.20). A test that fails to reject H₀ with a small sample has probably lacked power; the honest report is "no significant difference detected with n = 8", not "no difference".

### Statistical versus practical significance

**Statistical significance** says the effect is unlikely to be chance. **Practical significance** says the effect is big enough to matter. They are independent. With a sample of 5 000 invoices, a difference in mean processing time of 12 seconds can be statistically significant at p = 0.001 and worth nothing. With a sample of 8, a difference of 20 minutes can fail to reach significance and still be the most important thing in the project. Always report the **effect size** (the actual difference, or the confidence interval for it) alongside the p-value, and let the business case decide whether it matters.

### Types of test

The tests in Days 16 to 19 are sorted by three questions, and the exam asks you to sort them the same way.

**How many samples?** A **one-sample test** compares one sample with a fixed target value (is the mean fill weight 250 g?). A **two-sample test** compares two independent samples with each other (do the two shifts differ?). A **paired test** compares two measurements on the same units (before and after on the same machines). More than two groups needs ANOVA (Day 17) or its non-normal equivalents.

**Which direction?** A **two-tailed test** asks whether the parameter differs from the target in either direction: H₁ is "not equal", and α is split with half in each tail (so the 5% critical Z is 1.96). A **one-tailed test** asks about one direction only: H₁ is "greater than" or "less than", and all of α sits in one tail (critical Z 1.645). One-tailed tests are used when only one direction matters or is possible, and the direction must be decided *before* seeing the data. For the same data, a one-tailed p-value is half the two-tailed one, which is why choosing the tail after the fact is cheating.

**What kind of data and distribution?** Continuous normal data use t-tests, ANOVA and the chi-square test for a single variance. Proportions use Z tests and chi-square. Continuous non-normal data use tests that work on the ranks of the values instead of the values themselves (Day 19). Day 19 collects all of this into one decision table.

## Worked Example

The invoice team's finance director claims that the hands-on work on an invoice takes "about 40 minutes". The team times the hands-on processing (order entry to issue, excluding queue time) of 36 randomly chosen invoices: mean 42.0 minutes, sample standard deviation 6.0 minutes. A probability plot is straight, so the data are treated as normal. (Day 9's map put the process time at 41 minutes, so this is no surprise.)

1. **Standard error.** 6.0 ÷ √36 = 6.0 ÷ 6 = 1.0 minute. The sample mean is a much more precise estimate than any single invoice.
2. **95% confidence interval.** With n = 36 the t critical value, read from the t table the exam provides at 35 degrees of freedom, is 2.03 (close to the Z of 1.96). 42.0 ± 2.03 × 1.0 = 42.0 ± 2.03, so 39.97 to 44.03 minutes. Rounded: 40.0 to 44.0.
3. **Read it.** The interval includes 40, so 40 minutes is consistent with the data. A claim of 38 minutes would not be.
4. **Set up a test.** H₀: μ = 40. H₁: μ ≠ 40 (two-tailed, because the director's claim could be wrong in either direction). α = 0.05.
5. **Test statistic.** t = (42.0 − 40) ÷ 1.0 = 2.0, with df = 35.
6. **Compare.** Critical t for α = 0.05 two-tailed, df = 35, is 2.03. The statistic 2.0 is inside it, but only barely. Software gives p = 0.053.
7. **Decide.** p = 0.053 > 0.05: fail to reject H₀. The data do not show, at the 5% level, that the mean differs from 40. This agrees with the interval, which contains 40.
8. **Errors and power.** If the true mean really is 42, the team would have made a Type II error. With n = 36 and a 2-minute effect the test's power is only about 50%, so this outcome was a coin toss. Doubling the sample to 72 would cut the standard error to 0.71 and raise power to about 80%.
9. **Practical significance.** Even if it were significant, a 2-minute difference on a 40-minute process is not worth a project. Hands-on time is not where the project's problem lies; the team returns to the error-rate Y.
10. **One-tailed variant.** Had the question been "is processing slower than the director claims?", H₁: μ > 40, one-tailed, p = 0.053 ÷ 2 = 0.027, reject H₀. Same data, opposite decision: the tail must be chosen before looking.

## Formula Card

- `Standard error of the mean SE = σ ÷ √n` (use `s ÷ √n` when σ is unknown).
- `Confidence interval for a mean = x̄ ± critical value × SE` — Z for large n (1.645 at 90%, 1.96 at 95%, 2.576 at 99%); t with n − 1 df for small n.
- `Margin of error = critical value × SE`.
- Decision: `p ≤ α → reject H₀` (significant); `p > α → fail to reject H₀`.
- `α = P(Type I error)`; `β = P(Type II error)`; `Power = 1 − β`.
- One-tailed p = two-tailed p ÷ 2 (same data); one-tailed critical Z at 5% = 1.645; two-tailed = 1.96.
- `df for one-sample mean = n − 1`.

## Exam Traps

- Never "accept H₀". The choices are "reject" and "fail to reject". Any option that says accept is wrong.
- p ≤ α means significant, reject H₀. p > α means not significant. Questions give p = 0.08 with α = 0.05 and offer "reject" as the distractor.
- Type I is a false alarm (rejecting a true H₀), probability α. Type II is a miss (failing to reject a false H₀), probability β. Power is 1 − β, not 1 − α.
- Standard error is σ ÷ √n, not σ ÷ n. Doubling n does not halve the standard error; quadrupling it does.
- The central limit theorem is about the distribution of *sample means*, not of individual values. It does not make skewed data normal.
- A 95% confidence interval that includes the hypothesised value is the same as a two-tailed test that fails to reject at α = 0.05.
- Statistical significance is not practical significance. Large samples make trivial differences significant; small samples miss big ones.
- One-tailed vs two-tailed: "differs" is two-tailed; "greater than" or "less than" is one-tailed; the choice is made before the data are seen. Same data, one-tailed p is half.
- One sample versus a target value; two samples versus each other; paired when the same units are measured twice.
- A non-significant result with a small sample usually means low power, not "no effect".

## Check Questions

- A-3.3-001
- A-3.3-003
- A-3.2-006
- A-3.3-006
- A-3.3-009

## Applied Task

Take the continuous data set from your own project (Day 7, at least 30 values from your organisation's records) and calculate the standard error of the mean and a 95% confidence interval for the mean, showing the arithmetic. Then write, for the first x on your Day 13 short list, a full hypothesis statement: the null and alternative hypotheses in words and symbols, whether it is one- or two-tailed and why, whether it is a one-sample, two-sample or paired comparison, the alpha you will use, the data you will need (from your historical records, and how much), and the smallest difference that would be practically significant for your business case. Paste the interval and the hypothesis statement to your coach.

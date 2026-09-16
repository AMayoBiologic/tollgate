---
day: 18
week: 4
phase: Analyse
title: Proportions and Chi-Square
minutes: 50
bok_sections: ["3.5"]
objectives:
  - Run a 1-proportion test against a target rate and a 2-proportion test between two groups, and read the output
  - Calculate a confidence interval for a proportion
  - Build a contingency table, calculate expected counts and degrees of freedom, and run a chi-square test of independence
  - Interpret a chi-square result and say what "association" does and does not mean
  - Recognise when a proportion test or a chi-square test is the right tool for attribute data
glossary_terms: ["1-proportion test", "2-proportion test", "chi-square test of independence", "contingency table", "expected count", "observed count", "association", "goodness-of-fit test", "pooled proportion", "minimum expected count"]
---

## The Idea

### Attribute data need their own tests

Days 16 and 17 tested means of continuous data. Most Green Belt primary metrics are proportions: the percentage of invoices with errors, of deliveries that are late, of calls answered in time. A proportion is attribute data (Day 6), and the tests for it are built on counts rather than means. IASSC lists them under the non-normal tests, because a yes/no outcome is not normally distributed, although with large enough samples the proportion tests use the normal distribution through the central limit theorem (Day 14).

Three tools cover the exam:

| Question | Tool |
|---|---|
| Is one proportion equal to a target value? | **1-proportion test** |
| Are two proportions equal? | **2-proportion test** |
| Is a category outcome related to a category factor (three or more groups, or more than two outcomes)? | **Chi-square test of independence** |

### The 1-proportion test

Hypotheses: H₀: p = p₀ (the target); H₁: p ≠ p₀, or one-sided.

With x successes (here "success" means the event counted, even if it is a defect) in n trials, the sample proportion is p̂ = x ÷ n. The test statistic for reasonably large samples uses the normal approximation:

`Z = (p̂ − p₀) ÷ √(p₀(1 − p₀) ÷ n)`

The denominator is the standard error of a proportion under H₀. Compare Z with 1.96 (two-tailed) or 1.645 (one-tailed), or read the p-value. The approximation is adequate when both n × p₀ and n × (1 − p₀) are at least 5; software will otherwise use an exact method based on the binomial distribution (Day 20), which is what the exam usually shows in output.

A confidence interval for the proportion uses the sample proportion in the standard error:

`p̂ ± Z × √(p̂(1 − p̂) ÷ n)`

Proportions need big samples. A 95% interval on 45 errors in 300 invoices (15%) runs from about 11% to 19%, four percentage points either way. To halve that width needs four times the invoices. This is the reason Day 6 said to collect continuous data where possible.

### The 2-proportion test

Hypotheses: H₀: p₁ = p₂; H₁: p₁ ≠ p₂, or one-sided.

Under H₀ the two groups share one proportion, estimated by pooling: the **pooled proportion** p̄ = (x₁ + x₂) ÷ (n₁ + n₂). The statistic is:

`Z = (p̂₁ − p̂₂) ÷ √(p̄(1 − p̄)(1/n₁ + 1/n₂))`

Software output reports the estimate of the difference, a confidence interval for it, the Z value and the p-value (and sometimes a second, exact p-value for small counts, which agrees with the first when the samples are large). Read it exactly as a 2-sample t output: p-value against alpha, then the size of the difference.

### The chi-square test of independence

When the factor has more than two levels (four suppliers), or the outcome has more than two categories (error type A, B, C, none), the data go into a **contingency table**: rows for one variable, columns for the other, and the **observed count** in each cell. The **chi-square test of independence** asks whether the row variable and the column variable are related, or **independent** (the distribution of outcomes is the same in every row).

Hypotheses: H₀: the two variables are independent (no association); H₁: they are associated.

The method compares each observed count with the **expected count** it would have if H₀ were true:

`Expected count = (row total × column total) ÷ grand total`

Then:

`χ² = Σ (observed − expected)² ÷ expected`, summed over every cell, with `df = (rows − 1) × (columns − 1)`.

A large χ² means the observed counts are far from what independence predicts. Compare with the chi-square table at the degrees of freedom (3.84 for 1 df, 5.99 for 2 df, 9.49 for 4 df at α = 0.05) or use the p-value. Note the degrees of freedom formula: a 2 × 2 table has 1 degree of freedom, not 3; a 3 × 4 table has 6.

The test is valid when the **minimum expected count** in every cell is at least 5 (some texts allow a few cells down to 1 if most are above 5). Software warns when this fails; the fix is to combine sparse categories or collect more data.

Two readings the exam checks. First, a significant result shows **association**: the outcome distribution differs between groups. It does not say which cells differ (look at the cells with the largest (observed − expected)² ÷ expected contributions) and it does not prove causation; the group might differ in something else. Second, a 2 × 2 chi-square and a two-tailed 2-proportion test are the same test: the chi-square statistic equals Z squared, and the p-values match.

A relative, the chi-square **goodness-of-fit test**, compares one set of observed counts with counts expected from a claimed distribution (are defects spread evenly across five days of the week?). Same statistic, with df = categories − 1. It appears occasionally.

### Reading output

```
Chi-Square Test for Association: Order Source, Invoice Status

               Error   No error   Total
Web              27       273       300
Phone            12       288       300
Total            39       561       600

Expected counts:  Web/Error 19.5   Web/No error 280.5   Phone/Error 19.5   Phone/No error 280.5
Pearson Chi-Square = 6.170, DF = 1, P-Value = 0.013
```

p = 0.013 < 0.05: reject independence. Invoice status is associated with order source: web orders have more errors (27 of 300 = 9.0%) than phone orders (12 of 300 = 4.0%). Every expected count exceeds 5, so the test is valid. "Pearson" is the name of the standard chi-square statistic. These are the same counts as Part B of the worked example, and 6.17 is 2.48², the Z from that test squared.

## Worked Example

The invoice team tests two x's from its Day 13 short list with attribute data from three months of records.

**Part A: has the error rate moved?** The charter baseline is 9%. In the latest 300-invoice sample, 45 invoices had at least one error.

1. p̂ = 45 ÷ 300 = 0.15. H₀: p = 0.09; H₁: p ≠ 0.09; α = 0.05.
2. Check: 300 × 0.09 = 27 and 300 × 0.91 = 273, both above 5.
3. Standard error under H₀ = √(0.09 × 0.91 ÷ 300) = √0.000273 = 0.01652.
4. Z = (0.15 − 0.09) ÷ 0.01652 = 3.63. Well beyond 1.96; p < 0.001.
5. Confidence interval: 0.15 ± 1.96 × √(0.15 × 0.85 ÷ 300) = 0.15 ± 1.96 × 0.02062 = 0.15 ± 0.0404, so 11.0% to 19.0%.
6. Conclusion: this month's error rate is significantly above the 9% baseline. Before acting, the team asks what was different about the month: it contained the financial year-end surge in orders, a candidate x from the fishbone.

**Part B: does order source matter?** Of 300 web orders, 27 produced an invoice error; of 300 phone orders, 12 did.

1. p̂₁ = 27 ÷ 300 = 0.090; p̂₂ = 12 ÷ 300 = 0.040. H₀: p₁ = p₂; H₁: p₁ ≠ p₂.
2. Pooled p̄ = (27 + 12) ÷ 600 = 0.065.
3. Standard error = √(0.065 × 0.935 × (1/300 + 1/300)) = √(0.06078 × 0.006667) = √0.000405 = 0.02013.
4. Z = (0.090 − 0.040) ÷ 0.02013 = 2.48. p = 0.013.
5. Conclusion: web orders have a significantly higher error rate, 9.0% against 4.0%, a difference of 5 percentage points. Combined with the Day 9 finding that web orders arrive without a purchase order field, this is the x the team will fix first.

**Part C: is error type related to clerk?** A random sample of 120 errors from the three-month error log, 60 from each of two clerks, classified by type:

| | Purchase order | Line items | Address | Total |
|---|---|---|---|---|
| Ana | 30 | 10 | 20 | 60 |
| Ben | 20 | 30 | 10 | 60 |
| Total | 50 | 40 | 30 | 120 |

1. H₀: error type is independent of clerk; H₁: associated.
2. Expected counts: Ana/PO = 60 × 50 ÷ 120 = 25; Ana/Line = 60 × 40 ÷ 120 = 20; Ana/Address = 15; Ben's row is the same because the row totals are equal.
3. Contributions: (30 − 25)²/25 = 1.00; (10 − 20)²/20 = 5.00; (20 − 15)²/15 = 1.67; (20 − 25)²/25 = 1.00; (30 − 20)²/20 = 5.00; (10 − 15)²/15 = 1.67. Sum χ² = 15.33.
4. df = (2 − 1) × (3 − 1) = 2. Critical value at 0.05 = 5.99. 15.33 > 5.99; p = 0.0005.
5. Conclusion: error type is associated with clerk. The largest contributions are the line-item cells: Ben makes far more line-item errors than expected and Ana fewer, while Ben's purchase-order errors are fewer than expected. Line-item entry joins address entry (Day 17) on the list of things Ben does differently.

## Formula Card

- `p̂ = x ÷ n`.
- `1-proportion Z = (p̂ − p₀) ÷ √(p₀(1 − p₀) ÷ n)`; valid when n·p₀ ≥ 5 and n·(1 − p₀) ≥ 5.
- `CI for a proportion = p̂ ± Z × √(p̂(1 − p̂) ÷ n)`; Z = 1.96 at 95%.
- `Pooled proportion p̄ = (x₁ + x₂) ÷ (n₁ + n₂)`; `2-proportion Z = (p̂₁ − p̂₂) ÷ √(p̄(1 − p̄)(1/n₁ + 1/n₂))`.
- `Expected count = row total × column total ÷ grand total`.
- `χ² = Σ (O − E)² ÷ E`; `df = (rows − 1)(columns − 1)`; critical 3.84 (1 df), 5.99 (2 df), 7.81 (3 df), 9.49 (4 df) at α = 0.05.
- Goodness of fit: same statistic, `df = categories − 1`.

## Exam Traps

- Degrees of freedom for a contingency table are (rows − 1)(columns − 1), not rows × columns and not n − 1. A 2 × 2 table has 1 df.
- Expected count uses row total × column total ÷ grand total, not the average of the cells.
- The 1-proportion standard error uses the hypothesised p₀; the confidence interval uses the sample p̂. Mixing them up changes the numbers.
- The 2-proportion test uses the pooled proportion in its standard error.
- Chi-square shows association, not causation, and does not say which group differs; look at the cell contributions.
- The chi-square test needs expected counts of at least 5 in each cell; observed counts of zero are fine as long as expected counts are not small.
- A significant chi-square with a huge sample can reflect a trivial difference in proportions; report the proportions.
- Proportion tests are for yes/no data. A question giving a mean and standard deviation wants a t-test.
- 2 × 2 chi-square and the two-tailed 2-proportion test give the same p-value.
- Reject or fail to reject; never accept H₀.

## Check Questions

- A-3.5-001
- A-3.5-003
- A-3.5-005
- A-3.5-008
- A-3.5-010

## Applied Task

From your own project's historical records, run: (1) a 1-proportion test of the latest month's primary-metric proportion against the charter baseline, with the confidence interval; (2) a 2-proportion test comparing the proportion between two groups on your Day 13 short list; and (3) a chi-square test of independence on a contingency table of defect type against a factor with two or more levels, showing the expected counts, the degrees of freedom and the cell contributions. Check the minimum expected count rule. For each test state the hypotheses, the statistic, the p-value and a one-sentence conclusion in process terms, and note which x's are now confirmed, which are eliminated, and which need more data. Paste the three results to your coach.

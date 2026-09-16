---
day: 19
week: 4
phase: Analyse
title: Tests for Non-Normal Data
minutes: 50
bok_sections: ["3.5"]
objectives:
  - Explain what a non-parametric test is, why it works on ranks and when to use one
  - Match each of Mann-Whitney, Kruskal-Wallis, Mood's median, Friedman, 1-sample sign and 1-sample Wilcoxon to the normal-data test it replaces
  - Read the software output of a non-parametric test and state the conclusion
  - Use the "which test do I use" decision table to choose a test from the data type, number of groups and normality
  - Recognise the trade-offs of non-parametric tests: robustness against power
glossary_terms: ["non-parametric test", "parametric test", "rank", "Mann-Whitney test", "Kruskal-Wallis test", "Mood's median test", "Friedman test", "1-sample sign test", "1-sample Wilcoxon test", "robust", "blocked design", "test selection table"]
---

## The Idea

### When the mean is the wrong question

The t-tests and ANOVA of Days 16 and 17 are **parametric tests**: they assume the data follow a particular distribution (the normal) and they test its parameter, the mean. When the data are clearly non-normal and the sample is too small for the central limit theorem to rescue the mean, three things go wrong: the p-value is unreliable, an outlier can dominate the result, and the mean itself may be a poor description of the middle (Day 7).

**Non-parametric tests** make no assumption about the distribution's shape. They do it by replacing each value with its **rank**: 1 for the smallest, 2 for the next, and so on across all the data. An outlier of 900 minutes becomes rank 40, the same distance from rank 39 as any other neighbour, so it cannot dominate. The tests then ask whether the ranks are distributed evenly between the groups. Because ranks track the order of the data, these tests are about medians (or, strictly, about whether one group tends to produce larger values than another), which suits skewed data such as times and costs.

The price is power. When the data really are normal, a non-parametric test is a little less likely to detect a real effect than the parametric equivalent (roughly 95% as efficient for Mann-Whitney). When the data are not normal, the non-parametric test is often *more* powerful, as well as being **robust**: its answer does not change much when an outlier or a heavy tail is present.

The exam does not ask you to compute rank sums by hand. It asks which test to use and what the output means.

### The six tests, mapped to their parametric partners

| Situation | Parametric test (normal data) | Non-parametric test (non-normal data) |
|---|---|---|
| One sample against a target | 1-sample t-test | **1-sample sign test** or **1-sample Wilcoxon test** |
| Paired data | Paired t-test | Sign test or Wilcoxon test on the differences |
| Two independent groups | 2-sample t-test | **Mann-Whitney test** |
| Three or more independent groups | One-way ANOVA | **Kruskal-Wallis test** or **Mood's median test** |
| Three or more related groups (each unit measured under every condition) | Blocked ANOVA (beyond this course) | **Friedman test** |

**1-sample sign test.** Tests H₀: median = target. It counts how many values fall above the target and how many below, ignoring their size, and asks whether the split is consistent with 50:50 using the binomial distribution. It uses the least information of any test and so has the least power, but it works for any data, including ordinal data (categories with a natural order but no fixed spacing between them, such as rankings or satisfaction scores from 1 to 5).

**1-sample Wilcoxon test** (Wilcoxon signed-rank test). Also tests H₀: median = target, but uses the sizes of the differences from the target as well as their signs, by ranking the absolute differences. More powerful than the sign test. It assumes the distribution is symmetric about the median, which is a much weaker assumption than normality. Applied to paired data, it is the non-parametric paired test.

**Mann-Whitney test** (also called the Wilcoxon rank-sum test). Tests whether two independent groups have the same median, H₀: η₁ = η₂ (η, eta, is the symbol for a median). Ranks all the values together and compares the rank sums. The non-parametric 2-sample t-test, and the most used of the six.

**Kruskal-Wallis test.** Extends Mann-Whitney to three or more groups: H₀: all medians equal; H₁: at least one differs. The non-parametric one-way ANOVA. Its statistic H is compared with a chi-square distribution with k − 1 degrees of freedom. Like ANOVA, a significant result needs follow-up pairwise comparisons to say which groups differ.

**Mood's median test.** Also compares medians across two or more groups, but with a cruder method: count how many values in each group are above and below the overall median, then run a chi-square test on that table. It has less power than Kruskal-Wallis but is more robust to outliers and to groups with different spreads. Use Mood's when the data have wild values; use Kruskal-Wallis otherwise.

**Friedman test.** The non-parametric test for a **blocked design**: each unit (block) is measured under every one of three or more conditions, such as ten operators each timed on three methods. Ranks are assigned within each block, so differences between operators are removed, and the test asks whether the conditions differ. It is the multi-condition extension of the paired test.

### Reading the output

Non-parametric output looks like this:

```
Mann-Whitney Test and CI: Web, Phone
        N   Median
Web     8   13.50
Phone   8   22.00
Point estimate for η1 - η2 is -8.00
95.9 Percent CI for η1 - η2 is (-12.00, -3.00)
W = 42.0
Test of η1 = η2 vs η1 ≠ η2 is significant at 0.0047
```

Read it as always: the p-value (0.0047) against alpha, then the estimated difference in medians (−8.0) and its confidence interval (excludes zero, so it agrees). W is the rank sum for the first group; the exam does not expect you to interpret W itself. The odd confidence level (95.9%) is normal for rank-based intervals, which can only take certain values.

Kruskal-Wallis output reports H, its degrees of freedom, the p-value and each group's median and average rank. Mood's median reports a chi-square, its degrees of freedom, the p-value and a table of counts above and below the overall median. Friedman reports S (a chi-square statistic), degrees of freedom and the p-value, with the estimated median for each condition.

### The decision table

The exam's favourite question in this section describes data and asks for the test. Work through three questions in order.

1. **What type is the Y?** Continuous, or attribute (proportion or count)?
2. **How many groups, and are they independent or related?** One sample against a target; two independent; two related (paired); three or more independent; three or more related.
3. **For continuous Y, is it normal (or the samples large)?** Yes: parametric. No: non-parametric.

| Y | Groups | Normal or large n | Not normal, small n |
|---|---|---|---|
| Continuous | One vs target | 1-sample t-test | 1-sample sign or Wilcoxon |
| Continuous | Two independent | 2-sample t-test | Mann-Whitney |
| Continuous | Two related (paired) | Paired t-test | Wilcoxon (or sign) on differences |
| Continuous | Three or more independent | One-way ANOVA | Kruskal-Wallis (or Mood's median) |
| Continuous | Three or more related | Repeated-measures ANOVA | Friedman |
| Continuous, spread | One variance vs target | 1-sample variance (chi-square) test | Transform the data first (Day 22) |
| Attribute (proportion) | One vs target | 1-proportion test | (same; it does not assume normality of the raw data) |
| Attribute (proportion) | Two | 2-proportion test | (same) |
| Attribute (category) | Two or more groups | Chi-square test of independence | (same) |

Two extra rules. If the question is about the *relationship* between two continuous variables rather than a difference between groups, the tool is correlation and regression (Day 21). If the x is continuous and the Y continuous, that is regression too.

## Worked Example

The invoice team looks at the time (working hours) from customer query to resolution for invoices that were disputed. Times are heavily right-skewed with a few very long cases; n is small.

**Part A: web versus phone orders (two independent groups).** Resolution hours for 8 disputed web-order invoices: 12, 15, 11, 18, 14, 22, 9, 13 (median 13.5). For 8 phone-order invoices: 19, 24, 17, 28, 21, 30, 16, 23 (median 22).

1. Normality: with 8 values per group and known skew, a t-test is not trustworthy. Choose Mann-Whitney.
2. H₀: the medians are equal; H₁: they differ. α = 0.05.
3. Ranking all 16 values together, the web values take mostly low ranks and the phone values mostly high ranks: of the 64 web-phone pairs, only six have the web value higher. Software: W = 42, p = 0.0047.
4. Conclusion: reject H₀. Phone-order disputes take longer to resolve (median 22 hours against 13.5). Given the small sample, the team notes this as a lead rather than a fact, and checks why phone disputes drag: the order was taken verbally and there is nothing written to check against.

**Part B: three order channels (three independent groups).** Adding a third channel, orders keyed by sales representatives, with resolution times 14, 16, 13, 20, 15, 18, 12, 17 (median 15.5), and comparing all three: Kruskal-Wallis, H₀: all three medians equal. Software: H = 10.3, df = 2, p = 0.0058. Reject: at least one channel differs. Pairwise follow-up shows the phone group differs from both others.

**Part C: one sample against a target.** The service standard says disputes should be resolved within 12 hours (median). Ten resolution times: 12, 15, 11, 18, 14, 22, 9, 13, 16, 17. Sign test, H₀: median = 12; H₁: median > 12 (one-sided, the team suspects the standard is missed). Ignoring the value equal to 12, 7 of the remaining 9 are above 12. Software: one-sided p = 0.09 (two-sided 0.18). Fail to reject: 7 of 9 is not far enough from 50:50 with this few values. The Wilcoxon test on the same data uses the sizes of the differences too and gives one-sided p = 0.025 (two-sided 0.050): reject at 0.05, but only barely. This is the power difference in action; because the differences are not obviously asymmetric, the Wilcoxon result is the one to report, with the note that the margin is thin and a larger sample is needed before the standard is challenged.

**Part D: choosing the test.** Three stems of the kind the exam sets:

- "Twelve operators each assembled the part using three fixtures; assembly times are skewed. Which test?" Three related conditions per block, non-normal: Friedman.
- "The proportion of late deliveries from four depots is compared." Attribute Y, four groups: chi-square test of independence (a 4 × 2 table).
- "Fifty cycle times from a new machine are compared with the previous mean of 40 seconds; the data are normal." Continuous, one sample vs target, normal: 1-sample t-test.

## Formula Card

No formulas to calculate by hand in this lesson. The decisions to memorise:

- Non-normal and small n: replace t-tests with sign/Wilcoxon (one sample or paired), Mann-Whitney (two groups), Kruskal-Wallis or Mood's median (three or more), Friedman (three or more related).
- Sign test uses only the direction of each difference; Wilcoxon uses direction and size; Wilcoxon is more powerful but assumes symmetry.
- Mood's median is more robust to outliers than Kruskal-Wallis; Kruskal-Wallis is more powerful.
- Non-parametric tests are about medians (η); their output includes the p-value, the estimated median difference and a rank-based confidence interval.
- Kruskal-Wallis H and Friedman S are compared with chi-square on k − 1 degrees of freedom.

## Exam Traps

- Mann-Whitney is the two-independent-group test; Kruskal-Wallis is three or more independent groups; Friedman is three or more *related* groups (blocks). Questions describe a blocked design and offer Kruskal-Wallis.
- Sign test and Wilcoxon are both one-sample or paired tests of a median. Wilcoxon is more powerful; the sign test needs no symmetry.
- Non-parametric tests compare medians, not means; the output symbol η is a median.
- Non-parametric tests are chosen for non-normal, small-sample continuous data. Proportion tests and chi-square already handle attribute data and are not made "non-parametric" by choosing a rank test.
- Non-normality with a large sample: the t-test is usually still fine for the mean because of the central limit theorem; the question is whether the mean is the right summary.
- Mood's median is preferred over Kruskal-Wallis when there are outliers; Kruskal-Wallis is preferred for power.
- A significant Kruskal-Wallis, like ANOVA, needs pairwise follow-up to say which groups differ.
- Rank-based confidence intervals show odd confidence levels such as 95.9%; that is normal.

## Check Questions

- A-3.5-012
- A-3.5-014
- A-3.5-016
- A-3.5-018
- A-3.5-020

## Applied Task

Identify one continuous measure in your own project's historical data that fails the normality test from Day 8 (or has fewer than 15 values per group). Run the appropriate non-parametric test for your comparison (Mann-Whitney for two groups, Kruskal-Wallis for three or more, Wilcoxon or sign for one sample against your standard), and also run the parametric equivalent on the same data. Report both p-values and both estimated effects (median difference and mean difference), and write two sentences: whether the conclusions agree, and which result you would present to your Champion and why. Then complete the decision table for every hypothesis on your Day 14 list: for each, name the Y type, the number and independence of groups, the normality status and the test you will use. Paste the results and the table to your coach.

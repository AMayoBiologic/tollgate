---
day: 17
week: 4
phase: Analyse
title: One-Way ANOVA
minutes: 50
bok_sections: ["3.4"]
objectives:
  - Say when one-way ANOVA is used instead of several t-tests and write its hypotheses
  - Explain the logic of comparing between-group variation with within-group variation using the F statistic
  - Complete an ANOVA table from sums of squares and degrees of freedom and read one from software
  - Interpret the p-value, R-squared and the follow-up comparisons
  - Check the assumptions of ANOVA and know the non-normal alternative
glossary_terms: ["ANOVA", "one-way ANOVA", "factor", "level", "F statistic", "F distribution", "sum of squares", "between-group variation", "within-group variation", "mean square", "ANOVA table", "R-squared (ANOVA)", "post-hoc comparison", "Tukey's test", "residual", "homogeneity of variance"]
---

## The Idea

### More than two groups

The 2-sample t-test compares two means. A project often has three or more: four suppliers, three shifts, five machines. Running a t-test on every pair is wrong for a reason the exam likes: each test carries a 5% Type I risk, and with four groups there are six pairs, so the chance of at least one false alarm is about 26%, not 5%. **ANOVA** (analysis of variance) tests all the means at once with a single alpha.

**One-way ANOVA** is the version with one **factor**: one categorical x (supplier, shift, machine) whose categories are called **levels**. The Y is continuous. The hypotheses are:

- H₀: all the group means are equal (μ₁ = μ₂ = μ₃ = …).
- H₁: at least one group mean differs from the others.

Note what H₁ does not say: it does not say which group differs or that they all differ. That is the job of the follow-up comparisons below.

### Why "analysis of variance" tests means

ANOVA compares two estimates of the spread in the data.

- **Within-group variation**: how much the values scatter around their own group's mean. This is the ordinary noise in the process, and it is the same whether or not the group means differ.
- **Between-group variation**: how much the group means scatter around the overall mean. If H₀ is true, the group means differ only by sampling noise, and this variation is about the same size as the within-group variation. If the groups really differ, the between-group variation is larger.

The **F statistic** is the ratio: between-group variation divided by within-group variation, each expressed per degree of freedom. Under H₀, F is about 1. A large F means the groups differ by more than noise explains. F follows the **F distribution**, a right-skewed curve with two sets of degrees of freedom, and the p-value is the tail area beyond the calculated F.

### The ANOVA table

Software presents the calculation as an **ANOVA table**, and the exam gives partial tables to complete. The pieces:

| Source | DF | SS | MS | F | P |
|---|---|---|---|---|---|
| Factor (between) | k − 1 | SS between | SS ÷ DF | MS between ÷ MS within | tail area |
| Error (within) | N − k | SS within | SS ÷ DF | | |
| Total | N − 1 | SS total | | | |

- k is the number of groups; N is the total number of observations.
- **Sum of squares** (SS) is a total of squared deviations, the same quantity that sits in the numerator of a variance (Day 7). SS total = SS between + SS within, always.
- **Mean square** (MS) is a sum of squares divided by its degrees of freedom: a variance. MS within is the pooled within-group variance, the same idea as the pooled t-test's s_p².
- F = MS between ÷ MS within.

Given any two of SS, DF and MS on a row you can find the third; given the two MS values you can find F. Degrees of freedom add: (k − 1) + (N − k) = N − 1.

**R-squared** for ANOVA is SS between ÷ SS total: the share of the total variation in Y that is explained by the factor. It answers the practical-significance question: a factor can be significant (p < 0.05) yet explain only 5% of the variation, which means other x's matter more.

### After a significant F

A significant F says at least one mean differs. To find which, run a **post-hoc comparison** that controls the overall Type I risk across all the pairs. The standard one is **Tukey's test** (Tukey's honest significant difference), which gives a confidence interval for every pairwise difference; pairs whose interval excludes zero differ significantly. Software also prints a grouping letters display: groups sharing a letter are not significantly different. Software offers other methods for special cases; the exam wants the name Tukey and the idea that pairwise conclusions after ANOVA need a method that protects the overall alpha.

### Assumptions

1. **Independence**: the observations are independent, within and between groups, which is a sampling design matter (randomise the order of collection).
2. **Normality**: the **residuals** (each value minus its group mean) are roughly normal. ANOVA is fairly robust to this with moderate sample sizes; check with a probability plot of the residuals.
3. **Homogeneity of variance** (equal variances): the groups have similar spread. Check with the software's equal-variances test or the rule of thumb that the largest standard deviation is less than about twice the smallest. Unequal variances with unequal group sizes can distort the p-value; software offers a version of ANOVA that does not assume equal variances.

When the data are clearly non-normal and samples are small, the non-parametric equivalent is the Kruskal-Wallis test (Day 19), which compares medians using ranks.

### Reading output

The routine matches Day 16: find the p-value on the factor row, compare with alpha, decide, then state which groups differ from the post-hoc display and how much of the variation the factor explains from R-squared.

```
One-way ANOVA: Header Time versus Clerk
Source   DF     SS     MS      F      P
Clerk     2  361.0  180.5  15.04  0.000
Error    15  180.0   12.0
Total    17  541.0

S = 3.464   R-Sq = 66.73%   R-Sq(adj) = 62.29%

Grouping Information Using Tukey Method
Clerk   N   Mean  Grouping
Ben     6  61.00  A
Chen    6  53.00    B
Ana     6  50.50    B
```

p < 0.001: reject H₀; the clerks' mean header-entry times differ. Tukey grouping: Ben (A) differs from Ana and Chen (both B), who do not differ from each other. The clerk explains 67% of the variation in header time. S = √12 = 3.46 seconds is the pooled within-group standard deviation. R-Sq(adj) is adjusted R-squared, explained on Day 22; for one factor it is close to R-Sq.

## Worked Example

The invoice team times one sub-step of order entry, entering the order header (customer, address, purchase order number), for six orders per clerk, in seconds. The group means are Ana 50.5, Ben 61.0, Chen 53.0, and the overall mean is 54.8. Software reports SS between = 361 and SS within = 180. Complete the table by hand.

1. **Degrees of freedom.** k = 3 clerks, N = 18 entries. Between: k − 1 = 2. Within: N − k = 15. Total: N − 1 = 17. Check: 2 + 15 = 17.
2. **Total sum of squares.** 361 + 180 = 541.
3. **Mean squares.** MS between = 361 ÷ 2 = 180.5. MS within = 180 ÷ 15 = 12.
4. **F.** 180.5 ÷ 12 = 15.0.
5. **Critical value.** F table at α = 0.05 with (2, 15) degrees of freedom: 3.68. F = 15.0 is far beyond it. Software: p = 0.0003.
6. **Decision.** Reject H₀: the three clerks do not all have the same mean header time.
7. **R-squared.** 361 ÷ 541 = 0.667, or 66.7%. Two-thirds of the variation in header time is between clerks.
8. **Which clerk?** Tukey's test: Ben's mean of 61.0 differs from Ana's 50.5 and Chen's 53.0; Ana and Chen do not differ (a difference of 2.5 seconds, inside Tukey's margin of about 5.2). Ben is about 8 to 10 seconds slower per order header.
9. **Assumptions.** Residual probability plot is straight; the three standard deviations are 3.1, 3.9 and 3.4 (largest less than twice the smallest). Entries were timed in random order across clerks. Assumptions hold.
10. **What it means for the project.** Clerk is a real x for header time. Before retraining Ben, the team watches what Ben does differently: he re-types the customer's address rather than selecting it from the customer master record, which is slower and is a plausible source of address errors as well. That goes on the list for Day 18.

A second question a stem might ask: with MS within = 12 and a group size of 6, what is the standard error of a group mean? √(12 ÷ 6) = √2 = 1.41 seconds, which is why differences of 8 seconds are so clearly significant.

## Formula Card

- `df between = k − 1`; `df within = N − k`; `df total = N − 1`; k groups, N observations.
- `SS total = SS between + SS within`.
- `MS = SS ÷ df` (for the between and within rows).
- `F = MS between ÷ MS within`; compare with the F table at (k − 1, N − k) df, or use the p-value.
- `R² = SS between ÷ SS total`.
- `Pooled within-group standard deviation S = √(MS within)`.
- H₀: all group means equal; H₁: at least one differs.

## Exam Traps

- ANOVA compares means (through variances), and it needs three or more groups to be worth using; with two groups it gives the same p-value as the pooled t-test.
- H₁ is "at least one mean differs", not "all means differ" and not "a specific mean differs". Which one differs comes from Tukey, not from F.
- Multiple t-tests inflate the Type I risk; that is the reason for ANOVA.
- F = MS between ÷ MS within. Dividing the other way, or dividing SS instead of MS, is the standard distractor.
- Degrees of freedom: k − 1 for the factor, N − k for error. Questions give N and k and ask for the error df.
- SS total = SS between + SS within; df total = df between + df within. Use these to fill gaps in a table.
- A large F with a small R² means the factor is real but small; do not confuse statistical with practical significance.
- Assumptions: independent observations, roughly normal residuals, similar variances. Non-normal small samples: Kruskal-Wallis.
- "One-way" means one factor. Two factors is two-way ANOVA, which is beyond this syllabus.

## Check Questions

- A-3.4-012
- A-3.4-013
- A-3.4-015
- A-3.4-017
- A-3.4-019

## Applied Task

Using your own project's historical data, choose a categorical x with three or more levels (site, shift, operator, supplier, product line) and the continuous measure from Day 7, with at least six values per level. Run a one-way ANOVA in a spreadsheet or statistics tool. Copy the ANOVA table and verify it by hand: check that the degrees of freedom and sums of squares add, recompute both mean squares and F, and look up the critical F. Calculate R-squared. Check the assumptions (residual normality, largest standard deviation less than twice the smallest, order of collection). If p is below 0.05, run Tukey's comparisons and state which levels differ and by how much. Write two sentences on what the result means for your short list of x's. Paste the table, the hand check and the sentences to your coach.

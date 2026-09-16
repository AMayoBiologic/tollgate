---
day: 7
week: 2
phase: Measure
title: Describing Data with Numbers and Pictures
minutes: 50
bok_sections: ["2.2"]
objectives:
  - Calculate the mean, median, mode, range, variance and standard deviation of a small data set by hand
  - Explain when the median beats the mean and why the sample standard deviation divides by n − 1
  - Find quartiles and the interquartile range and use them to spot outliers
  - Read a histogram, box plot, run chart, Pareto chart, scatter plot and dot plot and say what each one shows
  - Match a description of data to the picture that should be drawn
glossary_terms: ["descriptive statistics", "mean", "median", "mode", "range", "variance", "sample standard deviation", "population standard deviation", "quartile", "interquartile range", "outlier", "skewness", "central tendency", "dispersion", "histogram", "box plot", "run chart", "scatter plot", "dot plot", "bimodal", "coefficient of variation"]
---

## The Idea

### Two questions about any set of numbers

Once data have been collected, the first job is to describe them. **Descriptive statistics** are numbers that summarise a data set, and they answer two questions. Where is the middle? That is **central tendency**. How spread out are the values? That is **dispersion**, which is the same thing as variation. Six Sigma cares more about the second question, but the exam asks about both.

### Measures of the middle

The **mean** is the ordinary average: add the values, divide by how many. Written x̄ for a sample and μ for a population. The mean uses every value, which makes it the best summary for symmetric data but also means one extreme value drags it.

The **median** is the middle value when the data are sorted. With an odd number of values it is the middle one; with an even number it is halfway between the two middle ones. Half the data sit below the median and half above. Because it only cares about order, an extreme value has no effect on it.

The **mode** is the value that occurs most often. It is the only middle measure that works for category data ("the most common defect type is address"). A data set can have no mode, or more than one. A distribution with two clear peaks is **bimodal**, and that usually means two different processes have been mixed together, such as two shifts or two machines.

When the data are symmetric, mean, median and mode sit at the same place. When the data have a long tail on one side (**skewness**), the mean is pulled towards the tail. Delivery times, call lengths and repair costs are typically skewed to the right (a long tail of large values), so their mean is above their median. The exam's rule: report the median when the data are skewed or contain outliers; report the mean when they are roughly symmetric.

### Measures of spread

The **range** is the largest value minus the smallest. It is quick and is used in control charts, but it depends on only two values and grows with sample size.

The **variance** measures spread using every value. Take each value's distance from the mean, square it (so negatives do not cancel positives), add the squares up, and divide. The **standard deviation** is the square root of the variance, which puts it back in the original units. The mean is 14 minutes; the standard deviation is 2.7 minutes; the variance is 7.5 square minutes, which is why the standard deviation is the one people quote.

The divisor is the part the exam exploits. For a **population standard deviation** (σ), divide the sum of squares by N, the number of values. For a **sample standard deviation** (s), divide by n − 1. The reason is that a sample's values sit closer to their own mean than to the true population mean, so dividing by n would underestimate the spread; using n − 1 corrects it. In practice you almost always have a sample, so you almost always use n − 1. Calculators offer both (often labelled σn and σn−1, or σx and sx). A question that says "a sample of 5 items" wants n − 1; one that says "the whole population" or "all 5 items produced" wants N.

The **coefficient of variation** is the standard deviation divided by the mean, as a percentage. It lets you compare spread between things measured in different units or at different scales: a 2 g spread on a 250 g fill (0.8%) against a 2 g spread on a 10 g dose (20%).

### Quartiles and outliers

**Quartiles** split sorted data into four equal parts. The first quartile Q1 has 25% of the data below it, the second quartile is the median, and the third quartile Q3 has 75% below it. The simplest way to find them by hand is to find the median, then take the median of the lower half for Q1 and the median of the upper half for Q3. Software packages use slightly different interpolation rules and may give values a little different from the hand method; the exam uses whichever it prints.

The **interquartile range** (IQR) is Q3 − Q1: the spread of the middle half of the data. Like the median, it is not affected by extremes. It gives the standard rule for spotting an **outlier**, a value so far from the rest that it deserves investigation: anything below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR. An outlier is a signal to check the record, not an automatic reason to delete the value. Real outliers are often the most informative points in the data set.

### Pictures

Numbers summarise; pictures reveal. The exam describes a situation and asks which plot to use, or shows a plot and asks what it means. The set in the syllabus:

**Histogram**: continuous data grouped into equal-width intervals ("bins"), with a bar whose height is the count in each bin. It shows the shape of the distribution: symmetric, skewed, bimodal, truncated (cut off sharply at a limit, which suggests inspection is removing units), or with an isolated cluster. It loses the time order of the data. Needs about 30 or more values to be meaningful.

**Dot plot**: each value is a dot on a number line, stacked where values repeat. Same purpose as a histogram but keeps every individual value visible, so it works with small samples and makes outliers and gaps obvious.

**Box plot** (box-and-whisker plot): a box from Q1 to Q3 with a line at the median, whiskers to the last values inside 1.5 × IQR, and outliers plotted as separate points. Its strength is comparison: several box plots side by side show at a glance whether groups (shifts, sites, suppliers) differ in centre, spread or outliers. A median line off-centre in the box means skew.

**Run chart**: individual values plotted in time order, with a line at the median. It shows trends, cycles, shifts and unusual runs that a histogram hides. It is the plain version of the control chart on Day 24, without control limits.

**Pareto chart** (Day 3): sorted bars for category counts with a cumulative line. For attribute data: which categories matter most.

**Scatter plot**: each observation plotted as a point with one variable on the horizontal axis (an x) and another on the vertical (usually the Y). It shows whether the two move together, in which direction, how tightly, and whether the relationship is straight or curved. It is the first tool for a suspected cause-and-effect relationship and the basis of Day 21's correlation and regression.

The decision rule the exam wants:

| You want to see | Draw |
|---|---|
| Shape of one continuous variable | Histogram (large sample) or dot plot (small sample) |
| Compare centre and spread across groups | Box plots side by side |
| Change over time | Run chart |
| Which categories dominate | Pareto chart |
| Relationship between two variables | Scatter plot |

## Worked Example

### Part A: statistics by hand

Five phone calls to a help desk lasted 12, 15, 11, 18 and 14 minutes. Treat them as a sample.

1. **Mean.** 12 + 15 + 11 + 18 + 14 = 70. 70 ÷ 5 = 14.0 minutes.
2. **Median.** Sorted: 11, 12, 14, 15, 18. Middle value: 14.
3. **Mode.** No value repeats, so there is no mode.
4. **Range.** 18 − 11 = 7 minutes.
5. **Deviations from the mean.** 12 − 14 = −2; 15 − 14 = 1; 11 − 14 = −3; 18 − 14 = 4; 14 − 14 = 0. They add to zero, which is always true and is why they must be squared.
6. **Squared deviations.** 4, 1, 9, 16, 0. Sum = 30.
7. **Sample variance.** 30 ÷ (5 − 1) = 30 ÷ 4 = 7.5 square minutes.
8. **Sample standard deviation.** √7.5 = 2.74 minutes.
9. **If these were the whole population.** Variance = 30 ÷ 5 = 6.0; standard deviation = √6 = 2.45 minutes. Notice the population figure is smaller; a question offering 2.45 as an option for a sample is testing the divisor.
10. **Coefficient of variation.** 2.74 ÷ 14.0 × 100 = 19.6%.

### Part B: quartiles and a box plot

Nine order lead times in days, sorted: 3, 5, 5, 6, 7, 8, 9, 9, 12.

1. **Median.** Fifth of nine values: 7.
2. **Q1.** Lower half (below the median): 3, 5, 5, 6. Median of these: (5 + 5) ÷ 2 = 5.
3. **Q3.** Upper half: 8, 9, 9, 12. Median: (9 + 9) ÷ 2 = 9.
4. **IQR.** 9 − 5 = 4 days.
5. **Outlier fences.** Lower: 5 − 1.5 × 4 = −1. Upper: 9 + 1.5 × 4 = 15. The value 12 is inside the fence, so there are no outliers. Had the last order taken 20 days, it would have been plotted as a separate point beyond the whisker.
6. **Reading the box.** Box from 5 to 9, median line at 7 (in the middle: no strong skew), whiskers to 3 and 12.

### Part C: choosing the picture

The invoice team from Day 6 has 300 invoices with issue time in minutes, clerk, and day of week. To see whether issue time differs by clerk: three box plots side by side. To see whether issue time is drifting over the month: a run chart of the daily median. To see whether invoices with more line items take longer: a scatter plot of minutes against line items. To see the shape of issue time overall: a histogram, which turns out to be right-skewed with a second small peak at about 2 400 minutes (roughly five working days). The second peak is the orders that loop back to the customer for a missing purchase order number, which Day 9 maps.

## Formula Card

- `Mean x̄ = Σx ÷ n` — Σx is the sum of all values; n is how many.
- `Median` — middle value of the sorted data (average of the two middle values if n is even).
- `Range = maximum − minimum`.
- `Sample variance s² = Σ(x − x̄)² ÷ (n − 1)`; `sample standard deviation s = √s²`.
- `Population variance σ² = Σ(x − μ)² ÷ N`; `population standard deviation σ = √σ²`.
- `Coefficient of variation = s ÷ x̄ × 100%`.
- `IQR = Q3 − Q1`; outlier fences at `Q1 − 1.5 × IQR` and `Q3 + 1.5 × IQR`.

## Exam Traps

- Sample standard deviation divides by n − 1; population by N. "A sample of…" means n − 1. The distractor is always the other one.
- Variance is in squared units; standard deviation is in the original units. A question asking for spread "in minutes" wants the standard deviation.
- The mean is pulled by outliers and skew; the median is not. For skewed data (delivery times, costs, call lengths), report the median.
- Right-skewed data have mean above median; left-skewed have mean below median.
- Range uses only two values and cannot be compared across different sample sizes.
- Deviations from the mean sum to zero; that is why they are squared, not a mistake in your arithmetic.
- Box plots compare groups; histograms show shape; run charts show time; scatter plots show relationships between two variables; Pareto charts rank categories.
- A histogram hides time order. A run chart that shows a trend can look like a perfectly normal histogram.
- Bimodal histograms mean two processes are mixed (two shifts, two machines, two suppliers). Stratify.
- An outlier beyond 1.5 × IQR from the box is flagged for investigation, not automatically deleted.

## Check Questions

- M-2.2-006
- M-2.2-007
- M-2.2-009
- M-2.2-013
- M-2.2-015

## Applied Task

Take the continuous measure from your data collection plan (or the primary metric, if it is continuous) and pull one month of historical values for it from your organisation's records, at least 30 values. Calculate by hand, for the first 10 values, the mean, median, range, sample variance and sample standard deviation, showing the deviations and their squares. Then, using a spreadsheet for all the values, produce a histogram, a run chart in time order, and box plots split by one stratification factor from your plan (shift, site, clerk, product). Under each picture write one sentence saying what it shows: shape, trend, and whether the groups differ. Paste the hand calculation and the three pictures with their sentences to your coach.

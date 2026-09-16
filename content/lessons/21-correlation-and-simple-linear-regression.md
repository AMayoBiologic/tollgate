---
day: 21
week: 5
phase: Improve
title: Correlation and Simple Linear Regression
minutes: 50
bok_sections: ["4.1"]
objectives:
  - Read a scatter plot and describe the direction, strength and form of a relationship
  - Interpret Pearson's correlation coefficient r and calculate the coefficient of determination r²
  - Explain why correlation does not establish causation and name the usual alternative explanations
  - Fit a simple linear regression line, interpret its slope and intercept, and use it to predict
  - Read regression output (coefficients, p-values, R-squared, S) and check the residual plots
glossary_terms: ["correlation", "Pearson correlation coefficient", "coefficient of determination", "causation", "lurking variable", "simple linear regression", "regression equation", "slope", "intercept", "fitted value", "least squares", "residuals analysis", "standard error of the regression", "extrapolation", "linearity (regression)"]
---

## The Idea

### From "is there a difference" to "how much does Y change with x"

The tests of Week 4 compared groups: does Y differ between shifts, suppliers, order types? Many x's are not groups but continuous quantities: temperature, pressure, number of line items, years of experience, queue length. For those, the question is whether Y moves with x, in which direction, how tightly, and by how much. Correlation answers the first three; regression answers the fourth. Both start with the scatter plot from Day 7, and both belong to Improve in the IASSC syllabus because they let a team predict what Y will do if x is changed.

### Correlation

**Correlation** is the degree to which two continuous variables move together in a straight-line relationship. **Pearson's correlation coefficient**, written r, measures it on a scale from −1 to +1:

- The sign gives the direction. Positive r: as x rises, Y tends to rise. Negative r: as x rises, Y tends to fall.
- The size gives the strength of the *linear* relationship. r = ±1 means the points sit exactly on a straight line; r = 0 means no linear relationship. Rules of thumb: |r| above 0.8 strong, 0.5 to 0.8 moderate, below 0.5 weak. The exam uses "strong", "moderate", "weak" loosely, so read the options.
- r has no units and does not change if x or Y is shifted or rescaled by a positive factor.

Two cautions. First, r measures straight-line association only: a perfect U-shaped relationship can have r near 0. Look at the scatter plot before trusting r. Second, one outlier can drag r a long way in a small sample.

Software reports r together with a p-value for H₀: the population correlation is zero. A significant p-value says the correlation is unlikely to be chance; it says nothing about strength. With 500 points, r = 0.10 is significant and useless.

The **coefficient of determination** is r², the square of the correlation, between 0 and 1. It is the proportion of the variation in Y that is explained by its linear relationship with x. r = 0.8 gives r² = 0.64: 64% of the variation in Y goes with x, 36% is due to other things. r² is the number to quote when asked how much of Y the x accounts for. Note that r = −0.8 gives the same r² as r = +0.8; the square loses the sign.

### Correlation is not causation

A strong correlation between x and Y is consistent with x causing Y, but also with:

- Y causing x (reverse causation): stores with more staff have higher sales, because busy stores are given more staff.
- A third variable causing both, called a **lurking variable** (or confounder): ice cream sales and drownings both rise in summer.
- Coincidence, especially when many pairs of variables have been screened and only the strongest reported.

The exam asks this directly and through scenarios. The safe wording is "x is associated with Y" until a controlled change to x shows Y moving. That controlled change is the pilot in Improve: a limited trial of the change on one line, shift or site (Day 25).

### Simple linear regression

**Simple linear regression** fits a straight line through the scatter plot so that Y can be predicted from x. "Simple" means one x; "linear" means a straight line. The **regression equation** is:

`Y = b₀ + b₁ x`

- **b₀** is the **intercept**: the predicted Y when x = 0. It is often outside the range of the data and then has no physical meaning; it is where the line starts.
- **b₁** is the **slope**: the change in Y for each one-unit increase in x. This is the number that carries the practical message. A slope of 3.8 minutes per line item says each extra line item adds about 3.8 minutes.

The line is chosen by **least squares**: of all possible lines, it is the one that minimises the sum of the squared vertical distances between the points and the line. Each such distance is a **residual**: the observed Y minus the **fitted value** (the Y the line predicts at that x). Positive residuals sit above the line, negative below, and they sum to zero.

The exam does not ask for the slope formula by hand from raw data, but it may give the pieces: `b₁ = r × (s_Y ÷ s_x)`, where s_Y and s_x are the sample standard deviations of Y and x, and `b₀ = Ȳ − b₁ x̄`. The line always passes through the point (x̄, Ȳ).

### Reading regression output

```
Regression Analysis: Entry Time versus Line Items

The regression equation is
Entry Time = 10.64 + 3.81 Line Items

Predictor   Coef   SE Coef      T      P
Constant   10.643    1.628   6.54  0.000
Line Items  3.812    0.224  17.01  0.000

S = 2.154   R-Sq = 97.3%   R-Sq(adj) = 96.9%
```

- The equation line gives b₀ and b₁.
- Each coefficient has a standard error (how much the estimate would vary from sample to sample, the same idea as the standard error of a mean on Day 14), a t value (coefficient ÷ its standard error) and a p-value. The p-value on the x row tests H₀: slope = 0, meaning x has no linear effect on Y. Software prints 0.000 when p is below 0.0005; it is not exactly zero. Here it rejects H₀: line items significantly affect entry time. The p-value on the constant row is rarely of interest.
- **R-Sq** is r² as a percentage: 97.3% of the variation in entry time is explained by the number of line items. R-Sq(adj) matters for multiple regression (Day 22).
- **S** is the **standard error of the regression**: the typical size of a residual, in Y's units. Predictions from the line are uncertain by roughly ±2S. Here S = 2.15 minutes.

Predicting: for 8 line items, Y = 10.64 + 3.81 × 8 = 41.1 minutes. For 11 line items, 52.6 minutes. Predicting outside the range of the x data (here 2 to 12 items) is **extrapolation**, and the line has no evidence to support it; a 40-line order might behave quite differently.

### Residuals analysis

A regression is only as good as its assumptions, and **residuals analysis** checks them by plotting the residuals. Software produces a standard panel of four plots (some packages call it the four-in-one plot):

1. **Normal probability plot of residuals**: should be a straight line (residuals normal). Curvature or outliers signal problems.
2. **Residuals versus fitted values**: should be a random horizontal band with no pattern. A curve means the true relationship is not linear (**linearity** fails; Day 22 fits curves). A funnel, wider at one end, means the spread of Y changes with x (unequal variance). A single far point is an outlier worth investigating.
3. **Histogram of residuals**: should be roughly bell-shaped.
4. **Residuals versus order**: should show no trend or cycle. A pattern means the observations are not independent (something drifted while the data were collected).

The exam describes one of these pictures and asks what it means: curve means non-linear, funnel means non-constant variance, trend in order means non-independence, straight probability plot means normal residuals.

## Worked Example

The invoice team suspects that entry time rises with the number of line items on an order. Ten orders are timed (minutes) against their line-item counts.

| Line items x | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|
| Entry time Y | 18 | 24 | 25 | 31 | 30 | 40 | 39 | 46 | 47 | 58 |

1. **Scatter plot.** Points rise steadily from lower left to upper right with small scatter around a straight line: a strong positive linear relationship.
2. **Correlation.** Software: r = 0.986, p < 0.001. Strong, positive, significant.
3. **Coefficient of determination.** r² = 0.986² = 0.973. About 97% of the variation in entry time is explained by line items. Only 3% is left for everything else (clerk, order source, time of day).
4. **Regression line.** Entry time = 10.64 + 3.81 × line items. The line passes through the means (x̄ = 6.6, Ȳ = 35.8): 10.64 + 3.81 × 6.6 = 35.8.
5. **Interpret the coefficients.** Slope 3.81: each additional line item adds about 3.8 minutes of entry time. Intercept 10.64: the line's value at zero line items. That is an extrapolation (the smallest order had 2 items), though it has a plausible reading as the fixed time to open an order and enter the header.
6. **Slope significance.** t = 3.812 ÷ 0.224 = 17.0, p < 0.001. The slope is not zero.
7. **Predict.** An order with 8 line items: 10.64 + 3.81 × 8 = 41.1 minutes. The observed value was 39, so the residual is 39 − 41.1 = −2.1 minutes. An 11-item order: 52.6 minutes, within the data range, fine. A 40-item order: 163 minutes by the equation, but that is extrapolation; large orders may be entered by a bulk upload and take far less.
8. **S.** 2.15 minutes: the line predicts entry time to within about ±4 minutes for most orders.
9. **Residuals.** The ten residuals are −0.3, 1.9, −0.9, 1.3, −3.5, 2.7, −2.1, 1.1, −1.8, 1.6. They sum to zero, show no run of same-signed values, no curve and no funnel against fitted values, and the probability plot is straight. The linear model is adequate.
10. **Causation.** Line items plausibly cause entry time directly, since each item must be typed, and the plot looks the same for each clerk's orders. That is the kind of mechanism that makes causation credible; the Improve pilot (a purchase-order field on the web order form, with a line-item import scheduled as the follow-on project) will confirm the web effect by changing x and watching Y.

A second, contrasting case: oven temperature x (between 200 and 250 degrees) against coating hardness Y, eight points, r = −0.94. Strong negative correlation: hardness falls as temperature rises. r² = 0.88. Regression: hardness = 39.0 − 0.10 × temperature; each extra degree lowers hardness by 0.1 units, from about 19 at 200 degrees to 14 at 250. Before concluding that temperature causes softness, the team checks for a lurking variable: the hotter batches were also left in the oven longer, and the time in the oven, not the temperature, may be the cause. A pilot varying temperature at a fixed oven time separates them. Day 22 widens the temperature range and finds the relationship is not a straight line at all.

## Formula Card

- `r` — Pearson correlation, −1 to +1; sign = direction, size = strength of the linear relationship.
- `r² = r × r` — proportion of variation in Y explained by x (coefficient of determination, R-Sq).
- `Y = b₀ + b₁ x` — b₀ intercept (Y at x = 0), b₁ slope (change in Y per unit x).
- `b₁ = r × (s_Y ÷ s_x)`; `b₀ = Ȳ − b₁ x̄`; the line passes through (x̄, Ȳ).
- `Fitted value ŷ = b₀ + b₁ x`; `residual = Y − ŷ`; residuals sum to zero.
- `t for the slope = b₁ ÷ SE(b₁)`; p-value tests H₀: slope = 0.
- `S` — standard error of the regression, the typical residual size in Y units.

## Exam Traps

- r measures linear association only; a curved relationship can give r near zero. Look at the plot.
- r² is the proportion explained; r is the correlation. Given r = 0.8, the explained proportion is 0.64, not 0.8. Given r² = 0.49, r is ±0.7, and the sign comes from the slope.
- A negative r is not a weak r. r = −0.9 is a strong relationship.
- A significant p-value for r says the correlation is not zero, not that it is strong. Large samples make weak correlations significant.
- Correlation does not prove causation: reverse causation, lurking variables and coincidence are the alternatives. Only a controlled change to x (a pilot) shows causation.
- The slope is the change in Y per one unit of x; the intercept is Y at x = 0, which often lies outside the data and may be meaningless.
- The p-value on the slope row tests whether x has a linear effect on Y. The constant's p-value is usually irrelevant.
- Prediction outside the x range of the data is extrapolation and is not supported by the fit.
- Residuals: curve versus fitted means non-linear; funnel means non-constant variance; trend versus order means non-independence; curved probability plot means non-normal residuals.
- S is in the units of Y and describes prediction error; R-Sq is a proportion and describes explained variation. They answer different questions.

## Check Questions

- I-4.1-001
- I-4.1-003
- I-4.1-005
- I-4.1-008
- I-4.1-011

## Applied Task

From your own project's historical records, choose a continuous x from your Day 13 short list and pair it with your continuous Y for at least 20 observations (for example order size against processing time, or queue length against wait). Draw the scatter plot and describe direction, form and strength in one sentence. Calculate r and r² (spreadsheet), fit the regression line, and write the equation with the slope interpreted in your process's units. State the p-value for the slope and what it means. Produce the four residual plots and write one sentence on each. Predict Y for one x inside the data range and name one x value that would be extrapolation. Finish with two alternative explanations for the correlation other than x causing Y, and say how your Improve pilot will rule them out. Paste the plot, the equation, the residual sentences and the explanations to your coach.

---
day: 22
week: 5
phase: Improve
title: Multiple Regression, Intervals and Box-Cox
minutes: 50
bok_sections: ["4.2"]
objectives:
  - Read a multiple linear regression output: coefficients, p-values, R-squared and adjusted R-squared, and the variance inflation factor (VIF)
  - Explain what multicollinearity is, how it is detected and what to do about it
  - Recognise when a non-linear (curved) fit is needed and how software fits one
  - Distinguish a confidence interval for the mean response from a prediction interval for a single new value
  - Say why and when data are transformed, and what the Box-Cox lambda means
glossary_terms: ["multiple linear regression", "adjusted R-squared", "multicollinearity", "variance inflation factor", "non-linear regression", "quadratic term", "confidence interval for the mean response", "prediction interval", "data transformation", "Box-Cox transformation", "lambda", "log transformation", "predictor", "response"]
---

## The Idea

### More than one x

Day 21 fitted Y against one x. Real processes have several: entry time depends on line items, on whether the order came by web or phone, and on the clerk's experience. **Multiple linear regression** fits Y against two or more x's at once:

`Y = b₀ + b₁ x₁ + b₂ x₂ + … + bₖ xₖ`

In regression vocabulary the x's are **predictors** and Y is the **response**. Each coefficient bᵢ is the change in Y for a one-unit increase in xᵢ *holding the other predictors constant*. That last clause is the whole point of the method: it separates the effect of each x from the effects of the others, which a series of simple regressions cannot do. A categorical x with two levels (web or phone) enters as a 0/1 variable (called an indicator or dummy variable), and its coefficient is the difference in Y between the levels with the other predictors held constant.

### Reading the output

```
Regression Analysis: Entry Time versus Line Items, Web, Experience

Entry Time = 14.2 + 3.65 Line Items + 4.8 Web - 0.31 Experience

Predictor      Coef  SE Coef      T      P    VIF
Constant      14.20    2.10    6.76  0.000
Line Items     3.65    0.19   19.2   0.000   1.1
Web            4.80    1.30    3.69  0.001   1.2
Experience    -0.31    0.35   -0.89  0.379   1.1

S = 2.05   R-Sq = 98.1%   R-Sq(adj) = 97.9%
```

Read it row by row:

- Each predictor's p-value tests whether that x contributes to Y once the others are in the model. Line Items (p < 0.001) and Web (p = 0.001) do. Experience (p = 0.379) does not: each extra month of experience is associated with 0.31 minutes less, but not significantly, so with the other two in the model experience adds nothing and it would normally be dropped and the model refitted.
- Web = 4.8: a web order takes 4.8 minutes longer than a phone order with the same number of line items and the same clerk experience.
- R-Sq is the proportion of variation explained by all the predictors together. It never falls when a predictor is added, even a useless one, so it cannot be used to compare models with different numbers of predictors.
- **Adjusted R-squared** corrects for the number of predictors: it rises only when a new predictor improves the fit by more than chance would. Use R-Sq(adj) to compare models; if adding a predictor lowers it, the predictor is not earning its place. Adjusted R² = 1 − (1 − R²)(n − 1) ÷ (n − k − 1), where k is the number of predictors.
- S is the standard error of the regression as before.
- **VIF**, the variance inflation factor, is discussed next.

### Multicollinearity

When two predictors are themselves strongly correlated, for example line items and order value, the regression cannot tell which of them is doing the work. This is **multicollinearity**. Its symptoms: coefficients with large standard errors, a high R-Sq alongside individually non-significant predictors, coefficients that change sign or size when another predictor is added or removed, and coefficients with the wrong sign against common sense.

The diagnostic is the **variance inflation factor** (VIF), printed for each predictor: how much that coefficient's variance is inflated by correlation with all the other predictors together. VIF = 1 means no correlation with the others; the rule of thumb is that VIF above 5 is a concern and above 10 is serious. The fix is to remove one of the correlated predictors (keep the one that is easier to control or measure), combine them, or collect data in which they vary independently. Multicollinearity does not spoil the model's predictions; it spoils the interpretation of the individual coefficients.

### Non-linear regression

When the scatter plot or the residuals-versus-fitted plot shows a curve, a straight line is the wrong model. **Non-linear regression** in the Green Belt sense means fitting a curve, most often by adding a **quadratic term** (x²) to the model:

`Y = b₀ + b₁ x + b₂ x²`

A significant p-value on the x² coefficient confirms the curvature. Software fits it as an ordinary regression with x² as an extra predictor, so the output looks the same. The shape is read from the sign of b₂: positive, the curve bends upward; negative, it bends downward (a peak). Cubic terms and other curves exist but are rare at this level. (Strictly, a model with an x² term is still fitted by linear regression, because it is linear in the coefficients; the syllabus calls it non-linear because the fitted curve is not a straight line.) The other route to a straight line is to transform Y or x (below). Judge any curved model by adjusted R² and the residual plots, not by R² alone, since more terms always raise R².

### Confidence and prediction intervals

A regression gives a point prediction for Y at a chosen x. Two intervals surround it, and the exam tests the difference.

- The **confidence interval for the mean response** is the range in which the *average* Y of all units with that x is likely to lie. It reflects uncertainty in the fitted line only. It is narrow, and narrowest at x̄.
- The **prediction interval** is the range in which a *single new* observation with that x is likely to fall. It includes the line's uncertainty *and* the scatter of individual values around the line (S), so it is always wider than the confidence interval, typically much wider.

From the Day 21 single-predictor line, for 8 line items: predicted entry time 41.1 minutes; 95% confidence interval for the mean, about 39.4 to 42.9; 95% prediction interval for one order, about 35.9 to 46.4. A question that asks "within what range will the next order fall" wants the prediction interval; "what is the average time for orders of this size" wants the confidence interval. Both widen as x moves away from x̄.

### Residuals again

Every point on Day 21 applies to multiple and non-linear regression: check the four plots after every fit. Two additional looks: residuals against each predictor (a curve on one predictor says that predictor needs a squared term) and residuals against any variable not in the model (a pattern says it should be). A fit that passes the residual checks and has a sensible adjusted R² is a usable model.

### Data transformation and Box-Cox

**Data transformation** means replacing a variable with a mathematical function of itself, most often taking its logarithm or square root, and analysing the transformed values. Why:

1. To make skewed data normal so that capability, t-tests and control limits apply (Day 8 promised this).
2. To straighten a curved relationship so that linear regression fits.
3. To make the spread constant when a residual plot shows a funnel.

A **logarithm** is the power to which a base must be raised to give a number: since 10² = 100, the base-10 log of 100 is 2. Statistics software uses the natural logarithm, written ln, whose base is e = 2.718 (Day 3): ln 10 = 2.3, ln 100 = 4.6, ln 1 000 = 6.9. Logs compress large values far more than small ones, which is why they tame a long right tail. The **log transformation** is the workhorse for right-skewed positive data such as times, costs and counts. Results are calculated in log units and converted back; the back-transformed mean of log data is the geometric mean, which estimates the median when the log data are normal, and for skewed data the median is the sensible centre to report.

The **Box-Cox transformation** is a family of power transformations that lets software choose the best one. Each member is defined by a single parameter, **lambda** (λ): the transformed value is, in effect, Y^λ, with λ = 0 meaning the logarithm. Software searches for the λ that makes the data most nearly normal (or the residuals most nearly constant) and reports it with a confidence interval. Common values and their meaning:

| λ | Transformation |
|---|---|
| 1 | None: the data are fine as they are |
| 0.5 | Square root |
| 0 | Logarithm |
| −1 | Reciprocal (1 ÷ Y) |
| 2 | Square |

Practice is to round the estimated λ to the nearest of these so the transformation has a plain meaning, and to check normality of the transformed data before using it. Box-Cox needs strictly positive data. Transforming is a legitimate tool; deleting inconvenient data is not. And the transformation must be applied consistently: if capability is calculated on log data, the specification limits are transformed the same way.

## Worked Example

**Part A: multiple regression.** The invoice team extends the Day 21 model with two more predictors, using a new and larger sample of 40 timed orders: Web (1 for web orders, 0 for phone) and the clerk's Experience in months. Output is the block shown above. The coefficients differ from Day 21's (3.81 and 10.64) because the sample is different and the web effect is now separated out.

1. **Which predictors matter.** Line Items (p < 0.001) and Web (p = 0.001). Experience (p = 0.379) does not; remove it and refit. The refitted model: Entry Time = 13.6 + 3.66 Line Items + 4.9 Web, R-Sq(adj) 98.0%, slightly higher than 97.9% with Experience, confirming that Experience was not earning its place.
2. **Interpret.** Each line item adds 3.66 minutes; a web order takes 4.9 minutes longer than a phone order of the same size. The web penalty is the missing purchase-order field: clerks stop to look it up. That is the x the Improve pilot targets. (Web orders take longer to enter and carry more errors, Day 18; their disputes happen to resolve faster, Day 19, because there is a written order to check against.)
3. **Multicollinearity.** All VIFs are near 1: the predictors are not correlated with each other, so the coefficients can be read at face value. Had the team added Order Value as well, which rises almost in step with Line Items, both VIFs would have climbed to about 8 and the two coefficients would have become unstable.
4. **Predict.** A 6-item web order: 13.6 + 3.66 × 6 + 4.9 = 40.5 minutes. The 95% prediction interval reported by software, about 36 to 45 minutes, is the range a single such order is likely to take; the confidence interval for the mean, about 39 to 42, is where the average of many such orders lies.
5. **Residuals.** No curve, no funnel, straight probability plot, no pattern against order. The model stands.

**Part B: a curve.** The coating study from Day 21 is repeated over a wider range, 150 to 250 degrees. The scatter plot rises then falls, and the residuals from a straight line form an arch. Adding a quadratic term: Hardness = −41 + 0.62 Temp − 0.0016 Temp², with p < 0.001 on the Temp² coefficient and R-Sq(adj) rising from 21% for the straight line to 86% for the quadratic. The negative b₂ says the curve peaks. A quadratic peaks or bottoms at x = −b₁ ÷ (2 × b₂) = −0.62 ÷ (2 × −0.0016) = 194 degrees, where hardness is about 19; Day 21's straight line was the falling side of this curve. That is the setting the pilot will test.

**Part C: Box-Cox.** The team pulls all 90 dispute resolution times from the last quarter (a much larger set than Day 19's samples). They are strongly right-skewed (Anderson-Darling p < 0.005), and the customer contract sets a limit of 24 hours (Day 19's 12 hours was the internal target for the median). Box-Cox reports λ = 0.08 with a 95% interval of −0.2 to 0.4, which includes 0, so the logarithm is chosen. The log-transformed times pass the normality test (p = 0.41). Capability is calculated on the log scale with the limit transformed too (ln 24 = 3.18), giving Ppk = 0.71, which corresponds to about 2% expected beyond the limit; the direct count is 2 of 90. The team reports that the process is not capable of resolving disputes within 24 hours. A normal-based capability on the raw skewed data would have given a tail estimate that disagreed with the count; the transformed analysis is the defensible one.

## Formula Card

- `Y = b₀ + b₁ x₁ + b₂ x₂ + … + bₖ xₖ` — each bᵢ is the change in Y per unit xᵢ, other predictors held constant.
- `Adjusted R² = 1 − (1 − R²)(n − 1) ÷ (n − k − 1)` — k predictors, n observations; use it to compare models.
- `VIF` — 1 means no correlation among predictors; above 5 concern, above 10 serious.
- Quadratic model: `Y = b₀ + b₁ x + b₂ x²`; b₂ negative bends down (peak), positive bends up.
- Prediction interval (one new value) is always wider than the confidence interval for the mean response; both widen away from x̄.
- Box-Cox: transformed Y = Y^λ; λ = 1 none, 0.5 square root, 0 log, −1 reciprocal. Round λ to a plain value; transform the specification limits the same way.

## Exam Traps

- A coefficient in multiple regression is the effect of that x with the others held constant. Its p-value tests its contribution given the others; a non-significant predictor should be removed and the model refitted.
- R-Sq never falls when a predictor is added; use R-Sq(adj) to compare models. If R-Sq(adj) drops when a term is added, the term is not useful.
- Multicollinearity is correlation among the predictors, detected by VIF above 5 to 10. It inflates standard errors and makes coefficients unstable; it does not stop the model predicting.
- A curve in the residuals-versus-fitted plot means a straight line is wrong: add a squared term or transform.
- Prediction interval (a single new value) is wider than the confidence interval for the mean response. "The next unit" means prediction interval; "the average" means confidence interval.
- Box-Cox lambda: 0 is log, 0.5 square root, 1 no transformation, −1 reciprocal. Lambda near 1 means the data do not need transforming.
- Transformations are used for skewed data, curved relationships and unequal variance. After transforming, transform the limits too, and interpret results on the original scale with care.
- A 0/1 categorical predictor's coefficient is the difference between the two levels, other things equal.
- Adding many terms can raise R² while adjusted R² and the residual plots get worse: overfitting, which means fitting the noise in this sample rather than the real relationship.

## Check Questions

- I-4.2-001
- I-4.2-003
- I-4.2-006
- I-4.2-009
- I-4.2-012

## Applied Task

Extend your Day 21 regression using your own project's historical data: add at least two more predictors from your Day 13 short list (one may be a 0/1 categorical such as site or order type), with at least 30 observations. Fit the multiple regression, report each coefficient with its p-value and VIF, remove any non-significant predictor and refit, and compare R-Sq(adj) before and after. Interpret every remaining coefficient in your process's units, holding the others constant. Produce the residual plots and note any curve; if you see one, add a squared term and report whether R-Sq(adj) improves. For one realistic set of x values, give the point prediction, the confidence interval for the mean and the prediction interval, and say which one your Champion should be told. Finally, run a normality test on your skewed Y (if you have one), apply a Box-Cox or log transformation, and report lambda and whether the transformed data pass. Paste the outputs and your interpretations to your coach.

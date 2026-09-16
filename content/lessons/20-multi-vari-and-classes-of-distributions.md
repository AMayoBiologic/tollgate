---
day: 20
week: 4
phase: Analyse
title: Multi-Vari and Classes of Distributions
minutes: 50
bok_sections: ["3.1"]
objectives:
  - Describe the three families of variation a multi-vari study separates: positional, cyclical and temporal
  - Plan and read a multi-vari chart and say which family dominates
  - Recognise the normal, exponential, Poisson, binomial and Weibull distributions from a description of the data they model
  - Calculate the mean of a binomial or Poisson count and a simple probability for each
  - Use the class of distribution to choose the right capability method, control chart and test
glossary_terms: ["multi-vari analysis", "multi-vari chart", "positional variation", "cyclical variation", "temporal variation", "within-piece variation", "piece-to-piece variation", "time-to-time variation", "distribution", "exponential distribution", "Poisson distribution", "binomial distribution", "Weibull distribution", "discrete distribution", "continuous distribution", "mean time between failures"]
---

## The Idea

### Finding where the variation lives

Before testing an x with a hypothesis test, it helps to know what kind of x to look for. **Multi-vari analysis** is a graphical method, used early in Analyse, that splits the variation in a Y into families by *where* and *when* it occurs, without changing anything in the process. It is a passive study: you sample the process as it runs and plot the results in a way that separates the families. The family that dominates tells you which kind of cause to hunt.

The three families, in IASSC's terms:

- **Positional variation** (**within-piece variation**): variation across positions on one unit or within one batch. Thickness across a sheet, temperature across an oven's shelves, the four cavities of a mould, different fields on one form. If this dominates, the cause is something spatial: tooling, fixture, layout, which operator handles which position.
- **Cyclical variation** (**piece-to-piece variation**): variation between consecutive units or batches made under the same conditions. Unit 1 to unit 2 to unit 3. If this dominates, the cause acts on every unit differently: material lot, machine settling, operator technique from item to item.
- **Temporal variation** (**time-to-time variation**): variation across longer periods: hour to hour, shift to shift, day to day, week to week. If this dominates, the cause is something that changes over time: warm-up, tool wear, shift changeover, ambient conditions, month-end surges.

Some texts add a fourth family, lot-to-lot or batch-to-batch, which the exam treats as a form of cyclical or temporal variation depending on the description.

### Building the study

1. Choose the Y and the three levels of sampling. Typical: 3 to 5 positions per unit, 3 to 5 consecutive units, and 3 or more time points spread over the period when the problem shows.
2. Sample the process as it runs, recording position, unit and time for each measurement. Do not adjust anything.
3. Plot the **multi-vari chart**: time along the horizontal axis; within each time point, a short cluster of consecutive units; within each unit, the positions plotted as points joined by a vertical line. The length of each vertical line is positional variation; the spread of unit averages within a time point is cyclical; the movement of the cluster averages across time is temporal.
4. Read which family is largest. Often one family accounts for most of the total, and the study has narrowed the search before any hypothesis test is run.
5. Confirm with data: the family points to a class of x's; the tests of Days 16 to 19 test specific ones.

Multi-vari is also a way to check that a capability sample (Day 11) captured all the variation: if temporal variation is large, a study run in one hour will overstate capability.

### Classes of distributions

A **distribution** is the pattern of values a variable takes and how often each occurs. Day 8 introduced the normal distribution as the most important. The syllabus expects you to recognise four more from what they model, because the choice of capability method, control chart and test depends on the class. They divide into **continuous distributions** (any value in a range: normal, exponential, Weibull) and **discrete distributions** (whole-number counts: binomial, Poisson).

**Normal** (continuous). Symmetric, bell-shaped, described by mean and standard deviation. Models measurements that result from many small independent effects: dimensions, weights, fill volumes, many process times. Tools: Z table, t-tests, ANOVA, Cp and Cpk, Xbar-R charts.

**Exponential** (continuous). Skewed right, starting high at zero and decaying. Models the time between random independent events: time between machine failures when failures happen at a constant rate, time between customer arrivals, time to the next call. Described by one parameter, the rate λ (lambda, events per unit time); the mean time between events is 1 ÷ λ. The **mean time between failures** (MTBF) of equipment with a constant failure rate is an exponential mean. Its median is smaller than its mean, so reporting the mean overstates the "typical" wait. Exponential data are non-normal and need transformation or the tests of Day 19.

**Poisson** (discrete). Models the *count* of events in a fixed interval of time, area or volume when the events happen independently at a constant average rate: defects per panel, calls per hour, complaints per week, scratches per square metre. Described by one parameter, the mean λ (the same Greek letter the exponential uses for its rate; the two are related, since a Poisson count of events per hour and an exponential time between events describe the same random process). Its variance equals its mean, which is a quick check of whether count data are Poisson (a variance much larger than the mean means the events cluster). The probability of exactly k events is `e^(−λ) × λ^k ÷ k!`, where k! ("k factorial") is k × (k − 1) × … × 1, with 0! = 1. Tools: the C and U control charts for counts (Day 24); DPU is a Poisson mean, and the Day 3 yield formula e^(−DPU) is the Poisson probability of zero defects.

**Binomial** (discrete). Models the *number of successes* in a fixed number n of independent trials, each with the same probability p of success: defective units in a sample of 50, late deliveries out of 200, calls answered in time out of 30. Described by n and p; mean n × p; standard deviation √(n p (1 − p)). The probability of exactly k successes is `C(n, k) × p^k × (1 − p)^(n − k)`, where C(n, k) is the number of ways of choosing k from n. Tools: the P and NP control charts for proportions (Day 24), the proportion tests of Day 18, and the sign test. When n is large and p not near 0 or 1, the binomial is close to normal, which is why the Z proportion tests work.

**Weibull** (continuous). A flexible skewed distribution used for time to failure and life data. Its shape parameter β (beta) describes how the failure rate changes with age: β < 1, failure rate falling (early-life or "infant mortality" failures); β = 1, constant failure rate (the Weibull becomes the exponential); β > 1, failure rate rising with age (wear-out). A second parameter, the scale, describes roughly how long units typically last. Reliability engineers fit Weibull curves to warranty and test data, which is beyond this course; Green Belts need to recognise the name, the shape parameter's meaning and the link to the exponential.

### Choosing by class

| The data are | Class | Capability | Chart (Day 24) | Comparison test |
|---|---|---|---|---|
| Measurements, symmetric | Normal | Cp, Cpk | Charts for measurements: I-MR (individuals and moving range), Xbar-R and Xbar-S (subgroup means with ranges or standard deviations) | t-tests, ANOVA |
| Times between events, skewed | Exponential (or Weibull) | Transform (Day 22) or non-normal method | I-MR on transformed data | Day 19 tests |
| Counts of defects per unit or interval | Poisson | DPU, DPMO | Count charts: C, U | Day 18 chi-square |
| Number defective out of n | Binomial | DPMO, yield | Proportion charts: P, NP | 1- and 2-proportion tests |
| Time to failure, changing failure rate | Weibull | Reliability methods (beyond this course) | | |

The exam's typical stems: "the number of scratches on each panel follows which distribution?" (Poisson); "the number of defective parts in samples of 100" (binomial); "the time between failures of a pump with a constant failure rate" (exponential); "which distribution has a shape parameter describing wear-out?" (Weibull).

## Worked Example

**Part A: multi-vari.** A plastics moulder makes a bracket in a four-cavity mould and has 6% of brackets out of specification on a critical width. The team samples three consecutive shots (units) at each of four times across a shift (start, plus 2, 4 and 6 hours), measuring the width from all four cavities on each shot: 4 × 3 × 4 = 48 measurements.

1. **Positional (cavity to cavity).** Within each shot, cavity 3 reads about 0.08 mm above the other three, every time. The vertical lines on the chart are long and always tilted the same way.
2. **Cyclical (shot to shot).** Within each time point, the three shot averages differ by no more than 0.02 mm. The clusters are tight.
3. **Temporal (across the shift).** The cluster averages drift upward by about 0.05 mm over the six hours as the mould warms.
4. **Reading.** Positional variation dominates, with a clear culprit (cavity 3), and a smaller temporal drift. Cyclical variation is negligible, so operator technique and material lot are not where to look.
5. **Follow-up.** A 2-sample t-test of cavity 3 against the others (Day 16) confirms the offset (p < 0.001), and the tooling team finds a worn insert. The drift is addressed by a longer warm-up before first production. Both were found from 48 measurements and one chart, without a single process change.

**Part B: distributions.** Five stems and their arithmetic.

1. An invoice has 5 opportunities and the DPU is 0.12. The number of defects per invoice is Poisson with mean 0.12. Probability of a defect-free invoice: e^(−0.12) = 0.887, matching Day 3's yield.
2. Panels average 2.0 scratches each (Poisson, λ = 2). Probability of exactly zero scratches: e^(−2) × 2⁰ ÷ 0! = 0.135. Probability of exactly one: e^(−2) × 2 ÷ 1 = 0.271. Probability of two or more: 1 − 0.135 − 0.271 = 0.594.
3. Deliveries are late with probability 0.10. In a sample of 20 deliveries the number of late ones is binomial with n = 20, p = 0.10: mean 20 × 0.10 = 2.0; standard deviation √(20 × 0.1 × 0.9) = √1.8 = 1.34. Probability of no late deliveries: 0.9²⁰ = 0.122.
4. A pump fails at a constant rate of 0.02 failures per hour. Time between failures is exponential with mean 1 ÷ 0.02 = 50 hours (MTBF). The probability it survives beyond 50 hours is e^(−1) = 0.368, so the median life is below the mean: the median is 50 × ln 2 = 34.7 hours (ln is the natural logarithm, the inverse of e^x on a calculator; ln 2 = 0.693).
5. A Weibull fit to bearing failures gives β = 2.4. Because β > 1, the failure rate rises with age: wear-out. Had β been 0.7, failures would be concentrated early, pointing to installation or manufacturing defects.

## Formula Card

- Multi-vari families: positional (within unit), cyclical (unit to unit), temporal (time to time). The largest family points to the class of cause.
- `Poisson: P(k) = e^(−λ) λ^k ÷ k!`; mean λ; variance λ. `P(0) = e^(−λ)`.
- `Binomial: mean = n p`; `standard deviation = √(n p (1 − p))`; `P(0) = (1 − p)^n`.
- `Exponential: mean = 1 ÷ λ` (MTBF for a constant failure rate); `P(T > t) = e^(−λ t)`; median = mean × ln 2 ≈ 0.693 × mean.
- Weibull shape β: < 1 early-life failures, = 1 constant rate (exponential), > 1 wear-out.
- Normal: Day 8. Class decides the capability method, the control chart and the test.

## Exam Traps

- Positional is within one unit (cavities, positions, fields); cyclical is consecutive units; temporal is over time. A "shift-to-shift" difference is temporal, not cyclical.
- Multi-vari is a passive, graphical study to locate variation; it does not test hypotheses or change the process.
- Poisson models counts of events per unit or interval (defects per panel); binomial models the number of successes out of a fixed n (defectives out of 50). "Defects" per unit is Poisson; "defective units" in a sample is binomial.
- Exponential is time *between* events at a constant rate; its mean is 1 ÷ λ and its median is less than its mean.
- Weibull with shape β = 1 is the exponential; β > 1 means wear-out; β < 1 means early failures.
- Poisson mean equals its variance. Binomial mean is n × p.
- Normal and exponential and Weibull are continuous; Poisson and binomial are discrete.
- Non-normal continuous data (exponential, Weibull) cannot go straight into Cp, Cpk or a t-test.
- The DPU-to-yield formula e^(−DPU) is the Poisson probability of zero defects; it is not 1 − DPU.

## Check Questions

- A-3.1-001
- A-3.1-003
- A-3.1-005
- A-3.1-007
- A-3.1-009

## Applied Task

Plan a multi-vari study for your own project's primary metric: name the positional, cyclical and temporal levels you would sample (with the actual positions, unit counts and time points from your process), then use your organisation's historical data to approximate it: pick three time periods, three consecutive units or cases within each, and any within-unit positions or fields that exist, and tabulate the values. State which family appears largest and which class of x that points to. Then classify each of your project's measures by distribution (normal, exponential, Poisson, binomial, Weibull), justify each choice from what the measure counts or times, and for one count measure check whether its variance is close to its mean. Paste the plan, the table, the family verdict and the distribution list to your coach.

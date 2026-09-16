---
day: 6
week: 2
phase: Measure
title: Data Types and Sampling
minutes: 50
bok_sections: ["2.2", "3.2"]
objectives:
  - Classify any measure as continuous or discrete (attribute) data and say why the difference matters
  - Tell a population from a sample and explain why Six Sigma almost always works with samples
  - Describe random, stratified and systematic sampling and choose the right one for a situation
  - Recognise the sampling mistakes (convenience, bias, too small) that make data worthless
  - Write a data collection plan with operational definitions that another person could follow
glossary_terms: ["data", "continuous data", "discrete data", "attribute data", "count data", "population", "sample", "parameter", "statistic", "random sampling", "stratified sampling", "systematic sampling", "convenience sampling", "sampling bias", "sample size", "data collection plan", "check sheet", "measurement", "variable"]
---

## The Idea

### Measure starts with a question about data

The Define phase ended with a charter, a primary metric and a SIPOC. The Measure phase answers "how bad is it now, measured honestly?" and that means collecting data. **Data** are recorded observations: numbers, categories or counts written down according to a rule. Before collecting any, a Green Belt has to decide three things: what kind of data the metric produces, which items will be measured, and exactly how each measurement will be taken. Get those wrong and every statistic that follows is wrong too, however carefully it is calculated.

### Two kinds of data

Every measure in this course is one of two kinds, and the exam tests the distinction constantly because it decides which tools apply.

**Continuous data** (also called variable data) come from measuring on a scale that can be divided as finely as the instrument allows: length, weight, time, temperature, pressure, cost, voltage. Between any two values there is always another possible value. A delivery can take 2.5 days, 2.51 days or 2.507 days. Continuous data carry a lot of information per observation, so small samples can say a lot.

**Discrete data** come from counting or classifying, and take only separate values with nothing in between. There are two flavours:

- **Attribute data** classify each unit into categories: pass/fail, late/on time, defective/not defective, colour, supplier name. The result for one unit is a label, and the data for many units become a proportion (for example 12% late).
- **Count data** record how many events happened in a unit or period: defects per invoice, complaints per week, scratches per panel. The result is a whole number: 0, 1, 2, 3.

A **variable** is any characteristic that varies from unit to unit and can be measured or classified: the x's and the Y from Day 1 are all variables. The word has a second, separate use: "variable data" means continuous data. In this course "variable" on its own always means a characteristic, and "variable data" always means continuous data.

Why the difference matters:

| | Continuous | Discrete |
|---|---|---|
| Example | Call length in seconds | Call answered within 30 seconds: yes/no |
| Information per observation | High | Low: a yes/no tells you nothing about how close |
| Sample size needed | Small (often 30 or fewer) | Large (hundreds to see a change in a proportion) |
| Typical tools later in the course (names only for now; all are taught in Weeks 3 to 5) | Tests that compare averages, capability indices, control charts for measurements, regression | Tests that compare proportions, control charts for counts, DPMO |

Two rules follow. First, collect continuous data wherever you can, because it tells you more from fewer observations. Recording "38 seconds" is better than recording "under 30: no". Second, data can always be converted from continuous to discrete (by applying a limit) but never back. Once you have written down "late", the two-minute delay and the two-day delay look the same.

A related distinction the exam sometimes uses: **discrete** values are counted (whole numbers), **continuous** values are measured (decimals). A count of 250 units is discrete; a weight of 250 g is continuous. When in doubt, ask whether a value halfway between two observed values is possible.

### Population and sample

A **population** is every unit you want to draw a conclusion about: all invoices raised this year, every bottle the line filled last month, all patients discharged in June. A **sample** is the subset you actually measure. Six Sigma nearly always works with samples, because measuring the whole population is too slow, too expensive, or impossible (a destructive test destroys the unit; next month's output does not exist yet).

A number that describes the population is a **parameter** and is written with a Greek letter: μ (mu) for the population mean and σ (sigma) for the population standard deviation. A number calculated from the sample is a **statistic** and is written with a Roman letter: x̄ ("x bar") for the sample mean and s for the sample standard deviation. The sample statistic is an estimate of the population parameter, and a lot of Week 3 and Week 4 is about how good that estimate is. Day 14 returns to this under the name inference.

### How to take a sample

The whole value of a sample depends on it representing the population. Three methods are in the syllabus.

**Random sampling** (simple random sampling): every unit in the population has an equal chance of being selected, and the choice is made by a chance mechanism such as a random number generator, not by a person. Number the 3 000 invoices, generate 100 random numbers, pull those invoices. It is the reference method: unbiased, but it needs a list of the whole population and can by chance miss a small subgroup.

**Stratified sampling**: divide the population into groups (**strata**) that are expected to differ, such as shift, site, product line or supplier, then take a random sample within each group, usually in proportion to the group's size. It guarantees that every group is represented and lets you compare groups. Use it when you already suspect the groups behave differently, which in an improvement project is nearly always.

**Systematic sampling**: pick a random starting point, then take every k-th unit: every 20th invoice, every 10th bottle off the line, one call every 15 minutes. It is simple to run in a live process and spreads the sample through time. Its danger is **periodicity**: if the process has a cycle that matches the interval (a machine with 10 heads sampled every 10th unit), you will only ever see one head.

Two methods the exam expects you to recognise as bad:

- **Convenience sampling**: taking whatever is easiest, such as the invoices on top of the pile, the first 50 calls on Monday morning, or the parts nearest the door. Whatever made them convenient usually also makes them unrepresentative.
- Judgement sampling: an expert picks "typical" units. It reproduces the expert's assumptions.

Any systematic difference between the sample and the population is **sampling bias**. Bias cannot be fixed by taking a bigger sample; a million convenience samples are still convenient. The only cure is a better selection method.

### How many

**Sample size** is the number of units measured, written n. The exam does not ask Green Belts to derive sample size formulas, but it does test the ideas:

- Bigger samples give more precise estimates, and the gain follows the square root: to halve the uncertainty you need four times the sample.
- Continuous data need far fewer observations than discrete data for the same precision. A rule of thumb used in many courses is 30 continuous observations for a reasonable estimate of a mean, and at least several hundred attribute observations to estimate a proportion when defects are rare.
- Sampling for a rare event needs enough units to actually contain some events. If 2% of invoices are wrong, a sample of 50 will contain one defective invoice on average, and quite often none.
- More data does not fix bias.

### The data collection plan

A **data collection plan** is the Measure deliverable that turns the metrics into instructions. For each measure it records:

1. **What** will be measured, with its **operational definition** (Day 4): exactly what counts, in what units, from which record or instrument.
2. **Data type**: continuous, attribute or count, so the right tools can be planned.
3. **Where** in the process the data are captured (from the SIPOC).
4. **How much and how often**: the sampling method and the sample size.
5. **Who** collects it and **how** it is recorded, often on a **check sheet**, a simple form with a tick box or tally for each occurrence, designed so that the data are usable without re-typing. Recording the conditions at the time (shift, machine, operator, day) turns a plain count into data that can be stratified in Analyse.
6. How the **measurement** system itself will be checked. A measurement is a comparison against a standard, and Day 10 tests whether the comparison can be trusted before the data are believed.

The plan is tested with a short trial run before the real collection starts. Trial runs find unclear definitions, missing fields and forms nobody can fill in.

## Worked Example

The invoice team from Day 5 needs a baseline for its primary metric (percentage of invoices with at least one error) and wants to know whether the three order-entry clerks differ. About 3 000 invoices are raised each month by three clerks: Ana raises about 1 500, Ben about 1 000 and Chen about 500.

1. **Classify the data.** "Invoice has at least one error: yes/no" is attribute data. The team also decides to record "number of errors on the invoice" (count data) and "minutes from order receipt to invoice issue" (continuous data) for each sampled invoice, because it costs nothing extra and continuous data will be far more useful later.

2. **Define the population.** All invoices issued in the last full month, 3 012 of them, listed in the finance system.

3. **Choose the sampling method.** The monthly 500-invoice random sample from Day 5 continues for the primary metric. For the clerk comparison the team draws a separate sample. A simple random sample of 300 would, by chance, give roughly 150 of Ana's, 100 of Ben's and 50 of Chen's, and 50 is too few to compare Chen's error rate (around 9%) with the others with any precision. The team chooses stratified sampling by clerk: 100 random invoices from each clerk, selected with random numbers against each clerk's list. Every clerk is now represented equally and can be compared. Because the strata are sampled equally rather than in proportion to their size, an overall error rate from this sample must weight each clerk's rate by their share of invoices (50%, 33%, 17%), not average the three.

4. **Check for bias.** The first proposal had been "the 300 invoices the checker has already flagged this month". Those are the invoices somebody had reason to look at, so they would overstate the error rate. Rejected as convenience sampling with bias.

5. **Write the plan.**

   | Measure | Operational definition | Type | Source | Sample | Who |
   |---|---|---|---|---|---|
   | Invoice error (Y) | Any field that the customer's accounts payable team would reject or that needs a credit note, per the checklist of five fields | Attribute | Finance system, invoice PDF | 100 random per clerk per month | Checker (R.S.) |
   | Errors per invoice | Number of the five fields wrong | Count | Same | Same | Same |
   | Issue time | Minutes from order-received timestamp to invoice-issued timestamp, system clock | Continuous | Finance system | Same invoices | Extracted by report |
   | Clerk, day of week, order source (web/phone) | From the order record | Attribute | Order system | Same invoices | Extracted by report |

6. **Trial it.** The checker reviews 10 invoices against the plan. Two are ambiguous: an address with a missing postcode that the customer accepted anyway. The operational definition is tightened ("missing or incorrect postcode counts as an error") before the 300 are checked.

The resulting baseline will be a proportion per clerk with 100 invoices behind each, plus continuous timing data that Day 7 can describe and Week 4 can test.

## Formula Card

- Population parameters: `μ` (mean), `σ` (standard deviation), `N` (size). Sample statistics: `x̄` (mean), `s` (standard deviation), `n` (size).
- Systematic sampling interval: `k = N ÷ n` — take every k-th unit after a random start.
- Precision improves with `√n`: four times the sample halves the uncertainty.
- No formula fixes bias.

## Exam Traps

- Continuous data are measured (time, weight, length); discrete data are counted or classified (defects, pass/fail). A percentage built from pass/fail counts is still attribute data.
- Continuous data can be converted to discrete by applying a limit; the reverse is impossible. Questions ask which to collect: continuous, because it needs smaller samples and carries more information.
- Parameter describes the population (Greek letters μ, σ); statistic describes the sample (x̄, s). A question that gives "the mean of the 40 items measured" is describing a statistic.
- Stratified sampling is for populations with known subgroups that may differ; systematic is every k-th unit; random gives every unit an equal chance. Convenience sampling is not a valid method.
- Systematic sampling fails when the process has a cycle matching the interval.
- A bigger sample does not remove bias. If the sample is unrepresentative, size is irrelevant.
- Discrete data need much larger samples than continuous data for the same precision.
- The data collection plan includes operational definitions, data type, sampling method, sample size, who collects and how it is recorded. It is a Measure deliverable, not Define.

## Check Questions

- M-2.2-001
- M-2.2-002
- A-3.2-001
- A-3.2-002
- M-2.2-004

## Applied Task

Write the data collection plan for your own improvement project's primary metric and two secondary or consequential metrics, using the six-column table from the worked example. Classify each measure as continuous, attribute or count, and for any attribute measure say whether a continuous version is available instead. Define the population from your organisation's records for one historical month, choose and justify a sampling method (name the strata if you stratify), and state the sample size. Then draw the sample from the historical records, check 10 items as a trial, and note any change you had to make to an operational definition. Paste the plan and the trial notes to your coach.

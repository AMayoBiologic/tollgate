---
day: 3
week: 1
phase: Define
title: Variation, Metrics and the Cost of Poor Quality
minutes: 50
bok_sections: ["1.2"]
objectives:
  - Explain why variation, not the average, is the enemy of a process
  - Tell a unit, an opportunity, a defect and a defective apart
  - Calculate defects per unit (DPU), defects per opportunity (DPO), defects per million opportunities (DPMO), first time yield and rolled throughput yield from counts
  - Convert DPMO to a sigma level using the sigma table and say what the 1.5-sigma shift means
  - Sort quality costs into the four cost of poor quality categories
  - Build a Pareto chart from category counts and read the vital few from it
glossary_terms: ["common cause variation", "special cause variation", "unit", "opportunity", "DPU", "DPO", "DPMO", "yield", "first time yield", "rolled throughput yield", "cycle time", "lead time", "sigma level", "1.5-sigma shift", "cost of poor quality", "internal failure cost", "external failure cost", "appraisal cost", "prevention cost", "hidden factory", "Pareto analysis", "80:20 rule", "vital few", "Pareto chart", "rework", "scrap"]
---

## The Idea

### Variation is the enemy

Day 1 said that Six Sigma is about consistency. Here is why that matters more than the average.

Suppose a customer needs a delivery within 3 days. (In statistics the ordinary average is called the **mean**; the two words are used interchangeably in this course.) Courier A averages 2.0 days and every delivery lands between 1.5 and 2.5 days. Courier B also averages 2.0 days, but deliveries range from 0.5 to 4.5 days. Both have the same average. Only Courier A meets the customer's need every time. The difference between them is **variation**: how far individual results scatter around the average. A customer experiences individual deliveries, not averages, so the scatter is what produces defects.

Variation has two sources, and telling them apart runs through the whole course.

- **Common cause variation** is the ordinary, ever-present scatter built into the process: slight differences in traffic, in how people work, in materials. It is there all the time and it is predictable in the sense that the process stays within a stable band. You reduce it only by changing the process itself.
- **Special cause variation** comes from something unusual that is not normally part of the process: a road closure, a new untrained driver, a machine fault. It shows up as an unexpected result or pattern. You deal with it by finding the specific cause and removing it.

A process with only common cause variation is called **stable** or "in control". The control charts you meet on Day 24 exist to tell the two kinds apart. For now, the lesson is that a bad result is not automatically a special cause; it may be the ordinary variation of a process that is not good enough.

### Counting defects properly: units, opportunities, defects

To measure how bad a process is you need four words with exact meanings.

- A **unit** is one item of output: one invoice, one patient discharge, one pump, one insurance claim.
- An **opportunity** is one distinct chance for a unit to be wrong, defined in advance. An invoice with five fields that can be wrong has five opportunities. Only count things the customer would see as a defect and that the process could reasonably get wrong; padding the opportunity count is a known way to make a process look better than it is.
- A **defect** is one failure to meet a requirement. A single unit can carry several defects.
- A **defective** is a unit with one or more defects. A unit with three defects is one defective.

From these come the basic Six Sigma metrics. Each is a count divided by a count, and the exam expects you to do the division.

**DPU**, defects per unit: total defects divided by total units inspected. It tells you how many defects the average unit carries. DPU can be more than 1.

**DPO**, defects per opportunity: total defects divided by total opportunities, where total opportunities = units × opportunities per unit. It is a proportion between 0 and 1.

**DPMO**, defects per million opportunities: DPO multiplied by 1 000 000. It scales DPO to a whole number that is easy to compare across processes and is the input to the sigma table.

**Yield** is the proportion of units that come out right. Two versions matter.

- **First time yield** (FTY) for one step is the number of units that pass the step without any rework or scrap, divided by the number that entered it. If 500 invoices were raised and 455 had no defects at all, first time yield is 455 ÷ 500 = 91%. Units that were fixed and then passed do not count as first-time passes; that is the whole point of the measure. Yield measured after rework is called final yield and hides the cost of fixing things.
- **Rolled throughput yield** (RTY) for a whole process with several steps is the first time yields of the steps multiplied together. It is the probability that a unit goes through every step without a single defect. Because it multiplies, RTY is never higher than the worst individual step, and a process of ten 95% steps has an RTY of only 0.95 to the power 10, about 60%.

When you have DPU but not the unit counts, the exam convention estimates the yield as `e^(−DPU)`, where e is the mathematical constant 2.718 (use the e^x key on a calculator). For DPU = 0.12 that gives e^(−0.12) = 0.887, or 88.7%: the chance that a unit carries no defects at all. When defects are rare this is close to 1 − DPU, but the exponential version is the one the exam expects, so use it whenever a question gives DPU and asks for yield. When you have the counts, use them.

**Cycle time** is how long a process takes to complete one unit, measured from when work starts on that unit to when it is finished. **Lead time** is the total elapsed time from the customer's request to delivery, including all the waiting from Day 2. Lead time is what the customer feels; cycle time is what the process is doing. Day 9 uses both in the value stream map.

### Sigma level and the 1.5-sigma shift

A **sigma level** is a single number that describes how many defects a process makes, on a scale where higher is better. It is read from DPMO using the standard sigma table (the reference sheet in this app has one). The table is built from the normal distribution you meet on Day 8, but you do not need the maths to use it. The main landmarks:

| Sigma level | DPMO | Yield |
|---|---|---|
| 1 | 691 462 | 30.9% |
| 2 | 308 538 | 69.1% |
| 3 | 66 807 | 93.3% |
| 4 | 6 210 | 99.38% |
| 5 | 233 | 99.977% |
| 6 | 3.4 | 99.99966% |

If you look at the normal distribution (the bell-shaped curve that describes how most measured things scatter around their average; Day 8), a process whose limits sit six standard deviations from its mean makes about 0.002 defects per million, not 3.4. The 3.4 figure includes the **1.5-sigma shift**: a convention, introduced at Motorola, that a process measured over a short period will drift over the long run, and that the drift is worth about 1.5 standard deviations. So a process that is at 6 sigma in the short term behaves like a 4.5-sigma process in the long term, and 4.5 sigma on the normal distribution is 3.4 defects per million.

In plain terms: the standard sigma table reports short-term sigma, and it does so by adding 1.5 to the number the normal distribution would give for the observed DPMO. When a question gives you a DPMO and asks for the sigma level, read the standard table; the shift is already built in. When a question says "long-term sigma" or "without the shift", subtract 1.5. Day 12 practises this.

### Cost of poor quality

Defects cost money, and the **cost of poor quality** (COPQ) is the total cost an organisation incurs because its output is not right first time. The exam uses four categories. The first two are the costs of failure; the second two are the costs of trying to stop failure.

| Category | Meaning | Examples |
|---|---|---|
| **Internal failure cost** | Defects found before the customer receives the output | **Scrap** (output thrown away), **rework** (fixing output so it passes), re-testing, downtime, sorting, expediting (rushing late work through) |
| **External failure cost** | Defects found after delivery to the customer | Warranty claims, returns, refunds, complaint handling, lost customers, penalties, recalls |
| **Appraisal cost** | Checking and inspecting to find defects | Inspection, testing, audits, calibration (checking a measuring instrument against a known standard), reviewing documents |
| **Prevention cost** | Stopping defects from happening | Training, mistake-proofing (designing the work so the error cannot be made; Day 23), process design, supplier qualification, planning |

External failure is the most expensive category per defect because it includes the customer's reaction. Prevention is the cheapest way to spend a quality dollar. A classic improvement moves spending from failure and appraisal into prevention.

Most of the cost of poor quality is invisible in the accounts. The visible part (scrap, warranty, returns) is the tip of an iceberg; below the water sit overtime to catch up after rework, expediting, excess inventory held as a safeguard, lost sales and management time. The rework and checking that a process does routinely is sometimes called the **hidden factory**: a second, unofficial process that exists only to fix the output of the first. Estimates of total cost of poor quality in a typical organisation run at 15% to 25% of revenue.

### Pareto analysis and the 80:20 rule

Once you have a list of defect types, complaint types or cost categories, the next question is where to start. **Pareto analysis** answers it. The **80:20 rule** (named after the economist Vilfredo Pareto, and applied to quality by Joseph Juran) observes that in most situations roughly 80% of the effect comes from roughly 20% of the causes. Juran called those causes the **vital few** and the rest the "trivial many" (later softened to "useful many").

A **Pareto chart** is a bar chart of categories sorted from the largest count to the smallest, with a line above showing the cumulative percentage. Reading it:

1. The tallest bars on the left are the vital few. Work on them first.
2. Follow the cumulative line to where it crosses 80%; the categories to the left of that point are the ones that matter.
3. The numbers rarely come out at exactly 80:20. It might be 70:30 or 90:10. The principle is that a small number of categories dominates, not the precise split.

Two cautions. First, Pareto by count and Pareto by cost can rank categories differently; a rare but expensive defect may deserve attention before a common cheap one. Second, if the bars are all roughly the same height, Pareto is telling you that the categories you chose are not the right way to split the problem, and you should try another way to categorise.

## Worked Example

An accounts team raises about 3 000 customer invoices a month. Each invoice has five fields that can be wrong: customer name, address, purchase order number, line items and total. Each month a clerk checks a sample of 500 invoices. Last month the check found 60 defects, spread over 45 invoices.

1. **DPU.** 60 defects ÷ 500 units = 0.12 defects per unit.
2. **DPO.** Total opportunities = 500 × 5 = 2 500. DPO = 60 ÷ 2 500 = 0.024.
3. **DPMO.** 0.024 × 1 000 000 = 24 000 defects per million opportunities.
4. **First time yield.** 45 invoices had at least one defect, so 500 − 45 = 455 were right first time. FTY = 455 ÷ 500 = 0.91, or 91%. Note that 60 defects on 45 invoices means some invoices carried more than one defect; the defect count is 60, the defective count is 45.
5. **Sigma level.** Look up 24 000 DPMO on the sigma table. It lies between 3 sigma (66 807) and 4 sigma (6 210); the exact figure is about 3.5. With the 1.5 shift already in the table, the invoice process is running at roughly 3.5 sigma.
6. **Rolled throughput yield.** Invoicing is actually three steps: data entry (first time yield 95%), pricing (90%) and approval (98%). RTY = 0.95 × 0.90 × 0.98 = 0.8379, about 83.8%. So even though no single step is worse than 90%, only 84 invoices in 100 get through all three steps untouched.
7. **Cost of poor quality.** Each reworked invoice costs about $18 of staff time (internal failure). Invoices that reach the customer wrong are paid on average 21 days late and generate a **credit note** (a document cancelling part or all of an invoice so the customer pays less) costing $65 to process (external failure). The clerk spends four hours a month checking the 500-invoice sample ($140, appraisal). The team spent $600 on a one-off training session on the pricing screen (prevention). Sorting the costs this way shows the failure categories dominate.
8. **Pareto.** The 60 defects by field:

   | Field | Defects | Percent | Cumulative % |
   |---|---|---|---|
   | Purchase order number | 27 | 45.0 | 45.0 |
   | Line items | 18 | 30.0 | 75.0 |
   | Address | 8 | 13.3 | 88.3 |
   | Total | 4 | 6.7 | 95.0 |
   | Customer name | 3 | 5.0 | 100.0 |

   Two fields out of five (40% of categories) produce 75% of the defects. Those are the vital few. The project should start with the purchase order number.

## Formula Card

- `DPU = D ÷ U` — D is total defects, U is total units inspected.
- `DPO = D ÷ (U × O)` — O is opportunities per unit.
- `DPMO = DPO × 1 000 000`.
- `FTY = units passing first time without rework ÷ units entering the step`.
- `RTY = FTY₁ × FTY₂ × … × FTYₙ` — multiply the first time yields of every step.
- `Yield from DPU = e^(−DPU)` — e = 2.718; the exam convention when only DPU is given. Use counts when you have them.
- Sigma level: read DPMO from the standard sigma table (includes the 1.5 shift). `Long-term sigma = short-term sigma − 1.5`.
- `Percent of category = category count ÷ total count × 100`; cumulative percent adds down the sorted list.

## Exam Traps

- Defects and defectives are different counts. 60 defects on 45 invoices: DPU uses 60; first time yield uses 45.
- DPO divides by units × opportunities, not by units. Dividing by units alone gives DPU.
- DPMO is DPO × 1 000 000, not DPU × 1 000 000. A question that gives DPU and asks for DPMO also needs opportunities per unit.
- First time yield excludes units that were reworked and then passed. If a question gives "units started" and "units passed without rework", use those; "units shipped" includes rework and is final yield.
- Rolled throughput yield multiplies step yields; it does not average them and it does not take the lowest.
- Yield from DPU is e^(−DPU), not 1 − DPU. For DPU = 0.5 the exam expects 60.7%, not 50%.
- The sigma table already includes the 1.5-sigma shift. 3.4 DPMO = 6 sigma on the table = 4.5 sigma on the plain normal distribution. Do not add 1.5 a second time.
- Cost categories: found before delivery is internal failure; found after delivery is external failure; inspection is appraisal even when it finds nothing; training is prevention.
- The Pareto principle is "a few causes produce most of the effect". The split is not always exactly 80:20 and the chart is sorted by size, not alphabetically or by time.
- Same average, different spread: the question is about variation. The process with the smaller spread is the better one.

## Check Questions

- D-1.2-001
- D-1.2-004
- D-1.2-008
- D-1.2-011
- D-1.2-016

## Applied Task

Take one month of historical output from the process in your own improvement project. Define the unit and list the opportunities per unit (write them down; you will be asked to defend the count). From your organisation's error, complaint or rework records, count the defects and the defective units for that month. Calculate DPU, DPO, DPMO, first time yield and the sigma level from the table. Then split the defects by type into a Pareto table with cumulative percentages and name the vital few. Finish with an estimate of last month's cost of poor quality, sorted into the four categories, using your organisation's labour rates and rework times. Paste the metrics, the Pareto table and the cost estimate to your coach.

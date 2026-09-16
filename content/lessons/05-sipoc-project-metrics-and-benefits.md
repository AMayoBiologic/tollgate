---
day: 5
week: 1
phase: Define
title: SIPOC, Project Metrics and Benefits
minutes: 50
bok_sections: ["1.2", "1.3", "2.1"]
objectives:
  - Build a SIPOC diagram for a process and say what each column is for
  - Choose a primary metric, the secondary metrics that explain it and the consequential metrics that guard it
  - Set a baseline and a target and express the gap as a measurable benefit
  - Separate hard benefits from soft benefits and calculate an annual saving, a payback period and a return on investment
  - Explain how benefits are validated and tracked after the project closes
glossary_terms: ["SIPOC", "supplier", "primary metric", "secondary metric", "baseline", "target", "hard benefit", "soft benefit", "cost avoidance", "payback period", "return on investment", "net present value", "benefits capture", "financial representative", "project selection", "one-off cost", "recurring saving"]
---

## The Idea

### SIPOC: the process on one page

Day 4 said that defining a process means fixing its boundaries, inputs, outputs and owner. The standard tool for writing that down is the **SIPOC** diagram, a five-column table whose name is its columns: **Suppliers, Inputs, Process, Outputs, Customers**.

| Column | Question it answers | Example (invoice process) |
|---|---|---|
| **S**uppliers | Who or what provides the inputs? | Sales team, pricing system, customer master file |
| **I**nputs | What does the process need to start and run? | Signed order, price list, customer details, delivery note |
| **P**rocess | The five to seven high-level steps between the boundaries | Receive order → enter lines → price → approve → issue invoice |
| **O**utputs | What does the process produce? | Invoice, credit note, invoice record in ledger |
| **C**ustomers | Who receives each output? | Customer's accounts payable team, finance (internal), sales (internal) |

A **supplier** in SIPOC is anyone or anything that provides an input, whether an outside company, another department, a computer system or the customer themselves (a patient supplies the referral letter). Suppliers can also be customers of the same process, as when a customer supplies an order and receives an invoice.

SIPOC is built in a particular order, and the exam sometimes asks for it. Start with the **Process** column: agree the first and last step (the boundaries from Day 4) and fill in five to seven steps between them. Then list the **Outputs** and the **Customers** who receive them. Then the **Inputs** each step needs, and finally the **Suppliers** of those inputs. Starting from the middle keeps the diagram at the right level of detail.

SIPOC is deliberately high level. It does not show decisions, loops or who does what; that is the detailed process map on Day 9. Its purpose in Define is to get the team and the Champion agreeing on the same process, to show where the inputs come from (the x's often live with suppliers), and to list every customer whose requirements matter. It is also the frame for the data collection plan (the Measure document listing what will be measured, how and by whom): every input and output is a candidate for measurement.

### Project metrics

A project needs a small set of numbers that say whether it is working. Day 4 turned the customer need into a CTQ. Today that CTQ becomes the **primary metric**: the single measure of the Y that the problem statement and goal statement are written in, that the team will baseline in Measure and track through Control. There is one primary metric per project. If a team cannot name it in a sentence, the project is not yet defined.

IASSC names two further classes of project metric.

- **Secondary metrics** are the process measures (x's) and related outputs the team expects to move along with the primary metric and that help explain why it moved. The percentage of orders received with a valid purchase order number is a secondary metric for an invoice error project.
- **Consequential metrics** (also called guard-rail metrics) protect against fixing one thing by breaking another. If the primary metric is invoice error rate, a consequential metric is invoice cycle time, because the easiest way to cut errors is to check everything twice and slow the process down. Cost per invoice and staff overtime are other candidates. A consequential metric must not get worse while the primary metric improves.

Each metric needs the operational definition from Day 4, a **baseline** (its value now, measured over a long enough period to capture normal variation, typically three to twelve months of historical data) and a **target** (the value in the goal statement). The gap between baseline and target, converted into money, is the project's benefit. Baselines come from Measure; the Define phase records the best available historical figure and flags it as provisional.

### Financial evaluation

Benefits are sorted into two kinds, and the distinction matters both in the exam and to finance departments.

- **Hard benefits** (hard savings) show up in the profit and loss account (the statement of the organisation's income and expenses): lower spending, more revenue, or cash released. Fewer rejected parts, less overtime, fewer credit notes, freed inventory, a contract cancelled. They can be audited (checked by an independent person against the records).
- **Soft benefits** are real but do not appear directly as money: staff time freed (which is only a hard saving if a position is removed or the time is redeployed to paid work), better customer satisfaction, lower risk, improved safety, better morale, and **cost avoidance** (spending that would have been needed but now is not, such as a planned second shift that is no longer required). Organisations differ on whether cost avoidance counts as hard or soft; most treat it as soft unless a budgeted cost is cancelled.

Four calculations appear in exam questions and in every business case.

1. **Annual saving.** Saving per unit × units per year, or monthly saving × 12. A **recurring saving** repeats every year; a **one-off cost** (training, a software change, a new fixture) is paid once. Keep the two apart.
2. **Payback period.** How long until the saving repays the cost: one-off cost ÷ saving per period, in the same period units. A project costing $48 000 that saves $6 500 a month pays back in 7.4 months.
3. **Return on investment** (ROI). (Benefit − cost) ÷ cost, as a percentage, usually over one year. Benefit $78 000 in year one against cost $48 000 is (78 000 − 48 000) ÷ 48 000 = 62.5%.
4. **Net present value** (NPV). Money received next year is worth less than money received today, because today's money could be invested. NPV adds up all the project's cash flows, each one reduced ("discounted") by the organisation's discount rate, the yearly return it requires from investments, for the number of years until it arrives, and subtracts the up-front cost. A positive NPV means the project earns more than the organisation's required rate. Green Belts are expected to know what NPV means and that a positive value is good; the discounting itself is done by finance.

Finance departments usually count benefits for twelve months after the improvement is in place, and they insist that the calculation uses the organisation's own cost figures (labour rates, overhead rates, scrap values), not the team's estimates.

### Benefits capture

**Benefits capture** (or benefits realisation) is the discipline of making sure the money the charter promised actually arrives. Its parts:

- A **financial representative** (a member of the finance team assigned to the project) validates the baseline cost, agrees the calculation method in Define, and signs off the realised saving in Control. This person, not the Green Belt, decides what counts as hard.
- The saving is measured against the baseline, using the same operational definition, for an agreed period after handover (commonly twelve months), and reported at intervals.
- Benefits are net of costs: the one-off project costs and any new ongoing costs are subtracted.
- Benefits are not double-counted across projects that touch the same process.

The exam asks who validates benefits (finance, not the belt) and when benefits are counted (after the improvement is implemented, on measured results, not on the forecast in the charter).

### Project selection

Organisations usually have more candidate projects than belts. **Project selection** compares candidates on a small set of criteria: size of the benefit, link to strategy, probability of success, time and resources needed, and data availability. A weighted scoring matrix, with each criterion scored 1 to 5 and multiplied by a weight, is the usual tool. A good Green Belt project has a clear Y, a process that runs often enough to produce data within weeks, a problem the Champion cares about, causes that are not already known, and a scope one person can lead part-time in three to six months. A problem whose solution is already known is not a Six Sigma project; it is a task.

## Worked Example

The invoice team from Day 3 is preparing the Define tollgate. Their Green Belt completes the SIPOC, the metrics and the financial evaluation.

1. **SIPOC.** Process first: (1) receive signed order, (2) enter order lines, (3) apply pricing, (4) approve invoice, (5) issue invoice. Outputs: invoice, ledger entry, credit note when wrong. Customers: the customer's accounts payable team (the people who pay invoices); finance (internal, receives the ledger entry, the record of the sale in the accounts); sales (internal, receives the credit note report). Inputs: signed order, customer master record (the stored details for each customer), price list, approval rules. Suppliers: sales team, customer master system, pricing team, finance policy.

2. **Primary metric.** Percentage of invoices with at least one error, measured by the monthly check of a 500-invoice sample, using the operational definition "an error is any field that the customer's accounts payable team would reject or that requires a credit note". Baseline from the last six months: 9.0%.

3. **Secondary and consequential metrics.** Secondary: percentage of orders arriving with a valid purchase order number (baseline 71%). Consequential: invoice cycle time from order receipt to invoice issue (baseline 2.3 days), and checking hours per month (baseline 4 hours).

4. **Target and gap.** Goal statement: 9.0% to 3.0%. On 3 000 invoices a month, 9.0% is 270 defective invoices and 3.0% is 90, a reduction of 180 a month.

5. **Hard benefit.** Each defective invoice costs $18 of rework and, for the 60% that reach the customer, a $65 credit note and handling cost. Average cost per defective invoice: 18 + 0.6 × 65 = 18 + 39 = $57. Monthly saving: 180 × 57 = $10 260. Annual hard saving: 10 260 × 12 = $123 120. Finance also values the 21-day payment delay on the affected invoices at about $1 400 a month in interest; the financial representative treats that as a soft benefit because it does not appear as a line in the profit and loss account.

6. **Soft benefit.** The clerk's four checking hours a month will not be removed, so they are a soft benefit unless redeployed. Fewer angry calls from customers is soft. Neither goes into the ROI.

7. **Costs.** One-off: a change to the order entry screen ($24 000), training ($4 000), and the Green Belt's time (finance estimates $20 000). Total one-off cost: $48 000. No new recurring costs.

8. **Payback and ROI.** Payback: 48 000 ÷ 10 260 = 4.7 months. First-year ROI: (123 120 − 48 000) ÷ 48 000 = 1.565, so 156.5%. The financial representative agrees the method and notes that the saving will be measured from the monthly sample check for twelve months after the change is switched on.

The Champion now has, on one page, what the process is, how it will be measured, what the improvement is worth, and who will confirm it.

## Formula Card

- `Annual saving = saving per unit × units per year` (or monthly saving × 12). Recurring, not one-off.
- `Payback period = one-off cost ÷ saving per period` — answer is in the period's units (months if the saving is monthly).
- `ROI (%) = (benefit − cost) ÷ cost × 100` — benefit and cost over the same period, usually one year.
- `NPV = (sum of future cash flows, each discounted for the years until it arrives) − initial cost`. Positive NPV is good. Green Belts interpret; finance calculates.
- `Gap = baseline − target` in the primary metric's units; convert to money with the cost per defect.
- SIPOC build order: Process, then Outputs and Customers, then Inputs and Suppliers.

## Exam Traps

- SIPOC columns are Suppliers, Inputs, Process, Outputs, Customers, and the Process column holds five to seven high-level steps, not a detailed flowchart. Detailed mapping comes later.
- Build SIPOC from the Process column outwards. Questions that ask "what is defined first" want the process steps and boundaries.
- One primary metric per project, and it is the same measure as the goal statement. Secondary metrics are the x's and related measures expected to move with it; consequential metrics guard against unintended harm.
- A consequential metric guards against unintended harm (speed up, quality drops). Questions describe a side effect and ask what should have been tracked; the answer is consequential, not secondary.
- Hard savings hit the profit and loss account and are auditable. Freed staff time is soft unless the position or hours are actually removed. Cost avoidance is usually soft.
- Payback period = cost ÷ saving per period. ROI = (benefit − cost) ÷ cost, not benefit ÷ cost.
- Benefits are validated by the financial representative, on measured results after implementation, net of costs, for an agreed period (usually twelve months). They are not the forecast in the charter.
- A problem with a known solution is not a project. Project selection looks for benefit, strategic fit, data availability and a scope that fits a part-time belt in three to six months.

## Check Questions

- M-2.1-001
- M-2.1-003
- D-1.3-009
- D-1.3-012
- D-1.2-023

## Applied Task

Build the SIPOC for your own improvement project, starting from the Process column, with the same boundaries as the charter you drafted on Day 4. Then complete a metrics sheet: the primary metric with its operational definition and a baseline calculated from at least three months of your organisation's historical data; one secondary metric and two consequential metrics with their baselines; and the target. Finish with a financial evaluation: hard benefit per year using your organisation's actual cost figures, soft benefits listed separately, one-off costs, payback period in months and first-year ROI. Name the person in finance who will validate the saving. Paste the SIPOC, the metrics sheet and the financial evaluation to your coach.

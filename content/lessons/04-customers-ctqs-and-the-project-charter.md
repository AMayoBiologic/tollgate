---
day: 4
week: 1
phase: Define
title: Customers, CTQs and the Project Charter
minutes: 50
bok_sections: ["1.1", "1.2", "1.3"]
objectives:
  - Distinguish internal from external customers and reactive from proactive ways of gathering their voice
  - Translate a vague customer statement into a critical to quality characteristic with a measure, a target and a limit
  - Define a process by naming its boundaries, inputs, outputs and owner
  - Write a problem statement and a goal statement that pass the exam's tests
  - List the elements of a project charter and a business case and say what each is for
glossary_terms: ["customer", "internal customer", "external customer", "requirement", "critical to quality", "CTQ tree", "Kano model", "operational definition", "process boundary", "project charter", "problem statement", "goal statement", "scope", "business case", "milestone", "stakeholder", "SMART goal", "affinity diagram"]
---

## The Idea

### Who the customer is

A **customer** is whoever receives the output of a process. Day 1 described the customer as whoever receives the output of a process. Most people picture the **external customer**: someone outside the organisation who pays for or uses the output. But most processes hand their output to another process inside the same organisation. The team that receives it is an **internal customer**. Payroll is the internal customer of the timesheet process; the surgeon is the internal customer of the sterilisation department. Internal customers have requirements too, and a defect that reaches them is still a defect. When a question describes a downstream department complaining, it is describing an internal customer.

A **requirement** is something the customer needs the output to be or do. Requirements can be spoken ("I need it by Friday") or unspoken ("I assume it will not arrive damaged"). Six Sigma is strict that requirements come from the customer, not from what the organisation finds convenient to promise.

### Gathering the voice of the customer

The voice of the customer is not a single survey. Sources fall into two groups.

- **Reactive** sources arrive without being asked: complaints, returns, warranty claims, calls to the help desk, online reviews, credit notes. They are cheap and honest, but only the unhappiest customers speak up, so they under-count problems.
- **Proactive** sources are collected on purpose: interviews, surveys, focus groups, observing the customer using the product, and market research. They cost more but reach the quiet majority and uncover needs the customer has never said aloud.

A good project uses both. The raw material is a pile of statements in the customer's own words ("your invoices are a nightmare"), and the next job is to turn them into something measurable. A common first step is an **affinity diagram**: writing each statement on a card and grouping the cards into themes, so that 200 comments become 8 needs.

The **Kano model** (Noriaki Kano, 1984) sorts needs into three kinds, and the exam occasionally asks about them.

- **Basic** (must-be) needs: expected without being asked. Meeting them earns nothing; missing them causes anger. Brakes that work.
- **Performance** needs: the more the better, and customers will say so. Battery life, delivery speed.
- **Delighters** (excitement needs): unexpected features that please. Nobody complains when they are absent. Over time delighters become basics.

### From need to critical to quality characteristic

A customer need is usually vague. A **critical to quality** characteristic (CTQ) is that need translated into a measurable feature of the output, with a target and a limit. Most projects get there with a **CTQ tree**, which drills down in three levels:

1. **Need**: what the customer wants, in their words. "I want my order quickly."
2. **Driver**: what has to happen for the need to be met. "Orders are picked promptly." "Orders are shipped the day they are picked."
3. **CTQ**: a measurable characteristic with a specification. "Order lead time from confirmation to dispatch, target 24 hours, upper limit 48 hours."

A CTQ needs three things: a **measure** (what number will be collected and in what units), a **target** (the value the customer really wants) and a **specification limit** (the point beyond which the output is a defect). Specification limits are the customer's boundaries, not the process's usual performance. Day 11 measures how well a process fits inside them.

Two more terms travel with CTQs. The **operational definition** is a written description of exactly how a measure is taken, so that two people measuring the same thing get the same answer: what counts as "dispatched", which clock is used, and where the record comes from. Without one, the data collected in Measure means different things to different people. And the CTQ is the project's Y from Day 1: the output measure that Y = f(x) is trying to move.

### Defining a process

Before a problem can be measured, the team has to agree what the process is. Defining a process means stating:

- Its **process boundaries**: the first step (the trigger that starts it) and the last step (the point where the output is handed over). A boundary chosen too wide makes the project unmanageable; too narrow and the cause may sit outside it.
- Its **inputs** and who supplies them, and its **outputs** and who receives them.
- Its **process owner**, the manager accountable for how it runs.
- The high-level steps between the boundaries, usually five to seven. Day 5 introduces the SIPOC diagram (Suppliers, Inputs, Process, Outputs, Customers), which is the standard way of writing this down on one page.

Exam questions on "defining a process" are usually about boundaries: they describe a project that keeps growing, or a cause that sits with a supplier, and ask what was missed.

### The business case

A **business case** is the short argument for why the organisation should spend time and money on this project rather than another. It states what the problem costs now (using the cost of poor quality thinking from Day 3), what the improvement would be worth, how the project supports the organisation's strategy, and what happens if nothing is done. The business case is the voice of the business written down, and it is what the Champion uses to defend the project to other managers. It should be no more than a few sentences, and its numbers must be checkable.

### The project charter

The **project charter** is the one- or two-page document that authorises the project. It is the main deliverable of Define, it is signed by the Champion, and it is the reference every tollgate comes back to. The exam asks about its elements individually, so learn each one and what it is for.

| Element | What it says | Test |
|---|---|---|
| **Business case** | Why this project matters to the organisation, in money or strategic terms | Would a manager fund it? |
| **Problem statement** | What is wrong, where, since when, how big, and what it costs | Does it contain a measurable Y? Does it avoid causes, blame and solutions? |
| **Goal statement** | What the Y will be by when | Is it specific, measurable and dated? (the SMART test, explained below) |
| **Scope** | Which process, which boundaries, which sites or products are in and out | Could two people disagree about whether something is included? |
| **Team** | Champion, process owner, Green Belt, team members, and how much time each gives | Is anyone missing who owns a step? |
| **Timeline** | Planned dates for each DMAIC tollgate; the **milestones** | Is it realistic? Green Belt projects typically run 3 to 6 months |

The charter is a living document. It is drafted in Define, but the numbers are refined once Measure produces a real baseline (the measured starting value of the Y, covered on Day 5), and scope may be tightened with the Champion's agreement. What must not change quietly is the goal.

**Stakeholders** are everyone with an interest in the process or the project, including people outside the team who can help or block it. Many charters list them, with a note on how each will be kept informed. Ignoring a stakeholder who owns part of the process is a common reason Improve stalls.

### Writing a problem statement

A good problem statement answers five questions in two or three sentences: **what** is wrong, **where** it happens, **when** it started or was measured, **how much** (the measured size, the Y), and the **impact** on the customer or the business. It must not say why, and it must not say what to do about it. Both of those belong to later phases, and putting them in the charter commits the team to a cause before any data has been collected.

Weak: "Invoicing is a mess because the pricing system is out of date and we need to replace it."

Strong: "Between January and June, 9% of the 3 000 invoices raised each month at the Perth office contained at least one error, causing an average 21-day payment delay and about $15 400 a month in credit notes and rework."

The weak version names a cause and a solution and has no number. The strong version has a place, a period, a measured Y, and an impact, and it leaves the cause open.

### Writing a goal statement

A **goal statement** says what the Y will be and by when. The usual test is **SMART**: Specific, Measurable, Achievable, Relevant, Time-bound. It uses the same measure as the problem statement, so that success can be checked. "Reduce the invoice error rate from 9% to 3% by 30 November" is a goal. "Improve invoicing" is not. Aggressive but achievable is the norm; a Green Belt goal that halves the defect rate, or better, is typical. A goal must not describe the solution ("implement the new pricing system by November") because the solution is not known yet.

## Worked Example

Return to the courier from Day 1. The Champion has agreed there is a project. Follow how the Green Belt builds the charter.

1. **Gather the voice of the customer.** Reactive: 312 complaints in three months, 240 of them about late arrival, 40 about damage, 32 about missed delivery windows. Proactive: 25 phone interviews with business customers. The interviews reveal an unspoken requirement: customers plan staff around the promised window, so a delivery two hours early is nearly as bad as one two hours late.

2. **Build the CTQ tree.**
   - Need: "Arrive when you said you would."
   - Drivers: parcel loaded on the correct van; van follows a route that reaches the customer inside the window; depot cut-off met.
   - CTQ: parcel arrival time relative to the promised window. Target: inside the window. Specification limits: no earlier than 30 minutes before the window opens, no later than the window closes. Operational definition: arrival is the driver's scan at the customer's door, from the handheld scanner clock; the window is the one printed on the tracking page. The current 12.0% figure counts late arrivals only; Measure will re-baseline the metric with early arrivals included.

3. **Define the process.** Boundary start: parcel scanned into the depot. Boundary end: driver's delivery scan. Out of scope: the long-distance trucking from the interstate hub to the depot, and parcels for the two remote routes served by contractors. Process owner: the depot supervisor.

4. **Write the business case.** 1 480 of 12 300 parcels a month (12.0%) miss the window. Each costs about $9 in re-delivery and refunds, about $13 300 a month, or $160 000 a year, plus three business accounts lost in the last quarter citing reliability.

5. **Write the problem statement.** "From April to June, 12.0% of the 12 300 parcels delivered each month from the Perth metro depot arrived outside the promised delivery window, costing about $13 300 a month in re-delivery and refunds and contributing to the loss of three business accounts."

6. **Write the goal statement.** "Reduce the percentage of parcels delivered outside the promised window from 12.0% to 5.0% by 31 October."

7. **Name the team and the timeline.** Champion: operations manager. Process owner: depot supervisor. Green Belt: you, one day a week. Team: two drivers, one sorter, one customer service officer. Tollgates: Define 31 July, Measure 21 August, Analyse 18 September, Improve 31 October (the goal is demonstrated here), Control 28 November.

Check the problem statement against the five questions: what (arrived outside the window), where (Perth metro depot), when (April to June), how much (12.0% of 12 300 a month), impact ($13 300 a month, three accounts). No cause, no solution. Check the goal: specific measure, number, date.

## Formula Card

No formulas in this lesson.

- Problem statement answers: what, where, when, how much, impact. Never why, never what to do.
- Goal statement is SMART: Specific, Measurable, Achievable, Relevant, Time-bound, and uses the same Y as the problem statement.
- CTQ tree: need → driver → CTQ (measure + target + specification limit).
- Charter elements: business case, problem statement, goal statement, scope, team, timeline.

## Exam Traps

- A problem statement that contains a cause ("because the system is old") or a solution ("we need to replace it") is wrong, however well written. Questions offer these as the polished-sounding distractor.
- The problem statement and goal statement must use the same measure. A problem about error rate with a goal about cycle time is a mismatch.
- The goal is written in Define before causes are known, so it cannot name the solution.
- Internal customers count. The next department is a customer, and its requirements define defects for the upstream process.
- Complaints are reactive voice of the customer; surveys and interviews are proactive. Complaints alone under-count problems because most unhappy customers do not complain.
- A CTQ is measurable and has a target and a limit. "Friendly service" is a need; "call answered within 30 seconds" is a CTQ.
- Specification limits come from the customer. They are not the process's current best and worst.
- Scope creep (the project's boundaries growing after the charter is agreed) is a boundary problem. The fix is the charter's scope statement, agreed with the Champion, not a bigger team.
- The charter is signed by the Champion, is a Define deliverable, and is revisited at every tollgate. It is not frozen, but the goal is not changed without the Champion.
- Kano: basic needs cause dissatisfaction when missing but no satisfaction when present; delighters do the reverse; performance needs go both ways.

## Check Questions

- D-1.3-001
- D-1.3-003
- D-1.2-020
- D-1.1-021
- D-1.3-006

## Applied Task

Draft the charter for your own improvement project. Pull three months of historical figures for the Y from your organisation's records so that the problem statement has a real number, a place and a period. Write: the business case (two sentences with a dollar or hours figure), the problem statement (test it against what, where, when, how much, impact, and strike out any cause or solution), the goal statement (SMART, same measure), scope with the first and last step named, team with roles, and five tollgate dates. Add a three-level CTQ tree for the main customer need, ending in a CTQ with a measure, target, limit and operational definition. Paste the charter and the tree to your coach.

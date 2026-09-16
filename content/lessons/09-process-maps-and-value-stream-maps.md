---
day: 9
week: 2
phase: Measure
title: Process Maps and Value Stream Maps
minutes: 50
bok_sections: ["2.1"]
objectives:
  - Choose the right level of process map (SIPOC, high-level, detailed, swimlane) for a purpose
  - Draw a detailed process map with the standard symbols and capture the as-is process, not the should-be
  - Name the elements of a value stream map and calculate lead time, process time, process cycle efficiency and takt time
  - Classify each step as value-added, business non-value-added or non-value-added
  - Use a map to find where the x's and the waste sit
glossary_terms: ["process map", "flowchart", "swimlane map", "as-is process", "value stream map", "process time", "process cycle efficiency", "takt time", "Little's law", "throughput", "bottleneck", "changeover time", "spaghetti diagram", "timeline", "current state map", "future state map"]
---

## The Idea

### Why draw the process

Day 5's SIPOC gave the process at five to seven steps. That is enough to agree what the project is about, but not enough to find where the problem is. Measure goes one level deeper and draws the process as it really runs, because the x's live in the detail: the approval that is skipped on Fridays, the form that goes back for a signature, the queue nobody counted. Drawing the process is also the first place most teams discover that no two people do it the same way.

A **process map** (also called a **flowchart**) is a diagram of the steps in a process in the order they happen, with the decisions, loops and handoffs shown. Standard symbols: a rounded box for start and end, a rectangle for a step, a diamond for a decision (with the question inside and "yes" and "no" arrows leaving), a parallelogram for an input or output, and a triangle for inventory or a queue. Arrows show the direction of flow.

### Levels of map

The right level depends on the question.

| Level | Shows | Use it to |
|---|---|---|
| SIPOC (Day 5) | 5–7 steps, suppliers, inputs, outputs, customers | Agree scope and boundaries in Define |
| High-level map | 10–20 steps, main decisions | Explain the process to the Champion; find which stage to zoom into |
| Detailed map | Every step, decision, rework loop, handoff, wait | Find waste and candidate x's; write the data collection plan; train people |
| **Swimlane map** | Detailed map with a horizontal band (lane) per department, role or system, so every handoff is a line crossing lanes | Show who does what and where the handoffs and delays between functions are |

A swimlane map (also called a cross-functional map or deployment map) is the exam's answer whenever the question mentions handoffs, departments, or "who is responsible for each step".

### Map what happens, not what should happen

The map that matters is the **as-is process**: what actually happens today, including the workarounds. The written procedure is usually the should-be process, and the gap between the two is often the whole problem. To capture the as-is version:

- Walk the process at gemba (Day 2) with the people who do it. Do not draw it in a meeting room from memory.
- Follow one item all the way through and ask "what happens next?" at each step, including "where does it wait?" and "what happens when it fails?"
- Record rework loops and exceptions; they are where the defects and time go.
- Record for each step the time it takes, who does it, and how many items are queued in front of it.

A **spaghetti diagram** is a companion tool: a floor plan with a line traced for every movement of a person or item. A tangle of lines is the motion and transport waste from Day 2 made visible.

### Value stream maps

A **value stream map** (VSM) is a Lean map of the whole value stream from customer order to delivery, drawn with time in mind. Where a process map shows what happens, a value stream map shows how long it takes and where the material and the information flow. Its standard elements:

- **Process boxes** for each step, each with a data box underneath: **process time** (the hands-on time to do the step for one item: the step's cycle time in Day 3's sense, also called touch time), **changeover time** (time to switch the step from one product to another), number of operators, batch size, and the percentage of items done right first time.
- **Inventory triangles** between the steps, with the number of items waiting, converted to time by dividing by the customer's demand rate.
- **Information flow** at the top: how orders and schedules reach each step (a zigzag arrow for electronic information, a straight arrow for paper), and whether steps are pushed or pulled.
- The **customer** at the top right, with the demand rate, and the **supplier** at the top left.
- A **timeline** along the bottom that alternates between the waiting time (from the inventory triangles) and the process time at each step, and totals both.

The **current state map** is the as-is value stream. The **future state map** is the redesigned value stream, drawn in Improve, with the waste removed.

### The numbers on the timeline

The timeline produces the metrics the exam asks about.

**Lead time** (Day 3): the total time from start to finish of the value stream, waiting plus processing. It is the sum of the timeline.

**Process time**: the sum of the hands-on step times, value-added or not. **Value-added time** is the sum of only the value-added steps. Process cycle efficiency uses value-added time; when a question gives only a process time, use that as the value-added figure. Day 5's 2.3-day "order receipt to invoice issue" figure is a lead time by these definitions, and this lesson treats it as one.

**Process cycle efficiency** (PCE): value-added time divided by lead time, as a percentage. It is the single number that shows how much of the customer's wait is actual work. Typical unimproved processes run at 1% to 10%; world class is around 25% for complex processes. A PCE of 0.8% means the item is being worked on for less than one minute in every hundred it spends in the process.

**Takt time**: the rate at which the customer needs units, expressed as the time available per unit: available working time divided by customer demand in that time. If the office works 450 minutes a day and customers order 90 items a day, takt time is 5 minutes: to keep up, the process must finish one item every 5 minutes on average. Takt is set by the customer, not by the process. Comparing each step's time per unit (per person or machine working on it) with takt shows which step limits the flow. The **bottleneck** is the step with the least capacity, the one that limits the **throughput** (the number of units completed per period) of the whole stream. If its time per unit is above takt it cannot keep pace with demand at all, and the process falls behind or runs on overtime.

**Little's law** links the queue to the wait: lead time = work in process ÷ throughput. If there are 120 orders in the system and 30 are completed a day, an order will take on average 4 days to get through, whatever the process time is. It gives a fast estimate of lead time from a count and a rate, and it says that cutting work in process cuts lead time directly.

### Classifying steps

For each step on the map, apply the value-added test from Day 2 and mark it:

- **Value-added** (VA): the customer would pay, it transforms, done right first time.
- **Business non-value-added** (BNVA): required by law, regulation, finance or risk, but the customer would not pay for it. Minimise.
- **Non-value-added** (NVA): waste. Eliminate.

Then tally the time in each class. The classification is where Lean projects find their targets, and it is the routine exam question on this topic: a step is described and you say which class it belongs to. Inspection, approval, moving, waiting, storing and re-entering are non-value-added; a legally required check is business non-value-added; a step that changes the item towards what the customer ordered is value-added.

### Using the map in Measure

The finished map feeds the rest of the project. Each decision diamond and rework loop is a place where defects are created or found: a candidate x. Each inventory triangle is a place where waiting happens: a target for the Lean tools. Each handoff between lanes is where information gets lost. The data collection plan (Day 6) is checked against the map to make sure data are being captured at the steps that matter, and the map itself is a baseline: the future state map in Improve is compared against it.

## Worked Example

The invoice team maps the current state of order-to-invoice. Customer demand: 135 orders per working day (3 000 a month over 22 days); the office works 7.5 hours (450 minutes) a day.

1. **Walk the process and record each step.**

   | Step | Who (lane) | People | Process time per order (min) | Items waiting before step | Class |
   |---|---|---|---|---|---|
   | Receive order by email, print it | Sales admin | 1 | 3 | 40 | NVA (printing), receipt is BNVA |
   | Enter order lines into system | Order entry clerks | 3 | 12 | 25 | VA |
   | Check purchase order number; if missing, email customer and wait | Order entry clerks | 3 | 4 (loop timed separately) | 0 | NVA (rework loop) |
   | Apply pricing | Pricing team | 2 | 6 | 30 | VA |
   | Approve (orders over $5 000, about 20% of orders) | Sales manager | 1 | 5 (average 1 per order) | 15 | BNVA (finance policy) |
   | Issue invoice | Finance | 5 | 15 | 10 | VA |

2. **Convert queues to time.** With 135 orders a day leaving the process, 40 orders waiting = 40 ÷ 135 = 0.30 days; 25 waiting = 0.19 days; 30 = 0.22 days; 15 = 0.11 days; 10 = 0.07 days. Total waiting = 120 orders ÷ 135 per day = 0.89 days, or 400 minutes. Little's law gives the same answer directly: 120 orders in process ÷ 135 a day = 0.89 days.

3. **Process time.** The approval step only applies to a fifth of orders, so the timeline uses its average of 1 minute per order. 3 + 12 + 4 + 6 + 1 + 15 = 41 minutes per order. Value-added time (entry, pricing, issue): 12 + 6 + 15 = 33 minutes.

4. **Lead time.** Waiting 400 minutes + process 41 minutes = 441 minutes, about one working day, for an order that does not loop back. The team's data from Day 5 said 2.3 days on average, because the purchase-order rework loop adds about four days to the 30% of orders that arrive without a purchase order number (0.7 × 1 day + 0.3 × 5 days is about 2.2 days). The loop is drawn on the map with its own timing.

5. **Process cycle efficiency.** 33 ÷ 441 = 0.075, or 7.5%. Using total process time instead: 41 ÷ 441 = 9.3%. Either way, more than 90% of the customer's wait is queue, and the looping orders are far worse.

6. **Takt time.** 450 ÷ 135 = 3.33 minutes per order. Compare each step's time per unit per person: receive 3.0 (one person), order entry 12 ÷ 3 clerks = 4.0, pricing 6 ÷ 2 = 3.0, approval 1.0 on average, issue 15 ÷ 5 = 3.0. Order entry at 4.0 minutes is above takt: each clerk can enter 450 ÷ 12 = 37.5 orders a day, so three clerks manage about 112 against 135 demanded. It is the bottleneck. The clerks currently keep up only by working about 90 minutes of overtime each per day, which is the overtime the Day 5 consequential metric tracks, and the queue of 25 in front of them is the second largest on the map.

7. **What the map says.** Seven orders in ten flow through in about a day; the other three loop back for a purchase order number and take about five days. The loop is the first candidate x for the error-rate project and the first target for the lead-time consequential metric. Order entry is the bottleneck and is being propped up with overtime; removing the purchase order check loop (4 minutes of the 12 + 4 at that step) would bring it under takt without hiring. Printing and re-keying are non-value-added steps to remove.

## Formula Card

- `Lead time = sum of waiting time + sum of process time` (the VSM timeline).
- `Waiting time for a queue = items waiting ÷ demand rate` (in the rate's time unit).
- `Process cycle efficiency (%) = value-added time ÷ lead time × 100`.
- `Takt time = available working time ÷ customer demand` (e.g. minutes per unit).
- `Little's law: lead time = work in process (WIP) ÷ throughput` (throughput = units completed per period).
- The bottleneck is the step with the least capacity (longest time per unit per person or machine). If that time exceeds takt, demand cannot be met without overtime or more resources.

## Exam Traps

- Takt time is available time ÷ demand, set by the customer. It is not the process's cycle time, and inverting the fraction (demand ÷ time) is the standard distractor.
- Process cycle efficiency divides value-added time by lead time, not by process time. Both numerator and denominator must be in the same units.
- Lead time includes waiting; process (cycle) time does not. A question giving both is usually testing which one the customer feels.
- Little's law: lead time = work in process (WIP) ÷ throughput. Cutting work in process reduces lead time even if no step gets faster.
- Swimlane maps show handoffs between departments or roles. If the question mentions "who" or "handoff", the answer is swimlane.
- Map the as-is process at gemba with the people who do it, not the documented procedure from a meeting room.
- Value stream maps show time and both material and information flow; process maps show steps and decisions. A question about information flow or inventory between steps wants the value stream map.
- Inspection, moving, storing and re-entering data are non-value-added even when everyone agrees they are needed today. Approvals and checks required by law, regulation or a finance policy are business non-value-added; checks that exist only because the process makes errors are waste.
- The current state map is drawn in Measure; the future state map belongs to Improve.

## Check Questions

- M-2.1-006
- M-2.1-007
- M-2.1-009
- M-2.1-011
- M-2.1-013

## Applied Task

Draw the as-is swimlane map of your own project's process, walked with at least one person who does the work, with a lane per role or system and every decision, rework loop and queue shown. For each step record the process time, who does it and how many items were waiting when you looked (use your organisation's system queue counts or timestamps if you cannot observe live). Classify each step VA, BNVA or NVA. Then build the timeline: convert each queue to time with your historical demand rate, total the waiting and process time, and calculate lead time, process cycle efficiency and takt time from your organisation's demand and available hours. Name the bottleneck step and the rework loop most likely to be an x for your primary metric. Paste the map, the table and the four numbers to your coach.

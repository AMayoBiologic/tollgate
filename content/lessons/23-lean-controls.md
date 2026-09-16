---
day: 23
week: 5
phase: Control
title: "Lean Controls: 5S, Kanban and Poka-Yoke"
minutes: 50
bok_sections: ["5.1"]
objectives:
  - Explain what the Control phase is for and why improvements decay without controls
  - Describe how 5S is sustained with standards, visual controls and audits, and read a 5S audit score
  - Explain how a kanban system pulls work, what a kanban signal is, and how the number of kanbans is set
  - Distinguish prevention from detection in poka-yoke and recognise the common mistake-proofing devices
  - Choose the right Lean control for a described risk
glossary_terms: ["Lean controls", "5S audit", "standard work", "visual control", "kanban", "kanban card", "supermarket", "kanban sizing", "two-bin system", "poka-yoke", "mistake-proofing", "prevention device", "detection device", "andon", "error", "sustain"]
---

## The Idea

### Why Control exists

An improvement that is not controlled decays. People revert to old habits, new staff are never told, the temporary fix is left in place, the spreadsheet stops being updated. It is common for half the gains to be gone within a year when the Control phase is skipped. The Control phase makes the new process the normal process: it standardises the change, builds ways of seeing at once when it slips, and hands ownership to the process owner (Day 1) with a plan for what to do when things go wrong.

The IASSC syllabus splits controls into two families. **Lean controls** (today) make the right way the easy way and make deviation visible: 5S with audits, kanban, and poka-yoke. Statistical controls (Day 24) watch the numbers. The control plan (Day 25) records both.

### Keeping 5S alive

Day 2 introduced 5S. Most 5S efforts fail at the fifth S, **sustain** (self-discipline): the area is sorted and labelled in a burst of enthusiasm and slides back within weeks. The controls that stop the slide are:

- **Standard work**: a written, agreed description of the best current way to do a task, including the layout, the sequence, the time each step should take, and the checks. It is the reference against which drift is judged, it is what new staff are trained on, and it is updated when a better way is found, not ignored. For 5S, the written arrangement of the workstation is its standard work, and a photograph of that correct state posted at the station is the visual control that shows it.
- **Visual controls**: arrangements that show the correct state without a document. Shadow boards, floor markings, colour-coded labels, marked minimum and maximum levels on a shelf, a red tag area. The test of a visual control is whether a visitor can tell within seconds whether the area is normal or abnormal.
- The **5S audit**: a short checklist, scored at a fixed interval (weekly is common) by someone outside the immediate team, with one line per S and a score per line. Scores are posted on a board in the area and trended. Audits find slippage early and, because the results are visible, create the peer pressure that keeps standards up. A typical audit scores each S from 0 to 4 and totals to 20; areas below an agreed threshold get a corrective action.

The exam's question is usually which element does what: standard work defines the method; visual controls show the state; audits check and sustain it. A description of "weekly scored checklist posted on the board" is the 5S audit; "photographs of how the bench should look, posted at the bench" is a visual control; "the written layout and sequence for the bench" is standard work.

### Kanban

**Kanban** is Japanese for signboard or card. A kanban system is the practical form of pull (Day 2): work or material is only produced or moved when a downstream user signals that it is needed, and the signal is the **kanban card** (or an empty bin, an empty marked square, an electronic message). Nothing is made without a card, so nothing is made that is not needed, and inventory is capped by the number of cards in circulation.

The parts of a kanban system:

- A **supermarket**: a controlled stock point holding a small, fixed quantity of each item, from which the downstream process takes what it needs. Taking an item releases its card, which travels upstream as the signal to replenish.
- The **kanban card** itself, carrying the item, the quantity per container, the supplying process and the customer process.
- A rule that only the number of containers equal to the number of cards may exist. Cards are the inventory ceiling.

The **two-bin system** is the simplest kanban: two bins of an item at the point of use; when the first is empty it goes back for refilling and work continues from the second. The empty bin is the signal. Office versions: a folder of blank forms with a reorder card halfway down; a stationery cupboard with a marked reorder line.

**Kanban sizing** is the exam's arithmetic question. The number of kanbans needed to keep the downstream process supplied during the time it takes to replenish, plus a safety margin, is:

`Number of kanbans = (average demand during lead time × (1 + safety factor)) ÷ container quantity`

In plain terms: how many units will be used while a refill is on its way, add some safety, and divide by how many fit in one container. If a workstation uses 100 brackets an hour, replenishment takes 2 hours, containers hold 50 and the safety factor is 10%, then (100 × 2 × 1.1) ÷ 50 = 4.4, rounded up to 5 kanbans. Reducing the lead time or the container size lets the number of cards, and so the inventory, fall.

Kanban as a control: it stops overproduction and caps inventory automatically, and a stock-out or a pile of full containers is immediately visible. The exam treats kanban as the Lean control for inventory and flow.

### Poka-yoke

**Poka-yoke** is Japanese for mistake-proofing; the term is Shigeo Shingo's. A **mistake-proofing** device makes it impossible, or immediately obvious, to do a step wrong. The idea rests on a distinction: an **error** is a human action (picking the wrong part, skipping a step, misreading a value), and a defect is the result the customer sees. Errors are inevitable; defects are not, if the error is prevented or caught before the item moves on. Poka-yoke addresses the error, not the person.

Two levels:

- **Prevention devices** make the error impossible. A connector that only fits one way. A fixture that will not accept a part in the wrong orientation. A form field that will not accept letters in a phone number. A machine that will not start until the guard is closed. An order-entry screen that will not save without a purchase order number.
- **Detection devices** catch the error the moment it occurs, before the defect goes further. A sensor that stops the line if a part is missing. A checklist that must be ticked before the next step. A scale that flags a pack that is under weight. A spell-checker underlining a word. Detection is second best, but far better than an inspection at the end of the line, because it stops one defect rather than finding a batch.

Devices are also grouped by how they act: contact (a physical shape or sensor detects a feature), fixed value (a count must be reached, such as five bolts from a tray of five), and motion step (steps must be done in order). And by response: a **warning** (light, buzzer) that a person must act on, or a **control** (shutdown, lockout) that acts by itself. Control responses are stronger than warnings.

**Andon** is a related visual control: a signal light or board that shows the status of each station and lets any worker call for help or stop the line when a problem appears (jidoka, Day 2). It turns detection into a team response.

Poka-yoke is the Lean control for defects. In an FMEA (Day 13) a prevention device lowers the occurrence score; a detection device lowers the detection score. The Control phase installs the devices that Improve piloted and records them in the control plan.

### Choosing the control

| Risk to the improvement | Lean control |
|---|---|
| The workplace slides back into disorder, tools go missing, time is lost searching | 5S standards, visual controls and audits |
| Work piles up between steps, overproduction returns, inventory grows | Kanban (pull) |
| The same human error keeps producing the same defect | Poka-yoke, prevention first, then detection |
| A problem occurs and nobody notices until much later | Andon and detection devices |

The exam also asks about the order of preference. For a defect: eliminate the possibility of the error (prevention), then detect it at source, then detect it downstream, then inspect at the end; the further down the list, the weaker the control.

## Worked Example

The invoice project has reached Control. Its Improve pilot confirmed three changes: a mandatory purchase order field on the order-entry screen, a web order form with a purchase order field, and a standard sequence for entering line items. The team designs the Lean controls.

1. **Poka-yoke for the purchase order number.** Prevention: the order cannot be saved without a valid purchase order number, and the field is validated against the customer's format. The FMEA line from Day 13 falls from RPN 288 to 48 because occurrence drops from 6 to 1. A detection device backs it up: the invoice cannot be issued if the purchase order field is blank, which catches orders imported from older systems.
2. **Poka-yoke for line items.** Detection: the entry screen totals the line items and shows the total against the customer's order total in red if they differ, before the clerk can proceed. Prevention was considered (import the lines from the web order) and is scheduled as the next project.
3. **5S for the order-entry area.** The clerks' desks had lost the price-list reference cards and the customer master lookup instructions under paper. Standard work: a one-page sequence card for order entry, laminated at each desk. Visual control: a labelled tray for orders awaiting a purchase order number, with a red line at ten orders, so a growing loop is visible. Audit: a five-line checklist scored weekly by the sales admin lead (from outside the order-entry team) and posted on the team board. First four weeks: 18, 19, 17, 20 out of 20.
4. **A kanban-style cap on the rework loop.** The "awaiting purchase order" tray uses the kanban mechanism in reverse: a marked level is the signal, but instead of triggering replenishment it caps work in process. When the tray reaches the red line, the sales team is signalled to chase customers before any new web orders are released, so the loop can never hold more than ten orders instead of growing unnoticed as it did before the Day 9 map. Lean calls this a work-in-process limit; it uses the same visible signal as a kanban.
5. **Andon.** A status board shows each clerk's orders entered against the daily target of 45 (achievable now that the purchase-order chase has left the entry step); a red marker means a clerk is behind or blocked, and the order entry lead, the senior clerk who owns the entry step day to day, responds within the hour instead of at the end of the day.
6. **Sizing a kanban** for the printed invoice stationery the finance team uses: 135 invoices a day, replenishment from the store takes 2 days, boxes hold 100 sheets, safety factor 20%. Kanbans = (135 × 2 × 1.2) ÷ 100 = 3.24, so 4 boxes in circulation with a card on each. Before this, the team kept 15 boxes "to be safe."

Each control is written into the control plan on Day 25 with an owner, a check frequency and a response.

## Formula Card

- `Number of kanbans = (demand per period × replenishment lead time in periods × (1 + safety factor)) ÷ container quantity`, rounded up.
- Poka-yoke hierarchy: prevention (error impossible) > detection at source (error caught immediately) > detection downstream > final inspection.
- 5S sustain = standard work (the method) + visual controls (the state) + audits (the check), at a fixed frequency with posted scores.

## Exam Traps

- Kanban is a pull signal that caps inventory; it is not a schedule, a forecast or a push system. The signal comes from the downstream user.
- The number of kanbans depends on demand during the replenishment lead time, the container size and the safety factor; cutting lead time reduces cards and inventory.
- Poka-yoke addresses errors (human actions) so that defects do not result. Prevention (makes the error impossible) is stronger than detection (catches it at once); both are stronger than inspection.
- A prevention device lowers occurrence in the FMEA; a detection device lowers detection. Neither changes severity.
- Sustain (self-discipline) is the 5S step that needs audits and management attention; standardise is writing the arrangement down. Questions describe an audit and offer "standardise".
- Standard work is the documented best current method and is meant to be updated, not frozen.
- A visual control shows normal versus abnormal at a glance without reading a document.
- Andon is the signal for help or stop; jidoka is the principle of stopping at the defect.
- Poka-yoke is Shingo's; the fishbone is Ishikawa's; the Toyota Production System is Ohno's.
- Lean controls belong in the control plan with an owner, a frequency and a response, like statistical controls.

## Check Questions

- C-5.1-001
- C-5.1-003
- C-5.1-006
- C-5.1-009
- C-5.1-011

## Applied Task

For your own improvement project, design the Lean controls for the solution you would implement: (1) one poka-yoke for the main defect, stating whether it prevents or detects, how it acts (contact, fixed value or motion step) and what response it gives, with the FMEA line it changes and the revised occurrence or detection score; (2) the standard work document for the changed step (a one-page sequence with times) and one visual control; (3) a five-line 5S audit checklist for the area with a scoring rule, frequency and auditor, and, using your organisation's records of the last month, an honest first score; (4) a kanban for one item or queue in the process, sized from your historical demand and replenishment time with the arithmetic shown. Paste the four controls to your coach.

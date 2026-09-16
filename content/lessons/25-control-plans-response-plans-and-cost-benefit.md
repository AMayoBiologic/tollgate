---
day: 25
week: 5
phase: Control
title: Control Plans, Response Plans and Cost-Benefit
minutes: 50
bok_sections: ["5.3"]
objectives:
  - Describe how solutions are selected and piloted in Improve, and how the FMEA is revisited on the new process
  - Carry out a cost-benefit analysis of a solution: costs, hard and soft benefits, payback, ROI and net present value in plain terms
  - List the elements of a control plan and complete one for a process
  - List the elements of a response plan and write one for a control-chart signal
  - Describe the handover to the process owner and how benefits are tracked after closure
glossary_terms: ["solution selection", "selection matrix", "pilot", "control plan", "control plan elements", "reaction plan", "response plan", "out-of-control action plan", "handover", "project closure", "cost-benefit analysis", "sensitivity", "tollgate review (Control)", "lessons learned", "benefits tracking"]
---

## The Idea

### From confirmed causes to a controlled process

By the end of Analyse the project has confirmed, with data, which x's drive the Y. Improve turns that into a change, and Control makes the change permanent. This lesson covers choosing and testing the solution, checking it pays, and writing the documents that keep it working after the team has gone. The IASSC syllabus lists cost-benefit analysis and the elements of the control plan and response plan; solution selection and piloting are included here because the control plan cannot be written without them, and exam questions on this section concern the three listed topics.

### Choosing and piloting the solution

**Solution selection** starts by generating several options for each confirmed x, not one: brainstorming, benchmarking (looking at how other organisations do the same step), and asking the people who do the work. Options are then scored on a **selection matrix** (also called a solution selection matrix): criteria across the top with weights (effect on the Y, cost, time to implement, risk, ease of sustaining), options down the side, scores in the cells, weighted totals at the right. The matrix is the X-Y matrix of Day 13 turned towards solutions, and like it, it structures judgement rather than replacing it. The Champion signs off the chosen option.

A **pilot** is a limited trial of the chosen solution: one line, one shift, one site, one week, before full rollout. It tests whether Y moves as predicted, what breaks, and what the real cost is, and it produces the before-and-after data that a hypothesis test (Days 16 to 19) can confirm. A pilot that fails is a success of the method: it fails small.

Before rollout, the **FMEA is revisited** on the new process (Day 13): the changed steps get new failure modes, the recommended actions are closed out with their revised occurrence and detection scores, and any high-severity lines that remain get a control in the plan. New processes fail in new ways, and the second FMEA is where those are caught.

### Cost-benefit analysis

The Improve tollgate asks whether the solution is worth implementing. **Cost-benefit analysis** answers it with the tools of Day 5, now with real numbers from the pilot instead of estimates from the charter.

Costs: one-off implementation costs (equipment, software changes, training, the team's time) and any new recurring costs (maintenance, licences, an extra check). Benefits: hard savings measured in the pilot and scaled to full rollout, soft benefits listed separately, cost avoidance labelled as such.

The four measures:

- **Annual net saving** = annual hard benefit − annual recurring cost.
- **Payback period** = one-off cost ÷ monthly net saving.
- **Return on investment** = (annual net saving − one-off cost) ÷ one-off cost × 100, as on Day 5.
- **Net present value** = the sum of each year's net cash flow discounted at the organisation's rate, minus the up-front cost. Positive is good; finance calculates it.

A **sensitivity** check asks what happens if the benefit is 20% lower or the cost 20% higher than expected. A solution that only pays under the best case is a risk, not a plan. The financial representative (Day 5) validates the figures before the tollgate, and the same figures become the baseline for **benefits tracking** after closure.

### The control plan

The **control plan** is a one-page table that tells the process owner what to watch, how, and what to do about it. It is the central Control deliverable and the document the exam asks about most. The **control plan elements**, one column each:

| Element | What it records |
|---|---|
| Process step | Which step of the map the control belongs to |
| Characteristic (x or Y) | What is being controlled: a process input, a setting, or the output measure |
| Specification or target | The required value or range (from the CTQ or the setting found in Improve) |
| Measurement method | The gauge or record used, and its last MSA |
| Sample size and frequency | How many, how often |
| Control method | The tool: control chart type, poka-yoke device, checklist, audit, standard work |
| Reaction plan | What to do when the control signals; a reference to the response plan |
| Owner | Who does the check and who responds |

Every x that the project confirmed and changed appears on the plan, as well as the Y. Controls on the x's catch drift before the Y suffers; controls on the Y confirm the result. The plan is signed by the process owner and the Champion, kept with the standard work, and reviewed when the process changes.

### The response plan

The **response plan** (also called the **reaction plan** or **out-of-control action plan**) is the detailed procedure for one signal: what happens when a control chart rule fires, a poka-yoke device triggers, or an audit fails. It answers, in order:

1. **Trigger**: which signal starts it (a point beyond the UCL, a run of nine, a red light).
2. **Immediate action**: stop, continue with containment, or continue; how suspect product or work is quarantined.
3. **Who to notify**: by name or role, with the time limit.
4. **What to check first**: the most likely causes, from the FMEA and the project's findings, in order.
5. **How to resolve and restart**: the fix, the verification that the process is back in control, the record to be made.
6. **Escalation**: what to do if the first checks find nothing, and when the process owner or Champion is called.

The plan is written so that a person who has never seen the project can follow it at two in the morning. A control chart with no response plan is decoration.

### Handover and closure

**Handover** is the formal transfer of the improved process to the process owner. Its contents: the updated process map and standard work, the control plan and response plans, the trained people (with a record of who was trained), the control charts with frozen limits, the FMEA, and the benefits tracking method agreed with finance. The process owner signs to say the process is theirs.

**Project closure** follows at the Control **tollgate review**, where the Champion confirms the deliverables, the financial representative confirms the benefit calculation, and the team records **lessons learned**: what worked, what did not, what the next project should know. The project file is archived, and the belt's part ends. Benefits are then tracked for the agreed period, usually twelve months, against the baseline, by the process owner and finance, not the belt.

The exam distinguishes the documents. The charter authorises; the control plan controls; the response plan reacts; the handover transfers; the tollgate closes. Each has an owner and a signature.

## Worked Example

The invoice project is at the Control tollgate.

1. **Solution selection recap.** For the purchase-order x, three options were scored: a mandatory screen field (cheap, fast, prevention), a training programme (cheap, slow, relies on memory) and a full web-order integration (expensive, slow, best). Weighted scores 86, 54 and 71. The mandatory field was piloted for four weeks on the web order channel: web-order errors fell from 9.0% to 2.5% (2-proportion test, p < 0.001). The integration was recommended as a follow-on project.

2. **Revisited FMEA.** The mandatory field created one new failure mode: clerks entering a placeholder such as "to be confirmed" to get past the field. Severity 8, occurrence 2, detection 2 (the format check rejects it): RPN 32, accepted, with the format check written into the control plan.

3. **Cost-benefit.** One-off costs: screen change $24 000, web form $6 000, training $4 000, team time $20 000: $54 000, which is $6 000 above the Day 5 estimate because the web form was added. Recurring: nil. Hard benefit measured in the pilot and scaled: the pilot beat the 3% goal, reaching 2.7% overall, so defective invoices fall by 190 a month (not the 180 assumed on Day 5) at $57 each = $10 830 a month, $129 960 a year. Payback = 54 000 ÷ 10 830 = 5.0 months. ROI = (129 960 − 54 000) ÷ 54 000 = 141%. Net present value over three years at 10%: about $269 000 (finance's figure). Sensitivity: at 80% of the benefit, payback is 6.2 months and the ROI is 93%; still clearly worth doing.

4. **Control plan** (extract):

   | Step | Characteristic | Spec / target | Measurement | Sample / frequency | Control method | Reaction plan | Owner |
   |---|---|---|---|---|---|---|---|
   | Enter order | Purchase order number present and valid (x) | 100% | System field check | Every order | Poka-yoke: mandatory field with format check | RP-01 | Order entry lead |
   | Enter order | Line-item total matches order (x) | 100% | Screen comparison | Every order | Detection: red mismatch flag | RP-02 | Order entry lead |
   | Issue invoice | Invoices with errors (Y) | ≤ 3% | Weekly 75-invoice check, checker R.S. (attribute agreement analysis run in Measure) | 75 / week | P chart, rules 1 and 2 | RP-03 | Finance supervisor |
   | Whole process | Lead time (consequential) | ≤ 2.3 days | System timestamps | All orders / weekly | I-MR chart of weekly mean | RP-04 | Finance supervisor |
   | Order entry area | 5S standard | ≥ 17 / 20 | Audit checklist | Weekly | 5S audit, posted | RP-05 | Sales admin lead |
   | Enter order | Orders awaiting purchase order number (x) | ≤ 10 in tray | Tray count against red line | Continuous | Kanban-style work-in-process cap | RP-06 | Order entry lead |
   | Enter order | Orders entered per clerk against daily target (x) | 45 / day | Status board | Continuous | Andon board, red marker | RP-07 | Order entry lead |

5. **Response plan RP-03** (P chart signal): Trigger: a weekly point above the provisional UCL of 0.083, or nine weekly points above the centre line of 0.027. Immediate action: continue issuing invoices; pull the week's error list. Notify: finance supervisor (the process owner) same day; Champion within two days if no cause is found. Check first: (1) has the mandatory field been switched off or bypassed with placeholders; (2) was there a volume surge or new clerk; (3) was the checker's definition applied consistently (re-run the attribute agreement check if in doubt). Resolve: fix the cause, record it on the chart, confirm the following weeks are inside the limits. Escalate: if three consecutive weeks signal with no cause found, the Champion convenes a review and the project's Green Belt is consulted.

6. **Handover.** Signed by the finance supervisor as process owner on 28 November, with the map, standard work, control plan, seven response plans, training records for three clerks and the web team, the P chart with provisional limits at p̄ = 0.027 from weekly samples of 75 (to be recalculated and frozen after 25 weeks), the FMEA, and finance's benefits tracking sheet. Lessons learned: pilot on the web channel first was the right call; the line-item detection flag should have been a prevention (import) from the start.

## Formula Card

- `Annual net saving = annual hard benefit − annual recurring cost`.
- `Payback (months) = one-off cost ÷ monthly net saving`.
- `ROI (%) = (annual net saving − one-off cost) ÷ one-off cost × 100`.
- NPV: discounted net cash flows minus up-front cost; positive is good. Finance calculates.
- Sensitivity: recompute payback and ROI at benefit × 0.8 and cost × 1.2.
- Control plan columns: step, characteristic, spec/target, measurement, sample and frequency, control method, reaction plan, owner.
- Response plan order: trigger, immediate action, notify, check first, resolve and restart, escalate.

## Exam Traps

- The control plan lists what to monitor, how, how often, with what tool and who owns it; the response plan says what to do when a control signals. Questions describe one and name the other.
- Controls go on the confirmed x's as well as on the Y; controlling only the Y catches problems after the customer has them.
- The pilot comes before full rollout and produces before-and-after data for a hypothesis test; the FMEA is repeated on the new process before rollout.
- Cost-benefit at the Improve tollgate uses pilot data; benefits are validated by finance and tracked for about twelve months after closure by the process owner, not the belt.
- Payback = cost ÷ saving per period; ROI = (benefit − cost) ÷ cost; NPV positive is good. Same formulas as Day 5.
- Handover is signed by the process owner; the charter was signed by the Champion; closure happens at the Control tollgate.
- A selection matrix scores solutions against weighted criteria; the X-Y matrix scores causes against outputs. Same structure, different purpose.
- Standard work, control charts and poka-yoke devices are control methods; they appear in the control-method column, each with a reaction plan reference.
- Lessons learned are recorded at closure, not skipped.
- Control limits on the handed-over chart are frozen at the improved level, not at the old baseline.

## Check Questions

- C-5.3-001
- C-5.3-003
- C-5.3-006
- C-5.3-009
- C-5.3-011

## Applied Task

For your own project, complete the Control package on paper: (1) a selection matrix with at least three solution options for your main confirmed x, weighted criteria and totals; (2) a pilot plan naming the scope, the duration, the before-and-after measure and the test you will use; (3) a cost-benefit analysis using your organisation's actual cost figures and your historical defect rates, with annual net saving, payback, ROI and a sensitivity line at 80% benefit; (4) a control plan with at least four rows covering two x's, the Y and one consequential metric, every column filled; (5) one full response plan for the Y's control chart signal; (6) a handover checklist naming the process owner and the finance contact who will track benefits. Paste the package to your coach.

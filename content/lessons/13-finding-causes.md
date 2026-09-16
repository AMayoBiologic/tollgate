---
day: 13
week: 3
phase: Analyse
title: "Finding Causes: Fishbone, X-Y Diagram and FMEA"
minutes: 50
bok_sections: ["2.1"]
objectives:
  - Run a cause-and-effect (fishbone) session using the standard categories and produce a list of candidate x's
  - Build and score a cause-and-effect (X-Y) matrix to rank candidate x's against the customer's outputs
  - Complete a failure modes and effects analysis, calculate risk priority numbers and choose actions
  - Explain how the three tools hand a short list of x's from Measure into Analyse for testing
  - Recognise the exam's standard questions on categories, scoring and RPN arithmetic
glossary_terms: ["cause-and-effect diagram", "fishbone diagram", "6M categories", "brainstorming", "5 Whys", "root cause", "X-Y diagram", "cause-and-effect matrix", "FMEA", "failure mode", "effect", "severity", "occurrence", "detection", "risk priority number", "current controls", "recommended action", "vital few x's"]
---

## The Idea

### From "everything could be the cause" to a short list

By the end of Measure a project has a baseline, a verified gauge, a capability figure and a detailed map. It also has a wall of opinions about why the process fails. Analyse exists to replace opinion with tested evidence, but tests take time and data, so the first job is to narrow the field. Three tools do that, in order of increasing rigour: the fishbone diagram collects every candidate cause, the X-Y matrix ranks them against what matters to the customer, and FMEA ranks them by risk. What comes out is a short list of the **vital few x's** worth testing with the statistics of Weeks 3 and 4.

None of the three proves anything. They organise judgement. The proof comes later, and the exam distinguishes clearly between tools that generate and rank possible causes (these three) and tools that confirm them (the statistical comparison tests of Days 14 to 19 and the regression of Day 21).

### The cause-and-effect (fishbone) diagram

The **cause-and-effect diagram** was introduced by Kaoru Ishikawa in 1943 and popularised in the 1960s, so it is also the Ishikawa diagram, and because of its shape it is usually called the **fishbone diagram**. The effect (the problem, stated as the Y from the charter) sits in the box at the fish's head. The spine runs to it, and the main bones are categories of cause. Under each category the team lists causes; under each cause, sub-causes, as far as the questioning goes.

The standard categories for a manufacturing or physical process are the **6M categories**:

| Category | What it covers |
|---|---|
| Man (People) | Skill, training, fatigue, staffing, communication |
| Machine | Equipment, tools, software, capacity, maintenance |
| Material | Raw materials, components, information inputs, supplier quality |
| Method | Procedures, work instructions, sequence, standards |
| Measurement | Gauges, inspection, data collection, definitions |
| Mother Nature (Environment) | Temperature, humidity, lighting, noise, layout, time of day |

Service and office processes often use the 4P set instead: Policies, Procedures, People, Plant (or Place). The categories are prompts, not rules; the exam asks which category a described cause belongs to, and the answer is whichever the description fits.

The diagram is built by **brainstorming**: a structured session where a team lists ideas without judging them, everyone contributes, and quantity is sought before quality. Rules that make it work: define the effect precisely first, use the map and the data to prompt, write every idea down, and do not argue about whether a cause is real. Each cause is then pushed deeper with the **5 Whys**: ask "why does that happen?" repeatedly, typically about five times, until the answer is something the team can act on. "Invoice has wrong price" → why? "Price list out of date" → why? "Updates emailed, not loaded" → why? "No owner for loading" → that is a **root cause**: a cause which, if removed, stops the effect recurring, rather than a symptom that will return.

The fishbone's weakness is that it produces dozens of causes with no ranking. Its strength is that it is fast, involves the whole team, and rarely misses a category.

### The X-Y diagram (cause-and-effect matrix)

The **X-Y diagram**, more often called the **cause-and-effect matrix** (or C&E matrix), turns the fishbone's list into a ranked list by scoring each candidate x against the outputs the customer cares about.

Build it as a table:

1. Across the top, list the outputs (Y's): the CTQs from Day 4 and any consequential metrics. Give each a weight for importance to the customer, usually 1 to 10.
2. Down the side, list the candidate x's from the fishbone and the process map inputs.
3. In each cell, score how strongly the x affects that Y, on a scale such as 0 (none), 1 (weak), 3 (moderate), 9 (strong). The 0-1-3-9 scale is deliberate: it spreads strong relationships away from weak ones.
4. For each x, multiply each cell score by its column's weight and add across the row. That total is the x's priority score.
5. Sort by total. The top x's go forward.

A Pareto chart of the totals (Day 3) shows how steeply the scores fall away. The matrix is judgement expressed as numbers, so the team should treat the ranking as a starting point for data collection, not a conclusion. Its typical use is to reduce 40 fishbone causes to 8 or 10 for FMEA or for testing.

### Failure modes and effects analysis

**FMEA** (failure modes and effects analysis) is a systematic way of asking, for every step or input, "how could this go wrong, how bad would that be, how often does it happen, and would we catch it?" It came from the United States military in the late 1940s and the aerospace industry after that and is now standard in automotive and healthcare quality. In a Green Belt project it is used in Measure or Analyse to prioritise the x's by risk, and again in Improve to check the new process for new ways of failing.

The columns of an FMEA worksheet, in order:

1. **Process step or input** (from the map or the SIPOC).
2. **Failure mode**: the specific way the step could go wrong. "Wrong price applied." "Purchase order number missing." One step can have several.
3. **Effect**: what the customer or the next step experiences when that failure occurs. "Invoice rejected; payment delayed."
4. **Severity** (S): how serious the effect is, scored 1 (negligible) to 10 (hazardous, safety or legal consequence without warning). Severity belongs to the effect and does not change unless the design changes.
5. **Potential cause**: why the failure mode occurs (this is where the fishbone's causes land).
6. **Occurrence** (O): how often the cause produces the failure, 1 (remote) to 10 (almost certain). Based on data where it exists: DPMO or a defect rate from Measure maps onto the scale.
7. **Current controls**: what already exists to prevent the cause or detect the failure before it reaches the customer.
8. **Detection** (D): how likely the current controls are to catch the failure before it reaches the customer, scored 1 (almost certain to detect) to 10 (no detection possible). Note the direction: a *high* detection score is *bad*.
9. **Risk priority number** (RPN): S × O × D. Ranges from 1 to 1 000.
10. **Recommended action**, owner, date, and after the action, the revised S, O, D and RPN.

Rank by RPN and work on the highest. Two refinements the exam expects: first, a high severity deserves action even when the RPN is modest, because a rare, undetected catastrophe is not acceptable; many organisations set a rule such as "any severity of 9 or 10 gets an action regardless of RPN". Second, actions reduce risk by lowering occurrence (prevent the cause) or improving detection (catch it earlier); severity can only be reduced by changing the design so the effect itself is milder. Adding inspection lowers D; mistake-proofing (poka-yoke, Day 23) lowers O; both are legitimate, but prevention is cheaper in the long run (Day 3's cost categories).

An FMEA is a living document: it is revised when actions are completed and again when the process changes, and it feeds the control plan on Day 25.

### The handover into Analyse

The three tools together produce a list something like "ten candidate x's, ranked, with the top three carrying most of the risk score". Analyse then does the work that matters: collect data on each candidate x alongside the Y, and test with the tools of Days 14 to 22 whether the x really moves the Y. Exam questions on this sequence ask what a fishbone proves (nothing; it lists possibilities), what the X-Y matrix produces (a prioritised list based on team judgement), what FMEA produces (a risk ranking with actions), and what is needed before an x is declared a root cause (data and a test).

## Worked Example

The invoice project has a baseline of 9.0% defective invoices, a Pareto showing purchase order (PO) number and line-item errors as the vital few, and the Day 9 map with its PO rework loop.

1. **Fishbone.** Effect: "Invoice contains an error". Team of five brainstorms for 30 minutes.
   - People: new clerks not trained on PO check; clerks interrupted by phone calls during entry.
   - Machine: order entry screen allows blank PO field; price list loaded manually.
   - Material: web orders arrive without PO field; customers give PO verbally.
   - Method: no standard for checking the order before entry; pricing updates emailed, not loaded.
   - Measurement: "error" defined differently by checker and by customer's accounts team.
   - Environment: month-end volume spike; open-plan noise.
   Eleven causes. 5 Whys on "price list loaded manually" reaches "no owner for loading price updates".

2. **X-Y matrix.** Outputs: invoice error rate (weight 10), invoice lead time (weight 6), staff overtime (weight 3).

   | Candidate x | Error rate (10) | Lead time (6) | Overtime (3) | Total |
   |---|---|---|---|---|
   | Blank PO field allowed on screen | 9 | 9 | 3 | 90 + 54 + 9 = 153 |
   | Web orders arrive without PO | 9 | 9 | 1 | 90 + 54 + 3 = 147 |
   | No owner for price updates | 9 | 1 | 1 | 90 + 6 + 3 = 99 |
   | Clerks untrained on PO check | 3 | 3 | 1 | 30 + 18 + 3 = 51 |
   | Month-end volume spike | 3 | 3 | 9 | 30 + 18 + 27 = 75 |
   | Open-plan noise | 1 | 1 | 1 | 10 + 6 + 3 = 19 |

   The two PO-related x's and the price-update ownership lead. Noise drops off the list.

3. **FMEA on the top rows.**

   | Step | Failure mode | Effect | S | Cause | O | Current controls | D | RPN |
   |---|---|---|---|---|---|---|---|---|
   | Enter order | PO number missing | Invoice rejected by customer; payment delayed 21 days | 8 | Screen allows blank field | 6 | Monthly sample check | 6 | 288 |
   | Apply pricing | Wrong price | Credit note; customer distrust | 7 | Price list out of date | 3 | Checker compares to list | 4 | 84 |
   | Enter order | Wrong quantity | Under- or over-delivery, then a disputed invoice | 9 | Phone order misheard | 2 | None | 9 | 162 |

   RPN ranks the blank PO field first (288). The wrong-quantity mode has a lower RPN but severity 9 and no detection, so under the severity rule it gets an action as well.

4. **Actions.** Blank PO: make the field mandatory on the screen (occurrence 6 → 1; revised RPN 8 × 1 × 6 = 48) and add a web-order PO field. Wrong quantity: read-back confirmation on phone orders (occurrence 2 → 1) and an automated order acknowledgement to the customer (detection 9 → 3; revised RPN 9 × 1 × 3 = 27).

5. **Handover.** Analyse will test with data whether orders lacking a PO number really do produce invoice errors at a higher rate (a proportion test, Day 18) and whether month-end volume raises the error rate (Day 18 again), before the screen change is built.

## Formula Card

- `X-Y matrix row total = Σ (cell score × output weight)` — cell scores 0, 1, 3, 9; weights 1 to 10.
- `RPN = Severity × Occurrence × Detection` — each 1 to 10; range 1 to 1 000.
- Detection scale runs backwards: 1 = almost certain to detect, 10 = cannot detect.
- Severity is reduced only by design change; occurrence by prevention; detection by better controls.

## Exam Traps

- The fishbone lists possible causes; it proves none. A question asking which tool confirms a root cause wants a statistical test (Days 14 to 21), not the fishbone.
- 6M: Man, Machine, Material, Method, Measurement, Mother Nature (Environment). A gauge problem is Measurement, not Machine. A missing procedure is Method, not Man.
- 5 Whys stops at an actionable root cause, not at "operator error" and not at "the universe".
- X-Y matrix: outputs across the top with weights; inputs down the side; scores 0-1-3-9; multiply and add across the row. The output weights come from the customer and the business case, not from the team's preferences.
- RPN = S × O × D, a product not a sum. Maximum 1 000.
- Detection: a high score means poor detection. Adding an inspection lowers D. Questions reverse this.
- Severity does not change when you add inspection or reduce frequency. Only a design change alters it.
- A high-severity item with a low RPN still needs action. "Lowest RPN is safe" is the trap.
- FMEA is done on the current process in Measure/Analyse and repeated on the proposed process in Improve; it feeds the control plan.
- The X-Y matrix and FMEA are prioritisation tools based on team scoring; the vital few x's still have to be verified with data.

## Check Questions

- M-2.1-016
- M-2.1-018
- M-2.1-020
- M-2.1-022
- M-2.1-025

## Applied Task

Run a fishbone session on your own project's Y with at least two people who work in the process, using your Day 9 map and Pareto as prompts, and push the three most-mentioned causes through 5 Whys using your organisation's records to answer each why where possible (when did it start, how often, which cases). Build an X-Y matrix with your primary metric and two consequential metrics as the weighted outputs and at least eight candidate x's, and rank them. Take the top four into an FMEA with severity, occurrence (based on your historical defect rates), current controls, detection and RPN, and propose one action each with the revised RPN. Finish with a list of the three x's you will test in Analyse and, for each, what data you already hold. Paste the fishbone list, the matrix, the FMEA table and the list to your coach.

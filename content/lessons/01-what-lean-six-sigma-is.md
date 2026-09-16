---
day: 1
week: 1
phase: Define
title: What Lean Six Sigma Is
minutes: 50
bok_sections: ["1.1"]
objectives:
  - Say in one sentence what Lean Six Sigma is for and where it came from
  - Explain the idea Y = f(x) and use it to separate a result from its causes
  - Name the five DMAIC phases in order and say what each one produces
  - Describe the belt roles and who does what on a project
  - Tell the difference between the voice of the customer, the business and the employee
glossary_terms: ["Lean Six Sigma", "process", "defect", "variation", "Six Sigma", "Lean", "DMAIC", "Y = f(x)", "Green Belt", "Black Belt", "Master Black Belt", "Champion", "Yellow Belt", "voice of the customer", "voice of the business", "voice of the employee", "continuous improvement", "sigma", "standard deviation", "deliverable"]
---

## The Idea

### A method for fixing work that keeps going wrong

Every organisation has work that keeps producing the wrong result. Paperwork that comes back incomplete. Deliveries that are late one week and early the next. Reports that need three rounds of correction. Most people respond by trying harder, adding a checklist, or blaming whoever touched it last. The result rarely changes for long.

**Lean Six Sigma** is a structured way of fixing that kind of problem. It treats the work as a **process**: a repeatable sequence of steps that turns inputs (information, materials, requests) into an output that somebody uses. If the output is wrong too often, the method says the cause is somewhere in the steps or the inputs, and it gives you tools to find that cause with evidence rather than opinion, fix it, and keep it fixed.

Two words in the name point to its two halves.

**Lean** is about speed and waste. It comes from the Toyota Production System developed in Japan after the Second World War, where engineers such as Taiichi Ohno worked out how to make cars with far less inventory, space and rework than American factories used. Lean asks: which steps actually add value for the customer, and how do we remove the rest?

**Six Sigma** is about consistency and defects. It was created at Motorola in the 1980s by an engineer named Bill Smith, then made famous by General Electric under Jack Welch in the 1990s. Six Sigma asks: how much does our output vary from what the customer wants, and what is causing that variation?

The two were combined in the early 2000s because they answer different questions about the same process. A fast process that produces errors is no good; a perfect process that takes three weeks is no good either. **Continuous improvement** is the broader habit both belong to: treating every process as something that can always be made better, in small steps, using data.

### Where the name comes from

**Sigma** (the Greek letter σ) is the symbol statisticians use for **standard deviation**, which is a number that describes how spread out a set of values is. A small standard deviation means the values sit close together; a large one means they are scattered. You will learn to calculate it in Week 2. For now, treat it as "how much the output wanders."

A process that runs at "six sigma" is one where the customer's limits sit six standard deviations away from the process average on each side. That is an extremely consistent process: about 3.4 **defects** per million opportunities, where a defect is any output that fails a customer requirement. Almost nobody actually needs six-sigma performance on every process. The name stuck as a label for the method, not a target every project must hit.

### Y = f(x): results are caused upstream

The single most useful idea in the whole method is written **Y = f(x)**, read aloud as "Y is a function of x."

- **Y** is the result you care about: the output measure. Late deliveries per month. Errors per hundred forms. Minutes to answer a call.
- **x** stands for the inputs and process factors that drive that result: the causes. Which supplier was used. Whether the form was filled in on screen or by hand. How many people were rostered.
- **f( )** just means "depends on."

The message is that you cannot fix Y by staring at Y. If late deliveries are your problem, counting late deliveries more carefully changes nothing. You have to find the x's that produce lateness and change those. Every tool in this course is a way of either measuring Y honestly or finding and proving which x's matter.

Y is also called the **output**, the **dependent variable**, or the **CTQ** (critical to quality, covered on Day 4). The x's are called **inputs**, **factors**, or **independent variables**. The exam uses all of these names interchangeably.

### DMAIC: five phases, one story

Lean Six Sigma projects follow a fixed sequence called **DMAIC** (pronounced "duh-may-ick"). Each letter is a phase, and each phase has to be finished before the next begins. The end of each phase is a review meeting called a **tollgate**, where the sponsor checks the work and approves moving on. That is where this app gets its name.

| Phase | Question it answers | Main deliverables |
|---|---|---|
| **Define** | What is the problem, for whom, and what will "fixed" look like? | Project charter, problem statement, customer requirements, high-level process map |
| **Measure** | How bad is it now, measured honestly? | Data collection plan, checked measurement system, baseline performance |
| **Analyse** | What is actually causing it? | List of causes tested with data; the vital few x's confirmed |
| **Improve** | What change removes the cause, and does it work? | Solution chosen, piloted and shown to move Y |
| **Control** | How do we make sure it stays fixed? | Control plan, monitoring charts, updated procedures, handover to the process owner |

A **deliverable** is a concrete output a phase must produce before its tollgate. Exam questions often describe a deliverable and ask which phase it belongs to, so learn the right-hand column.

### Who does what: the belts

Six Sigma borrowed the martial-arts belt idea to name roles. The colours describe training and responsibility, not seniority in the company.

- **Champion** (also called the sponsor): a senior manager who owns the business problem, picks the project, removes obstacles and attends tollgates. Does not run the analysis.
- **Master Black Belt**: a full-time expert who trains and coaches Black and Green Belts and looks after the improvement programme across the organisation.
- **Black Belt**: usually full-time on improvement. Leads complex, cross-department projects and mentors Green Belts.
- **Green Belt**: a person with a normal job who has been trained to lead smaller projects in their own area, typically part-time. This is the level this course prepares you for.
- **Yellow Belt** (and White Belt in some schemes): basic awareness. Team members who help collect data and take part in improvement events.
- **Process owner**: the manager responsible for the process day to day. Receives the improved process at the end of Control and keeps it running.

### Three voices

A project has to satisfy three groups, and the method gives each a name.

- **Voice of the customer (VOC)**: what the people who receive the output need and complain about. Gathered from complaints, surveys, interviews and observation. This is where requirements come from.
- **Voice of the business (VOB)**: what the organisation needs, such as cost, margin, compliance and growth. Sets the reason the project is worth doing.
- **Voice of the employee (VOE)**: what the people doing the work know about frustrations, workarounds and obstacles. Often the fastest route to the real causes.

When a question asks where a project's requirements or defect definitions should come from, the answer is the voice of the customer. When it asks why the business is funding the project, the answer is the voice of the business.

## Worked Example

A regional courier receives complaints that parcels arrive late. Follow how a Green Belt would frame this before touching any data.

1. **Name the process and its output.** The process is "deliver a parcel from depot to customer." The output measure (Y) is the percentage of parcels delivered after the promised time. Last month: 1 480 of 12 300 parcels were late, which is 12.0%.
2. **Separate Y from the x's.** Brainstormed causes (x's): driver route order, parcels sorted to the wrong van, address errors on the label, van breakdowns, traffic on two particular routes, and parcels arriving at the depot after the morning cut-off. None of these is proven yet; they are candidates.
3. **Check which voice each fact comes from.** "Late means after the time we promised on the tracking page" is the voice of the customer. "Each late parcel costs about $9 in re-delivery and refunds, so 1 480 late parcels cost about $13 300 a month" is the voice of the business. "The sort screen freezes twice a shift, so we guess the van" is the voice of the employee, and it points to a likely x.
4. **Place the work in DMAIC.** Everything above is Define: naming the problem and its output measure. Measure would confirm the 12.0% with a reliable count and break it down by route and day. Analyse would test whether, say, late depot arrivals really do produce late deliveries. Improve would trial a fix for the confirmed cause. Control would keep the late rate on a chart so it does not creep back.
5. **Assign roles.** The operations manager is the Champion. The depot supervisor is the process owner. You, as Green Belt, lead the project part-time with two drivers and a sorter as team members.

Nothing has been fixed yet, and that is the point. Rushing to a solution before Define and Measure is the most common way projects fail.

## Formula Card

- `Y = f(x)` — the result Y depends on the input and process factors x. Fix x's to change Y.
- `Defect` — any output that fails a customer requirement. `Defective` — a unit with one or more defects.
- `Six sigma performance ≈ 3.4 defects per million opportunities` (with the standard 1.5-sigma shift, covered on Day 3).
- DMAIC order: Define → Measure → Analyse → Improve → Control.

## Exam Traps

- Lean is about waste and speed; Six Sigma is about variation and defects. Questions swap them.
- Six Sigma originated at Motorola (Bill Smith), not General Electric. GE made it famous.
- Lean originated at Toyota (Taiichi Ohno and colleagues), not in the United States.
- The Champion sponsors and removes obstacles; the Black Belt leads complex projects; the Green Belt leads smaller projects part-time. Do not give the Champion analysis tasks.
- Requirements and defect definitions come from the voice of the customer, not the voice of the business.
- A deliverable belongs to the phase that produces it. Charter is Define; baseline is Measure; confirmed causes is Analyse; piloted solution is Improve; control plan is Control.
- "Six sigma" describes a level of performance (3.4 defects per million opportunities). It is not the number of phases, tools or belts.

## Check Questions

- D-1.1-001
- D-1.1-002
- D-1.1-003
- D-1.1-004
- D-1.1-005

## Applied Task

List three processes in your own workplace that produce a result people complain about. For each, write one line naming the process, one line naming its output measure Y as something you could count or time, and three candidate x's. Mark which of the three voices (customer, business, employee) each complaint came from. Paste the list to your coach.

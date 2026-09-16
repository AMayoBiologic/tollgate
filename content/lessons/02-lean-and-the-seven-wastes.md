---
day: 2
week: 1
phase: Define
title: Lean and the Seven Wastes
minutes: 50
bok_sections: ["1.4"]
objectives:
  - State the five Lean principles and say what "value" means to a customer
  - Outline where Lean came from and name the people and companies the exam asks about
  - Explain why Lean and Six Sigma are used together and which problems each one suits
  - Name the seven wastes, recognise each one in an office or a factory, and sort activities into value-added and non-value-added
  - Describe the five steps of 5S and what a 5S workplace looks like
glossary_terms: ["value", "value-added", "non-value-added", "value stream", "flow", "pull", "push", "waste", "Toyota Production System", "just-in-time", "jidoka", "kaizen", "seven wastes", "transport", "inventory", "motion", "waiting", "overproduction", "over-processing", "5S", "work in process", "batch", "visual management", "gemba"]
---

## The Idea

### What Lean is for

Day 1 introduced Lean as the half of Lean Six Sigma that deals with speed and waste. Today goes deeper, because the exam has a whole section on it and because most of the quick wins in a Green Belt project are Lean wins.

Lean starts from one question: what does the customer actually pay for? The answer is **value**: the parts of the work that change the product or service into something the customer wants. Everything else the process does, however busy it looks, is cost. Lean calls that cost **waste** (the Japanese word is *muda*). The aim of Lean is to find the waste in a process and remove it, so that value reaches the customer faster, with less effort and at lower cost.

An activity is **value-added** if it passes all three of these tests:

1. The customer would be willing to pay for it if they knew it was happening.
2. It physically changes the product or moves the service forward (it transforms something).
3. It is done right the first time.

Anything that fails one of the tests is **non-value-added**. Some non-value-added work is still required, for example a legal check or a safety inspection; Lean calls this **business non-value-added** (or necessary non-value-added) and tries to make it as small as possible rather than remove it. Studies of ordinary processes routinely find that value-added time is less than 5% of the total time an item spends in the process. The rest is waiting, moving, checking and re-doing.

### The five Lean principles

Two researchers, James Womack and Daniel Jones, summarised Lean in 1996 as five principles. The exam expects you to know them in order.

1. **Specify value** from the customer's point of view, not from the organisation's.
2. **Identify the value stream**: the full sequence of steps, across departments, that delivers a product or service. Mapping it shows where waste sits. (You will draw one on Day 9.)
3. **Make value flow**: arrange the steps so the item moves through them without stopping, waiting or going backwards. **Flow** is the opposite of piling work up between steps.
4. **Let the customer pull**: do work only when the next step, and ultimately the customer, asks for it. **Pull** means producing to actual demand. **Push** means producing to a forecast or a schedule and sending the work on whether the next step is ready or not. Push creates piles; pull creates flow.
5. **Pursue perfection**: repeat the cycle. There is always more waste to find.

### Where Lean came from

Henry Ford's assembly line in 1913 was the first large-scale example of flow: cars moved past workers instead of workers walking to cars. But Ford's system only worked for one product made in huge volumes.

After the Second World War, Toyota in Japan could not afford Ford-style mass production. It had little cash, small local demand and needed to build several models on the same lines. Engineer Taiichi Ohno, with the consultant Shigeo Shingo and under the Toyoda family, developed what became the **Toyota Production System** (usually shortened to TPS) during the 1950s to 1970s. Its two pillars are:

- **Just-in-time**: make and deliver only what is needed, when it is needed, in the amount needed. This is pull in practice, and it forces inventory down.
- **Jidoka**: build quality in by giving machines and people the ability to stop the line the moment a defect appears, so the problem is fixed at its source rather than passed on. Sometimes translated as "automation with a human touch."

TPS also gave us **kaizen** (continuous small improvements made by the people who do the work), the seven wastes described below, and the habit of going to **gemba**, the actual place where the work happens, to see problems first hand instead of reading about them in a report.

The word "Lean" itself is American. Researcher John Krafcik used "lean production" in a 1988 article to describe Toyota's approach because it used less of everything: less space, less inventory, less effort, fewer defects. A study of the world's car plants by the Massachusetts Institute of Technology (MIT), published in 1990 as *The Machine That Changed the World* (Womack, Jones and Roos), made the term famous. From there Lean spread to every industry, including hospitals, banks and government.

### Lean and Six Sigma together

Lean and Six Sigma solve different problems with different tools, and a real process usually has both problems.

| | Lean | Six Sigma |
|---|---|---|
| Enemy | Waste and delay | Variation and defects |
| Typical question | Why does this take three weeks? | Why does this come out wrong one time in ten? |
| Typical tools | Value stream map (Day 9), 5S, pull, standard work (an agreed best way of doing each step) | Statistical tests, capability and control charts (all taught from Week 3 on) |
| Typical result | Shorter total time from request to delivery, less inventory, freed-up space | Fewer defects, more predictable output |

Used alone, Lean can make a process fast but leave it inconsistent, and Six Sigma can make a process consistent but leave it slow and expensive. Combined, one project can use the value stream map to find where time goes and the statistics to find out why quality varies. In practice, most Green Belt projects use Lean tools to remove obvious waste early, then Six Sigma tools to attack the variation that remains. The DMAIC structure from Day 1 holds both.

### The seven wastes

Ohno listed seven kinds of waste. IASSC (the International Association for Six Sigma Certification, which sets the exam) counts seven, and the exam will test you on them by description, so learn what each one looks like in practice. The mnemonic **TIMWOOD** puts them in a memorable order.

| Letter | Waste | What it is | Office example | Factory example |
|---|---|---|---|---|
| T | **Transport** | Moving product, materials or documents between locations. Movement of the *thing being worked on*. | A form carried between three buildings for signatures | Parts trucked between two plants |
| I | **Inventory** | Anything held that is not being worked on right now: raw material, finished goods, or **work in process** (items part-way through). | 400 unread emails; a backlog of claims | Pallets of parts waiting beside a machine |
| M | **Motion** | Movement of *people* that adds no value: walking, reaching, searching, clicking between screens. | Walking to a shared printer 40 times a day | Bending to pick parts from a low bin |
| W | **Waiting** | Idle time when the item or the person is waiting for the next step, an approval, a machine or information. | A quote sitting in a manager's inbox for two days | Operator waiting for a forklift |
| O | **Overproduction** | Making more than is needed, or making it earlier than needed. Ohno called this the worst waste because it causes the others. | Printing 200 reports when 20 are read | Building to a forecast that never arrives |
| O | **Over-processing** | Doing more work than the customer requires: extra approvals, unnecessary precision, re-entering the same data, gold-plating (adding quality the customer did not ask for). | Five signatures on a $50 purchase | Polishing a surface the customer never sees |
| D | **Defects** | Output that is wrong and must be scrapped, reworked, corrected or re-explained. | An invoice with the wrong address that has to be re-issued | A weld that fails inspection |

Two of the wastes are easy to confuse. Transport is the movement of the *item*; motion is the movement of the *person*. A clerk walking to a filing cabinet is motion. A file being couriered to another office is transport.

Many Lean books add an eighth waste, unused human talent or skills. The IASSC Green Belt syllabus lists seven, so if a question asks how many wastes Ohno identified, the answer is seven.

### Why overproduction is the worst

Overproduction is singled out because it manufactures the other wastes. Making too much creates inventory. Inventory has to be moved (transport) and stored, so people walk around it (motion). Items sit (waiting), and defects hide in the pile until someone finally uses the item, by which time hundreds more have been made the same way. Working to pull, so that nothing is made until it is needed, is the main defence.

### Batches and flow

Most offices and factories work in a **batch**: collect a pile of items, then process the whole pile at each step. Batching feels efficient, but it means every item waits for the whole pile at every step. If ten forms are processed in a batch through three steps that each take one minute per form, the first form is not finished until minute 21 and the last until minute 30. Processed one at a time in flow, the first form is finished at minute 3 and the last at minute 12. Reducing batch size is one of the fastest ways to cut the total time an item spends in a process, and it costs nothing.

### 5S

**5S** is a Lean method for organising a workplace so that waste, especially motion, waiting and defects, becomes visible and stops recurring. The five steps come from five Japanese words beginning with S; the English versions used by IASSC (the International Association for Six Sigma Certification, the body that sets the exam you are studying for) are listed below. The exam paper spells the fourth step "Standardize"; this course uses the Australian spelling.

1. **Sort** (*seiri*): remove from the area everything that is not needed for the current work. A red tag is placed on doubtful items and they are removed if nobody claims them within an agreed period.
2. **Straighten** (*seiton*, also called Set in Order): give everything that remains a fixed, labelled place, close to where it is used. "A place for everything and everything in its place." Shadow boards for tools (boards with an outline of each tool where it hangs, so a missing tool is obvious) and marked floor areas are typical.
3. **Shine** (*seiso*): clean the area and the equipment, and keep them clean. Cleaning is also inspection: leaks, wear and loose parts are found early.
4. **Standardise** (*seiketsu*): write down the agreed arrangement and cleaning routine so every shift and every person keeps the first three S's the same way. Photographs of the correct state, checklists and colour codes are common.
5. **Self-discipline** (*shitsuke*, also called Sustain): make the standard a habit through training, regular audits and management attention. Without this step the area slides back within weeks.

5S applies to offices and computer drives as much as to workshops: a shared drive with 30 000 unnamed files is an unsorted workplace. 5S is also the foundation of **visual management**: arranging the workplace so that anyone can see at a glance whether things are normal or abnormal, such as a marked shelf that shows when stock is low.

The exam sometimes asks which S a described activity belongs to. Removing unneeded items is Sort; labelling locations is Straighten; cleaning as inspection is Shine; writing the routine down is Standardise; auditing and habit-building is Self-discipline.

## Worked Example

A hospital pathology laboratory receives blood samples from wards and returns results. Staff complain that results take too long. A Green Belt walks the process at gemba with a stopwatch and follows one routine sample.

1. **Record what happens to the sample.**

   | Step | What happens | Minutes | Value-added? |
   |---|---|---|---|
   | 1 | Sample sits in a ward collection tray until the porter's hourly round | 38 | No: waiting |
   | 2 | Porter carries the tray to the lab | 6 | No: transport |
   | 3 | Sample sits in the lab reception basket until a batch of 20 is ready | 25 | No: waiting (batching) |
   | 4 | Technician walks to the label printer and back for each sample | 3 | No: motion |
   | 5 | Sample is spun in the centrifuge | 10 | Yes: transforms the sample |
   | 6 | Analyser runs the test | 12 | Yes: produces the result |
   | 7 | Result is printed, then typed into a second system by a clerk | 4 | No: over-processing |
   | 8 | 1 in 25 samples is rejected as mislabelled and re-collected | 90 (averaged: 3.6) | No: defects |

2. **Add up the time.** Total time from collection to result: 38 + 6 + 25 + 3 + 10 + 12 + 4 + 3.6 = 101.6 minutes. Value-added time: 10 + 12 = 22 minutes.

3. **Calculate the share that is value-added.** 22 ÷ 101.6 = 0.2165, so about 21.7%. Nearly four-fifths of the time is waste.

4. **Name the wastes.** Waiting (steps 1 and 3), transport (2), motion (4), over-processing (7) and defects (8). Inventory is visible too: the batch of 20 in step 3 is work in process. Overproduction is the only waste not seen for a single sample.

5. **Pick the first targets.** The two waiting steps are 63 minutes of the 101.6. Sending samples as they are collected (pull, smaller batches) rather than in hourly rounds and batches of 20 would remove most of that without any new equipment. The double data entry in step 7 is a candidate for removal once the two systems can share data. The mislabelling defects are a Six Sigma problem: the team needs data on where the labels go wrong before fixing them.

A single lab sample at 21.7% is already better than most office processes, where value-added time is often below 5%. Nothing here needed statistics. Walking the process and classifying each step as value-added or waste found 80 minutes of opportunity in a single walk of the process.

## Formula Card

No formulas in this lesson, but two lists to memorise.

- The seven wastes, TIMWOOD: Transport, Inventory, Motion, Waiting, Overproduction, Over-processing, Defects.
- 5S in order: Sort, Straighten, Shine, Standardise, Self-discipline.
- Value-added test: the customer would pay for it, it transforms the item, and it is done right first time. All three must be true.

## Exam Traps

- Transport is movement of the item; motion is movement of the person. Questions describe a person walking and offer "transport" as a distractor.
- Overproduction is making too much or too early, and is described as the worst waste because it causes the others. It is not the same as over-processing, which is doing more work per item than needed.
- Inventory includes work in process and information (unread emails, unprocessed claims), not only physical stock.
- IASSC lists seven wastes. "Unused talent" is a common eighth in books, but the answer to "how many" is seven.
- The five Lean principles run in order: value, value stream, flow, pull, perfection. Pull is the customer triggering work; push is producing to a schedule or forecast.
- The Toyota Production System came from Taiichi Ohno (with Shigeo Shingo). The word "Lean" was coined by John Krafcik in 1988 and popularised by the 1990 MIT study by Womack, Jones and Roos. Six Sigma came from Motorola. Questions mix these up.
- Just-in-time and jidoka are the two pillars of TPS. Kaizen is the habit of small continuous improvements, not a pillar.
- 5S order matters: you cannot Straighten before you Sort. Standardise is writing the arrangement down; Self-discipline (Sustain) is keeping it going through audits and habit.
- Business non-value-added work (a legally required check) is still non-value-added. It is minimised, not counted as value.

## Check Questions

- D-1.4-001
- D-1.4-004
- D-1.4-007
- D-1.4-010
- D-1.4-013

## Applied Task

If you have not yet chosen the improvement project you will use for the applied tasks in this course, choose it now: one process in your own organisation, with a result people complain about, that you can get historical data for. You will draft its charter on Day 4.

For today, choose one process in your organisation that people say is slow (it can be your project process). Follow one item through it, using historical timestamps from your system if you cannot watch it live (for example, the time a request was logged, assigned, actioned and closed). Build a table like the worked example: each step, its minutes, whether it is value-added, and which of the seven wastes it is if not. Calculate the value-added percentage. Under the table, write which two wastes you would attack first and one pull or batch-size change that would reduce them. Paste the table and your two sentences to your coach.

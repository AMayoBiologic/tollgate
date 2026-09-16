---
day: 11
week: 3
phase: Measure
title: Process Capability
minutes: 50
bok_sections: ["2.4"]
objectives:
  - Explain what a specification limit is, where it comes from and how it differs from a control limit
  - Calculate Cp, Cpk, Cpu and Cpl from a mean, a standard deviation and specification limits
  - Explain the difference between Cp and Cpk, and between Cpk and Ppk
  - State why capability is only meaningful for a stable process and how stability is checked
  - Convert a capability index to a sigma level and to an expected defect rate
glossary_terms: ["process capability", "capability index", "Cpu", "Cpl", "Pp", "Ppk", "short-term variation", "long-term variation", "within-subgroup variation", "overall variation", "stable process", "control limit", "capability study", "centring", "rational subgroup"]
---

## The Idea

### The question capability answers

Days 6 to 10 collected data, described it, checked it was normal and checked the gauge. Now the Measure phase can answer its central question: how well does the process meet what the customer asked for? **Process capability** is the comparison of the voice of the process (where it is centred and how much it varies) with the voice of the customer (the specification limits). A **capability index** is a single number that makes the comparison.

### Specification limits and tolerance

Day 4 defined a specification limit as the customer's boundary for acceptable output. A characteristic may have an upper specification limit (USL), a lower specification limit (LSL), or both. The distance between them is the **tolerance**: USL − LSL. A fill weight of 250 g with limits 242 g and 258 g has a tolerance of 16 g. Some characteristics have only one limit: response time has a USL but no LSL, because faster is fine; tensile strength has an LSL only.

Specification limits come from the customer, a regulation or a design requirement. They are not calculated from the data. A **control limit** (Day 24) is the opposite: calculated from the process's own data, it says what the process is doing, not what the customer wants. Exam questions test this distinction constantly: specification limits are the customer's voice; control limits are the process's voice. A process can be inside its control limits and outside its specification limits, or the reverse.

### Short-term and long-term variation

Capability needs a standard deviation, and there are two ways to estimate it, giving two families of index.

**Short-term variation** (also called **within-subgroup variation**) is the variation within small groups of consecutive units made under the same conditions: five bottles filled one after another, or ten invoices raised by one clerk in one hour. Such a group is a **rational subgroup**: chosen so that only common cause variation can occur inside it. Short-term variation is the best the process can do; it excludes shifts, drifts and differences between days, batches or operators. It is estimated from the average range or average standard deviation of the subgroups (software does this; the same estimate feeds the control charts on Day 24), and written σwithin, read "sigma within".

**Long-term variation** (**overall variation**) is the variation of all the data taken together over a long period: the ordinary sample standard deviation s of everything collected. It includes every shift and drift that happened. It is written σoverall ("sigma overall") and in practice is at least as large as σwithin.

The indices built on short-term variation are **Cp** and **Cpk**. The indices built on long-term variation are **Pp** and **Ppk** (the P stands for performance). Cp and Cpk describe the process's potential when it is running steadily; Pp and Ppk describe what the customer actually received over the period. If Cpk and Ppk are close, that is consistent with a stable process (the control chart is what confirms it). If Ppk is much lower than Cpk, the process shifts and drifts between subgroups, and the fix is to find the special causes, not to reduce the within-subgroup spread.

### Cp: potential capability

`Cp = (USL − LSL) ÷ (6 × σ)`

Six standard deviations is the natural width of a normal process (±3σ contains 99.73% of output). Cp compares the width the customer allows with the width the process uses. Cp = 1.0 means the process spread exactly fills the tolerance; Cp = 2.0 means the tolerance is twice the process spread. Cp ignores where the process is centred: a process with Cp = 2.0 can still make 100% defects if its mean sits outside the limits. That is why Cp is called potential capability. It also needs both limits; with a one-sided specification there is no Cp.

### Cpk: actual capability, allowing for centring

Cpk fixes Cp's blind spot by measuring from the mean to the *nearest* limit, in units of 3σ:

- `Cpu = (USL − mean) ÷ (3 × σ)` — capability against the upper limit.
- `Cpl = (mean − LSL) ÷ (3 × σ)` — capability against the lower limit.
- `Cpk = the smaller of Cpu and Cpl`.

Cpk is the number to quote. When the process is perfectly centred, Cpk = Cp. As the mean drifts towards a limit, Cpk falls while Cp stays the same. The gap between Cp and Cpk therefore measures **centring**: how far off-centre the process runs. A large gap says "move the mean"; a low Cp says "reduce the spread". For a one-sided specification, Cpk is whichever of Cpu or Cpl exists.

Cpk can be negative: that means the mean is outside the specification limit.

### Reading the numbers

Common benchmarks:

| Cpk (or Ppk) | Meaning | Approximate defects per million (centred, two-sided, both tails) |
|---|---|---|
| < 1.00 | Not capable: the process spread is wider than the tolerance or the mean is too close to a limit | > 2 700 per million |
| 1.00 | Marginal: ±3σ exactly touches the nearest limit | 2 700 per million |
| 1.33 | The traditional minimum for an existing process: ±4σ to the nearest limit | 63 per million |
| 1.67 | Often required for new processes or safety-critical characteristics: ±5σ | 0.6 per million |
| 2.00 | Six sigma short-term: ±6σ to the nearest limit | 0.002 per million (3.4 with the shift) |

The link to the sigma level from Day 3 is direct: the short-term sigma level is 3 × Cpk, because Cpk counts the distance to the nearest limit in units of 3σ. Cpk = 1.33 is 4 sigma; Cpk = 2.0 is 6 sigma. The defect rates in the table come from the Z table on Day 8: the distance to the nearest limit in standard deviations is Z = 3 × Cpk, the tail beyond it is the defect proportion on that side, and for a centred two-sided process the tail is doubled. For a process that is off-centre, compute the tail beyond each limit separately from its own Z and add them. This table counts defects at the stated short-term Cpk; Day 12 reconciles it with the sigma table's 1.5 shift, under which 4 sigma is quoted as 6 210 defects per million.

### Stability first

A capability index is a summary of a distribution. It only means something if the process has one distribution, which is to say the process is a **stable process**: only common cause variation is present, and tomorrow will look like today. An unstable process has no single mean or standard deviation to put into the formula; a Cpk calculated from it describes the past sample and predicts nothing.

So the **capability study** has an order:

1. Verify the measurement system (Day 10).
2. Collect data in rational subgroups over a period long enough to see normal variation, typically at least 25 subgroups or 100 individual values.
3. Plot a control chart (Day 24; software does this, and a run chart of the subgroup means is a fair substitute until then) and confirm the process is stable. If it is not, find and remove the special causes and collect again.
4. Check normality (Day 8). Non-normal data need a transformation (re-expressing the data on a different scale so it becomes normal, Day 22) or a capability method for non-normal data, which is beyond this course; Day 12 covers attribute data.
5. Calculate Cp, Cpk from σwithin and Pp, Ppk from σoverall.
6. Report the indices, the expected defect rate, and the histogram against the specification limits.

Software prints all of this on one capability report, with a histogram, the limits, the two families of index and the expected parts per million (PPM) for within and overall. A typical exam item shows such a report and asks what to conclude.

### What the indices tell you to do

- Cp high, Cpk low: the spread would fit but the process is off-centre. Adjust the mean (often a cheap fix: a change to the machine setting).
- Cp and Cpk both low: the spread is too wide. Reduce variation, which is the hard problem Analyse exists for.
- Cpk fine, Ppk much worse: the process is unstable between subgroups. Find the special causes.
- All indices fine but customer complaints continue: check the specification limits reflect the real customer need, and check the measurement system.

## Worked Example

A machine shop turns shafts to a specification of 9.5 mm to 10.5 mm. After the repeat gage R&R on Day 10 passed, the team collects 25 subgroups of 4 shafts over two weeks and confirms on a control chart that the process is stable and on a probability plot that the data are normal. Results: mean 10.12 mm, within-subgroup standard deviation 0.12 mm, overall standard deviation 0.16 mm.

1. **Tolerance.** USL − LSL = 10.5 − 9.5 = 1.0 mm.
2. **Cp.** 1.0 ÷ (6 × 0.12) = 1.0 ÷ 0.72 = 1.39. The spread would fit with room to spare if the process were centred.
3. **Cpu.** (10.5 − 10.12) ÷ (3 × 0.12) = 0.38 ÷ 0.36 = 1.06.
4. **Cpl.** (10.12 − 9.5) ÷ 0.36 = 0.62 ÷ 0.36 = 1.72.
5. **Cpk.** The smaller of 1.06 and 1.72: 1.06. The mean is closer to the upper limit, and that side is marginal.
6. **Sigma level.** 3 × 1.06 = 3.18 short-term sigma.
7. **Expected defects.** Upper tail: Z = (10.5 − 10.12) ÷ 0.12 = 3.17; the tail beyond 3.17 is about 0.00076, or 760 per million. Lower tail: Z = (10.12 − 9.5) ÷ 0.12 = 5.17, a tail of about 0.0000001, negligible. Total about 771 parts per million out of specification.
8. **Pp and Ppk** from the overall standard deviation 0.16: Pp = 1.0 ÷ (6 × 0.16) = 1.04; Ppu = 0.38 ÷ 0.48 = 0.79; Ppl = 0.62 ÷ 0.48 = 1.29; Ppk = 0.79.
9. **Diagnosis.** Cp = 1.39 against Cpk = 1.06: the process is off-centre towards the upper limit. Moving the mean to 10.0 would lift Cpk to 1.39 at no cost in variation. Cpk = 1.06 against Ppk = 0.79: the overall spread is a third larger than the within-subgroup spread, so something shifts between subgroups (the chart shows a step after a tool change on day six). Both fixes are worth more than attacking the within-subgroup spread.

If a question instead gives a target Cp and asks what standard deviation is needed: for Cp = 1.33 on this tolerance, σ = (USL − LSL) ÷ (6 × Cp) = 1.0 ÷ 7.98 = 0.125 mm.

## Formula Card

- `Tolerance = USL − LSL`.
- `Cp = (USL − LSL) ÷ (6 × σwithin)` — potential capability; needs both limits; ignores centring.
- `Cpu = (USL − mean) ÷ (3 × σwithin)`; `Cpl = (mean − LSL) ÷ (3 × σwithin)`; `Cpk = min(Cpu, Cpl)`.
- `Pp = (USL − LSL) ÷ (6 × σoverall)`; `Ppk = min((USL − mean), (mean − LSL)) ÷ (3 × σoverall)`.
- `Short-term sigma level = 3 × Cpk`.
- `Z to a limit = distance from mean to limit ÷ σ`; defect proportion = tail beyond Z from the Z table; add the two tails for a two-sided specification.
- `Required σ for a target Cp = (USL − LSL) ÷ (6 × Cp)`.

## Exam Traps

- Cp uses 6σ in the denominator; Cpk uses 3σ. Dividing the nearest-limit distance by 6σ gives half the right Cpk.
- Cpk uses the *nearest* limit. Using the farther one gives a flattering, wrong answer and is the standard distractor.
- Cp = Cpk means the process is centred. Cp much greater than Cpk means off-centre. Cpk can never exceed Cp.
- Cp/Cpk use short-term (within-subgroup) standard deviation; Pp/Ppk use long-term (overall). Ppk ≤ Cpk in practice. A question giving "the standard deviation of all 200 readings" is describing overall variation, so Pp/Ppk.
- Specification limits come from the customer; control limits come from the process data. They are never interchangeable.
- Capability is meaningless for an unstable process. If a question says the control chart shows special causes, the answer is "stabilise first", not a Cpk value.
- Sigma level = 3 × Cpk (short-term). Cpk = 1.33 is 4 sigma, Cpk = 2.0 is 6 sigma.
- One-sided specification: no Cp; Cpk is Cpu or Cpl alone.
- Cpk = 1.0 is 2 700 defects per million for a centred two-sided process (0.27% outside ±3σ), not zero.
- Negative Cpk means the mean is outside the specification.

## Check Questions

- M-2.4-001
- M-2.4-003
- M-2.4-004
- M-2.4-006
- M-2.4-009

## Applied Task

Using the continuous primary metric from your own project and the historical data you assembled on Days 7 and 8 (at least 100 values, in the order they were produced), organise the values into rational subgroups (for example groups of 4 or 5 consecutive items, or one day's items). Plot the subgroup means in time order and state whether you see shifts or trends. Calculate the overall standard deviation of all values and estimate the within-subgroup standard deviation as the average of the subgroup standard deviations. With your customer's specification limits, calculate Cp, Cpu, Cpl, Cpk, Pp and Ppk, convert Cpk to a sigma level, and estimate the expected defects per million using the Z table. Write three sentences: whether the process is centred, whether it is stable, and which of the two (centring or spread) you would attack first. Paste the numbers and the sentences to your coach.

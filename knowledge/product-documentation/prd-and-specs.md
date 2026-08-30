# PRDs, Specs & Product Documentation — Lean Digital Teams

**Audience:** AI agents acting on Federico Monroy's behalf. Federico is a product designer who crosses into product and research — not a full-time PM. These conventions are calibrated for small, fast teams where the designer is often also writing the spec.  
**Last updated:** August 2026

---

## 1. What a PRD Actually Needs vs What Bloats It

### Keep — things that help engineers ship

| Element | Why it earns its place |
|---|---|
| **Problem statement** | Anchors all decisions. One sentence: who has this problem, what's the current friction, what's the cost of not solving it. |
| **User story + acceptance criteria** | Tells engineers when they're done. Without this, "done" is subjective. |
| **Scope / Out-of-scope** | Out-of-scope is often more valuable than scope. Explicit exclusions prevent scope creep without a meeting. |
| **Edge cases** | The cases you thought of but decided not to handle — documented so they don't resurface as bugs. |
| **Links** | Figma file, analytics dashboard, related tickets, API docs. Single source of truth, not copy-pasted content. |

### Cut — things that waste everyone's time

| Element | Why it should go |
|---|---|
| **Long "background" sections** | If engineers need context, link to a separate doc. Don't make them scroll past 400 words to get to the spec. |
| **Detailed mock specs embedded in the PRD** | Mocks go stale in 48 hours. Link the Figma frame, don't transcribe it. |
| **Approval chains on every change** | A comment in Linear or a Slack ping is enough for a feature spec. Reserve sign-offs for initiative briefs. |
| **"Goals and non-goals" as separate sections from scope** | Merge them. Two sections saying the same thing in different words is pure overhead. |
| **Success metrics without owners** | A metric no one is responsible for tracking is decoration. Name the owner or delete it. |

---

## 2. Modern PRD Format (2024–2026)

The 40-page Word doc is dead. Modern teams spec in **Linear** (linked to the issue), **Notion** (linked from the issue), or a **GitHub Issue** with a structured description.

### The lightweight spec pattern

- **1 page max.** If it needs more, break it into sub-tasks.
- **Structure:** Problem → User Story → Acceptance Criteria → Out-of-scope → Edge Cases → Links
- **Links, not embeds.** Figma, data, prior art — link out, never copy in.
- **Living doc.** Update in place rather than versioning with "v2 FINAL (3)".

Where you write it matters less than that it's linked from the ticket that engineers actually work in. A Notion doc no one navigates to is a dead doc.

---

## 3. User Story Format

**Template:**
> As a **[specific user type]**, I want to **[take an action]** so that **[I achieve an outcome]**.

The user type should be as specific as possible ("returning buyer with a saved address" beats "user"). The outcome should be the user's goal, not the feature's function.

### Good vs Bad

| | Story |
|---|---|
| **Bad** | As a system, it should send a confirmation email after checkout. |
| **Bad** | As a user, I want a confirmation email. |
| **Good** | As a first-time buyer, I want a confirmation email after placing my order so that I have proof of purchase and know my order was received. |

**Why the bad examples fail:**
- Written from the system's perspective — tells engineers what to build, not why.
- No outcome — "I want X" without "so that Y" makes X look arbitrary and gives no basis for deciding what X actually is.

### Acceptance criteria on the story

Every user story needs at least one acceptance criterion, otherwise "done" is ambiguous. See section 4.

---

## 4. Acceptance Criteria

Two formats. Use the one that fits the complexity.

### Given/When/Then (Gherkin)

Good for: flows with branching conditions, anything that will be automated as a test.

```
GIVEN a first-time buyer has completed checkout
WHEN the order is confirmed by the payment processor
THEN they receive a confirmation email within 60 seconds
  AND the email contains the order ID, item list, and shipping address
  AND the subject line reads "Your order is confirmed"
```

### Checklist format

Good for: UI behavior, simple states, design QA. Faster to read at a glance.

```
- [ ] Email arrives within 60 seconds of payment confirmation
- [ ] Subject line: "Your order is confirmed"
- [ ] Body includes: order ID, item list, shipping address
- [ ] Works for both guest checkout and logged-in users
- [ ] If payment fails, no email is sent
```

**Rule of thumb:** if you need to test branching conditions or automation will run against it, use Gherkin. If it's a designer or PM doing QA from a list, use the checklist.

---

## 5. RFC / Design Doc — for Architecture, Not Features

An RFC (Request for Comments) or design doc is for decisions that affect multiple teams or have long-term implications: a new API, a data model change, switching an auth pattern, a significant infra choice.

**When to write one:**
- Decision is hard to reverse
- Two or more teams are affected
- There are legitimate alternatives worth documenting
- You need async input before deciding

**What goes in it:**

| Section | Contents |
|---|---|
| Context | What's the current state, why does a decision need to be made now |
| Decision | What you're proposing — clearly stated, one paragraph |
| Alternatives considered | At least two alternatives with why you're not choosing them |
| Consequences | What gets easier, what gets harder, what it forecloses |
| Open questions | Things that need input before this is final |

### DACI model

For any RFC, name who plays each role upfront:

| Role | Responsibility |
|---|---|
| **Driver** | Writes the doc, collects input, moves it to a decision |
| **Approver** | Has final say — one person, never a committee |
| **Contributor** | Provides input but does not approve |
| **Informed** | Gets notified of the outcome but doesn't need to weigh in |

Without DACI, RFCs become discussion threads that never close.

---

## 6. Three Spec Levels

### Bug Report (5 fields)

```
What happened:    [exact behavior observed]
What was expected: [what should have happened]
Steps to reproduce:
  1.
  2.
  3.
Environment:      [browser, OS, device, app version]
Severity:         Critical / High / Medium / Low
```

Severity shorthand: Critical = blocks all users from core flow. High = blocks some users or degrades core flow. Medium = workaround exists. Low = cosmetic or edge case.

### Feature Spec (1 page)

```
## [Feature name]

Problem: [One sentence. Who has this problem and what's the friction.]

User story: As a [user type], I want to [action] so that [outcome].

Acceptance criteria:
- [ ] ...
- [ ] ...
- [ ] ...

Out-of-scope (this iteration):
- ...

Edge cases handled / explicitly not handled:
- ...

Links: [Figma] [Analytics] [Related ticket]
```

### Initiative Brief (2 pages)

For bigger bets that need stakeholder alignment before anyone writes a spec.

```
## [Initiative name]

Problem: [2–3 sentences. The user pain or business problem.]

Opportunity: [Why now. Market context, user data, strategic fit.]

Success metrics: [Quantified. Owner named.]

Approach options:
- Option A: [Summary] — Pros: / Cons:
- Option B: [Summary] — Pros: / Cons:

Recommended option: [Which and why in 2 sentences.]

Risks: [Top 2–3 risks with mitigation for each.]

Timeline: [Rough phases, not a Gantt chart.]
```

---

## 7. Decision Log

A running doc — one per product area or per quarter — that records decisions as they're made. The payoff is 3 months later when someone says "why did we do it this way?" and you have an answer that took 2 minutes to write at the time.

### Format

| Date | Decision | Who decided | Alternatives considered | Why this one |
|---|---|---|---|---|
| 2026-08-15 | Use session tokens, not JWTs | Eng lead | JWTs (stateless) | Revocation complexity outweighs stateless benefit at current scale |
| 2026-07-30 | No guest checkout in v1 | Product + Design | Guest flow | Reduces auth edge cases; revisit after launch |

**Rule:** If a decision gets re-litigated in a meeting, add it to the log and link it. After the second time, people stop re-litigating.

---

## 8. Using AI to Write These

### What AI does well

- Turning a vague description into a first-draft spec structure
- Generating Given/When/Then from a checklist you wrote
- Surfacing edge cases you haven't thought of
- Drafting the "alternatives considered" section of an RFC from bullet notes

### Prompt patterns

**First-draft feature spec from a description:**
```
Write a 1-page feature spec for [description].
Structure: problem statement, user story (As a / I want / So that),
acceptance criteria as a checklist, out-of-scope (3 items),
edge cases. Keep it under 300 words.
```

**Edge case generator:**
```
Here is a feature spec: [paste spec].
List 8 edge cases that are not covered by the acceptance criteria.
For each, say whether it should be in scope for v1 or explicitly out-of-scope.
```

**Given/When/Then from a checklist:**
```
Convert these acceptance criteria into Gherkin (Given/When/Then) format.
Keep each scenario to 4–5 lines. [paste checklist]
```

### What you must always add manually

AI cannot know:
- **Success metrics** — you have the business context
- **Out-of-scope** — requires product judgment about priorities
- **The real user type** — "user" in a generated story is almost always too generic
- **Edge cases specific to your stack or user base** — AI invents plausible ones, not necessarily the ones that will actually occur

Always review AI output against real user research and current engineering constraints before sharing with the team.

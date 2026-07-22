---

## 2026-07 — new.html pivot: DemoEngine framework + 5-stage narrative

### Major architecture shift
`new.html` is now the primary self-contained portfolio (separate from
`index.html`, kept as rollback). Fully self-contained: no outbound links
to `projects/*.html`, everything happens in-page across modes (Start,
Your Problem, Work, Challenge, CV).

### window.DemoEngine — reusable animation framework (CONFIRMED LIVE)
Built inside `new.html`'s main script IIFE. Provides for ANY project scene:
- `DemoEngine.create(stageId, accent)` → returns toolkit
- `addSlide(id, html, {type, zoomable})` — slide management, crossfade
- `showSlide(id)` — switch active slide
- `cursorTo(targetEl, cb)` — cursor movement computed via getBoundingClientRect
  on the REAL element — never hardcoded percentage coordinates (this was
  the #1 recurring bug before the engine existed)
- `zoomTo(slideId, targetEl, scale, cb)` / `zoomOut(slideId, cb)` — precise
  element-anchored zoom, transform-origin computed from real element position
- `typeText(el, text, {speed, hold}, cb)` — typed caption, ~32ms/char pace
- `revealBounce(el, html)` — bounce-in reveal for short punchy lines,
  supports inline color spans for word emphasis
- `circleAnnotate(svgEl, cb)` / `clearAnnotate(svgEl)` — hand-drawn circle
  annotation around an element
- `shake(el)` / `glow(el)` / `unglow(el)` — emphasis micro-interactions
- `narrateSteps(stepLines, opts, onEachDone, onAllDone)` — text-only step
  narration (NEVER fake UI checklists for steps)

RULE: extend this engine, never fork it. New capability needed → add as a
new DemoEngine method, not one-off inline code. Icons must be inline SVG
(matching the rest of the file) — Tabler/icon-font classes do NOT work,
no icon font is loaded anywhere in this file.

### 6 skills installed (both in this repo's .claude/skills/ AND uploaded
to claude.ai as Custom Skills, generalized for reuse across future projects)
- motion-framework-architect — extends DemoEngine per project, typography
  guidance per project (EY generic-corporate, Chek fintech-rounded,
  DollarCity retail-dense, Blockchain dark+neon spatial, Aduanas formal-gov)
- cursor-precision-qa — catches hardcoded coordinate bugs before commit
- motion-graphics-review — timing/easing/emphasis-density standards,
  calibrated against Anthropic's Cowork demo video (frame-diffed earlier)
- narrative-consistency — checks story matches what Federico described,
  no invented metrics, correct tool names, no tone drift into marketing-speak
- mini-ds-builder — per-project mini design-system showcase section
- context-keeper — maintains this log + PORTFOLIO-CONTEXT.md + CLAUDE.md

### NEW 5-stage narrative architecture (replaces the old single "How I
work" step-row concept) — approved direction, build in this order:

**1. Diagnose** — "First, diagnose what is happening with your product"
(no "I/yo" anywhere in copy — impersonal, descriptive tone throughout)
  - Track (REAL UI): 2-3 cursors navigate a generic marketplace
    simultaneously — enter, pick a product, hit a form, DROP OFF (heavy
    visual emphasis on the drop-off moment specifically). Tools shown via
    logo: Pendo, Mixpanel, Google Analytics.
  - Build the report: "These numbers translate to reports built with AI"
    (confirm wording) — funnels, journeys, paths, spikes, feature/page/event
    reports, NPS, feedback (include both good AND bad feedback examples)
  - Transition line: "Now that we have all the data gathered, we know
    where the pain is happening" — select users from a specific product
    area who had pain points / negative feedback

**2. Research** — SYMBOLIC, not real UI. Icons for drop-off/frustration/
  bad-NPS/bad-CSAT being "addressed" by research methods (interviews,
  focus groups, usability testing, surveys). Logos: Maze, Useberry,
  Optimal Workshop, Qualtrics, Zoom, Teams. Message: reach out, listen to
  their story, combine with the quantitative side. Qualitative research
  surfaces MORE pain points/insights, converted into actionable UI,
  service, or even backend improvements — not just UI fixes.

**3. Design** — REAL UI. Two parallel paths shown: (a) a Figma-style
  canvas designing a screen, (b) vibe-coding — a prompt turns directly
  into a build with a design system. Logos: Figma, Claude (design-assist).

**4. Launch** — SYMBOLIC. Becomes Replit / Factory.ai / Claude Code / v0 /
  Bolt / GitHub / Supabase → deploy → site is live.

**5. [NAME PENDING — Federico to confirm]** — proposed: "Product
  Intelligence Hub" (alternatives discussed: "Always-On Hub", "The Hub").
  NOT "Governance Hub" (reads as compliance/legal, wrong meaning) NOT
  "Behavior Analytics Hub" (Federico explicitly rejected this name).
  Function: continuous daily measurement of PRODUCT/USABILITY analytics
  (not technical analytics) — unlike Research, which runs only in
  scoped time windows. Includes a research/insights repository any
  stakeholder can consult, plus what each insight was converted into.
  Connected via MCP/API/webhooks to Pendo/GA/etc — queried directly
  through Claude Code / Factory.ai Droids / ChatGPT rather than manually
  opening each tool. Pendo/GA become "places to consult," not places to
  manually act in.

### Bugs already caught and fixed once (don't reintroduce)
1. Tabler icon classes (`ti ti-*`) do not work in this file — no icon
  font loaded, 100% inline SVG. Always use inline SVG for new icons.
2. Hardcoded percentage cursor coordinates break on layout shift — always
  use `DemoEngine.cursorTo(realElement, cb)`.
3. `CLAUDE.md` git policy: direct push to `main`, no branches, no PRs —
  this was previously contradicted by an older "Git Rules" section,
  which was found and deleted. If a future session finds two git
  policies again, delete the older one and keep direct-to-main.
4. GitHub Pages Jekyll build failures from GitHub API 503s — fixed
  permanently by adding `.nojekyll` at repo root.

### Pending / not yet built
- Diagnose scene (multi-cursor UI + report-building beat) — NOT yet built
  with DemoEngine, only the single-cursor "software license" example exists
  currently and needs restructuring into this multi-cursor drop-off version.
- Research, Design, Launch, and the 5th stage — none built yet.
- Stage 5 name — needs Federico's final confirmation.
- Chek, DollarCity, Blockchain, Aduanas, Forecast — no DemoEngine scenes
  built yet for any of them.

---

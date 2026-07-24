# CLAUDE_CONTEXT.md — Federico Monroy Portfolio
> Master context reference. Read this FIRST in any new session, before
> touching any code. Update this file incrementally after any substantial
> work — append new sections, never delete or rewrite existing ones.

---

## 1. PROJECT IDENTITY

- Self-contained portfolio: `new.html` is the primary, current file.
  `index.html` and `index-v3.html` are older versions kept only as rollback
  — do not build new features there.
- Federico works ONLY from an iPad + GitHub Codespaces. No local machine.
  He pastes prompts into Claude Code manually — there is no live terminal
  access for him, so every prompt must be fully self-contained and copy-
  pasteable, ending in a working `git commit` + `git push`.
- Git workflow: **direct push to `main`. No branches, no PRs, ever.**
  (This was previously contradicted by an old "Git Rules" section that
  said the opposite — that section was found and deleted. If a future
  session ever finds two conflicting git policies again, delete the older
  one and keep direct-to-main; this is Federico's explicit, confirmed,
  standing instruction.)
- `.nojekyll` exists at the repo root — required, do not remove. Without
  it, GitHub Pages' Jekyll build can fail on a transient GitHub API 503
  (this happened once and looked like a real bug before being traced to
  Jekyll's `jekyll-github-metadata` plugin calling the GitHub API on every
  build, which this static site does not need at all).

## 2. THE DEMOENGINE FRAMEWORK (already live in new.html)

`window.DemoEngine` is a reusable animation engine — extend it, never fork
it or rebuild it from scratch for a new project.

`DemoEngine.create(stageId, accent)` returns a toolkit:
- `addSlide(id, html, {type, zoomable})` — slide management, crossfade
- `showSlide(id)`
- `cursorTo(targetEl, cb)` — cursor position computed via
  `getBoundingClientRect()` on the REAL target element.
  **CRITICAL RULE: cursor position must NEVER be a hardcoded percentage
  coordinate** (e.g. `x:'44%'`). This was the single most repeated defect
  in this project before the engine existed — hardcoded coordinates break
  the instant a layout shifts even slightly.
- `zoomTo(slideId, targetEl, scale, cb)` / `zoomOut(slideId, cb)` — zoom
  transform-origin computed from the target element's real position
  relative to the slide container (not the viewport, not the stage).
- `typeText(el, text, {speed, hold}, cb)` — typed caption, ~30-35ms/char
  (deliberately slower than a typical "typewriter" cliché — has been
  corrected upward from a too-fast 16-20ms/char multiple times).
- `revealBounce(el, html)` — bounce-in reveal for short punchy lines,
  supports inline colored `<span>` for word emphasis.
- `circleAnnotate(svgEl, cb)` / `clearAnnotate(svgEl)` — hand-drawn circle
  annotation around an element (stroke-dasharray draw-on effect).
- `shake(el)` / `glow(el)` / `unglow(el)` — emphasis micro-interactions.
- `narrateSteps(...)` — text-only step narration. **Steps/progress must
  ALWAYS be plain text narration ("Step 1 — Navigate: find the product"),
  NEVER a fake UI checklist widget** — this was explicitly corrected after
  an early version looked like it was part of the real product UI and
  confused the story.

### Known animation bugs already found and fixed — do not reintroduce
1. **Tabler icon classes (`ti ti-*`) do not work anywhere in this file.**
   There is no icon font loaded — 100% of icons are inline SVG. CLAUDE.md
   also restricts CDN libraries to Animate.css/Iconify/Motion One, none of
   which is Tabler. Any `<i class="ti ti-...">` renders as an invisible
   empty box. Always use inline SVG matching the file's existing style.
2. **A CSS-transition "doesn't animate" bug**: setting an element's height
   from 0 to a target value via inline style, immediately after page load,
   can get batched into a single paint frame with no visible transition.
   Fix: force a reflow between the reset and the animated state —
   `el.style.transition='none'; el.style.height='0px'; el.offsetHeight; /* forces reflow */ el.style.transition='height 800ms ...'`
   — and/or wrap the first trigger in a double `requestAnimationFrame`.
3. **A JS syntax error from a badly escaped apostrophe** silently broke an
   entire animation script once (`\\'` instead of `\'` inside a single-
   quoted string turned "that's" into a string-terminator + orphaned
   text, which is a parse error that halts the whole script with zero
   console-visible symptoms in this context). Avoid contractions
   apostrophes inside single-quoted JS string literals, or use double
   quotes for strings containing them.
4. **A CSS specificity bug**: `#panel-work{display:flex;...}` (an ID
   selector) silently overrode `.panel{display:none}` /
   `.panel.active{display:block}` (class selectors) because ID selectors
   always win regardless of class count, making the Work panel show on
   every tab. Fix: any ID-scoped display/layout rule for a tab panel MUST
   be written as `#panel-x.active{...}` and `#panel-x:not(.active){display:none!important;}`
   — never a bare `#panel-x{display:...}`.
5. GitHub Pages CDN cache (`cache-control: max-age=600`) means a push can
   take up to ~10 minutes to actually appear live, even though the commit
   itself is instant. Before concluding something "didn't work," check
   `raw.githubusercontent.com/<repo>/main/<file>` (bypasses the Pages CDN
   entirely) to see the real committed file content immediately.

## 3. DESIGN SYSTEM FOR DEMOENGINE SCENES

- **Light/dark mode**: automatic via `prefers-color-scheme`, scoped with
  CSS custom properties on the scene's outer container (e.g. `--bg`,
  `--tx`, `--tx-mut`, `--card`, `--sh`, `--inp`). Dark mode background is
  a **lighter gray (`#333`), never pure black** — this is a standing rule
  for every future scene, not just this one.
- **Brand logos**: real brand-colored inline SVG (not generic icon-font
  glyphs) for every named tool — Pendo (pink `#FF4A7D`), Google Analytics
  (yellow/orange), Mixpanel (purple `#7856FF`), Maze (dark purple), Figma
  (real 5-color mark), Claude (orange `#D97757`), Replit (orange), GitHub
  (dark), Factory.ai, Qualtrics, Optimal Workshop, Useberry, Zoom. A
  library of these already exists in chat-preview form and should be
  ported verbatim into any new DemoEngine scene that names these tools —
  do not re-derive colors from memory each time, reuse the same SVGs.
- **Motion**: bounce/overshoot easing `cubic-bezier(0.34,1.56,0.64,1)` for
  reveals; movement easing `cubic-bezier(0.65,0,0.35,1)` for cursor/slide
  transitions; simple `ease` only for opacity fades. Text types at
  ~25-32ms/char. Emphasis effects (zoom+shake+glow+circle-annotate) should
  combine on ONE key beat per scene, not spread thin across many beats.
- **Narration voice**: no "I/yo" in on-screen copy — impersonal/
  descriptive framing preferred for UI-embedded text, but the surrounding
  narrative story (in chat, in prose) can use "I build/I ship" for
  Federico's own voice. Tone: direct, confident, a little dry/human — not
  corporate marketing fluff ("Unlock the power of..." is the wrong
  register).

## 4. THE "HOW I WORK" NARRATIVE — CURRENT APPROVED VERSION

This replaced an earlier "Track/Behavior Analytics & Usage" single-step
concept. The current, approved structure is **seven connected beats**,
told like a product-release film, each handing off evidence to the next:

1. **Watch where it breaks** — a user flow (named real pages/features:
   `/plans` → `tier selector` → `/checkout` → `submit`) shown TOGETHER
   with a funnel (bars shrinking at each step), so the two read as one
   diagnosis, not separate reports. Tools: Pendo, GA4, Mixpanel.
2. **Zoom into who struggled** — the funnel's worst bar visually
   resolves into the actual named users behind it (`user_2291`,
   `user_8834`, `user_1027`), each with a distinct color carried through
   the rest of the story. Tools: Pendo, Qualtrics (NPS/CSAT/replay).
3. **Reach them. Hear them.** — research artifacts (interview, survey,
   usability test) appear as physical-feeling cards. Tools: Zoom, Maze,
   Qualtrics, **Claude (AI processes the research volume)**.
4. **Design what they needed** — fidelity progression wireframe → hi-fi →
   prototype, visibly built in sequence. Tools: Figma, Claude.
5. **Watch them use it** (this is the Test stage, reframed as a session
   recording) — a real "recording" UI: REC dot, running timer, a cursor
   moving inside a mini screen, hesitation/retry/complete markers on the
   side. Tools: Maze, Claude (AI flags friction automatically).
6. **Ship it myself** (Deploy) — a terminal-style sequence (`git push` →
   `building…` → `deployed ✓`) then a live URL badge. Explicitly
   emphasizes Federico builds and deploys this himself — no handoff, no
   waiting on someone else. Tools: Replit, Factory.ai, GitHub, Claude.
7. **The hub never sleeps** — live dashboard tiles (adoption %, drop-off
   %, study count) fill in, then an alarm fires ("new drop-off detected")
   with an explicit "↻ back to step one" loop-back cue. This is the
   product Federico builds himself (Factory.ai, Claude Cowork/Code/
   Design, Replit, GitHub) — it is the ENGINE of the loop, not a
   concluding step. Research is constant because the hub's analytics
   never turn off; it is what triggers the next research cycle via an
   alarm, not a fixed schedule.

**Core positioning line (title/hero)**: "I don't wait for a process. I
build the whole loop." (Earlier drafts tried "I don't read dashboards, I
build them" and a generic "Most products ship blind" opener — the loop-
building framing is the one Federico confirmed as correct, because it
captures that he does NOT depend on a pre-existing process or team to
do any of steps 1-7; he builds the infrastructure itself.)

**Rejected directions, so they are not proposed again:**
- A 50/50 split-panel demo layout (UI on one side, text on the other,
  permanently) — felt disconnected from the UI. Replaced with alternating
  full-bleed slides (UI-only beats and text-only beats, crossfading).
- Fake UI checklists for "steps" — replaced with plain text narration.
- Multiple isolated overlapping desktop windows for a "workspace" feel —
  replaced with ONE single shared UI per beat (still supports multiple
  named cursors interacting with it without visually merging).
- Naming the stages "Track/Diagnose/Research/Design/Launch/Governance/
  Behavior Analytics Hub" in various earlier combinations — settled
  instead on the seven-beat cinematic structure above with the specific
  beat names listed in section 4.
- "Governance Hub" and "Behavior Analytics Hub" as the closing stage's
  name — both explicitly rejected (Governance reads as compliance/legal;
  Behavior Analytics repeats stage 1's language). Current framing avoids
  needing a fixed noun-phrase name at all — it's introduced as "the hub I
  built," referred to simply as **The Hub**.

## 5. SKILLS INSTALLED

Six skills exist, generalized for reuse beyond this one project, in TWO
places:
- This repo's `.claude/skills/` (project-scoped)
- Uploaded as Custom Skills in claude.ai Settings → Features (works across
  any chat, not just Claude Code) — Federico has these uploaded already.
- Also recommended (not yet confirmed done): copy the same 6 folders to
  `~/.claude/skills/` on Federico's machine/Codespaces for global reuse
  across every future Claude Code project, not just this repo.

The six: `motion-framework-architect` (extends DemoEngine per project/
platform), `cursor-precision-qa` (catches hardcoded-coordinate bugs),
`motion-graphics-review` (timing/easing/emphasis-density standards),
`narrative-consistency` (checks story matches what Federico actually
described, no invented metrics), `mini-ds-builder` (per-project mini
design-system section), `context-keeper` (maintains this very file plus
PORTFOLIO-CONTEXT.md, PORTFOLIO-SESSION-LOG.md, CLAUDE.md, and resolves
contradictions between them).

## 6. CONTENT RULES (STANDING, NEVER VIOLATE)

- Never invent metrics. Every number in a scene is either a real, CV-
  verified figure (90+ assets, +15% onboarding, -50% task time, $500K, 2
  design systems shipped) or is clearly part of an illustrative/generic
  fictional example (e.g. a "$40/mo → $68/mo" price jump in a made-up
  demo scenario) — never presented as if it were a real, unverified claim
  about Federico's actual client work.
- Tool names used in any scene must match tools Federico has actually
  named as ones he uses (see his CV / earlier PORTFOLIO-CONTEXT.md skills
  section) — never invent a placeholder tool as if it were real.
- English only in case-study/demo content. Spanish stays only for proper
  product names if any (none currently apply to new.html).

## 7. CV / RESUME NOTES

- `resume.html`'s Education section was updated for a background-check
  request from Securitas (a legitimate employer verification, confirmed
  by Federico) to read exactly: "Degree Program in Industrial Design from
  National University of Córdoba (Argentina) in 2020." — this exact
  phrasing matters for the verification and should not be reworded.
- The downloadable CV PDF (`assets/Federico_Monroy_CV.pdf`) is a
  SEPARATE static binary file — editing `resume.html` does NOT update it.
  A clean, ATS-friendly, light-background 2-page PDF version was
  generated and delivered to Federico directly in the earlier session
  (via wkhtmltopdf) with the same Education wording — Federico still
  needs to manually replace the file in the repo with that version if he
  wants the download button to serve the corrected copy.

## 8. WHAT'S PENDING / NOT YET BUILT

- The full seven-beat "How I work" narrative (section 4) exists only as
  an approved, validated chat-preview (built and iterated extensively in
  this conversation) — it has **NOT yet been implemented in new.html**
  via DemoEngine. This is the next concrete build task.
- No project-specific DemoEngine scenes exist yet for Chek, DollarCity,
  Blockchain 3D, Aduanas, or Forecast — each needs its own scene built by
  the `motion-framework-architect` skill once the master "How I work"
  sequence is confirmed live, respecting each project's own typography/
  platform (web vs mobile clay-phone frame) as documented in that skill.
- Challenge mode redesign (an input where a visitor describes their own
  problem and sees it walked through the same seven-beat process) was
  proposed but not yet built.

---

# Portfolio — Master checklist & design system notes

**Last update:** 2026-08-08  
**Owner:** Federico Monroy · FM. portfolio  
**Repo:** `fedemon16i/federico-portfolio`

This file is the single roadmap after the stage / viewport work.  
Download and tick items as you ship. Do **not** skip phases unless noted.

---

## Phase order (do not reorder)

| Phase | Focus | Status |
|-------|--------|--------|
| **0** | Stabilize case stages (EY + BC) | In progress — verify after latest ZIP |
| **1** | Home **Hero** layout | **Priority next** |
| **2** | Home **Bio** content (icons + copy + later `home-photos`) | After hero shell |
| **3** | Polish (motion, a11y, edge viewports) | After 1–2 |
| **4** | Design system page + formal tokens | Parallel docs now · UI page later |
| **5** | Remaining cases (Chek, DollarCity, …) | After system is clear |

---

## Phase 0 — Case stages (EY Fabric · Blockchains)

Principles already agreed:

- [ ] Content width = **EY hero measure** (`--max ≈ 920px`) on **all** sections of the case
- [ ] Player chrome ~**28–32%** · stage the rest (web)
- [ ] **Narrative owns full stage** — no nested dark “title card” that shrinks copy
- [ ] **Prototype phase** = same stage · **uniform scale** so **all UI controls** visible (no inner scroll, no crop mask)
- [ ] Prefer **smaller & complete** over large & clipped (Windows + Chrome bookmarks + taskbar)
- [ ] Mobile: **stable frame**; controls + close always visible
- [ ] Nav never covers modals / stages (`z-index` discipline)

### EY Fabric — verify

- [ ] Hero width still looks as you liked
- [ ] Product Intelligence uses same wrap as hero
- [ ] Measure intro text is full-stage (not a floating mini-card)
- [ ] Prototype beats show full mock UI (features, charts, footers) without scroll inside stage
- [ ] Play / replay / beat pills usable on short Windows viewports

### Blockchains — verify

- [ ] Section widths match EY (~920), not full-bleed desert
- [ ] Demo stage fills content column (not a 420px trap)
- [ ] Text beat = full stage → then device
- [ ] Phone large enough, **entire device** visible via scale
- [ ] Hero 3D / city still runs (do not regress Three.js while fixing CSS)

### Out of scope for Phase 0

- [ ] GSAP rewrite of players — **defer**
- [ ] New Three.js features — **defer** (BC already has 3D)
- [ ] Chek / DollarCity rebuild — Phase 5

---

## Phase 1 — Home Hero (priority)

**Decision:** Bio block becomes a **top hero** (not a fixed left rail).  
Same mental model as mobile · whole page scrolls · no sticky height fight on Windows FHD.

### Layout

- [ ] Remove fixed/sticky left column behavior on web
- [ ] `header.hero-bio` (or equivalent) **above** skills
- [ ] Max width aligned with site measure (same spirit as `--max` 920, or full home grid if home uses a wider shell — **document the choice in code comments**)
- [ ] Grid: photos cluster + identity/actions/stack
- [ ] Mobile: stack photos then identity (no horizontal overflow)

### Photos

- [ ] Photos **fill / stretch** the photo region according to **count** (1 / 2 / 3+ layouts)
- [ ] No empty gaps; object-fit cover; consistent radius
- [ ] Tap/click opens story **modal** (skill-modal language): close button + backdrop + Esc
- [ ] **Later:** source from `home-photos/` + manifest (see Phase 2)

### Actions

- [ ] CV · Email · Projects · How I work — always clickable, never under photos
- [ ] Primary emphasis on CV (or your preferred primary)

### Explicit non-goals in Phase 1

- [ ] Final bio essay copy — Phase 2
- [ ] Loading all GitHub photos — Phase 2
- [ ] Redesign skill cards themselves — only ensure they sit cleanly under hero

---

## Phase 2 — Bio content

### Copy & icons (when building the visible bio)

Icon themes (SVG, **no emoji**):

- [ ] Adventure / outdoor
- [ ] Tech / product
- [ ] 3D / spatial
- [ ] Analytic / measurement
- [ ] Human / facilitation / research empathy
- [ ] Optional: craft / industrial design roots

- [ ] Short lines under or beside icons (scannable for leads / heads of design)
- [ ] Tone: concrete, product-led, same voice as case narratives

### `home-photos/` (do at end of Phase 2)

Folder: `https://github.com/fedemon16i/federico-portfolio/tree/main/home-photos`

- [ ] Upload best photos there
- [ ] Add `bio.md` (or `README.md`) in that folder as source of truth for long bio
- [ ] Wire hero/modal to read list of images (manifest JSON or convention)
- [ ] Fallback if images missing (initials / gradient tiles)

---

## Phase 3 — Polish

- [ ] Windows FHD + 125%/150% scaling: hero + one skill modal + EY stage + BC demo
- [ ] macOS: confirm generous but not sparse stages
- [ ] `prefers-reduced-motion`: typewriter and autoplay degrade safely
- [ ] Light / dark: stage canvas, chips, hero photos contrast
- [ ] Keyboard: modal close, beat next/prev where applicable
- [ ] No horizontal overflow any breakpoint
- [ ] Nav hide-on-scroll-down does not fight open modals

---

## Phase 4 — Design system (document now · page grows)

The design system must define **how project pages look**, not only colors.

### 4.1 Principles (locked so far)

1. **Stage language** (from Home skill modals) is the case-page standard  
2. **Descalar ≠ máscara** — full UI visible via uniform scale  
3. **Narrative full stage → prototype same stage**  
4. **One content measure** (~920) for cases; hero EY is the reference  
5. **No emoji** in UI chrome  
6. **Tool chips** with real colors / logos where stack is shown  
7. **Mac excellent · Windows at least complete**  
8. Home identity = **hero**, not sticky rail (Phase 1 decision)

### 4.2 Project page — allowed section types

Use only what the story needs; order can vary, names stay stable:

| Section type | Role |
|--------------|------|
| **Hero** | Title, one-liner, stack chips, optional metric strip / canvas |
| **Problem** | Stakes · users · constraint (narrative, not AI-slop cards) |
| **Context / Job** | What was owned · for whom |
| **Player / Intelligence / Flow** | Skill-modal stage: beats + full-stage narrative + scaled prototype |
| **Process** | Method beats (research → design → build → measure) if not inside player |
| **Outcomes** | Numbers / decisions — prefer strip or integrated hero metrics over generic cards |
| **Design system (optional)** | Mini tokens for that product — accordion OK |
| **Next / prev project** | Same chrome as other cases |

### 4.3 Component groups

**Navigation**

- Top nav (shared) · project dropdown · breadcrumbs (subtle, not on Home) · theme toggle  

**Identity (Home)**

- Hero bio · photo mosaic · action pills · stack icons · story modal  

**Skill system (Home)**

- Skill cards · skill modal stage · beat pills · play/replay · tool chips in metabar  

**Case chrome**

- Section label · display title · lede · wrap  

**Player**

- Split chrome/stage · beat list · progress · stage canvas · narrative phase · prototype phase · arrows · caption bar  

**Data / trust**

- Metric strip (marquee or static) · tool chips · disclaimer (legal, non-slop)  

**Media**

- Device frame (phone proportions) · UI mock windows · optional Three canvas (BC)  

**Motion tokens (document values in code)**

- Spring / elastic for cards and chips (match Home)  
- Typewriter speeds for narrative  
- Stage crossfade durations  
- Scroll-trigger: play when visible, pause when off-screen  

### 4.4 Animation inventory (everything that moves)

Track per surface; polish in Phase 3:

**Home**

- [ ] Skill card hover / press  
- [ ] Skill modal open/close  
- [ ] Beat narrative typewriter  
- [ ] Prototype steps inside skill stage  
- [ ] Tool chip tooltips  
- [ ] Photo hover · story modal  
- [ ] Hero stack chips  
- [ ] Nav dropdown  

**EY Fabric**

- [ ] Hero metric strip  
- [ ] PI beat narrative  
- [ ] PI prototype UI (measure → hub)  
- [ ] Cursor/tap demos inside stage  
- [ ] Section enter (if any)  

**Blockchains**

- [ ] Hero city / 3D  
- [ ] Demo text phase  
- [ ] Phone UI steps (onboard → place → media → visitor)  
- [ ] Process beats (if separate from demo)  

**Global**

- [ ] Theme toggle  
- [ ] Button / pill hover  
- [ ] Page transition: none or minimal (avoid gimmicks)  

### 4.5 Design system page (UI)

- [ ] Tokens: color, type scale (fluid clamp), space, radius, motion  
- [ ] Component gallery: chips, pills, player chrome, skill card, device frame  
- [ ] Do / don’t: nested narrative cards, full-bleed stages, emoji, inner scroll in mocks  
- [ ] Link to this markdown from the page footer or “Principles” block  

---

## Phase 5 — Next cases

- [ ] Chek — apply section types + player principle; credit-card hero motion kept subtle  
- [ ] DollarCity / Forecast / Customs — same shell; content from existing research  
- [ ] Projects index cards = same vivid identity as Home project cards  

---

## Explicit deferrals (do not start in Phases 0–2)

| Item | Why defer |
|------|-----------|
| GSAP migration | Risk to working players; layout first |
| New Three.js features | BC already has 3D; CSS stage bugs first |
| Atomic rewrite of all HTML | Ship hero + stage fixes before abstraction |
| Perfect pixel match Mac/Win | Completeness > identical scale |

---

## Definition of done (near-term)

**Phase 1 done when:**

- Home hero is top-of-page on web and mobile  
- Photos fill the photo region without overlapping actions  
- Skills start below; no fixed left rail  
- Story opens in a closable modal on mobile  

**Phase 0 done when:**

- EY + BC stages match skill-modal language at ~920 width  
- No mini title-card; no microscopic phone  

**Phase 2 done when:**

- Bio icons + short copy live in hero  
- Plan for `home-photos/` documented; wiring can follow upload  

---

## File map (working)

```
index.html                 → Hero + skills + project cards
projects/ey-fabric.html    → Case shell + PI player
projects/blockchain.html   → Case shell + demo player + 3D hero
projects/chek.html         → Later
projects.html              → Index cards
design-system.html         → Grows in Phase 4
home-photos/               → Photos + bio.md (Phase 2 end)
DESIGN-PRINCIPLE-stage-language.md
CHECKLIST-viewport-fit.md
PORTFOLIO-MASTER-CHECKLIST.md  ← this file
```

---

## Next action

1. Verify Phase 0 on EY + BC with the latest stage ZIP  
2. Implement **Phase 1 Home Hero** only  
3. Then Phase 2 bio icons/copy  
4. Polish + design system page  

Tick boxes in your local copy as you go.


## Session note 2026-08-08

Applied in code (pending your visual QA):

- EY `.page` max-width **920** (was 1100)
- EY stage: text full stage → UI as window → **capbar blur**
- BC demo/process: **30% / 70%** split inside 920 wrap
- BC hero eyebrow: **overflow visible** (uncrop title)
- BC phone: **9/19.5** sizing script

**You evaluate next.** Then Phase 1 Home Hero.

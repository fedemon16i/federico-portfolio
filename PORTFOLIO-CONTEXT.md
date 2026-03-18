# PORTFOLIO CONTEXT — Federico A. Monroy
> This document is the single source of truth for Claude Code and Claude chat sessions.
> Read this before making ANY change to the portfolio.
> Last updated: March 2026

---

## 1. WHO IS FEDERICO

**Full name:** Federico A. Monroy (35)
**Role:** Sr. UX Strategist & Product Designer · Behavioral Analytics
**Location:** Córdoba, Argentina
**Email:** fedemon16i@gmail.com
**Portfolio URL:** https://fedemon16i.github.io/federico-portfolio
**Languages:** Spanish (Native), English (C2)

### Voice & positioning
- Builds research, analytics, and testing frameworks tailored to each company's stack
- Bridge between design, engineering, and product
- Instruments interfaces with custom event tracking (Pendo, GA4), synthesizes behavioral + qualitative data
- Deeply involved in product decisions, not just deliverables
- Uses AI tools actively: Figma AI, Figma Make, Claude, Copilot Studio, v0, Bolt
- Does NOT wait for a perfect process — builds the framework from what exists

### Core tools (always include in project pages and cards)
**Primary:** Figma, Pendo, Maze, Qualtrics, Dynamics, AI Tools
**Secondary:** Useberry, Miro, FigJam, Google Analytics, Jira, Confluence

---

## 2. REPO STRUCTURE

```
federico-portfolio/
├── index.html              ← Main portfolio page (project cards)
├── resume.html             ← Resume page (dark/light toggle, default light)
├── css/
│   └── shared.css          ← Global styles, design tokens, component rules
├── js/
│   └── main.js             ← Carousel, mobile menu, lightbox, tag tooltips
├── projects/
│   ├── chek.html           ← Chek case study
│   ├── dollarcity.html     ← DollarCity case study
│   ├── ey.html             ← EY/Fabric case study (in progress)
│   └── forecast.html       ← Forecast case study (NEW — replaces taxsynapse)
├── chek/                   ← Chek image assets
│   ├── IMG_0187.jpeg       ← Hero background
│   ├── IMG_0188–0192.jpeg  ← Hi-fi screens
│   └── IMG_0193–0194.jpeg  ← Design system screenshots
├── dollarcity/             ← DollarCity image assets
│   ├── IMG_0218.jpeg       ← Hero + card cover
│   ├── IMG_0216.jpeg       ← Video Investigation prototype screenshot
│   ├── IMG_0231.jpeg       ← POS Search wireframe flow
│   ├── IMG_0230.jpeg       ← Video Investigation wireframe flow
│   ├── User_Persona.png    ← Elisa Fernandez persona (reference only)
│   ├── REVIEWER.png        ← Reviewer journey map
│   ├── SENIOR.png          ← Senior journey map
│   ├── Proposal.png        ← 3-pillar proposal framework
│   ├── Findings.png        ← Early findings document
│   ├── Best_Improvements.png
│   ├── Goals.png
│   └── Types_of_users.png
├── forecast/               ← Forecast image assets (to be added)
└── CLAUDE.md               ← Claude Code rules (read first, always)
```

---

## 3. GIT WORKFLOW — CRITICAL

- GitHub Pages **blocks direct push to main**
- Claude Code ALWAYS creates a new branch with a unique name
- After Claude Code finishes → go to `github.com/fedemon16i/federico-portfolio/pulls` → merge PR → 2 min deploy
- Auto-delete branches is ON in repo settings
- CLAUDE.md must always contain: "Always push to a new branch with a unique name. Never reuse existing branches. After committing run: git push origin HEAD"

---

## 4. DESIGN SYSTEM

### Color tokens (CSS variables in shared.css)
```css
--accent: #15803d;          /* Green — primary accent */
--accent-dim: rgba(21,128,61,0.12);
--accent-light: #22c55e;
--yellow: #f4c842;          /* ONLY for eyebrow labels and stat values */
--bg: #0c0c0c;
--bg-surface: #161616;
--bg-card: #1c1c1c;
--text-primary: #f0f0f0;
--text-secondary: #a0a0a0;
--text-tertiary: #606060;
--border: rgba(255,255,255,0.08);
--space-8: 8px; --space-12: 12px; --space-16: 16px; --space-20: 20px;
--space-24: 24px; --space-32: 32px; --space-40: 40px; --space-48: 48px; --space-64: 64px;
```

### Light mode (resume.html only so far)
```css
--bg: #f8f8f6; --bg-surface: #ffffff; --bg-card: #f0f0ee;
--text-primary: #111111; --text-secondary: #555555;
```

### Typography
- Font: `DM Sans` (Google Fonts) — main
- Mono: `DM Mono` — stats, code, meta labels
- Headings: font-weight 700, letter-spacing -0.03em
- Body: font-size 0.9–0.95rem, line-height 1.65–1.75
- Eyebrow labels: 0.65rem, uppercase, letter-spacing 0.12em, color var(--accent)
- NEVER use font-weight below 400 for body text (accessibility)
- NEVER use font-size below 0.72rem for any visible label

---

## 5. TAG / CHIP SYSTEM (global)

Two types, always in ONE unified row. Never a separate "TOOLS" label.

```css
.tag-chip { display:inline-flex; align-items:center; gap:6px; font-size:0.75rem;
  font-weight:500; border-radius:100px; padding:5px 12px; border:1px solid; }
.tag-thematic { background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.08);
  color:var(--text-secondary); } /* NO icon — describes what the project IS */
.tag-tool { background:rgba(255,255,255,0.10); border-color:rgba(255,255,255,0.16);
  color:var(--text-tertiary); } /* WITH 14px SVG icon — describes tools/methods */
```

### Tool icons (inline SVG, always embedded)
- **Figma/FigJam:** multicolor 5-shape logo SVG
- **Pendo:** pink circle with white "P"
- **Maze:** purple rect with cross
- **Miro:** yellow rect with dark "M"
- **Qualtrics:** blue rect with white "Q"
- **Useberry:** dark circle with play triangle
- **Dynamics/Microsoft:** 4-color MS squares
- **Google Analytics:** 3-bar ascending chart
- **AI Tools:** sparkle/sun SVG (stroke currentColor)
- **Contextual Inquiry:** users/people SVG
- **Heuristic Audit:** search+plus SVG

### Where tags appear
- **index.html cards:** thematic chips ON the image, tool chips BELOW the image (with icons)
- **project page heroes:** both types in one `.hero-tags` row (thematic darker, tools greyer)
- **resume.html:** tool chips in skills grid

---

## 6. CARD SYSTEM (index.html)

### Card structure
```html
<div class="project-card" data-carousel="img1,img2,img3">
  <div class="card-image-wrap">
    <img src="cover.jpg" class="card-cover">
    <!-- thematic tags on image -->
    <div class="card-tags-image">
      <span class="tag-chip tag-thematic">UX Research</span>
    </div>
    <!-- carousel dots -->
  </div>
  <div class="card-body">
    <h3 class="card-title">Project Name</h3>
    <p class="card-desc">One sentence impact statement.</p>
    <!-- tool chips below image -->
    <div class="card-tags-tools">
      <span class="tag-chip tag-tool">[icon] Figma</span>
    </div>
    <!-- metadata row: IMPACT / OWNED -->
  </div>
</div>
```

### Carousel behavior
- Desktop hover: cycles every 1.8s with glass blur overlay
- Mobile: swipe with dots, left/right arrows
- `data-carousel` = comma-separated image paths

### Card images by project
| Project | Cover | Carousel images |
|---|---|---|
| Chek | chek/IMG_0187.jpeg | IMG_0187–0194 |
| DollarCity | dollarcity/IMG_0218.jpeg | IMG_0218, IMG_0216, Findings.png, Best_Improvements.png |
| Forecast | forecast/[hero].jpeg | TBD |
| EY | TBD | TBD |

### No project dates on cards — removed globally

---

## 7. PROJECT PAGE STRUCTURE

### Standard narrative order (established in dollarcity.html)
1. **Hero** — title, subtitle, tool chips (discrete, no "TOOLS" label), stats row
2. **Problem Panel** — yellow left border, "THE PROBLEM" eyebrow
3. **Problem Flow Diagram** — CSS-only BEFORE/AFTER (red → green), no images
4. **Impact Strip** — 3–4 stat cells in yellow
5. **Research Goals** — 5 KPI cards
6. **Research Navigator** — arrow nav + tab pills, 4 panels (see §8)
7. **What We Found** — friction pattern cards (red left border)
8. **Proposal** — 3-pillar CSS cards
9. **Wireframes** — 2-col image grid with lightbox
10. **Design Decisions** — 3 key decisions
11. **Prototypes** — glass cards with play button, open in new tab
12. **Tools** — NOT a separate section; always in hero as chips

### Hero pattern
```css
/* Dual gradient over hero image */
background: linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 45%, rgba(10,10,10,0.4) 100%),
            linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, #0c0c0c 90%),
            url('../[project]/[hero-image].jpeg');
background-position: right center;
backdrop-filter: blur(2px);
```

### Problem flow diagram (CSS only — no images)
```html
<!-- BEFORE row: red left border, fragmented steps with arrows -->
<!-- AFTER row: green left border, unified solution steps -->
<!-- Classes: .friction-diagram .friction-row .friction-step .friction-arrow-wrap -->
```

---

## 8. RESEARCH NAVIGATOR PATTERN

Used in dollarcity.html. Use for ANY project with multiple research phases.

```html
<section class="project-section research-section">
  <!-- Tab pills — always visible, show all panel names -->
  <div class="rp-tabs">
    <button class="rp-tab rp-tab--active" onclick="showPanel(0)">Methodology</button>
    <button class="rp-tab" onclick="showPanel(1)">User Types</button>
    <button class="rp-tab" onclick="showPanel(2)">User Persona</button>
    <button class="rp-tab" onclick="showPanel(3)">Journey Maps</button>
  </div>
  <!-- Arrow nav + counter -->
  <div class="rp-nav">
    <button class="rp-prev">←</button>
    <span class="rp-counter">1 / 4</span>
    <button class="rp-next">→</button>
  </div>
  <!-- Panels -->
  <div class="rp-panel" data-label="Methodology">...</div>
  <div class="rp-panel" data-label="User Types" style="display:none">...</div>
</section>
```

### Tab styles
```css
.rp-tab { padding:8px 16px; border-radius:100px; border:1px solid rgba(255,255,255,0.1);
  color:var(--text-tertiary); background:transparent; cursor:pointer; }
.rp-tab--active { background:var(--accent-dim); border-color:var(--accent);
  color:var(--accent); font-weight:700; }
```

### JS pattern (DOMContentLoaded IIFE)
- show(n): hides all panels, shows panel[n], updates tab active classes + counter
- Keyboard: ArrowLeft/ArrowRight
- Tabs AND arrows both call show(n)
- Lightbox: single event delegation — never forEach on hidden panels

---

## 8B. ENCAPSULATED TAB NAVIGATOR — Standard Component

Replaces: pill nav + scroll, arrow prev/next nav, any multi-panel pattern.
Use when: a project section has 3–6 sub-sections that benefit from contained navigation.

### HTML structure
```html
<div class="enc-nav" role="tablist" aria-label="[Section name]">
  <button class="enc-tab enc-tab--active" role="tab" aria-selected="true"
     aria-controls="enc-panel-1" id="enc-tab-1" onclick="encShow(this,'enc-panel-1','enc-[id]')">
    Tab Label
  </button>
  <!-- repeat for each tab -->
</div>
<div class="enc-panels" id="enc-[id]">
  <div class="enc-panel enc-panel--active" role="tabpanel"
     id="enc-panel-1" aria-labelledby="enc-tab-1">
    <!-- content -->
  </div>
  <!-- repeat for each panel -->
</div>
```

### CSS classes (add to shared.css, used globally)
- `.enc-nav` — tab row
- `.enc-tab` — individual tab button
- `.enc-tab--active` — active state
- `.enc-panels` — container for all panels
- `.enc-panel` — individual panel (hidden by default)
- `.enc-panel--active` — visible panel

### JS (one shared function, add to main.js)
```javascript
function encShow(tabEl, panelId, groupId) { ... }
```

### Keyboard: ArrowLeft/ArrowRight navigate tabs, Enter/Space activates.
### Mobile: tabs scroll horizontally, panels stack.
### Interaction hint: `.enc-hint` appears on load, hides after first tab click.

---

## 9. UNIVERSAL LAYOUT & SYMMETRY RULES

### Card grids (ALWAYS auto-fit — never fixed columns)
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--col-min, 200px), 1fr));
  gap: var(--space-24);
  align-items: stretch;
}
```
5 cards → 3+2 automatically. Last row fills. Never orphaned narrow cards.

### Card internal layout (Figma vertical Auto Layout equivalent)
```css
.card { display:flex; flex-direction:column; gap:var(--space-12); padding:var(--space-20); }
/* icon: flex-shrink:0 | body: flex-grow:1 | footer/CTA: margin-top:auto */
```

### Padding rules (no exceptions)
- All cards/boxes/panels: `padding: var(--space-20)` minimum, ALL 4 sides equally
- Left-border accent cards: `padding-left: var(--space-20)` on inner content
- Tables: `td, th { padding: 14px 20px; line-height: 1.6; vertical-align: top; }`
- Never shorthand that gives less vertical than horizontal padding

### Text overflow
- Never clip content — use `min-height:0; overflow:visible` on components
- Long text in constrained containers: use `.scrollable-content` with mask gradient teaser
- `body, main, section, .container { overflow-x: hidden; max-width: 100%; }`

### Mobile (below 768px)
- All grids: single column
- Padding reduces to `var(--space-16)` — never to 0
- Card images: `height:200px; object-fit:cover; display:block`
- No horizontal scroll at any viewport

### Accessibility
- All interactive elements: `min 44x44px` touch target
- Focus-visible: `outline: 2px solid var(--accent); outline-offset: 3px`
- Color contrast: minimum 4.5:1 for text on dark bg
- Reduced motion: all transitions/animations wrapped in `@media (prefers-reduced-motion: no-preference)`
- Images: always `alt` text. Decorative: `alt=""`

---

## 10. CURRENT PROJECTS STATUS

### Chek ✅ COMPLETE
- Virtual credit card app, South America (acquired by Banco Ripley)
- Hero: `chek/IMG_0187.jpeg`
- Key sections: SERFINSA flow diagram (CSS), hi-fi masonry gallery, DS gallery, lightbox
- Metrics: 15% onboarding increase, event-tracking funnels, design system 10+ features

### DollarCity ✅ COMPLETE (latest work)
- Fraud monitoring SaaS, DollarCity × Dollarama (Canada & LATAM)
- Hero: `dollarcity/IMG_0218.jpeg`
- Accent colors: yellow `#f4c842` (stats only), green `#15803d`
- Full research navigator (4 panels: Methodology, User Types, CSS Persona, Journey Maps)
- CSS Persona: Elisa Fernandez — built entirely in CSS, no image
- What We Found: 5 friction cards (red border) + 2 extended cards
- Wireframes: IMG_0231.jpeg (POS Search), IMG_0230.jpeg (Video Investigation)
- Prototypes: Figma Make links open in new tab (iframes blocked by X-Frame-Options)
- Metrics: 50% task time reduction, 3 new personas

### EY / Fabric 🔄 IN PROGRESS
- Ernst & Young Internal Developer Portal
- Add Qualtrics to tools (missing)
- Hero image: TBD
- Focus: behavioral analytics, Pendo instrumentation, custom events, session replay

### Forecast 🆕 NEW (replaces Taxsynapse everywhere in portfolio)
- From Applaudo Studios
- Images go in `/forecast/` folder
- Replaces Taxsynapse card in index.html
- Gets its own `projects/forecast.html`
- In CV: replaces Gospeltruth entry

### Taxsynapse ❌ REMOVED from portfolio
- Still mentioned in CV (Mar 2021–Oct 2022)
- NOT a portfolio case study anymore

---

## 11. LIGHTBOX PATTERN

Single event delegation — never forEach on elements (breaks on hidden panels):
```javascript
document.addEventListener('click', function(e) {
  const img = e.target.closest('.rp-panel img, .wf-img, .hifi-card img, [data-lightbox]');
  if(img) openLightbox(img.src, img.alt);
});

function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  if(!lb || !lbImg) return;
  lbImg.src = src; lbImg.alt = alt || '';
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
```
Lightbox HTML (before `</body>`):
```html
<div id="lightbox" style="position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9000;display:none;align-items:center;justify-content:center;cursor:zoom-out">
  <img id="lightbox-img" style="max-height:90vh;max-width:90vw;border-radius:8px;object-fit:contain">
</div>
```

---

## 12. PROTOTYPE CARDS PATTERN

```html
<div class="proto-card" style="background:rgba(255,255,255,0.04);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden">
  <div style="position:relative;height:260px">
    <img src="../[project]/[screenshot].jpeg" style="width:100%;height:100%;object-fit:cover;object-position:top">
    <!-- Play button overlay -->
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;border-radius:50%;background:rgba(21,128,61,0.9);display:flex;align-items:center;justify-content:center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
    </div>
  </div>
  <div style="padding:var(--space-20)">
    <h4>[Prototype Name]</h4>
    <a href="[figma-make-url]" target="_blank" rel="noopener">Open Prototype ↗</a>
  </div>
</div>
```
**Figma Make URLs (iframes blocked — always open in new tab):**
- Video Investigation: `https://www.figma.com/make/uzX7hk96o4Atu63S6UUj7O/Video-Investigation-Prototype?fullscreen=1`
- POS Search: `https://www.figma.com/make/mzkWR6NCwOdKu8PaGwsc2l/POS-Search-Prototype?fullscreen=1`

---

## 13. RESUME PAGE (resume.html)

- Default: **light mode** (`data-theme="light"` on `<html>`)
- Dark/light toggle button in nav (top right) with sun/moon icon
- Download button → `CV_Federico_Monroy_UX_Strategist.pdf`
- Tool chips in skills grid have inline SVG brand icons
- Stat metrics: `<span class="stat-pill">50%</span>` — green pill
- Education: Bachelor highlighted separately with green left border (more valuable than certs)
- Page break in .docx before Applaudo section (prevents content splitting across pages)

---

## 14. MOBILE NAV

- Hamburger → opens `.nav-mobile` panel: `position:fixed; inset:0; height:100dvh; overflow-y:auto`
- X close button inside panel: `position:absolute; top:16px; right:16px`
- Links: Home, DollarCity, Chek, Forecast, EY, Resume

---

## 15. KNOWN CLAUDE CODE BEHAVIORS (avoid these bugs)

| Bug | Fix |
|---|---|
| Adds new sections without removing old ones | Always include explicit DELETE instructions |
| lightbox forEach fails on hidden panels | Always use event delegation |
| iframes from Figma Make blocked | Screenshot + external link only |
| Reuses old branch names | Auto-delete branches ON in repo settings |
| padding shorthand gives less vertical | Always use 4-value or symmetric shorthand |
| Fixed height clips content | Use min-height as floor, never fixed height on cards |
| Last row cards narrow/orphaned | Use auto-fit minmax grid, never fixed columns |

---

## 16. SKILLS AVAILABLE (Claude reads these automatically)

Skills are in `/mnt/skills/public/` and `/mnt/skills/examples/`:
- `docx/SKILL.md` — Word document generation
- `pdf/SKILL.md` — PDF creation and manipulation  
- `pptx/SKILL.md` — PowerPoint generation
- `xlsx/SKILL.md` — Spreadsheet generation
- `frontend-design/SKILL.md` — Production-grade UI, bold aesthetic direction
- `skill-creator/SKILL.md` — Create/modify skills

User skills referenced in conversations:
- `ux-case-study` — UX portfolio case study structure and narrative
- `ux-storytelling` — Compelling UX narratives for portfolio
- `behavioral-analytics` — Analytics frameworks, Pendo/Mixpanel patterns
- `design-system-discipline` — CSS tokens, component consistency
- `mobile-first-resilience` — Mobile layout patterns, no overflow
- `accessibility-standards` — WCAG 2.2 AA, focus, contrast

---

## 17. CONTENT RULES

- **No project dates** on cards or project page headers (removed globally)
- **No "TOOLS" label** — chips are inline in hero, no separate section
- **Text reduction rule:** if a section has a heading + body + graphic → max 1 sentence of body text
- **English only** in all case study content (Spanish stays only for proper product names: Pago Mínimo, Fecha de Facturación, etc.)
- **No fabricated metrics** — only use numbers confirmed by Federico
- **Placeholders** if info is missing: `[PLACEHOLDER: metric TBD]`

---

## 18. SECTION SPACING STANDARDS

```css
.project-section { margin-bottom: var(--space-64); }
.project-section h2 { margin-bottom: var(--space-24); }
eyebrow label { margin-bottom: var(--space-8); }
nested subsections { margin-bottom: var(--space-40); }
```

---

*End of PORTFOLIO-CONTEXT.md*
*When in doubt: check this doc first, then CLAUDE.md in the repo.*

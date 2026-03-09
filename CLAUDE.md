Federico Monroy — Portfolio
Stack
Pure HTML + CSS + Vanilla JS. No frameworks. No build step.


## CRITICAL — Git rules
Always push directly to main. Never create a branch. Never create a PR.
Use: git add -A && git commit -m "..." && git push origin main

assets/shared.css — design system (CSS variables, all components)
assets/main.js — nav dropdown, keyboard nav, mobile menu, scroll animations
Fonts: Syne (display) + DM Sans (body) via Google Fonts <link>

File Map
/
├── index.html
├── about.html
├── resume.html                  ← PDF embed, asset: assets/Federico_Monroy_CV.pdf
├── contact.html
├── projects/
│   ├── ey-fabric.html           accent: #c8a84b
│   ├── blockchain.html          accent: #22d4c8
│   ├── customs.html             accent: #e05c4a
│   ├── chek.html                accent: #9b6cff
│   ├── dollarcity.html          accent: #f4c842
│   ├── taxsynapse.html          accent: #5fe6a0
│   ├── industrial-design-thesis.html  accent: #8ba8c8
│   ├── depure.html              accent: #8ba8c8
│   └── layer-ey.html            accent: #8ba8c8
└── assets/
    ├── shared.css
    ├── main.js
    ├── Federico_Monroy_CV.pdf
    ├── ASSETS_PLAN.md
    └── images/                  ← project screenshots go here
Image Paths by Project

Chek images: ../chek/IMG_37XX.jpeg
DollarCity images: ../dollarcity/IMG_XXXX.jpeg (when added)

Chek image map

../chek/IMG_3773.jpeg → Hi-Fi annotated screens 1
../chek/IMG_3774.jpeg → Hi-Fi annotated screens 2
../chek/IMG_3775.jpeg → Design System
../chek/IMG_0159.jpeg → Wireframe grid

Chek — images already replaced by coded HTML (never re-add these)

IMG_3769 → replaced by Benchmarking section
IMG_3771 → replaced by HEARTS table
IMG_3772 → replaced by Event Tracking section
IMG_3776 → replaced by Key Learnings section
IMG_3768 → replaced by Research section
IMG_3770 → replaced by Solutions section


Design System — Never Break

Font weight min: 400 body / 600 headers / 700–800 display
NO font-weight: 300 anywhere
All colors via CSS vars — never hardcode hex in HTML inline
Dark only: --bg-base: #0c0c0c
Project accent override per page: :root { --accent: var(--accent-[project]); }
No dark-green-on-dark combos


Accessibility — Non-Negotiable

First child of <body> on every page: <a class="skip-link" href="#main">Skip to main content</a>
Every <img> needs descriptive alt
Nav dropdown: aria-expanded, aria-haspopup, role="menu", role="menuitem"
prefers-reduced-motion handled in shared.css — no inline animations
No overflow-x on body


CSS Conventions
.container            max-width wrapper
.section              padding-block: var(--space-96)
.section-alt          bg: var(--bg-surface)
.section-eyebrow      accent label with line
.project-card         professional grid card (fully clickable)
.personal-tile        image tile (personal grid, hover overlay)
.card-image-placeholder   shimmer placeholder → replace with real <img>
.evidence-placeholder     screenshot placeholder in project pages
.btn .btn-primary .btn-outline .btn-accent
.tag .tag-accent

## CSS Safety Rules

- **NEVER** use `[class*="card"]` for padding, margin, height, or min-height.
  This selector matches every element whose class contains the word "card" —
  including `.card-title`, `.card-hook`, `.card-meta`, `.card-tags`, `.card-tool`.
  Result: all child elements get inflated padding and cards break.
  Always use `.project-card` explicitly for structural rules.

- Before editing `css/shared.css`, list every selector the change will affect.

- After any `shared.css` edit, verify card heights in `index.html` are uniform
  and no child element has inherited unexpected padding or margin.

Nav — Consistent on Every Page
Desktop: logo | Projects (dropdown) | Resume | About | Contact
Dropdown group 1 "Relevant / Professional": EY Fabric, Blockchain, Customs, Chek, DollarCity, TaxSynapse
Dropdown group 2 "Personal / Independent": Industrial Design Thesis, Depure, LayerEY
Mobile: hamburger → full-screen panel

Project Page Structure (universal)

Progress bar (#progress-bar)
Skip link
Nav (identical across all pages, paths: ../assets/, ../index.html)
<header class="project-hero"> — breadcrumb, role badge, eyebrow, title, hook, tags, stat row
<div class="project-content"> — What I Owned → Approach steps → Evidence grid → Tools → Prev/Next nav
Footer


Edit Philosophy — Critical
Always UPDATE, never replace.

Find the existing element and modify it in place
Preserve surrounding HTML structure, classes, IDs
Never delete a section to rewrite it from scratch
If something is missing → insert after the nearest logical sibling
If something is wrong → fix only that element, leave everything else untouched
When in doubt: make the smallest possible change that achieves the goal

Order of operations:

Read the full file first
Identify exactly what needs to change
Make surgical edits only
Verify nothing else broke


Available Libraries (CDN — only add when needed)
html<!-- Animate.css — entrance animations -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

<!-- Iconify — inline icons (200k+) -->
<script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>

<!-- Motion One — scroll & flow animations -->
<script src="https://cdn.jsdelivr.net/npm/motion@10.16.4/dist/motion.js"></script>
Use Iconify: <span class="iconify" data-icon="mdi:phone"></span>
When to use: wireframe icons → Iconify, entrance animations → Animate.css, flow transitions → Motion One, simple transitions → native CSS (preferred).

Wireframe Style Guide
Phone frame: 260px wide, 520px tall, border-radius 36px, border 3px solid #1a1a1a, CSS only — no images inside.
Flow layout: phones side by side on desktop with → arrow, stacked on mobile with ↓ arrow.
Annotations: display:none below 768px.
Educational callouts inside wireframes:

Positive: background:#f0fdf4; border-left:3px solid #16a34a
Warning: background:#fffbeb; border-left:3px solid #d97706
Info: background:#eff6ff; border-left:3px solid #3b82f6


Pages Status

projects/chek.html → active, in progress
projects/dollarcity.html → to be built (accent #f4c842, SaaS fraud platform)
resume.html → PENDING — needs real content, CV PDF exists at assets/Federico_Monroy_CV.pdf
about.html → exists, review needed


Do Not

Add new CSS frameworks or JS libraries (except CDN libs listed above when needed)
Change font families
Add font-weight: 300
Hardcode colors outside CSS variables
Remove ARIA attributes from nav
Break the --accent override pattern in project pages

## UI Symmetry Rules — Apply to ALL components

### Cards & boxes
- min-height on sibling cards: always equal. Use `align-items:stretch` on grid/flex parent.
- padding: minimum var(--space-20) all sides. Text must never touch a border.
- If cards have icons + title + body: use `display:flex; flex-direction:column; gap:var(--space-12)`
- Multi-col card grids: `align-items:stretch` so all cards in a row match height.

### Text inside boxes
- If text risks touching a border: add `padding-left: var(--space-16)` minimum.
- Bullet lists inside cards: `padding-left: var(--space-16); line-height:1.6`
- If a card has fewer bullets than its sibling, add a filler rule or set `justify-content:space-between`

### Tables
- All td/th: `padding: 14px 20px; line-height:1.6`
- No text should start at the cell edge.

### Images in grids
- Sibling images: same height via `height:Xpx; object-fit:cover`
- Never mix fixed-height and auto-height siblings in the same row.

### Spacing between sections
- Every .project-section: `margin-bottom: var(--space-64)`
- Every h2 inside a section: `margin-bottom: var(--space-24)`
- Every eyebrow label: `margin-bottom: var(--space-8)`

### Global rule
- Before finishing any edit, scan for: text touching borders, unequal sibling heights, missing padding, images without consistent height. Fix all before committing.
Replace sections from scratch — always update in place
Re-add images that have been replaced by coded HTML sections

## Universal Layout & Symmetry System

### Core principle
Every component must breathe equally at every size.
If content grows, the container grows. If siblings share a row, they share the same height.
Never clip, never crowd, never orphan.

### Card & box grids — always auto-fit
display: grid;
grid-template-columns: repeat(auto-fit, minmax(var(--col-min, 200px), 1fr));
gap: var(--space-24);
align-items: stretch;
This handles 2, 3, 4, 5, N cards automatically. Last row fills. Never use fixed column counts.

### Card internal structure — always flex column
display: flex; flex-direction: column; gap: var(--space-12); padding: var(--space-20);
Icon/label: flex-shrink:0. Body text: flex-grow:1. Footer/CTA: margin-top:auto.

### Tables
Every th, td: padding: 14px 20px; line-height: 1.6; vertical-align: top;
No cell content should start at the cell edge. Min-width on columns with short labels.
Alternating rows or clear borders — never ambiguous row separation.

### Images in grids
Siblings: same height via height:Xpx; object-fit:cover; object-position:top;
Never mix fixed-height and auto-height siblings in the same row.
Solo images: max-width:100%; height:auto; display:block;

### Typography spacing
h2 inside section: margin-bottom: var(--space-24)
Eyebrow label: margin-bottom: var(--space-8)
Body paragraph after heading: margin-top: 0
Last element inside any box: no bottom margin (let padding handle it)

### Section spacing
Every .project-section: margin-bottom: var(--space-64)
Nested subsections: margin-bottom: var(--space-40)

### Text never touches borders
All boxes: padding minimum var(--space-20) all sides
Left-border accent: padding-left: var(--space-20) on inner content
Bullet lists: padding-left: var(--space-16); line-height: 1.6

### Responsive breakpoints
Below 768px: single column for all grids. Font sizes scale down max 2 steps.
Below 480px: padding reduces to var(--space-16) on cards and sections.
No horizontal scroll at any viewport.

### Pre-commit scan — mandatory
1. Text touching a border → fix

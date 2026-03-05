## CRITICAL — Git rules
Always push directly to main. Never create a branch. Never create a PR.
Use: git add -A && git commit -m "..." && git push origin main

Federico Monroy — Portfolio
Stack
Pure HTML + CSS + Vanilla JS. No frameworks. No build step.

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
Replace sections from scratch — always update in place
Re-add images that have been replaced by coded HTML sections

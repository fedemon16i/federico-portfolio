# Federico Monroy — Portfolio

## Stack
Pure HTML + CSS + Vanilla JS. No frameworks. No build step.
- `assets/shared.css` — design system (CSS variables, all components)
- `assets/main.js` — nav dropdown, keyboard nav, mobile menu, scroll animations
- Fonts: Syne (display) + DM Sans (body) via Google Fonts `<link>`

## File Map
```
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
```

## Design System — Never Break
- Font weight min: 400 body / 600 headers / 700–800 display
- NO font-weight: 300 anywhere
- All colors via CSS vars — never hardcode hex in HTML inline
- Dark only: `--bg-base: #0c0c0c`
- Project accent override per page: `:root { --accent: var(--accent-[project]); }`
- No dark-green-on-dark combos

## Accessibility — Non-Negotiable
- First child of `<body>` on every page: `<a class="skip-link" href="#main">Skip to main content</a>`
- Every `<img>` needs descriptive `alt`
- Nav dropdown: `aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`
- `prefers-reduced-motion` handled in shared.css — no inline animations
- No `overflow-x` on body

## CSS Conventions
```
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
```

## Nav — Consistent on Every Page
Desktop: logo | Projects (dropdown) | Resume | About | Contact
Dropdown group 1 "Relevant / Professional": EY Fabric, Blockchain, Customs, Chek, DollarCity, TaxSynapse
Dropdown group 2 "Personal / Independent": Industrial Design Thesis, Depure, LayerEY
Mobile: hamburger → full-screen panel

## Project Page Structure (universal)
1. Progress bar (`#progress-bar`)
2. Skip link
3. Nav (identical across all pages, paths: `../assets/`, `../index.html`)
4. `<header class="project-hero">` — breadcrumb, role badge, eyebrow, title, hook, tags, stat row
5. `<div class="project-content">` — What I Owned → Approach steps → Evidence grid → Tools → Prev/Next nav
6. Footer

## Do Not
- Add new CSS frameworks or JS libraries
- Change font families
- Add `font-weight: 300`
- Hardcode colors outside CSS variables
- Remove ARIA attributes from nav
- Break the `--accent` override pattern in project pages

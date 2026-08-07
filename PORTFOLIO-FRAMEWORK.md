# Portfolio Framework — checkpoint 2026-08-07

## Resolution target
- Design for **notebook** viewports: effective ~1280–1920 CSS px with OS scaling (125–150%).
- **Content max-width: 920px** (`--max`).
- Stages / skill modals: **max ~560–680px** — never full-bleed.
- Hide scrollbars on `html/body`; avoid horizontal overflow.

## Canonical navbar (all pages)
Same structure everywhere:
`Logo | Home · Projects▾ · Resume · Contact · Design System | Theme | ☰`

- **Projects** is always a button + dropdown (not a different control per page).
- Accent on logo: `--nav-accent` per case (EY gold, BC cyan, Chek violet, default coral).
- Current page: `.active` on link or `.is-current` in dropdown.
- Paths: root uses `projects/*.html`; case pages use sibling names + `../` for root pages.
- Theme: `#themeToggle` + `localStorage.theme` (`light`|`dark`).
- Mobile ≤900px: hamburger + full-screen panel.

## Breadcrumbs
Subtle, under nav: `Home / Projects / Case` — no heavy styling.

## Narrative players (EY / BC / Chek)
- **Start only when the stage is in view** (IntersectionObserver), not on full page load.
- Stage container needs **explicit height** if children are `position: absolute`.
- Never call `getElementById(...).onclick` without a null check — a single throw kills the whole script.

## JS safety rules
1. `var el = document.getElementById('id'); if (el) el.onclick = ...`
2. Prefer one nav script (`CANONICAL_NAV`) — no duplicate handlers.
3. Wrap optional graphics (Three.js city) in `try/catch` so demos still run.

## Design system notes
- No emoji in UI chrome.
- No shadcn-style accent-bar cards on Resume stack — title + chips + note.
- Tool chips: brand color logos when possible.
- Light/dark via `data-theme` on `<html>`.

## Case accents
| Case | Accent |
|------|--------|
| Default / Home | `#d97757` |
| EY Fabric | `#ffe600` |
| Blockchains | `#22d4c8` |
| Chek | `#7a3be0` |

## Files in this checkpoint
- `index.html`, `projects.html`, `contact.html`, `design-system.html`, `resume.html`
- `projects/ey-fabric.html`, `projects/blockchain.html`, `projects/chek.html`
- This doc: `PORTFOLIO-FRAMEWORK.md`


## Atomic components (site-wide)

### Tool chips (`tool-chip ico-only`)
- Source of truth: EY Fabric hero stack + Blockchains hero (same pattern).
- Logo-only square chip + tooltip on tap/hover (`chip-tip`).
- Caption: `.stack-cap` — “Stack used · tap a logo”.

### Role / flow schematic (`.fabric-flow`)
- Used for EY problem: Publishers → Approvers → Consumers.
- Prefer schematic over tabbed “AI card” story panels for context sections.

### Narrative player split (web ≥1024)
- Left: eyebrow, title, lede, step chips, play controls.
- Right: **stage only** (animation surface).

### Job / concept icons (`.scheme-steps`)
- Icon cascade on scroll into view (IntersectionObserver), faster stagger (~120ms).

### About bio (home)
- `.bio` sticky under nav, **no internal scroll** on desktop.
- ≤900px: stacks to mobile (relative, full width).
- **No breadcrumbs on home.**

### Removed from case pages
- Blockchains no longer embeds a Design System section — use `/design-system.html`.


## Motion tokens (Home skills → entire site)
- `--spring: cubic-bezier(.34, 1.32, .64, 1)`
- `--ease: cubic-bezier(.22, 1, .36, 1)`
- Icon stroke uses `--accent` (per-page accent)
- Hover: translateY + scale + accent border + soft glow
- `iconWiggle` on icon hover/active for scheme steps, fabric-flow, skill-adjacent UI
- Tool chips: 36×36, radius 10, tip on tap/hover

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

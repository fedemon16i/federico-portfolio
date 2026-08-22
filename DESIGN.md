# DESIGN.md — Federico Monroy Portfolio

> Drop this file into any AI agent session. The agent reads it and generates UI consistent with this design system without needing additional context.
> Format based on the DESIGN.md standard (VoltAgent/awesome-design-md, 109k stars).

---

## Visual Atmosphere

Dark-first. Minimal. Precise. No decoration without purpose.

The palette is near-black with a warm gold accent (#c8a84b) as the default system color. Each project page overrides the accent to its own brand color. The system never uses gradients at rest — color complexity appears only on hover or interaction.

Motion is physical: anything that grows bounces slightly (spring easing with overshoot). Flat ease-in-out is wrong here. Everything respects `prefers-reduced-motion`.

---

## Color Palette

### Dark mode (default)
| Token | Value | Use |
|-------|-------|-----|
| `--bg-base` | `#0c0c0c` | Page background |
| `--bg-surface` | `#161616` | Alternate sections, section-alt |
| `--bg-raised` | `#1c1c1c` | Cards, modals, raised surfaces |
| `--bg-hover` | `#222222` | Hover state background |
| `--bg-card` | `#1c1c1c` | Card background |
| `--text-primary` | `#f0f0f0` | Body text, headings |
| `--text-secondary` | `#a0a0a0` | Meta, labels, secondary content |
| `--text-tertiary` | `#606060` | Timestamps, disabled, captions |
| `--border-subtle` | `rgba(255,255,255,0.07)` | Hairline dividers |
| `--border-default` | `rgba(255,255,255,0.12)` | Card borders |
| `--border-strong` | `rgba(255,255,255,0.22)` | Focused/active borders |
| `--shadow` | `rgba(0,0,0,0.4)` | Elevation shadow |

### Light mode
| Token | Value |
|-------|-------|
| `--bg-base` | `#f5f5f0` |
| `--bg-surface` | `#ebebeb` |
| `--bg-card` | `#ffffff` |
| `--text-primary` | `#111111` |
| `--text-secondary` | `#555555` |
| `--accent` (light) | `#7a6020` (darker gold for contrast) |

### Accent system
Default accent: **`#c8a84b`** (warm gold). Each project page overrides this at `:root` level:

| Project | Accent |
|---------|--------|
| EY Fabric | `#c8a84b` (gold) |
| Blockchain 3D | `#22d4c8` (cyan) |
| Customs ES | `#e05c4a` (coral) |
| Chek | `#9b6cff` (violet) |
| DollarCity | `#16a34a` (green) |
| Forecast | `#5b9bd0` (blue) |

`--accent-dim` is always `rgba(accent, 0.12–0.15)` — used for subtle fills, chip backgrounds.

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / Hero | Space Grotesk | 700–800 | clamp or 3–5rem |
| Section headings | Space Grotesk | 600–700 | 1.5–2.5rem |
| Body | DM Sans | 400 | 1rem / 1.65 line-height |
| Labels / Eyebrows | DM Sans | 600 | 0.75–0.875rem uppercase + letter-spacing |
| UI / Buttons | DM Sans | 500–600 | 0.875–1rem |

**Minimum weight: 400 body / 600 headers / 700–800 display. font-weight: 300 is never used.**

---

## Component Patterns

### Buttons
```
.btn             base button
.btn-primary     filled with --accent
.btn-outline     border: 1px solid --accent, transparent fill
.btn-accent      accent background, dark text
```
All buttons: border-radius `--radius-md` (12px), padding `var(--space-12) var(--space-24)`, font-weight 600.

### Cards
```
.project-card    fully clickable professional card (a > div pattern)
```
Cards: bg `--bg-raised`, border `1px solid --border-default`, radius `--radius-lg` (18px).
**At rest: solid color only. Gradient + glow appear only on hover.** Hover transition uses `--spring`.

### Tags / Chips
```
.tag             neutral chip
.tag-accent      accent-colored chip
.card-tool       tool chip with real inline logo (never generic icon)
```

### Sections
```
.section         padding-block: var(--space-96)
.section-alt     bg: var(--bg-surface)
.section-eyebrow accent label with decorative line before heading
.container       max-width 1024px, centered
```

### Navigation
Desktop: logo | Home | Projects (dropdown) | Design System | Resume | About | Contact.
Dropdown: EY Fabric, Blockchain 3D, Chek, DollarCity, Customs ES, Forecast.
Mobile: hamburger → full-screen panel.
Nav height: 64px. Nav bg: `--nav-bg` (translucent blur).

---

## Motion System

**The spring curve:** `cubic-bezier(.34,1.32,.64,1)` — always has overshoot. Stored as `--spring`.

| Situation | Easing | Duration |
|-----------|--------|----------|
| Anything that grows (cards, panels, modals) | `--spring` | 250–350ms |
| Fade in/out | `ease` | 150–250ms |
| Color change | `ease` | 150ms |
| Reduced motion | skip all | 0.01ms |

**Hover debounce rule:** any hover that changes layout size gets a ~70ms `pointerleave` debounce. Prevents cascading enter/leave when the layout shift moves the cursor.

Colors at rest are always solid (or very subtle tint). Gradient + glow = hover state only, never default.

---

## Spacing Scale

```
--space-2:  0.125rem   --space-8:  0.5rem    --space-32: 2rem
--space-4:  0.25rem    --space-12: 0.75rem   --space-40: 2.5rem
--space-6:  0.375rem   --space-16: 1rem      --space-48: 3rem
                       --space-20: 1.25rem   --space-64: 4rem
                       --space-24: 1.5rem    --space-80: 5rem
                                             --space-96: 6rem
```

---

## Layout Principles

Grid pattern: `repeat(auto-fit, minmax(var(--col-min, 200px), 1fr))` — never fixed column counts.
Cards internally: `display: flex; flex-direction: column; gap: var(--space-12); padding: var(--space-20)`.
Max width: 1024px (content), 760px (text-only).
**No `overflow-x` on body ever** — breaks sticky sidebar and nav.

---

## Design Guardrails

**Never:**
- `font-weight: 300` anywhere
- Hardcode hex colors outside CSS variables (exception: real brand colors in project logos/accents)
- Gradients as the resting state of a card or button
- Generic icons — use real tool logos (inline SVG or Iconify with specific icon names)
- Emojis in the theme-toggle button (always SVG sun/moon)
- `overflow-x` on `body` or `html`

**Always:**
- First child of `<body>`: `<a class="skip-link" href="#main">Skip to main content</a>`
- Every `<img>` needs a descriptive `alt`
- Nav dropdown: `aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`
- New animations respect `prefers-reduced-motion`
- Cards use `--spring` not flat ease for any size/scale change
- Check `grep` for class name collisions before naming a new component

---

## Responsive Behavior

| Breakpoint | Rule |
|------------|------|
| `< 768px` | All grids to 1 column |
| `< 480px` | Padding reduces to `--space-16`, tables use `10px 14px` |
| Touch | Hover-only features (`pointer:fine` guard) do NOT apply. Mobile must work without them |
| Desktop | Horizontal project strip (intentionally one row) |

Pre-commit scan: 320 / 375 / 768 / 1024 / 1440 / 1920px widths before marking done.

---

## Agent Prompt Templates

### Generate a new page section
```
Using the Federico Monroy portfolio design system (DESIGN.md):
- Section wrapper: class="section" (or "section section-alt" for alternate bg)
- Eyebrow: class="section-eyebrow"
- Grid: repeat(auto-fit, minmax(240px, 1fr)), gap: var(--space-24), align-items: stretch
- Cards: bg --bg-raised, border 1px solid --border-default, radius --radius-lg
- Hover: add glow/gradient only on hover with --spring transition
- No hardcoded colors. No font-weight: 300. No fixed column counts.
```

### Add a new component
```
Before naming this component, grep the CSS for the class name.
Use --spring for any size/scale transition.
If it changes layout on hover, add ~70ms pointerleave debounce.
At rest: solid color. Gradient/glow: hover only.
Verify at 375px and 1440px before shipping.
```

### Debug a visual inconsistency
```
Check in order:
1. Is the color a hardcoded hex? Replace with CSS variable.
2. Is font-weight 300? Remove.
3. Is the animation using flat ease instead of --spring? Fix the curve.
4. Is overflow-x appearing? Check position:fixed + transform combinations.
5. Same class name used twice? Grep the file.
```

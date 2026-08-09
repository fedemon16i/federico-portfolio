# Portfolio — unified norms (locked)

Single source of truth. Older drafts that conflict are void.

**Animations:** keep existing Skills / EY / BC motion. Layout only: stage, fit, window chrome, phone, caption, scale, center.

---

## Table

| # | Topic | Rule |
|---|--------|------|
| 1 | Measure | Content max **920px** · pad `clamp(16px,3vw,28px)` |
| 2 | Nav | Same structure all pages · inner max 920 · Projects `nowrap` · no emoji |
| 3 | Stage | One canvas · explicit height · `overflow:hidden` · stage `padding:0` |
| 4 | Fit | Inset: **16** L/R · **12** top · **52** bottom (caption) |
| 5 | Scale | `s = min(1, fitW/natW, fitH/natH)` · `transform: scale(s)` · origin center |
| 6 | Center | Unit **geometrically centered** in the fit box (flex or grid place-items) |
| 7 | Caption | Flush L/R/bottom · gradient + blur · not solid gray · outside the unit |
| 8 | Window | UI **inside** chrome · ~**400×300 (4∶3)** · never edge-bleed · never under caption · never past top pad |
| 9 | Phone | **9∶19.5** · full device in fit · bottom UI meets device edge |
| 10 | Transport | Icon play/pause/replay · prog **3px** · arrows ~28px @ 55% |
| 11 | Tempo | Fade ~450ms · move ~700ms when touching CSS only |
| 12 | Process | Only grid `44px minmax(0,1fr)` · do not rewrite player |
| 13 | Save motion | Do not replace skill/EY/BC inner animations |
| 14 | Forbidden | Stacked motor CSS · transform on skill internals · text-phase max-width on layer · empty absolute grid stage |

---

## Container model (detail)

```
┌──────── stage (canvas, padding 0) ────────┐
│  ┌────── fit (inset 16 / 12 / 52) ──────┐ │
│  │                                      │ │
│  │     ┌──── unit (window|phone) ────┐  │ │
│  │     │  centered in fit            │  │ │
│  │     │  scale(s) if needed         │  │ │
│  │     └─────────────────────────────┘  │ │
│  └──────────────────────────────────────┘ │
│  ════════ caption blur (flush bottom) ════ │
└───────────────────────────────────────────┘
```

### Centering
- Fit is a **centering box**: `display: flex; align-items: center; justify-content: center` **or** `display: grid; place-items: center`
- Unit is a child of fit (after scale), not of the full stage
- Text phase also centers in the same fit geometry (or full stage above caption)

### CSS Grid / Flex notes
- **Stage:** block or relative containing block; not `inset:0` without a height parent
- **Fit:** absolute inset with pads **or** grid area with the same insets
- **Player chrome (side + stage):** `grid-template-columns: minmax(150px,220px) minmax(0,1fr)` · collapse to 1 col ≤800px
- **Process (BC only):** `grid-template-columns: 44px minmax(0,1fr)` · canvas `min-width:0; width:100%`
- Prefer **one** centering method on fit; avoid double absolute centering that fights scale

### Window (N04 clarification)
- EY problem was: mock UI **lost window chrome** and looked “suelto” on the canvas
- **Not** a request for the window to overflow past the top pad or into the caption blur
- Correct: window **fully inside fit** · small air to top and to caption · chrome around the mock

### Phone
- Same fit membership as window
- Avoid empty strip *inside* the device above home indicator; caption stays *outside* the device

### Scale
```
natural sizes fixed → measure fit box → s = min(1, fitW/natW, fitH/natH) → transform scale
```
Prefer complete & smaller over large & clipped.

---

## Save animations (explicit)

| Player | Keep | Fix only if needed |
|--------|------|--------------------|
| Skills | Existing modal animations | Stage height, fit scale, caption |
| EY PI | Existing beat motion | **Re-wrap** mocks in window chrome; fit/center |
| BC Demo | Existing proto sequence | Full phone in fit; no odd empty bottom *inside* phone |

---

## Forbidden (regressions)
1. Multiple stacked global motor override blocks  
2. Transform on skill animation **internals**  
3. `max-width:420px` on text-phase **layer**  
4. Absolute grid stage without height → empty UI  
5. Replacing working inner animations with new mocks  
6. Units under caption or past top pad  

Previews: `previews/N00-index.html` … `N06-transport.html` (N04 corrected).

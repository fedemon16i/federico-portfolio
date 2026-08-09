# Animation motor — current rules

## Unit scale (window + phone)

Fixed natural size. Fit only with:

```
s = min(1, availW/natW, availH/natH)
transform: scale(s)
```

| Unit | Natural | `--r-*` |
|------|---------|---------|
| Window | 400×300 (4∶3) | `--r-window: 12px` |
| Phone | 220px · 9∶19.5 | `--r-phone: 36px` |

Radius/chrome **inside** the unit scale via `transform` (visual radius ≈ `12 × s`).  
Do not shrink layout width while leaving radius fixed in px.

## Stage chrome radii (not inside scaled unit)

```css
--r-stage: clamp(10px, 1.2vw + 8px, 16px);
--r-panel: clamp(12px, 1.4vw + 10px, 20px);
--r-pill: clamp(14px, 1vw + 12px, 100px);
--r-arrow: clamp(14px, 0.8vw + 12px, 28px);
```

Media queries nudge stage/panel on very small or very large viewports. They do **not** replace unit `scale(s)`.

## Caption · text phase · controls · measure

Unchanged: flush caption, full-stage text, row controls + pause, 920px max, `s ≤ 1` on hi-DPI.

## Previews

`R00-index`, `ALL-RULES`, `R01`…`R08`, `R03b-radius-scales`, `R03c-radius-tokens`.

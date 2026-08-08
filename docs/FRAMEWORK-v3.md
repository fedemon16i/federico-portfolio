# Portfolio Framework v3

**Commit to:** `docs/` on `fedemon16i/federico-portfolio`

## One measure (EY ≡ BC)

```css
--fw-max: 920px;
--fw-pad: clamp(16px, 3vw, 28px);
```

Every case section (hero, problem, player, process) uses this column.  
No section may invent its own full-bleed content width.

## One player pattern

| Zone | Rule |
|------|------|
| Chrome | Title, beats, play — ~30% web / full width stacked mobile |
| Stage | Always **visible**; mobile `min-height: ~52dvh` (never collapse to 0) |
| Narrative | Full stage text |
| Prototype | **UI window** on canvas |
| Caption | Gradient + blur only — no solid gray bar |
| Phone | `aspect-ratio: 9/19.5`; size to fit **entire** device in stage |

## Mobile law

```
.pi-split / .demo-split → flex column
.stage / #demoStage → explicit height (not auto/0)
phone → fit(host) keeping ratio
```

## Failures encoded

1. Stage missing on mobile PI → height collapsed  
2. BC demo wider than problem → section escaped measure  
3. Phone clipped → fixed iPhone px size instead of fit-to-host  
4. EY ≠ BC width → different max-width tokens  

## Files

- `projects/ey-fabric.html` — Framework v3 CSS
- `projects/blockchain.html` — Framework v3 CSS + phone fit JS
- This doc + checklist + stage principle

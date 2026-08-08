# Golden rules (QA-backed)

## 1. Content measure
- Max content width **920px**, pad `clamp(16px,3vw,28px)`
- BC has **no** `.page` wrapper — constrain `#hero, #demo, #process, .sec` directly
- EY uses `.page` — children must **not** double-pad

## 2. Nav
- `top-nav-inner` max-width **920**, same as content
- Projects toggle: `white-space: nowrap`

## 3. Stage language (skills ≡ PI ≡ Demo)
- Stage = canvas (grid bg)
- Text phase full stage
- UI = **window** centered on canvas (not edge-bleed)
- Caption = **gradient only**, no solid gray bar
- ~90% of UI visible via scale/fit — **no crop** of controls

## 4. Phone (Demo)
- Aspect **9:19.5**
- Size from stage host (absolute center)
- Never fixed 220×476; never `scale(--fit-s)` fighting size
- Flex parents: `min-height: 0` on phone

## 5. Process Figma canvas
- `.figma-layout`: `grid-template-columns: 44px minmax(0,1fr)` + **width 100%**
- `.figma-canvas`: **width 100%**, `min-width: 0` (1fr must not collapse to 0)
- `.phone-rich`: `position: absolute` inside canvas
- Do **not** leave inline `height:auto` on `.mini-stage`

## 6. Mobile PI
- Stage explicit height (`min(360px, 55dvh)`)
- Never height 0 / display

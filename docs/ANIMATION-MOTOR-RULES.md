# Portfolio — Animation motor & design system rules

**Last locked:** 2026-08-08  
**Applies to:** Home skill modals · EY Fabric Product Intelligence · Blockchains Demo · Blockchains Process

---

## Design tokens (`:root`)

| Token | Value | Use |
|-------|-------|-----|
| `--ds-max` | `920px` | Content + nav inner max width |
| `--ds-pad-x` | `clamp(20px,4vw,28px)` | Horizontal page pad |
| `--ds-stage-radius` | `16px` | Stage corners |
| `--ds-win-ratio` | `16 / 10` | Product UI window aspect |
| `--ds-phone-ratio` | `9 / 19.5` | iPhone-like device |
| `--ds-phone-radius` | `36px` | Device corner radius |
| `--ds-ease-out` | `cubic-bezier(.22,1,.36,1)` | Stage / window enter |
| `--ds-cap-fade` | `rgba(12,11,10,.97)` | Caption gradient base |

---

## Golden rules

1. **One measure** — max content **920px**; one horizontal pad only (no double pad on children of `.page`).
2. **Nav** — `top-nav-inner` max 920; Projects control `white-space: nowrap`.
3. **Stage language** — canvas grid background · narrative can fill the stage · product UI lives in a **window** · caption is gradient + blur only (no solid gray bar).
4. **Fit, don’t crop** — scale the whole window/phone so ~90% of UI chrome is visible; never hide controls with overflow.
5. **Phone** — always `aspect-ratio: 9/19.5`, radius ~36px, size derived from stage host (JS fit on Demo).
6. **Window aspect** — product chrome stays ~**16∶10**, not a super-wide slab edge-to-edge.
7. **Process grid** — `44px minmax(0,1fr)` + layout `width:100%` so canvas never collapses to 0.
8. **Flex mobile** — hairline UI (`.prog`) is `flex: 0 0 auto` + fixed 3px height — never `flex:1` inside a column stack.
9. **Viewport** — every page:  
   `width=device-width, initial-scale=1, viewport-fit=cover`
10. **Text → UI** — beats open with narrative full-stage, then the prototype window/phone.

---

## Bug log (do not reintroduce)

| Symptom | Cause | Fix |
|---------|-------|-----|
| Orange/gray slab under skill controls | `.prog{flex:1}` in column flex | `flex:0 0 auto; height:3px` |
| Process phones invisible | Parent width 44px → canvas 0 | `width:100%` + `minmax(0,1fr)` |
| Phone looked square | Fixed px + scale + min-height fight | `aspect-ratio` + host-based size |
| EY wider than BC | BC has no `.page` | Constrain BC sections to `--ds-max` |
| Solid caption bar | Opaque background on `.capbar` | Gradient + `backdrop-filter: blur(10px)` |

---

## Files that own the motor

- `index.html` — skill modals  
- `projects/ey-fabric.html` — Product Intelligence  
- `projects/blockchain.html` — Demo + Process  
- `docs/ANIMATION-MOTOR-RULES.md` — this document  

Previews (visual QA): `previews/00` … `previews/08`.

---

## Motion

- Window enter: `ds-win-in` / `--ds-ease-out`  
- Caption enter: `ds-cap-in`  
- Phone enter: `ds-phone-in`  

Keep durations in the 220–720ms band; prefer spring-out for devices, ease-out for windows.

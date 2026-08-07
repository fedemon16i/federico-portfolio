# Portfolio framework — source of truth (pre-Chek)

Built across Claude → Grok. **Visual spec:** `design-system.html`.  
**Per-case notes:** `docs/FRAMEWORK-*.md`. This file is the ordered inventory.

---

## 1. Global shell (every page)

| Piece | Spec |
|-------|------|
| Nav | `FM.` logo · uppercase links · circular theme toggle · hamburger &lt;900px |
| Type | Body `clamp(16px, 1.05vw, 18px)` · Instrument Sans + IBM Plex Mono |
| Theme | `data-theme` + `localStorage` · light/dark |
| Focus | 2px accent outline, offset 2px |
| Motion | `--spring`, `--spring-soft`, `--ease-out-expo` · respect `prefers-reduced-motion` |
| Language | English UI chrome · **no emojis** (SVG only) |

---

## 2. Atoms

### 2.1 Buttons
| Type | Use |
|------|-----|
| Default | Ghost border, hover accent border + lift |
| Primary | Fill `--accent` |
| Selected / on | **Inset ring** (never width-expanding scale) |
| Icon circle | Player prev/next/play — scale 1.06 hover, 0.92 active |
| Nav link | Dim uppercase → primary on hover/active |
| Invite CTA | Contact cards — spring lift + arrow slide |

### 2.2 Stack icochips (mandatory for tools)
When naming **Figma, Pendo, Maze, Unity, Spline, Three.js, Miro…**:
- Colored brand SVG
- `.icochip` + tooltip name
- Hover: perspective tilt + drop-shadow
- Categories (UXR, Mobile) may stay mono text pills

### 2.3 Tags / pills
- Metric chips in **reels** (numbers + label)
- Player beat chips (horizontal scroll only — never `scrollIntoView` on document)
- Category pills (non-brand)

### 2.4 Animated icons (skills + problem rows)
- Icon in rounded square
- Hover/open: **scale + slight rotate** (skill cards)
- Problem/feature rows (EY): icon may pulse or draw; keep stroke-based SVG
- Same spring tokens; no layout shift

---

## 3. Molecules

### 3.1 Skill card → player
- Collapsed: title, short line, animated icon
- Hover: lift, accent border, icon tilt
- Open: feeds **shared narrative player** (not a one-off modal skin)

### 3.2 Project pcard
- Accent fill (`--pc-bg` / `--pc-txt`)
- Head logo + name
- Graphic slot (unique engine)
- Optional metric reel
- Stack icochips + category pills
- Hover: lift + deeper shadow

### 3.3 Contact invite
- Logo mark, title, body, CTA line with arrow
- Hover: lift, radial glow, arrow translate

### 3.4 Section box
- Surface, radius ~16–20px, quiet border brighten on hover
- Eyebrow + heading + body pattern

---

## 4. Organisms

### 4.1 Shared narrative player
**Used in:** home skill modals · EY Fabric stages · Blockchains demo · (Chek next)

```
Chrome:  [label 0N · title]  [prev] [play/pause] [next]
         [beat chips → horizontal scroll only]
Stage:   kicker → typewriter body → sub
         → hide text → show device / UI canvas
```

Rules:
- No page auto-scroll on load
- Play loops beats while `playing`
- Manual prev/next does not force play

### 4.2 Hero
- Eyebrow · display title · lede
- Optional **metric reel** (masked infinite track)
- Stack **icochips** under lede
- Optional subtle background (gradient or case graphic)

### 4.3 About (home)
- Identity / story block
- Photos (existing assets)
- **Stack groups** via icochips (same interaction as case heroes)
- Bio tools list = icochip row, not plain text

### 4.4 Case page skeleton
1. Hero (+ reel + icochips)  
2. Problem / context (section boxes, optional animated icons)  
3. Demo / Product intelligence → **player**  
4. Process  
5. Optional DS accordion  
6. Prev / Next project  

---

## 5. What is unique per project

| Project | Accent | Card graphic | Content focus |
|---------|--------|--------------|---------------|
| EY Fabric | `#ffe600` | Wireframe UI + cursor | Pendo loop, catalog |
| Blockchains | `#22d4c8` | Three.js procedural city | POI owner→visitor |
| Chek | `#7a3be0` | Product surface (reuse pattern) | Fintech flows |
| DollarCity | `#00a650` | Scan / research visual | Retail research |

**Do not** invent new player chrome or card physics per project.

---

## 6. 3D city (Blockchains + listing cards)

- Three.js r128, InstancedMesh buildings, streets, pins  
- Loader until first frame  
- RAF paused when off-screen  
- Distance LOD scales  
- HTML tooltip over canvas  
- Full case: richer `makeCity`; cards: simple mode  

---

## 7. Accessibility (WCAG AA target)

- Contrast: body text size floor 16px  
- Focus visible on all controls  
- Icon-only buttons: `aria-label`  
- Prefer transform/opacity animation  
- Ship `prefers-reduced-motion` on new pages (Chek+)  

---

## 8. Hover state matrix (summary)

| Component | Hover |
|-----------|--------|
| Skill card | Lift, accent border, icon tilt |
| Project pcard | Lift, shadow |
| Contact invite | Lift, glow, arrow |
| Player chip | Accent border; **on** = tint + scale |
| Icochip | SVG tilt + name tooltip |
| Player btn | Scale 1.06 |
| Section box | Border brighten |

---

## 9. File map

```
index.html, projects.html, contact.html, design-system.html
projects/ey-fabric.html, projects/blockchain.html
docs/FRAMEWORK-EY-FABRIC.md, FRAMEWORK-BLOCKCHAINS.md, FRAMEWORK-CHEK.md
CONTEXT-CHECKPOINT.md, MANIFEST.md
```

## 10. Next: Chek
Reuse shell + player + icochips + pcard. Only violet accent + fintech narrative + improved assets.


## Player logic (deepened)
```
phases: idle → typing → holding → device → auto-next | idle
```
- `runId` invalidates stale timeouts when skipping beats
- All timers cleared on each `go()`
- `prefers-reduced-motion`: skip typewriter, shorten holds
- Chip centering uses row `scrollTo`, never `scrollIntoView` on the document
- `aria-pressed` on chips and play

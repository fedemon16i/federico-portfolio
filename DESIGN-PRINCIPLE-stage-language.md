# Design principle — Stage language (from Home skill modals)

> Applies to: **project case pages** (EY Fabric, Blockchains, Chek, …), Design System demos, and any future animated case.
> Does **not** force the Home page into a case-player chrome (Home has its own structure).

## 1. What the skill modal got right

1. **Chrome vs stage**
   - Left (or top on mobile): title, beat pills, play / replay / close — **always visible**.
   - Right (or below): **one** stage surface (canvas grid).

2. **One stage, two phases**
   - **Phase A — Narrative:** typewriter / title copy **owns the full stage** (no nested mini-card).
   - **Phase B — Prototype:** the same stage hosts the mock/device; **uniform scale** so **all UI controls** stay visible (no inner scroll, no crop mask).

3. **Stable frame**
   - Mobile: panel height ≈ `100dvh − margin`; frame **does not change size** per beat.
   - Desktop: panel / section height budget uses `100dvh` (Chrome bookmarks + Windows taskbar may steal height).

4. **Scale rule**
   ```
   scale = min(hostW / designW, hostH / designH)   // pad ≈ 6–8%
   ```
   Prefer **smaller & complete** over large & clipped.

5. **Content width**
   - Case pages share one reading measure: **`--max ≈ 920px`** (same as EY hero you liked).
   - Stage is full width **of that wrap**, never full monitor width by accident.

## 2. Layout for project pages (and non-home)

```
.wrap (--max: 920)
  └─ section
       └─ .player / .pi-split / .demo-split
            ├─ .chrome   (~28–32% web)
            └─ .stage    (flex 1, canvas)
                 ├─ .phase-narrative  (full stage)
                 └─ .phase-prototype  [data-fit-root] scaled
```

Home is exempt from this shell; it only **originates** the pattern via skill modals.

## 3. Explicit non-goals

- No transparency tricks to “show more UI”.
- No second dark card centered in the canvas for narrative (that’s the nested limiter).
- No section full-bleed that makes mocks look microscopic.

## 4. Checklist before shipping a case section

- [ ] Same `--max` as EY hero
- [ ] Narrative = full stage
- [ ] Prototype = scaled, full chrome visible
- [ ] Controls outside or over stage, never covered by nav
- [ ] Windows short viewport: still complete (smaller OK)

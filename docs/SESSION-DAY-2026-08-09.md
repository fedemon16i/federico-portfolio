# Checkpoint — 2026-08-09 (animation / container day)

## Do you need to re-upload files?

**No — not required to continue**, if GitHub `main` still has the latest HTML you care about.

I have:
- Locked norms in `docs/UNIFIED-NORMS.md` (and mirrored motor rules)
- Conversation decisions from this thread (scale, fit pads, window containment, save motion)
- Local copies under `artifacts/` and `checkpoint-pre-atomic/`
- Ability to re-fetch `index.html`, `projects/ey-fabric.html`, `projects/blockchain.html` from GitHub when rate limits allow

**Re-upload only if:**
- You changed production files offline and never pushed, or
- GitHub is behind what you see locally in Codespaces

Otherwise: **continue from norms + GitHub main**.

---

## What happened today (honest summary)

### Goal
Fix responsive stage players (Skills, EY Product Intelligence, Blockchains Demo) so UI stays visible, centered, and consistent — without burning more time on conflicting CSS.

### What went well
1. **Locked the real rules** after many iterations:
   - Content measure **920**
   - Stage canvas + **fit** inset **16 / 12 / 52**
   - **Uniform scale** `s = min(1, fitW/natW, fitH/natH)`
   - **Center** unit inside fit
   - Caption **flush blur** (not gray bar)
   - Window **~4∶3 chrome** around mocks (Skills / EY)
   - Phone **9∶19.5**, full device in fit
   - Transport: icon play/pause/replay, prog 3px, subtle arrows
2. Clarified **N04**: EY was wrong when UI was *loose without window chrome* — not when a window overflowed the caption.
3. Agreed **not** to replace working skill animations; **save motion**, only fix containers.

### What went wrong / cost time
1. Stacking multiple global “MOTOR” CSS blocks on production HTML.
2. Transforms / fixed sizes hitting **skill animation internals** → empty stages / broken motion.
3. Rebuilding simplified ANIM-* mocks when the request was to **keep** real animations.
4. Rule docs rewritten too often before a single lock file.

### Current product diagnosis (animations vs norms)

| Player | Motion quality | Norm gap |
|--------|----------------|----------|
| **Skills** | Good — keep as-is | Apply fit scale + stage height + caption only; do not restyle inner scenes |
| **EY PI** | Motion was fine | Mocks sometimes **not in a window** / not constrained to fit; re-wrap + center + scale |
| **BC Demo** | Motion OK | Full phone in fit; avoid empty strip *inside* device bottom; caption outside device |

**Conclusion:** Apply **container model only**. Do not ship ANIM-skills / ANIM-ey rebuilds as replacements for production engines.

---

## Locked container model

```
stage (canvas, padding 0, explicit height)
  └─ fit (16 L/R · 12 top · 52 bottom)  ← flex/grid CENTER
       └─ unit (window | phone) + scale(s)
  └─ caption (flush bottom, gradient + blur)
```

Source of truth: `docs/UNIFIED-NORMS.md`

---

## Next actions (ordered)

1. Confirm norms previews (N01–N06, N02b, N04 corrected, container model) — mark any still wrong.
2. **Checkpoint zip** of current norms + previews (this package).
3. Fetch production HTML from GitHub (or use your upload).
4. Minimal patch only:
   - Skills: stage/fit/caption/scale outer unit if any
   - EY: ensure `#win` / mock sits in window chrome inside fit; center; scale
   - BC: phone fully in fit; bottom UI flush inside device
5. Do **not** add another stacked motor block; prefer one scoped block per page or shared class.
6. After visual OK → update Design System page with the same table (no new formulas).

---

## Files in this checkpoint

| Path | Role |
|------|------|
| `docs/UNIFIED-NORMS.md` | **Canonical rules** |
| `docs/ANIMATION-MOTOR-RULES.md` | Same lock for motor readers |
| `docs/SESSION-DAY-2026-08-09.md` | This narrative |
| `previews/N00-index.html` … `N06` · `N02b` · `N04` · `N-container-model.html` | Validate norms |
| `unified-norms-previews.zip` | Bundle for upload to `docs/` + optional previews |

Avoid applying: `full-animations-rebuild.zip` / `ANIM-*.html` as production replacements.

---

## Decision record

| Decision | Status |
|----------|--------|
| Uniform scale + fit pads | **Locked** |
| Caption flush blur | **Locked** |
| Window chrome for EY/Skills mocks | **Locked** |
| Keep existing skill/EY/BC animations | **Locked** |
| Icon transport | **Approved** (apply when touching chrome only) |
| Rebuild all animations from zero | **Rejected** for production |

---

*Checkpoint written 2026-08-09 — end of container/animation rules chapter.*

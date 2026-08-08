# Portfolio framework log

**Repo:** `fedemon16i/federico-portfolio`  
**Living docs in repo (recommended paths):**

| File | Purpose |
|------|---------|
| `PORTFOLIO-MASTER-CHECKLIST.md` | Phases, DoD, section types |
| `DESIGN-PRINCIPLE-stage-language.md` | Skill-modal → case stage rules |
| `CHECKLIST-viewport-fit.md` | Viewport / scale / Windows height |
| `FRAMEWORK-LOG.md` | This file — decisions, failures, fixes |

> These were authored in the Grok working session. **Commit them to GitHub** under `/docs/` or repo root so Claude Code / future you load the same rules.

## Locked principles

1. Content **measure** ≈ **920px** for case pages (BC hero/problem is the visual reference; EY PI already matched).
2. **Descalar ≠ máscara** — full mock UI visible; no inner scroll.
3. Stage language: **text full stage → UI window on canvas → caption with blur** (Home skill modals).
4. Phone: **aspect-ratio 9/19.5**; scale/size uniformly; never stretch.
5. Home identity → **hero top** (not sticky left rail) — Phase 1.
6. No emoji in chrome.
7. Mac excellent; Windows at least **complete** (taskbar + bookmarks).

## Failures we already hit (avoid repeating)

| Failure | Cause | Rule |
|---------|--------|------|
| UI tiny in huge canvas | Nested card + `transform: scale` on `#win` | Never scale the stage host; scale only the mock root |
| Phone microscopic | `max-width: 420px` on stage + full-bleed parent | Stage width = column inside 920 wrap |
| Phone deformed | Independent width/height stretch | One factor or height+aspect-ratio only |
| Bio disappeared on scroll | Sticky/fixed column + overflow bugs | Prefer hero-top layout |
| Modal under nav | z-index | Modals ≥ 12000; nav ~900 |
| FIT-SCALE JS broke BC | Forced `position:absolute` + transform on `#phone` | Only fit marked roots / dedicated phone sizer |
| EY hero wider than PI | `.page{max-width:1100px}` vs 920 sections | One `--max` for whole case page |
| BC eyebrow clipped | `hero-shell{overflow:hidden}` | overflow visible on hero copy |

## Animation rules (global)

- Play stage when visible; pause off-screen when possible.
- Narrative typewriter → then UI window; caption lag slightly after UI.
- Caption: gradient + `backdrop-filter: blur` (skill modal).
- Respect `prefers-reduced-motion`.
- Same spring/easing tokens as Home skill cards for chips/pills.
- **Defer GSAP** until layout stable.
- **Do not** add new Three.js surfaces while fixing CSS stage.

## Stack awareness (what to know to avoid this class of bugs)

**Layout:** CSS Grid, `minmax`, container vs viewport, `100dvh` vs `100vh`, sticky/fixed pitfalls, reading measure.

**Responsive:** device pixel ratio, Windows 125%/150% scaling, Chrome bookmarks bar height.

**Motion:** transform/opacity only for performance; avoid layout thrashing; one scale factor for devices.

**3D (BC):** Three.js exists on hero — isolate from demo CSS; don’t reset canvas size from unrelated fit scripts.

**Architecture:** one `--max` token; shared player chrome; document in repo before another AI pass.

## Phase status (2026-08-08)

| Phase | Item | Status |
|-------|------|--------|
| 0 | EY measure = 920 | Applied — verify |
| 0 | EY stage skill model (window + blur caption) | Applied — verify |
| 0 | BC demo/process same grid | Applied — verify |
| 0 | BC hero title clip | Applied — verify |
| 0 | BC phone ratio | Applied — verify |
| 1 | Home hero | Not started |
| 2 | Bio icons + home-photos | Not started |
| 3 | Polish | Waiting |
| 4 | Design system page | Docs only |

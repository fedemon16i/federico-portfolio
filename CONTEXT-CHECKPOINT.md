# Portfolio build context — checkpoint 2026-08-07

## Origin
- Case pages and design language started with **Claude** (Sonnet / Claude Code) on the GitHub repo `fedemon16i/federico-portfolio`.
- Work continued in **Grok** with local HTML artifacts: user uploads manually to the repo (no automated push from this environment).
- **Nothing has been pushed by the user since the previous night** relative to this checkpoint — treat these files as the current source of truth to upload.

## Repo layout (target)
```
federico-portfolio/
  index.html
  projects.html
  contact.html
  about.html              (may still be production version)
  design-system.html      ← UPDATE (do not create a second framework doc)
  projects/
    ey-fabric.html
    blockchain.html
    chek.html             ← next
    dollarcity.html       ← after chek
    customs.html
    forecast.html
  assets/                 (shared.css, main.js, demo-kit.js if still used by older pages)
```

## What we built / stabilized here
| File | Status |
|------|--------|
| `projects/blockchain.html` | Full case: hero, demo stage, process, DS accordion; no page auto-scroll; Three.js procedural city in proto |
| `projects/ey-fabric.html` | Type accessibility clamps |
| `index.html` | BC card uses same Three.js mini city as projects |
| `projects.html` | Rebuilt: home-style pcards, more data, mini city |
| `design-system.html` | Production page + **Portfolio framework** section (source of truth) |
| `contact.html` | New, shell-aligned |
| `previews/PORTFOLIO-FRAMEWORK.md` | Notes only — prefer updating `design-system.html` |

## Framework rules (summary)
- No emojis (SVG only)
- Active = inset ring, not scale that clips
- Sheet overlays map; no reflow of 3D
- No `scrollIntoView` on document when demo starts
- Tags: EY mono pills
- Nav: FM. · uppercase · theme · hamburger
- Cards: same graphic language home ↔ projects
- Mini city: InstancedMesh, distance LOD scale, loader, RAF only when visible
- Postprocessing (bloom, etc.): reserved for **case** scenes if needed — not cards

## Three.js notes
- **Cards:** r128 CDN, instanced boxes, street grid, pins, orbit camera, grow animation, visibility gate
- **Case (blockchain):** fuller `makeCity` with shadows optional, pin focus, hero + phone canvas
- **Postprocessing:** EffectComposer / UnrealBloomPass explored as optional for case only; skipped on cards for battery/GPU

## Next
1. User uploads checkpoint files to GitHub manually
2. **Chek** case using stage + sheet + beats framework
3. **DollarCity** after Chek

## Manual upload commands (user)
```bash
git add index.html projects.html contact.html design-system.html \
  projects/blockchain.html projects/ey-fabric.html
git commit -m "checkpoint: blockchain case, cards three.js, framework, contact"
git pull --rebase origin main
git push origin main
```


## Consistency pause (stack logos)
- **Rule:** tool stacks use `.icochip` colored brand SVGs + tooltip tilt (home/EY), not mono text alone.
- Categories (UXR, Mobile) may stay text pills.
- Spec live in `design-system.html` (atomic sections).


## Consistency pass — shared player
- **One narrative player** for: skill modals (home), EY Fabric stages, Blockchains demo.
- Chrome: label · prev · play/pause · next · beat chips (row scroll only).
- Sequence: kicker → typewriter → sub → hide text → show device/UI.
- **Unique only:** accent color, case graphic (wireframe vs Three city), copy.
- Spec + live demo: `design-system.html`


See MANIFEST.md and docs/FRAMEWORK-*.md (states, a11y, per-project).

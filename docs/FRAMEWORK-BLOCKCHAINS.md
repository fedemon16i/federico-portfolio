# Blockchains — design framework notes

## Role in system
Accent: `--acc-bc` (#22d4c8). Graphic: procedural Three.js city (InstancedMesh), same on case + listing cards.

## Sections (case)
1. Hero — tags as icochips, optional reel
2. Problem / “what this designs”
3. **Demo** — shared player; beats onboard → place → media → visitor
4. Process (Figma / Spline / Unity narrative)
5. Optional DS accordion
6. Prev / Next

## Components used
- Shared player (no page scrollIntoView on start)
- Phone frame + sheet overlay (absolute)
- Pin customize: one section at a time
- Stack icochips: Figma, Spline, Unity, Three.js
- Mini city on home/projects cards: loader, RAF pause, distance LOD

## Unique only
- Teal accent
- 3D city engine + POI demo content
- Owner → visitor loop copy

## Performance
- Cards: low-power WebGL, DPR cap, pause off-screen
- Case: fuller makeCity; postprocessing only if needed later


See also: `PORTFOLIO-FRAMEWORK.md` (global inventory).

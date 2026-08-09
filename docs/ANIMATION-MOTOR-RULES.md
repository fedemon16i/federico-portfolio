# Animation motor — SAFE v6

## Diagnostic result (pre-fix)

- Multiple leftover `#win .slide > div:first-child` rules with aspect/transform from older motors.
- Skills broke when transforms were applied to `#stage` slide children.
- Caption misaligned from competing `.capbar` blocks.

## Policy

| Page | Marker | Scope |
|------|--------|--------|
| `index.html` | MOTOR SAFE v6 — HOME SKILLS | caption, prog, controls only |
| `ey-fabric.html` | MOTOR SAFE v6 — EY FABRIC PI | stage, caption, soft contain |
| `blockchain.html` | MOTOR SAFE v6 — BLOCKCHAINS DEMO | text-phase, phone aspect, process grid |

**Never** force `transform` on Home skill slide UI.

## Design system page

Use `design-system-motor.html` content under Design System → Motion (or replace that section).

# Deliverables manifest — pre-Chek

## HTML pages
| Path | Purpose |
|------|---------|
| `index.html` | Home + BC Three mini city card |
| `projects.html` | Listing pcards, reels, stack icochips |
| `contact.html` | Invite cards + motion |
| `design-system.html` | Atomic system, player demo, states, a11y |
| `projects/blockchain.html` | Full BC case |
| `projects/ey-fabric.html` | EY case + type clamps |
| `CONTEXT-CHECKPOINT.md` | Build history Claude→Grok |

## Framework docs (per project)
| Path | Purpose |
|------|---------|
| `docs/FRAMEWORK-EY-FABRIC.md` | EY-specific notes |
| `docs/FRAMEWORK-BLOCKCHAINS.md` | BC-specific notes |
| `docs/FRAMEWORK-CHEK.md` | Chek inheritance plan |

## Upload suggestion
```bash
git add index.html projects.html contact.html design-system.html \
  projects/blockchain.html projects/ey-fabric.html \
  CONTEXT-CHECKPOINT.md docs/
git commit -m "system: consistency, a11y states, project frameworks"
git pull --rebase origin main && git push origin main
```

## Next
Build `projects/chek.html` using shared player + violet accent only.


## Ordered framework
- **`PORTFOLIO-FRAMEWORK.md`** — full inventory (shell → atoms → molecules → organisms → unique accents)
- **`design-system.html`** — live demos (player, skills, stacks, hero, a11y, states)
- **`docs/FRAMEWORK-*.md`** — per-project deltas only

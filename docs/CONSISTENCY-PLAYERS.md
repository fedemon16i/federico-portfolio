# Player consistency checklist

These four surfaces MUST behave the same:

| Surface | Page | Stage id / host |
|---------|------|-----------------|
| Skill modals | Home `index.html` | `.stage-panel #stage` |
| Product Intelligence | `projects/ey-fabric.html` | `#stage` |
| Demo | `projects/blockchain.html` | `#demoStage` |
| Process | `projects/blockchain.html` | `.proc-visual` / process stage |

## Shared laws
1. Content measure 920
2. Stage fluid height (desktop/mobile tokens)
3. Text full stage → UI window → caption blur
4. Fit scale ~90% UI visible
5. Phone (Demo): full device, ratio 9/19.5

## QA matrix
- [ ] Web: edges align with BC
- [ ] Tablet: UI not cropped
- [ ] Mobile: stage visible (not height 0)
- [ ] Mobile: phone fully visible
- [ ] Skills modal: same fit as PI

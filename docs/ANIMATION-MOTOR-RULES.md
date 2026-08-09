# Animation motor — rules (v3)

## Visual contract

1. **Stage** = one box, `padding:0`, grid canvas background.
2. **Caption** = `left:0; right:0; bottom:0; width:100%` — gradient + blur. **No** inset, **no** gap under the stage.
3. **UI window** = contained with `max-width` / `max-height` inside stage (padding bottom for caption). **Do not** force a ratio that crops controls. Intrinsic layout of the mock is preserved; the window is limited so everything stays visible.
4. **Phone** = `aspect-ratio 9/19.5`, radius 36px, sized to **90%** of the device layer. Layer is the stage area under the top label.
5. **Demo** = `demo-split` copy | visual; `#demoStage` fills `.demo-visual`; phone lives only inside `#deviceLayer`.
6. **Process** = `44px minmax(0,1fr)` + width 100%.
7. **Prog** = 3px, `flex: 0 0 auto`.
8. **Mobile arrows** = 28px, opacity ~0.55.
9. **Measure** = 920px.
10. **Viewport** = `width=device-width, initial-scale=1, viewport-fit=cover`.

## Self-test

Open `previews/99-self-test.html` after deploy. It reports flush caption and phone ratio.

## Files

- `index.html`, `projects/ey-fabric.html`, `projects/blockchain.html`
- Override block title: `MOTOR FINAL OVERRIDE v3`

# Portfolio fix checklist (2026-08-07)

## Rules (non-negotiable)

1. **Descalar ≠ máscara**
   - El UI de animación se diseña a tamaño fijo.
   - Se aplica `scale = min(hostW/designW, hostH/designH)` (con pad chico ~4–8%).
   - Debe verse **~90%+ del UI completo**, no un recorte con `overflow:hidden` como máscara.

2. **Modal / stage mobile (skills, EY, BC, futuros)**
   - Un **frame fijo** (casi viewport): siempre el mismo alto/ancho de panel.
   - Controles + close **siempre visibles**.
   - El contenido de adentro escala; el frame **no cambia** según el beat.

3. **Skills home**
   - Web: OK (split).
   - Mobile: aplicar regla 2.

4. **EY Fabric**
   - Quitar el “cuadro interior” que limita el UI.
   - Restaurar **ancho de página** al grid del home (`--max` / wrap coherente).
   - Stage: desescalar el mock al host (regla 1).

5. **Blockchains**
   - Restaurar **ancho de secciones** (solo el hero se veía bien).
   - Demo mobile: host **más cuadrado**.
   - En el recuadro del demo: **texto primero a pantalla completa del stage**, después la animación del phone (no texto al lado en mobile).

6. **Home bio (izquierda) — WEB**
   - `position: sticky` / fixed bajo el nav.
   - **Nunca desaparece** al scrollear.
   - **Sin scroll interno**.
   - Si baja el alto del viewport → **achicar** fotos, chips, gaps (scale/compact), no ocultar la columna.

## Preview map

| File | What to validate |
|------|------------------|
| `preview-G-descale-not-mask.html` | UI full via scale inside canvas |
| `preview-H-mobile-modal-frame.html` | Fixed mobile modal frame + controls |
| `preview-I-bc-text-then-device.html` | Text phase full stage → then phone |
| `preview-J-bio-fixed-scale.html` | Bio stays; shrinks with height |

## Implementation order (after previews OK)

1. Bio fixed + height-compact CSS on `index.html`
2. Skill modal mobile frame lock
3. Shared `fitScale(host, root, dw, dh, padRatio)` only on marked `[data-fit-root]`
4. EY width + stage fit
5. BC section width + text-then-device + square host

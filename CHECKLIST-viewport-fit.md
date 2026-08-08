# Portfolio viewport checklist (updated)

## Principle: full UI, not transparency

**Desescala (~90% del host)** = el mock/ventana de animación se **escala de forma uniforme** para que **todos sus elementos** (chrome, campos, botones, footer del mock) queden **visibles a la vez**.

- No es opacidad / fade.
- No es recortar con `overflow: hidden` como máscara.
- No es scroll interno dentro del mock (“hay que bajar para ver Deploy”).
- Preferible **más chico y completo** que grande e incompleto.

```
scale = min(hostW / designW, hostH / designH)   // pad ~4–8%
```

## Real viewports (recruiters)

| Context | Reality |
|---------|---------|
| **Mac** | Más alto útil → stages pueden verse generosos |
| **Windows Full HD** | A menudo **barra de tareas** + **Chrome con marcadores** → menos altura útil |
| Target | Mac: excelente · Windows: **todo legible y completo**, aunque el mock sea menor |

Usar **altura de viewport real** (`100dvh` / `100vh`) y presupuestos del tipo:

- Stage host ≈ `min(design ideal, 100dvh − nav − chrome del player − margen)`
- Nunca asumir 1080px libres.

## 1. Home · bio (web)

- [ ] Columna **fija**; solo scrollea la derecha
- [ ] Ancho estable en FHD Windows (~240–280px)
- [ ] Sin scroll interno; si baja el alto → comprimir componentes
- [ ] Mobile: bio en flujo; fotos/story en **modal con close**

## 2. Home · skill modals

- [ ] Web: split chrome ~28–34% · stage el resto (ya cerca)
- [ ] Mobile: **frame fijo**; close + play + pills siempre visibles
- [ ] Mock dentro del stage: **UI completo** vía scale (sin scroll interno)

## 3. EY Fabric · Product Intelligence

- [ ] Proporción tipo skill modal (chrome izq · stage der en web)
- [ ] Sin “cajita” de texto que robe espacio al mock dentro del canvas
- [ ] Mock **completo** en el stage (desescala, no máscara)
- [ ] Ancho de página = grid del sitio (`--max` ~920)

## 4. Blockchains · demo

- [ ] Secciones con wrap ~920 (no full-bleed roto)
- [ ] Stage no “desierto” ancho → phone diminuto
- [ ] Phone **grande y completo** (scale al host)
- [ ] Texto **primero** a full stage → después device
- [ ] Controles siempre usables

## 5. Global stages (skills / EY / BC / futuros)

- [ ] Frame estable en mobile (no cambia por beat)
- [ ] Controles + close siempre visibles
- [ ] **Cero scroll interno** en el UI animado
- [ ] Presupuesto de altura pensando en **Windows + Chrome bookmarks**

## Out of scope (unless asked)

Chek · design-system page polish · resume · contact

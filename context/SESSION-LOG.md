# Portfolio — Session Log

Registro de sesiones de trabajo. Cualquier agente que entre lee esto para
entender el estado actual del proyecto y qué se hizo.

---

## Sesión 2026-08-30/31 — Beats showcase + DemoKit expansion

**Rama activa:** `claude/portfolio-projects-storytelling-9v8cyu`  
**Estado:** en progreso — pendiente merge a main

### Qué se hizo

#### DemoKit (`assets/demo-kit.js`)
Se agregaron 6 patrones nuevos de zoom/spotlight al motor compartido:
- `DemoKit.scrollZoom` — zoom animado activado por scroll
- `DemoKit.regionZoom` — zoom a región específica de un elemento
- `DemoKit.spotlight` — spotlight que sigue al cursor
- `DemoKit.clipReveal` — clip-path reveal animado
- `DemoKit.staggerReveal` — stagger de entrada para grupos de elementos
- `DemoKit.animateCounter` — contador numérico animado

#### Beats showcase (`beats.html`)
Página nueva dedicada a mostrar los "beats" narrativos de cada proyecto.
Navegación entre beats con postMessage. Link agregado al nav principal.

#### EY Fabric (`projects/ey-fabric.html`)
- Beat 3: sección before/after agregada
- Beat 2: form Workbench deepened con más detalle
- 3 beats nuevos: guided user flow, publisher dashboard, improvements summary
- Fuente IBM Plex Sans cargada para uso en los players

#### Contexto/identidad
- `context/CHECKPOINT-2026-08-05.md` — snapshot del estado del portfolio en ese punto
- Actualización de bio/context de Federico con snapshot Aug 27 (search, Soyel, positioning)

---

### Lo que NO se hizo esta sesión (portfolio)

La sesión 2026-08-30/31 fue principalmente de construcción del sistema **fm-os**
(ver CHANGELOG.md en ese repo). El portfolio tuvo trabajo en una sesión previa.

---

## Sesión 2026-08-04/05 — Estructura base del portfolio

### Qué se hizo

#### EY Fabric player
- Beats 1-9 construidos e integrados
- Layout: stage izquierda + beats panel derecha
- Beat 09 (Improved): antes/después visual, no texto en fila

#### Chek + DollarCity
- Players con textos de beats dentro del stage (luego revertido — texto fuera es mejor)
- Layout revisado: texto bajo el player, no dentro

---

## Estado actual del portfolio (2026-08-31)

### Páginas existentes

| Página | Estado | Notas |
|---|---|---|
| `index.html` | ✅ Productivo | Home con skill cards + project cards |
| `about.html` | ✅ Productivo | Bio actualizada Aug 27 |
| `resume.html` | ✅ Productivo | PDF embed |
| `contact.html` | ✅ Productivo | |
| `design-system.html` | ✅ Productivo | Showcase del design system |
| `beats.html` | ✅ En rama | Showcase de beats por proyecto |
| `projects/ey-fabric.html` | ✅ Productivo | EY Fabric con beats player |
| `projects/blockchain.html` | ✅ Productivo | |
| `projects/chek.html` | ✅ Productivo | |
| `projects/dollarcity.html` | ✅ Productivo | |
| `projects/customs.html` | ✅ Productivo | |
| `projects/forecast.html` | ✅ Productivo | |

### DemoKit — funciones disponibles

```js
DemoKit.tilt3D(el, options)        // perspectiva 3D en hover
DemoKit.cursor(el, options)        // cursor magnético
DemoKit.funnel(el, data)           // funnel animado
DemoKit.segmentTable(el, data)     // tabla de segmentos
DemoKit.dualPath(el, data)         // camino dual A/B
DemoKit.scrollZoom(el, options)    // zoom activado por scroll
DemoKit.regionZoom(el, options)    // zoom a región específica
DemoKit.spotlight(el, options)     // spotlight cursor-following
DemoKit.clipReveal(el, options)    // clip-path reveal
DemoKit.staggerReveal(els, options)// stagger de entrada
DemoKit.animateCounter(el, options)// contador numérico
```

### Design system tokens clave

```css
--spring: cubic-bezier(.34,1.56,.64,1)   /* OBLIGATORIO para cosas que crecen */
--ease-out: cubic-bezier(.16,1,.3,1)
--bg-base: #0c0c0c                        /* dark pages */
--accent: var(--accent-[project])         /* override por proyecto */
```

---

## Bugs resueltos (no reintroducir)

Ver `CLAUDE.md` sección "Bugs recurrentes" — 5 bugs documentados con causa y fix.

---

## Próximos pasos sugeridos

1. Merge rama `claude/portfolio-projects-storytelling-9v8cyu` → main cuando Federico lo apruebe
2. Profundizar storytelling en Chek y DollarCity (misma estructura que EY Fabric beats)
3. Agregar `DemoKit.clipReveal` y `DemoKit.staggerReveal` en las páginas de proyecto

---

## Recursos del sistema fm-os

Para cualquier decisión de diseño, UI, animación, o accessibility:
```
fm-os/knowledge/   ← base de conocimiento
fm-os/agents/      ← activar por tipo de tarea
fm-os/CHANGELOG.md ← qué existe y qué se hizo
```

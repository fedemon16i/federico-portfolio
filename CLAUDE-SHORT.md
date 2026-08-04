Federico Monroy — Portfolio

Stack: HTML + CSS + Vanilla JS puro. Sin frameworks, sin build. Push directo a main.

## Antes de tocar algo visual
Leer `context/DESIGN-SYSTEM.md` + `context/ANTI-SLOP.md`. Reusar `assets/shared.css`
(cards 3D, `.wf-*`) y `assets/demo-kit.js` antes de escribir algo nuevo.

anime.js (CDN) ya instalado en home + los 4 proyectos activos.
⚠️ Easing custom: `'cubicBezier(.34,1.32,.64,1)'` — camelCase, sin guiones.
La sintaxis CSS `'cubic-bezier(...)'` rompe anime.js sin decir por qué.

## File map
```
index.html · projects.html · design-system.html · resume/about/contact.html
projects/{ey-fabric,chek,dollarcity,blockchain}.html   activos
projects/{customs,forecast}.html                        placeholders, NO tocar
assets/{shared.css, demo-kit.js, main.js}
context/{DESIGN-SYSTEM.md, ANTI-SLOP.md, EY-FABRIC-REFERENCE.md}
```

## Bugs que ya pasaron 2+ veces — no repetir
1. Nombre de clase repetido → `grep` antes de crear un componente.
2. Código que debe andar en touch, cayendo dentro de `matchMedia('(pointer:fine)')`.
3. CSS/JS muerto de intentos viejos sin borrar, colisionando con lo nuevo.
4. `position:fixed`+`transform` puede inflar `scrollWidth` sin overflow visual —
   bisectar por `scrollWidth` de `body > *` en vez de inspeccionar visualmente.
5. Una media query resetea dos cosas distintas a la vez — revisar qué más vive
   ahí antes de cambiar el umbral.
6. anime.js: `cubicBezier`, no `cubic-bezier` (ver arriba).
7. `.textContent` no renderiza SVG — usar `.innerHTML` si el ícono es SVG.
8. Testing: `.hover()` real, no `mouse.move` con `steps` (falsos negativos).
   Touch: `has_touch:true` + `.tap()`, no `click({force:true})`.

## No negociable
Font-weight min 400. Colores por CSS var (excepto marca real por proyecto).
Tema: SVG real, nunca emoji — ni como ícono de UI ni de estado.
Grids: `auto-fit minmax()`, nunca columnas fijas. `prefers-reduced-motion` siempre.
No fabricar métricas — `[PLACEHOLDER]` si falta un dato real.

## Antes de dar por terminado
Anchos 320/375/768/1024/1440/1920 — cero overflow. Interacciones reales
probadas (no solo que el código "se vea bien").

# CONTEXT — Skill Cards Redesign + Project Pages Rebuild
> Generado al cierre de una sesión larga (Julio 2026). Complementa — no reemplaza —
> PORTFOLIO-CONTEXT.md, CLAUDE.md y sesiones anteriores. Leer esto ANTES de tocar
> el home o cualquier página de proyecto.

---

## 1. QUÉ CAMBIÓ ESTA SESIÓN (resumen ejecutivo)

1. **Home — sección de skills reconstruida por completo** (de grid simple → abanico de
   naipes → acordeón horizontal). Ver sección 2.
2. **4 páginas de proyecto reconstruidas** (EY, Chek, DollarCity, Blockchain) con un
   estilo más sintético, manteniendo los prototipos/animaciones reales que ya existían.
   Ver sección 3.
3. **2 bugs universales encontrados y corregidos** en `assets/shared.css` (afectaban
   a las 6 páginas de proyecto, no solo a las 4 tocadas). Ver sección 4.

---

## 2. HOME — SKILL CARDS (sección "Seven skills I bring to product")

### Estado final (NO es un grid simple, es un abanico-acordeón)
- 7 cards en **una sola fila siempre**, sin importar el ancho de pantalla (`flex-wrap:nowrap`
  desde ~600px hacia arriba; solo se apilan en columna por debajo de 520-610px donde
  ni el mínimo físico alcanza).
- **Rotación progresiva simétrica** tipo mano de naipes: -6.3° a +6.3°, pivoteando desde
  `transform-origin:center 130%` (como si salieran de una mano debajo de la pantalla).
  Usa variables CSS `--fan-rot`/`--fan-ty` seteadas inline por card (NO usar `transform`
  inline directo — pisa la especificidad del hover).
- **Efecto acordeón real vía flexbox**: en reposo cada card usa `flex:1 1 130px`
  (min-width:76-190px según breakpoint). Al hacer hover, la clase `.gc-hover` aplica
  `flex:2.2 0 230px !important` (OJO: el shorthand es `grow shrink basis` — invertir
  el orden fue un bug real que tardé en encontrar). El `flex-shrink:0` en la card
  hovereada es lo que evita que ella también se achique — todo el peso de la
  compresión cae en las demás.
- Solo puede haber **una** card con `.gc-hover` a la vez (el handler de `pointerenter`
  saca la clase de cualquier otra antes de agregarla a la nueva — sin esto, un swipe
  rápido del mouse infla dos cards a la vez y se ve roto).
- Número + categoría **fusionados en un solo badge** de esquina ("01 · Product"),
  no dos separados. El número refleja el **orden visual** (posición en pantalla),
  no el índice original del array — importante si se reordenan cards en el futuro.
- El modal (`#stageZone` / `.stage-panel`) que se abre al clickear:
  - Anima con **flip 3D** (`rotateY(-70deg)→0` + scale), no solo scale. Crece desde
    el punto exacto donde clickeaste (`--ox`/`--oy`).
  - Tiene flechas prev/next tipo galería a los costados + botón play/stop
    (auto-avanza cada 9s).
  - El chip de "escena" que antes flotaba DENTRO del stage (tapaba el cursor
    simulado) se sacó — esa info ahora vive fusionada en el contador "1/4" de
    los controles, que siempre está afuera del stage.
  - Altura del stage: `min(500px, 46vh)` — ajustado para que quepan las 7
    animaciones sin scroll en alturas de 600px a 1080px. Si se agrega contenido
    nuevo a algún beat, hay que re-verificar que no rompa este balance (2 beats
    específicos — Segmentation y Analytics Hub — ya necesitaron recortar una fila
    de su contenido para entrar).

### Copy / framing
- Ya NO dice "ejemplos" — dice explícitamente "not case studies, representations
  of my actual process". Esto fue un pedido explícito: las 7 skills son servicios
  reales, no demos hipotéticas.
- Se sacó toda mención a "marketplace" como nombre de negocio específico (quedó
  "the product", "/product") — el pedido era que el primer paso (Product Mapping)
  hablara del proceso genérico, no de un caso con nombre.

### Bugs reales encontrados en este bloque (no reintroducir)
1. Doble declaración de `transition` en reglas CSS separadas — la segunda pisaba
   a la primera enteral (transition es shorthand, no se mergea entre reglas).
2. `flex:0 2.2 230px` vs `flex:2.2 0 230px` — el orden importa, grow siempre va primero.
3. Debounce de 110ms en el hover (heredado de un diseño anterior con superposición)
   causaba doble-inflado en swipe rápido — se sacó, ya no hace falta sin overlap real.
4. El `min-height:100svh` duplicado en `.project-hero` (ver sección 4) — no relacionado
   a las skill cards pero encontrado en la misma sesión.

---

## 3. PÁGINAS DE PROYECTO — ENFOQUE DE RECONSTRUCCIÓN

### Filosofía (pedido explícito de Federico)
> "No reciclemos... reconstruí en base a lo que ves del proyecto pasado... todo lo
> que es gráfico a menos que sea un pedido mío, lo que son prototipos y animaciones
> (con excepción de EY) usemos las que ya están."

Traducido a regla operativa:
- **Hero, storytelling, cards de skills**: reconstruir con estilo propio (el mismo
  lenguaje visual del home — dark bg `#0e0d0c`, acento por proyecto, DM Sans/DM Mono,
  cards con `border-radius:14px`, `border:1px solid var(--border)`).
- **Prototipos interactivos reales ya existentes** (Chek "Try the Flows", Blockchain
  flujos con cursor, DollarCity los 2 iframes de Figma Make): **NO TOCAR**. Son
  trabajo real de sesiones anteriores, ya verificado, no se reconstruyen.
- **EY es la única excepción** — no tenía prototipo previo, así que se construyó
  contenido interactivo nuevo (5 mini-animaciones en el workflow).
- **Design System**: solo en proyectos que tuvieron rediseño visual real (Chek,
  Blockchain, DollarCity). EY NO lleva sección de DS — correctamente, porque ahí
  Federico sigue el design system existente de EY, no crea uno nuevo.

### Patrón de "cards miniatura de skills" (nuevo, replicado en las 4)
Justo después del hero, antes del contenido principal:
```html
<section style="max-width:1024px;margin:0 auto;padding:...">
  <p style="font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;
     text-transform:uppercase;color:var(--text-tertiary);">Skills used in this project</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;">
    <div style="background:var(--bg-surface);border:1px solid var(--border-default);
       border-radius:14px;padding:16px;">
      <svg width="28" height="28" ...><!-- ícono real de la herramienta --></svg>
      <div style="font-weight:700;font-size:14px;">Nombre herramienta</div>
      <div style="font-size:12px;color:var(--text-tertiary);">Para qué se usó en ESTE proyecto (1 frase).</div>
    </div>
    <!-- repetir por cada skill, 4-5 cards típico -->
  </div>
</section>
```
Iconos SVG reales embebidos inline (no depender de un ícono compartido) — Figma,
Pendo, Qualtrics, Maze, Dynamics, Copilot, Useberry, Figma Make ya tienen su SVG
armado, reusar de estos archivos antes de crear uno nuevo. **CUIDADO**: el ícono de
Figma usa `viewBox="0 0 38 57"` — un typo mío (`viewBox="0 38 57"`, sin el primer
`0 0`) rompió el render en Blockchain y DollarCity la primera vez. Verificar
siempre que el viewBox tenga 4 números.

### Patrón de "Optional — dig deeper" (secciones opcionales)
Pedido explícito: navegación en pestañas para Design System / Research / cosas
"opcionales de ver", para no forzar scroll por contenido secundario.

**Regla de decisión** (aprendida esta sesión, no asumir que todo debe ir en tabs):
- Si son 2+ piezas de contenido **secuenciales/no relacionadas** (ej. galería de
  screens + design system) → SÍ conviene tabs. Patrón usado en Chek:
  ```js
  var TABS=[{t:'Hi-Fi Screens', body:'...'}, {t:'Design System', body:'...'}];
  // render tabsEl + panelsEl, toggle display:block/none al click
  ```
- Si es contenido que **justifica la narrativa central** (ej. friction points,
  research findings que explican por qué se rediseñó) → NO va en tabs, se queda
  en flujo normal. Esconder esto detrás de un click le resta fuerza a la historia.
  (Decisión tomada para DollarCity: "Research Findings" y "User Research" quedan
  en scroll normal, NO se tabificaron.)
- Si son 2 cosas para **comparar lado a lado** (ej. Blockchain "Two Design Systems")
  → mejor grid de 2 columnas que tabs — tabs esconden uno mientras ves el otro,
  lo cual mata el propósito de comparar.
- Si es **una sola pieza opcional** (ej. DollarCity solo tiene 1 DS, no 2) → el
  acordeón simple que ya existía es más apropiado que forzar una pestaña única.
  Solo se unificó el TEXTO del label ("Optional — dig deeper", antes decía
  "For the curious") para consistencia de lenguaje entre proyectos.

### Estado por proyecto (post-reconstrucción)
| Proyecto | Hero | Skills cards | Prototipo real | DS | Extra |
|---|---|---|---|---|---|
| EY Fabric | Reconstruido de cero, sin fondo cuadriculado | ✅ 5 (Pendo/Figma/Copilot/Qualtrics/Dynamics) | N/A (excepción) | No (correcto) | 5 mini-animaciones nuevas en tabs de workflow |
| Chek | Reconstruido (sacado canvas mesh + fondo de puntos) | ✅ 4 (Figma/Pendo/Maze/Qualtrics) | ✅ intacto ("Try the Flows") | ✅ en tab | — |
| DollarCity | Liviano — solo se sacó SVG de puntos | ✅ 4 (Figma Make/Useberry/Figma/UX Research) | ✅ intactos (2 iframes Figma Make) | ✅ acordeón (label unificado) | Pendiente: dark+light en el UI mismo |
| Blockchain | Compactado (canvas 3D real intacto) | ✅ 3 (Figma/3D-Spatial/User Testing) | ✅ intacto (flujos + cursor) | ✅ grid 2-col (no tabs, es comparación) | — |

---

## 4. BUGS UNIVERSALES ENCONTRADOS EN `assets/shared.css`

Estos afectaban las 6 páginas de proyecto (no solo las 4 tocadas esta sesión) porque
viven en el CSS compartido:

1. **`.project-hero{min-height:100svh}` duplicado** — una segunda declaración de la
   misma regla forzaba el hero a ocupar el 100% de la pantalla SIEMPRE, sin importar
   cuánto contenido real tuviera. Esto es lo que Federico describió como "el hero
   tapa mucho". Se eliminó, quedó solo `min-height:420px` de la regla original.
   **Si en el futuro un hero se ve "gigante" de nuevo, buscar primero una regla
   duplicada de `.project-hero` antes de asumir que es contenido.**

2. **Dropdown "Projects" del nav desactualizado** — mencionaba proyectos personales
   que ya no se muestran (Industrial Design Thesis, Depure, LayerEY). Se simplificó
   a lista plana de los 6 proyectos actuales. Este cambio está en CADA archivo HTML
   individualmente (el nav HTML no vive en shared.css, solo su CSS) — si se agrega
   un proyecto nuevo, hay que actualizar el dropdown en las 6 páginas, no solo una.

---

## 5. GOTCHA — VIENDO ARCHIVOS SUELTOS (no es un bug real)

Pasó 2 veces esta sesión: Federico abre un HTML entregado directamente (sin el resto
del repo alrededor) y lo ve sin estilos / con links azules subrayados por default.
**Esto es esperado**, no un bug: cada página de proyecto depende de
`<link rel="stylesheet" href="../assets/shared.css">`, una ruta relativa que solo
resuelve dentro de la estructura real del repo (`projects/archivo.html` +
`assets/shared.css` un nivel arriba). Para verificar ANTES de entregar, armar la
estructura completa localmente:
```bash
mkdir -p /tmp/sitetest/assets /tmp/sitetest/projects
curl -s $BASE/assets/shared.css -o /tmp/sitetest/assets/shared.css
cp archivo.html /tmp/sitetest/projects/
# cargar con Playwright desde ahí, no desde el archivo suelto
```
Esto ya se volvió parte del flujo de verificación estándar — no saltearlo aunque
"parezca" que el archivo está bien por sí solo.

---

## 6. PENDIENTE / PRÓXIMOS PASOS

En orden acordado con Federico:
1. ~~Deploy de la ronda de reconstrucción (EY/Chek/DollarCity/Blockchain)~~ — prompt
   ya generado (`PROMPT-DEPLOY-REBUILD.md`), pendiente de que Federico lo suba y
   se lo pase a Claude Code.
2. **Dark mode + light mode en el UI de DollarCity** — pedido explícito, todavía
   no implementado. El resto del sitio ya tiene light/dark a nivel de PÁGINA
   (`data-theme` toggle existente), pero esto es distinto: pidió que el MOCKUP/UI
   de producto dentro de la página de DollarCity también tenga su propio toggle
   claro/oscuro, no solo la página contenedora.
3. **Cards de proyecto en el home con más impacto** — pidió "logos y mocks algo
   más showcase" para las cards de preview de proyecto en el home (las que están
   debajo de las skill cards, sección "Where the loop ran"). Todavía no tocado.
4. Customs y Forecast — Federico los va a rehacer aparte con Cowork + Figma
   (tiene diseños ya armados ahí). NO tocar estos 2 hasta que él lo pida.

---

## 7. WORKFLOW — RECORDATORIO

- Git: push directo a `main`, sin branches ni PRs (confirmado varias veces,
  es la instrucción vigente pese a que un `CLAUDE.md` viejo decía lo contrario).
- Federico sube archivos vía GitHub web UI (carpeta temporal `deploy-.../`,
  Claude Code los mueve al lugar final y limpia).
- Antes de entregar cualquier HTML nuevo: validar sintaxis JS (`node --check`),
  armar la estructura real con `shared.css` (sección 5), correr Playwright con
  barrido de anchos (mínimo 375/600/900/1200/1440/1920) buscando overflow, y
  si hay animaciones con estados, esperar el tiempo REAL que tardan en asentarse
  antes de medir overflow (varios falsos positivos esta sesión vinieron de medir
  demasiado pronto, a mitad de una transición).

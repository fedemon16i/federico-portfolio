# INSTRUCCIONES PARA NUEVO CHAT — FEDERICO OS
> Documento de arranque para el chat dedicado al Federico OS (el shell/contenedor principal del portfolio).  
> Leer completo ANTES de tocar cualquier archivo. Este es el contrato de diseño y desarrollo.  
> Última actualización: agosto 2026

---

## 0. CONTEXTO DE ARRANQUE — qué existe hoy

El repo es `fedemon16i/federico-portfolio`. Stack: HTML + CSS + Vanilla JS puro. Sin frameworks, sin build step.
Archivos clave que ya existen y van a convivir o absorberse en el OS:

```
index.html            → home actual (skill cards + project cards)
about.html            → sobre mí
resume.html           → PDF embed + stack
contact.html          → formulario de contacto
design-system.html    → showcase del design system
assets/shared.css     → CSS compartido (3D cards, wireframe kit, tokens)
assets/demo-kit.js    → motor de animaciones (DemoKit.tilt3D, cursor, funnel, etc.)
assets/main.js        → nav, keyboard, mobile menu, scroll
context/DESIGN-SYSTEM.md   → reglas del design system
context/ANTI-SLOP.md       → checklist anti-genérico
home-photos/FEDERICO-BIO-PORTFOLIO-CONTEXT.md → bio completa de Federico
projects/             → páginas individuales de cada proyecto
```

Las animaciones en los proyectos (`DemoKit.*`) NO SE TOCAN. Son primer nivel.

---

## 1. ALMA DEL PROYECTO — qué queremos construir

### El concepto
Un **sistema operativo personal** — no un portfolio con secciones. La UI se comporta como un OS real:
- Hay una barra lateral / dock de navegación siempre visible (como en PostHog)
- El área central cambia cuando navegás (como abrir ventanas)
- La URL muta sutilmente por sección para permitir compartir links directos
- En mobile: se colapsa a una pantalla tipo "home de celular" con accesos directos, y al tocar uno se abre la "ventana" correspondiente

### Estética — Cyberpunk Hacker, no decorativo

Federico ama la tecnología y lo cyberpunk desde siempre. No es un tema aplicado encima — es quién es él.

**Paleta base:**
- Fondo: near-black tipo E-Ink / apagado — `#0a0a0a` o `#080c10` (no el negro puro de una pantalla encendida, sino la sensación de una pantalla e-paper sin backlight)
- Acento primario: cian eléctrico `#00e5ff` o `#0ff` — el color de los HUDs de ciencia ficción
- Acento secundario: violeta/púrpura neón `#b84fff` — para estados activos, glitches
- Texto principal: blanco frío `#e8f0fe` — no blanco puro, tiene tinte azulado
- Texto secundario: `#7a9ab8` — gris azulado, como phosphor screen
- Bordes y líneas: `#1a2a3a` base, `#00e5ff33` cuando hay acento (translúcido)
- Superficie elevada: `#0d1520` — diferencia mínima del fondo, como capas de interfaz

**Efectos obligatorios (implementados de forma sutil, no ruidosa):**
- Glitch: aparece en títulos clave en hover o en transiciones de sección — desplazamiento de canal RGB por milisegundos, no animación continua gritona
- E-Ink / sin backlight: el fondo nunca es brillante. Usar `box-shadow` interno oscuro para dar profundidad, no gradientes luminosos. El "glow" de acento debe sentirse como un LED detrás de un vidrio ahumado, no como un neón de discoteca
- Scanlines: textura CSS muy sutil (1px líneas semitransparentes) sobre fondos de superficies — `repeating-linear-gradient` con opacidad 2-3% máximo. Que se sienta a 50cm de distancia, no que tape el contenido
- Iluminación puntual: cuando hay un elemento activo o en hover, `box-shadow: 0 0 20px #00e5ff22` — luz fría, difusa, nunca agresiva
- Tipografía monoespaciada para datos, métricas y código: usar `JetBrains Mono` o `Space Mono` vía Google Fonts para los números, fechas, labels técnicos. El display sigue con Syne (ya disponible).

**Lo que NO es el cyberpunk de este portfolio:**
- No es Cyberpunk 2077 (sin rojo/amarillo anaranjado agresivo)
- No es Matrix (sin lluvia de caracteres como protagonista)
- No es vapor wave (sin paleta rosa/lila pastel)
- Es: la interfaz de un analista de datos que también diseña — frío, inteligente, funcional con un toque de "esto no es un portfolio genérico"

---

## 2. INSPIRACIONES — analizar antes de diseñar

### PostHog (posthog.com) — el alma de la navegación
- La UI parece un sistema operativo con el contenido principal en el centro
- Los elementos de navegación están en los **costados**, no arriba de todo como en los portafolios comunes
- Cada sección que ingresás cambia la ventana central Y la URL sutilmente
- En mobile: se ve una "ventana" abierta (HOME) con todo. Si se cierra, aparecen las carpetas y accesos directos
- **Diferencia clave**: el estilo visual de PostHog no es el de Federico (es más claro/corporativo). Solo tomamos el PATRÓN de navegación, no la estética

### Nitin Sangwan (nitinsangwan.com) — navegación entre ventanas
- En desktop: panel de navegación a la izquierda constante + área de contenido a la derecha
- En mobile: experiencia completamente distinta (no degradada, diferente)
- Lo que funciona: la idea de navegar entre "ventanas" de contenido
- Lo que no funciona: los CTAs se confunden con el UI del preview del proyecto — en Federico, debe quedar 100% claro qué es acción y qué es contenido

### Martin Refi (martinrefi.com) — ownership por proyecto
- El "desktop" UI con archivos arrastrables ya fue mejorado por PostHog — no copiarlo
- Lo que sí funciona: cada proyecto tiene su mensaje en un ONE LINER con número o acción concreta
- La identidad visual del OS se siente "suya" — aplicar lo mismo a Federico

### Amitux (amitux.in) — presentación de trabajo
- La sección "some of my work" con cards que tienen: QUE HIZO + rubro + duración + foto del producto
- Separación visual clara entre esos elementos — no todo apiñado
- Referencia para la página de proyectos dentro del OS

### VRTX Forge (vrtxforge.vercel.app) — animación de ventanas
- La mejor animación de apertura de ventana que se encontró
- Las ventanas se invocan casi completas con una animación precisa
- Difícil de leer pero la mecánica de animación es referencia directa

### Cyberpunk Redesign (cyberpunkredone.webflow.io) — lenguaje visual
- Solo como referencia de cómo puede verse un UI con estética cyberpunk
- No para copiar, sino para calibrar el nivel de "intensidad" visual

### Links Grid Cyberpunk (links-grid-cyberpunk2077.webflow.io) — home simple
- La idea de un home limpio con accesos directos — pero el problema es que requiere un click adicional para ver contenido real
- En Federico: que el home tenga teasers reales, no solo íconos

---

## 3. ESTRUCTURA DEL OS — páginas y secciones

### Shell principal (index.html → OS shell)
El home se convierte en el contenedor del OS. Tiene siempre visible:

**Dock / Sidebar izquierda (desktop):**
- Avatar holográfico de Federico (ver sección 4)
- Nombre + título en una línea: `Federico Monroy · Behavioral Analytics`
- Items de navegación: Home · Projects · Skills · Resume · Contact · Design System
- Indicador de sección activa (línea de acento, no un highlight full de la fila)
- Footer del sidebar: año + "Open to remote · 4k+ USD/mo"

**Área central (cambia con la navegación):**
- No es un iframe — es JS que muestra/oculta secciones o hace fetch/render dinámico
- La URL cambia via `history.pushState` para que cada sección sea shareable
- Transición entre secciones: la ventana anterior "se cierra" y la nueva "se abre" con una animación similar a VRTX Forge pero más sobria

**Mobile:**
- Home: grid de "app icons" / accesos directos con nombre debajo (como un escritorio de celular)
- Tocar un ícono: abre la "ventana" de esa sección en pantalla completa con una X para cerrar
- No hay sidebar — el dock aparece como bottom bar cuando el contenido está abierto

---

## 4. HOME — primera sección (quién es Federico)

### Concepto
La primera pantalla que ve un reclutador debe responder: ¿quién es esta persona y por qué me importa?

**Estructura de la primera sección:**
- **Izquierda / arriba**: Avatar holográfico (ver abajo) con frases que van rotando
- **Centro/derecha**: Información clave

```
Federico Monroy
Product Analytics · Behavioral Analytics · UX

"I don't design pretty interfaces.
I find where products break — and measure it."

Based in Córdoba, AR · Open to remote
Industrial Design bg · Pendo · Funnels · Session Replay

[ See my work ]  [ Download CV ]
```

- Fotos que se agrandan en hover: usar las fotos de `home-photos/` (IMG_0311, 0312, 0313, 0530-0536, 0990)
  - Presentarlas como un collage o grid con tilt3D — no como un slider genérico
  - En hover: la foto se agranda con `--spring` cubic-bezier(.34,1.56,.64,1)
  - Atmosfera: las fotos tienen un tinte oscuro/ciano por CSS filter — hacerlas coherentes con la paleta del OS

### Avatar holográfico (componente clave)
- Una imagen de Federico (de las fotos disponibles) tratada con CSS para verse "holográfica":
  - Efecto: `filter: brightness(1.2) contrast(1.1) saturate(0.3)` + un `box-shadow` de glow cian
  - Borde: línea de acento con animación de "scan" suave
  - En desktop: siempre presente en el sidebar
  - El avatar puede cambiar frases (rotación CSS o JS simple de un array de frases cortas):
    ```
    "I find where products break."
    "Behavioral Analytics, ex-EY Fabric."
    "Pendo · Funnels · Session Replay."
    "Product bridge: Design × Data × Business."
    ```
  - **Fase 2 (si hay tiempo/interés)**: integrar Claude API para que el avatar responda preguntas básicas sobre Federico. Esto es un nice-to-have, no bloqueante.

---

## 5. SECCIONES DEL OS

### HOME (primera vista al entrar)
- Primera sección: quién es Federico (ver sección 4)
- Segunda sección: Projects teaser (las mismas project cards del home actual pero con el layout del OS)
- Tercera sección: Skills teaser (las 7 skill cards del acordeón actual — no cambiarlas, solo integrarlas)

### PROJECTS (página dedicada)
- Grid de proyectos: cada card muestra
  - Logo/identidad visual del cliente (color de acento por proyecto)
  - ONE LINER de qué hizo Federico: "Reduced form drop-off 41% via behavioral analytics — EY Fabric"
  - Rubro + duración
  - Thumbnail real del producto (screenshot o wireframe)
  - En hover: se expande levemente (--spring) mostrando más detalle
- Proyectos: EY Fabric · Blockchain/EQUS · Chek · DollarCity · Customs · Forecast

### SKILLS (página dedicada)
- Las 7 skill cards del acordeón del home — moverlas aquí o duplicar el componente
- Abajo: tabla o grid de herramientas por categoría (ya existe en alguna forma — unificar)
- Sin cards genéricas para rellenar — solo skills reales con demos reales

### RESUME (ya existe — integrar sin romper)
- La página actual de resume.html embebe el PDF + muestra el stack
- En el OS: se abre como una "ventana" que muestra el contenido del resume actual
- NO rediseñar desde cero — integrar el contenido existente al shell del OS

### CONTACT (ya existe — integrar sin romper)
- Exactamente igual al contact.html actual
- Solo el shell/ventana cambia

### DESIGN SYSTEM (página completa)
- Un showcase de todos los componentes del sistema: tokens de color, tipografía, cards, animaciones
- **Encapsulado por proyectos**: cada proyecto tiene su sección en el design system con su acento, su tipografía y sus componentes específicos
- EY: usa la tipografía de ey.com (EY Sans / sans-serif corporativa)
- Blockchain/EQUS: tipografía actual (mantener)
- Chek → Banco Ripley: usar tipografía de bancoripley.cl
- DollarCity → Dollarama: usar tipografía de dollarama.com
- Forecast: mantener actual

---

## 6. REGLAS DE ANIMACIÓN — heredadas + nuevas

### Heredadas de CLAUDE.md (NO cambiar)
- Todo lo que CRECE usa `var(--spring)` = `cubic-bezier(.34,1.56,.64,1)` — rebote obligatorio
- Hover con cambio de tamaño: debounce ~70ms en `pointerleave`
- Colores de card: sólidos en reposo, degradado + glow solo en hover
- `DemoKit.*` no se toca — solo se usa

### Nuevas para el OS
- **Transición de ventanas**: `scale(0.96) → scale(1)` + `opacity(0) → opacity(1)` + blur `4px → 0` — duración 220ms con `--spring`
- **Glitch en títulos de sección**: `@keyframes glitch` que desplaza `text-shadow` en canal rojo y cian por 80ms en hover — solo se activa una vez en hover, no loop continuo
- **Scanlines**: `::before` pseudo-elemento con `repeating-linear-gradient(transparent 0, transparent 1px, rgba(0,229,255,.015) 1px, rgba(0,229,255,.015) 2px)` — pointer-events: none
- **Cursor personalizado** (desktop): cursor circular cian muy fino, `mix-blend-mode: difference`

---

## 7. ACCESIBILIDAD — no negociable

- `<a class="skip-link" href="#main">Skip to main content</a>` primer child de body en cada "ventana"
- Todo `<img>` con `alt` descriptivo
- Las fotos de home-photos: alt con descripción real de la foto, no genérica
- `prefers-reduced-motion`: si el usuario lo tiene activo, CERO glitch, CERO scanlines animados, transiciones a 150ms plano
- El color cian `#00e5ff` sobre fondo `#0a0a0a` tiene contraste 6.4:1 — pasa WCAG AA
- El sidebar nunca se superpone al contenido principal sin `role="navigation"` y `aria-label`

---

## 8. TIPOGRAFÍA — sistema completo

```
Display / Headings:  Syne         (ya disponible via Google Fonts)
Body / UI:           DM Sans      (ya disponible)
Datos / Código:      JetBrains Mono (agregar via Google Fonts)
Weights:             400 body / 600 sub-headings / 700-800 display
NUNCA:               font-weight: 300
```

Para el avatar y labels de acento: `JetBrains Mono` con `letter-spacing: 0.05em` — da sensación de terminal/HUD.

---

## 9. PROCESO DE TRABAJO — orden de operaciones

1. **Primero**: leer `CLAUDE.md`, `context/DESIGN-SYSTEM.md`, `context/ANTI-SLOP.md`, `home-photos/FEDERICO-BIO-PORTFOLIO-CONTEXT.md`
2. **Segundo**: ver el estado actual de `index.html`, `assets/shared.css`, `assets/demo-kit.js`
3. **Tercero**: definir la estructura HTML del shell del OS (sidebar + área central + mobile dock)
4. **Cuarto**: implementar los tokens CSS del sistema cyberpunk E-Ink en `assets/shared.css` (no sobreescribir los tokens existentes — extenderlos)
5. **Quinto**: implementar la lógica de navegación entre "ventanas" vía JS
6. **Sexto**: primera sección del home (avatar + bio + fotos)
7. **Séptimo**: integrar secciones existentes (resume, contact, projects, skills) como "ventanas"
8. **Octavo**: design system completo
9. **Al cerrar cada bloque**: barrido de anchos 320/375/768/1024/1440/1920 + verificar a11y

---

## 10. BUGS RECURRENTES — ya pasaron, no reintroducir

Los mismos 5 de CLAUDE.md más:

6. **`history.pushState` sin manejar `popstate`**: si al navegar con el botón "back" del browser no se actualiza la UI, quedás con el contenido de una sección y la URL de otra. Siempre escuchar `popstate`.
7. **Sidebar que rompe `overflow-x: body`**: cualquier elemento con `position:fixed` en el sidebar que tenga un `transform` o `width > viewport` puede generar scroll horizontal en mobile. Verificar siempre con `document.scrollWidth === window.innerWidth` en 375px.
8. **Glitch loop vs glitch puntual**: animaciones CSS de glitch en `animation-iteration-count: infinite` son un distractor enorme en un portfolio profesional. Solo en hover con `animation-iteration-count: 1` o via JS trigger.

---

## 11. SKILLS A INVOCAR

Antes de cualquier trabajo visual nuevo:
- `/artifact-design` — antes de escribir cualquier HTML de componente nuevo
- `/design` — si se necesita mockear una sección antes de codear
- `/accessibility-standards` — antes de dar por terminada cualquier sección

---

## 12. GIT

Branch de trabajo: `main` (push directo, sin PR — instrucción explícita de Federico en CLAUDE.md).
Commits claros: `git add -A && git commit -m "descripción concreta" && git push origin main`

---

## 13. PREGUNTAS PARA FEDERICO — solo estas, no otras

El único bloque que requiere respuesta antes de arrancar:

1. **Foto preferida para el avatar holográfico**: ¿cuál de las fotos de `home-photos/` querés usar como base del avatar? (IMG_0311, 0312, 0313, 0530-0536, 0990)
2. **Integración de Claude API para el avatar interactivo**: ¿querés esto en v1 o lo dejamos para después?
3. **Orden de prioridad de secciones**: ¿empezamos por el shell + navegación, o por la primera sección del home con el bio?

---

*Este documento es la fuente de verdad para el chat del OS. Si algo en otro archivo contradice esto, este prevalece — excepto CLAUDE.md en lo que respecta a reglas de git y accesibilidad.*

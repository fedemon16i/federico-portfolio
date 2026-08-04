Federico Monroy — Portfolio

Stack
Pure HTML + CSS + Vanilla JS. No frameworks. No build step.

## CRITICAL — Git rules
Push DIRECTO a main. Nunca crear un branch. Nunca abrir un PR.
Usar: git add -A && git commit -m "..." && git push origin main
(Esto es instrucción explícita y confirmada de Federico — si en algún
momento aparece otra regla de git contradictoria en algún doc viejo,
esta es la vigente. Borrar la vieja, no al revés.)

## ⭐ DESIGN SYSTEM — leer antes de tocar cualquier cosa visual
Antes de crear una card, una animación, o tocar colores, revisar:
- `context/DESIGN-SYSTEM.md` — tokens, cards 3D, kit de animación wireframe,
  reglas de color por categoría, curvas de easing (bounce/spring vs ease).
- `context/ANTI-SLOP.md` — checklist para que nada se sienta genérico /
  hecho con IA sin criterio (gradientes sin propósito, copy con buzzwords,
  todo metido en cards porque sí).
- `assets/shared.css` — el CSS compartido real (cards 3D, `.wf-*` wireframe).
- `assets/demo-kit.js` — el motor de animaciones compartido (`DemoKit.tilt3D`,
  `DemoKit.cursor`, `DemoKit.funnel`, `DemoKit.segmentTable`, `DemoKit.dualPath`).
Si el patrón que necesitás ya existe ahí, usarlo — no reinventar.

### Reglas de animación (no negociables)
- Todo lo que CREZCA (cards, paneles) usa `var(--spring)` = 
  `cubic-bezier(.34,1.56,.64,1)` — tiene que rebotar un poco, nunca una
  curva de ease plana sin overshoot. Ya pasó 2 veces que un componente
  nuevo se armó con `cubic-bezier(.22,1,.36,1)` (sin rebote) por error —
  revisar la curva de cualquier `transition` nueva contra esto.
- Hover con estados que cambian de tamaño (cards que crecen): agregar
  SIEMPRE un pequeño debounce (~70ms) en el `pointerleave` — si no, el
  cambio de layout durante la animación puede disparar un
  pointerenter/pointerleave falso en cascada cuando el cursor queda cerca
  del borde. Ya se encontró y arregló este bug una vez, no reintroducir.
- Colores de card: por defecto SÓLIDOS (o un tinte muy sutil), el
  degradado + glow/neon aparece SOLO en hover — nunca degradado como
  estado de reposo.
- Categorías de skill cards tienen su propio color, y el de diseño (UXR)
  tiene más presencia (glow más fuerte, violeta `#c084fc`) — las demás
  categorías (analytics, product, ai-dev) tienen su color pero más
  discreto.

assets/shared.css — design system (CSS variables, cards 3D, wireframe kit)
assets/demo-kit.js — motor de animaciones compartido (ver arriba)
assets/main.js — nav dropdown, keyboard nav, mobile menu, scroll animations
Fonts: Syne (display) + DM Sans (body) via Google Fonts <link>

File Map
/
├── index.html                    ← home (skill cards + project cards)
├── design-system.html            ← showcase en vivo del design system
├── about.html
├── resume.html                   ← PDF embed, asset: assets/Federico_Monroy_CV.pdf
├── contact.html
├── context/
│   ├── DESIGN-SYSTEM.md
│   ├── ANTI-SLOP.md
│   └── (otros docs de sesión)
├── projects/
│   ├── ey-fabric.html            accent: #ffe600 — migrado al shared design system
│   ├── blockchain.html           accent: #22d4c8
│   ├── customs.html              accent: #e05c4a
│   ├── chek.html                 accent: #9b6cff / #7a3be0
│   ├── dollarcity.html           accent: #00a650
│   └── forecast.html             accent: #5b9bd0
└── assets/
    ├── shared.css
    ├── demo-kit.js
    ├── main.js
    ├── Federico_Monroy_CV.pdf
    └── images/

Image Paths by Project
Chek images: ../chek/IMG_37XX.jpeg
DollarCity images: ../dollarcity/IMG_XXXX.jpeg

Design System — Never Break
Font weight min: 400 body / 600 headers / 700–800 display
NO font-weight: 300 anywhere
All colors via CSS vars — never hardcode hex in HTML inline (excepción:
colores de marca real por proyecto — logos, accent — esos sí van literales
porque son identidad de marca, no tokens del sistema)
Dark only en la mayoría de páginas de proyecto: --bg-base: #0c0c0c
El home (index.html) SÍ tiene modo claro/oscuro con toggle — ver
`--nav-bg`, `--stage-bg`, `--capbar-fade` en su <style> inline para el
patrón de variables que cambian por tema.
Project accent override per page: :root { --accent: var(--accent-[project]); }
No dark-green-on-dark combos

Accessibility — Non-Negotiable
First child of <body> on every page: <a class="skip-link" href="#main">Skip to main content</a>
Every <img> needs descriptive alt
Nav dropdown: aria-expanded, aria-haspopup, role="menu", role="menuitem"
prefers-reduced-motion handled globally — todas las animaciones nuevas
tienen que respetar esto automáticamente (el selector universal
`*,*::before,*::after{transition-duration:.01ms!important}` ya lo cubre
en el home; en shared.css hay un bloque equivalente)
No overflow-x en body — rompe el sidebar sticky del home

CSS Conventions
.container            max-width wrapper
.section              padding-block: var(--space-96)
.section-alt          bg: var(--bg-surface)
.section-eyebrow      accent label with line
.project-card         professional grid card (fully clickable)
.card-tool             tool chip con logo real inline (nunca ícono genérico)
.btn .btn-primary .btn-outline .btn-accent
.tag .tag-accent

Nav — Consistent on Every Page
Desktop: logo | Home | Projects (dropdown) | Design System | Resume | About | Contact
Dropdown de Projects: EY Fabric, Blockchain 3D, Chek, DollarCity, Customs ES, Forecast
Mobile: hamburguesa → panel full-screen
⚠️ El botón de tema (sol/luna) SIEMPRE con SVG real — nunca emoji (☀☾). Ya
pasó una vez que se coló un emoji, Federico lo notó enseguida.

Edit Philosophy — Critical
Always UPDATE, never replace.
Find the existing element and modify it in place
Preserve surrounding HTML structure, classes, IDs
Never delete a section to rewrite it from scratch
If something is missing → insert after the nearest logical sibling
If something is wrong → fix only that element, leave everything else untouched
When in duda: make the smallest possible change that achieves the goal

Order of operations:
1. Read the full file first
2. Identify exactly what needs to change
3. Make surgical edits only
4. Verify nothing else broke — correr un barrido de anchos (320/375/768/1024/1440/1920)
   y las interacciones principales antes de dar algo por terminado

## Bugs recurrentes — ya pasaron más de una vez, no reintroducir
1. **Colisión de nombres de clase**: antes de nombrar un componente nuevo,
   `grep` el nombre en el archivo — ya pasó que `.pcard` se usó dos veces
   para cosas distintas, y la regla que está más abajo en el CSS le gana
   a la de arriba silenciosamente.
2. **Código nuevo cayendo dentro de un bloque `if(!reduced &&
   matchMedia('(pointer:fine)').matches){...}` sin querer**: pasó 2 veces
   (el hamburger menu, el tap-to-expand de proyectos) — cualquier
   funcionalidad que DEBE andar en mobile/touch no puede vivir adentro de
   ese bloque, que es específicamente para mejoras solo-mouse.
3. **CSS muerto que colisiona**: antes de escribir CSS nuevo para un
   componente, verificar que no exista ya un bloque de un intento anterior
   con el mismo nombre de clase (buscar comentarios tipo "horizontal
   project strip" o similar — señal de que quedó algo de una iteración
   vieja sin borrar).
4. **`position:fixed` + `transform` en offsets extremos** puede afectar
   `document.scrollWidth` en algunos navegadores de forma inesperada —
   si hay overflow y no se explica por el layout visible, bisectar por
   `scrollWidth` de cada contenedor padre (`body > *`, después sus hijos,
   etc.) hasta encontrar la fuente real, en vez de asumir por inspección
   visual de elementos individuales (puede llevar a pistas falsas).
5. **Media queries compartidas entre efectos distintos**: si un mismo
   `@media(max-width:Xpx)` resetea DOS cosas distintas (ej. rotación del
   abanico Y el layout de grid), extender el rango para arreglar una cosa
   puede romper la otra sin querer. Verificar qué más vive en esa media
   query antes de cambiar su threshold.

Available Libraries (CDN — only add when needed)
html<!-- Animate.css — entrance animations -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

<!-- Iconify — inline icons (200k+) -->
<script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>

<!-- Motion One — scroll & flow animations -->
<script src="https://cdn.jsdelivr.net/npm/motion@10.16.4/dist/motion.js"></script>
Use Iconify: <span class="iconify" data-icon="mdi:phone"></span>
When to use: wireframe icons → Iconify, entrance animations → Animate.css, flow transitions → Motion One, simple transitions → native CSS (preferred).

Do Not
Add new CSS frameworks or JS libraries (except CDN libs listed above when needed)
Change font families
Add font-weight: 300
Hardcode colors outside CSS variables (excepto colores de marca real, ver arriba)
Remove ARIA attributes from nav
Break the --accent override pattern in project pages
Reemplazar el emoji del theme-toggle — siempre SVG
Reintroducir cualquiera de los 5 bugs recurrentes de la sección de arriba

## Universal Layout & Symmetry System
Card & box grids — siempre auto-fit, nunca columnas fijas:
display: grid; grid-template-columns: repeat(auto-fit, minmax(var(--col-min, 200px), 1fr)); gap: var(--space-24); align-items: stretch;

Card internal structure — siempre flex column:
display: flex; flex-direction: column; gap: var(--space-12); padding: var(--space-20);

Tables: todo th/td con padding: 14px 20px; line-height: 1.6; vertical-align: top;

Images en grids: mismo height + object-fit:cover entre hermanas, nunca mezclar
fixed-height con auto-height en la misma fila.

Responsive: bajo 768px todo a 1 columna. Bajo 480px padding reduce a
var(--space-16). Nunca horizontal scroll salvo que sea un patrón
explícitamente pedido (ej. las project cards del home, que son
intencionalmente una fila horizontal en desktop).

Pre-commit scan — mandatory
1. Text touching a border → fix
2. Alturas desiguales entre hermanas → fix
3. Cualquier animación nueva → ¿tiene bounce/spring donde corresponde?
   ¿respeta prefers-reduced-motion? ¿tiene debounce si cambia tamaño en hover?
4. Barrido de anchos 320/375/768/1024/1440/1920 antes de dar por terminado

# BRIEFING — Chat FM.OS
> Instrucciones completas para el chat que trabaja en `fedemon16i/federico-os`.
> Pegar esto al inicio del chat. Leer todo antes de tocar cualquier archivo.
> Última actualización: 2026-08-26

---

## Qué es este repo

**`fedemon16i/federico-os`** — shell de portfolio con estética de sistema operativo cyberpunk.  
No es el portfolio de casos de estudio. Es la capa de navegación y presentación personal de Federico.

Relación con el otro repo:
- `fedemon16i/federico-portfolio` → fuente de verdad para los casos (EY Fabric, Chek, Customs, Blockchain, DollarCity). Esos casos NO se reescriben acá.
- `fedemon16i/federico-os` → shell OS que **monta** los casos como iframes/ventanas, sin tocar su CSS.

## Reglas de git para este repo

Push directo a `main`. Nunca branch. Nunca PR.
```
git add -A && git commit -m "..." && git push origin main
```

---

## Estado actual del repo

El repo tiene exactamente 4 archivos:
- `index.html` — shell OS completo: boot sequence, topbar nav, desktop grid, window chrome, 6 secciones
- `os-home.css` — design system completo (ver tokens abajo)
- `os-home.js` — todo el contenido está en JS: routing, bio, skills, projects, resume, contact
- `README.md`

Ya funciona: boot → desktop → ventana abierta → navegación entre secciones → mobile drawer → theme toggle.

**Secciones actuales:** About/Home, Projects, Skills, Resume, Contact, Design System.

---

## Design tokens del repo (NO cambiar los existentes, solo extender)

```css
/* Dark (default) */
--bg: #050505;
--surf: #0c0b0a;
--surf2: #12110f;
--txt: #f0eee8;
--dim: #8a8680;
--faint: #5c5954;
--ac: #d97757;          /* amber/terracotta — el acento principal */
--gold: #e8c547;        /* gold — títulos, marcas, glows */
--codec: #7dffb3;       /* verde sistema — labels de estado */
--spring: cubic-bezier(.34,1.32,.64,1);
--ease: cubic-bezier(.65,0,.35,1);

/* Fonts */
/* Orbitron → títulos, brand, todo lo que es "OS" */
/* Share Tech Mono → labels, paths, metadatos, chips */
/* DM Sans → cuerpo de texto, lede, descripciones */
```

Clip-path en esquinas: `polygon(0 0, calc(100% - Npx) 0, 100% Npx, 100% 100%, Npx 100%, 0 calc(100% - Npx))`

---

## Qué hay que construir / mejorar (prioridad)

### 1. HOME — sección About (máxima prioridad)

Actualmente hay un avatar placeholder y bio con frases que rotan. Necesita:

**Avatar holográfico:**
- Foto real de Federico (imágenes disponibles en `https://fedemon16i.github.io/federico-portfolio/home-photos/`)
- Fotos: IMG_0531, IMG_0534, IMG_0311, IMG_0532, IMG_0990, IMG_0536, IMG_0530, IMG_0533
- Efecto hologram: borde gold con glow pulsante + scan line vertical que baja + leve float animation
- Las fotos se agrandan on hover (ver referencia en Mono Visor HTML)
- Galería horizontal scrolleable de fotos — al hacer click, se abre la foto más grande

**Bio con frases que rotan (ya existe, mejorar):**
Usar estas frases exactas (son de Federico, no genéricas):
- "I find where products break and measure it."
- "Pendo + session replay + funnels — measurement as craft."
- "Design × Product × Analytics × Business — the bridge."
- "Behavioral Analytics. Not pretty UI. Where it fails, and why."
- "Guatemalan. Industrial Designer. Córdoba, AR. Remote-ready."

**Stats reales:**
- "5 yrs" → product work
- "4k+ events" → tracked in Pendo
- "3 countries" → clients (Guatemala, El Salvador, USA)
- "1 framework" → AI Capabilities in progress

**Quick paths (ya existen, verificar):** botones → Projects, Skills, Resume

### 2. Efecto E-Ink / cyberpunk — capa de atmósfera

Basado en el archivo `previewBmonovisorLIVE_3.html` (Mono Visor), que es la referencia visual más aprobada por Federico.

Qué tiene el Mono Visor que FM.OS necesita adoptar:

**Fondo topográfico:** líneas de contorno radiales muy sutiles (opacity ~0.22), con mask radial para que solo se vean en el centro.
```css
repeating-radial-gradient(ellipse 120% 80% at 30% 110%, transparent 0px, transparent 13px, rgba(255,255,255,.5) 14px, transparent 15px)
```

**Vignette tunnel:** radial-gradient oscuro en los bordes, para que el contenido central se sienta "lit" y los bordes queden en sombra.

**Ambient glow pulsante detrás del avatar:** radial-gradient de color amber detrás del hologram, animado con `bgGlowPulse` (lento, 5.5s).

**HUD greebles:** elementos decorativos fijos en los bordes del viewport (coordenadas, mini barras, hex codes, red de nodos, cubo isométrico, órbita). Puramente texturales — NUNCA interactivos. Se ocultan en mobile.
```css
/* ejemplo */
.dc-coord::before { content: ''; width: 5px; height: 5px; border: 1px solid var(--ac); transform: rotate(45deg); }
```

**Noise jitter:** el archivo SVG de ruido ya existe en FM.OS (clase `.noise`). Añadir animación de jitter como en Mono Visor:
```css
@keyframes noisejit { 0%{transform:translate(0,0)} 50%{transform:translate(-1%,1%)} 100%{transform:translate(1%,-1%)} }
animation: noisejit .2s steps(2) infinite;
```

**Glitch tick ocasional:** cada ~15 segundos, la página entera sufre un micro-glitch (filter: contrast + hue-rotate por ~100ms). Solo en desktop, respeta prefers-reduced-motion.

**E-Ink feel específico:**
- Fondo casi negro pero con tinte cálido (#050505 con un suave warm tint)
- Textos en blanco cálido (#f0eee8), nunca blanco puro
- Los colores de acento (gold, amber) solo aparecen en hover/activo — en reposo todo es monochrome
- Scanlines horizontales a opacity muy baja (~0.05) — ya existen en FM.OS

### 3. Transición entre secciones — Cube / Slide 3D

Basado en la transición del Mono Visor: cuando se navega de Home → Projects o Home → Skills, las secciones se mueven como si fueran caras de un cubo en 3D (slide + rotateY + scale), no un fade plano.

```css
.face { transition: transform .85s cubic-bezier(.3,.75,.15,1), opacity .6s ease; }
.face-front { transform: translateX(0) rotateY(0deg) scale(1); opacity: 1; }
.face-left  { transform: translateX(-62vw) rotateY(-30deg) scale(.8); opacity: 0; }
/* cuando data-active="left": .face-left vuelve a translateX(0) rotateY(0deg) scale(1) */
```

El FM.OS actual hace fade. Reemplazar por esta transición (o similar) para que se sienta como un videojuego navegando entre pantallas.

Flechas de borde: chevrons en los extremos del viewport que muestran a qué sección se va al hacer click. Se ocultan cuando una sección lateral está activa.

### 4. Proyectos — ventanas sobre el desktop

Cuando se abre un proyecto desde la sección Projects, debe abrirse una ventana flotante (tipo OS) con el proyecto del portfolio embebido como iframe.

La ventana tiene:
- Barra de título con nombre del proyecto
- Botones: cerrar (×), maximizar (□)
- El iframe apunta a: `https://fedemon16i.github.io/federico-portfolio/projects/[nombre].html`
- La ventana es arrastrable y redimensionable en desktop

Ya existe un `.win` en `os-home.css` con esta estructura. Hay que conectar el click en los project cards con la apertura de esa ventana + iframe.

### 5. Avatar holográfico con frases interactivas (nice to have)

Un avatar representativo de Federico (hologram) que:
- Muestra frases rotativas de la bio (ya implementado, mejorar presentación visual)
- Tiene una interfaz tipo terminal/chat donde el visitante puede escribir una pregunta y el "avatar" responde con frases pre-programadas
- Frases de respuesta incluyen posicionamiento, disponibilidad, stack, etc.
- No necesita LLM — respuestas hardcodeadas basadas en keywords de la pregunta

---

## Contenido real de Federico (usar exactamente esto)

### Bio

```
Federico Monroy
Product Designer turned Behavioral Analytics.
Guatemalan based in Córdoba, Argentina.

I find where products break and measure it.
Industrial Design background · Pendo · Funnels · Session Replay
Bridge between Design, Product, Analytics and Business.
```

### Experiencia
- **Globant × Ernst & Young (EY Fabric)** 2023–2026 · Behavioral Analytics, Pendo, session replay, funnels
- **Applaudo** 2021–2023 · UX, product design, transformación digital (El Salvador)
- **Taxsynapse** 2021–2022 · UX para tax software

### Stack real
Pendo · Figma · Claude · PostHog · GA4 · Maze · Qualtrics · Mixpanel · GitHub · Replit

### Skills reales (ya en os-home.js — verificar que estén todos)
- Product Mapping — events a queries (Pendo, GA4)
- Usage Tracking — session analytics (Pendo, Mixpanel)
- Segmentation & Replay — replay de sesiones, grupos por fricción
- Research Synthesis — entrevistas + tests → lista priorizada de fixes
- Parallel Design — Figma craft + AI gen en un sistema
- Deployment — handoff limpio a dev/staging (Replit, GitHub)
- Analytics Hub — adoption, users, alarms como producto
- Connected Systems — tokens compartidos, menos drift

---

## Referencias visuales (en orden de peso)

1. **Mono Visor HTML** (`previewBmonovisorLIVE_3.html`) — la referencia más aprobada. Estudiar:
   - Paleta near-monochrome (bg:#000, ac:#d97757, txt:#fff)
   - Fondo topográfico
   - HUD greebles (`.dc-*` clases)
   - Transición cube (`.cube-stage`, `.face-*`)
   - Holographic carousel (`.hc-wrap`, `.hc-slide`, `.hc-holo`)
   - Avatar hologram (`.avatar-wrap` con scan + glow pulsante)

2. **PostHog (posthog.com)** — navegación OS donde el contenido central cambia y la URL refleja el estado. Mobile: ventana "home" que se cierra y muestra carpetas/íconos.

3. **vrtxforge.vercel.app** — animación de invocación de ventanas (la más lograda en ese estilo).

4. **nitinsangwan.com** — navegación entre "ventanas" con componente de nav constante a la izquierda.

5. **martinrefi.com** — mensaje claro de un liner por proyecto al abrir cada card.

---

## Anti-slop — reglas absolutas

Leer `context/ANTI-SLOP.md` en `federico-portfolio` para el checklist completo. Reglas críticas:

- **Nada de gradientes decorativos en reposo.** Solo en hover. El E-Ink se siente "apagado" en reposo.
- **Greebles son textura, nunca CTA.** El `.dc-*` décor nunca tiene click, nunca tiene label de acción.
- **Copy específico siempre.** "I find where products break and measure it" — no "I create meaningful experiences".
- **Sin cards vacías.** Si una sección no tiene contenido real, no poner una card placeholder. Mejor texto simple.
- **Glitch es reacción, no estado.** El glitch solo sucede on-hover o en transición. No loop infinito en reposo.
- **El fondo topográfico debe ser casi invisible** (opacity ≤ 0.22) — es textura, no protagonista.
- **No mezclar tipografías nuevas.** Orbitron + Share Tech Mono + DM Sans. Ya está. No agregar ninguna más.

---

## Accesibilidad (no negociable)

- Primera línea de `<body>`: `<a class="skip-link" href="#main">Skip to main content</a>`
- Todo `<img>` con `alt` descriptivo
- Los botones de OS (cerrar, maximizar, nav) con `aria-label`
- Glitch y animaciones respetan `prefers-reduced-motion`
- Focus visible en todos los controles
- Mobile: el desktop grid de carpetas debe ser usable con un dedo (mínimo 44px touch target)

---

## Lo que NO hacer

- No reescribir los proyectos del portfolio desde aquí. Solo montarlos en iframes.
- No cambiar las fuentes.
- No agregar librerías externas (CDN) sin necesidad real documentada.
- No poner el glitch en loop constante visible — solo como micro-evento.
- No asumir contenido que no esté en este documento o en el JS actual. Si hace falta un dato, pedírselo a Federico.
- No usar emoji en ningún lugar del UI del OS (excepto favicon).

---

*Briefing generado 2026-08-26. Fuente: conversaciones directas con Federico + lectura del repo.*

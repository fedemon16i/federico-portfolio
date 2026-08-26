# BRIEFING — Chat Portfolio Projects
> Instrucciones completas para el chat que trabaja en `fedemon16i/federico-portfolio`.
> Pegar esto al inicio del chat. Leer todo antes de tocar cualquier archivo.
> Última actualización: 2026-08-26

---

## Qué es este repo

**`fedemon16i/federico-portfolio`** — portfolio actual de Federico Monroy en producción.  
Stack: Pure HTML + CSS + Vanilla JS. Sin frameworks. Sin build step.  
Producción: https://fedemon16i.github.io/federico-portfolio/

## Reglas de git

Push directo a `main`. Nunca branch. Nunca PR.
```
git add -A && git commit -m "..." && git push origin main
```

---

## Archivos clave — leer antes de tocar cualquier cosa

```
assets/shared.css      ← design system compartido (3.144 líneas, 487 CSS vars)
assets/demo-kit.js     ← motor de animaciones (DemoKit.tilt3D, cursor, funnel, segmentTable, dualPath)
assets/main.js         ← nav, mobile menu, scroll animations
context/DESIGN-SYSTEM.md  ← documentación del sistema
context/ANTI-SLOP.md      ← checklist de no-slop (leer antes de agregar cualquier elemento visual)
home-photos/FEDERICO-BIO-PORTFOLIO-CONTEXT.md ← bio completa de Federico (fuente de verdad para copy)
```

## Design tokens críticos

```css
--spring: cubic-bezier(.34,1.56,.64,1)   /* TODO lo que crece usa esto — rebote obligatorio */
/* Fonts: Syne (display, 600-800) + DM Sans (body) via Google Fonts */
/* Accents por proyecto: */
/* EY Fabric:   #ffe600  */
/* Blockchain:  #22d4c8  */
/* Chek:        #9b6cff / #7a3be0  */
/* DollarCity:  #00a650  */
/* Customs ES:  #e05c4a  */
/* Forecast:    #5b9bd0  */
```

---

## TRABAJO 1 — Arreglar el layout de TODOS los players (máxima prioridad)

### El problema actual

Los players (`ey-pi-player.html`, `chek-player.html`, `blockchain-player.html`, `dollarcity-player.html`) tienen este layout:
1. Texto narrativo primero (arriba)
2. Animación abajo con subtítulos

**Esto no funciona.** El texto y la animación no están visibles al mismo tiempo. El visitante tiene que leer primero, scrollear, y entonces ver la animación, sin contexto visual.

### La solución

**Texto siempre visible MIENTRAS se ve la animación.**  
No importa cómo se implemente — mitad y mitad (50/50), panel lateral, texto encima de la animación con overlay, o texto en sidebar. Lo que NO puede pasar es que texto y animación estén en secciones separadas que requieren scroll para conectarlas.

Opciones (elegir la que mejor funcione por player):
- **Layout 50/50**: texto a la izquierda, animación a la derecha. En mobile: stack vertical (animación primero, texto debajo).
- **Texto superpuesto**: animación full-width con texto en overlay en la parte inferior (como subtítulos de cine, pero más grandes y legibles).
- **Sidebar sticky**: texto sticky a la izquierda, animación scrolleable a la derecha.

**Regla invariable:** los subtítulos de cada frame de animación deben ser visibles SIEMPRE, no solo cuando la animación está pausada.

### Arreglar también: el control de pausa

Actualmente la pausa detiene el avance al siguiente slide pero no es inmediata — la animación del frame actual termina antes de pausarse. Fix: al hacer click en pause, la animación CSS del frame actual debe detenerse instantáneamente (`animation-play-state: paused`).

---

## TRABAJO 2 — Arreglar light mode (EY Fabric + Skills page)

### El problema

En `projects/ey-fabric.html` y en la sección de skills del home (`index.html`), el light mode tiene:
- Texto blanco sobre fondo blanco en las animaciones "beat"
- Al hover de una card activa, el texto se vuelve negro sobre fondo también oscuro
- El contraste falla en varios estados de hover

### El fix

1. En cada animación beat: verificar que los colores de texto usen `var(--bg-base)` o un color que tenga contraste suficiente en light mode.
2. En skill cards en hover: asegurarse de que el par fg/bg sea legible en ambos temas.
3. Correr un barrido visual en light mode en: 320px, 768px, 1440px antes de dar por terminado.

---

## TRABAJO 3 — Mejorar el storytelling de cada proyecto

### Filosofía general

El problema con el storytelling actual: **se describe el producto, no el trabajo**.  
Lo que se necesita: **PROBLEMA → MI ROL → ANTES/DESPUÉS → RESULTADO MEDIDO**.

Formato por sección de proyecto:
```
PROBLEMA (1-2 oraciones específicas — qué no funcionaba y para quién)
MI ROL (qué hice exactamente — no "I collaborated", sino "I ran Pendo funnels to identify...")
ANTES/DESPUÉS (screenshots, métricas reales, delta visible)
RESULTADO (número real — %, tiempo, n= — nunca vago)
```

Anti-slop en copy — nunca usar:
- "seamless experience"
- "empower users"
- "meaningful interactions"
- "significant impact"

Siempre reemplazar con dato específico: "X% drop-off en el paso 3" o "50+ procesos analógicos digitalizados".

---

## PROYECTO POR PROYECTO

### EY Fabric (`projects/ey-fabric.html`)

**La historia real (de la bio de Federico):**
- EY Fabric: plataforma interna donde employees y contractors de EY consumen licencias y servicios para crear soluciones.
- Problema: los publishers en el marketplace no tenían requerimientos de UI. Los formularios pedían códigos, números de serie, equipos — campos técnicos sin contexto. Usuarios confundidos, mucho drop-off.
- Lo que Federico hizo: usó Pendo para identificar los campos con más errores y mayores drop-offs. Eso permitió ver exactamente qué patrones generaban abandono. Con esos datos, propuso y midió mejoras específicas en los formularios.
- Rol exacto: Behavioral Analytics. Pendo catalog, session replay, funnels, journeys. El "Research and Analytics" que Eric Foster construyó.

**Copy que debe estar en la página (no genérico):**
> "Publishers en el EY Fabric marketplace no tenían restricciones de UI. Formularios que pedían códigos de serie, números de equipo y configuraciones técnicas sin contexto — y sin validación. Usé Pendo para encontrar exactamente dónde caían los usuarios: qué campos generaban más errores, qué pasos tenían mayor abandono. Esos findings pasaron directo al backlog de producto."

**Player (ey-pi-player.html):** las animaciones están bien. Solo los textos descriptivos necesitan incluir "Pendo", "funnel", "drop-off", "session replay" — las palabras reales de la historia. Sin esas palabras, la animación no conecta con el trabajo real.

**Tipografía de EY:** usar la font de [ey.com](https://www.ey.com) — es EY Sans (si no está disponible como web font pública, usar una alternativa geométrica sans-serif similar como Helvetica Neue o el stack del sistema). El amarillo EY (#ffe600) ya está correcto.

**Nota Chek / Banco Ripley:** ver sección Chek abajo.

---

### Blockchain (`projects/blockchain.html`)

**La historia real:**
- Proyecto en Globant. UI 3D para una plataforma de blockchain. Figma → Spline → Unity.
- Hoy la empresa se llama **EQUS** (no Blockchains). Actualizar el nombre donde corresponda.
- Antes/después: los screenshots actuales muestran el antes y el después — mantenerlos. Mejorar la narrativa de qué cambió y por qué.
- Nota: el proyecto nunca salió a producción (Federico fue removido del proyecto por una compañera tóxica). Eso no hace al trabajo menos válido — mostrar el proceso y los entregables.

**Copy que debe mejorar:**
- Mencionar que fue un proyecto de diseño de UI 3D conectado (phone-rich flows)
- Mostrar la conexión Figma → Spline → Unity como un sistema de diseño unificado
- El "antes" (interfaz antigua) vs "después" (interfaz 3D rediseñada)

**Tipografía:** mantener la actual (teal #22d4c8). EQUS usa una identidad más minimalista — si hay referencia visual de su marca actual, usarla como guía.

---

### Chek (`projects/chek.html`)

**La historia real:**
- Chek: app de pagos protegidos, onboarding, tarjeta de crédito/débito.
- Se modernizó el UI design system **desde cero** — toda la app.
- El onboarding fue rediseñado para sacar tarjeta de crédito, débito o abrir cuenta.
- Se aplicó educación financiera como capa de contenido dentro de la app.
- **Banco Ripley adquirió Chek**. La idea de educación financiera que Federico trabajó se convirtió en [corta-y-clara.cl](https://www.bancoripley.cl/corta-y-clara) de Banco Ripley.

**Nota importante que debe estar en la página:**
> "Chek fue adquirida por Banco Ripley. La iniciativa de educación financiera que desarrollamos en el producto se convirtió en [Corta y Clara](https://www.bancoripley.cl/corta-y-clara) — una plataforma pública de Banco Ripley."

**Copy de la historia:**
> "Chek no tenía un diseño system consolidado. Modernizamos toda la app: desde el onboarding para tarjeta de crédito, débito y apertura de cuenta, hasta una capa de educación financiera integrada. El resultado fue una experiencia coherente desde el primer login hasta la activación del producto."

**Player (chek-player.html):** las animaciones son mobile (es una app). El layout text+animation debe funcionar bien en vista mobile real. Verificar en 375px.

**Tipografía:** usar referencia de [bancoripley.cl](https://www.bancoripley.cl) para el tono tipográfico. Mantener el violeta de Chek (#9b6cff).

---

### DollarCity (`projects/dollarcity.html`)

**La historia real:**
- Field research en puntos de venta de DollarCity.
- UX research → findings → acciones priorizadas → outcomes de producto.
- El proyecto está bien contado actualmente. Solo mejorar la sección de antes/después.
- DollarCity en algunos mercados opera como **Dollarama** (Canadá). La tipografía de referencia es [dollarama.com](https://www.dollarama.com).

**Lo que necesita:**
- Un "antes" visual (cómo se veía la UI o el flujo antes de la intervención)
- Un "después" (qué cambió)
- El player (dollarcity-player.html): aplicar el fix de layout texto+animación simultáneos

**Tipografía:** mantener el verde DollarCity (#00a650). Para tipografía, revisar la marca de [dollarama.com](https://www.dollarama.com).

---

### Customs ES / Aduanas (`projects/customs.html` o `aduanas.html`)

**La historia real:**
- 50+ procesos analógicos → digitales. Dual devices (tablet + dispositivo de gate).
- No había UI antes — era un sistema de papel y procesos manuales. No hay "UI antes" que mostrar.
- El storytelling es: proceso actual (papel, lentitud, error humano) → solución digital (flows duales, validación, eficiencia).

**El proyecto ya cuenta bien la historia** — según Federico, está excelente. Solo asegurarse de:
- Que el texto mencione "50+ procesos analógicos digitalizados"
- Que quede claro que fue transformación digital desde cero, sin pantalla anterior
- Si Federico sube un zip con assets adicionales, pedírselo antes de asumir contenido

**Tipografía:** mantener el coral/red (#e05c4a).

---

## Reglas de animación (no cambiar las animaciones existentes)

Federico dice explícitamente: **las animaciones no se tocan**. Solo se cambian layouts, textos y posicionamiento.

- `--spring: cubic-bezier(.34,1.56,.64,1)` — el único easing para elementos que crecen
- Hover con cambio de tamaño: debounce ~70ms en `pointerleave` (bug ya resuelto, no reintroducir)
- Colores en reposo: sólidos. Degradado + glow solo en hover
- `prefers-reduced-motion`: ya implementado globalmente, verificar que los fixes nuevos también lo respeten

---

## Bugs recurrentes — ya pasaron, no reintroducir

1. **Colisión de nombres de clase**: `grep` el nombre antes de nombrar algo nuevo
2. **Código dentro de `if(!reduced && matchMedia('(pointer:fine)').matches)`**: funcionalidad touch no puede vivir ahí
3. **CSS muerto de versiones anteriores con el mismo nombre de clase**: buscar antes de escribir CSS nuevo
4. **`position:fixed` + `transform` afectando scrollWidth**: bisectar por scrollWidth si aparece overflow
5. **Media queries que resetean dos cosas distintas**: verificar qué más vive en esa query antes de cambiar su threshold

---

## Barrido de anchos antes de dar algo por terminado

320px · 375px · 768px · 1024px · 1440px · 1920px

Verificar también en light mode: 320px, 768px, 1440px.

---

## Accesibilidad (no negociable)

- `<a class="skip-link" href="#main">Skip to main content</a>` — primera línea de `<body>`
- Todo `<img>` con `alt` descriptivo
- Theme toggle: **siempre SVG, nunca emoji** (ya pasó una vez, Federico lo notó)
- Nav dropdown: `aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`

---

## Lo que NO hacer

- No cambiar las animaciones (solo layouts y textos)
- No agregar CSS frameworks o JS libraries no listadas en CLAUDE.md
- No hardcodear colores fuera de CSS variables (excepto colores de marca reales en logos/accents)
- No remover atributos ARIA del nav
- No crear cards solo para llenar espacio (slop)
- No usar font-weight: 300
- No poner emoji en el theme toggle
- No asumir que un proceso terminó sin testear en múltiples viewports

---

*Briefing generado 2026-08-26. Fuente: conversaciones directas con Federico + lectura del repo.*

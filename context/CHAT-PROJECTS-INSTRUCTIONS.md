# INSTRUCCIONES PARA NUEVO CHAT — PROYECTOS DE FEDERICO
> Documento de arranque para el chat dedicado a refinar las páginas de proyecto.  
> Este chat NO toca el OS shell (eso es otro chat). Solo trabaja dentro de `projects/`.  
> Leer completo antes de abrir cualquier archivo.  
> Última actualización: agosto 2026

---

## 0. CONTEXTO DE ARRANQUE

Repo: `fedemon16i/federico-portfolio`. Stack: HTML + CSS + Vanilla JS. Sin frameworks.

Archivos de sistema que se heredan y NO se modifican (solo se usan):
```
assets/shared.css     → tokens, cards 3D, wireframe kit (.wf-*)
assets/demo-kit.js    → DemoKit.tilt3D, cursor, funnel, segmentTable, dualPath
assets/main.js        → nav, mobile menu
context/DESIGN-SYSTEM.md
context/ANTI-SLOP.md
home-photos/FEDERICO-BIO-PORTFOLIO-CONTEXT.md  → bio y contexto real de Federico
```

Páginas de proyecto activas:
```
projects/ey-fabric.html     accent: #ffe600
projects/blockchain.html    accent: #22d4c8
projects/chek.html          accent: #9b6cff / #7a3be0
projects/dollarcity.html    accent: #00a650
projects/customs.html       accent: #e05c4a
projects/forecast.html      accent: #5b9bd0
```

---

## 1. FILOSOFÍA DE ESTE CHAT — qué cambia y qué NO

### NO SE TOCA (nunca, bajo ningún concepto)
- Las animaciones `DemoKit.*` — son primer nivel, ya están bien
- Los prototipos reales embebidos (iframes de Figma Make, flujos interactivos)
- `assets/shared.css` y `assets/demo-kit.js` — solo se usan, no se editan aquí
- La estructura de archivos ni los nombres de clase existentes — editar quirúrgicamente

### SÍ SE CAMBIA
- **Layout de los players**: el texto narrativo nunca más encima de la animación — ver sección 3
- **Textos y copy**: storytelling con ownership real (qué problema, qué hice, cuánto duré)
- **Tipografía por proyecto**: cada proyecto usa la fuente de la empresa real
- **Light mode**: arreglarlo donde está roto (EY y Skills principalmente)
- **Sección antes/después**: agregar en EY, Blockchain, Chek, DollarCity donde corresponde
- **Pausa de video**: que responda de forma inmediata — bug conocido que hay que cerrar
- **Nota de adquisición en Chek**: Banco Ripley adquirió Chek — agregar nota en la página

---

## 2. STORYTELLING — el marco para TODOS los proyectos

Cada proyecto debe responder estas tres preguntas, en ese orden, de forma visible:

### 1. QUÉ PROBLEMA
- Específico, con datos si existen
- Quién sufría el problema (usuarios, empleados, clientes)
- Por qué importaba (impacto de negocio o de experiencia)
- NO: "mejorar la experiencia" — SÍ: "41% de drop-off en el paso 4 del formulario"

### 2. QUÉ HICE YO (ownership explícito)
- Primera persona: "Identifiqué / Diseñé / Analicé / Propuse / Implementé"
- Herramientas reales con logos (ya existen con `.card-tool`)
- Duración del proyecto o del rol
- No esconder que Federico fue el que lo hizo — ese es el punto

### 3. RESULTADO (antes y después donde aplica)
- Dato real o visual comparativo
- Antes: screenshot viejo / descripción de estado anterior
- Después: screenshot nuevo / métrica de mejora
- Si no hay métrica: describir el cambio cualitativo con precisión

**Anti-slop obligatorio**: si el copy podría aplicar a CUALQUIER portfolio de UX sin cambiar una palabra, reescribir. Federico es Behavioral Analytics — no UX genérico.

---

## 3. FIX UNIVERSAL — layout de players (aplica a TODOS)

### El problema actual
El layout actual pone texto narrativo ENCIMA de la animación, luego los subtítulos ABAJO. Cuando la animación está corriendo, el texto de arriba queda fuera de la vista del usuario. Los subtítulos se leen tarde o no se leen.

### El nuevo layout (implementar en todos los players)
Dos columnas en desktop, una columna en mobile:

```
┌─────────────────┬────────────────────────────┐
│                 │                            │
│  TEXTO          │   ANIMACIÓN                │
│  NARRATIVO      │   (el player / wireframe)  │
│                 │                            │
│  Subtítulo      │                            │
│  de la escena   │                            │
│  actual         │                            │
│                 │                            │
└─────────────────┴────────────────────────────┘
```

- **Izquierda (40%)**: título de la sección + texto narrativo + subtítulo de escena actual (actualiza con JS cuando cambia el beat de la animación)
- **Derecha (60%)**: el player / animación
- En mobile: animación arriba, texto + subtítulo abajo
- El texto SIEMPRE visible, nunca se oculta ni se tapaba por la animación
- El subtítulo de escena: es el mismo que antes aparecía abajo del player, ahora vive en el panel izquierdo

### Fix de pausa inmediata
El bug reportado: al pausar, la animación no se detiene inmediatamente — solo evita que avance al siguiente beat.
Fix: en el handler de pausa, también llamar a `timers.clear()` inmediatamente, no solo setear un flag. La animación en curso se interrumpe, no solo se previene la siguiente.

---

## 4. PROYECTO A PROYECTO — qué cambiar en cada uno

---

### EY FABRIC (projects/ey-fabric.html)
**Accent**: `#ffe600` | **Tipografía a agregar**: EY Sans → `font-family: 'Noto Sans', sans-serif` como aproximación, o verificar qué usa ey.com exactamente (sans-serif corporativo neutral)

**El problema real (copy a mejorar):**
- EY Fabric es la plataforma interna donde empleados y contractors de EY compran licencias y servicios para crear soluciones
- El problema: los publishers del marketplace no tenían estándares de UI, no comunicaban bien los requerimientos al consumidor, y los formularios de configuración (códigos de serie, equipos, números específicos) tenían altísimos drop-offs
- Federico usó **Pendo** para encontrar: qué campos tenían más errores, dónde había más drop-offs, qué patrones generaban abandonos
- Con esos datos, pudo identificar los formularios más problemáticos y proponer mejoras concretas

**Player de Product Intelligence — texto a mejorar:**
El player de animación ya está bien. El texto descriptivo debe mencionar explícitamente:
- "Usé Pendo session replay + funnels para identificar el paso 4 del formulario de configuración como el principal punto de abandono"
- "Los campos más erróneos eran: códigos de serie, números de equipo, y configuración de licencias"
- "Con esos datos, propuse un rediseño del stepper y validación inline que redujo los intentos fallidos"

**Sección antes/después a agregar:**
- Antes: formulario con todos los campos planos, sin contexto, sin validación — Federico tiene fotos/screenshots de esto
- Después: stepper con contexto, agrupación lógica, validación inline
- Si no hay screenshots del antes, describir el estado anterior con texto preciso + el wireframe animado como representación del "después"

**Light mode**: está roto — verificar y arreglar todos los colores que no contrastan bien en fondo claro

---

### BLOCKCHAIN / EQUS (projects/blockchain.html)
**Accent**: `#22d4c8` | **Tipografía**: mantener la actual (hoy se llaman EQUS)

**Contexto real:**
- Proyecto de Globant — le fue muy bien, pero una compañera tóxica lo sacó del proyecto argumentando "mala comunicación" (después se probó que ella tenía problemas con todos)
- El proyecto nunca salió a producción
- Esto no va en la página de cara al reclutador — pero sí importa para entender que Federico fue el diseñador principal de algo que tuvo alto impacto técnico

**Sección antes/después:**
- Los screenshots que ya existen en la página son el antes y el después — organizarlos explícitamente como tal
- Etiquetar cada screenshot: `ANTES — [descripción]` y `DESPUÉS — [descripción]`
- Mejorar los conceptos explicados: qué hacía el sistema antes (manual, complejo, sin 3D), qué hace después (representación 3D de activos, navegación espacial)

**Copy a revisar:**
- Mencionar que es EQUS (renombrado de Blockchain 3D)
- One liner: "Diseñé la visualización 3D de activos financieros para EQUS — navegación espacial de datos complejos"

---

### CHEK (projects/chek.html)
**Accent**: `#9b6cff / #7a3be0` | **Tipografía a agregar**: fuente de bancoripley.cl

**Contexto real:**
- Chek fue una fintech que modernizó su app de tarjeta de crédito / débito y proceso de onboarding
- **Banco Ripley adquirió Chek** — agregar nota visible: "Chek fue adquirida por Banco Ripley en [año]. Nuestra apuesta de educación financiera derivó en: bancoripley.cl/corta-y-clara"
- Se hizo desde cero toda la app: la tarjeta de crédito, el onboarding, el UI design system
- Se modernizó el UI que se basa en todo el producto de la tarjeta
- Mejora del onboarding para sacar cualquier tarjeta (débito o crédito) o abrir cuenta
- **Lo más importante**: el componente de educación financiera — de esa idea nació `corta-y-clara` de Banco Ripley

**Sección antes/después:**
- Federico subirá un ZIP con fotos del UI anterior — pedirlo cuando sea el momento
- El "antes" era un UI más tradicional de banca, el "después" es el rediseño moderno con design system propio
- La sección de educación financiera es el diferenciador — mostrarla explícitamente

**Copy a revisar:**
- "Diseñé desde cero el UI y el design system de Chek — desde la tarjeta de crédito hasta el onboarding completo"
- Nota: "La visión de educación financiera que desarrollamos derivó en Corta y Clara, hoy en Banco Ripley"

**No hay sección antes/después de pantallas**: es "desde cero" — el antes es un brief/descripción de lo que había (bancario genérico), el después son los flows reales

---

### DOLLARCITY (projects/dollarcity.html)
**Accent**: `#00a650` | **Tipografía a agregar**: fuente de dollarama.com

**Nota**: DollarCity hoy pertenece a Dollarama (adquisición). Usar la tipografía de dollarama.com.

**Estado actual**: está bien narrada la historia — principalmente verificar:
- Que la tipografía de Dollarama esté aplicada
- Que el antes/después esté visible — Federico tiene screenshots de un UI más viejo, mostrarlos explícitamente etiquetados
- One liner: "Rediseñé la experiencia de búsqueda de producto en tienda para 1,800+ empleados de DollarCity"

**No cambiar la estructura narrativa** si ya está bien — solo ajustar tipografía y agregar etiquetado de antes/después donde haya material visual

---

### ADUANAS / CUSTOMS (projects/customs.html)
**Accent**: `#e05c4a` | **Tipografía**: Federico subirá assets cuando sea necesario — pedírselos

**Estado actual**: excelente narrativa de transformación digital — no hay UI que comparar porque era puro papel/proceso manual.

**No cambiar la estructura**: es el proyecto donde mejor se cuenta la historia de "no había nada de UI, es pura transformación digital"

**Pendiente**: Federico subirá un ZIP con materiales visuales específicos de aduanas. Cuando sea el momento, pedírselos explícitamente antes de hacer cualquier cambio visual.

**Solo verificar**: que el light mode funcione bien, que la tipografía esté correcta

---

### FORECAST (projects/forecast.html)
**Accent**: `#5b9bd0`

**Revisar**: light mode, tipografía, que el player tenga el nuevo layout de dos columnas

---

## 5. TIPOGRAFÍAS POR PROYECTO — cómo implementar

Para cada proyecto, agregar la fuente via Google Fonts o CDN al `<head>` de la página:

```html
<!-- EY: sans-serif corporativo similar a EY Sans -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<!-- Usar: font-family: 'Noto Sans', sans-serif; en los títulos de esa página -->

<!-- Chek / Banco Ripley: verificar fuente real en bancoripley.cl via DevTools -->
<!-- DollarCity / Dollarama: verificar fuente real en dollarama.com via DevTools -->
```

Para verificar la fuente de un sitio: abrir DevTools > Network > filter "font" > ver qué fuentes descarga el sitio.

**Regla**: la tipografía adicional solo afecta los títulos de proyecto y elementos de marca de ESA página. El body en DM Sans se mantiene para todo lo demás.

---

## 6. LIGHT MODE — fix sistemático

Los proyectos que tienen light mode roto o incompleto: **EY Fabric** y **Skills**.

Proceso de fix:
1. Abrir la página y activar light mode
2. Identificar con DevTools cada elemento que no contrasta (texto sobre fondo, bordes invisibles, etc.)
3. Agregar las variables de tema correctas en el bloque `[data-theme="light"]` de esa página
4. Verificar contraste mínimo WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande y UI
5. NO usar `!important` para arreglar especificidad — corregir la selector más específico

---

## 7. CHEKEAR ANTES DE DAR POR TERMINADO

Para CADA proyecto modificado:

- [ ] Layout de players en dos columnas (texto siempre visible)
- [ ] Pausa inmediata funciona (timers.clear() al pausar)
- [ ] Tipografía del cliente aplicada en títulos
- [ ] Sección antes/después etiquetada si hay material
- [ ] Copy con: QUÉ PROBLEMA / QUÉ HICE / RESULTADO — en primera persona
- [ ] Light mode sin roturas (si aplica)
- [ ] Barrido de anchos: 320 / 375 / 768 / 1024 / 1440 / 1920
- [ ] `prefers-reduced-motion` respetado en cualquier animación nueva
- [ ] No se introdujeron cards genéricas sin contenido real (anti-slop)
- [ ] Nota de adquisición en Chek (Banco Ripley)

---

## 8. ORDEN DE TRABAJO RECOMENDADO

1. **Fix universal de players** (layout dos columnas + pausa inmediata) — aplicar a todos antes de tocar el copy individual
2. **EY Fabric** — el más complejo por el fix de light mode + el copy de Pendo + el antes/después
3. **Chek** — nota de adquisición + tipografía + educación financiera destacada
4. **Blockchain/EQUS** — etiquetar antes/después con screenshots existentes + copiar el nombre actualizado
5. **DollarCity** — tipografía Dollarama + verificar antes/después
6. **Customs** — esperar ZIP de Federico para materiales visuales; mientras, solo fix de light mode
7. **Forecast** — light mode + layout de player

---

## 9. PREGUNTAS PARA FEDERICO — solo estas antes de arrancar

1. **Chek UI anterior**: ¿tenés fotos/screenshots del UI de Chek antes del rediseño? (Para la sección antes/después)
2. **EY Fabric antes**: ¿tenés screenshot del formulario original con todos los campos planos? (Para el antes/después del player de Product Intelligence)
3. **Aduanas**: pedirle el ZIP cuando lleguemos a ese proyecto
4. **Año de adquisición de Chek por Banco Ripley**: para poner la nota correcta
5. **DollarCity/Dollarama**: ¿hay UI viejo disponible para mostrar en el antes/después?

---

## 10. GIT

Push directo a `main` sin PR — instrucción explícita de Federico.
```
git add -A && git commit -m "descripción concreta del cambio" && git push origin main
```

---

*Este documento es la fuente de verdad para el chat de proyectos. Si algo contradice CLAUDE.md en materia de git o accesibilidad, CLAUDE.md gana. En todo lo demás, este documento es el contrato.*

# DESIGN SYSTEM — cards, 3D, wireframe demos, cursors
> Un solo sistema, compartido por el home y TODAS las páginas de proyecto.
> Vive en `assets/shared.css` (estilos) + `assets/demo-kit.js` (animaciones).
> Antes de armar un demo o una card nueva en CUALQUIER proyecto, revisar esto primero.

---

## 1. POR QUÉ EXISTE ESTO

Hasta ahora, cada página de proyecto (EY, Chek, DollarCity, Blockchain) tenía su
propio código para cosas que en el fondo son lo mismo: una card con efecto 3D,
un cursor de usuario recorriendo una pantalla, una tabla con checkboxes que arma
un segmento, dos caminos en paralelo que convergen. Eso significa: mismo bug
arreglado 4 veces, o peor, arreglado en 1 lugar y no en los otros 3.

De acá en más: **un solo lugar para cada patrón.** Si hace falta un demo nuevo,
primero se mira si algo de acá sirve, y solo se escribe código nuevo para lo que
sea genuinamente distinto.

---

## 2. INCLUIR EN CUALQUIER PÁGINA NUEVA

```html
<link rel="stylesheet" href="../assets/shared.css" />
<script src="../assets/demo-kit.js"></script>
```

**Importante:** `demo-kit.js` va SIN `defer` y ANTES de cualquier script inline
que lo use. Si se pone con `defer`, un script inline más abajo en la página
puede ejecutarse antes de que `window.DemoKit` exista — esto ya pasó una vez.

---

## 2.5 SKILL CARDS — hover accordion (Supabase-inspired, web only)

Patrón aprobado para las 7 skill cards del home, en desktop/laptop:
- Una sola card expandida por vez — al pasar el mouse, esa crece y las demás
  se achican (no todas iguales).
- **La primera está expandida por defecto** al cargar la página, sin
  necesidad de hover — igual que las "customer stories" de supabase.com.
- Al sacar el mouse de TODA la fila (no de una card a otra), vuelve a la
  primera expandida — es el "estado de reposo", nunca queda todo colapsado.
- Estado colapsado: `flex:1 1 155px;max-width:215px` — ancho cómodo, no una
  tira angosta.
- El texto de la card usa `c.long` (con `<strong>` en las palabras clave),
  NUNCA `c.d` (la versión corta sin énfasis) — error real que se cometió y
  se corrigió: eran campos distintos y la card estaba usando el equivocado.
- `-webkit-line-clamp:4` en desktop (no 1) — debe leerse la frase completa,
  no cortarse a una línea.
- **Este patrón es solo para desktop.** En mobile, la descripción se oculta
  por completo (`gc-d{display:none}`) — mobile es ícono + chips, "teaser"
  puro, sin depender de hover (que no existe en touch).
- Implementación: JS ya existente en `pointerenter`/`pointerleave` por card,
  más un listener de `pointerleave` en el contenedor completo (`deck`) que
  restaura la card por defecto — sin este último paso, sacar el mouse deja
  todo colapsado, que no es el comportamiento deseado.

**No se aplicó** (evaluado y descartado por ahora): el acordeón vertical
tipo timeline con barra de color a la izquierda — se probó para "Projects"
y fue rechazado explícitamente ("muy Tailwind, muy shadcn", parece un
alert/snackbar). Si se retoma un timeline de proyectos, debe verse
distinto a ese patrón — evaluar el grid-que-se-deforma de la otra referencia
de Supabase (7 cards, una crece y empuja las demás) como alternativa.

## 3. CARDS CON EFECTO 3D + BRILLO SUTIL

Para cualquier card que deba sentirse "premium" al pasar el mouse (skill cards,
tool cards, prototype frames):

```js
document.querySelectorAll('.mi-card').forEach(function(el){
  DemoKit.tilt3D(el, {maxX: 4, maxY: 5}); // maxX/maxY = grados de inclinación, opcional
});
```

Eso agrega solo: la clase `.ds-card-3d` (rotación 3D seguida por mouse) y un
brillo tipo "spotlight" que sigue el cursor (usa las variables `--lx`/`--ly` que
ya existían en el home pero NUNCA se habían conectado a nada — ahora sí hacen algo).

No hace falta escribir CSS propio para esto — ya está en `shared.css`.

---

## 4. DEMOS "WIREFRAME" — el estilo obligatorio para cualquier animación

**Regla de oro:** toda animación que explique un proceso usa el estilo wireframe
(líneas en vez de texto real, un botón de acción real como máximo por pantalla).
Esto no es solo estético — es lo que permite mostrar el flujo real de un cliente
(EY, DollarCity) sin exponer datos confidenciales, Y hace que el demo se entienda
sin tener que leer texto.

Clases base disponibles en `shared.css` (prefijo `.wf-`):

| Clase | Para qué |
|---|---|
| `.wf-wrap` / `.wf-screen` | Contenedor de una "pantalla" (varias pueden convivir, se togglea `.on`) |
| `.wf-topbar` + `.wf-dot` | Barra superior tipo browser (3 puntitos) |
| `.wf-line` / `.wf-line.lg` / `.wf-line.accent` | Líneas de texto simuladas (alto normal / grande / en acento) |
| `.wf-btn` | El ÚNICO texto real permitido — una acción ("Continue", "Explore Catalog") |
| `.wf-card` + `.wf-card-ic` | Card genérica en una grilla (catálogo, etc.) |
| `.wf-step-row` + `.wf-step-n` + `.wf-step-track` | Stepper de progreso (paso 1 de 3, etc.) |
| `.wf-field` + `.wf-input` | Fila de formulario (label simulado + input) |

---

## 5. CURSORES — reglas de uso

**Un solo visitante recorriendo pantallas** → `DemoKit.cursor(container)`
```js
var timers = DemoKit.makeTimers();
var cur = DemoKit.cursor(wrapEl);
cur.moveTo(targetEl); // se mueve ahí con transición suave
timers.after(700, function(){ cur.moveTo(otroTarget); });
```

**Varios visitantes a la vez** (para mostrar comportamiento en producción,
como "Analyze" en EY o "Usage Tracking" en el home) → `DemoKit.visitorCursor()`
```js
var u1 = DemoKit.visitorCursor(container, '#7ba7f0', 'visitor_A');
u1.moveTo(targetEl, function(){ /* siguiente paso */ }, timers);
u1.dropOff(targetEl, timers); // muestra "???" y desvanece el cursor — para abandonos
```

Colores sugeridos para visitantes (ya usados en home + EY, mantener consistencia):
`#7ba7f0` azul, `#e5b567` amarillo, `#8fd4a8` verde, `var(--text-tertiary)` gris (completó sin problema).

---

## 6. PATRONES COMPLETOS LISTOS PARA USAR

### Embudo de abandono (drop-off funnel)
```js
DemoKit.funnel(containerEl, [100,88,74,41,36], ['Home','Catalog','Filter','Configure','Confirm'], 3, timers);
// último argumento numérico = índice de la barra que se marca en rojo (el drop-off real)
```
⚠️ El contenedor que le pasás se sobreescribe ENTERO (`innerHTML`) — si necesitás
un título arriba, ponelo en un elemento HERMANO, no en el mismo contenedor.

### Tabla de sesiones → segmento → replays (como "Research" en EY, "Segmentation & Replay" en home)
```js
DemoKit.segmentTable(containerEl,
  [{id:'r0', color:'#e5b567', name:'visitor_B', meta:'drop-off · configure · 3 retries'}, /* ...más filas */],
  ['r0','r1','r2'],              // ids a marcar en orden
  'segment: configure strugglers (3)',  // texto del chip final
  ['visitor_B · 02:14 · configure', /* ...más reps */],  // lista de replays revelados al final
  timers
);
```

### Dos caminos en paralelo que convergen (como "Design" en EY, "Parallel Design" en home)
```js
DemoKit.dualPath(containerEl, {
  handLabel: iconoSvgHtml + 'By hand · Figma',
  aiLabel: iconoSvgHtml + 'With AI · Copilot',
  handArtboards: 2,
  aiTree: ['archivo1.md <span class="ok">✓</span>', 'archivo2.figma <span class="ok">✓</span>'],
  mergeBadge: 'READY TO SHIP',
  mergeText: 'Descripción corta del resultado final'
}, timers);
```

---

## 7. TIMERS — nunca usar `setTimeout` suelto

Cada demo necesita SU PROPIA cola de timers, para poder cancelarlos limpio si el
usuario cambia de pestaña a mitad de la animación (si no, animaciones viejas
siguen corriendo por encima de las nuevas — esto causó bugs reales antes).

```js
var timers = DemoKit.makeTimers();
timers.after(500, function(){ /* ... */ });
// al cambiar de pestaña/demo:
timers.clear();
```

Guardá la instancia de `timers` en un array accesible desde tu función de
limpieza general (`clearDemoTimers()` en EY ya hace esto — ver su código como
referencia de integración).

---

## 8. accesibilidad — ya integrado, no hay que hacer nada extra

Todo lo de acá respeta `prefers-reduced-motion` automáticamente:
- `DemoKit.reducedMotion` es `true`/`false` si necesitás chequearlo vos mismo.
- Los timers con `DemoKit.makeTimers()` corren casi instantáneo (1ms) si el usuario
  pidió menos movimiento — la animación "pasa" pero no se ve, no hay que armar
  una versión estática aparte.
- `.ds-card-3d`, `.wf-cur`, `.wf-vcur` desactivan sus transiciones solas.

---

## 9. QUÉ FALTA RETROFITEAR (próximos pasos)

Ya migrado a este sistema compartido: **EY Fabric** (Research, Design, el embudo
de Measure, y las skill cards con tilt 3D) — usar esta página como referencia
de integración real.

Pendiente de migrar (usan código propio todavía, funcionan pero no comparten el
sistema): **Chek, DollarCity, Blockchain** — sus prototipos reales ("Try the
Flows", los 2 iframes de Figma Make, el flujo de POS Search) NO se tocan bajo
ningún concepto; lo que sí se puede unificar son sus cards de skills (agregarles
`DemoKit.tilt3D`) y cualquier demo nuevo que se agregue de acá en más.

---
*Cuando algo de acá cambie, actualizar este archivo en el mismo commit — si el
código y la documentación se desincronizan, la doc deja de servir.*

# ANTI-SLOP — que este portfolio nunca se sienta genérico
> Basado en los principios del skill "Design Anti-Slop"
> (https://mcpmarket.com/es/tools/skills/design-anti-slop). Adaptado al proyecto
> real de Federico. Leer esto antes de agregar CUALQUIER elemento visual nuevo —
> hero, card, animación, copy.

---

## 1. QUÉ ES "AI SLOP" Y POR QUÉ IMPORTA

"Slop" es el look genérico que delata que algo se generó rápido con IA sin
criterio propio: gradientes mesh morado-cian de fondo, formas 3D flotantes sin
ningún propósito, todo metido en cards idénticas, copy que dice "empower",
"seamless", "unlock your potential" sin decir nada concreto. Un reclutador o
cliente que ve eso, aunque no sepa nombrarlo, siente "esto lo hizo una IA sin
que nadie lo revisara" — exactamente lo que Federico no quiere transmitir en
su propio portfolio de UX.

## 2. LISTA DE CHEQUEO — antes de dar por terminado cualquier elemento

- [ ] **¿Este gradiente/color tiene una razón?** Un gradiente sutil de marca
  (el verde de DollarCity, el amarillo de EY) está bien. Un gradiente
  morado-cian-rosa "porque queda lindo" es slop puro — sacarlo.
- [ ] **¿Esta forma 3D/decoración representa algo real?** Los mockups
  wireframe (líneas, cards de catálogo, cursor de visitante) representan un
  producto real — está bien. Una figura 3D flotante decorativa sin conexión
  al contenido — no.
- [ ] **¿Esto necesita ser una card?** No todo necesita vivir en una card con
  borde redondeado y sombra. Texto simple, una lista, un párrafo — a veces
  eso comunica mejor que forzarlo dentro de una card genérica.
- [ ] **¿El copy dice algo específico?** "Reduced task time by 50%" es
  específico. "Empowering seamless experiences" es buzzword vacío — nunca
  usar palabras como empower, seamless, unlock, elevate, revolutionize,
  cutting-edge, robust, leverage (como verbo de marketing) sin un dato real
  al lado.
- [ ] **¿Esto ya se ve en 3 lugares distintos del sitio con el mismo patrón?**
  Repetir el mismo patrón visual en cards de proyectos distintos sin variación
  es "template syndrome" — cada proyecto necesita sentirse distinto en los
  detalles (colores de marca reales, contenido real), no ser el mismo molde
  con el texto cambiado.
- [ ] **¿Hay más decoración que contenido?** Priorizar siempre la claridad del
  dato real (la métrica, el flujo, el problema) sobre el efecto visual que lo
  rodea. El efecto (tilt 3D, glow, animación) es un marco, no el protagonista.

## 3. APLICADO ESPECÍFICAMENTE A ESTE PORTFOLIO

### Ya evitamos (mantener así)
- Wireframes con líneas en vez de texto real en los demos — comunica el
  proceso sin inventar contenido y sin llenar de texto decorativo.
- Colores de marca reales por proyecto (verde DollarCity, amarillo EY,
  violeta Chek) — no una paleta genérica repetida.
- Copy con métricas reales (+15%, -50%, 90+ assets) — nunca un número
  inventado ni una frase vaga de "impacto significativo".

### Vigilar de acá en más
- Si se agrega un ícono nuevo: que sea el logo REAL de la herramienta (SVG
  inline, como ya hacemos con Figma/Pendo/Qualtrics), nunca un ícono
  genérico de "check" o "estrella" sin marca.
- Si se agrega una animación nueva: que muestre un proceso real (un cursor
  navegando, un funnel de abandono real, un formulario llenándose) — nunca
  una animación decorativa sin conexión al contenido (partículas flotando,
  blur pulsante, etc.)
- Si se escribe un titular nuevo: probar leerlo en voz alta. Si podría
  aplicar a cualquier portfolio de UX sin cambiar una palabra ("I turn ideas
  into impact"), reescribirlo hasta que sea específico de Federico y de ESE
  proyecto puntual.
- Antes de copiar un patrón de un proyecto a otro (ej. las skill-mini-cards),
  preguntarse: ¿el contenido de adentro es real y distinto para este
  proyecto, o es el mismo texto con el nombre cambiado?

### Patrón prohibido — la "card con línea de acento a la izquierda"
Federico señaló esto dos veces (2026-09-17): un `border-left: 3px solid
<accent>` + fondo `--surface` + `border-radius` redondeado del lado
derecho, usado como "callout" o "nota" (ej. `.gap-item` en
`ey-fabric-design-system.html`, `.diff-note` en `ey-fabric-publisher.html`
y `ey-fabric-configure.html`). Es el componente reflejo que aparece en
CASI TODO vibe-coding cuando hay que destacar una nota/advertencia/vacío —
tan genérico como el gradiente morado-cian. **Evitar a toda costa, sin
excepción, a menos que Federico lo pida explícitamente.** Si hace falta
destacar una nota/aside/diff, usar una convención distinta y con propósito
real (ej. hairlines arriba/abajo estilo changelog, texto inline en
monospace, o directamente el patrón ya existente en el header/metabar de
la página) — nunca reinventar el mismo bloque con borde de color.

### Contraste de color de marca en light mode — no negociable
Encontrado 2026-09-17: amarillo/naranja vívido usado como texto/ícono suelto
(no como fondo de botón) es casi invisible en light mode — falla WCAG feo.
Ver `DESIGN-SYSTEM.md` §8.1 para la regla completa y el fix ya aplicado en
`next/shared.css`. Chequear esto en TODO trabajo con modo claro, no solo acá,
a menos que Federico pida explícitamente lo contrario.

## 4. CUÁNDO PARAR Y PREGUNTAR

Si al terminar algo la sensación es "esto se ve profesional pero no sé si es
CIERTO / de Federico específicamente" — es la señal de alarma. Mejor parar y
preguntarle a Federico un dato real (una métrica, una herramienta, una
decisión concreta que tomó) antes de rellenar con algo genérico que suene bien.

# AI CAPABILITIES FRAMEWORK — Federico Monroy
> Marco profesional de cómo uso IA en el contexto de Product Analytics + Behavioral Analytics.  
> Documento de trabajo, no marketing.  
> Última actualización: agosto 2026

---

## Propósito

Este framework documenta cuatro capas operativas que desarrollo como practitioner de Product Analytics / Behavioral Analytics. Cada capa puede ejecutarse de forma independiente o como sistema integrado. La capa más madura (audit en tiempo real) ya corre en conversaciones de clientes.

---

## Layer 01 — Chaos & Quality Testing
**Estado**: En desarrollo  
**Tagline**: "Un bot que rompe cosas antes que lo hagan tus usuarios."

### Qué hace
- **Erratic user simulation**: Bot en Playwright que navega el producto como un usuario confundido, impaciente y deliberadamente equivocado — clicks fuera de orden, inputs inválidos, interrumpir flujos en el medio, dropear archivos en el momento incorrecto.
- **Web-first QA automation**: Automatización completa del browser apuntando a las superficies de falla más comunes: validación de formularios, persistencia de estado, edge cases de navegación, estados de carga bajo condiciones lentas.
- **Accessibility sweep**: Checks de axe-core encima del test de comportamiento — captura contrast failures, missing labels, focus traps y gaps de teclado que el QA manual pierde sistemáticamente.
- **Analytics output**: Cada corrida produce un reporte estructurado: dónde rompió, qué tan difícil fue romperlo, severidad por impacto al usuario, qué paths el bot no pudo completar.

### Deliverable
Reporte de fallas priorizado con pasos reproducibles, scoring de severidad, y matriz severidad × esfuerzo. Listo para pegar en un sprint backlog. Cada issue linkea al recording de la sesión de falla.

### Stack técnico
- Playwright para automatización de browser
- axe-core para a11y
- JSON estructurado como output
- Posible extensión a mobile-web

---

## Layer 02 — Real-Time Analytics Audit
**Estado**: Activo  
**Tagline**: "Pasame tu URL. Tengo findings en 20 minutos."

### Qué hace
- **Performance + a11y baseline**: Lighthouse + axe en los primeros 5 minutos. No para reportar scores — para identificar qué issues tienen consecuencias directas de impacto al usuario que vale la pena resolver.
- **UX friction mapping**: Walkthrough manual del flujo principal con puntos de fricción anotados: dónde un usuario dudaría, qué le falta contexto, qué está compitiendo por atención, dónde se rompe la confianza.
- **Funnel hypothesis**: Hipótesis de drop-off basada en el flujo: qué pasos probablemente pierden más usuarios, y un spec de instrumentación — qué trackear en Pendo, qué session replays revisar, qué funnel construir para validar.
- **Live en conversaciones**: Esta capa corre en conversaciones de clientes o entrevistas — ver un producto por primera vez, identificar problemas, y enmarcarlo con respaldo analítico en tiempo real.

### Deliverable
Matriz severidad × esfuerzo. Top 3 fixes de mayor leverage. Tracking spec: qué instrumentar para confirmar cada hipótesis antes y después de shipear.

### Por qué funciona en entrevistas
Es la demostración más directa de cómo trabajo: ningún prep de su lado, 20 minutos con su URL real, findings reales sobre su producto real.

---

## Layer 03 — Research & Knowledge
**Estado**: En desarrollo  
**Tagline**: "No '¿les gustó a los usuarios?' — ¿realmente cambió su comportamiento?"

### Qué hace
- **RAG knowledge center**: Estructurar e indexar research acumulado — sesiones pasadas, hallazgos de competidores, entrevistas de usuarios, exports de Pendo — para que los insights sean consultables, no enterrados en Notion que nadie lee dos semanas después.
- **Behavioral clustering**: Agrupar usuarios por lo que efectivamente hacen — paths tomados, puntos de abandono, tasa de adopción de features, distribución de duración de sesión — no por lo que dicen en encuestas. Los segmentos emergen de los datos, no de suposiciones.
- **AI impact measurement**: La parte que la mayoría de equipos saltea: medir si una feature de IA realmente ayudó. Más allá del sentiment — cambio en conversion rate, delta en task completion time, error rate antes y después, behavior shift visible en session replays.
- **Longitudinal tracking**: Instrumentar el estado "antes" antes de shipear. Sin baseline documentado, no se puede probar que el "después" significa algo.

### Deliverable
Índice de research consultable + mapa de segmentos comportamentales + dashboard de AI impact con métricas pre/post, delta de comportamiento, y nivel de confianza por finding.

---

## Layer 04 — Design Automation
**Estado**: Planificado  
**Tagline**: "Yo sugiero. Vos modificás. El sistema se mantiene consistente."

### Qué hace
- **Design system ingestion**: Feedear un brand existente — archivo Figma, un sitio, un competidor — y extraer un sistema de tokens estructurado. No una adivinanza de qué deberían usar. Un análisis de qué están efectivamente usando, hecho explícito y consistente.
- **User story → design suggestion**: Dado un user story o sección de PRD, generar una propuesta de layout usando los tokens y componentes propios del producto. Figma Make + LLM para el borrador. Diseñador para la decisión. El objetivo es un starting point decidido, no un diseño terminado.
- **Figma + coding agent pipeline**: Design → code → de vuelta a design como un loop, no un handoff unidireccional. Cambios en tokens se propagan en ambas direcciones.
- **Human in the loop**: Cada sugerencia generada expone el decision point explícitamente: qué se asumió, qué alternativas existen, qué cambiaría si el contexto fuera distinto. Decisiones más rápidas, no decisiones eliminadas.

### Deliverable
Documento de design system vivo (tokens + componentes + reglas de uso) + pipeline de sugerencias que produce borradores de Figma desde stories — starting points decididos que el equipo puede construir desde ahí.

### Stack técnico
- Figma Make para generación de layouts
- LLMs para interpretación de stories y user flows
- Agentes de código para sincronización design ↔ implementation
- Token extraction automatizado desde Figma + sitios web

---

## La demo de entrevista

Cualquier capa puede correr en vivo en una conversación de cliente o entrevista. El audit es el más demostrable: 20 minutos con una URL produce findings reales, prioridades reales, y un tracking spec real sobre su producto real.

### Secuencia típica
1. El cliente comparte una URL o describe un problema de producto
2. Corro el audit en vivo — Lighthouse, friction walkthrough, funnel hypothesis
3. Los findings vuelven con severidad, esfuerzo, y qué medir para validar cada uno
4. Discutimos cuáles findings matchean lo que su equipo está tratando de resolver
5. Si chaos testing o design automation encajan en la conversación, vamos ahí después

---

## Posicionamiento

Este framework refleja el click que hice después de EY Fabric:

> No soy el UX Designer más fuerte en Figma.  
> Soy el que se mete en Pendo, encuentra dónde se rompe el producto, y lo mide.  
> El que puede hablar con dev, con negocio, y con diseño sin perder el hilo.

Las cuatro capas son la versión sistematizada de eso.

---

*Documento interno de trabajo — no para distribución directa.*  
*Artefacto visual: https://claude.ai/code/artifact/b9820503-9ae5-4232-a5c2-47a1de39796b*

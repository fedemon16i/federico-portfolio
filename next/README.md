# federico-portfolio/next — el próximo portfolio, en construcción

Carpeta hermana, no linkeada desde el sitio en vivo (`../index.html`,
`../projects.html`) — acceso solo por URL directa, a propósito, mismo
patrón que `../projects/process.html` y `../projects/ey-fabric-design-system.html`.

**Por qué existe:** Federico pidió evolucionar el portfolio de a poco, casi
copia del contenido actual pero mejorada, sin tocar el sitio en vivo hasta
que cada pieza esté lista. Contexto completo del pedido en
`fm-os/knowledge/portfolio-narrative/ey-fabric-rebuild-2026-09-17.md`.

**Regla:** todo lo de acá se construye con los tokens reales de Carbon
Design System g100 ya documentados (ver `../projects/ey-fabric-design-system.html`
y `federico-os/docs/EY-DS.md`) — no inventar un sistema visual nuevo.

## Estado

- [x] `projects/ey-fabric-publisher.html` — flujo de Publisher (Queue → Type
      → Fields → Guidance → Onboard → AI Review → Live), formalizado y con
      la densidad de las 4 capturas reales de EY Fabric.
- [x] `projects/ey-fabric-configure.html` — flujo de Configure (Marketplace
      → detalles → form con guía de onboarding de 3 pasos → Billing →
      Confirmation), animado (cross-fade de escenas, stagger de cards,
      overlay de onboarding, checkmark de éxito), con Replay, tema oscuro/
      claro y `prefers-reduced-motion`. Comparte densidad y tokens con
      `ey-fabric-publisher.html`.
- [ ] Visión de Fabric Next (transparencia de agente, estilo OpenClaw/harness).
- [ ] Design system paralelo wireframe, moderno y limpio, para el resto del
      portfolio (skills beats incluido).
- [ ] Resto del portfolio.

# Portfolio — New Instructions (standing)

**Repo:** `federico-portfolio` (y/o branch del rediseño)  
**Última actualización:** 2026-08-23  
**Uso:** pegar secciones en chats separados · este archivo es fuente de verdad en el repo

---

## 0. Cómo trabajar (dos chats, no uno)

| Chat | Scope | No tocar |
|------|--------|----------|
| **A — OS Shell** | Home, nav tipo sistema, Projects index, Skills, Design System, Resume, Contact, avatar/holograma, routing/URLs | Players de casos, copy profundo de cada case |
| **B — Projects** | Cada case, players, light/dark de cases, storytelling ownership | Rediseñar el OS entero |

**Regla:** reutilizar animaciones, iconos, secciones y assets. Cambiar layout, copy, tipografía por marca, ownership, players chrome. **No rehacer animaciones desde cero.**

**Stack global (si hay acceso):**
- `ai-capability-os` → CONTEXT-BRIEF, coordination/HANDOFF  
- `federico-skills/knowledge/portfolio-narrative/*`  
- `federico-skills/knowledge/ui-patterns/anti-slop-and-motion-tools.md`  
- Local: `CLAUDE.md`, `CLAUDE-SHORT.md`, `DESIGN-PRINCIPLE-stage-language.md`, `context/DESIGN-SYSTEM.md`, bio en `home-photos` / FEDERICO-BIO-PORTFOLIO-CONTEXT

**Preguntar a Federico solo:** intensidad cyberpunk/E-Ink, copy fino, zip aduanas, orden de cases.  
**No preguntar:** ownership (sí), métricas inventadas EY (no), reescribir animaciones (no).

---

# CHAT A — OS Shell (FM OS)

## Alma

- **PostHog:** OS real — chrome lateral, ventana central, URL compartible; mobile ventana HOME vs desktop de carpetas al cerrar.  
- **Nitin:** nav fija + ventanas; evitar CTAs confusos lista vs preview.  
- **Martin Refi:** one-liner de impacto.  
- **Amit:** qué hizo / rubro / duración + visual.  
- **vrtxforge / Behance futuristic:** motion de ventanas (legibilidad primero).  
- **Estética FM:** cyberpunk, glitch, luces; explorar E-Ink (menos backlight).  
- **Reclutador:** labels humanos, path a Projects/EY en <2 clics, mobile legible.

## Superficies

| Superficie | Regla |
|------------|-------|
| Resume | Paridad producción |
| Contact | Idéntico producción |
| Home | Nueva estructura OS + bio/fotos que se agrandan |
| Design system | Completo + encapsulado por proyecto |
| Projects | Solo índice |
| Skills | Solo skills; dark/light prioritario con EY |

Avatar holográfico opcional con frases / preguntas simples en about.

---

# CHAT B — Projects

## Principio
No rebuild. Reutilizar animaciones y assets. Mejorar storytelling + player chrome + tipografía marca + light/dark.

## Players (TODOS)
- Texto de etapa **siempre visible**, misma aparición  
- Animación siempre visible (split ingenioso, no perder mock)  
- Pause **real**, más lento, progreso/scrubber si viable  
- Mobile (Chek, Blockchains): mismo contrato  
- Dark/light: **EY + Skills** primero  

## Por proyecto

**EY:** publishers/marketplace → formularios (códigos, series, equipos); Pendo drop-offs/campos error → patrones; player OK, copy explícito; tipografía ey.com; NDA; no métricas inventadas.

**Blockchains → Equs:** screenshots antes/después; naming Equs; players mobile.

**Chek:** modernización UI tarjeta/onboarding + educación financiera; nota **Ripley adquirió Chek**; link corta-y-clara.

**DollarCity:** pulir; ref dollarama.com.

**Aduanas:** transformación digital; pedir zip si falta; sin cyberpunk del OS.

## Tipografía cases ≠ skin OS
Cases = marca del cliente. OS = cyberpunk Federico.

---

## Prompts cortos

**Chat A:**
```text
Modo: FM OS Shell — Chat A.
Leé PORTFOLIO-NEW-INSTRUCTIONS.md sección Chat A.
Resume=paridad prod. Contact=idéntico. Home=bio+fotos+OS.
Cyberpunk; preguntá solo intensidad E-Ink/glitch.
No players de cases. Plan 5 pasos, esperá dale.
```

**Chat B:**
```text
Modo: Portfolio Projects — Chat B.
Leé PORTFOLIO-NEW-INSTRUCTIONS.md sección Chat B + DESIGN-PRINCIPLE-stage-language.md.
No rehacer animaciones. Players: texto siempre visible, pause real, más lento.
Ownership storytelling. EY Pendo/formularios. Chek nota Ripley. Equs naming.
Plan por proyecto, esperá dale.
```

*Fin*

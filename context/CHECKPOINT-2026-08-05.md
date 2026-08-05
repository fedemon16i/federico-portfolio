# CHECKPOINT — 2026-08-05, cierre de EY + Chek + Blockchain
> Punto de restauración. Si algo sale mal después de subir, esto dice
> exactamente a qué volver y cómo confirmarlo.

## Verificado contra el sitio en vivo, justo antes de este checkpoint
| Archivo | En vivo (bytes) | Nuevo (bytes) | ¿Cambia? |
|---|---|---|---|
| index.html | 188,708 | 192,863 | Sí |
| assets/shared.css | 78,115 | 78,301 | Sí |
| projects/ey-fabric.html | 46,139 | 53,581 | Sí |
| projects/chek.html | 204,361 | 209,635 | Sí |
| projects/dollarcity.html | 96,774 | 96,882 | Sí |
| projects/blockchain.html | 134,893 | 148,077 | Sí |
| projects.html | 20,996 | 20,996 | **No — ya está al día, NO subir de nuevo** |
| assets/main.js | 17,895 | 17,895 | **No — ya está al día, NO subir de nuevo** |

## Cómo confirmar que el deploy salió bien
```bash
curl -s https://fedemon16i.github.io/federico-portfolio/index.html -o /dev/null -w "%{size_download}\n"
```
Tiene que dar `192863`. Repetir por cada archivo de la tabla de arriba.
Si el número no cambia después de subir, esperar 2 minutos más (caché de
GitHub Pages) antes de asumir que algo falló.

## Qué se cerró esta sesión (resumen ejecutivo)
- **Home**: typewriter real + barra de progreso en los textos narrativos,
  tilt 3D + "estiramiento" al expandir cards, temblor sutil en las
  vecinas, carrusel del eje "AI/LLM/Agent/..." funcionando de verdad.
- **EY**: nav y light mode rotos de raíz (script viejo sin dropdown,
  `:root` local pisando el tema) — arreglados. Demo con altura dinámica,
  ventana-en-canvas, narrativa de 5 momentos con Replit/Factory.ai/
  MCP/Agents. Tools reordenadas (Pendo+AI+Figma líderes).
- **Chek**: light mode arreglado (13 casos), narrativa de 4 momentos,
  **bug real de auto-play encontrado y arreglado** (se autocancelaba),
  auto-play disparado solo en mobile.
- **Blockchain**: light mode y nav ya estaban bien de antes. Narrativa de
  4 momentos, toggle mobile/web nuevo, **4 de 5 pestañas del sidebar del
  mockup web eran decorativas sin contenido — ahora las 5 funcionan**.
- **Todas**: cero emojis como ícono, anime.js instalado y validado, 36
  combinaciones de página×ancho mobile confirmadas sin overflow.

## Si hay que revertir algo puntual
Los archivos ANTERIORES a esta sesión siguen en el historial de git del
repo (cada subida anterior quedó como commit). `git log --oneline` en el
repo y `git revert <hash>` del commit específico si algo puntual rompió
algo que antes andaba bien — no hace falta revertir todo el sitio.

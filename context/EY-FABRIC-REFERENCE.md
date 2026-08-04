# EY FABRIC — Referencia visual real
> Las capturas originales (6 imágenes) se compartieron en el chat pero no
> se pueden guardar como binarios acá — este documento describe cada una
> en detalle para que cualquier sesión futura (yo u otra IA) pueda
> reconstruir demos fieles sin necesitar las imágenes de nuevo.

---

## Imagen 1 — Home / Landing
- Nav superior oscura: logo "EY Fabric", items "Overview", "Marketplace",
  "Tools", "Learn & Connect" (todos con flecha de dropdown), barra de
  búsqueda "Search for products, documentation an...", badge morado
  "✦ AI", ícono de ayuda (?), "Manage", avatar circular "FM".
- Hero: fondo oscuro casi negro con un **gradiente diagonal vívido en la
  esquina superior derecha** — azul → dorado/naranja → magenta/rosa,
  como una aurora boreal de colores saturados sobre negro.
- Eyebrow: "The platform to unlock technology at speed and scale"
- Título: "EY Fabric: Unlocking technology at speed and scale"
- Cuerpo: "Leverage a globally integrated platform to build
  technology-enabled solutions for EY teams and clients..."
- 2 botones: "Explore Catalog" (blanco, sólido) y "Contact us" (outline)
- Debajo del hero, sección oscura: "Experience the new Developer Workflow"
  con ícono de cohete, botón "Get Started"
- Más abajo: "Explore the catalog" con cards de categorías empezando a
  asomar (cortado en la captura)

## Imagen 2 — Catálogo (sin filtrar)
- Breadcrumb: "Home > Catalog"
- Banner superior con gradiente morado/rosa/azul, más sutil que el hero
- Título: "Make your vision a reality with Fabric solutions."
- Sidebar izquierda con categorías y contadores reales:
  **All Items (317) · Services (157) · Licenses (21) · Starter Kits (17)
  · Code Packages (11) · APIs (41) · Explore Fabric (70)**
- Barra de búsqueda + dropdown "Recently Updated"
- 6 cards grandes de categoría, cada una con imagen de fondo abstracta
  distinta (textura de partículas rosa/violeta, cristal iridiscente,
  líneas de luz azul, código con ícono `</>`, plumas/ondas, esferas
  conectadas) — ícono + título + descripción corta sobre cada imagen:
  Services, Licenses, Starter Kits, Code Packages, APIs, Explore Fabric
- Debajo: "All Items" con grid de cards individuales (Translation
  Services, Kubernetes as a Service, RPAaaS UiPath Licensing, CTP PEGA
  SaaS, etc.) — cada una con ícono de categoría, nombre, tag pequeño,
  descripción de 1-2 líneas cortada

## Imagen 3 — Catálogo filtrado (Services)
- Mismo layout, sidebar ahora con "Services" resaltado/activo
- Banner ancho con la textura de partículas rosa/violeta (la misma de la
  card "Services" de la imagen 2, ahora como hero de la sección)
- Chips de filtro: "All Services (157) · Types · Offerings (105) ·
  Add-ons (52) · Environments · PROD (157)"
- Grid de cards en 4 columnas: cada card con ícono de organigrama
  (círculos conectados), nombre del servicio, categoría/subcategoría en
  gris, descripción de 2 líneas, tags pequeños (ej. "kubernetes", "aks"),
  2 botones al pie: "View More" y "Get Started"
- Servicios reales visibles: Kubernetes as a Service - Multi-Tenant
  [EYGS], RPAaaS UiPath Licensing, CTP PEGA SaaS (Production/CORE), EY
  Experience Platform, EY Fabric Sandbox, Synthesia Video Creator
  License, Power BI User License

## Imágenes 4-6 — Workbench (Offering Customization) — el flujo de 3 pasos
Breadcrumb: "Catalog > Workbench". Stepper horizontal arriba a la derecha:
**Customization → Billing → Confirmation** (círculos conectados por línea,
el paso activo resaltado, los completados con check verde).

### Imagen 4 — Paso 1: Customization
- Título: "Offering Customization" / "Workbench"
- Sección "① Configure Your Instance" con **muchos campos de formulario**:
  - "Friendly Instance Name (Required)" — input de texto vacío
  - "Configure the Instance" (subtítulo)
  - "Location (Required)" — dropdown "US West 2"
  - "Select the individual who will serve as the official point of
    contact..." — campo de búsqueda con ícono de lupa
  - "Important Instruction" — textarea placeholder "Please choose at
    least one service required for your workbench instance."
  - "Add admin users and groups to Project" — radio YES/NO (NO activo)
  - "Data Storage Management" (empieza, cortado)
- Panel derecho: disclaimer sobre costos + "Your Order" con total "$0/Month"
- Botones: "Cancel" / "Continue to Billing" (deshabilitado hasta completar)
- **Esto es el problema real que se detectó**: demasiados campos
  obligatorios antes de poder avanzar, ninguna indicación de progreso
  parcial, el formulario entero vive en una sola pantalla larga con scroll.

### Imagen 5 — Paso 2: Billing
- Paso 1 ahora colapsado en una card resumen con check verde, botón "Edit"
  — muestra los valores ya cargados: "xdatest", "westus2",
  "Federico.Monroy@ey.com" (dato sensible — ocultar/genericizar en demos)
- "② Billing" — campo "Search for a workspace..." + botón "+ Create New
  Workspace"
- "Latest workspaces created" — lista paginada (1/9) con controles
  de flecha `<< < > >>`

### Imagen 6 — Paso 3: Confirmation
- Pasos 1 y 2 ambos colapsados con check verde
- "Billing" resumen: Workspace "testwork0904", Status "Completed" (badge
  verde), "Engagement Code: I-66142016" con badge "Active", nombre de
  contacto (dato sensible — ocultar)
- Botón final: "Submit Order" (aparece deshabilitado en la captura)

---

## Paleta de color real (para reusar en demos, sin logo de EY)
- Fondo base: negro casi puro (`#0a0a0a` – `#0e0d0c`)
- Gradiente hero: azul `#5a96dc` → naranja `#d97757` → magenta `#e65a96`
  → dorado `#f5c850`, diagonal ~115deg
- Verde de éxito/completado: similar a `#22c55e`
- Rojo/badge de alerta: no visible en estas capturas específicas
- Texto: blanco/gris claro sobre negro, jerarquía clara título/cuerpo

## Ya aplicado en el portfolio
El demo "Measure" de EY Fabric (home + su propia página) ya recorre estas
6 pantallas en formato wireframe (líneas en vez de texto real, cursor de
visitante, funnel de abandono al final marcando el paso "Configure" en
rojo). El gradiente del hero ya se actualizó para ser más fiel al vívido
azul-naranja-rosa-dorado real. **Pendiente**: aplicar el mismo criterio de
"muchos campos = fricción real" al resto de la narrativa, y el patrón de
"ventana flotando en canvas cuadriculado" (ver DESIGN-SYSTEM.md) a estas
pantallas específicas.

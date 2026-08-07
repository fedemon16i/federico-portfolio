# Federico Monroy — Portfolio

UX / Product Designer — behavioral analytics, research, product design.

**Live:** [fedemon16i.github.io/federico-portfolio](https://fedemon16i.github.io/federico-portfolio/)

Static site (HTML / CSS / JS). **No build step.** Primary deploy: **GitHub Pages** from `main`.

---

## Structure (current)

```
federico-portfolio/
├── index.html                    Home
├── projects.html                 Projects index (shared card language)
├── about.html                    About (align to shell when touched)
├── contact.html                  Contact
├── resume.html                   Resume page (portfolio-styled)
├── resume-ats.html               ATS / print-friendly resume
├── design-system.html            Living design system (source of truth UI)
│
├── projects/
│   ├── ey-fabric.html            EY Fabric (Globant)
│   ├── blockchain.html           Blockchains 3D
│   ├── chek.html                 Chek digital wallet / virtual card
│   ├── dollarcity.html           DollarCity × Dollarama
│   ├── customs.html              Customs / Aduanas ES
│   ├── forecast.html             Forecast
│   └── …legacy pages if any
│
├── assets/
│   ├── shared.css                Legacy shared tokens (prefer design-system.html going forward)
│   ├── main.js                   Legacy nav / helpers where still linked
│   ├── Federico_Monroy_Resume_ATS.html
│   ├── Federico_Monroy_Resume.txt
│   ├── Federico_Monroy_CV.pdf    Optional legacy PDF
│   ├── images/                   Project screenshots
│   ├── videos/                   Project video
│   ├── chek/                     Chek case media (IMG_*.jpeg, …)
│   └── ASSETS_PLAN.md            Asset replacement notes (if present)
│
├── docs/                         Framework documentation
│   ├── PORTFOLIO-FRAMEWORK.md    Full system inventory
│   ├── FRAMEWORK-EY-FABRIC.md
│   ├── FRAMEWORK-BLOCKCHAINS.md
│   ├── FRAMEWORK-CHEK.md
│   └── MANIFEST.md
│
├── PORTFOLIO-FRAMEWORK.md        Root copy of framework inventory
├── CONTEXT-CHECKPOINT.md         Session / upload context
├── MANIFEST.md                   Deliverables list
└── README.md                     This file
```

---

## Where things live (rules)

| What | Where |
|------|--------|
| **UI system (live)** | `design-system.html` |
| **Written framework** | `docs/PORTFOLIO-FRAMEWORK.md` (+ root copy) |
| **Per-case notes** | `docs/FRAMEWORK-*.md` (only deltas: accent, graphic, copy) |
| **Cases** | `projects/*.html` |
| **Resume download** | `assets/Federico_Monroy_Resume_ATS.html` + `.txt` |
| **Case images** | `assets/` or `assets/[project]/` or paths already used in HTML |
| **Legacy CSS/JS** | `assets/shared.css`, `assets/main.js` — new pages prefer self-contained shell from the framework |

**Do not** invent a second design-system file outside `design-system.html` + `docs/`.

---

## Design system (short)

### Accents (cases)
| Project | Accent |
|---------|--------|
| EY Fabric | `#ffe600` / gold family |
| Blockchains | `#22d4c8` |
| Chek | `#7a3be0` |
| DollarCity | green / yellow family |
| Customs | red family |

### Typography (framework-aligned pages)
- **Instrument Sans** — display / body  
- **IBM Plex Mono** — eyebrows, chips, nav labels  
- Body target: `clamp(16px, 1.05vw, 18px)`  

(Legacy pages may still use Syne / DM Sans via `shared.css` until migrated.)

### Shared patterns
- **Narrative player** — skills (home), EY Product intelligence, Blockchains Demo, Chek **The loop**
- **Stack tools** — colored `.icochip` logos + tooltip tilt (not text-only for Figma/Pendo/…)
- **No emojis** in UI (SVG only)
- Theme: `data-theme` + `localStorage`
- `prefers-reduced-motion` respected on new pages

Full detail: open **`design-system.html`** and **`docs/PORTFOLIO-FRAMEWORK.md`**.

---

## How to run

```bash
# from repo root
python3 -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080`.

---

## How to publish (GitHub Pages)

```bash
git add -A
git status
git commit -m "your message"
git pull --rebase origin main
git push origin main
```

Wait for the Pages workflow, then hard-refresh the live site.

If push is rejected:

```bash
git pull --rebase origin main
git push origin main
```

---

## Checkpoint ZIP workflow

When applying a design-session zip:

1. Unzip **into the repo root** (review diffs before committing).
2. Ensure `projects/chek.html` is present if built after the zip date.
3. Commit only files you intend to ship.
4. Push `main` as above.

---

## Resume

| File | Use |
|------|-----|
| `resume.html` | On-site resume |
| `assets/Federico_Monroy_Resume_ATS.html` | Print → PDF for applications |
| `assets/Federico_Monroy_Resume.txt` | ATS plain text |

Portfolio URL on the CV: https://fedemon16i.github.io/federico-portfolio/

---

## Accessibility (target)

- Skip link, `:focus-visible`, aria on icon controls  
- Keyboard-reachable player / chips  
- No font-weight below 400 on critical text  
- Reduced motion on new framework pages  

---

Built by Federico A. Monroy — Córdoba, Argentina.

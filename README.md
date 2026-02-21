# Federico Monroy — Portfolio

> UX / Product Experience Analyst — Behavioral Analytics

A modern, dark-mode, fully accessible static portfolio site.

## Structure

```
portfolio/
├── index.html                  — Home (Hero + Pro Grid + Personal Grid + Resume + About + Contact)
├── about.html                  — About page
├── resume.html                 — Resume page (PDF embed)
├── contact.html                — Contact page
├── projects/
│   ├── ey-fabric.html          — EY Fabric (Globant)
│   ├── blockchain.html         — Blockchain 3D Immersive
│   ├── customs.html            — Customs / Aduanas ES
│   ├── chek.html               — Chek Digital Wallet
│   ├── dollarcity.html         — DollarCity × Dollarama
│   ├── taxsynapse.html         — TaxSynapse
│   ├── industrial-design-thesis.html
│   ├── depure.html
│   └── layer-ey.html
├── assets/
│   ├── shared.css              — Full design system
│   ├── main.js                 — Navigation, keyboard, animations
│   ├── Federico_Monroy_CV.pdf  — Resume PDF
│   └── ASSETS_PLAN.md          — Asset tracking & replacement guide
└── README.md
```

## How to Run

No build step. Open `index.html` in any browser, or serve with:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Design System

### Color Tokens (in `assets/shared.css`)
- `--bg-base`: #0c0c0c (deepest dark)
- `--bg-surface`: #141414
- `--bg-raised`: #1c1c1c
- `--text-primary`: #f2f2ee
- `--text-secondary`: #a8a8a0
- Per-project accents defined as `--accent-*` variables

### Per-Project Accents
| Project        | Accent                |
|---------------|-----------------------|
| EY Fabric     | `#c8a84b` (gold)      |
| Blockchain    | `#22d4c8` (cyan/teal) |
| Customs ES    | `#e05c4a` (red)       |
| Chek          | `#9b6cff` (violet)    |
| DollarCity    | `#f4c842` (yellow)    |
| TaxSynapse    | `#5fe6a0` (mint)      |
| Personal      | `#8ba8c8` (steel blue)|

### Typography
- Display: **Syne** (Google Fonts) — weights 600, 700, 800
- Body: **DM Sans** (Google Fonts) — weight 400, 500, 600
- Minimum body weight: 400 (accessibility requirement)
- No font-weight 300 anywhere

## Accessibility

- ✅ `skip-to-main` link on every page
- ✅ All interactive elements have visible `:focus-visible` states
- ✅ ARIA labels on nav, menus, buttons, and regions
- ✅ `aria-expanded` / `aria-haspopup` on dropdown
- ✅ Keyboard nav: Arrow keys in dropdown, Escape to close
- ✅ `prefers-reduced-motion` disables all animations
- ✅ No font-weight below 400
- ✅ No `overflow-x` issues — tested at 320px viewport
- ✅ `role="menu"` / `role="menuitem"` on nav dropdown
- ✅ No dark green on dark backgrounds

## Adding Real Content

See `assets/ASSETS_PLAN.md` for the full asset replacement guide.

Quick summary:
1. Drop project screenshots into `assets/images/[project-name]/`
2. Replace `<div class="card-image-placeholder">` with `<img src="..." alt="...">`
3. Drop project videos into `assets/videos/[project-name]/`
4. Use `<video>` element inside `.evidence-placeholder` containers

## Deploying

This is a fully static site. Deploy to:
- **Netlify**: Drag the `portfolio/` folder to Netlify Drop
- **Vercel**: `vercel --prod` from the portfolio directory
- **GitHub Pages**: Push to a repo, enable Pages from root

---

Built with care by Federico A. Monroy — Córdoba, Argentina

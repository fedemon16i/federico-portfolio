# ASSETS PLAN — Federico Monroy Portfolio

This document tracks all placeholder assets and describes exactly what to add, where to put it, and how to wire it up.

---

## Asset Status Legend

| Status | Meaning |
|--------|---------|
| ✅ Real | Real asset already in place |
| 🔲 Placeholder | Placeholder — needs replacement |
| 🔒 NDA | Under NDA — placeholder intentional |

---

## 1. Resume PDF

| File | Status | Notes |
|------|--------|-------|
| `assets/Federico_Monroy_CV.pdf` | ✅ Real | Uploaded by user, embedded in `resume.html` |

---

## 2. Project Hero Images / Screenshots

### How to add:
1. Create folder: `assets/images/[project-slug]/`
2. Add image file (JPG, PNG, or WebP)
3. Replace the `<div class="card-image-placeholder">` in `index.html` with:

```html
<div class="card-image">
  <img src="../assets/images/dollarcity/hero.jpg" alt="DollarCity platform screenshot showing fraud dashboard" loading="lazy" />
</div>
```

### Per-project asset requirements:

| Project | Slug | Required Files | Status |
|---------|------|----------------|--------|
| EY Fabric | `ey-fabric` | `hero.jpg`, `flow-1.jpg`, `dashboard.jpg` | 🔲 Placeholder |
| Blockchain | `blockchain` | `hero.jpg`, `3d-map.jpg`, `desktop.jpg` | 🔲 Placeholder |
| Customs ES | `customs` | `hero.jpg`, `flow.jpg`, `prototype.jpg` | 🔲 Placeholder |
| Chek | `chek` | `hero.jpg`, `onboarding.jpg`, `ds.jpg` | 🔲 Placeholder |
| DollarCity | `dollarcity` | `hero.jpg`, `dashboard.jpg`, `journey.jpg` | 🔲 Placeholder |
| TaxSynapse | `taxsynapse` | `hero.jpg`, `mvp.jpg`, `ds.jpg` | 🔲 Placeholder |
| ID Thesis | `industrial-design-thesis` | `hero.jpg`, `process.jpg` | 🔲 Placeholder |
| Depure | `depure` | `hero.jpg`, `screens.jpg` | 🔲 Placeholder |
| LayerEY | `layer-ey` | `hero.jpg`, `system.jpg` | 🔲 Placeholder |

---

## 3. Personal Tile Background Images

Personal project tiles use a full-bleed background image. Add images and replace:

```html
<!-- Find this in index.html personal-grid section: -->
<div class="personal-tile-placeholder">...</div>

<!-- Replace with: -->
<img class="personal-tile-image" src="../assets/images/industrial-design-thesis/tile.jpg" alt="Industrial design thesis process work" loading="lazy" />
```

---

## 4. Project Evidence Screens (per project page)

Each project page has an `evidence-grid` section with placeholder divs.

Replace:
```html
<div class="evidence-placeholder">
  <span class="evidence-placeholder-icon">📱</span>
  <span class="evidence-placeholder-label">Screenshot Placeholder</span>
</div>
```

With:
```html
<figure class="evidence-figure">
  <img src="../assets/images/dollarcity/dashboard.jpg" alt="Fraud dashboard showing transaction review flow" loading="lazy" style="width:100%;border-radius:var(--radius-md);" />
  <figcaption style="font-size:0.8125rem;color:var(--text-tertiary);margin-top:var(--space-8);">Fraud monitoring dashboard — main review flow</figcaption>
</figure>
```

---

## 5. Video Evidence (Blockchain Project Special)

The Blockchain project may have video assets uploaded. If present:

1. Add video files to `assets/videos/blockchain/`
2. Replace evidence placeholders:

```html
<div class="evidence-placeholder">
  <!-- Replace with: -->
  <video
    controls
    preload="metadata"
    poster="assets/images/blockchain/video-poster.jpg"
    style="width:100%;border-radius:var(--radius-md);"
    aria-label="Blockchain 3D map feature demonstration"
  >
    <source src="../assets/videos/blockchain/map-demo.mp4" type="video/mp4" />
    <p>Your browser doesn't support video. <a href="../assets/videos/blockchain/map-demo.mp4">Download the video</a>.</p>
  </video>
</div>
```

---

## 6. About Page Photo

Location in `about.html`:
```html
<div class="about-photo-placeholder" ...>👤</div>
```

Replace with:
```html
<img
  src="assets/images/federico-monroy.jpg"
  alt="Federico Monroy — Senior UX Designer"
  width="120"
  height="120"
  style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:2px solid var(--border-default);"
/>
```

**Photo specs:** Minimum 240×240px, 1:1 ratio, JPG or WebP.

---

## 7. Favicon & OG Image

Add to `<head>` of all pages:
```html
<link rel="icon" href="assets/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png" />
<meta property="og:image" content="https://yoursite.com/assets/og-image.jpg" />
<meta property="og:title" content="Federico Monroy — UX & Behavioral Analytics" />
<meta property="og:description" content="Product experiences diagnosed with data and improved with intent." />
<meta name="twitter:card" content="summary_large_image" />
```

**OG Image specs:** 1200×630px, JPG, ≤200KB.

---

## 8. Image Optimization Checklist

Before deploying with real images:

- [ ] All images compressed (use Squoosh or ImageOptim)
- [ ] Hero images: WebP, ~100–200KB max
- [ ] Thumbnails: WebP, ~30–60KB max
- [ ] All `<img>` tags have meaningful `alt` text
- [ ] All `<img>` tags have `loading="lazy"` (except above-the-fold hero)
- [ ] All `<img>` tags have explicit `width` and `height` to prevent CLS
- [ ] Video files: MP4 (H.264), ≤5MB for demos

---

## 9. LinkedIn URL

Currently set to: `https://linkedin.com/in/federicomonroy`

If the URL is different, find/replace across all HTML files:
```bash
grep -r "linkedin.com/in/federicomonroy" . --include="*.html"
```

---

## 10. Deployment Checklist

- [ ] All placeholder images replaced (or intentionally kept)
- [ ] LinkedIn URL verified
- [ ] Email address verified (`fedemon16i@gmail.com`)
- [ ] PDF resume accessible at `assets/Federico_Monroy_CV.pdf`
- [ ] Test on mobile (320px minimum)
- [ ] Test keyboard navigation on home page and all project pages
- [ ] Test with browser zoom at 200%
- [ ] Run WAVE accessibility checker on home + 1 project page
- [ ] Verify no horizontal scroll at any viewport width

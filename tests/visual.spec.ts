import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Visual regression + a11y for the 6 viewports defined in playwright.config.ts
// First run creates baselines in tests/snapshots/. Subsequent runs diff against them.
// On intentional design change: npx playwright test --update-snapshots

const pages = [
  { name: 'home',   path: '/'             },
  { name: 'about',  path: '/about.html'   },
  { name: 'resume', path: '/resume.html'  },
];

for (const { name, path } of pages) {
  test(`${name} — visual regression`, async ({ page }) => {
    await page.goto(path);
    // Graceful fallback: networkidle may never fire on animated pages
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });

  test(`${name} — accessibility`, async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    // Stop CSS + JS animations before axe scans so animated pages don't time out
    // colorScheme: dark ensures @media (prefers-color-scheme: dark) matches alongside theme.js data-theme
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
    // Allow theme JS to apply data-theme before axe reads computed styles
    await page.waitForTimeout(500);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      // Exclude decorative proc visualization columns (6px mock UI text with hardcoded low-opacity colors)
      .exclude('#sig-screen')
      .exclude('.proc-right')
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

// Project pages — continuous animations never reach networkidle, use domcontentloaded + delay
const projects = [
  { name: 'ey-fabric',   path: '/projects/ey-fabric.html'   },
  { name: 'blockchain',  path: '/projects/blockchain.html'  },
  { name: 'chek',        path: '/projects/chek.html'        },
  { name: 'dollarcity',  path: '/projects/dollarcity.html'  },
  { name: 'customs',     path: '/projects/customs.html'     },
  { name: 'forecast',    path: '/projects/forecast.html'    },
];

for (const { name, path } of projects) {
  test(`${name} — visual regression`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(800);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}

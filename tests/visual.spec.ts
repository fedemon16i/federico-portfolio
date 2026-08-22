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
  test(`${name} — visual regression`, async ({ page }, testInfo) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    // Dismiss any motion for stable screenshots
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });

  test(`${name} — accessibility`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

// Project pages
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
    await page.waitForLoadState('networkidle');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}

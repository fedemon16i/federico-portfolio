/**
 * diagnose-scroll.js
 * Screenshots the hero section at desktop + mobile and reports layout measurements.
 * Uses the system-cached Chromium (no CDN download needed).
 * Blocks external requests (fonts.googleapis.com etc.) so they fail fast.
 */

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs   = require('fs');
const http = require('http');

const CHROMIUM = '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome';
const ROOT     = path.resolve(__dirname, '..');
const PORT     = 9876;
const OUT      = __dirname;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 390,  height: 844 },
];

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.pdf': 'application/pdf',
};

function startServer() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      let fp = path.join(ROOT, req.url.split('?')[0]);
      if (fp.endsWith('/')) fp += 'index.html';
      fs.readFile(fp, (err, data) => {
        if (err) { res.writeHead(404); res.end('404'); return; }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
        res.end(data);
      });
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

(async () => {
  const server = await startServer();

  const browser = await chromium.launch({
    executablePath: CHROMIUM,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });

    // Block external requests so fonts.googleapis.com etc. fail fast
    await ctx.route('**', route => {
      const url = route.request().url();
      if (url.startsWith(`http://127.0.0.1:${PORT}`)) return route.continue();
      route.abort();
    });

    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/index.html`, {
      timeout: 15000,
      waitUntil: 'domcontentloaded',
    });

    const metrics = await page.evaluate(() => {
      const hero = document.querySelector('.hero');
      const html = document.documentElement;
      const body = document.body;

      if (!hero) return { error: '.hero not found' };

      const rect  = hero.getBoundingClientRect();
      const style = getComputedStyle(hero);

      return {
        heroHeight:        Math.round(rect.height),
        heroTop:           Math.round(rect.top),
        heroBottom:        Math.round(rect.bottom),
        viewportHeight:    window.innerHeight,
        pageScrollHeight:  Math.max(body.scrollHeight, html.scrollHeight),
        minHeight:         style.minHeight,
        paddingTop:        style.paddingTop,
        paddingBottom:     style.paddingBottom,
        overflow:          style.overflow,
        hasOverflowX:      html.scrollWidth > html.clientWidth,
        readyState:        document.readyState,
      };
    });

    const outFile = path.join(OUT, `hero-${vp.name}.png`);
    await page.screenshot({ path: outFile, fullPage: false });

    console.log(`\n── ${vp.name.toUpperCase()} (${vp.width}×${vp.height}) ──`);
    if (metrics.error) {
      console.log('  ERROR:', metrics.error);
    } else {
      console.log(`  heroHeight:          ${metrics.heroHeight}px`);
      console.log(`  heroTop:             ${metrics.heroTop}px`);
      console.log(`  heroBottom:          ${metrics.heroBottom}px`);
      console.log(`  viewportHeight:      ${metrics.viewportHeight}px`);
      console.log(`  pageScrollHeight:    ${metrics.pageScrollHeight}px`);
      console.log(`  computed min-height: ${metrics.minHeight}`);
      console.log(`  computed padding-top:${metrics.paddingTop}`);
      console.log(`  computed padding-bot:${metrics.paddingBottom}`);
      console.log(`  overflow:            ${metrics.overflow}`);
      console.log(`  horizontal overflow: ${metrics.hasOverflowX}`);
      console.log(`  readyState:          ${metrics.readyState}`);
      console.log(`  screenshot →         ${outFile}`);
    }

    await ctx.close();
  }

  await browser.close();
  server.close();
  console.log('\nDone.');
})();

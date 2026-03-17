// mobile-check.js — run with: node mobile-check.js
// Scans all HTML files for common mobile issues
const fs = require('fs');
const path = require('path');
const htmlFiles = [];
function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && !['node_modules','.git'].includes(f)) walk(full);
    else if (f.endsWith('.html')) htmlFiles.push(full);
  });
}
walk('.');
const checks = [
  { id: 'viewport',      pattern: /name="viewport"/,                    warn: 'Missing viewport meta tag' },
  { id: 'overflow-x',   pattern: /overflow-x:\s*hidden/,               warn: 'No overflow-x:hidden found (check shared.css separately)' },
  { id: 'font-weight',  pattern: /font-weight:\s*3[0-9]{2}/,           warn: 'font-weight below 400 detected' },
  { id: 'skip-link',    pattern: /skip-link/,                           warn: 'Missing skip-link' },
  { id: 'nav-mobile',   pattern: /nav-mobile/,                          warn: 'No mobile nav found' },
  { id: 'home-mobile',  pattern: /nav-mobile[\s\S]{0,500}href="index/,  warn: 'Home link missing from mobile nav' },
  { id: 'hamburger',    pattern: /nav-hamburger/,                       warn: 'No hamburger button found' },
  { id: 'aria-label',   pattern: /aria-label/,                         warn: 'No aria-label found on page' },
  { id: 'img-alt',      pattern: /<img(?=[^>]*src)[^>]*alt=/,          warn: 'Some img tags may be missing alt' },
];
let totalIssues = 0;
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const issues = [];
  checks.forEach(c => {
    if (!c.pattern.test(content)) issues.push(c.warn);
  });
  if (issues.length) {
    console.log(`\n⚠️  ${file}`);
    issues.forEach(i => console.log(`   → ${i}`));
    totalIssues += issues.length;
  } else {
    console.log(`✅ ${file}`);
  }
});
console.log(`\n──────────────────────────────`);
console.log(`Total issues found: ${totalIssues}`);
console.log(`Run fixes above, then re-run: node mobile-check.js`);

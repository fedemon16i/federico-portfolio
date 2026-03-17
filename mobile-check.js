// mobile-check.js — run with: node mobile-check.js
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
  { pattern: /name="viewport"/,                              warn: 'Missing viewport meta tag' },
  { pattern: /font-weight:\s*3[0-9]{2}/,                    warn: 'font-weight below 400 detected' },
  { pattern: /skip-link/,                                    warn: 'Missing skip-link' },
  { pattern: /nav-mobile/,                                   warn: 'No mobile nav found' },
  { pattern: /nav-mobile[\s\S]{0,600}href="[./]*index\.html/, warn: 'Home link missing from mobile nav' },
  { pattern: /nav-hamburger/,                                warn: 'No hamburger button found' },
  { pattern: /aria-label/,                                   warn: 'No aria-label found on page' },
];

let totalIssues = 0;
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const issues = checks.filter(c => !c.pattern.test(content)).map(c => c.warn);
  if (issues.length) {
    console.log(`\n⚠️  ${file}`);
    issues.forEach(i => console.log(`   → ${i}`));
    totalIssues += issues.length;
  } else {
    console.log(`✅ ${file}`);
  }
});

console.log(`\n──────────────────────────`);
console.log(`Total issues: ${totalIssues}`);

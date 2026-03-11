(function () {
  const STORAGE_KEY = 'theme-preference';
  const stored = localStorage.getItem(STORAGE_KEY);
  const theme = stored || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  });
})();

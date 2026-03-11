(function () {
  const STORAGE_KEY = 'theme-preference';
  const stored = localStorage.getItem(STORAGE_KEY);
  const theme = stored || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
})();

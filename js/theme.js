(function () {
  var STORAGE_KEY = 'theme-preference';
  var stored = localStorage.getItem(STORAGE_KEY);
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine effective theme
  var theme = stored || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  // Listen for system changes only if user hasn't manually overridden
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
})();

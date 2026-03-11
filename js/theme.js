(function () {
  const KEY = 'theme-preference';
  const theme = localStorage.getItem(KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  function applyIcons(t) {
    document.querySelectorAll('.icon-sun').forEach(function(el) {
      el.style.display = t === 'dark' ? 'block' : 'none';
    });
    document.querySelectorAll('.icon-moon').forEach(function(el) {
      el.style.display = t === 'light' ? 'block' : 'none';
    });
  }
  function init() {
    applyIcons(document.documentElement.getAttribute('data-theme'));
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
      applyIcons(next);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

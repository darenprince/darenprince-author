(function() {
  var btn = document.querySelector('[data-toggle-theme]');
  if (!btn) return;
  var body = document.body;
  var sun = btn.querySelector('.icon-sun');
  var moon = btn.querySelector('.icon-moon');

  function apply(theme) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add('theme-' + theme, 'theme-fade');
    setTimeout(function() { body.classList.remove('theme-fade'); }, 300);
    if (sun && moon) {
      if (theme === 'dark') {
        sun.style.display = 'none';
        moon.style.display = '';
      } else {
        sun.style.display = '';
        moon.style.display = 'none';
      }
    }
  }

  var saved = localStorage.getItem('theme');
  if (!saved) saved = 'dark';
  apply(saved);

  btn.addEventListener('click', function() {
    var newTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    apply(newTheme);
  });
})();

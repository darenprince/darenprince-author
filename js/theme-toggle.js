(function() {
  var container = document.querySelector('[data-toggle-theme]');
  if (!container) return;
  var body = document.body;
  var sun = container.querySelector('.icon-sun');
  var moon = container.querySelector('.icon-moon');
  var checkbox = container.querySelector('input[type="checkbox"]');

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
    if (checkbox) checkbox.checked = theme === 'dark';
  }

  var saved = localStorage.getItem('theme') || 'dark';
  apply(saved);

  if (checkbox) {
    checkbox.addEventListener('change', function() {
      var newTheme = checkbox.checked ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      apply(newTheme);
    });
  } else {
    container.addEventListener('click', function() {
      var newTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      apply(newTheme);
    });
  }
})();

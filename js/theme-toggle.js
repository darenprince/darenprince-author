(function() {
  var container = document.querySelector('[data-toggle-theme]');
  var body = document.body;
  var checkbox = container ? container.querySelector('input[type="checkbox"]') : null;

  function apply(theme) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add('theme-' + theme, 'theme-fade');
    setTimeout(function() { body.classList.remove('theme-fade'); }, 300);
    if (checkbox) checkbox.checked = theme === 'dark';
  }

  var saved = localStorage.getItem('theme') || 'dark';
  apply(saved);

  if (container && checkbox) {
    checkbox.addEventListener('change', function() {
      var newTheme = checkbox.checked ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      apply(newTheme);
    });
  } else if (container) {
    container.addEventListener('click', function() {
      var newTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      apply(newTheme);
    });
  }
})();

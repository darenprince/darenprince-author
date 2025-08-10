(function () {
  var toggleBtn = document.querySelector('.js-theme-toggle');
  var body = document.body;

  function setIcon(theme) {
    if (!toggleBtn) return;
    if (theme === 'dark') {
      toggleBtn.innerHTML = '<i class="ti ti-moon"></i>';
      toggleBtn.style.color = 'var(--color-success)';
    } else {
      toggleBtn.innerHTML = '<i class="ti ti-sun"></i>';
      toggleBtn.style.color = '#FFD700';
    }
  }

  function apply(theme) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add('theme-' + theme, 'theme-fade');
    setTimeout(function () {
      body.classList.remove('theme-fade');
    }, 300);
    setIcon(theme);
  }

  var saved = localStorage.getItem('theme') || 'dark';
  apply(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var newTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      apply(newTheme);
    });
  }
})();

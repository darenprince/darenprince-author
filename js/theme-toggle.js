(function () {
  var toggleBtn = document.querySelector('.js-theme-toggle');
  var body = document.body;
  var themeAwareLogoConfigs = [
    {
      selector: '.logo img',
      darkSrc: '/assets/logos/2Daren_Web_Logo_White_For_Dark_Background.png',
      lightSrc: '/assets/logos/logo-web-for-light-bg.png',
    },
    {
      selector: '.mega-menu-logo',
      darkSrc: '/assets/logos/logo-footer-white.png',
      lightSrc: '/assets/logos/logo-web-for-light-bg.png',
    },
    {
      selector: '.footer-logo',
      darkSrc: '/assets/logos/logo-footer-white.png',
      lightSrc: '/assets/logos/logo-web-for-light-bg.png',
    },
  ];

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

  function updateLogos(theme) {
    themeAwareLogoConfigs.forEach(function (config) {
      var nodes = document.querySelectorAll(config.selector);
      nodes.forEach(function (img) {
        var desiredSrc = theme === 'light' ? config.lightSrc : config.darkSrc;
        if (desiredSrc && img.getAttribute('src') !== desiredSrc) {
          img.setAttribute('src', desiredSrc);
        }
      });
    });
  }

  function apply(theme) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add('theme-' + theme, 'theme-fade');
    setTimeout(function () {
      body.classList.remove('theme-fade');
    }, 300);
    setIcon(theme);
    updateLogos(theme);
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

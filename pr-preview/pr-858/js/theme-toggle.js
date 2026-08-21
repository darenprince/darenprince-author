;(function () {
  var body = document.body
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
  ]

  function getToggleButtons() {
    return Array.from(document.querySelectorAll('.js-theme-toggle'))
  }

  function setIcon(theme) {
    var toggleButtons = getToggleButtons()
    if (!toggleButtons.length) return

    toggleButtons.forEach(function (button) {
      var icon = theme === 'dark' ? 'ph-moon' : 'ph-sun'
      var label = theme === 'dark' ? 'Dark theme active' : 'Light theme active'
      button.innerHTML = '<i class="ph ' + icon + '"></i><span>' + label + '</span>'
      button.style.color = theme === 'dark' ? 'var(--color-success)' : '#FFD700'
      button.setAttribute('aria-label', 'Toggle theme')
      button.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false')
    })
  }

  function updateLogos(theme) {
    themeAwareLogoConfigs.forEach(function (config) {
      var nodes = document.querySelectorAll(config.selector)
      nodes.forEach(function (img) {
        var desiredSrc = theme === 'light' ? config.lightSrc : config.darkSrc
        if (desiredSrc && img.getAttribute('src') !== desiredSrc) {
          img.setAttribute('src', desiredSrc)
        }
      })
    })
  }

  function apply(theme) {
    body.classList.remove('theme-dark', 'theme-light')
    body.classList.add('theme-' + theme, 'theme-fade')
    setTimeout(function () {
      body.classList.remove('theme-fade')
    }, 300)
    setIcon(theme)
    updateLogos(theme)
  }

  function bindButtons() {
    getToggleButtons().forEach(function (button) {
      if (button.dataset.themeBound === 'true') return
      button.dataset.themeBound = 'true'
      button.addEventListener('click', function () {
        var newTheme = body.classList.contains('theme-dark') ? 'light' : 'dark'
        localStorage.setItem('theme', newTheme)
        apply(newTheme)
      })
    })
  }

  function initializeThemeToggle() {
    var defaultTheme = 'dark'
    apply(defaultTheme)
    bindButtons()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeToggle, { once: true })
  } else {
    initializeThemeToggle()
  }

  document.addEventListener('site-shell:ready', function () {
    bindButtons()
    var activeTheme = body.classList.contains('theme-light') ? 'light' : 'dark'
    setIcon(activeTheme)
  })
})()

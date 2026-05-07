;(function () {
  const root = document.documentElement
  const key = 'theme'
  const app = document.getElementById('app')
  function applyTheme(theme) {
    root.dataset.theme = theme
    document.querySelectorAll('[data-dark-logo]').forEach((img) => {
      img.src = theme === 'light' ? img.dataset.lightLogo : img.dataset.darkLogo
    })
  }
  applyTheme(localStorage.getItem(key) || 'dark')

  function setActiveQuicklink() {
    const current = window.location.pathname.split('/').pop() || 'index.html'
    document.querySelectorAll('.cl-quicklinks a').forEach((link) => {
      const href = link.getAttribute('href') || ''
      link.classList.toggle('is-active', href === current)
      if (href === current) link.setAttribute('aria-current', 'page')
      else link.removeAttribute('aria-current')
    })
  }
  setActiveQuicklink()

  const toggle = document.getElementById('themeToggle')
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem(key, next)
      applyTheme(next)
    })
  }

  const navToggle = document.getElementById('navToggle')
  const mobileMenu = document.getElementById('mobileMenu')
  const scrim = document.getElementById('scrim')

  if (app && localStorage.getItem('navCollapsed') === 'true') {
    app.classList.add('nav-collapsed')
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (window.innerWidth < 981) {
        document.body.classList.toggle('nav-open')
      } else if (app) {
        app.classList.toggle('nav-collapsed')
        localStorage.setItem('navCollapsed', app.classList.contains('nav-collapsed'))
      }
    })
  }

  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => document.body.classList.add('nav-open'))
  }

  if (scrim) {
    scrim.addEventListener('click', () => document.body.classList.remove('nav-open'))
  }
})()

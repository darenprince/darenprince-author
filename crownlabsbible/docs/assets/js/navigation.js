;(function () {
  const root = document.documentElement
  const key = 'theme'
  function applyTheme(theme) {
    root.dataset.theme = theme
    document.querySelectorAll('[data-dark-logo]').forEach((img) => {
      img.src = theme === 'light' ? img.dataset.lightLogo : img.dataset.darkLogo
    })
  }
  applyTheme(localStorage.getItem(key) || 'dark')
  const toggle = document.getElementById('themeToggle')
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem(key, next)
      applyTheme(next)
    })
  }
})()

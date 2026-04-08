const themeToggle = document.getElementById('theme-toggle')
const setTheme = (mode) => {
  const light = mode === 'light'
  document.body.classList.toggle('theme-light', light)
  themeToggle?.setAttribute('aria-pressed', String(light))
  localStorage.setItem('labs-theme', mode)
}
setTheme(localStorage.getItem('labs-theme') || 'dark')
themeToggle?.addEventListener('click', () =>
  setTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light')
)

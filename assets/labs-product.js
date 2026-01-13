const themeToggle = document.getElementById('theme-toggle')

const setTheme = (mode) => {
  if (mode === 'light') {
    document.body.classList.add('theme-light')
    themeToggle?.setAttribute('aria-pressed', 'true')
  } else {
    document.body.classList.remove('theme-light')
    themeToggle?.setAttribute('aria-pressed', 'false')
  }
}

const storedTheme = localStorage.getItem('labs-theme')
if (storedTheme) {
  setTheme(storedTheme)
}

themeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('theme-light')
  const mode = isLight ? 'light' : 'dark'
  themeToggle.setAttribute('aria-pressed', String(isLight))
  localStorage.setItem('labs-theme', mode)
})

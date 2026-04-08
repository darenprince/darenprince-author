;(() => {
  const yearNode = document.getElementById('labs-year')
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear()
  }

  const header = document.querySelector('.labs-header')
  const menuToggle = document.querySelector('.labs-menu-toggle')
  const nav = document.getElementById('labs-nav')

  if (!header || !menuToggle || !nav) {
    return
  }

  const setMenuState = (open) => {
    header.classList.toggle('is-open', open)
    menuToggle.setAttribute('aria-expanded', String(open))
  }

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true'
    setMenuState(!open)
  })

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false))
  })

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) {
      setMenuState(false)
    }
  })
})()

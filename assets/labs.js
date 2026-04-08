;(() => {
  const yearNode = document.getElementById('labs-year')
  if (yearNode) yearNode.textContent = String(new Date().getFullYear())

  const toggle = document.querySelector('.menu-toggle')
  const menu = document.getElementById('site-menu')
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open')
      toggle.setAttribute('aria-expanded', String(isOpen))
    })

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open')
        toggle.setAttribute('aria-expanded', 'false')
      })
    })
  }

  const progress = document.querySelector('.scroll-progress')
  if (progress) {
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const value = max > 0 ? (window.scrollY / max) * 100 : 0
      progress.style.width = `${Math.min(100, Math.max(0, value))}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
  }
})()

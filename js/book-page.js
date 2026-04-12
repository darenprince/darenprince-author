const bookCards = Array.from(document.querySelectorAll('[data-book-entry]'))

if (bookCards.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'is-in-view')
          window.setTimeout(() => entry.target.classList.remove('is-in-view'), 900)
        }
      })
    },
    { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
  )

  bookCards.forEach((card) => io.observe(card))
}

const scrollTrigger = document.querySelector('.js-scroll-trigger')
if (scrollTrigger) {
  scrollTrigger.addEventListener('click', (event) => {
    const hash = scrollTrigger.getAttribute('href')
    if (!hash || !hash.startsWith('#')) return
    const target = document.querySelector(hash)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', hash)
  })
}

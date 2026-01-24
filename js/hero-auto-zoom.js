document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('autoZoomHero')
  if (!hero) return
  const baseScale = 1

  hero.style.setProperty('--hero-scale', baseScale)

  const isVideoHero = hero.classList.contains('hero--video')
  const cta = hero.querySelector('.hero-cta')
  const targetSelector = cta ? cta.getAttribute('href') : null
  const targetEl = targetSelector ? document.querySelector(targetSelector) : null
  if (targetEl && !isVideoHero) {
    hero.addEventListener('click', (e) => {
      e.preventDefault()
      targetEl.scrollIntoView({ behavior: 'smooth' })
    })
  }
})

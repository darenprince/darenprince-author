document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('autoZoomHero')
  if (!hero) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const baseScale = prefersReduced ? 1 : 1.01
  const maxScale = prefersReduced ? baseScale : 1.14
  let targetScale = baseScale
  let currentScale = baseScale
  let rafId = null

  hero.style.setProperty('--hero-scale', baseScale)

  const easeScale = () => {
    const diff = targetScale - currentScale
    if (Math.abs(diff) < 0.0015) {
      currentScale = targetScale
      hero.style.setProperty('--hero-scale', currentScale.toFixed(4))
      rafId = null
      return
    }

    currentScale += diff * 0.12
    hero.style.setProperty('--hero-scale', currentScale.toFixed(4))
    rafId = window.requestAnimationFrame(easeScale)
  }

  const updateScaleByScroll = () => {
    if (prefersReduced) return

    const rect = hero.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1
    const progress = Math.min(
      1,
      Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height * 0.8))
    )
    targetScale = baseScale + (maxScale - baseScale) * progress

    if (!rafId) {
      rafId = window.requestAnimationFrame(easeScale)
    }
  }

  updateScaleByScroll()
  window.addEventListener('scroll', updateScaleByScroll, { passive: true })
  window.addEventListener('resize', updateScaleByScroll)

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

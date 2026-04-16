document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('autoZoomHero')
  if (!hero) return
  const heroImageLayer = hero.querySelector('.js-hero-image')
  const heroImage = heroImageLayer?.querySelector('img')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const baseScale = prefersReduced ? 1 : 1.05
  const maxScale = prefersReduced ? baseScale : 1.2
  const loopMs = 12000
  let rafId = null
  let startTime = 0

  const animateZoomLoop = (timestamp) => {
    if (!startTime) {
      startTime = timestamp
    }
    const elapsed = (timestamp - startTime) % loopMs
    const phase = (elapsed / loopMs) * Math.PI * 2
    const oscillation = (Math.sin(phase - Math.PI / 2) + 1) / 2
    const scale = baseScale + (maxScale - baseScale) * oscillation
    hero.style.setProperty('--hero-scale', scale.toFixed(4))
    rafId = window.requestAnimationFrame(animateZoomLoop)
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
        rafId = null
      }
      return
    }
    if (!prefersReduced && !rafId) {
      startTime = 0
      rafId = window.requestAnimationFrame(animateZoomLoop)
    }
  }

  hero.style.setProperty('--hero-scale', baseScale.toFixed(4))

  if (heroImageLayer && heroImage) {
    const markHeroImageReady = () => {
      heroImageLayer.classList.add('is-ready')
    }

    if (heroImage.complete) {
      markHeroImageReady()
    } else {
      heroImage.addEventListener('load', markHeroImageReady, { once: true })
      heroImage.addEventListener('error', markHeroImageReady, { once: true })
    }
  }

  if (!prefersReduced) {
    rafId = window.requestAnimationFrame(animateZoomLoop)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  }

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

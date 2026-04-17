function initFeaturedBooksRailMotion() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  const rail = document.querySelector('.featured-books-strip__rail')
  if (!rail) return

  const cards = Array.from(
    rail.querySelectorAll('.featured-book-card:not(.featured-book-card--upcoming-spine)')
  )
  if (!cards.length) return

  const mobileQuery = window.matchMedia('(max-width: 47.99rem)')
  const isMobile = () => mobileQuery.matches

  if (!document.getElementById('featured-books-rail-motion-styles')) {
    const style = document.createElement('style')
    style.id = 'featured-books-rail-motion-styles'
    style.textContent = `
      @media (max-width: 47.99rem) {
        .featured-books-strip__rail {
          scroll-snap-type: x proximity !important;
          scroll-behavior: auto !important;
        }

        .featured-book-card {
          transform-origin: center center;
          will-change: transform, opacity;
          transition: transform 260ms cubic-bezier(0.22, 0.8, 0.24, 1), opacity 220ms ease;
        }
      }
    `
    document.head.appendChild(style)
  }

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  const centerCard = (card, behavior = 'smooth') => {
    if (!card) return
    const nextLeft = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2
    rail.scrollTo({ left: Math.max(0, nextLeft), behavior })
  }

  let rafId = 0
  const updateParallax = () => {
    rafId = 0
    if (!isMobile()) {
      cards.forEach((card) => {
        card.style.transform = ''
        card.style.opacity = ''
      })
      return
    }

    const railCenter = rail.scrollLeft + rail.clientWidth / 2

    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = (cardCenter - railCenter) / rail.clientWidth
      const bounded = clamp(distance, -1.2, 1.2)
      const rotateY = bounded * -8
      const translateX = bounded * -12
      const translateY = Math.abs(bounded) * 6
      const scale = 1 - Math.min(Math.abs(bounded) * 0.08, 0.08)
      const opacity = 1 - Math.min(Math.abs(bounded) * 0.24, 0.24)
      card.style.transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0) rotateY(${rotateY}deg) scale(${scale})`
      card.style.opacity = `${opacity}`
    })
  }

  const requestParallax = () => {
    if (rafId) return
    rafId = window.requestAnimationFrame(updateParallax)
  }

  const getCenteredCard = () => {
    const railCenter = rail.scrollLeft + rail.clientWidth / 2
    let activeCard = cards[0]
    let closestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - railCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        activeCard = card
      }
    })

    return activeCard
  }

  let snapTimer = null
  const scheduleSnap = () => {
    if (!isMobile()) return
    window.clearTimeout(snapTimer)
    snapTimer = window.setTimeout(() => {
      centerCard(getCenteredCard(), 'smooth')
    }, 110)
  }

  rail.addEventListener('scroll', () => {
    requestParallax()
    scheduleSnap()
  }, { passive: true })

  const handleViewportChange = () => {
    if (!isMobile()) {
      cards.forEach((card) => {
        card.style.transform = ''
        card.style.opacity = ''
      })
      return
    }

    window.requestAnimationFrame(() => {
      centerCard(getCenteredCard(), 'auto')
      updateParallax()
    })
  }

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', handleViewportChange)
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(handleViewportChange)
  }

  window.addEventListener('resize', handleViewportChange, { passive: true })
  window.addEventListener('orientationchange', handleViewportChange, { passive: true })

  handleViewportChange()
  requestParallax()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeaturedBooksRailMotion, { once: true })
} else {
  initFeaturedBooksRailMotion()
}

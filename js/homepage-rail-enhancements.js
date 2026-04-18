const FEATURED_BOOKS = {
  rooted: {
    title: 'Rooted',
    subtitle: 'Identity Without Permission',
    description:
      'A bold call to stop performing for approval and start living from your core. Rooted is about self-trust, identity clarity, and becoming solid in who you are without needing outside validation.',
    cover: 'https://www.darenprince.com/assets/images/IMG_0237.jpeg',
    detailHref: '/book.html#book-rooted',
  },
  too_much: {
    title: 'Too Much',
    subtitle: 'The Making, Unmaking, and Reclaiming of Me',
    description:
      'A raw, personal journey through pain, overload, reinvention, and emotional truth. Too Much speaks to the cost of carrying everything and the power of finally reclaiming yourself.',
    cover: 'https://www.darenprince.com/assets/images/12AC1A26-295F-4A11-BF6C-49C8576DC05A.png',
    detailHref: '/book.html#book-too-much',
  },
  codependency: {
    title: 'F*CK Codependency',
    subtitle: 'Ending Self-Abandonment',
    description:
      'Direct, unapologetic, and healing-centered. This title is built to help readers identify people-pleasing patterns, stop self-abandonment, and rebuild boundaries from the inside out.',
    cover: 'https://www.darenprince.com/assets/images/041D9198-C3A3-4B32-8321-C7E0B5C6F621.jpeg',
    detailHref: '/book.html#book-codependency',
  },
  unshakable: {
    title: 'Unshakeable',
    subtitle: 'How to Stand Strong Against Narcissistic Manipulation',
    description:
      'A recovery framework for anyone healing from narcissistic dynamics. Unshakeable helps readers identify manipulation, restore self-trust, and rebuild their voice from a place of real strength.',
    cover: 'https://www.darenprince.com/assets/images/4845D1B4-0A5A-4910-97C7-36E1ABBFB2B8.jpeg',
    detailHref: '/book.html#book-unshakable',
  },
  power_choice: {
    title: 'The Power of Choice',
    subtitle: 'Breaking the Chains of Addiction and Living a Life of Purpose',
    description:
      'A purpose-driven guide to recovery, agency, and daily decisions that create a different life. Built around clarity, accountability, and the mindset shifts that support lasting freedom.',
    cover: 'https://www.darenprince.com/assets/images/IMG_0284.jpeg',
    detailHref: '/book.html#book-power-choice',
  },
}

function injectStyles() {
  if (document.getElementById('homepage-rail-enhancement-styles')) return
  const style = document.createElement('style')
  style.id = 'homepage-rail-enhancement-styles'
  style.textContent = `
    .featured-book-card > img {
      border-top-left-radius: 7px !important;
      border-top-right-radius: 7px !important;
      cursor: pointer;
    }

    .homepage-book-modal-overlay {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: rgba(5, 7, 8, 0.82);
      backdrop-filter: blur(12px);
      z-index: 1400;
    }

    .homepage-book-modal-overlay.is-visible {
      display: flex;
    }

    .homepage-book-modal {
      width: min(100%, 44rem);
      max-height: min(92vh, 56rem);
      overflow: auto;
      border-radius: 24px;
      border: 1px solid rgba(255,255,255,0.1);
      background: linear-gradient(180deg, rgba(16,19,23,0.98), rgba(8,10,12,0.98));
      color: rgba(255,255,255,0.92);
      box-shadow: 0 28px 72px rgba(0,0,0,0.42);
      padding: 1.1rem;
      position: relative;
    }

    .homepage-book-modal__close {
      position: absolute;
      top: 0.85rem;
      right: 0.85rem;
      width: 2.35rem;
      height: 2.35rem;
      border: 0;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      color: #fff;
      font-size: 1.35rem;
      cursor: pointer;
    }

    .homepage-book-modal__kicker {
      margin: 0 0 0.35rem;
      color: rgba(140,214,121,0.95);
      font-size: 0.78rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .homepage-book-modal__title {
      margin: 0;
    }

    .homepage-book-modal__subtitle {
      margin: 0.35rem 0 1rem;
      color: rgba(255,255,255,0.7);
    }

    .homepage-book-modal__cover-wrap {
      background: rgba(255,255,255,0.03);
      border-radius: 18px;
      padding: 1rem;
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .homepage-book-modal__cover {
      width: min(100%, 20rem);
      height: auto;
      display: block;
      border-radius: 10px 10px 0 0;
    }

    .homepage-book-modal__body {
      margin: 0;
      line-height: 1.6;
      color: rgba(255,255,255,0.88);
    }

    .homepage-book-modal__actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-top: 1rem;
    }

    body.homepage-book-modal-open {
      overflow: hidden;
    }

    @media (max-width: 47.99rem) {
      html,
      body {
        scroll-snap-type: none !important;
      }

      .homepage-book-modal {
        border-radius: 20px;
        padding: 0.95rem;
      }
    }
  `
  document.head.appendChild(style)
}

function inferBookKey(card) {
  const title = card.querySelector('h4')?.textContent?.trim().toLowerCase() || ''
  if (title === 'rooted') return 'rooted'
  if (title === 'too much') return 'too_much'
  if (title.includes('codependency')) return 'codependency'
  if (title === 'unshakeable') return 'unshakable'
  if (title.includes('power of choice')) return 'power_choice'
  return null
}

function initFeaturedRailModal() {
  const rail = document.querySelector('.featured-books-strip__rail')
  if (!rail) return
  const TOUCH_DRAG_THRESHOLD = 9
  const TOUCH_DRAG_SUPPRESS_MS = 420
  const gestureState = {
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
    lastDragAt: 0,
  }

  const trackPointerStart = (event) => {
    if (event.pointerType !== 'touch') return
    gestureState.pointerId = event.pointerId
    gestureState.startX = event.clientX
    gestureState.startY = event.clientY
    gestureState.moved = false
  }

  const trackPointerMove = (event) => {
    if (event.pointerType !== 'touch' || event.pointerId !== gestureState.pointerId) return
    if (gestureState.moved) return
    const distanceX = Math.abs(event.clientX - gestureState.startX)
    const distanceY = Math.abs(event.clientY - gestureState.startY)
    if (distanceX > TOUCH_DRAG_THRESHOLD || distanceY > TOUCH_DRAG_THRESHOLD) {
      gestureState.moved = true
    }
  }

  const trackPointerEnd = (event) => {
    if (event.pointerType !== 'touch' || event.pointerId !== gestureState.pointerId) return
    if (gestureState.moved) {
      gestureState.lastDragAt = Date.now()
    }
    gestureState.pointerId = null
    gestureState.moved = false
  }

  const shouldSuppressTouchClick = () =>
    Date.now() - gestureState.lastDragAt < TOUCH_DRAG_SUPPRESS_MS

  rail.addEventListener('pointerdown', trackPointerStart, { passive: true })
  rail.addEventListener('pointermove', trackPointerMove, { passive: true })
  rail.addEventListener('pointerup', trackPointerEnd, { passive: true })
  rail.addEventListener('pointercancel', trackPointerEnd, { passive: true })

  let modal = document.getElementById('homepage-book-modal-overlay')
  if (!modal) {
    modal = document.createElement('div')
    modal.id = 'homepage-book-modal-overlay'
    modal.className = 'homepage-book-modal-overlay'
    modal.setAttribute('aria-hidden', 'true')
    modal.innerHTML = `
      <div class="homepage-book-modal" role="dialog" aria-modal="true" aria-labelledby="homepage-book-modal-title">
        <button type="button" class="homepage-book-modal__close" aria-label="Close book detail modal">×</button>
        <p class="homepage-book-modal__kicker">Book details</p>
        <h2 id="homepage-book-modal-title" class="homepage-book-modal__title"></h2>
        <p class="homepage-book-modal__subtitle"></p>
        <div class="homepage-book-modal__cover-wrap">
          <img class="homepage-book-modal__cover" src="" alt="" />
        </div>
        <p class="homepage-book-modal__body"></p>
        <div class="homepage-book-modal__actions"></div>
      </div>
    `
    document.body.appendChild(modal)
  }

  const titleEl = modal.querySelector('.homepage-book-modal__title')
  const subtitleEl = modal.querySelector('.homepage-book-modal__subtitle')
  const coverEl = modal.querySelector('.homepage-book-modal__cover')
  const bodyEl = modal.querySelector('.homepage-book-modal__body')
  const actionsEl = modal.querySelector('.homepage-book-modal__actions')
  const closeBtn = modal.querySelector('.homepage-book-modal__close')

  const closeModal = () => {
    modal.classList.remove('is-visible')
    modal.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('homepage-book-modal-open')
  }

  const openModalFor = (book) => {
    titleEl.textContent = book.title
    subtitleEl.textContent = book.subtitle
    coverEl.src = book.cover
    coverEl.alt = `${book.title} cover`
    bodyEl.textContent = book.description
    actionsEl.innerHTML = `
      <a class="btn btn--primary" href="${book.detailHref}">View full details</a>
      <a class="btn btn--subtle" href="/book.html">Browse all books</a>
    `
    modal.classList.add('is-visible')
    modal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('homepage-book-modal-open')
  }

  rail.querySelectorAll('.featured-book-card').forEach((card) => {
    if (
      card.classList.contains('featured-book-card--upcoming-spine') ||
      card.classList.contains('featured-book-card--cta')
    )
      return
    const key = inferBookKey(card)
    if (!key || !FEATURED_BOOKS[key]) return
    const img = card.querySelector('img')
    const btn = card.querySelector('.btn--subtle')
    const handler = (event) => {
      if (event.type === 'click' && shouldSuppressTouchClick()) return
      event.preventDefault()
      openModalFor(FEATURED_BOOKS[key])
    }
    img?.addEventListener('click', handler)
    img?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') handler(event)
    })
    if (img) img.tabIndex = 0
    btn?.addEventListener('click', handler)
  })

  closeBtn?.addEventListener('click', closeModal)
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-visible')) closeModal()
  })
}

function initDividerSnap() {
  const mobile = window.matchMedia('(max-width: 47.99rem)')
  if (!mobile.matches) return

  const findMarkers = () =>
    Array.from(
      document.querySelectorAll('.section-divider, .books-gradient-divider, [class*="divider"]')
    ).filter((el) => el.offsetParent !== null)

  let snapTimer = 0
  let bounceTimer = 0
  let snapping = false
  let lastScrollY = window.scrollY
  let lastScrollDirection = 1

  const runSnap = () => {
    if (snapping) return
    const markers = findMarkers()
    if (!markers.length) return

    const threshold = window.innerHeight * 0.4
    const resistancePx = 12
    const candidates = markers
      .map((el) => ({ el, top: el.getBoundingClientRect().top }))
      .filter((entry) => entry.top >= -threshold * 0.2 && entry.top <= threshold)
      .sort((a, b) => Math.abs(a.top) - Math.abs(b.top))

    const target = candidates[0]
    if (!target) return

    const targetWithResistance = target.top - resistancePx * lastScrollDirection
    const finalTop = Math.max(0, window.scrollY + targetWithResistance)
    const overshootTop = Math.max(0, finalTop - 10)
    snapping = true
    window.scrollTo({ top: overshootTop, behavior: 'smooth' })
    clearTimeout(bounceTimer)
    bounceTimer = window.setTimeout(() => {
      window.scrollTo({ top: finalTop, behavior: 'smooth' })
      window.setTimeout(() => {
        snapping = false
      }, 260)
    }, 180)
  }

  const scheduleSnap = () => {
    if (snapping) return
    const currentY = window.scrollY
    const delta = currentY - lastScrollY
    if (Math.abs(delta) > 1) {
      lastScrollDirection = delta >= 0 ? 1 : -1
      lastScrollY = currentY
    }
    clearTimeout(snapTimer)
    snapTimer = window.setTimeout(runSnap, 140)
  }

  window.addEventListener('scroll', scheduleSnap, { passive: true })
  window.addEventListener('touchend', scheduleSnap, { passive: true })
}

function initHomepageRailEnhancements() {
  injectStyles()
  initFeaturedRailModal()
  initDividerSnap()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomepageRailEnhancements, { once: true })
} else {
  initHomepageRailEnhancements()
}

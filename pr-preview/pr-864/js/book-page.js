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

const detailModal = document.getElementById('book-details-modal')
const detailModalTitle = document.getElementById('book-details-modal-title')
const detailModalSubtitle = document.getElementById('book-details-modal-subtitle')
const detailModalDescription = document.getElementById('book-details-modal-description')
const detailModalActions = document.getElementById('book-details-modal-actions')
const detailMainCover = document.getElementById('book-details-main-cover')
const detailFrontThumb = document.getElementById('book-details-front-thumb')
const detailThumbs = Array.from(document.querySelectorAll('.book-details-thumb'))
const detailClose = document.querySelector('[data-book-details-close]')
const cardDetailTriggers = Array.from(document.querySelectorAll('[data-book-detail-trigger]'))

if (detailModal && cardDetailTriggers.length) {
  const openModal = () => {
    detailModal.classList.add('is-visible')
    detailModal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('book-modal-open')
  }

  const closeModal = () => {
    detailModal.classList.remove('is-visible')
    detailModal.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('book-modal-open')
  }

  const setActiveThumb = (active) => {
    detailThumbs.forEach((thumb) => {
      const isActive = thumb === active
      thumb.classList.toggle('is-active', isActive)
      thumb.setAttribute('aria-selected', isActive ? 'true' : 'false')
    })
  }

  const updateCover = (thumb) => {
    const source = thumb.getAttribute('data-cover-src')
    const alt = thumb.getAttribute('data-cover-alt') || 'Book cover'
    if (!source || !detailMainCover) return
    detailMainCover.src = source
    detailMainCover.alt = alt
    setActiveThumb(thumb)
  }

  detailThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => updateCover(thumb))
  })

  cardDetailTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault()
      const card = trigger.closest('.book-collection-card')
      if (!card) return

      const kicker = card.querySelector('.section-kicker')?.textContent?.trim() || 'Book details'
      const title = card.querySelector('h3')?.textContent?.trim() || 'Book'
      const description = card.querySelector('.text-sm')?.textContent?.trim() || ''
      const cover = card.querySelector('.paperback-mockup img')
      const frontCoverSrc = cover?.getAttribute('src') || ''
      const frontCoverAlt = cover?.getAttribute('alt') || `${title} front cover`

      if (detailModalSubtitle) detailModalSubtitle.textContent = kicker
      if (detailModalTitle) detailModalTitle.textContent = title
      if (detailModalDescription) detailModalDescription.textContent = description

      if (detailFrontThumb) {
        detailFrontThumb.src = frontCoverSrc
        detailFrontThumb.alt = frontCoverAlt
      }

      if (detailThumbs[0]) {
        detailThumbs[0].setAttribute('data-cover-src', frontCoverSrc)
        detailThumbs[0].setAttribute('data-cover-alt', frontCoverAlt)
      }

      if (detailModalActions) {
        detailModalActions.innerHTML = ''
        const buyLink = card.querySelector('.book-card-cta-row .btn--primary[href]')
        const detailsLink = card.querySelector('.book-card-cta-row .btn--subtle[href]')

        if (buyLink) {
          const buyAction = buyLink.cloneNode(true)
          detailModalActions.appendChild(buyAction)
        }

        if (detailsLink) {
          const detailAction = detailsLink.cloneNode(true)
          detailModalActions.appendChild(detailAction)
        } else {
          const notifyButton = document.createElement('button')
          notifyButton.type = 'button'
          notifyButton.className = 'btn btn--subtle'
          notifyButton.innerHTML = '<i class="ph ph-bell-ringing"></i> Notify me'
          notifyButton.addEventListener('click', () => {
            closeModal()
            const notifyTrigger = card.querySelector('[data-notify-trigger]')
            notifyTrigger?.dispatchEvent(new Event('click', { bubbles: true }))
          })
          detailModalActions.appendChild(notifyButton)
        }
      }

      if (detailThumbs[0]) updateCover(detailThumbs[0])
      openModal()
    })
  })

  detailClose?.addEventListener('click', closeModal)
  detailModal.addEventListener('click', (event) => {
    if (event.target === detailModal) {
      closeModal()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  })
}

function initBookListingSnapRail() {
  const isBooksPage = document.body.classList.contains('books-page')
  if (!isBooksPage) return
  const mobileQuery = window.matchMedia('(max-width: 47.99rem)')
  if (mobileQuery.matches) return

  const sections = Array.from(document.querySelectorAll('.books-main > section[id]')).filter(
    (section) => section.offsetParent !== null
  )
  if (!sections.length) return

  let snapTimer = 0
  let releaseTimer = 0
  let snapping = false
  let lastY = window.scrollY
  let direction = 1

  const runSnap = () => {
    if (snapping) return
    const threshold = window.innerHeight * 0.4
    const resistancePx = 16
    const candidates = sections
      .map((section) => ({
        section,
        top: section.getBoundingClientRect().top,
      }))
      .filter((entry) => entry.top >= -threshold * 0.25 && entry.top <= threshold)
      .sort((a, b) => Math.abs(a.top) - Math.abs(b.top))

    const nextTarget = candidates[0]
    if (!nextTarget) return

    const anchoredTop = window.scrollY + nextTarget.top - resistancePx * direction
    const finalTop = Math.max(0, anchoredTop)
    const preBounceTop = Math.max(0, finalTop - 8)

    snapping = true
    window.scrollTo({ top: preBounceTop, behavior: 'smooth' })
    window.clearTimeout(releaseTimer)
    releaseTimer = window.setTimeout(() => {
      window.scrollTo({ top: finalTop, behavior: 'smooth' })
      window.setTimeout(() => {
        snapping = false
      }, 220)
    }, 120)
  }

  const scheduleSnap = () => {
    if (snapping) return
    const currentY = window.scrollY
    const delta = currentY - lastY
    if (Math.abs(delta) > 1) {
      direction = delta >= 0 ? 1 : -1
      lastY = currentY
    }
    window.clearTimeout(snapTimer)
    snapTimer = window.setTimeout(runSnap, 90)
  }

  window.addEventListener('scroll', scheduleSnap, { passive: true })
  window.addEventListener('wheel', scheduleSnap, { passive: true })
  window.addEventListener('touchend', scheduleSnap, { passive: true })
}

initBookListingSnapRail()

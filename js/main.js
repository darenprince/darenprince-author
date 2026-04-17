import { applyIndexingMeta } from './seo-indexing.js'
import { AUTH_DISABLED_MESSAGE, isAuthEnabled } from './auth-service.js'
import { logAuthWarning } from './auth-logger.js'

const APPLE_BOOKS_URL =
  'https://books.apple.com/us/book/game-on-master-the-conversation-win-her-heart/id6745466900'
const SMART_APP_BANNER_DISMISS_KEY = 'darenprince.smartAppBanner.dismissed'
const SEARCH_SUGGESTIONS = ['Game On', 'Unshakeable', 'Press', 'Crown Labs', 'Contact']
const SEARCH_MODAL_CLOSE_MS = 230

function hasDismissedSmartAppBanner() {
  try {
    return window.localStorage.getItem(SMART_APP_BANNER_DISMISS_KEY) === 'true'
  } catch (error) {
    console.debug('[banner] Unable to read dismissal state', error)
    return false
  }
}

function persistSmartAppBannerDismissal() {
  try {
    window.localStorage.setItem(SMART_APP_BANNER_DISMISS_KEY, 'true')
  } catch (error) {
    console.debug('[banner] Unable to persist dismissal state', error)
  }
}

function isStandaloneExperience() {
  const displayMode = window.matchMedia?.('(display-mode: standalone)')
  const isDisplayModeStandalone = Boolean(displayMode?.matches)
  return isDisplayModeStandalone || window.navigator?.standalone === true
}

function isAppleDevice() {
  const ua = window.navigator?.userAgent || ''
  const platform = window.navigator?.platform || ''
  const maxTouchPoints = Number(window.navigator?.maxTouchPoints || 0)
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (/Mac/i.test(platform) && maxTouchPoints > 1) ||
    /Macintosh/i.test(ua)
  return isIOS
}

function buildSmartAppBanner() {
  const banner = document.createElement('aside')
  banner.className = 'smart-app-banner'
  banner.setAttribute('role', 'region')
  banner.setAttribute('aria-label', 'Game On on Apple Books')
  banner.innerHTML = `
    <button class="smart-app-banner__close" type="button" aria-label="Dismiss Game On banner">&#215;</button>
    <img
      class="smart-app-banner__icon"
      src="assets/images/game-on-main-cover.png"
      alt="Game On book cover"
      width="64"
      height="64"
      loading="lazy"
    />
    <div class="smart-app-banner__copy">
      <span class="smart-app-banner__eyebrow">Apple Books</span>
      <span class="smart-app-banner__title">Game On: Master the Conversation &amp; Win Her Heart</span>
      <span class="smart-app-banner__subtitle">By Daren Prince · Lifestyle &amp; Relationships</span>
    </div>
    <div class="smart-app-banner__actions">
      <a class="smart-app-banner__cta" href="${APPLE_BOOKS_URL}" target="_blank" rel="noopener">
        View
      </a>
      <span class="smart-app-banner__footnote">Opens in Apple Books</span>
    </div>
  `
  return banner
}

function initSmartAppBanner() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (document.querySelector('.smart-app-banner')) {
    return
  }

  if (isStandaloneExperience() || hasDismissedSmartAppBanner()) {
    return
  }

  if (!isAppleDevice()) {
    return
  }

  const heroSection = document.getElementById('autoZoomHero')
  if (!heroSection) return

  let hasTriggeredFromScroll = false
  const revealBannerAfterHeroScroll = () => {
    if (hasTriggeredFromScroll) return
    const heroBottom = heroSection.getBoundingClientRect().bottom
    if (heroBottom > 0) return
    hasTriggeredFromScroll = true

    const banner = buildSmartAppBanner()
    const body = document.body
    if (!banner || !body) return
    body.appendChild(banner)

    window.requestAnimationFrame(() => {
      banner.classList.remove('smart-app-banner--hidden')
      banner.classList.add('smart-app-banner--visible')
    })

    const closeButton = banner.querySelector('.smart-app-banner__close')
    closeButton?.addEventListener('click', () => {
      persistSmartAppBannerDismissal()
      banner.classList.remove('smart-app-banner--visible')
      banner.classList.add('smart-app-banner--hidden')
      window.setTimeout(() => {
        banner.remove()
      }, 360)
    })

    const ctaButton = banner.querySelector('.smart-app-banner__cta')
    ctaButton?.addEventListener('click', () => {
      persistSmartAppBannerDismissal()
    })

    window.removeEventListener('scroll', revealBannerAfterHeroScroll)
  }

  window.addEventListener('scroll', revealBannerAfterHeroScroll, { passive: true })
  revealBannerAfterHeroScroll()
}

function initNavigationAndAuth() {
  const assetPrefix = document.documentElement?.dataset?.assetPrefix || ''
  const prefixedPath = (path) => (path.startsWith('/') ? `${assetPrefix}${path}` : path)
  const openSiteSearch = (query) => {
    const target = `${prefixedPath('/pages/search.html')}?q=${encodeURIComponent(query)}`
    window.location.href = target
  }
  const indexingRule = applyIndexingMeta()
  if (indexingRule) {
    console.debug(
      `[SEO] Robots directive set to "${indexingRule.directive}" — ${indexingRule.reason}`
    )
  }
  const menuToggles = Array.from(document.querySelectorAll('.js-menu-toggle'))
  const megaMenu = document.querySelector('.js-mega-menu')
  const menuOverlay = document.querySelector('.js-menu-overlay')
  const menuCloses = Array.from(document.querySelectorAll('.js-menu-close'))
  const authToggle = document.querySelector('.js-auth-toggle')
  const searchToggle = document.querySelector('.js-search-toggle')
  const searchBar = document.querySelector('.js-search-bar')
  const topSearchInput = searchBar?.querySelector('input[type="search"]')
  let searchModal
  let previousFocusTarget = null
  const modalOverlay = document.getElementById('demo-modal')
  const componentSelect = document.querySelector('.component-nav__select')

  const syncDeskLinkToContact = () => {
    const deskAnchors = Array.from(document.querySelectorAll('a')).filter((anchor) => {
      const text = (anchor.textContent || '').toLowerCase()
      const href = anchor.getAttribute('href') || ''
      return (
        text.includes('daren’s desk') ||
        text.includes("daren's desk") ||
        href.includes('hxd/backstage')
      )
    })

    deskAnchors.forEach((anchor) => {
      anchor.setAttribute('href', '/contact.html')
      const icon = anchor.querySelector('i')
      if (icon) {
        icon.className = 'ph ph-envelope-simple'
      }
    })
  }

  const initNativeShare = () => {
    const shareTriggers = Array.from(document.querySelectorAll('.js-share-trigger'))
    if (!shareTriggers.length) return

    shareTriggers.forEach((trigger) => {
      trigger.addEventListener('click', async () => {
        const sharePayload = {
          title: document.title,
          text:
            document.querySelector('meta[name="description"]')?.content || 'Check out this page.',
          url: window.location.href,
        }

        if (navigator.share) {
          try {
            await navigator.share(sharePayload)
            return
          } catch (error) {
            if (error?.name === 'AbortError') return
          }
        }

        try {
          await navigator.clipboard.writeText(sharePayload.url)
          if (window.GameOnUI?.showToast) {
            window.GameOnUI.showToast('Link copied to clipboard.', 'info')
          }
        } catch {
          window.prompt('Copy this link:', sharePayload.url)
        }
      })
    })
  }

  const initReviewCardAnimations = () => {
    const reviewCards = Array.from(document.querySelectorAll('.go-reviews__card'))
    if (!reviewCards.length) return

    reviewCards.forEach((card, index) => {
      card.style.setProperty('--review-delay', `${Math.min(index * 70, 280)}ms`)
    })

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )

    reviewCards.forEach((card) => observer.observe(card))
  }

  const setMenuState = (shouldOpen) => {
    document.body.classList.toggle('menu-open', shouldOpen)
    megaMenu?.classList.toggle('is-active', shouldOpen)
    menuOverlay?.classList.toggle('is-active', shouldOpen)
    menuToggles.forEach((toggle) =>
      toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false')
    )
  }

  if (megaMenu && menuToggles.length) {
    menuToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const isOpen = document.body.classList.contains('menu-open')
        setMenuState(!isOpen)
      })
      if (!toggle.hasAttribute('aria-expanded')) {
        toggle.setAttribute('aria-expanded', 'false')
      }
    })
  }

  syncDeskLinkToContact()
  initNativeShare()
  initReviewCardAnimations()

  if (megaMenu && menuCloses.length) {
    menuCloses.forEach((closeButton) => {
      closeButton.addEventListener('click', () => setMenuState(false))
    })
  }

  if (menuOverlay && megaMenu) {
    menuOverlay.addEventListener('click', () => setMenuState(false))
  }

  let loginHandler
  if (authToggle) {
    loginHandler = function () {
      window.location.href = prefixedPath('/login.html')
    }
    authToggle.innerHTML = '<i class="ph ph-key"></i> Log In'
    authToggle.addEventListener('click', loginHandler)
  }

  if (searchToggle) {
    searchToggle.addEventListener('click', function () {
      openSearchModal()
    })

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (document.body.classList.contains('menu-open')) {
          setMenuState(false)
        }
        if (searchModal && searchModal.classList.contains('is-visible')) {
          closeSearchModal()
        } else if (searchBar && !searchBar.hasAttribute('hidden')) {
          searchBar.setAttribute('hidden', '')
          searchToggle.focus()
        }
      }
      if (event.key === '/' && document.activeElement === document.body) {
        event.preventDefault()
        openSearchModal()
      }
    })
  }

  if (topSearchInput) {
    topSearchInput.placeholder = 'Search books, media, and tools...'
    topSearchInput.setAttribute('aria-label', 'Search the Daren Prince site')
  }

  const searchForm = searchBar?.querySelector('form')
  searchForm?.addEventListener('submit', function (e) {
    e.preventDefault()
    const query = searchForm.querySelector('input[type="search"]').value.trim()
    if (query) {
      openSiteSearch(query)
    }
  })

  function openSearchModal() {
    if (!searchModal) {
      searchModal = createSearchModal()
    }
    previousFocusTarget = document.activeElement
    searchModal.classList.remove('is-hiding')
    searchModal.removeAttribute('aria-hidden')
    document.body.classList.add('is-search-modal-open')
    searchModal.classList.add('is-visible')
    const input = searchModal.querySelector('input[type="search"]')
    if (input) input.focus()
  }

  function closeSearchModal() {
    if (searchModal) {
      searchModal.classList.remove('is-visible')
      searchModal.classList.add('is-hiding')
      searchModal.setAttribute('aria-hidden', 'true')
      window.setTimeout(() => {
        if (!searchModal || searchModal.classList.contains('is-visible')) return
        searchModal.classList.remove('is-hiding')
        document.body.classList.remove('is-search-modal-open')
        if (previousFocusTarget instanceof HTMLElement) {
          previousFocusTarget.focus()
          previousFocusTarget = null
        } else {
          searchToggle?.focus()
        }
      }, SEARCH_MODAL_CLOSE_MS)
    }
  }

  function createSearchModal() {
    const overlay = document.createElement('div')
    overlay.className = 'search-modal-overlay'
    overlay.setAttribute('aria-hidden', 'true')
    overlay.innerHTML = `
      <img class="search-modal-brand" src="/assets/logos/logo-footer-white.png" alt="Daren Prince" />
      <div class="search-modal">
        <button class="search-close" type="button" aria-label="Close search">&times;</button>
        <form class="search-form flex items-center">
          <input type="search" placeholder="Search books, pages, and resources..." aria-label="Search the Daren Prince site" />
          <button type="submit" class="search-submit" aria-label="Run search"><i class="ph ph-magnifying-glass"></i></button>
        </form>
        <div class="search-modal__quick-actions" role="group" aria-label="Popular searches">
          ${SEARCH_SUGGESTIONS.map(
            (term) =>
              `<button type="button" class="search-modal__quick" data-search-term="${term}">${term}</button>`
          ).join('')}
        </div>
        <p class="search-modal__hint">Tip: Press <kbd>/</kbd> to open search from anywhere.</p>
      </div>`
    document.body.appendChild(overlay)

    const closeBtn = overlay.querySelector('.search-close')
    closeBtn.addEventListener('click', closeSearchModal)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSearchModal()
    })

    const form = overlay.querySelector('form')
    const input = overlay.querySelector('input[type="search"]')
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      const query = form.querySelector('input[type="search"]').value.trim()
      if (query) {
        openSiteSearch(query)
      }
    })
    overlay.addEventListener('click', (event) => {
      const quickBtn = event.target.closest('.search-modal__quick')
      if (!quickBtn) return
      const term = quickBtn.dataset.searchTerm?.trim()
      if (!term) return
      if (input) input.value = term
      openSiteSearch(term)
    })

    let touchStartY = 0
    let touchStartX = 0
    let isTrackingTouch = false
    const SWIPE_CLOSE_THRESHOLD = 72
    const SWIPE_CLOSE_LOCK = 40
    const modalPanel = overlay.querySelector('.search-modal')

    overlay.addEventListener(
      'touchstart',
      (event) => {
        if (!event.touches?.length) return
        const touch = event.touches[0]
        touchStartY = touch.clientY
        touchStartX = touch.clientX
        isTrackingTouch = true
      },
      { passive: true }
    )

    overlay.addEventListener(
      'touchmove',
      (event) => {
        if (!isTrackingTouch || !event.touches?.length) return
        const touch = event.touches[0]
        const deltaY = touch.clientY - touchStartY
        const deltaX = Math.abs(touch.clientX - touchStartX)
        if (Math.abs(deltaY) > SWIPE_CLOSE_LOCK && deltaX < 64 && modalPanel) {
          modalPanel.style.transform = `translateY(${Math.max(deltaY, 0)}px) scale(0.985)`
        }
      },
      { passive: true }
    )

    overlay.addEventListener(
      'touchend',
      (event) => {
        if (!isTrackingTouch || !event.changedTouches?.length) return
        const touch = event.changedTouches[0]
        const deltaY = touch.clientY - touchStartY
        const deltaX = Math.abs(touch.clientX - touchStartX)
        isTrackingTouch = false
        if (modalPanel) {
          modalPanel.style.transform = ''
        }
        if (deltaY > SWIPE_CLOSE_THRESHOLD && deltaX < 64) {
          closeSearchModal()
        }
      },
      { passive: true }
    )

    return overlay
  }

  if (modalOverlay) {
    const openBtn = document.querySelector('.js-open-modal')
    const closeBtn = modalOverlay.querySelector('.js-close-modal')

    if (openBtn) {
      openBtn.addEventListener('click', function () {
        modalOverlay.classList.add('is-visible')
      })
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        modalOverlay.classList.remove('is-visible')
      })
    }
  }

  if (componentSelect) {
    componentSelect.addEventListener('change', function () {
      const target = document.querySelector(this.value)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    })
  }

  if (!isAuthEnabled()) {
    if (authToggle) {
      authToggle.title = AUTH_DISABLED_MESSAGE
      logAuthWarning('main.auth', AUTH_DISABLED_MESSAGE)
    }
    return
  }

  logAuthWarning('main.auth', 'Auth provider integration pending')
}

function initBackToTopButton() {
  let stack = document.querySelector('.floating-action-stack')
  if (!stack) {
    stack = document.createElement('div')
    stack.className = 'floating-action-stack'
    stack.setAttribute('aria-label', 'Quick page actions')
    document.body.appendChild(stack)
  }

  let shareButton = stack.querySelector('.floating-share-btn')
  if (!shareButton) {
    shareButton = document.createElement('button')
    shareButton.type = 'button'
    shareButton.className =
      'floating-action-btn floating-share-btn nav-icon-btn--share js-share-trigger'
    shareButton.setAttribute('aria-label', 'Share this page')
    shareButton.innerHTML = '<i class="ph ph-share-network" aria-hidden="true"></i>'
    stack.appendChild(shareButton)
  }

  let button = stack.querySelector('.back-to-top')
  if (!button) {
    button = document.createElement('button')
    button.type = 'button'
    button.className = 'floating-action-btn back-to-top'
    button.setAttribute('aria-label', 'Back to top')
    button.innerHTML = '<i class="ph ph-arrow-up" aria-hidden="true"></i>'
    stack.appendChild(button)
  }

  if (!shareButton.dataset.shareBound) {
    shareButton.dataset.shareBound = 'true'
    shareButton.addEventListener('click', async () => {
      const sharePayload = {
        title: document.title,
        text: document.querySelector('meta[name="description"]')?.content || 'Check out this page.',
        url: window.location.href,
      }

      if (navigator.share) {
        try {
          await navigator.share(sharePayload)
          return
        } catch (error) {
          if (error?.name === 'AbortError') return
        }
      }

      try {
        await navigator.clipboard.writeText(sharePayload.url)
        if (window.GameOnUI?.showToast) {
          window.GameOnUI.showToast('Link copied to clipboard.', 'info')
        }
      } catch {
        window.prompt('Copy this link:', sharePayload.url)
      }
    })
  }

  const toggleVisibility = () => {
    const showShare = true
    const showBackToTop = window.scrollY > 280
    stack.classList.toggle('is-visible', showShare || showBackToTop)
    shareButton.classList.toggle('is-visible', showShare)
    button.classList.toggle('is-visible', showBackToTop)
  }

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  toggleVisibility()
  window.addEventListener('scroll', toggleVisibility, { passive: true })
}

function initBookCoverPresentationFixes() {
  if (typeof document === 'undefined') return
  if (document.getElementById('book-cover-presentation-fixes')) return

  const style = document.createElement('style')
  style.id = 'book-cover-presentation-fixes'
  style.textContent = `
    .featured-books-shell {
      border-radius: 6px !important;
    }

    .featured-book-card img,
    .paperback-mockup img,
    .book-cover-trigger img,
    .paperback-mockup,
    .book-cover-trigger,
    .featured-book-card .book-cover-trigger,
    .featured-book-card figure {
      border-radius: 0 !important;
    }

    .featured-book-card img,
    .paperback-mockup img,
    .book-cover-trigger img {
      width: 100% !important;
      height: auto !important;
      aspect-ratio: auto !important;
      object-fit: contain !important;
      display: block !important;
    }

    .paperback-mockup,
    .book-cover-trigger {
      overflow: visible !important;
    }

    .featured-books-strip {
      position: relative;
    }

    .featured-books-rail-overlay,
    .featured-books-rail-indicator,
    .featured-books-rail-edge {
      display: none;
    }

    .featured-book-card__coming-line {
      display: none !important;
    }

    @media (max-width: 47.99rem) {
      .featured-books-shell {
        width: 100vw !important;
        max-width: none !important;
        margin-left: calc(50% - 50vw) !important;
        margin-right: calc(50% - 50vw) !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        border-radius: 0 !important;
      }

      .featured-books-strip__headline,
      .featured-books-strip__subhead,
      .featured-books-strip__links {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }

      .featured-books-strip__rail {
        display: flex !important;
        gap: 0.9rem !important;
        grid-auto-flow: initial !important;
        grid-auto-columns: unset !important;
        width: 100% !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        padding-bottom: 0.9rem !important;
        scroll-padding-inline: 50% !important;
      }

      .featured-book-card {
        flex: 0 0 clamp(15rem, 72vw, 17rem) !important;
      }

      .featured-book-card--upcoming-spine {
        flex: 0 0 5.15rem !important;
        width: 5.15rem !important;
        min-width: 5.15rem !important;
        margin-inline-start: 0 !important;
        padding-left: 0.15rem !important;
        padding-right: 0.15rem !important;
        justify-items: end !important;
      }

      .featured-book-card__coming-vertical {
        margin-left: 0.55rem !important;
      }

      .featured-books-rail-overlay {
        position: absolute;
        right: 0.85rem;
        top: 50%;
        transform: translateY(-50%);
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.55rem 0.7rem 0.55rem 1.15rem;
        border-radius: 999px;
        color: rgba(255, 255, 255, 0.88);
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        background: linear-gradient(90deg, rgba(5, 7, 8, 0) 0%, rgba(5, 7, 8, 0.2) 20%, rgba(5, 7, 8, 0.88) 55%, rgba(5, 7, 8, 0.95) 100%);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
        pointer-events: none;
        opacity: 0.95;
        transition: opacity 0.28s ease, transform 0.28s ease;
        z-index: 3;
      }

      .featured-books-rail-overlay.is-hidden {
        opacity: 0;
        transform: translateY(-50%) translateX(8px);
      }

      .featured-books-rail-indicator {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.45rem;
        padding: 0 1rem 0.55rem;
      }

      .featured-books-rail-indicator-dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.24);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
        transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
      }

      .featured-books-rail-indicator-dot.is-active {
        background: rgba(140, 214, 121, 0.95);
        box-shadow: 0 0 0 4px rgba(140, 214, 121, 0.12);
        transform: scale(1.08);
      }

      .featured-books-rail-edge {
        position: absolute;
        top: 0;
        bottom: 0.9rem;
        width: 1rem;
        display: block;
        pointer-events: none;
        z-index: 2;
        opacity: 0.92;
        transition: opacity 0.24s ease;
      }

      .featured-books-rail-edge--left {
        left: 0;
        background: linear-gradient(90deg, rgba(5, 7, 8, 0.36) 0%, rgba(5, 7, 8, 0.14) 45%, rgba(5, 7, 8, 0) 100%);
      }

      .featured-books-rail-edge--right {
        right: 0;
        background: linear-gradient(270deg, rgba(5, 7, 8, 0.36) 0%, rgba(5, 7, 8, 0.14) 45%, rgba(5, 7, 8, 0) 100%);
      }

      .featured-books-rail-edge.is-dim {
        opacity: 0.15;
      }
    }
  `

  document.head.appendChild(style)
}

function initFeaturedBooksRailEnhancements() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  const rail = document.querySelector('.featured-books-strip__rail')
  if (!rail || rail.dataset.mobileEnhanced === 'true') return

  const strip = rail.closest('.featured-books-strip')
  if (!strip) return

  rail.dataset.mobileEnhanced = 'true'

  const allCards = Array.from(rail.querySelectorAll('.featured-book-card'))
  const trackableCards = allCards.filter(
    (card) => !card.classList.contains('featured-book-card--upcoming-spine')
  )

  if (!trackableCards.length) return

  let overlay = strip.querySelector('.featured-books-rail-overlay')
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.className = 'featured-books-rail-overlay'
    overlay.setAttribute('aria-hidden', 'true')
    overlay.innerHTML = '<span>Swipe</span><i class="ph ph-arrow-right"></i>'
    strip.appendChild(overlay)
  }

  let indicator = strip.querySelector('.featured-books-rail-indicator')
  if (!indicator) {
    indicator = document.createElement('div')
    indicator.className = 'featured-books-rail-indicator'
    indicator.setAttribute('aria-hidden', 'true')

    trackableCards.forEach(() => {
      const dot = document.createElement('span')
      dot.className = 'featured-books-rail-indicator-dot'
      indicator.appendChild(dot)
    })

    rail.insertAdjacentElement('afterend', indicator)
  }

  let leftEdge = strip.querySelector('.featured-books-rail-edge--left')
  if (!leftEdge) {
    leftEdge = document.createElement('div')
    leftEdge.className = 'featured-books-rail-edge featured-books-rail-edge--left is-dim'
    leftEdge.setAttribute('aria-hidden', 'true')
    strip.appendChild(leftEdge)
  }

  let rightEdge = strip.querySelector('.featured-books-rail-edge--right')
  if (!rightEdge) {
    rightEdge = document.createElement('div')
    rightEdge.className = 'featured-books-rail-edge featured-books-rail-edge--right'
    rightEdge.setAttribute('aria-hidden', 'true')
    strip.appendChild(rightEdge)
  }

  const dots = Array.from(indicator.querySelectorAll('.featured-books-rail-indicator-dot'))
  const mobileQuery = window.matchMedia('(max-width: 47.99rem)')
  const isMobile = () => mobileQuery.matches
  let hasDismissedSwipeHint = false

  const dismissSwipeHint = () => {
    hasDismissedSwipeHint = true
    overlay.classList.add('is-hidden')
  }

  const centerCard = (card, smooth = false) => {
    if (!card) return
    const targetLeft = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2
    rail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: smooth ? 'smooth' : 'auto',
    })
  }

  const positionEdgeShadows = () => {
    if (!isMobile()) return
    const top = `${rail.offsetTop}px`
    const height = `${rail.offsetHeight}px`
    leftEdge.style.top = top
    rightEdge.style.top = top
    leftEdge.style.height = height
    rightEdge.style.height = height
  }

  const updateRailState = () => {
    if (!isMobile()) {
      overlay.classList.add('is-hidden')
      leftEdge.classList.add('is-dim')
      rightEdge.classList.add('is-dim')
      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === 0))
      return
    }

    positionEdgeShadows()

    const railCenter = rail.scrollLeft + rail.clientWidth / 2
    let activeIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    trackableCards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - railCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        activeIndex = index
      }
    })

    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeIndex)
    })

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth
    const nearStart = rail.scrollLeft < 10
    const nearEnd = maxScrollLeft - rail.scrollLeft < 24

    leftEdge.classList.toggle('is-dim', nearStart)
    rightEdge.classList.toggle('is-dim', nearEnd)

    if (hasDismissedSwipeHint || nearEnd) {
      overlay.classList.add('is-hidden')
    } else {
      overlay.classList.remove('is-hidden')
    }
  }

  let hasCenteredInitialCard = false

  const ensureInitialPosition = () => {
    if (!isMobile() || hasCenteredInitialCard) return

    window.requestAnimationFrame(() => {
      centerCard(trackableCards[0], false)
      updateRailState()
      hasCenteredInitialCard = true
    })
  }

  rail.addEventListener(
    'scroll',
    () => {
      if (rail.scrollLeft > 14) dismissSwipeHint()
      updateRailState()
      hasCenteredInitialCard = true
    },
    { passive: true }
  )

  rail.addEventListener('touchstart', dismissSwipeHint, { passive: true })
  rail.addEventListener('pointerdown', dismissSwipeHint, { passive: true })

  const handleViewportChange = () => {
    if (!isMobile()) {
      hasCenteredInitialCard = false
    }
    ensureInitialPosition()
    updateRailState()
  }

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', handleViewportChange)
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(handleViewportChange)
  }

  window.addEventListener('resize', handleViewportChange, { passive: true })
  window.addEventListener('orientationchange', handleViewportChange, { passive: true })

  ensureInitialPosition()
  updateRailState()
}

function initExperience() {
  initBookCoverPresentationFixes()
  initFeaturedBooksRailEnhancements()
  initSmartAppBanner()
  initNavigationAndAuth()
  initBackToTopButton()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExperience, { once: true })
} else {
  initExperience()
}

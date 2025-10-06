import { applyIndexingMeta } from './seo-indexing.js'
import { AUTH_DISABLED_MESSAGE, isAuthEnabled } from './auth-service.js'
import { logAuthWarning } from './auth-logger.js'

const APPLE_BOOKS_URL =
  'https://books.apple.com/us/book/game-on-master-the-conversation-win-her-heart/id6745466900'
const SMART_APP_BANNER_DISMISS_KEY = 'darenprince.smartAppBanner.dismissed'

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

  const banner = buildSmartAppBanner()
  const body = document.body
  if (!banner || !body) {
    return
  }

  body.appendChild(banner)

  const revealThreshold = 120
  let hasRevealed = false

  const revealBanner = () => {
    if (hasRevealed) return
    hasRevealed = true
    banner.classList.remove('smart-app-banner--hidden')
    banner.classList.add('smart-app-banner--visible')
  }

  const scrollRevealHandler = () => {
    if (window.scrollY > revealThreshold) {
      revealBanner()
      window.removeEventListener('scroll', scrollRevealHandler)
    }
  }

  if (window.scrollY > revealThreshold) {
    window.requestAnimationFrame(revealBanner)
  } else {
    window.addEventListener('scroll', scrollRevealHandler, { passive: true })
  }

  const closeButton = banner.querySelector('.smart-app-banner__close')
  closeButton?.addEventListener('click', () => {
    persistSmartAppBannerDismissal()
    window.removeEventListener('scroll', scrollRevealHandler)
    banner.classList.remove('smart-app-banner--visible')
    banner.classList.add('smart-app-banner--hidden')
    window.setTimeout(() => {
      banner.remove()
    }, 360)
  })

  const ctaButton = banner.querySelector('.smart-app-banner__cta')
  ctaButton?.addEventListener('click', () => {
    persistSmartAppBannerDismissal()
    window.removeEventListener('scroll', scrollRevealHandler)
  })
}

function initNavigationAndAuth() {
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
  let searchModal
  const modalOverlay = document.getElementById('demo-modal')
  const componentSelect = document.querySelector('.component-nav__select')

  // ---------------------------
  // menu + search event binding
  // ---------------------------

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

  if (megaMenu && menuCloses.length) {
    menuCloses.forEach((closeButton) => {
      closeButton.addEventListener('click', () => setMenuState(false))
    })
  }

  if (menuOverlay && megaMenu) {
    menuOverlay.addEventListener('click', () => setMenuState(false))
  }

  // default auth toggle -> login
  let loginHandler
  if (authToggle) {
    loginHandler = function () {
      window.location.href = '/login.html'
    }
    authToggle.innerHTML = '<i class="ti ti-key"></i> Log In'
    authToggle.addEventListener('click', loginHandler)
  }

  if (searchToggle) {
    searchToggle.addEventListener('click', function () {
      if (window.matchMedia('(min-width: 768px)').matches) {
        openSearchModal()
      } else if (searchBar) {
        if (searchBar.hasAttribute('hidden')) {
          searchBar.removeAttribute('hidden')
          const input = searchBar.querySelector('input[type="search"]')
          if (input) input.focus()
        } else {
          searchBar.setAttribute('hidden', '')
        }
      }
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
        if (window.matchMedia('(min-width: 768px)').matches) {
          openSearchModal()
        } else if (searchBar) {
          searchBar.removeAttribute('hidden')
          const input = searchBar.querySelector('input[type="search"]')
          if (input) input.focus()
        }
      }
    })
  }

  const searchForm = searchBar?.querySelector('form')
  searchForm?.addEventListener('submit', function (e) {
    e.preventDefault()
    const query = searchForm.querySelector('input[type="search"]').value.trim()
    if (query) {
      const url = `https://www.google.com/search?q=site:darenprince.com+${encodeURIComponent(query)}`
      window.open(url, '_blank')
    }
  })

  function openSearchModal() {
    if (!searchModal) {
      searchModal = createSearchModal()
    }
    searchModal.classList.add('is-visible')
    const input = searchModal.querySelector('input[type="search"]')
    if (input) input.focus()
  }

  function closeSearchModal() {
    if (searchModal) {
      searchModal.classList.remove('is-visible')
      searchToggle.focus()
    }
  }

  function createSearchModal() {
    const overlay = document.createElement('div')
    overlay.className = 'search-modal-overlay'
    overlay.innerHTML = `
      <div class="search-modal">
        <button class="search-close" aria-label="Close search">&times;</button>
        <form class="search-form flex items-center">
          <input type="search" placeholder="search site" />
          <button type="submit" class="search-submit"><i class="ti ti-search"></i></button>
        </form>
      </div>`
    document.body.appendChild(overlay)

    const closeBtn = overlay.querySelector('.search-close')
    closeBtn.addEventListener('click', closeSearchModal)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSearchModal()
    })

    const form = overlay.querySelector('form')
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      const query = form.querySelector('input[type="search"]').value.trim()
      if (query) {
        const url = `https://www.google.com/search?q=site:darenprince.com+${encodeURIComponent(query)}`
        window.open(url, '_blank')
      }
    })

    return overlay
  }

  // ---------------------------
  // Demo modal + component nav
  // ---------------------------

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

  // Placeholder for future auth provider integration.
  logAuthWarning('main.auth', 'Auth provider integration pending')
}

function initExperience() {
  initSmartAppBanner()
  initNavigationAndAuth()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExperience, { once: true })
} else {
  initExperience()
}

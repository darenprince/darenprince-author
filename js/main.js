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

  let hasRevealed = false

  const revealBanner = () => {
    if (hasRevealed) return
    hasRevealed = true
    banner.classList.remove('smart-app-banner--hidden')
    banner.classList.add('smart-app-banner--visible')
  }

  window.requestAnimationFrame(revealBanner)

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

  const ensureTopNavShareButton = () => {
    const navButtonGroup = document.querySelector('.nav-btn-group')
    if (!navButtonGroup || navButtonGroup.querySelector('.js-share-trigger')) return

    const shareButton = document.createElement('button')
    shareButton.className = 'nav-icon-btn nav-icon-btn--share js-share-trigger'
    shareButton.type = 'button'
    shareButton.setAttribute('aria-label', 'Share this page')
    shareButton.innerHTML = '<i class="ph ph-share-network"></i>'
    navButtonGroup.insertBefore(
      shareButton,
      navButtonGroup.querySelector('.js-menu-toggle') || null
    )
  }

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

  syncDeskLinkToContact()
  ensureTopNavShareButton()
  initNativeShare()

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
    authToggle.innerHTML = '<i class="ph ph-key"></i> Log In'
    authToggle.addEventListener('click', loginHandler)
  }

  if (searchToggle) {
    searchToggle.addEventListener('click', function () {
      if (window.matchMedia('(min-width: 768px)').matches) {
        openSearchModal()
      } else if (searchBar) {
        if (searchBar.hasAttribute('hidden')) {
          searchBar.removeAttribute('hidden')
          if (topSearchInput) topSearchInput.focus()
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
          if (topSearchInput) topSearchInput.focus()
        }
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

function initBackToTopButton() {
  if (document.querySelector('.back-to-top')) return
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'back-to-top'
  button.setAttribute('aria-label', 'Back to top')
  button.innerHTML = '<i class="ph ph-arrow-up" aria-hidden="true"></i>'
  document.body.appendChild(button)

  const toggleVisibility = () => {
    const isVisible = window.scrollY > 420
    button.classList.toggle('is-visible', isVisible)
  }

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  toggleVisibility()
  window.addEventListener('scroll', toggleVisibility, { passive: true })
}

function initExperience() {
  initSmartAppBanner()
  initNavigationAndAuth()
  initBackToTopButton()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExperience, { once: true })
} else {
  initExperience()
}

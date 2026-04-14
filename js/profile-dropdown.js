import { AUTH_DISABLED_MESSAGE, isAuthEnabled } from './auth-service.js'
import { logAuthInfo } from './auth-logger.js'

const GUEST_AVATAR_DATA_URI =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23112b20"/><stop offset="1" stop-color="%23224f39"/></linearGradient></defs><rect width="64" height="64" rx="32" fill="url(%23g)"/><circle cx="32" cy="24" r="11" fill="%23d7f6d0"/><path d="M14 52c2.8-8.8 10-13.4 18-13.4S47.2 43.2 50 52" fill="%23d7f6d0"/></svg>'

function prefixIcon(el, iconClass) {
  if (!el || !iconClass || el.querySelector('.ph')) return
  const icon = document.createElement('i')
  icon.className = `ph ${iconClass}`
  icon.setAttribute('aria-hidden', 'true')
  el.prepend(icon)
}

function initProfileDropdown() {
  const toggle = document.querySelector('.js-profile-toggle')
  const dropdown = document.querySelector('.js-profile-dropdown')
  if (!toggle || !dropdown) return
  if (toggle.dataset.dropdownBound === 'true') return
  toggle.dataset.dropdownBound = 'true'

  const avatarImg = dropdown.querySelector('.profile-avatar')
  const nameEl = dropdown.querySelector('.profile-name')
  const logoutEl = dropdown.querySelector('.js-auth-toggle')
  const dashboardLink =
    dropdown.querySelector('.js-dashboard-link') || dropdown.querySelector('a[href*="dashboard"]')
  const accountLink = dropdown.querySelector('a[href*="login"], a[href*="account"]')

  prefixIcon(dashboardLink, 'ph-squares-four')
  prefixIcon(accountLink, 'ph-user-circle')
  prefixIcon(logoutEl, 'ph-sign-in')

  const setDropdownState = (isOpen) => {
    dropdown.hidden = !isOpen
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
  }

  toggle.setAttribute('aria-expanded', 'false')

  toggle.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDropdownState(dropdown.hidden)
  })

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
      setDropdownState(false)
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setDropdownState(false)
    }
  })

  dropdown.addEventListener('click', (event) => {
    event.stopPropagation()
  })

  if (logoutEl) {
    logoutEl.innerHTML = '<i class="ph ph-sign-in" aria-hidden="true"></i><span>Log In</span>'
    logoutEl.addEventListener('click', () => {
      window.location.href = '/login.html'
    })
  }

  const authReady = isAuthEnabled()
  if (!authReady) {
    if (nameEl) nameEl.textContent = 'Guest'
    if (avatarImg) {
      avatarImg.src = GUEST_AVATAR_DATA_URI
      avatarImg.alt = 'Guest profile placeholder icon'
      avatarImg.classList.add('is-placeholder')
    }
    if (dashboardLink) {
      dashboardLink.href = '/login.html'
      dashboardLink.innerHTML =
        '<i class="ph ph-user-focus" aria-hidden="true"></i><span>Member Login</span>'
    }
    if (accountLink) {
      accountLink.innerHTML =
        '<i class="ph ph-key" aria-hidden="true"></i><span>Account Access</span>'
    }
    if (logoutEl) {
      logoutEl.title = AUTH_DISABLED_MESSAGE
    }
    logAuthInfo('profile-dropdown', AUTH_DISABLED_MESSAGE)
    return
  }

  logAuthInfo('profile-dropdown', 'Auth provider integration pending')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProfileDropdown, { once: true })
} else {
  initProfileDropdown()
}

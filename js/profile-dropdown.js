import { AUTH_DISABLED_MESSAGE, isAuthEnabled } from './auth-service.js'
import { logAuthInfo } from './auth-logger.js'

function initProfileDropdown() {
  const toggle = document.querySelector('.js-profile-toggle')
  const dropdown = document.querySelector('.js-profile-dropdown')
  if (!toggle || !dropdown) return

  const avatarImg = dropdown.querySelector('.profile-avatar')
  const nameEl = dropdown.querySelector('.profile-name')
  const logoutEl = dropdown.querySelector('.js-auth-toggle')
  const dashboardLink =
    dropdown.querySelector('.js-dashboard-link') || dropdown.querySelector('a[href*="dashboard"]')

  toggle.addEventListener('click', () => {
    dropdown.hidden = !dropdown.hidden
  })

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
      dropdown.hidden = true
    }
  })

  if (logoutEl) {
    logoutEl.textContent = 'Log In'
    logoutEl.addEventListener('click', () => {
      window.location.href = '/login.html'
    })
  }

  const authReady = isAuthEnabled()
  if (!authReady) {
    if (nameEl) nameEl.textContent = 'Guest'
    if (avatarImg) {
      avatarImg.removeAttribute('src')
      avatarImg.alt = 'Guest avatar'
    }
    if (dashboardLink) {
      dashboardLink.href = '/login.html'
      dashboardLink.textContent = 'Member login'
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

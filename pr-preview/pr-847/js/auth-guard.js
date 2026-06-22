import { AUTH_DISABLED_MESSAGE, getAuthStatus } from './auth-service.js'
import { DEFAULT_ROLE } from './user-role.js'
import { logAuthInfo, logAuthWarning } from './auth-logger.js'

const DEFAULT_REDIRECT = 'login.html'
let gateStylesInjected = false

function domReady() {
  if (document.readyState === 'loading') {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', resolve, { once: true })
    })
  }
  return Promise.resolve()
}

function ensureGateStyles() {
  if (gateStylesInjected) return
  const style = document.createElement('style')
  style.dataset.source = 'auth-guard'
  style.textContent = `
    .auth-blocker { position: fixed; inset: 0; z-index: 3200; display: flex; align-items: center; justify-content: center; padding: 2rem; background: rgba(5, 7, 9, 0.92); backdrop-filter: blur(4px); }
    .auth-blocker__panel { max-width: 520px; width: 100%; background: rgba(17, 18, 23, 0.95); border: 1px solid rgba(125, 222, 91, 0.25); border-radius: 18px; padding: 2.5rem 2rem; color: #f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif; box-shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.65); text-align: center; }
    .auth-blocker__panel h2 { font-size: clamp(1.5rem, 2.4vw, 2rem); margin-bottom: 1rem; letter-spacing: 0.02em; }
    .auth-blocker__panel p { margin-bottom: 1.75rem; line-height: 1.6; color: #d6d6d6; }
    .auth-blocker__actions { display: flex; flex-direction: column; gap: 0.75rem; }
    .auth-blocker__button { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.5rem; border-radius: 999px; border: 1px solid transparent; font-weight: 600; letter-spacing: 0.02em; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease; text-decoration: none; }
    .auth-blocker__button--primary { background: linear-gradient(135deg, rgba(125, 222, 91, 0.95), rgba(86, 170, 72, 0.95)); color: #041406; box-shadow: 0 14px 35px -20px rgba(125, 222, 91, 0.85); }
    .auth-blocker__button--primary:hover, .auth-blocker__button--primary:focus-visible { transform: translateY(-1px); box-shadow: 0 20px 45px -22px rgba(125, 222, 91, 0.9); }
    .auth-blocker__button--ghost { background: transparent; border-color: rgba(255, 255, 255, 0.25); color: #f5f5f5; }
    .auth-blocker__button--ghost:hover, .auth-blocker__button--ghost:focus-visible { border-color: rgba(125, 222, 91, 0.55); color: #7dde5b; }
    .auth-blocker__meta { margin-top: 1rem; font-size: 0.875rem; color: #9ea2a8; }
    body.auth-blocked { overflow: hidden; }
  `
  document.head.appendChild(style)
  gateStylesInjected = true
}

function revealSite() {
  const siteWrap = document.querySelector('.site-wrap')
  if (siteWrap && siteWrap.hasAttribute('hidden')) {
    siteWrap.removeAttribute('hidden')
  }
  document.body.classList.remove('auth-blocked')
}

async function showBlockingMessage({ heading, body, actions = [], meta }) {
  await domReady()
  ensureGateStyles()
  document.body.classList.add('auth-blocked')
  const existing = document.querySelector('.auth-blocker')
  if (existing) existing.remove()
  const overlay = document.createElement('div')
  overlay.className = 'auth-blocker'
  const panel = document.createElement('div')
  panel.className = 'auth-blocker__panel'
  const h2 = document.createElement('h2')
  h2.textContent = heading
  const p = document.createElement('p')
  p.textContent = body
  panel.append(h2, p)
  const actionGroup = document.createElement('div')
  actionGroup.className = 'auth-blocker__actions'
  actions.forEach((action) => {
    if (!action) return
    const isButton = typeof action.onClick === 'function' && !action.href
    const element = document.createElement(isButton ? 'button' : 'a')
    element.className = `auth-blocker__button ${action.variant === 'ghost' ? 'auth-blocker__button--ghost' : 'auth-blocker__button--primary'}`
    element.textContent = action.label
    if (action.href) {
      element.href = action.href
    }
    if (action.target) {
      element.target = action.target
      element.rel = action.rel ?? 'noopener noreferrer'
    }
    if (typeof action.onClick === 'function') {
      element.addEventListener('click', (event) => {
        event.preventDefault()
        action.onClick(event)
      })
    }
    actionGroup.appendChild(element)
  })
  if (actionGroup.childElementCount) {
    panel.appendChild(actionGroup)
  }
  if (meta) {
    const metaEl = document.createElement('p')
    metaEl.className = 'auth-blocker__meta'
    metaEl.textContent = meta
    panel.appendChild(metaEl)
  }
  overlay.appendChild(panel)
  document.body.appendChild(overlay)
}

function buildLoginRedirect() {
  const redirectPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const encoded = encodeURIComponent(redirectPath)
  return `${DEFAULT_REDIRECT}?redirect=${encoded}`
}

export async function enforceAuthGuard(options = {}) {
  const {
    offlineHeading = 'Member area is offline',
    offlineMessage = AUTH_DISABLED_MESSAGE,
    actions = [
      {
        label: 'Back to homepage',
        href: '/',
        variant: 'ghost',
      },
      {
        label: 'Email support',
        href: 'mailto:press@darenprince.com',
      },
    ],
    onAuthorized,
  } = options

  revealSite()
  await showBlockingMessage({
    heading: offlineHeading,
    body: offlineMessage,
    actions,
    meta: 'Authentication service is being rebuilt with a new data provider.',
  })

  const status = getAuthStatus()
  logAuthWarning('auth-guard', offlineMessage)

  const detail = {
    service: status.service,
    user: status.user,
    role: DEFAULT_ROLE,
    folderAccess: [],
    message: status.message,
    redirect: buildLoginRedirect(),
  }

  if (typeof onAuthorized === 'function') {
    try {
      await onAuthorized(detail)
    } catch (error) {
      logAuthInfo('auth-guard.onAuthorized', 'onAuthorized hook skipped while auth is offline', {
        message: error?.message,
      })
    }
  }

  return detail
}

export default enforceAuthGuard

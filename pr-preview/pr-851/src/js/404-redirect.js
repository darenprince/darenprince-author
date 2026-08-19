const REDIRECT_DELAY_MS = 6000
const HOME_PATH = '/index.html'

function prefixedPath(path) {
  if (!path.startsWith('/')) return path
  const prefix = document.documentElement?.dataset?.assetPrefix || ''
  return `${prefix}${path}`
}

function formatSeconds(msRemaining) {
  return Math.max(0, Math.ceil(msRemaining / 1000))
}

function init404Redirect() {
  const progressFill = document.querySelector('[data-redirect-progress-fill]')
  const status = document.querySelector('[data-redirect-status]')
  const backButton = document.querySelector('[data-back-safety]')
  const indexButton = document.querySelector('[data-site-index]')
  const homeTarget = prefixedPath(HOME_PATH)
  const indexTarget = prefixedPath('/sitemap.html')

  if (indexButton) {
    indexButton.setAttribute('href', indexTarget)
  }

  let timerEnded = false
  const start = performance.now()

  const tick = (now) => {
    if (timerEnded) return
    const elapsed = now - start
    const remaining = Math.max(0, REDIRECT_DELAY_MS - elapsed)
    const progress = Math.min(1, elapsed / REDIRECT_DELAY_MS)

    if (progressFill) {
      progressFill.style.setProperty('--redirect-progress', `${progress}`)
    }

    if (status) {
      status.textContent = `Redirecting home in ${formatSeconds(remaining)}s…`
    }

    if (remaining <= 0) {
      timerEnded = true
      window.location.replace(homeTarget)
      return
    }

    window.requestAnimationFrame(tick)
  }

  window.requestAnimationFrame(tick)

  if (backButton) {
    backButton.addEventListener('click', () => {
      timerEnded = true
      if (window.history.length > 1) {
        window.history.back()
        return
      }
      window.location.assign(homeTarget)
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init404Redirect, { once: true })
} else {
  init404Redirect()
}

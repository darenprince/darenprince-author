const REDIRECT_SECONDS = 6
const TICK_MS = 100

function getAssetPrefix() {
  return document.documentElement?.dataset?.assetPrefix || ''
}

function prefixedPath(path) {
  if (!path.startsWith('/')) return path
  return `${getAssetPrefix()}${path}`
}

const countdownEl = document.querySelector('[data-countdown]')
const progressBar = document.querySelector('[data-progress-bar]')
const announcer = document.querySelector('[data-progress-announcer]')
const manualButton = document.getElementById('back-to-safety')

if (countdownEl && progressBar && announcer) {
  let canceled = false
  const destination = prefixedPath('/index.html')
  const started = performance.now()

  manualButton?.addEventListener('click', () => {
    canceled = true
  })

  const timer = window.setInterval(() => {
    if (canceled) {
      window.clearInterval(timer)
      return
    }

    const elapsed = performance.now() - started
    const progress = Math.min(1, elapsed / (REDIRECT_SECONDS * 1000))
    const remainingMs = Math.max(0, REDIRECT_SECONDS * 1000 - elapsed)
    const remainingSeconds = Math.ceil(remainingMs / 1000)

    progressBar.style.width = `${(progress * 100).toFixed(2)}%`
    countdownEl.textContent = String(remainingSeconds)
    announcer.textContent = `Redirecting to homepage in ${remainingSeconds} second${remainingSeconds === 1 ? '' : 's'}.`

    if (progress >= 1) {
      window.clearInterval(timer)
      window.location.assign(destination)
    }
  }, TICK_MS)
}

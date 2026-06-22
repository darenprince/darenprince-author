const STORAGE_KEY = 'gameOn.preloader.shown'
const FORCE_QUERY = 'preload'
const MIN_DISPLAY_MS = 2400
const MAX_DISPLAY_MS = 9000

const preloader = document.querySelector('[data-preloader]')

function safeSessionStorage(action, fallback) {
  try {
    return action()
  } catch (error) {
    console.warn('[preloader] sessionStorage unavailable', error)
    return fallback
  }
}

function markPreloaderSeen() {
  safeSessionStorage(() => window.sessionStorage.setItem(STORAGE_KEY, '1'))
}

if (!preloader) {
  markPreloaderSeen()
}

;(function initPreloader() {
  if (!preloader) return

  const url = new URL(window.location.href)
  const forcePreload = url.searchParams.get(FORCE_QUERY) === '1'
  const alreadySeen = safeSessionStorage(
    () => window.sessionStorage.getItem(STORAGE_KEY) === '1',
    false
  )

  if (!forcePreload && alreadySeen) {
    preloader.remove()
    return
  }

  document.body.classList.add('is-preloading')

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    preloader.classList.add('gameon-preloader--reduced-motion')
  }

  const skipButton = preloader.querySelector('[data-preloader-skip]')
  const progressFill = preloader.querySelector('[data-preloader-progress]')

  let progressValue = 0
  let progressTimer
  const setProgress = (value) => {
    if (!progressFill) return
    progressValue = Math.max(progressValue, Math.min(100, value))
    progressFill.style.width = `${progressValue}%`
  }
  const queueProgress = () => {
    if (!progressFill) return
    const nextTarget = dismissed ? 100 : Math.min(96, progressValue + 8 + Math.random() * 12)
    setProgress(nextTarget)
    if (!dismissed) {
      progressTimer = window.setTimeout(queueProgress, 420 + Math.random() * 340)
    }
  }

  if (progressFill) {
    setProgress(6)
    progressTimer = window.setTimeout(queueProgress, 420)
  }

  let minDisplayElapsed = false
  let windowLoaded = document.readyState === 'complete'
  let dismissed = false

  const teardown = () => {
    document.body.classList.remove('is-preloading')
    preloader.remove()
  }

  const hidePreloader = () => {
    if (dismissed) return
    dismissed = true
    if (progressTimer) window.clearTimeout(progressTimer)
    markPreloaderSeen()

    if (progressFill) {
      setProgress(100)
    }

    preloader.setAttribute('aria-hidden', 'true')
    requestAnimationFrame(() => {
      preloader.classList.add('gameon-preloader--hidden')
      document.body.classList.remove('is-preloading')
    })

    preloader.addEventListener('transitionend', teardown, { once: true })
    window.setTimeout(teardown, 800)
  }

  const tryHide = (fromSkip = false) => {
    if (!fromSkip && (!minDisplayElapsed || !windowLoaded)) {
      return
    }
    hidePreloader()
  }

  skipButton?.addEventListener('click', () => {
    minDisplayElapsed = true
    windowLoaded = true
    tryHide(true)
  })

  window.addEventListener('load', () => {
    windowLoaded = true
    tryHide()
  })

  window.setTimeout(() => {
    minDisplayElapsed = true
    tryHide()
  }, MIN_DISPLAY_MS)

  window.setTimeout(() => {
    minDisplayElapsed = true
    windowLoaded = true
    tryHide(true)
  }, MAX_DISPLAY_MS)
})()

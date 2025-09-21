;(function () {
  const promos = document.querySelectorAll('[data-apple-books-promo]')
  if (!promos.length) return

  const userAgent = navigator.userAgent || ''
  const vendor = navigator.vendor || ''
  const platform = navigator.platform || ''
  const maxTouchPoints = navigator.maxTouchPoints || 0

  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || /iPad|iPhone|iPod/.test(platform)
  const isMacTouch = /Macintosh/.test(userAgent) && maxTouchPoints > 1
  const isAppleVendor = typeof vendor === 'string' && vendor.includes('Apple')
  const isAppleDevice = isIOS || isMacTouch || isAppleVendor

  if (!isAppleDevice) {
    return
  }

  const canUseStorage = (() => {
    try {
      const testKey = '__appleBooksPromoTest__'
      window.localStorage.setItem(testKey, '1')
      window.localStorage.removeItem(testKey)
      return true
    } catch (error) {
      return false
    }
  })()

  const now = Date.now()
  const hero = document.querySelector('.hero--video')

  promos.forEach((promo) => {
    const storageKey = promo.dataset.promoKey || 'appleBooksPromoDismissed'
    const dismissDays = Number(promo.dataset.dismissDays) || 7
    const successDays = Number(promo.dataset.successDays) || 45

    if (canUseStorage) {
      const storedValue = window.localStorage.getItem(storageKey)
      if (storedValue) {
        const storedUntil = Number(storedValue)
        if (!Number.isNaN(storedUntil) && storedUntil > now) {
          return
        }
        window.localStorage.removeItem(storageKey)
      }
    }

    const appleBooksUrl = promo.dataset.appleBooksUrl
    const cta = promo.querySelector('[data-action="open-apple-books"]')
    const dialog = promo.querySelector('.apple-books-modal__dialog')
    const closeControl = promo.querySelector('[data-action="dismiss-apple-books"]')

    if (cta && appleBooksUrl) {
      cta.setAttribute('href', appleBooksUrl)
    }

    let hasShown = false
    let hideTimeoutId = null

    const setStorageUntil = (days) => {
      if (!canUseStorage) return
      const future = Date.now() + days * 24 * 60 * 60 * 1000
      window.localStorage.setItem(storageKey, String(future))
    }

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        hidePromo(dismissDays)
      }
    }

    const showPromo = () => {
      if (hasShown) return
      hasShown = true
      promo.hidden = false
      requestAnimationFrame(() => {
        promo.classList.add('is-visible')
        dialog?.focus({ preventScroll: true })
        document.addEventListener('keydown', handleKeydown)
      })
    }

    function hidePromo(days) {
      if (!hasShown) return
      promo.classList.remove('is-visible')
      setStorageUntil(days)
      document.removeEventListener('keydown', handleKeydown)

      const finalizeHide = () => {
        promo.setAttribute('hidden', '')
        promo.removeEventListener('transitionend', finalizeHide)
        if (hideTimeoutId) {
          window.clearTimeout(hideTimeoutId)
          hideTimeoutId = null
        }
      }

      promo.addEventListener('transitionend', finalizeHide)
      hideTimeoutId = window.setTimeout(finalizeHide, 500)
    }

    closeControl?.addEventListener('click', () => {
      hidePromo(dismissDays)
    })

    cta?.addEventListener('click', () => {
      hidePromo(successDays)
    })

    const scheduleReveal = () => {
      if (!hero) {
        window.setTimeout(showPromo, 900)
        return
      }

      let revealed = false

      const evaluateHeroPosition = () => {
        if (revealed) return
        const rect = hero.getBoundingClientRect()
        const heroPastViewport = rect.bottom <= 0 || rect.top <= -160
        if (heroPastViewport) {
          revealed = true
          window.removeEventListener('scroll', evaluateHeroPosition)
          window.removeEventListener('resize', evaluateHeroPosition)
          showPromo()
        }
      }

      window.addEventListener('scroll', evaluateHeroPosition, { passive: true })
      window.addEventListener('resize', evaluateHeroPosition)
      evaluateHeroPosition()
    }

    scheduleReveal()
  })
})()

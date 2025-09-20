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
    if (cta && appleBooksUrl) {
      cta.setAttribute('href', appleBooksUrl)
    }

    promo.hidden = false
    requestAnimationFrame(() => {
      promo.classList.add('is-visible')
    })

    const dismiss = promo.querySelector('[data-action="dismiss-apple-books"]')
    const setStorageUntil = (days) => {
      if (!canUseStorage) return
      const future = Date.now() + days * 24 * 60 * 60 * 1000
      window.localStorage.setItem(storageKey, String(future))
    }

    dismiss?.addEventListener('click', () => {
      promo.classList.remove('is-visible')
      promo.setAttribute('hidden', '')
      setStorageUntil(dismissDays)
    })

    cta?.addEventListener('click', () => {
      setStorageUntil(successDays)
    })
  })
})()

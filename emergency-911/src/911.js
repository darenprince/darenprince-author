const CODE = '64235548'

const setSystemFonts = () => {
  const root = document.documentElement
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || ''
  const isApple =
    /iPad|iPhone|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && 'ontouchend' in document)
  const isAndroid = /Android/.test(userAgent)

  if (isApple) {
    root.style.setProperty(
      '--font-system-body',
      `'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif`
    )
    root.style.setProperty(
      '--font-system-heading',
      `'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif`
    )
  } else if (isAndroid) {
    root.style.setProperty(
      '--font-system-body',
      `'Roboto', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`
    )
    root.style.setProperty(
      '--font-system-heading',
      `'Roboto', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`
    )
  } else {
    root.style.setProperty('--font-system-body', `'Helvetica Neue', Helvetica, Arial, sans-serif`)
    root.style.setProperty(
      '--font-system-heading',
      `'Helvetica Neue', Helvetica, Arial, sans-serif`
    )
  }
}

const smoothScrollTo = (hash) => {
  const target = document.querySelector(hash)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const clampNumber = (value, min, max) => Math.min(Math.max(value, min), max)

const toNumber = (value, fallback = 0) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const toInteger = (value, fallback = 0) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

const normalizeState = (value, allowed, fallback) => {
  const normalized = (value ?? '').toString().trim().toLowerCase()
  return allowed.includes(normalized) ? normalized : fallback
}

document.addEventListener('DOMContentLoaded', () => {
  setSystemFonts()

  const body = document.body
  const gate = document.querySelector('#passwordGate')
  const main = document.querySelector('.emergency-main')
  const cards = document.querySelectorAll('[data-card]')
  const inputs = gate?.querySelectorAll('.code-input')
  const form = gate?.querySelector('form')
  const error = gate?.querySelector('[data-error]')
  const gateContent = gate?.querySelector('[data-gate-content]')
  const gateAuth = gate?.querySelector('[data-gate-auth]')
  const authStages = Array.from(gateAuth?.querySelectorAll('[data-auth-stage]') ?? [])
  const preloader = document.querySelector('[data-preloader]')
  const nav = document.querySelector('.command-nav')
  const menuToggle = document.querySelector('.command-menu-toggle')
  const backToTop = document.querySelector('.back-to-top')
  const modal = document.querySelector('[data-alert-modal]')
  const modalCloseTriggers = modal?.querySelectorAll('[data-modal-close]') ?? []
  const copyButtons = document.querySelectorAll('.copy-button')
  const directoryModal = document.querySelector('[data-directory-modal]')
  const directoryOpeners = document.querySelectorAll('[data-directory-open]')
  const directoryClosers = directoryModal?.querySelectorAll('[data-directory-close]') ?? []
  const directorySearch = directoryModal?.querySelector('[data-directory-search]') ?? null
  const directoryEntries = Array.from(
    directoryModal?.querySelectorAll('[data-directory-entry]') ?? []
  )
  const directorySections = Array.from(
    directoryModal?.querySelectorAll('[data-directory-section]') ?? []
  )
  const directoryEmpty = directoryModal?.querySelector('[data-directory-empty]') ?? null
  const telemetryPanel = document.querySelector('[data-device-telemetry]')
  const batteryMetric = telemetryPanel?.querySelector('[data-metric="battery"]') ?? null
  const wifiMetric = telemetryPanel?.querySelector('[data-metric="wifi"]') ?? null
  const cellMetric = telemetryPanel?.querySelector('[data-metric="cell"]') ?? null

  const updateBatteryMetric = (metric, payload = {}) => {
    const status = normalizeState(
      payload.status ?? metric.dataset.status,
      ['charging', 'discharging', 'full'],
      'discharging'
    )
    const level = clampNumber(toNumber(payload.level ?? metric.dataset.level ?? '0', 0), 0, 100)
    const isCharging = status === 'charging'
    const levelState = level <= 5 ? 'critical' : level <= 25 ? 'low' : 'normal'
    metric.dataset.status = status
    metric.dataset.level = String(level)
    metric.setAttribute('data-level-state', levelState)
    metric.setAttribute('data-battery-charging', isCharging ? 'true' : 'false')
    const normalizedLevel = (level / 100).toFixed(3)
    metric.style.setProperty('--battery-level', normalizedLevel)
    const fill = metric.querySelector('[data-battery-fill]')
    fill?.style.setProperty('--battery-level', normalizedLevel)
    const visual = metric.querySelector('[data-battery-visual]')
    const output = metric.querySelector('[data-battery-output]')
    let ariaLabel = `Battery level ${Math.round(level)} percent`
    if (status === 'full') {
      ariaLabel = 'Battery full'
    } else if (isCharging) {
      ariaLabel = `Battery charging ${Math.round(level)} percent`
    }
    visual?.setAttribute('aria-label', ariaLabel)
    if (output) {
      if (status === 'full') {
        output.textContent = '100% • Full'
      } else if (isCharging) {
        output.textContent = `${Math.round(level)}% • Charging`
      } else {
        output.textContent = `${Math.round(level)}%`
      }
    }
    return { level, status }
  }

  const updateWifiMetric = (metric, payload = {}) => {
    const wifiState = normalizeState(
      payload.state ?? metric.dataset.state,
      ['connected', 'limited', 'offline'],
      'offline'
    )
    const strength = clampNumber(
      toInteger(payload.strength ?? metric.dataset.strength ?? '0', 0),
      0,
      3
    )
    const ssid = (payload.ssid ?? metric.dataset.ssid ?? '').toString().trim()
    metric.dataset.state = wifiState
    metric.dataset.strength = String(strength)
    metric.dataset.ssid = ssid
    metric.setAttribute('data-connection-state', wifiState)
    const indicator = metric.querySelector('[data-wifi-indicator]')
    indicator?.setAttribute('data-strength', String(strength))
    indicator?.setAttribute('data-state', wifiState)
    const visual = metric.querySelector('[data-wifi-visual]')
    const output = metric.querySelector('[data-wifi-output]')
    if (visual) {
      let ariaLabel = 'Wi-Fi status unavailable'
      if (wifiState === 'offline') {
        ariaLabel = 'Wi-Fi offline'
      } else if (wifiState === 'limited') {
        ariaLabel = ssid ? `Wi-Fi limited on ${ssid}` : 'Wi-Fi limited connection'
      } else {
        ariaLabel = ssid ? `Wi-Fi connected to ${ssid}` : 'Wi-Fi connected'
      }
      visual.setAttribute('aria-label', ariaLabel)
    }
    if (output) {
      if (wifiState === 'offline') {
        output.textContent = 'Offline'
      } else if (ssid) {
        output.textContent = ssid
      } else {
        output.textContent = 'Unknown network'
      }
    }
    return { state: wifiState, strength, ssid }
  }

  const updateCellMetric = (metric, payload = {}) => {
    const cellState = normalizeState(
      payload.state ?? metric.dataset.state,
      ['connected', 'limited', 'offline', 'no-sim'],
      'offline'
    )
    const strength = clampNumber(
      toInteger(payload.strength ?? metric.dataset.strength ?? '0', 0),
      0,
      4
    )
    const label = (payload.label ?? metric.dataset.label ?? '').toString().trim()
    metric.dataset.state = cellState
    metric.dataset.strength = String(strength)
    metric.dataset.label = label
    metric.setAttribute('data-connection-state', cellState)
    const indicator = metric.querySelector('[data-cell-indicator]')
    indicator?.setAttribute('data-strength', String(strength))
    indicator?.setAttribute('data-state', cellState)
    const visual = metric.querySelector('[data-cell-visual]')
    const output = metric.querySelector('[data-cell-output]')
    if (visual) {
      let ariaLabel = `Cellular signal ${strength} bars`
      if (cellState === 'no-sim') {
        ariaLabel = 'No SIM detected'
      } else if (cellState === 'offline') {
        ariaLabel = 'Cellular offline'
      } else if (cellState === 'limited') {
        ariaLabel = `Cellular limited (${strength} bars)`
      }
      visual.setAttribute('aria-label', ariaLabel)
    }
    if (output) {
      if (cellState === 'no-sim') {
        output.textContent = 'No SIM'
      } else if (label) {
        output.textContent = label
      } else if (cellState === 'offline') {
        output.textContent = 'No signal'
      } else if (cellState === 'limited') {
        output.textContent = `${strength} bars • Limited`
      } else {
        output.textContent = `${strength} bars`
      }
    }
    const badge = indicator?.querySelector('[data-cell-badge]')
    if (badge) {
      let symbol = ''
      let visible = false
      if (cellState === 'no-sim') {
        symbol = '×'
        visible = true
      } else if (cellState === 'offline') {
        symbol = '!'
        visible = true
      }
      badge.dataset.symbol = symbol
      badge.setAttribute('data-visible', visible ? 'true' : 'false')
    }
    return { state: cellState, strength, label }
  }

  const mergeTelemetry = (current, incoming) => {
    if (incoming == null) return current
    return { ...(current ?? {}), ...incoming }
  }

  const applyTelemetryState = (state) => {
    if (batteryMetric && state?.battery) {
      telemetryState.battery = updateBatteryMetric(batteryMetric, state.battery)
    }
    if (wifiMetric && state?.wifi) {
      telemetryState.wifi = updateWifiMetric(wifiMetric, state.wifi)
    }
    if (cellMetric && state?.cell) {
      telemetryState.cell = updateCellMetric(cellMetric, state.cell)
    }
  }

  let telemetryState = {
    battery: batteryMetric
      ? {
          level: toNumber(batteryMetric.dataset.level ?? '0', 0),
          status: normalizeState(
            batteryMetric.dataset.status,
            ['charging', 'discharging', 'full'],
            'discharging'
          ),
        }
      : null,
    wifi: wifiMetric
      ? {
          state: normalizeState(
            wifiMetric.dataset.state,
            ['connected', 'limited', 'offline'],
            'offline'
          ),
          strength: clampNumber(toInteger(wifiMetric.dataset.strength ?? '0', 0), 0, 3),
          ssid: wifiMetric.dataset.ssid ?? '',
        }
      : null,
    cell: cellMetric
      ? {
          state: normalizeState(
            cellMetric.dataset.state,
            ['connected', 'limited', 'offline', 'no-sim'],
            'offline'
          ),
          strength: clampNumber(toInteger(cellMetric.dataset.strength ?? '0', 0), 0, 4),
          label: cellMetric.dataset.label ?? '',
        }
      : null,
  }

  if (telemetryPanel) {
    applyTelemetryState(telemetryState)
  }

  const telemetryAPI = window.PulseGuardTelemetry ?? {}
  telemetryAPI.update = (patch = {}) => {
    if (!telemetryPanel) return
    const nextState = {
      battery: mergeTelemetry(telemetryState.battery, patch.battery),
      wifi: mergeTelemetry(telemetryState.wifi, patch.wifi),
      cell: mergeTelemetry(telemetryState.cell, patch.cell),
    }
    applyTelemetryState(nextState)
  }
  Object.defineProperty(telemetryAPI, 'state', {
    get: () => ({
      battery: telemetryState.battery ? { ...telemetryState.battery } : null,
      wifi: telemetryState.wifi ? { ...telemetryState.wifi } : null,
      cell: telemetryState.cell ? { ...telemetryState.cell } : null,
    }),
  })
  window.PulseGuardTelemetry = telemetryAPI

  let lastDirectoryTrigger = null
  const AUTH_STAGE_DURATION = 2000
  const AUTH_DURATION = authStages.length ? authStages.length * AUTH_STAGE_DURATION : 2500
  const EXIT_DURATION = 420

  let authStageTimers = []

  const resetAuthStages = () => {
    authStageTimers.forEach((timer) => window.clearTimeout(timer))
    authStageTimers = []
    authStages.forEach((stage) => {
      stage.classList.remove('is-active')
      stage.setAttribute('aria-hidden', 'true')
    })
  }

  const showAuthStage = (index) => {
    authStages.forEach((stage, stageIndex) => {
      const isActive = stageIndex === index
      stage.classList.toggle('is-active', isActive)
      stage.setAttribute('aria-hidden', isActive ? 'false' : 'true')
    })
  }

  const cycleAuthStages = () => {
    if (!authStages.length) return
    resetAuthStages()
    showAuthStage(0)
    for (let index = 1; index < authStages.length; index += 1) {
      const timer = window.setTimeout(() => {
        showAuthStage(index)
      }, AUTH_STAGE_DURATION * index)
      authStageTimers.push(timer)
    }
  }

  resetAuthStages()

  const revealCards = () => {
    cards.forEach((card) => {
      card.setAttribute('data-loading', 'false')
    })
  }

  const hidePreloader = () => {
    if (preloader) {
      preloader.setAttribute('aria-hidden', 'true')
    }
  }

  const openModal = () => {
    if (!modal) return
    modal.setAttribute('aria-hidden', 'false')
    const acknowledge = modal.querySelector('.alert-modal__acknowledge')
    window.setTimeout(() => {
      acknowledge?.focus()
    }, 80)
  }

  const closeModal = () => {
    if (!modal) return
    modal.setAttribute('aria-hidden', 'true')
  }

  modalCloseTriggers.forEach((trigger) => {
    trigger.addEventListener('click', closeModal)
  })

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal()
      }
    })
  }

  const filterDirectory = (query) => {
    if (!directoryEntries.length) return
    const normalized = query.trim().toLowerCase()
    let visibleCount = 0

    directoryEntries.forEach((entry) => {
      const haystack = (entry.getAttribute('data-filter-text') ?? '').toLowerCase()
      const textContent = entry.textContent?.toLowerCase() ?? ''
      const isMatch =
        !normalized || haystack.includes(normalized) || textContent.includes(normalized)
      if (isMatch) {
        entry.removeAttribute('hidden')
        visibleCount += 1
      } else {
        entry.setAttribute('hidden', 'true')
      }
    })

    directorySections.forEach((section) => {
      const entries = Array.from(section.querySelectorAll('[data-directory-entry]'))
      const hasVisible = entries.some((entry) => !entry.hasAttribute('hidden'))
      if (hasVisible) {
        section.removeAttribute('hidden')
      } else {
        section.setAttribute('hidden', 'true')
      }
    })

    if (directoryEmpty) {
      if (visibleCount === 0) {
        directoryEmpty.removeAttribute('hidden')
      } else {
        directoryEmpty.setAttribute('hidden', 'true')
      }
    }
  }

  const openDirectoryModal = () => {
    if (!directoryModal) return
    directoryModal.setAttribute('aria-hidden', 'false')
    body.classList.add('has-directory-open')
    if (directorySearch) {
      directorySearch.value = ''
    }
    filterDirectory('')
    window.setTimeout(() => {
      directorySearch?.focus()
    }, 100)
  }

  const closeDirectoryModal = () => {
    if (!directoryModal) return
    directoryModal.setAttribute('aria-hidden', 'true')
    body.classList.remove('has-directory-open')
    if (lastDirectoryTrigger instanceof HTMLElement) {
      lastDirectoryTrigger.focus({ preventScroll: true })
    }
    lastDirectoryTrigger = null
  }

  directoryOpeners.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      lastDirectoryTrigger = trigger
      openDirectoryModal()
    })
  })

  directoryClosers.forEach((closer) => {
    closer.addEventListener('click', () => {
      closeDirectoryModal()
    })
  })

  if (directoryModal) {
    directoryModal.addEventListener('click', (event) => {
      if (event.target === directoryModal) {
        closeDirectoryModal()
      }
    })
  }

  if (directorySearch) {
    directorySearch.addEventListener('input', (event) => {
      const value = event.target?.value ?? ''
      filterDirectory(value)
    })
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    let handled = false
    if (modal?.getAttribute('aria-hidden') === 'false') {
      closeModal()
      handled = true
    }
    if (directoryModal?.getAttribute('aria-hidden') === 'false') {
      closeDirectoryModal()
      handled = true
    }
    if (handled) {
      event.preventDefault()
    }
  })

  const unlockPortal = () => {
    if (!gate || !main) return

    resetAuthStages()
    sessionStorage.setItem('emergencyAccess', 'granted')
    gate.classList.add('is-hidden')
    gate.classList.remove('is-authenticating', 'is-exiting')
    gate.setAttribute('aria-hidden', 'true')
    gateContent?.setAttribute('aria-hidden', 'false')
    gateAuth?.setAttribute('aria-hidden', 'true')
    form?.removeAttribute('aria-busy')
    inputs?.forEach((input) => {
      input.blur()
      input.removeAttribute('disabled')
    })
    main.setAttribute('aria-hidden', 'false')
    main.setAttribute('tabindex', '-1')
    main.focus({ preventScroll: true })
    window.setTimeout(() => {
      main.removeAttribute('tabindex')
    }, 200)
    body.classList.remove('is-locked')
    revealCards()
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 60)
    window.setTimeout(() => {
      openModal()
    }, 260)
  }

  const startAuthentication = () => {
    if (!gate || !main) return
    if (gate.classList.contains('is-authenticating')) return

    gate.classList.remove('has-error')
    gate.classList.add('is-authenticating')
    form?.setAttribute('aria-busy', 'true')
    gateContent?.setAttribute('aria-hidden', 'true')
    gateAuth?.setAttribute('aria-hidden', 'false')
    cycleAuthStages()
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    inputs?.forEach((input) => {
      input.setAttribute('disabled', 'true')
    })

    window.setTimeout(() => {
      gate.classList.add('is-exiting')
      window.setTimeout(() => {
        unlockPortal()
      }, EXIT_DURATION)
    }, AUTH_DURATION)
  }

  const stored = sessionStorage.getItem('emergencyAccess')

  if (stored === 'granted') {
    body.classList.remove('is-locked')
    if (gate) {
      gate.classList.add('is-hidden')
      gate.classList.remove('is-authenticating', 'is-exiting')
      gate.setAttribute('aria-hidden', 'true')
    }
    if (main) {
      main.setAttribute('aria-hidden', 'false')
    }
    resetAuthStages()
    gateAuth?.setAttribute('aria-hidden', 'true')
    gateContent?.setAttribute('aria-hidden', 'false')
    form?.removeAttribute('aria-busy')
    revealCards()
    window.setTimeout(() => {
      closeModal()
    }, 0)
  } else {
    if (gate) {
      gate.classList.remove('is-hidden')
      gate.setAttribute('aria-hidden', 'false')
      body.classList.add('is-locked')
    }
    resetAuthStages()
    gateAuth?.setAttribute('aria-hidden', 'true')
    gateContent?.setAttribute('aria-hidden', 'false')
    if (inputs && inputs.length > 0) {
      window.setTimeout(() => {
        inputs[0].focus()
      }, 150)
    }
  }

  const collectCode = () => {
    if (!inputs) return ''
    return Array.from(inputs)
      .map((input) => input.value.trim())
      .join('')
  }

  inputs?.forEach((input, index) => {
    input.addEventListener('input', (event) => {
      const target = event.target
      if (!(target instanceof HTMLInputElement)) {
        return
      }
      const value = target.value.replace(/[^0-9]/g, '')
      target.value = value.slice(0, 1)
      if (value && inputs[index + 1]) {
        inputs[index + 1].focus()
      }
      if (gate?.classList.contains('has-error')) {
        gate.classList.remove('has-error')
        if (error) error.textContent = ''
      }
    })

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !input.value && inputs[index - 1]) {
        inputs[index - 1].focus()
      }
    })
  })

  form?.addEventListener('submit', (event) => {
    event.preventDefault()
    const entered = collectCode()
    if (entered === CODE) {
      if (error) error.textContent = ''
      gate?.classList.remove('has-error')
      startAuthentication()
    } else {
      gate?.classList.add('has-error')
      if (error) error.textContent = 'Invalid code. Access denied.'
      inputs?.forEach((input) => {
        input.value = ''
      })
      inputs?.[0]?.focus()
    }
  })

  form?.addEventListener('paste', (event) => {
    const clipboard = event.clipboardData?.getData('text') ?? ''
    if (!clipboard) return
    const digits = clipboard.replace(/\D/g, '').slice(0, inputs?.length ?? 0)
    if (digits.length) {
      event.preventDefault()
      inputs?.forEach((input, index) => {
        input.value = digits[index] ?? ''
      })
      const entered = collectCode()
      if (entered.length === CODE.length) {
        form.dispatchEvent(new Event('submit', { cancelable: true }))
      }
    }
  })

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy')
      const tooltip = button.querySelector('.copy-button__tooltip')
      if (!value) return
      try {
        await navigator.clipboard.writeText(value)
        button.setAttribute('data-state', 'copied')
        if (tooltip) {
          tooltip.textContent = 'Copied to clipboard'
        }
        window.setTimeout(() => {
          button.removeAttribute('data-state')
          if (tooltip) tooltip.textContent = ''
        }, 1600)
      } catch (errorCopy) {
        console.error('Copy failed', errorCopy)
        if (tooltip) {
          tooltip.textContent = 'Unable to copy'
        }
        window.setTimeout(() => {
          if (tooltip) tooltip.textContent = ''
        }, 1600)
      }
    })
  })

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true'
    menuToggle.setAttribute('aria-expanded', (!expanded).toString())
    nav?.classList.toggle('is-open', !expanded)
  })

  nav?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href')
      if (!hash) return
      event.preventDefault()
      smoothScrollTo(hash)
      menuToggle?.setAttribute('aria-expanded', 'false')
      nav?.classList.remove('is-open')
    })
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      event.preventDefault()
      smoothScrollTo(hash)
    })
  })

  backToTop?.addEventListener('click', () => {
    smoothScrollTo('#top')
  })

  const toggleBackToTop = () => {
    if (!backToTop) return
    if (window.scrollY > 320) {
      backToTop.classList.add('is-visible')
    } else {
      backToTop.classList.remove('is-visible')
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true })

  window.addEventListener('load', () => {
    hidePreloader()
    if (stored === 'granted') {
      revealCards()
    }
  })
})

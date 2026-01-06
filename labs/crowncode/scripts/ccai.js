const ACCESS_TOKEN = 'jagvov-8wyngy-sobpoK'
const NUMERIC_PASSCODE = '640161869'
const ACCESS_STORAGE_KEY = 'ccai-brief-clearance'
const prefersReducedMotion =
  typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : {
        matches: false,
        addEventListener() {},
        removeEventListener() {},
      }

const pageLoader = document.getElementById('ccai-page-loader')
const briefLoader = document.getElementById('ccai-brief-loader')
const accessModal = document.getElementById('ccai-access-modal')
const gateModal = document.getElementById('ccai-gate')
const warningModal = document.getElementById('ccai-warning-modal')
const betaModal = document.getElementById('ccai-beta-modal')
const securityToast = document.getElementById('ccai-security-toast')
const securityToastText = document.getElementById('ccai-security-text')
const accessForm = document.getElementById('ccai-access-form')
const tokenInput = document.getElementById('ccai-token-input')
const tokenError = document.getElementById('ccai-token-error')
const gateDisplay = document.getElementById('ccai-gate-display')
const gateStatus = document.getElementById('ccai-gate-status')
const gateButtons = gateModal?.querySelectorAll('[data-keypad]') ?? []
const gateSubmit = gateModal?.querySelector('[data-gate-submit]')
const briefShell = document.getElementById('ccai-brief-shell')
const briefPlaceholder = document.getElementById('ccai-brief-placeholder')
const clearanceIdField = document.getElementById('ccai-clearance-id')
const warningProceed = document.querySelector('[data-brief-proceed]')
const accessTriggers = document.querySelectorAll('[data-access-trigger]')
const gateTriggers = document.querySelectorAll('[data-gate-trigger]')
const modalCloseButtons = document.querySelectorAll('[data-modal-close]')
const inquiryForm = document.getElementById('ccai-inquiry-form')
const inquirySuccess = document.getElementById('ccai-inquiry-success')
const betaForm = document.getElementById('ccai-beta-form')
const betaSuccess = document.getElementById('ccai-beta-success')
const betaTriggers = document.querySelectorAll('[data-beta-trigger]')
const betaRoleField = document.getElementById('beta-focus')
const betaSuccessText = document.getElementById('ccai-beta-success-text')
const animatedSections = document.querySelectorAll('[data-ccai-animate]')
const preloadedImages = document.querySelectorAll(
  '.ccai-feature-banner__image img, .ccai-app-suite__grid img'
)
const projectionTriggers = document.querySelectorAll('[data-projection-trigger]')
const projectionFields = document.querySelectorAll('[data-projection-value]')
const operationsFields = document.querySelectorAll('[data-operations-value]')
const opsIndicator = document.getElementById('ccai-ops-indicator')

const PROJECTION_SCENARIOS = {
  baseline: {
    note: 'Baseline lab build with steady ARR growth, manageable burn, and focus on developer traction.',
    metrics: {
      arr: 1800000,
      margin: 0.62,
      burn: 95000,
      runway: 14,
      velocity: 18,
      reliability: 0.995,
    },
    trends: {
      arr: 'up',
      margin: 'up',
      burn: 'down',
      runway: 'up',
      velocity: 'up',
      reliability: 'up',
    },
    operations: {
      frontend:
        'Design system release train locked to 2-week cadence with hero, beta, and security modals unified.',
      backend:
        'API gateway hardened with signed builds, audit logging, and per-environment secrets rotation.',
      infrastructure:
        'Single-region cloud with automated backups and load balancer health checks every 60 seconds.',
      health: 'Stable / green',
    },
  },
  accelerated: {
    note: 'Enterprise lift with larger seat counts, stronger unit economics, and aggressive hiring for full-stack squads.',
    metrics: {
      arr: 3700000,
      margin: 0.69,
      burn: 145000,
      runway: 18,
      velocity: 26,
      reliability: 0.997,
    },
    trends: {
      arr: 'up',
      margin: 'up',
      burn: 'up',
      runway: 'up',
      velocity: 'up',
      reliability: 'up',
    },
    operations: {
      frontend:
        'Multi-squad delivery with parallel feature flags and lab minisite refreshes every sprint.',
      backend:
        'Zero-downtime migrations, contract testing, and signed artifact provenance via SBOM exports.',
      infrastructure:
        'Active-active regions with WAF rules, autoscaling, and quarterly chaos drills.',
      health: 'Scaling / blue',
    },
  },
  field: {
    note: 'Government and NGO field deployments prioritizing resilience, compliance, and on-prem controls.',
    metrics: {
      arr: 5200000,
      margin: 0.58,
      burn: 160000,
      runway: 21,
      velocity: 24,
      reliability: 0.999,
    },
    trends: {
      arr: 'up',
      margin: 'steady',
      burn: 'up',
      runway: 'up',
      velocity: 'steady',
      reliability: 'up',
    },
    operations: {
      frontend:
        'USWDS patterns hardened for FIPS environments with offline-ready intake workflows.',
      backend:
        'Isolated enclave deployments, hardware-backed keys, and mandatory audit event streaming.',
      infrastructure: 'Multi-AZ plus on-prem replication with 24/7 observability runbooks.',
      health: 'Mission-grade / gold',
    },
  },
}

const PROJECTION_META = {
  arr: (value) => `${formatCurrency(value)} ARR`,
  margin: (value) => `${formatPercent(value)} gross margin`,
  burn: (value) => `${formatCurrency(value)}/mo burn`,
  runway: (value) => `${value} months runway`,
  velocity: (value) => `${value} story points / sprint`,
  reliability: (value) => `${formatPercent(value)} reliability`,
}

const state = {
  gateInput: '',
  gateUnlocked: false,
  toastTimer: null,
  storedClearanceId: null,
  activeProjection: 'baseline',
}

function formatCurrency(value) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

function formatPercent(value) {
  return `${Math.round(value * 100)}%`
}

function refreshScrollLock() {
  const hasVisibleModal = document.querySelector('.usa-modal.is-visible')
  document.documentElement.classList.toggle('ccai-modal-open', Boolean(hasVisibleModal))
}

function openModal(modal) {
  if (!modal) return
  modal.hidden = false
  modal.classList.add('is-visible')
  refreshScrollLock()
  const focusTarget = modal.querySelector(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
  )
  if (focusTarget) {
    setTimeout(() => focusTarget.focus({ preventScroll: true }), 50)
  }
}

function closeModal(modal) {
  if (!modal) return
  modal.classList.remove('is-visible')
  modal.hidden = true
  if (modal === gateModal) {
    resetGateState()
  }
  refreshScrollLock()
}

function updateGateDisplay() {
  if (!gateDisplay) return
  gateDisplay.textContent = state.gateInput.length
    ? '•'.repeat(state.gateInput.length)
    : 'Awaiting input'
}

function resetGateState() {
  state.gateInput = ''
  if (gateStatus) {
    gateStatus.textContent = ''
  }
  if (gateModal) {
    gateModal.dataset.state = ''
  }
  updateGateDisplay()
}

function showSecurityToast(message) {
  if (!securityToast || !securityToastText) return
  securityToastText.textContent = message
  securityToast.dataset.visible = 'true'
  clearTimeout(state.toastTimer)
  const toastDuration = prefersReducedMotion.matches ? 2000 : 3200
  state.toastTimer = setTimeout(() => {
    securityToast.dataset.visible = 'false'
  }, toastDuration)
}

function handleGateInput(value) {
  if (!gateModal || state.gateUnlocked) return

  gateModal.dataset.state = ''

  if (value === 'clear') {
    resetGateState()
    return
  }

  if (value === 'submit') {
    verifyGateCode()
    return
  }

  if (state.gateInput.length < NUMERIC_PASSCODE.length && /\d/.test(value)) {
    state.gateInput += value
    updateGateDisplay()
  }
}

function verifyGateCode() {
  if (!gateModal) return
  if (state.gateInput === NUMERIC_PASSCODE) {
    state.gateUnlocked = true
    gateModal.dataset.state = 'success'
    if (gateStatus) {
      gateStatus.textContent = 'Access granted'
    }
    gateDisplay.textContent = 'Access granted'
    setTimeout(() => {
      closeModal(gateModal)
    }, 900)
  } else {
    gateModal.dataset.state = 'error'
    if (gateStatus) {
      gateStatus.textContent = 'Access denied'
    }
    showSecurityToast('Invalid clearance code attempt')
    state.gateInput = ''
    updateGateDisplay()
  }
}

function parseStoredAccess() {
  try {
    const stored = sessionStorage.getItem(ACCESS_STORAGE_KEY)
    if (!stored) return
    const parsed = JSON.parse(stored)
    if (parsed?.verified) {
      state.storedClearanceId = parsed.clearanceId
      revealBrief(parsed.clearanceId, false)
    }
  } catch (error) {
    console.error('Unable to parse stored clearance', error)
  }
}

function persistClearance(clearanceId) {
  const payload = {
    verified: true,
    clearanceId,
    verifiedAt: new Date().toISOString(),
  }
  sessionStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(payload))
  state.storedClearanceId = clearanceId
}

function generateClearanceId() {
  const stamp = new Date()
  return `CCAI-${stamp.getUTCFullYear()}${String(stamp.getUTCMonth() + 1).padStart(2, '0')}${String(
    stamp.getUTCDate()
  ).padStart(2, '0')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

function revealBrief(clearanceId = generateClearanceId(), persist = true) {
  if (briefShell) {
    briefShell.hidden = false
  }
  if (briefPlaceholder) {
    briefPlaceholder.hidden = true
  }
  if (clearanceIdField) {
    clearanceIdField.textContent = clearanceId
  }
  if (persist) {
    persistClearance(clearanceId)
  }
}

function openAccessFlow() {
  if (!state.gateUnlocked) {
    openModal(gateModal)
    if (gateStatus) {
      gateStatus.textContent = 'Complete numeric clearance first'
    }
    return
  }

  if (state.storedClearanceId) {
    openModal(warningModal)
    return
  }

  openModal(accessModal)
}

function showBriefLoaderAndWarning() {
  if (!briefLoader) return
  briefLoader.hidden = false
  const loaderDelay = prefersReducedMotion.matches ? 0 : 1200
  setTimeout(() => {
    briefLoader.hidden = true
    openModal(warningModal)
  }, loaderDelay)
}

function initializeInquiryForm() {
  if (!inquiryForm || !inquirySuccess) return
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault()
    inquirySuccess.hidden = false
    inquiryForm.reset()
    showSecurityToast('Secure request acknowledged')
  })
}

function initializeBetaForm() {
  if (!betaForm || !betaSuccess || !betaSuccessText) return
  betaForm.addEventListener('submit', (event) => {
    event.preventDefault()
    betaSuccess.hidden = false
    const focus = betaRoleField?.value ?? 'beta'
    const focusCopyMap = {
      developer: 'developer build partner track',
      research: 'research and analytics track',
      beta: 'beta testing track',
    }
    const focusCopy = focusCopyMap[focus] ?? 'beta testing track'
    betaSuccessText.textContent = `Request received for the ${focusCopy}. Beta briefing packet will follow shortly.`
    betaForm.reset()
    showSecurityToast('Beta intake submitted')
    if (betaRoleField) {
      betaRoleField.value = focus
    }
  })
}

function renderProjection(scenarioKey = state.activeProjection) {
  state.activeProjection = scenarioKey in PROJECTION_SCENARIOS ? scenarioKey : 'baseline'
  const scenario = PROJECTION_SCENARIOS[state.activeProjection]

  projectionTriggers.forEach((trigger) => {
    trigger.dataset.state =
      trigger.dataset.projectionTrigger === state.activeProjection ? 'active' : ''
  })

  projectionFields.forEach((field) => {
    const metricKey = field.dataset.projectionValue
    const rawValue = scenario.metrics?.[metricKey]
    const formatter = PROJECTION_META[metricKey]
    if (typeof formatter === 'function') {
      field.textContent = formatter(rawValue)
    }
    const trend = scenario.trends?.[metricKey]
    const trendTarget = field.closest('[data-trend]')
    if (trendTarget) {
      trendTarget.dataset.trend = trend ?? ''
    }
  })

  operationsFields.forEach((field) => {
    const key = field.dataset.operationsValue
    const value = scenario.operations?.[key]
    if (value !== undefined) {
      field.textContent = value
    }
  })

  if (opsIndicator) {
    const healthCopy = scenario.operations?.health || ''
    opsIndicator.dataset.state = healthCopy.toLowerCase().includes('mission')
      ? 'elevated'
      : 'steady'
  }

  const note = document.getElementById('ccai-projection-note')
  if (note) {
    note.textContent = scenario.note
  }
}

function initializeFinancialControls() {
  if (!projectionTriggers.length || !projectionFields.length) return

  projectionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const nextScenario = trigger.dataset.projectionTrigger
      renderProjection(nextScenario)
      showSecurityToast('Projection view updated')
    })
  })

  renderProjection(state.activeProjection)
}

function initializeEventListeners() {
  accessTriggers.forEach((trigger) => {
    trigger.addEventListener('click', openAccessFlow)
  })

  gateTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      state.gateUnlocked = false
      resetGateState()
      openModal(gateModal)
    })
  })

  betaTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (betaSuccess) {
        betaSuccess.hidden = true
      }
      if (betaRoleField) {
        const focus = trigger.dataset.betaRole || 'beta'
        betaRoleField.value = focus
      }
      openModal(betaModal)
    })
  })

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.usa-modal')
      closeModal(modal)
    })
  })
  ;[gateModal, accessModal, warningModal, betaModal].forEach((modal) => {
    modal?.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal(modal)
      }
    })
  })

  gateButtons.forEach((button) => {
    button.addEventListener('click', () => handleGateInput(button.dataset.keypad))
  })

  gateSubmit?.addEventListener('click', verifyGateCode)

  if (accessForm) {
    accessForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const suppliedToken = tokenInput?.value.trim()
      if (!state.gateUnlocked) {
        tokenError.textContent = 'Complete numeric clearance before token entry.'
        showSecurityToast('Numeric clearance required')
        return
      }
      if (suppliedToken === ACCESS_TOKEN) {
        tokenError.textContent = ''
        closeModal(accessModal)
        accessForm.reset()
        showBriefLoaderAndWarning()
      } else {
        tokenError.textContent = 'Token invalid. Incident flagged.'
        showSecurityToast('Invalid access token attempt')
      }
    })
  }

  warningProceed?.addEventListener('click', () => {
    closeModal(warningModal)
    const clearanceId = generateClearanceId()
    revealBrief(clearanceId, true)
    showSecurityToast('Brief unlocked under clearance ID ' + clearanceId)
    setTimeout(
      () => {
        const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth'
        briefShell?.scrollIntoView({ behavior, block: 'start' })
      },
      prefersReducedMotion.matches ? 0 : 200
    )
  })

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    showSecurityToast('Context capture blocked')
  })

  document.addEventListener('copy', (event) => {
    event.preventDefault()
    showSecurityToast('Copy action prevented')
  })

  document.addEventListener('keydown', (event) => {
    const key = event.key?.toLowerCase()
    const blockedCombos =
      ((event.ctrlKey || event.metaKey) && ['s', 'p', 'u', 'c', 'x'].includes(key)) ||
      (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      key === 'f12' ||
      key === 'printscreen'

    if (blockedCombos) {
      event.preventDefault()
      showSecurityToast('Capture attempt intercepted')
    }
  })

  document.addEventListener('keyup', (event) => {
    if (event.key?.toLowerCase() === 'printscreen') {
      showSecurityToast('Screenshot attempt logged')
    }
  })
}

function initializeLoaders() {
  window.addEventListener('load', () => {
    const entryDelay = prefersReducedMotion.matches ? 0 : 700
    setTimeout(() => {
      pageLoader?.setAttribute('hidden', 'true')
      if (!state.gateUnlocked) {
        openModal(gateModal)
        updateGateDisplay()
      }
    }, entryDelay)
  })
}

function initializeAnimations() {
  if (!animatedSections.length) return

  if (prefersReducedMotion.matches || typeof IntersectionObserver !== 'function') {
    animatedSections.forEach((section) => section.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        obs.unobserve(entry.target)
      })
    },
    { threshold: 0.2 }
  )

  animatedSections.forEach((section) => observer.observe(section))
}

function initializePreloadedImages() {
  if (!preloadedImages.length) return

  preloadedImages.forEach((image) => {
    if (image.complete) {
      image.classList.add('is-loaded')
      return
    }

    image.addEventListener(
      'load',
      () => {
        image.classList.add('is-loaded')
      },
      { once: true }
    )
    image.addEventListener(
      'error',
      () => {
        image.classList.add('is-loaded')
      },
      { once: true }
    )
  })
}

parseStoredAccess()
initializeInquiryForm()
initializeBetaForm()
initializeFinancialControls()
initializeEventListeners()
initializeLoaders()
initializeAnimations()
initializePreloadedImages()
updateGateDisplay()

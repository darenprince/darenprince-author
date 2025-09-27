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

const state = {
  gateInput: '',
  gateUnlocked: false,
  toastTimer: null,
  storedClearanceId: null,
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

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.usa-modal')
      closeModal(modal)
    })
  })
  ;[gateModal, accessModal, warningModal].forEach((modal) => {
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

parseStoredAccess()
initializeInquiryForm()
initializeEventListeners()
initializeLoaders()
updateGateDisplay()

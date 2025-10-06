import {
  initPasswordStrength,
  passwordsValid,
  resetPasswordStrength,
  evaluate as evaluatePasswordStrength,
} from './password-strength.js'
import { AUTH_DISABLED_MESSAGE, isAuthEnabled } from './auth-service.js'
import { logAuthWarning } from './auth-logger.js'

let mode = 'signin'
const form = document.getElementById('auth-form')
const submitBtn = document.querySelector('.js-submit')
const toggleLink = document.querySelector('.js-toggle-auth')
const errorEl = document.querySelector('.auth-error')
const resetLink = document.querySelector('.js-reset-password')
const signupFields = document.querySelectorAll('.signup-only')
const signinFields = document.querySelectorAll('.signin-only')
const titleEl = document.querySelector('.login-container h1')
const signinPasswordInput = document.getElementById('signin-password')
const signupPasswordInput = document.getElementById('password')
const signupConfirmInput = document.getElementById('confirm-password')

const authEnabled = isAuthEnabled()
const disabledMessage = AUTH_DISABLED_MESSAGE

function disableSubmit() {
  if (!submitBtn) return
  submitBtn.disabled = true
  submitBtn.dataset.authDisabled = 'true'
}

function enableSubmit() {
  if (!submitBtn) return
  delete submitBtn.dataset.authDisabled
  if (mode === 'signin') {
    submitBtn.disabled = false
  } else if (mode === 'signup') {
    evaluatePasswordStrength()
  }
}

function setRequired(field, isRequired) {
  if (!field) return
  field.required = Boolean(isRequired)
  if (isRequired) {
    field.setAttribute('aria-required', 'true')
  } else {
    field.removeAttribute('aria-required')
  }
}

function updateSubmitLabel() {
  if (!submitBtn) return
  const isSignin = mode === 'signin'
  const label = isSignin ? 'Sign In' : 'Create Account'
  const icon = isSignin ? 'ti ti-key' : 'ti ti-user-plus'
  submitBtn.innerHTML = `<i class="${icon}"></i> ${label}`
}

function applyMode(nextMode) {
  mode = nextMode
  const isSignin = mode === 'signin'
  signupFields.forEach((el) => {
    el.hidden = isSignin
    el.setAttribute('aria-hidden', String(isSignin))
  })
  signinFields.forEach((el) => {
    el.hidden = !isSignin
    el.setAttribute('aria-hidden', String(!isSignin))
  })
  setRequired(signinPasswordInput, isSignin)
  setRequired(signupPasswordInput, !isSignin)
  setRequired(signupConfirmInput, !isSignin)
  if (submitBtn) {
    if (!authEnabled) {
      disableSubmit()
    } else if (isSignin) {
      submitBtn.disabled = false
    }
  }
  if (!isSignin) {
    if (signinPasswordInput) {
      signinPasswordInput.value = ''
    }
    resetPasswordStrength(submitBtn)
    signupPasswordInput?.focus({ preventScroll: true })
  } else {
    if (submitBtn) submitBtn.disabled = false
    if (signupPasswordInput) signupPasswordInput.value = ''
    if (signupConfirmInput) signupConfirmInput.value = ''
  }
  updateSubmitLabel()
  if (toggleLink) {
    toggleLink.textContent = isSignin
      ? 'Need an account? Sign Up'
      : 'Already have an account? Sign In'
  }
  if (titleEl) titleEl.textContent = isSignin ? 'Member Login' : 'Create Account'
  if (errorEl) errorEl.textContent = authEnabled ? '' : disabledMessage
}

function toggleMode() {
  applyMode(mode === 'signin' ? 'signup' : 'signin')
}

document.addEventListener('DOMContentLoaded', () => {
  applyMode(mode)
  initPasswordStrength(submitBtn)

  if (!authEnabled) {
    disableSubmit()
    if (errorEl) errorEl.textContent = disabledMessage
    logAuthWarning('auth.init', disabledMessage)
    return
  }

  enableSubmit()
  logAuthWarning('auth.init', 'Auth provider integration pending')
})

if (toggleLink)
  toggleLink.addEventListener('click', (e) => {
    e.preventDefault()
    toggleMode()
  })

if (resetLink)
  resetLink.addEventListener('click', (e) => {
    e.preventDefault()
    if (errorEl) errorEl.textContent = disabledMessage
    logAuthWarning('auth.reset', disabledMessage)
  })

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!authEnabled) {
      if (errorEl) errorEl.textContent = disabledMessage
      logAuthWarning('auth.submit', disabledMessage)
      return
    }

    if (mode === 'signup' && !passwordsValid()) {
      if (errorEl) errorEl.textContent = 'Please meet password requirements.'
      return
    }

    if (errorEl) {
      errorEl.textContent = 'Authentication service integration pending.'
    }
    logAuthWarning('auth.submit', 'Auth provider integration pending')
  })
}

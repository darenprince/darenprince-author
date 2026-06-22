import GameOnUI from './ui.js'

const DRAFT_KEY = 'contact:draft:v3'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const setStatus = (node, message, tone = 'info') => {
  if (!node) return
  node.textContent = message
  node.dataset.tone = tone
}

const saveDraft = (data) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
  } catch (error) {
    console.warn('Draft save failed', error)
  }
}

const loadDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.warn('Draft load failed', error)
    return null
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form')
  if (!form) return

  const statusEl = form.querySelector('.form-status')
  const charCounter = form.querySelector('[data-char-count]')

  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    topic: form.querySelector('#topic'),
    message: form.querySelector('#message'),
    source: form.querySelector('#source'),
    subscribe: form.querySelector('#subscribe'),
  }

  const clearErrors = () => {
    form.querySelectorAll('.is-invalid').forEach((input) => input.classList.remove('is-invalid'))
    form
      .querySelectorAll('.form-group--error')
      .forEach((group) => group.classList.remove('form-group--error'))
    Object.values(fields).forEach((field) => field?.removeAttribute('aria-invalid'))
  }

  const markInvalid = (key) => {
    const field = fields[key]
    if (!field) return
    field.classList.add('is-invalid')
    field.setAttribute('aria-invalid', 'true')
    field.closest('.form-group')?.classList.add('form-group--error')
  }

  const collectPayload = (includeMeta = true) => {
    const payload = {}
    Object.entries(fields).forEach(([key, el]) => {
      if (!el) return
      payload[key] = el.type === 'checkbox' ? el.checked : (el.value || '').trim()
    })

    if (includeMeta) {
      payload.timestamp = new Date().toISOString()
      payload.page = window.location.href
    }

    return payload
  }

  const updateCharCount = () => {
    if (!charCounter || !fields.message) return
    const current = fields.message.value.trim().length
    const max = Number(fields.message.getAttribute('maxlength')) || 1200
    charCounter.textContent = `${current}/${max}`
    charCounter.dataset.state = current >= 180 ? 'ready' : current >= 60 ? 'ok' : 'light'
  }

  const hydrateDraft = () => {
    const draft = loadDraft()
    if (!draft) return

    Object.entries(draft).forEach(([key, value]) => {
      const field = fields[key]
      if (!field) return
      if (field.type === 'checkbox') {
        field.checked = Boolean(value)
        return
      }
      field.value = value
    })

    setStatus(statusEl, 'Draft restored.', 'info')
  }

  const validate = (payload) => {
    clearErrors()

    const errors = []
    if (!payload.name || payload.name.length < 2) errors.push('name')
    if (!payload.email || !EMAIL_REGEX.test(payload.email)) errors.push('email')
    if (!payload.message || payload.message.length < 30) errors.push('message')

    errors.forEach(markInvalid)

    if (errors.includes('message')) {
      setStatus(statusEl, 'Please provide a bit more detail in your message.', 'muted')
    }

    return errors
  }

  const handleLiveUpdate = () => {
    const payload = collectPayload(false)
    saveDraft(payload)
    updateCharCount()
  }

  const resolveEndpoint = () => {
    const datasetEndpoint = form.dataset.endpoint?.trim()
    if (datasetEndpoint) return datasetEndpoint
    const action = form.getAttribute('action')?.trim()
    return action || ''
  }

  const openMailClient = (payload) => {
    const mailTo = resolveEndpoint() || 'mailto:press@darenprince.com'
    const subject = `Contact request: ${payload.topic || 'General inquiry'}`
    const body = [
      `Name: ${payload.name || 'Not provided'}`,
      `Email: ${payload.email || 'Not provided'}`,
      '',
      payload.message || '',
    ].join('\n')

    const params = new URLSearchParams({ subject, body })
    window.location.href = `${mailTo}?${params.toString()}`
  }

  hydrateDraft()
  updateCharCount()

  form.addEventListener('input', handleLiveUpdate)
  form.addEventListener('change', handleLiveUpdate)

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const payload = collectPayload()
    const errors = validate(payload)
    if (errors.length) {
      setStatus(statusEl, 'Please complete the highlighted fields.', 'error')
      GameOnUI.showToast('Please complete the highlighted fields.', 'error')
      return
    }

    const submitButton = form.querySelector('button[type="submit"]')
    const originalLabel = submitButton?.textContent || 'Send message'

    if (submitButton) {
      submitButton.disabled = true
      submitButton.textContent = 'Sending...'
    }

    setStatus(statusEl, 'Sending your message...', 'muted')

    const endpoint = resolveEndpoint()

    try {
      if (!endpoint || endpoint.startsWith('mailto:')) {
        openMailClient(payload)
        setStatus(statusEl, 'Opening your mail client...', 'info')
        GameOnUI.showToast('Opening your mail client...', 'info')
        localStorage.removeItem(DRAFT_KEY)
        form.reset()
        updateCharCount()
        return
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.message || 'Request failed')
      }

      localStorage.removeItem(DRAFT_KEY)
      form.reset()
      updateCharCount()
      setStatus(statusEl, data?.message || 'Message sent!', 'success')
      GameOnUI.showToast('Message sent!', 'success')
    } catch (error) {
      console.error('Contact request failed', error)
      setStatus(statusEl, 'Could not send right now. Please try again later.', 'error')
      GameOnUI.showToast('Message failed to send', 'error')
    } finally {
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = originalLabel
      }
    }
  })
})

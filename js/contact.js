import GameOnUI from './ui.js'

const DRAFT_KEY = 'contact:draft:v2'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const readinessCopy = [
  { threshold: 85, label: 'Launch-ready', tone: 'success' },
  { threshold: 65, label: 'Actionable', tone: 'info' },
  { threshold: 40, label: 'Needs detail', tone: 'muted' },
  { threshold: 0, label: 'Not ready', tone: 'muted' },
]

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max)

const resolveReadiness = (score) => readinessCopy.find(({ threshold }) => score >= threshold)

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
  const qualityBar = document.querySelector('[data-quality-bar]')
  const qualityLabel = document.querySelector('[data-quality-label]')
  const routingLabel = document.querySelector('[data-routing-label]')
  const routeTopic = document.querySelector('[data-route-topic]')
  const routeUrgency = document.querySelector('[data-route-urgency]')
  const routeTimeline = document.querySelector('[data-route-timeline]')
  const checklistEls = {
    identity: document.querySelector('[data-check="identity"]'),
    contact: document.querySelector('[data-check="contact"]'),
    context: document.querySelector('[data-check="context"]'),
    timeline: document.querySelector('[data-check="timeline"]'),
  }

  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    topic: form.querySelector('#topic'),
    channel: form.querySelector('#channel'),
    message: form.querySelector('#message'),
    source: form.querySelector('#source'),
    objective: form.querySelector('#objective'),
    timeline: form.querySelector('#timeline'),
    subscribe: form.querySelector('#subscribe'),
  }

  const requiredKeys = ['name', 'email', 'message']

  const resolveUrgency = () => {
    const checked = form.querySelector('input[name="urgency"]:checked')
    return checked ? checked.value : 'standard'
  }

  const clearErrors = () => {
    form.querySelectorAll('.is-invalid').forEach((input) => input.classList.remove('is-invalid'))
    form
      .querySelectorAll('.form-group--error')
      .forEach((group) => group.classList.remove('form-group--error'))
    Object.values(fields).forEach((field) => field?.removeAttribute('aria-invalid'))
  }

  const markInvalid = (key) => {
    const el = fields[key]
    if (!el) return
    el.classList.add('is-invalid')
    el.setAttribute('aria-invalid', 'true')
    el.closest('.form-group')?.classList.add('form-group--error')
  }

  const collectPayload = (includeMeta = true) => {
    const payload = {}
    Object.entries(fields).forEach(([key, el]) => {
      if (!el) return
      if (el.type === 'checkbox') {
        payload[key] = el.checked
        return
      }
      payload[key] = (el.value || '').trim()
    })

    payload.topic ||= 'General Inquiry'
    payload.urgency = resolveUrgency()
    payload.qualityScore = 0

    if (includeMeta) {
      payload.timestamp = new Date().toISOString()
      payload.page = window.location.href
    }
    return payload
  }

  const validators = {
    name: (value) => value.length >= 2,
    email: (value) => EMAIL_REGEX.test(value),
    message: (value) => value.length >= 30,
    timeline: (value) => Boolean(value),
  }

  const computeQuality = (payload) => {
    let score = 0
    if (validators.name(payload.name)) score += 20
    if (validators.email(payload.email)) score += 20
    const messageLength = payload.message?.length || 0
    if (messageLength >= 30) score += 25
    if (messageLength >= 180) score += 10
    if (payload.objective?.length >= 10) score += 10
    if (payload.channel) score += 5
    if (validators.timeline(payload.timeline)) score += 10
    return clamp(score)
  }

  const updateCharCount = () => {
    if (!charCounter || !fields.message) return
    const current = fields.message.value.trim().length
    const max = Number(fields.message.getAttribute('maxlength')) || 1200
    charCounter.textContent = `${current}/${max}`
    charCounter.dataset.state = current >= 180 ? 'ready' : current >= 60 ? 'ok' : 'light'
  }

  const updateChecklist = (payload) => {
    const states = {
      identity: validators.name(payload.name),
      contact: validators.email(payload.email),
      context: validators.message(payload.message),
      timeline: validators.timeline(payload.timeline),
    }

    Object.entries(states).forEach(([key, ready]) => {
      const el = checklistEls[key]
      if (!el) return
      el.dataset.state = ready ? 'ready' : 'pending'
    })
  }

  const updateRouting = (payload) => {
    if (routeTopic) routeTopic.textContent = payload.topic || 'General inquiry'
    if (routeUrgency) routeUrgency.textContent = payload.urgency || 'Standard'
    if (routeTimeline) routeTimeline.textContent = payload.timeline || 'This week'

    const tone = ['priority', 'critical'].includes(payload.urgency) ? 'accent' : 'outline'
    if (routingLabel) {
      routingLabel.textContent =
        payload.urgency === 'critical'
          ? 'Fire lane'
          : payload.urgency === 'priority'
            ? 'Priority lane'
            : 'Standard lane'
      routingLabel.dataset.tone = tone
    }
  }

  const renderQuality = (payload) => {
    const score = computeQuality(payload)
    payload.qualityScore = score
    const readiness = resolveReadiness(score)

    if (qualityBar) {
      qualityBar.style.width = `${score}%`
      qualityBar.dataset.score = String(score)
    }
    if (qualityLabel && readiness) {
      qualityLabel.textContent = readiness.label
      qualityLabel.dataset.tone = readiness.tone
    }
    updateChecklist(payload)
    updateRouting(payload)
    updateCharCount()
  }

  const validate = (payload) => {
    clearErrors()
    const errors = []
    requiredKeys.forEach((key) => {
      const value = payload[key]
      if (!value || (validators[key] && !validators[key](value))) {
        errors.push(key)
        markInvalid(key)
      }
    })
    if (payload.message && payload.message.length < 30) {
      setStatus(statusEl, 'Add a few more sentences for a faster response.', 'muted')
    }
    return errors
  }

  const hydrateDraft = () => {
    const draft = loadDraft()
    if (!draft) return
    Object.entries(draft).forEach(([key, value]) => {
      const el = fields[key]
      if (!el) return
      if (el.type === 'checkbox') {
        el.checked = Boolean(value)
        return
      }
      el.value = value
    })
    if (draft.urgency) {
      const target = form.querySelector(`input[name="urgency"][value="${draft.urgency}"]`)
      if (target) target.checked = true
    }
    setStatus(statusEl, 'Draft restored. Finish and ship when ready.', 'info')
  }

  const handleLiveUpdates = () => {
    const payload = collectPayload(false)
    renderQuality(payload)
    saveDraft(payload)
  }

  hydrateDraft()
  renderQuality(collectPayload(false))
  updateCharCount()

  form.addEventListener('input', handleLiveUpdates)
  form.addEventListener('change', handleLiveUpdates)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const submitBtn = form.querySelector('button[type="submit"]')
    const payload = collectPayload()
    const errors = validate(payload)

    if (errors.length) {
      setStatus(statusEl, 'Tighten the highlighted fields before sending.', 'error')
      GameOnUI.showToast('Please complete the highlighted fields.', 'error')
      return
    }

    submitBtn.disabled = true
    const originalLabel = submitBtn.textContent
    submitBtn.textContent = 'Sending...'
    setStatus(statusEl, 'Routing your submission...', 'muted')

    try {
      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message || 'Request failed')
      }

      localStorage.removeItem(DRAFT_KEY)
      form.reset()
      renderQuality(collectPayload(false))
      updateCharCount()
      setStatus(statusEl, data?.message || 'Message sent!', 'success')
      GameOnUI.showToast('Message sent!', 'success')
    } catch (err) {
      console.error('Email send failed', err)
      setStatus(statusEl, 'Failed to send. Please try again later.', 'error')
      GameOnUI.showToast('Message failed to send', 'error')
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = originalLabel
    }
  })
})

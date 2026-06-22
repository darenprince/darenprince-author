const ACCESS_PASSWORD = 'no5@f3words'
const ACCESS_KEY = 'hxdAccessGranted'

function getSessionStore() {
  try {
    const { sessionStorage } = window
    sessionStorage.setItem('__hxd_test', 'ok')
    sessionStorage.removeItem('__hxd_test')
    return sessionStorage
  } catch (_error) {
    return null
  }
}

function unlockGate(gate, store) {
  document.body.classList.remove('locked')
  if (store) {
    store.setItem(ACCESS_KEY, 'true')
  }
  if (gate) {
    gate.classList.add('hidden')
  }
}

function handleGate() {
  const gate = document.querySelector('.access-gate')
  if (!gate) return

  const store = getSessionStore()
  const hasAccess = store?.getItem(ACCESS_KEY) === 'true'
  const form = document.getElementById('access-form')
  const input = document.getElementById('access-password')
  const error = document.getElementById('gate-error')

  if (hasAccess) {
    unlockGate(gate, store)
    return
  }

  document.body.classList.add('locked')
  gate.classList.remove('hidden')

  form?.addEventListener('submit', (event) => {
    event.preventDefault()
    const value = input?.value?.trim() || ''

    if (value === ACCESS_PASSWORD) {
      unlockGate(gate, store)
      if (input) input.value = ''
      if (error) error.textContent = ''
    } else {
      if (error) error.textContent = 'Wrong door.'
      if (form) {
        form.classList.add('shake')
        setTimeout(() => form.classList.remove('shake'), 360)
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', handleGate)

const ACCESS_PASSWORD = 'afterdark'
const ACCESS_KEY = 'hxdAccessGranted'

function unlockGate(gate) {
  document.body.classList.remove('locked')
  sessionStorage.setItem(ACCESS_KEY, 'true')
  if (gate) {
    gate.classList.add('hidden')
  }
}

function handleGate() {
  const gate = document.querySelector('.access-gate')
  if (!gate) return

  const hasAccess = sessionStorage.getItem(ACCESS_KEY) === 'true'
  const form = document.getElementById('access-form')
  const input = document.getElementById('access-password')
  const error = document.getElementById('gate-error')

  if (hasAccess) {
    unlockGate(gate)
    return
  }

  document.body.classList.add('locked')
  gate.classList.remove('hidden')

  form?.addEventListener('submit', (event) => {
    event.preventDefault()
    const value = input?.value?.trim() || ''

    if (value === ACCESS_PASSWORD) {
      unlockGate(gate)
      input.value = ''
      error.textContent = ''
    } else {
      error.textContent = 'Wrong door.'
      form.classList.add('shake')
      setTimeout(() => form.classList.remove('shake'), 360)
    }
  })
}

document.addEventListener('DOMContentLoaded', handleGate)

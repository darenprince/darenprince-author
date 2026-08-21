import { AUTH_DISABLED_MESSAGE, isAuthEnabled } from './auth-service.js'
import { logAuthWarning } from './auth-logger.js'

function disableForm(form) {
  if (!form) return
  Array.from(form.elements || []).forEach((element) => {
    if ('disabled' in element) {
      element.disabled = true
    }
  })
  form.dataset.authDisabled = 'true'
}

function renderOfflineState(message) {
  const greeting = document.querySelector('.greeting')
  if (greeting) {
    greeting.textContent = 'Member access is offline'
  }

  const info = document.createElement('div')
  info.className = 'card margin-bottom-md dashboard-offline'
  info.innerHTML = `
    <h2>Member platform reboot</h2>
    <p>${message}</p>
    <p class="text-sm opacity-70">We are migrating to a new data provider. Save any urgent requests for <a href="mailto:press@darenprince.com">press@darenprince.com</a>.</p>
  `

  const content = document.querySelector('.content')
  if (content) {
    content.prepend(info)
  }

  const placeholderLists = [
    document.getElementById('file-list'),
    document.getElementById('shared-list'),
  ]
  placeholderLists.forEach((list) => {
    if (!list) return
    list.innerHTML = ''
    const li = document.createElement(list.tagName === 'UL' ? 'li' : 'p')
    li.textContent = 'Files will reappear once the new database is live.'
    list.appendChild(li)
  })

  disableForm(document.getElementById('upload-form'))
  disableForm(document.getElementById('profile-form'))

  const authButtons = document.querySelectorAll('.js-auth-toggle')
  authButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      logAuthWarning('dashboard.logout', message)
    })
    button.title = message
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const message = AUTH_DISABLED_MESSAGE
  renderOfflineState(message)
  if (!isAuthEnabled()) {
    logAuthWarning('dashboard.init', message)
    return
  }

  logAuthWarning('dashboard.init', 'Auth provider integration pending')
})

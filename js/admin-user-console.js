import { AUTH_DISABLED_MESSAGE } from './auth-service.js'
import { logAuthWarning } from './auth-logger.js'

function renderOfflineConsole(message) {
  const host = document.querySelector('[data-console-root]')
  if (!host) return
  host.removeAttribute('hidden')
  host.innerHTML = `
    <main class="console-offline">
      <header class="console-offline__header">
        <h2>Admin tools offline</h2>
        <p>${message}</p>
      </header>
      <p class="console-offline__meta">Automation and member management will return once the new database provider is wired up. Email <a href="mailto:press@darenprince.com">press@darenprince.com</a> for emergency role changes.</p>
    </main>
  `
}

document.addEventListener('DOMContentLoaded', () => {
  renderOfflineConsole(AUTH_DISABLED_MESSAGE)
  logAuthWarning('admin-console', AUTH_DISABLED_MESSAGE)
})

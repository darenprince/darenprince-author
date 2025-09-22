const MAX_LOGS = 200
const STORAGE_KEY = 'supabaseLogBuffer'
const STORAGE_VERSION = 1
const logs = []
let panel
let badge
let autoScroll = true
let panelInitialized = false
let debugActive = false
let panelHost = null
let badgeHost = null
const proxyCache = new WeakMap()
let keyboardListenerAttached = false
let storageWarningLogged = false
const SECRET_TAP_SELECTORS = [
  '[data-supabase-debug-target]',
  '.mega-menu-logo',
  '.logo img',
  '.footer-logo',
  '.logo',
]
const SECRET_TAP_THRESHOLD = 7
const SECRET_TAP_WINDOW = 3000
const KONAMI_SEQUENCE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
]
let secretGesturesInitialized = false
let secretTapTarget = null
let secretTapCount = 0
let secretTapTimer = null
let konamiIndex = 0
let konamiListenerAttached = false
let secretTapObserver = null
let diagnosticsListenerAttached = false

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function safeStorage() {
  if (!isBrowser()) return null
  try {
    return window.localStorage
  } catch (error) {
    if (!storageWarningLogged) {
      console.warn(
        '[Supabase]',
        'client.storage',
        'Unable to access localStorage for debug logs',
        error
      )
      storageWarningLogged = true
    }
    return null
  }
}

function loadPersistedLogs() {
  const storage = safeStorage()
  if (!storage) return
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return
    const payload = JSON.parse(raw)
    if (!payload || payload.version !== STORAGE_VERSION || !Array.isArray(payload.logs)) return
    payload.logs.slice(-MAX_LOGS).forEach((entry) => {
      logs.push({ ...entry })
    })
  } catch (error) {
    console.warn('[Supabase]', 'client.storage', 'Unable to restore persisted Supabase logs', error)
  }
}

function attachDiagnosticsStream() {
  if (!isBrowser() || diagnosticsListenerAttached) return
  diagnosticsListenerAttached = true
  window.addEventListener('supabase:diagnostic', (event) => {
    const entry = event?.detail
    if (!entry || typeof entry !== 'object') return
    const level = entry.level === 'error' ? 'error' : entry.level === 'warn' ? 'warn' : 'info'
    pushLog({
      id: entry.id || `${Date.now()}-${Math.random()}`,
      timestamp: entry.timestamp || Date.now(),
      level,
      context: `diagnostic.${entry.step || 'unknown'}`,
      message: entry.message || 'Diagnostic event',
      detail: entry.detail,
    })
  })
}

function persistLogs() {
  const storage = safeStorage()
  if (!storage) return
  try {
    const payload = {
      version: STORAGE_VERSION,
      logs: logs.map((entry) => ({
        ...entry,
        detail: serializeDetail(entry.detail),
      })),
    }
    storage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (error) {
    if (error?.name === 'QuotaExceededError') {
      console.warn('[Supabase]', 'client.storage', 'Supabase log persistence quota exceeded')
    } else {
      console.warn('[Supabase]', 'client.storage', 'Unable to persist Supabase logs', error)
    }
  }
}

function serializeDetail(detail) {
  if (!detail) return undefined
  try {
    if (typeof detail === 'string') return detail
    return JSON.stringify(detail, null, 2)
  } catch (error) {
    return String(detail)
  }
}

function pushLog(entry) {
  logs.push(entry)
  if (logs.length > MAX_LOGS) {
    logs.shift()
  }
  persistLogs()
  if (entry.level === 'error') {
    console.error('[Supabase]', entry.context, entry.message, entry.detail)
  } else if (entry.level === 'warn') {
    console.warn('[Supabase]', entry.context, entry.message, entry.detail)
  } else {
    console.info('[Supabase]', entry.context, entry.message, entry.detail)
  }
  if (isBrowser()) {
    renderLogs()
    if (!panel || panel.hidden) {
      updateBadge()
    }
    const event = new CustomEvent('supabase:log', { detail: entry })
    window.dispatchEvent(event)
  }
}

function ensurePanel() {
  if (!isBrowser()) return
  if (!panelInitialized) {
    panelInitialized = true
    panel = document.createElement('section')
    panel.className = 'supabase-log-panel'
    panel.setAttribute('role', 'log')
    panel.hidden = true
    panel.innerHTML = `
      <header>
        <div>
          <h2>Supabase Debug Logs</h2>
          <p>Latest client-side authentication and database activity</p>
        </div>
        <div class="actions">
          <label><input type="checkbox" class="js-autoscroll" checked> Auto-scroll</label>
          <button type="button" class="js-clear">Clear</button>
          <button type="button" class="js-close" aria-label="Close">×</button>
        </div>
      </header>
      <ol class="entries" aria-live="polite"></ol>
    `
    const styles = document.createElement('style')
    styles.textContent = `
      .supabase-log-panel {
        position: fixed;
        inset: 4rem 2rem auto;
        background: rgba(12, 12, 14, 0.94);
        color: #f6f6f7;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        max-height: calc(100vh - 8rem);
        width: min(40rem, calc(100% - 4rem));
        display: flex;
        flex-direction: column;
        z-index: 9999;
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.35);
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      }
      .supabase-log-panel header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem 1.25rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(0, 0, 0, 0.5);
      }
      .supabase-log-panel header h2 {
        margin: 0;
        font-size: 1.1rem;
      }
      .supabase-log-panel header p {
        margin: 0.15rem 0 0;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.65);
      }
      .supabase-log-panel header .actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      .supabase-log-panel header button,
      .supabase-log-panel header label {
        font-size: 0.85rem;
        background: rgba(255, 255, 255, 0.08);
        color: inherit;
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 0.35rem 0.65rem;
        border-radius: 0.5rem;
        cursor: pointer;
      }
      .supabase-log-panel header button:hover,
      .supabase-log-panel header label:hover {
        border-color: rgba(255, 255, 255, 0.3);
      }
      .supabase-log-panel header button.js-close {
        font-size: 1.1rem;
        line-height: 1;
        padding: 0.1rem 0.55rem;
        background: rgba(255, 255, 255, 0.15);
      }
      .supabase-log-panel .entries {
        flex: 1;
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: auto;
        font-size: 0.9rem;
      }
      .supabase-log-panel .entries li {
        padding: 0.9rem 1.25rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        display: grid;
        gap: 0.35rem;
      }
      .supabase-log-panel .entries li:last-child {
        border-bottom: none;
      }
      .supabase-log-panel .meta {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: rgba(255, 255, 255, 0.6);
      }
      .supabase-log-panel .message {
        font-weight: 600;
      }
      .supabase-log-panel .detail {
        white-space: pre-wrap;
        word-break: break-word;
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.8);
      }
      .supabase-log-panel .level-error {
        border-left: 0.25rem solid #ff6b6b;
        padding-left: 1rem;
      }
      .supabase-log-panel .level-warn {
        border-left: 0.25rem solid #ffa94d;
        padding-left: 1rem;
      }
      .supabase-log-panel .level-info {
        border-left: 0.25rem solid #4dabf7;
        padding-left: 1rem;
      }
      .supabase-log-badge {
        position: fixed;
        right: 1.5rem;
        bottom: 1.5rem;
        background: rgba(0, 0, 0, 0.82);
        color: #fff;
        border-radius: 999px;
        padding: 0.55rem 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        font-size: 0.85rem;
        border: 1px solid rgba(255, 255, 255, 0.12);
        cursor: pointer;
        z-index: 9998;
        box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.3);
      }
      .supabase-log-badge.hidden {
        display: none;
      }
    `
    document.head.appendChild(styles)
    badge = document.createElement('button')
    badge.type = 'button'
    badge.className = 'supabase-log-badge hidden'
    badge.innerHTML = '<span class="dot"></span><span>Supabase Logs</span>'
    badge.addEventListener('click', () => togglePanel(true))
    panel.querySelector('.js-close').addEventListener('click', () => togglePanel(false))
    panel.querySelector('.js-clear').addEventListener('click', clearLogs)
    panel.querySelector('.js-autoscroll').addEventListener('change', (event) => {
      autoScroll = event.target.checked
    })
  }

  const targetPanelHost = resolvePanelHost()
  if (panel && targetPanelHost && panel.parentElement !== targetPanelHost) {
    targetPanelHost.appendChild(panel)
  }

  const targetBadgeHost = resolveBadgeHost()
  if (badge && targetBadgeHost && badge.parentElement !== targetBadgeHost) {
    targetBadgeHost.appendChild(badge)
  }

  if (!keyboardListenerAttached) {
    document.addEventListener('keydown', handleDebugShortcut)
    keyboardListenerAttached = true
  }
}

function clearLogs() {
  logs.splice(0, logs.length)
  renderLogs()
  updateBadge()
  const storage = safeStorage()
  if (storage) {
    storage.removeItem(STORAGE_KEY)
  }
}

function updateBadge() {
  if (!badge) return
  if (!debugActive) {
    badge.classList.add('hidden')
    badge.innerHTML = '<span>Supabase Logs</span>'
    return
  }
  const unreadErrors = logs.filter((entry) => entry.level === 'error').length
  if (unreadErrors === 0) {
    badge.classList.add('hidden')
    badge.innerHTML = '<span>Supabase Logs</span>'
    return
  }
  badge.classList.remove('hidden')
  badge.innerHTML = `<strong>${unreadErrors}</strong> Supabase ${unreadErrors === 1 ? 'issue' : 'issues'}`
}

function togglePanel(forceOpen) {
  if (!debugActive) return
  if (!panel) return
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : panel.hidden
  panel.hidden = !shouldOpen
  if (shouldOpen) {
    if (autoScroll) {
      const entriesEl = panel.querySelector('.entries')
      entriesEl.scrollTop = entriesEl.scrollHeight
    }
  }
  updateBadge()
}

function renderLogs() {
  if (!panel || !debugActive) return
  const list = panel.querySelector('.entries')
  if (!list) return
  list.innerHTML = logs
    .map((entry) => {
      const time = new Date(entry.timestamp).toLocaleTimeString()
      const detail = serializeDetail(entry.detail)
      return `
        <li class="level-${entry.level}">
          <div class="meta">
            <span>${time}</span>
            <span>${entry.context}</span>
            <span>${entry.level.toUpperCase()}</span>
          </div>
          <div class="message">${entry.message}</div>
          ${detail ? `<pre class="detail">${detail}</pre>` : ''}
        </li>
      `
    })
    .join('')
  if (autoScroll) {
    list.scrollTop = list.scrollHeight
  }
}

function initDebugPanel() {
  if (!isBrowser()) return
  initSecretGestures()
  const params = new URLSearchParams(window.location.search)
  const storedPreference = getStoredDebugPreference()
  if (storedPreference) {
    activateDebug({ persist: true, open: false })
  }
  if (params.has('supabaseDebug')) {
    const value = params.get('supabaseDebug')
    const shouldPersist = value === 'persist' || value === '1'
    const shouldOpen = value !== 'hidden'
    activateDebug({ persist: shouldPersist ? true : null, open: shouldOpen })
  }
  window.supabaseDebug = {
    toggle: () => {
      if (!debugActive) {
        activateDebug({ persist: null, open: true })
      } else {
        togglePanel()
      }
    },
    show: () => {
      if (!debugActive) {
        activateDebug({ persist: null, open: true })
      } else {
        togglePanel(true)
      }
    },
    hide: () => togglePanel(false),
    enable: (options = {}) =>
      activateDebug({ persist: options.persist ?? true, open: options.open ?? true }),
    disable: () => deactivateDebug(),
    export: () => logs.slice(),
    clear: () => clearLogs(),
    mount: (panelContainer, badgeContainer) => {
      if (!isBrowser()) return
      panelHost = resolveElement(panelContainer) || null
      badgeHost = resolveElement(badgeContainer) || panelHost || null
      if (debugActive) {
        ensurePanel()
      }
    },
    isEnabled: () => debugActive,
  }
}

if (isBrowser()) {
  loadPersistedLogs()
  attachDiagnosticsStream()
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDebugPanel)
  } else {
    initDebugPanel()
  }
}

export function logSupabaseEvent(level, context, message, detail) {
  const hasUUID =
    typeof globalThis !== 'undefined' &&
    globalThis.crypto &&
    typeof globalThis.crypto.randomUUID === 'function'
  pushLog({
    id: hasUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    level,
    context,
    message,
    detail,
  })
}

export function logSupabaseError(context, error, detail) {
  const message = error?.message || String(error)
  const payload = detail || {}
  if (error?.status) payload.status = error.status
  if (error?.code) payload.code = error.code
  if (error?.stack) payload.stack = error.stack
  logSupabaseEvent('error', context, message, payload)
}

export function logSupabaseWarning(context, message, detail) {
  logSupabaseEvent('warn', context, message, detail)
}

export function logSupabaseInfo(context, message, detail) {
  logSupabaseEvent('info', context, message, detail)
}

export function getSupabaseLogs() {
  return logs.slice()
}

function createProxy(target, context) {
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
    return target
  }
  if (proxyCache.has(target)) {
    return proxyCache.get(target)
  }
  const proxy = new Proxy(target, {
    get(original, prop, receiver) {
      const value = Reflect.get(original, prop, receiver)
      if (value && (typeof value === 'object' || typeof value === 'function')) {
        if (typeof value === 'function') {
          return async (...args) => {
            try {
              const result = await value.apply(original, args)
              if (result?.error) {
                logSupabaseError(`${context}.${String(prop)}`, result.error, {
                  args,
                  data: result.data,
                })
              }
              return result
            } catch (error) {
              logSupabaseError(`${context}.${String(prop)}`, error, {
                args,
              })
              throw error
            }
          }
        }
        return createProxy(value, `${context}.${String(prop)}`)
      }
      return value
    },
  })
  proxyCache.set(target, proxy)
  return proxy
}

export function bindSupabaseClient(client, context = 'client') {
  if (!client) return client
  return createProxy(client, context)
}

function resolveElement(target) {
  if (!target) return null
  if (typeof target === 'string') {
    return document.querySelector(target)
  }
  if (typeof Element !== 'undefined' && target instanceof Element) {
    return target
  }
  return null
}

function resolvePanelHost() {
  if (!panelHost || !panelHost.isConnected) {
    panelHost = null
  }
  return panelHost || document.body
}

function resolveBadgeHost() {
  if (!badgeHost || !badgeHost.isConnected) {
    badgeHost = null
  }
  return badgeHost || document.body
}

function handleDebugShortcut(event) {
  if (!debugActive || !panel) return
  if ((event.ctrlKey || event.metaKey) && event.altKey && event.key.toLowerCase() === 'l') {
    event.preventDefault()
    togglePanel(panel.hidden)
  }
}

function initSecretGestures() {
  if (!isBrowser() || secretGesturesInitialized) return
  secretGesturesInitialized = true
  setupSecretTapTarget()
  setupKonamiShortcut()
}

function setupSecretTapTarget() {
  if (secretTapTarget && secretTapTarget.isConnected) return
  const target = findSecretTapTarget()
  if (target) {
    attachSecretTapTarget(target)
    return
  }
  if (secretTapObserver) return
  secretTapObserver = new MutationObserver(() => {
    const candidate = findSecretTapTarget()
    if (candidate) {
      attachSecretTapTarget(candidate)
      if (secretTapObserver) {
        secretTapObserver.disconnect()
        secretTapObserver = null
      }
    }
  })
  secretTapObserver.observe(document.documentElement, { childList: true, subtree: true })
}

function findSecretTapTarget() {
  for (const selector of SECRET_TAP_SELECTORS) {
    const element = document.querySelector(selector)
    if (element) return element
  }
  return document.body || null
}

function attachSecretTapTarget(target) {
  secretTapTarget = target
  secretTapTarget.addEventListener('click', handleSecretTap)
}

function handleSecretTap(event) {
  if (!secretTapTarget) return
  secretTapCount += 1
  if (secretTapTimer) {
    clearTimeout(secretTapTimer)
  }
  secretTapTimer = setTimeout(resetSecretTapSequence, SECRET_TAP_WINDOW)
  if (secretTapCount < SECRET_TAP_THRESHOLD) {
    return
  }
  resetSecretTapSequence()
  if (!debugActive) {
    activateDebug({ persist: null, open: true })
  } else if (panel) {
    togglePanel(panel.hidden)
  }
  event.preventDefault()
}

function resetSecretTapSequence() {
  secretTapCount = 0
  if (secretTapTimer) {
    clearTimeout(secretTapTimer)
    secretTapTimer = null
  }
}

function setupKonamiShortcut() {
  if (konamiListenerAttached) return
  document.addEventListener('keydown', handleKonamiShortcut, true)
  konamiListenerAttached = true
}

function handleKonamiShortcut(event) {
  const key = event.key?.toLowerCase()
  if (!key) return
  if (key === KONAMI_SEQUENCE[konamiIndex]) {
    konamiIndex += 1
    if (konamiIndex === KONAMI_SEQUENCE.length) {
      konamiIndex = 0
      if (!debugActive) {
        activateDebug({ persist: null, open: true })
      } else if (panel) {
        togglePanel(panel.hidden)
      }
      event.preventDefault()
    }
    return
  }
  if (key === KONAMI_SEQUENCE[0]) {
    konamiIndex = 1
  } else {
    konamiIndex = 0
  }
}

function getStoredDebugPreference() {
  const storage = safeStorage()
  if (!storage) return false
  return storage.getItem('supabaseDebug') === '1'
}

function setStoredDebugPreference(enabled) {
  const storage = safeStorage()
  if (!storage) return
  if (enabled) {
    storage.setItem('supabaseDebug', '1')
  } else {
    storage.removeItem('supabaseDebug')
  }
}

function activateDebug({ persist = null, open = true } = {}) {
  if (!isBrowser()) return
  if (!debugActive) {
    debugActive = true
    ensurePanel()
    renderLogs()
  }
  if (persist === true) {
    setStoredDebugPreference(true)
  }
  if (persist === false) {
    setStoredDebugPreference(false)
  }
  updateBadge()
  if (open) {
    togglePanel(true)
  } else if (panel) {
    panel.hidden = true
  }
}

function deactivateDebug() {
  if (!debugActive) return
  debugActive = false
  setStoredDebugPreference(false)
  if (panel) {
    panel.hidden = true
  }
  updateBadge()
}

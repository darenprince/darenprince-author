const STORAGE_KEY = 'supabaseRuntimeConfig'
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

const normalizeConfig = (config = {}) => ({
  url: typeof config.url === 'string' ? config.url.trim() : '',
  anonKey: typeof config.anonKey === 'string' ? config.anonKey.trim() : '',
  jwtSecret: typeof config.jwtSecret === 'string' ? config.jwtSecret.trim() : '',
})

const safeStorage = () => {
  if (!isBrowser) return null
  try {
    return window.localStorage
  } catch (error) {
    console.warn('[Supabase]', 'runtime-config', 'Unable to access localStorage', error)
    return null
  }
}

const loadStoredConfig = () => {
  const storage = safeStorage()
  if (!storage) return null
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return normalizeConfig(parsed)
  } catch (error) {
    console.warn('[Supabase]', 'runtime-config', 'Failed to parse stored config', error)
    return null
  }
}

const persistConfig = (config) => {
  const storage = safeStorage()
  if (!storage) return
  if (!config || (!config.url && !config.anonKey && !config.jwtSecret)) {
    storage.removeItem(STORAGE_KEY)
    return
  }
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch (error) {
    console.warn('[Supabase]', 'runtime-config', 'Unable to persist config', error)
  }
}

const applyValue = (env, key, value) => {
  if (!key) return
  if (value) {
    env[key] = value
  } else {
    delete env[key]
  }
}

const applyRuntimeConfig = (config, { broadcast = true, persist } = {}) => {
  if (!isBrowser) return config

  const normalized = normalizeConfig(config)
  const env = { ...(window._env_ || {}) }

  ['SUPABASE_DATABASE_URL', 'SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_DATABASE_URL', 'PUBLIC_SUPABASE_URL'].forEach(key => applyValue(env, key, normalized.url));

  ['SUPABASE_ANON_KEY', 'SUPABASE_PUBLIC_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'PUBLIC_SUPABASE_ANON_KEY'].forEach(key => applyValue(env, key, normalized.anonKey));

  ['SUPABASE_JWT_SECRET', 'SUPABASE_JWT', 'NEXT_PUBLIC_SUPABASE_JWT_SECRET'].forEach(key => applyValue(env, key, normalized.jwtSecret));

  window._env_ = env

  if (typeof persist === 'boolean') {
    persistConfig(persist ? normalized : null)
  }

  if (broadcast) {
    window.dispatchEvent(new CustomEvent('supabase-runtime-config:update', { detail: normalized }))
  }

  return normalized
}

const storedConfig = loadStoredConfig()
if (storedConfig) {
  applyRuntimeConfig(storedConfig, { broadcast: false })
}

const template = () => `
  <button type="button" class="supabase-runtime-toggle" aria-expanded="false">
    <span class="label">Supabase config</span>
    <span class="status" data-runtime-status>offline</span>
  </button>
  <form class="supabase-runtime-panel" hidden>
    <header>
      <div>
        <h2>Runtime Supabase credentials</h2>
        <p>Add QA project keys without rebuilding the site.</p>
      </div>
      <button type="button" class="js-close" aria-label="Close">×</button>
    </header>
    <div class="fields">
      <label>
        <span>Project URL</span>
        <input type="url" name="supabase-url" placeholder="https://your-project.supabase.co">
      </label>
      <label>
        <span>Anon key</span>
        <textarea name="supabase-anon-key" rows="3" placeholder="Paste anon key here"></textarea>
      </label>
      <label>
        <span>JWT secret (optional)</span>
        <input type="text" name="supabase-jwt" placeholder="Only needed for edge testing">
      </label>
      <label class="remember">
        <input type="checkbox" name="supabase-persist" checked>
        <span>Remember for this browser</span>
      </label>
    </div>
    <footer>
      <div class="actions">
        <button type="submit" class="apply">Apply</button>
        <button type="button" class="clear" data-action="clear">Clear</button>
      </div>
      <p class="message" data-runtime-message role="status" aria-live="polite"></p>
      <p class="hint">Keys are stored locally in this browser only. Never use production secrets here.</p>
    </footer>
  </form>
`

const styles = `
  .supabase-runtime-config {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
    z-index: 6000;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  }
  .supabase-runtime-config button {
    font-family: inherit;
  }
  .supabase-runtime-toggle {
    background: rgba(17, 18, 23, 0.9);
    color: #f8f8fa;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    padding: 0.5rem 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    font-size: 0.85rem;
    cursor: pointer;
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .supabase-runtime-toggle:hover,
  .supabase-runtime-toggle:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 1.25rem 2.5rem rgba(0, 0, 0, 0.4);
  }
  .supabase-runtime-toggle .status {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.15rem 0.5rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
  }
  .supabase-runtime-panel {
    width: min(22rem, calc(100vw - 2rem));
    background: rgba(12, 13, 18, 0.96);
    color: #f4f5f7;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 1rem;
    padding: 1.25rem;
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(18px);
  }
  .supabase-runtime-panel header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  .supabase-runtime-panel header h2 {
    margin: 0;
    font-size: 1rem;
  }
  .supabase-runtime-panel header p {
    margin: 0.25rem 0 0;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.65);
  }
  .supabase-runtime-panel header .js-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.25rem;
    cursor: pointer;
  }
  .supabase-runtime-panel .fields {
    display: grid;
    gap: 0.85rem;
  }
  .supabase-runtime-panel label {
    display: grid;
    gap: 0.35rem;
    font-size: 0.8rem;
  }
  .supabase-runtime-panel input,
  .supabase-runtime-panel textarea {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 0.65rem;
    padding: 0.5rem 0.65rem;
    color: inherit;
    font-size: 0.85rem;
    font-family: inherit;
  }
  .supabase-runtime-panel textarea {
    resize: vertical;
    min-height: 3.5rem;
  }
  .supabase-runtime-panel .remember {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .supabase-runtime-panel footer {
    margin-top: 1rem;
    display: grid;
    gap: 0.6rem;
  }
  .supabase-runtime-panel .actions {
    display: flex;
    gap: 0.5rem;
  }
  .supabase-runtime-panel .actions button {
    flex: 1;
    border-radius: 0.65rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.12);
    color: inherit;
    font-weight: 600;
    padding: 0.5rem 0.65rem;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .supabase-runtime-panel .actions button:hover,
  .supabase-runtime-panel .actions button:focus-visible {
    background: rgba(255, 255, 255, 0.22);
    transform: translateY(-1px);
  }
  .supabase-runtime-panel .actions .clear {
    background: rgba(255, 255, 255, 0.06);
  }
  .supabase-runtime-panel .message {
    min-height: 1.2rem;
    font-size: 0.75rem;
    color: rgba(140, 255, 197, 0.85);
  }
  .supabase-runtime-panel .hint {
    margin: 0;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.45);
  }
  @media (max-width: 640px) {
    .supabase-runtime-config {
      left: 1rem;
      right: 1rem;
      align-items: stretch;
    }
    .supabase-runtime-panel {
      width: 100%;
    }
  }
`

const setStatus = (element, config) => {
  if (!element) return
  const active = Boolean(config.url && config.anonKey)
  element.textContent = active ? 'online' : 'offline'
  element.dataset.state = active ? 'online' : 'offline'
}

const initUi = () => {
  if (!isBrowser) return
  const host = document.createElement('section')
  host.className = 'supabase-runtime-config'
  host.innerHTML = template()

  const styleTag = document.createElement('style')
  styleTag.textContent = styles
  document.head.appendChild(styleTag)

  document.body.appendChild(host)

  const toggle = host.querySelector('.supabase-runtime-toggle')
  const panel = host.querySelector('.supabase-runtime-panel')
  const closeBtn = host.querySelector('.js-close')
  const message = host.querySelector('[data-runtime-message]')
  const statusBadge = host.querySelector('[data-runtime-status]')
  const urlInput = host.querySelector('input[name="supabase-url"]')
  const anonInput = host.querySelector('textarea[name="supabase-anon-key"]')
  const jwtInput = host.querySelector('input[name="supabase-jwt"]')
  const persistInput = host.querySelector('input[name="supabase-persist"]')

  if (!toggle || !panel || !closeBtn || !urlInput || !anonInput || !persistInput || !jwtInput) {
    console.warn(
      '[Supabase]',
      'runtime-config',
      'Configurator failed to initialize: missing DOM nodes'
    )
    return
  }

  const stored = storedConfig || { url: '', anonKey: '', jwtSecret: '' }
  urlInput.value = stored.url
  anonInput.value = stored.anonKey
  jwtInput.value = stored.jwtSecret
  persistInput.checked = Boolean(stored.url || stored.anonKey || stored.jwtSecret)
  setStatus(statusBadge, stored)

  const closePanel = () => {
    panel.hidden = true
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true'
    const next = !expanded
    toggle.setAttribute('aria-expanded', String(next))
    panel.hidden = !next
    if (next) {
      urlInput.focus()
    }
  })

  closeBtn.addEventListener('click', () => {
    closePanel()
  })

  host.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      closePanel()
    }
  })

  const clearButton = host.querySelector('[data-action="clear"]')
  if (!clearButton) {
    console.warn('[Supabase]', 'runtime-config', 'Configurator missing clear action button')
  } else {
    clearButton.addEventListener('click', () => {
      urlInput.value = ''
      anonInput.value = ''
      jwtInput.value = ''
      persistInput.checked = false
      const cleared = applyRuntimeConfig(
        { url: '', anonKey: '', jwtSecret: '' },
        {
          broadcast: true,
          persist: false,
        }
      )
      setStatus(statusBadge, cleared)
      if (message) {
        message.textContent = 'Runtime overrides cleared.'
      }
    })
  }

  panel.addEventListener('submit', (event) => {
    event.preventDefault()
    const nextConfig = {
      url: urlInput.value,
      anonKey: anonInput.value,
      jwtSecret: jwtInput.value,
    }
    const applied = applyRuntimeConfig(nextConfig, {
      broadcast: true,
      persist: persistInput.checked,
    })
    setStatus(statusBadge, applied)
    if (message) {
      if (applied.url && applied.anonKey) {
        message.textContent = 'Supabase client refreshed with runtime credentials.'
      } else {
        message.textContent = 'Supabase credentials incomplete. Client disabled.'
      }
    }
    closePanel()
  })

  window.addEventListener('supabase-runtime-config:update', (event) => {
    const detail = event?.detail || {}
    setStatus(statusBadge, detail)
  })
}

if (isBrowser) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUi)
  } else {
    initUi()
  }
}

export {}

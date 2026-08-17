const DEFAULT_PASSWORD = 'Cr0wnG@t35'
const DEFAULT_HEADING = 'Protected preview'
const DEFAULT_MESSAGE = 'Enter the access password to continue.'
const DEFAULT_ERROR = 'Incorrect password. Please try again.'

let gateStylesInjected = false

function readGateState(key) {
  try {
    return window.sessionStorage?.getItem(key) ?? null
  } catch (error) {
    console.warn('password-gate: unable to read sessionStorage', error)
    return null
  }
}

function writeGateState(key, value) {
  try {
    window.sessionStorage?.setItem(key, value)
  } catch (error) {
    console.warn('password-gate: unable to persist sessionStorage', error)
  }
}

function domReady() {
  if (document.readyState === 'loading') {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', resolve, { once: true })
    })
  }
  return Promise.resolve()
}

function ensureStyles() {
  if (gateStylesInjected) return

  const style = document.createElement('style')
  style.dataset.source = 'password-gate'
  style.textContent = `
    .password-gate-overlay { position: fixed; inset: 0; z-index: 3200; display: flex; align-items: center; justify-content: center; padding: 2rem; background: rgba(5, 7, 9, 0.92); backdrop-filter: blur(6px); }
    .password-gate { width: min(520px, 100%); background: rgba(17, 18, 23, 0.96); border: 1px solid rgba(125, 222, 91, 0.28); border-radius: 18px; padding: clamp(2rem, 3vw, 2.75rem); color: #f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif; box-shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.65); }
    .password-gate h2 { font-size: clamp(1.5rem, 2.4vw, 2rem); margin-bottom: 0.75rem; letter-spacing: 0.02em; }
    .password-gate p { margin: 0 0 1.5rem; line-height: 1.6; color: #d6d6d6; }
    .password-gate form { display: flex; flex-direction: column; gap: 0.85rem; }
    .password-gate label { font-weight: 600; letter-spacing: 0.02em; color: #ecf2ec; }
    .password-gate input[type='password'] { padding: 0.85rem 1rem; border-radius: 12px; border: 1px solid rgba(125, 222, 91, 0.35); background: rgba(8, 10, 12, 0.85); color: #f5f5f5; font-size: 1rem; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
    .password-gate input[type='password']:focus { outline: none; border-color: rgba(125, 222, 91, 0.75); box-shadow: 0 0 0 3px rgba(125, 222, 91, 0.25); }
    .password-gate__actions { display: flex; flex-direction: column; gap: 0.75rem; }
    .password-gate button[type='submit'] { border: none; border-radius: 999px; padding: 0.85rem 1.5rem; font-weight: 600; letter-spacing: 0.02em; background: linear-gradient(135deg, rgba(125, 222, 91, 0.95), rgba(86, 170, 72, 0.95)); color: #041406; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .password-gate button[type='submit']:hover, .password-gate button[type='submit']:focus-visible { transform: translateY(-1px); box-shadow: 0 20px 45px -22px rgba(125, 222, 91, 0.9); }
    .password-gate__error { min-height: 1.25rem; font-size: 0.9rem; color: #ff7070; }
    .password-gate__meta { margin-top: 0.75rem; font-size: 0.85rem; color: #a9b3ac; }
    body.password-gate-blocked { overflow: hidden; }
  `

  document.head.appendChild(style)
  gateStylesInjected = true
}

function revealSite() {
  const siteWrap = document.querySelector('.site-wrap')
  if (siteWrap && siteWrap.hasAttribute('hidden')) {
    siteWrap.removeAttribute('hidden')
  }
  document.body.classList.remove('password-gate-blocked')
}

function buildOverlay({ heading, message, errorMessage, password, gateKey }) {
  const overlay = document.createElement('div')
  overlay.className = 'password-gate-overlay'

  const panel = document.createElement('div')
  panel.className = 'password-gate'
  panel.innerHTML = `
    <h2>${heading}</h2>
    <p>${message}</p>
    <form novalidate>
      <label for="password-gate-input">Access password</label>
      <input id="password-gate-input" type="password" autocomplete="current-password" required />
      <div class="password-gate__actions">
        <button type="submit">Unlock</button>
        <span class="password-gate__error" role="status" aria-live="polite"></span>
      </div>
      <p class="password-gate__meta">Contact <a href="mailto:press@darenprince.com" style="color: #7dde5b; text-decoration: none; font-weight: 600;">press@darenprince.com</a> for help.</p>
    </form>
  `

  const form = panel.querySelector('form')
  const input = panel.querySelector('#password-gate-input')
  const errorEl = panel.querySelector('.password-gate__error')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const value = input.value.trim()
    if (value === password) {
      writeGateState(gateKey, 'unlocked')
      overlay.remove()
      revealSite()
    } else {
      errorEl.textContent = errorMessage
      input.select()
    }
  })

  setTimeout(() => input.focus({ preventScroll: true }), 50)

  overlay.appendChild(panel)
  return overlay
}

export async function enforcePasswordGate(options = {}) {
  const {
    password = DEFAULT_PASSWORD,
    heading = DEFAULT_HEADING,
    message = DEFAULT_MESSAGE,
    errorMessage = DEFAULT_ERROR,
    gateId,
  } = options

  const gateKey = gateId ? `password-gate:${gateId}` : `password-gate:${window.location.pathname}`

  await domReady()

  if (readGateState(gateKey) === 'unlocked') {
    revealSite()
    return
  }

  ensureStyles()
  document.body.classList.add('password-gate-blocked')
  const overlay = buildOverlay({ heading, message, errorMessage, password, gateKey })
  document.body.appendChild(overlay)
}

export default enforcePasswordGate

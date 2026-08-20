(() => {
  if (!location.pathname.includes('/voxvector/developer')) return

  const API_HEALTH_URL = 'https://voxvector.crownlabs.tech/health'
  const originalFetch = window.fetch.bind(window)
  let wakeRequested = false
  let started = false
  let ready = false
  let timer = null

  function isHealth(input) {
    const url = typeof input === 'string' ? input : input?.url
    return typeof url === 'string' && /\/health(?:\?|$)/.test(url)
  }

  window.fetch = async (input, init) => {
    if (!isHealth(input) || wakeRequested) return originalFetch(input, init)
    const error = new Error('VoxVector server is inactive until startup is requested.')
    error.name = 'VoxVectorInactiveError'
    throw error
  }

  const style = document.createElement('style')
  style.textContent = `
    #vv-server-wake { margin-bottom: 18px; border: 1px solid rgba(217,160,107,.28); background:linear-gradient(135deg,rgba(217,160,107,.08),rgba(255,255,255,.018)); padding:22px; color:#f5f3ee; }
    #vv-server-wake.vv-ready { border-color:rgba(52,211,153,.22); }
    .vv-wake-kicker { font:700 10px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.16em; color:#d9a06b; text-transform:uppercase; }
    .vv-wake-title { margin-top:7px; font-size:22px; font-weight:700; letter-spacing:-.025em; }
    .vv-wake-copy { max-width:720px; margin:7px 0 0; color:rgba(245,243,238,.58); font-size:13px; line-height:1.65; }
    .vv-wake-actions { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-top:17px; }
    .vv-wake-button { border:1px solid #c99a66; background:#c99a66; color:#120d08; padding:10px 15px; font:700 11px ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.08em; cursor:pointer; }
    .vv-wake-button:disabled { opacity:.55; cursor:wait; }
    .vv-wake-status { color:rgba(245,243,238,.42); font:10px ui-monospace,SFMono-Regular,Menlo,monospace; }
    .vv-wake-sequence { display:none; margin-top:18px; border-top:1px solid rgba(255,255,255,.07); padding-top:15px; }
    .vv-wake-sequence.active { display:block; }
    .vv-wake-row { display:flex; align-items:center; gap:10px; min-height:27px; color:rgba(245,243,238,.42); font:10px ui-monospace,SFMono-Regular,Menlo,monospace; }
    .vv-wake-row.done { color:#c99a66; }
    .vv-wake-dot { width:7px; height:7px; border:1px solid currentColor; border-radius:50%; flex:0 0 7px; }
    .vv-wake-row.active .vv-wake-dot { background:currentColor; box-shadow:0 0 0 5px rgba(217,160,107,.08); animation:vvWakePulse 1s infinite; }
    @keyframes vvWakePulse { 50% { transform:scale(1.45); opacity:.55; } }
    .vv-wake-scan { height:2px; overflow:hidden; margin:7px 0 8px 17px; background:rgba(255,255,255,.05); }
    .vv-wake-scan i { display:block; width:28%; height:100%; background:#d9a06b; animation:vvWakeScan 1.25s linear infinite; }
    @keyframes vvWakeScan { from { transform:translateX(-120%); } to { transform:translateX(460%); } }
  `
  document.head.appendChild(style)

  const stages = ['Wake request received','Render instance responding','Application process detected','Health check','VoxVector engine ready']

  function getPanel() { return document.getElementById('vv-server-wake') }

  function mount() {
    if (getPanel()) return
    const main = document.querySelector('.vv-main')
    if (!main) return
    const panel = document.createElement('section')
    panel.id = 'vv-server-wake'
    panel.className = 'vv-panel'
    panel.innerHTML = `
      <div class="vv-wake-kicker">RENDER RUNTIME</div>
      <div class="vv-wake-title">Analysis engine inactive</div>
      <p class="vv-wake-copy">The VoxVector API is running on Render's Free runtime and may wind down after inactivity. The dashboard does not send artificial traffic to keep it awake. Start the engine when you need live analysis services.</p>
      <div class="vv-wake-actions"><button class="vv-wake-button" type="button">START VOXVECTOR ENGINE</button><span class="vv-wake-status">Server state: inactive</span></div>
      <div class="vv-wake-sequence"></div>
    `
    main.prepend(panel)
    panel.querySelector('button').addEventListener('click', start)
  }

  function renderSequence(activeIndex = -1) {
    const panel = getPanel()
    if (!panel) return
    const sequence = panel.querySelector('.vv-wake-sequence')
    sequence.classList.toggle('active', started && !ready)
    sequence.innerHTML = stages.map((label, index) => `<div class="vv-wake-row ${index < activeIndex ? 'done' : ''} ${index === activeIndex ? 'active' : ''}"><span class="vv-wake-dot"></span>${label}${index === 3 && index === activeIndex ? '<span>…</span>' : ''}</div>${index === activeIndex ? '<div class="vv-wake-scan"><i></i></div>' : ''}`).join('')
  }

  async function checkHealth() {
    try {
      const response = await originalFetch(API_HEALTH_URL, { headers: { Accept:'application/json' } })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const payload = await response.json()
      if (payload?.status === 'ok' && payload?.runtime_self_test === 'passed') {
        ready = true
        clearInterval(timer)
        renderSequence(stages.length)
        const panel = getPanel()
        if (panel) {
          panel.classList.add('vv-ready')
          panel.querySelector('.vv-wake-title').textContent = 'Analysis engine ready'
          panel.querySelector('.vv-wake-copy').textContent = 'The VoxVector backend has passed its live health check and runtime self test. The dashboard is now displaying verified backend status.'
          panel.querySelector('.vv-wake-button').remove()
          panel.querySelector('.vv-wake-status').textContent = 'Server state: operational'
        }
        window.dispatchEvent(new CustomEvent('voxvector:server-ready', { detail: payload }))
        return true
      }
      throw new Error('Health check did not pass')
    } catch (error) {
      renderSequence(3)
      const status = getPanel()?.querySelector('.vv-wake-status')
      if (status) status.textContent = `Server state: starting · ${error.message}`
      return false
    }
  }

  function start() {
    if (started) return
    started = true
    wakeRequested = true
    const panel = getPanel()
    if (panel) {
      panel.querySelector('.vv-wake-title').textContent = 'Starting VoxVector engine'
      panel.querySelector('.vv-wake-copy').textContent = 'Wake request sent. Render is starting the application. This panel will remain active until the live health check and runtime self test pass.'
      panel.querySelector('.vv-wake-button').disabled = true
      panel.querySelector('.vv-wake-status').textContent = 'Server state: waking'
    }
    renderSequence(0)
    checkHealth()
    timer = setInterval(checkHealth, 2000)
    setTimeout(() => renderSequence(1), 500)
    setTimeout(() => renderSequence(2), 1800)
  }

  const observer = new MutationObserver(mount)
  observer.observe(document.documentElement, { childList:true, subtree:true })
  mount()
})()

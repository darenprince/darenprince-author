;(function () {
  const root = document.documentElement
  const key = 'theme'
  const app = document.getElementById('app')
  function applyTheme(theme) {
    root.dataset.theme = theme
    document.querySelectorAll('[data-dark-logo]').forEach((img) => {
      img.src = theme === 'light' ? img.dataset.lightLogo : img.dataset.darkLogo
    })
  }
  applyTheme(localStorage.getItem(key) || 'dark')

  function setActiveQuicklink() {
    const current = window.location.pathname.split('/').pop() || 'index.html'
    document.querySelectorAll('.cl-quicklinks a').forEach((link) => {
      const href = link.getAttribute('href') || ''
      const target = href.split('#')[0]
      link.classList.toggle('is-active', target === current)
      if (target === current) link.setAttribute('aria-current', 'page')
      else link.removeAttribute('aria-current')
    })
  }
  setActiveQuicklink()

  const toggle = document.getElementById('themeToggle')
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem(key, next)
      applyTheme(next)
    })
  }

  const navToggle = document.getElementById('navToggle')
  const toolbarToggle = document.getElementById('toolbarToggle')
  const toolbar = document.querySelector('.cl-toolbar')
  const mobileMenu = document.getElementById('mobileMenu')
  const scrim = document.getElementById('scrim')

  if (app && localStorage.getItem('navCollapsed') === 'true') app.classList.add('nav-collapsed')

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (window.innerWidth < 981) document.body.classList.toggle('nav-open')
      else if (app) {
        app.classList.toggle('nav-collapsed')
        localStorage.setItem('navCollapsed', app.classList.contains('nav-collapsed'))
      }
    })
  }
  if (mobileMenu) mobileMenu.addEventListener('click', () => document.body.classList.add('nav-open'))
  if (scrim) scrim.addEventListener('click', () => document.body.classList.remove('nav-open'))

  if (toolbarToggle && toolbar) {
    const collapsed = localStorage.getItem('toolbarCollapsed') === 'true'
    toolbar.classList.toggle('toolbar-collapsed', collapsed)
    const icon = toolbarToggle.querySelector('.ms-icon')
    if (icon) icon.textContent = collapsed ? 'expand_more' : 'expand_less'
    toolbarToggle.addEventListener('click', () => {
      const next = !toolbar.classList.contains('toolbar-collapsed')
      toolbar.classList.toggle('toolbar-collapsed', next)
      const nextIcon = toolbarToggle.querySelector('.ms-icon')
      if (nextIcon) nextIcon.textContent = next ? 'expand_more' : 'expand_less'
      localStorage.setItem('toolbarCollapsed', String(next))
    })
  }

  const ASSET_ROOT = '../../../../'
  const assets = {
    crownPsychologyLogo: ASSET_ROOT + 'assets/images/Crown-Psychology-Wordmark.png',
    crownPsychologyPromo: ASSET_ROOT + 'assets/images/369614C7-0374-4409-AD16-E5CCB5CDBDEE.png',
    crownPsychologyArchitecture: ASSET_ROOT + 'assets/images/EA6882C5-BB64-412B-9F58-395D1208F112.png',
    crownPsychologyPremium: ASSET_ROOT + 'assets/images/Untitled%20design.png',
    crownCodeLogo: ASSET_ROOT + 'assets/images/NavLogo.PNG',
    crownCodeIcon: ASSET_ROOT + 'assets/images/Updated%20icon.PNG',
    crownCodeScreenshot: ASSET_ROOT + 'desktopui-Nobg.PNG',
    sentinelSymbol: ASSET_ROOT + 'assets/images/28D4FFEB-D071-419E-A5C9-8CCE7D9F3734.png',
    sentinelIcon: ASSET_ROOT + 'assets/images/893D3E8C-43EC-4D55-B640-795BFCBFCCF8.png',
    sentinelHero: ASSET_ROOT + 'assets/images/B93001C0-650C-4E55-AF4D-04A402D582FF.png',
    voxVectorSymbol: ASSET_ROOT + 'VoxVector/Assets/voxvector-icon-final-color.png.PNG',
    voxVectorFull: ASSET_ROOT + 'VoxVector/Assets/VoxVector-Full-logo-black-bg.png',
    picDetectiveIcon: ASSET_ROOT + 'Picdetective/deticon.png',
    picDetectiveLogo: ASSET_ROOT + 'Picdetective/detlogo2.PNG',
    operationPhoenixIcon: ASSET_ROOT + 'assets/images/05320CFA-0D08-4630-B4D0-40FF84B542D3.png',
    justUsScott: ASSET_ROOT + 'assets/images/IMG_0267.png',
    vibePrismIcon: ASSET_ROOT + 'assets/images/09B332D7-924A-4FE6-A9C0-3380DCD5C861.png',
    createVectorIcon: ASSET_ROOT + 'assets/images/create-vector-app-icon.png'
  }

  function injectRegistryLink() {
    const target = document.querySelector('.cl-quicklinks')
    if (!target || target.querySelector('[data-brand-registry-link]')) return
    const a = document.createElement('a')
    a.href = 'brand-registry.html'
    a.dataset.brandRegistryLink = 'true'
    a.innerHTML = '<span class="ms-icon" aria-hidden="true">palette</span>Brand Registry'
    target.appendChild(a)
  }

  function injectRegistryLinkOnPortfolio() {
    const pageTitle = document.querySelector('.cl-content h1')
    if (!pageTitle || !/product portfolio/i.test(pageTitle.textContent || '')) return
    if (document.querySelector('[data-brand-registry-card]')) return
    const cardGrid = pageTitle.parentElement.querySelector('.card-grid')
    if (!cardGrid) return
    const card = document.createElement('a')
    card.href = 'brand-registry.html'
    card.className = 'card product-card'
    card.dataset.brandRegistryCard = 'true'
    card.innerHTML = '<span class="cl-product-card-fallback ms-icon" style="font-size:36px;flex:0 0 52px;width:52px;height:52px;display:grid;place-items:center" aria-hidden="true">palette</span><div><h3>Brand Logo &amp; Icon Registry</h3><p>Canonical artwork, app icons, product logos, and documentation hero assets.</p></div>'
    cardGrid.appendChild(card)
  }

  function enhancePortfolioCards() {
    const map = {
      'Crown Psychology': assets.crownPsychologyLogo,
      'Sentinel Vault': assets.sentinelSymbol,
      'VoxVector': assets.voxVectorSymbol,
      'Crown SOS': ASSET_ROOT + 'emergency-911/CrownSOS-icon.PNG'
    }
    document.querySelectorAll('.card-grid .product-card').forEach((card) => {
      const title = card.querySelector('h3')?.textContent?.trim()
      const src = map[title]
      if (!src || card.dataset.assetEnhanced === 'true') return
      const old = card.querySelector('.cl-product-card-fallback')
      if (old) old.outerHTML = '<img class="cl-product-logo" style="width:52px;height:52px;flex:0 0 52px;object-fit:contain" src="' + src + '" alt="" loading="lazy">'
      else if (!card.querySelector('img')) card.insertAdjacentHTML('afterbegin','<img class="cl-product-logo" style="width:52px;height:52px;flex:0 0 52px;object-fit:contain" src="' + src + '" alt="" loading="lazy">')
      card.dataset.assetEnhanced = 'true'
    })
  }

  function currentDocPath() {
    try { return decodeURIComponent(new URLSearchParams(location.search).get('doc') || '').toLowerCase() } catch { return '' }
  }

  function profileForDoc(path) {
    if (path.includes('crown-psychology')) return { brand:'Crown Psychology',logo:assets.crownPsychologyLogo,icon:assets.crownPsychologyPremium,hero:path.includes('/architecture.md')?assets.crownPsychologyArchitecture:(path.includes('/overview.md')?assets.crownPsychologyPromo:''),alt:'Crown Psychology' }
    if (path.includes('sentinel-vault')) return { brand:'Sentinel Vault',logo:assets.sentinelSymbol,icon:assets.sentinelIcon,hero:path.includes('/overview.md')?assets.sentinelHero:'',alt:'Sentinel Vault' }
    if (path.includes('crowncode-ai')) return { brand:'CrownCode.ai',logo:assets.crownCodeLogo,icon:assets.crownCodeIcon,hero:path.endsWith('.md')?assets.crownCodeScreenshot:'',alt:'CrownCode.ai' }
    if (path.includes('voxvector')) return { brand:'VoxVector',logo:assets.voxVectorFull,icon:assets.voxVectorSymbol,hero:'',alt:'VoxVector' }
    if (path.includes('picdetective')) return { brand:'PicDetective',logo:assets.picDetectiveLogo,icon:assets.picDetectiveIcon,hero:'',alt:'PicDetective' }
    if (path.includes('operation-phoenix')) return { brand:'Operation Phoenix',logo:'',icon:assets.operationPhoenixIcon,hero:'',alt:'Operation Phoenix' }
    if (path.includes('vibe-prism')) return { brand:'Vibe Prism',logo:'',icon:assets.vibePrismIcon,hero:'',alt:'Vibe Prism' }
    if (path.includes('create-vector')) return { brand:'Create Vector',logo:'',icon:assets.createVectorIcon,hero:'',alt:'Create Vector' }
    return null
  }

  function applyDocumentBranding() {
    const content = document.querySelector('.cl-content')
    if (!content || !content.querySelector('h1')) return
    const path = currentDocPath()
    const profile = profileForDoc(path)
    if (!profile || content.dataset.brandPath === path) return

    const wrap = document.createElement('div')
    wrap.className = 'cl-doc-brand'
    wrap.dataset.brandPath = path
    wrap.innerHTML =
      (profile.logo ? '<img class="cl-doc-brand-logo" src="' + profile.logo + '" alt="' + profile.alt + ' full logo" loading="eager">' : '') +
      (profile.hero ? '<img class="cl-doc-brand-hero" src="' + profile.hero + '" alt="' + profile.alt + ' documentation hero" loading="eager">' : '') +
      (profile.icon ? '<img class="cl-doc-brand-icon" src="' + profile.icon + '" alt="' + profile.alt + ' app icon" loading="lazy">' : '')

    const firstHeading = content.querySelector('h1')
    firstHeading.parentNode.insertBefore(wrap, firstHeading)
    content.dataset.brandPath = path
  }

  function installBrandStyles() {
    if (document.getElementById('cl-brand-registry-styles')) return
    const style = document.createElement('style')
    style.id = 'cl-brand-registry-styles'
    style.textContent = `
      .cl-doc-brand{margin:0 0 34px;display:flex;flex-direction:column;align-items:flex-start;gap:18px}
      .cl-doc-brand-logo{display:block;max-width:min(420px,100%);max-height:96px;width:auto;height:auto;object-fit:contain}
      .cl-doc-brand-hero{display:block;width:100%;max-height:460px;object-fit:cover;border:0;border-radius:0;background:transparent}
      .cl-doc-brand-icon{display:block;width:88px;height:88px;max-width:none;object-fit:contain;border-radius:0;background:transparent;box-shadow:none;border:0}
      @media(max-width:620px){.cl-doc-brand{gap:14px;margin-bottom:28px}.cl-doc-brand-logo{max-width:280px;max-height:74px}.cl-doc-brand-hero{max-height:300px}.cl-doc-brand-icon{width:72px;height:72px}}
    `
    document.head.appendChild(style)
  }

  function installDocumentationChrome() {
    if (document.getElementById('cl-documentation-chrome')) return
    const style = document.createElement('style')
    style.id = 'cl-documentation-chrome'
    style.textContent = `
      .cl-toolbar{position:sticky;top:max(0px,env(safe-area-inset-top));z-index:80;margin:0 -14px 30px;padding:10px 14px;border:1px solid color-mix(in srgb,var(--border) 90%,transparent);border-top:0;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(16px);box-shadow:0 12px 30px rgba(0,0,0,.14)}
      .cl-toolbar-body{min-height:42px;gap:18px}.cl-toolbar-head{gap:10px}.cl-header-logo{height:30px;max-width:170px}.cl-breadcrumbs{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .cl-tools{padding-left:10px;border-left:1px solid var(--border);gap:6px}.cl-tool-btn{height:34px;border-radius:7px;padding:0 10px}.cl-tool-btn .ms-icon{font-size:17px}.cl-tool-btn:hover{box-shadow:0 0 0 1px color-mix(in srgb,var(--accent) 28%,transparent)}
      .cl-github-link{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--border);border-radius:7px;background:var(--surface-2);color:var(--muted);margin-left:2px}.cl-github-link:hover{color:var(--text);border-color:var(--accent)}.cl-github-mark{width:17px;height:17px;fill:currentColor}
      .cl-toolbar-toggle{height:30px;width:30px}.toolbar-collapsed{padding-bottom:9px}.toolbar-collapsed .cl-toolbar-toggle{margin-left:auto}
      .cl-content{scroll-margin-top:86px}.cl-source-status{margin-top:34px}.cl-doc-page-link{border-color:var(--border);background:var(--surface-2)}
      @media(max-width:980px){.cl-toolbar{margin:0 -10px 24px;padding:9px 10px}.cl-tools{border-left:0;padding-left:0}.cl-tool-btn span:last-child{display:none}.cl-tool-btn{width:36px;padding:0}.cl-github-link{width:36px;height:36px}.cl-breadcrumbs{display:none}}
      @media(max-width:620px){.cl-toolbar{margin:0 -8px 22px;padding:8px}.cl-toolbar-body{gap:10px}.cl-tools{gap:5px;overflow-x:auto;flex-wrap:nowrap}.cl-header-logo{max-width:125px;height:26px}.cl-toolbar-toggle{display:none}.cl-tools{margin-left:auto}}
    `
    document.head.appendChild(style)
  }

  function runBrandEnhancement() {
    injectRegistryLink()
    injectRegistryLinkOnPortfolio()
    enhancePortfolioCards()
    installBrandStyles()
    installDocumentationChrome()
    applyDocumentBranding()
  }

  runBrandEnhancement()
  const observer = new MutationObserver(() => runBrandEnhancement())
  const contentRoot = document.querySelector('.cl-content')
  if (contentRoot) observer.observe(contentRoot, { childList: true, subtree: true })
  window.addEventListener('hashchange', runBrandEnhancement)
})()

;(() => {
  const currentScript = document.currentScript
  const dataUrl = currentScript?.dataset?.labsData || 'assets/labs-data.json'

  const canonicalDocsHref = (sourcePath = '') => {
    const path = String(sourcePath || '').replace(/^\/+/, '').replace(/^docs\/crownlabsbible\//, '')
    return path ? `../docs/crownlabsbible/docs/viewer.html?doc=${encodeURIComponent(path)}` : '../docs/crownlabsbible/docs/index.html'
  }

  const assetMap = {
    'crowncode-ai': { src: '../assets/images/Updated icon.PNG', alt: 'CrownCode.ai' },
    'ai-cherry-pie': { src: '../assets/images/icon-master.PNG', alt: 'AI Cherry Pie' },
    'crown-psychology': { src: '../assets/images/Untitled%20design.png', alt: 'Crown Psychology' },
    'crown-sos': { src: '../emergency-911/CrownSOS-icon.PNG', alt: 'Crown SOS' },
    'crown-watchtower': { src: '../assets/images/05320CFA-0D08-4630-B4D0-40FF84B542D3.png', alt: 'Crown WatchTower' },
    'crowncast': { src: '../assets/images/IMG_0267.png', alt: 'CrownCast' },
    'sentinel-vault': { src: '../assets/images/893D3E8C-43EC-4D55-B640-795BFCBFCCF8.png', alt: 'Sentinel Vault' },
    'voxvector': { src: '../VoxVector/Assets/voxvector-icon-final-color.png.PNG', alt: 'VoxVector' }
  }

  const createElement = (tag, className, text) => {
    const node = document.createElement(tag)
    if (className) node.className = className
    if (text !== undefined) node.textContent = text
    return node
  }

  const appendTextPair = (parent, label, value) => {
    const item = createElement('div')
    item.append(createElement('strong', null, label), createElement('span', null, value || '—'))
    parent.append(item)
  }

  const setYear = () => {
    const node = document.getElementById('labs-year')
    if (node) node.textContent = String(new Date().getFullYear())
  }

  const drawScrollProgress = () => {
    const progress = document.querySelector('.scroll-progress')
    if (!progress) return
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const value = max > 0 ? (window.scrollY / max) * 100 : 0
      progress.style.width = `${Math.min(100, Math.max(0, value))}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
  }

  const appendProductIdentity = (article, product) => {
    const asset = assetMap[product.id]
    const identity = createElement('div', 'product-identity')
    const media = createElement('div', 'product-mark')
    if (asset) {
      const img = document.createElement('img')
      img.src = asset.src
      img.alt = asset.alt
      img.loading = 'lazy'
      img.decoding = 'async'
      media.append(img)
    } else {
      media.append(createElement('span', 'product-mark-placeholder', (product.name || '?').slice(0, 1)))
    }
    identity.append(media)
    article.prepend(identity)
  }

  const compactProductTemplate = (product) => {
    const article = createElement('article', 'featured-product-card')
    article.dataset.id = product.id

    const top = createElement('div', 'featured-product-top')
    top.append(createElement('span', 'badge', product.status || 'Documented'))
    top.append(createElement('span', 'readiness-chip', product.readiness ? `${product.readiness}%` : 'Documented'))

    article.append(top)
    appendProductIdentity(article, product)
    article.append(createElement('h3', null, product.name || product.id))
    article.append(createElement('p', 'subtitle', product.categoryLabel || product.category || 'Crown Labs product'))
    article.append(createElement('p', null, product.oneLiner || product.tagline || ''))

    const actions = createElement('div', 'card-actions')
    const brief = createElement('a', 'text-link', 'Brief')
    brief.href = product.detailUrl?.replace(/^labs\//, '') || `products/${product.id}.html`
    const docs = createElement('a', 'text-link muted', 'Docs')
    docs.href = canonicalDocsHref(product.sourcePath)
    actions.append(brief, docs)
    article.append(actions)
    return article
  }

  const updateMetrics = (items) => {
    const total = document.getElementById('total-products')
    const beta = document.getElementById('active-beta')
    const avg = document.getElementById('avg-readiness')
    if (!total || !beta || !avg) return
    total.textContent = String(items.length)
    beta.textContent = String(items.filter((item) => /beta|active|functional/i.test(item.status || '')).length)
    const readiness = items.map((item) => Number(item.readiness || 0)).filter(Number.isFinite)
    const avgValue = readiness.length ? Math.round(readiness.reduce((sum, value) => sum + value, 0) / readiness.length) : 0
    avg.textContent = `${avgValue}%`
  }

  const loadProducts = async () => {
    const response = await fetch(`${dataUrl}${dataUrl.includes('?') ? '&' : '?'}v=${Date.now()}`, { cache: 'no-store' })
    if (!response.ok) throw new Error(`Portfolio data request failed: ${response.status}`)
    const payload = await response.json()
    if (!Array.isArray(payload.products)) throw new Error('Portfolio data payload is missing products')
    return payload.products.slice().sort((a, b) => (b.priority || 0) - (a.priority || 0))
  }

  const initFeaturedProducts = async (products) => {
    const grid = document.getElementById('featured-products')
    const empty = document.getElementById('empty-state')
    if (!grid) return false
    grid.replaceChildren(...products.map(compactProductTemplate))
    if (empty) empty.hidden = products.length > 0
    updateMetrics(products)
    return true
  }

  const initProducts = async () => {
    const products = await loadProducts()
    await initFeaturedProducts(products)
  }

  setYear()
  drawScrollProgress()
  initProducts().catch((error) => {
    console.error('Failed to initialize Crown Labs products', error)
    const empty = document.getElementById('empty-state')
    if (empty) {
      empty.hidden = false
      empty.textContent = 'Portfolio data could not be loaded right now. Open the canonical portfolio record for the current product inventory.'
      const link = document.createElement('a')
      link.className = 'text-link'
      link.href = '../docs/crownlabsbible/docs/index.html'
      link.textContent = ' Open the Crown Labs Bible'
      empty.append(link)
    }
  })
})()

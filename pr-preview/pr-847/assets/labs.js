;(() => {
  const currentScript = document.currentScript
  const dataUrl = currentScript?.dataset?.labsData || 'assets/labs-data.json'

  const createElement = (tag, className, text) => {
    const node = document.createElement(tag)
    if (className) node.className = className
    if (text !== undefined) node.textContent = text
    return node
  }

  const appendTextPair = (parent, label, value) => {
    const item = createElement('div')
    const strong = createElement('strong', null, label)
    const span = createElement('span', null, value || '—')
    item.append(strong, span)
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

  const productTemplate = (product) => {
    const article = createElement('article', 'product-card')
    article.dataset.id = product.id

    const head = createElement('div', 'card-head')
    const titleWrap = createElement('div')
    titleWrap.append(createElement('span', 'badge', product.status || 'Documented'))
    titleWrap.append(createElement('h2', null, product.name || product.id))
    titleWrap.append(
      createElement('p', 'subtitle', product.categoryLabel || product.category || 'Crown Labs')
    )
    head.append(titleWrap, createElement('span', 'badge', product.category || 'Canonical'))

    const summary = createElement('p', null, product.oneLiner || product.tagline || '')
    const bullets = createElement('ul', 'bullets')
    ;(product.bullets || [])
      .slice(0, 4)
      .forEach((item) => bullets.append(createElement('li', null, item)))

    const meta = createElement('div', 'meta')
    appendTextPair(meta, 'Readiness', product.readiness ? `${product.readiness}%` : '—')
    appendTextPair(meta, 'Time to market', product.timeToMarket || 'Canonical dossier active')
    appendTextPair(meta, 'Source', product.sourcePath || 'docs/crownlabsbible/')

    const actions = createElement('div', 'card-actions')
    const brief = createElement('a', 'text-link', 'View public brief')
    brief.href = product.detailUrl || `labs/products/${product.id}.html`
    const docs = createElement('a', 'text-link muted', 'Open source dossier')
    docs.href = product.sourcePath || 'docs/crownlabsbible/'
    actions.append(brief, docs)

    article.append(head, summary, bullets, meta, actions)
    return article
  }

  const compactProductTemplate = (product) => {
    const article = createElement('article', 'featured-product-card')
    article.dataset.id = product.id

    const top = createElement('div', 'featured-product-top')
    top.append(createElement('span', 'badge', product.status || 'Documented'))
    top.append(
      createElement('span', 'readiness-chip', product.readiness ? `${product.readiness}%` : 'Docs')
    )

    article.append(top)
    article.append(createElement('h3', null, product.name || product.id))
    article.append(
      createElement(
        'p',
        'subtitle',
        product.categoryLabel || product.category || 'Crown Labs system'
      )
    )
    article.append(createElement('p', null, product.oneLiner || product.tagline || ''))

    const actions = createElement('div', 'card-actions')
    const brief = createElement('a', 'text-link', 'Brief')
    brief.href = product.detailUrl?.replace(/^labs\//, '') || `products/${product.id}.html`
    const docs = createElement('a', 'text-link muted', 'Docs')
    docs.href = product.sourcePath ? `../${product.sourcePath}` : '../docs/crownlabsbible/'
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
    beta.textContent = String(
      items.filter((item) => /beta|active|functional/i.test(item.status || '')).length
    )
    const readiness = items
      .map((item) => Number(item.readiness || 0))
      .filter((value) => Number.isFinite(value))
    const avgValue = readiness.length
      ? Math.round(readiness.reduce((sum, value) => sum + value, 0) / readiness.length)
      : 0
    avg.textContent = `${avgValue}%`
  }

  const loadProducts = async () => {
    const response = await fetch(dataUrl)
    const payload = await response.json()
    return (payload.products || []).sort((a, b) => (b.priority || 0) - (a.priority || 0))
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

  const initPortfolio = async (products) => {
    const grid = document.getElementById('portfolio')
    const empty = document.getElementById('empty-state')
    const search = document.getElementById('search')
    const statusFilter = document.getElementById('status-filter')
    const categoryFilter = document.getElementById('category-filter')
    if (!grid || !search || !statusFilter || !categoryFilter || !empty) return false

    const statuses = [...new Set(products.map((item) => item.status).filter(Boolean))]
    const categories = [...new Set(products.map((item) => item.category).filter(Boolean))]

    statuses.forEach((status) => {
      const option = document.createElement('option')
      option.value = status
      option.textContent = status
      statusFilter.append(option)
    })

    categories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category
      option.textContent = category
      categoryFilter.append(option)
    })

    const render = () => {
      const term = search.value.trim().toLowerCase()
      const status = statusFilter.value
      const category = categoryFilter.value
      const filtered = products.filter((product) => {
        const content = [
          product.name,
          product.category,
          product.categoryLabel,
          product.sourcePath,
          ...(product.keywords || []),
        ]
          .join(' ')
          .toLowerCase()
        const searchMatch = !term || content.includes(term)
        const statusMatch = status === 'all' || product.status === status
        const categoryMatch = category === 'all' || product.category === category
        return searchMatch && statusMatch && categoryMatch
      })

      grid.replaceChildren(...filtered.map(productTemplate))
      empty.hidden = filtered.length > 0
      updateMetrics(filtered)
    }

    search.addEventListener('input', render)
    statusFilter.addEventListener('change', render)
    categoryFilter.addEventListener('change', render)
    render()
    return true
  }

  const initProducts = async () => {
    const products = await loadProducts()
    const didRenderFeatured = await initFeaturedProducts(products)
    const didRenderPortfolio = await initPortfolio(products)
    if (!didRenderFeatured && !didRenderPortfolio) updateMetrics(products)
  }

  setYear()
  drawScrollProgress()
  initProducts().catch((error) => {
    console.error('Failed to initialize Crown Labs products', error)
    const empty = document.getElementById('empty-state')
    if (empty) empty.hidden = false
  })
})()

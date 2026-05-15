;(() => {
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
    const bullets = (product.bullets || []).map((item) => `<li>${item}</li>`).join('')
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-head">
          <div>
            <span class="badge">${product.status}</span>
            <h2>${product.name}</h2>
            <p class="subtitle">${product.categoryLabel || product.category}</p>
          </div>
          <span class="badge">${product.category}</span>
        </div>
        <p>${product.oneLiner}</p>
        <ul class="bullets">${bullets}</ul>
        <div class="meta">
          <div><strong>Readiness</strong><span>${product.readiness || '—'}%</span></div>
          <div><strong>Time to market</strong><span>${product.timeToMarket || '—'}</span></div>
          <div><strong>Projected value</strong><span>${product.valuationProjected || '—'}</span></div>
        </div>
      </article>`
  }

  const initPortfolio = async () => {
    const grid = document.getElementById('portfolio')
    const empty = document.getElementById('empty-state')
    const search = document.getElementById('search')
    const statusFilter = document.getElementById('status-filter')
    const categoryFilter = document.getElementById('category-filter')
    if (!grid || !search || !statusFilter || !categoryFilter || !empty) return

    const response = await fetch('assets/labs-data.json')
    const payload = await response.json()
    const products = (payload.products || []).sort((a, b) => (b.priority || 0) - (a.priority || 0))

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

    const updateMetrics = (items) => {
      const total = document.getElementById('total-products')
      const beta = document.getElementById('active-beta')
      const avg = document.getElementById('avg-readiness')
      if (!total || !beta || !avg) return
      total.textContent = String(items.length)
      beta.textContent = String(items.filter((item) => /beta/i.test(item.status || '')).length)
      const readiness = items
        .map((item) => Number(item.readiness || 0))
        .filter((value) => Number.isFinite(value))
      const avgValue = readiness.length
        ? Math.round(readiness.reduce((sum, value) => sum + value, 0) / readiness.length)
        : 0
      avg.textContent = `${avgValue}%`
    }

    const render = () => {
      const term = search.value.trim().toLowerCase()
      const status = statusFilter.value
      const category = categoryFilter.value
      const filtered = products.filter((product) => {
        const content = [
          product.name,
          product.category,
          product.categoryLabel,
          ...(product.keywords || []),
        ]
          .join(' ')
          .toLowerCase()
        const searchMatch = !term || content.includes(term)
        const statusMatch = status === 'all' || product.status === status
        const categoryMatch = category === 'all' || product.category === category
        return searchMatch && statusMatch && categoryMatch
      })

      grid.innerHTML = filtered.map(productTemplate).join('')
      empty.hidden = filtered.length > 0
      updateMetrics(filtered)
    }

    search.addEventListener('input', render)
    statusFilter.addEventListener('change', render)
    categoryFilter.addEventListener('change', render)
    render()
  }

  setYear()
  drawScrollProgress()
  initPortfolio().catch((error) => {
    console.error('Failed to initialize portfolio', error)
  })
})()

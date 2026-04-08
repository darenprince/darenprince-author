const dom = {
  grid: document.getElementById('product-grid'),
  kpiCount: document.getElementById('kpi-count'),
  kpiBeta: document.getElementById('kpi-beta'),
  kpiCategories: document.getElementById('kpi-categories'),
  kpiValuation: document.getElementById('kpi-valuation'),
  themeToggle: document.getElementById('theme-toggle'),
}

const setTheme = (mode) => {
  const isLight = mode === 'light'
  document.body.classList.toggle('theme-light', isLight)
  dom.themeToggle?.setAttribute('aria-pressed', String(isLight))
  localStorage.setItem('labs-theme', mode)
}

setTheme(localStorage.getItem('labs-theme') || 'dark')
dom.themeToggle?.addEventListener('click', () => {
  setTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light')
})

const currencyHigh = (value = '') => {
  const matches = value.match(/\$(\d+(?:\.\d+)?)M\s*[–-]\s*\$(\d+(?:\.\d+)?)M/i)
  if (!matches) return 0
  return Number(matches[2])
}

const render = (products) => {
  dom.kpiCount.textContent = String(products.length)
  dom.kpiBeta.textContent = String(
    products.filter((item) => ['Beta', 'Stage 1 Beta'].includes(item.status)).length
  )
  dom.kpiCategories.textContent = String(new Set(products.map((item) => item.category)).size)
  dom.kpiValuation.textContent = `$${products
    .reduce((sum, item) => sum + currencyHigh(item.valuationProjected || item.growthLabel), 0)
    .toFixed(0)}M`

  dom.grid.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <div class="badges">
          <span class="badge">${product.status}</span>
          <span class="badge">${product.category}</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.oneLiner || product.description}</p>
        <ul class="metrics">
          ${(product.metrics || [])
            .slice(0, 3)
            .map((metric) => `<li>${metric.label}: ${metric.value}</li>`)
            .join('')}
        </ul>
        <div class="product-card__footer">
          <small>${product.valuationProjected || product.growthLabel || 'Valuation pending'}</small>
          <a href="labs/products/${product.id}.html">Open brief →</a>
        </div>
      </article>
    `
    )
    .join('')
}

fetch('assets/labs-data.json', { cache: 'no-store' })
  .then((response) => response.json())
  .then((data) => render(data.products || []))
  .catch(() => {
    dom.grid.innerHTML = '<p>Unable to load labs portfolio right now.</p>'
  })

function getAssetPrefix() {
  return document.documentElement?.dataset?.assetPrefix || ''
}

function prefixedPath(path) {
  if (!path.startsWith('/')) return path
  return `${getAssetPrefix()}${path}`
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const worker = new Worker(prefixedPath('/src/search/worker.js'), { type: 'module' })
let params = new URLSearchParams(location.search)
let q = (params.get('q') || '').trim()
let category = params.get('category') || 'all'
let sort = params.get('sort') || 'relevance'
let page = parseInt(params.get('page') || '1', 10)
const limit = 20

const root = document.querySelector('[data-search-results]')
const input = root?.querySelector('input[name="q"]')
const filterButtons = document.querySelectorAll('.filters [data-filter]')
const sortSelect = document.querySelector('[data-sort]')
const resultsList = document.getElementById('results')
const summary = document.querySelector('.summary')
const pager = document.querySelector('.pager')

if (!root || !input || !resultsList || !summary || !pager || !sortSelect) {
  throw new Error('Search results shell is missing required DOM nodes.')
}

input.value = q

filterButtons.forEach((btn) => {
  if (btn.dataset.filter === category) btn.classList.add('is-active')
  btn.addEventListener('click', () => {
    category = btn.dataset.filter
    page = 1
    filterButtons.forEach((node) => node.classList.toggle('is-active', node === btn))
    update()
  })
})

sortSelect.value = sort
sortSelect.addEventListener('change', () => {
  sort = sortSelect.value
  page = 1
  update()
})

document.querySelector('.search-bar')?.addEventListener('submit', (event) => {
  event.preventDefault()
  q = input.value.trim()
  page = 1
  update()
})

window.addEventListener('popstate', () => {
  params = new URLSearchParams(location.search)
  q = (params.get('q') || '').trim()
  category = params.get('category') || 'all'
  sort = params.get('sort') || 'relevance'
  page = parseInt(params.get('page') || '1', 10)

  input.value = q
  sortSelect.value = sort
  filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.filter === category))
  runQuery(false)
})

worker.addEventListener('error', () => {
  summary.textContent = 'Search index unavailable right now. Please try again shortly.'
})

worker.addEventListener('message', (event) => {
  if (event.data.type === 'results') {
    render(event.data)
  }
})

function update() {
  params = new URLSearchParams({ q, category, sort, page: String(page) })
  history.pushState({}, '', `?${params.toString()}`)
  runQuery(true)
}

function runQuery(scrollToTop) {
  if (!q) {
    resultsList.innerHTML = ''
    pager.innerHTML = ''
    summary.textContent = 'Start typing to search across pages and content.'
    return
  }

  worker.postMessage({
    type: 'search',
    q,
    limit,
    offset: (page - 1) * limit,
    filters: { category },
    sort,
  })

  if (scrollToTop) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function render(data) {
  resultsList.innerHTML = ''

  if (!q) {
    summary.textContent = 'Start typing to search across pages and content.'
    pager.innerHTML = ''
    return
  }

  if (!data.results.length) {
    summary.textContent = `No results found for “${q}”. Try broader keywords.`
    pager.innerHTML = ''
    return
  }

  summary.textContent = `${data.total} result${data.total === 1 ? '' : 's'} for “${q}” · ${Math.round(
    data.tookMs
  )}ms`

  data.results.forEach((result) => {
    const item = document.createElement('li')
    item.className = 'result'
    const href = result.url?.startsWith('/') ? prefixedPath(result.url) : result.url
    item.innerHTML = `
      <a href="${escapeHtml(href || '#')}">
        <h3>${escapeHtml(result.title || 'Untitled')}</h3>
        <p class="snippet">${escapeHtml(result.snippet || result.description || '')}</p>
        <div class="meta"><span class="chip">${escapeHtml(result.category || 'Page')}</span></div>
      </a>
    `
    resultsList.appendChild(item)
  })

  renderPager(data.total)
}

function renderPager(total) {
  const totalPages = Math.ceil(total / limit)
  pager.innerHTML = ''
  if (totalPages <= 1) return

  const buildButton = (label, targetPage, disabled = false) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = label
    button.disabled = disabled
    button.addEventListener('click', () => {
      if (disabled) return
      page = targetPage
      update()
    })
    return button
  }

  pager.appendChild(buildButton('Prev', page - 1, page <= 1))

  const indicator = document.createElement('span')
  indicator.textContent = `Page ${page} of ${totalPages}`
  pager.appendChild(indicator)

  pager.appendChild(buildButton('Next', page + 1, page >= totalPages))
}

runQuery(false)

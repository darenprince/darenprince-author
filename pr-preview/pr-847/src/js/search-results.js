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

function safeSnippet(value = '') {
  return escapeHtml(value).replace(/\b([A-Za-z0-9_-]{2,})\b/g, '$1')
}

const worker = new Worker(prefixedPath('/src/search/worker.js'), { type: 'module' })
let params = new URLSearchParams(location.search)
let q = params.get('q') || ''
let category = params.get('category') || 'all'
let sort = params.get('sort') || 'relevance'
let page = parseInt(params.get('page') || '1', 10)
const limit = 20

const input = document.querySelector('[data-search-results] input[name="q"]')
const filterButtons = document.querySelectorAll('.filters [data-filter]')
const sortSelect = document.querySelector('[data-sort]')
const resultsList = document.getElementById('results')
const summary = document.querySelector('.summary')
const pager = document.querySelector('.pager')

if (!Number.isFinite(page) || page < 1) page = 1

input.value = q
filterButtons.forEach((btn) => {
  if (btn.dataset.filter === category) btn.classList.add('is-active')
  btn.addEventListener('click', () => {
    category = btn.dataset.filter
    page = 1
    filterButtons.forEach((node) => node.classList.remove('is-active'))
    btn.classList.add('is-active')
    update()
  })
})

sortSelect.value = sort
sortSelect.addEventListener('change', () => {
  sort = sortSelect.value
  page = 1
  update()
})

document.querySelector('.search-bar').addEventListener('submit', (e) => {
  e.preventDefault()
  q = input.value.trim()
  page = 1
  update()
})

window.addEventListener('popstate', () => {
  params = new URLSearchParams(location.search)
  q = params.get('q') || ''
  category = params.get('category') || 'all'
  sort = params.get('sort') || 'relevance'
  page = parseInt(params.get('page') || '1', 10)
  input.value = q
  update(true)
})

function update(fromHistory = false) {
  const nextParams = new URLSearchParams()
  if (q) nextParams.set('q', q)
  if (category !== 'all') nextParams.set('category', category)
  if (sort !== 'relevance') nextParams.set('sort', sort)
  if (page > 1) nextParams.set('page', String(page))

  if (!fromHistory) {
    const query = nextParams.toString()
    const nextUrl = query ? `?${query}` : location.pathname
    history.pushState({}, '', nextUrl)
  }

  worker.postMessage({
    type: 'search',
    q,
    limit,
    offset: (page - 1) * limit,
    filters: { category },
    sort,
  })
}

worker.addEventListener('message', (e) => {
  if (e.data.type === 'results') {
    render(e.data)
  }
})

function render(data) {
  resultsList.innerHTML = ''
  pager.innerHTML = ''

  if (!q) {
    summary.textContent = 'Start typing to search across pages and content.'
    return
  }

  if (!data.results.length) {
    summary.textContent = 'No results found. Try different keywords.'
    return
  }

  summary.textContent = `${data.total} results · ${Math.round(data.tookMs)}ms`
  data.results.forEach((r) => {
    const li = document.createElement('li')
    li.className = 'result'
    const href = r.url?.startsWith('/') ? prefixedPath(r.url) : r.url
    li.innerHTML = `<a href="${escapeHtml(href || '#')}"><h3>${escapeHtml(
      r.title || 'Untitled'
    )}</h3><p class="snippet">${safeSnippet(r.snippet || '')}</p><div class="meta"><span class="chip">${escapeHtml(
      r.category || 'Page'
    )}</span></div></a>`
    resultsList.appendChild(li)
  })

  renderPager(data.total)
}

function renderPager(total) {
  const pages = Math.ceil(total / limit)
  if (pages <= 1) return

  if (page > 1) {
    const prev = document.createElement('a')
    prev.href = '#'
    prev.textContent = 'Prev'
    prev.addEventListener('click', (e) => {
      e.preventDefault()
      page--
      update()
      window.scrollTo(0, 0)
    })
    pager.appendChild(prev)
  }

  const indicator = document.createElement('span')
  indicator.className = 'pager__status'
  indicator.textContent = `Page ${page} of ${pages}`
  pager.appendChild(indicator)

  if (page < pages) {
    const next = document.createElement('a')
    next.href = '#'
    next.textContent = 'Next'
    next.addEventListener('click', (e) => {
      e.preventDefault()
      page++
      update()
      window.scrollTo(0, 0)
    })
    pager.appendChild(next)
  }
}

update()

import MiniSearch from 'minisearch'

let miniSearch = null
let docs = []
let docsById = new Map()
let loaded = false

async function load() {
  if (loaded) return

  const basePrefix = self.location.pathname.includes('/src/search/')
    ? self.location.pathname.split('/src/search/')[0]
    : ''

  const [docsRes, indexRes] = await Promise.all([
    fetch(`${basePrefix}/search/docs.json`).then((r) => r.json()),
    fetch(`${basePrefix}/search/index.json`).then((r) => r.json()),
  ])

  docs = Array.isArray(docsRes) ? docsRes : []
  docsById = new Map(docs.map((doc) => [doc.id, doc]))

  miniSearch = MiniSearch.loadJSON(indexRes, {
    fields: ['title', 'headings', 'content', 'tags', 'category'],
    storeFields: ['title', 'url', 'description', 'date', 'category', 'tags', 'content'],
  })

  loaded = true
}

function makeSnippet(content, terms) {
  const text = content || ''
  if (!terms.length) return text.slice(0, 160)

  const idx = terms
    .map((t) => text.toLowerCase().indexOf(t.toLowerCase()))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0]

  if (idx === undefined) return text.slice(0, 160)

  const start = Math.max(0, idx - 80)
  const end = start + 160
  return text.slice(start, end)
}

self.addEventListener('message', async (e) => {
  const msg = e.data

  if (msg.type === 'warmup' || msg.type === 'init') {
    await load()
    self.postMessage({ type: 'ready' })
    return
  }

  if (msg.type === 'search') {
    await load()

    const t0 = performance.now()
    const { q = '', limit = 8, offset = 0, filters = {}, sort = 'relevance' } = msg
    const cleanQuery = q.trim()

    if (!cleanQuery) {
      self.postMessage({ type: 'results', results: [], total: 0, tookMs: performance.now() - t0 })
      return
    }

    const searchOptions = { limit: limit + offset, combineWith: 'AND', prefix: true, fuzzy: 0.15 }

    if (filters.category && filters.category !== 'all') {
      searchOptions.filter = (r) => r.category === filters.category
    }

    const strictResults = miniSearch.search(cleanQuery, searchOptions)
    const relaxedResults = strictResults.length
      ? strictResults
      : miniSearch.search(cleanQuery, { ...searchOptions, combineWith: 'OR' })

    const filtered = [...relaxedResults]
    if (sort === 'date') {
      filtered.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    }

    const sliced = filtered.slice(offset, offset + limit)
    const mapped = sliced.map((r) => {
      const doc = docsById.get(r.id) || {}
      return {
        id: r.id,
        url: doc.url,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        tags: doc.tags,
        score: r.score,
        snippet: makeSnippet(doc.content, cleanQuery.split(/\s+/).filter(Boolean)),
      }
    })

    self.postMessage({
      type: 'results',
      results: mapped,
      total: filtered.length,
      tookMs: performance.now() - t0,
    })
  }
})

import MiniSearch from 'minisearch';

let miniSearch = null;
let docs = [];
let loaded = false;

async function load() {
  if (loaded) return;
  const [docsRes, indexRes] = await Promise.all([
    fetch('/search/docs.json').then(r => r.json()),
    fetch('/search/index.json').then(r => r.json())
  ]);
  docs = docsRes;
  miniSearch = MiniSearch.loadJSON(indexRes, {
    fields: ['title', 'headings', 'content', 'tags', 'category'],
    storeFields: ['title', 'url', 'description', 'date', 'category', 'tags', 'content']
  });
  loaded = true;
}

function makeSnippet(content, terms) {
  const text = content || '';
  const idx = terms
    .map(t => text.toLowerCase().indexOf(t.toLowerCase()))
    .filter(i => i >= 0)
    .sort((a, b) => a - b)[0];
  if (idx === undefined) return text.slice(0, 160);
  const start = Math.max(0, idx - 80);
  const end = start + 160;
  return text.slice(start, end);
}

self.addEventListener('message', async e => {
  const msg = e.data;
  if (msg.type === 'warmup' || msg.type === 'init') {
    await load();
    self.postMessage({ type: 'ready' });
    return;
  }
  if (msg.type === 'search') {
    await load();
    const t0 = performance.now();
    const { q, limit = 8, offset = 0, filters = {}, sort = 'relevance' } = msg;
    const searchOptions = { limit: limit + offset, combineWith: 'AND' };
    if (filters.category && filters.category !== 'all') {
      searchOptions.filter = (r) => r.category === filters.category;
    }
    const results = miniSearch.search(q, searchOptions);
    let filtered = results;
    if (sort === 'date') {
      filtered.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    }
    const sliced = filtered.slice(offset, offset + limit);
    const tookMs = performance.now() - t0;
    const mapped = sliced.map(r => {
      const doc = docs.find(d => d.id === r.id) || {};
      const snippet = makeSnippet(doc.content, q.split(/\s+/));
      return {
        id: r.id,
        url: doc.url,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        tags: doc.tags,
        score: r.score,
        snippet,
        highlights: r.match.map(m => ({ field: m.field, text: m.snippet }))
      };
    });
    self.postMessage({
      type: 'results',
      results: mapped,
      total: filtered.length,
      tookMs
    });
  }
  if (msg.type === 'suggest') {
    await load();
    const results = miniSearch.search(msg.q, { limit: msg.limit || 5 });
    const suggestions = results.map(r => {
      const doc = docs.find(d => d.id === r.id) || {};
      return { id: r.id, url: doc.url, title: doc.title };
    });
    self.postMessage({ type: 'suggestions', suggestions });
  }
});

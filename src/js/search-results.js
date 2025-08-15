const worker = new Worker('/src/search/worker.js', { type: 'module' });
let params = new URLSearchParams(location.search);
let q = params.get('q') || '';
let category = params.get('category') || 'all';
let sort = params.get('sort') || 'relevance';
let page = parseInt(params.get('page') || '1', 10);
const limit = 20;

const input = document.querySelector('[data-search-results] input[name="q"]');
const filterButtons = document.querySelectorAll('.filters [data-filter]');
const sortSelect = document.querySelector('[data-sort]');
const resultsList = document.getElementById('results');
const summary = document.querySelector('.summary');
const pager = document.querySelector('.pager');

input.value = q;
filterButtons.forEach(btn => {
  if (btn.dataset.filter === category) btn.classList.add('is-active');
  btn.addEventListener('click', e => {
    category = btn.dataset.filter;
    update();
  });
});

sortSelect.value = sort;
sortSelect.addEventListener('change', () => {
  sort = sortSelect.value;
  update();
});

document.querySelector('.search-bar').addEventListener('submit', e => {
  e.preventDefault();
  q = input.value.trim();
  page = 1;
  update();
});

function update() {
  params = new URLSearchParams({ q, category, sort, page });
  history.pushState({}, '', `?${params.toString()}`);
  worker.postMessage({ type: 'search', q, limit, offset: (page - 1) * limit, filters: { category }, sort });
}

worker.addEventListener('message', e => {
  if (e.data.type === 'results') {
    render(e.data);
  }
});

function render(data) {
  resultsList.innerHTML = '';
  if (!data.results.length) {
    summary.textContent = 'No results found. Try different keywords.';
    return;
  }
  summary.textContent = `${data.total} results`; 
  data.results.forEach(r => {
    const li = document.createElement('li');
    li.className = 'result';
    li.innerHTML = `<a href="${r.url}"><h3>${r.title}</h3><p class="snippet">${r.snippet}</p><div class="meta"><span class="chip">${r.category || ''}</span></div></a>`;
    resultsList.appendChild(li);
  });
  renderPager(data.total);
}

function renderPager(total) {
  const pages = Math.ceil(total / limit);
  pager.innerHTML = '';
  if (pages <= 1) return;
  if (page > 1) {
    const prev = document.createElement('a');
    prev.href = '#';
    prev.textContent = 'Prev';
    prev.addEventListener('click', e => { e.preventDefault(); page--; update(); window.scrollTo(0,0); });
    pager.appendChild(prev);
  }
  if (page < pages) {
    const next = document.createElement('a');
    next.href = '#';
    next.textContent = 'Next';
    next.addEventListener('click', e => { e.preventDefault(); page++; update(); window.scrollTo(0,0); });
    pager.appendChild(next);
  }
}

update();

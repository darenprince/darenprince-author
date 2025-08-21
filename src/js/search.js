const SEARCH_WORKER_URL = '/src/search/worker.js';

const worker = new Worker(SEARCH_WORKER_URL, { type: 'module' });
let results = [];
let activeIndex = -1;
let dropdown, input;
let recent = JSON.parse(localStorage.getItem('recent-searches') || '[]');
const trending = ['ebook', 'audio', 'print'];

function saveRecent(term) {
  term = term.trim();
  if (!term) return;
  recent = [term, ...recent.filter(t => t !== term)].slice(0, 6);
  localStorage.setItem('recent-searches', JSON.stringify(recent));
}

function renderList(items, query) {
  dropdown.innerHTML = '';
  if (!items.length && !query) {
    if (recent.length) {
      dropdown.innerHTML += `<div class="c-search__group"><h4>Recent</h4><ul>${recent
        .map((r, i) => `<li role="option" data-index="${i}">${r}</li>`) 
        .join('')}</ul></div>`;
    }
    dropdown.innerHTML += `<div class="c-search__group"><h4>Trending</h4><ul>${trending
      .map((t, i) => `<li role="option" data-index="${recent.length + i}">${t}</li>`)
      .join('')}</ul></div>`;
    dropdown.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    return;
  }

    const list = items
      .map((item, i) => `<div class="c-search__item" role="option" id="s-${i}" data-url="${item.url}" data-index="${i}"><span>${item.title}</span></div>`)
      .join('');
    dropdown.innerHTML = list + `<div class="c-search__item c-search__item--all" role="option" data-all="true">View all results</div>`;
  dropdown.hidden = false;
  input.setAttribute('aria-expanded', 'true');
}

function close() {
  dropdown.hidden = true;
  input.setAttribute('aria-expanded', 'false');
  activeIndex = -1;
}

function onInput() {
  const q = input.value.trim();
  if (!q) {
    renderList([], '');
    return;
  }
  worker.postMessage({ type: 'search', q, limit: 7 });
  window.dispatchEvent(new CustomEvent('search:typed', { detail: { q } }));
}

worker.addEventListener('message', e => {
  if (e.data.type === 'results') {
    results = e.data.results;
    renderList(results, input.value.trim());
  }
});

function onKeyDown(e) {
  const items = dropdown.querySelectorAll('[role="option"]');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % items.length;
    setActive(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    setActive(items);
  } else if (e.key === 'Enter') {
    if (activeIndex >= 0 && items[activeIndex]) {
      const item = items[activeIndex];
      if (item.dataset.all) {
        window.dispatchEvent(new CustomEvent('search:submit', { detail: { q: input.value.trim() } }));
        window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
      } else if (item.dataset.url) {
        saveRecent(input.value.trim());
        window.dispatchEvent(new CustomEvent('search:selected', { detail: { id: item.dataset.index } }));
        window.location.href = item.dataset.url;
      } else {
        input.value = item.textContent;
        saveRecent(input.value);
        window.dispatchEvent(new CustomEvent('search:selected', { detail: { id: item.dataset.index } }));
        close();
      }
    } else if (input.value.trim()) {
      saveRecent(input.value.trim());
      window.dispatchEvent(new CustomEvent('search:submit', { detail: { q: input.value.trim() } }));
      window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
    }
  } else if (e.key === 'Escape') {
    close();
  }
}

function setActive(items) {
    items.forEach(el => el.classList.remove('c-search__item--active'));
    if (activeIndex >= 0 && items[activeIndex]) {
      items[activeIndex].classList.add('c-search__item--active');
    input.setAttribute('aria-activedescendant', items[activeIndex].id);
  } else {
    input.removeAttribute('aria-activedescendant');
  }
}

export function initSearch() {
  const container = document.querySelector('[data-search]');
  if (!container) return;
  input = container.querySelector('input');
  dropdown = container.querySelector('.c-search__dropdown');

  input.addEventListener('input', debounce(onInput, 150));
  input.addEventListener('keydown', onKeyDown);
  input.addEventListener('focus', () => onInput());
  document.addEventListener('click', e => {
    if (!container.contains(e.target)) close();
  });
}

function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

document.addEventListener('DOMContentLoaded', initSearch);

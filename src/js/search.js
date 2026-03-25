function getAssetPrefix() {
  return document.documentElement?.dataset?.assetPrefix || ''
}

function prefixedPath(path) {
  if (!path.startsWith('/')) return path
  return `${getAssetPrefix()}${path}`
}

const SEARCH_WORKER_URL = prefixedPath('/src/search/worker.js')
const SEARCH_RESULTS_PATH = prefixedPath('/pages/search.html')

const worker = new Worker(SEARCH_WORKER_URL, { type: 'module' })
let results = []
let activeIndex = -1
let dropdown, input
let recent = JSON.parse(localStorage.getItem('recent-searches') || '[]')
const trending = ['book', 'relationship coaching', 'nexus who', 'crown sos']

function saveRecent(term) {
  term = term.trim()
  if (!term) return
  recent = [term, ...recent.filter((t) => t !== term)].slice(0, 6)
  localStorage.setItem('recent-searches', JSON.stringify(recent))
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function renderList(items, query) {
  dropdown.innerHTML = ''
  if (!items.length && !query) {
    if (recent.length) {
      dropdown.innerHTML += `<div class="c-search__group"><h4>Recent</h4><ul>${recent
        .map(
          (r, i) =>
            `<li class="c-search__choice" role="option" id="s-recent-${i}" data-index="${i}">${escapeHtml(r)}</li>`
        )
        .join('')}</ul></div>`
    }
    dropdown.innerHTML += `<div class="c-search__group"><h4>Trending</h4><ul>${trending
      .map(
        (t, i) =>
          `<li class="c-search__choice" role="option" id="s-trending-${i}" data-index="${recent.length + i}">${escapeHtml(t)}</li>`
      )
      .join('')}</ul></div>`
    dropdown.hidden = false
    input.setAttribute('aria-expanded', 'true')
    return
  }

  const list = items
    .map((item, i) => {
      const meta = [item.category, item.description].filter(Boolean).join(' · ')
      return `<div class="c-search__item" role="option" id="s-${i}" data-url="${item.url}" data-index="${i}">
        <span class="c-search__title">${escapeHtml(item.title || 'Untitled')}</span>
        ${meta ? `<span class="c-search__meta">${escapeHtml(meta)}</span>` : ''}
      </div>`
    })
    .join('')
  dropdown.innerHTML =
    list +
    `<div class="c-search__item c-search__all" role="option" id="s-all" data-all="true">View all results</div>`
  dropdown.hidden = false
  input.setAttribute('aria-expanded', 'true')
}

function close() {
  dropdown.hidden = true
  input.setAttribute('aria-expanded', 'false')
  activeIndex = -1
}

function onInput() {
  const q = input.value.trim()
  if (!q) {
    renderList([], '')
    return
  }
  worker.postMessage({ type: 'search', q, limit: 7 })
  window.dispatchEvent(new CustomEvent('search:typed', { detail: { q } }))
}

function goToResults(query) {
  window.location.href = `${SEARCH_RESULTS_PATH}?q=${encodeURIComponent(query)}`
}

worker.addEventListener('message', (e) => {
  if (e.data.type === 'results') {
    results = e.data.results
    renderList(results, input.value.trim())
  }
})

function onKeyDown(e) {
  const items = dropdown.querySelectorAll('[role="option"]')
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex = (activeIndex + 1) % items.length
    setActive(items)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex = (activeIndex - 1 + items.length) % items.length
    setActive(items)
  } else if (e.key === 'Enter') {
    if (activeIndex >= 0 && items[activeIndex]) {
      const item = items[activeIndex]
      if (item.dataset.all) {
        window.dispatchEvent(
          new CustomEvent('search:submit', { detail: { q: input.value.trim() } })
        )
        goToResults(input.value.trim())
      } else if (item.dataset.url) {
        saveRecent(input.value.trim())
        window.dispatchEvent(
          new CustomEvent('search:selected', { detail: { id: item.dataset.index } })
        )
        window.location.href = item.dataset.url
      } else {
        input.value = item.textContent
        saveRecent(input.value)
        window.dispatchEvent(
          new CustomEvent('search:selected', { detail: { id: item.dataset.index } })
        )
        close()
      }
    } else if (input.value.trim()) {
      saveRecent(input.value.trim())
      window.dispatchEvent(new CustomEvent('search:submit', { detail: { q: input.value.trim() } }))
      goToResults(input.value.trim())
    }
  } else if (e.key === 'Escape') {
    close()
  }
}

function setActive(items) {
  items.forEach((el) => el.classList.remove('is-active'))
  if (activeIndex >= 0 && items[activeIndex]) {
    items[activeIndex].classList.add('is-active')
    input.setAttribute('aria-activedescendant', items[activeIndex].id)
  } else {
    input.removeAttribute('aria-activedescendant')
  }
}

export function initSearch() {
  const container = document.querySelector('[data-search]')
  if (!container) return
  input = container.querySelector('input')
  dropdown = container.querySelector('.c-search__dropdown')

  input.addEventListener('input', debounce(onInput, 150))
  input.addEventListener('keydown', onKeyDown)
  input.addEventListener('focus', () => onInput())
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) close()
  })
  dropdown.addEventListener('click', (event) => {
    const option = event.target.closest('[role="option"]')
    if (!option) return
    if (option.dataset.all) {
      if (!input.value.trim()) return
      saveRecent(input.value.trim())
      goToResults(input.value.trim())
      return
    }
    if (option.dataset.url) {
      saveRecent(input.value.trim())
      window.location.href = option.dataset.url
      return
    }
    const term = option.textContent?.trim()
    if (term) {
      input.value = term
      saveRecent(term)
      goToResults(term)
    }
  })
  worker.postMessage({ type: 'warmup' })
}

function debounce(fn, delay) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

document.addEventListener('DOMContentLoaded', initSearch)

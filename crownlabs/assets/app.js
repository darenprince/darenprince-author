import { books, ethics, frameworks, philosophy, products, statuses, valuation } from './data.js'

const byId = (id) => document.getElementById(id)
const productGrid = byId('productGrid')
const philosophyGrid = document.querySelector('.philosophy')
const frameworkGrid = byId('frameworkGrid')
const booksGrid = byId('booksGrid')
const statusTable = byId('statusTable')
const valuationCards = byId('valuationCards')
const ethicsGrid = byId('ethicsGrid')

const tagClass = (value) => value.toLowerCase().replace(/\s+/g, '-')
const icon = (name) =>
  name
    ? `<span class="iconify app-icon" data-icon="${name}" data-inline="false" aria-hidden="true"></span>`
    : ''

function renderCard(item) {
  return `
    <article class="card">
      <div class="chips">
        <span class="badge ${tagClass(item.status)}">${item.status}</span>
        ${item.category ? `<span class="badge outline">${item.category}</span>` : ''}
      </div>
      <h3 class="title-with-icon">${icon(item.icon)}${item.name || item.title}</h3>
      <p>${item.summary || item.text}</p>
      ${item.gate ? `<div class="mini"><strong>Next gate:</strong> ${item.gate}</div>` : ''}
      ${item.value ? `<div class="mini"><strong>Valuation signal:</strong> ${item.value}</div>` : ''}
      ${typeof item.score === 'number' ? `<p class="score">Readiness score <span>${item.score}%</span></p>` : ''}
    </article>`
}

function renderProducts(filter = 'all', query = '') {
  const q = query.trim().toLowerCase()
  const filtered = products.filter((p) => {
    const statusMatch = filter === 'all' || p.status === filter
    const queryMatch = !q || [p.name, p.category, p.summary].join(' ').toLowerCase().includes(q)
    return statusMatch && queryMatch
  })
  productGrid.innerHTML = filtered.map(renderCard).join('')
}

philosophyGrid.innerHTML = philosophy
  .map(
    (item) => `
  <article class="card">
    <h3 class="title-with-icon">${icon(item.icon)}${item.title}</h3>
    <p class="accent">${item.highlight}</p>
    <p>${item.text}</p>
  </article>`
  )
  .join('')

frameworkGrid.innerHTML = frameworks.map(renderCard).join('')
booksGrid.innerHTML = books.map(renderCard).join('')
statusTable.innerHTML = statuses
  .map(
    ([status, meaning, gate]) =>
      `<tr><td><span class="badge ${tagClass(status)}">${status}</span></td><td>${meaning}</td><td>${gate}</td></tr>`
  )
  .join('')

valuationCards.innerHTML = valuation
  .map(
    (item) =>
      `<article class="card"><h3 class="title-with-icon">${icon(item.icon)}${item.title}</h3><ul>${item.points
        .map((p) => `<li>${p}</li>`)
        .join('')}</ul><p>${item.text}</p></article>`
  )
  .join('')

ethicsGrid.innerHTML = ethics
  .map(
    (item) =>
      `<article class="card"><h3 class="title-with-icon">${icon(item.icon)}${item.title}</h3><p>${item.text}</p></article>`
  )
  .join('')

renderProducts()

byId('statusFilter').addEventListener('change', (event) => {
  renderProducts(event.target.value, byId('search').value)
})

byId('search').addEventListener('input', (event) => {
  renderProducts(byId('statusFilter').value, event.target.value)
})

document.getElementById('year').textContent = new Date().getFullYear()

const progress = document.querySelector('.scroll-progress')
window.addEventListener('scroll', () => {
  const scrolled =
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  progress.style.width = `${Math.max(0, Math.min(100, scrolled))}%`
})

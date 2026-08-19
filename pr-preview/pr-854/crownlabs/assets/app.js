import { philosophy, products } from './data.js'

const byId = (id) => document.getElementById(id)
const productGrid = byId('productGrid')
const philosophyGrid = byId('philosophyGrid')

const createElement = (tag, className, text) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

const tagClass = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

function renderCard(item) {
  const article = createElement('article', 'card fade-in')
  const chips = createElement('div', 'chips')
  chips.append(createElement('span', `badge ${tagClass(item.status)}`, item.status))
  chips.append(createElement('span', 'badge outline', item.category))

  const gate = createElement('div', 'mini')
  gate.append(createElement('strong', null, 'Next gate: '), document.createTextNode(item.gate))
  const value = createElement('div', 'mini')
  value.append(
    createElement('strong', null, 'Canonical value reference: '),
    document.createTextNode(item.value)
  )
  const score = createElement('p', 'score', 'Readiness score ')
  score.append(createElement('span', null, `${item.score}%`))
  const source = createElement('p', 'mini', `Source: ${item.sourcePath}`)
  const link = createElement('a', 'btn', 'View canonical product brief')
  link.href = item.detailUrl || `../labs/products/${item.slug}.html`

  article.append(
    chips,
    createElement('h3', null, item.name),
    createElement('p', null, item.summary),
    gate,
    value,
    score,
    source,
    link
  )
  return article
}

function renderPhilosophy(item) {
  const article = createElement('article', 'card fade-in')
  article.append(
    createElement('h3', null, item.title),
    createElement('p', 'accent', item.highlight),
    createElement('p', null, item.text)
  )
  return article
}

philosophyGrid?.replaceChildren(...philosophy.map(renderPhilosophy))
productGrid?.replaceChildren(...products.map(renderCard))

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  },
  { threshold: 0.1 }
)

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

const year = document.getElementById('year')
if (year) year.textContent = new Date().getFullYear()

const progress = document.querySelector('.scroll-progress')
window.addEventListener(
  'scroll',
  () => {
    if (!progress) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = max > 0 ? (window.scrollY / max) * 100 : 0
    progress.style.width = `${Math.max(0, Math.min(100, scrolled))}%`
  },
  { passive: true }
)

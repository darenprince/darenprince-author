import { philosophy, products } from './data.js'

const byId = (id) => document.getElementById(id)
const productGrid = byId('productGrid')
const philosophyGrid = byId('philosophyGrid')

const tagClass = (value) => value.toLowerCase().replace(/\s+/g, '-')

function renderCard(item) {
  return `<article class="card fade-in">
      <div class="chips">
        <span class="badge ${tagClass(item.status)}">${item.status}</span>
        <span class="badge outline">${item.category}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <div class="mini"><strong>Next gate:</strong> ${item.gate}</div>
      <div class="mini"><strong>Financial outlook:</strong> ${item.value}</div>
      <p class="score">Readiness score <span>${item.score}%</span></p>
      <a class="btn" href="./products/${item.slug}.html">View full product brief</a>
    </article>`
}

philosophyGrid.innerHTML = philosophy
  .map(
    (item) =>
      `<article class="card fade-in"><h3>${item.title}</h3><p class="accent">${item.highlight}</p><p>${item.text}</p></article>`
  )
  .join('')

productGrid.innerHTML = products.map(renderCard).join('')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  },
  { threshold: 0.1 }
)

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

document.getElementById('year').textContent = new Date().getFullYear()

const progress = document.querySelector('.scroll-progress')
window.addEventListener('scroll', () => {
  const scrolled =
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  progress.style.width = `${Math.max(0, Math.min(100, scrolled))}%`
})

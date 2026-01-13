let portfolioData = null

const defaultPortfolioData = {
  products: [],
  frameworks: [],
  books: [],
  statuses: [],
}

const loadPortfolioData = async () => {
  try {
    const response = await fetch('assets/labs-data.json', { cache: 'no-store' })
    if (!response.ok) {
      throw new Error('Failed to load portfolio data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Unable to load Crown Labs data.', error)
    return defaultPortfolioData
  }
}
const iconMap = {
  alert: 'warning-circle',
  audio: 'waveform',
  bolt: 'lightning',
  book: 'book',
  box: 'package',
  calendar: 'calendar',
  camera: 'camera',
  chat: 'chat-circle-text',
  check: 'check-circle',
  compass: 'compass',
  crown: 'crown-simple',
  eye: 'eye',
  filter: 'faders',
  framework: 'tree-structure',
  grid: 'squares-four',
  guide: 'map-trifold',
  heart: 'heart',
  lab: 'flask',
  lock: 'lock',
  map: 'map-trifold',
  network: 'network',
  shield: 'shield-check',
  signal: 'chart-line-up',
  spark: 'sparkle',
  status: 'activity',
  timer: 'timer',
  trend: 'trend-up',
  trendDown: 'trend-down',
  users: 'users',
}

const statusOrder = {
  Live: 5,
  'Stage 1 Beta': 4,
  Beta: 3,
  Prototype: 2,
  Concept: 1,
}

const categoryOptions = [
  'All',
  'Intelligence',
  'Security',
  'Forensics',
  'Creative',
  'Relationship',
  'Cultural',
  'Frameworks',
]
const statusOptions = ['All', 'Concept', 'Prototype', 'Beta', 'Stage 1 Beta', 'Live']

const dom = {
  productGrid: document.getElementById('product-grid'),
  statusFilter: document.getElementById('status-filter'),
  categoryFilter: document.getElementById('category-filter'),
  searchInput: document.getElementById('search-input'),
  sortFilter: document.getElementById('sort-filter'),
  statStrip: document.getElementById('stat-strip'),
  heroCard: document.getElementById('hero-card'),
  frameworkList: document.getElementById('framework-list'),
  booksGrid: document.getElementById('books-grid'),
  statusTable: document.getElementById('status-table'),
  modal: document.getElementById('beta-modal'),
  userAccessModal: document.getElementById('user-access-modal'),
  labsLoginModal: document.getElementById('labs-login-modal'),
  notificationsModal: document.getElementById('notifications-modal'),
  productModal: document.getElementById('product-modal'),
  productModalBody: document.getElementById('product-modal-body'),
  productModalTitle: document.getElementById('product-modal-title'),
  intakeForm: document.getElementById('intake-form'),
  formSuccess: document.getElementById('form-success'),
  formNote: document.getElementById('form-note'),
  accessForm: document.getElementById('access-form'),
  accessSuccess: document.getElementById('access-success'),
  accessNote: document.getElementById('access-note'),
  labsLoginForm: document.getElementById('labs-login-form'),
  labsLoginSuccess: document.getElementById('labs-login-success'),
  labsLoginNote: document.getElementById('labs-login-note'),
  notificationsForm: document.getElementById('notifications-form'),
  notificationsSuccess: document.getElementById('notifications-success'),
  notificationsNote: document.getElementById('notifications-note'),
  roleField: document.getElementById('role-field'),
  tabButtons: document.querySelectorAll('.tab-btn'),
  tabPanels: document.querySelectorAll('.tab-panel'),
  themeToggle: document.getElementById('theme-toggle'),
  megaMenu: document.getElementById('mega-menu'),
  megaToggles: document.querySelectorAll('[data-mega-toggle]'),
  filterToggle: document.getElementById('filter-toggle'),
  filterPanel: document.getElementById('filter-panel'),
  pagePreloader: document.getElementById('page-preloader'),
  signalChartTemplate: document.getElementById('signal-chart-template'),
}

const formatCount = (value, label, icon) => ({ value, label, icon })

const iconMarkup = (icon) => {
  const iconName = iconMap[icon]
  return iconName ? `<i class="ph ph-${iconName} icon-inline" aria-hidden="true"></i>` : ''
}

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

const animateCounts = (container = document) => {
  container.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    if (Number.isNaN(target)) {
      return
    }
    const suffix = el.dataset.suffix || ''
    const prefix = el.dataset.prefix || ''
    const duration = 1200
    let start = null

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const value = Math.round(target * progress)
      el.textContent = `${prefix}${value}${suffix}`
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        el.textContent = `${prefix}${target}${suffix}`
      }
    }

    requestAnimationFrame(step)
  })
}

const resetCounts = (container = document) => {
  container.querySelectorAll('[data-count]').forEach((el) => {
    const suffix = el.dataset.suffix || ''
    const prefix = el.dataset.prefix || ''
    el.textContent = `${prefix}0${suffix}`
  })
}

let revealObserver

const setupRevealAnimations = () => {
  const elements = document.querySelectorAll('.reveal')
  if (!elements.length) return
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'))
    return
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          animateCounts(entry.target)
        } else {
          entry.target.classList.remove('is-visible')
          resetCounts(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )
  elements.forEach((el) => revealObserver.observe(el))
}

const registerRevealTargets = (root = document) => {
  if (!revealObserver) {
    setupRevealAnimations()
    return
  }
  root.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el)
  })
}

const hidePagePreloader = () => {
  if (!dom.pagePreloader) return
  dom.pagePreloader.setAttribute('aria-hidden', 'true')
  dom.pagePreloader.classList.add('is-hidden')
  window.setTimeout(() => {
    dom.pagePreloader?.remove()
  }, 400)
}

const renderSignalChart = (values = []) => {
  const bars = values.length ? values : [18, 24, 30, 28, 36, 42, 38]
  const max = Math.max(...bars, 1)
  const min = Math.min(...bars)
  const avg = Math.round(bars.reduce((sum, val) => sum + val, 0) / bars.length)
  const gradientId = `signal-gradient-${Math.random().toString(36).slice(2, 8)}`
  const trendDelta = bars[bars.length - 1] - bars[0]
  const trendUp = trendDelta >= 0
  const trendLabel = trendUp ? 'Rising' : 'Cooling'
  const trendIcon = trendUp ? iconMarkup('trend') : iconMarkup('trendDown')
  const points = bars
    .map((val, index) => {
      const x = (index / (bars.length - 1)) * 100
      const y = 40 - (val / max) * 30 - 5
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
  const areaPoints = `0,40 ${points} 100,40`

  if (!dom.signalChartTemplate) {
    return ''
  }

  const chart = dom.signalChartTemplate.content.firstElementChild.cloneNode(true)
  const svg = chart.querySelector('.signal-chart__svg')
  const gradient = svg.querySelector('linearGradient')
  const area = chart.querySelector('.signal-area')
  const line = chart.querySelector('.signal-line')
  const pointsGroup = chart.querySelector('.signal-points')
  const trend = chart.querySelector('.signal-trend')
  const trendIconEl = chart.querySelector('.signal-trend-icon')
  const trendLabelEl = chart.querySelector('.signal-trend-label')
  const lowStat = chart.querySelector('.signal-stat--low strong')
  const avgStat = chart.querySelector('.signal-stat--avg strong')
  const highStat = chart.querySelector('.signal-stat--high strong')

  chart.setAttribute('aria-label', `Valuation signal trend with values ${bars.join(', ')}`)
  gradient.id = gradientId
  area.setAttribute('points', areaPoints)
  area.setAttribute('fill', `url(#${gradientId})`)
  line.setAttribute('points', points)
  pointsGroup.innerHTML = bars
    .map((val, index) => {
      const x = (index / (bars.length - 1)) * 100
      const y = 40 - (val / max) * 30 - 5
      return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.8" style="--point-index:${index};"></circle>`
    })
    .join('')

  trend.classList.toggle('signal-trend--up', trendUp)
  trend.classList.toggle('signal-trend--down', !trendUp)
  trendIconEl.innerHTML = trendIcon
  trendLabelEl.textContent = trendLabel
  lowStat.textContent = min
  avgStat.textContent = avg
  highStat.textContent = max

  return chart.outerHTML
}

const renderHeroStats = () => {
  const total = portfolioData.products.length
  const beta = portfolioData.products.filter((item) =>
    ['Beta', 'Stage 1 Beta'].includes(item.status)
  ).length
  const concepts = portfolioData.products.filter((item) => item.status === 'Concept').length
  const heroProduct = portfolioData.products.find((item) => item.status === 'Stage 1 Beta')
  const stats = [
    formatCount(total, 'Total products', 'grid'),
    formatCount(beta, 'Active beta builds', 'bolt'),
    formatCount(concepts, 'Concepts in pipeline', 'spark'),
  ]

  dom.statStrip.innerHTML = stats
    .map(
      (stat) => `
        <div class="stat-card reveal">
          ${iconMarkup(stat.icon)}
          <div class="eyebrow">${stat.label}</div>
          <div class="stat-value" data-count="${stat.value}">0</div>
        </div>
      `
    )
    .join('')

  dom.heroCard.innerHTML = `
    <div class="hero-insight__header">
      <span class="eyebrow">Flagship intelligence</span>
      <span class="badge">Most ready</span>
    </div>
    <h3>${heroProduct?.name || 'CrownCode Intelligence Suite'}</h3>
    <p class="lede">The flagship system leading the portfolio’s readiness curve.</p>
    <div class="hero-readiness">
      <div>
        <span class="eyebrow">Readiness</span>
        <strong>${heroProduct?.status || 'Stage 1 Beta'}</strong>
      </div>
      <div>
        <span class="eyebrow">Focus</span>
        <strong>${heroProduct?.categoryLabel || 'Flagship Intelligence Platform'}</strong>
      </div>
      <div>
        <span class="eyebrow">Next gate</span>
        <strong>${heroProduct?.statusDetail || 'Stage 1 beta readiness'}</strong>
      </div>
    </div>
    <div class="hero-metrics">
      <span class="metric-chip">Stage: ${heroProduct?.status || 'Stage 1 Beta'}</span>
      <span class="metric-chip">Focus: ${heroProduct?.categoryLabel || 'Flagship Intelligence Platform'}</span>
      <span class="metric-chip">Next gate: ${heroProduct?.statusDetail || 'Stage 1 beta readiness'}</span>
    </div>
    <div class="hero-callout">
      <strong>Portfolio discipline</strong>
      <p>Every product lists the single milestone that advances its next phase.</p>
    </div>
  `
  dom.heroCard.classList.add('is-ready')
  dom.heroCard.closest('.hero-card')?.classList.add('hero-card--ready')

  animateCounts(dom.statStrip)
  registerRevealTargets(dom.statStrip)
}

const buildFilters = () => {
  dom.statusFilter.innerHTML = statusOptions
    .map((status) => `<option value="${status}">${status}</option>`)
    .join('')
  dom.categoryFilter.innerHTML = categoryOptions
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join('')
}

const renderProducts = () => {
  const statusValue = dom.statusFilter.value
  const categoryValue = dom.categoryFilter.value
  const query = dom.searchInput.value.trim().toLowerCase()
  const sortValue = dom.sortFilter.value

  let filtered = [...portfolioData.products]

  if (statusValue !== 'All') {
    filtered = filtered.filter((item) => item.status === statusValue)
  }

  if (categoryValue !== 'All') {
    filtered = filtered.filter((item) => item.category === categoryValue)
  }

  if (query) {
    filtered = filtered.filter((item) => {
      const haystack = [
        item.name,
        item.tagline,
        item.oneLiner,
        item.categoryLabel,
        item.statusDetail,
        ...(item.keywords || []),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }

  if (sortValue === 'ready') {
    filtered.sort(
      (a, b) => statusOrder[b.status] - statusOrder[a.status] || b.priority - a.priority
    )
  } else if (sortValue === 'strategic') {
    filtered.sort(
      (a, b) => b.priority - a.priority || statusOrder[b.status] - statusOrder[a.status]
    )
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  }

  dom.productGrid.innerHTML = filtered
    .map((product) => {
      const metrics = (product.metrics || [])
        .map(
          (metric) => `
            <div class="metric">
              ${iconMarkup(metric.icon)}
              <div>
                <div class="metric-value">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
              </div>
            </div>
          `
        )
        .join('')
      const initials = getInitials(product.name)
      const mediaSrc = product.media || `assets/brand/products/${product.id}-hero.png`
      const categoryPills = Array.from(
        new Set([product.categoryLabel, product.category].filter(Boolean))
      )
      const readinessMarkup =
        typeof product.readiness === 'number'
          ? `
          <div class="readiness">
            <div class="readiness-header">
              <span>Readiness score</span>
              <strong class="count-up" data-count="${product.readiness}" data-suffix="%">0%</strong>
            </div>
            <div class="readiness-bar" role="progressbar" aria-valuenow="${product.readiness}" aria-valuemin="0" aria-valuemax="100">
              <span style="width:${product.readiness}%"></span>
            </div>
          </div>
        `
          : ''
      const detailId = `details-${product.id}`

      return `
        <article class="product-card reveal" data-status="${product.status}" data-category="${product.category}" data-product-id="${product.id}">
          <div class="product-header">
            <div class="product-icon" data-fallback="${product.name}">
              <img src="assets/brand/products/${product.id}.png" alt="${product.name} icon" loading="lazy">
              <span>${product.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 3)}</span>
            </div>
            <div>
              <h3>${product.name}</h3>
              <div class="product-tags">
                <span class="tag status-badge" data-status="${product.status}">${product.status}</span>
                ${categoryPills.map((pill) => `<span class="tag">${pill}</span>`).join('')}
              </div>
            </div>
          </div>
          <p class="one-liner">${product.oneLiner}</p>
          <div class="product-details" id="${detailId}">
            <div class="card-media" data-fallback="${initials}">
              <img src="${mediaSrc}" alt="${product.name} preview" loading="lazy">
              <div class="media-placeholder">${initials}</div>
            </div>
            <div class="signal-panel">
              <div class="signal-label">
                <span>Valuation signal</span>
                ${iconMarkup('signal')}
              </div>
              <div class="signal-meta">
                <strong>${product.value}</strong>
                <small>${product.growthLabel}</small>
              </div>
              ${renderSignalChart(product.growth || [])}
            </div>
            <div class="product-metrics">
              ${metrics}
            </div>
            ${readinessMarkup}
            <ul>
              ${product.bullets.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="product-footer">
            <span class="muted">Next gate: ${product.nextGate}</span>
            <div class="product-ctas">
              <button class="ghost-btn ghost-btn--small" type="button" data-toggle-details aria-expanded="false" aria-controls="${detailId}">Expand details</button>
              <button class="ghost-btn ghost-btn--small" type="button" data-open-product="${product.id}">Quick view</button>
              <a class="ghost-btn ghost-btn--small" href="/labs/products/${product.id}.html">Full page</a>
              <button class="primary-btn primary-btn--small" type="button" data-open-modal data-modal-tab="beta" data-interest="${product.name}">
                Request access
              </button>
            </div>
          </div>
        </article>
      `
    })
    .join('')

  if (!filtered.length) {
    dom.productGrid.innerHTML = '<p>No products match the current filters.</p>'
  }

  animateCounts(dom.productGrid)
  registerRevealTargets(dom.productGrid)

  document.querySelectorAll('.product-icon img').forEach((img) => {
    img.addEventListener('error', () => {
      const parent = img.closest('.product-icon')
      parent.classList.add('is-fallback')
    })
  })

  document.querySelectorAll('.card-media img').forEach((img) => {
    img.addEventListener('error', () => {
      const parent = img.closest('.card-media')
      if (parent) {
        parent.classList.add('is-fallback')
      }
    })
  })

  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      const target = event.target
      if (target.closest('button, a')) {
        return
      }
      const productId = card.dataset.productId
      if (productId) {
        openProductModal(productId)
      }
    })
  })

  document.querySelectorAll('[data-toggle-details]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation()
      const card = button.closest('.product-card')
      if (!card) return
      const isExpanded = card.classList.toggle('is-expanded')
      button.setAttribute('aria-expanded', String(isExpanded))
      button.textContent = isExpanded ? 'Collapse details' : 'Expand details'
    })
  })

  document.querySelectorAll('[data-open-product]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation()
      const productId = button.dataset.openProduct
      if (productId) {
        openProductModal(productId)
      }
    })
  })
}

const renderFrameworks = () => {
  dom.frameworkList.innerHTML = portfolioData.frameworks
    .map(
      (framework) => `
      <div class="framework-card reveal">
        <div class="card-header">
          ${iconMarkup('framework')}
          <div class="product-tags">
            <span class="tag status-badge" data-status="${framework.status}">${framework.status}</span>
          </div>
        </div>
        <h3>${framework.name}</h3>
        <p>${framework.description}</p>
        <ul>
          ${framework.bullets.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <div class="card-actions">
          <button class="ghost-btn ghost-btn--small" type="button" data-open-modal data-modal-tab="developer" data-interest="${framework.name}">
            Request framework brief
          </button>
        </div>
      </div>
    `
    )
    .join('')

  registerRevealTargets(dom.frameworkList)
}

const renderBooks = () => {
  dom.booksGrid.innerHTML = portfolioData.books
    .map((book) => {
      const initials = getInitials(book.name)
      const coverMarkup = `
          ${book.cover ? `<img src="${book.cover}" alt="${book.name} cover" loading="lazy">` : ''}
          <div class="cover-placeholder"><strong>${initials}</strong><small>Cover pending</small></div>
        `
      const actionMarkup = book.actionLabel
        ? book.actionType === 'modal'
          ? `<button class="ghost-btn ghost-btn--small" type="button" data-open-modal data-modal-tab="${book.actionTab || 'beta'}" data-interest="${book.name}">${book.actionLabel}</button>`
          : `<a class="ghost-btn ghost-btn--small" href="${book.actionHref || 'mailto:labs@darenprince.com'}">${book.actionLabel}</a>`
        : `<button class="ghost-btn ghost-btn--small" type="button" data-open-modal data-modal-tab="beta" data-interest="${book.name}">Request updates</button>`
      return `
      <div class="book-card reveal">
        <div class="book-cover ${book.cover ? 'has-cover' : 'is-fallback'}">
          ${coverMarkup}
        </div>
        <div class="book-meta">
          <div class="card-header">
            ${iconMarkup('book')}
            <div class="product-tags">
              <span class="tag status-badge" data-status="${book.status}">${book.status}</span>
            </div>
          </div>
          <h3>${book.name}</h3>
          <p>${book.description}</p>
          <div class="book-actions">${actionMarkup}</div>
        </div>
      </div>
    `
    })
    .join('')

  registerRevealTargets(dom.booksGrid)

  document.querySelectorAll('.book-cover img').forEach((img) => {
    img.addEventListener('error', () => {
      const parent = img.closest('.book-cover')
      if (parent) {
        parent.classList.remove('has-cover')
        parent.classList.add('is-fallback')
      }
    })
  })
}

const renderStatusTable = () => {
  dom.statusTable.innerHTML = portfolioData.statuses
    .map(
      (status) => `
        <tr>
          <th scope="row"><span class="status-badge status-badge--table" data-status="${status.name}">${status.name}</span></th>
          <td>${status.meaning}</td>
          <td>${status.nextGate}</td>
        </tr>
      `
    )
    .join('')
}

const tabLabels = {
  beta: 'Beta Tester',
  developer: 'Developer',
  partner: 'Partner / Investor',
}

const setActiveTab = (tabId = 'beta') => {
  dom.tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-selected', String(isActive))
  })
  dom.tabPanels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.id === `tab-${tabId}`)
  })
  if (dom.roleField) {
    dom.roleField.value = tabLabels[tabId] || 'Beta Tester'
  }
}

const resetIntakeForm = () => {
  dom.intakeForm.reset()
  dom.intakeForm.hidden = false
  dom.formSuccess.hidden = true
  dom.formNote.textContent = ''
  setActiveTab('beta')
}

const resetAccessForm = () => {
  if (!dom.accessForm) return
  dom.accessForm.reset()
  dom.accessForm.hidden = false
  if (dom.accessSuccess) {
    dom.accessSuccess.hidden = true
  }
  if (dom.accessNote) {
    dom.accessNote.textContent = ''
  }
}

const resetLabsLoginForm = () => {
  if (!dom.labsLoginForm) return
  dom.labsLoginForm.reset()
  dom.labsLoginForm.hidden = false
  if (dom.labsLoginSuccess) {
    dom.labsLoginSuccess.hidden = true
  }
  if (dom.labsLoginNote) {
    dom.labsLoginNote.textContent = ''
  }
}

const resetNotificationsForm = () => {
  if (!dom.notificationsForm) return
  dom.notificationsForm.reset()
  dom.notificationsForm.hidden = false
  if (dom.notificationsSuccess) {
    dom.notificationsSuccess.hidden = true
  }
  if (dom.notificationsNote) {
    dom.notificationsNote.textContent = ''
  }
}

const submitNetlifyForm = async (form) => {
  const formData = new FormData(form)
  const body = new URLSearchParams(formData).toString()
  const response = await fetch(form.action || '/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  if (!response.ok) {
    throw new Error('Submission failed')
  }
}

const handleFormSubmit = async ({
  form,
  noteEl,
  successEl,
  successMessage,
  invalidMessage,
  redirectTo,
}) => {
  if (!form) return
  if (!form.checkValidity()) {
    if (noteEl) {
      noteEl.textContent =
        invalidMessage || 'Please complete all required fields with a valid email.'
    }
    form.reportValidity()
    return
  }
  if (noteEl) {
    noteEl.textContent = 'Submitting…'
  }
  try {
    await submitNetlifyForm(form)
    form.hidden = true
    if (successEl) {
      successEl.hidden = false
    }
    if (noteEl) {
      noteEl.textContent = successMessage || 'Submission received.'
    }
    if (redirectTo) {
      window.setTimeout(() => {
        window.location.assign(redirectTo)
      }, 1200)
    }
  } catch (error) {
    console.error('Form submission failed.', error)
    if (noteEl) {
      noteEl.textContent = 'Submission failed. Please try again shortly.'
    }
  }
}

const openModal = (modal) => {
  if (!modal) return
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  const firstInput = modal.querySelector('input, select, textarea, button')
  if (firstInput) {
    firstInput.focus()
  }
}

const closeModal = (modal) => {
  if (!modal) return
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  if (modal === dom.modal) {
    resetIntakeForm()
  }
  if (modal === dom.userAccessModal) {
    resetAccessForm()
  }
  if (modal === dom.labsLoginModal) {
    resetLabsLoginForm()
  }
  if (modal === dom.notificationsModal) {
    resetNotificationsForm()
  }
  if (modal === dom.productModal) {
    modal.classList.remove('is-fullscreen')
  }
}

const openBetaModal = (tabId = 'beta', interest = '') => {
  resetIntakeForm()
  setActiveTab(tabId)
  if (interest) {
    const interestInputs = dom.intakeForm.querySelectorAll('input[name="interests"]')
    interestInputs.forEach((input) => {
      if (input.value.toLowerCase() === interest.toLowerCase()) {
        input.checked = true
      }
    })
  }
  openModal(dom.modal)
}

const openNotificationsModal = () => {
  resetNotificationsForm()
  openModal(dom.notificationsModal)
}

const renderProductModal = (product) => {
  const readinessMarkup =
    typeof product.readiness === 'number'
      ? `
        <div class="readiness">
          <div class="readiness-header">
            <span>Readiness score</span>
            <strong class="count-up" data-count="${product.readiness}" data-suffix="%">0%</strong>
          </div>
          <div class="readiness-bar" role="progressbar" aria-valuenow="${product.readiness}" aria-valuemin="0" aria-valuemax="100">
            <span style="width:${product.readiness}%"></span>
          </div>
        </div>
      `
      : ''

  return `
    <div class="product-modal__grid">
      <div class="product-modal__summary">
        <div class="product-tags">
          <span class="tag status-badge" data-status="${product.status}">${product.status}</span>
          <span class="tag">${product.categoryLabel}</span>
        </div>
        <p>${product.tagline}</p>
        <div class="signal-panel">
          <div class="signal-label">
            <span>Valuation signal</span>
            ${iconMarkup('signal')}
          </div>
          <div class="signal-meta">
            <strong>${product.value}</strong>
            <small>${product.growthLabel}</small>
          </div>
          ${renderSignalChart(product.growth || [])}
        </div>
        ${readinessMarkup}
      </div>
      <div class="detail-grid">
        <div>
          <h4>What it is</h4>
          ${product.whatItIs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
        </div>
        <div>
          <h4>Who it’s for</h4>
          <ul>
            ${product.whoFor.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4>Core capabilities</h4>
          <ul>
            ${product.capabilities.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="detail-box">
          <h4>What it is NOT</h4>
          <ul>
            ${product.not.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="detail-box">
          <h4>Current status</h4>
          <p><strong>${product.status}</strong> — ${product.statusDetail}</p>
          <p><strong>Next gate:</strong> ${product.nextGate}</p>
          <p><strong>Monetization:</strong> ${product.monetization}</p>
          <p><strong>As-is valuation:</strong> ${product.valuationCurrent}</p>
          <p><strong>Projected valuation:</strong> ${product.valuationProjected}</p>
          <p><strong>Completion:</strong> ${product.completion}</p>
          <p><strong>Time to market:</strong> ${product.timeToMarket}</p>
          <p><strong>Projected annual revenue:</strong> ${product.projectedRevenue.year1} · ${product.projectedRevenue.year2} · ${product.projectedRevenue.year3}</p>
        </div>
      </div>
    </div>
  `
}

const openProductModal = (productId) => {
  const product = portfolioData.products.find((item) => item.id === productId)
  if (!product || !dom.productModal) return
  dom.productModalTitle.textContent = product.name
  dom.productModalBody.innerHTML = renderProductModal(product)
  animateCounts(dom.productModalBody)
  const fullscreenToggle = dom.productModal.querySelector('[data-toggle-fullscreen]')
  if (fullscreenToggle) {
    fullscreenToggle.setAttribute('aria-pressed', 'false')
    fullscreenToggle.innerHTML =
      '<i class="ph ph-arrows-out icon-inline" aria-hidden="true"></i>Full screen'
  }
  openModal(dom.productModal)
}

const attachFilters = () => {
  ;[dom.statusFilter, dom.categoryFilter, dom.searchInput, dom.sortFilter].forEach((el) => {
    el.addEventListener('input', renderProducts)
  })
}

const setupModal = () => {
  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      openBetaModal(button.dataset.modalTab || 'beta', button.dataset.interest || '')
    })
  })

  document.querySelectorAll('[data-open-user-access]').forEach((button) => {
    button.addEventListener('click', () => {
      resetAccessForm()
      openModal(dom.userAccessModal)
    })
  })

  document.querySelectorAll('[data-open-labs-login]').forEach((button) => {
    button.addEventListener('click', () => {
      resetLabsLoginForm()
      openModal(dom.labsLoginModal)
    })
  })

  document.querySelectorAll('[data-open-notifications]').forEach((button) => {
    button.addEventListener('click', () => {
      openNotificationsModal()
    })
  })

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openModalEl = document.querySelector('.modal.is-open')
      if (openModalEl) {
        closeModal(openModalEl)
      }
    }
  })

  document.querySelectorAll('[data-toggle-fullscreen]').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      if (!modal) return
      const isFull = modal.classList.toggle('is-fullscreen')
      button.setAttribute('aria-pressed', String(isFull))
      button.innerHTML = isFull
        ? '<i class="ph ph-arrows-in icon-inline" aria-hidden="true"></i>Exit full screen'
        : '<i class="ph ph-arrows-out icon-inline" aria-hidden="true"></i>Full screen'
    })
  })

  dom.tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveTab(button.dataset.tab)
    })
  })

  dom.intakeForm.addEventListener('submit', (event) => {
    event.preventDefault()
    handleFormSubmit({
      form: dom.intakeForm,
      noteEl: dom.formNote,
      successEl: dom.formSuccess,
      successMessage: 'Request received.',
    })
  })

  if (dom.accessForm) {
    dom.accessForm.addEventListener('submit', (event) => {
      event.preventDefault()
      handleFormSubmit({
        form: dom.accessForm,
        noteEl: dom.accessNote,
        successEl: dom.accessSuccess,
        successMessage: 'Access request received.',
      })
    })
  }

  if (dom.labsLoginForm) {
    dom.labsLoginForm.addEventListener('submit', (event) => {
      event.preventDefault()
      handleFormSubmit({
        form: dom.labsLoginForm,
        noteEl: dom.labsLoginNote,
        successEl: dom.labsLoginSuccess,
        invalidMessage: 'Please enter a valid email and password.',
        successMessage: 'Access granted. Redirecting…',
        redirectTo: dom.labsLoginForm.dataset.redirect || '/dashboard.html',
      })
    })
  }

  if (dom.notificationsForm) {
    dom.notificationsForm.addEventListener('submit', (event) => {
      event.preventDefault()
      handleFormSubmit({
        form: dom.notificationsForm,
        noteEl: dom.notificationsNote,
        successEl: dom.notificationsSuccess,
        successMessage: 'You are subscribed. Watch your inbox.',
      })
    })
  }

  setActiveTab('beta')
}

const setupThemeToggle = () => {
  const stored = localStorage.getItem('labs-theme')
  if (stored === 'light') {
    document.body.classList.add('theme-light')
    dom.themeToggle.setAttribute('aria-pressed', 'true')
  }

  dom.themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('theme-light')
    dom.themeToggle.setAttribute('aria-pressed', String(isLight))
    localStorage.setItem('labs-theme', isLight ? 'light' : 'dark')
  })
}

const setupNav = () => {
  if (!dom.megaMenu || dom.megaToggles.length === 0) return
  const toggleMenu = () => {
    const isOpen = dom.megaMenu.classList.toggle('is-open')
    dom.megaToggles.forEach((toggle) => toggle.setAttribute('aria-expanded', String(isOpen)))
  }

  dom.megaToggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation()
      toggleMenu()
    })
  })

  document.addEventListener('click', (event) => {
    if (!dom.megaMenu.classList.contains('is-open')) return
    if (dom.megaMenu.contains(event.target)) return
    dom.megaMenu.classList.remove('is-open')
    dom.megaToggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'))
  })
}

const setupFiltersToggle = () => {
  if (!dom.filterToggle) return
  dom.filterToggle.addEventListener('click', () => {
    const isOpen = dom.filterPanel.classList.toggle('is-open')
    dom.filterToggle.setAttribute('aria-expanded', String(isOpen))
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  portfolioData = await loadPortfolioData()
  buildFilters()
  renderHeroStats()
  renderProducts()
  renderFrameworks()
  renderBooks()
  renderStatusTable()
  attachFilters()
  setupModal()
  setupThemeToggle()
  setupNav()
  setupFiltersToggle()
  setupRevealAnimations()
  hidePagePreloader()
})

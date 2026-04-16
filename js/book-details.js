// Book details view toggle and accordion

document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var expanded = this.getAttribute('aria-expanded') === 'true'
    this.setAttribute('aria-expanded', !expanded)
    var panel = this.nextElementSibling
    if (panel) {
      panel.hidden = expanded
    }
  })
})

const formatButtons = document.querySelectorAll('.format-btn')
const formatHeroImage = document.getElementById('format-hero-image')
const formatHeroImages = {
  audio: '/assets/images/heroposter2.png',
  ebook:
    '/assets/images/Copy of CASE_LAMINATE_6.000x9.000_256_BW_WHITE_en_US.pdf (14.343 x 10.416 in).png',
  print:
    'https://www.darenprince.com/assets/images/Daren%20Prince%20%20Official%20Site%20of%20the%20Author.png',
}

formatButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const format = btn.dataset.format || ''
    formatButtons.forEach((candidate) => {
      const isActive = candidate === btn
      candidate.classList.toggle('is-active', isActive)
      candidate.setAttribute('aria-pressed', String(isActive))
    })
    if (formatHeroImage && formatHeroImages[format]) {
      formatHeroImage.src = formatHeroImages[format]
    }
  })
})

document.querySelectorAll('.store-logo-link').forEach((link) => {
  const img = link.querySelector('img')
  img?.addEventListener('error', () => {
    link.style.display = 'none'
  })

  link.addEventListener('click', (e) => {
    e.preventDefault()
    const format = link.dataset.format
    document.getElementById('book-viewer')?.scrollIntoView({ behavior: 'smooth' })
    const formatBtn = document.querySelector(`.format-btn[data-format="${format}"]`)
    formatBtn?.click()
  })
})

const bookCards = document.querySelectorAll('[data-book-entry]')
if ('IntersectionObserver' in window && bookCards.length) {
  const entryObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        obs.unobserve(entry.target)
      })
    },
    { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
  )

  bookCards.forEach((card) => entryObserver.observe(card))
} else {
  bookCards.forEach((card) => card.classList.add('is-visible'))
}

const viewerStage = document.getElementById('book-viewer-stage')
const openDetailsBtn = document.getElementById('open-book-details')
const closeDetailsBtn = document.getElementById('close-book-details')
const drawerShopNowBtn = document.getElementById('drawer-shop-now')
const detailsTriggers = document.querySelectorAll('.js-book-details-trigger')

function openBookDetailsDrawer() {
  if (!viewerStage) return
  viewerStage.classList.add('is-details-open')
}

function closeBookDetailsDrawer() {
  viewerStage?.classList.remove('is-details-open')
}

openDetailsBtn?.addEventListener('click', (event) => {
  event.preventDefault()
  openBookDetailsDrawer()
})

closeDetailsBtn?.addEventListener('click', () => {
  closeBookDetailsDrawer()
})

detailsTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    setTimeout(() => openBookDetailsDrawer(), 220)
  })
})

drawerShopNowBtn?.addEventListener('click', () => {
  document.getElementById('book-viewer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

const header = document.getElementById('siteHeader')
const menuToggle = document.querySelector('.menu-toggle')
const mobileNav = document.getElementById('mobileNav')
const searchToggle = document.querySelector('.js-search-toggle')
const searchBar = document.getElementById('siteSearch')
const searchInput = document.getElementById('siteSearchInput')
const profileToggle = document.querySelector('.js-profile-toggle')
const profileMenu = document.getElementById('profileMenu')
const themeToggle = document.querySelector('.js-theme-toggle')

const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 20)
setHeaderState()
window.addEventListener('scroll', setHeaderState, { passive: true })

const closeHeaderTools = (except = null) => {
  if (except !== 'search' && searchBar) {
    searchBar.hidden = true
    searchToggle?.setAttribute('aria-expanded', 'false')
  }

  if (except !== 'profile' && profileMenu) {
    profileMenu.hidden = true
    profileToggle?.setAttribute('aria-expanded', 'false')
  }
}

searchToggle?.addEventListener('click', () => {
  const willOpen = searchBar.hidden
  closeHeaderTools(willOpen ? 'search' : null)
  searchBar.hidden = !willOpen
  searchToggle.setAttribute('aria-expanded', String(willOpen))
  if (willOpen) window.setTimeout(() => searchInput?.focus(), 40)
})

profileToggle?.addEventListener('click', () => {
  const willOpen = profileMenu.hidden
  closeHeaderTools(willOpen ? 'profile' : null)
  profileMenu.hidden = !willOpen
  profileToggle.setAttribute('aria-expanded', String(willOpen))
})

themeToggle?.addEventListener('click', () => {
  const active = !document.documentElement.classList.contains('is-bright-mode')
  document.documentElement.classList.toggle('is-bright-mode', active)
  themeToggle.setAttribute('aria-pressed', String(active))
})

document.addEventListener('click', (event) => {
  if (event.target.closest('.nav-actions, .search-bar, .profile-dropdown')) return
  closeHeaderTools()
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeHeaderTools()
})

const setMenuState = (open) => {
  mobileNav.classList.toggle('is-open', open)
  mobileNav.setAttribute('aria-hidden', String(!open))
  menuToggle.setAttribute('aria-expanded', String(open))
  if (open) closeHeaderTools()
}

menuToggle?.addEventListener('click', () => setMenuState(!mobileNav.classList.contains('is-open')))
mobileNav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuState(false)
})

const formatImage = document.getElementById('formatImage')
document.querySelectorAll('.format-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.format-tab').forEach((item) => {
      const selected = item === tab
      item.classList.toggle('is-active', selected)
      item.setAttribute('aria-selected', String(selected))
    })
    formatImage.classList.add('is-swapping')
    window.setTimeout(() => {
      formatImage.src = tab.dataset.image
      formatImage.alt = `Game On ${tab.dataset.format} edition`
      formatImage.dataset.format = tab.dataset.format
      formatImage.classList.remove('is-swapping')
    }, 180)
  })
})

const initialFormatTab = document.querySelector('.format-tab.is-active')
if (initialFormatTab) {
  formatImage.src = initialFormatTab.dataset.image
  formatImage.alt = `Game On ${initialFormatTab.dataset.format} edition`
  formatImage.dataset.format = initialFormatTab.dataset.format
}

const detailTabs = [...document.querySelectorAll('.detail-tab')]
const detailTabSelect = document.getElementById('detailTabSelect')

const activateDetailTab = (activeTab, moveFocus = false) => {
  detailTabs.forEach((tab) => {
    const selected = tab === activeTab
    tab.classList.toggle('is-active', selected)
    tab.setAttribute('aria-selected', String(selected))
    tab.tabIndex = selected ? 0 : -1

    const panel = document.getElementById(tab.getAttribute('aria-controls'))
    panel.hidden = !selected
    panel.classList.toggle('is-active', selected)
  })

  if (detailTabSelect) detailTabSelect.value = activeTab.id
  if (moveFocus) activeTab.focus()
}

detailTabs.forEach((tab, tabIndex) => {
  tab.addEventListener('click', () => activateDetailTab(tab))
  tab.addEventListener('keydown', (event) => {
    const keyTargets = {
      ArrowRight: (tabIndex + 1) % detailTabs.length,
      ArrowLeft: (tabIndex - 1 + detailTabs.length) % detailTabs.length,
      Home: 0,
      End: detailTabs.length - 1,
    }

    if (keyTargets[event.key] === undefined) return
    event.preventDefault()
    activateDetailTab(detailTabs[keyTargets[event.key]], true)
  })
})

detailTabSelect?.addEventListener('change', () => {
  const nextTab = document.getElementById(detailTabSelect.value)
  if (nextTab) activateDetailTab(nextTab)
})

const reviews = [
  {
    quote:
      'Other books oversimplify and leave you confused. This one explains exactly how to apply what you learn. Surprisingly useful.',
    source: 'Always Adam · Books A Million',
    logo: 'assets/retailers/bam-logo-white.svg',
    logoAlt: 'Books A Million',
  },
  {
    quote:
      "Not manipulative. Not sketchy. Straightforward and useful. A different league from the other books I've read.",
    source: 'Jose Martinez · Books A Million',
    logo: 'assets/retailers/bam-logo-white.svg',
    logoAlt: 'Books A Million',
  },
  {
    quote:
      'I read it in one day and highlighted half of it. Incredibly enlightening and way more thoughtful than I expected.',
    source: 'Apple Books Reviewer · Apple Books',
    logo: 'assets/retailers/apple-books-standard-white.svg',
    logoAlt: 'Apple Books',
  },
  {
    quote:
      'A plus audiobook. I did not want to get out of the truck. Real world advice, not cheesy theory.',
    source: 'Google Play Listener · Google Play',
    logo: 'assets/retailers/google-play-logo.png',
    logoAlt: 'Google Play',
  },
  {
    quote:
      'A refreshing guide for modern men. Bold, insightful, and genuinely helpful. Finally, a dating book that is not cringe.',
    source: 'Amazon Reviewer · Amazon',
    logo: 'assets/retailers/amazon-logo.png',
    logoAlt: 'Amazon',
  },
]
let reviewIndex = 0
let reviewTimer
const reviewCard = document.querySelector('.review-card')
const quote = document.getElementById('reviewQuote')
const source = document.getElementById('reviewSource')
const reviewLogo = document.getElementById('reviewLogo')
const progress = document.getElementById('reviewProgress')

const renderReview = () => {
  const review = reviews[reviewIndex]
  reviewCard?.classList.remove('is-switching')
  void reviewCard?.offsetWidth
  reviewCard?.classList.add('is-switching')
  quote.textContent = review.quote
  source.textContent = review.source
  if (reviewLogo) {
    reviewLogo.src = review.logo
    reviewLogo.alt = review.logoAlt
  }
  progress.style.width = `${((reviewIndex + 1) / reviews.length) * 100}%`
}

const nextReview = () => {
  reviewIndex = (reviewIndex + 1) % reviews.length
  renderReview()
}

const scheduleReviews = () => {
  window.clearInterval(reviewTimer)
  reviewTimer = window.setInterval(nextReview, 6500)
}

document.getElementById('previousReview')?.addEventListener('click', () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length
  renderReview()
  scheduleReviews()
})

document.getElementById('nextReview')?.addEventListener('click', () => {
  nextReview()
  scheduleReviews()
})

reviewCard?.addEventListener('mouseenter', () => window.clearInterval(reviewTimer))
reviewCard?.addEventListener('mouseleave', scheduleReviews)
renderReview()
scheduleReviews()

const trailerDialog = document.getElementById('trailerDialog')
const trailerFrame = document.getElementById('trailerFrame')
const buyDialog = document.getElementById('buyDialog')

const openDialog = (dialog) => {
  if (dialog === trailerDialog) trailerFrame.src = trailerFrame.dataset.src
  dialog.showModal()
  document.body.classList.add('has-dialog')
}

document.getElementById('trailerButton')?.addEventListener('click', () => openDialog(trailerDialog))
document.querySelectorAll('.js-open-buy').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault()
    openDialog(buyDialog)
  })
})

document.querySelectorAll('[data-dialog-close]').forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog').close())
})
;[trailerDialog, buyDialog].forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })
  dialog.addEventListener('close', () => {
    document.body.classList.remove('has-dialog')
    if (dialog === trailerDialog) trailerFrame.src = 'about:blank'
  })
})

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12 }
)

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

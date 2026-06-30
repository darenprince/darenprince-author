const header = document.getElementById('siteHeader')
const menuToggle = document.querySelector('.menu-toggle')
const mobileNav = document.getElementById('mobileNav')

const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 20)
setHeaderState()
window.addEventListener('scroll', setHeaderState, { passive: true })

const setMenuState = (open) => {
  mobileNav.classList.toggle('is-open', open)
  mobileNav.setAttribute('aria-hidden', String(!open))
  menuToggle.setAttribute('aria-expanded', String(open))
}

menuToggle.addEventListener('click', () => setMenuState(!mobileNav.classList.contains('is-open')))
mobileNav.addEventListener('click', (event) => {
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

const reviews = [
  [
    'Other books oversimplify and leave you confused. This one explains exactly how to apply what you learn—surprisingly useful.',
    'Always-ADAM · Books-A-Million',
  ],
  [
    "Not manipulative. Not sketchy. Straightforward and useful. A different league from the other books I've read.",
    'Jose Martinez · Books-A-Million',
  ],
  [
    'I read it in one day and highlighted half of it. Incredibly enlightening and way more thoughtful than I expected.',
    'Apple Books Reviewer · Apple Books',
  ],
  [
    "A++ audiobook. Didn't want to get out of the truck. Real-world advice, not cheesy theory.",
    'Google Play Listener · Google Play Audiobook',
  ],
  [
    'A refreshing guide for modern men. Bold, insightful, and genuinely helpful. Finally, a dating book that isn’t cringe.',
    'Amazon Reviewer · Amazon',
  ],
]
let reviewIndex = 0
const quote = document.getElementById('reviewQuote')
const source = document.getElementById('reviewSource')
const progress = document.getElementById('reviewProgress')

const renderReview = () => {
  quote.animate(
    [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    { duration: 260, easing: 'ease-out' }
  )
  quote.textContent = reviews[reviewIndex][0]
  source.textContent = reviews[reviewIndex][1]
  progress.style.width = `${((reviewIndex + 1) / reviews.length) * 100}%`
}

document.getElementById('previousReview').addEventListener('click', () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length
  renderReview()
})
document.getElementById('nextReview').addEventListener('click', () => {
  reviewIndex = (reviewIndex + 1) % reviews.length
  renderReview()
})

const trailerDialog = document.getElementById('trailerDialog')
const trailerFrame = document.getElementById('trailerFrame')
const buyDialog = document.getElementById('buyDialog')

const openDialog = (dialog) => {
  if (dialog === trailerDialog) trailerFrame.src = trailerFrame.dataset.src
  dialog.showModal()
  document.body.classList.add('has-dialog')
}

document.getElementById('trailerButton').addEventListener('click', () => openDialog(trailerDialog))
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

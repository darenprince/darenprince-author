import { useEffect } from 'react'

const LABELS = ['Converging evidence', 'Neutral evidence', 'Conflicting evidence']

function findTextElement(label) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
  let node
  while ((node = walker.nextNode())) {
    if (node.children.length === 0 && node.textContent?.trim() === label) return node
  }
  return null
}

export default function EvidenceBarsRefinement() {
  useEffect(() => {
    const elements = LABELS.map(findTextElement).filter(Boolean)
    if (!elements.length) return undefined

    elements.forEach((element, index) => {
      element.classList.add('vv-evidence-label')
      element.style.setProperty('--vv-evidence-delay', `${index * 0.34}s`)
      element.setAttribute('data-vv-evidence-index', String(index))

      let card = element.parentElement
      for (let level = 0; level < 5 && card; level += 1) {
        if (card.textContent?.includes('illustrative') && card.getBoundingClientRect().width > 180) break
        card = card.parentElement
      }
      if (card) card.classList.add('vv-evidence-card')
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.22 })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return null
}

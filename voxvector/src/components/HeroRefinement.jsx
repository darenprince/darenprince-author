import { useEffect } from 'react'

function waveformIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', '18')
  svg.setAttribute('height', '18')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '1.9')
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', 'M3 12h2M7 8v8M11 4v16M15 7v10M19 9v6M21 12h-2')
  svg.appendChild(path)
  return svg
}

function refineHeroActions() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
  let node
  let analyze = null
  while ((node = walker.nextNode())) {
    if (node.children.length === 0 && node.textContent?.trim().toLowerCase() === 'analyze audio') {
      analyze = node
      break
    }
  }
  if (!analyze) return

  const action = analyze.closest('a,button')
  if (!action || action.dataset.vvHeroAction === 'true') return
  action.dataset.vvHeroAction = 'true'
  action.classList.add('vv-hero-primary-cta')

  const oldIcon = action.querySelector('svg')
  if (oldIcon) oldIcon.replaceWith(waveformIcon())

  if (!document.querySelector('.vv-hero-api-cta')) {
    const api = document.createElement('a')
    api.href = 'https://voxvector.crownlabs.tech/docs'
    api.target = '_blank'
    api.rel = 'noreferrer'
    api.className = 'vv-hero-api-cta'
    api.innerHTML = '<span class="vv-api-glyph" aria-hidden="true">{ }</span><span>API Access</span>'
    action.parentElement?.appendChild(api)
  }
}

export default function HeroRefinement() {
  useEffect(() => {
    const heading = document.querySelector('#product h1')
    if (!heading || heading.dataset.vvRefined === 'true') return

    const eyebrow = heading.parentElement?.previousElementSibling?.querySelector('div')
    if (eyebrow) eyebrow.parentElement.style.display = 'none'

    const oldSubheading = heading.parentElement?.nextElementSibling
    if (oldSubheading) oldSubheading.style.display = 'none'

    heading.dataset.vvRefined = 'true'
    heading.textContent = ''

    const firstLine = document.createElement('span')
    firstLine.className = 'vv-hero-line'
    firstLine.append(document.createTextNode('Reveal the '))

    const truth = document.createElement('span')
    truth.className = 'vv-hero-truth'
    truth.textContent = 'truth'
    firstLine.append(truth)

    const secondLine = document.createElement('span')
    secondLine.className = 'vv-hero-line vv-hero-audio-line'
    secondLine.textContent = 'in your audio'

    heading.append(firstLine, secondLine)
    refineHeroActions()

    const observer = new MutationObserver(() => refineHeroActions())
    observer.observe(document.body, { childList: true, subtree: true })
    const timeout = window.setTimeout(refineHeroActions, 80)
    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [])

  return null
}

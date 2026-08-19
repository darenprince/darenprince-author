import { useEffect } from 'react'

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
  }, [])

  return null
}

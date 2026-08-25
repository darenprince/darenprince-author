import { useEffect } from 'react'

export default function CanonicalHeroCopy() {
  useEffect(() => {
    const hero = document.querySelector('#product')
    const heading = hero?.querySelector('h1')
    if (!hero || !heading || heading.dataset.vvCanonicalCopy === 'true') return

    heading.dataset.vvCanonicalCopy = 'true'
    heading.textContent = 'Reveal the Truth.'
    heading.classList.remove('tracking-[-.065em]')

    const eyebrow = heading.parentElement?.querySelector(':scope > div:first-child')
    if (eyebrow) eyebrow.style.display = 'none'

    const secondHeadline = heading.parentElement?.querySelector('h2')
    if (secondHeadline) secondHeadline.style.display = 'none'

    const copy = heading.parentElement?.querySelectorAll('p')
    if (copy?.length) {
      copy[0].textContent = 'VoxVector analyzes speech across acoustic, vocal, linguistic, temporal, and behavioral dimensions to surface measurable patterns and converging evidence associated with deception.'
      copy[0].classList.remove('max-w-2xl', 'text-lg', 'leading-8', 'text-white/[.72]', 'sm:text-xl')
      copy[0].classList.add('max-w-3xl', 'text-lg', 'leading-8', 'text-white/[.68]', 'sm:text-xl')
    }

    const buttons = heading.parentElement?.querySelectorAll('button')
    if (buttons?.length >= 2) {
      buttons[0].childNodes.forEach(node => { if (node.nodeType === Node.TEXT_NODE) node.textContent = 'Start an Analysis' })
      buttons[1].childNodes.forEach(node => { if (node.nodeType === Node.TEXT_NODE) node.textContent = 'See How It Works' })
    }

    const disclaimer = heading.parentElement?.querySelector('p:last-of-type')
    if (disclaimer && disclaimer !== copy?.[0]) disclaimer.style.display = 'none'
  }, [])

  return null
}

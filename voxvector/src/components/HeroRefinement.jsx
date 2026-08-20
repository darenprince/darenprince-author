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

function createHeroWaveform() {
  if (document.querySelector('.vv-hero-waveform')) return
  const hero = document.querySelector('#product')
  if (!hero) return
  const canvas = document.createElement('canvas')
  canvas.className = 'vv-hero-waveform'
  canvas.setAttribute('aria-hidden', 'true')
  hero.prepend(canvas)
  const ctx = canvas.getContext('2d')
  let raf = 0
  let phase = 0
  let last = performance.now()
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = hero.getBoundingClientRect()
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(Math.max(360, rect.height * 0.82) * dpr)
    canvas.style.height = `${Math.max(360, rect.height * 0.82)}px`
    canvas.style.top = '0'
    canvas.style.width = '100%'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  const draw = (now) => {
    const dt = Math.min(50, now - last)
    last = now
    phase += dt * 0.00028
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    ctx.clearRect(0, 0, width, height)
    const center = height * 0.34
    const bars = Math.max(72, Math.floor(width / 11))
    const gap = 4
    const barWidth = Math.max(1.5, (width - (bars - 1) * gap) / bars)
    for (let i = 0; i < bars; i += 1) {
      const x = i * (barWidth + gap)
      const envelope = Math.pow(Math.sin(Math.PI * i / (bars - 1)), 0.68)
      const signal = 0.52 + 0.26 * Math.sin(i * 0.31 + phase * 4.0) + 0.16 * Math.sin(i * 0.087 - phase * 2.3) + 0.08 * Math.sin(i * 0.67 + phase * 1.2)
      const h = Math.max(10, height * 0.46 * envelope * Math.abs(signal))
      const y = center - h / 2
      const gradient = ctx.createLinearGradient(0, y, 0, y + h)
      gradient.addColorStop(0, 'rgba(201,154,102,0.18)')
      gradient.addColorStop(0.5, 'rgba(201,154,102,0.60)')
      gradient.addColorStop(1, 'rgba(201,154,102,0.18)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, h, Math.min(3, barWidth / 2))
      ctx.fill()
    }
    raf = requestAnimationFrame(draw)
  }
  resize()
  window.addEventListener('resize', resize)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!reduced.matches) raf = requestAnimationFrame(draw)
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); canvas.remove() }
}

function refineHeroActions() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
  let node
  let analyze = null
  while ((node = walker.nextNode())) {
    if (node.children.length === 0 && node.textContent?.trim().toLowerCase() === 'analyze audio') { analyze = node; break }
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
    truth.textContent = 'TRUTH'
    firstLine.append(truth)
    const secondLine = document.createElement('span')
    secondLine.className = 'vv-hero-line vv-hero-audio-line'
    secondLine.textContent = 'IN YOUR AUDIO'
    heading.append(firstLine, secondLine)
    createHeroWaveform()
    refineHeroActions()
    const observer = new MutationObserver(() => { createHeroWaveform(); refineHeroActions() })
    observer.observe(document.body, { childList: true, subtree: true })
    const timeout = window.setTimeout(() => { createHeroWaveform(); refineHeroActions() }, 80)
    return () => { observer.disconnect(); window.clearTimeout(timeout) }
  }, [])
  return null
}

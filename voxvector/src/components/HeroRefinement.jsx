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
    phase += dt * 0.00034
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
      gradient.addColorStop(0, 'rgba(201,154,102,0.14)')
      gradient.addColorStop(0.5, 'rgba(201,154,102,0.52)')
      gradient.addColorStop(1, 'rgba(201,154,102,0.14)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, h, Math.min(3, barWidth / 2))
      ctx.fill()
    }
  }
  resize()
  window.addEventListener('resize', resize)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!reduced.matches) raf = requestAnimationFrame(function loop(now) { draw(now); raf = requestAnimationFrame(loop) })
  else draw(performance.now())
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); canvas.remove() }
}

function createSectionSignalField(selector, variant = 'radar') {
  const section = document.querySelector(selector)
  if (!section || section.querySelector('.vv-section-signal')) return undefined
  if (getComputedStyle(section).position === 'static') section.style.position = 'relative'
  const canvas = document.createElement('canvas')
  canvas.className = `vv-section-signal vv-section-signal-${variant}`
  canvas.setAttribute('aria-hidden', 'true')
  section.prepend(canvas)
  const ctx = canvas.getContext('2d')
  let raf = 0
  let phase = 0
  let last = performance.now()

  const resize = () => {
    const rect = section.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const draw = (now) => {
    const dt = Math.min(50, now - last)
    last = now
    phase += dt * 0.00022
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    ctx.clearRect(0, 0, width, height)
    const cx = variant === 'radar' ? width * 0.78 : width * 0.5
    const cy = height * 0.48
    const base = Math.min(width, height) * (variant === 'radar' ? 0.24 : 0.3)

    const glow = ctx.createRadialGradient(cx, cy, base * .15, cx, cy, base * 2.2)
    glow.addColorStop(0, 'rgba(201,154,102,.055)')
    glow.addColorStop(.55, 'rgba(201,154,102,.018)')
    glow.addColorStop(1, 'rgba(201,154,102,0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(cx, cy, base * 2.2, 0, Math.PI * 2)
    ctx.fill()

    for (let ring = 0; ring < 4; ring += 1) {
      const radius = base * (.56 + ring * .19)
      ctx.beginPath()
      for (let i = 0; i <= 96; i += 1) {
        const angle = (i / 96) * Math.PI * 2
        const ripple = 1 + Math.sin(i * .27 + phase * (2 + ring * .35)) * .022
        const r = radius * ripple
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(201,154,102,${.025 + ring * .008})`
      ctx.lineWidth = ring === 0 ? 1.1 : .7
      ctx.stroke()
    }

    if (variant === 'evidence') {
      const sweep = (phase * .32) % 1
      const x = width * sweep
      const line = ctx.createLinearGradient(x - 90, 0, x + 90, 0)
      line.addColorStop(0, 'rgba(201,154,102,0)')
      line.addColorStop(.5, 'rgba(201,154,102,.16)')
      line.addColorStop(1, 'rgba(201,154,102,0)')
      ctx.fillStyle = line
      ctx.fillRect(x - 90, 0, 180, height)
    }

    raf = requestAnimationFrame(draw)
  }

  resize()
  window.addEventListener('resize', resize)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!reduced.matches) raf = requestAnimationFrame(draw)
  else draw(performance.now())
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
    createSectionSignalField('#technology', 'radar')
    createSectionSignalField('#workflow', 'evidence')
    refineHeroActions()
    const observer = new MutationObserver(() => {
      createHeroWaveform()
      createSectionSignalField('#technology', 'radar')
      createSectionSignalField('#workflow', 'evidence')
      refineHeroActions()
    })
    observer.observe(document.body, { childList: true, subtree: true })
    const timeout = window.setTimeout(() => {
      createHeroWaveform()
      createSectionSignalField('#technology', 'radar')
      createSectionSignalField('#workflow', 'evidence')
      refineHeroActions()
    }, 80)
    return () => { observer.disconnect(); window.clearTimeout(timeout) }
  }, [])
  return null
}

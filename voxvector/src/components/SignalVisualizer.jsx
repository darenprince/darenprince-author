import { useEffect, useRef } from 'react'
import './SignalVisualizer.css'

const GOLD = [201, 154, 102]

function rgba(alpha, values = GOLD) {
  return `rgba(${values[0]},${values[1]},${values[2]},${alpha})`
}

/**
 * Brand-specific canvas visualizer inspired by radial frequency rings and
 * spectrum fields. It is deliberately 2D and dependency-free rather than
 * reproducing the referenced CodePen's Three.js scene.
 */
export default function SignalVisualizer({ analyser = null, playing = false, mode = 'radial', label = 'Live audio visualization' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let raf = 0
    let phase = 0
    let last = performance.now()
    let disposed = false

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now) => {
      if (disposed) return
      const dt = Math.min(50, now - last)
      last = now
      phase += dt * (playing ? 0.00125 : 0.00038)

      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)

      let frequency = null
      if (analyser && playing) {
        frequency = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(frequency)
      }

      if (mode === 'spectrum') drawSpectrum(ctx, width, height, frequency, phase, playing)
      else drawRadial(ctx, width, height, frequency, phase, playing)

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!reduced.matches) raf = requestAnimationFrame(draw)
    else draw(performance.now())

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [analyser, playing, mode])

  return <canvas ref={canvasRef} className="vv-signal-visualizer" aria-label={label} role="img" />
}

function drawRadial(ctx, width, height, frequency, phase, playing) {
  const cx = width / 2
  const cy = height / 2
  const radius = Math.min(width, height) * 0.28
  const points = 128
  const rings = 3

  const halo = ctx.createRadialGradient(cx, cy, radius * 0.25, cx, cy, radius * 2.1)
  halo.addColorStop(0, rgba(playing ? 0.085 : 0.035))
  halo.addColorStop(0.55, rgba(playing ? 0.035 : 0.012))
  halo.addColorStop(1, rgba(0))
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(cx, cy, radius * 2.1, 0, Math.PI * 2)
  ctx.fill()

  for (let ring = 0; ring < rings; ring += 1) {
    const base = radius * (0.72 + ring * 0.18)
    ctx.beginPath()
    for (let i = 0; i <= points; i += 1) {
      const angle = (i / points) * Math.PI * 2
      const index = frequency ? Math.floor((i / points) * Math.min(frequency.length, 180)) : 0
      const live = frequency ? frequency[index] / 255 : 0
      const ambient = 0.035 + 0.025 * Math.sin(i * 0.31 + phase * 2 + ring)
      const modulation = live * (playing ? 0.22 : 0)
      const wave = Math.sin(i * (0.18 + ring * 0.035) + phase * (1.4 + ring * 0.25)) * 0.035
      const r = base * (1 + ambient + modulation + wave)
      const x = cx + Math.cos(angle) * r
      const y = cy + Math.sin(angle) * r
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    const gradient = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius)
    gradient.addColorStop(0, rgba(playing ? 0.14 : 0.055))
    gradient.addColorStop(0.5, rgba(playing ? 0.64 : 0.18))
    gradient.addColorStop(1, rgba(playing ? 0.12 : 0.04))
    ctx.strokeStyle = gradient
    ctx.lineWidth = ring === 0 ? 1.35 : 0.8
    ctx.stroke()
  }

  if (playing && frequency) {
    const bars = 64
    for (let i = 0; i < bars; i += 1) {
      const value = frequency[Math.floor((i / bars) * Math.min(frequency.length, 160))] / 255
      const angle = (i / bars) * Math.PI * 2
      const inner = radius * 1.02
      const outer = inner + radius * (0.12 + value * 0.42)
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner)
      ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer)
      ctx.strokeStyle = rgba(0.13 + value * 0.48)
      ctx.lineWidth = 1.15
      ctx.stroke()
    }
  }

  ctx.beginPath()
  ctx.arc(cx, cy, radius * 0.57, 0, Math.PI * 2)
  ctx.strokeStyle = rgba(playing ? 0.16 : 0.07)
  ctx.lineWidth = 1
  ctx.stroke()
}

function drawSpectrum(ctx, width, height, frequency, phase, playing) {
  const bars = Math.min(96, Math.max(32, Math.floor(width / 7)))
  const gap = 2
  const barWidth = Math.max(1, (width - gap * (bars - 1)) / bars)
  const mid = height / 2
  const usable = height * 0.78

  ctx.strokeStyle = rgba(0.045)
  ctx.lineWidth = 1
  for (let i = 1; i < 4; i += 1) {
    const y = (height / 4) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  for (let i = 0; i < bars; i += 1) {
    const live = frequency ? frequency[Math.floor((i / bars) * Math.min(frequency.length, 220))] / 255 : 0
    const ambient = 0.08 + 0.06 * Math.abs(Math.sin(i * 0.23 + phase * 2.2))
    const energy = playing ? live * 0.92 : 0
    const h = Math.max(3, usable * (ambient + energy * 0.78))
    const x = i * (barWidth + gap)
    const gradient = ctx.createLinearGradient(0, mid - h / 2, 0, mid + h / 2)
    gradient.addColorStop(0, rgba(0.05))
    gradient.addColorStop(0.5, rgba(playing ? 0.62 : 0.18))
    gradient.addColorStop(1, rgba(0.05))
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.roundRect(x, mid - h / 2, barWidth, h, Math.min(3, barWidth / 2))
    ctx.fill()
  }
}

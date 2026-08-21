import { useEffect, useRef, useState } from 'react'
import SiriWave from 'siriwave'
import { Activity, Loader2, Radio, WifiOff } from 'lucide-react'

const WAVE_COLORS = [
  { color: '245,243,238', supportLine: true },
  { color: '154,154,154' },
  { color: '143,93,53' },
  { color: '201,154,102' },
]

export default function LiveApiVisualizer({ active = false, success = false, error = false, label = 'API activity', detail = '' }) {
  const containerRef = useRef(null)
  const waveRef = useRef(null)
  const [ready, setReady] = useState(false)
  const state = error ? 'error' : active ? 'active' : success ? 'ready' : 'idle'
  const stateLabel = error ? 'REQUEST ERROR' : active ? 'REQUEST IN FLIGHT' : success ? 'API READY' : 'IDLE'

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined
    let disposed = false
    let resizeObserver
    let resizeTimer

    const mountWave = () => {
      if (disposed) return
      waveRef.current?.dispose?.()
      container.replaceChildren()
      const width = Math.max(280, Math.round(container.getBoundingClientRect().width || 640))
      const wave = new SiriWave({
        container,
        width,
        height: 126,
        style: 'ios9',
        ratio: Math.min(window.devicePixelRatio || 1, 2),
        speed: active ? 0.18 : success ? 0.075 : 0.045,
        amplitude: active ? 1.15 : success ? 0.5 : error ? 0.3 : 0.2,
        autostart: false,
        cover: true,
        globalCompositeOperation: 'lighter',
        curveDefinition: WAVE_COLORS,
      })
      waveRef.current = wave
      setReady(true)
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        wave.setAmplitude(0.05)
        wave.stop()
      } else wave.start()
    }

    mountWave()
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(mountWave, 120)
      })
      resizeObserver.observe(container)
    }
    return () => {
      disposed = true
      window.clearTimeout(resizeTimer)
      resizeObserver?.disconnect()
      waveRef.current?.dispose?.()
      waveRef.current = null
    }
  }, [])

  useEffect(() => {
    const wave = waveRef.current
    if (!wave) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      wave.setAmplitude(0.05)
      wave.stop()
      return
    }
    wave.setSpeed(active ? 0.18 : success ? 0.075 : 0.045)
    wave.setAmplitude(active ? 1.15 : success ? 0.5 : error ? 0.3 : 0.2)
    wave.start()
  }, [active, success, error])

  return <div className={`vv-api-visualizer vv-api-visualizer-${state}`} aria-live="polite" data-state={state}>
    <div className="vv-api-visualizer-head">
      <div className="vv-api-visualizer-label">
        {active ? <Loader2 size={14} className="vv-spin-soft" /> : error ? <WifiOff size={14} /> : success ? <Radio size={14} /> : <Activity size={14} />}
        {label}
      </div>
      <span>{stateLabel}</span>
    </div>

    <div className="vv-api-wave-stage">
      <div className="vv-old-wave" aria-hidden="true">
        {Array.from({ length: 64 }, (_, i) => {
          const h = 12 + Math.abs(Math.sin(i * 0.63)) * 28 + Math.abs(Math.sin(i * 0.17)) * 12
          return <i key={i} style={{ '--h': `${h}px`, '--d': `${(i % 9) * 0.045}s` }} />
        })}
      </div>
      <div ref={containerRef} className={`vv-siriwave ${ready ? 'is-ready' : ''}`} role="img" aria-label={`${label}: ${stateLabel}`} />
    </div>

    <div className="vv-api-visualizer-foot">
      <span>{detail || (active ? 'Waiting for the real API response…' : error ? 'The API request failed.' : success ? 'Last API state completed successfully.' : 'No request is currently running.')}</span>
      {active && <span className="vv-api-live">Live</span>}
    </div>
  </div>
}

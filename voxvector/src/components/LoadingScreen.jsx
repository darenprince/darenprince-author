import { useEffect, useMemo, useState } from 'react'

const LOGO = '/voxvector/assets/voxvector-icon-final-color.png'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const bars = useMemo(() => Array.from({ length: 54 }, (_, index) => ({
    index,
    height: 12 + Math.abs(Math.sin(index * 0.62)) * 44 + Math.abs(Math.sin(index * 0.17)) * 18,
  })), [])

  useEffect(() => {
    const started = performance.now()
    const duration = 1900
    let frame

    const tick = (now) => {
      const elapsed = now - started
      const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3)
      setProgress(Math.round(eased * 100))
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => setVisible(false), 220)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="vv-loader" role="status" aria-live="polite" aria-label={`Loading VoxVector ${progress}%`}>
      <div className="vv-loader__ambient" aria-hidden="true" />
      <div className="vv-loader__stage">
        <div className="vv-loader__mark-wrap">
          <div className="vv-loader__orbit vv-loader__orbit--outer" aria-hidden="true" />
          <div className="vv-loader__orbit vv-loader__orbit--inner" aria-hidden="true" />
          <div className="vv-loader__halo" aria-hidden="true" />
          <img className="vv-loader__mark" src={LOGO} alt="VoxVector" />
        </div>

        <div className="vv-loader__wave" aria-hidden="true">
          <span className="vv-loader__wave-line" />
          <div className="vv-loader__bars">
            {bars.map((bar) => (
              <i
                key={bar.index}
                style={{ '--vv-bar-height': `${bar.height}%`, '--vv-bar-delay': `${bar.index * -0.035}s` }}
              />
            ))}
          </div>
        </div>

        <div className="vv-loader__label">VOXVECTOR</div>
        <div className="vv-loader__subline">VOCAL INTELLIGENCE SYSTEM</div>

        <div className="vv-loader__progress" aria-hidden="true">
          <div className="vv-loader__track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="vv-loader__meta">
            <span>INITIALIZING ANALYSIS ENGINE</span>
            <strong>{progress}%</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

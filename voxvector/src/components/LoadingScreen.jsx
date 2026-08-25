import { useEffect, useState } from 'react'

const LOGO = '/voxvector/voxvector-icon-final-color.png.PNG'

function SignalField() {
  return (
    <div className="vv-loader__signals" aria-hidden="true">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="vv-loader-signal" x1="0" x2="1">
            <stop offset="0" stopColor="#5f4636" stopOpacity="0" />
            <stop offset="0.48" stopColor="#a77b58" stopOpacity="0.42" />
            <stop offset="0.52" stopColor="#c99a72" stopOpacity="0.58" />
            <stop offset="1" stopColor="#5f4636" stopOpacity="0" />
          </linearGradient>
          <filter id="vv-loader-soft-glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <g className="vv-loader__signal-track">
          <path className="vv-loader__signal vv-loader__signal--primary" d="M-40 360 C 80 360 100 235 205 360 S 340 485 455 360 S 590 235 705 360 S 840 485 955 360 S 1090 235 1240 360" />
          <path className="vv-loader__signal vv-loader__signal--secondary" d="M-60 430 C 55 430 105 330 195 430 S 330 530 440 430 S 575 330 690 430 S 825 530 940 430 S 1080 330 1260 430" />
          <path className="vv-loader__signal vv-loader__signal--tertiary" d="M-80 275 C 40 275 105 190 220 275 S 365 360 485 275 S 625 190 745 275 S 885 360 1005 275 S 1130 190 1280 275" />
        </g>
        <g className="vv-loader__signal-grid">
          <path d="M0 350 H1200" /><path d="M0 280 H1200" /><path d="M0 420 H1200" />
        </g>
      </svg>
    </div>
  )
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [logoFailed, setLogoFailed] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1400)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!visible) return null

  return (
    <div className="vv-loader" role="status" aria-live="polite" aria-label="Loading VoxVector">
      <SignalField />
      <div className="vv-loader__stage">
        <div className="vv-loader__mark-wrap">
          <div className="vv-loader__orbit vv-loader__orbit--outer" aria-hidden="true" />
          <div className="vv-loader__orbit vv-loader__orbit--inner" aria-hidden="true" />
          <div className="vv-loader__pulse" aria-hidden="true" />
          {logoFailed ? (
            <span className="vv-loader__fallback" aria-hidden="true">VV</span>
          ) : (
            <img className="vv-loader__mark" src={LOGO} alt="VoxVector" onError={() => setLogoFailed(true)} />
          )}
        </div>
        <div className="vv-loader__label">VOXVECTOR</div>
      </div>
    </div>
  )
}

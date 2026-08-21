import { useEffect, useState } from 'react'

const LOGO = '/voxvector/assets/voxvector-icon-final-color.png'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1900)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!visible) return null

  return (
    <div className="vv-loader" role="status" aria-live="polite" aria-label="Loading VoxVector">
      <div className="vv-loader__stage">
        <div className="vv-loader__mark-wrap">
          <div className="vv-loader__orbit vv-loader__orbit--outer" aria-hidden="true" />
          <div className="vv-loader__orbit vv-loader__orbit--inner" aria-hidden="true" />
          <img className="vv-loader__mark" src={LOGO} alt="VoxVector" />
        </div>
      </div>
    </div>
  )
}

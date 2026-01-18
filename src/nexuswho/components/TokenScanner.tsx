import React, { useEffect, useRef, useState } from 'react'
import { QrCode } from 'phosphor-react'
import { Html5Qrcode } from 'html5-qrcode'

interface TokenScannerProps {
  onScan: (token: string) => void
}

const TokenScanner = ({ onScan }: TokenScannerProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [active, setActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const elementId = 'vibe-prism-scanner'

  useEffect(() => {
    if (!active) {
      return
    }

    const scanner = new Html5Qrcode(elementId)
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          onScan(decodedText)
          scanner.stop().catch(() => undefined)
          setActive(false)
        },
        (scanError) => {
          if (typeof scanError === 'string' && scanError.includes('NotFound')) {
            return
          }
          setError('Camera scan is active. Align the QR token.')
        }
      )
      .catch((err) => {
        setError(String(err))
        setActive(false)
      })

    return () => {
      scanner
        .stop()
        .then(() => scanner.clear())
        .catch(() => undefined)
    }
  }, [active, onScan])

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3">
        <QrCode size={24} className="text-sky-300" />
        <div>
          <h3 className="text-lg font-semibold">Scan Token</h3>
          <p className="text-sm text-slate-400">Use your camera to restore a Nexus Who payload.</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setActive((prev) => !prev)}
          className="button-secondary"
        >
          {active ? 'Stop Scanner' : 'Start Scanner'}
        </button>
      </div>
      {active && <div id={elementId} className="mt-4 overflow-hidden rounded-xl" />}
      {error && <p className="mt-3 text-xs text-rose-300">{error}</p>}
    </div>
  )
}

export default TokenScanner

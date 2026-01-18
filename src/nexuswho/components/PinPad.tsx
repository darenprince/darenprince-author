import React, { useMemo, useState } from 'react'
import { Shield } from 'phosphor-react'

const DEV_EMBEDDED_PIN = '55486423'

const getLockTimeout = (attempts: number) => {
  if (attempts <= 0) {
    return 0
  }
  return Math.min(60000, 3000 * attempts * attempts)
}

interface PinPadProps {
  onUnlock: () => void
}

const PinPad = ({ onUnlock }: PinPadProps) => {
  const [pin, setPin] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [lockUntil, setLockUntil] = useState<number | null>(null)

  const locked = lockUntil !== null && lockUntil > Date.now()

  const masked = useMemo(() => '•'.repeat(pin.length).padEnd(8, '•'), [pin])

  const handleDigit = (digit: string) => {
    if (locked || pin.length >= 8) {
      return
    }
    setPin((prev) => prev + digit)
  }

  const handleBackspace = () => {
    if (locked) {
      return
    }
    setPin((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    if (locked) {
      return
    }
    setPin('')
  }

  const handleSubmit = () => {
    if (locked || pin.length < 8) {
      return
    }

    if (pin === DEV_EMBEDDED_PIN) {
      sessionStorage.setItem('VP_DECODE_UNLOCK', '1')
      onUnlock()
      return
    }

    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)
    setPin('')

    if (nextAttempts >= 3) {
      const timeout = getLockTimeout(nextAttempts)
      setLockUntil(Date.now() + timeout)
      setTimeout(() => setLockUntil(null), timeout + 200)
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3">
        <Shield size={28} className="text-sky-300" />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Nexus Who Access</p>
          <h2 className="text-xl font-semibold">Enter 8-digit PIN</h2>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-lg tracking-[0.3em]">
        <span>{masked}</span>
        {locked && <span className="text-xs uppercase tracking-[0.3em] text-rose-300">Locked</span>}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            type="button"
            onClick={() => handleDigit(digit)}
            className="rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-semibold text-slate-100 transition hover:border-fuchsia-400/40"
          >
            {digit}
          </button>
        ))}
        <button
          type="button"
          onClick={handleClear}
          className="rounded-xl border border-white/10 bg-white/5 py-3 text-xs uppercase tracking-[0.3em] text-slate-400"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => handleDigit('0')}
          className="rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-semibold text-slate-100 transition hover:border-fuchsia-400/40"
        >
          0
        </button>
        <button
          type="button"
          onClick={handleBackspace}
          className="rounded-xl border border-white/10 bg-white/5 py-3 text-xs uppercase tracking-[0.3em] text-slate-400"
        >
          Delete
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={handleSubmit} className="button-primary">
          Unlock
        </button>
        {attempts > 0 && <span className="text-xs text-slate-400">Attempts: {attempts} / 3</span>}
      </div>
    </div>
  )
}

export default PinPad

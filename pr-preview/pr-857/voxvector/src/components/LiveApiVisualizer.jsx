import { motion } from 'motion/react'
import { Activity, Loader2, Radio, WifiOff } from 'lucide-react'

const bars = Array.from({ length: 28 }, (_, i) => i)

export default function LiveApiVisualizer({ active = false, success = false, error = false, label = 'API activity', detail = '' }) {
  const state = error ? 'error' : active ? 'active' : success ? 'ready' : 'idle'
  const stateLabel = error ? 'REQUEST ERROR' : active ? 'REQUEST IN FLIGHT' : success ? 'API READY' : 'IDLE'

  return <div className="border border-white/10 bg-black/25 p-4" aria-live="polite">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-xs font-medium text-white/70">
        {active ? <Loader2 size={14} className="animate-spin" /> : error ? <WifiOff size={14} /> : success ? <Radio size={14} /> : <Activity size={14} />}
        {label}
      </div>
      <span className="text-[10px] uppercase tracking-[.16em] text-white/35">{stateLabel}</span>
    </div>
    <div className="mt-4 flex h-16 items-center gap-[3px] overflow-hidden border-y border-white/6 px-2" role="img" aria-label={`${label}: ${stateLabel}`}>
      {bars.map(i => {
        const base = 8 + ((i * 17) % 31)
        return <motion.span key={i} className="block w-full min-w-[2px] bg-white/45" initial={{ height: base }} animate={state === 'active' ? { height: [base, 10 + ((i * 29) % 45), base / 2, base + 14, base] } : state === 'error' ? { height: 5 } : state === 'ready' ? { height: [base / 2, base, base / 2] } : { height: base / 2 }} transition={state === 'active' ? { duration: .8 + (i % 5) * .08, repeat: Infinity, ease: 'easeInOut', delay: i * .012 } : state === 'ready' ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * .025 } : { duration: .2 }} />
      })}
    </div>
    <div className="mt-3 flex items-center justify-between gap-4 text-[11px] text-white/30"><span>{detail || (active ? 'Waiting for the real API response…' : error ? 'The API request failed.' : success ? 'Last API state completed successfully.' : 'No request is currently running.')}</span>{active && <span className="shrink-0">Live</span>}</div>
  </div>
}

import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

export default function Toast({ toast, onDismiss }) {
  if (!toast) return null
  const Icon = ICONS[toast.type] || Info
  return <div className="fixed right-4 top-4 z-[120] w-[min(390px,calc(100vw-2rem))]" role={toast.type === 'error' ? 'alert' : 'status'} aria-live="polite">
    <div className="flex items-start gap-3 border border-white/10 bg-[#111]/95 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,.42)] backdrop-blur-xl">
      <span className={`mt-0.5 ${toast.type === 'success' ? 'text-emerald-300' : toast.type === 'error' ? 'text-red-300' : toast.type === 'warning' ? 'text-amber-300' : 'text-sky-300'}`}><Icon size={18}/></span>
      <div className="min-w-0 flex-1"><div className="text-sm font-semibold text-white">{toast.title}</div>{toast.message && <div className="mt-1 text-xs leading-5 text-white/55">{toast.message}</div>}{toast.requestId && <div className="mt-2 text-[10px] font-mono text-white/30">Request {toast.requestId}</div>}</div>
      <button type="button" onClick={onDismiss} aria-label="Dismiss notification" className="inline-flex h-7 w-7 items-center justify-center text-white/35 transition hover:text-white"><X size={15}/></button>
    </div>
  </div>
}
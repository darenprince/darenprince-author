import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../lib/api'
import ApiStartup from './ApiStartup'
import AuthGate from './AuthGate'

export default function DeveloperGate({ children, onBack }) {
  return <AuthGate allowedRoles={['developer', 'admin']} onBack={onBack}>
    {({ session, signOut, role }) => <DeveloperStartup session={session} signOut={signOut} role={role}>{children}</DeveloperStartup>}
  </AuthGate>
}

function DeveloperStartup({ session, signOut, role, children }) {
  const [phase, setPhase] = useState('startup')
  const [preloadProgress, setPreloadProgress] = useState(0)
  const health = useQuery({ queryKey: ['developer-startup-health'], queryFn: getHealth, refetchInterval: 1500, retry: false, staleTime: 0 })
  const apiReady = health.isSuccess && health.data?.payload?.status === 'ok' && health.data?.payload?.runtime_self_test === 'passed'

  useEffect(() => {
    if (phase !== 'startup' || !apiReady) return undefined
    setPhase('verifying')
    return undefined
  }, [apiReady, phase])

  useEffect(() => {
    if (phase !== 'verifying') return undefined
    const timer = window.setTimeout(() => setPhase('leaving'), 1480)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return undefined
    const timer = window.setTimeout(() => setPhase('preloader'), 520)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'preloader') return undefined
    setPreloadProgress(12)
    const started = performance.now()
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - started
      setPreloadProgress(Math.min(94, Math.round(12 + (elapsed / 730) * 82)))
    }, 45)
    const finish = window.setTimeout(() => { setPreloadProgress(100); setPhase('ready') }, 730)
    return () => { window.clearInterval(timer); window.clearTimeout(finish) }
  }, [phase])

  if (phase === 'startup' || phase === 'verifying' || phase === 'leaving') return <ApiStartup health={health} session={session} verifying={phase === 'verifying'} leaving={phase === 'leaving'} />
  if (phase === 'preloader') return <StartupPreloader progress={preloadProgress} />
  return children({ session, signOut, role })
}

function StartupPreloader({ progress }) {
  return <motion.main className="vv-console-preloader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" aria-live="polite" aria-label="Loading VoxVector developer dashboard"><div className="vv-console-preloader__mark"><img src="/voxvector/voxvector_logo_icon.png" alt=""/><span /></div><div className="vv-console-preloader__eyebrow">VOXVECTOR DEVELOPER CONSOLE</div><div className="vv-console-preloader__title">Loading dashboard</div><div className="vv-console-preloader__bar"><div style={{ width: `${progress}%` }} /></div><div className="vv-console-preloader__progress">Initializing workspace · {progress}%</div><div className="vv-console-preloader__detail">API ready · restoring the developer workspace</div></motion.main>
}

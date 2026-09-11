import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Activity, Database, Gauge, Server, ShieldCheck, Waves, CheckCircle2, LoaderCircle } from 'lucide-react'
import { version as webVersion } from '../../package.json'

const STEPS = [
  { id: 'connection', label: 'API connection', detail: 'Establishing a connection to the canonical VoxVector API.', icon: Server },
  { id: 'health', label: 'Health endpoint', detail: 'Confirming the service is responding normally.', icon: Activity },
  { id: 'runtime', label: 'Runtime self test', detail: 'Checking the backend analysis runtime self test.', icon: Gauge },
  { id: 'pipeline', label: 'Pipeline readiness', detail: 'Reading the canonical 21 stage pipeline build state.', icon: Waves },
  { id: 'storage', label: 'Case workflow', detail: 'Confirming the authenticated case workflow can be opened.', icon: Database },
  { id: 'security', label: 'Developer session', detail: 'Confirming the authenticated developer console session.', icon: ShieldCheck },
]

function evidenceState(id, health, session) {
  const payload = health.data?.payload || {}
  if (id === 'connection') return health.isError ? 'error' : health.isSuccess ? 'done' : 'active'
  if (!health.isSuccess) return 'queued'
  if (id === 'health') return payload?.status === 'ok' ? 'done' : 'active'
  if (id === 'runtime') return payload?.runtime_self_test === 'passed' ? 'done' : payload?.status === 'ok' ? 'active' : 'queued'
  if (id === 'pipeline') return payload?.pipeline_build?.total === 21 ? 'done' : payload?.status === 'ok' ? 'active' : 'queued'
  if (id === 'storage') return payload?.status === 'ok' && session ? 'done' : payload?.status === 'ok' ? 'active' : 'queued'
  if (id === 'security') return session ? 'done' : 'active'
  return 'queued'
}

function visibleStepState(step, index, health, session, revealedSteps) {
  if (index >= revealedSteps && step.id !== 'connection') return 'queued'
  return evidenceState(step.id, health, session)
}

function StepRow({ step, state, health, wakeSeconds }) {
  const Icon = step.icon
  const isDone = state === 'done'
  const isError = state === 'error'
  const isActive = state === 'active'
  const waking = step.id === 'connection' && !health.isSuccess
  const status = isDone ? 'COMPLETE' : isError ? 'RETRYING' : waking ? 'WAKING' : isActive ? 'CHECKING' : 'WAITING'
  const detail = step.id === 'connection'
    ? health.isSuccess
      ? 'Connection established to the canonical VoxVector API.'
      : health.isError
        ? `No response yet · retrying automatically · ${wakeSeconds}s elapsed`
        : `Waking the canonical API · ${wakeSeconds}s elapsed`
    : step.detail

  return <div className={`vv-api-start__step ${isDone ? 'is-done' : isError ? 'is-error' : isActive ? 'is-active' : ''}`}>
    <div className="vv-api-start__step-icon">{isDone ? <CheckCircle2 size={18}/> : isActive || waking ? <LoaderCircle size={18} className="animate-spin"/> : <Icon size={18}/>}</div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between gap-3"><strong>{step.label}</strong><span>{status}</span></div>
      <p>{detail}</p>
      <div className={`vv-api-start__bar ${waking ? 'is-indeterminate' : ''}`}><div className={isDone ? 'is-complete' : ''} style={waking ? undefined : { width: isDone ? '100%' : isActive ? '58%' : '8%' }} /></div>
      {step.id === 'runtime' && health.data?.payload?.runtime_self_test && <div className="vv-api-start__meta">Runtime self test: {health.data.payload.runtime_self_test}</div>}
      {step.id === 'pipeline' && health.data?.payload?.pipeline_build?.total != null && <div className="vv-api-start__meta">Pipeline: {health.data.payload.pipeline_build.implemented_foundations || 0}/{health.data.payload.pipeline_build.total} foundations reported</div>}
    </div>
  </div>
}

export default function ApiStartup({ health, session, verifying = false, leaving }) {
  const payload = health.data?.payload || {}
  const [wakeSeconds, setWakeSeconds] = useState(0)
  const [revealedSteps, setRevealedSteps] = useState(1)

  useEffect(() => {
    if (health.isSuccess) return undefined
    const started = Date.now()
    setWakeSeconds(0)
    const timer = window.setInterval(() => setWakeSeconds(Math.floor((Date.now() - started) / 1000)), 1000)
    return () => window.clearInterval(timer)
  }, [health.isSuccess])

  useEffect(() => {
    if (!verifying || !health.isSuccess) return undefined
    setRevealedSteps(2)
    const timer = window.setInterval(() => {
      setRevealedSteps(value => {
        if (value >= STEPS.length) {
          window.clearInterval(timer)
          return value
        }
        return value + 1
      })
    }, 210)
    return () => window.clearInterval(timer)
  }, [health.isSuccess, verifying])

  const visibleStates = STEPS.map((step, index) => visibleStepState(step, index, health, session, revealedSteps))
  const done = Boolean(payload.status === 'ok' && payload.runtime_self_test === 'passed' && session && revealedSteps >= STEPS.length)
  const completed = visibleStates.filter(state => state === 'done').length
  const verificationPercent = Math.round((completed / STEPS.length) * 100)
  const waking = !health.isSuccess
  const overallLabel = done ? 'READY' : waking ? (health.isError ? 'RETRYING API' : 'WAKING API') : `${verificationPercent}%`
  const apiVersion = payload.pipeline || payload.package_version || payload.api_version || ''

  return <AnimatePresence>
    {!leaving && <motion.section className="vv-api-start" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: .985, y: -18 }} transition={{ duration: .5, ease: 'easeInOut' }} aria-label="VoxVector API initialization">
      <div className="vv-api-start__backdrop" />
      <motion.div className="vv-api-start__panel" initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .45 }}>
        <div className="vv-api-start__brand"><img src="/voxvector/voxvector_logo_icon.png" alt=""/><div><div className="vv-api-start__eyebrow">VOXVECTOR DEVELOPER CONSOLE</div><h1>{waking ? 'API initializing' : 'Verifying runtime'}</h1><p>{waking ? 'The console will open when the canonical backend responds.' : 'Backend response received. Confirming the returned runtime state.'}</p></div></div>
        <div className="vv-api-start__overall" aria-live="polite"><div><span>{waking ? `BACKEND WAKE · ${wakeSeconds}s` : 'STARTUP VERIFICATION'}</span><strong>{overallLabel}</strong></div><div className={`vv-api-start__overall-meter ${waking ? 'is-indeterminate' : ''}`}><div className={done ? 'is-complete' : ''} style={waking ? undefined : { width: `${done ? 100 : verificationPercent}%` }} /></div></div>
        <div className="vv-api-start__steps">{STEPS.map((step, index) => <StepRow key={step.id} step={step} state={visibleStates[index]} health={health} wakeSeconds={wakeSeconds}/>)}</div>
        <div className="vv-api-start__footer"><span>WEB v{webVersion} · API {apiVersion ? `v${apiVersion}` : 'version pending'}</span><span>{payload?.source_revision ? `rev ${payload.source_revision.slice(0, 12)}` : 'source revision pending'}</span></div>
      </motion.div>
    </motion.section>}
  </AnimatePresence>
}
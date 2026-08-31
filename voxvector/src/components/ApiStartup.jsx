import { AnimatePresence, motion } from 'motion/react'
import { Activity, Database, FileCheck2, Gauge, Server, ShieldCheck, Waves, CheckCircle2, LoaderCircle } from 'lucide-react'

const STEPS = [
  { id: 'connection', label: 'API connection', detail: 'Establishing a connection to the canonical VoxVector API.', icon: Server },
  { id: 'health', label: 'Health endpoint', detail: 'Confirming the service is responding normally.', icon: Activity },
  { id: 'runtime', label: 'Runtime self test', detail: 'Checking the backend analysis runtime self test.', icon: Gauge },
  { id: 'pipeline', label: 'Pipeline readiness', detail: 'Reading the canonical 21 stage pipeline build state.', icon: Waves },
  { id: 'storage', label: 'Case storage', detail: 'Preparing the authenticated case and source workflow.', icon: Database },
  { id: 'security', label: 'Developer session', detail: 'Confirming the authenticated developer console session.', icon: ShieldCheck },
]

function stepState(id, health, session) {
  const payload = health.data?.payload || {}
  if (id === 'connection') return health.isPending ? 'active' : health.isError ? 'error' : 'done'
  if (id === 'health') return health.isPending ? 'queued' : payload?.status === 'ok' ? 'done' : health.isError ? 'error' : 'active'
  if (id === 'runtime') return payload?.runtime_self_test === 'passed' ? 'done' : payload?.status === 'ok' ? 'active' : 'queued'
  if (id === 'pipeline') return payload?.pipeline_build?.total === 21 ? 'done' : payload?.status === 'ok' ? 'active' : 'queued'
  if (id === 'storage') return payload?.status === 'ok' ? 'active' : 'queued'
  if (id === 'security') return session ? 'done' : 'active'
  return 'queued'
}

function StepRow({ step, state, health }) {
  const Icon = step.icon
  const isDone = state === 'done'
  const isError = state === 'error'
  const isActive = state === 'active'
  return <div className={`vv-api-start__step ${isDone ? 'is-done' : isError ? 'is-error' : isActive ? 'is-active' : ''}`}>
    <div className="vv-api-start__step-icon">{isDone ? <CheckCircle2 size={18}/> : isActive ? <LoaderCircle size={18} className="animate-spin"/> : <Icon size={18}/>}</div>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between gap-3"><strong>{step.label}</strong><span>{isDone ? 'COMPLETE' : isError ? 'ERROR' : isActive ? 'CHECKING' : 'WAITING'}</span></div>
      <p>{step.detail}</p>
      <div className="vv-api-start__bar"><div style={{ width: isDone ? '100%' : isActive ? '62%' : '8%' }} /></div>
      {step.id === 'runtime' && health.data?.payload?.runtime_self_test && <div className="vv-api-start__meta">Runtime self test: {health.data.payload.runtime_self_test}</div>}
      {step.id === 'pipeline' && health.data?.payload?.pipeline_build?.total != null && <div className="vv-api-start__meta">Pipeline: {health.data.payload.pipeline_build.implemented_foundations || 0}/{health.data.payload.pipeline_build.total} foundations reported</div>}
    </div>
  </div>
}

export default function ApiStartup({ health, session, leaving }) {
  const done = Boolean(health.data?.payload?.status === 'ok' && health.data?.payload?.runtime_self_test === 'passed' && session)
  return <AnimatePresence>
    {!leaving && <motion.section className="vv-api-start" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: .985, y: -18 }} transition={{ duration: .5, ease: 'easeInOut' }} aria-label="VoxVector API initialization">
      <div className="vv-api-start__backdrop" />
      <motion.div className="vv-api-start__panel" initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .45 }}>
        <div className="vv-api-start__brand"><img src="/voxvector/assets/voxvector-icon-final-color.png" alt=""/><div><div className="vv-api-start__eyebrow">VOXVECTOR DEVELOPER CONSOLE</div><h1>API initializing</h1><p>Console hidden while the canonical backend comes online.</p></div></div>
        <div className="vv-api-start__overall"><div><span>STARTUP SEQUENCE</span><strong>{done ? 'READY' : 'INITIALIZING'}</strong></div><div className="vv-api-start__overall-meter"><div className={done ? 'is-complete' : ''} style={{ width: `${Math.round(STEPS.reduce((sum, step) => sum + (stepState(step.id, health, session) === 'done' ? 1 : stepState(step.id, health, session) === 'active' ? .55 : 0), 0) / STEPS.length * 100)}%` }} /></div></div>
        <div className="vv-api-start__steps">{STEPS.map(step => <StepRow key={step.id} step={step} state={stepState(step.id, health, session)} health={health}/>)}</div>
        <div className="vv-api-start__footer"><span>Canonical API · {health.isSuccess ? 'reachable' : 'waiting for response'}</span><span>{health.data?.payload?.source_revision ? `rev ${health.data.payload.source_revision.slice(0, 12)}` : 'source revision pending'}</span></div>
      </motion.div>
    </motion.section>}
  </AnimatePresence>
}

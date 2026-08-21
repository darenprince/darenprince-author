import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Activity, AlertTriangle, BookOpen, CheckCircle2, ChevronDown, ChevronRight, Circle, CircleCheck, Code2, ExternalLink, FileAudio, Github, ListChecks, LogOut, Menu, Play, RefreshCw, Search, ShieldCheck, Terminal, UserRound, Waves, X, XCircle } from 'lucide-react'
import { analyzeWavWithProgress, API_BASE, getDiagnosticErrors, getDiagnosticEvents, getHealth } from '../lib/api'
import { supabase } from '../lib/supabase'
import Button from './ui/Button'
import Card from './ui/Card'
import Sheet from './ui/Sheet'
import ThemeToggle, { applyTheme, getStoredTheme } from './ui/ThemeToggle'
import './DeveloperConsole.css'

const METHOD_DOC = 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/ANALYSIS_METHODS.md'
const PIPELINE_DOC = 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/ANALYSIS_PIPELINE.md'
const ARCHITECTURE_DOC = 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/ARCHITECTURE.md'
const MVP_DOC = 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/MVP_BUILD_PLAN.md'

const nav = [
  ['dashboard', 'Dashboard', Activity],
  ['api', 'API Workbench', Code2],
  ['mvp', 'MVP Build Plan', ListChecks],
  ['docs', 'Methodology & Docs', BookOpen],
  ['errors', 'Error Reports', AlertTriangle],
  ['logs', 'Live Logs', Terminal],
  ['profile', 'Profile', UserRound],
]

const phases = [
  { id: 'P0', title: 'Lock the case spine', detail: 'Analysis identity, intake record, provenance, storage reference and lifecycle state.', tasks: [
    ['case-schema', 'Canonical analysis case schema', 'backend + frontend'],
    ['intake-persist', 'Persist upload metadata and provenance', 'backend'],
    ['lifecycle', 'Persist request lifecycle and stage state', 'backend'],
  ]},
  { id: 'P1', title: 'Make the recording usable', detail: 'Get from upload to synchronized audio playback with a real analysis identity.', tasks: [
    ['upload', 'Production upload flow and validation', 'frontend + API'],
    ['playback', 'Audio playback with seek and shared playhead', 'frontend'],
    ['waveform', 'Waveform renderer driven by source audio', 'frontend'],
    ['regions', 'Region selection and timestamp navigation', 'frontend'],
  ]},
  { id: 'P2', title: 'Expose the real pipeline', detail: 'Connect actual backend stages to the workspace instead of presentation-only states.', tasks: [
    ['pipeline-contract', 'Pipeline stage contract and status mapping', 'backend + frontend'],
    ['quality', 'Eligibility and signal quality record', 'backend'],
    ['tracks', 'Real pitch, intensity, spectral and temporal tracks', 'backend + frontend'],
    ['events', 'Timestamped evidence events and markers', 'backend'],
  ]},
  { id: 'P3', title: 'Speaker + transcript spine', detail: 'Turn an audio file into a searchable speaker-attributed transcript synchronized to audio.', tasks: [
    ['speakers', 'Speaker segmentation and diarization integration', 'backend'],
    ['asr', 'Production ASR integration', 'backend'],
    ['transcript', 'Persist timestamped transcript and confidence', 'backend'],
    ['alignment', 'Audio ↔ transcript alignment and selection sync', 'frontend + backend'],
  ]},
  { id: 'P4', title: 'Evidence workspace', detail: 'Make every analytical observation inspectable and traceable.', tasks: [
    ['evidence-schema', 'Normalized evidence record with provenance', 'backend'],
    ['timeline', 'Evidence timeline linked to audio and transcript', 'frontend'],
    ['explorer', 'Evidence Explorer filters and linked playback', 'frontend'],
    ['synthesis', 'Convergence and conflict representation', 'backend + frontend'],
  ]},
  { id: 'P5', title: 'Assessment + report', detail: 'Connect the evidence workspace to the assessment and report surfaces.', tasks: [
    ['candidate', 'Candidate classification trace', 'backend'],
    ['assessment', 'Assessment surface from canonical result', 'frontend'],
    ['report', 'Structured report generation', 'backend + frontend'],
    ['history', 'Persist and reopen analysis cases', 'backend + frontend'],
  ]},
  { id: 'P6', title: 'Validation + production hardening', detail: 'Move the analytical engine from a working product spine into reproducible validated operation.', tasks: [
    ['eval', 'Evaluation harness and speaker-disjoint datasets', 'research + engineering'],
    ['calibration', 'Calibration and uncertainty analysis', 'research + engineering'],
    ['e2e', 'Browser end-to-end verification', 'QA'],
    ['security', 'Audio access, retention and deletion controls', 'security + backend'],
  ]},
]

function readChecks() {
  try { return JSON.parse(localStorage.getItem('voxvector-mvp-checks') || '{}') } catch { return {} }
}

export default function DeveloperConsoleMVP({ session, signOut }) {
  const [section, setSection] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState(getStoredTheme)
  const [checks, setChecks] = useState(readChecks)
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [requestId, setRequestId] = useState('')
  const [stage, setStage] = useState('ready')
  const [processing, setProcessing] = useState(false)
  const abortRef = useRef(null)

  const health = useQuery({ queryKey: ['health'], queryFn: getHealth, refetchInterval: 30000 })
  const errors = useQuery({ queryKey: ['diagnostic-errors'], queryFn: () => getDiagnosticErrors(session.access_token), enabled: Boolean(session.access_token) && section === 'errors', refetchInterval: section === 'errors' ? 8000 : false })
  const logs = useQuery({ queryKey: ['diagnostic-events'], queryFn: () => getDiagnosticEvents(session.access_token, { days: 2, limit: 100 }), enabled: Boolean(session.access_token) && section === 'logs', refetchInterval: section === 'logs' ? 2500 : false })
  const analysisEvents = useQuery({ queryKey: ['analysis-events', requestId], queryFn: () => getDiagnosticEvents(session.access_token, { requestId, days: 1, limit: 100 }), enabled: Boolean(session.access_token && requestId && processing), refetchInterval: processing ? 1000 : false })

  useEffect(() => { applyTheme(theme) }, [theme])
  useEffect(() => { localStorage.setItem('voxvector-mvp-checks', JSON.stringify(checks)) }, [checks])
  useEffect(() => {
    const latest = analysisEvents.data?.payload?.events?.find(event => event.stage)
    if (latest?.stage) setStage(latest.stage)
  }, [analysisEvents.data])

  const analysis = useMutation({
    mutationFn: selected => analyzeWavWithProgress(selected, setUploadProgress, {
      onRequestCreated: ({ requestId: id, abort }) => { setRequestId(id); abortRef.current = abort },
      onState: state => setStage(state),
    }),
    onMutate: () => { setUploadProgress(0); setProcessing(true); setStage('uploading'); setRequestId('') },
    onSuccess: () => { setProcessing(false); setStage('completed'); abortRef.current = null },
    onError: error => { setProcessing(false); setStage(error?.name === 'AbortError' ? 'stopped' : 'error'); abortRef.current = null },
  })

  const total = phases.reduce((n, p) => n + p.tasks.length, 0)
  const complete = Object.values(checks).filter(Boolean).length
  const percent = Math.round((complete / total) * 100)

  const choose = id => { setSection(id); setMobileOpen(false) }
  const toggleCheck = id => setChecks(current => ({ ...current, [id]: !current[id] }))
  const resetChecks = () => setChecks({})
  const stop = () => abortRef.current?.()

  return <div className="vv-app">
    <header className="vv-header">
      <div className="vv-header-inner">
        <div className="vv-brand-lockup">
          <Button variant="ghost" size="icon" className="vv-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19} /></Button>
          <div className="vv-brand-mark"><Waves size={18} /></div>
          <div><div className="vv-brand-title">VoxVector Developer Console</div><div className="vv-brand-sub">MVP engineering cockpit · {session.user.email}</div></div>
        </div>
        <div className="vv-header-actions"><a className="hidden sm:inline-flex items-center gap-2 text-xs text-[var(--vv-muted)] no-underline hover:text-[var(--vv-text)]" href={METHOD_DOC} target="_blank" rel="noreferrer"><BookOpen size={14}/> Methodology</a><ThemeToggle theme={theme} onThemeChange={setTheme}/><Button variant="secondary" onClick={signOut}><LogOut size={14}/><span className="hidden sm:inline">Sign out</span></Button></div>
      </div>
    </header>
    <div className="vv-shell">
      <aside className="vv-sidebar" aria-label="Developer console navigation"><Sidebar section={section} choose={choose}/></aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} ariaLabel="Developer console navigation"><div className="vv-sheet-head"><span className="vv-eyebrow">Console</span><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18}/></Button></div><Sidebar section={section} choose={choose}/></Sheet>
      <main className="vv-main">
        {section === 'dashboard' && <Dashboard health={health} percent={percent} complete={complete} total={total} goMvp={() => choose('mvp')}/>} 
        {section === 'api' && <Workbench file={file} setFile={setFile} analysis={analysis} progress={uploadProgress} requestId={requestId} stage={stage} processing={processing} events={analysisEvents.data?.payload?.events || []} stop={stop}/>} 
        {section === 'mvp' && <MvpBoard checks={checks} toggle={toggleCheck} reset={resetChecks} percent={percent} complete={complete} total={total}/>} 
        {section === 'docs' && <Docs/>}
        {section === 'errors' && <Errors query={errors}/>} 
        {section === 'logs' && <Logs query={logs}/>} 
        {section === 'profile' && <Profile session={session}/>} 
      </main>
    </div>
  </div>
}

function Sidebar({ section, choose }) {
  return <div className="vv-sidebar-content">
    <div className="vv-sidebar-label">Build</div>
    {nav.slice(0, 4).map(([id, label, Icon]) => <button key={id} onClick={() => choose(id)} className={`vv-nav-item ${section === id ? 'active' : ''}`}><Icon size={17}/>{label}{id === 'mvp' && <span className="ml-auto text-[9px] font-bold tracking-[.1em] text-[var(--vv-accent-bright)]">MVP</span>}</button>)}
    <div className="vv-sidebar-divider"/><div className="vv-sidebar-label">Observe</div>
    {nav.slice(4).map(([id, label, Icon]) => <button key={id} onClick={() => choose(id)} className={`vv-nav-item ${section === id ? 'active' : ''}`}><Icon size={17}/>{label}</button>)}
    <div className="vv-sidebar-divider"/><div className="vv-sidebar-label">Source</div>
    <a className="vv-nav-item" href="/voxvector/"><Terminal size={17}/>Public site</a>
    <a className="vv-nav-item" href={METHOD_DOC} target="_blank" rel="noreferrer"><BookOpen size={17}/>Methodology</a>
    <a className="vv-nav-item" href={PIPELINE_DOC} target="_blank" rel="noreferrer"><Waves size={17}/>21 stage pipeline</a>
    <a className="vv-nav-item" href="https://github.com/darenprince/darenprince-author/tree/main/voxvector" target="_blank" rel="noreferrer"><Github size={17}/>Frontend source</a>
  </div>
}

function Dashboard({ health, percent, complete, total, goMvp }) {
  const h = health.data?.payload
  const online = health.isSuccess && h?.status === 'ok'
  return <div><PageTitle eyebrow="BUILD CONTROL" title="Developer overview" action={<Button variant="secondary" onClick={() => health.refetch()}><RefreshCw size={14}/> Refresh</Button>}/>
    <div className="vv-metrics"><Metric label="API" value={health.isPending ? 'CHECKING' : online ? 'ONLINE' : 'CHECK'} detail={API_BASE} state={online ? 'healthy' : health.isError ? 'error' : 'warning'}/><Metric label="Runtime" value={h?.runtime_self_test === 'passed' ? 'READY' : h?.runtime_self_test || '—'} detail={h?.source_revision?.slice?.(0, 12) || 'source revision'} state={h?.runtime_self_test === 'passed' ? 'healthy' : 'warning'}/><Metric label="MVP plan" value={`${percent}%`} detail={`${complete} of ${total} tasks checked`} state={percent === 100 ? 'healthy' : 'warning'}/><Metric label="Diagnostics" value={h?.diagnostic_storage?.toUpperCase?.() || '—'} detail="durable operational storage" state={h?.diagnostic_storage === 'configured' ? 'healthy' : 'warning'}/></div>
    <div className="vv-content-grid"><section className="vv-panel"><div className="vv-panel-head"><h2>Fastest path to MVP</h2><span>{percent}% complete</span></div><p className="vv-copy">Work top to bottom. Finish the case spine before expanding analytical depth. Every checked item is stored in this browser so the console stays useful between build sessions.</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-[var(--vv-accent)] transition-all" style={{width: `${percent}%`}}/></div><Button variant="accent" className="mt-5" onClick={goMvp}><ListChecks size={15}/> Open MVP Build Plan</Button></section><section className="vv-panel"><div className="vv-panel-head"><h2>Runtime fingerprint</h2><span>/health</span></div><pre className="vv-code">{JSON.stringify(h || {}, null, 2)}</pre></section></div>
    <section className="vv-panel mt-4"><div className="vv-panel-head"><h2>Engineering links</h2><span>canonical</span></div><div className="grid gap-2 sm:grid-cols-3"><DocLink title="Methodology" href={METHOD_DOC} detail="Analysis methods and promotion path"/><DocLink title="Pipeline" href={PIPELINE_DOC} detail="Canonical 21 stage pipeline"/><DocLink title="Architecture" href={ARCHITECTURE_DOC} detail="System boundaries and data flow"/></div></section>
  </div>
}

function MvpBoard({ checks, toggle, reset, percent, complete, total }) {
  const [open, setOpen] = useState(() => new Set(['P0', 'P1']))
  const allOpen = open.size === phases.length
  const togglePhase = id => setOpen(current => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next })
  const expandAll = () => setOpen(allOpen ? new Set() : new Set(phases.map(p => p.id)))
  return <div><PageTitle eyebrow="DELIVERY" title="Fastest path to MVP" action={<div className="flex gap-2"><Button variant="secondary" onClick={expandAll}>{allOpen ? 'Collapse all' : 'Expand all'}</Button><Button variant="secondary" onClick={reset}>Reset checks</Button></div>}/>
    <div className="vv-panel mb-4"><div className="flex flex-wrap items-end justify-between gap-4"><div><div className="vv-eyebrow">MVP execution board</div><div className="mt-1 text-2xl font-semibold">{percent}% complete</div><p className="vv-copy mt-1">{complete} of {total} engineering tasks checked</p></div><div className="min-w-[240px] flex-1 sm:max-w-md"><div className="h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-[var(--vv-accent)] transition-all" style={{width: `${percent}%`}}/></div></div></div></div>
    <div className="grid gap-3">{phases.map(phase => <section key={phase.id} className="vv-panel"><button className="flex w-full items-center gap-3 text-left" onClick={() => togglePhase(phase.id)} aria-expanded={open.has(phase.id)}><span className="font-mono text-xs font-bold text-[var(--vv-accent-bright)]">{phase.id}</span>{open.has(phase.id) ? <ChevronDown size={17}/> : <ChevronRight size={17}/>}<span className="font-semibold">{phase.title}</span><span className="ml-auto text-xs text-[var(--vv-muted)]">{phase.tasks.filter(t => checks[t[0]]).length}/{phase.tasks.length}</span></button><p className="ml-8 mt-2 text-xs leading-5 text-[var(--vv-muted)]">{phase.detail}</p>{open.has(phase.id) && <div className="mt-4 grid gap-2 border-t border-[var(--vv-border)] pt-3">{phase.tasks.map(([id, title, owner]) => <label key={id} className="flex cursor-pointer items-start gap-3 rounded-md border border-[var(--vv-border)] bg-[var(--vv-surface)] p-3 transition-colors hover:border-[var(--vv-border-strong)]"><input type="checkbox" checked={Boolean(checks[id])} onChange={() => toggle(id)} className="mt-0.5 h-4 w-4 accent-[var(--vv-accent)]"/><span className={`flex-1 text-sm ${checks[id] ? 'line-through text-[var(--vv-muted)]' : 'text-[var(--vv-text)]'}`}>{title}<small className="mt-1 block text-[10px] uppercase tracking-[.1em] text-[var(--vv-muted)]">{owner}</small></span>{checks[id] ? <CircleCheck size={17} className="text-emerald-400"/> : <Circle size={17} className="text-[var(--vv-muted)]"/>}</label>)}</div>}</section>)}</div>
  </div>
}

function Workbench({ file, setFile, analysis, progress, requestId, stage, processing, events, stop }) {
  const inputRef = useRef(null)
  const [drag, setDrag] = useState(false)
  const stageLabel = { uploading: 'Uploading audio', uploaded: 'Upload complete', waiting: 'Waiting for pipeline', decode: 'Decoding audio', analysis_pipeline: 'Running analysis pipeline', serialization: 'Preparing result', completed: 'Analysis complete', stopped: 'Analysis stopped', error: 'Analysis failed', ready: 'Ready' }[stage] || stage
  return <div><PageTitle eyebrow="ANALYSIS ENGINE" title="API workbench" action={<span className="mono text-xs text-[var(--vv-muted)]">{API_BASE}</span>}/><div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]"><section className="vv-panel"><div className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${drag ? 'border-[var(--vv-accent)] bg-[var(--vv-accent)]/5' : 'border-[var(--vv-border)]'}`} onDragOver={e => {e.preventDefault();setDrag(true)}} onDragLeave={() => setDrag(false)} onDrop={e => {e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f){setFile(f)}}}><FileAudio className="mx-auto mb-3 text-[var(--vv-accent-bright)]" size={34}/><h2 className="text-lg font-semibold">Load a recording</h2><p className="mx-auto mt-2 max-w-md text-sm text-[var(--vv-muted)]">Use the same intake path the product will use. Select or drag a supported audio recording into the workbench.</p><input ref={inputRef} type="file" accept="audio/*,.wav,.mp3,.m4a,.flac,.ogg" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)}/><div className="mt-5 flex justify-center gap-2"><Button variant="secondary" onClick={() => inputRef.current?.click()}><FileAudio size={15}/> Choose audio</Button>{file && <Button variant="accent" onClick={() => analysis.mutate(file)} disabled={analysis.isPending}><Play size={15}/> Run analysis</Button>}{processing && <Button variant="secondary" className="vv-stop-button" onClick={stop}><XCircle size={15}/> Stop</Button>}</div>{file && <div className="mt-5 rounded-md border border-[var(--vv-border)] bg-[var(--vv-surface)] p-4 text-left"><div className="font-medium">{file.name}</div><div className="mt-1 text-xs text-[var(--vv-muted)]">{(file.size / 1048576).toFixed(2)} MB · {file.type || 'audio'}</div></div>}</div>{processing && <div className="mt-4"><div className="flex items-center justify-between text-xs"><span>{stageLabel}</span><span>{progress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-[var(--vv-accent)] transition-all" style={{width: `${progress}%`}}/></div></div>}{requestId && <div className="mt-3 text-[10px] text-[var(--vv-muted)] mono">request {requestId}</div>}</section><section className="vv-panel"><div className="vv-panel-head"><h2>Lifecycle</h2><span>{events.length} events</span></div><div className="grid gap-2">{events.length ? events.slice(0,8).map((e,i)=><div key={`${e.timestamp}-${i}`} className="rounded-md border border-[var(--vv-border)] p-3"><div className="flex justify-between gap-3 text-xs"><strong>{e.stage || e.event || 'event'}</strong><span className="text-[var(--vv-muted)]">{e.duration_ms ?? '—'} ms</span></div><div className="mt-1 text-[11px] text-[var(--vv-muted)]">{e.reason || e.error_message || e.event || 'Lifecycle event'}</div></div>):<div className="py-10 text-center text-sm text-[var(--vv-muted)]">Run a real request to populate lifecycle events.</div>}</div></section></div></div>
}

function Docs() { return <div><PageTitle eyebrow="SOURCE OF TRUTH" title="Methodology & documentation"/><div className="vv-panel mb-4"><div className="flex items-start gap-3"><BookOpen className="mt-0.5 text-[var(--vv-accent-bright)]" size={21}/><div><h2 className="font-semibold">Analysis methodology</h2><p className="vv-copy mt-1">Open the canonical method register before adding or changing an analysis method. The developer console intentionally keeps methodology one click away from engineering work.</p><div className="mt-4 flex flex-wrap gap-2"><Button variant="accent" as="a" href={METHOD_DOC} target="_blank" rel="noreferrer">Open methodology <ExternalLink size={14}/></Button><Button variant="secondary" as="a" href="/voxvector/methods.html">Open method index <ExternalLink size={14}/></Button></div></div></div></div><div className="grid gap-3 sm:grid-cols-2"><DocLink title="MVP build plan" href={MVP_DOC} detail="Prioritized engineering path"/><DocLink title="21 stage pipeline" href={PIPELINE_DOC} detail="Canonical pipeline definition"/><DocLink title="Architecture" href={ARCHITECTURE_DOC} detail="System architecture"/><DocLink title="Analysis methods" href={METHOD_DOC} detail="Active method register"/></div></div> }

function Errors({ query }) { const events=query.data?.payload?.events||[]; return <div><PageTitle eyebrow="DIAGNOSTICS" title="Error reports" action={<Button variant="secondary" onClick={()=>query.refetch()}><RefreshCw size={14}/> Refresh</Button>}/>{query.isError&&<div className="vv-panel text-red-300">{query.error.message}</div>}{!query.isPending&&!events.length&&!query.isError&&<div className="vv-panel"><CheckCircle2 className="mb-2 text-emerald-400"/><h2>No persisted errors</h2><p className="vv-copy mt-1">The protected diagnostic endpoint returned no indexed error events for the current window.</p></div>}<div className="grid gap-2">{events.map((e,i)=><div key={i} className="vv-panel"><div className="flex items-center gap-2"><XCircle size={17} className="text-red-300"/><strong>{e.error_type||e.event||'Diagnostic error'}</strong><span className="ml-auto text-xs text-[var(--vv-muted)]">{e.timestamp ? new Date(e.timestamp).toLocaleString() : '—'}</span></div><p className="vv-copy mt-2">{e.error_message||e.reason||e.detail||'No detail'}</p></div>)}</div></div> }
function Logs({ query }) { const events=query.data?.payload?.events||[]; return <div><PageTitle eyebrow="OBSERVABILITY" title="Live diagnostic logs" action={<Button variant="secondary" onClick={()=>query.refetch()}><RefreshCw size={14}/> Refresh</Button>}/><div className="vv-log-banner"><span className="vv-live-dot"/> Durable diagnostic stream · polling every 2.5 seconds</div><div className="grid gap-1 overflow-hidden rounded-lg border border-[var(--vv-border)]">{events.length?events.map((e,i)=><div key={i} className="bg-[var(--vv-surface)] p-3"><div className="flex justify-between gap-3 text-xs"><strong>{e.stage||e.event||'event'}</strong><span className="mono text-[var(--vv-muted)]">{e.timestamp ? new Date(e.timestamp).toLocaleTimeString() : '—'}</span></div><div className="mt-1 text-[11px] text-[var(--vv-muted)]">{e.reason||e.error_message||e.event||'Diagnostic event'}</div></div>):<div className="vv-panel text-sm text-[var(--vv-muted)]">Waiting for diagnostic events.</div>}</div></div> }
function Profile({ session }) { const meta=session.user.user_metadata||{}; const [name,setName]=useState(meta.full_name||meta.name||''); const [message,setMessage]=useState(''); const save=async e=>{e.preventDefault();const {error}=await supabase.auth.updateUser({data:{full_name:name}});setMessage(error?error.message:'Profile updated successfully.')}; return <div><PageTitle eyebrow="ACCOUNT" title="Developer profile"/><form className="vv-panel" onSubmit={save}><label className="vv-field"><span>Full name</span><input value={name} onChange={e=>setName(e.target.value)}/></label><label className="vv-field"><span>Email</span><input value={session.user.email||''} disabled/></label><div className="mt-4 flex items-center gap-3"><Button variant="accent" type="submit">Save profile</Button>{message&&<span className="text-xs text-emerald-400">{message}</span>}</div></form></div> }

function PageTitle({ eyebrow, title, action }) { return <div className="vv-page-title"><div><div className="vv-eyebrow">{eyebrow}</div><h1>{title}</h1></div>{action}</div> }
function Metric({ label, value, detail, state='unknown' }) { const Icon=state==='healthy'?CheckCircle2:state==='error'?XCircle:AlertTriangle; return <Card tone="ghost" className="vv-metric"><div className="vv-metric-top"><div className="vv-eyebrow">{label}</div><Icon size={17} className={state==='healthy'?'text-emerald-400':state==='error'?'text-red-300':'text-[var(--vv-accent-bright)]'}/></div><div className="vv-metric-value">{value}</div><div className="vv-muted truncate">{detail}</div></Card> }
function DocLink({ title, href, detail }) { return <a href={href} target={href.startsWith('http')?'_blank':undefined} rel={href.startsWith('http')?'noreferrer':undefined} className="group flex items-center gap-3 rounded-md border border-[var(--vv-border)] bg-[var(--vv-surface)] p-4 no-underline transition-colors hover:border-[var(--vv-border-strong)]"><BookOpen size={17} className="text-[var(--vv-accent-bright)]"/><span className="min-w-0 flex-1"><strong className="block text-sm text-[var(--vv-text)]">{title}</strong><small className="mt-1 block text-xs text-[var(--vv-muted)]">{detail}</small></span><ExternalLink size={14} className="text-[var(--vv-muted)] group-hover:text-[var(--vv-text)]"/></a> }

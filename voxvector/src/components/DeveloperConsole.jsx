import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Activity, AlertTriangle, BookOpen, CheckCircle2, Code2, FileAudio, LogOut, Menu, RefreshCw, Server, ShieldCheck, Terminal, Timer, UserRound, Wifi, X, XCircle } from 'lucide-react'
import { analyzeWavWithProgress, API_BASE, getDiagnosticErrors, getDiagnosticEvents, getHealth } from '../lib/api'
import { supabase } from '../lib/supabase'
import LiveApiVisualizer from './LiveApiVisualizer'
import AudioUploadPlayer from './AudioUploadPlayer'
import Button from './ui/Button'
import Card from './ui/Card'
import Sheet from './ui/Sheet'
import ThemeToggle, { applyTheme, getStoredTheme } from './ui/ThemeToggle'
import './DeveloperConsole.css'

const docs = [
  ['Executive summary', 'EXECUTIVE_SUMMARY.md'],
  ['Operating charter', 'OPERATING_CHARTER.md'],
  ['Architecture', 'ARCHITECTURE.md'],
  ['Analysis methods', 'ANALYSIS_METHODS.md'],
  ['Capability status', 'CAPABILITY_STATUS.md'],
  ['Validation', 'VALIDATION.md'],
  ['Results contract', 'RESULTS_CONTRACT.md'],
  ['Reliability & runtime', 'RUNTIME_MEMORY_CONSTRAINTS.md'],
  ['Storage & observability', 'STORAGE_AND_OBSERVABILITY.md'],
  ['Deployment plan', 'DEPLOYMENT_PLAN_FREE.md'],
  ['Research integration', 'RESEARCH_INTEGRATION.md'],
  ['Decision log', 'PROJECT_DECISION_LOG.md'],
  ['Roadmap', 'ROADMAP.md'],
  ['Developer access', 'DEVELOPER_ACCESS.md'],
  ['UI application architecture', 'UI_APPLICATION_ARCHITECTURE.md'],
]

const nav = [
  ['dashboard', 'Dashboard', Activity], ['api', 'API Interface', Code2], ['errors', 'Error Reports', AlertTriangle],
  ['logs', 'Logs', Terminal], ['docs', 'Documentation', BookOpen], ['board', 'Development Board', ShieldCheck], ['profile', 'Profile', UserRound]
]

const stageLabels = {
  decode: 'Decoding audio',
  analysis_pipeline: 'Running analysis pipeline',
  serialization: 'Preparing result',
}

export default function DeveloperConsole({ session, signOut }) {
  const [section, setSection] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState(getStoredTheme)
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [requestId, setRequestId] = useState('')
  const [analysisStage, setAnalysisStage] = useState('idle')
  const abortRef = useRef(null)

  const health = useQuery({ queryKey: ['health'], queryFn: getHealth, refetchInterval: 30000 })
  const errors = useQuery({
    queryKey: ['diagnostic-errors'],
    queryFn: () => getDiagnosticErrors(session.access_token),
    enabled: Boolean(session.access_token) && section === 'errors',
    refetchInterval: section === 'errors' ? 8000 : false
  })
  const analysisEvents = useQuery({
    queryKey: ['analysis-events', requestId],
    queryFn: () => getDiagnosticEvents(session.access_token, { requestId, days: 1, limit: 100 }),
    enabled: Boolean(session.access_token && requestId && processing),
    refetchInterval: processing ? 1000 : false
  })
  const logs = useQuery({
    queryKey: ['diagnostic-events'],
    queryFn: () => getDiagnosticEvents(session.access_token, { days: 2, limit: 100 }),
    enabled: Boolean(session.access_token) && section === 'logs',
    refetchInterval: section === 'logs' ? 2500 : false
  })

  const analysis = useMutation({
    mutationFn: async (selectedFile) => analyzeWavWithProgress(selectedFile, setUploadProgress, {
      onRequestCreated: ({ requestId: nextId, abort }) => {
        setRequestId(nextId)
        abortRef.current = abort
      },
      onState: (state) => {
        if (state === 'uploading') {
          setUploading(true)
          setProcessing(false)
          setAnalysisStage('upload')
        }
        if (state === 'uploaded') {
          setUploading(false)
          setProcessing(true)
          setAnalysisStage('waiting')
        }
        if (state === 'completed') {
          setUploading(false)
          setProcessing(false)
          setUploadComplete(true)
        }
      }
    }),
    onMutate: () => {
      setUploadProgress(0)
      setUploading(true)
      setProcessing(false)
      setUploadComplete(false)
      setAnalysisStage('upload')
      setRequestId('')
    },
    onSuccess: () => {
      setUploading(false)
      setProcessing(false)
      setUploadComplete(true)
      setAnalysisStage('complete')
      abortRef.current = null
    },
    onError: (error) => {
      setUploading(false)
      setProcessing(false)
      setUploadComplete(false)
      setAnalysisStage(error?.name === 'AbortError' ? 'stopped' : 'error')
      abortRef.current = null
    }
  })

  useEffect(() => { applyTheme(theme) }, [theme])

  useEffect(() => {
    const events = analysisEvents.data?.payload?.events || []
    const latestStage = events.find(event => event.stage)?.stage
    if (latestStage) setAnalysisStage(latestStage)
    else if (processing && requestId) setAnalysisStage('waiting')
  }, [analysisEvents.data, processing, requestId])

  const choose = (id) => { setSection(id); setMobileOpen(false) }
  const handleFile = (selected) => {
    setFile(selected)
    setUploadProgress(0)
    setUploading(false)
    setProcessing(false)
    setUploadComplete(false)
    setRequestId('')
    setAnalysisStage('ready')
    analysis.reset()
  }
  const stopAnalysis = () => abortRef.current?.()

  return <div className="vv-app">
    <header className="vv-header">
      <div className="vv-header-inner">
        <div className="vv-brand-lockup">
          <Button variant="ghost" size="icon" className="vv-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19} /></Button>
          <div className="vv-brand-mark"><Activity size={18} /></div>
          <div><div className="vv-brand-title">VoxVector Developer Console</div><div className="vv-brand-sub">{session.user.email}</div></div>
        </div>
        <div className="vv-header-actions">
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
          <Button variant="secondary" size="default" onClick={signOut}><LogOut size={14} /> <span className="hidden sm:inline">Sign out</span></Button>
        </div>
      </div>
    </header>

    <div className="vv-shell">
      <aside className="vv-sidebar" aria-label="Developer console navigation"><SidebarContent section={section} choose={choose} /></aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} ariaLabel="Developer console navigation">
        <div className="vv-sheet-head"><span className="vv-eyebrow">Console</span><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></Button></div>
        <SidebarContent section={section} choose={choose} />
      </Sheet>
      <main className="vv-main">
        {section === 'dashboard' && <Dashboard h={health.data?.payload} health={health} />}
        {section === 'api' && <ApiWorkbench file={file} setFile={handleFile} analysis={analysis} uploadProgress={uploadProgress} uploading={uploading} processing={processing} uploadComplete={uploadComplete} requestId={requestId} stage={analysisStage} events={analysisEvents.data?.payload?.events || []} stopAnalysis={stopAnalysis} />}
        {section === 'errors' && <ErrorReports query={errors} />}
        {section === 'logs' && <Logs query={logs} />}
        {section === 'docs' && <Docs docs={docs} />}
        {section === 'board' && <Board />}
        {section === 'profile' && <Profile session={session} />}
      </main>
    </div>
  </div>
}

function SidebarContent({ section, choose }) {
  return <div className="vv-sidebar-content">
    <div className="vv-sidebar-label">Workspace</div>
    {nav.map(([id, label, Icon]) => <button key={id} onClick={() => choose(id)} className={`vv-nav-item ${section === id ? 'active' : ''}`}><Icon size={17} />{label}</button>)}
    <div className="vv-sidebar-divider" />
    <div className="vv-sidebar-label">System</div>
    <a className="vv-nav-item" href="/voxvector/"><Terminal size={17} />Public site</a>
    <a className="vv-nav-item" href="/docs/crownlabsbible/docs/viewer.html"><BookOpen size={17} />Crown Labs Docs</a>
    <a className="vv-nav-item" href="https://github.com/darenprince/darenprince-author/tree/main/voxvector" target="_blank" rel="noreferrer"><Code2 size={17} />Frontend source</a>
  </div>
}

function StatusIcon({ state = 'unknown' }) {
  const Icon = state === 'healthy' ? CheckCircle2 : state === 'warning' ? AlertTriangle : state === 'error' ? XCircle : AlertTriangle
  return <span className={`vv-state-icon ${state}`} aria-label={state}><Icon size={18} /></span>
}

function Dashboard({ h, health }) {
  const healthy = health.isSuccess && h?.status === 'ok'
  const runtimeWarning = h?.runtime_self_test && h.runtime_self_test !== 'passed'
  const diagnosticsState = h?.diagnostic_storage === 'configured' ? 'healthy' : h?.diagnostic_storage === 'not_configured' ? 'warning' : 'error'
  return <div>
    <PageTitle eyebrow="SYSTEM" title="Operational overview" action={<Button variant="secondary" onClick={() => health.refetch()}><RefreshCw size={14} /> Refresh</Button>} />
    <div className="vv-metrics">
      <Metric label="API" value={health.isPending ? 'CHECKING' : healthy ? 'ONLINE' : 'DEGRADED'} detail={health.isError ? health.error.message : API_BASE} state={health.isPending ? 'warning' : healthy ? 'healthy' : 'error'} />
      <Metric label="Pipeline" value={h?.pipeline || '—'} detail="Backend reported" state={healthy ? 'healthy' : 'warning'} />
      <Metric label="Runtime" value={h?.runtime_self_test === 'passed' ? 'READY' : h?.runtime_self_test || '—'} detail={h?.source_revision ? h.source_revision.slice(0, 12) : 'Render runtime'} state={runtimeWarning ? 'warning' : healthy ? 'healthy' : 'warning'} />
      <Metric label="Diagnostics" value={h?.diagnostic_storage ? h.diagnostic_storage.toUpperCase() : '—'} detail="Persistent storage" state={diagnosticsState} />
    </div>
    <div className="vv-content-grid">
      <section className="vv-panel"><div className="vv-panel-head"><h2>Runtime fingerprint</h2><span>/health</span></div><pre className="vv-code">{JSON.stringify(h || {}, null, 2)}</pre></section>
      <section className="vv-panel"><h2>System state</h2><p className="vv-copy">Status indicators below are driven by actual backend responses. No synthetic operational metrics are inserted.</p><div className="vv-status-list"><StatusRow state={healthy ? 'healthy' : health.isError ? 'error' : 'warning'} label="API reachability" value={healthy ? 'Verified' : health.isError ? 'Request failed' : 'Checking'} /><StatusRow state={h?.runtime_self_test === 'passed' ? 'healthy' : 'warning'} label="Runtime self test" value={h?.runtime_self_test || 'Unknown'} /><StatusRow state={diagnosticsState} label="Diagnostic storage" value={h?.diagnostic_storage || 'Unknown'} /></div></section>
    </div>
    <div className="vv-spacer"><LiveApiVisualizer active={health.isFetching} success={healthy} error={health.isError} label="/health live request" detail={health.isFetching ? 'Checking the backend now.' : health.isError ? 'The latest health request failed.' : healthy ? 'Backend health verified.' : 'Waiting for a verified response.'} /></div>
  </div>
}

function ErrorReports({ query }) {
  const events = query.data?.payload?.events || []
  return <div>
    <PageTitle eyebrow="DIAGNOSTICS" title="Persistent Error Intelligence" action={<Button variant="secondary" onClick={() => query.refetch()} disabled={query.isFetching}><RefreshCw size={14} className={query.isFetching ? 'animate-spin' : ''} /> Refresh</Button>} />
    <div className="vv-metrics"><Metric label="Errors" value={query.isPending ? '…' : String(query.data?.payload?.count ?? 0)} detail="Persisted diagnostic events" state={events.length ? 'error' : 'healthy'} /><Metric label="Window" value="14 DAYS" detail="Most recent reports" state="healthy" /><Metric label="Access" value={query.isError ? 'CHECK' : 'VERIFIED'} detail={query.isError ? query.error.message : 'Developer session'} state={query.isError ? 'error' : 'healthy'} /></div>
    {query.isError && <div role="alert" className="vv-panel vv-error-code">{query.error.message}</div>}
    {!query.isError && !query.isPending && events.length === 0 && <div className="vv-panel vv-empty"><CheckCircle2 size={24} /><div><h2>No persisted errors</h2><p className="vv-copy">The protected diagnostic endpoint is connected and no indexed error events were returned for the selected window.</p></div></div>}
    <div className="vv-error-list">{events.map((event, index) => <ErrorEvent key={`${event.request_id}-${event.timestamp}-${index}`} event={event} />)}</div>
  </div>
}

function ErrorEvent({ event }) {
  const timestamp = event.timestamp ? new Date(event.timestamp).toLocaleString() : 'Unknown time'
  const title = event.error_type || event.reason || event.event || 'Diagnostic event'
  const detail = event.error_message || event.detail || event.reason || 'No additional diagnostic detail.'
  return <article className="vv-panel vv-error-event"><div className="vv-panel-head"><div className="flex items-center gap-2"><StatusIcon state="error" /><h2>{title}</h2></div><span className="vv-muted mono">{timestamp}</span></div><p className="vv-copy">{detail}</p><div className="vv-error-meta"><span>{event.event || 'unknown event'}</span><span>request {event.request_id || '—'}</span>{event.status_code && <span>HTTP {event.status_code}</span>}{event.stage && <span>stage {event.stage}</span>}</div></article>
}

function Logs({ query }) {
  const events = query.data?.payload?.events || []
  return <div>
    <PageTitle eyebrow="OBSERVABILITY" title="Live diagnostic stream" action={<Button variant="secondary" onClick={() => query.refetch()} disabled={query.isFetching}><RefreshCw size={14} className={query.isFetching ? 'animate-spin' : ''} /> Refresh</Button>} />
    <div className="vv-log-banner"><span className="vv-live-dot" /> Polling durable diagnostic storage every 2.5 seconds</div>
    {query.isError && <div role="alert" className="vv-panel vv-error-code">{query.error.message}</div>}
    <section className="vv-log-stream">{events.length ? events.map((event, index) => <LogEvent key={`${event.request_id}-${event.timestamp}-${index}`} event={event} />) : <div className="vv-panel vv-empty"><Terminal size={24} /><p>Waiting for diagnostic events.</p></div>}</section>
  </div>
}

function LogEvent({ event }) {
  const timestamp = event.timestamp ? new Date(event.timestamp).toLocaleTimeString() : '—'
  const state = event.event?.includes('error') || event.event === 'request.rejected' || event.event === 'request.server_error' ? 'error' : event.event === 'stage.completed' ? 'healthy' : 'warning'
  const label = stageLabels[event.stage] || event.event || 'diagnostic event'
  return <article className="vv-log-row"><StatusIcon state={state} /><div className="vv-log-main"><div><strong>{label}</strong><span className="vv-log-time">{timestamp}</span></div><p>{event.stage ? `Stage ${event.stage} completed in ${event.duration_ms ?? '—'} ms.` : event.reason || event.error_message || event.event}</p><span className="mono vv-muted">request {event.request_id || '—'}</span></div></article>
}

function ApiWorkbench({ file, setFile, analysis, uploadProgress, uploading, processing, uploadComplete, requestId, stage, events, stopAnalysis }) {
  const latest = events[0]
  const stageText = stage === 'decode' ? 'Decoding audio' : stage === 'analysis_pipeline' ? 'Running analysis pipeline' : stage === 'serialization' ? 'Preparing result' : stage === 'waiting' ? 'Waiting for analysis pipeline' : stage === 'upload' ? 'Uploading audio' : stage === 'stopped' ? 'Analysis stopped' : stage === 'error' ? 'Analysis failed' : stage === 'complete' ? 'Analysis complete' : 'Ready'
  return <div>
    <PageTitle eyebrow="API" title="VoxVector API workbench" action={<span className="vv-muted mono">{API_BASE}</span>} />
    <div className="vv-content-grid wide">
      <section className="vv-panel">
        <div className="vv-panel-title"><FileAudio size={17} /> POST /v1/analyze</div>
        <p className="vv-copy">The request is executed against the real Render API. Upload progress and server lifecycle state are kept separate.</p>
        <label className="vv-field"><span>WAV file</span><input type="file" accept="audio/wav,.wav" onChange={e => setFile(e.target.files?.[0] || null)} /></label>
        <div className="vv-api-actions"><Button variant="accent" className="vv-execute" disabled={!file || analysis.isPending} onClick={() => analysis.mutate(file)}><Terminal size={15} />{analysis.isPending ? stageText : 'Execute request'}</Button>{analysis.isPending && <Button variant="secondary" className="vv-stop-button" onClick={stopAnalysis}><XCircle size={15} /> Stop analysis</Button>}</div>
        <div className="vv-spacer">
          <AudioUploadPlayer file={file} uploadProgress={uploadProgress} uploading={uploading} processing={processing} uploadComplete={uploadComplete} onStop={stopAnalysis} />
          {file && <div className="vv-analysis-state"><div className="vv-analysis-state-head"><span><Activity size={15} /> Live analysis state</span><strong>{stageText}</strong></div><div className="vv-state-steps">{['upload','decode','analysis_pipeline','serialization'].map(step => <span key={step} className={(step === stage || (step === 'upload' && ['decode','analysis_pipeline','serialization','complete'].includes(stage)) || (step === 'decode' && ['analysis_pipeline','serialization','complete'].includes(stage)) || (step === 'analysis_pipeline' && ['serialization','complete'].includes(stage)) || (step === 'serialization' && stage === 'complete')) ? 'done' : ''}>{step === 'analysis_pipeline' ? 'Analysis' : step === 'serialization' ? 'Result' : step[0].toUpperCase() + step.slice(1)}</span>)}</div>{latest && <div className="vv-latest-log"><span className="vv-live-dot" />{latest.event}{latest.stage ? ` · ${latest.stage}` : ''}{latest.duration_ms ? ` · ${latest.duration_ms} ms` : ''}</div>}</div>}
          <LiveApiVisualizer active={processing} success={!!analysis.data && !analysis.error} error={!!analysis.error} label="/v1/analyze live activity" detail={processing ? `Server state: ${stageText}.` : analysis.error ? 'The last real API request returned an error.' : analysis.data ? `Completed in ${analysis.data.durationMs} ms · ${analysis.data.requestId || 'request ID unavailable'}` : 'Select an audio file, then execute a real request.'} />
          {requestId && <div className="vv-request-id">Request ID <code>{requestId}</code></div>}
        </div>
      </section>
      <section className="vv-panel"><div className="vv-panel-head"><h2>Response</h2>{analysis.data && <span>HTTP {analysis.data.response.status}</span>}</div>{analysis.error && <pre className="vv-error-code">{JSON.stringify({ error: analysis.error.message, status: analysis.error.response?.status, request_id: analysis.error.requestId }, null, 2)}</pre>}{analysis.data ? <><div className="vv-metrics compact"><Metric label="Status" value={String(analysis.data.response.status)} detail="HTTP" state={analysis.data.response.ok ? 'healthy' : 'error'} /><Metric label="Timing" value={`${analysis.data.durationMs} ms`} detail="Client observed" state="healthy" /><Metric label="Request ID" value={analysis.data.requestId || '—'} detail="X Request ID" state="healthy" /></div><pre className="vv-code response">{JSON.stringify(analysis.data.payload, null, 2)}</pre></> : <div className="vv-empty"><Timer size={22} /><p>Execute a real request to inspect its response.</p></div>}</section>
    </div>
  </div>
}

function Docs({ docs }) { return <div><PageTitle eyebrow="DOCUMENTATION" title="Canonical project navigator" /><p className="vv-copy vv-doc-intro">These links resolve directly to the corresponding canonical VoxVector document in GitHub. Public product documentation is surfaced separately through the Crown Labs Bible.</p><div className="vv-doc-grid">{docs.map(([label,file]) => <a key={file} href={`https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/${file}`} target="_blank" rel="noreferrer" className="vv-panel vv-doc no-underline"><BookOpen size={17} /><div><div className="font-medium">{label}</div><div className="vv-muted mono">VoxVector/docs/{file}</div></div></a>)}</div></div> }

function Profile({ session }) {
  const initial = session.user.user_metadata || {}
  const [form, setForm] = useState({ full_name: initial.full_name || initial.name || '', job_title: initial.job_title || '', organization: initial.organization || '', bio: initial.bio || '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const save = async (event) => {
    event.preventDefault()
    if (!supabase) { setMessage('Supabase authentication is not configured in this build.'); return }
    setSaving(true); setMessage('')
    const { error } = await supabase.auth.updateUser({ data: form })
    setSaving(false)
    setMessage(error ? error.message : 'Profile updated successfully.')
  }
  return <div><PageTitle eyebrow="ACCOUNT" title="Developer profile" /><form className="vv-panel vv-profile-form" onSubmit={save}><div className="vv-profile-grid"><label className="vv-field"><span>Full name</span><input value={form.full_name} onChange={e => setForm(v => ({ ...v, full_name: e.target.value }))} autoComplete="name" /></label><label className="vv-field"><span>Email</span><input value={session.user.email || ''} disabled /></label><label className="vv-field"><span>Job title</span><input value={form.job_title} onChange={e => setForm(v => ({ ...v, job_title: e.target.value }))} /></label><label className="vv-field"><span>Organization</span><input value={form.organization} onChange={e => setForm(v => ({ ...v, organization: e.target.value }))} /></label></div><label className="vv-field"><span>Bio</span><textarea value={form.bio} onChange={e => setForm(v => ({ ...v, bio: e.target.value }))} rows="5" /></label><div className="vv-profile-actions"><Button variant="accent" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save profile'}</Button>{message && <span className="vv-profile-message">{message}</span>}</div></form></div>
}

function Board() { const items = [['CURRENT','Developer Console','In active development'],['CURRENT','Live Diagnostics','Durable lifecycle event stream and indexed error reporting'],['CURRENT','Analysis Controls','Cancellable browser request with explicit upload and processing states'],['NEXT','Protected operational telemetry','Metrics and lifecycle query contract'],['NEXT','Documentation Navigator','Connected to canonical docs and Crown Labs Bible'],['NEXT','Production Hardening','Browser, accessibility and failure state verification'],['RESEARCH','Future deception analysis methods','Research candidates remain separate from validated capability']]; return <div><PageTitle eyebrow="DELIVERY" title="Development board" /><div className="vv-board">{items.map(([state,title,detail]) => <div key={title} className="vv-board-item"><span className="vv-status-tag">{state}</span><div><div className="font-medium">{title}</div><div className="vv-copy small">{detail}</div></div><span className="vv-muted">Active</span></div>)}</div></div> }
function PageTitle({ eyebrow, title, action }) { return <div className="vv-page-title"><div><div className="vv-eyebrow">{eyebrow}</div><h1>{title}</h1></div>{action}</div> }
function Metric({ label, value, detail, state = 'unknown' }) { return <Card tone="ghost" className="vv-metric"><div className="vv-metric-top"><div className="vv-eyebrow">{label}</div><StatusIcon state={state} /></div><div className="vv-metric-value">{value}</div><div className="vv-muted truncate">{detail}</div></Card> }
function StatusRow({ state, label, value }) { return <div className="vv-row"><span><StatusIcon state={state} />{label}</span><span className="truncate">{value}</span></div> }

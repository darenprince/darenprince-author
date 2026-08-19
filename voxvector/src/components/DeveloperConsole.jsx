import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Activity, AlertTriangle, BookOpen, Code2, FileAudio, LogOut, Menu, RefreshCw, Server, ShieldCheck, Terminal, Timer, Wifi, X } from 'lucide-react'
import { analyzeWav, API_BASE, getHealth } from '../lib/api'
import LiveApiVisualizer from './LiveApiVisualizer'
import Button from './ui/Button'
import Card from './ui/Card'
import Sheet from './ui/Sheet'
import ThemeToggle, { applyTheme, getStoredTheme } from './ui/ThemeToggle'

const docs = [
  ['Architecture', 'ARCHITECTURE.md'], ['Methodology', 'METHODOLOGY.md'], ['API', 'API.md'], ['Pipeline', 'PIPELINE.md'],
  ['Reliability', 'RELIABILITY.md'], ['Validation', 'VALIDATION.md'], ['Security', 'SECURITY.md'], ['Deployment', 'DEPLOYMENT.md'],
  ['Research', 'RESEARCH.md'], ['Decision log', 'PROJECT_DECISION_LOG.md'], ['Capability status', 'CAPABILITY_STATUS.md'], ['Roadmap', 'ROADMAP.md']
]

const nav = [
  ['dashboard', 'Dashboard', Activity], ['api', 'API Interface', Code2], ['errors', 'Error Reports', AlertTriangle],
  ['logs', 'Logs', Terminal], ['docs', 'Documentation', BookOpen], ['board', 'Development Board', ShieldCheck]
]

export default function DeveloperConsole({ session, signOut }) {
  const [section, setSection] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState(getStoredTheme)
  const health = useQuery({ queryKey: ['health'], queryFn: getHealth, refetchInterval: 30000 })
  const [file, setFile] = useState(null)
  const analysis = useMutation({ mutationFn: analyzeWav })

  useEffect(() => { applyTheme(theme) }, [theme])

  const choose = (id) => { setSection(id); setMobileOpen(false) }

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
      <aside className="vv-sidebar" aria-label="Developer console navigation">
        <SidebarContent section={section} choose={choose} />
      </aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} ariaLabel="Developer console navigation">
        <div className="vv-sheet-head"><span className="vv-eyebrow">Console</span><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></Button></div>
        <SidebarContent section={section} choose={choose} />
      </Sheet>
      <main className="vv-main">
        {section === 'dashboard' && <Dashboard h={health.data?.payload} health={health} />}
        {section === 'api' && <ApiWorkbench file={file} setFile={setFile} analysis={analysis} />}
        {section === 'errors' && <Unavailable title="Persistent Error Intelligence" detail="The current API exposes diagnostic storage internally but does not yet expose a protected error report query endpoint. This panel will connect to the real Supabase backed records when that contract is implemented." />}
        {section === 'logs' && <Unavailable title="Lifecycle Event Stream" detail="Live lifecycle events are emitted by the API, but a protected event stream query endpoint is not yet part of the public API contract. No synthetic events are shown here." />}
        {section === 'docs' && <Docs docs={docs} />}
        {section === 'board' && <Board />}
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
    <a className="vv-nav-item" href="https://github.com/darenprince/darenprince-author"><Code2 size={17} />Repository</a>
  </div>
}

function Dashboard({ h, health }) {
  const healthy = health.isSuccess && h?.status === 'ok'
  return <div>
    <PageTitle eyebrow="SYSTEM" title="Operational overview" action={<Button variant="secondary" onClick={() => health.refetch()}><RefreshCw size={14} /> Refresh</Button>} />
    <div className="vv-metrics">
      <Metric label="API" value={health.isPending ? 'Checking…' : healthy ? 'ONLINE' : 'DEGRADED'} detail={health.isError ? health.error.message : API_BASE} />
      <Metric label="Pipeline" value={h?.pipeline || '—'} detail="Backend reported" />
      <Metric label="Source revision" value={h?.source_revision ? h.source_revision.slice(0,12) : '—'} detail="Render runtime" />
      <Metric label="Diagnostics" value={h?.diagnostic_storage?.configured ? 'CONFIGURED' : h?.diagnostic_storage ? 'CHECK' : '—'} detail="Supabase storage status" />
    </div>
    <div className="vv-content-grid">
      <section className="vv-panel"><div className="vv-panel-head"><h2>Runtime fingerprint</h2><span>/health</span></div><pre className="vv-code">{JSON.stringify(h || {}, null, 2)}</pre></section>
      <section className="vv-panel"><h2>Telemetry boundary</h2><p className="vv-copy">Only values returned by the backend are displayed as operational telemetry. Request counts, error counts, 5xx totals and analysis totals are intentionally not fabricated until a persistent metrics contract exists.</p><div className="vv-status-list"><Row icon={Wifi} label="API reachability" value={healthy ? 'Verified' : 'Not verified'} /><Row icon={Server} label="Render source" value={h?.source_revision || 'Unknown'} /><Row icon={ShieldCheck} label="Runtime self test" value={h?.runtime_self_test || 'Unknown'} /></div></section>
    </div>
    <div className="vv-spacer"><LiveApiVisualizer active={health.isFetching} success={healthy} error={health.isError} label="/health live request" detail={health.isFetching ? 'TanStack Query is actively waiting for the backend.' : health.isError ? 'The latest health request failed.' : healthy ? 'Visualization follows the current backend health state.' : 'Waiting for a verified backend health response.'} /></div>
  </div>
}

function ApiWorkbench({ file, setFile, analysis }) {
  return <div>
    <PageTitle eyebrow="API" title="VoxVector API workbench" action={<span className="vv-muted mono">{API_BASE}</span>} />
    <div className="vv-content-grid wide">
      <section className="vv-panel"><div className="vv-panel-title"><FileAudio size={17} /> POST /v1/analyze</div><p className="vv-copy">The request is executed against the real Render API. No simulated response is shown.</p><label className="vv-field"><span>WAV file</span><input type="file" accept="audio/wav,.wav" onChange={e => setFile(e.target.files?.[0] || null)} /></label><Button variant="accent" className="vv-execute" disabled={!file || analysis.isPending} onClick={() => analysis.mutate(file)}><Terminal size={15} />{analysis.isPending ? 'Analyzing…' : 'Execute request'}</Button><div className="vv-spacer"><LiveApiVisualizer active={analysis.isPending} success={!!analysis.data && !analysis.error} error={!!analysis.error} label="/v1/analyze live activity" detail={analysis.isPending ? 'Real request in flight. The waveform is indeterminate because the API does not expose numeric progress.' : analysis.error ? 'The last real API request returned an error.' : analysis.data ? `Completed in ${analysis.data.durationMs} ms · ${analysis.data.requestId || 'request ID unavailable'}` : 'No analysis request is currently running.'} /></div></section>
      <section className="vv-panel"><div className="vv-panel-head"><h2>Response</h2>{analysis.data && <span>HTTP {analysis.data.response.status}</span>}</div>{analysis.error && <pre className="vv-error-code">{JSON.stringify({ error: analysis.error.message, status: analysis.error.response?.status, request_id: analysis.error.requestId }, null, 2)}</pre>}{analysis.data ? <><div className="vv-metrics compact"><Metric label="Status" value={String(analysis.data.response.status)} detail="HTTP" /><Metric label="Timing" value={`${analysis.data.durationMs} ms`} detail="Client observed" /><Metric label="Request ID" value={analysis.data.requestId || '—'} detail="X Request ID" /></div><pre className="vv-code response">{JSON.stringify(analysis.data.payload, null, 2)}</pre></> : <div className="vv-empty"><Timer size={22} /><p>Execute a real request to inspect its response.</p></div>}</section>
    </div>
  </div>
}

function Docs({ docs }) { return <div><PageTitle eyebrow="DOCUMENTATION" title="Canonical project navigator" /><div className="vv-doc-grid">{docs.map(([label,file]) => <a key={file} href={`https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/${file}`} className="vv-panel vv-doc no-underline"><BookOpen size={17} /><div><div className="font-medium">{label}</div><div className="vv-muted mono">{file}</div></div></a>)}</div></div> }
function Board() { const items = [['CURRENT','Developer Console','In active development'],['NEXT','Persistent Error Intelligence','Protected diagnostic query contract'],['NEXT','API Observability','Metrics and lifecycle event endpoints'],['NEXT','Documentation Navigator','Connected to canonical docs'],['NEXT','Production Hardening','Browser, accessibility and failure state verification'],['RESEARCH','Future deception analysis methods','Research candidates remain separate from validated capability'],['BLOCKED','Protected operational telemetry','Waiting on authenticated backend telemetry endpoints']]; return <div><PageTitle eyebrow="DELIVERY" title="Development board" /><div className="vv-board">{items.map(([state,title,detail]) => <div key={title} className="vv-board-item"><span className="vv-status-tag">{state}</span><div><div className="font-medium">{title}</div><div className="vv-copy small">{detail}</div></div><span className="vv-muted">Planned</span></div>)}</div></div> }
function Unavailable({ title, detail }) { return <div><PageTitle eyebrow="NOT EXPOSED" title={title} /><div className="vv-panel vv-copy">{detail}</div></div> }
function PageTitle({ eyebrow, title, action }) { return <div className="vv-page-title"><div><div className="vv-eyebrow">{eyebrow}</div><h1>{title}</h1></div>{action}</div> }
function Metric({ label, value, detail }) { return <Card tone="ghost" className="vv-metric"><div className="vv-eyebrow">{label}</div><div className="vv-metric-value">{value}</div><div className="vv-muted truncate">{detail}</div></Card> }
function Row({ icon: Icon, label, value }) { return <div className="vv-row"><span><Icon size={14} />{label}</span><span className="truncate">{value}</span></div> }

import { useState } from 'react'
import { Activity, CheckCircle2, ChevronDown, Clipboard, ExternalLink, Hammer, ShieldCheck, TestTube2, AlertTriangle, CircleDashed } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../lib/api'
import './DeveloperEngineeringStatus.css'

const TRACE = {
  source: { label: 'CONSOLE SOURCE', path: 'voxvector/src/components/DeveloperConsole.jsx', href: 'https://github.com/darenprince/darenprince-author/blob/main/voxvector/src/components/DeveloperConsole.jsx' },
  pipeline: { label: 'PIPELINE STATUS', path: 'VoxVector/docs/PIPELINE_BUILD_STATUS.md', href: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/PIPELINE_BUILD_STATUS.md' },
  workflow: { label: 'QA WORKFLOW', path: '.github/workflows/voxvector-qa.yml', href: 'https://github.com/darenprince/darenprince-author/blob/main/.github/workflows/voxvector-qa.yml' },
  docs: { label: 'SYNC RULES', path: 'VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md', href: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md' },
}

const CURRENT_STAGE = 'UPLOAD AND INTAKE RELIABILITY'
const NEXT_DEPENDENCY = 'REAL PER-STAGE TELEMETRY AND LIFECYCLE REPORTING'

function stateTone(state) {
  if (state === 'HEALTHY' || state === 'PASS' || state === 'FUNCTIONAL') return 'healthy'
  if (state === 'BUILT' || state === 'PARTIAL' || state === 'PENDING' || state === 'UNVERIFIED' || state === 'CONDITIONAL' || state === 'QUEUED' || state === 'NOT VALIDATED') return 'warning'
  return 'error'
}
function StateChip({ icon: Icon, label, value, tone }) { return <div className={`vv-eng-state ${tone || stateTone(value)}`}><Icon size={15} aria-hidden="true"/><div className="min-w-0"><div className="vv-eng-state__label">{label}</div><strong>{value}</strong></div></div> }
function CopyTrace({ item }) { const [copied,setCopied]=useState(false); const copy=async()=>{try{await navigator.clipboard.writeText(item.href);setCopied(true);window.setTimeout(()=>setCopied(false),1600)}catch{setCopied(false)}}; return <div className="vv-trace-row"><div className="vv-trace-copy"><span>{item.label}</span><code>{item.path}</code></div><div className="vv-trace-actions"><a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open ${item.label}`} title="Open in GitHub"><ExternalLink size={13}/></a><button type="button" onClick={copy} aria-label={`Copy ${item.label} GitHub link`} title={copied?'Copied':'Copy GitHub link'}><Clipboard size={13}/></button></div>{copied&&<span className="vv-trace-copied">COPIED</span>}</div> }
function QACheck({ label,status,detail }) { const tone=stateTone(status); const Icon=status==='PASS'||status==='FUNCTIONAL'?CheckCircle2:status==='FAIL'?AlertTriangle:CircleDashed; return <div className={`vv-qa-check ${tone}`}><Icon size={14}/><div className="min-w-0"><div className="vv-qa-check__top"><strong>{label}</strong><span>{status}</span></div><p>{detail}</p></div></div> }

export default function DeveloperEngineeringStatus(){
  const [open,setOpen]=useState(false)
  const health=useQuery({queryKey:['engineering-status-health'],queryFn:getHealth,refetchInterval:30000})
  const h=health.data?.payload||health.data||{}
  const pipeline=h.pipeline_build||{}
  const testing=h.testing||{}
  const apiState=h.status==='ok'?'HEALTHY':health.isPending?'PENDING':'ERROR'
  const runtimeState=h.runtime_self_test==='passed'?'PASS':health.isPending?'PENDING':'FAIL'
  const built=pipeline.total===21?`${pipeline.implemented_foundations||0}/21`:'PENDING'
  const functional='UNVERIFIED'
  const tested=testing.current_commit_qa&&testing.current_commit_qa!=='not_reported'?String(testing.current_commit_qa).toUpperCase():'PENDING'
  const validated='NOT VALIDATED'
  const currentSha=h.source_revision&&h.source_revision!=='unknown'?h.source_revision:'NOT EXPOSED'
  const historical=testing.historical_backend_baseline?.passed?`${testing.historical_backend_baseline.passed} PASSED / ${testing.historical_backend_baseline.duration_seconds}s`:'NOT AVAILABLE'
  const qaChecks=[
    ['API HEALTH',apiState,apiState==='HEALTHY'?'Canonical /health endpoint responding.':'Current API health has not been confirmed.'],
    ['RUNTIME SELF TEST',runtimeState,runtimeState==='PASS'?'Canonical acoustic runtime smoke test passed.':'Runtime self test requires attention.'],
    ['BACKEND AUTOMATED TESTS',tested,tested==='PASS'?'Current commit reports a passing backend suite.':`Historical baseline: ${historical}. Current commit result is not reported here.`],
    ['FRONTEND PRODUCTION BUILD','UNVERIFIED','Build evidence must come from the current GitHub Actions run.'],
    ['WAV UPLOAD + PERSISTENCE','UNVERIFIED','Authenticated browser verification is still required.'],
    ['SECURE PLAYBACK','UNVERIFIED','Signed media playback requires authenticated end-to-end verification.'],
    ['CASE-BOUND ANALYSIS','UNVERIFIED','Execution must be verified through the deployed case workflow.'],
    ['21-STAGE EXECUTION',`${pipeline.total===21?pipeline.implemented_foundations||0:0}/21 BUILT`,`${pipeline.queued||0} queued · ${pipeline.conditional_or_not_invoked||0} conditional/not invoked.`],
    ['SCIENTIFIC VALIDATION',validated,'Build and software tests are not scientific validation.'],
  ]
  return <section className={`vv-eng-status ${open?'is-open':'is-collapsed'}`} aria-label="Engineering status">
    <div className="vv-eng-status__header">
      <div className="vv-eng-status__current"><Activity size={15}/><div><span className="vv-eng-status__eyebrow">CURRENT STEP</span><strong>{CURRENT_STAGE}</strong></div></div>
      <button type="button" className="vv-eng-status__collapse" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={open?'Collapse engineering status':'Expand engineering status'} title={open?'Collapse status':'Expand status'}><ChevronDown size={15} className={open?'':'rotate-180'}/></button>
    </div>
    {open&&<div className="vv-eng-status__body">
      <div className="vv-eng-status__expanded-title"><span className="vv-eng-status__heading"><Activity size={16}/><span>ENGINEERING STATUS</span></span><span className="vv-eng-status__summary"><span>{built} BUILT</span><span>{functional}</span></span></div>
      <div className="vv-eng-state-grid"><StateChip icon={Hammer} label="BUILT" value={built}/><StateChip icon={Activity} label="FUNCTIONAL" value={functional}/><StateChip icon={TestTube2} label="TESTED" value={tested}/><StateChip icon={ShieldCheck} label="VALIDATED" value={validated}/></div>
      <div className="vv-eng-current"><div><span className="vv-eng-kicker">CURRENT ENGINEERING STAGE</span><strong>{CURRENT_STAGE}</strong></div><div><span className="vv-eng-kicker">NEXT DEPENDENCY</span><strong>{NEXT_DEPENDENCY}</strong></div><div><span className="vv-eng-kicker">SOURCE REVISION</span><code>{currentSha}</code></div></div>
      <div className="vv-eng-grid"><div className="vv-eng-panel"><div className="vv-eng-panel__head"><span>QA CHECKS</span><span>{qaChecks.filter(item=>item[1]==='PASS').length} CURRENT PASSES</span></div><div className="vv-qa-list">{qaChecks.map(([label,status,detail])=><QACheck key={label} label={label} status={status} detail={detail}/>)}</div></div><div className="vv-eng-panel"><div className="vv-eng-panel__head"><span>SOURCE TRACEABILITY</span><span>GITHUB</span></div><div className="vv-trace-list">{Object.values(TRACE).map(item=><CopyTrace key={item.path} item={item}/>)}</div><div className="vv-trace-note">SOURCE → COMMIT → WORKFLOW → TEST RESULT → ARTIFACT / DEPLOYMENT → RUNTIME → CONSOLE</div></div></div>
    </div>}
  </section>
}

import { useState } from 'react'
import { Activity, CheckCircle2, ChevronDown, Clipboard, ExternalLink, Hammer, ShieldCheck, TestTube2, AlertTriangle, CircleDashed, RefreshCw, Mic2, Server } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../lib/api'
import { getGitHubWorkflowStatus } from '../lib/githubStatus'
import appPackage from '../../package.json'
import './DeveloperEngineeringStatus.css'

const TRACE = {
  source: { label: 'CONSOLE SOURCE', path: 'voxvector/src/components/DeveloperConsole.jsx', href: 'https://github.com/darenprince/darenprince-author/blob/main/voxvector/src/components/DeveloperConsole.jsx' },
  pipeline: { label: 'PIPELINE STATUS', path: 'VoxVector/docs/PIPELINE_BUILD_STATUS.md', href: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/PIPELINE_BUILD_STATUS.md' },
  workflow: { label: 'QA WORKFLOW', path: '.github/workflows/voxvector-qa.yml', href: 'https://github.com/darenprince/darenprince-author/blob/main/.github/workflows/voxvector-qa.yml' },
  docs: { label: 'SYNC RULES', path: 'VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md', href: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md' },
}

function stateTone(state) {
  if (['HEALTHY','PASS','FUNCTIONAL','SUCCESS','READY'].includes(state)) return 'healthy'
  if (['BUILT','PARTIAL','PENDING','UNVERIFIED','CONDITIONAL','QUEUED','NOT VALIDATED','IN_PROGRESS','STALE','UNAVAILABLE','NOT REPORTED','NOT CONFIGURED','NOT INSTALLED'].includes(state)) return 'warning'
  return 'error'
}
function StateChip({ icon: Icon, label, value, tone }) { return <div className={`vv-eng-state ${tone || stateTone(value)}`}><Icon size={15}/><div className="min-w-0"><div className="vv-eng-state__label">{label}</div><strong>{value}</strong></div></div> }
function CopyTrace({ item }) { const [copied,setCopied]=useState(false); const copy=async()=>{try{await navigator.clipboard.writeText(item.href);setCopied(true);window.setTimeout(()=>setCopied(false),1600)}catch{setCopied(false)}}; return <div className="vv-trace-row"><div className="vv-trace-copy"><span>{item.label}</span><code>{item.path}</code></div><div className="vv-trace-actions"><a href={item.href} target="_blank" rel="noreferrer"><ExternalLink size={13}/></a><button type="button" onClick={copy}><Clipboard size={13}/></button></div>{copied&&<span className="vv-trace-copied">COPIED</span>}</div> }
function QACheck({ label,status,detail,url }) { const tone=stateTone(status); const Icon=status==='PASS'||status==='FUNCTIONAL'||status==='READY'?CheckCircle2:status==='FAIL'?AlertTriangle:CircleDashed; return <div className={`vv-qa-check ${tone}`}><Icon size={14}/><div className="min-w-0"><div className="vv-qa-check__top"><strong>{label}</strong><span>{status}</span></div><p>{detail}</p>{url&&<a className="vv-workflow-link" href={url} target="_blank" rel="noreferrer">Open workflow <ExternalLink size={11}/></a>}</div></div> }

export default function DeveloperEngineeringStatus({ mode = 'toolbar' }){
  const [open,setOpen]=useState(false)
  const health=useQuery({queryKey:['engineering-status-health'],queryFn:getHealth,refetchInterval:30000})
  const h=health.data?.payload||health.data||{}
  const currentRevision=h.source_revision&&h.source_revision!=='unknown'?h.source_revision:''
  const workflows=useQuery({queryKey:['github-workflow-status',currentRevision],queryFn:()=>getGitHubWorkflowStatus(currentRevision),refetchInterval:30000,staleTime:10000})
  const pipeline=h.pipeline_build||{}
  const speech=h.speech_runtime||{}
  const transcription=speech.transcription||{}
  const diarization=speech.diarization||{}
  const apiState=h.status==='ok'?'HEALTHY':health.isPending?'PENDING':'ERROR'
  const runtimeState=h.runtime_self_test==='passed'?'PASS':health.isPending?'PENDING':'FAIL'
  const built=pipeline.total===21?`${pipeline.implemented_foundations||0}/21`:'PENDING'
  const qa=workflows.data?.qa
  const deploy=workflows.data?.deployment
  const qaFresh=Boolean(qa&&(!currentRevision||qa.sha===currentRevision))
  const deployFresh=Boolean(deploy&&(!currentRevision||deploy.sha===currentRevision))
  const tested=workflows.isPending?'PENDING':workflows.isError?'UNAVAILABLE':qa?(qaFresh?qa.state:'STALE'):'NOT REPORTED'
  const deployState=workflows.isPending?'PENDING':workflows.isError?'UNAVAILABLE':deploy?(deployFresh?deploy.state:'STALE'):'NOT REPORTED'
  const transcriptionState=transcription.configured_provider==='not_configured'?'NOT CONFIGURED':transcription.adapter_installed?'INSTALLED · EXECUTION UNVERIFIED':'NOT INSTALLED'
  const diarizationState=diarization.configured_provider==='not_configured'?'NOT CONFIGURED':diarization.adapter_installed&&diarization.hf_token_configured?'READY':!diarization.adapter_installed?'NOT INSTALLED':'TOKEN NOT DETECTED'
  const currentSha=currentRevision||qa?.sha||'NOT EXPOSED'
  const qaChecks=[
    ['API HEALTH',apiState,apiState==='HEALTHY'?'Canonical /health endpoint responding.':'Current API health has not been confirmed.'],
    ['RUNTIME SELF TEST',runtimeState,runtimeState==='PASS'?'Canonical acoustic runtime smoke test passed.':'Runtime self test requires attention.'],
    ['TRANSCRIPTION RUNTIME',transcriptionState,`${transcription.configured_provider || 'not configured'} · ${transcription.adapter_installed?'package present; first successful provider execution still required':'adapter package unavailable; Render build is missing the transcription dependency'}`],
    ['DIARIZATION RUNTIME',diarizationState,`${diarization.configured_provider || 'not configured'} · ${diarization.adapter_installed?'pyannote adapter installed':'adapter package unavailable'} · HF token ${diarization.hf_token_configured?'configured':'not detected'}`],
    ['BACKEND + FRONTEND QA',tested,qa?`GitHub Actions #${qa.runNumber||qa.id} · ${qaFresh?'matches current source revision':'does not match current source revision'} · ${qa.updatedAt?new Date(qa.updatedAt).toLocaleString():'time unavailable'}`:'No VoxVector QA run was returned.',qa?.url],
    ['PAGES DEPLOYMENT',deployState,deploy?`GitHub Actions #${deploy.runNumber||deploy.id} · ${deployFresh?'matches current source revision':'does not match current source revision'} · ${deploy.updatedAt?new Date(deploy.updatedAt).toLocaleString():'time unavailable'}`:'No Pages deployment run was returned.',deploy?.url],
    ['21-STAGE BUILD',`${pipeline.total===21?pipeline.implemented_foundations||0:0}/21 BUILT`,`${pipeline.queued||0} queued · ${pipeline.conditional_or_not_invoked||0} conditional/not invoked.`],
    ['RENDER MEMORY','512 MB CONSTRAINED','Transcription is isolated from pyannote in the production dependency set to reduce concurrent heavy-runtime pressure.'],
    ['SCIENTIFIC VALIDATION','NOT VALIDATED','Build and software tests are not scientific validation.'],
  ]
  return <section className={`vv-eng-status vv-eng-status--${mode} ${open?'is-open':'is-collapsed'}`} aria-label="Engineering status">
    <div className="vv-eng-status__header"><div className="vv-eng-status__current"><Activity size={15}/><div><span className="vv-eng-status__eyebrow">LIVE ENGINEERING STATE</span><strong>{qa?.state==='PASS'&&qaFresh?'QA VERIFIED · DEPLOYMENT '+deployState:workflows.isPending?'SYNCING GITHUB ACTIONS…':'WORKFLOW STATUS AVAILABLE'}</strong></div></div><div className="flex items-center gap-2"><button type="button" className="vv-eng-status__collapse" onClick={() => { health.refetch(); workflows.refetch() }} aria-label="Refresh workflow state"><RefreshCw size={14} className={workflows.isFetching||health.isFetching?'animate-spin':''}/></button><button type="button" className="vv-eng-status__collapse" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label={open?'Collapse engineering status':'Expand engineering status'}>{open?<ChevronDown size={15}/>:<Activity size={15}/>}</button>{open&&<button type="button" className="vv-eng-status__collapse vv-eng-status__close" onClick={()=>setOpen(false)} aria-label="Close engineering status"><AlertTriangle size={0} className="hidden"/><span aria-hidden="true">×</span></button>}</div></div>
    {open&&<div className="vv-eng-status__body"><div className="vv-eng-status__expanded-title"><span className="vv-eng-status__heading"><Activity size={16}/><span>LIVE ENGINEERING STATUS</span></span><span className="vv-eng-status__summary"><span>{appPackage.version} FRONTEND</span><span>{built} BUILT</span><span>{tested}</span></span></div>
      {workflows.isError&&<div className="vv-status-row error"><Server size={14}/>GitHub workflow status could not be refreshed: {workflows.error?.message}</div>}
      <div className="vv-eng-state-grid"><StateChip icon={Hammer} label="BUILT" value={built}/><StateChip icon={Activity} label="API" value={apiState}/><StateChip icon={TestTube2} label="QA" value={tested}/><StateChip icon={ShieldCheck} label="DEPLOY" value={deployState}/><StateChip icon={Mic2} label="TRANSCRIBE" value={transcriptionState}/><StateChip icon={Server} label="RENDER" value="512 MB" tone="warning"/></div>
      <div className="vv-eng-current"><div><span className="vv-eng-kicker">CURRENT SOURCE REVISION</span><code>{currentSha}</code></div><div><span className="vv-eng-kicker">FRONTEND</span><strong>{appPackage.version}</strong></div><div><span className="vv-eng-kicker">BACKEND</span><strong>{h.package_version||h.api_version||'0.2.26'}</strong></div></div>
      <div className="vv-eng-grid"><div className="vv-eng-panel"><div className="vv-eng-panel__head"><span>LIVE QA + PIPELINE CHECKS</span><span>{qaChecks.filter(item=>item[1]==='PASS'||item[1]==='READY').length} PASSES</span></div><div className="vv-qa-list">{qaChecks.map(([label,status,detail,url])=><QACheck key={label} label={label} status={status} detail={detail} url={url}/>)}</div></div><div className="vv-eng-panel"><div className="vv-eng-panel__head"><span>SOURCE TRACEABILITY</span><span>GITHUB</span></div><div className="vv-trace-list">{Object.values(TRACE).map(item=><CopyTrace key={item.path} item={item}/>)}</div><div className="vv-trace-note">SOURCE → COMMIT → WORKFLOW → TEST RESULT → ARTIFACT / DEPLOYMENT → RUNTIME → CONSOLE</div></div></div>
    </div>}
  </section>
}

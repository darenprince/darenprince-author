import { useEffect, useRef, useState } from 'react'
import { Activity, CheckCircle2, ChevronDown, Clipboard, ExternalLink, Hammer, ShieldCheck, TestTube2, AlertTriangle, CircleDashed, Mic2, Server, Rocket, LoaderCircle } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getHealth, getRenderStatus, triggerRenderDeploy } from '../lib/api'
import { getGitHubWorkflowStatus } from '../lib/githubStatus'
import { supabase } from '../lib/supabase'
import appPackage from '../../package.json'

const TRACE = {
  source: { label: 'CONSOLE SOURCE', path: 'voxvector/src/components/DeveloperConsole.jsx', href: 'https://github.com/darenprince/darenprince-author/blob/main/voxvector/src/components/DeveloperConsole.jsx' },
  pipeline: { label: 'PIPELINE STATUS', path: 'VoxVector/docs/PIPELINE_BUILD_STATUS.md', href: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/PIPELINE_BUILD_STATUS.md' },
  workflow: { label: 'QA WORKFLOW', path: '.github/workflows/voxvector-qa.yml', href: 'https://github.com/darenprince/darenprince-author/blob/main/.github/workflows/voxvector-qa.yml' },
  docs: { label: 'SYNC RULES', path: 'VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md', href: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/DEVELOPER_CONSOLE_DOC_SYNC_RULES.md' },
  endpoints: { label: 'ENDPOINT REGISTRY', path: 'VoxVector/docs/ENDPOINT_REGISTRY.md', href: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/ENDPOINT_REGISTRY.md' },
}

const READY_STATES = ['HEALTHY','PASS','FUNCTIONAL','SUCCESS','READY','LIVE','ACTIVE']
const WARNING_STATES = ['BUILT','PARTIAL','PENDING','UNVERIFIED','CONDITIONAL','QUEUED','NOT VALIDATED','IN_PROGRESS','STALE','UNAVAILABLE','NOT REPORTED','NOT CONFIGURED','NOT INSTALLED','INSTALLED · EXECUTION UNVERIFIED','READY · EXECUTION UNVERIFIED','CONFIGURED','BUILD IN PROGRESS','UPDATE IN PROGRESS']
function stateTone(state) { if (READY_STATES.includes(state)) return 'healthy'; if (WARNING_STATES.includes(state)) return 'warning'; return 'error' }
function StateChip({ icon: Icon, label, value, tone }) { return <div className={`vv-eng-state ${tone || stateTone(value)}`}><Icon size={15}/><div className="min-w-0"><div className="vv-eng-state__label">{label}</div><strong>{value}</strong></div></div> }
function CopyTrace({ item }) { const [copied,setCopied]=useState(false); const copy=async()=>{try{await navigator.clipboard.writeText(item.href);setCopied(true);window.setTimeout(()=>setCopied(false),1600)}catch{setCopied(false)}}; return <div className="vv-trace-row"><div className="vv-trace-copy"><span>{item.label}</span><code>{item.path}</code></div><div className="vv-trace-actions"><a href={item.href} target="_blank" rel="noreferrer"><ExternalLink size={13}/></a><button type="button" onClick={copy}><Clipboard size={13}/></button></div>{copied&&<span className="vv-trace-copied">COPIED</span>}</div> }
function QACheck({ label,status,detail,url }) { const tone=stateTone(status); const Icon=READY_STATES.includes(status)?CheckCircle2:status==='FAIL'||status==='ERROR'?AlertTriangle:CircleDashed; return <div className={`vv-qa-check ${tone}`}><Icon size={14}/><div className="min-w-0"><div className="vv-qa-check__top"><strong>{label}</strong><span>{status}</span></div><p>{detail}</p>{url&&<a className="vv-workflow-link" href={url} target="_blank" rel="noreferrer">Open workflow <ExternalLink size={11}/></a>}</div></div> }
const formatState = value => String(value || '').trim().replaceAll('_',' ').toUpperCase() || 'NOT REPORTED'

export default function DeveloperEngineeringStatus({ mode = 'toolbar', accessToken = '' }){
  const [open,setOpen]=useState(false)
  const [sessionToken,setSessionToken]=useState(accessToken)
  const [deployNotice,setDeployNotice]=useState('')
  const swipeStart=useRef(null)
  const queryClient=useQueryClient()
  useEffect(()=>{setSessionToken(accessToken)},[accessToken])
  useEffect(()=>{
    if(accessToken||!supabase)return undefined
    let mounted=true
    let subscription
    supabase.auth.getSession().then(({data})=>{if(mounted)setSessionToken(data.session?.access_token||'')}).catch(()=>{})
    const result=supabase.auth.onAuthStateChange((_event,nextSession)=>{if(mounted)setSessionToken(nextSession?.access_token||'')})
    subscription=result?.data?.subscription
    return()=>{mounted=false;subscription?.unsubscribe()}
  },[accessToken])
  useEffect(()=>{if(!open)return undefined;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[open])

  const health=useQuery({queryKey:['engineering-status-health'],queryFn:getHealth,refetchInterval:30000})
  const h=health.data?.payload||health.data||{}
  const currentRevision=h.source_revision&&h.source_revision!=='unknown'?h.source_revision:''
  const workflows=useQuery({queryKey:['github-workflow-status',currentRevision],queryFn:()=>getGitHubWorkflowStatus(currentRevision),refetchInterval:30000,staleTime:10000})
  const render=useQuery({queryKey:['engineering-render-status'],queryFn:()=>getRenderStatus(sessionToken,{logMinutes:30}),enabled:Boolean(sessionToken),refetchInterval:30000,staleTime:10000,retry:false})
  const deployMutation=useMutation({mutationFn:()=>triggerRenderDeploy(sessionToken),onSuccess:()=>{setDeployNotice('Render accepted the deployment request. Watching runtime status…');queryClient.invalidateQueries({queryKey:['engineering-render-status']});queryClient.invalidateQueries({queryKey:['render-status']});queryClient.invalidateQueries({queryKey:['render-logs']});health.refetch();workflows.refetch()},onError:error=>setDeployNotice(error?.message||'Render deployment could not be triggered.')})

  const pipeline=h.pipeline_build||{}
  const speech=h.speech_runtime||{}
  const transcription=speech.transcription||{}
  const diarization=speech.diarization||{}
  const apiState=h.status==='ok'?'HEALTHY':health.isPending?'PENDING':'ERROR'
  const runtimeState=h.runtime_self_test==='passed'?'PASS':health.isPending?'PENDING':'FAIL'
  const built=pipeline.total===21?`${pipeline.implemented_foundations||0}/21`:'PENDING'
  const qa=workflows.data?.qa
  const pagesDeploy=workflows.data?.deployment
  const qaFresh=Boolean(qa&&(!currentRevision||qa.sha===currentRevision))
  const deployFresh=Boolean(pagesDeploy&&(!currentRevision||pagesDeploy.sha===currentRevision))
  const tested=workflows.isPending?'PENDING':workflows.isError?'UNAVAILABLE':qa?(qaFresh?qa.state:'STALE'):'NOT REPORTED'
  const pagesState=workflows.isPending?'PENDING':workflows.isError?'UNAVAILABLE':pagesDeploy?(deployFresh?pagesDeploy.state:'STALE'):'NOT REPORTED'
  const transcriptionState=transcription.configured_provider==='not_configured'?'NOT CONFIGURED':transcription.execution_ready?'READY · EXECUTION UNVERIFIED':transcription.adapter_installed?'INSTALLED · EXECUTION UNVERIFIED':'NOT INSTALLED'
  const diarizationProvider=String(diarization.configured_provider||'not_configured').toLowerCase()
  const cloudDiarization=['pyannote_api','pyannote.api','pyannoteai'].includes(diarizationProvider)
  const localAdapter=Boolean(diarization.local_adapter_installed ?? diarization.adapter_installed)
  const diarizationState=diarizationProvider==='not_configured'?'NOT CONFIGURED':diarization.execution_ready?'READY · EXECUTION UNVERIFIED':cloudDiarization&&!diarization.pyannote_api_key_configured?'API KEY NOT DETECTED':!cloudDiarization&&!localAdapter?'NOT INSTALLED':'CONFIGURED'
  const renderPayload=render.data?.payload||render.data||{}
  const renderService=renderPayload.service||{}
  const renderDeploy=renderPayload.latest_deploy||{}
  const renderServiceState=render.isPending?'PENDING':render.isError?'UNAVAILABLE':formatState(renderService.state||renderService.status||'active')
  const renderDeployState=render.isPending?'PENDING':render.isError?'UNAVAILABLE':formatState(renderDeploy.status)
  const renderCommit=renderDeploy?.commit?.id||renderDeploy?.commit?.sha||''
  const renderRevisionMatch=Boolean(currentRevision&&renderCommit&&currentRevision===renderCommit)
  const frontendRevision=String(import.meta.env.VITE_GITHUB_SHA||'').trim()
  const frontendRevisionShort=frontendRevision?frontendRevision.slice(0,12):'NOT EXPOSED'
  const currentSha=currentRevision||qa?.sha||'NOT EXPOSED'
  const backendVersion=h.pipeline||h.package_version||h.api_version||'NOT REPORTED'
  const diarizationDetail=cloudDiarization
    ? `${diarization.configured_provider || 'pyannote api'} · API key ${diarization.pyannote_api_key_configured?'configured':'not detected'} · cloud provider execution ${diarization.execution_ready?'ready but not verified':'not ready'}`
    : `${diarization.configured_provider || 'not configured'} · local adapter ${localAdapter?'installed':'not installed'} · HF token ${diarization.hf_token_configured?'configured':'not detected'} · provider-backed execution still requires a controlled run`
  const qaChecks=[
    ['API HEALTH',apiState,apiState==='HEALTHY'?'Canonical /health endpoint responding.':'Current API health has not been confirmed.'],
    ['RUNTIME SELF TEST',runtimeState,runtimeState==='PASS'?'Canonical acoustic runtime smoke test passed.':'Runtime self test requires attention.'],
    ['TRANSCRIPTION RUNTIME',transcriptionState,`${transcription.configured_provider || 'not configured'} · ${transcription.adapter_installed?'package present; first successful provider execution still required':'adapter package unavailable; Render build is missing the transcription dependency'}`],
    ['DIARIZATION RUNTIME',diarizationState,diarizationDetail],
    ['BACKEND + FRONTEND QA',tested,qa?`GitHub Actions #${qa.runNumber||qa.id} · ${qaFresh?'matches current API source revision':'does not match current API source revision'} · ${qa.updatedAt?new Date(qa.updatedAt).toLocaleString():'time unavailable'}`:'No VoxVector QA run was returned.',qa?.url],
    ['PAGES DEPLOYMENT',pagesState,pagesDeploy?`GitHub Actions #${pagesDeploy.runNumber||pagesDeploy.id} · ${deployFresh?'matches current API source revision':'does not match current API source revision'} · ${pagesDeploy.updatedAt?new Date(pagesDeploy.updatedAt).toLocaleString():'time unavailable'}`:'No Pages deployment run was returned.',pagesDeploy?.url],
    ['RENDER SERVICE',renderServiceState,render.isError?`Render status unavailable: ${render.error?.message||'query failed'}`:`${renderService.name||'voxvector-api'} · ${renderService.region||'region not reported'} · deployment ${renderDeployState}${renderCommit?` · ${renderCommit.slice(0,12)}${renderRevisionMatch?' matches API revision':''}`:''}`],
    ['21-STAGE BUILD',`${pipeline.total===21?pipeline.implemented_foundations||0:0}/21 BUILT`,`${pipeline.queued||0} queued · ${pipeline.conditional_or_not_invoked||0} conditional/not invoked.`],
    ['SCIENTIFIC VALIDATION','NOT VALIDATED','Build, deployment, provider readiness, and software tests are not scientific validation.'],
  ]
  const deployNow=()=>{
    if(!sessionToken){setDeployNotice('Developer session token unavailable.');return}
    if(deployMutation.isPending)return
    const confirmed=window.confirm('Deploy the current VoxVector API revision to Render now?\n\nThis triggers the protected Render deploy hook. It does not bypass GitHub QA or prove runtime health.')
    if(confirmed)deployMutation.mutate()
  }
  const swipeStartHandler=event=>{const touch=event.touches?.[0];if(touch)swipeStart.current=touch.clientY}
  const swipeEndHandler=event=>{const start=swipeStart.current;const touch=event.changedTouches?.[0];swipeStart.current=null;if(start==null||!touch)return;if(Math.abs(touch.clientY-start)>=70)setOpen(false)}
  const launcherSummary=apiState==='HEALTHY'&&renderServiceState==='ACTIVE'?`API HEALTHY · RENDER ${renderDeployState==='LIVE'?'LIVE':renderDeployState}`:health.isPending?'SYNCING RUNTIME…':`${apiState} · RENDER ${renderServiceState}`

  return <section className={`vv-eng-status vv-eng-status--${mode} ${open?'is-open':'is-collapsed'}`} aria-label="Engineering status">
    <div className="vv-eng-status__header">
      <button type="button" className="vv-eng-status__launcher" onClick={()=>setOpen(value=>!value)} aria-expanded={open} aria-label={open?'Collapse live engineering state':'Expand live engineering state'}>
        <span className="vv-eng-status__current"><Activity size={15}/><span><span className="vv-eng-status__eyebrow">LIVE ENGINEERING STATE</span><strong>{launcherSummary}</strong></span></span>
        <span className="vv-eng-status__launcher-meta">{currentRevision?currentRevision.slice(0,10):'revision pending'}</span>
        <ChevronDown size={14} className={`vv-eng-status__launcher-icon ${open?'is-open':''}`}/>
      </button>
    </div>
    {open&&<div className="vv-eng-status__body">
      <div className="vv-eng-status__swipe-handle" onTouchStart={swipeStartHandler} onTouchEnd={swipeEndHandler} onTouchCancel={()=>{swipeStart.current=null}}><span/><small>Swipe to collapse</small></div>
      <div className="vv-eng-status__expanded-title"><span className="vv-eng-status__heading"><Activity size={16}/><span>LIVE ENGINEERING STATUS</span></span><div className="vv-eng-status__summary-wrap"><span className="vv-eng-status__summary"><span>{appPackage.version} FRONTEND</span><span>{built} BUILT</span><span>{tested}</span></span><button type="button" className="vv-eng-deploy-button" onClick={deployNow} disabled={deployMutation.isPending||!sessionToken} aria-disabled={deployMutation.isPending||!sessionToken}>{deployMutation.isPending?<><LoaderCircle size={14} className="vv-eng-deploy-spinner"/>DEPLOYING…</>:<><Rocket size={14}/>DEPLOY NOW</>}</button><button type="button" className="vv-eng-status__close" onClick={()=>setOpen(false)} aria-label="Close engineering status">×</button></div></div>
      {deployNotice&&<div className={`vv-eng-deploy-notice ${deployMutation.isError?'error':'success'}`} role="status">{deployMutation.isError?<AlertTriangle size={14}/>:<CheckCircle2 size={14}/>}<span>{deployNotice}</span></div>}
      {workflows.isError&&<div className="vv-status-row error"><Server size={14}/>GitHub workflow status could not be refreshed: {workflows.error?.message}</div>}
      <div className="vv-eng-state-grid"><StateChip icon={Hammer} label="BUILT" value={built}/><StateChip icon={Activity} label="API" value={apiState}/><StateChip icon={TestTube2} label="QA" value={tested}/><StateChip icon={ShieldCheck} label="PAGES" value={pagesState}/><StateChip icon={Mic2} label="TRANSCRIBE" value={transcriptionState}/><StateChip icon={Server} label="RENDER" value={renderServiceState}/></div>
      <div className="vv-eng-current"><div><span className="vv-eng-kicker">CURRENT API SOURCE REVISION</span><code>{currentSha}</code></div><div><span className="vv-eng-kicker">FRONTEND</span><strong>{appPackage.version}</strong><code>{frontendRevisionShort}</code></div><div><span className="vv-eng-kicker">BACKEND PIPELINE</span><strong>{backendVersion}</strong></div><div><span className="vv-eng-kicker">RENDER DEPLOY</span><strong>{renderDeployState}</strong><code>{renderCommit?renderCommit.slice(0,12):'not reported'}</code></div></div>
      <div className="vv-eng-grid"><div className="vv-eng-panel"><div className="vv-eng-panel__head"><span>LIVE QA + PIPELINE CHECKS</span><span>{qaChecks.filter(item=>READY_STATES.includes(item[1])).length} HEALTHY CHECKS</span></div><div className="vv-qa-list">{qaChecks.map(([label,status,detail,url])=><QACheck key={label} label={label} status={status} detail={detail} url={url}/>)}</div></div><div className="vv-eng-panel"><div className="vv-eng-panel__head"><span>SOURCE TRACEABILITY</span><span>GITHUB</span></div><div className="vv-trace-list">{Object.values(TRACE).map(item=><CopyTrace key={item.path} item={item}/>)}</div><div className="vv-trace-note">SOURCE → COMMIT → WORKFLOW → TEST RESULT → ARTIFACT / DEPLOYMENT → RUNTIME → CONSOLE</div></div></div>
    </div>}
  </section>
}

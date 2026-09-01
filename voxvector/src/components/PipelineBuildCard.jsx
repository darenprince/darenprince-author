import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../lib/api'
import { getGitHubWorkflowStatus } from '../lib/githubStatus'
import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight, Circle, Clock3, GitBranch, Wrench } from 'lucide-react'

const STAGES = [
  ['01', 'File Upload / Ingest', 'implemented', 'Case source intake is persisted.'],
  ['02', 'File Decode and Normalization', 'implemented', 'PCM WAV decoding and mono normalization.'],
  ['03', 'Provenance and Integrity', 'implemented', 'Source and run provenance is recorded.'],
  ['04', 'Channel and Recording Assessment', 'implemented', 'Sample rate, duration, peak and clipping are assessed.'],
  ['05', 'Speaker Identification / Diarization', 'queued', 'Production speaker processing is the next integration dependency.'],
  ['06', 'Speech Segmentation', 'implemented', 'Deterministic speech regions are produced.'],
  ['07', 'Transcription Generation', 'queued', 'Production timestamped ASR is not yet attached.'],
  ['08', 'Transcript Alignment', 'queued', 'Audio and transcript synchronization follows ASR.'],
  ['09', 'Eligibility and Reliability', 'implemented', 'Recording eligibility and reliability state is evaluated.'],
  ['10', 'Acoustic Feature Extraction', 'implemented', 'Current acoustic observation families are executed.'],
  ['11', 'Prosodic and Voice Quality Analysis', 'implemented', 'F0, intensity and HNR observations are available.'],
  ['12', 'Temporal and Pause Analysis', 'implemented', 'Pause topology and timing observations are available.'],
  ['13', 'Linguistic and Disfluency Analysis', 'conditional', 'Runs when a transcript is supplied.'],
  ['14', 'Question / Answer Alignment', 'conditional', 'Runs when question or response context is supplied.'],
  ['15', 'Within Speaker Baseline', 'conditional', 'Runs when an independent speaker baseline is supplied.'],
  ['16', 'Cross Method Evidence Assembly', 'implemented', 'Normalized evidence records are assembled.'],
  ['17', 'Evidence Convergence and Conflict', 'implemented', 'Evidence relationships are represented.'],
  ['18', 'Candidate Classification', 'implemented', 'Guarded candidate classification boundary is present.'],
  ['19', 'Validation and Calibration Gate', 'not_invoked', 'Inferential validation is not invoked by the current runtime.'],
  ['20', 'Final Classification / Disposition', 'implemented', 'Guarded indeterminate disposition boundary is present.'],
  ['21', 'Audit and Provenance Output', 'implemented', 'Run, stage, source and provenance records are persisted.'],
]

const STATUS = {
  implemented: { label: 'Built', Icon: CheckCircle2, className: 'text-emerald-400' },
  conditional: { label: 'Conditional', Icon: Clock3, className: 'text-amber-300' },
  queued: { label: 'Queued', Icon: Circle, className: 'text-white/35' },
  not_invoked: { label: 'Not invoked', Icon: AlertCircle, className: 'text-red-300' },
}

export default function PipelineBuildCard({ className = '' }) {
  const [open, setOpen] = useState(false)
  const health = useQuery({ queryKey: ['pipeline-build-health'], queryFn: getHealth, refetchInterval: 30000 })
  const workflows = useQuery({ queryKey: ['github-workflow-status'], queryFn: getGitHubWorkflowStatus, refetchInterval: 30000, staleTime: 10000 })
  const live = health.data?.payload || health.data || {}
  const livePipeline = live.pipeline_build || {}
  const liveQa = workflows.data?.qa?.state || (workflows.isPending ? 'SYNCING' : workflows.isError ? 'UNAVAILABLE' : 'NOT REPORTED')
  const liveDeploy = workflows.data?.deployment?.state || (workflows.isPending ? 'SYNCING' : workflows.isError ? 'UNAVAILABLE' : 'NOT REPORTED')
  const counts = useMemo(() => STAGES.reduce((acc, [, , state]) => { acc[state] = (acc[state] || 0) + 1; return acc }, {}), [])
  const currentStage = STAGES.find(stage => stage[2] === 'implemented') || STAGES[0]
  const currentLabel = livePipeline.current_stage || live.current_engineering_stage || 'Upload and intake reliability'
  const implementedCount = livePipeline.total === 21 ? (livePipeline.implemented_foundations || counts.implemented || 0) : (counts.implemented || 0)

  return (
    <section className={`rounded-[9px] border border-[var(--vv-border)] bg-[var(--vv-surface)] shadow-[0_24px_70px_var(--vv-shadow)] ${className}`}>
      <button type="button" className="flex w-full items-start gap-3 p-5 text-left sm:p-6" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="voxvector-pipeline-build-details">
        <span className="mt-0.5 text-white/55" aria-hidden="true">{open ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}</span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-white/45">21 stage build</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-emerald-400"><CheckCircle2 size={12}/> {implementedCount} foundations</span>
          </span>
          <span className="mt-2 block text-base font-semibold tracking-tight text-white">Current engineering stage</span>
          <span className="mt-1 block text-sm leading-5 text-white/55">{currentLabel}</span>
          <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/35">
            <span>{livePipeline.total || STAGES.length} total</span>
            <span>{counts.queued || 0} queued</span>
            <span>{counts.conditional || 0} conditional</span>
            <span>{counts.not_invoked || 0} not invoked</span>
            <span>QA {liveQa}</span>
            <span>Deploy {liveDeploy}</span>
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-white/30 sm:inline-flex"><Wrench size={12}/> Engineering</span>
      </button>

      {open && <div id="voxvector-pipeline-build-details" className="border-t border-[var(--vv-border)] px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="mt-4 grid gap-1">
          {STAGES.map(([number, name, state, detail]) => {
            const config = STATUS[state] || STATUS.queued
            const Icon = config.Icon
            const isCurrent = number === currentStage[0]
            return <div key={number} className={`grid grid-cols-[34px_20px_1fr_auto] items-start gap-3 rounded-[7px] px-3 py-3 ${isCurrent ? 'bg-white/[.045] ring-1 ring-white/[.08]' : 'hover:bg-white/[.025]'}`}>
              <span className="pt-0.5 font-mono text-[10px] font-semibold tracking-[.12em] text-white/25">{number}</span>
              <Icon size={15} className={`${config.className} mt-0.5`} aria-hidden="true" />
              <span className="min-w-0"><span className="block text-sm font-medium text-white/75">{name}{isCurrent && <span className="ml-2 text-[9px] font-bold uppercase tracking-[.12em] text-[var(--vv-accent-bright)]">Current</span>}</span><span className="mt-0.5 block text-[11px] leading-5 text-white/35">{detail}</span></span>
              <span className={`pt-0.5 text-[9px] font-bold uppercase tracking-[.12em] ${config.className}`}>{config.label}</span>
            </div>
          })}
        </div>
        <div className="mt-4 grid gap-2 border-t border-[var(--vv-border)] pt-4 sm:grid-cols-2">
          <div className="rounded-[7px] border border-white/[.07] bg-white/[.015] p-3"><div className="text-[9px] font-bold uppercase tracking-[.15em] text-white/30">Next dependency</div><div className="mt-1 text-sm font-medium text-white/70">{livePipeline.current_dependency || 'Real per-stage telemetry'}</div></div>
          <div className="rounded-[7px] border border-white/[.07] bg-white/[.015] p-3"><div className="text-[9px] font-bold uppercase tracking-[.15em] text-white/30">Pipeline contract</div><div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-400"><GitBranch size={13}/> QA {liveQa} · Deploy {liveDeploy}</div></div>
        </div>
      </div>}
    </section>
  )
}

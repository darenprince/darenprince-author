import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../lib/api'
import { getGitHubWorkflowStatus, workflowEvidenceState } from '../lib/githubStatus'
import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight, Circle, Clock3, GitBranch, Wrench } from 'lucide-react'

const STAGES = [
  ['01', 'file_upload_ingest', 'File Upload / Ingest', 'implemented', 'Case source intake is persisted.'],
  ['02', 'file_decode_normalization', 'File Decode and Normalization', 'implemented', 'PCM WAV decoding and mono normalization.'],
  ['03', 'provenance_integrity', 'Provenance and Integrity', 'implemented', 'Source and run provenance is recorded.'],
  ['04', 'channel_recording_assessment', 'Channel and Recording Assessment', 'implemented', 'Sample rate, duration, peak and clipping are assessed.'],
  ['05', 'speech_segmentation', 'Speech Segmentation', 'implemented_foundation', 'Speech regions are established before provider acquisition.'],
  ['06', 'speaker_identification_diarization', 'Speaker Identification / Diarization', 'queued', 'Cloud-primary speaker processing remains a controlled execution and persistence gate.'],
  ['07', 'transcription_generation', 'Transcription Generation', 'implemented_foundation', 'Timestamped transcription generation is wired through the configured provider path.'],
  ['08', 'transcript_alignment', 'Transcript Alignment', 'implemented_foundation', 'Transcript timing alignment is present as an implemented foundation.'],
  ['09', 'eligibility_reliability', 'Eligibility and Reliability', 'implemented', 'Recording eligibility and reliability state is evaluated.'],
  ['10', 'acoustic_feature_extraction', 'Acoustic Feature Extraction', 'implemented', 'Current acoustic observation families are executed.'],
  ['11', 'prosodic_voice_quality', 'Prosodic and Voice Quality Analysis', 'implemented_foundation', 'F0, intensity and voice-quality observations are available as a foundation.'],
  ['12', 'temporal_pause_analysis', 'Temporal and Pause Analysis', 'implemented_foundation', 'Pause topology and timing observations are available as a foundation.'],
  ['13', 'linguistic_disfluency', 'Linguistic and Disfluency Analysis', 'conditional', 'Runs when a transcript is available.'],
  ['14', 'question_answer_alignment', 'Question / Answer Alignment', 'conditional', 'Runs when question or response context is available.'],
  ['15', 'within_speaker_baseline', 'Within Speaker Baseline', 'conditional', 'Runs when an independent speaker baseline is available.'],
  ['16', 'cross_method_evidence', 'Cross Method Evidence Assembly', 'implemented_foundation', 'Normalized evidence records are assembled.'],
  ['17', 'evidence_convergence_conflict', 'Evidence Convergence and Conflict', 'implemented_foundation', 'Evidence relationships are represented.'],
  ['18', 'candidate_classification', 'Candidate Classification', 'implemented_guarded', 'A guarded candidate-classification boundary is present.'],
  ['19', 'validation_calibration_gate', 'Validation and Calibration Gate', 'not_invoked', 'Inferential validation is not invoked by the current runtime.'],
  ['20', 'final_disposition', 'Final Classification / Disposition', 'implemented_guarded', 'A guarded final-disposition boundary is present.'],
  ['21', 'audit_provenance_output', 'Audit and Provenance Output', 'implemented_foundation', 'Run, stage, source and provenance records are persisted.'],
]

const normalizeFoundationState = value => {
  const state = String(value || '').trim().toLowerCase()
  if (state.startsWith('implemented')) return 'implemented'
  if (state === 'conditional') return 'conditional'
  if (state === 'not_invoked') return 'not_invoked'
  return 'queued'
}

const STATUS = {
  implemented: { label: 'Built', Icon: CheckCircle2, className: 'text-emerald-400' },
  conditional: { label: 'Conditional', Icon: Clock3, className: 'text-amber-300' },
  queued: { label: 'Queued', Icon: Circle, className: 'text-white/35' },
  not_invoked: { label: 'Not invoked', Icon: AlertCircle, className: 'text-red-300' },
}

export default function PipelineBuildCard({ className = '' }) {
  const [open, setOpen] = useState(false)
  const health = useQuery({ queryKey: ['pipeline-build-health'], queryFn: getHealth, refetchInterval: 30000 })
  const live = health.data?.payload || health.data || {}
  const backendRevision = live.runtime?.source_revision && live.runtime.source_revision !== 'unknown' ? live.runtime.source_revision : (live.source_revision && live.source_revision !== 'unknown' ? live.source_revision : '')
  const frontendRevision = String(import.meta.env.VITE_GITHUB_SHA || '').trim()
  const workflows = useQuery({ queryKey: ['github-workflow-status', frontendRevision, backendRevision], queryFn: () => getGitHubWorkflowStatus({ frontendRevision, backendRevision }), refetchInterval: 30000, staleTime: 10000 })
  const livePipeline = live.pipeline_build || {}
  const frontendQa = workflowEvidenceState(workflows.data?.frontendQa, workflows.data?.frontendQaMatchesSource, workflows)
  const backendQa = workflowEvidenceState(workflows.data?.backendQa, workflows.data?.backendQaMatchesSource, workflows)
  const liveDeploy = workflowEvidenceState(workflows.data?.deployment, workflows.data?.deploymentMatchesSource, workflows)
  const statusByStage = livePipeline.status_by_stage && typeof livePipeline.status_by_stage === 'object' ? livePipeline.status_by_stage : {}
  const runtimeContractAvailable = Object.keys(statusByStage).length > 0
  const rows = useMemo(() => STAGES.map(([number, id, name, fallbackState, detail]) => ({
    number,
    id,
    name,
    detail,
    state: normalizeFoundationState(statusByStage[id] || fallbackState),
  })), [statusByStage])
  const counts = useMemo(() => rows.reduce((acc, row) => { acc[row.state] = (acc[row.state] || 0) + 1; return acc }, {}), [rows])
  const currentToken = String(livePipeline.current_stage_id || livePipeline.current_stage || '').trim().toLowerCase()
  const currentLabel = runtimeContractAvailable
    ? (livePipeline.current_stage || live.current_engineering_stage || 'Runtime pipeline state')
    : health.isError
      ? 'Backend pipeline status unavailable — showing source-contract fallback'
      : 'Loading backend pipeline status — source-contract fallback shown meanwhile'
  const implementedCount = livePipeline.total === 21 && Number.isFinite(Number(livePipeline.implemented_foundations))
    ? Number(livePipeline.implemented_foundations)
    : (counts.implemented || 0)

  return (
    <section className={`rounded-[9px] border border-[var(--vv-border)] bg-[var(--vv-surface)] shadow-[0_24px_70px_var(--vv-shadow)] ${className}`}>
      <button type="button" className="flex w-full items-start gap-3 p-5 text-left sm:p-6" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="voxvector-pipeline-build-details">
        <span className="mt-0.5 text-white/55" aria-hidden="true">{open ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}</span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-white/45">21 stage build</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-emerald-400"><CheckCircle2 size={12}/> {implementedCount} foundations</span>
            <span className={`text-[10px] font-bold uppercase tracking-[.12em] ${runtimeContractAvailable ? 'text-sky-300' : health.isError ? 'text-amber-200' : 'text-white/35'}`}>{runtimeContractAvailable ? 'Runtime contract' : health.isError ? 'Backend unavailable · fallback' : 'Backend loading · fallback'}</span>
          </span>
          <span className="mt-2 block text-base font-semibold tracking-tight text-white">Current engineering stage</span>
          <span className="mt-1 block text-sm leading-5 text-white/55">{currentLabel}</span>
          <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/35">
            <span>{livePipeline.total || rows.length} total</span>
            <span>{counts.queued || 0} queued</span>
            <span>{counts.conditional || 0} conditional</span>
            <span>{counts.not_invoked || 0} not invoked</span>
            <span>Frontend QA {frontendQa}</span>
            <span>Backend QA {backendQa}</span>
            <span>Pages {liveDeploy}</span>
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-white/30 sm:inline-flex"><Wrench size={12}/> Engineering</span>
      </button>

      {open && <div id="voxvector-pipeline-build-details" className="border-t border-[var(--vv-border)] px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="mt-4 grid gap-1">
          {rows.map(({ number, id, name, state, detail }) => {
            const config = STATUS[state] || STATUS.queued
            const Icon = config.Icon
            const isCurrent = Boolean(currentToken) && [number, id, name].some(value => String(value).toLowerCase() === currentToken)
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
          <div className="rounded-[7px] border border-white/[.07] bg-white/[.015] p-3"><div className="text-[9px] font-bold uppercase tracking-[.15em] text-white/30">Pipeline contract</div><div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-400"><GitBranch size={13}/> Frontend {frontendQa} · Backend {backendQa} · Pages {liveDeploy}</div></div>
        </div>
      </div>}
    </section>
  )
}
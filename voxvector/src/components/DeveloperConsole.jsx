import { useEffect, useMemo, useState } from 'react'
import AudioUploadPlayer from './AudioUploadPlayer'
import { Activity, AlertTriangle, BookOpen, CheckCircle2, ChevronDown, ChevronRight, Circle, CircleCheck, Clipboard, ClipboardList, CloudCog, Code2, Download, FileAudio, Globe2, Images, Info, ListChecks, LogOut, Menu, Play, RefreshCw, Server, Terminal, UserRound, Waves, X, XCircle } from 'lucide-react'
import { Icon as Iconify } from '@iconify/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { analyzeCaseSource, API_BASE, createAnalysisCase, getCasePlaybackUrl, getAnalysisCase, getDiagnosticErrors, getDiagnosticEvents, getHealth, getRenderLogs, getRenderStatus, triggerRenderDeploy, listAnalysisCases, uploadCaseSource } from '../lib/api'
import { supportedAudioFile } from '../lib/audio'
import Button from './ui/Button'
import Card from './ui/Card'
import Sheet from './ui/Sheet'
import ThemeToggle, { applyTheme, getStoredTheme } from './ui/ThemeToggle'
import Toast from './ui/Toast'
import CaseAnalysisWorkspace from './CaseAnalysisWorkspace'
import SiteHeader from './SiteHeader'
import DeveloperEngineeringStatus from './DeveloperEngineeringStatus'
import { AUDIT_REPORTS } from '../data/audits'

const DOCS = {
  methodology: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/ANALYSIS_METHODS.md',
  pipeline: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/ANALYSIS_PIPELINE.md',
  architecture: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/ARCHITECTURE.md',
  mvp: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/MVP_BUILD_PLAN.md',
  methodsIndex: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/MASTER_METHOD_INDEX.md',
  capability: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/CAPABILITY_STATUS.md',
  liveApiAudit: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/audits/LIVE_API_SPEECH_RUNTIME_AUDIT_2026-09-03.md',
  deploymentVariables: 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/DEPLOYMENT_VARIABLE_MATRIX.md',
}
const PUBLIC = { home: '/voxvector/', developer: '/voxvector/developer/', methods: '/voxvector/methods.html', pipeline: '/voxvector/pipeline.html', imageIndex: '/voxvector/image-index/', sitemap: '/voxvector/sitemap.xml' }
const phases = [
  { id: 'P0', title: 'Case spine', detail: 'Identity persistence provenance storage and lifecycle.', tasks: [['case-schema', 'Canonical analysis case schema', 'backend'], ['intake-persist', 'Persist source metadata and provenance', 'backend'], ['lifecycle', 'Persist request and stage lifecycle', 'backend']] },
  { id: 'P1', title: 'Recording workspace', detail: 'Move from upload to usable synchronized audio.', tasks: [['upload', 'Production upload flow and validation', 'frontend + API'], ['playback', 'Audio playback and shared playhead', 'frontend'], ['waveform', 'Waveform renderer from source audio', 'frontend'], ['regions', 'Region selection and timestamp navigation', 'frontend']] },
  { id: 'P2', title: 'Real pipeline', detail: 'Expose actual backend processing state and observations.', tasks: [['pipeline', '21 stage pipeline status mapping', 'backend + frontend'], ['quality', 'Eligibility and recording quality state', 'backend'], ['tracks', 'Pitch intensity spectral and temporal tracks', 'backend + frontend'], ['events', 'Timestamped evidence events', 'backend']] },
  { id: 'P3', title: 'Speaker + transcript', detail: 'Turn audio into a speaker-aware timestamped transcript. Transcription wiring and the synchronized review surface are built; controlled provider execution remains the functional gate.', tasks: [['speakers', 'Speaker segmentation and diarization', 'backend'], ['asr', 'Production ASR execution wiring', 'backend'], ['transcript', 'Persist transcript timestamps and confidence', 'backend'], ['alignment', 'Audio and transcript synchronization', 'frontend + backend'], ['transcript-workspace', 'Synchronized conversation transcript workspace', 'frontend']] },
  { id: 'P4', title: 'Evidence workspace', detail: 'Make every observation inspectable and traceable.', tasks: [['evidence-schema', 'Normalized evidence records with provenance', 'backend'], ['timeline', 'Evidence timeline linked to audio', 'frontend'], ['explorer', 'Evidence Explorer filters and playback', 'frontend'], ['synthesis', 'Convergence and conflict representation', 'backend + frontend']] },
  { id: 'P5', title: 'Assessment + report', detail: 'Connect evidence to assessment reporting and case history.', tasks: [['candidate', 'Candidate classification trace', 'backend'], ['assessment', 'Assessment surface from canonical result', 'frontend'], ['report', 'Structured report generation', 'backend + frontend'], ['history', 'Persist and reopen cases', 'backend + frontend']] },
  { id: 'P6', title: 'Validation + hardening', detail: 'Move the product spine into reproducible validated operation.', tasks: [['eval', 'Evaluation harness and speaker-disjoint datasets', 'research'], ['calibration', 'Calibration and uncertainty analysis', 'research'], ['e2e', 'Browser end-to-end verification', 'QA'], ['security', 'Media access retention and deletion controls', 'security + backend']] },
]
const unwrap = result => result?.payload?.case || result?.payload?.data || result?.payload || {}
const caseId = result => unwrap(result)?.case_id || result?.payload?.case_id || ''
const sourceFrom = result => unwrap(result)?.source || result?.payload?.source || unwrap(result)
const latestRun = data => data?.runs?.find(run => run.run_id === data.current_run_id) || data?.runs?.at(-1) || null
const CANONICAL_COMPLETED_CHECKS = {
  'case-schema': true, 'intake-persist': true, 'lifecycle': true,
  'upload': true, 'playback': true, 'waveform': true,
  'pipeline': true, 'quality': true, 'tracks': true,
  'asr': true, 'transcript': true, 'alignment': true, 'transcript-workspace': true,
  'evidence-schema': true, 'candidate': true, 'assessment': true, 'history': true,
}
const readChecks = () => { try { return { ...JSON.parse(localStorage.getItem('voxvector-mvp-checks') || '{}'), ...CANONICAL_COMPLETED_CHECKS } } catch { return { ...CANONICAL_COMPLETED_CHECKS } } }
const serializeExport = value => JSON.stringify(value, null, 2)
const copyExport = async (value, label = 'Report') => {
  const text = typeof value === 'string' ? value : serializeExport(value)
  await navigator.clipboard.writeText(text)
  return `${label} copied to clipboard`
}
const downloadExport = (filename, value, type = 'application/json') => {
  const body = typeof value === 'string' ? value : serializeExport(value)
  const blob = new Blob([body], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
function ExportActions({ value, filename, label = 'Report', markdown = false, notify }) {
  const copy = async () => { try { await copyExport(value, label); notify?.('success', `${label} copied`, 'A copy was placed on your clipboard.') } catch { notify?.('error', 'Copy failed', 'Clipboard access was unavailable.') } }
  const download = () => downloadExport(filename, value, markdown ? 'text/markdown;charset=utf-8' : 'application/json;charset=utf-8')
  return <div className="flex flex-wrap gap-2"><Button variant="secondary" onClick={copy}><Clipboard size={14}/> Copy</Button><Button variant="secondary" onClick={download}><Download size={14}/> Download</Button></div>
}
const STATUS_LABELS = { idle:'Ready', uploading:'Uploading', converting:'Converting', processing:'Persisting', running:'Running', completed:'Completed', failed:'Failed', pending:'Queued', not_run:'Not run', not_invoked:'Not invoked' }
const displayText = (value, fallback = '—') => {
  if (typeof value === 'string' && value.trim()) return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (value && typeof value === 'object') {
    for (const key of ['message','text','event','detail','name']) if (typeof value[key] === 'string' && value[key].trim()) return value[key]
    try { return JSON.stringify(value) } catch { return fallback }
  }
  return fallback
}

// Remaining component implementation is unchanged in the canonical source.

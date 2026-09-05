import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, AlertTriangle, CheckCircle2, Circle, Clock3, FileAudio, Gauge, Info, Pause, Play, RefreshCw, ShieldCheck, SkipBack, Volume2, Waves, ChevronDown, ChevronRight } from 'lucide-react'
import Button from './ui/Button'

const unwrap = result => result?.payload?.case || result?.payload?.data || result?.payload || {}
const latestRun = data => data?.runs?.find(run => run.run_id === data.current_run_id) || data?.runs?.at(-1) || null
const fmt = value => { const s = Math.max(0, Number(value) || 0); return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` }
const fmtMs = value => { const n = Number(value); return Number.isFinite(n) ? `${n.toLocaleString()} ms` : '—' }
const STAGE_NAMES = { file_upload_ingest: 'File Upload / Ingest', file_decode_normalization: 'File Decode and Normalization', provenance_integrity: 'Provenance and Integrity', channel_recording_assessment: 'Channel and Recording Assessment', speaker_identification_diarization: 'Speaker Identification / Diarization', speech_segmentation: 'Speech Segmentation', transcription_generation: 'Transcription Generation', transcript_alignment: 'Transcript Alignment', eligibility_reliability: 'Eligibility and Reliability', acoustic_feature_extraction: 'Acoustic Feature Extraction', prosodic_voice_quality: 'Prosodic and Voice Quality Analysis', temporal_pause_analysis: 'Temporal and Pause Analysis', linguistic_disfluency: 'Linguistic and Disfluency Analysis', question_answer_alignment: 'Question / Answer Alignment', within_speaker_baseline: 'Within Speaker Baseline', cross_method_evidence: 'Cross Method Evidence Assembly', evidence_convergence_conflict: 'Evidence Convergence and Conflict', candidate_classification: 'Candidate Classification', validation_calibration_gate: 'Validation and Calibration Gate', final_disposition: 'Final Classification / Disposition', audit_provenance_output: 'Audit and Provenance Output' }
const COMPLETE = new Set(['completed', 'complete', 'success', 'succeeded'])
const FAILED = new Set(['failed', 'error'])
const PENDING = new Set(['pending', 'running', 'processing', 'in_progress'])

function Waveform({ url, file, duration, currentTime, onSeek, markers = [] }) {
  const canvasRef = useRef(null)
  const [peaks, setPeaks] = useState(null)
  const [state, setState] = useState('idle')
  useEffect(() => { let disposed = false; const load = async () => { try { setState('loading'); const buffer = file ? await file.arrayBuffer() : url ? await (await fetch(url)).arrayBuffer() : null; if (!buffer) { setState('empty'); return }; const AC = window.AudioContext || window.webkitAudioContext; if (!AC) { setState('unsupported'); return }; const context = new AC(); const audio = await context.decodeAudioData(buffer.slice(0)); const channel = audio.getChannelData(0); const count = 900; const block = Math.max(1, Math.floor(channel.length / count)); const next = new Float32Array(count); for (let i = 0; i < count; i += 1) { const start = i * block; const end = Math.min(channel.length, start + block); let peak = 0; for (let j = start; j < end; j += 1) peak = Math.max(peak, Math.abs(channel[j])); next[i] = peak }; await context.close().catch(() => {}); if (!disposed) { setPeaks(next); setState('ready') } } catch { if (!disposed) setState('unavailable') } }; load(); return () => { disposed = true } }, [url, file])
  useEffect(() => { const canvas = canvasRef.current; if (!canvas) return undefined; const draw = () => { const rect = canvas.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1; canvas.width = Math.max(1, Math.floor(rect.width * dpr)); canvas.height = Math.max(1, Math.floor(rect.height * dpr)); const ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, rect.width, rect.height); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.moveTo(0, rect.height / 2); ctx.lineTo(rect.width, rect.height / 2); ctx.stroke(); if (!peaks?.length) return; const step = rect.width / peaks.length; const active = duration ? Math.min(1, currentTime / duration) : 0; for (let i = 0; i < peaks.length; i += 1) { const x = i * step; const h = Math.max(2, peaks[i] * rect.height * .86); ctx.fillStyle = i / peaks.length <= active ? 'rgba(201,154,102,.95)' : 'rgba(250,248,244,.28)'; ctx.fillRect(x, rect.height / 2 - h / 2, Math.max(1, step * .62), h) } if (duration && markers.length) { ctx.fillStyle = 'rgba(255,255,255,.22)'; for (const marker of markers) { if (!Number.isFinite(marker) || marker < 0 || marker > duration) continue; const x = (marker / duration) * rect.width; ctx.fillRect(x, 0, 1, rect.height) } } }; draw(); window.addEventListener('resize', draw); return () => window.removeEventListener('resize', draw) }, [peaks, currentTime, duration, markers])
  const seek = event => { if (!duration) return; const r = event.currentTarget.getBoundingClientRect(); onSeek(Math.max(0, Math.min(1, (event.clientX - r.left) / r.width)) * duration) }
  return <div><button type="button" onClick={seek} className="vv-waveform-hit w-full" aria-label="Seek through case audio"><canvas ref={canvasRef} className="h-32 w-full sm:h-44" /></button><div className="flex justify-between px-1 pt-2 text-[10px] font-mono text-[var(--vv-muted)]"><span>00:00</span><span>{fmt(duration / 2)}</span><span>{fmt(duration)}</span></div><p className="mt-2 text-[11px] text-[var(--vv-muted)]">{state === 'loading' ? 'Generating waveform from source audio…' : state === 'ready' ? 'Waveform generated from decoded source audio.' : state === 'empty' ? 'Attach a source to generate the waveform.' : 'Waveform source is unavailable.'}</p></div>
}

function Spectrogram({ analyser, active, currentTime, duration }) {
  const canvasRef = useRef(null)
  useEffect(() => { const canvas = canvasRef.current; if (!canvas) return undefined; const ctx = canvas.getContext('2d'); let raf = 0; let last = 0; const draw = now => { const rect = canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2); if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) { canvas.width = Math.max(1, Math.floor(rect.width * dpr)); canvas.height = Math.max(1, Math.floor(rect.height * dpr)) }; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); const w = rect.width; const h = rect.height; if (active && analyser && now - last > 38) { last = now; const bins = new Uint8Array(analyser.frequencyBinCount); analyser.getByteFrequencyData(bins); ctx.drawImage(canvas, -2, 0, Math.max(0, w - 2), h); const columns = Math.min(96, bins.length); const step = Math.max(1, Math.floor(bins.length / columns)); for (let i = 0; i < columns; i += 1) { let sum = 0; for (let j = i * step; j < Math.min(bins.length, (i + 1) * step); j += 1) sum = Math.max(sum, bins[j]); const y = h - (i / columns) * h; const intensity = sum / 255; ctx.fillStyle = `rgba(255,255,255,${.035 + intensity * .28})`; ctx.fillRect(w - 2, y, 2, Math.max(2, h / columns)) } } else if (!active) { ctx.fillStyle = 'rgba(8,8,8,.16)'; ctx.fillRect(0,0,w,h) }; raf = requestAnimationFrame(draw) }; raf = requestAnimationFrame(draw); return () => cancelAnimationFrame(raf) }, [analyser, active])
  const position = duration ? `${Math.min(100, Math.max(0, currentTime / duration * 100))}%` : '0%'
  return <div className="vv-spectrogram-body relative h-44 overflow-hidden border border-[var(--vv-border)] bg-[#080808] sm:h-56"><canvas ref={canvasRef} className="h-full w-full" aria-label="Live audio spectrogram" role="img"/><div className="pointer-events-none absolute inset-y-0 border-l border-[var(--vv-accent-bright)]/60" style={{ left: position }}/><div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-2 py-1 text-[9px] font-mono text-white/30"><span>0 Hz</span><span>2 kHz</span><span>4 kHz</span><span>8 kHz+</span></div></div>
}

function PlaybackControls({ audioRef, duration, currentTime, gain, setGain, speed, setSpeed, onSeek }) {
  const [meter, setMeter] = useState(0)
  useEffect(() => { let raf = 0; const tick = () => { const a = audioRef.current; setMeter(a ? Math.min(100, Math.max(0, (Math.abs(a.volume || 0) * 100))) : 0); raf = requestAnimationFrame(tick) }; raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf) }, [audioRef])
  return <div className="vv-playback-controls"><label><span>Gain</span><input aria-label="Audio gain" type="range" min="0" max="2" step="0.01" value={gain} onChange={e => setGain(Number(e.target.value))}/><output>{gain.toFixed(2)}×</output></label><label><span>Position</span><input aria-label="Audio position" type="range" min="0" max={Math.max(0.01, duration)} step="0.01" value={Math.min(currentTime, duration || 0)} onChange={e => onSeek(Number(e.target.value))}/><output>{fmt(currentTime)}</output></label><label><span>Speed</span><select aria-label="Playback speed" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="border border-[var(--vv-border)] bg-[var(--vv-panel)] px-2 py-1 text-[10px] text-[var(--vv-text)]"><option value="0.5">0.5×</option><option value="0.75">0.75×</option><option value="1">1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label><span className="ml-auto inline-flex items-center gap-1.5" title="Playback level"><Volume2 size={13}/><span>{Math.round(meter)}%</span></span></div>
}

function StageList({ run }) {
  const stages = run?.stages || run?.stage_states || []
  const [open, setOpen] = useState(null)
  if (!stages.length) return <p className="vv-copy">No persisted stage records are attached to this run yet.</p>
  return <div className="space-y-1">{stages.map((stage, index) => { const id = stage.id || stage.stage_id || stage.name || String(index); const expanded = open === id; const status = stage.status || 'pending'; const done = COMPLETE.has(status); const failed = FAILED.has(status); const pending = PENDING.has(status); const name = stage.name || STAGE_NAMES[id] || id; const Icon = failed ? AlertTriangle : done ? CheckCircle2 : pending ? Circle : Info; return <div className="overflow-hidden border border-white/5" key={id}><button type="button" className="vv-status-row w-full text-left" onClick={() => setOpen(expanded ? null : id)} aria-expanded={expanded}><span><Icon size={14}/></span><span className="min-w-0"><span className="block truncate">{stage.number ? `${stage.number}. ` : ''}{name}</span><span className="block text-[10px] text-[var(--vv-muted)]">{id}</span></span><span className="ml-auto flex items-center gap-2 text-xs"><span>{status}</span>{expanded ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}</span></button>{expanded && <div className="grid gap-3 border-t border-white/5 px-3 py-3 sm:grid-cols-2 lg:grid-cols-4"><Data label="Started" value={stage.started_at ? new Date(stage.started_at).toLocaleString() : '—'}/><Data label="Completed" value={stage.completed_at ? new Date(stage.completed_at).toLocaleString() : '—'}/><Data label="Duration" value={fmtMs(stage.duration_ms)}/><Data label="Outcome" value={stage.outcome || '—'}/>{stage.error && <div className="sm:col-span-2 lg:col-span-4"><Data label="Error" value={stage.error}/></div>}</div>}</div> })}</div>
}

function ResultState({ label, value, detail }) { return <div className="border border-white/5 p-3"><div className="vv-eyebrow">{label}</div><div className="mt-1 text-sm font-semibold">{value || '—'}</div>{detail && <p className="mt-1 text-[11px] leading-relaxed text-[var(--vv-muted)]">{detail}</p>}</div> }
function PipelineOverview({ stages, active }) {
  if (!stages.length) return <p className="vv-copy mt-4">No persisted stage records are attached to this run yet.</p>
  return <div className="mt-4 grid gap-1 sm:grid-cols-2 xl:grid-cols-3" aria-label="21 stage analysis pipeline">
    {stages.map((stage, index) => {
      const id = stage.id || stage.stage_id || stage.name || String(index)
      const status = stage.status || 'pending'
      const done = COMPLETE.has(status)
      const failed = FAILED.has(status)
      const running = active && (active.id || active.stage_id || active.name) === id
      const Icon = failed ? AlertTriangle : done ? CheckCircle2 : running ? Activity : Circle
      const name = stage.name || STAGE_NAMES[id] || id
      return <div key={id} className={`flex min-w-0 items-center gap-2 border px-2.5 py-2 text-[11px] ${failed ? 'border-red-400/30 bg-red-400/[.04]' : running ? 'border-[var(--vv-accent)] bg-[var(--vv-accent)]/[.06]' : done ? 'border-white/10 bg-white/[.02]' : 'border-white/5 bg-transparent'}`}>
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center font-mono text-[9px] ${done ? 'text-[var(--vv-accent-bright)]' : failed ? 'text-red-300' : running ? 'text-[var(--vv-accent-bright)]' : 'text-[var(--vv-muted)]'}`}><Icon size={14}/></span>
        <span className="min-w-0 flex-1 truncate"><span className="mr-1.5 font-mono text-white/30">{String(stage.number || index + 1).padStart(2, '0')}</span>{name}</span>
        <span className="shrink-0 text-[9px] uppercase tracking-[.1em] text-[var(--vv-muted)]">{running ? 'active' : done ? 'done' : failed ? 'failed' : status}</span>
      </div>
    })}
  </div>
}


function AnalysisResultsReview({ data, run, source }) {
  const result = run?.result || {}
  const observations = Array.isArray(result.observations) ? result.observations : []
  const evidence = Array.isArray(result.evidence) ? result.evidence : []
  const limitations = Array.isArray(result.limitations) ? result.limitations : []
  const provenance = result.provenance || {}
  const eligibility = result.eligibility || {}
  const candidate = result.candidate || 'indeterminate'
  const disposition = result.disposition || 'insufficient_evidence'
  const supports = evidence.filter(item => item?.direction === 'supports').length
  const conflicts = evidence.filter(item => item?.direction === 'contradicts').length
  const neutral = evidence.filter(item => item?.direction === 'neutral').length
  return <section className="vv-panel"><div className="vv-panel-head"><h2><ShieldCheck size={16}/> Analysis Results / Review Evidence</h2><span>{run?.status || '—'}</span></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><ResultState label="Candidate state" value={String(candidate).replaceAll('_',' ').toUpperCase()} detail="Candidate classification remains distinct from final disposition."/><ResultState label="Final disposition" value={String(disposition).replaceAll('_',' ').toUpperCase()} detail="The current runtime remains guarded and evidence-limited."/><ResultState label="Eligibility" value={eligibility.status ? String(eligibility.status).toUpperCase() : '—'} detail={(eligibility.reasons || []).slice?.(0,2).join?.(' · ') || 'Reliability state from the analysis result.'}/><ResultState label="Evidence records" value={`${evidence.length}`} detail={`${supports} supporting · ${conflicts} conflicting · ${neutral} neutral`}/></div><div className="mt-4 grid gap-2 lg:grid-cols-2"><div className="border border-white/5 p-3"><div className="flex items-center gap-2 text-xs font-semibold"><Info size={14}/> Observations</div>{observations.length ? <div className="mt-3 max-h-64 overflow-auto space-y-2">{observations.slice(0,80).map((item,index)=><div key={`${item?.method_id || 'observation'}-${index}`} className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/5 pb-2 text-[11px]"><div><strong>{item?.feature || 'Unnamed feature'}</strong><div className="text-[var(--vv-muted)]">{item?.method_id || 'method unavailable'} · {item?.unit || 'unit unavailable'}</div></div><span className="font-mono">{item?.value ?? '—'}</span></div>)}</div> : <p className="vv-copy mt-3">No analytical observations were returned in this run.</p>}</div><div className="border border-white/5 p-3"><div className="flex items-center gap-2 text-xs font-semibold"><Activity size={14}/> Evidence</div>{evidence.length ? <div className="mt-3 max-h-64 overflow-auto space-y-2">{evidence.slice(0,80).map((item,index)=><div key={`evidence-${index}`} className="border-b border-white/5 pb-2 text-[11px]"><div className="flex items-center justify-between gap-3"><strong>{String(item?.direction || 'neutral').toUpperCase()}</strong><span>strength {item?.strength ?? '—'} · confidence {item?.confidence ?? '—'}</span></div>{Array.isArray(item?.alternative_explanations) && item.alternative_explanations.length > 0 && <div className="mt-1 text-[var(--vv-muted)]">Alternatives: {item.alternative_explanations.join(' · ')}</div>}</div>)}</div> : <p className="vv-copy mt-3">No normalized evidence records were returned in this run.</p>}</div></div><div className="mt-4 border border-white/5 p-3"><div className="flex items-center gap-2 text-xs font-semibold"><AlertTriangle size={14}/> Uncertainty and alternative explanations</div>{limitations.length ? <div className="mt-2 space-y-1">{limitations.map((item,index)=><p className="text-[11px] leading-relaxed text-[var(--vv-muted)]" key={index}>{item}</p>)}</div> : <p className="vv-copy mt-2">No additional limitation text was returned. Absence of text is not evidence of certainty.</p>}</div><div className="mt-4 grid gap-2 sm:grid-cols-3"><Data label="Run ID" value={run?.run_id}/><Data label="Source ID" value={source?.source_id}/><Data label="Result schema" value={result?.schema_version || run?.schema_version || '—'}/></div><div className="mt-3 text-[10px] text-[var(--vv-muted)]">Software provenance: {JSON.stringify(provenance).slice(0,900)}</div><div className="mt-3 flex items-start gap-2 border border-[var(--vv-border)] p-3 text-[11px] text-[var(--vv-muted)]"><Info size={14} className="mt-0.5 shrink-0"/>This review surface reports the persisted runtime result. It does not convert observations into a deception probability and does not imply scientific validation.</div></section>
}


function EvidenceExplorer({ run }) {
  const result = run?.result || {}
  const evidence = Array.isArray(result.evidence) ? result.evidence : []
  const observations = Array.isArray(result.observations) ? result.observations : []
  const [direction, setDirection] = useState('all')
  const [method, setMethod] = useState('all')
  const methods = useMemo(() => [...new Set([
    ...observations.map(item => item?.method_id).filter(Boolean),
    ...evidence.map(item => item?.method_id).filter(Boolean),
  ])].sort(), [observations, evidence])
  const filteredEvidence = evidence.filter(item => {
    const itemDirection = String(item?.direction || 'neutral').toLowerCase()
    const itemMethod = item?.method_id || ''
    return (direction === 'all' || itemDirection === direction) && (method === 'all' || itemMethod === method)
  })
  const filteredObservations = observations.filter(item => method === 'all' || item?.method_id === method)
  const counts = ['supports', 'contradicts', 'neutral'].map(key => [key, evidence.filter(item => String(item?.direction || 'neutral').toLowerCase() === key).length])
  return <section className="vv-panel">
    <div className="vv-panel-head"><h2><Activity size={16}/> Evidence explorer</h2><span>{evidence.length + observations.length} persisted records</span></div>
    <p className="vv-copy mt-3">Inspect the measurements and normalized evidence returned by this run without collapsing them into a single opaque score.</p>
    <div className="mt-4 flex flex-wrap gap-2">
      <button type="button" onClick={() => setDirection('all')} className={`border px-3 py-1.5 text-[10px] uppercase tracking-[.12em] ${direction === 'all' ? 'border-[var(--vv-accent-bright)] bg-white/[.06] text-white' : 'border-white/10 text-[var(--vv-muted)]'}`}>All {evidence.length}</button>
      {counts.map(([key, count]) => <button key={key} type="button" onClick={() => setDirection(key)} className={`border px-3 py-1.5 text-[10px] uppercase tracking-[.12em] ${direction === key ? 'border-[var(--vv-accent-bright)] bg-white/[.06] text-white' : 'border-white/10 text-[var(--vv-muted)]'}`}>{key} {count}</button>)}
    </div>
    {methods.length > 0 && <div className="mt-3 flex flex-wrap gap-2">
      <button type="button" onClick={() => setMethod('all')} className={`border px-2.5 py-1 text-[10px] ${method === 'all' ? 'border-white/30 text-white' : 'border-white/10 text-[var(--vv-muted)]'}`}>All methods</button>
      {methods.map(id => <button key={id} type="button" onClick={() => setMethod(id)} className={`border px-2.5 py-1 text-[10px] font-mono ${method === id ? 'border-white/30 text-white' : 'border-white/10 text-[var(--vv-muted)]'}`}>{id}</button>)}
    </div>}
    <div className="mt-5 grid gap-3 xl:grid-cols-[.85fr_1.15fr]">
      <div className="border border-white/5">
        <div className="border-b border-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--vv-muted)]">Measurements · {filteredObservations.length}</div>
        <div className="max-h-[28rem] overflow-auto divide-y divide-white/5">
          {filteredObservations.length ? filteredObservations.map((item, index) => <div key={`${item?.method_id || 'observation'}-${item?.feature || index}`} className="grid grid-cols-[1fr_auto] gap-3 px-3 py-2.5 text-[11px]"><div className="min-w-0"><strong className="block truncate">{item?.feature || 'Unnamed feature'}</strong><span className="block truncate text-[var(--vv-muted)]">{item?.method_id || 'method unavailable'}{item?.unit ? ` · ${item.unit}` : ''}</span></div><span className="self-center font-mono text-white/70">{item?.value ?? '—'}</span></div>) : <div className="p-4 text-[11px] text-[var(--vv-muted)]">No persisted measurements match the current filter.</div>}
        </div>
      </div>
      <div className="border border-white/5">
        <div className="border-b border-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--vv-muted)]">Evidence records · {filteredEvidence.length}</div>
        <div className="max-h-[28rem] overflow-auto divide-y divide-white/5">
          {filteredEvidence.length ? filteredEvidence.map((item, index) => {
            const itemDirection = String(item?.direction || 'neutral').toLowerCase()
            const alternatives = Array.isArray(item?.alternative_explanations) ? item.alternative_explanations : []
            return <div key={`evidence-map-${index}`} className="px-3 py-3 text-[11px]">
              <div className="flex flex-wrap items-center justify-between gap-2"><strong className="uppercase tracking-[.12em]">{itemDirection}</strong><span className="font-mono text-[10px] text-[var(--vv-muted)]">strength {item?.strength ?? '—'} · confidence {item?.confidence ?? '—'}</span></div>
              {item?.method_id && <div className="mt-1 font-mono text-[10px] text-[var(--vv-accent-bright)]">{item.method_id}</div>}
              {item?.description && <p className="mt-2 leading-relaxed text-[var(--vv-muted)]">{item.description}</p>}
              {alternatives.length > 0 && <div className="mt-2 border-l border-white/10 pl-2 text-[10px] leading-relaxed text-[var(--vv-muted)]">Alternatives: {alternatives.join(' · ')}</div>}
            </div>
          }) : <div className="p-4 text-[11px] text-[var(--vv-muted)]">No normalized evidence records match the current filter.</div>}
        </div>
      </div>
    </div>
  </section>
}

function TranscriptPanel({ run, currentTime, onSeek }) {
  const transcript = run?.transcript || run?.acquisition?.transcript || null
  const timeline = run?.acquisition?.multimodal_timeline || null
  const words = Array.isArray(timeline?.words) ? timeline.words : Array.isArray(transcript?.words) ? transcript.words : []
  const segments = Array.isArray(transcript?.segments) ? transcript.segments : []
  const speakerForSegment = segment => { const start=Number(segment?.start_s), end=Number(segment?.end_s); if (segment?.speaker_id) return segment.speaker_id; if (!Number.isFinite(start) || !Number.isFinite(end)) return 'Transcript'; const counts=new Map(); words.forEach(word=>{ const ws=Number(word?.start_s), we=Number(word?.end_s); if (!word?.speaker_id || !Number.isFinite(ws) || !Number.isFinite(we) || we<start || ws>end) return; counts.set(word.speaker_id,(counts.get(word.speaker_id)||0)+1) }); return [...counts.entries()].sort((a,b)=>b[1]-a[1])[0]?.[0] || 'Transcript' }
  const activeIndex = segments.findIndex(segment => Number.isFinite(segment?.start_s) && Number.isFinite(segment?.end_s) && currentTime >= segment.start_s && currentTime <= segment.end_s)
  const markerTimes = words.map(word => word?.start_s).filter(value => Number.isFinite(value))
  if (!transcript) return <section className="vv-panel"><div className="vv-panel-head"><h2><FileAudio size={16}/> Conversation transcript</h2><span>not available</span></div><p className="vv-copy mt-3">This run does not contain a persisted transcript artifact.</p></section>
  return <section className="vv-panel"><div className="vv-panel-head"><h2><FileAudio size={16}/> Conversation transcript</h2><span>{transcript.provider_id || 'ASR'} · {segments.length} segments</span></div>
    <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.12em] text-[var(--vv-muted)]"><span>{transcript.language || 'language unavailable'}</span><span>{words.length} timestamped words</span><span>{fmt(currentTime)} playhead</span></div>
    <div className="mt-4 max-h-[32rem] overflow-y-auto border border-[var(--vv-border)] divide-y divide-white/5" aria-label="Timestamped transcript">
      {segments.length ? segments.map((segment,index) => { const active=index===activeIndex; const start=Number(segment?.start_s); const end=Number(segment?.end_s); const speaker=speakerForSegment(segment); return <button type="button" key={`segment-${index}`} onClick={() => Number.isFinite(start) && onSeek(start)} className={`block w-full px-4 py-3 text-left transition ${active?'bg-white/[.06] border-l-2 border-[var(--vv-accent-bright)]':'hover:bg-white/[.03] border-l-2 border-transparent'}`} aria-current={active?'true':undefined}><div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[.12em] text-[var(--vv-muted)]"><span>{speaker}</span><span>{Number.isFinite(start)?fmt(start):'—'}{Number.isFinite(end)?` → ${fmt(end)}`:''}</span></div><p className="mt-2 text-sm leading-6 text-[var(--vv-text)]">{segment?.text || '—'}</p></button>}) : <div className="p-4 text-sm text-[var(--vv-muted)]">{transcript.text || 'No transcript text was returned.'}</div>}
    </div>
    {words.length>0 && <div className="mt-4"><div className="vv-eyebrow">Word timeline</div><div className="mt-2 flex flex-wrap gap-1.5">{words.slice(0,500).map((word,index) => { const start=Number(word?.start_s); const end=Number(word?.end_s); const active=Number.isFinite(start)&&Number.isFinite(end)&&currentTime>=start&&currentTime<=end; return <button type="button" key={`word-${index}`} onClick={() => Number.isFinite(start)&&onSeek(start)} className={`border px-1.5 py-1 text-[11px] transition ${active?'border-[var(--vv-accent-bright)] bg-white/[.08] text-white':'border-white/10 text-white/55 hover:text-white'}`} title={Number.isFinite(start)?fmt(start):'timestamp unavailable'}>{word?.text}</button>})}</div></div>}
    {Array.isArray(transcript.limitations) && transcript.limitations.length>0 && <div className="mt-4 border border-white/5 p-3 text-[11px] leading-relaxed text-[var(--vv-muted)]">{transcript.limitations.map((item,index)=><p key={index}>{item}</p>)}</div>}
  </section>
}

export default function CaseAnalysisWorkspace({ caseResult, playbackUrl, file, onRefresh }) {
  const data = unwrap(caseResult)
  const run = latestRun(data)
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const gainNodeRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(Number(data?.sources?.[0]?.duration_seconds) || 0)
  const [gain, setGain] = useState(1)
  const [speed, setSpeed] = useState(1)
  const source = data?.sources?.find(item => item.source_id === run?.source_id) || data?.sources?.[0]
  const sourceMeta = useMemo(() => source ? [['Source', source.source_id?.slice(0, 16)], ['SHA-256', source.sha256?.slice(0, 20)], ['Sample rate', source.sample_rate ? `${source.sample_rate} Hz` : '—'], ['Duration', source.duration_seconds ? `${Number(source.duration_seconds).toFixed(2)} s` : '—']] : [], [source])
  const stages = run?.stages || run?.stage_states || []
  const completed = stages.filter(stage => COMPLETE.has(stage.status)).length
  const active = stages.find(stage => ['running', 'processing', 'in_progress'].includes(stage.status))
  const failed = stages.filter(stage => FAILED.has(stage.status)).length
  useEffect(() => { const audio = audioRef.current; if (!audio) return undefined; const onTime = () => setTime(audio.currentTime); const onMeta = () => setDuration(audio.duration || duration); const onEnd = () => setPlaying(false); audio.addEventListener('timeupdate', onTime); audio.addEventListener('loadedmetadata', onMeta); audio.addEventListener('ended', onEnd); return () => { audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('loadedmetadata', onMeta); audio.removeEventListener('ended', onEnd) } }, [playbackUrl])
  useEffect(() => { const audio = audioRef.current; if (!audio) return undefined; audio.playbackRate = speed; audio.volume = 1; return undefined }, [speed])
  useEffect(() => { const audio = audioRef.current; if (!audio) return undefined; let connected = false; const setup = async () => { try { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; const ctx = new AC(); const sourceNode = ctx.createMediaElementSource(audio); const gainNode = ctx.createGain(); const analyser = ctx.createAnalyser(); analyser.fftSize = 2048; analyser.smoothingTimeConstant = .72; sourceNode.connect(gainNode); gainNode.connect(analyser); analyser.connect(ctx.destination); audioContextRef.current = ctx; gainNodeRef.current = gainNode; analyserRef.current = analyser; connected = true } catch { connected = false } }; setup(); return () => { if (connected) { audioContextRef.current?.close().catch(() => {}); audioContextRef.current = null; analyserRef.current = null; gainNodeRef.current = null } } }, [playbackUrl])
  useEffect(() => { if (gainNodeRef.current) gainNodeRef.current.gain.value = gain }, [gain])
  const seek = next => { if (!audioRef.current) return; audioRef.current.currentTime = Math.max(0, next); setTime(Math.max(0, next)) }
  const toggle = async () => { if (!audioRef.current) return; try { if (audioRef.current.paused) { await audioContextRef.current?.resume(); await audioRef.current.play(); setPlaying(true) } else { audioRef.current.pause(); setPlaying(false) } } catch {} }
  const reset = () => { if (!audioRef.current) return; audioRef.current.pause(); audioRef.current.currentTime = 0; setTime(0); setPlaying(false) }
  return <div className="space-y-4"><div className="flex flex-wrap items-end justify-between gap-3"><div><div className="vv-eyebrow">ANALYSIS WORKSPACE</div><h1 className="mt-1 text-2xl font-semibold tracking-tight">{data?.title || 'Case analysis'}</h1><p className="vv-copy mt-1">Persistent case view · {data?.case_id || '—'}</p></div><Button variant="secondary" onClick={onRefresh}><RefreshCw size={14}/> Refresh case</Button></div>
    <AnalysisResultsReview data={data} run={run} source={source}/>
    <EvidenceExplorer run={run}/>
    <section className="vv-panel"><div className="vv-panel-head"><h2><FileAudio size={16}/> Source timeline</h2><span>{run?.status || 'not started'}</span></div>{playbackUrl && <audio ref={audioRef} src={playbackUrl} preload="metadata" crossOrigin="anonymous" className="sr-only" />}
      <div className="mt-4">{(playbackUrl || file) ? <Waveform url={playbackUrl} file={file} duration={duration} currentTime={time} onSeek={seek} markers={(run?.acquisition?.multimodal_timeline?.words || run?.transcript?.words || []).map(word=>word?.start_s).filter(Number.isFinite)}/> : <p className="vv-copy">Open or upload a source in the Case Workbench to populate the timeline.</p>}</div>
      <div className="mt-4 flex flex-wrap items-center gap-2"><Button variant="accent" onClick={toggle} disabled={!playbackUrl}><span>{playing ? <Pause size={15}/> : <Play size={15}/>}</span>{playing ? 'Pause' : 'Play'}</Button><Button variant="secondary" onClick={reset} disabled={!playbackUrl}><SkipBack size={15}/> Reset</Button><div className="ml-auto flex items-center gap-2 text-xs font-mono text-[var(--vv-muted)]"><Gauge size={14}/>{fmt(time)} / {fmt(duration)}</div></div>
      <PlaybackControls audioRef={audioRef} duration={duration} currentTime={time} gain={gain} setGain={setGain} speed={speed} setSpeed={setSpeed} onSeek={seek}/>
      {playbackUrl && <div className="mt-3 flex items-center gap-2 text-xs text-[var(--vv-muted)]"><Volume2 size={14}/> Secure persisted source playback</div>}
    </section>
    <TranscriptPanel run={run} currentTime={time} onSeek={seek}/>
    <section className="vv-panel"><div className="vv-panel-head"><h2><Waves size={16}/> Spectrogram</h2><span>{playing ? 'LIVE' : 'READY'}</span></div><div className="mt-4"><Spectrogram analyser={analyserRef.current} active={playing} currentTime={time} duration={duration}/></div><div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[.12em] text-[var(--vv-muted)]"><span>Frequency distribution</span><span>Time synchronized</span><span>FFT 2048</span><span className="ml-auto">Gain {gain.toFixed(2)}×</span></div></section>
    <section className="vv-panel"><div className="vv-panel-head"><h2><Activity size={16}/> Pipeline state</h2><span>{run?.run_id?.slice(0, 12) || '—'}</span></div><div className="vv-data-grid mt-4"><Data label="Status" value={run?.status}/><Data label="Pipeline" value={run?.pipeline_version}/><Data label="Request" value={run?.request_id?.slice(0, 16)}/><Data label="Stages" value={stages.length ? `${completed}/${stages.length} complete` : '—'}/></div><div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="vv-status-row"><span>Active</span><span className="ml-auto text-xs">{active ? (active.name || STAGE_NAMES[active.id] || active.id) : '—'}</span></div><div className="vv-status-row"><span>Failed</span><span className="ml-auto text-xs">{failed}</span></div><div className="vv-status-row"><span>Last outcome</span><span className="ml-auto text-xs">{stages.at(-1)?.outcome || '—'}</span></div></div><PipelineOverview stages={stages} active={active}/><div className="mt-5"><div className="vv-eyebrow mb-2">Stage details</div><StageList run={run}/></div></section>
    <section className="vv-panel"><div className="vv-panel-head"><h2><Clock3 size={16}/> Source record</h2><span>provenance</span></div><div className="vv-data-grid mt-4">{sourceMeta.map(([label, value]) => <Data key={label} label={label} value={value}/>)}</div></section>
  </div>
}
function Data({ label, value }) { return <div><div className="vv-eyebrow">{label}</div><div className="mt-1 text-xs break-all">{value || '—'}</div></div> }

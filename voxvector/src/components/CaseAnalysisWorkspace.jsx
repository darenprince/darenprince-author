import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, CheckCircle2, Circle, Clock3, FileAudio, Pause, Play, RefreshCw, SkipBack, Volume2 } from 'lucide-react'
import Button from './ui/Button'

const unwrap = result => result?.payload?.case || result?.payload?.data || result?.payload || {}
const latestRun = data => data?.runs?.find(run => run.run_id === data.current_run_id) || data?.runs?.at(-1) || null
const fmt = value => { const s = Math.max(0, Number(value) || 0); return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` }

function Waveform({ url, file, duration, currentTime, onSeek }) {
  const canvasRef = useRef(null)
  const [peaks, setPeaks] = useState(null)
  const [state, setState] = useState('idle')

  useEffect(() => {
    let disposed = false
    const load = async () => {
      try {
        setState('loading')
        const buffer = file ? await file.arrayBuffer() : url ? await (await fetch(url)).arrayBuffer() : null
        if (!buffer) { setState('empty'); return }
        const AC = window.AudioContext || window.webkitAudioContext
        if (!AC) { setState('unsupported'); return }
        const context = new AC()
        const audio = await context.decodeAudioData(buffer.slice(0))
        const channel = audio.getChannelData(0)
        const count = 720
        const block = Math.max(1, Math.floor(channel.length / count))
        const next = new Float32Array(count)
        for (let i = 0; i < count; i += 1) {
          const start = i * block
          const end = Math.min(channel.length, start + block)
          let peak = 0
          for (let j = start; j < end; j += 1) peak = Math.max(peak, Math.abs(channel[j]))
          next[i] = peak
        }
        await context.close().catch(() => {})
        if (!disposed) { setPeaks(next); setState('ready') }
      } catch { if (!disposed) setState('unavailable') }
    }
    load()
    return () => { disposed = true }
  }, [url, file])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.strokeStyle = 'rgba(255,255,255,.08)'
      ctx.beginPath(); ctx.moveTo(0, rect.height / 2); ctx.lineTo(rect.width, rect.height / 2); ctx.stroke()
      if (!peaks?.length) return
      const step = rect.width / peaks.length
      const active = duration ? Math.min(1, currentTime / duration) : 0
      for (let i = 0; i < peaks.length; i += 1) {
        const x = i * step
        const h = Math.max(2, peaks[i] * rect.height * .86)
        ctx.fillStyle = i / peaks.length <= active ? 'rgba(201,154,102,.95)' : 'rgba(250,248,244,.28)'
        ctx.fillRect(x, rect.height / 2 - h / 2, Math.max(1, step * .62), h)
      }
    }
    draw(); window.addEventListener('resize', draw); return () => window.removeEventListener('resize', draw)
  }, [peaks, currentTime, duration])

  const seek = event => { if (!duration) return; const r = event.currentTarget.getBoundingClientRect(); onSeek(Math.max(0, Math.min(1, (event.clientX - r.left) / r.width)) * duration) }
  return <div><button type="button" onClick={seek} className="vv-waveform-hit w-full" aria-label="Seek through case audio"><canvas ref={canvasRef} className="h-36 w-full sm:h-48"/></button><div className="flex justify-between px-1 pt-2 text-[10px] font-mono text-[var(--vv-muted)]"><span>00:00</span><span>{fmt(duration / 2)}</span><span>{fmt(duration)}</span></div><p className="mt-2 text-[11px] text-[var(--vv-muted)]">{state === 'loading' ? 'Generating waveform from source audio…' : state === 'ready' ? 'Waveform generated from decoded source audio.' : state === 'empty' ? 'Attach a source to generate the waveform.' : 'Waveform source is unavailable.'}</p></div>
}

function StageList({ run }) {
  const stages = run?.stages || run?.stage_states || []
  if (!stages.length) return <p className="vv-copy">No persisted stage records are attached to this run yet.</p>
  return <div className="space-y-1">{stages.map((stage, index) => { const done = stage.status === 'completed'; return <div className="vv-status-row" key={stage.stage_id || stage.id || index}><span>{done ? <CheckCircle2 size={14}/> : <Circle size={14}/>}</span><span>{stage.stage_id || stage.id || `Stage ${index + 1}`}</span><span className="ml-auto text-xs">{stage.status || 'pending'}</span></div> })}</div>
}

export default function CaseAnalysisWorkspace({ caseResult, playbackUrl, file, onRefresh }) {
  const data = unwrap(caseResult)
  const run = latestRun(data)
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(Number(data?.sources?.[0]?.duration_seconds) || 0)
  const source = data?.sources?.find(item => item.source_id === run?.source_id) || data?.sources?.[0]
  const sourceMeta = useMemo(() => source ? [['Source', source.source_id?.slice(0, 16)], ['SHA-256', source.sha256?.slice(0, 20)], ['Sample rate', source.sample_rate ? `${source.sample_rate} Hz` : '—'], ['Duration', source.duration_seconds ? `${Number(source.duration_seconds).toFixed(2)} s` : '—']] : [], [source])

  useEffect(() => { const audio = audioRef.current; if (!audio) return undefined; const onTime = () => setTime(audio.currentTime); const onMeta = () => setDuration(audio.duration || duration); const onEnd = () => setPlaying(false); audio.addEventListener('timeupdate', onTime); audio.addEventListener('loadedmetadata', onMeta); audio.addEventListener('ended', onEnd); return () => { audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('loadedmetadata', onMeta); audio.removeEventListener('ended', onEnd) } }, [playbackUrl])
  const seek = next => { if (!audioRef.current) return; audioRef.current.currentTime = next; setTime(next) }
  const toggle = async () => { if (!audioRef.current) return; if (audioRef.current.paused) { await audioRef.current.play(); setPlaying(true) } else { audioRef.current.pause(); setPlaying(false) } }
  const reset = () => { if (!audioRef.current) return; audioRef.current.currentTime = 0; setTime(0); setPlaying(false); audioRef.current.pause() }

  return <div className="space-y-4"><div className="flex flex-wrap items-end justify-between gap-3"><div><div className="vv-eyebrow">ANALYSIS WORKSPACE</div><h1 className="mt-1 text-2xl font-semibold tracking-tight">{data?.title || 'Case analysis'}</h1><p className="vv-copy mt-1">Persistent case view · {data?.case_id || '—'}</p></div><Button variant="secondary" onClick={onRefresh}><RefreshCw size={14}/> Refresh case</Button></div>
    <section className="vv-panel"><div className="vv-panel-head"><h2><FileAudio size={16}/> Source timeline</h2><span>{run?.status || 'not started'}</span></div>{playbackUrl ? <audio ref={audioRef} src={playbackUrl} preload="metadata" className="sr-only"/> : null}<div className="mt-4">{(playbackUrl || file) ? <Waveform url={playbackUrl} file={file} duration={duration} currentTime={time} onSeek={seek}/> : <p className="vv-copy">Open or upload a source in the Case Workbench to populate the timeline.</p>}</div><div className="mt-4 flex flex-wrap items-center gap-2"><Button variant="accent" onClick={toggle} disabled={!playbackUrl}><span>{playing ? <Pause size={15}/> : <Play size={15}/>}</span>{playing ? 'Pause' : 'Play'}</Button><Button variant="secondary" onClick={reset} disabled={!playbackUrl}><SkipBack size={14}/> Reset</Button><span className="ml-auto font-mono text-xs text-[var(--vv-muted)]">{fmt(time)} / {fmt(duration)}</span></div>{playbackUrl && <div className="mt-3 flex items-center gap-2 text-xs text-[var(--vv-muted)]"><Volume2 size={14}/> Secure persisted source playback</div>}</section>
    <section className="vv-panel"><div className="vv-panel-head"><h2><Activity size={16}/> Pipeline state</h2><span>{run?.run_id?.slice(0, 12) || '—'}</span></div><div className="vv-data-grid mt-4"><div><div className="vv-eyebrow">Status</div><div className="mt-1 text-sm">{run?.status || '—'}</div></div><div><div className="vv-eyebrow">Pipeline</div><div className="mt-1 text-sm">{run?.pipeline_version || '—'}</div></div><div><div className="vv-eyebrow">Request</div><div className="mt-1 text-sm break-all">{run?.request_id?.slice(0, 16) || '—'}</div></div><div><div className="vv-eyebrow">Stages</div><div className="mt-1 text-sm">{run?.stages?.length || run?.stage_states?.length || '—'}</div></div></div><div className="mt-5"><StageList run={run}/></div></section>
    <section className="vv-panel"><div className="vv-panel-head"><h2><Clock3 size={16}/> Source record</h2><span>provenance</span></div><div className="vv-data-grid mt-4">{sourceMeta.map(([label,value])=><div key={label}><div className="vv-eyebrow">{label}</div><div className="mt-1 text-xs break-all">{value || '—'}</div></div>)}</div></section>
  </div>
}

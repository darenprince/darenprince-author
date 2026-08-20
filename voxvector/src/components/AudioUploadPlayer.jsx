import { useEffect, useRef, useState } from 'react'
import { Activity, AlertTriangle, Check, CircleStop, Pause, Play, Square, UploadCloud, Volume2 } from 'lucide-react'
import SignalVisualizer from './SignalVisualizer'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const total = Math.max(0, Math.floor(seconds))
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '—'
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB', 'TB']
  let value = bytes / 1024
  let unit = units[0]
  for (let i = 0; i < units.length - 1 && value >= 1024; i += 1) { value /= 1024; unit = units[i + 1] }
  return `${value.toFixed(value >= 10 ? 1 : 2)} ${unit}`
}

function readAscii(view, offset, length) { return Array.from({ length }, (_, i) => String.fromCharCode(view.getUint8(offset + i))).join('') }
function cleanText(bytes) { return new TextDecoder('utf-8', { fatal: false }).decode(bytes).replace(/\0/g, '').trim() }

function parseWavMetadata(file, buffer) {
  const view = new DataView(buffer)
  const metadata = { container: 'WAV', codec: 'Unknown', audioFormat: null, channels: null, sampleRate: null, byteRate: null, blockAlign: null, bitsPerSample: null, dataBytes: null, duration: null, info: {} }
  if (view.byteLength < 12 || readAscii(view, 0, 4) !== 'RIFF' || readAscii(view, 8, 4) !== 'WAVE') return metadata
  let offset = 12
  while (offset + 8 <= view.byteLength) {
    const id = readAscii(view, offset, 4)
    const size = view.getUint32(offset + 4, true)
    const start = offset + 8
    const end = Math.min(view.byteLength, start + size)
    if (id === 'fmt ' && end - start >= 16) {
      metadata.audioFormat = view.getUint16(start, true)
      metadata.channels = view.getUint16(start + 2, true)
      metadata.sampleRate = view.getUint32(start + 4, true)
      metadata.byteRate = view.getUint32(start + 8, true)
      metadata.blockAlign = view.getUint16(start + 12, true)
      metadata.bitsPerSample = view.getUint16(start + 14, true)
      metadata.codec = metadata.audioFormat === 1 ? 'PCM' : `WAV format ${metadata.audioFormat}`
    } else if (id === 'data') {
      metadata.dataBytes = size
    } else if (id === 'LIST' && end - start >= 4 && readAscii(view, start, 4) === 'INFO') {
      let infoOffset = start + 4
      while (infoOffset + 8 <= end) {
        const key = readAscii(view, infoOffset, 4)
        const valueSize = view.getUint32(infoOffset + 4, true)
        const valueStart = infoOffset + 8
        const valueEnd = Math.min(end, valueStart + valueSize)
        if (valueEnd > valueStart) {
          const value = cleanText(new Uint8Array(buffer, valueStart, valueEnd - valueStart))
          if (value) metadata.info[key] = value
        }
        infoOffset = valueStart + valueSize + (valueSize % 2)
      }
    } else if (id === 'bext' && end > start) {
      const description = cleanText(new Uint8Array(buffer, start, Math.min(256, end - start)))
      if (description) metadata.info.BEXT = description
    }
    offset = start + size + (size % 2)
  }
  if (metadata.byteRate) metadata.duration = metadata.dataBytes ? metadata.dataBytes / metadata.byteRate : null
  metadata.fileName = file.name
  metadata.fileSize = file.size
  metadata.mime = file.type || 'audio/wav'
  metadata.lastModified = file.lastModified ? new Date(file.lastModified).toLocaleString() : '—'
  metadata.bitrate = metadata.byteRate ? metadata.byteRate * 8 : null
  return metadata
}

function drawWaveform(canvas, data, progress = 0) {
  if (!canvas || !data?.length) return
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = Math.max(1, Math.round(rect.width * dpr))
  canvas.height = Math.max(1, Math.round(rect.height * dpr))
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, rect.width, rect.height)
  const bars = Math.min(180, data.length)
  const step = data.length / bars
  const gap = 2
  const barWidth = Math.max(1, (rect.width - (bars - 1) * gap) / bars)
  const mid = rect.height / 2
  for (let i = 0; i < bars; i += 1) {
    const start = Math.floor(i * step)
    const end = Math.max(start + 1, Math.floor((i + 1) * step))
    let peak = 0
    for (let j = start; j < end; j += 1) peak = Math.max(peak, data[j])
    const h = Math.max(3, peak * rect.height * 0.88)
    const x = i * (barWidth + gap)
    const active = i / bars <= progress
    ctx.fillStyle = active ? '#c99a66' : 'rgba(250,248,244,.25)'
    ctx.beginPath()
    ctx.roundRect(x, mid - h / 2, barWidth, h, Math.min(2, barWidth / 2))
    ctx.fill()
  }
}

export default function AudioUploadPlayer({ file, uploadProgress, uploading, processing, uploadComplete, onStop }) {
  const audioRef = useRef(null)
  const canvasRef = useRef(null)
  const objectUrlRef = useRef(null)
  const audioContextRef = useRef(null)
  const sourceRef = useRef(null)
  const analyserRef = useRef(null)
  const meterFrameRef = useRef(null)
  const [waveform, setWaveform] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [metadata, setMetadata] = useState(null)
  const [level, setLevel] = useState(0)
  const [dbfs, setDbfs] = useState(-60)
  const [clipping, setClipping] = useState(false)
  const [decodeState, setDecodeState] = useState('idle')
  const [visualAnalyser, setVisualAnalyser] = useState(null)

  function stopMeter() {
    cancelAnimationFrame(meterFrameRef.current)
    meterFrameRef.current = null
    setLevel(0)
    setDbfs(-60)
    setClipping(false)
  }

  useEffect(() => {
    if (!file) return undefined
    let disposed = false
    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    const audio = new Audio(url)
    audio.preload = 'metadata'
    audioRef.current = audio

    const load = async () => {
      try {
        setDecodeState('decoding')
        const buffer = await file.arrayBuffer()
        const parsed = parseWavMetadata(file, buffer)
        if (!disposed) setMetadata(parsed)
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        if (!AudioContextClass) { setDecodeState('ready'); return }
        const context = new AudioContextClass()
        const decoded = await context.decodeAudioData(buffer.slice(0))
        if (disposed) { await context.close().catch(() => {}); return }
        const channel = decoded.getChannelData(0)
        const samples = 900
        const block = Math.max(1, Math.floor(channel.length / samples))
        const peaks = new Float32Array(samples)
        for (let i = 0; i < samples; i += 1) {
          let peak = 0
          const start = i * block
          const end = Math.min(channel.length, start + block)
          for (let j = start; j < end; j += 1) peak = Math.max(peak, Math.abs(channel[j]))
          peaks[i] = peak
        }
        setWaveform(peaks)
        setDuration(decoded.duration || parsed.duration || 0)
        setDecodeState('ready')
        await context.close().catch(() => {})
      } catch {
        if (!disposed) setDecodeState('error')
      }
    }

    const onLoaded = () => setDuration(audio.duration || 0)
    const onTime = () => setCurrentTime(audio.currentTime)
    const onEnded = () => { setPlaying(false); stopMeter() }
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    load()

    return () => {
      disposed = true
      audio.pause()
      stopMeter()
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      audioRef.current = null
      sourceRef.current = null
      analyserRef.current = null
      setVisualAnalyser(null)
      if (audioContextRef.current) audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
      URL.revokeObjectURL(url)
      objectUrlRef.current = null
    }
  }, [file])

  useEffect(() => {
    const draw = () => drawWaveform(canvasRef.current, waveform, duration ? currentTime / duration : 0)
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [waveform, currentTime, duration])

  if (!file) return null

  const ensureMeter = async () => {
    if (!audioRef.current) return
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return
      const context = new AudioContextClass()
      const source = context.createMediaElementSource(audioRef.current)
      const analyser = context.createAnalyser()
      analyser.fftSize = 1024
      analyser.smoothingTimeConstant = 0.72
      source.connect(analyser)
      analyser.connect(context.destination)
      audioContextRef.current = context
      sourceRef.current = source
      analyserRef.current = analyser
      setVisualAnalyser(analyser)
    }
    await audioContextRef.current.resume()
    const analyser = analyserRef.current
    const data = new Float32Array(analyser.fftSize)
    const tick = () => {
      if (!analyserRef.current || !audioRef.current) return
      analyser.getFloatTimeDomainData(data)
      let peak = 0
      for (let i = 0; i < data.length; i += 1) peak = Math.max(peak, Math.abs(data[i]))
      const nextDb = peak > 0 ? 20 * Math.log10(peak) : -60
      setLevel(Math.min(1, peak))
      setDbfs(Math.max(-60, nextDb))
      setClipping(peak >= 0.98)
      if (!audioRef.current.paused && !audioRef.current.ended) meterFrameRef.current = requestAnimationFrame(tick)
    }
    cancelAnimationFrame(meterFrameRef.current)
    meterFrameRef.current = requestAnimationFrame(tick)
  }

  const play = async () => {
    if (!audioRef.current) return
    await audioRef.current.play()
    setPlaying(true)
    await ensureMeter()
  }
  const pause = () => { audioRef.current?.pause(); setPlaying(false); stopMeter() }
  const stop = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    setPlaying(false)
    stopMeter()
  }
  const seek = (event) => {
    if (!audioRef.current || !duration) return
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    audioRef.current.currentTime = ratio * duration
    setCurrentTime(audioRef.current.currentTime)
  }

  const progress = Math.min(100, Number(uploadProgress) || 0)
  const bitrate = metadata?.bitrate ? `${(metadata.bitrate / 1000).toFixed(1)} kbps` : '—'
  const infoRows = [
    ['Format', metadata ? `${metadata.container} · ${metadata.codec}` : 'Decoding…'],
    ['Sample rate', metadata?.sampleRate ? `${metadata.sampleRate.toLocaleString()} Hz` : '—'],
    ['Channels', metadata?.channels ? String(metadata.channels) : '—'],
    ['Bit depth', metadata?.bitsPerSample ? `${metadata.bitsPerSample}-bit` : '—'],
    ['Bitrate', bitrate],
    ['Duration', duration ? formatTime(duration) : '—'],
    ['File size', formatBytes(file.size)],
    ['MIME type', file.type || 'audio/wav'],
    ['Modified', metadata?.lastModified || '—']
  ]

  const player = <div className="vv-audio-player vv-player-ready">
    <div className="vv-audio-head"><span className="vv-audio-file" title={file.name}>{file.name}</span><span className="vv-muted mono">{formatTime(currentTime)} / {formatTime(duration)}</span></div>
    <button type="button" className="vv-waveform-hit" onClick={seek} aria-label="Seek through uploaded audio"><canvas ref={canvasRef} /></button>
    <div className="vv-audio-controls"><button type="button" onClick={playing ? pause : play} aria-label={playing ? 'Pause audio' : 'Play audio'}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? 'Pause' : 'Play'}</button><button type="button" onClick={stop} aria-label="Stop audio"><Square size={13} />Stop</button><span className="vv-audio-hint">{decodeState === 'decoding' ? 'Decoding metadata…' : 'Click waveform to seek'}</span></div>
  </div>

  return <div className="vv-audio-upload">
    {(uploading || processing || uploadComplete) && <div className="vv-upload-state">
      <div className="vv-upload-top"><span>{processing ? <Activity size={15} className="vv-spin-soft" /> : uploadComplete ? <Check size={15} /> : <UploadCloud size={15} />}{processing ? 'Analysis in progress' : uploadComplete ? 'Upload complete' : 'Uploading audio'}</span><strong>{processing ? 'Server analysis' : `${Math.round(progress)}%`}</strong></div>
      <div className="vv-upload-track"><div className={`vv-upload-fill ${uploadComplete ? 'complete' : ''}`} style={{ width: `${progress}%` }} /></div>
      <div className="vv-upload-status-line">{processing ? 'The upload is finished. Analysis state is now driven by live server diagnostics.' : uploadComplete ? 'Upload finished. Waiting for the analysis pipeline.' : 'Transferring the selected file…'}</div>
      {(uploading || processing) && <button type="button" className="vv-stop-analysis" onClick={onStop}><CircleStop size={15} /> Stop analysis</button>}
      <div className="vv-upload-wave" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ '--h': `${22 + ((i * 17) % 58)}%`, '--d': `${i * 24}ms` }} />)}</div>
    </div>}

    {!uploading && !processing && !uploadComplete && <>
      {player}
      <div className="vv-playback-visualizer"><SignalVisualizer analyser={visualAnalyser} playing={playing} mode="radial" label="Live frequency visualization of uploaded audio playback" /><div className="vv-visualizer-caption"><strong>LIVE SIGNAL</strong> · playback frequency field</div></div>
    </>}

    {!uploading && !processing && uploadComplete && <>
      {player}
      <div className="vv-playback-visualizer"><SignalVisualizer analyser={visualAnalyser} playing={playing} mode="radial" label="Live frequency visualization of uploaded audio playback" /><div className="vv-visualizer-caption"><strong>LIVE SIGNAL</strong> · playback frequency field</div></div>
    </>}

    <div className="vv-file-info-panel"><div className="vv-file-info-head"><div><span className="vv-eyebrow">FILE INFORMATION</span><h3 title={file.name}>{file.name}</h3></div><span className="vv-file-ready">{decodeState === 'ready' ? 'DECODED' : decodeState === 'error' ? 'PARTIAL' : 'DECODING'}</span></div><div className="vv-file-info-grid">{infoRows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>{Object.keys(metadata?.info || {}).length > 0 && <div className="vv-wav-tags"><span className="vv-eyebrow">EMBEDDED WAV METADATA</span>{Object.entries(metadata.info).map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}</div>}</div>

    <div className="vv-clipping-meter"><div className="vv-meter-head"><span><Volume2 size={15} /> Live playback level</span><strong className={clipping ? 'clip' : ''}>{clipping ? 'CLIP' : `${dbfs.toFixed(1)} dBFS`}</strong></div><div className="vv-meter-track"><div className="vv-meter-fill" style={{ width: `${level * 100}%` }} /></div><div className="vv-meter-scale"><span>−60</span><span>−18</span><span>−6</span><span>0 dBFS</span></div>{clipping && <div className="vv-clip-warning"><AlertTriangle size={13} /> Digital clipping detected during playback</div>}</div>
  </div>
}

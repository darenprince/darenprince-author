import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Square, UploadCloud } from 'lucide-react'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const total = Math.max(0, Math.floor(seconds))
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
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

export default function AudioUploadPlayer({ file, uploadProgress, uploading, processing, onSeek }) {
  const audioRef = useRef(null)
  const canvasRef = useRef(null)
  const objectUrlRef = useRef(null)
  const [waveform, setWaveform] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!file) return undefined
    const url = URL.createObjectURL(file)
    objectUrlRef.current = url
    const audio = new Audio(url)
    audio.preload = 'metadata'
    audioRef.current = audio

    const onLoaded = () => {
      setDuration(audio.duration || 0)
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return
      const context = new AudioContextClass()
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const decoded = await context.decodeAudioData(reader.result.slice(0))
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
        } catch {
          setWaveform(null)
        } finally {
          await context.close().catch(() => {})
        }
      }
      reader.readAsArrayBuffer(file)
    }
    const onTime = () => setCurrentTime(audio.currentTime)
    const onEnded = () => setPlaying(false)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.pause()
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      URL.revokeObjectURL(url)
      objectUrlRef.current = null
      audioRef.current = null
    }
  }, [file])

  useEffect(() => {
    const draw = () => drawWaveform(canvasRef.current, waveform, duration ? currentTime / duration : 0)
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [waveform, currentTime, duration])

  if (!file) return null

  const play = async () => {
    if (!audioRef.current) return
    await audioRef.current.play()
    setPlaying(true)
  }
  const pause = () => { audioRef.current?.pause(); setPlaying(false) }
  const stop = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    setPlaying(false)
  }
  const seek = (event) => {
    if (!audioRef.current || !duration) return
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    audioRef.current.currentTime = ratio * duration
    setCurrentTime(audioRef.current.currentTime)
    onSeek?.(ratio)
  }

  return <div className={`vv-audio-upload ${processing ? 'processing' : ''}`}>
    {(uploading || processing) ? <div className="vv-upload-state">
      <div className="vv-upload-top"><span><UploadCloud size={15} />{processing ? 'Processing audio' : 'Uploading audio'}</span><strong>{processing ? 'Analyzing…' : `${Math.round(uploadProgress)}%`}</strong></div>
      <div className="vv-upload-track"><div className="vv-upload-fill" style={{ width: `${processing ? 100 : uploadProgress}%` }} /></div>
      <div className="vv-upload-wave" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ '--h': `${22 + ((i * 17) % 58)}%`, '--d': `${i * 24}ms` }} />)}</div>
    </div> : <div className="vv-audio-player">
      <div className="vv-audio-head"><span className="vv-audio-file">{file.name}</span><span className="vv-muted mono">{formatTime(currentTime)} / {formatTime(duration)}</span></div>
      <button type="button" className="vv-waveform-hit" onClick={seek} aria-label="Seek through uploaded audio"><canvas ref={canvasRef} /></button>
      <div className="vv-audio-controls"><button type="button" onClick={playing ? pause : play} aria-label={playing ? 'Pause audio' : 'Play audio'}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? 'Pause' : 'Play'}</button><button type="button" onClick={stop} aria-label="Stop audio"><Square size={13} />Stop</button><span className="vv-audio-hint">Click waveform to seek</span></div>
    </div>}
  </div>
}

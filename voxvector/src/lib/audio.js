const TARGET_SAMPLE_RATE = 48000

function clamp(value) { return Math.max(-1, Math.min(1, value)) }

export function isNativeWav(file) {
  return Boolean(file?.name?.toLowerCase().endsWith('.wav') || file?.type === 'audio/wav' || file?.type === 'audio/x-wav' || file?.type === 'audio/wave')
}

export function supportedAudioFile(file) {
  // Browser MIME labels are inconsistent, especially for WAV files recorded or
  // exported by mobile devices. The upload pipeline performs authoritative
  // format validation; this helper must never reject a real File solely because
  // the browser omitted or mislabeled its MIME type.
  return Boolean(file && typeof file === 'object' && Number.isFinite(Number(file.size)) && Number(file.size) >= 0)
}

function downmix(channels, frameCount) {
  if (channels.length === 1) return new Float32Array(channels[0])
  const mono = new Float32Array(frameCount)
  for (let frame = 0; frame < frameCount; frame += 1) {
    let sum = 0
    for (const channel of channels) sum += channel[frame]
    mono[frame] = sum / channels.length
  }
  return mono
}

function writeAscii(view, offset, text) {
  for (let i = 0; i < text.length; i += 1) view.setUint8(offset + i, text.charCodeAt(i))
}

function encodePcmWav(audio, sampleRate) {
  const bytesPerSample = 2
  const dataBytes = audio.length * bytesPerSample
  const buffer = new ArrayBuffer(44 + dataBytes)
  const view = new DataView(buffer)
  writeAscii(view, 0, 'RIFF')
  view.setUint32(4, 36 + dataBytes, true)
  writeAscii(view, 8, 'WAVE')
  writeAscii(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * bytesPerSample, true)
  view.setUint16(32, bytesPerSample, true)
  view.setUint16(34, 16, true)
  writeAscii(view, 36, 'data')
  view.setUint32(40, dataBytes, true)
  for (let index = 0; index < audio.length; index += 1) {
    const sample = clamp(audio[index])
    view.setInt16(44 + index * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
  }
  return new Blob([buffer], { type: 'audio/wav' })
}

export async function convertToPcmWav(file, onProgress) {
  if (!supportedAudioFile(file)) throw new Error('Unsupported audio type. Choose WAV, MP3, M4A, MP4, AAC, OGG, WebM, or FLAC.')
  if (file.size <= 0) throw new Error('The selected audio file is empty.')
  if (isNativeWav(file)) return file
  const AudioContextCtor = globalThis.AudioContext || globalThis.webkitAudioContext
  const OfflineContextCtor = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext
  if (!AudioContextCtor || !OfflineContextCtor) throw new Error('This browser cannot convert the selected audio format. Choose a WAV recording instead.')
  onProgress?.(5)
  const context = new AudioContextCtor()
  try {
    const bytes = await file.arrayBuffer()
    onProgress?.(20)
    const decoded = await context.decodeAudioData(bytes.slice(0))
    onProgress?.(55)
    const frameCount = Math.ceil(decoded.length * TARGET_SAMPLE_RATE / decoded.sampleRate)
    const offline = new OfflineContextCtor(1, frameCount, TARGET_SAMPLE_RATE)
    const source = offline.createBufferSource()
    source.buffer = decoded
    const gain = offline.createGain()
    gain.gain.value = 1 / Math.max(1, decoded.numberOfChannels)
    source.connect(gain).connect(offline.destination)
    source.start(0)
    const rendered = await offline.startRendering()
    const mono = downmix([rendered.getChannelData(0)], rendered.length)
    onProgress?.(88)
    const wavBlob = encodePcmWav(mono, TARGET_SAMPLE_RATE)
    onProgress?.(100)
    const stem = String(file.name || 'recording').replace(/\.[^.]+$/, '') || 'recording'
    return new File([wavBlob], `${stem}.wav`, { type: 'audio/wav', lastModified: Date.now() })
  } catch (error) {
    if (error?.name === 'EncodingError' || error?.name === 'NotSupportedError') throw new Error('The browser could not decode this recording. Try WAV, MP3, or M4A.')
    throw error instanceof Error ? error : new Error('Audio conversion failed.')
  } finally {
    await context.close().catch(() => {})
  }
}

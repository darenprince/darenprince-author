export const API_BASE = (import.meta.env.VITE_VOXVECTOR_API_URL || 'https://voxvector.crownlabs.tech').replace(/\/$/, '')

export async function apiRequest(path, options = {}) {
  const started = performance.now()
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { Accept: 'application/json', ...(options.headers || {}) }
  })
  const requestId = response.headers.get('X-Request-ID')
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()
  const result = { response, payload, requestId, durationMs: Math.round(performance.now() - started) }
  if (!response.ok) {
    const detail = typeof payload === 'object' ? payload?.detail : payload
    const error = new Error(detail || `HTTP ${response.status}`)
    Object.assign(error, result)
    throw error
  }
  return result
}

export async function getHealth() {
  return apiRequest('/health')
}

export async function analyzeWav(file) {
  const body = new FormData()
  body.append('file', file)
  return apiRequest('/v1/analyze', { method: 'POST', body, headers: {} })
}

export function analyzeWavWithProgress(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const started = performance.now()
    const body = new FormData()
    body.append('file', file)

    xhr.open('POST', `${API_BASE}/v1/analyze`)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) onProgress?.(Math.min(100, (event.loaded / event.total) * 100))
    })
    xhr.addEventListener('error', () => reject(new Error('Network error while uploading audio.')))
    xhr.addEventListener('abort', () => reject(new Error('Audio upload was cancelled.')))
    xhr.addEventListener('load', () => {
      const requestId = xhr.getResponseHeader('X-Request-ID')
      const contentType = xhr.getResponseHeader('content-type') || ''
      let payload = xhr.responseText
      if (contentType.includes('application/json')) {
        try { payload = JSON.parse(xhr.responseText) } catch { /* preserve raw response */ }
      }
      const response = { status: xhr.status, ok: xhr.status >= 200 && xhr.status < 300 }
      const result = { response, payload, requestId, durationMs: Math.round(performance.now() - started) }
      if (!response.ok) {
        const detail = typeof payload === 'object' ? payload?.detail : payload
        const error = new Error(detail || `HTTP ${xhr.status}`)
        Object.assign(error, result)
        reject(error)
        return
      }
      onProgress?.(100)
      resolve(result)
    })
    xhr.send(body)
  })
}

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

export async function getDiagnosticErrors(accessToken, { days = 14, limit = 100 } = {}) {
  if (!accessToken) throw new Error('Developer session token unavailable.')
  return apiRequest(`/v1/diagnostics/errors?days=${encodeURIComponent(days)}&limit=${encodeURIComponent(limit)}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
}

export async function getDiagnosticEvents(accessToken, { requestId = '', days = 2, limit = 100 } = {}) {
  if (!accessToken) throw new Error('Developer session token unavailable.')
  const query = new URLSearchParams({ days: String(days), limit: String(limit) })
  if (requestId) query.set('request_id', requestId)
  return apiRequest(`/v1/diagnostics/events?${query.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
}

export async function analyzeWav(file) {
  const body = new FormData()
  body.append('file', file)
  return apiRequest('/v1/analyze', { method: 'POST', body, headers: {} })
}

export function analyzeWavWithProgress(file, onProgress, { onRequestCreated, onState } = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const started = performance.now()
    const body = new FormData()
    const requestId = globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
    body.append('file', file)

    xhr.open('POST', `${API_BASE}/v1/analyze`)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('X-Request-ID', requestId)
    onRequestCreated?.({ requestId, abort: () => xhr.abort() })
    onState?.('uploading')

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.min(100, (event.loaded / event.total) * 100)
        onProgress?.(progress)
      }
    })
    xhr.upload.addEventListener('load', () => {
      onProgress?.(100)
      onState?.('uploaded')
    })
    xhr.addEventListener('error', () => {
      const error = new Error('Network error while uploading audio.')
      error.requestId = requestId
      reject(error)
    })
    xhr.addEventListener('abort', () => {
      const error = new Error('Audio analysis was stopped.')
      error.name = 'AbortError'
      error.requestId = requestId
      reject(error)
    })
    xhr.addEventListener('load', () => {
      const responseRequestId = xhr.getResponseHeader('X-Request-ID') || requestId
      const contentType = xhr.getResponseHeader('content-type') || ''
      let payload = xhr.responseText
      if (contentType.includes('application/json')) {
        try { payload = JSON.parse(xhr.responseText) } catch { /* preserve raw response */ }
      }
      const response = { status: xhr.status, ok: xhr.status >= 200 && xhr.status < 300 }
      const result = { response, payload, requestId: responseRequestId, durationMs: Math.round(performance.now() - started) }
      if (!response.ok) {
        const detail = typeof payload === 'object' ? payload?.detail : payload
        const error = new Error(detail || `HTTP ${xhr.status}`)
        Object.assign(error, result)
        reject(error)
        return
      }
      onProgress?.(100)
      onState?.('completed')
      resolve(result)
    })
    xhr.send(body)
  })
}

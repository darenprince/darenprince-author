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

function authHeaders(accessToken) {
  if (!accessToken) throw new Error('Developer session token unavailable.')
  return { Authorization: `Bearer ${accessToken}` }
}

export async function getHealth() {
  return apiRequest('/health')
}

export async function getDiagnosticErrors(accessToken, { days = 14, limit = 100 } = {}) {
  return apiRequest(`/v1/diagnostics/errors?days=${encodeURIComponent(days)}&limit=${encodeURIComponent(limit)}`, { headers: authHeaders(accessToken) })
}

export async function getDiagnosticEvents(accessToken, { requestId = '', days = 2, limit = 100 } = {}) {
  const query = new URLSearchParams({ days: String(days), limit: String(limit) })
  if (requestId) query.set('request_id', requestId)
  return apiRequest(`/v1/diagnostics/events?${query.toString()}`, { headers: authHeaders(accessToken) })
}

export async function createAnalysisCase(accessToken, title = '') {
  return apiRequest('/v1/cases', {
    method: 'POST',
    headers: { ...authHeaders(accessToken), 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
}

export async function listAnalysisCases(accessToken, limit = 50) {
  return apiRequest(`/v1/cases?limit=${encodeURIComponent(limit)}`, { headers: authHeaders(accessToken) })
}

export async function getAnalysisCase(accessToken, caseId) {
  return apiRequest(`/v1/cases/${encodeURIComponent(caseId)}`, { headers: authHeaders(accessToken) })
}

export function uploadCaseSource(accessToken, caseId, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const body = new FormData()
    body.append('file', file)
    const requestId = globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
    xhr.open('POST', `${API_BASE}/v1/cases/${encodeURIComponent(caseId)}/sources`)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
    xhr.setRequestHeader('X-Request-ID', requestId)
    xhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) onProgress?.(Math.min(100, (event.loaded / event.total) * 100))
    })
    xhr.addEventListener('error', () => reject(Object.assign(new Error('Network error while uploading case source.'), { requestId })))
    xhr.addEventListener('load', () => {
      const contentType = xhr.getResponseHeader('content-type') || ''
      let payload = xhr.responseText
      if (contentType.includes('application/json')) {
        try { payload = JSON.parse(xhr.responseText) } catch { /* preserve raw response */ }
      }
      const response = { status: xhr.status, ok: xhr.status >= 200 && xhr.status < 300 }
      const result = { response, payload, requestId: xhr.getResponseHeader('X-Request-ID') || requestId }
      if (!response.ok) {
        const detail = typeof payload === 'object' ? payload?.detail : payload
        reject(Object.assign(new Error(detail || `HTTP ${xhr.status}`), result))
        return
      }
      onProgress?.(100)
      resolve(result)
    })
    xhr.send(body)
  })
}

export async function getCasePlaybackUrl(accessToken, caseId, sourceId, expires = 900) {
  return apiRequest(`/v1/cases/${encodeURIComponent(caseId)}/sources/${encodeURIComponent(sourceId)}/playback?expires=${encodeURIComponent(expires)}`, { headers: authHeaders(accessToken) })
}

export async function analyzeCaseSource(accessToken, caseId, sourceId) {
  return apiRequest(`/v1/cases/${encodeURIComponent(caseId)}/sources/${encodeURIComponent(sourceId)}/analyze`, {
    method: 'POST',
    headers: authHeaders(accessToken)
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
    xhr.upload.addEventListener('progress', event => { if (event.lengthComputable) onProgress?.(Math.min(100, (event.loaded / event.total) * 100)) })
    xhr.upload.addEventListener('load', () => { onProgress?.(100); onState?.('uploaded') })
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

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

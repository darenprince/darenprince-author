import { convertToPcmWav, isNativeWav, supportedAudioFile } from './audio'

export const API_BASE = (import.meta.env.VITE_VOXVECTOR_API_URL || 'https://voxvector.crownlabs.tech').replace(/\/$/, '')
const MAX_UPLOAD_BYTES = 250 * 1024 * 1024

function errorDetail(payload, fallback) {
  const detail = typeof payload === 'object' && payload !== null ? (payload.detail ?? payload.message ?? payload.error ?? payload) : payload
  if (typeof detail === 'string' && detail.trim()) return detail
  if (detail && typeof detail === 'object') {
    try { return JSON.stringify(detail) } catch { return fallback }
  }
  return fallback
}

export async function apiRequest(path, options = {}) {
  const started = performance.now()
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers: { Accept: 'application/json', ...(options.headers || {}) } })
  const requestId = response.headers.get('X-Request-ID')
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()
  const result = { response, payload, requestId, durationMs: Math.round(performance.now() - started) }
  if (!response.ok) {
    const detail = errorDetail(payload, `HTTP ${response.status}`)
    const suffix = requestId ? ` [request ${requestId}]` : ''
    const error = new Error(`${detail || `HTTP ${response.status}`}${suffix}`)
    Object.assign(error, result)
    throw error
  }
  return result
}

function authHeaders(accessToken) {
  if (!accessToken) throw new Error('Developer session token unavailable.')
  return { Authorization: `Bearer ${accessToken}` }
}

function selectedDomFile() {
  if (typeof document === 'undefined') return null
  return document.getElementById('audio-file')?.files?.[0] || null
}

function resolveUploadFile(file) {
  const resolved = file || selectedDomFile()
  if (!resolved) throw new Error('Choose a recording before uploading.')
  if (!Number.isFinite(resolved.size) || resolved.size <= 0) throw new Error('The selected audio file is empty.')
  if (resolved.size > MAX_UPLOAD_BYTES) throw new Error(`The selected recording exceeds the ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))} MB upload limit.`)
  if (!supportedAudioFile(resolved)) throw new Error('Unsupported audio type. Choose WAV, MP3, M4A, MP4, AAC, OGG, WebM, or FLAC.')
  return resolved
}

async function prepareUploadFile(file, onProgress, onState) {
  const resolved = resolveUploadFile(file)
  if (isNativeWav(resolved)) {
    onProgress?.(50)
    return resolved
  }
  onState?.({ state: 'converting' })
  const converted = await convertToPcmWav(resolved, percent => onProgress?.(percent * 0.5))
  if (!Number.isFinite(converted.size) || converted.size <= 0) throw new Error('Audio conversion produced an empty WAV file.')
  if (converted.size > MAX_UPLOAD_BYTES) throw new Error(`The converted WAV exceeds the ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))} MB upload limit.`)
  onProgress?.(50)
  return converted
}

async function resolveCaseSourceId(accessToken, caseId, sourceId = '') {
  if (!caseId) throw new Error('An analysis case must be selected first.')
  if (sourceId) return sourceId
  const caseResult = await getAnalysisCase(accessToken, caseId)
  const caseData = caseResult?.payload?.case || caseResult?.payload?.data || caseResult?.payload || {}
  const resolved = caseData?.sources?.find(item => item?.source_id)?.source_id || ''
  if (!resolved) throw new Error('This case has no uploaded WAV source yet.')
  return resolved
}

export async function getHealth() { return apiRequest('/health') }
export async function getDiagnosticErrors(accessToken, { days = 14, limit = 100 } = {}) { return apiRequest(`/v1/diagnostics/errors?days=${encodeURIComponent(days)}&limit=${encodeURIComponent(limit)}`, { headers: authHeaders(accessToken) }) }
export async function getDiagnosticEvents(accessToken, { requestId = '', days = 2, limit = 100 } = {}) { const query = new URLSearchParams({ days: String(days), limit: String(limit) }); if (requestId) query.set('request_id', requestId); return apiRequest(`/v1/diagnostics/events?${query.toString()}`, { headers: authHeaders(accessToken) }) }
export async function createAnalysisCase(accessToken, title = '') { const normalizedTitle = String(title || '').trim(); if (!normalizedTitle) throw new Error('Enter a case title before creating the case.'); return apiRequest('/v1/cases', { method: 'POST', headers: { ...authHeaders(accessToken), 'Content-Type': 'application/json' }, body: JSON.stringify({ title: normalizedTitle }) }) }
export async function listAnalysisCases(accessToken, limit = 50) { return apiRequest(`/v1/cases?limit=${encodeURIComponent(limit)}`, { headers: authHeaders(accessToken) }) }
export async function getAnalysisCase(accessToken, caseId) { if (!caseId) throw new Error('An analysis case must be selected first.'); return apiRequest(`/v1/cases/${encodeURIComponent(caseId)}`, { headers: authHeaders(accessToken) }) }
export async function getRenderStatus(accessToken, { serviceId = '', logMinutes = 30 } = {}) { const query = new URLSearchParams(); if (serviceId) query.set('service_id', serviceId); query.set('log_minutes', String(logMinutes)); return apiRequest(`/v1/developer/render/status?${query.toString()}`, { headers: authHeaders(accessToken) }) }
export async function getRenderLogs(accessToken, { serviceId = '', minutes = 10, limit = 200 } = {}) { const query = new URLSearchParams(); if (serviceId) query.set('service_id', serviceId); query.set('minutes', String(minutes)); query.set('limit', String(limit)); return apiRequest(`/v1/developer/render/logs?${query.toString()}`, { headers: authHeaders(accessToken) }) }
export async function triggerRenderDeploy(accessToken) { return apiRequest('/v1/developer/render/deploy', { method: 'POST', headers: authHeaders(accessToken) }) }

export function uploadCaseSource(accessToken, caseId, file, onProgress, { onState } = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!accessToken) throw new Error('Developer session token unavailable.')
      if (!caseId) throw new Error('Select or create an analysis case before uploading a recording.')
      const resolvedFile = await prepareUploadFile(file, onProgress, onState)
      const xhr = new XMLHttpRequest(); const body = new FormData(); const requestId = globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
      body.append('file', resolvedFile, resolvedFile.name || 'recording.wav')
      xhr.open('POST', `${API_BASE}/v1/cases/${encodeURIComponent(caseId)}/sources`); xhr.timeout = 10 * 60 * 1000; xhr.setRequestHeader('Accept','application/json'); xhr.setRequestHeader('Authorization',`Bearer ${accessToken}`); xhr.setRequestHeader('X-Request-ID',requestId)
      onProgress?.(50); onState?.({ state: 'uploading', requestId })
      xhr.upload.addEventListener('progress', event => { if (event.lengthComputable) onProgress?.(50 + Math.min(50, (event.loaded / event.total) * 50)) })
      xhr.upload.addEventListener('load', () => { onProgress?.(99); onState?.({ state: 'processing', requestId }) })
      xhr.addEventListener('timeout', () => reject(Object.assign(new Error(`The recording upload timed out. Check the connection and try again. [request ${requestId}]`), { requestId, code:'UPLOAD_TIMEOUT' })))
      xhr.addEventListener('error', () => reject(Object.assign(new Error(`Network error while uploading the recording. Check API connectivity and try again. [request ${requestId}]`), { requestId, code:'UPLOAD_NETWORK_ERROR' })))
      xhr.addEventListener('abort', () => reject(Object.assign(new Error(`Recording upload was cancelled. [request ${requestId}]`), { requestId, code:'UPLOAD_ABORTED' })))
      xhr.addEventListener('load', () => {
        const contentType = xhr.getResponseHeader('content-type') || ''; let payload = xhr.responseText
        if (contentType.includes('application/json')) { try { payload = JSON.parse(xhr.responseText) } catch { /* preserve raw response */ } }
        const response = { status:xhr.status, ok:xhr.status >= 200 && xhr.status < 300 }; const responseRequestId = xhr.getResponseHeader('X-Request-ID') || requestId; const result = { response, payload, requestId:responseRequestId }
        if (!response.ok) { const message = errorDetail(payload, `Upload failed (HTTP ${xhr.status}).`); const suffix = message.includes(`[request ${responseRequestId}]`) ? '' : ` [request ${responseRequestId}]`; reject(Object.assign(new Error(`${message}${suffix}`), result)); return }
        onProgress?.(100); onState?.({ state:'completed', requestId:responseRequestId }); resolve(result)
      })
      xhr.send(body)
    } catch (error) { reject(error) }
  })
}

export async function getCasePlaybackUrl(accessToken, caseId, sourceId, expires = 900) { const resolvedSourceId = await resolveCaseSourceId(accessToken, caseId, sourceId); return apiRequest(`/v1/cases/${encodeURIComponent(caseId)}/sources/${encodeURIComponent(resolvedSourceId)}/playback?expires=${encodeURIComponent(expires)}`, { headers: authHeaders(accessToken) }) }
export async function analyzeCaseSource(accessToken, caseId, sourceId) { const resolvedSourceId = await resolveCaseSourceId(accessToken, caseId, sourceId); return apiRequest(`/v1/cases/${encodeURIComponent(caseId)}/sources/${encodeURIComponent(resolvedSourceId)}/analyze`, { method:'POST', headers:authHeaders(accessToken) }) }
export async function analyzeWav(file) { const resolvedFile = await prepareUploadFile(file); const body = new FormData(); body.append('file', resolvedFile, resolvedFile.name || 'recording.wav'); return apiRequest('/v1/analyze', { method:'POST', body, headers:{} }) }
export function analyzeWavWithProgress(file, onProgress, { onRequestCreated, onState } = {}) { return new Promise(async (resolve, reject) => { let resolvedFile; try { resolvedFile = await prepareUploadFile(file, percent => onProgress?.(percent), state => onState?.(state)) } catch(error) { reject(error); return }; const xhr = new XMLHttpRequest(); const started = performance.now(); const body = new FormData(); const requestId = globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; body.append('file', resolvedFile, resolvedFile.name || 'recording.wav'); xhr.open('POST',`${API_BASE}/v1/analyze`); xhr.timeout=10*60*1000; xhr.setRequestHeader('Accept','application/json'); xhr.setRequestHeader('X-Request-ID',requestId); onRequestCreated?.({requestId,abort:()=>xhr.abort()}); onState?.('uploading'); xhr.upload.addEventListener('progress',event=>{if(event.lengthComputable) onProgress?.(50+Math.min(50,(event.loaded/event.total)*50))}); xhr.upload.addEventListener('load',()=>{onProgress?.(100);onState?.('uploaded')}); xhr.addEventListener('timeout',()=>reject(Object.assign(new Error(`The analysis upload timed out. Check the connection and try again. [request ${requestId}]`),{requestId,code:'UPLOAD_TIMEOUT'}))); xhr.addEventListener('error',()=>reject(Object.assign(new Error(`Network error while uploading audio. [request ${requestId}]`),{requestId,code:'UPLOAD_NETWORK_ERROR'}))); xhr.addEventListener('abort',()=>reject(Object.assign(new Error('Audio analysis was stopped.'),{name:'AbortError',requestId}))); xhr.addEventListener('load',()=>{const responseRequestId=xhr.getResponseHeader('X-Request-ID')||requestId;const contentType=xhr.getResponseHeader('content-type')||'';let payload=xhr.responseText;if(contentType.includes('application/json')){try{payload=JSON.parse(xhr.responseText)}catch{}}const response={status:xhr.status,ok:xhr.status>=200&&xhr.status<300};const result={response,payload,requestId:responseRequestId,durationMs:Math.round(performance.now()-started)};if(!response.ok){const detail=errorDetail(payload,`HTTP ${response.status}`);const error=new Error(`${detail} [request ${responseRequestId}]`);Object.assign(error,result);reject(error);return}onProgress?.(100);onState?.('completed');resolve(result)});xhr.send(body) }) }

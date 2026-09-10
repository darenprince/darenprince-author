const LIVE_STATES = new Set(['ACTIVE', 'LIVE'])
const TRANSITIONAL_STATES = new Set([
  'PENDING',
  'QUEUED',
  'CREATED',
  'BUILDING',
  'DEPLOYING',
  'UPDATING',
  'BUILD IN PROGRESS',
  'UPDATE IN PROGRESS',
  'PRE DEPLOY IN PROGRESS',
  'IN PROGRESS',
])

export const normalizeOperationalState = value =>
  String(value || '').trim().replaceAll('_', ' ').toUpperCase() || 'NOT REPORTED'

export function operationalStateTone(value) {
  const state = normalizeOperationalState(value)
  if (LIVE_STATES.has(state)) return 'healthy'
  if (TRANSITIONAL_STATES.has(state) || state.endsWith(' IN PROGRESS')) return 'warning'
  return 'error'
}

export function renderOperationalState({ serviceState, deployState, pending = false, error = false } = {}) {
  if (error) {
    return { serviceState: 'UNAVAILABLE', deployState: 'UNAVAILABLE', tone: 'error', live: false }
  }
  if (pending) {
    return { serviceState: 'PENDING', deployState: 'PENDING', tone: 'warning', live: false }
  }

  const service = normalizeOperationalState(serviceState)
  const deploy = normalizeOperationalState(deployState)
  const serviceLive = LIVE_STATES.has(service)
  const deployLive = LIVE_STATES.has(deploy)
  const serviceTone = operationalStateTone(service)
  const deployTone = operationalStateTone(deploy)
  const live = serviceLive && deployLive

  return {
    serviceState: service,
    deployState: deploy,
    tone: live ? 'healthy' : serviceTone === 'error' || deployTone === 'error' ? 'error' : 'warning',
    live,
  }
}

const MAX_ENTRIES = 100
const GLOBAL_KEY = '__supabaseDiagnostics__'
const EVENT_NAME = 'supabase:diagnostic'

const levelMethods = {
  info: 'info',
  warn: 'warn',
  error: 'error',
}

const sensitiveKeyPattern = /(key|secret|token)$/i

const getGlobal = () => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  return {}
}

const globalRef = getGlobal()

const ensureBuffer = () => {
  const existing = globalRef[GLOBAL_KEY]
  if (Array.isArray(existing)) {
    return existing
  }
  const buffer = []
  Object.defineProperty(globalRef, GLOBAL_KEY, {
    value: buffer,
    configurable: true,
    enumerable: false,
    writable: false,
  })
  return buffer
}

const maskSensitive = (value) => {
  if (!value || typeof value !== 'object') {
    return value
  }
  if (Array.isArray(value)) {
    return value.map(maskSensitive)
  }
  const clone = {}
  for (const [key, entry] of Object.entries(value)) {
    if (entry && typeof entry === 'object') {
      clone[key] = maskSensitive(entry)
      continue
    }
    if (typeof entry === 'string' && sensitiveKeyPattern.test(key)) {
      clone[key] = entry ? `${entry.slice(0, 4)}…${entry.slice(-4)}` : ''
    } else {
      clone[key] = entry
    }
  }
  return clone
}

const dispatchEvent = (entry) => {
  const target =
    (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && window) ||
    (typeof globalThis !== 'undefined' &&
      typeof globalThis.dispatchEvent === 'function' &&
      globalThis) ||
    null
  if (!target) return
  const EventCtor =
    (typeof CustomEvent === 'function' && CustomEvent) ||
    (typeof globalThis !== 'undefined' &&
      typeof globalThis.CustomEvent === 'function' &&
      globalThis.CustomEvent) ||
    null
  if (!EventCtor) return
  try {
    target.dispatchEvent(new EventCtor(EVENT_NAME, { detail: entry }))
  } catch (error) {
    // no-op: diagnostics should never throw
  }
}

const toConsole = (level, step, message, detail) => {
  if (typeof console === 'undefined') return
  const method = levelMethods[level] || 'info'
  const logger = console[method] || console.log
  const prefix = `[Supabase][${step}] ${message}`
  if (detail !== undefined) {
    logger.call(console, prefix, detail)
  } else {
    logger.call(console, prefix)
  }
}

const pushEntry = (level, step, message, detail) => {
  const buffer = ensureBuffer()
  const entry = {
    id:
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    level,
    step,
    message,
    detail: detail === undefined ? undefined : maskSensitive(detail),
  }
  buffer.push(entry)
  if (buffer.length > MAX_ENTRIES) {
    buffer.shift()
  }
  toConsole(level, step, message, entry.detail)
  dispatchEvent(entry)
  return entry
}

export const logSupabaseDiagnosticInfo = (step, message, detail) =>
  pushEntry('info', step, message, detail)

export const logSupabaseDiagnosticWarn = (step, message, detail) =>
  pushEntry('warn', step, message, detail)

export const logSupabaseDiagnosticError = (step, message, detail) =>
  pushEntry('error', step, message, detail)

export const getSupabaseDiagnostics = () => ensureBuffer().slice()

export const clearSupabaseDiagnostics = () => {
  const buffer = ensureBuffer()
  buffer.splice(0, buffer.length)
}

export const describeSupabaseConfig = (config) => {
  if (!config) {
    return { url: null, anonKey: false }
  }
  const detail = {}
  if (config.url) {
    try {
      const parsed = new URL(config.url)
      detail.url = parsed.origin
    } catch (error) {
      detail.url = config.url
    }
  } else {
    detail.url = null
  }
  detail.anonKey = Boolean(config.key)
  return detail
}

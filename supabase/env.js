import {
  logSupabaseDiagnosticError,
  logSupabaseDiagnosticInfo,
  logSupabaseDiagnosticWarn,
  describeSupabaseConfig,
} from './diagnostics.js'
import { SUPABASE_URL_KEYS, SUPABASE_ANON_KEYS, SUPABASE_SERVICE_ROLE_KEYS } from './config-keys.js'

const SUPABASE_KEY_PRIORITY = [...SUPABASE_SERVICE_ROLE_KEYS, ...SUPABASE_ANON_KEYS]

const hasWindow = () => typeof window !== 'undefined'
const RUNTIME_STORAGE_KEY = 'supabaseRuntimeConfig'
const NETLIFY_REMOTE_PATH = '/.netlify/functions/supabase-config'
const REMOTE_TIMEOUT_MS = 5000

/**
 * @template T
 * @param {(name: string) => T | undefined | null} reader
 * @param {string[]} keys
 * @returns {T | undefined}
 */
const readFirstDefined = (reader, keys) => {
  for (const key of keys) {
    const value = reader(key)
    if (value !== undefined && value !== null) {
      return value
    }
  }
  return undefined
}

/**
 * @param {{ [key: string]: string | undefined }} envLike
 */
const readFromEnvLike = (envLike) => readFromReader((name) => envLike?.[name])

/**
 * @param {(name: string) => string | undefined | null} reader
 */
const readFromReader = (reader) => ({
  url: readFirstDefined(reader, SUPABASE_URL_KEYS),
  key: readFirstDefined(reader, SUPABASE_KEY_PRIORITY),
})

const normalizeValue = (value) => (typeof value === 'string' ? value.trim() : undefined)

const finalizeConfig = ({ url, key }) => ({
  url: normalizeValue(url) ?? '',
  key: normalizeValue(key) ?? '',
})

const resolveFromRuntimeStorage = () => {
  if (!hasWindow()) return null
  try {
    const storage = window.localStorage
    if (!storage) return null
    const raw = storage.getItem(RUNTIME_STORAGE_KEY)
    if (!raw) return null
    const payload = JSON.parse(raw)
    if (!payload || typeof payload !== 'object') return null
    const { url, anonKey, key } = payload
    const config = finalizeConfig({
      url: url ?? payload?.supabaseUrl,
      key: anonKey ?? key ?? payload?.supabaseAnonKey,
    })
    if (config.url && config.key) {
      logSupabaseDiagnosticInfo(
        'runtime-storage',
        'Restored Supabase credentials from localStorage override',
        describeSupabaseConfig(config)
      )
      return config
    }
    logSupabaseDiagnosticWarn('runtime-storage', 'Runtime override was incomplete; ignoring', {
      urlPresent: Boolean(config.url),
      anonKeyPresent: Boolean(config.key),
    })
    return null
  } catch (error) {
    logSupabaseDiagnosticWarn('runtime-storage', 'Supabase runtime storage lookup failed', {
      message: error?.message,
    })
  }
  return null
}

const persistRuntimeConfig = (config) => {
  if (!hasWindow()) return
  try {
    const storage = window.localStorage
    if (!storage) return
    if (!config?.url || !config?.key) return
    if (storage.getItem(RUNTIME_STORAGE_KEY)) return
    const payload = {
      url: config.url,
      anonKey: config.key,
    }
    storage.setItem(RUNTIME_STORAGE_KEY, JSON.stringify(payload))
    logSupabaseDiagnosticInfo(
      'runtime-storage',
      'Persisted runtime Supabase credentials for reuse',
      describeSupabaseConfig(config)
    )
  } catch (error) {
    logSupabaseDiagnosticWarn('runtime-storage', 'Supabase runtime storage persist failed', {
      message: error?.message,
    })
  }
}

const combineConfigs = (...configs) => {
  let url
  let key
  for (const config of configs) {
    if (!config) continue

    const nextUrl = normalizeValue(config.url)
    const nextKey = normalizeValue(config.key)

    if (!url && nextUrl) {
      url = nextUrl
    }

    if (!key && nextKey) {
      key = nextKey
    }

    if (url && key) break
  }
  return finalizeConfig({ url, key })
}

const resolveFromDeno = () => {
  if (typeof Deno === 'undefined' || typeof Deno.env === 'undefined') {
    return null
  }
  const read = (name) => Deno.env.get(name) ?? undefined
  return finalizeConfig(readFromReader(read))
}

const resolveFromNode = () => {
  if (hasWindow() || typeof process === 'undefined' || typeof process.env === 'undefined') {
    return null
  }
  return finalizeConfig(readFromEnvLike(process.env))
}

const resolveFromGlobalEnv = () => {
  try {
    const globalEnv =
      (typeof globalThis !== 'undefined' &&
        (globalThis._env_ || (globalThis.window && globalThis.window._env_))) ||
      null
    if (globalEnv && typeof globalEnv === 'object') {
      const config = finalizeConfig(readFromEnvLike(globalEnv))
      if (config.url || config.key) {
        logSupabaseDiagnosticInfo(
          'global-env',
          'Loaded Supabase credentials from global runtime overrides',
          describeSupabaseConfig(config)
        )
      }
      return config
    }
  } catch (error) {
    logSupabaseDiagnosticWarn('global-env', 'Supabase global env lookup failed', {
      message: error?.message,
    })
  }
  return null
}

const resolveFromNetlifyFunction = async () => {
  if (!hasWindow()) return null

  const fetcher =
    (typeof fetch === 'function' && fetch.bind(globalThis)) ||
    (typeof window.fetch === 'function' && window.fetch.bind(window))
  if (typeof fetcher !== 'function') {
    return null
  }

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
  let timeoutId = null

  try {
    if (controller) {
      timeoutId = setTimeout(() => controller.abort(), REMOTE_TIMEOUT_MS)
    }

    logSupabaseDiagnosticInfo(
      'netlify-fallback',
      'Requesting Supabase credentials from Netlify fallback'
    )

    const response = await fetcher(NETLIFY_REMOTE_PATH, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller?.signal,
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (!response || !response.ok) {
      logSupabaseDiagnosticWarn(
        'netlify-fallback',
        'Netlify fallback responded without credentials',
        {
          status: response?.status,
        }
      )
      return null
    }

    const payload = await response.json().catch(() => null)

    if (!payload || typeof payload !== 'object') {
      logSupabaseDiagnosticWarn('netlify-fallback', 'Netlify fallback payload was invalid JSON')
      return null
    }

    const config = finalizeConfig({
      url: payload.url ?? payload.supabaseUrl ?? payload.SUPABASE_URL,
      key: payload.anonKey ?? payload.supabaseAnonKey ?? payload.key ?? payload.SUPABASE_ANON_KEY,
    })

    if (!config.url || !config.key) {
      logSupabaseDiagnosticWarn(
        'netlify-fallback',
        'Netlify fallback payload missing url or anon key',
        {
          urlPresent: Boolean(config.url),
          anonKeyPresent: Boolean(config.key),
        }
      )
      return null
    }

    persistRuntimeConfig(config)

    logSupabaseDiagnosticInfo(
      'netlify-fallback',
      'Received Supabase credentials from Netlify fallback',
      describeSupabaseConfig(config)
    )

    return config
  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    if (error && error.name === 'AbortError') {
      logSupabaseDiagnosticWarn('netlify-fallback', 'Supabase remote config lookup timed out')
    } else {
      logSupabaseDiagnosticError('netlify-fallback', 'Supabase remote config lookup failed', {
        message: error?.message,
      })
    }
  }

  return null
}

const resolveFromBrowserEnv = async () => {
  const configs = []

  try {
    const envModule = await import('../assets/js/env.js')
    const env = (envModule && envModule.default) || envModule
    if (env && typeof env === 'object') {
      const config = finalizeConfig(readFromEnvLike(env))
      if (config.url || config.key) {
        logSupabaseDiagnosticInfo(
          'browser-env',
          'Loaded Supabase credentials from assets/js/env.js',
          describeSupabaseConfig(config)
        )
      }
      configs.push(config)
    }
  } catch (error) {
    const notFound =
      error &&
      (error.code === 'ERR_MODULE_NOT_FOUND' || /Cannot find module/i.test(error.message || ''))

    if (notFound) {
      logSupabaseDiagnosticInfo(
        'browser-env',
        'Supabase env.js not found; continuing with runtime overrides'
      )
    } else {
      logSupabaseDiagnosticWarn('browser-env', 'Supabase env.js lookup failed', {
        message: error?.message,
      })
    }
  }

  const storageConfig = resolveFromRuntimeStorage()
  if (storageConfig) {
    configs.push(storageConfig)
  }

  const globalConfig = resolveFromGlobalEnv()
  if (globalConfig) {
    configs.push(globalConfig)
  }

  if (hasWindow()) {
    const combined = combineConfigs(...configs)
    if (!combined.url || !combined.key) {
      const remoteConfig = await resolveFromNetlifyFunction()
      if (remoteConfig) {
        configs.push(remoteConfig)
      }
    }
  }

  return combineConfigs(...configs)
}

export const resolveSupabaseConfigSync = () =>
  combineConfigs(resolveFromDeno(), resolveFromNode(), resolveFromGlobalEnv())

export const resolveSupabaseConfig = async () => {
  const config = combineConfigs(
    resolveFromDeno(),
    resolveFromNode(),
    await resolveFromBrowserEnv(),
    finalizeConfig({})
  )
  if (!config.url || !config.key) {
    logSupabaseDiagnosticError('resolver', 'Supabase credentials are missing after resolution')
  } else {
    logSupabaseDiagnosticInfo(
      'resolver',
      'Supabase credentials resolved successfully',
      describeSupabaseConfig(config)
    )
  }
  return config
}

export default resolveSupabaseConfig

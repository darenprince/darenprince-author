const URL_KEYS = [
  'SUPABASE_DATABASE_URL',
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_DATABASE_URL',
  'PUBLIC_SUPABASE_URL',
]

const KEY_KEYS = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY',
  'SUPABASE_PUBLIC_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'PUBLIC_SUPABASE_ANON_KEY',
]

const hasWindow = () => typeof window !== 'undefined'
const RUNTIME_STORAGE_KEY = 'supabaseRuntimeConfig'

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
  url: readFirstDefined(reader, URL_KEYS),
  key: readFirstDefined(reader, KEY_KEYS),
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
    return finalizeConfig({
      url: url ?? payload?.supabaseUrl,
      key: anonKey ?? key ?? payload?.supabaseAnonKey,
    })
  } catch (error) {
    console.warn('Supabase runtime storage lookup failed', error)
  }
  return null
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
      return finalizeConfig(readFromEnvLike(globalEnv))
    }
  } catch (error) {
    console.warn('Supabase global env lookup failed', error)
  }
  return null
}

const resolveFromBrowserEnv = async () => {
  const configs = []
  try {
    const envModule = await import('../assets/js/env.js')
    const env = (envModule && envModule.default) || envModule
    if (env && typeof env === 'object') {
      configs.push(finalizeConfig(readFromEnvLike(env)))
    }
  } catch (error) {
    const notFound =
      error &&
      (error.code === 'ERR_MODULE_NOT_FOUND' || /Cannot find module/i.test(error.message || ''))

    if (notFound) {
      console.info('Supabase env.js not found; continuing with runtime overrides')
    } else {
      console.warn('Supabase env.js lookup failed', error)
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
  return combineConfigs(...configs)
}

export const resolveSupabaseConfigSync = () =>
  combineConfigs(resolveFromDeno(), resolveFromNode(), resolveFromGlobalEnv())

export const resolveSupabaseConfig = async () => {
  return combineConfigs(
    resolveFromDeno(),
    resolveFromNode(),
    await resolveFromBrowserEnv(),
    finalizeConfig({})
  )
}

export default resolveSupabaseConfig

const URL_KEYS = [
  'SUPABASE_DATABASE_URL',
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
]

const isBrowser = typeof window !== 'undefined'

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

const finalizeConfig = ({ url, key }) => ({
  url: url ?? '',
  key: key ?? '',
})

const hasValue = (value) => typeof value === 'string' && value.trim() !== ''

const combineConfigs = (...configs) => {
  let url
  let key
  for (const config of configs) {
    if (!config) continue
    if (!url && hasValue(config.url)) {
      url = config.url.trim()
    }
    if (!key && hasValue(config.key)) {
      key = config.key.trim()
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
  if (isBrowser || typeof process === 'undefined' || typeof process.env === 'undefined') {
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
    console.warn('Supabase env.js not found; client not initialized', error)
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

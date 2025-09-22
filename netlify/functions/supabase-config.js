import {
  describeSupabaseConfig,
  logSupabaseDiagnosticInfo,
  logSupabaseDiagnosticWarn,
} from '../../supabase/diagnostics.js'
import {
  SUPABASE_URL_KEYS,
  SUPABASE_ANON_KEYS,
  SUPABASE_SERVICE_ROLE_KEYS,
  SUPABASE_JWT_KEYS,
} from '../../supabase/config-keys.js'

const coerceEnvValue = (value) => {
  if (value === undefined || value === null) {
    return undefined
  }
  const normalized = `${value}`.trim()
  return normalized === '' ? undefined : normalized
}

const createEnvReaders = (context) => {
  const readers = []

  if (context?.env && typeof context.env === 'object') {
    readers.push((key) => context.env?.[key])
  }

  if (typeof process !== 'undefined' && process.env && typeof process.env === 'object') {
    readers.push((key) => process.env?.[key])
  }

  const netlifyEnv = globalThis.Netlify?.env
  if (netlifyEnv) {
    if (typeof netlifyEnv.get === 'function') {
      readers.push((key) => netlifyEnv.get(key))
    } else if (typeof netlifyEnv === 'object') {
      readers.push((key) => netlifyEnv?.[key])
    }
  }

  if (typeof Deno !== 'undefined' && typeof Deno.env?.get === 'function') {
    readers.push((key) => Deno.env.get(key))
  }

  return readers
}

const readFirstEnv = (keys, readers) => {
  for (const key of keys) {
    for (const reader of readers) {
      const value = coerceEnvValue(reader(key))
      if (value !== undefined) {
        return value
      }
    }
  }
  return ''
}

const describeAvailableKeys = (readers) => {
  const describeKeys = (keys) =>
    keys.filter((key) => readers.some((reader) => coerceEnvValue(reader(key)) !== undefined))
  return {
    urlKeys: describeKeys(SUPABASE_URL_KEYS),
    anonKeys: describeKeys(SUPABASE_ANON_KEYS),
    serviceRoleKeys: describeKeys(SUPABASE_SERVICE_ROLE_KEYS),
    jwtKeys: describeKeys(SUPABASE_JWT_KEYS),
  }
}

const buildCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
})

const buildJsonHeaders = () => ({
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
  ...buildCorsHeaders(),
})

export const handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    logSupabaseDiagnosticInfo('netlify-function', 'Handled CORS preflight for Supabase config')
    return {
      statusCode: 204,
      headers: buildCorsHeaders(),
    }
  }

  if (event.httpMethod !== 'GET') {
    logSupabaseDiagnosticWarn('netlify-function', 'Rejected non-GET request for Supabase config', {
      method: event.httpMethod,
    })
    return {
      statusCode: 405,
      headers: buildJsonHeaders(),
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    }
  }

  const envReaders = createEnvReaders(context)
  const url = readFirstEnv(SUPABASE_URL_KEYS, envReaders)
  const anonKey = readFirstEnv(SUPABASE_ANON_KEYS, envReaders)

  const configured = Boolean(url && anonKey)
  const body = {
    configured,
    url,
    anonKey,
    key: anonKey,
    missing: {
      url: !url,
      anonKey: !anonKey,
    },
  }

  if (configured) {
    logSupabaseDiagnosticInfo(
      'netlify-function',
      'Served Supabase credentials from Netlify environment',
      {
        ...describeSupabaseConfig({ url, key: anonKey }),
      }
    )
  } else {
    logSupabaseDiagnosticWarn(
      'netlify-function',
      'Supabase credentials missing in Netlify environment',
      {
        ...body.missing,
        available: describeAvailableKeys(envReaders),
      }
    )
  }

  return {
    statusCode: 200,
    headers: buildJsonHeaders(),
    body: JSON.stringify(body),
  }
}

export default handler

import {
  describeSupabaseConfig,
  logSupabaseDiagnosticInfo,
  logSupabaseDiagnosticWarn,
} from '../../supabase/diagnostics.js'
import {
  SUPABASE_URL_KEYS,
  SUPABASE_ANON_KEYS,
  describeSupabaseKeyPresence,
} from '../../supabase/config-keys.js'

const readFirstEnv = (keys) => {
  for (const key of keys) {
    const value = process.env?.[key]
    if (value !== undefined && value !== null && `${value}`.trim() !== '') {
      return `${value}`.trim()
    }
  }
  return ''
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

export const handler = async (event) => {
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

  const url = readFirstEnv(SUPABASE_URL_KEYS)
  const anonKey = readFirstEnv(SUPABASE_ANON_KEYS)

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
        available: describeSupabaseKeyPresence(process.env),
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

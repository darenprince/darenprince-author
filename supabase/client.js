import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { resolveSupabaseConfig } from './env.js'
import { logSupabaseWarning } from '../js/supabase-logger.js'

let supabase = null
let lastSignature = ''
let missingWarningLogged = false

const buildSignature = ({ url, key }) => `${url ?? ''}::${key ?? ''}`

const configureClient = (config, { silent = false } = {}) => {
  const signature = buildSignature(config)
  if (signature === lastSignature && supabase) {
    return supabase
  }

  lastSignature = signature

  const url = config.url?.trim()
  const key = config.key?.trim()

  if (!url || !key) {
    supabase = null
    if (!silent && !missingWarningLogged) {
      logSupabaseWarning(
        'supabase.client',
        'Supabase client not configured. Check SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY.'
      )
      missingWarningLogged = true
    }
    return supabase
  }

  supabase = createClient(url, key)
  missingWarningLogged = false
  return supabase
}

export const refreshSupabaseClient = async ({ silent = false } = {}) => {
  const config = await resolveSupabaseConfig()
  return configureClient(config, { silent })
}

export const getSupabaseClient = () => supabase

await refreshSupabaseClient({ silent: true })

if (!supabase) {
  logSupabaseWarning(
    'supabase.client',
    'Supabase client not configured. Check SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY.'
  )
  missingWarningLogged = true
}

if (typeof window !== 'undefined') {
  window.addEventListener('supabase-runtime-config:update', () => {
    refreshSupabaseClient({ silent: true })
      .then((client) => {
        if (!client && !missingWarningLogged) {
          logSupabaseWarning(
            'supabase.client',
            'Supabase client not configured. Check SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY.'
          )
          missingWarningLogged = true
        }
      })
      .catch((error) => {
        logSupabaseWarning('supabase.client', 'Failed to refresh Supabase client', {
          message: error?.message ?? String(error),
        })
      })
  })
}

export { supabase }
export default supabase

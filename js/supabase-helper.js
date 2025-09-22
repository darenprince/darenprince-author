import supabaseClient, { getSupabaseClient } from '../supabase/client.js'
import { bindSupabaseClient, logSupabaseWarning } from './supabase-logger.js'

export const SUPABASE_SETUP_MESSAGE =
  'Supabase is not configured. Add your project URL and anon key to .env (or assets/js/env.js) and run "npm run build" so the client can initialize. See docs/supabase/README.md for full setup steps.'

let lastClient = supabaseClient ?? null
let boundClient = lastClient ? bindSupabaseClient(lastClient, 'supabase') : null

const resolveBoundClient = () => {
  const current = (typeof getSupabaseClient === 'function' && getSupabaseClient()) || supabaseClient
  if (current !== lastClient) {
    lastClient = current ?? null
    boundClient = lastClient ? bindSupabaseClient(lastClient, 'supabase') : null
  }
  return boundClient
}

if (typeof window !== 'undefined') {
  window.addEventListener('supabase-runtime-config:update', () => {
    resolveBoundClient()
  })
}

/**
 * Retrieves the Supabase client if it is configured.
 * Runs the optional onMissing callback to provide user feedback or
 * disable features when the client is not available.
 *
 * @param {Function} [onMissing] Callback executed when Supabase isn't configured.
 * @returns {import('@supabase/supabase-js').SupabaseClient|null}
 */
export function getSupabase(onMissing) {
  const client = resolveBoundClient()
  if (!client) {
    logSupabaseWarning('supabase.init', SUPABASE_SETUP_MESSAGE)
    if (typeof onMissing === 'function') {
      try {
        onMissing(SUPABASE_SETUP_MESSAGE)
      } catch (error) {
        logSupabaseWarning('supabase.init', 'Supabase fallback handler threw an error', {
          message: error?.message,
        })
      }
    } else {
      alert(SUPABASE_SETUP_MESSAGE)
    }
    return null
  }
  return client
}

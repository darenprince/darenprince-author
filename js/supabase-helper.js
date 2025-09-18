import supabaseClient from '../supabase/client.js';

export const SUPABASE_SETUP_MESSAGE =
  'Supabase is not configured. Add your project URL and anon key to .env (or assets/js/env.js) and run "npm run build" so the client can initialize. See docs/supabase/README.md for full setup steps.';

/**
 * Retrieves the Supabase client if it is configured.
 * Runs the optional onMissing callback to provide user feedback or
 * disable features when the client is not available.
 *
 * @param {Function} [onMissing] Callback executed when Supabase isn't configured.
 * @returns {import('@supabase/supabase-js').SupabaseClient|null}
 */
export function getSupabase(onMissing) {
  if (!supabaseClient) {
    console.warn(SUPABASE_SETUP_MESSAGE);
    if (typeof onMissing === 'function') {
      try {
        onMissing(SUPABASE_SETUP_MESSAGE);
      } catch (error) {
        console.warn('Supabase fallback handler threw an error', error);
      }
    } else {
      alert(SUPABASE_SETUP_MESSAGE);
    }
    return null;
  }
  return supabaseClient;
}

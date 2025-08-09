import supabaseClient from '../supabase/client.js';

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
    if (typeof onMissing === 'function') {
      try {
        onMissing();
      } catch (_) {
        // ignore errors from callbacks
      }
    } else {
      alert('Supabase is not configured.');
    }
    return null;
  }
  return supabaseClient;
}

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { resolveSupabaseConfig } from './env.js';
import { logSupabaseWarning } from '../js/supabase-logger.js';

const { url, key } = await resolveSupabaseConfig();

if (!url || !key) {
  logSupabaseWarning(
    'supabase.client',
    'Supabase client not configured. Check SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY.',
  );
}

const supabase = url && key ? createClient(url, key) : null;

export { supabase };
export default supabase;

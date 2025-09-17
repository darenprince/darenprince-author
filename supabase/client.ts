import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { resolveSupabaseConfig } from './env.js';

const { url, key } = await resolveSupabaseConfig();

if (!url || !key) {
  console.warn('Supabase client not configured. Check SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY.');
}

const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;

export { supabase };
export default supabase;

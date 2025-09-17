import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

let url = '';
let key = '';

const isBrowser = typeof window !== 'undefined';

if (typeof Deno !== 'undefined' && typeof Deno.env !== 'undefined') {
  const read = (name) => Deno.env.get(name) ?? '';
  url = read('SUPABASE_URL') || read('SUPABASE_DATABASE_URL');
  key =
    read('SUPABASE_SERVICE_ROLE_KEY') ||
    read('SUPABASE_ANON_KEY') ||
    read('SUPABASE_PUBLIC_ANON_KEY');
} else if (!isBrowser && typeof process !== 'undefined' && typeof process.env !== 'undefined') {
  const env = process.env;
  url = env.SUPABASE_URL ?? env.SUPABASE_DATABASE_URL ?? '';
  key =
    env.SUPABASE_SERVICE_ROLE_KEY ??
    env.SUPABASE_ANON_KEY ??
    env.SUPABASE_PUBLIC_ANON_KEY ??
    '';
} else {
  try {
    const env = await import('../assets/js/env.js');
    url = env.SUPABASE_URL ?? env.SUPABASE_DATABASE_URL ?? '';
    key = env.SUPABASE_ANON_KEY ?? '';
  } catch (e) {
    console.warn('Supabase env.js not found; client not initialized', e);
  }
}

if (!url || !key) {
  console.warn('Supabase client not configured. Check SUPABASE_URL/SUPABASE_DATABASE_URL and SUPABASE_ANON_KEY.');
}

const supabase = url && key ? createClient(url, key) : null;

export { supabase };
export default supabase;

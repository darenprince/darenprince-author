import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

let url = '';
let key = '';

if (typeof Deno !== 'undefined' && typeof Deno.env !== 'undefined') {
  url =
    Deno.env.get('SUPABASE_URL') ??
    Deno.env.get('SUPABASE_DATABASE_URL') ??
    '';
  key =
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ??
    Deno.env.get('SUPABASE_ANON_KEY') ??
    Deno.env.get('SUPABASE_KEY') ??
    '';
} else if (typeof process !== 'undefined' && typeof process.env !== 'undefined') {
  url =
    process.env.SUPABASE_URL ??
    process.env.SUPABASE_DATABASE_URL ??
    '';
  key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_KEY ??
    '';
} else {
  try {
    const env = await import('../js/env.js');
    url = env.SUPABASE_URL ?? env.SUPABASE_DATABASE_URL ?? '';
    key = env.SUPABASE_KEY ?? '';
  } catch (e) {
    console.warn('Supabase env.js not found; client not initialized', e);
  }
}
let supabase;
if (url && key) {
  supabase = createClient(url, key);
} else {
  supabase = undefined;
}

export { supabase };
export default supabase;

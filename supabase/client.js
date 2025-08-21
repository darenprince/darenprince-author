import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import '../js/env.js';

let url = '';
let key = '';

if (typeof Deno !== 'undefined' && typeof Deno.env !== 'undefined') {
  url = Deno.env.get('SUPABASE_URL') ?? '';
  key =
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ??
    Deno.env.get('SUPABASE_ANON_KEY') ??
    '';
} else if (typeof process !== 'undefined' && typeof process.env !== 'undefined') {
  url = process.env.SUPABASE_URL ?? '';
  key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    '';
} else {
  try {
    url = window._env_?.SUPABASE_URL ?? '';
    key =
      window._env_?.SUPABASE_SERVICE_ROLE_KEY ??
      window._env_?.SUPABASE_ANON_KEY ??
      '';
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

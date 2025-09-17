import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const env = window._env_ || {};
const supabaseUrl = env.SUPABASE_URL || env.SUPABASE_DATABASE_URL || '';
const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.SUPABASE_PUBLIC_ANON_KEY || '';

let supabase = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Frontend Supabase helpers are disabled.');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Example: log current session
  supabase.auth.getSession().then(({ data }) => {
    console.log('Supabase session', data.session);
  });
}

export { supabase };
export default supabase;

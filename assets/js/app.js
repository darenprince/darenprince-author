import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const {
  SUPABASE_DATABASE_URL = '',
  SUPABASE_ANON_KEY = ''
} = window._env_ || {};

const supabase = createClient(SUPABASE_DATABASE_URL, SUPABASE_ANON_KEY);

// Example: log current session
supabase.auth.getSession().then(({ data }) => {
  console.log('Supabase session', data.session);
});

export { supabase };

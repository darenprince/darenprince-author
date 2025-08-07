import { SUPABASE_URL, SUPABASE_KEY } from './env.js';

export const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabaseClient = supabaseClient;

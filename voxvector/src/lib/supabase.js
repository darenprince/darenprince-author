import { createClient } from '@supabase/supabase-js'
import { getVoxVectorRole, isAdmin, isApprovedUser, isDeveloper, roleAllowed, routeForVoxVectorRole } from './access'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && anonKey)
export const supabase = supabaseConfigured ? createClient(url, anonKey) : null

export { getVoxVectorRole, isAdmin, isApprovedUser, isDeveloper, roleAllowed, routeForVoxVectorRole }

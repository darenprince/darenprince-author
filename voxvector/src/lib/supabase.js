import { createClient } from '@supabase/supabase-js'
import {
  getVoxVectorPermissions,
  getVoxVectorRole,
  hasVoxVectorPermission,
  isAdmin,
  isApprovedUser,
  isDeveloper,
  permissionsForRole,
  roleAllowed,
  routeForVoxVectorRole,
  VOXVECTOR_PERMISSION_CATALOG,
  VOXVECTOR_PERMISSION_DEFAULTS,
} from './access'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && anonKey)
export const supabase = supabaseConfigured ? createClient(url, anonKey) : null

export {
  getVoxVectorPermissions,
  getVoxVectorRole,
  hasVoxVectorPermission,
  isAdmin,
  isApprovedUser,
  isDeveloper,
  permissionsForRole,
  roleAllowed,
  routeForVoxVectorRole,
  VOXVECTOR_PERMISSION_CATALOG,
  VOXVECTOR_PERMISSION_DEFAULTS,
}

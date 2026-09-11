export const VOXVECTOR_ROLES = Object.freeze(['admin', 'developer', 'user'])
export const VOXVECTOR_ROLE_SET = new Set(VOXVECTOR_ROLES)

export const VOXVECTOR_PERMISSION_DEFAULTS = Object.freeze({
  admin: Object.freeze(['developer.console', 'users.manage', 'cases.manage', 'deploy.manage', 'diagnostics.read']),
  developer: Object.freeze(['developer.console', 'cases.manage', 'deploy.manage', 'diagnostics.read']),
  user: Object.freeze(['user.workspace']),
})

export const VOXVECTOR_PERMISSION_CATALOG = Object.freeze([
  Object.freeze({ id: 'developer.console', label: 'Developer Console', detail: 'Open the protected engineering and analysis console.', roles: Object.freeze(['admin', 'developer']) }),
  Object.freeze({ id: 'users.manage', label: 'User Management', detail: 'Create, invite, edit, recover, and delete VoxVector accounts.', roles: Object.freeze(['admin']) }),
  Object.freeze({ id: 'cases.manage', label: 'Cases and recordings', detail: 'Create, read, delete, upload, play back, and analyze owner-scoped cases.', roles: Object.freeze(['admin', 'developer']) }),
  Object.freeze({ id: 'deploy.manage', label: 'Deployment controls', detail: 'Trigger the protected Render deployment action.', roles: Object.freeze(['admin', 'developer']) }),
  Object.freeze({ id: 'diagnostics.read', label: 'Diagnostics and runtime logs', detail: 'Read diagnostics plus Render status, logs, and debug bundles.', roles: Object.freeze(['admin', 'developer']) }),
  Object.freeze({ id: 'user.workspace', label: 'User Workspace', detail: 'Open the protected approved-user workspace.', roles: Object.freeze(['user']) }),
])

export function getVoxVectorRole(user) {
  const metadata = user?.app_metadata || {}
  const candidate = String(metadata.voxvector_role || metadata.role || '').trim().toLowerCase()
  return VOXVECTOR_ROLE_SET.has(candidate) ? candidate : null
}

export function permissionsForRole(role) {
  return VOXVECTOR_PERMISSION_DEFAULTS[role] ? [...VOXVECTOR_PERMISSION_DEFAULTS[role]] : []
}

export function getVoxVectorPermissions(user) {
  const role = getVoxVectorRole(user)
  if (!role) return []
  const allowed = new Set(VOXVECTOR_PERMISSION_DEFAULTS[role] || [])
  const raw = user?.app_metadata?.voxvector_permissions
  if (!Array.isArray(raw)) return []
  return [...new Set(raw.filter(item => typeof item === 'string').map(item => item.trim()).filter(item => allowed.has(item)))]
}

export function hasVoxVectorPermission(user, permission) {
  if (!permission) return false
  return getVoxVectorPermissions(user).includes(permission)
}

export function isAdmin(user) {
  return getVoxVectorRole(user) === 'admin'
}

export function isDeveloper(user) {
  const role = getVoxVectorRole(user)
  return role === 'developer' || role === 'admin'
}

export function isApprovedUser(user) {
  return getVoxVectorRole(user) === 'user'
}

export function routeForVoxVectorRole(user) {
  const role = getVoxVectorRole(user)
  if (role === 'admin' || role === 'developer') return '/voxvector/developer'
  if (role === 'user') return '/voxvector/app'
  return '/voxvector/login'
}

export function roleAllowed(user, allowedRoles = [], requiredPermissions = []) {
  const role = getVoxVectorRole(user)
  if (!role || !allowedRoles.includes(role)) return false
  const baseline = role === 'user' ? 'user.workspace' : 'developer.console'
  const required = [...new Set([baseline, ...requiredPermissions].filter(Boolean))]
  return required.every(permission => hasVoxVectorPermission(user, permission))
}

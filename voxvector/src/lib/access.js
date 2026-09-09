export const VOXVECTOR_ROLES = Object.freeze(['admin', 'developer', 'user'])
export const VOXVECTOR_ROLE_SET = new Set(VOXVECTOR_ROLES)

export function getVoxVectorRole(user) {
  const metadata = user?.app_metadata || {}
  const candidate = String(metadata.voxvector_role || metadata.role || '').trim().toLowerCase()
  return VOXVECTOR_ROLE_SET.has(candidate) ? candidate : null
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

export function roleAllowed(user, allowedRoles = []) {
  const role = getVoxVectorRole(user)
  return Boolean(role && allowedRoles.includes(role))
}

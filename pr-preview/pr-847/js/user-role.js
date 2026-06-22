const VALID_ROLES = new Set(['member', 'developer', 'admin'])
const ELEVATED_ROLES = new Set(['developer', 'admin'])
export const DEFAULT_ROLE = 'member'

export function normalizeRole(role) {
  if (typeof role !== 'string') return DEFAULT_ROLE
  const normalized = role.trim().toLowerCase()
  return VALID_ROLES.has(normalized) ? normalized : DEFAULT_ROLE
}

export function isElevatedRole(role) {
  return ELEVATED_ROLES.has(normalizeRole(role))
}

export async function getUserRole(service, user) {
  const metaRoleValue =
    (user?.user_metadata && user.user_metadata.role) ??
    (user?.app_metadata && user.app_metadata.role)
  if (typeof metaRoleValue === 'string') {
    return normalizeRole(metaRoleValue)
  }

  if (!service || typeof service !== 'object') return DEFAULT_ROLE
  if (typeof service.getUserRole === 'function') {
    try {
      const role = await service.getUserRole(user)
      if (role) {
        return normalizeRole(role)
      }
    } catch (error) {
      console.warn('Role lookup failed', error)
    }
  }
  return DEFAULT_ROLE
}

export default {
  DEFAULT_ROLE,
  getUserRole,
  isElevatedRole,
  normalizeRole,
}

const AUTH_DISABLED_MESSAGE =
  'Member accounts are temporarily offline while we rebuild our data services. Access will return with the next database release.'

export function isAuthEnabled() {
  return false
}

export function getAuthService(onMissing) {
  if (typeof onMissing === 'function') {
    try {
      onMissing(AUTH_DISABLED_MESSAGE)
    } catch (error) {
      console.warn('[auth] onMissing handler failed', error)
    }
  }
  return null
}

export function getAuthStatus() {
  return {
    user: null,
    service: null,
    message: AUTH_DISABLED_MESSAGE,
  }
}

export { AUTH_DISABLED_MESSAGE }

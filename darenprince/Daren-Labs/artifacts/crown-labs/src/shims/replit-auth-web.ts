export function useAuth() {
  return {
    user: null,
    isAuthenticated: false,
    logout: () => {},
    login: () => {},
  }
}

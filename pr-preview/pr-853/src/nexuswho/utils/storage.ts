export const STORAGE_KEYS = {
  attempt: 'VIBE_PRISM_ATTEMPT',
  token: 'VIBE_PRISM_LAST_TOKEN',
}

export const setAttempt = () => {
  localStorage.setItem(STORAGE_KEYS.attempt, new Date().toISOString())
}

export const hasAttempt = () => Boolean(localStorage.getItem(STORAGE_KEYS.attempt))

export const saveToken = (token: string) => {
  localStorage.setItem(STORAGE_KEYS.token, token)
}

export const getToken = () => localStorage.getItem(STORAGE_KEYS.token)

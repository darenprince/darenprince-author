import { Moon, Sun } from 'lucide-react'
import Button from './Button'

const THEME_KEY = 'voxvector-theme'

function storage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    return window.localStorage
  } catch {
    return null
  }
}

export function getStoredTheme() {
  try {
    return storage()?.getItem(THEME_KEY) || 'dark'
  } catch {
    return 'dark'
  }
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return
  const resolved = theme === 'light' ? 'light' : 'dark'
  document.documentElement.dataset.theme = resolved
  document.documentElement.style.colorScheme = resolved
  try {
    storage()?.setItem(THEME_KEY, resolved)
  } catch {
    // Theme persistence is optional. Rendering must continue when browser storage is unavailable.
  }
}

export default function ThemeToggle({ theme, onThemeChange, className = '' }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return <Button type="button" variant="ghost" size="icon" className={className} onClick={() => onThemeChange(next)} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
    {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
  </Button>
}

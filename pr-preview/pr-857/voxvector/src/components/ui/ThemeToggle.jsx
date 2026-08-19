import { Moon, Sun } from 'lucide-react'
import Button from './Button'

export function getStoredTheme() {
  return localStorage.getItem('voxvector-theme') || 'dark'
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  localStorage.setItem('voxvector-theme', theme)
}

export default function ThemeToggle({ theme, onThemeChange, className = '' }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return <Button type="button" variant="ghost" size="icon" className={className} onClick={() => onThemeChange(next)} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`}>
    {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
  </Button>
}

import { useEffect, useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import ThemeToggle, { applyTheme, getStoredTheme } from './components/ui/ThemeToggle'
import LandingChrome from './components/LandingChrome'
import HeroRefinement from './components/HeroRefinement'
import EvidenceBarsRefinement from './components/EvidenceBarsRefinement'
import './index.css'
import './landing-chrome.css'
import './hero-refinement.css'
import './evidence-motion.css'
import './audio-player.css'
import './console-menu-effects.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false }
  }
})

function ThemeLayer() {
  const isDeveloper = window.location.pathname.replace(/\/+$/, '') === '/voxvector/developer' || window.location.hash === '#/developer'
  const [theme, setTheme] = useState(getStoredTheme)
  useEffect(() => { applyTheme(theme) }, [theme])
  if (isDeveloper) return null
  return <div className="fixed right-28 top-4 z-[70] lg:right-52 lg:top-5"><ThemeToggle theme={theme} onThemeChange={setTheme} className="bg-[var(--vv-surface)]/90 shadow-lg backdrop-blur-md" /></div>
}

function PublicChromeLayer() {
  const isDeveloper = window.location.pathname.replace(/\/+$/, '') === '/voxvector/developer' || window.location.hash === '#/developer'
  if (isDeveloper) return null
  return <><HeroRefinement /><EvidenceBarsRefinement /><LandingChrome /></>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider clientName="voxvector">
      <App />
      <ThemeLayer />
      <PublicChromeLayer />
    </QueryClientProvider>
  </React.StrictMode>
)

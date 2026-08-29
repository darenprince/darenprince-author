import { useEffect, useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import ThemeToggle, { applyTheme, getStoredTheme } from './components/ui/ThemeToggle'
import { RuntimeBoundary } from './components/RuntimeBoundary'
import './index.css'

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

function AppReadyMarker() {
  useEffect(() => {
    if (typeof window.__voxvectorMarkReady === 'function') window.__voxvectorMarkReady()
  }, [])
  return null
}

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <RuntimeBoundary>
        <App />
      </RuntimeBoundary>
      <AppReadyMarker />
      <ThemeLayer />
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)

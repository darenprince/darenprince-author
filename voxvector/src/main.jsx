import { useEffect, useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import ThemeToggle, { applyTheme, getStoredTheme } from './components/ui/ThemeToggle'
import { RuntimeBoundary } from './components/RuntimeBoundary'
import './index.css'
import './Typography.css'
import './coffee-ui.css'
import './console-workflow-state.css'
import './public-hero-refinement.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false }
  }
})

function ScrollRestoration() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    scrollTop()
    window.addEventListener('pageshow', scrollTop)
    window.addEventListener('popstate', scrollTop)
    window.addEventListener('hashchange', scrollTop)
    return () => {
      window.removeEventListener('pageshow', scrollTop)
      window.removeEventListener('popstate', scrollTop)
      window.removeEventListener('hashchange', scrollTop)
      window.history.scrollRestoration = previous
    }
  }, [])
  return null
}

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
      <ScrollRestoration />
      <RuntimeBoundary>
        <App />
      </RuntimeBoundary>
      <AppReadyMarker />
      <ThemeLayer />
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
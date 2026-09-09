import { lazy, Suspense, useEffect, useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import ThemeToggle, { applyTheme, getStoredTheme } from './components/ui/ThemeToggle'
import { RuntimeBoundary } from './components/RuntimeBoundary'
import './canonical.css'

const AuthGate = lazy(() => import('./components/AuthGate'))
const UserWorkspace = lazy(() => import('./components/UserWorkspace'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false }
  }
})

const normalizedPath = () => window.location.pathname.replace(/\/+$/, '') || '/'

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
  const path = normalizedPath()
  const protectedSurface = path === '/voxvector/developer' || path === '/voxvector/login' || path === '/voxvector/app' || window.location.hash === '#/developer'
  const [theme, setTheme] = useState(getStoredTheme)
  useEffect(() => { applyTheme(theme) }, [theme])
  if (protectedSurface) return null
  return <div className="fixed right-28 top-4 z-[70] lg:right-52 lg:top-5"><ThemeToggle theme={theme} onThemeChange={setTheme} className="bg-[var(--vv-surface)]/90 shadow-lg backdrop-blur-md" /></div>
}

function AppReadyMarker() {
  useEffect(() => {
    if (typeof window.__voxvectorMarkReady === 'function') window.__voxvectorMarkReady()
  }, [])
  return null
}

function LoginRoute() {
  return <Suspense fallback={<div className="vv-route-loading" role="status" aria-live="polite">Opening VoxVector Login…</div>}><AuthGate redirectByRole onBack={() => { window.location.href = '/voxvector/' }}>{() => null}</AuthGate></Suspense>
}

function RoutedApplication() {
  const path = normalizedPath()
  if (path === '/voxvector/login') return <LoginRoute />
  if (path === '/voxvector/app') return <Suspense fallback={<div className="vv-route-loading" role="status" aria-live="polite">Opening VoxVector workspace…</div>}><UserWorkspace /></Suspense>
  return <App />
}

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollRestoration />
      <RuntimeBoundary>
        <RoutedApplication />
      </RuntimeBoundary>
      <AppReadyMarker />
      <ThemeLayer />
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)

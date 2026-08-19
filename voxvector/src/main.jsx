import { useEffect, useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import ThemeToggle, { applyTheme, getStoredTheme } from './components/ui/ThemeToggle'
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
  return <div className="fixed right-4 top-4 z-[70] lg:right-8 lg:top-5"><ThemeToggle theme={theme} onThemeChange={setTheme} className="bg-[var(--vv-surface)]/90 shadow-lg backdrop-blur-md" /></div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ThemeLayer />
    </QueryClientProvider>
  </React.StrictMode>
)

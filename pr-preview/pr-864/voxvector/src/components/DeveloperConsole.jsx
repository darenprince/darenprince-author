import { useEffect } from 'react'
import DeveloperConsoleMVP from './DeveloperConsoleMVP'

const ORIGINAL_CONSOLE = '/voxvector-dashboard.html'

function addOriginalConsoleLinks() {
  document.querySelectorAll('.vv-sidebar-content').forEach(sidebar => {
    if (sidebar.querySelector('[data-vv-original-console]')) return

    const divider = document.createElement('div')
    divider.className = 'vv-sidebar-divider'
    divider.setAttribute('aria-hidden', 'true')

    const link = document.createElement('a')
    link.className = 'vv-nav-item'
    link.href = ORIGINAL_CONSOLE
    link.setAttribute('data-vv-original-console', 'true')
    link.setAttribute('aria-label', 'Open original VoxVector console')
    link.innerHTML = '<span aria-hidden="true">↗</span><span>Original Console</span>'

    sidebar.appendChild(divider)
    sidebar.appendChild(link)
  })
}

export default function DeveloperConsole(props) {
  useEffect(() => {
    const apply = () => addOriginalConsoleLinks()
    const timers = [0, 100, 400].map(delay => window.setTimeout(apply, delay))
    return () => timers.forEach(window.clearTimeout)
  }, [])

  return <DeveloperConsoleMVP {...props} />
}

import { useEffect } from 'react'
import DeveloperConsoleMVP from './DeveloperConsoleMVP'

const ORIGINAL_CONSOLE = '/voxvector-dashboard.html'
const REPOSITORY_INDEX = '/voxvector/developer/voxvector-repository.html'
const VISUAL_ASSET_INDEX = '/voxvector/developer/voxvector-images.html'

function addDeveloperIndexLinks() {
  document.querySelectorAll('.vv-sidebar-content').forEach(sidebar => {
    if (sidebar.querySelector('[data-vv-repository-index]')) return

    const divider = document.createElement('div')
    divider.className = 'vv-sidebar-divider'
    divider.setAttribute('aria-hidden', 'true')

    const links = [
      {
        href: VISUAL_ASSET_INDEX,
        label: 'Visual Assets',
        aria: 'Open VoxVector visual asset index',
        marker: '▧',
        key: 'visual-assets',
      },
      {
        href: REPOSITORY_INDEX,
        label: 'Repository Index',
        aria: 'Open VoxVector repository index',
        marker: '⌘',
        key: 'repository-index',
      },
    ]

    sidebar.appendChild(divider)

    links.forEach(({ href, label, aria, marker, key }) => {
      const link = document.createElement('a')
      link.className = 'vv-nav-item'
      link.href = href
      link.target = '_blank'
      link.rel = 'noopener'
      link.setAttribute(`data-vv-${key}`, 'true')
      link.setAttribute('aria-label', aria)
      link.innerHTML = `<span aria-hidden="true">${marker}</span><span>${label}</span>`
      sidebar.appendChild(link)
    })

    const originalDivider = document.createElement('div')
    originalDivider.className = 'vv-sidebar-divider'
    originalDivider.setAttribute('aria-hidden', 'true')
    sidebar.appendChild(originalDivider)

    const original = document.createElement('a')
    original.className = 'vv-nav-item'
    original.href = ORIGINAL_CONSOLE
    original.target = '_blank'
    original.rel = 'noopener'
    original.setAttribute('data-vv-original-console', 'true')
    original.setAttribute('aria-label', 'Open original VoxVector console')
    original.innerHTML = '<span aria-hidden="true">↗</span><span>Original Console</span>'
    sidebar.appendChild(original)
  })
}

export default function DeveloperConsole(props) {
  useEffect(() => {
    const apply = () => addDeveloperIndexLinks()
    const timers = [0, 100, 400].map(delay => window.setTimeout(apply, delay))
    return () => timers.forEach(window.clearTimeout)
  }, [])

  return <DeveloperConsoleMVP {...props} />
}

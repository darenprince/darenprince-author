import { useEffect } from 'react'

const CONSOLE_IMAGE = '/voxvector/voxvector-audio-analysis-console.png?v=20260821-2'
const COFFEE = '#c99a66'
const WORKFLOW_HEADING = 'Deep Forensic Vocal Analysis + State of the art Linguistics'
const WORKFLOW_DESCRIPTION = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'
const REFINEMENT_VERSION = '2026-08-21-v2'

function refineWorkflowContent() {
  const section = document.querySelector('#workflow')
  if (!section) return false

  section.setAttribute('data-vv-content-refinement', REFINEMENT_VERSION)

  const heading = section.querySelector('h2')
  const copy = heading?.parentElement
  const description = copy?.querySelector('p')
  const link = copy?.querySelector('a[href="#technology"]')

  if (heading) {
    heading.innerHTML = `Deep Forensic Vocal Analysis + <span class="vv-state-of-art">State of the art Linguistics</span>`
  }

  if (description) {
    description.textContent = WORKFLOW_DESCRIPTION
  }

  if (link) {
    const textNode = Array.from(link.childNodes).find((node) => node.nodeType === Node.TEXT_NODE)
    if (textNode) textNode.textContent = 'Deep Analysis Methods'
    link.setAttribute('aria-label', 'Deep Analysis Methods')
  }

  let feature = section.querySelector('.vv-console-feature')
  if (!feature) {
    const container = section.firstElementChild
    const grid = container?.firstElementChild
    if (container && grid) {
      feature = document.createElement('div')
      feature.className = 'vv-console-feature'
      feature.innerHTML = `<img src="${CONSOLE_IMAGE}" alt="VoxVector audio analysis console" loading="lazy" />`
      container.insertBefore(feature, grid)
    }
  }

  if (feature) feature.setAttribute('data-vv-console-version', '2026-08-21-2')
  return true
}

function addStyles() {
  if (document.querySelector('#vv-landing-content-refinement-styles')) return
  const style = document.createElement('style')
  style.id = 'vv-landing-content-refinement-styles'
  style.textContent = `
    #workflow .vv-state-of-art {
      color: ${COFFEE} !important;
    }

    #workflow .vv-console-feature {
      width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      margin: 0 auto 3.5rem !important;
      pointer-events: none;
    }

    #workflow .vv-console-feature img {
      display: block !important;
      width: 80% !important;
      max-width: 1100px !important;
      height: auto !important;
      object-fit: contain;
    }

    #workflow .vv-state-of-art {
      white-space: nowrap;
    }

    @media (max-width: 767px) {
      #workflow .vv-console-feature {
        margin-bottom: 2.5rem !important;
      }

      #workflow .vv-console-feature img {
        width: 80% !important;
      }

      #workflow .vv-state-of-art {
        white-space: normal;
      }
    }
  `
  document.head.appendChild(style)
}

export default function LandingContentRefinement() {
  useEffect(() => {
    addStyles()

    let applying = false
    const apply = () => {
      if (applying) return
      applying = true
      try {
        refineWorkflowContent()
      } finally {
        applying = false
      }
    }

    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true })

    const timers = [80, 300, 1000].map((delay) => window.setTimeout(apply, delay))
    return () => {
      observer.disconnect()
      timers.forEach(window.clearTimeout)
      document.querySelector('#vv-landing-content-refinement-styles')?.remove()
    }
  }, [])

  return null
}

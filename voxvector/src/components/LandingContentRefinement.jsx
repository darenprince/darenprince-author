import { useEffect } from 'react'

const CONSOLE_IMAGE = '/voxvector/voxvector-audio-analysis-console.png'
const COFFEE = '#c99a66'

function refineWorkflowContent() {
  const section = document.querySelector('#workflow')
  if (!section) return false

  const heading = section.querySelector('h2')
  const description = heading?.parentElement?.querySelector('p')
  const link = heading?.parentElement?.querySelector('a[href="#technology"]')

  if (heading) {
    heading.innerHTML = 'Deep Forensic Vocal Analysis + <span class="vv-state-of-art">State of the art Linguistics</span>'
    heading.dataset.vvLandingContent = 'true'
  }

  if (description) {
    description.textContent = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'
    description.dataset.vvLandingContent = 'true'
  }

  if (link) {
    const textNode = Array.from(link.childNodes).find((node) => node.nodeType === Node.TEXT_NODE)
    if (textNode) textNode.textContent = 'Deep Analysis Methods'
    link.dataset.vvLandingContent = 'true'
  }

  if (!section.querySelector('.vv-console-feature')) {
    const container = section.firstElementChild
    const grid = container?.firstElementChild
    if (container && grid) {
      const feature = document.createElement('div')
      feature.className = 'vv-console-feature'
      feature.innerHTML = `<img src="${CONSOLE_IMAGE}" alt="VoxVector audio analysis console" loading="lazy" />`
      container.insertBefore(feature, grid)
    }
  }

  return true
}

function addStyles() {
  if (document.querySelector('#vv-landing-content-refinement-styles')) return
  const style = document.createElement('style')
  style.id = 'vv-landing-content-refinement-styles'
  style.textContent = `
    #workflow .vv-state-of-art {
      color: ${COFFEE};
    }

    #workflow .vv-console-feature {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0 auto 3.5rem;
      pointer-events: none;
    }

    #workflow .vv-console-feature img {
      display: block;
      width: 80%;
      max-width: 1100px;
      height: auto;
      object-fit: contain;
    }

    @media (max-width: 767px) {
      #workflow .vv-console-feature {
        margin-bottom: 2.5rem;
      }

      #workflow .vv-console-feature img {
        width: 80%;
      }
    }
  `
  document.head.appendChild(style)
}

export default function LandingContentRefinement() {
  useEffect(() => {
    addStyles()
    const apply = () => refineWorkflowContent()
    apply()

    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true })

    const timeout = window.setTimeout(apply, 80)
    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
      document.querySelector('#vv-landing-content-refinement-styles')?.remove()
      document.querySelector('.vv-console-feature')?.remove()
    }
  }, [])

  return null
}

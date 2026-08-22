import { useEffect } from 'react'

const CONSOLE_IMAGE = '/voxvector/voxvector-audio-analysis-console.png?v=20260822-1'
const COFFEE = '#c99a66'
const WORKFLOW_HEADING = 'Deep Forensic Vocal Analysis + State of the art Linguistics'
const WORKFLOW_DESCRIPTION = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'
const REFINEMENT_VERSION = '2026-08-22-v3'

function getWorkflowContent() {
  const section = document.querySelector('#workflow')
  if (!section) return null

  // HeroRefinement adds a canvas directly to #workflow with prepend().
  // Never rely on firstElementChild here because that canvas is not the
  // workflow content container.
  const content = Array.from(section.children).find((element) =>
    element instanceof HTMLElement &&
    element.querySelector('h2') &&
    element.querySelector('p')
  )

  if (!content) return null

  const grid = Array.from(content.children).find((element) =>
    element instanceof HTMLElement &&
    element.querySelector('h2') &&
    element.querySelector('a[href="#technology"]')
  )

  return { section, content, grid }
}

function refineWorkflowContent() {
  const workflow = getWorkflowContent()
  if (!workflow) return false

  const { section, content, grid } = workflow
  section.setAttribute('data-vv-content-refinement', REFINEMENT_VERSION)
  content.setAttribute('data-vv-content-refinement-root', REFINEMENT_VERSION)

  const heading = grid?.querySelector('h2')
  const description = heading?.parentElement?.querySelector('p')
  const link = heading?.parentElement?.querySelector('a[href="#technology"]')

  if (heading) {
    heading.innerHTML = `<span class="vv-workflow-prefix">Deep Forensic Vocal Analysis + </span><span class="vv-state-of-art">State of the art Linguistics</span>`
    heading.setAttribute('data-vv-heading-version', REFINEMENT_VERSION)
  }

  if (description) {
    description.textContent = WORKFLOW_DESCRIPTION
    description.setAttribute('data-vv-description-version', REFINEMENT_VERSION)
  }

  if (link) {
    const textNode = Array.from(link.childNodes).find((node) => node.nodeType === Node.TEXT_NODE)
    if (textNode) textNode.textContent = 'Deep Analysis Methods'
    link.setAttribute('aria-label', 'Deep Analysis Methods')
    link.setAttribute('data-vv-cta-version', REFINEMENT_VERSION)
  }

  let feature = content.querySelector('.vv-console-feature')
  if (!feature && grid) {
    feature = document.createElement('div')
    feature.className = 'vv-console-feature'
    feature.setAttribute('data-vv-console-version', REFINEMENT_VERSION)

    const image = document.createElement('img')
    image.src = CONSOLE_IMAGE
    image.alt = 'VoxVector audio analysis console'
    image.loading = 'eager'
    image.decoding = 'async'
    image.setAttribute('fetchpriority', 'high')
    feature.appendChild(image)

    content.insertBefore(feature, grid)
  }

  if (feature) {
    feature.setAttribute('data-vv-console-version', REFINEMENT_VERSION)
    const image = feature.querySelector('img')
    if (image && image.getAttribute('src') !== CONSOLE_IMAGE) image.setAttribute('src', CONSOLE_IMAGE)
  }

  return true
}

function addStyles() {
  if (document.querySelector('#vv-landing-content-refinement-styles')) return

  const style = document.createElement('style')
  style.id = 'vv-landing-content-refinement-styles'
  style.textContent = `
    #workflow .vv-console-feature {
      width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      margin: 0 auto 3.5rem !important;
      padding: 0 !important;
      pointer-events: none;
      position: relative;
      z-index: 2;
    }

    #workflow .vv-console-feature img {
      display: block !important;
      width: 80% !important;
      max-width: 1100px !important;
      height: auto !important;
      min-height: 1px !important;
      object-fit: contain !important;
      opacity: 1 !important;
      visibility: visible !important;
    }

    #workflow .vv-state-of-art {
      color: ${COFFEE} !important;
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

    const timers = [0, 80, 250, 600, 1200].map((delay) => window.setTimeout(apply, delay))

    return () => {
      observer.disconnect()
      timers.forEach(window.clearTimeout)
      document.querySelector('#vv-landing-content-refinement-styles')?.remove()
    }
  }, [])

  return null
}

import { useEffect } from 'react'

const CONSOLE_IMAGE = '/voxvector/voxvector-audio-analysis-console.png?v=20260822-2'
const COFFEE = '#c99a66'
const WORKFLOW_DESCRIPTION = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'
const REFINEMENT_VERSION = '2026-08-22-v5'

function getWorkflowTarget() {
  const section = document.querySelector('#workflow')
  if (!section) return null

  const heading = Array.from(section.querySelectorAll('h2')).find((element) => {
    const text = element.textContent?.trim() || ''
    return /Deep Forensic Vocal Analysis/i.test(text) || /State of the art Linguistics/i.test(text)
  }) || section.querySelector('h2')

  if (!heading) return null

  let block = heading.parentElement
  for (let depth = 0; block && depth < 8; depth += 1) {
    const hasParagraph = Boolean(block.querySelector('p'))
    const hasLink = Boolean(block.querySelector('a'))
    if (hasParagraph && hasLink) break
    block = block.parentElement
  }

  if (!block || block === section) return null

  const description = block.querySelector('p')
  const link = Array.from(block.querySelectorAll('a')).find((element) => {
    const text = element.textContent?.trim() || ''
    const href = element.getAttribute('href') || ''
    return /Explore the evidence model|Deep Analysis Methods|VoxVector Analysis Methods/i.test(text) || href.includes('#technology')
  }) || block.querySelector('a')

  return { section, heading, block, description, link }
}

function refineWorkflowContent() {
  const target = getWorkflowTarget()
  if (!target) return false

  const { section, heading, block, description, link } = target
  section.setAttribute('data-vv-content-refinement', REFINEMENT_VERSION)
  block.setAttribute('data-vv-content-refinement-root', REFINEMENT_VERSION)

  heading.innerHTML = '<span class="vv-workflow-prefix">Deep Forensic Vocal Analysis + </span><span class="vv-state-of-art">State of the art Linguistics</span>'
  heading.setAttribute('data-vv-heading-version', REFINEMENT_VERSION)

  if (description) {
    description.textContent = WORKFLOW_DESCRIPTION
    description.setAttribute('data-vv-description-version', REFINEMENT_VERSION)
  }

  if (link) {
    link.textContent = 'VoxVector Analysis Methods'
    link.setAttribute('aria-label', 'VoxVector Analysis Methods')
    link.setAttribute('data-vv-cta-version', REFINEMENT_VERSION)
    link.classList.add('vv-pill-cta')
  }

  let feature = section.querySelector('.vv-console-feature')
  if (!feature) {
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
    block.parentElement?.insertBefore(feature, block)
  }

  const image = feature.querySelector('img')
  if (image) {
    image.src = CONSOLE_IMAGE
    image.alt = 'VoxVector audio analysis console'
    image.loading = 'eager'
    image.decoding = 'async'
    image.setAttribute('fetchpriority', 'high')
  }

  feature.setAttribute('data-vv-console-version', REFINEMENT_VERSION)
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
      position: relative !important;
      z-index: 3 !important;
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

    #workflow .vv-pill-cta {
      border-radius: 9999px !important;
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

    const timers = [0, 80, 250, 600, 1200, 2500].map((delay) => window.setTimeout(apply, delay))

    return () => {
      observer.disconnect()
      timers.forEach(window.clearTimeout)
      document.querySelector('#vv-landing-content-refinement-styles')?.remove()
    }
  }, [])

  return null
}

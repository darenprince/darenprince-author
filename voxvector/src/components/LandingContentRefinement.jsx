import { useEffect } from 'react'

const CONSOLE_IMAGE = '/voxvector/voxvector-audio-analysis-console.png'
const ICON_IMAGE = '/voxvector/voxvector-icon-final-color.png.PNG'
const WORDMARK_IMAGE = '/voxvector/VoxVector-logo-word.png'
const COFFEE = '#c99a66'
const WORKFLOW_DESCRIPTION = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'
const REFINEMENT_VERSION = '2026-08-23-assets-v5'

function refineWorkflowContent() {
  const section = document.querySelector('#workflow')
  const heading = section?.querySelector('h2')
  if (!section || !heading) return

  section.setAttribute('data-vv-content-refinement', REFINEMENT_VERSION)

  /* Preserve the existing workflow structure. Change only the requested copy. */
  heading.innerHTML = '<span class="vv-workflow-prefix">Deep Forensic Vocal Analysis +</span><span class="vv-state-of-art">State of the art Linguistics</span>'

  const description = heading.parentElement?.querySelector('p') || section.querySelector('p')
  if (description) {
    description.textContent = WORKFLOW_DESCRIPTION
    description.setAttribute('data-vv-description-version', REFINEMENT_VERSION)
  }

  const link = Array.from(section.querySelectorAll('a')).find((element) => {
    const text = element.textContent?.trim() || ''
    const href = element.getAttribute('href') || ''
    return /Explore the evidence model|Deep Analysis Methods/i.test(text) || href.includes('#technology')
  })
  if (link) {
    link.textContent = 'Deep Analysis Methods'
    link.setAttribute('aria-label', 'Deep Analysis Methods')
    link.classList.add('vv-pill-cta')
  }

  /* Insert the canonical developer console immediately below the section heading. */
  let feature = section.querySelector(':scope > .vv-workflow-inner .vv-console-feature, :scope > .vv-console-feature')
  if (!feature) {
    feature = document.createElement('div')
    feature.className = 'vv-console-feature'
    feature.setAttribute('data-vv-console-version', REFINEMENT_VERSION)
    const image = document.createElement('img')
    image.src = CONSOLE_IMAGE
    image.alt = 'VoxVector audio analysis console'
    image.loading = 'eager'
    image.decoding = 'async'
    image.fetchPriority = 'high'
    feature.appendChild(image)
    heading.insertAdjacentElement('afterend', feature)
  }
}

function refineHeaderBrand() {
  const logo = document.querySelector('header a[aria-label="VoxVector home"]')
  if (!logo || logo.querySelector('.vv-header-wordmark')) return

  const icon = document.createElement('img')
  icon.src = ICON_IMAGE
  icon.alt = ''
  icon.setAttribute('aria-hidden', 'true')
  icon.className = 'vv-header-icon'

  const wordmark = document.createElement('img')
  wordmark.src = WORDMARK_IMAGE
  wordmark.alt = 'VoxVector'
  wordmark.className = 'vv-header-wordmark'

  const originalIcon = logo.querySelector(':scope > span:first-child')
  const originalText = logo.querySelector(':scope > span:nth-child(2)')
  if (originalIcon) originalIcon.replaceWith(icon)
  if (originalText) originalText.replaceWith(wordmark)
  logo.classList.remove('gap-3')
  logo.classList.add('gap-2', 'vv-header-brand')
}

function addStyles() {
  if (document.querySelector('#vv-landing-content-refinement-styles')) return

  const style = document.createElement('style')
  style.id = 'vv-landing-content-refinement-styles'
  style.textContent = `
    /* The workflow section stays charcoal. No gold scan, no animated overlay. */
    #workflow {
      position: relative !important;
      overflow: hidden !important;
      background:
        radial-gradient(circle at 78% 12%, rgba(255,255,255,.035), transparent 34%),
        radial-gradient(circle at 18% 78%, rgba(255,255,255,.022), transparent 38%),
        linear-gradient(145deg, #151515 0%, #1b1b1b 48%, #111111 100%) !important;
    }

    #workflow .vv-console-feature {
      width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      margin: 1.1rem auto 1rem !important;
      padding: 0 !important;
      position: relative !important;
      z-index: 2 !important;
    }

    #workflow .vv-console-feature img {
      display: block !important;
      width: 90% !important;
      max-width: 1240px !important;
      height: auto !important;
      max-height: none !important;
      object-fit: contain !important;
      opacity: 1 !important;
      visibility: visible !important;
      filter: drop-shadow(0 22px 40px rgba(0,0,0,.42));
      animation: vv-console-arrive .7s cubic-bezier(.22,1,.36,1) both;
    }

    #workflow .vv-workflow-prefix,
    #workflow .vv-state-of-art {
      display: block !important;
    }

    #workflow .vv-state-of-art {
      margin-top: .08em !important;
      color: ${COFFEE} !important;
    }

    #workflow .vv-pill-cta {
      border-radius: 9999px !important;
    }

    #workflow h2 {
      font-size: clamp(2.15rem, 4.7vw, 4.7rem) !important;
    }

    /* Header brand owns 60% of the available header width allocation. The
       navigation and action cluster remain in the remaining space. */
    .vv-header-brand {
      width: 60% !important;
      max-width: 60% !important;
      min-width: 0 !important;
      flex: 0 1 60% !important;
    }

    .vv-header-icon {
      --vv-header-icon-height: 44px;
      display: block !important;
      width: var(--vv-header-icon-height) !important;
      height: var(--vv-header-icon-height) !important;
      object-fit: contain !important;
      flex: 0 0 auto !important;
    }

    .vv-header-wordmark {
      display: block !important;
      width: auto !important;
      height: calc(var(--vv-header-icon-height) * .8) !important;
      object-fit: contain !important;
      object-position: left center !important;
      flex: 0 0 auto !important;
      max-width: 100% !important;
    }

    @keyframes vv-console-arrive {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 1023px) {
      .vv-header-brand {
        width: 60% !important;
        max-width: 60% !important;
        flex-basis: 60% !important;
      }
    }

    @media (max-width: 767px) {
      #workflow .vv-console-feature {
        margin: .8rem auto .8rem !important;
      }
      #workflow .vv-console-feature img {
        width: 90% !important;
      }
      #workflow h2 {
        font-size: clamp(2rem, 9vw, 3.2rem) !important;
        line-height: 1.04 !important;
      }
      #workflow .vv-workflow-prefix,
      #workflow .vv-state-of-art {
        white-space: normal !important;
      }
      .vv-header-brand {
        width: 60% !important;
        max-width: 60% !important;
        flex-basis: 60% !important;
      }
      .vv-header-icon {
        --vv-header-icon-height: 46px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #workflow .vv-console-feature img {
        animation: none !important;
      }
    }
  `
  document.head.appendChild(style)
}

export default function LandingContentRefinement() {
  useEffect(() => {
    addStyles()
    const apply = () => {
      refineWorkflowContent()
      refineHeaderBrand()
    }
    apply()
    const timers = [80, 300, 700].map((delay) => window.setTimeout(apply, delay))
    return () => {
      timers.forEach(window.clearTimeout)
      document.querySelector('#vv-landing-content-refinement-styles')?.remove()
    }
  }, [])

  return null
}

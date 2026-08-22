import { useEffect } from 'react'

const CONSOLE_IMAGE = '/voxvector/voxvector-audio-analysis-console.png?v=20260822-v8'
const ICON_IMAGE = '/voxvector/assets/voxvector-icon-final-color.png'
const WORDMARK_IMAGE = '/voxvector/VoxVector-logo-word.png?v=20260822-v8'
const COFFEE = '#c99a66'
const WORKFLOW_DESCRIPTION = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'
const REFINEMENT_VERSION = '2026-08-22-v8'

function getWorkflowTarget() {
  const section = document.querySelector('#workflow')
  if (!section) return null
  const layout = section.firstElementChild
  const heading = section.querySelector('h2')
  if (!layout || !heading) return null

  const contentRoot = heading.closest('div')?.parentElement || layout.firstElementChild
  const stagesRoot = Array.from(layout.children).find((child) => child !== contentRoot && !child.classList.contains('vv-console-feature') && !child.classList.contains('vv-workflow-lower'))
  const description = contentRoot?.querySelector('p') || section.querySelector('p')
  const link = Array.from(section.querySelectorAll('a')).find((element) => {
    const text = element.textContent?.trim() || ''
    const href = element.getAttribute('href') || ''
    return /Explore the evidence model|Deep Analysis Methods/i.test(text) || href.includes('#technology')
  })

  return { section, layout, heading, contentRoot, stagesRoot, description, link }
}

function ensureWorkflowStructure(target) {
  const { section, layout, contentRoot, stagesRoot } = target
  if (!contentRoot || !stagesRoot) return null

  let lower = layout.querySelector(':scope > .vv-workflow-lower')
  if (!lower) {
    lower = document.createElement('div')
    lower.className = 'vv-workflow-lower'
    lower.setAttribute('data-vv-workflow-lower', REFINEMENT_VERSION)
    lower.appendChild(contentRoot)
    lower.appendChild(stagesRoot)
    layout.appendChild(lower)
  }

  let feature = layout.querySelector(':scope > .vv-console-feature')
  if (!feature) {
    feature = document.createElement('div')
    feature.className = 'vv-console-feature'
    feature.setAttribute('data-vv-console-version', REFINEMENT_VERSION)
    const image = document.createElement('img')
    image.alt = 'VoxVector audio analysis console'
    image.loading = 'eager'
    image.decoding = 'async'
    image.fetchPriority = 'high'
    feature.appendChild(image)
    layout.insertBefore(feature, lower)
  }

  const image = feature.querySelector('img')
  if (image) {
    image.src = CONSOLE_IMAGE
    image.alt = 'VoxVector audio analysis console'
  }

  section.setAttribute('data-vv-content-refinement', REFINEMENT_VERSION)
  return feature
}

function refineWorkflowContent() {
  const target = getWorkflowTarget()
  if (!target) return

  const { section, heading, contentRoot, description, link } = target
  const feature = ensureWorkflowStructure(target)
  if (!feature) return

  heading.innerHTML = '<span class="vv-workflow-prefix">Deep Forensic Vocal Analysis +</span><span class="vv-state-of-art">State of the art Linguistics</span>'

  if (description) {
    description.textContent = WORKFLOW_DESCRIPTION
    description.setAttribute('data-vv-description-version', REFINEMENT_VERSION)
  }

  if (link) {
    link.textContent = 'Deep Analysis Methods'
    link.setAttribute('aria-label', 'Deep Analysis Methods')
    link.setAttribute('data-vv-cta-version', REFINEMENT_VERSION)
    link.classList.add('vv-pill-cta')
  }

  contentRoot?.setAttribute('data-vv-workflow-copy', REFINEMENT_VERSION)
}

function refineHeaderBrand() {
  const logo = document.querySelector('header a[aria-label="VoxVector home"]')
  if (!logo || logo.getAttribute('data-vv-brand-version') === REFINEMENT_VERSION) return

  logo.setAttribute('data-vv-brand-version', REFINEMENT_VERSION)
  logo.className = 'group flex items-center gap-2 no-underline'
  logo.innerHTML = `
    <img src="${ICON_IMAGE}" alt="" aria-hidden="true" class="vv-header-icon" />
    <img src="${WORDMARK_IMAGE}" alt="VoxVector" class="vv-header-wordmark" />
  `
}

function addStyles() {
  if (document.querySelector('#vv-landing-content-refinement-styles')) return

  const style = document.createElement('style')
  style.id = 'vv-landing-content-refinement-styles'
  style.textContent = `
    #workflow {
      position: relative !important;
      overflow: hidden !important;
      background:
        radial-gradient(circle at 82% 8%, rgba(201,154,102,.11), transparent 34%),
        radial-gradient(circle at 12% 82%, rgba(126,91,67,.10), transparent 36%),
        linear-gradient(135deg, #171615 0%, #211e1b 48%, #111110 100%) !important;
      border-top: 1px solid rgba(201,154,102,.10) !important;
    }

    #workflow > div:first-child {
      display: block !important;
      position: relative !important;
      z-index: 1 !important;
    }

    #workflow .vv-console-feature {
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: 1320px !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      overflow: visible !important;
      margin: -1.5rem auto 1.25rem !important;
      padding: 0 !important;
      position: relative !important;
      z-index: 2 !important;
      flex: none !important;
    }

    #workflow .vv-console-feature::after {
      content: '';
      position: absolute;
      left: 10%;
      right: 10%;
      bottom: 4%;
      height: 18%;
      border-radius: 50%;
      background: rgba(201,154,102,.12);
      filter: blur(30px);
      pointer-events: none;
      z-index: -1;
    }

    #workflow .vv-console-feature img {
      display: block !important;
      width: 90% !important;
      max-width: 1240px !important;
      max-height: 680px !important;
      height: auto !important;
      min-height: 0 !important;
      object-fit: contain !important;
      opacity: 1 !important;
      visibility: visible !important;
      filter: drop-shadow(0 24px 42px rgba(0,0,0,.38));
      animation: vv-console-arrive .8s cubic-bezier(.22,1,.36,1) both, vv-console-float 7s ease-in-out 1s infinite;
    }

    #workflow .vv-workflow-lower {
      display: grid !important;
      grid-template-columns: minmax(0, .72fr) minmax(0, 1.28fr) !important;
      gap: 3rem !important;
      align-items: start !important;
      position: relative !important;
    }

    #workflow .vv-workflow-lower > :first-child {
      min-width: 0 !important;
    }

    #workflow .vv-workflow-lower > :first-child > div {
      position: sticky !important;
      top: 6rem !important;
    }

    #workflow .vv-workflow-lower > :last-child {
      min-width: 0 !important;
    }

    #workflow .vv-workflow-prefix,
    #workflow .vv-state-of-art {
      display: block !important;
    }

    #workflow .vv-workflow-prefix {
      white-space: nowrap;
    }

    #workflow .vv-state-of-art {
      margin-top: .12em !important;
      color: ${COFFEE} !important;
    }

    #workflow .vv-pill-cta {
      border-radius: 9999px !important;
      padding: .65rem 1.15rem !important;
      border: 1px solid rgba(201,154,102,.52) !important;
      background: rgba(201,154,102,.07) !important;
      transition: transform .25s ease, background .25s ease, border-color .25s ease !important;
    }

    #workflow .vv-pill-cta:hover {
      transform: translateY(-1px) !important;
      background: rgba(201,154,102,.13) !important;
      border-color: rgba(201,154,102,.82) !important;
    }

    #workflow .vv-workflow-lower h2 {
      font-size: clamp(2.15rem, 4.7vw, 4.7rem) !important;
    }

    .vv-header-icon {
      display: block !important;
      width: 46px !important;
      height: 46px !important;
      object-fit: contain !important;
      flex: 0 0 auto !important;
    }

    .vv-header-wordmark {
      display: block !important;
      width: 126px !important;
      height: 46px !important;
      object-fit: contain !important;
      object-position: left center !important;
      flex: 0 0 auto !important;
    }

    @keyframes vv-console-arrive {
      from { opacity: 0; transform: translateY(18px) scale(.985); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes vv-console-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    @media (max-width: 1023px) {
      #workflow .vv-workflow-lower {
        grid-template-columns: 1fr !important;
        gap: 2.25rem !important;
      }
      #workflow .vv-workflow-lower > :first-child > div {
        position: relative !important;
        top: auto !important;
      }
    }

    @media (max-width: 767px) {
      #workflow {
        padding-top: 1.25rem !important;
        padding-bottom: 4rem !important;
      }
      #workflow .vv-console-feature {
        margin: -.35rem auto .8rem !important;
      }
      #workflow .vv-console-feature img {
        width: 90% !important;
        max-height: 430px !important;
      }
      #workflow .vv-workflow-lower {
        gap: 1.75rem !important;
      }
      #workflow .vv-workflow-prefix {
        white-space: normal !important;
      }
      #workflow .vv-state-of-art {
        white-space: normal !important;
      }
      #workflow .vv-workflow-lower h2 {
        font-size: clamp(2.05rem, 9.5vw, 3.25rem) !important;
        line-height: 1.02 !important;
      }
      #workflow .vv-workflow-lower p {
        margin-top: 1.1rem !important;
        font-size: 1rem !important;
        line-height: 1.75rem !important;
      }
      .vv-header-icon {
        width: 48px !important;
        height: 48px !important;
      }
      .vv-header-wordmark {
        width: 122px !important;
        height: 48px !important;
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

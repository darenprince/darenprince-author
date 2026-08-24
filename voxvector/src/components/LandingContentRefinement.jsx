import { useEffect } from 'react'

const CONSOLE_IMAGE = '/voxvector/voxvector-audio-analysis-console.png'
const ICON_IMAGE = '/voxvector/voxvector-icon-final-color.png.PNG'
const WORDMARK_IMAGE = '/voxvector/VoxVector-logo-word.png'
const COFFEE = '#c99a66'
const WORKFLOW_DESCRIPTION = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'
const REFINEMENT_VERSION = '2026-08-23-assets-v6'

function addWaveform(feature) {
  if (!feature || feature.querySelector('.vv-console-waveform')) return

  const waveform = document.createElement('div')
  waveform.className = 'vv-console-waveform'
  waveform.setAttribute('aria-hidden', 'true')

  const center = document.createElement('span')
  center.className = 'vv-console-waveform-center'
  waveform.appendChild(center)

  const bars = 96
  for (let index = 0; index < bars; index += 1) {
    const bar = document.createElement('i')
    const envelope = 0.2 + Math.abs(Math.sin(index * 0.19)) * 0.48 + Math.abs(Math.sin(index * 0.067 + 1.4)) * 0.22
    bar.style.setProperty('--vv-wave-height', `${Math.round(12 + envelope * 42)}%`)
    bar.style.setProperty('--vv-wave-delay', `${(index % 16) * -0.08}s`)
    bar.style.setProperty('--vv-wave-opacity', `${0.32 + (index % 8) * 0.04}`)
    waveform.appendChild(bar)
  }

  feature.insertBefore(waveform, feature.firstChild)
}

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

  /* Insert exactly one canonical developer console. The prior selector only
     checked a non-existent wrapper class, so each delayed re-apply created
     another copy. Query the feature directly and make the operation idempotent. */
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
    image.fetchPriority = 'high'
    feature.appendChild(image)
    heading.insertAdjacentElement('afterend', feature)
  }

  addWaveform(feature)
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

function refineFooterBrand() {
  const footer = document.querySelector('footer')
  if (!footer || footer.querySelector('.vv-footer-brand')) return

  const copyright = Array.from(footer.querySelectorAll('span')).find((element) => element.textContent?.includes('© 2026 Crown Labs'))
  const bottomRow = copyright?.parentElement
  if (!bottomRow) return

  const lockup = document.createElement('div')
  lockup.className = 'vv-footer-brand'

  const icon = document.createElement('img')
  icon.src = ICON_IMAGE
  icon.alt = ''
  icon.setAttribute('aria-hidden', 'true')
  icon.className = 'vv-footer-icon'

  const wordmark = document.createElement('img')
  wordmark.src = WORDMARK_IMAGE
  wordmark.alt = 'VoxVector'
  wordmark.className = 'vv-footer-wordmark'

  lockup.append(icon, wordmark)
  bottomRow.parentElement.insertBefore(lockup, bottomRow)
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
      min-height: clamp(220px, 28vw, 430px) !important;
      isolation: isolate !important;
    }

    #workflow .vv-console-waveform {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: clamp(2px, .35vw, 6px) !important;
      padding: 0 !important;
      overflow: hidden !important;
      z-index: 0 !important;
      pointer-events: none !important;
      opacity: .58 !important;
    }

    #workflow .vv-console-waveform-center {
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      top: 50% !important;
      height: 1px !important;
      transform: translateY(-50%) !important;
      background: rgba(201,154,102,.18) !important;
      box-shadow: 0 0 18px rgba(201,154,102,.18) !important;
    }

    #workflow .vv-console-waveform i {
      display: block !important;
      width: clamp(2px, .28vw, 5px) !important;
      height: var(--vv-wave-height) !important;
      min-height: 8px !important;
      border-radius: 999px !important;
      background: linear-gradient(180deg, rgba(201,154,102,.12), rgba(201,154,102,.88), rgba(201,154,102,.12)) !important;
      box-shadow: 0 0 10px rgba(201,154,102,.12) !important;
      transform-origin: center !important;
      animation: vv-console-wave-pulse 1.8s ease-in-out infinite !important;
      animation-delay: var(--vv-wave-delay) !important;
      opacity: var(--vv-wave-opacity) !important;
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
      position: relative !important;
      z-index: 2 !important;
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

    .vv-footer-brand {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 10px !important;
      width: 100% !important;
      margin: 3.25rem auto 0 !important;
      padding-top: 2rem !important;
      border-top: 1px solid var(--vv-border) !important;
    }

    .vv-footer-icon {
      display: block !important;
      width: 42px !important;
      height: 42px !important;
      object-fit: contain !important;
    }

    .vv-footer-wordmark {
      display: block !important;
      width: auto !important;
      height: 22px !important;
      max-width: min(190px, 70vw) !important;
      object-fit: contain !important;
    }

    @keyframes vv-console-arrive {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes vv-console-wave-pulse {
      0%, 100% { transform: scaleY(.72); opacity: .46; }
      50% { transform: scaleY(1.12); opacity: .9; }
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
        min-height: 180px !important;
      }
      #workflow .vv-console-feature img {
        width: 92% !important;
      }
      #workflow .vv-console-waveform {
        gap: 2px !important;
        opacity: .5 !important;
      }
      #workflow .vv-console-waveform i {
        width: 2px !important;
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
      #workflow .vv-console-feature img,
      #workflow .vv-console-waveform i {
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
      refineFooterBrand()
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

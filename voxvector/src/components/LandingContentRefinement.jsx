import { useEffect } from 'react'

const CONSOLE_IMAGE = '/voxvector/voxvector-audio-analysis-console.png'
const ICON_IMAGE = '/voxvector/voxvector-icon-final-color.png.PNG'
const WORDMARK_IMAGE = '/voxvector/VoxVector-logo-word.png'
const COFFEE = '#c99a66'
const WORKFLOW_DESCRIPTION = 'See what really makes VoxVector the future of trusted vocal deception detection. Explore the audio intelligence architecture, data extraction processing engines, analysis frameworks, psychological inference models, and long term vision behind VoxVector.'
const REFINEMENT_VERSION = '2026-08-24-readable-header-logo-v9'

function addWaveform(feature) {
  if (!feature || feature.querySelector('.vv-console-waveform')) return
  const waveform = document.createElement('div'); waveform.className = 'vv-console-waveform'; waveform.setAttribute('aria-hidden', 'true')
  const trace = document.createElement('div'); trace.className = 'vv-wave-trace'
  trace.innerHTML = `<svg viewBox="0 0 1200 220" preserveAspectRatio="none" role="presentation"><path class="vv-wave-grid" d="M0 110H1200M0 55H1200M0 165H1200"/><path class="vv-wave-path vv-wave-path-a" d="M0 110 C20 108 25 92 42 101 S65 126 82 110 S104 70 122 104 S146 140 164 111 S186 82 205 106 S228 127 246 109 S270 64 290 103 S314 142 332 110 S356 82 374 107 S396 132 414 110 S440 54 458 104 S484 147 502 111 S526 78 544 108 S568 130 586 110 S612 69 630 104 S656 142 674 110 S698 83 716 107 S740 128 758 110 S784 59 802 103 S826 145 846 110 S870 80 888 107 S912 132 930 110 S956 67 974 104 S998 143 1018 110 S1042 81 1060 107 S1084 130 1102 110 S1128 58 1146 104 S1170 141 1200 110"/><path class="vv-wave-path vv-wave-path-b" d="M0 110 C26 108 30 102 52 108 S78 120 96 110 S122 91 142 108 S168 127 190 110 S218 84 238 108 S264 126 284 110 S312 94 334 109 S360 122 382 110 S408 86 430 107 S456 129 478 110 S504 96 526 109 S552 124 574 110 S600 88 622 107 S648 127 670 110 S696 92 718 109 S744 124 766 110 S792 87 814 107 S840 128 862 110 S888 91 910 109 S936 123 958 110 S984 86 1006 106 S1032 128 1054 110 S1080 93 1102 109 S1128 122 1150 110 S1174 91 1200 110"/></svg>`
  waveform.appendChild(trace)
  const spectrum = document.createElement('div'); spectrum.className = 'vv-wave-spectrum'
  for (let index = 0; index < 72; index += 1) { const bar = document.createElement('i'); const harmonic = 0.18 + Math.abs(Math.sin(index * 0.37)) * 0.48 + Math.abs(Math.sin(index * 0.11 + 1.2)) * 0.25; bar.style.setProperty('--vv-spectrum-height', `${Math.round(10 + harmonic * 42)}%`); bar.style.setProperty('--vv-spectrum-delay', `${(index % 12) * -0.07}s`); spectrum.appendChild(bar) }
  waveform.appendChild(spectrum)
  const markers = document.createElement('div'); markers.className = 'vv-wave-markers'; markers.innerHTML = '<span>VOICE SIGNAL</span><span>AMPLITUDE</span><span>FREQUENCY</span><span>ANALYSIS TRACE</span>'; waveform.appendChild(markers)
  feature.insertBefore(waveform, feature.firstChild)
}

function refineWorkflowContent() {
  const section = document.querySelector('#workflow'); const heading = section?.querySelector('h2'); if (!section || !heading) return
  section.setAttribute('data-vv-content-refinement', REFINEMENT_VERSION)
  heading.innerHTML = '<span class="vv-workflow-prefix">Deep Forensic Vocal Analysis +</span><span class="vv-state-of-art">State of the art Linguistics</span>'
  const description = heading.parentElement?.querySelector('p') || section.querySelector('p'); if (description) { description.textContent = WORKFLOW_DESCRIPTION; description.setAttribute('data-vv-description-version', REFINEMENT_VERSION) }
  const link = Array.from(section.querySelectorAll('a')).find((element) => { const text = element.textContent?.trim() || ''; const href = element.getAttribute('href') || ''; return /Explore the evidence model|Deep Analysis Methods/i.test(text) || href.includes('#technology') })
  if (link) { link.textContent = 'Deep Analysis Methods'; link.setAttribute('aria-label', 'Deep Analysis Methods'); link.classList.add('vv-pill-cta') }
  let feature = section.querySelector('.vv-console-feature')
  if (!feature) { feature = document.createElement('div'); feature.className = 'vv-console-feature'; feature.setAttribute('data-vv-console-version', REFINEMENT_VERSION); const image = document.createElement('img'); image.src = CONSOLE_IMAGE; image.alt = 'VoxVector audio analysis console'; image.loading = 'eager'; image.decoding = 'async'; image.fetchPriority = 'high'; feature.appendChild(image); heading.insertAdjacentElement('afterend', feature) }
  addWaveform(feature)
}

function refineHeaderBrand() {
  const logo = document.querySelector('header a[aria-label="VoxVector home"]'); if (!logo || logo.querySelector('.vv-header-wordmark')) return
  const icon = document.createElement('img'); icon.src = ICON_IMAGE; icon.alt = ''; icon.setAttribute('aria-hidden', 'true'); icon.className = 'vv-header-icon'
  const wordmark = document.createElement('img'); wordmark.src = WORDMARK_IMAGE; wordmark.alt = 'VoxVector'; wordmark.className = 'vv-header-wordmark'
  const originalIcon = logo.querySelector(':scope > span:first-child'); const originalText = logo.querySelector(':scope > span:nth-child(2)'); if (originalIcon) originalIcon.replaceWith(icon); if (originalText) originalText.replaceWith(wordmark)
  logo.classList.remove('gap-3'); logo.classList.add('gap-2', 'vv-header-brand')
}

function refineFooterBrand() {
  const footer = document.querySelector('footer'); if (!footer || footer.querySelector('.vv-footer-brand')) return
  const copyright = Array.from(footer.querySelectorAll('span')).find((element) => element.textContent?.includes('© 2026 Crown Labs')); const bottomRow = copyright?.parentElement; if (!bottomRow) return
  const lockup = document.createElement('div'); lockup.className = 'vv-footer-brand'
  const icon = document.createElement('img'); icon.src = ICON_IMAGE; icon.alt = ''; icon.setAttribute('aria-hidden', 'true'); icon.className = 'vv-footer-icon'
  const wordmark = document.createElement('img'); wordmark.src = WORDMARK_IMAGE; wordmark.alt = 'VoxVector'; wordmark.className = 'vv-footer-wordmark'; lockup.append(icon, wordmark); bottomRow.parentElement.insertBefore(lockup, bottomRow)
}

function addStyles() {
  if (document.querySelector('#vv-landing-content-refinement-styles')) return
  const style = document.createElement('style'); style.id = 'vv-landing-content-refinement-styles'
  style.textContent = `
#workflow{position:relative!important;overflow:hidden!important;background:radial-gradient(circle at 78% 12%,rgba(255,255,255,.035),transparent 34%),radial-gradient(circle at 18% 78%,rgba(255,255,255,.022),transparent 38%),linear-gradient(145deg,#151515 0%,#1b1b1b 48%,#111 100%)!important}
#workflow .vv-console-feature{width:100%!important;display:flex!important;justify-content:center!important;align-items:center!important;margin:1.1rem auto 1rem!important;padding:0!important;position:relative!important;z-index:2!important;min-height:clamp(240px,30vw,460px)!important;isolation:isolate!important;overflow:hidden!important}
#workflow .vv-console-waveform{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:0!important;pointer-events:none!important;overflow:hidden!important;opacity:.82!important;mask-image:linear-gradient(90deg,transparent 0%,#000 7%,#000 93%,transparent 100%)!important;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 7%,#000 93%,transparent 100%)!important}
#workflow .vv-wave-trace{position:absolute!important;inset:8% 0 18%!important;transform:scaleY(.92)!important;transform-origin:center!important}#workflow .vv-wave-trace svg{width:100%!important;height:100%!important;overflow:visible!important}.vv-wave-grid{fill:none!important;stroke:rgba(201,154,102,.1)!important;stroke-width:1!important;stroke-dasharray:3 14!important}.vv-wave-path{fill:none!important;stroke:${COFFEE}!important;stroke-linecap:round!important;stroke-linejoin:round!important;vector-effect:non-scaling-stroke!important}.vv-wave-path-a{stroke-width:2.5!important;opacity:.88!important;filter:drop-shadow(0 0 7px rgba(201,154,102,.48))!important;stroke-dasharray:42 18 7 16!important;animation:vv-wave-drift 5s linear infinite!important}.vv-wave-path-b{stroke-width:1.25!important;opacity:.42!important;stroke-dasharray:16 24!important;animation:vv-wave-drift-reverse 8s linear infinite!important}
#workflow .vv-wave-spectrum{position:absolute!important;left:0!important;right:0!important;bottom:4%!important;height:38%!important;display:flex!important;align-items:end!important;justify-content:space-between!important;gap:4px!important;opacity:.35!important}.vv-wave-spectrum i{display:block!important;flex:1 1 0!important;max-width:8px!important;height:var(--vv-spectrum-height)!important;min-height:4px!important;background:linear-gradient(180deg,rgba(201,154,102,.82),rgba(201,154,102,.05))!important;transform-origin:bottom!important;animation:vv-spectrum-pulse 1.55s ease-in-out infinite!important;animation-delay:var(--vv-spectrum-delay)!important}.vv-wave-markers{position:absolute!important;inset:auto 1.5% 3%!important;display:flex!important;justify-content:space-between!important;font-family:ui-monospace,SFMono-Regular,Menlo,monospace!important;font-size:8px!important;letter-spacing:.14em!important;color:rgba(201,154,102,.46)!important;text-transform:uppercase!important}
#workflow .vv-console-feature img{display:block!important;width:90%!important;max-width:1240px!important;height:auto!important;object-fit:contain!important;opacity:1!important;visibility:visible!important;position:relative!important;z-index:2!important;filter:drop-shadow(0 22px 40px rgba(0,0,0,.42));animation:vv-console-reveal 1.15s cubic-bezier(.16,1,.3,1) both!important;transform-origin:center center!important;will-change:transform,opacity,clip-path,filter!important}
#workflow .vv-workflow-prefix,#workflow .vv-state-of-art{display:block!important}#workflow .vv-state-of-art{margin-top:.08em!important;color:${COFFEE}!important}#workflow .vv-pill-cta{border-radius:9999px!important}#workflow h2{font-size:clamp(2.15rem,4.7vw,4.7rem)!important}
/* Readable lockup: keep 60% allocation, increase actual logo scale. */.vv-header-brand{width:60%!important;max-width:60%!important;min-width:0!important;flex:0 0 60%!important}.vv-header-icon{--vv-header-icon-height:54px;display:block!important;width:var(--vv-header-icon-height)!important;height:var(--vv-header-icon-height)!important;object-fit:contain!important;flex:0 0 auto!important}.vv-header-wordmark{display:block!important;width:calc(100% - var(--vv-header-icon-height) - 10px)!important;height:40px!important;object-fit:contain!important;object-position:left center!important;flex:0 1 auto!important;max-width:none!important;min-width:0!important}
.vv-footer-brand{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:10px!important;width:100%!important;margin:3.25rem auto 0!important;padding-top:2rem!important;border-top:1px solid var(--vv-border)!important}.vv-footer-icon{display:block!important;width:42px!important;height:42px!important;object-fit:contain!important}.vv-footer-wordmark{display:block!important;width:auto!important;height:22px!important;max-width:min(190px,70vw)!important;object-fit:contain!important}
@keyframes vv-console-reveal{0%{opacity:0;transform:translateY(28px) scale(.965);clip-path:inset(48% 0 48% 0 round 4px);filter:blur(8px) drop-shadow(0 22px 40px rgba(0,0,0,.42))}45%{opacity:.9;transform:translateY(6px) scale(.985);clip-path:inset(10% 0 10% 0 round 4px);filter:blur(1.5px) drop-shadow(0 22px 40px rgba(0,0,0,.42))}100%{opacity:1;transform:translateY(0) scale(1);clip-path:inset(0);filter:blur(0) drop-shadow(0 22px 40px rgba(0,0,0,.42))}}@keyframes vv-wave-drift{to{stroke-dashoffset:-160}}@keyframes vv-wave-drift-reverse{to{stroke-dashoffset:180}}@keyframes vv-spectrum-pulse{0%,100%{transform:scaleY(.62);opacity:.52}50%{transform:scaleY(1.16);opacity:1}}
@media(max-width:1023px){.vv-header-brand{width:60%!important;max-width:60%!important;flex-basis:60%!important}}@media(max-width:767px){#workflow .vv-console-feature{margin:.8rem auto!important;min-height:190px!important}#workflow .vv-console-feature img{width:92%!important}#workflow .vv-wave-spectrum{gap:2px!important;opacity:.28!important}#workflow .vv-wave-path-a{stroke-width:2!important}#workflow .vv-wave-markers{font-size:6px!important}#workflow h2{font-size:clamp(2rem,9vw,3.2rem)!important;line-height:1.04!important}.vv-header-brand{width:60%!important;max-width:60%!important;flex-basis:60%!important}.vv-header-icon{--vv-header-icon-height:52px}.vv-header-wordmark{height:34px!important}}@media(prefers-reduced-motion:reduce){#workflow .vv-console-feature img,#workflow .vv-wave-path-a,#workflow .vv-wave-path-b,#workflow .vv-wave-spectrum i{animation:none!important}}
`
  document.head.appendChild(style)
}

export default function LandingContentRefinement(){useEffect(()=>{addStyles();const apply=()=>{refineWorkflowContent();refineHeaderBrand();refineFooterBrand()};apply();const timers=[80,300,700].map(delay=>window.setTimeout(apply,delay));return()=>{timers.forEach(window.clearTimeout);document.querySelector('#vv-landing-content-refinement-styles')?.remove()}},[]);return null}

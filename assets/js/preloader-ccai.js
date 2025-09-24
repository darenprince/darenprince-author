const STORAGE_KEY = 'ccaiPreloaderShown'
const MIN_DISPLAY_MS = 5000

const preloader = document.querySelector('.ccai-preloader')
if (!preloader) {
  sessionStorage.setItem(STORAGE_KEY, '1')
  document.dispatchEvent(new CustomEvent('ccai-preloader-ready'))
}

;(function initPreloader() {
  if (!preloader || !document.body.classList.contains('ccai-page')) return

  const url = new URL(window.location.href)
  const forcePreload = url.searchParams.get('preload') === '1'
  const alreadyShown = sessionStorage.getItem(STORAGE_KEY) === '1'

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    preloader.classList.add('ccai-preloader--reduced-motion')
  }

  const moduleRegistry = buildModuleRegistry()
  seedCodeStreams(moduleRegistry, prefersReducedMotion)

  const skipButton = preloader.querySelector('.ccai-preloader__skip')
  const srLabel = preloader.querySelector('.ccai-preloader__sr-only')
  let minDisplayComplete = false
  let windowLoaded = false
  let settled = false

  const settlePreloader = (instant = false) => {
    if (settled) return
    if (!instant && (!minDisplayComplete || !windowLoaded)) return

    settled = true
    sessionStorage.setItem(STORAGE_KEY, '1')
    document.body.classList.remove('ccai-preload-active')
    preloader.classList.add('ccai-preloader--background')
    if (instant) {
      preloader.classList.add('ccai-preloader--instant')
    }
    preloader.setAttribute('aria-hidden', 'true')
    skipButton?.setAttribute('hidden', '')
    skipButton?.setAttribute('tabindex', '-1')
    srLabel?.setAttribute('aria-hidden', 'true')
    document.dispatchEvent(new CustomEvent('ccai-preloader-ready'))
  }

  if (!forcePreload && alreadyShown) {
    settlePreloader(true)
    return
  }

  document.body.classList.add('ccai-preload-active')

  if (skipButton) {
    skipButton.addEventListener('click', () => {
      minDisplayComplete = true
      windowLoaded = true
      settlePreloader(true)
    })
  }

  window.addEventListener('load', () => {
    windowLoaded = true
    settlePreloader()
  })

  setTimeout(() => {
    minDisplayComplete = true
    settlePreloader()
  }, MIN_DISPLAY_MS)
})()

function seedCodeStreams(registry, prefersReducedMotion) {
  const layers = Array.from(preloader.querySelectorAll('.ccai-preloader__layer'))
  if (!layers.length) return

  const lines = shuffleArray(registry.slice())
  const perLayer = Math.ceil(lines.length / layers.length)

  layers.forEach((layer, index) => {
    const duration = 18 + index * 4 + Math.random() * 6
    layer.style.setProperty('--stream-duration', `${duration}s`)

    const stream = document.createElement('div')
    stream.className = 'ccai-preloader__stream'

    const streamAlt = document.createElement('div')
    streamAlt.className = 'ccai-preloader__stream ccai-preloader__stream--alt'

    const start = index * perLayer
    const segment = lines.slice(start, start + perLayer)

    const filler = segment.length ? segment : lines
    filler.forEach((entry) => {
      const line = createStreamLine(entry)
      stream.appendChild(line.cloneNode(true))
      streamAlt.appendChild(line)
    })

    layer.innerHTML = ''
    layer.appendChild(stream)
    layer.appendChild(streamAlt)
  })

  if (prefersReducedMotion) {
    layers.forEach((layer) => {
      layer.querySelectorAll('.ccai-preloader__line').forEach((line) => {
        line.style.animation = 'none'
      })
    })
  }
}

function createStreamLine(entry) {
  const line = document.createElement('div')
  line.className = 'ccai-preloader__line'
  line.style.setProperty('--flicker-delay', `${Math.random() * 5}s`)

  const label = document.createElement('span')
  label.textContent = `${entry.name}`

  const meta = document.createElement('span')
  meta.className = 'ccai-preloader__line-meta'
  meta.dataset.category = entry.category
  meta.textContent = entry.focus

  const note = document.createElement('span')
  note.className = 'ccai-preloader__line-note'
  note.textContent = entry.analysis

  line.appendChild(label)
  line.appendChild(meta)
  line.appendChild(note)
  return line
}

function shuffleArray(source) {
  for (let i = source.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[source[i], source[j]] = [source[j], source[i]]
  }
  return source
}

function buildModuleRegistry() {
  const catalog = {
    'Emotional/Affective Analysis': [
      [
        'Affective Resonance Mapper',
        'maps limbic resonance envelopes',
        'Calibrated empathic concordance levels.',
      ],
      [
        'Sentiment Pulse Lattice',
        'tracks tonal-valence divergence',
        'Flagged synchronized affect spikes.',
      ],
      [
        'Emotive Drift Analyzer',
        'charts autonomic waveforms',
        'Stabilized amplitude within safe delta.',
      ],
      [
        'Attachment Schema Profiler',
        'derives partner regulation cues',
        'Indexed dependency triggers and anchors.',
      ],
      [
        'Oxytocin Response Monitor',
        'projects neurochemical rapport',
        'Forecasted trust gradients in dialogue.',
      ],
      [
        'Neuroaffective Heatmap Engine',
        'renders affect density grids',
        'Localized stress fractures in rapport.',
      ],
    ],
    'Cognitive/Neurological Assessment': [
      [
        'Cortical Load Dashboard',
        'scores executive load ratios',
        'Highlighted overload thresholds approaching.',
      ],
      [
        'Cognitive Bias Sentinel',
        'maps heuristic interference',
        'Mitigated anchoring pressure on recall.',
      ],
      [
        'Neuro-Signal Harmonizer',
        'syncs speech-neural cadence',
        'Tuned cadence variance to prime recall.',
      ],
      [
        'Executive Function Indexer',
        'benchmarks task-switch fluency',
        'Logged adaptive control within optimal zone.',
      ],
      [
        'Working Memory Span Tracker',
        'monitors iterative hold length',
        'Sustained working memory over seven tokens.',
      ],
      [
        'Neuroplasticity Pulse Engine',
        'visualizes adaptive rewiring',
        'Identified readiness for reframing protocol.',
      ],
    ],
    'Deception & Manipulation Detection': [
      [
        'Veracity Pattern Decoder',
        'isolates inconsistency vectors',
        'Elevated micro-deviation at 0.23s window.',
      ],
      [
        'Statement Entropy Gauge',
        'scores linguistic noise',
        'Entropy crest aligns with evasive phrasing.',
      ],
      [
        'Influence Suppression Field',
        'dampens coercive cadence',
        'Applied counter-pattern to reset tone.',
      ],
      [
        'Truth Anchor Synthesizer',
        'builds sincerity baselines',
        'Baseline locked to prior trust benchmark.',
      ],
      [
        'Coercion Trace Interceptor',
        'flags manipulative loops',
        'Intercepted recirculating dominance markers.',
      ],
      [
        'Lie Stress Harmonics Meter',
        'graphs parasympathetic break',
        'Noted harmonic spike above integrity line.',
      ],
    ],
    'Behavioral Profiling & Risk Mapping': [
      [
        'Behavior Arc Mapper',
        'projects event trajectories',
        'Trajectory shift trending toward compliance.',
      ],
      [
        'Risk Aperture Console',
        'quantifies volatility spread',
        'Risk aperture constricting under guidance.',
      ],
      [
        'Persona Drift Tracer',
        'tracks identity modulation',
        'Deviations remain within negotiated corridor.',
      ],
      [
        'Impulse Threshold Scanner',
        'measures impulse staging',
        'Impulse crest delayed by 480ms buffer.',
      ],
      [
        'Behavior-Legacy Ledger',
        'stores action provenance',
        'Historical alignment supports trust uplift.',
      ],
      [
        'Adaptive Safeguard Grid',
        'maps situational failsafes',
        'Grid integrity confirmed across axes.',
      ],
    ],
    'Trauma Reconstruction & Dynamics': [
      [
        'Trauma Narrative Sequencer',
        'threads episodic recall',
        'Sequencer aligned sensory fragments coherently.',
      ],
      [
        'Somatic Echo Profiler',
        'detects body memory spikes',
        'Somatic resonance diffused below alert level.',
      ],
      [
        'Incident Chronology Weaver',
        'orders multi-source timelines',
        'Chronology locked with 99.2% certainty.',
      ],
      [
        'Resilience Pathway Uplift',
        'plots recovery scaffolds',
        'Pathway reinforced with dual-support nodes.',
      ],
      [
        'Trigger Forecast Array',
        'predicts destabilizing cues',
        'Projected triggers diffused with counter-narrative.',
      ],
      [
        'Stressor Compression Engine',
        'reduces overwhelm density',
        'Compression cycle eased traumatic overloads.',
      ],
    ],
    'Forensic Scene Reconstruction': [
      [
        'Scene Vector Synthesizer',
        'replays volumetric stages',
        'Vectors reconciled with drone telemetry.',
      ],
      [
        'Evidence Continuity Matrix',
        'links artifact chains',
        'Continuity preserved across micro-timestamps.',
      ],
      [
        'Trajectory Convergence Plotter',
        'maps path intersections',
        'Convergence indicates tri-contact cluster.',
      ],
      ['Spatial Memory Rebuilder', 'renders witness POV', 'Witness timeline matches sensor array.'],
      [
        'Material Signature Comparator',
        'validates surface matches',
        'Signatures align with chartered inventory.',
      ],
      [
        'Microtrace Diffusion Grid',
        'visualizes particle spread',
        'Diffusion pattern isolates origin locus.',
      ],
    ],
    'Symbolic/Visual Intelligence': [
      [
        'Iconography Signal Decoder',
        'reads symbolic payloads',
        'Decoded layered metaphors to actionable cues.',
      ],
      ['Glyph Pattern Weaver', 'aligns repeating motifs', 'Motif overlay shows ancestral linkage.'],
      [
        'Visual Semiotic Profiler',
        'scores image persuasion',
        'Persuasion index trending in analytic safe zone.',
      ],
      [
        'Storyboard Integrity Scanner',
        'checks sequence fidelity',
        'Storyboard validated against script brief.',
      ],
      ['Symbol Cascade Monitor', 'tracks emergent imagery', 'Cascade stabilized with updated key.'],
      [
        'Mythos Context Annotator',
        'anchors archetypal drivers',
        'Annotations push clarity to Tier-IV certainty.',
      ],
    ],
    'Handwriting & Document Examination': [
      [
        'Signature Pressure Mapper',
        'profiles stroke force',
        'Pressure map matches authentic control set.',
      ],
      [
        'Ink Flow Chronologer',
        'dates layered scripts',
        'Flow chronology isolates midday insertion.',
      ],
      [
        'Margin Behavior Profiler',
        'reads spatial choices',
        'Margins reveal covert messaging attempt.',
      ],
      [
        'Stroke Rhythm Analyzer',
        'gauges neuromuscular tempo',
        'Rhythm variance < 3% from verified sample.',
      ],
      [
        'Document Fiber Sentinel',
        'examines substrate weave',
        'Fiber sentinel cleared contamination risk.',
      ],
      [
        'Compression Artifact Scanner',
        'finds hidden embossing',
        'Embossed glyph recovered for cataloging.',
      ],
    ],
    'Audio & Vocal Forensics': [
      [
        'Vocal Stress Lattice',
        'maps micro tremors',
        'Stress peaks coincide with contested claims.',
      ],
      [
        'Acoustic Provenance Tracker',
        'traces sound origin',
        'Provenance confirmed within 1.2 meters radius.',
      ],
      [
        'Harmonic Intent Profiler',
        'scores inflection shifts',
        'Intent profile signals restored sincerity.',
      ],
      [
        'Noise Floor Sanitizer',
        'filters clandestine hums',
        'Sanitizer cleared subterranean feed loops.',
      ],
      [
        'Transcription Integrity Auditor',
        'validates lexical capture',
        'Integrity > 99% across multi-lingual input.',
      ],
      [
        'Dialect Drift Compass',
        'monitors accent migration',
        'Drift compass stable around native baseline.',
      ],
    ],
    'Online Behavior & OSINT Tracking': [
      [
        'Digital Footprint Correlator',
        'links cross-platform IDs',
        'Correlation ties 47 handles to core actor.',
      ],
      [
        'Timeline Pulse Monitor',
        'flags coordinated drops',
        'Pulse flagged synthetic amplification cluster.',
      ],
      [
        'Persona Shadow Mapper',
        'plots covert sockpuppets',
        'Shadow nodes collapsed via pattern trace.',
      ],
      [
        'Reputation Flux Tracker',
        'scores narrative swings',
        'Flux trending upward after mitigation script.',
      ],
      [
        'Geo-Signal Sentinel',
        'maps locational breadcrumbs',
        'Sentinel locked region within 12km radius.',
      ],
      [
        'Darkstream Link Auditor',
        'validates hidden channels',
        'Auditor greenlit encrypted archive exchange.',
      ],
    ],
    'Simulation & Interrogation Modules': [
      [
        'Scenario Mode Guide Engine',
        'drives adaptive interviews',
        'Guide pivoted to rapport-first cadence.',
      ],
      [
        'Pressure Valve Simulator',
        'tests escalation paths',
        'Sim outputs favor de-escalation branch.',
      ],
      [
        'Truth Path Navigator',
        'aligns questioning arcs',
        'Navigator indicates next query high yield.',
      ],
      [
        'Response Latency Mirror',
        'reflects hesitation cues',
        'Latency mirror flagged coached pauses.',
      ],
      [
        'Compliance Loop Harmonizer',
        'stabilizes answer rhythm',
        'Loop harmonized with empathic prompts.',
      ],
      [
        'Countermeasure Dissolver',
        'disarms rehearsed shields',
        'Dissolver neutralized scripted rebuttal.',
      ],
    ],
    'System Control & Integrity Modules': [
      [
        'Omega Core Control Module',
        'governs master failsafes',
        'Omega core confirms green status.',
      ],
      [
        'Compliance Woven Engine',
        'enforces protocol braids',
        'Engine locked multi-level compliance weave.',
      ],
      [
        'Secure Output Formatter',
        'sanitizes forensic exports',
        'Formatter scrubbed sensitive payload tags.',
      ],
      [
        'Integrity Shield Monitor',
        'surveys tamper vectors',
        'Shield reports zero breach attempts.',
      ],
      [
        'Cross-Domain Integration Framework',
        'syncs hybrid toolchains',
        'Framework synced 27 nodes without drift.',
      ],
      [
        'Adaptive Learning Directive Mapper',
        'routes knowledge loops',
        'Directive mapper accelerated analyst training.',
      ],
    ],
    'Visual Reporting/Intelligence Charts': [
      [
        'Insight Atlas Composer',
        'renders executive overviews',
        'Atlas deployed to field via secure relay.',
      ],
      [
        'Anomaly Ribbon Plotter',
        'highlights deviation arcs',
        'Ribbon intensity emphasizes key pivot.',
      ],
      [
        'Intel Canvas Orchestrator',
        'stages mixed-data boards',
        'Canvas layered satellite + biometric feed.',
      ],
      [
        'Signal Density Cartographer',
        'maps trust gradients',
        'Cartographer shows safe corridor expansion.',
      ],
      [
        'Strategic Brief Builder',
        'condenses findings fast',
        'Brief packaged for midnight council drop.',
      ],
      [
        'Outcome Probability Array',
        'forecasts branch odds',
        'Array indicates 87% success after recalibration.',
      ],
    ],
    'Hybrid/Uncategorized Utilities': [
      [
        'SMS Extractor Directive',
        'decodes legacy text dumps',
        'Directive parsed 6.2M messages overnight.',
      ],
      [
        'CheckPoint Honesty Protocol',
        'issues integrity prompts',
        'Protocol kept disclosures within tolerance.',
      ],
      [
        'Compliance Resonance Stabilizer',
        'soothes resistant subjects',
        'Stabilizer reduced resistance markers 41%.',
      ],
      [
        'Secure Pulse Broadcaster',
        'alerts multi-team squads',
        'Broadcaster synced allied response windows.',
      ],
      [
        'Forensic AI Data Packager',
        'assembles export bundles',
        'Packager sealed dossier with trace ledger.',
      ],
      [
        'Classified Export Handler',
        'governs redacted payloads',
        'Handler verified courier-grade encryption.',
      ],
    ],
    'Data Fusion & Cross-Domain Analytics': [
      [
        'Sensor Confluence Engine',
        'merges dissimilar feeds',
        'Confluence fused LIDAR + testimony threads.',
      ],
      [
        'Adaptive Weight Balancer',
        'redistributes model trust',
        'Weight balancer stabilized consensus rating.',
      ],
      ['Latency-Compensated Relay', 'aligns async inputs', 'Relay trimmed delay gaps below 60ms.'],
      [
        'Evidence Integrity Mesh',
        'scores cross-source agreement',
        'Mesh confidence strengthened to Tier V.',
      ],
      [
        'Predictive Context Generator',
        'supplies situational foresight',
        'Context generator primed new hypothesis lane.',
      ],
      [
        'Hybrid Signature Detector',
        'flags multi-modal anomalies',
        'Detector surfaced obscure linkage cluster.',
      ],
    ],
    'Behavioral Intervention Toolkits': [
      [
        'Trust Arc Reinforcer',
        'boosts restorative feedback',
        'Reinforcer nudged rapport to stabilized arc.',
      ],
      [
        'Sentinel Rapport Anchor',
        'locks empathic gains',
        'Anchor maintained cohesion through conflict.',
      ],
      [
        'Influence Boundary Mapper',
        'guards ethical perimeter',
        'Boundary mapper approved after-action audit.',
      ],
      [
        'Motivation Pulse Dialer',
        'adjusts incentive cadence',
        'Pulse dialer aligned motivators to readiness.',
      ],
      [
        'Equilibrium Reset Console',
        'rebases emotional center',
        'Reset console eased adrenal spikes swiftly.',
      ],
      [
        'Crisis Diffusion Playbook',
        'deploys rapid de-escalation',
        'Playbook neutralized critical flare-ups.',
      ],
    ],
    'Historical Pattern Intelligence': [
      ['Archive Resonance Miner', 'rescues dormant insight', 'Miner unearthed analog case twin.'],
      [
        'Temporal Echo Comparator',
        'aligns generational markers',
        'Echo comparator validated timeline analogs.',
      ],
      [
        'Legacy Behavior Blueprint',
        'maps precedent rituals',
        'Blueprint informs present negotiation stance.',
      ],
      [
        'Cultural Signal Decoder',
        'untangles heritage cues',
        'Decoder linked symbolism to trust gateway.',
      ],
      [
        'Heritage Continuity Tracker',
        'monitors lineage anchors',
        'Continuity tracker kept respect thresholds met.',
      ],
      [
        'Archive Integrity Guardian',
        'guards sealed dossiers',
        'Guardian confirmed authenticity signature.',
      ],
    ],
  }

  const registry = []
  Object.entries(catalog).forEach(([category, entries]) => {
    entries.forEach(([name, focus, analysis]) => {
      registry.push({ name, category, focus, analysis })
      registry.push({
        name: `${name} · Variant-S`,
        category,
        focus,
        analysis: `${analysis} Variant stabilizes silent deployments.`,
      })
      registry.push({
        name: `${name} · Variant-X`,
        category,
        focus,
        analysis: `${analysis} Variant amplifies rapid response throughput.`,
      })
    })
  })
  return registry
}

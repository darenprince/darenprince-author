const portfolioData = {
  products: [
    {
      id: 'crowncode-intelligence-suite',
      name: 'CrownCode Intelligence Suite',
      tagline:
        'Intelligence-grade multimodal analysis engines for forensic profiling and decision support.',
      status: 'Stage 1 Beta',
      statusDetail: 'Round 1 testing',
      category: 'Forensics',
      categoryLabel: 'Forensics / Analytics',
      oneLiner:
        'Intelligence-grade multimodal analysis engines for forensic profiling and decision support.',
      bullets: [
        'Multimodal analysis across text, image, and context inputs',
        'Report outputs in TXT, HTML, or PDF',
        'Offline/air-gapped and web app delivery paths',
      ],
      whatItIs: [
        'A forensic-oriented analysis suite built to translate complex multimodal signals into plain-language decision support.',
        'It is designed for teams that need evidence-weighted reporting without unnecessary data retention or credential storage.',
        'Delivery can be offline/air-gapped or web-based depending on security posture.',
      ],
      whoFor: [
        'Investigators and analysts needing multimodal synthesis',
        'Decision-makers who require exportable reports',
        'Teams with strict privacy or air-gapped mandates',
      ],
      capabilities: [
        'Multimodal analysis across text, images, and metadata',
        'Evidence-weighted report generation',
        'TXT, HTML, and PDF output formats',
        'Offline/air-gapped deployment option',
        'Web app delivery option',
        'Privacy-first posture with minimal retention',
      ],
      not: [
        'Not a diagnostic or predictive tool',
        'Not automated law enforcement decisioning',
        'Not a replacement for human review',
      ],
      nextGate: 'Complete Round 1 beta testing with validated reporting outputs.',
      monetization: 'TBD',
      value: '$420K ARR',
      growthLabel: '+22% QoQ',
      growth: [28, 36, 42, 48, 58],
      readiness: 78,
      metrics: [
        { label: 'Signal coverage', value: '92%', icon: 'eye' },
        { label: 'Case cycles', value: '-38%', icon: 'bolt' },
        { label: 'Analyst seats', value: '14', icon: 'users' },
      ],
      keywords: ['forensics', 'multimodal', 'reports', 'offline', 'air-gapped'],
      priority: 5,
    },
    {
      id: 'crowncam',
      name: 'CrownCam',
      tagline: 'Rule Your View.',
      status: 'Beta',
      statusDetail: 'Beta testing',
      category: 'Security',
      categoryLabel: 'Security / Video',
      oneLiner: 'Turn any device into a browser-based security cam with instant live viewing.',
      bullets: [
        'Real-time camera deployment from any device',
        'Link or QR setup in seconds',
        'Web-based live viewing and sharing',
      ],
      whatItIs: [
        'A browser-first camera platform that turns phones, tablets, or desktops into live security feeds.',
        'Setup is handled through shareable links or QR pairing, avoiding complicated installs.',
        'Designed for rapid deployment and clean handoff to trusted viewers.',
      ],
      whoFor: [
        'Teams needing temporary or rapid security coverage',
        'Creators and operators running multi-view setups',
        'Organizations wanting browser-based camera access',
      ],
      capabilities: [
        'Real-time camera activation and streaming',
        'Link or QR pairing workflow',
        'Web-based live viewing',
        'Device-agnostic deployment',
        'Simple handoff to trusted viewers',
        'Low-friction setup for temporary coverage',
      ],
      not: [
        'Not a stealth surveillance tool',
        'Not a hardware-locked camera system',
        'Not a promise of permanent storage',
      ],
      nextGate: 'Stabilize beta streaming and permissions workflows.',
      monetization: 'TBD',
      value: '$180K ARR',
      growthLabel: '+28% QoQ',
      growth: [12, 18, 22, 31, 40],
      readiness: 72,
      metrics: [
        { label: 'Active cams', value: '220', icon: 'camera' },
        { label: 'Avg uptime', value: '99.1%', icon: 'shield' },
        { label: 'Deploy time', value: '60s', icon: 'bolt' },
      ],
      keywords: ['camera', 'security', 'live', 'qr', 'stream'],
      priority: 4,
    },
    {
      id: 'crown-sos',
      name: 'Crown SOS',
      tagline: 'When chaos strikes, Crown SOS answers.',
      status: 'Beta',
      statusDetail: 'Prototype complete; beta testing in progress',
      category: 'Security',
      categoryLabel: 'Safety / Emergency',
      oneLiner: 'Crisis response and emergency coordination with live evidence capture.',
      bullets: [
        'Live SOS alerts with trusted routing',
        'Evidence capture for photo/video/audio',
        'Proof-of-life check-ins and device info',
      ],
      whatItIs: [
        'A crisis response toolkit that triggers live alerts and captures verified evidence in the moment.',
        'It connects trusted contacts with live context: device data, location context, and media evidence.',
        'The focus is coordination and proof-of-life, not replacement for emergency services.',
      ],
      whoFor: [
        'Individuals in high-risk environments',
        'Teams coordinating field safety',
        'Families or partners who need rapid proof-of-life',
      ],
      capabilities: [
        'Live SOS alerts to trusted contacts',
        'Tracking and device context signals',
        'Photo, video, and audio evidence capture',
        'Streaming to designated recipients',
        'Proof-of-life check-ins with escalation paths',
        'Rapid trigger workflows',
      ],
      not: [
        'Not a 911 replacement',
        'Not a passive tracking product for others',
        'Not a guarantee of emergency response',
      ],
      nextGate: 'Complete beta testing and validate evidence-sharing flows.',
      monetization: 'TBD',
      value: '$260K ARR',
      growthLabel: '+19% QoQ',
      growth: [15, 22, 30, 36, 44],
      readiness: 70,
      metrics: [
        { label: 'Alert success', value: '97%', icon: 'alert' },
        { label: 'Avg response', value: '42s', icon: 'timer' },
        { label: 'Live nodes', value: '38', icon: 'network' },
      ],
      keywords: ['sos', 'safety', 'emergency', 'evidence', 'alerts'],
      priority: 4,
    },
    {
      id: 'justus-chat',
      name: 'JustUs.chat',
      tagline: 'Click → Chat → Vanish.',
      status: 'Concept',
      statusDetail: 'Concept defined',
      category: 'Privacy',
      categoryLabel: 'Privacy / Messaging',
      oneLiner: 'Ephemeral, encrypted chat rooms with zero accounts and instant teardown.',
      bullets: [
        'No accounts or profiles',
        'Ephemeral rooms that self-destruct',
        'Client-side encryption by design',
      ],
      whatItIs: [
        'A frictionless private chat layer where conversations start instantly and vanish on schedule.',
        'Rooms are ephemeral, encrypted client-side, and designed to disappear without retention.',
        'The interface can adopt discreet UI facades for privacy-sensitive environments.',
      ],
      whoFor: [
        'People needing one-off private conversations',
        'Teams handling short-lived sensitive topics',
        'Users who do not want accounts or profiles',
      ],
      capabilities: [
        'Instant room creation without sign-up',
        'Client-side encryption',
        'Self-destructing rooms',
        'Incognito UI facades',
        'Link-based access',
        'Minimal retention posture',
      ],
      not: [
        'Not a persistent messaging archive',
        'Not a social network',
        'Not a compliance logging tool',
      ],
      nextGate: 'Finalize encryption model and UX for secure room teardown.',
      monetization: 'TBD',
      value: '$60K ARR',
      growthLabel: '+11% QoQ',
      growth: [5, 8, 10, 12, 18],
      readiness: 42,
      metrics: [
        { label: 'Room burn', value: '24h', icon: 'timer' },
        { label: 'Encryption', value: '100%', icon: 'lock' },
        { label: 'Avg sessions', value: '240/wk', icon: 'chat' },
      ],
      keywords: ['chat', 'ephemeral', 'privacy', 'encrypted', 'vanish'],
      priority: 3,
    },
    {
      id: 'lumilogix',
      name: 'LumiLogix',
      tagline: 'AI-powered emotionally intelligent marketing engine.',
      status: 'Concept',
      statusDetail: 'Concept defined',
      category: 'Marketing',
      categoryLabel: 'Marketing / Creative AI',
      oneLiner: 'Emotion-aware marketing intelligence with ethical guardrails.',
      bullets: [
        'Emotional analytics and archetype mapping',
        'Sensory language generation for campaigns',
        'Ethical emotion protocol baked in',
      ],
      whatItIs: [
        'A marketing intelligence engine focused on emotionally intelligent messaging, not raw hype.',
        'It maps audience archetypes and helps craft sensory language with ethical boundaries.',
        'The intent is to sharpen messaging clarity while avoiding manipulative tactics.',
      ],
      whoFor: [
        'Brand teams seeking emotionally grounded messaging',
        'Creative strategists who need archetype mapping',
        'Founders seeking clarity on tone and positioning',
      ],
      capabilities: [
        'Emotional analytics models',
        'Archetype mapping',
        'Sensory language generation',
        'Ethical emotion protocol guidance',
        'Messaging clarity audits',
        'Audience resonance summaries',
      ],
      not: [
        'Not a replacement for brand strategy',
        'Not a manipulative growth hack tool',
        'Not a guarantee of conversion',
      ],
      nextGate: 'Validate the ethical emotion protocol and output formats.',
      monetization: 'TBD',
      value: '$90K ARR',
      growthLabel: '+14% QoQ',
      growth: [6, 9, 14, 18, 25],
      readiness: 38,
      metrics: [
        { label: 'Archetypes', value: '12', icon: 'map' },
        { label: 'Campaign lift', value: '+16%', icon: 'trend' },
        { label: 'Ethics gate', value: '100%', icon: 'check' },
      ],
      keywords: ['marketing', 'emotion', 'archetype', 'creative', 'ai'],
      priority: 2,
    },
    {
      id: 'pic-detective',
      name: 'Pic Detective',
      tagline: 'AI that extracts deep intelligence from photos.',
      status: 'Concept',
      statusDetail: 'Concept defined',
      category: 'Forensics',
      categoryLabel: 'Forensics / Image Intelligence',
      oneLiner: 'Image intelligence reports with privacy-first, local analysis options.',
      bullets: [
        'Environment inventory and spatial mapping',
        'Behavioral inference flags (with caution)',
        'Downloadable reports with privacy controls',
      ],
      whatItIs: [
        'An image intelligence system focused on extracting structured context from photos.',
        'Outputs prioritize clear reporting and controlled inference flags rather than hard claims.',
        'Built with privacy-first and optional local/offline analysis pathways.',
      ],
      whoFor: [
        'Investigators who need structured photo context',
        'Analysts seeking spatial and environment inventory',
        'Teams that require privacy-first image processing',
      ],
      capabilities: [
        'Environment inventory extraction',
        'Spatial mapping summaries',
        'Behavioral inference flags with disclaimers',
        'Downloadable report outputs',
        'Local/offline analysis options',
        'Privacy-first processing defaults',
      ],
      not: [
        'Not definitive behavioral profiling',
        'Not facial recognition or identity matching',
        'Not a replacement for human analysis',
      ],
      nextGate: 'Define scope guardrails for inference flags and reporting.',
      monetization: 'TBD',
      value: '$110K ARR',
      growthLabel: '+17% QoQ',
      growth: [8, 11, 14, 20, 26],
      readiness: 40,
      metrics: [
        { label: 'Images analyzed', value: '3.4k', icon: 'camera' },
        { label: 'Report clarity', value: '4.7/5', icon: 'eye' },
        { label: 'Local mode', value: '100%', icon: 'lock' },
      ],
      keywords: ['image', 'forensics', 'analysis', 'reports', 'offline'],
      priority: 2,
    },
    {
      id: 'crown-watchtower',
      name: 'Crown WatchTower',
      tagline: 'Forensic-grade network and environmental signal intelligence.',
      status: 'Concept',
      statusDetail: 'Concept defined',
      category: 'Security',
      categoryLabel: 'Security / Signal Intelligence',
      oneLiner: 'Network posture and signal intelligence built for clear environmental visibility.',
      bullets: [
        'Network posture and signal scanning concepts',
        'Device fingerprinting concept',
        'Environmental visibility with clear reporting',
      ],
      whatItIs: [
        'A concept for signal intelligence that maps nearby networks and environmental signals.',
        'Designed to provide clear situational awareness without implying interception or exploitation.',
        'Device fingerprinting concepts are kept general and transparent.',
      ],
      whoFor: [
        'Security teams needing high-level signal awareness',
        'Operators who want environmental visibility',
        'Analysts building threat context models',
      ],
      capabilities: [
        'Network posture mapping (concept)',
        'Signal scanning summaries (concept)',
        'Device fingerprinting concept notes',
        'Plain-language environmental reports',
        'Generalized anomaly cues',
        'Configurable scope definitions',
      ],
      not: [
        'Not an interception toolkit',
        'Not an exploit or offensive security tool',
        'Not a promise of full signal coverage',
      ],
      nextGate: 'Define scope boundaries and initial prototype requirements.',
      monetization: 'TBD',
      value: '$75K ARR',
      growthLabel: '+9% QoQ',
      growth: [4, 6, 9, 12, 18],
      readiness: 34,
      metrics: [
        { label: 'Signal zones', value: '6', icon: 'network' },
        { label: 'Anomaly cues', value: '18', icon: 'alert' },
        { label: 'Scan latency', value: '2m', icon: 'timer' },
      ],
      keywords: ['signal', 'network', 'security', 'visibility'],
      priority: 2,
    },
    {
      id: 'hotag',
      name: 'HoTag',
      tagline: 'A satirical tracking-tag brand with viral packaging and ad creatives.',
      status: 'Concept',
      statusDetail: 'Concept defined',
      category: 'Media',
      categoryLabel: 'Consumer / Satire Brand',
      oneLiner: 'Parody DTC tracking tags with mock packaging and campaign concepts.',
      bullets: [
        'Parody DTC concept and branding',
        'Viral packaging mockups',
        'Red/black brand energy and ad concepts',
      ],
      whatItIs: [
        'A satire-first consumer brand concept designed to critique tracking culture with sharp packaging and creative.',
        'The product is the brand concept, not a functional tracking device.',
      ],
      whoFor: [
        'Creative collaborators exploring satire brands',
        'Marketing teams looking for viral concepts',
        'Brand strategists testing cultural narratives',
      ],
      capabilities: [
        'Parody DTC brand system',
        'Packaging and creative mockups',
        'Campaign concept development',
        'Brand tone and copy direction',
        'Visual system guidelines',
        'Concept launch planning',
      ],
      not: [
        'Not an actual tracking device',
        'Not a safety product',
        'Not a functional hardware release',
      ],
      nextGate: 'Finalize brand mockups and packaging prototypes.',
      monetization: 'TBD',
      value: '$25K ARR',
      growthLabel: '+6% QoQ',
      growth: [2, 4, 5, 7, 9],
      readiness: 20,
      metrics: [
        { label: 'Creative drops', value: '12', icon: 'spark' },
        { label: 'Audience reach', value: '180k', icon: 'users' },
        { label: 'Launch kits', value: '3', icon: 'box' },
      ],
      keywords: ['satire', 'brand', 'packaging', 'concept'],
      priority: 1,
    },
    {
      id: 'crowncast',
      name: 'CrownCast',
      tagline: 'Daily directional reflection engine—psychology, not superstition.',
      status: 'Concept',
      statusDetail: 'Concept defined',
      category: 'Media',
      categoryLabel: 'Media / Daily Insight',
      oneLiner: 'Daily reflective insights grounded in self-awareness and agency.',
      bullets: [
        'Daily directional reflections',
        'Grounded in psychology and agency',
        'Intimate tone without superstition',
      ],
      whatItIs: [
        'A daily reflection engine that frames insights through psychology and self-awareness.',
        'It avoids superstition or predictive claims and focuses on grounding, agency, and reflection.',
      ],
      whoFor: [
        'Readers who want reflective daily prompts',
        'Audiences seeking agency-driven insight',
        'People who prefer psychology over superstition',
      ],
      capabilities: [
        'Daily insight generation',
        'Agency-centered language',
        'Reflection prompts',
        'Tone controls for intimacy',
        'Non-predictive positioning',
        'Content scheduling concepts',
      ],
      not: [
        'Not astrology or superstition',
        'Not a mental health treatment',
        'Not predictive forecasting',
      ],
      nextGate: 'Define content structure and daily cadence format.',
      monetization: 'TBD',
      value: '$40K ARR',
      growthLabel: '+8% QoQ',
      growth: [3, 5, 6, 8, 11],
      readiness: 22,
      metrics: [
        { label: 'Daily listens', value: '6.1k', icon: 'audio' },
        { label: 'Retention', value: '64%', icon: 'trend' },
        { label: 'Prompts', value: '365', icon: 'calendar' },
      ],
      keywords: ['daily', 'reflection', 'media', 'psychology'],
      priority: 1,
    },
    {
      id: 'presence-architect',
      name: 'Presence Architect',
      tagline:
        'A system that engineers social presence through restraint, calm confidence, and consistency.',
      status: 'Prototype',
      statusDetail: 'Prototype available',
      category: 'Relationship Tools',
      categoryLabel: 'Relationship / Presence',
      oneLiner: 'A structured system for presence-driven social positioning under Game On.',
      bullets: [
        'Posting calendar with restraint rules',
        'DM playbooks for grounded engagement',
        'Content filters and adjustment rules',
      ],
      whatItIs: [
        'A prototype framework under Game On that systematizes social presence with calm, consistent outputs.',
        'It blends content pacing, DM playbooks, and adjustment rules to avoid noise and overexposure.',
      ],
      whoFor: [
        'Creators who want structured presence without hype',
        'Professionals needing consistent social signals',
        'Teams supporting Game On brand strategy',
      ],
      capabilities: [
        'Presence-oriented content calendar',
        'DM playbooks and scripts',
        'Content filter rules',
        'Adjustment rules for timing and tone',
        'Restraint frameworks',
        'Audience signal tracking concepts',
      ],
      not: [
        'Not a growth hack playbook',
        'Not guaranteed virality',
        'Not a replacement for brand strategy',
      ],
      nextGate: 'Validate prototype with structured pilot cohort.',
      monetization: 'TBD',
      value: '$130K ARR',
      growthLabel: '+18% QoQ',
      growth: [9, 14, 20, 26, 33],
      readiness: 60,
      metrics: [
        { label: 'Playbooks', value: '18', icon: 'guide' },
        { label: 'Signal lift', value: '+24%', icon: 'trend' },
        { label: 'Cohorts', value: '3', icon: 'users' },
      ],
      keywords: ['presence', 'relationship', 'game on', 'social'],
      priority: 3,
    },
    {
      id: 'couples-connection-playground',
      name: 'Couples Connection Playground',
      tagline: 'Interactive couples connection games and repair tools.',
      status: 'Concept',
      statusDetail: 'Concept defined',
      category: 'Relationship Tools',
      categoryLabel: 'Relationship Tools',
      oneLiner: 'Playful connection and repair tools designed for real conversations.',
      bullets: [
        'Playful check-ins and prompts',
        'Communication games and exercises',
        'Conflict repair tools',
      ],
      whatItIs: [
        'A concept for interactive games and tools that help couples reconnect and repair communication.',
        'The experience is designed to be playful, structured, and focused on real conversation.',
      ],
      whoFor: [
        'Couples seeking light structure for connection',
        'Partners rebuilding communication habits',
        'Game On audience looking for guided tools',
      ],
      capabilities: [
        'Guided check-ins and prompts',
        'Communication game concepts',
        'Intimacy modes',
        'Conflict repair exercises',
        'Session pacing suggestions',
        'Playful interaction patterns',
      ],
      not: [
        'Not therapy or counseling',
        'Not a replacement for professional help',
        'Not a promise of outcomes',
      ],
      nextGate: 'Define core game loops and prototype interaction flows.',
      monetization: 'TBD',
      value: '$55K ARR',
      growthLabel: '+12% QoQ',
      growth: [4, 7, 9, 12, 15],
      readiness: 30,
      metrics: [
        { label: 'Sessions', value: '420/mo', icon: 'heart' },
        { label: 'Completion', value: '74%', icon: 'check' },
        { label: 'Exercises', value: '30', icon: 'spark' },
      ],
      keywords: ['couples', 'relationship', 'games', 'connection'],
      priority: 1,
    },
  ],
  frameworks: [
    {
      name: 'Presence Architect',
      status: 'Prototype',
      description:
        'A Game On upsell framework that codifies social presence through restraint, calm confidence, and consistency.',
      bullets: ['Posting cadence rules', 'DM playbooks', 'Content filters and adjustment rules'],
    },
    {
      name: 'Fuck It Mode',
      status: 'Concept',
      description:
        'A communication and insight framework focused on reclaiming clarity through boundary setting and decisive action.',
      bullets: ['Boundary clarity', 'Reset scripts', 'Momentum cues'],
    },
  ],
  // Cover paths to drop in if needed:
  // assets/images/unshakeable-cover.png
  // assets/images/couples-connection-playground-cover.png
  books: [
    {
      name: 'Game On! Master the Conversation & Win Her Heart',
      status: 'Published',
      description: 'Published title anchored in Game On principles and conversational clarity.',
      cover: 'assets/images/game-on-main-cover.png',
      actionLabel: 'Buy book',
      actionHref: 'book.html',
    },
    {
      name: 'Unshakeable',
      status: 'In progress',
      description: 'In-progress manuscript focused on resilience and steadiness under pressure.',
      cover: '',
      actionLabel: 'Get updates',
      actionType: 'modal',
      actionTab: 'beta',
    },
    {
      name: 'Couples Connection Playground',
      status: 'Concept',
      description: 'Paid upsell concept under Game On, focused on interactive connection tools.',
      cover: '',
      actionLabel: 'Join waitlist',
      actionType: 'modal',
      actionTab: 'beta',
    },
  ],
  statuses: [
    {
      name: 'Concept',
      meaning: 'Idea defined, not built.',
      nextGate: 'Define scope and prototype requirements.',
    },
    {
      name: 'Prototype',
      meaning: 'Working demo exists with limited scope.',
      nextGate: 'Validate with real-world users and tighten scope.',
    },
    {
      name: 'Beta',
      meaning: 'Product usable by testers, not hardened.',
      nextGate: 'Stabilize core workflows and resolve critical feedback.',
    },
    {
      name: 'Stage 1 Beta',
      meaning: 'First structured beta with round 1 testing.',
      nextGate: 'Complete Round 1 testing and confirm readiness criteria.',
    },
    {
      name: 'Live',
      meaning: 'Publicly available and maintained.',
      nextGate: 'Maintain reliability and scale responsibly.',
    },
  ],
}

const iconMap = {
  alert: 'warning-circle',
  audio: 'waveform',
  bolt: 'lightning',
  book: 'book',
  box: 'package',
  calendar: 'calendar',
  camera: 'camera',
  chat: 'chat-circle-text',
  check: 'check-circle',
  compass: 'compass',
  crown: 'crown-simple',
  eye: 'eye',
  filter: 'faders',
  framework: 'tree-structure',
  grid: 'squares-four',
  guide: 'map-trifold',
  heart: 'heart',
  lab: 'flask',
  lock: 'lock',
  map: 'map-trifold',
  network: 'network',
  shield: 'shield-check',
  signal: 'chart-line-up',
  spark: 'sparkle',
  status: 'activity',
  timer: 'timer',
  trend: 'trend-up',
  users: 'users',
}

const statusOrder = {
  Live: 5,
  'Stage 1 Beta': 4,
  Beta: 3,
  Prototype: 2,
  Concept: 1,
}

const categoryOptions = [
  'All',
  'Security',
  'Privacy',
  'Marketing',
  'Forensics',
  'Media',
  'Relationship Tools',
  'Frameworks',
]
const statusOptions = ['All', 'Concept', 'Prototype', 'Beta', 'Stage 1 Beta', 'Live']

const dom = {
  productGrid: document.getElementById('product-grid'),
  statusFilter: document.getElementById('status-filter'),
  categoryFilter: document.getElementById('category-filter'),
  searchInput: document.getElementById('search-input'),
  sortFilter: document.getElementById('sort-filter'),
  statStrip: document.getElementById('stat-strip'),
  heroCard: document.getElementById('hero-card'),
  frameworkList: document.getElementById('framework-list'),
  booksGrid: document.getElementById('books-grid'),
  statusTable: document.getElementById('status-table'),
  modal: document.getElementById('beta-modal'),
  productModal: document.getElementById('product-modal'),
  productModalBody: document.getElementById('product-modal-body'),
  productModalTitle: document.getElementById('product-modal-title'),
  intakeForm: document.getElementById('intake-form'),
  formSuccess: document.getElementById('form-success'),
  formNote: document.getElementById('form-note'),
  roleField: document.getElementById('role-field'),
  tabButtons: document.querySelectorAll('.tab-btn'),
  tabPanels: document.querySelectorAll('.tab-panel'),
  themeToggle: document.getElementById('theme-toggle'),
  navToggle: document.querySelector('.nav-toggle'),
  navLinks: document.getElementById('primary-navigation'),
  filterToggle: document.getElementById('filter-toggle'),
  filterPanel: document.getElementById('filter-panel'),
}

const formatCount = (value, label, icon) => ({ value, label, icon })

const iconMarkup = (icon) => {
  const iconName = iconMap[icon]
  return iconName ? `<i class="ph ph-${iconName} icon-inline" aria-hidden="true"></i>` : ''
}

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

const animateCounts = (container = document) => {
  container.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count)
    if (Number.isNaN(target)) {
      return
    }
    const suffix = el.dataset.suffix || ''
    const prefix = el.dataset.prefix || ''
    const duration = 1200
    let start = null

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const value = Math.round(target * progress)
      el.textContent = `${prefix}${value}${suffix}`
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        el.textContent = `${prefix}${target}${suffix}`
      }
    }

    requestAnimationFrame(step)
  })
}

const renderSignalChart = (values = []) => {
  const bars = values.length ? values : [18, 24, 30, 28, 36, 42, 38]
  const max = Math.max(...bars, 1)
  const min = Math.min(...bars)
  const avg = Math.round(bars.reduce((sum, val) => sum + val, 0) / bars.length)
  return `
    <div class="signal-chart" role="img" aria-label="Revenue signal trend with values ${bars.join(', ')}">
      ${bars
        .map(
          (val, index) => `
            <span style="height:${Math.max(18, (val / max) * 100)}%; --bar-index:${index};" data-value="${val}">
              <em>${val}</em>
            </span>
          `
        )
        .join('')}
    </div>
    <div class="signal-chart-meta">
      <span>Low <strong>${min}</strong></span>
      <span>Avg <strong>${avg}</strong></span>
      <span>High <strong>${max}</strong></span>
    </div>
  `
}

const renderInfographicBars = (heights = [30, 48, 42, 66, 55, 70]) => `
  <div class="infographic-placeholder" aria-hidden="true">
    ${heights
      .map((height, index) => `<span style="height:${height}%; --bar-index:${index};"></span>`)
      .join('')}
  </div>
`

const renderHeroStats = () => {
  const total = portfolioData.products.length
  const beta = portfolioData.products.filter((item) =>
    ['Beta', 'Stage 1 Beta'].includes(item.status)
  ).length
  const concepts = portfolioData.products.filter((item) => item.status === 'Concept').length
  const heroProduct = portfolioData.products.find((item) => item.status === 'Stage 1 Beta')
  const stats = [
    formatCount(total, 'Total products', 'grid'),
    formatCount(beta, 'Active beta builds', 'bolt'),
    formatCount(concepts, 'Concepts in pipeline', 'spark'),
  ]

  dom.statStrip.innerHTML = stats
    .map(
      (stat) => `
        <div class="stat-card">
          ${iconMarkup(stat.icon)}
          <div class="eyebrow">${stat.label}</div>
          <div class="stat-value" data-count="${stat.value}">0</div>
        </div>
      `
    )
    .join('')

  dom.heroCard.innerHTML = `
    <div class="hero-insight__header">
      <span class="eyebrow">Applied intelligence</span>
      <span class="badge">Most ready</span>
    </div>
    <h3>${heroProduct?.name || 'CrownCode Intelligence Suite'}</h3>
    <p class="lede">CrownCode Intelligence Suite is the most-ready system in the portfolio right now.</p>
    ${renderInfographicBars([28, 40, 55, 62, 48, 70])}
    <span class="infographic-caption">Readiness signal (portfolio-weighted)</span>
    <div class="hero-metrics">
      <span class="metric-chip">Stage: ${heroProduct?.status || 'Stage 1 Beta'}</span>
      <span class="metric-chip">Focus: ${heroProduct?.categoryLabel || 'Forensics / Analytics'}</span>
      <span class="metric-chip">Next gate: ${heroProduct?.statusDetail || 'Round 1 testers'}</span>
    </div>
    <div class="hero-callout">
      <strong>Portfolio logic</strong>
      <p>Most ready first, then most strategic. Each product lists the single gate to advance.</p>
    </div>
  `

  animateCounts(dom.statStrip)
}

const buildFilters = () => {
  dom.statusFilter.innerHTML = statusOptions
    .map((status) => `<option value="${status}">${status}</option>`)
    .join('')
  dom.categoryFilter.innerHTML = categoryOptions
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join('')
}

const renderProducts = () => {
  const statusValue = dom.statusFilter.value
  const categoryValue = dom.categoryFilter.value
  const query = dom.searchInput.value.trim().toLowerCase()
  const sortValue = dom.sortFilter.value

  let filtered = [...portfolioData.products]

  if (statusValue !== 'All') {
    filtered = filtered.filter((item) => item.status === statusValue)
  }

  if (categoryValue !== 'All') {
    filtered = filtered.filter((item) => item.category === categoryValue)
  }

  if (query) {
    filtered = filtered.filter((item) => {
      const haystack = [
        item.name,
        item.tagline,
        item.oneLiner,
        item.categoryLabel,
        item.statusDetail,
        ...(item.keywords || []),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }

  if (sortValue === 'ready') {
    filtered.sort(
      (a, b) => statusOrder[b.status] - statusOrder[a.status] || b.priority - a.priority
    )
  } else if (sortValue === 'strategic') {
    filtered.sort(
      (a, b) => b.priority - a.priority || statusOrder[b.status] - statusOrder[a.status]
    )
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  }

  dom.productGrid.innerHTML = filtered
    .map((product) => {
      const metrics = (product.metrics || [])
        .map(
          (metric) => `
            <div class="metric">
              ${iconMarkup(metric.icon)}
              <div>
                <div class="metric-value">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
              </div>
            </div>
          `
        )
        .join('')
      const initials = getInitials(product.name)
      const mediaSrc = product.media || `assets/brand/products/${product.id}-hero.png`
      const categoryPills = Array.from(
        new Set([product.categoryLabel, product.category].filter(Boolean))
      )
      const readinessMarkup =
        typeof product.readiness === 'number'
          ? `
          <div class="readiness">
            <div class="readiness-header">
              <span>Readiness score</span>
              <strong class="count-up" data-count="${product.readiness}" data-suffix="%">0%</strong>
            </div>
            <div class="readiness-bar" role="progressbar" aria-valuenow="${product.readiness}" aria-valuemin="0" aria-valuemax="100">
              <span style="width:${product.readiness}%"></span>
            </div>
          </div>
        `
          : ''

      return `
        <article class="product-card" data-status="${product.status}" data-category="${product.category}" data-product-id="${product.id}">
          <div class="product-header">
            <div class="product-icon" data-fallback="${product.name}">
              <img src="assets/brand/products/${product.id}.png" alt="${product.name} icon" loading="lazy">
              <span>${product.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 3)}</span>
            </div>
            <div>
              <h3>${product.name}</h3>
              <div class="product-tags">
                <span class="tag status-badge" data-status="${product.status}">${product.status}</span>
                ${categoryPills.map((pill) => `<span class="tag">${pill}</span>`).join('')}
              </div>
            </div>
          </div>
          <div class="card-media" data-fallback="${initials}">
            <img src="${mediaSrc}" alt="${product.name} preview" loading="lazy">
            <div class="media-placeholder">${initials}</div>
          </div>
          <p class="one-liner">${product.oneLiner}</p>
          <div class="signal-panel">
            <div class="signal-label">
              <span>Revenue signal</span>
              ${iconMarkup('framework')}
            </div>
            <div class="signal-meta">
              <strong>${product.value}</strong>
              <small>${product.growthLabel}</small>
            </div>
            ${renderSignalChart(product.growth || [])}
          </div>
          <div class="product-metrics">
            ${metrics}
          </div>
          ${readinessMarkup}
          <ul>
            ${product.bullets.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <div class="product-footer">
            <span class="muted">Next gate: ${product.nextGate}</span>
            <button class="ghost-btn ghost-btn--small" type="button" data-open-product="${product.id}">View brief</button>
          </div>
        </article>
      `
    })
    .join('')

  if (!filtered.length) {
    dom.productGrid.innerHTML = '<p>No products match the current filters.</p>'
  }

  animateCounts(dom.productGrid)

  document.querySelectorAll('.product-icon img').forEach((img) => {
    img.addEventListener('error', () => {
      const parent = img.closest('.product-icon')
      parent.classList.add('is-fallback')
    })
  })

  document.querySelectorAll('.card-media img').forEach((img) => {
    img.addEventListener('error', () => {
      const parent = img.closest('.card-media')
      if (parent) {
        parent.classList.add('is-fallback')
      }
    })
  })

  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      const target = event.target
      if (target.closest('[data-open-product]')) {
        return
      }
      const productId = card.dataset.productId
      if (productId) {
        openProductModal(productId)
      }
    })
  })

  document.querySelectorAll('[data-open-product]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation()
      const productId = button.dataset.openProduct
      if (productId) {
        openProductModal(productId)
      }
    })
  })
}

const renderFrameworks = () => {
  dom.frameworkList.innerHTML = portfolioData.frameworks
    .map(
      (framework) => `
      <div class="framework-card">
        <div class="card-header">
          ${iconMarkup('framework')}
          <div class="product-tags">
            <span class="tag status-badge" data-status="${framework.status}">${framework.status}</span>
          </div>
        </div>
        <h3>${framework.name}</h3>
        <p>${framework.description}</p>
        <ul>
          ${framework.bullets.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `
    )
    .join('')
}

const renderBooks = () => {
  dom.booksGrid.innerHTML = portfolioData.books
    .map((book) => {
      const initials = getInitials(book.name)
      const coverMarkup = `
          ${book.cover ? `<img src="${book.cover}" alt="${book.name} cover" loading="lazy">` : ''}
          <div class="cover-placeholder"><strong>${initials}</strong><small>Cover pending</small></div>
        `
      const actionMarkup = book.actionLabel
        ? book.actionType === 'modal'
          ? `<button class="ghost-btn ghost-btn--small" type="button" data-open-modal data-modal-tab="${book.actionTab || 'beta'}" data-interest="${book.name}">${book.actionLabel}</button>`
          : `<a class="ghost-btn ghost-btn--small" href="${book.actionHref || '#'}">${book.actionLabel}</a>`
        : ''
      return `
      <div class="book-card">
        <div class="book-cover ${book.cover ? 'has-cover' : 'is-fallback'}">
          ${coverMarkup}
        </div>
        <div class="book-meta">
          <div class="card-header">
            ${iconMarkup('book')}
            <div class="product-tags">
              <span class="tag status-badge" data-status="${book.status}">${book.status}</span>
            </div>
          </div>
          <h3>${book.name}</h3>
          <p>${book.description}</p>
          <div class="book-actions">${actionMarkup}</div>
        </div>
      </div>
    `
    })
    .join('')

  document.querySelectorAll('.book-cover img').forEach((img) => {
    img.addEventListener('error', () => {
      const parent = img.closest('.book-cover')
      if (parent) {
        parent.classList.remove('has-cover')
        parent.classList.add('is-fallback')
      }
    })
  })
}

const renderStatusTable = () => {
  dom.statusTable.innerHTML = portfolioData.statuses
    .map(
      (status) => `
        <tr>
          <th scope="row"><span class="status-badge status-badge--table" data-status="${status.name}">${status.name}</span></th>
          <td>${status.meaning}</td>
          <td>${status.nextGate}</td>
        </tr>
      `
    )
    .join('')
}

const tabLabels = {
  beta: 'Beta Tester',
  developer: 'Developer',
  partner: 'Partner / Investor',
}

const setActiveTab = (tabId = 'beta') => {
  dom.tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-selected', String(isActive))
  })
  dom.tabPanels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.id === `tab-${tabId}`)
  })
  if (dom.roleField) {
    dom.roleField.value = tabLabels[tabId] || 'Beta Tester'
  }
}

const resetIntakeForm = () => {
  dom.intakeForm.reset()
  dom.intakeForm.hidden = false
  dom.formSuccess.hidden = true
  dom.formNote.textContent = ''
  setActiveTab('beta')
}

const openModal = (modal) => {
  if (!modal) return
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  const firstInput = modal.querySelector('input, select, textarea, button')
  if (firstInput) {
    firstInput.focus()
  }
}

const closeModal = (modal) => {
  if (!modal) return
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  if (modal === dom.modal) {
    resetIntakeForm()
  }
}

const openBetaModal = (tabId = 'beta', interest = '') => {
  resetIntakeForm()
  setActiveTab(tabId)
  if (interest) {
    const interestInputs = dom.intakeForm.querySelectorAll('input[name="interests"]')
    interestInputs.forEach((input) => {
      if (input.value.toLowerCase() === interest.toLowerCase()) {
        input.checked = true
      }
    })
  }
  openModal(dom.modal)
}

const renderProductModal = (product) => {
  const readinessMarkup =
    typeof product.readiness === 'number'
      ? `
        <div class="readiness">
          <div class="readiness-header">
            <span>Readiness score</span>
            <strong class="count-up" data-count="${product.readiness}" data-suffix="%">0%</strong>
          </div>
          <div class="readiness-bar" role="progressbar" aria-valuenow="${product.readiness}" aria-valuemin="0" aria-valuemax="100">
            <span style="width:${product.readiness}%"></span>
          </div>
        </div>
      `
      : ''

  return `
    <div class="product-modal__grid">
      <div class="product-modal__summary">
        <div class="product-tags">
          <span class="tag status-badge" data-status="${product.status}">${product.status}</span>
          <span class="tag">${product.categoryLabel}</span>
        </div>
        <p>${product.tagline}</p>
        <div class="signal-panel">
          <div class="signal-label">
            <span>Revenue signal</span>
            ${iconMarkup('framework')}
          </div>
          <div class="signal-meta">
            <strong>${product.value}</strong>
            <small>${product.growthLabel}</small>
          </div>
          ${renderSignalChart(product.growth || [])}
        </div>
        ${readinessMarkup}
      </div>
      <div class="detail-grid">
        <div>
          <h4>What it is</h4>
          ${product.whatItIs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
        </div>
        <div>
          <h4>Who it’s for</h4>
          <ul>
            ${product.whoFor.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4>Core capabilities</h4>
          <ul>
            ${product.capabilities.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="detail-box">
          <h4>What it is NOT</h4>
          <ul>
            ${product.not.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="detail-box">
          <h4>Current status</h4>
          <p><strong>${product.status}</strong> — ${product.statusDetail}</p>
          <p><strong>Next gate:</strong> ${product.nextGate}</p>
          <p><strong>Monetization:</strong> ${product.monetization}</p>
          <p><strong>Revenue signal:</strong> ${product.value} <span class="muted">(${product.growthLabel})</span></p>
        </div>
      </div>
    </div>
  `
}

const openProductModal = (productId) => {
  const product = portfolioData.products.find((item) => item.id === productId)
  if (!product || !dom.productModal) return
  dom.productModalTitle.textContent = product.name
  dom.productModalBody.innerHTML = renderProductModal(product)
  animateCounts(dom.productModalBody)
  openModal(dom.productModal)
}

const attachFilters = () => {
  ;[dom.statusFilter, dom.categoryFilter, dom.searchInput, dom.sortFilter].forEach((el) => {
    el.addEventListener('input', renderProducts)
  })
}

const setupModal = () => {
  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      openBetaModal(button.dataset.modalTab || 'beta', button.dataset.interest || '')
    })
  })

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openModalEl = document.querySelector('.modal.is-open')
      if (openModalEl) {
        closeModal(openModalEl)
      }
    }
  })

  dom.tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveTab(button.dataset.tab)
    })
  })

  dom.intakeForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!dom.intakeForm.checkValidity()) {
      dom.formNote.textContent = 'Please complete all required fields with a valid email.'
      dom.intakeForm.reportValidity()
      return
    }
    dom.intakeForm.hidden = true
    dom.formSuccess.hidden = false
  })

  setActiveTab('beta')
}

const setupThemeToggle = () => {
  const stored = localStorage.getItem('labs-theme')
  if (stored === 'light') {
    document.body.classList.add('theme-light')
    dom.themeToggle.setAttribute('aria-pressed', 'true')
    dom.themeToggle.textContent = 'Dark mode'
  }

  dom.themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('theme-light')
    dom.themeToggle.setAttribute('aria-pressed', String(isLight))
    dom.themeToggle.textContent = isLight ? 'Dark mode' : 'Light mode'
    localStorage.setItem('labs-theme', isLight ? 'light' : 'dark')
  })
}

const setupNav = () => {
  if (!dom.navToggle) return
  dom.navToggle.addEventListener('click', () => {
    const isOpen = dom.navLinks.classList.toggle('is-open')
    dom.navToggle.setAttribute('aria-expanded', String(isOpen))
  })
}

const setupFiltersToggle = () => {
  if (!dom.filterToggle) return
  dom.filterToggle.addEventListener('click', () => {
    const isOpen = dom.filterPanel.classList.toggle('is-open')
    dom.filterToggle.setAttribute('aria-expanded', String(isOpen))
  })
}

document.addEventListener('DOMContentLoaded', () => {
  buildFilters()
  renderHeroStats()
  renderProducts()
  renderFrameworks()
  renderBooks()
  renderStatusTable()
  attachFilters()
  setupModal()
  setupThemeToggle()
  setupNav()
  setupFiltersToggle()
})

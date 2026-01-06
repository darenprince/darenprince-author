const crownData = {
  products: [
    {
      id: 'crowncode-intelligence-suite',
      name: 'CrownCode Intelligence Suite',
      taglines: ['Decision-grade intelligence with full operational context'],
      status: 'Nearing Stage 1 Beta · Round 1 testing',
      category: 'Intelligence / Multimodal analysis / Forensic-capable',
      truth:
        'Evidence-layered analysis with credential-abstracted context and trauma-aware reporting.',
      summary:
        'Designed for decision-makers who need forensic-capable clarity without storing secrets. Reports surface reasoning layers, cite uncertainty, and spell out deception or manipulation patterns while staying trauma-aware and non-diagnostic.',
      does: [
        'Pulls full operational context without persisting credentials: audit-friendly and exportable',
        'Produces decision-grade analysis with evidence-layered reporting and uncertainty disclosure',
        'Flags deception/manipulation patterns and environmental anomalies',
        'Performs multimodal analysis across text, images, and metadata with web + offline/air-gapped options',
        'Exports structured briefings and reporting packets',
      ],
      not: [
        'Not therapy or diagnosis',
        'Not predictive or promissory',
        'Not law enforcement automation',
      ],
      features: [
        'Credential-abstracted ingestion with short-lived tokens',
        'Trauma-aware analysis language (non-diagnostic)',
        'Evidence-layered reports with citations',
        'Confidence + uncertainty bands and manipulation signals',
        'Offline/air-gapped operational mode with export controls',
        'Multimodal parsing: text, images, metadata, device context',
        'Reporting exports (PDF/JSON) with audit trail notes',
      ],
      for: [
        'Leaders and investigators requiring decision-grade clarity',
        'Teams needing privacy-preserving analysis with exports',
        'Environments where offline or air-gapped options are mandated',
      ],
      notFor: [
        'Anyone seeking therapy or diagnosis',
        'Predictive policing or automated enforcement',
      ],
      privacy:
        'Privacy-first posture with credential-abstracted ingestion, no retention by default, and offline/air-gapped delivery where required.',
      monetization: 'Licensing + controlled deployments with premium exports and private hosting.',
      limitations: 'Round 1 testing; requires curated inputs and human review on all findings.',
      roadmap:
        'Expand beta cohort, broaden multimodal ingestion, finalize deception detection language guardrails.',
      meta: {
        maturity: 'Beta gate: stability and export compliance',
        nextStep: 'License-ready beta expansion',
      },
      accent: '#7ce6ff',
      revenue: {
        conservative: { min: [0.2, 0.5, 0.9], base: [0.35, 0.9, 1.4], max: [0.5, 1.3, 2.1] },
        base: { min: [0.4, 1, 1.8], base: [0.6, 1.6, 2.6], max: [0.8, 2.2, 3.4] },
        aggressive: { min: [0.6, 1.6, 2.8], base: [0.9, 2.4, 3.8], max: [1.2, 3.1, 4.6] },
      },
      milestones: [
        { month: 3, label: 'Round 1 field testing' },
        { month: 9, label: 'Export controls finalized' },
        { month: 15, label: 'Beta expansion' },
        { month: 24, label: 'Licensing scale-up' },
      ],
    },
    {
      id: 'justus',
      name: 'JustUs.chat',
      taglines: ['Click → Chat → Vanish'],
      status: 'PROTOTYPED',
      category: 'Privacy-first chat',
      truth:
        'No accounts, no retention by design, self-destructing rooms with burn-it termination.',
      summary:
        'A disappearing chat layer built for people who want to talk, resolve, and let it go. Rooms self-destruct on timers, interfaces adopt stealth/incognito facades, and nothing requires a login.',
      does: [
        'Creates instant rooms with countdown timers',
        'Self-destructs conversations and metadata by design',
        'Stealth/incognito UI facades for discreet use',
        'Burn-it termination for immediate teardown',
      ],
      not: ['Not archival messaging', 'Not a social network or identity layer'],
      features: [
        'Timer-based auto-deletion',
        'Link-based entry with optional passphrases',
        'Visual stealth skins (calendar, note, email façade)',
        'One-tap burn-it termination',
      ],
      for: [
        'People who want ephemeral conversations',
        'Teams handling sensitive but short-lived collaboration',
      ],
      notFor: ['Anyone needing audit logs', 'Persistent communities'],
      privacy: 'No accounts and no retention by design. Nothing persists after room burn.',
      monetization: 'Freemium with paid custom skins and organization-managed burn policies.',
      limitations: 'Prototype UI; deeper accessibility and localization pending.',
      roadmap: 'Finalize accessibility, add enterprise policy controls, begin closed beta.',
      meta: { maturity: 'Prototype', nextStep: 'Hardening + beta invitation' },
      accent: '#a78bfa',
      revenue: {
        conservative: { min: [0.05, 0.1, 0.2], base: [0.1, 0.2, 0.35], max: [0.15, 0.35, 0.5] },
        base: { min: [0.08, 0.2, 0.4], base: [0.15, 0.35, 0.6], max: [0.25, 0.6, 0.9] },
        aggressive: { min: [0.12, 0.3, 0.6], base: [0.2, 0.5, 1], max: [0.3, 0.9, 1.4] },
      },
      milestones: [
        { month: 2, label: 'Prototype hardening' },
        { month: 8, label: 'Closed beta' },
        { month: 16, label: 'Mobile packaging' },
      ],
    },
    {
      id: 'crown-sos',
      name: 'Crown SOS',
      taglines: ['When chaos strikes, Crown SOS answers.'],
      status: 'Prototype complete · Beta testing',
      category: 'Safety / Evidence capture',
      truth:
        'Custom triggers capture proof-of-life signals, live video/audio, and device data for trusted contacts.',
      summary:
        'For chaotic moments where every second matters. Crown SOS combines configurable mobile triggers with live streaming, device details, and evidence capture so trusted contacts get facts, not guesses.',
      does: [
        'Custom mobile triggers and gestures to start SOS',
        'Captures tracking/device info plus environment signals',
        'Live video/audio recording + streaming to trusted contacts',
        'Proof-of-life scheduled check-ins with escalation paths',
      ],
      not: ['Not a 911 replacement', 'Not a surveillance tool for others'],
      features: [
        'Trusted contact routing',
        'Encrypted evidence vault with time-locks',
        'Offline-first capture buffer',
        'Device fingerprint summary for responders',
      ],
      for: [
        'People who travel or work in volatile settings',
        'Teams managing distributed field operators',
      ],
      notFor: ['Those seeking passive tracking of others'],
      privacy:
        'Evidence shared only with designated contacts; proof-of-life check-ins respect user-controlled schedules.',
      monetization:
        'Subscription tiers for individuals and teams; white-label option for partners.',
      limitations: 'Requires reliable sensor permissions; carrier constraints apply for streaming.',
      roadmap:
        'Finish beta telemetry, integrate hardware trigger partners, finalize pricing tiers.',
      meta: { maturity: 'Prototype → Beta', nextStep: 'Beta telemetry + partner validation' },
      accent: '#f7be6d',
      revenue: {
        conservative: { min: [0.12, 0.25, 0.5], base: [0.2, 0.45, 0.8], max: [0.3, 0.7, 1.1] },
        base: { min: [0.2, 0.5, 0.9], base: [0.35, 0.8, 1.4], max: [0.55, 1.2, 1.9] },
        aggressive: { min: [0.35, 0.8, 1.5], base: [0.55, 1.4, 2.4], max: [0.85, 2, 3.2] },
      },
      milestones: [
        { month: 4, label: 'Beta telemetry' },
        { month: 10, label: 'Hardware trigger pilot' },
        { month: 20, label: 'Partner rollout' },
      ],
    },
    {
      id: 'crowncam',
      name: 'CrownCam',
      taglines: ['Rule Your View.'],
      status: 'Beta',
      category: 'Camera platform',
      truth:
        'Browser-based camera dashboard with QR/link pairing, multi-view control, and permissioned sharing.',
      summary:
        'A browser-native camera platform that pairs via QR or secure links, shows multiple feeds side by side, and lets you hand out live links with permission controls.',
      does: [
        'QR/link pairing to connect devices instantly',
        'Multi-view dashboard for concurrent streams',
        'Permissioned live links that can expire',
      ],
      not: ['Not a surveillance dragnet', 'Not cloud-locked; works in-browser'],
      features: [
        'Multi-view layouts',
        'Permission scopes for viewers',
        'QR-based pairing',
        'Shareable expiring links',
      ],
      for: ['Creators, teams, and support staff needing flexible camera views'],
      notFor: ['Use-cases requiring native desktop apps today'],
      privacy: 'Runs in-browser; sharing is explicit with scoping and expiring links.',
      monetization: 'Usage-based streaming tiers and team seats.',
      limitations: 'Requires stable connectivity; native apps pending.',
      roadmap: 'Add annotation overlays, improve mobile-first layouts, open self-host option.',
      meta: { maturity: 'Beta', nextStep: 'Stability + permissions audit' },
      accent: '#7ce6ff',
      revenue: {
        conservative: { min: [0.1, 0.25, 0.45], base: [0.18, 0.4, 0.7], max: [0.25, 0.65, 1] },
        base: { min: [0.2, 0.45, 0.8], base: [0.32, 0.7, 1.2], max: [0.48, 1.1, 1.8] },
        aggressive: { min: [0.35, 0.8, 1.4], base: [0.5, 1.2, 2], max: [0.7, 1.8, 2.8] },
      },
      milestones: [
        { month: 3, label: 'Pairing hardening' },
        { month: 12, label: 'Team workspaces' },
        { month: 22, label: 'Self-hosted edition' },
      ],
    },
    {
      id: 'crown-watchtower',
      name: 'Crown WatchTower',
      taglines: ['Signal intelligence for the edges.'],
      status: 'PROTOTYPED',
      category: 'Network security / signal intelligence',
      truth:
        'Environment mapping with Bluetooth and signal scanning, device fingerprinting, and MAC correlation.',
      summary:
        'Plain-English security visibility that surfaces who and what is talking nearby. Technical views map signals, correlate MACs, and fingerprint devices while explaining findings for non-specialists.',
      does: [
        'Environment mapping for nearby devices and signals',
        'Bluetooth + other signal scanning with correlation logic',
        'Device fingerprinting and MAC correlation to spot anomalies',
        'Plain-English explanations plus technical bullet views',
      ],
      not: ['Not a silent interception tool', 'Not remote exploit automation'],
      features: [
        'Signal sweeps with severity cues',
        'Device fingerprint cards',
        'MAC correlation and anomaly clustering',
        'Plain-language findings and a technical tab',
      ],
      for: [
        'Security-conscious teams in dense environments',
        'Event or facility operators needing rapid signal sweeps',
      ],
      notFor: ['Offensive security automation seekers'],
      privacy: 'Local-first scans; does not store intercepted content.',
      monetization: 'Hardware-assisted bundle + pro software tier.',
      limitations: 'Prototype-level detection accuracy; hardware diversity testing underway.',
      roadmap: 'Expand device libraries, improve false-positive handling, bundle pilot hardware.',
      meta: { maturity: 'Prototype', nextStep: 'Detection tuning + hardware pilot' },
      accent: '#f7be6d',
      revenue: {
        conservative: { min: [0.08, 0.18, 0.35], base: [0.14, 0.32, 0.55], max: [0.2, 0.5, 0.8] },
        base: { min: [0.12, 0.28, 0.5], base: [0.2, 0.45, 0.75], max: [0.3, 0.7, 1.1] },
        aggressive: { min: [0.18, 0.45, 0.8], base: [0.3, 0.7, 1.2], max: [0.45, 1.1, 1.8] },
      },
      milestones: [
        { month: 5, label: 'Detection tuning' },
        { month: 14, label: 'Hardware pilot' },
        { month: 26, label: 'Bundled launch' },
      ],
    },
    {
      id: 'lumilogix',
      name: 'LumiLogix',
      taglines: ['Emotionally intelligent marketing engine'],
      status: 'PROTOTYPED — awaiting marketing finalization',
      category: 'Marketing intelligence',
      truth:
        'Working prototype with emotion and archetype modules; GTM narrative still pending finalization.',
      summary:
        'LumiLogix pairs emotion intelligence with creative archetypes so marketing teams can design campaigns with intent. The prototype runs; the story and GTM packaging are still being shaped.',
      does: [
        'Emotion Intelligence Engine for tone and resonance',
        'Cognitive Creative Core for concept exploration',
        'Archetype Fusion Module to balance brand voice',
        'AI Cherry Pie Copy Engine to humanize drafts',
        'Visual DNA Generator for moodboards',
        'Adaptive Learning Loop to track performance signals',
        'Ethical Emotion Protocol to keep persuasion honest',
      ],
      not: ['Not a manipulative dark-pattern toolkit', 'Not finalized GTM messaging'],
      features: [
        'Module-based workflow covering 7 components',
        'Performance-linked adaptive learning',
        'Ethical guardrails baked into prompts',
      ],
      for: [
        'Marketing strategists needing emotion-aware tooling',
        'Agencies seeking modular workflows',
      ],
      notFor: ['Teams looking for finished GTM copy today'],
      privacy: 'Prototype keeps campaign data within controlled projects.',
      monetization: 'License + services bundle once marketing finalized.',
      limitations: 'Narrative and GTM packaging still being finalized.',
      roadmap: 'Finalize messaging, expand dataset fine-tuning, create launch playbooks.',
      meta: { maturity: 'Prototype', nextStep: 'Marketing narrative finalization' },
      accent: '#a78bfa',
      revenue: {
        conservative: { min: [0.1, 0.2, 0.4], base: [0.18, 0.35, 0.6], max: [0.25, 0.55, 0.9] },
        base: { min: [0.16, 0.32, 0.6], base: [0.26, 0.5, 0.9], max: [0.38, 0.75, 1.3] },
        aggressive: { min: [0.24, 0.5, 0.9], base: [0.4, 0.8, 1.4], max: [0.6, 1.2, 2] },
      },
      milestones: [
        { month: 6, label: 'Narrative finalization' },
        { month: 13, label: 'Launch playbooks' },
        { month: 24, label: 'Agency partner pilots' },
      ],
    },
    {
      id: 'ai-cherry-pie',
      name: 'AI Cherry Pie',
      taglines: ['Removes AI writing fingerprints; rebuilds human cadence.'],
      status: 'APP STORE READY — awaiting developer licensing',
      category: 'Creator utility',
      truth:
        'Humanizes AI writing so creators, brands, and writers avoid AI fingerprints while keeping their voice.',
      summary:
        'A practical tool that reconstructs human cadence and emotional realism. Built for creators and brands who want authenticity without detectable AI seams.',
      does: [
        'Removes AI writing fingerprints',
        'Rebuilds human cadence and emotional realism',
        'Supports creator, brand, and writer workflows',
      ],
      not: ['Not a plagiarism engine', 'Not a promise to bypass ethical guidelines'],
      features: ['Cadence remixer', 'Emotion dial', 'Brand voice templates', 'Export to CMS/Docs'],
      for: ['Creators, brand writers, editors'],
      notFor: ['Anyone seeking to misrepresent authorship'],
      privacy:
        'Processes drafts with minimal retention; exports locally or to chosen destinations.',
      monetization: 'Licensing + app store distribution once developer licensing finalizes.',
      limitations: 'Awaiting developer licensing; app store listing queued.',
      roadmap: 'Complete licensing, launch on stores, add more brand voice presets.',
      meta: { maturity: 'App store ready', nextStep: 'Developer licensing' },
      accent: '#f7be6d',
      revenue: {
        conservative: { min: [0.15, 0.3, 0.55], base: [0.25, 0.55, 0.9], max: [0.35, 0.8, 1.2] },
        base: { min: [0.22, 0.45, 0.8], base: [0.35, 0.75, 1.25], max: [0.5, 1.1, 1.8] },
        aggressive: { min: [0.3, 0.7, 1.2], base: [0.5, 1.1, 1.9], max: [0.75, 1.6, 2.6] },
      },
      milestones: [
        { month: 3, label: 'Licensing clearance' },
        { month: 9, label: 'App store launch' },
        { month: 18, label: 'Voice preset expansion' },
      ],
    },
    {
      id: 'pic-detective',
      name: 'Pic Detective',
      taglines: ['Image analysis as evidence-rich environment.'],
      status: 'APP STORE READY — awaiting developer licensing',
      category: 'Imaging intelligence',
      truth: 'Inventories, condition notes, and context signals with structured report exports.',
      summary:
        'Turns images into evidence-rich reports with inventories, condition notes, and context signals. Built for truthful documentation rather than filters.',
      does: [
        'Extracts inventory, condition, and context signals from images',
        'Generates structured report exports',
        'Highlights evidence cues with traceability',
      ],
      not: ['Not a beautification app', 'Not a predictive vision system'],
      features: [
        'Condition grading',
        'Context signal annotations',
        'Structured report export',
        'Audit-friendly metadata',
      ],
      for: ['Inspectors, adjusters, creators who need traceable outputs'],
      notFor: ['People seeking aesthetic filters'],
      privacy: 'Local-first processing path; exports controlled by user.',
      monetization: 'Licensing + app store distribution upon developer licensing.',
      limitations: 'Awaiting developer licensing; marketplace placement pending.',
      roadmap: 'Complete licensing, add batch processing, expand evidence templates.',
      meta: { maturity: 'App store ready', nextStep: 'Developer licensing' },
      accent: '#7ce6ff',
      revenue: {
        conservative: { min: [0.14, 0.3, 0.55], base: [0.22, 0.5, 0.85], max: [0.32, 0.75, 1.2] },
        base: { min: [0.2, 0.45, 0.8], base: [0.32, 0.7, 1.2], max: [0.46, 1.05, 1.7] },
        aggressive: { min: [0.28, 0.65, 1.1], base: [0.46, 1.05, 1.8], max: [0.7, 1.6, 2.6] },
      },
      milestones: [
        { month: 2, label: 'Licensing clearance' },
        { month: 7, label: 'Store launch' },
        { month: 16, label: 'Batch processing' },
      ],
    },
    {
      id: 'hotag',
      name: 'HoTag',
      taglines: ['Satirical DTC parody brand'],
      status: 'Active concept with mockups & packaging',
      category: 'DTC parody',
      truth:
        'Device mockups and packaging are built; viral ad concept ready. Tone stays playful and satirical.',
      summary:
        'HoTag is a wink at DTC gadget tropes. Mock devices, party pack packaging, and a ready-to-go viral ad concept keep the playful tone intact.',
      does: [
        'Ships with device mockups and packaging options (2-pack, 3-pack, party packs)',
        'Leans into satire with over-the-top viral ad scripting',
        'Treats itself as playful merch, not life-critical hardware',
      ],
      not: ['Not an actual security device', 'Not positioned as serious protective equipment'],
      features: ['Packaging mockups', 'Party-pack variants', 'Viral ad script beats'],
      for: ['Fans of DTC parody and viral merch'],
      notFor: ['Buyers seeking functional protection'],
      privacy: 'No data capture; it is satire merch.',
      monetization: 'Limited drops and merch bundles.',
      limitations: 'Concept stage; manufacturing optionality under review.',
      roadmap: 'Validate merch partners, test viral creative, soft-launch limited drops.',
      meta: { maturity: 'Concept', nextStep: 'Partner validation' },
      accent: '#f7be6d',
      revenue: {
        conservative: { min: [0.05, 0.1, 0.18], base: [0.08, 0.16, 0.28], max: [0.12, 0.22, 0.35] },
        base: { min: [0.08, 0.18, 0.32], base: [0.12, 0.25, 0.42], max: [0.18, 0.36, 0.58] },
        aggressive: { min: [0.12, 0.25, 0.44], base: [0.18, 0.36, 0.62], max: [0.26, 0.5, 0.85] },
      },
      milestones: [
        { month: 1, label: 'Creative lock' },
        { month: 6, label: 'Merch partner test' },
        { month: 12, label: 'Limited drop' },
      ],
    },
  ],
  frameworks: [
    {
      name: 'Fuck It Mode',
      description:
        'Public-facing framework about radical honesty, emotional clarity, and action orientation. It is not cruelty or recklessness—just clean intent and direct words.',
    },
    {
      name: 'CrownCast™',
      description:
        'Not fate. Alignment. A daily insight engine without astrology; it tracks psychology, emotional cycles, motivation, decision pressure, and agency.',
    },
  ],
  books: [
    {
      name: 'Game On!',
      status: 'Published',
      details: 'Confident, real, psychology-backed.',
    },
    {
      name: "Children's Book IP",
      status: 'In development',
      details:
        'Teaches why responding matters and how to say no kindly without people-pleasing; versions for ages 5–6 and 7–9; audiobook and illustration readiness included.',
    },
  ],
  valuationMultiples: {
    conservative: { min: 2, base: 3, max: 4 },
    base: { min: 3, base: 4.5, max: 6 },
    aggressive: { min: 4, base: 6, max: 8 },
  },
}

function formatMillions(value) {
  return `${value.toFixed(2)}M`
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}M`
}

function calculateCagr(values) {
  if (!values.length || values[0] === 0) return 0
  const years = values.length - 1
  const cagr = Math.pow(values[values.length - 1] / values[0], 1 / years) - 1
  return cagr
}

function buildStats(data) {
  const strip = document.getElementById('stat-strip')
  const counts = {
    total: data.products.length,
    prototyped: data.products.filter((p) => p.status.toLowerCase().includes('prototype')).length,
    beta: data.products.filter((p) => p.status.toLowerCase().includes('beta')).length,
    appStore: data.products.filter((p) => p.status.toLowerCase().includes('app store ready'))
      .length,
    frameworks: data.frameworks.length,
    books: data.books.length,
  }
  const stats = [
    { label: 'Total Products', value: counts.total },
    { label: 'Prototyped', value: counts.prototyped },
    { label: 'Beta', value: counts.beta },
    { label: 'App Store Ready', value: counts.appStore },
    { label: 'Frameworks', value: counts.frameworks },
    { label: 'Books/IP', value: counts.books },
  ]
  strip.innerHTML = stats
    .map(
      (stat) => `<div class="stat"><strong>${stat.value}</strong><span>${stat.label}</span></div>`
    )
    .join('')

  const heroCard = document.getElementById('hero-card')
  heroCard.innerHTML = `
    <div class="chip">Independent builds</div>
    <div class="chip">Transparent status</div>
    <div class="chip">Privacy-forward defaults</div>
    <p class="body">Crown Labs is the studio spine for CrownCode.ai—rapid experiments, blunt truth about readiness, and revenue clarity without hype.</p>
  `
}

function renderFilters(data) {
  const statusFilter = document.getElementById('status-filter')
  const categoryFilter = document.getElementById('category-filter')
  const statuses = ['All', 'Prototyped', 'Beta', 'App Store Ready', 'Concept', 'Published']
  statusFilter.innerHTML = statuses
    .map((s) => `<option value="${s.toLowerCase()}">${s}</option>`)
    .join('')

  const categories = ['All', ...new Set(data.products.map((p) => p.category))]
  categoryFilter.innerHTML = categories
    .map((c) => `<option value="${c.toLowerCase()}">${c}</option>`)
    .join('')
}

function renderProductCards(data, filters) {
  const grid = document.getElementById('product-grid')
  const filtered = data.products.filter((p) => {
    const statusMatch = filters.status === 'all' || p.status.toLowerCase().includes(filters.status)
    const categoryMatch =
      filters.category === 'all' || p.category.toLowerCase() === filters.category
    const searchMatch =
      p.name.toLowerCase().includes(filters.search) ||
      p.truth.toLowerCase().includes(filters.search)
    return statusMatch && categoryMatch && searchMatch
  })

  grid.innerHTML = filtered
    .map(
      (p) => `
      <article class="card" aria-label="${p.name}" style="--accent-line:${p.accent};">
        <div class="title-row">
          <h3>${p.name}</h3>
          <span class="badge" style="border-color:${p.accent}; color:${p.accent}">${p.status}</span>
        </div>
        <p class="tagline">${p.taglines[0]}</p>
        <p class="body">${p.truth}</p>
        <div class="chip" aria-label="Category" style="color:${p.accent}; border-color:${p.accent}; background: rgba(255,255,255,0.05);">${p.category}</div>
        <button class="ghost-btn" data-target="#product-${p.id}">Open details</button>
      </article>
    `
    )
    .join('')

  grid.querySelectorAll('button[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector(btn.dataset.target)?.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

function renderProductDetails(data) {
  const container = document.getElementById('product-accordion')
  const defaultExpanded = window.innerWidth >= 960
  container.innerHTML = data.products
    .map((p) => {
      const items = [
        { label: 'Tagline(s)', content: p.taglines.join('<br>') },
        {
          label: 'Status',
          content: `<span class="badge" style="border-color:${p.accent}; color:${p.accent}">${p.status}</span>`,
        },
        { label: 'Category', content: p.category },
        { label: 'One-Sentence Truth', content: p.truth },
        { label: 'Executive Summary', content: p.summary },
        {
          label: 'What It Actually Does',
          content: `<ul>${p.does.map((d) => `<li>${d}</li>`).join('')}</ul>`,
        },
        {
          label: 'What It Does NOT Do',
          content: `<ul>${p.not.map((n) => `<li>${n}</li>`).join('')}</ul>`,
        },
        {
          label: 'Core Capabilities / Features',
          content: `<ul>${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>`,
        },
        {
          label: "Who It's For",
          content: `<ul>${p.for.map((f) => `<li>${f}</li>`).join('')}</ul>`,
        },
        {
          label: "Who It's Not For",
          content: `<ul>${p.notFor.map((f) => `<li>${f}</li>`).join('')}</ul>`,
        },
        { label: 'Privacy / Ethics posture', content: p.privacy },
        { label: 'Distribution & Monetization direction', content: p.monetization },
        { label: 'Current Limitations', content: p.limitations },
        { label: 'Roadmap Signal', content: p.roadmap },
        {
          label: 'Meta',
          content: `<div class="meta-row"><div class="chip">Maturity gate: ${p.meta.maturity}</div><div class="chip">Next step: ${p.meta.nextStep}</div></div>`,
        },
      ]
      return `
      <article class="accordion" id="product-${p.id}">
        <div class="accordion-header" style="border-left: 4px solid ${p.accent}">
          <div>
            <h3>${p.name}</h3>
            <p class="tagline">${p.taglines.join(' · ')}</p>
          </div>
          <div class="accordion-actions">
            <button class="accordion-btn" data-accordion="${p.id}">${defaultExpanded ? 'Collapse' : 'Expand'}</button>
            <button class="accordion-btn" data-copy="#product-${p.id}">Copy link</button>
          </div>
        </div>
        <div class="accordion-content ${defaultExpanded ? 'active' : ''}">
          ${items
            .map(
              (item) => `
              <section>
                <h4>${item.label}</h4>
                <div class="body">${item.content}</div>
              </section>`
            )
            .join('')}
          <div class="chip">Current status: ${p.status}</div>
          <div class="list-grid">
            <div><strong>Roadmap Signal</strong><p>${p.roadmap}</p></div>
            <div><strong>Next Step</strong><p>${p.meta.nextStep}</p></div>
          </div>
          <div class="accordion-links">
            <a class="ghost-btn" href="#products">Back to Products Index</a>
          </div>
        </div>
      </article>
    `
    })
    .join('')

  container.querySelectorAll('button[data-accordion]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.accordion
      const content = document.querySelector(`#product-${id} .accordion-content`)
      const expanded = content.classList.toggle('active')
      btn.textContent = expanded ? 'Collapse' : 'Expand'
      btn.setAttribute('aria-expanded', expanded)
    })
  })

  container.querySelectorAll('button[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const hash = btn.dataset.copy
      const url = `${window.location.origin}${window.location.pathname}${hash}`
      navigator.clipboard?.writeText(url)
      btn.textContent = 'Link copied'
      setTimeout(() => (btn.textContent = 'Copy link'), 1500)
    })
  })
}

function renderFrameworks(data) {
  const list = document.getElementById('framework-list')
  list.innerHTML = data.frameworks
    .map(
      (f) => `
      <details class="framework">
        <summary>${f.name}</summary>
        <p>${f.description}</p>
      </details>
    `
    )
    .join('')
}

function renderBooks(data) {
  const grid = document.getElementById('books-grid')
  grid.innerHTML = data.books
    .map(
      (b) => `
      <article class="card">
        <div class="title-row">
          <h3>${b.name}</h3>
          <span class="badge">${b.status}</span>
        </div>
        <p>${b.details}</p>
      </article>
    `
    )
    .join('')
}

function aggregateRevenue(products, scenario, field) {
  const years = [0, 1, 2]
  return years.map((i) => products.reduce((sum, p) => sum + p.revenue[scenario][field][i], 0))
}

function renderFinancialHighlights(
  selected,
  scenario,
  revenueMin,
  revenueBase,
  revenueMax,
  multiple
) {
  const container = document.getElementById('financial-highlights')
  const labels = ['Year 1', 'Year 2', 'Year 3']
  const cagr = calculateCagr(revenueBase)
  const topProduct = selected.reduce((prev, curr) => {
    const prevValue = prev ? prev.revenue[scenario].base[2] : 0
    const currValue = curr.revenue[scenario].base[2]
    return currValue > prevValue ? curr : prev
  }, null)

  const cards = [
    {
      label: 'Year 1 base revenue',
      value: formatCurrency(revenueBase[0]),
      hint: `Range ${formatCurrency(revenueMin[0])}–${formatCurrency(revenueMax[0])}`,
    },
    {
      label: 'Year 3 base revenue',
      value: formatCurrency(revenueBase[2]),
      hint: `Range ${formatCurrency(revenueMin[2])}–${formatCurrency(revenueMax[2])}`,
    },
    {
      label: '3-year CAGR (base)',
      value: `${(cagr * 100).toFixed(1)}%`,
      hint: 'Assumes consistent retention + pricing execution',
    },
    {
      label: 'Top Year 3 driver',
      value: topProduct ? topProduct.name : 'No selection',
      hint: topProduct
        ? `Year 3 base: ${formatCurrency(topProduct.revenue[scenario].base[2])}`
        : 'Select at least one product',
    },
    {
      label: 'Year 3 valuation band',
      value: `${formatCurrency(revenueBase[2] * multiple.min)}–${formatCurrency(revenueBase[2] * multiple.max)}`,
      hint: `${labels[2]} revenue × ${multiple.min}–${multiple.max}x`,
    },
  ]

  container.innerHTML = cards
    .map(
      (card) => `
      <article class="finance-card">
        <p class="eyebrow">${card.label}</p>
        <strong>${card.value}</strong>
        <span class="hint">${card.hint}</span>
      </article>
    `
    )
    .join('')
}

function renderProjectionTable(labels, revenueMin, revenueBase, revenueMax, multiple, scenario) {
  const body = document.getElementById('projection-body')
  const rows = labels
    .map((label, idx) => {
      const base = revenueBase[idx]
      const min = revenueMin[idx]
      const max = revenueMax[idx]
      const valuation = base * multiple.base
      return `
        <tr>
          <td>${label}</td>
          <td>${formatCurrency(base)}</td>
          <td>${formatCurrency(min)} – ${formatCurrency(max)}</td>
          <td>${formatCurrency(valuation)}</td>
        </tr>
      `
    })
    .join('')

  body.innerHTML = rows
  const pill = document.getElementById('scenario-pill')
  pill.textContent = `${scenario[0].toUpperCase()}${scenario.slice(1)} case`
}

function drawAreaChart(containerId, dataPoints, labels, colors) {
  const svgNS = 'http://www.w3.org/2000/svg'
  const width = 800
  const height = 240
  const padding = 40
  const maxValue = Math.max(...dataPoints.flat()) * 1.1 || 1
  const pointsToPath = (points) =>
    points
      .map((v, i) => {
        const x = padding + (i / (points.length - 1)) * (width - padding * 2)
        const y = height - padding - (v / maxValue) * (height - padding * 2)
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')

  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

  // Axes
  const axis = document.createElementNS(svgNS, 'line')
  axis.setAttribute('x1', padding)
  axis.setAttribute('y1', height - padding)
  axis.setAttribute('x2', width - padding)
  axis.setAttribute('y2', height - padding)
  axis.setAttribute('stroke', 'rgba(255,255,255,0.2)')
  svg.appendChild(axis)

  const yAxis = document.createElementNS(svgNS, 'line')
  yAxis.setAttribute('x1', padding)
  yAxis.setAttribute('y1', padding)
  yAxis.setAttribute('x2', padding)
  yAxis.setAttribute('y2', height - padding)
  yAxis.setAttribute('stroke', 'rgba(255,255,255,0.2)')
  svg.appendChild(yAxis)

  // Horizontal grid
  for (let i = 0; i <= 4; i++) {
    const y = padding + (i / 4) * (height - padding * 2)
    const grid = document.createElementNS(svgNS, 'line')
    grid.setAttribute('x1', padding)
    grid.setAttribute('x2', width - padding)
    grid.setAttribute('y1', y)
    grid.setAttribute('y2', y)
    grid.setAttribute('stroke', 'rgba(255,255,255,0.05)')
    svg.appendChild(grid)
  }

  labels.forEach((label, i) => {
    const x = padding + (i / (labels.length - 1)) * (width - padding * 2)
    const text = document.createElementNS(svgNS, 'text')
    text.setAttribute('x', x)
    text.setAttribute('y', height - padding + 18)
    text.setAttribute('fill', '#b7c0d9')
    text.setAttribute('font-size', '12')
    text.setAttribute('text-anchor', 'middle')
    text.textContent = label
    svg.appendChild(text)
  })

  colors.forEach((color, index) => {
    const path = document.createElementNS(svgNS, 'path')
    const points = dataPoints[index]
    const pathData = `${pointsToPath(points)} L${width - padding},${height - padding} L${padding},${height - padding} Z`
    path.setAttribute('d', pathData)
    path.setAttribute('fill', `${color}33`)
    path.setAttribute('stroke', color)
    path.setAttribute('stroke-width', '2')
    svg.appendChild(path)
  })

  document.getElementById(containerId).innerHTML = ''
  document.getElementById(containerId).appendChild(svg)
}

function drawLineChart(containerId, series, labels) {
  const svgNS = 'http://www.w3.org/2000/svg'
  const width = 800
  const height = 240
  const padding = 40
  const maxValue = Math.max(...series.flatMap((s) => s.values)) * 1.1 || 1
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

  const axis = document.createElementNS(svgNS, 'line')
  axis.setAttribute('x1', padding)
  axis.setAttribute('y1', height - padding)
  axis.setAttribute('x2', width - padding)
  axis.setAttribute('y2', height - padding)
  axis.setAttribute('stroke', 'rgba(255,255,255,0.2)')
  svg.appendChild(axis)

  const yAxis = document.createElementNS(svgNS, 'line')
  yAxis.setAttribute('x1', padding)
  yAxis.setAttribute('y1', padding)
  yAxis.setAttribute('x2', padding)
  yAxis.setAttribute('y2', height - padding)
  yAxis.setAttribute('stroke', 'rgba(255,255,255,0.2)')
  svg.appendChild(yAxis)

  labels.forEach((label, i) => {
    const x = padding + (i / (labels.length - 1)) * (width - padding * 2)
    const text = document.createElementNS(svgNS, 'text')
    text.setAttribute('x', x)
    text.setAttribute('y', height - padding + 18)
    text.setAttribute('fill', '#b7c0d9')
    text.setAttribute('font-size', '12')
    text.setAttribute('text-anchor', 'middle')
    text.textContent = label
    svg.appendChild(text)
  })

  series.forEach((s) => {
    const path = document.createElementNS(svgNS, 'path')
    const d = s.values
      .map((v, i) => {
        const x = padding + (i / (s.values.length - 1)) * (width - padding * 2)
        const y = height - padding - (v / maxValue) * (height - padding * 2)
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
    path.setAttribute('d', d)
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', s.color)
    path.setAttribute('stroke-width', '2')
    svg.appendChild(path)
  })

  document.getElementById(containerId).innerHTML = ''
  document.getElementById(containerId).appendChild(svg)
}

function drawTimeline(containerId, milestones) {
  const svgNS = 'http://www.w3.org/2000/svg'
  const width = 800
  const height = 160
  const padding = 40
  const maxMonth = 36
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

  const line = document.createElementNS(svgNS, 'line')
  line.setAttribute('x1', padding)
  line.setAttribute('y1', height / 2)
  line.setAttribute('x2', width - padding)
  line.setAttribute('y2', height / 2)
  line.setAttribute('stroke', 'rgba(255,255,255,0.3)')
  line.setAttribute('stroke-width', '2')
  svg.appendChild(line)

  milestones.forEach((item) => {
    const x = padding + (item.month / maxMonth) * (width - padding * 2)
    const circle = document.createElementNS(svgNS, 'circle')
    circle.setAttribute('cx', x)
    circle.setAttribute('cy', height / 2)
    circle.setAttribute('r', 6)
    circle.setAttribute('fill', item.color || '#7ce6ff')
    svg.appendChild(circle)

    const text = document.createElementNS(svgNS, 'text')
    text.setAttribute('x', x)
    text.setAttribute('y', height / 2 - 12)
    text.setAttribute('fill', '#b7c0d9')
    text.setAttribute('font-size', '12')
    text.setAttribute('text-anchor', 'middle')
    text.textContent = `${item.label} (${item.month}m)`
    svg.appendChild(text)
  })

  document.getElementById(containerId).innerHTML = ''
  document.getElementById(containerId).appendChild(svg)
}

function renderStatusTable(data) {
  const body = document.getElementById('status-body')
  const rows = data.products.map((p) => {
    let meaning = 'Literal status with defined gates.'
    if (p.status.toLowerCase().includes('prototype'))
      meaning = 'Prototype exists; refining core mechanics.'
    if (p.status.toLowerCase().includes('beta'))
      meaning = 'In-market or invited testers are exercising the build.'
    if (p.status.toLowerCase().includes('app store ready'))
      meaning = 'Built and packaged; licensing or store clearance pending.'
    if (p.status.toLowerCase().includes('concept'))
      meaning = 'Active concept with tangible artifacts (mockups/packaging).'
    return `
      <tr>
        <td>${p.name}</td>
        <td>${p.status}</td>
        <td>${meaning}</td>
        <td>${p.meta.nextStep}</td>
      </tr>
    `
  })
  body.innerHTML = rows.join('')
}

function renderChartProductToggle(data, onChange) {
  const container = document.getElementById('chart-product-toggle')
  container.innerHTML = data.products
    .map(
      (p) => `
      <label class="chip">
        <input type="checkbox" value="${p.id}" checked aria-label="Toggle ${p.name}">
        <span style="color:${p.accent}">●</span>${p.name}
      </label>
    `
    )
    .join('')
  container.querySelectorAll('input[type=checkbox]').forEach((input) => {
    input.addEventListener('change', onChange)
  })
}

function currentSelectedProducts(data) {
  const inputs = Array.from(document.querySelectorAll('#chart-product-toggle input[type=checkbox]'))
  const selectedIds = inputs.filter((i) => i.checked).map((i) => i.value)
  if (!selectedIds.length) return data.products
  return data.products.filter((p) => selectedIds.includes(p.id))
}

function renderRevenueCharts(data, scenario) {
  const selected = currentSelectedProducts(data)
  const labels = ['Year 1', 'Year 2', 'Year 3']
  const revenueMin = aggregateRevenue(selected, scenario, 'min')
  const revenueBase = aggregateRevenue(selected, scenario, 'base')
  const revenueMax = aggregateRevenue(selected, scenario, 'max')

  drawAreaChart('portfolio-revenue-chart', [revenueMin, revenueBase, revenueMax], labels, [
    '#7ce6ff',
    '#f7be6d',
    '#a78bfa',
  ])

  const multiple = data.valuationMultiples[scenario]
  const valuationMin = revenueMin.map((v) => v * multiple.min)
  const valuationBase = revenueBase.map((v) => v * multiple.base)
  const valuationMax = revenueMax.map((v) => v * multiple.max)
  drawAreaChart('portfolio-valuation-chart', [valuationMin, valuationBase, valuationMax], labels, [
    '#7ce6ff',
    '#f7be6d',
    '#a78bfa',
  ])

  renderFinancialHighlights(selected, scenario, revenueMin, revenueBase, revenueMax, multiple)
  renderProjectionTable(labels, revenueMin, revenueBase, revenueMax, multiple, scenario)

  const perProductSeries = selected.map((p) => ({
    name: p.name,
    color: p.accent,
    values: p.revenue[scenario].base,
  }))
  drawLineChart('per-product-chart', perProductSeries, labels)

  const milestones = selected.flatMap((p) =>
    p.milestones.map((m) => ({ ...m, color: p.accent, label: `${p.name}: ${m.label}` }))
  )
  drawTimeline('timeline-chart', milestones)
}

function attachFilters(data) {
  const filters = { status: 'all', category: 'all', search: '' }
  const statusFilter = document.getElementById('status-filter')
  const categoryFilter = document.getElementById('category-filter')
  const searchInput = document.getElementById('search-input')

  const update = () => renderProductCards(data, filters)

  statusFilter.addEventListener('change', () => {
    filters.status = statusFilter.value
    update()
  })
  categoryFilter.addEventListener('change', () => {
    filters.category = categoryFilter.value
    update()
  })
  searchInput.addEventListener('input', () => {
    filters.search = searchInput.value.toLowerCase()
    update()
  })

  renderProductCards(data, filters)
}

function attachScenarioToggle(data) {
  let scenario = 'base'
  const buttons = document.querySelectorAll('[data-scenario]')
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      scenario = btn.dataset.scenario
      renderRevenueCharts(data, scenario)
    })
  )
  renderRevenueCharts(data, scenario)
}

function attachCopyChart(data) {
  const copyBtn = document.getElementById('copy-chart')
  copyBtn.addEventListener('click', () => {
    const selected = currentSelectedProducts(data)
    const scenario = document.querySelector('.pill.active')?.dataset.scenario || 'base'
    const payload = {
      scenario,
      selectedProducts: selected.map((p) => p.name),
      revenue: selected.map((p) => ({ name: p.name, revenue: p.revenue[scenario] })),
    }
    navigator.clipboard?.writeText(JSON.stringify(payload, null, 2))
    copyBtn.textContent = 'Chart data copied'
    setTimeout(() => (copyBtn.textContent = 'Copy chart data (JSON)'), 1600)
  })
}

function attachNavToggle() {
  const toggle = document.querySelector('.nav-toggle')
  const links = document.querySelector('.nav-links')
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open')
    toggle.setAttribute('aria-expanded', isOpen)
  })

  links.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      links.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
    })
  )
}

function attachScrollSpy() {
  const links = Array.from(document.querySelectorAll('.nav-links a'))
  const sections = links
    .map((link) => ({ link, target: document.querySelector(link.getAttribute('href')) }))
    .filter((entry) => entry.target)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sections.forEach(({ link, target }) => {
            const active = target.id === entry.target.id
            link.classList.toggle('active', active)
            link.setAttribute('aria-current', active ? 'true' : 'false')
          })
        }
      })
    },
    { rootMargin: '-50% 0px -35% 0px', threshold: 0.2 }
  )

  sections.forEach(({ target }) => observer.observe(target))
}

function init() {
  buildStats(crownData)
  renderFilters(crownData)
  attachFilters(crownData)
  renderProductDetails(crownData)
  renderFrameworks(crownData)
  renderBooks(crownData)
  renderStatusTable(crownData)
  renderChartProductToggle(crownData, () => {
    const scenario = document.querySelector('.pill.active')?.dataset.scenario || 'base'
    renderRevenueCharts(crownData, scenario)
  })
  attachScenarioToggle(crownData)
  attachCopyChart(crownData)
  attachNavToggle()
  attachScrollSpy()
}

document.addEventListener('DOMContentLoaded', init)

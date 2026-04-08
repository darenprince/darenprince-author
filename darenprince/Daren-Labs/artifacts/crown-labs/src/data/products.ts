export type ProductStatus = 'Concept' | 'Prototype' | 'Beta' | 'Stage 1 Beta' | 'Live'
export type ProductCategory =
  | 'Intelligence'
  | 'Security'
  | 'Forensics'
  | 'Creative'
  | 'Relationship'
  | 'Cultural'
  | 'Frameworks'

export interface ProductMetric {
  value: string
  label: string
}

export interface Product {
  id: string
  abbr: string
  name: string
  status: ProductStatus
  category: ProductCategory
  categoryLabel: string
  description: string
  valuationAsIs: string
  valuationProjected: string
  trend: 'Rising'
  trendLow: number
  trendAvg: number
  trendHigh: number
  metrics: ProductMetric[]
  features: string[]
  nextGate: string
  flagship?: boolean
  readiness?: {
    stage: string
    focus: string
    nextGate: string
  }
}

export const products: Product[] = [
  {
    id: 'crowncode-intelligence-suite',
    abbr: 'CIS',
    name: 'CrownCode Intelligence Suite',
    status: 'Stage 1 Beta',
    category: 'Intelligence',
    categoryLabel: 'Flagship Intelligence Platform',
    description:
      'A multimodal AI intelligence suite that documents, correlates, profiles, forecasts, and explains evidence-grade insights.',
    valuationAsIs: '$6M–$10M',
    valuationProjected: '$22M–$38M',
    trend: 'Rising',
    trendLow: 12,
    trendAvg: 47,
    trendHigh: 82,
    metrics: [
      { value: '100%', label: 'Chain-of-custody' },
      { value: '5 modes', label: 'Signal scope' },
      { value: '<30s', label: 'Alert latency' },
    ],
    features: [
      'Multimodal intelligence extraction across text, image, audio, video, metadata',
      'Predictive behavioral modeling and psychological threat assessment',
      'Evidence-grade reporting with audit trails and chain-of-custody',
    ],
    nextGate: 'Complete Stage 1 beta with validated evidence-ready reporting.',
    flagship: true,
    readiness: {
      stage: 'Stage 1 Beta',
      focus: 'Flagship Intelligence Platform',
      nextGate: 'Stage 1 beta preparation with controlled testing underway',
    },
  },
  {
    id: 'crowncam',
    abbr: 'C',
    name: 'CrownCam',
    status: 'Beta',
    category: 'Security',
    categoryLabel: 'Security & Situational Awareness',
    description:
      'A browser-based security camera platform that turns any device into an intelligent, real-time surveillance system.',
    valuationAsIs: '$1.2M–$2M',
    valuationProjected: '$5M–$8M',
    trend: 'Rising',
    trendLow: 8,
    trendAvg: 33,
    trendHigh: 60,
    metrics: [
      { value: '99.1%', label: 'Stream uptime' },
      { value: '120ms', label: 'Avg latency' },
      { value: '240', label: 'Active cams' },
    ],
    features: [
      '100% browser-based camera deployment with QR or secure links',
      '4K+ resolution feeds and multi-monitor control-room layouts',
      'AI-powered motion detection with smart alerts',
    ],
    nextGate: 'Finalize AI resolution upgrades and stabilize control-room workflows.',
  },
  {
    id: 'crown-sos',
    abbr: 'CS',
    name: 'Crown SOS',
    status: 'Beta',
    category: 'Security',
    categoryLabel: 'Security & Emergency Response',
    description:
      'A real-time emergency response and proof-of-life platform with live location, audio, and evidence capture.',
    valuationAsIs: '$900K–$1.5M',
    valuationProjected: '$3M–$5M',
    trend: 'Rising',
    trendLow: 6,
    trendAvg: 28,
    trendHigh: 52,
    metrics: [
      { value: '97%', label: 'Alert delivery' },
      { value: '42s', label: 'Avg response' },
      { value: '38', label: 'Trusted nodes' },
    ],
    features: [
      'One-tap emergency activation with trusted contact routing',
      'Live location broadcasting with audio/video evidence capture',
      'Automated proof-of-life check-ins and session history',
    ],
    nextGate: 'Validate beta response workflows and proof-of-life sequencing.',
  },
  {
    id: 'pic-detective',
    abbr: 'PD',
    name: 'Pic Detective',
    status: 'Beta',
    category: 'Forensics',
    categoryLabel: 'Forensic & Analytical Systems',
    description:
      'Transforms a single image into a structured intelligence artifact with forensic reporting.',
    valuationAsIs: '$1.8M–$3M',
    valuationProjected: '$5M–$8M',
    trend: 'Rising',
    trendLow: 10,
    trendAvg: 41,
    trendHigh: 72,
    metrics: [
      { value: '4.8/5', label: 'Report fidelity' },
      { value: '3', label: 'Export formats' },
      { value: '40s', label: 'Avg analysis' },
    ],
    features: [
      'Environmental inventory extraction and spatial mapping',
      'Behavioral indicator flagging with analyst overlays',
      'Structured forensic reporting with multi-format exports',
    ],
    nextGate: 'Finalize interface polish and reporting export workflows.',
  },
  {
    id: 'ai-cherry-pie',
    abbr: 'ACP',
    name: 'AI Cherry Pie',
    status: 'Beta',
    category: 'Creative',
    categoryLabel: 'Creative, Communication & Behavioral Systems',
    description:
      "Analyzes rhythm, pacing, and emotional flow to remove AI residue while preserving the author's voice.",
    valuationAsIs: '$1M–$1.8M',
    valuationProjected: '$4M–$6M',
    trend: 'Rising',
    trendLow: 11,
    trendAvg: 38,
    trendHigh: 66,
    metrics: [
      { value: '97%', label: 'Voice fidelity' },
      { value: '1.2s', label: 'Processing' },
      { value: '2', label: 'Output modes' },
    ],
    features: [
      'AI writing fingerprint detection with cadence analysis',
      'Emotional flow restoration and human rhythm modeling',
      'Batch and single-text processing with publishing-ready outputs',
    ],
    nextGate: 'Finalize packaging, distribution, and launch channels.',
  },
  {
    id: 'crowncast',
    abbr: 'C',
    name: 'CrownCast',
    status: 'Beta',
    category: 'Creative',
    categoryLabel: 'Creative, Communication & Behavioral Systems',
    description:
      'A daily generative insight engine grounded in psychology, emotional regulation, and agency.',
    valuationAsIs: '$600K–$1M',
    valuationProjected: '$2M–$3M',
    trend: 'Rising',
    trendLow: 5,
    trendAvg: 27,
    trendHigh: 50,
    metrics: [
      { value: '365', label: 'Daily prompts' },
      { value: '64%', label: 'Retention' },
      { value: '95%', label: 'Voice fidelity' },
    ],
    features: [
      'Daily psychologically grounded insights with agency-first framing',
      'Emotion and decision-cycle modeling without superstition',
      'Mobile-first delivery with subscription-ready architecture',
    ],
    nextGate: 'Finalize distribution and delivery pipelines.',
  },
  {
    id: 'crown-watchtower',
    abbr: 'CW',
    name: 'Crown WatchTower',
    status: 'Prototype',
    category: 'Security',
    categoryLabel: 'Forensic & Analytical Systems',
    description:
      'Deep visibility into network traffic, wireless signals, and environmental indicators for real-time anomaly detection.',
    valuationAsIs: '$1.3M–$2.2M',
    valuationProjected: '$4M–$6M',
    trend: 'Rising',
    trendLow: 7,
    trendAvg: 30,
    trendHigh: 54,
    metrics: [
      { value: '6', label: 'Signal zones' },
      { value: '18', label: 'Anomaly cues' },
      { value: '2m', label: 'Scan latency' },
    ],
    features: [
      'Network traffic inspection and wireless signal scanning',
      'Device fingerprinting and environment mapping',
      'Real-time anomaly detection with forensic logging',
    ],
    nextGate: 'Finalize initial prototype scope and monitoring dashboards.',
  },
  {
    id: 'lumilogix',
    abbr: 'L',
    name: 'LumiLogix',
    status: 'Prototype',
    category: 'Creative',
    categoryLabel: 'Creative, Communication & Behavioral Systems',
    description:
      'An emotionally intelligent marketing engine blending psychology, narrative structure, and data-driven insight.',
    valuationAsIs: '$2.5M–$4M',
    valuationProjected: '$8M–$12M',
    trend: 'Rising',
    trendLow: 9,
    trendAvg: 41,
    trendHigh: 74,
    metrics: [
      { value: '12', label: 'Archetypes' },
      { value: '96%', label: 'Voice fidelity' },
      { value: '8', label: 'Channel outputs' },
    ],
    features: [
      'Emotional intelligence modeling with archetype logic',
      'Narrative tone alignment across campaigns',
      'Ethical emotion safeguards with brand voice preservation',
    ],
    nextGate: 'Complete module integrations and validate ethical safeguards.',
  },
  {
    id: 'presence-architect',
    abbr: 'PA',
    name: 'Presence Architect',
    status: 'Prototype',
    category: 'Relationship',
    categoryLabel: 'Relationship & Cultural Products',
    description:
      'A strategic system for cultivating attraction, authority, and emotional gravity without chasing attention.',
    valuationAsIs: '$700K–$1.2M',
    valuationProjected: '$3M–$5M',
    trend: 'Rising',
    trendLow: 4,
    trendAvg: 24,
    trendHigh: 48,
    metrics: [
      { value: '18', label: 'Playbooks' },
      { value: '+24%', label: 'Signal lift' },
      { value: '3', label: 'Cohorts' },
    ],
    features: [
      'Social signaling frameworks with restraint and timing logic',
      'Emotional regulation and confidence projection models',
      'DM playbooks and platform-specific presence strategies',
    ],
    nextGate: 'Move from prototype to pilot cohort validation.',
  },
  {
    id: 'couples-connection-playground',
    abbr: 'CCP',
    name: 'Couples Connection Playground',
    status: 'Concept',
    category: 'Relationship',
    categoryLabel: 'Relationship & Cultural Products',
    description:
      'A playful, guided platform for couples to build connection without therapy language or pressure.',
    valuationAsIs: '$500K–$900K',
    valuationProjected: '$2M–$3M',
    trend: 'Rising',
    trendLow: 3,
    trendAvg: 21,
    trendHigh: 44,
    metrics: [
      { value: '6', label: 'Session modes' },
      { value: '30', label: 'Exercises' },
      { value: '74%', label: 'Completion' },
    ],
    features: [
      'Interactive relationship games with emotional check-ins',
      'Guided conversation flows and conflict repair experiences',
      'Private shared couple spaces with mobile-first design',
    ],
    nextGate: 'Finalize game loops and interaction design prototypes.',
  },
  {
    id: 'hotag',
    abbr: 'H',
    name: 'HoTag',
    status: 'Concept',
    category: 'Cultural',
    categoryLabel: 'Relationship & Cultural Products',
    description:
      'A culturally sharp consumer tech concept blending satire, behavioral insight, and tracking tech.',
    valuationAsIs: '$250K–$500K',
    valuationProjected: '$1.5M–$2.5M',
    trend: 'Rising',
    trendLow: 2,
    trendAvg: 14,
    trendHigh: 30,
    metrics: [
      { value: '12', label: 'Brand drops' },
      { value: '180k', label: 'Audience reach' },
      { value: '3', label: 'Launch kits' },
    ],
    features: [
      'Location tracking product concept with branded device IP',
      'Companion mobile app framework and viral branding',
      'Merchandise and licensing extensions with cultural commentary',
    ],
    nextGate: 'Move from concept to prototype brand ecosystem.',
  },
]

export const statusOrder: ProductStatus[] = ['Stage 1 Beta', 'Beta', 'Prototype', 'Concept', 'Live']

export function getStatusColor(status: ProductStatus): string {
  switch (status) {
    case 'Stage 1 Beta':
      return 'text-red-400 bg-red-950/50 border-red-800/50'
    case 'Beta':
      return 'text-amber-400 bg-amber-950/50 border-amber-800/50'
    case 'Prototype':
      return 'text-blue-400 bg-blue-950/50 border-blue-800/50'
    case 'Concept':
      return 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50'
    case 'Live':
      return 'text-green-400 bg-green-950/50 border-green-800/50'
    default:
      return 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50'
  }
}

export function getCategoryColor(category: ProductCategory): string {
  switch (category) {
    case 'Intelligence':
      return 'text-violet-400 bg-violet-950/50 border-violet-800/50'
    case 'Security':
      return 'text-blue-400 bg-blue-950/50 border-blue-800/50'
    case 'Forensics':
      return 'text-amber-400 bg-amber-950/50 border-amber-800/50'
    case 'Creative':
      return 'text-pink-400 bg-pink-950/50 border-pink-800/50'
    case 'Relationship':
      return 'text-rose-400 bg-rose-950/50 border-rose-800/50'
    case 'Cultural':
      return 'text-orange-400 bg-orange-950/50 border-orange-800/50'
    case 'Frameworks':
      return 'text-teal-400 bg-teal-950/50 border-teal-800/50'
    default:
      return 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50'
  }
}

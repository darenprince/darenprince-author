import { useMemo, useState } from 'react'
import { Activity, ArrowRight, AudioLines, BarChart3, BookOpen, BrainCircuit, Check, ChevronRight, CircleAlert, Code2, FileAudio, Github, Globe2, Layers3, LockKeyhole, Menu, Microscope, Network, Play, Scale, Search, ShieldCheck, Terminal, Waves, X, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { ProgressBar } from '@tremor/react'
import DeveloperGate from './components/DeveloperGate'
import DeveloperConsole from './components/DeveloperConsole'
import Button from './components/ui/Button'
import Badge from './components/ui/Badge'

const stages = [
  { number: '01', title: 'Eligibility', icon: ShieldCheck, description: 'Establish whether the recording contains enough usable information for analysis.' },
  { number: '02', title: 'Evidence', icon: Waves, description: 'Measure supported vocal, acoustic, temporal and linguistic observations.' },
  { number: '03', title: 'Candidate', icon: Network, description: 'Examine convergence, conflict, uncertainty and alternative explanations.' },
  { number: '04', title: 'Disposition', icon: Scale, description: 'Apply reliability and validation gates before an inferential conclusion.' },
]

const methods = [
  { title: 'Acoustic dynamics', text: 'Intensity, energy and spectral behavior across speech.', icon: Waves },
  { title: 'Prosodic dynamics', text: 'Pitch, rhythm, rate and delivery variation.', icon: AudioLines },
  { title: 'Voice quality', text: 'Supported harmonicity and vocal stability observations.', icon: Activity },
  { title: 'Temporal behavior', text: 'Pauses, response timing and speech activity structure.', icon: Zap },
  { title: 'Cepstral evidence', text: 'MFCC summaries with provenance and bounded processing.', icon: BarChart3 },
  { title: 'Speaker baseline', text: 'Within speaker comparison when sufficient material exists.', icon: BrainCircuit },
]

const useCases = [
  { title: 'Investigations', text: 'Review interviews and recorded statements for patterns that deserve closer examination.', icon: Search },
  { title: 'Professional analysis', text: 'Bring structured vocal evidence into investigative and review workflows.', icon: ShieldCheck },
  { title: 'Research', text: 'Study relationships between speech behavior, cognitive demand and deception.', icon: Microscope },
  { title: 'Enterprise', text: 'Create an evidence layer for conversations where reliable analysis matters.', icon: Globe2 },
]

const evidenceRows = [
  ['Acoustic', 'Energy, spectral behavior, F0 and harmonicity'],
  ['Temporal', 'Pauses, response timing and speech activity'],
  ['Prosodic', 'Pitch, rhythm, rate and delivery variation'],
  ['Linguistic', 'Transcript observations when transcript data exists'],
]

function Logo() {
  return (
    <a href="/voxvector/" className="group flex items-center gap-3 no-underline" aria-label="VoxVector home">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-lg border border-white/[0.08] bg-[#080d14] shadow-[0_0_28px_rgba(0,185,255,.08)]">
        <span className="absolute inset-x-1 top-1/2 h-px bg-[#00d9ff]/70" />
        <AudioLines size={21} className="relative z-10 text-[#00d9ff]" />
      </span>
      <span>
        <span className="block text-[16px] font-bold tracking-[0.12em] text-white">VOXVECTOR</span>
        <span className="block mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/[0.42]">AI vocal credibility intelligence</span>
      </span>
    </a>
  )
}

function SectionLabel({ children, icon: Icon }) {
  return <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#00d9ff]">{Icon && <Icon size={15} strokeWidth={2.2} />}{children}</div>
}

function Reveal({ children, delay = 0, className = '' }) {
  return <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay }} className={className}>{children}</motion.div>
}

function Waveform({ compact = false }) {
  const points = useMemo(() => {
    const count = compact ? 260 : 520
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1)
      const phraseEnvelope = 0.16 + 0.84 * Math.pow(Math.abs(Math.sin(t * Math.PI * 8.2 + 0.35)), 0.75)
      const pauses = (t > 0.115 && t < 0.145) || (t > 0.335 && t < 0.37) || (t > 0.61 && t < 0.645) || (t > 0.84 && t < 0.875)
      const carrier = Math.sin(t * 230) + 0.52 * Math.sin(t * 517 + 0.8) + 0.2 * Math.sin(t * 91 + 2.1)
      const texture = 0.32 * Math.sin(t * 1123 + 1.4) + 0.18 * Math.sin(t * 1787)
      const amplitude = pauses ? 0.035 : (0.08 + 0.42 * phraseEnvelope)
      const y = 50 + (carrier + texture) * amplitude * 50
      return `${(t * 100).toFixed(3)},${Math.max(4, Math.min(96, y)).toFixed(2)}`
    }).join(' ')
  }, [compact])

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" role="img" aria-label="Illustrative speech waveform">
      <defs>
        <linearGradient id={compact ? 'waveCompact' : 'waveHero'} x1="0" x2="1">
          <stop offset="0" stopColor="#087fff" />
          <stop offset="0.52" stopColor="#00d9ff" />
          <stop offset="1" stopColor="#147dff" />
        </linearGradient>
      </defs>
      <line x1="0" x2="100" y1="50" y2="50" stroke="rgba(255,255,255,.08)" strokeWidth="0.35" />
      <polyline points={points} fill="none" stroke={compact ? 'url(#waveCompact)' : 'url(#waveHero)'} strokeWidth={compact ? '0.8' : '0.7'} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function Spectrogram() {
  const cells = useMemo(() => Array.from({ length: 88 }, (_, x) => Array.from({ length: 18 }, (_, y) => {
    const harmonic = Math.abs(Math.sin(x * 0.31 + y * 1.17))
    const formant = Math.exp(-Math.pow((y - (4 + 3.2 * Math.sin(x * 0.11))) / 2.1, 2))
    const activity = 0.18 + 0.82 * Math.abs(Math.sin(x * 0.19 + 0.7))
    const pause = (x > 11 && x < 16) || (x > 34 && x < 39) || (x > 60 && x < 66) || (x > 74 && x < 79)
    return pause ? 0.035 : Math.min(1, 0.08 + activity * (0.18 + harmonic * 0.34 + formant * 0.55))
  })), [])

  return (
    <svg viewBox="0 0 88 18" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      {cells.flatMap((column, x) => column.map((value, y) => <rect key={`${x}-${y}`} x={x} y={y} width="0.9" height="0.82" rx="0.08" fill={`rgba(0,217,255,${0.035 + value * 0.28})`} />))}
    </svg>
  )
}

function AudioSignalPanel() {
  return (
    <Reveal>
      <div className="relative">
        <div className="absolute -inset-12 bg-[radial-gradient(circle_at_50%_45%,rgba(0,217,255,.11),transparent_64%)] blur-3xl" />
        <div className="relative overflow-hidden border border-white/[0.08] bg-[#080d14] shadow-[0_28px_90px_rgba(0,0,0,.45)]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <FileAudio size={20} className="text-[#00d9ff]" />
              <div>
                <div className="text-sm font-semibold text-white">Audio signal view</div>
                <div className="mt-0.5 text-xs text-white/[0.42]">Illustrative interface preview</div>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.32]">Not live data</span>
          </div>
          <div className="p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 text-xs text-white/[0.44]"><span>INTERVIEW_SAMPLE.WAV</span><span>Speech · silence · spectral energy</span></div>
            <div className="mt-5 border border-white/[0.06] bg-[#05090e] p-4 sm:p-5">
              <div className="h-32 sm:h-44"><Waveform /></div>
              <div className="mt-3 flex justify-between text-[10px] font-medium tracking-[0.08em] text-white/[0.26]"><span>00:00</span><span>01:00</span><span>02:00</span><span>03:00</span><span>04:00</span><span>05:00</span></div>
            </div>
            <div className="mt-4 border border-white/[0.06] bg-[#05090e] p-4">
              <div className="flex items-center justify-between text-xs"><span className="font-semibold text-white/[0.72]">Spectral activity</span><span className="text-white/[0.32]">Illustration</span></div>
              <div className="mt-3 h-24"><Spectrogram /></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/[0.07] pt-5 sm:grid-cols-4">
              {['Pitch dynamics', 'Intensity', 'Speech activity', 'Pause topology'].map((label) => <div key={label}><div className="text-xs font-semibold text-white/[0.72]">{label}</div><div className="mt-1 text-[11px] leading-5 text-white/[0.34]">Measured observation family</div></div>)}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function StageRow({ stage, index }) {
  const Icon = stage.icon
  return (
    <Reveal delay={index * 0.04}>
      <div className="group grid gap-5 border-t border-white/[0.08] py-8 md:grid-cols-[92px_54px_1fr_180px] md:items-center">
        <div className="font-mono text-sm font-semibold tracking-[0.16em] text-[#147dff]">{stage.number}</div>
        <Icon size={38} strokeWidth={1.5} className="text-[#00d9ff] transition-transform duration-300 group-hover:scale-110" />
        <div><h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{stage.title}</h3><p className="mt-2 max-w-2xl text-base leading-7 text-white/[0.48]">{stage.description}</p></div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/[0.32] md:justify-end">{index === 0 ? 'Quality gate' : index === 3 ? 'Decision gate' : 'Evidence layer'} <ChevronRight size={15} /></div>
      </div>
    </Reveal>
  )
}

function MethodRow({ item, index }) {
  const Icon = item.icon
  return (
    <Reveal delay={index * 0.035}>
      <div className="group grid gap-4 border-t border-white/[0.07] py-7 md:grid-cols-[60px_1fr_1fr] md:items-center">
        <Icon size={42} strokeWidth={1.45} className="text-[#00d9ff] transition-transform duration-300 group-hover:scale-110" />
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{item.title}</h3>
        <p className="max-w-xl text-base leading-6 text-white/[0.45]">{item.text}</p>
      </div>
    </Reveal>
  )
}

function FooterColumn({ title, links }) {
  return <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/[0.54]">{title}</h3><div className="mt-5 grid gap-3">{links.map(([label, href]) => <a key={label} href={href} className="text-sm text-white/[0.38] transition-colors hover:text-white no-underline">{label}</a>)}</div></div>
}

export default function App() {
  const developer = window.location.pathname.replace(/\/+$/, '') === '/voxvector/developer' || window.location.hash === '#/developer'
  if (developer) return <DeveloperGate onBack={() => { window.location.href = '/voxvector/' }}>{({ session, signOut }) => <DeveloperConsole session={session} signOut={signOut} />}</DeveloperGate>
  return <Landing />
}

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const goToAnalysis = () => { window.location.href = '/voxvector/developer' }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#05080d] text-white antialiased">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-black">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#05080d]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/[0.52] lg:flex" aria-label="Primary navigation">
            {[['Product', '#product'], ['How it works', '#workflow'], ['Technology', '#technology'], ['Use cases', '#use-cases'], ['Resources', '#briefing']].map(([label, href]) => <a key={label} href={href} className="transition-colors hover:text-white no-underline">{label}</a>)}
            <a href="/voxvector/developer" className="inline-flex items-center gap-2 transition-colors hover:text-white no-underline"><Terminal size={15} /> Developer</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="default" onClick={goToAnalysis}>Log in</Button>
            <Button variant="accent" size="lg" onClick={goToAnalysis}>Start analysis <ArrowRight size={16} /></Button>
          </div>
          <Button type="button" variant="secondary" size="icon" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} className="lg:hidden">{menuOpen ? <X size={19} /> : <Menu size={19} />}</Button>
        </div>
        {menuOpen && <div id="mobile-navigation" className="border-t border-white/[0.07] bg-[#05080d] px-5 py-4 lg:hidden"><div className="grid gap-1 text-base font-medium text-white/[0.64]">{[['Product', '#product'], ['How it works', '#workflow'], ['Technology', '#technology'], ['Use cases', '#use-cases'], ['Resources', '#briefing'], ['Developer', '/voxvector/developer']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="px-3 py-3 no-underline hover:text-white">{label}</a>)}</div></div>}
      </header>

      <main id="main-content">
        <section id="product" className="relative overflow-hidden border-b border-white/[0.07]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(0,217,255,.08),transparent_26%),radial-gradient(circle_at_22%_20%,rgba(20,125,255,.08),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-5 py-20 sm:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-28 xl:gap-24">
            <div>
              <Reveal><div className="flex flex-wrap items-center gap-x-4 gap-y-2"><Badge variant="blue">Advanced vocal deception analysis</Badge><span className="text-xs font-bold uppercase tracking-[0.18em] text-white/[0.34]">Evidence first</span></div></Reveal>
              <Reveal delay={0.06}><h1 className="mt-8 max-w-4xl text-[clamp(4rem,7.2vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.07em]">Reveal the Truth.<br /><span className="text-white/[0.84]">With the world’s most advanced</span><br /><span className="text-[#00d9ff]">vocal analysis platform.</span></h1></Reveal>
              <Reveal delay={0.12}><p className="mt-8 max-w-2xl text-lg leading-8 text-white/[0.58] sm:text-xl">VoxVector examines the voice for measurable patterns, behavioral changes, and converging evidence that may reveal signals associated with deception.</p></Reveal>
              <Reveal delay={0.18}><div className="mt-9 flex flex-wrap gap-3"><Button variant="accent" size="lg" className="h-12 px-6 text-base" onClick={goToAnalysis}>Start an analysis <ArrowRight size={17} /></Button><Button variant="secondary" size="lg" className="h-12 px-6 text-base" onClick={() => document.querySelector('#workflow')?.scrollIntoView({ behavior: 'smooth' })}><Play size={16} /> See how it works</Button></div></Reveal>
              <Reveal delay={0.24}><div className="mt-9 flex max-w-2xl items-start gap-3 text-sm leading-6 text-white/[0.42]"><CircleAlert size={18} className="mt-0.5 shrink-0 text-[#00d9ff]" /><span>A pause, pitch change, hesitation or stress response is an observation. No individual vocal signal proves deception.</span></div></Reveal>
            </div>
            <AudioSignalPanel />
          </div>
        </section>

        <section className="border-b border-white/[0.07] bg-[#070b11]">
          <div className="mx-auto grid max-w-[1440px] gap-0 px-5 sm:grid-cols-3 lg:px-10">
            {[['01', 'Quality before interpretation', 'Eligibility and reliability are evaluated before evidence is interpreted.'], ['02', 'Evidence stays visible', 'Measurements retain provenance, uncertainty and competing explanations.'], ['03', 'No manufactured certainty', 'The interface never turns an illustration into a scientific result.']].map(([num, title, text]) => <div key={num} className="border-b border-white/[0.07] py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0 lg:py-10"><div className="font-mono text-sm font-bold tracking-[0.16em] text-[#147dff]">{num}</div><h2 className="mt-3 text-lg font-semibold text-white">{title}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-white/[0.40]">{text}</p></div>)}
          </div>
        </section>

        <section id="workflow" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <Reveal><div className="lg:sticky lg:top-32 lg:self-start"><SectionLabel icon={Layers3}>The analytical path</SectionLabel><h2 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">A serious analysis starts before the interpretation.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-white/[0.46]">VoxVector keeps reliability, evidence, candidate classification and final disposition separate so a visualization never becomes a scientific claim.</p><a href="#technology" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#00d9ff] no-underline">Explore the evidence model <ArrowRight size={16} /></a></div></Reveal>
            <div>{stages.map((stage, index) => <StageRow key={stage.number} stage={stage} index={index} />)}</div>
          </div>
        </section>

        <section id="technology" className="border-y border-white/[0.07] bg-[#070b11]">
          <div className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32">
            <Reveal><div className="grid gap-8 lg:grid-cols-[1fr_0.62fr] lg:items-end"><div><SectionLabel icon={BarChart3}>Technology</SectionLabel><h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">Measure what the system can actually support.</h2></div><p className="max-w-xl text-lg leading-8 text-white/[0.46]">The current runtime is an observational foundation. Measurements become evidence inputs only after their quality and provenance are understood.</p></div></Reveal>
            <div className="mt-14">{methods.map((item, index) => <MethodRow key={item.title} item={item} index={index} />)}</div>
            <Reveal><div className="mt-8 grid gap-8 border-t border-white/[0.07] pt-8 lg:grid-cols-[1fr_1fr]"><div><h3 className="text-xl font-semibold text-white">Evidence convergence and conflict</h3><p className="mt-2 max-w-2xl text-base leading-7 text-white/[0.43]">Multiple observations can be examined together while each signal remains evidence rather than proof.</p></div><div className="grid gap-3">{[['Converging evidence', 72], ['Neutral evidence', 48], ['Conflicting evidence', 28]].map(([label, value]) => <div key={label}><div className="mb-2 flex justify-between text-sm"><span className="text-white/[0.58]">{label}</span><span className="font-mono text-xs text-white/[0.30]">illustrative</span></div><ProgressBar value={value} className="!h-1.5 !bg-white/[0.06]" /></div>)}</div></div></Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <Reveal><div><SectionLabel icon={FileAudio}>Analytical interface</SectionLabel><h2 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">See the signal. Keep the uncertainty.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-white/[0.44]">The product visual language is built around signal structure, feature families, reliability and evidence relationships rather than a dramatic single score.</p></div></Reveal>
            <Reveal delay={0.05}><div className="border border-white/[0.08] bg-[#080d14] p-6 sm:p-8"><div className="grid gap-6 md:grid-cols-[1.35fr_0.65fr]"><div><div className="flex items-center justify-between"><div><div className="text-sm font-semibold text-white">Signal behavior</div><div className="mt-1 text-xs text-white/[0.35]">Illustrative analytical surface</div></div><Badge variant="blue">Observational</Badge></div><div className="mt-6 h-44 border border-white/[0.06] bg-[#05090e] p-4"><Waveform compact /></div></div><div className="border-t border-white/[0.07] pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0"><div className="text-xs font-bold uppercase tracking-[0.16em] text-[#00d9ff]">Evidence families</div><div className="mt-5 grid gap-4">{evidenceRows.map(([label, text]) => <div key={label}><div className="text-sm font-semibold text-white">{label}</div><div className="mt-1 text-xs leading-5 text-white/[0.34]">{text}</div></div>)}</div></div></div></div></Reveal>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-[#070b11]">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-32">
            <Reveal><div><SectionLabel icon={Microscope}>Scientific discipline</SectionLabel><h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">The engine must be honest about what its evidence means.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.46]">A nervous person can be truthful. A calm person can lie. Fatigue, illness, anxiety, recording artifacts, language, accent, topic sensitivity and ordinary variation can affect the same measurements.</p></div></Reveal>
            <Reveal delay={0.05}><div className="lg:pt-12"><div className="grid gap-0 border-t border-white/[0.07]">{['Observations are not conclusions', 'Reliability comes before inference', 'Convergence can strengthen context', 'Conflict remains visible', 'Alternative explanations stay present', 'Abstention is a valid result'].map(item => <div key={item} className="flex items-center gap-4 border-b border-white/[0.07] py-5 text-base font-medium text-white/[0.64]"><Check size={19} className="shrink-0 text-[#00d9ff]" />{item}</div>)}</div><div className="mt-8 border-l-2 border-[#147dff] pl-5 text-sm leading-6 text-white/[0.42]">The current runtime does not establish scientifically validated deception inference. The product objective remains deception detection.</div></div></Reveal>
          </div>
        </section>

        <section id="use-cases" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32">
          <Reveal><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><SectionLabel icon={Globe2}>Use cases</SectionLabel><h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Built for people who need more than a hunch.</h2></div><p className="max-w-xl text-lg leading-8 text-white/[0.44]">A serious evidence workflow can support investigation, professional review, research and enterprise analysis without pretending that uncertainty does not exist.</p></div></Reveal>
          <div className="mt-14 grid gap-x-10 md:grid-cols-2 lg:grid-cols-4">{useCases.map(({ title, text, icon: Icon }, index) => <Reveal key={title} delay={index * 0.04}><div className="border-t border-white/[0.08] py-7"><Icon size={48} strokeWidth={1.35} className="text-[#00d9ff]" /><h3 className="mt-7 text-xl font-semibold text-white">{title}</h3><p className="mt-3 text-base leading-7 text-white/[0.42]">{text}</p></div></Reveal>)}</div>
        </section>

        <section id="briefing" className="mx-auto max-w-[1440px] px-5 pb-24 lg:px-10 lg:pb-32">
          <Reveal><div className="relative overflow-hidden border border-white/[0.08] bg-[#080d14] px-7 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"><div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_40%,rgba(0,217,255,.10),transparent_60%)]" /><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><SectionLabel icon={BookOpen}>Project briefing</SectionLabel><h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Go deeper into the system being built.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/[0.44]">Read the product mission, analytical architecture, scientific boundaries, evidence model and long term capability vision behind VoxVector.</p></div><div className="flex flex-wrap gap-3"><Button variant="accent" size="lg" className="h-12 px-6 text-base" onClick={() => { window.location.href = 'https://github.com/darenprince/darenprince-author/blob/main/docs/crownlabsbible/04-product-dossiers/VoxVector.md' }}>Project Briefing <ArrowRight size={16} /></Button><Button variant="secondary" size="lg" className="h-12 px-6 text-base" onClick={() => { window.location.href = 'https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs' }}>Documentation <BookOpen size={16} /></Button></div></div></div></Reveal>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] bg-[#04070b]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
            <div><Logo /><p className="mt-6 max-w-md text-sm leading-7 text-white/[0.34]">Advanced vocal deception analysis built around measurable evidence, transparent methodology and disciplined interpretation.</p><div className="mt-6 flex items-center gap-2 text-xs text-white/[0.28]"><LockKeyhole size={14} /> Privacy conscious analysis architecture</div></div>
            <FooterColumn title="Product" links={[["Overview", '#product'], ['How it works', '#workflow'], ['Technology', '#technology'], ['Use cases', '#use-cases']]} />
            <FooterColumn title="Resources" links={[['Project Briefing', '#briefing'], ['Documentation', 'https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs'], ['Developer Console', '/voxvector/developer'], ['Source', 'https://github.com/darenprince/darenprince-author']]} />
            <FooterColumn title="Legal and company" links={[['Privacy Policy', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/PRIVACY.md'], ['Terms of Service', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/TERMS.md'], ['Security', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/SECURITY.md'], ['Contact', '/contact.html']]} />
          </div>
          <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-7 text-xs text-white/[0.25] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Crown Labs. VoxVector. All rights reserved.</span><span className="flex items-center gap-5"><a href="/voxvector/developer" className="inline-flex items-center gap-2 no-underline hover:text-white/[0.6]"><Code2 size={13} /> Developer</a><a href="https://github.com/darenprince/darenprince-author" className="inline-flex items-center gap-2 no-underline hover:text-white/[0.6]"><Github size={13} /> Source</a></span></div>
        </div>
      </footer>
    </div>
  )
}

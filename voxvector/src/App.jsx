import { useState } from 'react'
import { Activity, AudioLines, ArrowRight, BarChart3, BookOpen, BrainCircuit, Check, ChevronRight, CircleAlert, Code2, FileAudio, Github, Globe2, Layers3, LockKeyhole, Menu, Microscope, Network, Play, Scale, Search, ShieldCheck, Terminal, Waves, X, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { AreaChart, Card as TremorCard, DonutChart, ProgressBar } from '@tremor/react'
import DeveloperGate from './components/DeveloperGate'
import DeveloperConsole from './components/DeveloperConsole'
import Button from './components/ui/Button'
import Badge from './components/ui/Badge'
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/Card'

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

const signalData = [
  { time: '0:00', pitch: 44, intensity: 32 },
  { time: '0:30', pitch: 51, intensity: 35 },
  { time: '1:00', pitch: 47, intensity: 42 },
  { time: '1:30', pitch: 62, intensity: 39 },
  { time: '2:00', pitch: 56, intensity: 48 },
  { time: '2:30', pitch: 68, intensity: 45 },
  { time: '3:00', pitch: 61, intensity: 52 },
  { time: '3:30', pitch: 74, intensity: 58 },
  { time: '4:00', pitch: 66, intensity: 54 },
  { time: '4:30', pitch: 59, intensity: 47 },
  { time: '5:00', pitch: 71, intensity: 61 },
  { time: '5:30', pitch: 64, intensity: 56 },
  { time: '6:00', pitch: 76, intensity: 63 },
]

const evidenceData = [
  { name: 'Converging', value: 62 },
  { name: 'Neutral', value: 25 },
  { name: 'Conflicting', value: 13 },
]

const useCases = [
  { title: 'Investigations', text: 'Review interviews and recorded statements for patterns that deserve closer examination.', icon: Search },
  { title: 'Professional analysis', text: 'Bring structured vocal evidence into investigative and review workflows.', icon: ShieldCheck },
  { title: 'Research', text: 'Study relationships between speech behavior, cognitive demand and deception.', icon: Microscope },
  { title: 'Enterprise', text: 'Create an evidence layer for conversations where reliable analysis matters.', icon: Globe2 },
]

function Logo() {
  return (
    <a href="/voxvector/" className="group flex items-center gap-3 no-underline" aria-label="VoxVector home">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.025]">
        <AudioLines size={16} className="absolute left-1.5 text-cyan-300/[0.70]" />
        <span className="relative z-10 ml-2 text-[18px] font-black tracking-[-0.14em] text-white">V</span>
      </span>
      <span>
        <span className="block text-[15px] font-semibold tracking-[0.08em] text-white">VOXVECTOR</span>
        <span className="block text-[8px] font-medium uppercase tracking-[0.22em] text-white/[0.30]">Vocal intelligence</span>
      </span>
    </a>
  )
}

function SectionLabel({ children, icon: Icon }) {
  return <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/[0.65]">{Icon && <Icon size={13} />}{children}</div>
}

function Reveal({ children, delay = 0, className = '' }) {
  return <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay }} className={className}>{children}</motion.div>
}

function SignalPreview() {
  return (
    <Reveal>
      <div className="relative">
        <div className="absolute -inset-8 rounded-[2rem] bg-blue-500/[0.06] blur-3xl" />
        <TremorCard className="relative !rounded-xl !border-white/[0.06] !bg-[#0b1018] !p-0 !shadow-2xl !shadow-black/[0.30]">
          <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-blue-500/[0.10] text-blue-300"><FileAudio size={15} /></span>
              <div><div className="text-xs font-medium text-white/[0.85]">Recording analysis</div><div className="mt-0.5 text-[10px] text-white/[0.35]">Interface illustration</div></div>
            </div>
            <Badge variant="success">Eligible</Badge>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between text-[10px] text-white/[0.35]"><span>interview_sample.wav</span><span>48 kHz · mono</span></div>
            <div className="mt-4 overflow-hidden rounded-lg bg-[#080c12] p-3">
              <AreaChart data={signalData} index="time" categories={['pitch', 'intensity']} colors={['blue', 'cyan']} className="h-44" showLegend={false} showYAxis={false} showXAxis={true} showGridLines={false} showAnimation={true} curveType="monotone" startEndOnly={true} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[['Pitch', '246 Hz'], ['Intensity', '−18 dB'], ['Speech', '68%'], ['Pauses', '2.7 s']].map(([label, value]) => <div key={label} className="rounded-md bg-white/[0.025] px-3 py-3"><div className="text-[10px] text-white/[0.35]">{label}</div><div className="mt-1 text-sm font-semibold text-white/[0.90]">{value}</div></div>)}
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_170px]">
              <div className="rounded-md bg-white/[0.02] p-4"><div className="flex items-center justify-between"><span className="text-xs font-medium text-white/[0.75]">Evidence activity</span><span className="text-[10px] text-white/[0.30]">Current segment</span></div><div className="mt-4 space-y-3">{[['Speech activity', 76], ['Acoustic observations', 64], ['Temporal observations', 51]].map(([label, value]) => <div key={label}><div className="mb-1 flex justify-between text-[10px] text-white/[0.35]"><span>{label}</span><span>{value}%</span></div><ProgressBar value={value} className="!bg-white/[0.06]" /></div>)}</div></div>
              <div className="rounded-md bg-white/[0.02] p-4"><div className="text-[10px] uppercase tracking-[0.15em] text-white/[0.30]">Reliability</div><div className="mt-3 text-2xl font-semibold text-white">High</div><div className="mt-1 text-[10px] leading-5 text-white/[0.35]">Quality comes before interpretation.</div></div>
            </div>
          </div>
        </TremorCard>
      </div>
    </Reveal>
  )
}

function EvidenceDashboard() {
  return (
    <Reveal>
      <div className="grid gap-3 lg:grid-cols-[1.45fr_0.75fr]">
        <TremorCard className="!rounded-xl !border-white/[0.06] !bg-[#0b1018] !shadow-none">
          <div className="flex items-start justify-between gap-4"><div><div className="text-xs font-medium text-white/[0.75]">Signal behavior</div><div className="mt-1 text-[10px] text-white/[0.30]">Illustrative analytical view</div></div><Badge variant="blue">Observational</Badge></div>
          <AreaChart data={signalData} index="time" categories={['pitch', 'intensity']} colors={['blue', 'cyan']} className="mt-6 h-64" showLegend={true} showYAxis={false} showGridLines={false} showAnimation={true} curveType="monotone" startEndOnly={true} />
        </TremorCard>
        <TremorCard className="!rounded-xl !border-white/[0.06] !bg-[#0b1018] !shadow-none">
          <div className="text-xs font-medium text-white/[0.75]">Evidence direction</div>
          <div className="mt-1 text-[10px] text-white/[0.30]">Convergence does not establish deception</div>
          <div className="mt-4 flex items-center justify-center"><DonutChart data={evidenceData} category="value" index="name" colors={['blue', 'gray', 'cyan']} showAnimation={true} className="h-44" /></div>
          <div className="mt-2 grid gap-2">{evidenceData.map((item, index) => <div key={item.name} className="flex items-center justify-between text-[11px] text-white/[0.45]"><span className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-white/[0.30]' : 'bg-cyan-300'}`} />{item.name}</span><span className="text-white/[0.70]">{item.value}%</span></div>)}</div>
        </TremorCard>
      </div>
    </Reveal>
  )
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
    <div className="min-h-screen overflow-x-clip bg-[#070a0f] text-white antialiased">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-white/[0.045] bg-[#070a0f]/[0.88] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-[12px] text-white/[0.48] md:flex" aria-label="Primary navigation">
            {[['Product', '#product'], ['How it works', '#workflow'], ['Technology', '#technology'], ['Use cases', '#use-cases'], ['Resources', '#briefing']].map(([label, href]) => <a key={label} href={href} className="transition-colors hover:text-white/[0.90]">{label}</a>)}
            <a href="/voxvector/developer" className="inline-flex items-center gap-1.5 transition-colors hover:text-white/[0.90]"><Terminal size={13} /> Developer</a>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" onClick={goToAnalysis}>Log in</Button>
            <Button variant="accent" size="sm" onClick={goToAnalysis}>Start analysis <ArrowRight size={14} /></Button>
          </div>
          <Button type="button" variant="secondary" size="icon" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} className="md:hidden">{menuOpen ? <X size={17} /> : <Menu size={17} />}</Button>
        </div>
        {menuOpen && <div id="mobile-navigation" className="border-t border-white/[0.045] bg-[#070a0f] px-5 py-4 md:hidden"><div className="grid gap-1 text-sm text-white/[0.60]">{[['Product', '#product'], ['How it works', '#workflow'], ['Technology', '#technology'], ['Use cases', '#use-cases'], ['Resources', '#briefing'], ['Developer', '/voxvector/developer']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 no-underline hover:bg-white/[0.035] hover:text-white">{label}</a>)}</div></div>}
      </header>

      <main id="main-content">
        <section id="product" className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[760px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(37,99,235,.10),transparent_66%)] blur-3xl" />
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Reveal><div className="flex flex-wrap items-center gap-2"><Badge variant="blue">Advanced vocal deception analysis</Badge><span className="text-[10px] uppercase tracking-[0.16em] text-white/[0.25]">Evidence first</span></div></Reveal>
              <Reveal delay={0.06}><h1 className="mt-7 max-w-3xl text-[clamp(3.4rem,7.5vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Hear the words.<br /><span className="text-white/[0.72]">Analyze the voice.</span><br /><span className="text-blue-300">Examine the evidence.</span></h1></Reveal>
              <Reveal delay={0.12}><p className="mt-7 max-w-xl text-base leading-7 text-white/[0.50] sm:text-lg">VoxVector is an advanced vocal deception analysis engine built to investigate whether measurable patterns in spoken communication contain meaningful evidence associated with deception.</p></Reveal>
              <Reveal delay={0.18}><div className="mt-8 flex flex-wrap gap-3"><Button variant="accent" size="lg" onClick={goToAnalysis}>Start an analysis <ArrowRight size={16} /></Button><Button variant="secondary" size="lg" onClick={() => document.querySelector('#workflow')?.scrollIntoView({ behavior: 'smooth' })}><Play size={15} /> See how it works</Button></div></Reveal>
              <Reveal delay={0.24}><div className="mt-8 flex max-w-xl items-start gap-3 text-xs leading-5 text-white/[0.35]"><CircleAlert size={15} className="mt-0.5 shrink-0 text-blue-300/[0.65]" /><span>A pause, pitch change, hesitation or stress response is an observation. No individual vocal signal proves deception.</span></div></Reveal>
            </div>
            <SignalPreview />
          </div>
        </section>

        <section className="border-y border-white/[0.045] bg-white/[0.012]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.045] sm:grid-cols-4 lg:px-8">
            {[['4', 'analytical stages'], ['6+', 'observation families'], ['1', 'evidence chain'], ['0', 'magic buttons']].map(([value, label]) => <div key={label} className="px-5 py-6 sm:px-8"><div className="text-2xl font-semibold tracking-tight text-white">{value}</div><div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/[0.25]">{label}</div></div>)}
          </div>
        </section>

        <section id="workflow" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <Reveal><div><SectionLabel icon={Layers3}>The analytical path</SectionLabel><h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">A serious analysis starts before the interpretation.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-white/[0.42]">VoxVector keeps reliability, evidence, candidate classification and final disposition separate so a visualization never becomes a scientific claim.</p></div></Reveal>
            <div className="grid gap-3 sm:grid-cols-2">{stages.map(({ number, title, icon: Icon, description }, index) => <Reveal key={number} delay={index * 0.04}><Card className="group h-full border-white/[0.055] bg-white/[0.018] transition-colors hover:border-blue-400/[0.15] hover:bg-white/[0.028]"><CardHeader><div className="flex items-center justify-between"><span className="text-[11px] font-semibold tracking-[0.14em] text-white/[0.25]">{number}</span><span className="grid h-8 w-8 place-items-center rounded-md bg-blue-400/[0.06] text-blue-300/[0.75]"><Icon size={16} /></span></div><CardTitle className="mt-8 text-base">{title}</CardTitle><CardDescription className="mt-2">{description}</CardDescription></CardHeader><CardContent><div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/[0.25]">{index === 0 ? 'Gate' : index === 3 ? 'Decision' : 'Analysis'} <ChevronRight size={12} /></div></CardContent></Card></Reveal>)}</div>
          </div>
        </section>

        <section id="technology" className="border-y border-white/[0.045] bg-[#090d13] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel icon={BarChart3}>Technology</SectionLabel><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Measure what the system can actually support.</h2></div><p className="max-w-md text-sm leading-6 text-white/[0.40]">The current runtime is an observational foundation. Measurements become evidence inputs only after their quality and provenance are understood.</p></div></Reveal>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{methods.map(({ title, text, icon: Icon }, index) => <Reveal key={title} delay={index * 0.03}><Card className="h-full border-white/[0.055] bg-white/[0.018] transition-transform hover:-translate-y-0.5 hover:bg-white/[0.025]"><CardHeader><span className="grid h-9 w-9 place-items-center rounded-md bg-blue-400/[0.06] text-blue-300/[0.75]"><Icon size={17} /></span><CardTitle className="mt-6">{title}</CardTitle><CardDescription className="mt-2">{text}</CardDescription></CardHeader></Card></Reveal>)}</div>
            <Reveal><div className="mt-5"><Card className="border-white/[0.055] bg-white/[0.018]"><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><Network size={17} className="mt-0.5 text-cyan-300/[0.65]" /><div><div className="text-sm font-medium text-white/[0.80]">Evidence convergence and conflict</div><div className="mt-1 text-xs leading-5 text-white/[0.35]">Multiple observations can be examined together while individual signals remain evidence only.</div></div></div><div className="flex items-center gap-3 text-[10px] text-white/[0.30]"><span className="h-1.5 w-16 rounded-full bg-blue-400/[0.75]" /><span className="h-1.5 w-8 rounded-full bg-cyan-300/[0.45]" /><span>Convergence · conflict</span></div></CardContent></Card></div></Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel icon={BarChart3}>Analytical interface</SectionLabel><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">See the signal without hiding the uncertainty.</h2></div><p className="max-w-md text-sm leading-6 text-white/[0.38]">The interface is designed around measurable observations, evidence direction and reliability. The example below is illustrative.</p></div></Reveal>
          <EvidenceDashboard />
        </section>

        <section id="research" className="border-y border-white/[0.045] bg-white/[0.012] py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <Reveal><Card className="h-full border-white/[0.055] bg-[#0b1018]"><CardHeader><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-md bg-cyan-400/[0.06] text-cyan-300/[0.75]"><Microscope size={17} /></span><SectionLabel>Scientific discipline</SectionLabel></div><h2 className="mt-7 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">The engine must be honest about what its evidence means.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/[0.42]">A nervous person can be truthful. A calm person can lie. Fatigue, illness, anxiety, recording artifacts, language, accent, topic sensitivity and ordinary variation can affect the same measurements.</p></CardHeader><CardContent><div className="grid gap-2 sm:grid-cols-2">{['Observations are not conclusions', 'Reliability comes before inference', 'Convergence can strengthen context', 'Conflict remains visible', 'Alternative explanations stay present', 'Abstention is a valid result'].map(item => <div key={item} className="flex items-center gap-2 rounded-md bg-white/[0.025] px-3 py-2.5 text-xs text-white/[0.50]"><Check size={14} className="text-emerald-300/[0.70]" />{item}</div>)}</div></CardContent></Card></Reveal>
            <Reveal delay={0.06}><Card className="h-full border-white/[0.055] bg-[#0b1018]"><CardHeader><div className="flex items-center justify-between"><SectionLabel>Capability state</SectionLabel><Badge>Current runtime</Badge></div><CardTitle className="mt-7 text-2xl">Product ambition and implementation state stay separate.</CardTitle></CardHeader><CardContent><div className="space-y-4">{[['Implemented', 'Measurable observations and reliability controls', 'Active'], ['Research', 'Additional acoustic, linguistic and learned methods', 'In development'], ['Validation', 'Task specific inferential evaluation', 'In development']].map(([title, description, status]) => <div key={title} className="border-b border-white/[0.05] pb-4 last:border-0 last:pb-0"><div className="flex items-center justify-between gap-3"><span className="text-sm font-medium text-white/[0.80]">{title}</span><span className={`text-[10px] uppercase tracking-[0.14em] ${status === 'Active' ? 'text-emerald-300/[0.70]' : 'text-blue-300/[0.65]'}`}>{status}</span></div><p className="mt-1.5 text-xs leading-5 text-white/[0.35]">{description}</p></div>)}</div><div className="mt-6 flex items-start gap-3 rounded-md bg-amber-300/[0.025] p-4 text-xs leading-5 text-white/[0.38]"><CircleAlert size={15} className="mt-0.5 shrink-0 text-amber-300/[0.65]" />The current runtime does not establish scientifically validated deception inference. The product objective remains deception detection.</div></CardContent></Card></Reveal>
          </div>
        </section>

        <section id="use-cases" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal><div><SectionLabel icon={Globe2}>Use cases</SectionLabel><h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Built for people who need more than a hunch.</h2></div></Reveal>
          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{useCases.map(({ title, text, icon: Icon }, index) => <Reveal key={title} delay={index * 0.04}><Card className="h-full border-white/[0.055] bg-white/[0.018] transition-colors hover:border-blue-400/[0.15]"><CardHeader><span className="grid h-9 w-9 place-items-center rounded-md bg-blue-400/[0.06] text-blue-300/[0.75]"><Icon size={17} /></span><CardTitle className="mt-7">{title}</CardTitle><CardDescription className="mt-2">{text}</CardDescription></CardHeader></Card></Reveal>)}</div>
        </section>

        <section id="briefing" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8 lg:pb-32">
          <Reveal><div className="relative overflow-hidden rounded-xl border border-white/[0.055] bg-[#0b1018] p-7 sm:p-10 lg:p-14"><div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgba(37,99,235,.12),transparent_58%)]" /><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><SectionLabel icon={BookOpen}>Project briefing</SectionLabel><h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Go deeper into the system being built.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/[0.40]">Read the product mission, analytical architecture, scientific boundaries, evidence model and long term capability vision behind VoxVector.</p></div><div className="flex flex-wrap gap-2"><Button variant="accent" size="lg" onClick={() => { window.location.href = 'https://github.com/darenprince/darenprince-author/blob/main/docs/crownlabsbible/02-products/voxvector.md' }}>Project Briefing <ArrowRight size={15} /></Button><Button variant="secondary" size="lg" onClick={() => { window.location.href = 'https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs' }}>Documentation <BookOpen size={15} /></Button></div></div></div></Reveal>
        </section>
      </main>

      <footer className="border-t border-white/[0.045] bg-[#06090d]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div><Logo /><p className="mt-5 max-w-sm text-xs leading-6 text-white/[0.30]">Advanced vocal deception analysis built around measurable evidence, transparent methodology and disciplined interpretation.</p><div className="mt-5 flex items-center gap-2 text-[10px] text-white/[0.25]"><LockKeyhole size={13} /> Privacy conscious analysis architecture</div></div>
            <FooterColumn title="Product" links={[["Overview", '#product'], ['How it works', '#workflow'], ['Technology', '#technology'], ['Use cases', '#use-cases']]} />
            <FooterColumn title="Resources" links={[['Project Briefing', '#briefing'], ['Documentation', 'https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs'], ['Developer Console', '/voxvector/developer'], ['Source', 'https://github.com/darenprince/darenprince-author']]} />
            <FooterColumn title="Legal and company" links={[['Privacy Policy', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/PRIVACY.md'], ['Terms of Service', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/TERMS.md'], ['Security', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/SECURITY.md'], ['Contact', '/contact.html']]} />
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.045] pt-6 text-[10px] text-white/[0.22] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Crown Labs. VoxVector. All rights reserved.</span><span className="flex items-center gap-4"><a href="/voxvector/developer" className="inline-flex items-center gap-1.5 no-underline hover:text-white/[0.55]"><Code2 size={12} /> Developer</a><a href="https://github.com/darenprince/darenprince-author" className="inline-flex items-center gap-1.5 no-underline hover:text-white/[0.55]"><Github size={12} /> Source</a></span></div>
        </div>
      </footer>
    </div>
  )
}

function FooterColumn({ title, links }) {
  return <div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.38]">{title}</div><div className="mt-4 grid gap-3">{links.map(([label, href]) => <a key={label} href={href} className="text-xs text-white/[0.30] no-underline transition-colors hover:text-white/[0.70]">{label}</a>)}</div></div>
}

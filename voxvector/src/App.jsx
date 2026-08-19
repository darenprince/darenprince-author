import { motion } from 'motion/react'
import {
  Activity,
  ArrowRight,
  AudioLines,
  BarChart3,
  BookOpen,
  Check,
  CircleAlert,
  Code2,
  FileText,
  Github,
  Layers3,
  LockKeyhole,
  Menu,
  Microscope,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'
import { useState } from 'react'
import DeveloperGate from './components/DeveloperGate'
import DeveloperConsole from './components/DeveloperConsole'
import Button from './components/ui/Button'

const stages = [
  ['01', 'Eligibility', 'Determine whether the recording contains enough usable information for analysis.'],
  ['02', 'Evidence', 'Measure supported vocal, acoustic, temporal and linguistic observations.'],
  ['03', 'Candidate', 'Examine convergence, conflict, uncertainty and alternative explanations.'],
  ['04', 'Disposition', 'Apply reliability and validation gates before an inferential conclusion.'],
]

const methods = [
  ['Acoustic energy', 'Intensity and energy dynamics across the recording'],
  ['F0 dynamics', 'Pitch behavior and within segment variation'],
  ['Voice quality', 'HNR and harmonicity observations'],
  ['Spectral structure', 'Centroid, spread, flux and rolloff measurements'],
  ['MFCC observations', 'Cepstral feature summaries with provenance'],
  ['Formant candidates', 'Supported formant tracking observations'],
  ['Pause topology', 'Silence structure and temporal behavior'],
  ['Speaker baseline', 'Within speaker comparison where sufficient data exists'],
]

const useCases = [
  ['Investigations', 'Review interviews and recorded statements for patterns that deserve closer examination.', Microscope],
  ['Security', 'Bring structured vocal evidence into investigative and security workflows.', ShieldCheck],
  ['Legal analysis', 'Organize observations and uncertainty around recorded conversations.', FileText],
  ['Research', 'Study relationships between speech behavior, cognitive demand and deception.', BarChart3],
]

function Logo() {
  return (
    <a href="/voxvector/" className="flex items-center gap-3 no-underline" aria-label="VoxVector home">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-white/15 bg-white/[.035]">
        <span className="absolute inset-x-1.5 top-1/2 h-px bg-gradient-to-r from-blue-400 via-white to-blue-300" />
        <span className="relative text-[18px] font-black tracking-[-.14em] text-white">V</span>
      </span>
      <span>
        <span className="block text-[15px] font-semibold tracking-[.06em] text-white">VOXVECTOR</span>
        <span className="block text-[8px] font-medium uppercase tracking-[.2em] text-white/35">Advanced vocal deception analysis</span>
      </span>
    </a>
  )
}

function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'border-white/10 bg-white/[.035] text-white/60',
    blue: 'border-blue-400/20 bg-blue-400/[.06] text-blue-200',
    green: 'border-emerald-400/20 bg-emerald-400/[.06] text-emerald-200',
  }
  return <span className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`}><span className={`h-1.5 w-1.5 rounded-full ${tone === 'green' ? 'bg-emerald-400' : tone === 'blue' ? 'bg-blue-400' : 'bg-white/35'}`} />{children}</span>
}

function SectionLabel({ children }) {
  return <div className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/35">{children}</div>
}

function Metric({ label, value, detail, accent = 'blue' }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/8 bg-white/[.025] p-4">
      <div className="flex items-center justify-between gap-3 text-[11px] text-white/40"><span>{label}</span><span className={accent === 'green' ? 'text-emerald-300/70' : 'text-blue-300/70'}>●</span></div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-[11px] text-white/35">{detail}</div>
    </div>
  )
}

function SignalPanel() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0e15] shadow-2xl shadow-black/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(54,137,255,.10),transparent_35%),radial-gradient(circle_at_88%_80%,rgba(54,137,255,.055),transparent_30%)]" />
      <div className="relative border-b border-white/8 px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3"><AudioLines size={15} className="text-blue-300" /><span className="text-xs font-medium text-white/75">Conversation analysis</span><Badge tone="green">Eligible</Badge></div>
          <span className="text-[10px] text-white/30">08:12.147</span>
        </div>
      </div>
      <div className="relative p-4 sm:p-5">
        <div className="rounded-lg border border-white/8 bg-black/25 p-3">
          <div className="mb-2 flex items-center justify-between text-[10px] text-white/35"><span>interview_sample.wav</span><span>48 kHz · mono</span></div>
          <div className="relative h-28 overflow-hidden rounded-md bg-[#080c13]">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_24px]" />
            <svg viewBox="0 0 900 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M0 70 C14 70 18 52 31 70 S49 84 61 67 S79 42 91 72 S110 90 124 68 S142 52 154 73 S170 81 185 68 S205 39 219 70 S237 98 251 68 S270 47 285 71 S304 86 319 66 S339 45 353 72 S373 88 388 68 S404 55 420 70 S440 93 455 67 S473 45 489 70 S510 86 526 68 S545 52 561 71 S581 91 596 68 S615 44 631 70 S649 84 666 69 S687 48 702 70 S721 96 738 68 S756 54 773 70 S792 82 808 67 S830 43 846 71 S869 89 884 69 S894 66 900 70" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-blue-400" />
              <path d="M0 70 C20 70 22 61 40 70 S67 76 84 70 S110 58 126 70 S150 78 166 70 S193 57 211 70 S239 80 258 70 S284 59 303 70 S331 79 350 70 S376 55 397 70 S426 81 447 70 S474 59 494 70 S520 77 540 70 S570 55 591 70 S620 81 640 70 S668 58 689 70 S716 79 737 70 S765 57 786 70 S814 78 835 70 S866 59 900 70" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-blue-300/45" />
            </svg>
            <div className="absolute inset-y-0 left-[56%] w-px bg-blue-300/80 shadow-[0_0_16px_rgba(96,165,250,.65)]" />
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-white/25"><span>0:00</span><span>2:00</span><span>4:00</span><span>6:00</span><span>8:12</span></div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="Pitch" value="246 Hz" detail="Within expected range" />
          <Metric label="Intensity" value="−18 dB" detail="Stable variation" />
          <Metric label="Speech" value="68%" detail="Usable speech" accent="green" />
          <Metric label="Pauses" value="2.7 s" detail="Segment duration" />
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_190px]">
          <div className="rounded-lg border border-white/8 bg-black/20 p-4">
            <div className="flex items-center justify-between"><span className="text-xs font-medium text-white/70">Evidence activity</span><span className="text-[10px] text-white/30">Current segment</span></div>
            <div className="mt-4 space-y-2.5">
              {[['Speech activity', '76%', 'bg-emerald-400'], ['Acoustic observations', '64%', 'bg-blue-400'], ['Temporal observations', '51%', 'bg-blue-300/70']].map(([label, width, color]) => <div key={label}><div className="mb-1 flex justify-between text-[10px] text-white/35"><span>{label}</span><span>{width}</span></div><div className="h-1 rounded-full bg-white/7"><div className={`h-1 rounded-full ${color}`} style={{ width }} /></div></div>)}
            </div>
          </div>
          <div className="rounded-lg border border-white/8 bg-black/20 p-4"><div className="text-[10px] uppercase tracking-[.16em] text-white/30">Reliability</div><div className="mt-3 text-3xl font-semibold">High</div><div className="mt-1 text-[10px] leading-5 text-white/35">Quality and eligibility state are presented before interpretation.</div></div>
        </div>
      </div>
    </div>
  )
}

function WorkflowCard({ number, title, description, active }) {
  return <article className={`group rounded-xl border p-6 transition ${active ? 'border-blue-400/20 bg-blue-400/[.035]' : 'border-white/8 bg-white/[.018] hover:border-white/15 hover:bg-white/[.03]'}`}><div className="flex items-center justify-between"><span className={`text-xs font-semibold ${active ? 'text-blue-300' : 'text-white/25'}`}>{number}</span>{active && <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,.7)]" />}</div><h3 className="mt-12 text-lg font-semibold tracking-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{description}</p></article>
}

export default function App() {
  const developer = window.location.pathname.replace(/\/+$/, '') === '/voxvector/developer' || window.location.hash === '#/developer'
  if (developer) return <DeveloperGate onBack={() => { window.location.href = '/voxvector/' }}>{({ session, signOut }) => <DeveloperConsole session={session} signOut={signOut} />}</DeveloperGate>
  return <Landing />
}

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-hidden bg-[#080b10] text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black">Skip to content</a>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_10%,rgba(45,112,255,.11),transparent_28%),radial-gradient(circle_at_88%_42%,rgba(45,112,255,.045),transparent_24%)]" />
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#080b10]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-[13px] text-white/55 md:flex" aria-label="Primary navigation">
            <a href="#product" className="transition hover:text-white">Product</a>
            <a href="#workflow" className="transition hover:text-white">How it works</a>
            <a href="#technology" className="transition hover:text-white">Technology</a>
            <a href="#research" className="transition hover:text-white">Research</a>
            <a href="#briefing" className="transition hover:text-white">Resources</a>
            <a href="/voxvector/developer" className="inline-flex items-center gap-1.5 transition hover:text-white"><Terminal size={14} /> Developer</a>
          </nav>
          <div className="hidden items-center gap-2 md:flex"><a href="/voxvector/developer" className="rounded-md border border-white/12 px-4 py-2 text-xs font-medium no-underline transition hover:bg-white/[.05]">Log in</a><a href="#analyze" className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-black no-underline transition hover:bg-white/90">Start analysis <ArrowRight size={13} className="ml-1 inline" /></a></div>
          <Button type="button" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} className="border border-white/10 bg-white/[.02] p-2 text-white/65 md:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</Button>
        </div>
        {menuOpen && <div id="mobile-navigation" className="border-t border-white/8 bg-[#080b10] px-5 py-4 md:hidden"><div className="grid gap-1 text-sm text-white/65">{[['Product', '#product'], ['How it works', '#workflow'], ['Technology', '#technology'], ['Research', '#research'], ['Resources', '#briefing'], ['Developer', '/voxvector/developer']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 no-underline hover:bg-white/[.04] hover:text-white">{label}</a>)}</div></div>}
      </header>

      <main id="main-content" className="relative z-10">
        <section id="product" className="mx-auto max-w-7xl px-5 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap gap-2"><Badge tone="blue">Advanced vocal deception analysis</Badge><Badge tone="green">Evidence first</Badge></div>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="mt-7 max-w-2xl text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[.92] tracking-[-.065em]">Hear the words.<br /><span className="text-white/75">Analyze the voice.</span><br /><span className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 bg-clip-text text-transparent">Examine the evidence.</span></motion.h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/58 sm:text-lg">VoxVector is an advanced vocal deception analysis engine built to investigate whether measurable patterns in spoken communication contain meaningful evidence associated with deception.</p>
              <div className="mt-8 flex flex-wrap gap-3" id="analyze"><a href="/voxvector/developer" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black no-underline transition hover:bg-white/90">Analyze a recording <ArrowRight size={16} /></a><a href="#workflow" className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[.025] px-5 py-3 text-sm font-medium text-white/80 no-underline transition hover:bg-white/[.06]"><Play size={15} /> See how it works</a></div>
              <div className="mt-8 flex items-start gap-3 border-l border-blue-400/30 pl-4 text-xs leading-5 text-white/40"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-blue-300/70" /><span>A pause, pitch change, hesitation or stress response is an observation. No individual vocal signal proves deception.</span></div>
            </div>
            <SignalPanel />
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[.012]" aria-label="Product principles">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/8 sm:grid-cols-4 lg:px-8">
            {[['4', 'analytical stages'], ['8+', 'current observation families'], ['1', 'evidence chain'], ['0', 'magic buttons']].map(([value, label]) => <div key={label} className="px-5 py-6 sm:px-8"><div className="text-2xl font-semibold tracking-tight text-white">{value}</div><div className="mt-1 text-[10px] uppercase tracking-[.16em] text-white/30">{label}</div></div>)}
          </div>
        </section>

        <section id="workflow" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div><SectionLabel>The analytical path</SectionLabel><h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-.035em] sm:text-5xl">A serious analysis starts before the interpretation.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-white/45">VoxVector keeps reliability, evidence, candidate classification and final disposition separate so the interface never turns a visualization into a scientific claim.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{stages.map(([number, title, description], index) => <WorkflowCard key={number} number={number} title={title} description={description} active={index === 0} />)}</div>
          </div>
        </section>

        <section id="technology" className="border-y border-white/8 bg-[#090d13] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>Technology</SectionLabel><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-.035em] sm:text-5xl">Measure what the system can actually support.</h2></div><p className="max-w-md text-sm leading-6 text-white/40">The current runtime is an observational foundation. Measurements become evidence inputs only after their quality and provenance are understood.</p></div>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{methods.map(([name, description], index) => <article key={name} className="rounded-lg border border-white/8 bg-white/[.018] p-5 transition hover:border-white/15 hover:bg-white/[.03]"><div className="flex items-center justify-between"><span className="grid h-7 w-7 place-items-center rounded-md border border-white/8 bg-white/[.035] text-[10px] text-white/35">0{index + 1}</span><Activity size={14} className={index % 3 === 0 ? 'text-blue-300/70' : index % 3 === 1 ? 'text-emerald-300/60' : 'text-blue-300/50'} /></div><h3 className="mt-7 text-sm font-semibold text-white/85">{name}</h3><p className="mt-2 text-xs leading-5 text-white/38">{description}</p></article>)}</div>
            <div className="mt-6 rounded-lg border border-white/8 bg-white/[.018] p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><Layers3 size={17} className="mt-0.5 text-blue-300/70" /><div><div className="text-sm font-medium">Evidence convergence and conflict</div><div className="mt-1 text-xs leading-5 text-white/35">Multiple observations can be examined together without treating any individual signal as proof.</div></div></div><div className="flex items-center gap-2 text-[11px] text-white/35"><span className="h-1.5 w-16 rounded-full bg-blue-400/70" /><span className="h-1.5 w-8 rounded-full bg-white/35" /><span>Convergence · conflict</span></div></div></div>
          </div>
        </section>

        <section id="research" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
            <div className="rounded-xl border border-white/8 bg-white/[.018] p-7 sm:p-9"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-lg border border-white/8 bg-white/[.035]"><Microscope size={17} className="text-blue-300/70" /></div><SectionLabel>Scientific discipline</SectionLabel></div><h2 className="mt-7 max-w-2xl text-3xl font-semibold tracking-[-.035em] sm:text-4xl">The engine must be honest about what its evidence means.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">A nervous person can be truthful. A calm person can lie. Fatigue, illness, anxiety, recording artifacts, language, accent, topic sensitivity and ordinary variation can affect the same measurements.</p><div className="mt-7 grid gap-2 sm:grid-cols-2">{['Observations are not conclusions', 'Reliability comes before inference', 'Convergence can strengthen context', 'Conflict remains visible', 'Alternative explanations stay present', 'Abstention is a valid result'].map(item => <div key={item} className="flex items-center gap-2 rounded-md border border-white/7 bg-black/15 px-3 py-2.5 text-xs text-white/55"><Check size={14} className="text-emerald-300/70" />{item}</div>)}</div></div>
            <div className="rounded-xl border border-white/8 bg-[#0a0e15] p-7 sm:p-9"><div className="flex items-center justify-between"><SectionLabel>Capability state</SectionLabel><Badge>Current runtime</Badge></div><div className="mt-7 space-y-4">{[['Implemented', 'Measurable observations and reliability controls', 'green'], ['Research', 'Additional acoustic, linguistic and learned methods', 'blue'], ['Validation', 'Task specific inferential evaluation', 'neutral']].map(([title, description, tone]) => <div key={title} className="border-b border-white/7 pb-4 last:border-0 last:pb-0"><div className="flex items-center justify-between"><span className="text-sm font-medium">{title}</span><span className={`text-[10px] uppercase tracking-[.14em] ${tone === 'green' ? 'text-emerald-300/70' : tone === 'blue' ? 'text-blue-300/70' : 'text-white/45'}`}>{tone === 'green' ? 'Active' : 'In development'}</span></div><p className="mt-1.5 text-xs leading-5 text-white/35">{description}</p></div>)}</div><div className="mt-8 flex items-start gap-3 rounded-lg border border-amber-300/10 bg-amber-300/[.025] p-4 text-xs leading-5 text-white/40"><CircleAlert size={15} className="mt-0.5 shrink-0 text-amber-300/65" />The current runtime does not establish scientifically validated deception inference. The product objective remains deception detection.</div></div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[.012] py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex items-end justify-between gap-6"><div><SectionLabel>Built for serious analysis</SectionLabel><h2 className="mt-4 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Where structured vocal evidence can matter.</h2></div><ArrowRight className="hidden text-white/25 sm:block" /></div><div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{useCases.map(([title, description, Icon]) => <article key={title} className="rounded-lg border border-white/8 bg-[#090d13] p-6"><Icon size={18} className="text-blue-300/70" /><h3 className="mt-8 text-base font-semibold">{title}</h3><p className="mt-2 text-xs leading-6 text-white/38">{description}</p><a href="#briefing" className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-white/55 no-underline hover:text-white">Explore <ArrowRight size={13} /></a></article>)}</div></div>
        </section>

        <section id="briefing" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018] p-7 sm:p-10 lg:p-14"><div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgba(47,127,255,.14),transparent_42%),radial-gradient(circle_at_90%_70%,rgba(47,127,255,.06),transparent_32%)]" /><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><div className="flex items-center gap-2 text-xs font-medium text-blue-200/80"><Sparkles size={14} /> Project briefing</div><h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-.035em] sm:text-5xl">A deeper look at what VoxVector is being built to become.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">Read the product mission, analytical architecture, scientific boundaries, evidence model and long term capability vision behind the system.</p></div><div className="flex flex-wrap gap-3"><a href="https://github.com/darenprince/darenprince-author/blob/main/docs/crownlabsbible/02-products/voxvector.md" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black no-underline hover:bg-white/90"><BookOpen size={16} /> Project Briefing</a><a href="https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs" className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[.025] px-5 py-3 text-sm font-medium text-white/80 no-underline hover:bg-white/[.06]"><FileText size={16} /> Documentation</a></div></div></div>
        </section>

        <section id="legal" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8 lg:pb-28">
          <div className="rounded-xl border border-white/8 bg-white/[.018] p-6 sm:p-8"><div className="grid gap-6 md:grid-cols-3"><div><SectionLabel>Responsible use</SectionLabel><h2 className="mt-3 text-xl font-semibold">Clear about evidence and limits.</h2><p className="mt-3 text-sm leading-6 text-white/40">VoxVector is designed to support structured analysis, not replace judgment or establish certainty from a voice alone.</p></div><a href="https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/PRIVACY.md" className="rounded-lg border border-white/8 bg-black/15 p-5 no-underline transition hover:border-white/15 hover:bg-white/[.03]"><LockKeyhole size={16} className="text-blue-300/70" /><div className="mt-4 text-sm font-medium">Privacy</div><div className="mt-1 text-xs leading-5 text-white/35">Privacy principles and current product data handling position.</div></a><a href="https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/TERMS.md" className="rounded-lg border border-white/8 bg-black/15 p-5 no-underline transition hover:border-white/15 hover:bg-white/[.03]"><FileText size={16} className="text-blue-300/70" /><div className="mt-4 text-sm font-medium">Terms</div><div className="mt-1 text-xs leading-5 text-white/35">Product use terms and analytical limitations.</div></a></div></div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/8 bg-[#070a0f]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div><Logo /><p className="mt-5 max-w-sm text-xs leading-6 text-white/35">Advanced vocal deception analysis built around measurable evidence, transparent methodology and disciplined interpretation.</p><div className="mt-5 flex items-center gap-2 text-[10px] text-white/30"><LockKeyhole size={13} /> Privacy conscious analysis architecture</div></div>
            <FooterColumn title="Product" links={[['Overview', '#product'], ['How it works', '#workflow'], ['Technology', '#technology'], ['Research', '#research']]} />
            <FooterColumn title="Resources" links={[['Project Briefing', '#briefing'], ['Documentation', 'https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs'], ['Developer Console', '/voxvector/developer'], ['GitHub', 'https://github.com/darenprince/darenprince-author']]} />
            <FooterColumn title="Legal and company" links={[['Privacy Policy', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/PRIVACY.md'], ['Terms of Service', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/TERMS.md'], ['Security', 'https://github.com/darenprince/darenprince-author/blob/main/VoxVector/docs/SECURITY.md'], ['Contact', '/contact.html']]} />
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 text-[10px] text-white/25 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Crown Labs. VoxVector. All rights reserved.</span><span className="flex items-center gap-4"><a href="/voxvector/developer" className="inline-flex items-center gap-1.5 no-underline hover:text-white/50"><Code2 size={12} /> Developer</a><a href="https://github.com/darenprince/darenprince-author" className="inline-flex items-center gap-1.5 no-underline hover:text-white/50"><Github size={12} /> Source</a></span></div>
        </div>
      </footer>
    </div>
  )
}

function FooterColumn({ title, links }) {
  return <div><div className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/45">{title}</div><div className="mt-4 grid gap-3">{links.map(([label, href]) => <a key={label} href={href} className="text-xs text-white/35 no-underline transition hover:text-white/75">{label}</a>)}</div></div>
}

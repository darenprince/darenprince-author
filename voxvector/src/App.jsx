import { useMemo, useState } from 'react'
import { Activity, ArrowRight, AudioLines, BarChart3, BookOpen, BrainCircuit, Check, ChevronRight, CircleAlert, Code2, FileAudio, Github, Globe2, Layers3, LockKeyhole, Menu, Microscope, Network, Play, Scale, Search, ShieldCheck, Terminal, Waves, X, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { AreaChart, BarChart, Card as TremorCard, ProgressBar } from '@tremor/react'
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

const signalData = [
  { time: '00:00', Acoustic: 18, Prosody: 22, Linguistics: 12 }, { time: '00:20', Acoustic: 32, Prosody: 28, Linguistics: 16 },
  { time: '00:40', Acoustic: 25, Prosody: 38, Linguistics: 22 }, { time: '01:00', Acoustic: 46, Prosody: 35, Linguistics: 28 },
  { time: '01:20', Acoustic: 39, Prosody: 49, Linguistics: 31 }, { time: '01:40', Acoustic: 58, Prosody: 42, Linguistics: 37 },
  { time: '02:00', Acoustic: 51, Prosody: 56, Linguistics: 42 }, { time: '02:20', Acoustic: 67, Prosody: 52, Linguistics: 47 },
  { time: '02:40', Acoustic: 60, Prosody: 64, Linguistics: 53 }, { time: '03:00', Acoustic: 72, Prosody: 61, Linguistics: 58 },
]

const chartColors = ['[#525252]', '[#a3a3a3]', '[#d4d4d4]']
const CROWN_LABS_VIEWER = '/docs/crownlabsbible/docs/viewer.html'
const CROWN_LABS_VOXVECTOR = `${CROWN_LABS_VIEWER}?doc=../04-product-dossiers/VoxVector/overview.md`

function Logo() {
  return (
    <a href="/voxvector/" className="vv-logo-lockup group no-underline" aria-label="VoxVector home">
      <img src="/voxvector/assets/voxvector-icon-final-color.png" alt="" className="vv-logo-icon" />
      <img src="/voxvector/assets/voxvector-wordmark-final-white.png" alt="VoxVector" className="vv-logo-wordmark" />
    </a>
  )
}

function SectionLabel({ children, icon: Icon }) { return <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--vv-accent-bright)]">{Icon && <Icon size={15} strokeWidth={2.1} />}{children}</div> }
function Reveal({ children, delay = 0, className = '' }) { return <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay }} className={className}>{children}</motion.div> }

function AudioWaveform() {
  const bars = useMemo(() => Array.from({ length: 170 }, (_, i) => { const t = i / 169; const phrase = Math.abs(Math.sin(t * Math.PI * 5.7 + 0.2)); const secondary = Math.abs(Math.sin(t * Math.PI * 17.3 + 1.1)); const pause = (t > .13 && t < .17) || (t > .34 && t < .385) || (t > .61 && t < .65) || (t > .84 && t < .88); const envelope = pause ? .035 : .11 + phrase * .52 + secondary * .2; return { x: 0.7 + t * 98.6, h: Math.min(46, 3 + envelope * 43), opacity: pause ? .22 : .45 + envelope * .55 } }), [])
  return <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" role="img" aria-label="Illustrative speech waveform"><defs><linearGradient id="vvWave" x1="0" x2="1"><stop offset="0" stopColor="#262626" /><stop offset=".45" stopColor="#737373" /><stop offset=".72" stopColor="#f5f5f5" /><stop offset="1" stopColor="#404040" /></linearGradient></defs><line x1="0" x2="100" y1="50" y2="50" stroke="rgba(255,255,255,.10)" strokeWidth=".3" />{bars.map((bar, i) => <rect key={i} x={bar.x} y={50 - bar.h} width=".32" height={bar.h * 2} rx=".16" fill="url(#vvWave)" opacity={bar.opacity} />)}</svg>
}

function SignalCard() { return <Reveal><TremorCard className="!rounded-lg !border-[var(--vv-border)] !bg-[var(--vv-surface)] !p-0 !ring-0 !shadow-[0_30px_100px_rgba(0,0,0,.35)]"><div className="flex items-center justify-between border-b border-[var(--vv-border)] px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><FileAudio size={19} className="text-[var(--vv-accent-bright)]" /><div><div className="text-base font-semibold text-white">Audio signal</div><div className="mt-0.5 text-sm text-white/[0.42]">Illustrative analysis surface</div></div></div><Badge variant="default">Observation</Badge></div><div className="p-5 sm:p-7"><div className="flex items-center justify-between text-sm text-white/[0.42]"><span>INTERVIEW_SAMPLE.WAV</span><span>03:00</span></div><div className="mt-5 rounded-md border border-[var(--vv-border)] bg-[#111111] p-4 sm:p-5"><div className="h-40 sm:h-52"><AudioWaveform /></div><div className="mt-3 flex justify-between text-xs font-medium tracking-[0.08em] text-white/[0.28]"><span>00:00</span><span>01:00</span><span>02:00</span><span>03:00</span></div></div><div className="mt-5 grid gap-5 sm:grid-cols-[1.4fr_.6fr]"><div><div className="mb-3 flex items-center justify-between text-sm"><span className="font-semibold text-white/[.72]">Signal families</span><span className="text-white/[.3]">illustrative</span></div><AreaChart className="h-28" data={signalData} index="time" categories={['Acoustic', 'Prosody', 'Linguistics']} colors={chartColors} showLegend={false} showGridLines={false} showYAxis={false} showXAxis={false} showTooltip={false} /></div><div className="border-t border-[var(--vv-border)] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"><div className="text-xs font-bold uppercase tracking-[.16em] text-[var(--vv-accent-bright)]">Readout</div><div className="mt-3 space-y-3">{[['Pitch', 'dynamic'], ['Intensity', 'variable'], ['Speech', 'continuous']].map(([a,b]) => <div key={a}><div className="text-sm font-medium text-white/[.68]">{a}</div><div className="text-sm text-white/[.3]">{b}</div></div>)}</div></div></div></div></TremorCard></Reveal> }
function StageRow({ stage, index }) { const Icon = stage.icon; return <Reveal delay={index * .04}><div className="group grid gap-5 border-t border-[var(--vv-border)] py-8 md:grid-cols-[70px_48px_1fr_170px] md:items-center"><div className="font-mono text-sm font-semibold tracking-[.16em] text-[var(--vv-gold)]">{stage.number}</div><Icon size={34} strokeWidth={1.45} className="text-[var(--vv-accent-bright)] transition-transform duration-300 group-hover:scale-110" /><div><h3 className="text-2xl font-semibold tracking-[-.03em] text-white sm:text-3xl">{stage.title}</h3><p className="mt-2 max-w-2xl text-base leading-7 text-white/[.5]">{stage.description}</p></div><div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[.14em] text-white/[.32] md:justify-end">{index === 0 ? 'Quality gate' : index === 3 ? 'Decision gate' : 'Evidence layer'}<ChevronRight size={15} /></div></div></Reveal> }
function MethodRow({ item, index }) { const Icon = item.icon; return <Reveal delay={index * .035}><div className="group grid gap-4 border-t border-[var(--vv-border)] py-7 md:grid-cols-[56px_1fr_1fr] md:items-center"><Icon size={36} strokeWidth={1.45} className="text-[var(--vv-accent-bright)] transition-transform duration-300 group-hover:scale-110"/><h3 className="text-xl font-semibold tracking-[-.02em] text-white">{item.title}</h3><p className="max-w-xl text-base leading-6 text-white/[.46]">{item.text}</p></div></Reveal> }
function FooterColumn({ title, links }) { return <div><h3 className="text-sm font-bold uppercase tracking-[.16em] text-white/[.55]">{title}</h3><div className="mt-5 grid gap-3">{links.map(([label, href]) => <a key={label} href={href} className="text-base text-white/[.42] transition-colors hover:text-white no-underline">{label}</a>)}</div></div> }

export default function App() { const developer = window.location.pathname.replace(/\/+$/, '') === '/voxvector/developer' || window.location.hash === '#/developer'; if (developer) return <DeveloperGate onBack={() => { window.location.href = '/voxvector/' }}>{({ session, signOut }) => <DeveloperConsole session={session} signOut={signOut} />}</DeveloperGate>; return <Landing /> }

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const goToAnalysis = () => { window.location.href = '/voxvector/developer' }
  return <div className="min-h-screen overflow-x-clip bg-[var(--vv-bg)] text-white antialiased">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--vv-text)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--vv-bg)]">Skip to content</a>
    <header className="sticky top-0 z-50 border-b border-[var(--vv-border)] bg-[var(--vv-bg)]/90 backdrop-blur-xl"><div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-10"><Logo /><nav className="hidden items-center gap-7 text-sm font-medium text-white/[.54] lg:flex" aria-label="Primary navigation">{[['Product','#product'],['How it works','#workflow'],['Technology','#technology'],['Use cases','#use-cases'],['Resources','#briefing']].map(([label,href]) => <a key={label} href={href} className="transition-colors hover:text-white no-underline">{label}</a>)}<a href="/voxvector/developer" className="inline-flex items-center gap-2 transition-colors hover:text-white no-underline"><Terminal size={15}/>Developer</a></nav><div className="hidden items-center gap-2 md:flex"><a href="https://github.com/darenprince/darenprince-author/tree/main/voxvector" target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 border border-[var(--vv-border-strong)] bg-[var(--vv-panel)] px-4 text-sm font-semibold text-white/[.78] no-underline transition-colors hover:border-[var(--vv-accent-bright)] hover:text-white"><Github size={16}/>GitHub</a><a href="https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs" target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 border border-[var(--vv-border-strong)] bg-[var(--vv-panel)] px-4 text-sm font-semibold text-white/[.78] no-underline transition-colors hover:border-[var(--vv-accent-bright)] hover:text-white"><BookOpen size={16}/>Docs</a><a href="https://voxvector.crownlabs.tech/docs" target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 border border-[var(--vv-accent)] bg-[var(--vv-accent)] px-4 text-sm font-bold text-[var(--vv-bg)] no-underline transition-colors hover:bg-[var(--vv-accent-bright)]"><Code2 size={16}/>API Access</a></div><Button type="button" variant="secondary" size="icon" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} className="lg:hidden">{menuOpen ? <X size={19}/> : <Menu size={19}/>}</Button></div>{menuOpen && <motion.div id="mobile-navigation" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} className="border-t border-[var(--vv-border)] bg-[var(--vv-surface)] px-5 py-4 lg:hidden"><div className="grid gap-1 text-base font-medium text-white/[.68]">{[['Product','#product'],['How it works','#workflow'],['Technology','#technology'],['Use cases','#use-cases'],['Resources','#briefing'],['Developer','/voxvector/developer']].map(([label,href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="px-3 py-3 no-underline hover:text-white">{label}</a>)}<a href="https://github.com/darenprince/darenprince-author/tree/main/voxvector" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 border border-[var(--vv-border-strong)] bg-[var(--vv-panel)] px-4 py-3 text-sm font-semibold text-white/[.78] no-underline"><Github size={16}/>GitHub</a><a href="https://voxvector.crownlabs.tech/docs" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[var(--vv-accent)] bg-[var(--vv-accent)] px-4 py-3 text-sm font-bold text-[var(--vv-bg)] no-underline"><Code2 size={16}/>API Access</a></div></motion.div>}</header>
    <main id="main-content">

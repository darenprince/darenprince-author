import { motion } from 'motion/react'
import { ArrowRight, AudioLines, BookOpen, CheckCircle2, CircleAlert, Database, Github, LockKeyhole, ShieldCheck, Waves } from 'lucide-react'

const stages = [
  ['01', 'Eligibility', 'Determine whether the recording and supplied context are suitable for analysis.'],
  ['02', 'Evidence', 'Collect acoustic, spectral, temporal, voice-quality, transcript and interaction observations.'],
  ['03', 'Candidate', 'Assess evidence convergence, conflict, uncertainty and alternative explanations.'],
  ['04', 'Disposition', 'Apply reliability and scientific validation gates before any inferential conclusion.']
]

const methods = [
  'Acoustic energy and intensity', 'F0 and intensity dynamics', 'HNR and harmonicity',
  'Spectral centroid, spread, flux and rolloff', 'MFCC / cepstral observations', 'Formant candidate tracking',
  'Pause topology and timing', 'Within-speaker baselines', 'Response latency', 'Transcript disfluency observations'
]

function Status({ children, good = false }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-white/75"><span className={good ? 'h-1.5 w-1.5 rounded-full bg-emerald-400' : 'h-1.5 w-1.5 rounded-full bg-white/40'} />{children}</span>
}

export default function App() {
  return <div className="min-h-screen overflow-hidden bg-[#080a0e] text-white">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(255,255,255,.08),transparent_28%),radial-gradient(circle_at_15%_35%,rgba(120,150,255,.06),transparent_30%)]" />
    <header className="relative z-10 border-b border-white/10 bg-[#080a0e]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3 no-underline">
          <div className="grid h-9 w-9 place-items-center border border-white/15 bg-white/[.04]"><Waves size={19} /></div>
          <div><div className="text-sm font-semibold tracking-wide">VoxVector</div><div className="text-[10px] uppercase tracking-[.18em] text-white/40">Crown Labs</div></div>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/55 md:flex">
          <a href="#workflow" className="hover:text-white">Workflow</a><a href="#methods" className="hover:text-white">Methods</a><a href="#science" className="hover:text-white">Scientific state</a><a href="https://voxvector.crownlabs.tech" className="hover:text-white">Open API</a>
        </nav>
      </div>
    </header>

    <main id="top" className="relative z-10">
      <section className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div>
          <div className="mb-6 flex flex-wrap gap-2"><Status>Active development</Status><Status>Vocal + audio intelligence</Status><Status>Evidence driven</Status></div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-6xl lg:text-7xl">Find the evidence behind the voice.</motion.h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">VoxVector is being built to analyze interview and conversational audio through structured, reliability-aware, multimethod evidence analysis.</p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/45">A nervous pause, pitch change, hesitation, or stress response is not a verdict. VoxVector is designed to ask the harder question: <strong className="text-white/75">what does the available evidence actually support?</strong></p>
          <div className="mt-9 flex flex-wrap gap-3"><a href="#workflow" className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black no-underline transition hover:bg-white/90">Explore the system <ArrowRight size={16} /></a><a href="https://voxvector.crownlabs.tech" className="inline-flex items-center gap-2 border border-white/15 bg-white/[.03] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-white/[.07]">Open VoxVector</a></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="border border-white/10 bg-white/[.025] p-5 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-white/10 pb-4"><div className="text-xs uppercase tracking-[.18em] text-white/45">Analysis pipeline</div><Status good>System ready</Status></div>
          <div className="space-y-3 py-5">{stages.map(([n, title, desc], i) => <motion.div key={n} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .35 + i*.12 }} className="flex gap-4 border border-white/8 bg-black/20 p-4"><div className="text-xs text-white/30">{n}</div><div><div className="font-medium">{title}</div><div className="mt-1 text-sm leading-6 text-white/45">{desc}</div></div></motion.div>)}</div>
          <div className="flex items-center gap-3 border-t border-white/10 pt-4 text-xs text-white/40"><ShieldCheck size={15} /> Reliability, provenance and uncertainty remain first-class states.</div>
        </motion.div>
      </section>

      <section id="workflow" className="border-y border-white/10 bg-white/[.015] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><div className="text-xs uppercase tracking-[.2em] text-white/35">The analytical path</div><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built around evidence, not theatrics.</h2><p className="mt-4 leading-7 text-white/50">The architecture keeps eligibility, evidence, candidate classification and final disposition separate so the interface never turns a visualization into a claim.</p></div><div className="mt-10 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">{stages.map(([n, title, desc]) => <article key={n} className="bg-[#080a0e] p-6"><div className="text-xs tracking-[.18em] text-white/25">{n}</div><h3 className="mt-8 text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{desc}</p></article>)}</div></div></section>

      <section id="methods" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><div className="text-xs uppercase tracking-[.2em] text-white/35">Current observational engine</div><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Measure what the runtime actually supports.</h2><p className="mt-5 leading-7 text-white/50">The current engine provides a substantial observational foundation. These measurements are evidence inputs and do not individually prove deception.</p></div><div className="grid gap-3 sm:grid-cols-2">{methods.map(method => <div key={method} className="flex items-start gap-3 border border-white/10 bg-white/[.025] p-4 text-sm text-white/70"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-white/45" />{method}</div>)}</div></div></section>

      <section id="science" className="border-y border-white/10 bg-white/[.015] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-5 lg:grid-cols-3"><article className="border border-white/10 bg-[#080a0e] p-6"><AudioLines className="text-white/45" /><h3 className="mt-7 text-xl font-medium">Deeper audio intelligence</h3><p className="mt-3 text-sm leading-6 text-white/45">Richer voice-quality and spectral descriptors, glottal-source measures, learned representations and temporal models remain planned research.</p></article><article className="border border-white/10 bg-[#080a0e] p-6"><Database className="text-white/45" /><h3 className="mt-7 text-xl font-medium">Conversational intelligence</h3><p className="mt-3 text-sm leading-6 text-white/45">ASR, alignment, richer linguistic structure, consistency analysis, question/answer relationships and speaker-aware baselines are future capability work.</p></article><article className="border border-white/10 bg-[#080a0e] p-6"><LockKeyhole className="text-white/45" /><h3 className="mt-7 text-xl font-medium">Validated inference</h3><p className="mt-3 text-sm leading-6 text-white/45">Calibration, speaker-disjoint evaluation, cross-dataset testing, explicit abstention and external replication must precede controlled inferential deployment.</p></article></div><div className="mt-8 flex gap-4 border-l-2 border-white/30 bg-white/[.025] p-5 text-sm leading-6 text-white/55"><CircleAlert className="mt-0.5 shrink-0 text-white/55" size={18} /><span><strong className="text-white/80">Current scientific state:</strong> VoxVector is not yet a scientifically validated deception detector. The current runtime provides observational analysis and guarded indeterminate classification.</span></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="flex flex-col justify-between gap-8 border border-white/10 bg-white/[.025] p-7 sm:p-10 md:flex-row md:items-end"><div><BookOpen className="text-white/45" /><h2 className="mt-6 text-3xl font-semibold tracking-tight">Continue into the canonical project.</h2><p className="mt-3 max-w-xl text-white/45">Architecture, methodology, validation, capability status and the development roadmap remain maintained in the repository.</p></div><a href="https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs" className="inline-flex shrink-0 items-center gap-2 border border-white/15 px-5 py-3 text-sm font-medium no-underline hover:bg-white/[.06]"><Github size={16} /> Project documentation</a></div></section>
    </main>

    <footer className="relative z-10 border-t border-white/10 py-8"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 text-xs text-white/30 sm:flex-row sm:justify-between lg:px-8"><span>© Crown Labs · VoxVector</span><span>Evidence based. Reliability aware. Scientifically disciplined.</span></div></footer>
  </div>
}

import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Sparkle, Target, TrendUp } from 'phosphor-react'

const SiteFooter = () => {
  return (
    <footer className="mt-16 border-t border-white/5 bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/15 text-sky-200">
                <Sparkle size={18} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-pink-200">Vibe Prism</p>
                <p className="text-sm font-semibold text-slate-50">Nexus Who Vibe Lab</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              A playful personality quiz for people who want to understand the energy they bring
              into every room. Light, fun, and private by design.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Vibe Highlights</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <TrendUp size={16} className="text-sky-300" />
                Mood-friendly personality mapping
              </li>
              <li className="flex items-center gap-2">
                <Target size={16} className="text-sky-300" />
                Signature archetypes with playful cues
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-sky-300" />
                Private-by-default results you control
              </li>
            </ul>
          </div>
          <div className="glass-panel p-5">
            <p className="text-sm font-semibold text-slate-100">Ready to capture your profile?</p>
            <p className="mt-2 text-xs text-slate-400">
              Launch the quiz, lock in your token, and decode whenever you want.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/quiz" className="button-primary">
                Start the quiz
              </Link>
              <Link to="/restore" className="button-secondary">
                Decode token
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 Vibe Prism — Nexus Who Minisite. All rights reserved.</span>
          <span>Encrypted locally. Nothing leaves your device without permission.</span>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sparkle } from 'phosphor-react'

const navItems = [
  { label: 'Overview', to: '/' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'Results', to: '/result' },
  { label: 'Restore', to: '/restore' },
]

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200">
            <Sparkle size={18} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-200">Vibe Prism</p>
            <p className="text-sm font-semibold text-slate-50">Nexus Who Minisite</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/quiz" className="button-primary hidden sm:inline-flex">
            Start the quiz
          </Link>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader

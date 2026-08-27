import { useState } from 'react'
import { Code2, Menu, Terminal, X } from 'lucide-react'

const navigation = [
  ['Product', '#product'],
  ['How it works', '#workflow'],
  ['Technology', '#technology'],
  ['Use cases', '#use-cases'],
  ['Resources', '#briefing'],
]

function Logo() {
  return (
    <a href="/voxvector/" className="vv-logo-lockup group no-underline" aria-label="VoxVector home">
      <img src="/voxvector/assets/voxvector-icon-final-color.png" alt="" className="vv-logo-icon" />
      <img src="/voxvector/assets/voxvector-wordmark-final-white.png" alt="VoxVector" className="vv-logo-wordmark" />
    </a>
  )
}

export default function SiteHeader({ userMenu = null, actions = null, mobileActions = null, mobileMenuButton = null, active = null }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--vv-border)] bg-[var(--vv-bg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/[.54] lg:flex" aria-label="Primary navigation">
          {navigation.map(([label, href]) => <a key={label} href={href} aria-current={active === label ? 'page' : undefined} className="transition-colors hover:text-white no-underline">{label}</a>)}
          <a href="/voxvector/developer" className="inline-flex items-center gap-2 transition-colors hover:text-white no-underline"><Terminal size={15} />Developer</a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {actions || <a href="https://github.com/darenprince/darenprince-author/tree/main/voxvector" target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 border border-[var(--vv-border-strong)] bg-[var(--vv-panel)] px-4 text-sm font-semibold text-white/[.78] no-underline transition-colors hover:border-[var(--vv-accent-bright)] hover:text-white"><Code2 size={16} />GitHub</a>}
          {userMenu}
        </div>
        {mobileMenuButton || <button type="button" className="inline-flex h-10 w-10 items-center justify-center border border-[var(--vv-border)] text-white lg:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>}
      </div>
      {menuOpen && <nav className="border-t border-[var(--vv-border)] bg-[var(--vv-bg)] px-5 py-5 lg:hidden" aria-label="Mobile navigation">{navigation.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-[var(--vv-border)] py-4 text-base font-medium text-white/[.68] no-underline">{label}</a>)}<a href="/voxvector/developer" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-4 text-base font-semibold text-white no-underline"><Terminal size={16} />Developer</a>{mobileActions}{userMenu && <div className="border-t border-[var(--vv-border)] pt-4">{userMenu}</div>}</nav>}
    </header>
  )
}

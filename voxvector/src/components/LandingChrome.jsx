import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { ArrowUpRight, BookOpen, Code2, FileText, Github, Globe2, Instagram, Linkedin, Menu, ShieldCheck, Terminal, X, Youtube, UserRound, Twitter } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

const CROWN_LABS_VIEWER = '/docs/crownlabsbible/docs/viewer.html'
const CROWN_LABS_VOXVECTOR = `${CROWN_LABS_VIEWER}?doc=../04-product-dossiers/VoxVector/overview.md`

const menuItems = [
  { label: 'Product', href: '#product', icon: Globe2 },
  { label: 'How it works', href: '#workflow', icon: FileText },
  { label: 'Technology', href: '#technology', icon: Code2 },
  { label: 'Use cases', href: '#use-cases', icon: ShieldCheck },
  { label: 'Project briefing', href: CROWN_LABS_VOXVECTOR, icon: BookOpen },
]

function HeaderControls({ onMenu }) {
  const [accountOpen, setAccountOpen] = useState(false)
  return <div className="vv-public-controls" aria-label="VoxVector utilities">
    <div className="vv-public-account-wrap">
      <button type="button" className="vv-public-icon-button" aria-label="Open account menu" aria-expanded={accountOpen} onClick={() => setAccountOpen((value) => !value)}><UserRound size={17} strokeWidth={1.8} /></button>
      <AnimatePresence>{accountOpen && <motion.div initial={{ opacity: 0, y: -5, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -5, scale: .98 }} className="vv-account-popover" role="menu">
        <div className="vv-account-heading"><span className="vv-account-avatar"><UserRound size={16} /></span><span><strong>Account</strong><small>VoxVector access</small></span></div>
        <a href="/voxvector/developer" role="menuitem"><Terminal size={15} /> Developer Console <ArrowUpRight size={13} /></a>
        <a href="/voxvector/developer" role="menuitem"><ShieldCheck size={15} /> Sign in / manage access</a>
      </motion.div>}</AnimatePresence>
    </div>
    <button type="button" className="vv-public-menu-button" onClick={onMenu} aria-label="Open navigation menu"><Menu size={19} strokeWidth={1.8} /><span>Menu</span></button>
  </div>
}

function SideMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('vv-menu-open')
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.classList.remove('vv-menu-open') }
  }, [open, onClose])

  return createPortal(<AnimatePresence>{open && <div className="vv-side-menu-layer">
    <motion.button type="button" aria-label="Close navigation" className="vv-side-menu-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
    <motion.aside className="vv-side-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 360, damping: 34 }} aria-label="VoxVector navigation">
      <div className="vv-side-menu-head"><div><span className="vv-side-menu-kicker">VOXVECTOR</span><h2>Explore</h2></div><button type="button" className="vv-public-icon-button" onClick={onClose} aria-label="Close navigation"><X size={19} /></button></div>
      <div className="vv-side-menu-rule" />
      <nav className="vv-side-menu-nav">
        {menuItems.map(({ label, href, icon: Icon }) => <a key={label} href={href} onClick={onClose}><span className="vv-side-menu-icon"><Icon size={18} strokeWidth={1.7} /></span><span>{label}</span><ArrowUpRight size={14} className="vv-side-menu-arrow" /></a>)}
        <div className="vv-side-menu-rule vv-side-menu-rule-spaced" />
        <a href="/voxvector/developer" onClick={onClose}><span className="vv-side-menu-icon"><Terminal size={18} /></span><span>Developer Console</span><ArrowUpRight size={14} className="vv-side-menu-arrow" /></a>
        <a href="https://github.com/darenprince/darenprince-author/tree/main/VoxVector/docs" target="_blank" rel="noreferrer" onClick={onClose}><span className="vv-side-menu-icon"><BookOpen size={18} /></span><span>GitHub VoxVector Docs</span><ArrowUpRight size={14} className="vv-side-menu-arrow" /></a>
        <a href="https://voxvector.crownlabs.tech/docs" target="_blank" rel="noreferrer" onClick={onClose}><span className="vv-side-menu-icon"><Code2 size={18} /></span><span>API Documentation</span><ArrowUpRight size={14} className="vv-side-menu-arrow" /></a>
        <a href={CROWN_LABS_VIEWER} onClick={onClose}><span className="vv-side-menu-icon"><ShieldCheck size={18} /></span><span>Crown Labs Documents</span><ArrowUpRight size={14} className="vv-side-menu-arrow" /></a>
      </nav>
      <div className="vv-side-menu-foot"><span>Built by Crown Labs</span><a href="https://github.com/darenprince/darenprince-author/tree/main/voxvector" target="_blank" rel="noreferrer"><Github size={15} /> Frontend source</a></div>
    </motion.aside>
  </div>}</AnimatePresence>, document.body)
}

function FooterEnhancement() {
  const footer = document.querySelector('footer')
  if (!footer) return null
  const target = footer.querySelector('.footer-enhancement-mount') || (() => { const node = document.createElement('div'); node.className = 'footer-enhancement-mount'; footer.appendChild(node); return node })()
  return createPortal(<div className="vv-footer-enhancement">
    <div className="vv-footer-socials" aria-label="Social media">
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
      <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X"><Twitter size={16} /></a>
      <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={16} /></a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
    </div>
    <a className="vv-crownlabs-lockup" href={CROWN_LABS_VIEWER} aria-label="Open Crown Labs documents"><img src="/labs/assets/crown-labs-logo.png" alt="Crown Labs" /><span>Corporate documents</span></a>
  </div>, target)
}

export default function LandingChrome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerTarget, setHeaderTarget] = useState(null)
  const [footerReady, setFooterReady] = useState(false)
  useEffect(() => {
    const header = document.querySelector('header.sticky')
    const target = header?.firstElementChild || null
    const mobileButton = header?.querySelector('button.lg\\:hidden')
    if (mobileButton) mobileButton.classList.add('vv-original-mobile-menu')
    if (header) header.classList.add('vv-public-header')
    setHeaderTarget(target)
    setFooterReady(Boolean(document.querySelector('footer')))
    return () => mobileButton?.classList.remove('vv-original-mobile-menu')
  }, [])
  if (!headerTarget) return <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
  return <>{createPortal(<HeaderControls onMenu={() => setMenuOpen(true)} />, headerTarget)}<SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />{footerReady && <FooterEnhancement />}</>
}

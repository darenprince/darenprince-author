import { useEffect, useRef, useState } from 'react'
import { Activity, ArrowRight, BookOpen, Code2, Cpu, FileText, Layers3, LoaderCircle, Terminal, UserRound, ShieldCheck } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../lib/api'
import Sheet from './ui/Sheet'
import SharpIcon from './SharpIcon'
import './SiteHeader.css'
import '../Typography.css'
const navigation = [
  { label: 'Product', href: '#product', Icon: Layers3, detail: 'Platform overview and primary analysis workflow.' },
  { label: 'How it works', href: '#workflow', Icon: Activity, detail: 'Eligibility, evidence, candidate, and disposition.' },
  { label: 'Technology', href: '#technology', Icon: Cpu, detail: 'Audio, acoustic, temporal, and linguistic evidence.' },
  { label: 'Use cases', href: '#use-cases', Icon: FileText, detail: 'Investigations, research, professional, and enterprise.' },
  { label: 'Resources', href: '#briefing', Icon: BookOpen, detail: 'Project briefing and documentation.' },
]
function Logo() { return <a href="/voxvector/" className="vv-logo-lockup group no-underline" aria-label="VoxVector home"><img src="/voxvector/voxvector-icon-final-color.png.PNG" alt="" className="vv-logo-icon"/><img src="/voxvector/VoxVector-logo-word.png" alt="VoxVector" className="vv-logo-wordmark"/></a> }
function MenuGlyph({ open = false }) { return <span className={`vv-menu-glyph${open ? ' vv-menu-glyph--close' : ''}`} aria-hidden="true"><span/><span/></span> }
function MenuTrigger({ open, onClick, label = 'Open navigation' }) { return <button type="button" className="vv-menu-trigger inline-flex h-9 w-9 shrink-0 items-center justify-center border-0 bg-transparent p-0" onClick={onClick} aria-label={open ? 'Close navigation' : label} aria-expanded={open}><MenuGlyph open={open}/></button> }
function GitHubMark({ size=17 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.586 2 12.242c0 4.523 2.865 8.356 6.839 9.71.5.095.682-.223.682-.496 0-.244-.009-.892-.014-1.75-2.782.62-3.369-1.37-3.369-1.37-.455-1.183-1.11-1.498-1.11-1.498-.908-.64.069-.627.069-.627 1.004.072 1.532 1.056 1.532 1.056.892 1.567 2.341 1.114 2.91.852.091-.665.349-1.114.635-1.37.091-.665.349-1.114.635-1.37-2.22-.26-4.555-1.139-4.555-5.07 0-1.12.39-2.035 1.03-2.753.64.718 1.028 1.633 1.028 2.753 0 3.941-2.339 4.807-4.566 5.062.359.32.678.952.678 1.919 0 1.386-.012 2.505-.012 2.845 0 .276.18.596.688.495C19.14 20.594 22 16.763 22 12.242 22 6.586 17.523 2 12 2Z"/></svg> }
function IconButton({ href, label, children, onClick }) { const className='inline-flex h-9 w-9 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-white/55 transition hover:text-white'; return href ? <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={label} title={label}>{children}</a> : <button type="button" onClick={onClick} className={className} aria-label={label} title={label}>{children}</button> }
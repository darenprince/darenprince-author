import { ArrowUpRight, BookOpen, Code2, FileAudio, Globe2, KeyRound, Layers3, LockKeyhole, Map, Microscope, Terminal, UserRound, Waves } from 'lucide-react'
import SiteHeader from './SiteHeader'

const groups = [
  {
    title: 'Public product',
    description: 'The canonical VoxVector landing experience and its verified section anchors.',
    icon: Globe2,
    links: [
      ['Home', '/voxvector/', 'Public VoxVector landing page'],
      ['Product overview', '/voxvector/#product', 'Platform identity and primary action'],
      ['How it works', '/voxvector/#workflow', 'Analytical path and four-stage decision architecture'],
      ['Technology', '/voxvector/#technology', 'Audio, acoustic, temporal, prosodic, and linguistic evidence'],
      ['Analysis interface', '/voxvector/#analysis-interface', 'Illustrative analytical workspace presentation'],
      ['Scientific discipline', '/voxvector/#scientific-discipline', 'Evidence, uncertainty, conflict, and reliability framing'],
      ['Use cases', '/voxvector/#use-cases', 'Investigative, professional, research, and enterprise contexts'],
      ['Project briefing', '/voxvector/#briefing', 'Project briefing and documentation entry point'],
    ],
  },
  {
    title: 'Analysis reference',
    description: 'Styled VoxVector frontend references. These are the preferred public destinations instead of raw repository Markdown.',
    icon: Microscope,
    links: [
      ['Analysis pipeline', '/voxvector/pipeline.html', 'Interactive 21-stage analysis architecture'],
      ['Analysis methods', '/voxvector/methods.html', 'Searchable method and data-point library'],
      ['Image index', '/voxvector/image-index/', 'VoxVector visual asset index'],
    ],
  },
  {
    title: 'Accounts and workspaces',
    description: 'Protected application surfaces. Access is determined by the trusted VoxVector account role and permission model.',
    icon: LockKeyhole,
    links: [
      ['Login', '/voxvector/login', 'Canonical Supabase login and role router'],
      ['User workspace', '/voxvector/app', 'Approved-user workspace'],
      ['Developer Console', '/voxvector/developer', 'Developer and administrator engineering console'],
    ],
  },
  {
    title: 'Technical and documentation',
    description: 'Operational references and source-backed documentation surfaces.',
    icon: Code2,
    links: [
      ['API documentation', 'https://voxvector.crownlabs.tech/docs', 'FastAPI route documentation for the preserved VoxVector API'],
      ['Crown Labs documents', '/docs/crownlabsbible/docs/viewer.html', 'Executive and product documentation viewer'],
      ['VoxVector source', 'https://github.com/darenprince/darenprince-author/tree/main/voxvector', 'Canonical frontend source workspace'],
      ['Machine sitemap', '/voxvector/sitemap.xml', 'XML sitemap used by crawlers and indexing tools'],
    ],
  },
  {
    title: 'Reference and compatibility',
    description: 'Published support surfaces retained for diagnostics, visual review, or compatibility.',
    icon: Terminal,
    links: [
      ['Loading demo', '/voxvector/loading-demo.html', 'Published loading-state demonstration surface'],
      ['Legacy VoxVector redirect', '/voxvector.html', 'Compatibility redirect to the canonical React application'],
    ],
  },
]

function SiteMapLink({ label, href, detail }) {
  const external = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="group flex min-h-24 items-start justify-between gap-5 border-t border-[var(--vv-border)] py-5 no-underline transition-colors hover:border-[var(--vv-border-strong)]"
    >
      <span className="min-w-0">
        <strong className="block text-base font-semibold text-white transition-colors group-hover:text-[var(--vv-accent-bright)]">{label}</strong>
        <span className="mt-1 block max-w-2xl text-sm leading-6 text-white/[.42]">{detail}</span>
        <code className="mt-2 block break-all text-[11px] text-white/[.26]">{href}</code>
      </span>
      <ArrowUpRight size={17} className="mt-1 shrink-0 text-white/[.3] transition-colors group-hover:text-[var(--vv-accent-bright)]" />
    </a>
  )
}

export default function SiteMapPage() {
  return (
    <div className="min-h-screen bg-[var(--vv-bg)] text-white antialiased">
      <a href="#site-map-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-[var(--vv-text)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--vv-bg)]">Skip to site map</a>
      <SiteHeader active="Resources" />
      <main id="site-map-content">
        <section className="border-b border-[var(--vv-border)] bg-[var(--vv-surface)]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:py-24 lg:px-10 lg:py-28">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[var(--vv-accent-bright)]"><Map size={15}/>VoxVector site map</div>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[.98] tracking-[-.05em] sm:text-7xl">Every published VoxVector surface, organized.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/[.48]">Use this page to move between the public product, styled analysis references, protected workspaces, documentation, and published support surfaces without hunting through repository files.</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-x-14 gap-y-16 lg:grid-cols-2">
            {groups.map(({ title, description, icon: Icon, links }) => (
              <section key={title} aria-labelledby={`site-map-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--vv-border)] bg-[var(--vv-surface)] text-[var(--vv-accent-bright)]"><Icon size={19} strokeWidth={1.7}/></span>
                  <div>
                    <h2 id={`site-map-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-2xl font-semibold tracking-[-.025em]">{title}</h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/[.4]">{description}</p>
                  </div>
                </div>
                <div className="mt-6">{links.map(([label, href, detail]) => <SiteMapLink key={`${label}-${href}`} label={label} href={href} detail={detail}/>)}</div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--vv-border)] bg-[var(--vv-surface)]">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:grid-cols-3 lg:px-10">
            <a href="/voxvector/pipeline.html" className="group no-underline"><Layers3 size={21} className="text-[var(--vv-accent-bright)]"/><strong className="mt-4 block text-lg">21-stage pipeline</strong><span className="mt-1 block text-sm leading-6 text-white/[.4]">Open the styled analysis architecture.</span></a>
            <a href="/voxvector/methods.html" className="group no-underline"><Waves size={21} className="text-[var(--vv-accent-bright)]"/><strong className="mt-4 block text-lg">Analysis methods</strong><span className="mt-1 block text-sm leading-6 text-white/[.4]">Explore the searchable method library.</span></a>
            <a href="/voxvector/login" className="group no-underline"><KeyRound size={21} className="text-[var(--vv-accent-bright)]"/><strong className="mt-4 block text-lg">Open VoxVector</strong><span className="mt-1 block text-sm leading-6 text-white/[.4]">Sign in and continue to the workspace assigned to your account.</span></a>
          </div>
        </section>
      </main>
      <footer className="border-t border-[var(--vv-border)] bg-black">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-10 text-sm text-white/[.32] sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>© 2026 Crown Labs. VoxVector. All rights reserved.</span>
          <span className="flex flex-wrap items-center gap-5"><a href="/voxvector/" className="inline-flex items-center gap-2 no-underline hover:text-white"><Globe2 size={13}/>Home</a><a href="/voxvector/methods.html" className="inline-flex items-center gap-2 no-underline hover:text-white"><BookOpen size={13}/>Methods</a><a href="/voxvector/developer" className="inline-flex items-center gap-2 no-underline hover:text-white"><UserRound size={13}/>Developer</a></span>
        </div>
      </footer>
    </div>
  )
}

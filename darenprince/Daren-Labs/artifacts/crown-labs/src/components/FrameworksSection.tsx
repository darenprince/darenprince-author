import { BookOpen, Mail } from 'lucide-react'

const frameworks = [
  {
    status: 'Prototype',
    name: 'Presence Architect',
    description:
      'A strategic system for cultivating attraction, authority, and emotional gravity through restraint and consistency.',
    items: ['Social signaling frameworks', 'DM playbooks', 'Presence audits'],
  },
  {
    status: 'Concept',
    name: 'Emotional Intelligence Stack',
    description:
      'A behavioral framework integrating psychology, emotional regulation, and decision-cycle mapping across products.',
    items: ['Emotion modeling', 'Decision-cycle cues', 'Ethical influence guardrails'],
  },
]

const books = [
  {
    abbr: 'GOM',
    status: 'Published',
    name: 'Game On! Master the Conversation & Win Her Heart',
    description: 'Published title anchored in Game On principles and conversational clarity.',
    cta: 'Buy book',
    ctaHref: 'https://www.darenprince.com/book.html',
  },
  {
    abbr: 'U',
    status: 'In progress',
    name: 'Unshakeable',
    description: 'In-progress manuscript focused on resilience and steadiness under pressure.',
    cta: 'Get updates',
    ctaHref: '#',
  },
]

function statusBadge(status: string) {
  const classes: Record<string, string> = {
    Prototype: 'text-blue-400 bg-blue-950/50 border-blue-800/50',
    Concept: 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50',
    Published: 'text-green-400 bg-green-950/50 border-green-800/50',
    'In progress': 'text-amber-400 bg-amber-950/50 border-amber-800/50',
  }
  return classes[status] || 'text-zinc-400 bg-zinc-900/50 border-zinc-700/50'
}

export default function FrameworksSection() {
  return (
    <>
      <section className="py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Frameworks</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Behavioral and communication systems that expand the portfolio's leverage.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {frameworks.map((fw, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-4">
                <div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${statusBadge(fw.status)}`}
                  >
                    {fw.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">{fw.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{fw.description}</p>
                <ul className="space-y-1">
                  {fw.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-primary">—</span> {item}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                  Request framework brief
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Books & IP</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Published and in-progress IP that anchors the portfolio narrative.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {books.map((book, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-16 rounded-lg border border-border bg-background flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">{book.abbr}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${statusBadge(book.status)}`}
                  >
                    {book.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">{book.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{book.description}</p>
                <a
                  href={book.ctaHref}
                  target={book.ctaHref.startsWith('http') ? '_blank' : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {book.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const statuses = [
  {
    label: 'Concept',
    meaning: 'Defined asset with structure and intent, not yet built.',
    nextGate: 'Finalize scope, prototype requirements, and core validation plan.',
    color: 'text-zinc-400',
    bg: 'bg-zinc-900/50',
  },
  {
    label: 'Prototype',
    meaning: 'Functional build exists with scoped feature set.',
    nextGate: 'Validate with real-world users and harden the core workflows.',
    color: 'text-blue-400',
    bg: 'bg-blue-950/50',
  },
  {
    label: 'Beta',
    meaning: 'Product is usable by testers, not yet hardened for scale.',
    nextGate: 'Stabilize critical workflows and close priority feedback loops.',
    color: 'text-amber-400',
    bg: 'bg-amber-950/50',
  },
  {
    label: 'Stage 1 Beta',
    meaning: 'Structured beta preparation with controlled testing.',
    nextGate: 'Complete Stage 1 testing and confirm readiness criteria.',
    color: 'text-red-400',
    bg: 'bg-red-950/50',
  },
  {
    label: 'Live',
    meaning: 'Publicly available and maintained.',
    nextGate: 'Maintain reliability and scale responsibly.',
    color: 'text-green-400',
    bg: 'bg-green-950/50',
  },
]

export default function StatusSection() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Status definitions</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Readiness labels used across every Crown Labs asset.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-3 px-5 py-3 border-b border-border">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Status
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              What it means
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Next gate
            </p>
          </div>
          {statuses.map((s, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 gap-4 px-5 py-4 ${i < statuses.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div>
                <span
                  className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${s.bg} ${s.color} border border-current/20`}
                >
                  {s.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{s.meaning}</p>
              <p className="text-sm text-muted-foreground">{s.nextGate}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

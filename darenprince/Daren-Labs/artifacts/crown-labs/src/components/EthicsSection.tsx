import { Lock, AlertTriangle, Database } from 'lucide-react'

const ethics = [
  {
    icon: <Lock className="h-5 w-5 text-primary" />,
    title: 'Privacy-first defaults',
    description:
      'Products that handle sensitive inputs default to minimal retention, clear consent, and transparent control.',
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-primary" />,
    title: 'Decision-support only',
    description:
      'No product positions itself as medical, legal, or therapy advice. Outputs are support signals, not directives.',
  },
  {
    icon: <Database className="h-5 w-5 text-primary" />,
    title: 'No retention by design',
    description:
      'Where applicable, products avoid storing data. If retention is required, it is explicit, scoped, and documented.',
  },
]

export default function EthicsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Ethics & Limits</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Hard boundaries that keep the work honest.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {ethics.map((e, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                {e.icon}
                <h3 className="text-sm font-semibold text-foreground">{e.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

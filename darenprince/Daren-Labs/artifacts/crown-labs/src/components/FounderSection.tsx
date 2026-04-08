import { Shield, Brain, FileCheck, Network } from 'lucide-react'

const attributes = [
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: 'Architect of the Crown Labs stack',
    description:
      'Daren Prince designs the portfolio as a unified system, aligning applied intelligence, behavioral strategy, and defensible IP into one interoperable product studio.',
  },
  {
    icon: <Brain className="h-5 w-5 text-primary" />,
    title: 'Behavioral and intelligence focus',
    description:
      'The approach blends psychology, security, and intelligence analysis to ship products that perform in high-trust, real-world environments.',
  },
  {
    icon: <FileCheck className="h-5 w-5 text-primary" />,
    title: 'Evidence-ready execution',
    description:
      'Every asset is built with accountability, auditability, and operational clarity to support enterprise-grade outcomes.',
  },
  {
    icon: <Network className="h-5 w-5 text-primary" />,
    title: 'Portfolio-level leverage',
    description:
      'Products are structured to stand alone while compounding the valuation of the entire ecosystem through strategic interoperability.',
  },
]

export default function FounderSection() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Meet the Founder & Chief Architect — <span className="text-primary">Daren Prince</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The strategic mind behind the Crown Labs ecosystem.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {attributes.map((attr, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 space-y-3 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                {attr.icon}
                <h3 className="text-sm font-semibold text-foreground">{attr.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{attr.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

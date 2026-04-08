import { CheckCircle } from 'lucide-react'

const designIntents = [
  'Evidence-ready intelligence over hype.',
  'Behavioral insight grounded in psychology.',
  'Privacy-first systems with accountable outputs.',
  'Interoperable platforms that compound value.',
]

const portfolioStructure = [
  'Revenue-ready or near-launch platforms.',
  'Mid-term scale assets for licensing or acquisition.',
  'High-upside IP positioned for defensible growth.',
  'Strategic interoperability across the stack.',
]

const executionDiscipline = [
  'Evidence-ready outputs and audit trails.',
  'Behavioral modeling without manipulation.',
  'Operational clarity for high-trust environments.',
  'Consistent, premium-grade product readiness.',
  'Scalable technology with ethical guardrails.',
]

const whatYoullSee = [
  'Narrative product descriptions with full context.',
  'Current and projected valuations per asset.',
  'Completion status, time-to-market, and revenue projections.',
]

export default function ExecutiveOverview() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Executive Overview</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A complete, uncompressed accounting of the Crown Labs portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              What This Portfolio Represents
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crown Labs is a vertically integrated product studio focused on applied intelligence.
              Each asset is designed to be revenue-generating on its own while compounding the
              defensible value of the entire ecosystem.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The portfolio spans AI intelligence engines, security and situational awareness
              systems, forensic analysis products, emotionally intelligent marketing, and
              relationship frameworks built for real-world outcomes.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Design Intent</h3>
            <p className="text-sm text-muted-foreground">
              Nothing in this portfolio is speculative. Each asset is defined, structured, and
              positioned for scale.
            </p>
            <ul className="space-y-2">
              {designIntents.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Portfolio Structure</h3>
            <p className="text-sm text-muted-foreground">
              Designed to balance immediate monetization with long-term enterprise value:
            </p>
            <ul className="space-y-2">
              {portfolioStructure.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">Execution Discipline</h3>
            <ul className="space-y-2">
              {executionDiscipline.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 rounded-xl border border-border bg-card p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">Portfolio Status</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Several platforms are revenue-ready or nearing launch, while others represent
                  high-upside intellectual property positioned for scale, licensing, or acquisition.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This report is the full, uncompressed accounting of the portfolio.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">What you'll see</h3>
                <ul className="space-y-2">
                  {whatYoullSee.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

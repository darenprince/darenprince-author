import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react'

const revenueProjections = [
  { year: 'Year 1', revenue: '$6,350,000' },
  { year: 'Year 2', revenue: '$18,150,000' },
  { year: 'Year 3', revenue: '$39,900,000' },
]

const statements = [
  'Multiple products are revenue-capable within 90 days.',
  'Flagship systems support long-term enterprise deployment.',
  'Assets are defined, structured, and positioned for scale.',
]

const closingStatements = [
  'Deliberate convergence of technical depth and behavioral intelligence.',
  'Capital accelerates value realization, not discovery.',
  'Portfolio readiness supports licensing, scale, and acquisition.',
]

export default function ValuationSection() {
  return (
    <section className="py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Portfolio Valuation & Net Worth Statement
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This section reflects the portfolio's as-is valuation, projected completed valuation,
            and consolidated revenue outlook across all products.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">As-is portfolio valuation</h3>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Low estimate</span>
                <span className="text-sm font-bold text-foreground">$17,750,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">High estimate</span>
                <span className="text-sm font-bold text-foreground">$28,100,000</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Current valuation reflects active development status.
            </p>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Projected valuation (completed)
              </h3>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Low estimate</span>
                <span className="text-sm font-bold text-primary">$56,500,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">High estimate</span>
                <span className="text-sm font-bold text-primary">$94,500,000</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Completion unlocks enterprise, licensing, and acquisition pathways.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Projected annual revenue</h3>
            </div>
            <p className="text-xs text-muted-foreground">Three-year consolidated outlook.</p>
            <div className="space-y-2">
              {revenueProjections.map((row) => (
                <div key={row.year} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{row.year}</span>
                  <span className="text-sm font-bold text-foreground">{row.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Portfolio statement</h3>
            <ul className="space-y-2">
              {statements.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-primary mt-0.5">—</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Closing statement</h3>
            <ul className="space-y-2">
              {closingStatements.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-primary mt-0.5">—</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

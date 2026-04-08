import { ArrowRight, Zap, Activity, Layers } from 'lucide-react'
import { products } from '@/data/products'
import { BetaTestersModal } from './modals/BetaTestersModal'
import { DeveloperApplicationModal } from './modals/DeveloperApplicationModal'
import { AnimatedCounter } from './animations/AnimatedCounter'
import { motion } from 'framer-motion'

const flagship = products.find((p) => p.flagship)!

export default function HeroSection() {
  const totalProducts = products.length
  const activeBeta = products.filter(
    (p) => p.status === 'Beta' || p.status === 'Stage 1 Beta'
  ).length
  const concepts = products.filter((p) => p.status === 'Concept').length

  const headlineText = 'Applied Intelligence Studio for Real-World Product Outcomes'
  const words = headlineText.split(' ')

  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Crown Labs
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground flex flex-wrap gap-x-3 gap-y-2">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="text-base text-muted-foreground font-medium">
              Shipping evidence-ready platforms, behavioral systems, and defensible IP.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crown Labs is a vertically integrated product studio building applied intelligence
              systems across security, forensics, behavioral psychology, emotionally intelligent
              marketing, and relationship frameworks.
            </p>
            <p className="text-sm font-semibold text-foreground leading-relaxed">
              Every product is designed to stand alone while compounding the value of a coordinated,
              interoperable ecosystem.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                See the portfolio
                <ArrowRight className="h-4 w-4" />
              </a>
              <BetaTestersModal
                trigger={
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-sm text-foreground hover:bg-card transition-colors">
                    Beta Testers
                  </button>
                }
              />
              <DeveloperApplicationModal
                trigger={
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-sm text-foreground hover:bg-card transition-colors">
                    Become A Crown Labs Developer
                  </button>
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Total products
                  </p>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={totalProducts} />
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Active beta builds
                  </p>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={activeBeta} />
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Concepts in pipeline
                  </p>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={concepts} />
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Flagship Intelligence
                </p>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
                  Most Ready
                </span>
              </div>
              <div className="p-5 space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{flagship.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    The flagship system leading the portfolio's readiness curve.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-4 space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      Readiness
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {flagship.readiness?.stage}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      Focus
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {flagship.readiness?.focus}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      Next Gate
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {flagship.readiness?.nextGate}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md border border-border text-xs text-muted-foreground">
                    Stage: {flagship.readiness?.stage}
                  </span>
                  <span className="px-2.5 py-1 rounded-md border border-border text-xs text-muted-foreground">
                    Focus: {flagship.readiness?.focus}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Next gate: {flagship.readiness?.nextGate}
                </p>

                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <p className="text-sm font-semibold text-foreground mb-1">Portfolio discipline</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every product lists the single milestone that advances its next phase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

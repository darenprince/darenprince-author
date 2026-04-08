import { useState, useRef } from 'react'
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'
import { type Product, getStatusColor, getCategoryColor } from '@/data/products'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { QuickViewModal } from './modals/QuickViewModal'
import { RequestAccessModal } from './modals/RequestAccessModal'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false)
  const progressRef = useRef(null)
  const isInView = useInView(progressRef, { once: true })

  const readinessScore =
    product.status === 'Stage 1 Beta'
      ? 85
      : product.status === 'Beta'
        ? 65
        : product.status === 'Prototype'
          ? 35
          : product.status === 'Concept'
            ? 15
            : 100

  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: '0 0 15px -3px rgba(255, 59, 59, 0.15)' }}
      className="rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/50 flex flex-col h-full"
    >
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center">
            <span className="text-xs font-bold text-muted-foreground">{product.abbr}</span>
          </div>
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(product.status)}`}
              >
                {product.status}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor(product.category)}`}
              >
                {product.category}
              </span>
            </div>
            <h3 className="text-base font-bold text-foreground">{product.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{product.categoryLabel}</p>
          </div>
        </div>

        {/* Description — always visible */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

        {/* Core capabilities — always visible */}
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Core capabilities
          </p>
          <ul className="space-y-1.5">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5 shrink-0">—</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Next gate — always visible */}
        <div className="mt-4 rounded-lg border border-border bg-background/40 p-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
            Next gate
          </p>
          <p className="text-xs text-foreground leading-relaxed">{product.nextGate}</p>
        </div>

        {/* Expand/Collapse: financials & charts */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4 border-t border-border pt-4">
                {/* Valuation signal */}
                <div className="rounded-lg border border-border bg-background/40 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Valuation signal
                    </p>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[10px] font-semibold">Rising</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-bold text-foreground">
                      As-is: {product.valuationAsIs}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      Projected: {product.valuationProjected}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground">
                      Low <span className="font-semibold text-foreground">{product.trendLow}</span>
                    </span>
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(product.trendAvg / product.trendHigh) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Avg <span className="font-semibold text-foreground">{product.trendAvg}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      High{' '}
                      <span className="font-semibold text-foreground">{product.trendHigh}</span>
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {product.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="text-center rounded-lg border border-border bg-background/40 p-3"
                    >
                      <p className="text-base font-bold text-foreground">{metric.value}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Readiness score */}
                <div ref={progressRef}>
                  <div className="flex justify-between items-end mb-1.5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      Readiness score
                    </p>
                    <span className="text-xs font-bold text-foreground">{readinessScore}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: '0%' }}
                      animate={isInView ? { width: `${readinessScore}%` } : { width: '0%' }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions row */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" /> Hide details
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" /> Financials & details
              </>
            )}
          </button>
          <div className="flex items-center gap-3">
            <QuickViewModal
              product={product}
              trigger={
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Quick view
                </button>
              }
            />
            <span className="text-border">|</span>
            <RequestAccessModal
              productName={product.name}
              trigger={
                <button className="text-xs text-primary font-medium hover:underline transition-colors">
                  Request access
                </button>
              }
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { products, type ProductStatus, type ProductCategory, statusOrder } from '@/data/products'
import ProductCard from './ProductCard'
import { motion, AnimatePresence } from 'framer-motion'

const statusOptions: ProductStatus[] = ['Stage 1 Beta', 'Beta', 'Prototype', 'Concept', 'Live']
const categoryOptions: ProductCategory[] = [
  'Intelligence',
  'Security',
  'Forensics',
  'Creative',
  'Relationship',
  'Cultural',
]

type SortMode = 'readiness' | 'strategic' | 'alpha'

export default function PortfolioSection() {
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'All'>('All')
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'All'>('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortMode>('readiness')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchStatus = statusFilter === 'All' || p.status === statusFilter
      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      return matchStatus && matchCategory && matchSearch
    })

    if (sort === 'readiness') {
      list = [...list].sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
    } else if (sort === 'alpha') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'strategic') {
      list = [...list].sort((a, b) => {
        const valA = parseFloat(a.valuationProjected.replace(/[^0-9.]/g, ''))
        const valB = parseFloat(b.valuationProjected.replace(/[^0-9.]/g, ''))
        return valB - valA
      })
    }

    return list
  }, [statusFilter, categoryFilter, search, sort])

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Product Portfolio</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Scan what exists, filter by readiness, and expand details without losing the high-level
            view.
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none"
            >
              <option value="readiness">Most ready first</option>
              <option value="strategic">Most strategic first</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-border bg-card p-4 space-y-4 mb-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                      Status
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setStatusFilter('All')}
                        className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                          statusFilter === 'All'
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        All
                      </button>
                      {statusOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                            statusFilter === s
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setCategoryFilter('All')}
                        className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                          categoryFilter === 'All'
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        All
                      </button>
                      {categoryOptions.map((c) => (
                        <button
                          key={c}
                          onClick={() => setCategoryFilter(c)}
                          className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                            categoryFilter === c
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No products match your filters.</p>
            <button
              onClick={() => {
                setStatusFilter('All')
                setCategoryFilter('All')
                setSearch('')
              }}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtered.map((product, i) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}

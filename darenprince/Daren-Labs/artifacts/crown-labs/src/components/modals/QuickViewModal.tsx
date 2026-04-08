import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { type Product, getStatusColor, getCategoryColor } from '@/data/products'
import { TrendingUp } from 'lucide-react'
import { RequestAccessModal } from './RequestAccessModal'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function QuickViewModal({
  product,
  trigger,
}: {
  product: Product
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-border bg-card p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-widest ${getStatusColor(product.status)}`}
            >
              {product.status}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-widest ${getCategoryColor(product.category)}`}
            >
              {product.category}
            </span>
          </div>

          <DialogTitle className="text-2xl font-bold text-foreground mb-2">
            {product.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mb-6">{product.description}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-border bg-background/40 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Valuation signal
                </p>
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-[10px] font-semibold">Rising</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-muted-foreground">As-is:</span>
                  <span className="text-sm font-bold text-foreground">{product.valuationAsIs}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-muted-foreground">Projected:</span>
                  <span className="text-sm font-bold text-foreground">
                    {product.valuationProjected}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {product.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-background/40 p-3 flex flex-col justify-center items-center text-center"
                >
                  <p className="text-lg font-bold text-foreground">{metric.value}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-1">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Core Capabilities
            </p>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-background/60 p-4 mb-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Next gate
            </p>
            <p className="text-sm text-foreground">{product.nextGate}</p>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-background/50 flex flex-col sm:flex-row gap-3 justify-end items-center mt-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-border text-muted-foreground pointer-events-none opacity-50"
                  >
                    View full page
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <RequestAccessModal
            productName={product.name}
            trigger={
              <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                Request access
              </Button>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function BetaTestersModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const products = [
    'CrownCode Intelligence Suite',
    'CrownCam',
    'Crown SOS',
    'Pic Detective',
    'AI Cherry Pie',
    'CrownCast',
    'Crown WatchTower',
    'LumiLogix',
    'Presence Architect',
    'Crown Forensics Lab',
    'Crown Relations AI',
  ]

  const toggleProduct = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim()
    const expertise = (formData.get('expertise') as string)?.trim()

    const newErrors: Record<string, string> = {}
    if (!name) newErrors.name = 'Name is required'
    if (!email) newErrors.email = 'Email is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/forms/beta-tester', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, products: selectedProducts, expertise }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      toast.success("Welcome to the Crown Labs beta program. We'll reach out with next steps.")
      setOpen(false)
      setErrors({})
      setSelectedProducts([])
      ;(e.target as HTMLFormElement).reset()
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-border bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Become a Beta Tester</DialogTitle>
          <DialogDescription>
            Get early access to Crown Labs products before public release.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bt-name">Full Name *</Label>
              <Input
                id="bt-name"
                name="name"
                placeholder="John Doe"
                className="border-border bg-background"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bt-email">Email address *</Label>
              <Input
                id="bt-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="border-border bg-background"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-3">
              <Label>Which products interest you?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {products.map((p) => (
                  <div key={p} className="flex items-center space-x-2">
                    <Checkbox
                      id={`bt-product-${p}`}
                      checked={selectedProducts.includes(p)}
                      onCheckedChange={() => toggleProduct(p)}
                    />
                    <Label
                      htmlFor={`bt-product-${p}`}
                      className="text-xs font-normal leading-tight cursor-pointer"
                    >
                      {p}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bt-expertise">Background / Expertise (optional)</Label>
              <Textarea
                id="bt-expertise"
                name="expertise"
                placeholder="Tell us about your technical or industry background..."
                className="border-border bg-background min-h-[80px]"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Join beta program'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

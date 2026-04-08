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

export function RequestAccessModal({
  trigger,
  productName,
}: {
  trigger: React.ReactNode
  productName: string
}) {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [understood, setUnderstood] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim()
    const org = (formData.get('org') as string)?.trim()
    const usecase = (formData.get('usecase') as string)?.trim()

    const newErrors: Record<string, string> = {}
    if (!name) newErrors.name = 'Name is required'
    if (!email) newErrors.email = 'Email is required'
    if (!understood) newErrors.understand = 'You must acknowledge this is a pre-release product'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/forms/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, productName, org, usecase }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      toast.success("Your request has been submitted. We'll be in touch.")
      setOpen(false)
      setErrors({})
      setUnderstood(false)
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
          <DialogTitle className="text-xl">Request Access — {productName}</DialogTitle>
          <DialogDescription>
            Early access is limited. Submit your details to be considered.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ra-name">Full Name *</Label>
              <Input
                id="ra-name"
                name="name"
                placeholder="John Doe"
                className="border-border bg-background"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ra-email">Email address *</Label>
              <Input
                id="ra-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="border-border bg-background"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ra-org">Organization (optional)</Label>
              <Input
                id="ra-org"
                name="org"
                placeholder="Company Inc."
                className="border-border bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ra-usecase">Role / Use case</Label>
              <Textarea
                id="ra-usecase"
                name="usecase"
                placeholder="How do you plan to use this product?"
                className="border-border bg-background min-h-[80px]"
              />
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="ra-understand"
                checked={understood}
                onCheckedChange={(v) => {
                  setUnderstood(!!v)
                  setErrors((prev) => ({ ...prev, understand: '' }))
                }}
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="ra-understand" className="text-sm font-normal cursor-pointer">
                  I understand this is a pre-release product
                </Label>
                {errors.understand && (
                  <p className="text-xs text-destructive">{errors.understand}</p>
                )}
              </div>
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
              'Submit request'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

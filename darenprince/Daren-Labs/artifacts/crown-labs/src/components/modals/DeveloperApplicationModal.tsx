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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function DeveloperApplicationModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [expertise, setExpertise] = useState('frontend')
  const [available, setAvailable] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim()
    const url = (formData.get('url') as string)?.trim()
    const about = (formData.get('about') as string)?.trim()

    const newErrors: Record<string, string> = {}
    if (!name) newErrors.name = 'Name is required'
    if (!email) newErrors.email = 'Email is required'
    if (!url) newErrors.url = 'Portfolio/GitHub URL is required'
    if (!about) newErrors.about = 'Please tell us about yourself'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/forms/developer-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, url, expertise, about, available }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      toast.success("Application submitted. We'll be in touch.")
      setOpen(false)
      setErrors({})
      setAvailable(false)
      setExpertise('frontend')
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
          <DialogTitle className="text-xl">Crown Labs Developer Application</DialogTitle>
          <DialogDescription>
            Join the team building applied intelligence systems.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="da-name">Full Name *</Label>
              <Input
                id="da-name"
                name="name"
                placeholder="Ada Lovelace"
                className="border-border bg-background"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="da-email">Email address *</Label>
              <Input
                id="da-email"
                name="email"
                type="email"
                placeholder="ada@example.com"
                className="border-border bg-background"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="da-url">GitHub or Portfolio URL *</Label>
              <Input
                id="da-url"
                name="url"
                placeholder="https://github.com/..."
                className="border-border bg-background"
              />
              {errors.url && <p className="text-xs text-destructive">{errors.url}</p>}
            </div>
            <div className="space-y-2">
              <Label>Primary expertise</Label>
              <Select value={expertise} onValueChange={setExpertise}>
                <SelectTrigger className="border-border bg-background">
                  <SelectValue placeholder="Select expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI / ML</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="forensics">Forensics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="da-about">Tell us about yourself *</Label>
              <Textarea
                id="da-about"
                name="about"
                placeholder="What are you building? What drives you?"
                className="border-border bg-background min-h-[100px]"
              />
              {errors.about && <p className="text-xs text-destructive">{errors.about}</p>}
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="da-available"
                checked={available}
                onCheckedChange={(v) => setAvailable(!!v)}
              />
              <Label htmlFor="da-available" className="text-sm font-normal cursor-pointer">
                I'm available for contract or full-time work
              </Label>
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
              'Submit application'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

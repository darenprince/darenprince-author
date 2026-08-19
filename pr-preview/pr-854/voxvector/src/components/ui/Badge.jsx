import { cva } from 'class-variance-authority'

const badgeVariants = cva('inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold leading-none transition-colors', {
  variants: {
    variant: {
      default: 'border-[var(--vv-border)] bg-[var(--vv-panel-soft)] text-[var(--vv-muted-strong)]',
      blue: 'border-[var(--vv-accent)]/25 bg-[var(--vv-accent)]/[0.08] text-[var(--vv-accent-bright)]',
      success: 'border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300',
      warning: 'border-amber-400/20 bg-amber-400/[0.07] text-amber-300',
      destructive: 'border-red-400/20 bg-red-400/[0.07] text-red-300',
    },
  },
  defaultVariants: { variant: 'default' },
})

export default function Badge({ className = '', variant, dot = true, children, ...props }) {
  const dotClass = variant === 'success'
    ? 'bg-emerald-400'
    : variant === 'warning'
      ? 'bg-amber-400'
      : variant === 'destructive'
        ? 'bg-red-400'
        : variant === 'blue'
          ? 'bg-[var(--vv-accent-bright)]'
          : 'bg-[var(--vv-muted)]'
  return <span className={`${badgeVariants({ variant })} ${className}`} {...props}>{dot && <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />}{children}</span>
}

export { badgeVariants }

import { cva } from 'class-variance-authority'

const badgeVariants = cva('inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold leading-none transition-colors', {
  variants: {
    variant: {
      default: 'border-white/[0.08] bg-white/[0.035] text-white/65',
      blue: 'border-[#00d9ff]/25 bg-[#00d9ff]/[0.06] text-[#00d9ff]',
      success: 'border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-200',
      warning: 'border-amber-400/20 bg-amber-400/[0.07] text-amber-200',
    },
  },
  defaultVariants: { variant: 'default' },
})

export default function Badge({ className = '', variant, dot = true, children, ...props }) {
  return <span className={`${badgeVariants({ variant })} ${className}`} {...props}>{dot && <span className={`h-1.5 w-1.5 rounded-full ${variant === 'success' ? 'bg-emerald-400' : variant === 'warning' ? 'bg-amber-400' : variant === 'blue' ? 'bg-[#00d9ff]' : 'bg-white/35'}`} />}{children}</span>
}

export { badgeVariants }

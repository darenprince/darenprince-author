import { Button as BaseButton } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--vv-accent-bright)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--vv-bg)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[var(--vv-text)] text-[var(--vv-bg)] shadow-sm hover:opacity-90',
        secondary: 'border border-[var(--vv-border)] bg-[var(--vv-surface)] text-[var(--vv-text)] hover:border-[var(--vv-border-strong)] hover:bg-[var(--vv-surface-2)]',
        ghost: 'text-[var(--vv-muted-strong)] hover:bg-[var(--vv-panel-soft)] hover:text-[var(--vv-text)]',
        accent: 'bg-[var(--vv-accent)] text-[var(--vv-bg)] shadow-[0_10px_28px_rgba(0,0,0,.18)] hover:bg-[var(--vv-accent-bright)] hover:shadow-[0_12px_32px_rgba(0,0,0,.24)]',
        outline: 'border border-[var(--vv-border)] bg-transparent text-[var(--vv-text)] hover:bg-[var(--vv-panel-soft)] hover:border-[var(--vv-border-strong)]',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-5',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export default function Button({ className = '', variant, size, children, ...props }) {
  return <BaseButton className={`${buttonVariants({ variant, size })} ${className}`} {...props}>{children}</BaseButton>
}

export { buttonVariants }

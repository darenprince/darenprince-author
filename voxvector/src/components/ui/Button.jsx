import { Button as BaseButton } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#ff7135]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--vv-bg)] disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: 'bg-[var(--vv-text)] text-[var(--vv-bg)] shadow-sm hover:opacity-90',
      secondary: 'border border-[var(--vv-border)] bg-[var(--vv-surface)] text-[var(--vv-text)] hover:bg-[#343332] hover:border-[var(--vv-border-strong)]',
      ghost: 'text-[var(--vv-muted)] hover:bg-[var(--vv-panel-soft)] hover:text-[var(--vv-text)]',
      accent: 'bg-[var(--vv-accent)] text-[#171412] shadow-[0_0_30px_rgba(240,90,40,.16)] hover:bg-[var(--vv-accent-bright)] hover:shadow-[0_0_34px_rgba(240,90,40,.22)]',
    },
    size: {
      default: 'h-9 px-4',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-11 px-5',
      icon: 'h-9 w-9',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

export default function Button({ className = '', variant, size, children, ...props }) {
  return <BaseButton className={`${buttonVariants({ variant, size })} ${className}`} {...props}>{children}</BaseButton>
}

export { buttonVariants }

import { Button as BaseButton } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070a0f] disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: 'bg-white text-[#070a0f] shadow-sm hover:bg-white/90',
      secondary: 'border border-white/[0.09] bg-white/[0.025] text-white hover:bg-white/[0.055] hover:border-white/[0.14]',
      ghost: 'text-white/60 hover:bg-white/[0.04] hover:text-white',
      accent: 'bg-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,.18)] hover:bg-blue-400',
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

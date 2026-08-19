import { Button as BaseButton } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#00d9ff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05080d] disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: 'bg-white text-[#05080d] shadow-sm hover:bg-white/90',
      secondary: 'border border-white/[0.10] bg-white/[0.025] text-white hover:bg-white/[0.06] hover:border-white/[0.16]',
      ghost: 'text-white/65 hover:bg-white/[0.04] hover:text-white',
      accent: 'bg-[#147dff] text-white shadow-[0_0_30px_rgba(20,125,255,.20)] hover:bg-[#0d6fe8] hover:shadow-[0_0_34px_rgba(0,217,255,.16)]',
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

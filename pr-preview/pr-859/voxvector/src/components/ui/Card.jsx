import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'

const cardVariants = cva('rounded-lg border text-[var(--vv-text)]', {
  variants: {
    tone: {
      default: 'border-[var(--vv-border)] bg-[var(--vv-surface)] shadow-[0_24px_70px_var(--vv-shadow)]',
      muted: 'border-[var(--vv-border)] bg-[var(--vv-surface-2)]',
      ghost: 'border-[var(--vv-border)]/70 bg-transparent',
    },
  },
  defaultVariants: { tone: 'default' },
})

const Card = forwardRef(function Card({ className = '', tone, children, ...props }, ref) {
  return <section ref={ref} className={`${cardVariants({ tone })} ${className}`} {...props}>{children}</section>
})

const CardHeader = ({ className = '', children, ...props }) => <div className={`flex flex-col gap-1.5 p-6 ${className}`} {...props}>{children}</div>
const CardTitle = ({ className = '', children, ...props }) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>
const CardDescription = ({ className = '', children, ...props }) => <p className={`text-sm text-[var(--vv-muted)] ${className}`} {...props}>{children}</p>
const CardContent = ({ className = '', children, ...props }) => <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>
const CardFooter = ({ className = '', children, ...props }) => <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>{children}</div>

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
export default Card

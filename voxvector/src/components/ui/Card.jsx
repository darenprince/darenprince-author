import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import PipelineBuildCard from '../PipelineBuildCard'

const cardVariants = cva('rounded-[7px] border text-[var(--vv-text)]', {
  variants: {
    tone: {
      default: 'border-[var(--vv-border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--vv-surface)_94%,#8f5d35_6%),var(--vv-surface))] shadow-[0_24px_70px_var(--vv-shadow)]',
      muted: 'border-[var(--vv-border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--vv-surface-2)_95%,#8f5d35_5%),var(--vv-surface-2))]',
      ghost: 'border-[var(--vv-border)]/70 bg-transparent',
    },
  },
  defaultVariants: { tone: 'default' },
})

const Card = forwardRef(function Card({ className = '', tone, children, ...props }, ref) {
  const items = Array.isArray(children) ? children : [children]
  const label = items[0]?.props?.children
  if (label === '21-stage build') return <PipelineBuildCard className={className} />
  return <section ref={ref} className={`${cardVariants({ tone })} ${className}`} {...props}>{children}</section>
})

const CardHeader = ({ className = '', children, ...props }) => <div className={`flex flex-col gap-1.5 p-5 ${className}`} {...props}>{children}</div>
const CardTitle = ({ className = '', children, ...props }) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>
const CardDescription = ({ className = '', children, ...props }) => <p className={`text-sm text-[var(--vv-muted)] ${className}`} {...props}>{children}</p>
const CardContent = ({ className = '', children, ...props }) => <div className={`p-5 pt-0 ${className}`} {...props}>{children}</div>
const CardFooter = ({ className = '', children, ...props }) => <div className={`flex items-center p-5 pt-0 ${className}`} {...props}>{children}</div>

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
export default Card

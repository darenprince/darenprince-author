import { forwardRef } from 'react'

const Card = forwardRef(function Card({ className = '', ...props }, ref) {
  return <div ref={ref} className={`rounded-lg border border-white/[0.055] bg-white/[0.02] shadow-none ${className}`} {...props} />
})

const CardHeader = ({ className = '', ...props }) => <div className={`flex flex-col space-y-1.5 p-5 ${className}`} {...props} />
const CardTitle = ({ className = '', ...props }) => <h3 className={`text-sm font-semibold tracking-tight text-white ${className}`} {...props} />
const CardDescription = ({ className = '', ...props }) => <p className={`text-xs leading-5 text-white/40 ${className}`} {...props} />
const CardContent = ({ className = '', ...props }) => <div className={`p-5 pt-0 ${className}`} {...props} />

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
export default Card

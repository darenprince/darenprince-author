import { forwardRef } from 'react'

const Card = forwardRef(function Card({ className = '', ...props }, ref) {
  return <div ref={ref} className={`rounded-xl border border-white/[0.07] bg-white/[0.025] shadow-[0_1px_2px_rgba(0,0,0,.25)] ${className}`} {...props} />
})

const CardHeader = ({ className = '', ...props }) => <div className={`flex flex-col space-y-1.5 p-5 ${className}`} {...props} />
const CardTitle = ({ className = '', ...props }) => <h3 className={`text-sm font-semibold tracking-tight text-white ${className}`} {...props} />
const CardDescription = ({ className = '', ...props }) => <p className={`text-xs leading-5 text-white/40 ${className}`} {...props} />
const CardContent = ({ className = '', ...props }) => <div className={`p-5 pt-0 ${className}`} {...props} />

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
export default Card

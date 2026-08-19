import { Button as BaseButton } from '@base-ui/react/button'

export default function Button({ className = '', children, ...props }) {
  return (
    <BaseButton
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b10] disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </BaseButton>
  )
}

import { Icon } from '@iconify/react'

const COLLECTION = 'streamline-sharp'

/**
 * Canonical Streamline Sharp icon primitive.
 * The Iconify runtime loads only the requested glyph, keeping the frontend
 * bundle focused while using Streamline's Sharp family consistently.
 */
export default function SharpIcon({ name, size = 18, title, className = '', ...props }) {
  return <Icon icon={`${COLLECTION}:${name}`} width={size} height={size} className={className} aria-hidden={title ? undefined : true} aria-label={title} {...props} />
}

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function CollapsiblePanel({
  title,
  icon: Icon,
  meta = null,
  eyebrow = null,
  actions = null,
  children,
  className = '',
  bodyClassName = '',
  defaultOpen = true,
  headingLevel = 'h2',
  ariaLabel,
}) {
  const [open, setOpen] = useState(defaultOpen)
  const Heading = headingLevel
  const label = ariaLabel || (typeof title === 'string' ? title : 'panel')

  return <section className={`vv-panel vv-collapsible-panel ${open ? 'is-open' : 'is-collapsed'} ${className}`.trim()}>
    <div className="vv-panel-head">
      <div className="vv-panel-head__title">
        {eyebrow && <span className="vv-eyebrow">{eyebrow}</span>}
        <Heading>{Icon && <Icon size={16}/>}<span>{title}</span></Heading>
      </div>
      {(meta || actions) && <div className="vv-panel-head__meta">{meta}{actions}</div>}
      <button
        type="button"
        className="vv-panel-toggle"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-label={`${open ? 'Collapse' : 'Expand'} ${label}`}
        title={open ? 'Collapse' : 'Expand'}
      >
        <ChevronDown size={14} className={open ? '' : '-rotate-90'}/>
      </button>
    </div>
    {open && <div className={`vv-panel-body ${bodyClassName}`.trim()}>{children}</div>}
  </section>
}

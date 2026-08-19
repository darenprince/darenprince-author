import { AnimatePresence, motion } from 'motion/react'

export default function Sheet({ open, onOpenChange, side = 'left', width = 320, children, ariaLabel = 'Navigation' }) {
  const offset = side === 'right' ? '100%' : '-100%'
  return <AnimatePresence>
    {open && <motion.div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onOpenChange(false)} aria-hidden="true">
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`h-full bg-[var(--vv-surface)] ${side === 'right' ? 'ml-auto border-l' : 'border-r'} border-[var(--vv-border)] shadow-2xl`}
        style={{ width: `min(${width}px, 86vw)` }}
        initial={{ x: offset }}
        animate={{ x: 0 }}
        exit={{ x: offset }}
        transition={{ type: 'spring', stiffness: 380, damping: 35 }}
        onClick={(event) => event.stopPropagation()}
      >{children}</motion.aside>
    </motion.div>}
  </AnimatePresence>
}

import { AnimatePresence, motion } from 'motion/react'

export default function Sheet({ open, onOpenChange, side = 'left', width = 320, children, ariaLabel = 'Navigation' }) {
  const offset = side === 'right' ? '100%' : '-100%'
  const closeThreshold = Math.min(width, 360) * 0.28
  return <AnimatePresence>
    {open && <motion.div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onOpenChange(false)} aria-hidden="true">
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`h-full overflow-y-auto overscroll-contain bg-[var(--vv-surface)] ${side === 'right' ? 'ml-auto border-l' : 'border-r'} border-[var(--vv-border)] shadow-2xl`}
        style={{ width: `min(${width}px, 86vw)`, touchAction: 'pan-y' }}
        initial={{ x: offset }}
        animate={{ x: 0 }}
        exit={{ x: offset }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          const moved = side === 'right' ? info.offset.x > closeThreshold : info.offset.x < -closeThreshold
          const fast = side === 'right' ? info.velocity.x > 650 : info.velocity.x < -650
          if (moved || fast) onOpenChange(false)
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 35 }}
        onClick={(event) => event.stopPropagation()}
      >{children}</motion.aside>
    </motion.div>}
  </AnimatePresence>
}

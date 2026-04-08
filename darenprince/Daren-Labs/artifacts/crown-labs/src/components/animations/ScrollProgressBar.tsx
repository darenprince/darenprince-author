import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

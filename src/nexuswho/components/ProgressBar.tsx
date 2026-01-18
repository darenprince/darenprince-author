import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full bg-gradient-to-r from-fuchsia-500/40 via-sky-400/50 to-violet-300/60"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}

export default ProgressBar

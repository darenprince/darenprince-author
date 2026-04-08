import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

export function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      if (start === end) return

      const duration = 2000
      let startTimestamp: number | null = null

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)

        // ease out quad
        const easeOut = progress * (2 - progress)
        setCount(Math.floor(easeOut * (end - start) + start))

        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    }
  }, [isInView, value])

  return <span ref={ref}>{count}</span>
}

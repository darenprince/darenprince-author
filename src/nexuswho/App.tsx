import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'

const Landing = React.lazy(() => import('./routes/Landing'))
const Quiz = React.lazy(() => import('./routes/Quiz'))
const Result = React.lazy(() => import('./routes/Result'))
const Restore = React.lazy(() => import('./routes/Restore'))

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-sky-950 to-pink-950 text-slate-100">
      <SiteHeader />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1"
      >
        <Suspense fallback={<div className="mx-auto w-full max-w-5xl px-6 py-16">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/restore" element={<Restore />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </motion.main>
      <SiteFooter />
    </div>
  )
}

export default App

import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import Landing from './routes/Landing'
import Quiz from './routes/Quiz'
import Result from './routes/Result'
import Restore from './routes/Restore'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/restore" element={<Restore />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </div>
  )
}

export default App

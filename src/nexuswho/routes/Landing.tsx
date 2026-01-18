import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChartRadar, Gauge, QrCode, ShieldLock, Sparkle } from 'phosphor-react'

const Landing = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
      <header className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] text-emerald-200"
          >
            Vibe Prism
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-semibold text-slate-50 md:text-5xl"
          >
            Discover the vibe you project in every room.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-slate-300"
          >
            Vibe Prism is a modern personality reflection designed to feel calm, grounded, and
            insightful. Answer 32 quick questions to reveal your social style and unlock a
            personalized profile.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/quiz" className="button-primary">
              <Sparkle size={20} />
              Start the quiz
            </Link>
            <Link to="/restore" className="button-secondary">
              <ShieldLock size={20} />
              Restore a profile
            </Link>
          </div>
        </div>
        <div className="glass-panel p-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <ChartRadar size={24} className="text-emerald-300" />
              <div>
                <h3 className="text-lg font-semibold">Balanced insights</h3>
                <p className="text-sm text-slate-400">
                  See a radar snapshot of your vibe strengths without heavy jargon.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gauge size={24} className="text-emerald-300" />
              <div>
                <h3 className="text-lg font-semibold">Momentum score</h3>
                <p className="text-sm text-slate-400">
                  Track how your energy reads to others in social settings.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <QrCode size={24} className="text-emerald-300" />
              <div>
                <h3 className="text-lg font-semibold">Portable profile</h3>
                <p className="text-sm text-slate-400">
                  Save your results as a private QR token for later restoration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="card-grid">
        {[
          {
            title: 'Social Flow',
            copy: 'Discover the pace you set when you walk into a room.',
          },
          {
            title: 'Connection Style',
            copy: 'See how you naturally build rapport and alignment.',
          },
          {
            title: 'Decision Energy',
            copy: 'Track how you balance outcomes, feelings, and follow-through.',
          },
          {
            title: 'Influence Pattern',
            copy: 'Understand the way you guide group momentum.',
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-5"
          >
            <h3 className="text-lg font-semibold text-slate-50">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{card.copy}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default Landing

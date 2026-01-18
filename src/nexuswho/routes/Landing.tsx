import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChartPie,
  Gauge,
  QrCode,
  Shield,
  Sparkle,
  Target,
  TrendUp,
  UsersThree,
} from 'phosphor-react'

const Landing = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] text-pink-200"
          >
            Vibe Prism
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-semibold text-slate-50 md:text-5xl"
          >
            See your personality sparkle back at you in under six minutes.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-slate-300"
          >
            Nexus Who is a fun, public personality quiz for Vibe Prism. Answer 32 fast, feel-good
            prompts to reveal your social style, get playful insights, and generate a private token
            you can restore on demand.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/quiz" className="button-primary">
              <Sparkle size={20} />
              Start the quiz
            </Link>
            <Link to="/restore" className="button-secondary">
              <Shield size={20} />
              Restore a profile
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Questions', value: '32' },
              { label: 'Personality Modes', value: '3' },
              { label: 'Vibe Traits', value: '4' },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <ChartPie size={24} className="text-sky-300" />
              <div>
                <h3 className="text-lg font-semibold">Balanced insights</h3>
                <p className="text-sm text-slate-400">
                  See a radar snapshot of your vibe strengths without heavy jargon.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gauge size={24} className="text-sky-300" />
              <div>
                <h3 className="text-lg font-semibold">Momentum score</h3>
                <p className="text-sm text-slate-400">
                  Track how your energy reads to others in social settings.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <QrCode size={24} className="text-sky-300" />
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

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-title">How the quiz feels</p>
          <p className="section-lead">
            Each section is designed to feel light, intuitive, and a little magical while still
            surfacing your natural rhythm.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Pulse',
                copy: 'Quick taps catch your instinctive tempo.',
              },
              {
                title: 'Balance',
                copy: 'Surprise flips keep the quiz playful and honest.',
              },
              {
                title: 'Integrity',
                copy: 'Gentle checks keep the vibe consistent.',
              },
            ].map((card) => (
              <div key={card.title} className="glass-panel p-5">
                <h3 className="text-lg font-semibold text-slate-50">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Personality Spectrum</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-50">Four traits, one vibe.</h3>
          <p className="mt-3 text-sm text-slate-400">
            Presence, Strategy, Composure, and Guidance form the core of the Vibe Prism personality
            map.
          </p>
          <div className="mt-6 space-y-4">
            {[
              { label: 'Presence', icon: UsersThree, copy: 'How visible and expressive you feel.' },
              { label: 'Strategy', icon: Target, copy: 'How intentional your moves are.' },
              { label: 'Composure', icon: Shield, copy: 'How steady you stay when things shift.' },
              { label: 'Guidance', icon: TrendUp, copy: 'How you steer the group vibe.' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon size={20} className="text-sky-300" />
                <div>
                  <p className="text-sm font-semibold text-slate-100">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <p className="section-title">What you discover</p>
        <p className="section-lead">
          A friendly, shareable profile you can keep to yourself or pass along with a QR token.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
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
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Who it is for</p>
          <h3 className="mt-2 text-xl font-semibold">Designed for curious humans.</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {[
              'Friends comparing the way they show up socially.',
              'Teams looking for a fun, low-stakes read on group energy.',
              'Creators curious about how their vibe lands with audiences.',
            ].map((item) => (
              <li key={item} className="list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Mini FAQ</p>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-slate-100">Is this stored in the cloud?</p>
              <p className="mt-1 text-slate-400">
                No. Tokens are stored locally in your browser and encrypted in transit.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">Can I retake the quiz?</p>
              <p className="mt-1 text-slate-400">
                One session per pass. Use the restore tool to revisit your profile any time.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">How long does it take?</p>
              <p className="mt-1 text-slate-400">Less than 6 minutes for most people.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChartPie, QrCode, Sparkle } from 'phosphor-react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { QRCodeCanvas } from 'qrcode.react'
import { base64UrlDecode, sha256Checksum } from '../utils/encoding'
import { getToken } from '../utils/storage'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const vibeLabels = ['Presence', 'Strategy', 'Composure', 'Guidance']

const personaMap: Record<string, { name: string; description: string }> = {
  GREEN: {
    name: 'Calm Navigator',
    description: 'You move with steady composure and keep the room grounded in clarity.',
  },
  YELLOW: {
    name: 'Signal Catalyst',
    description: 'Your energy shapes momentum and keeps people focused on what matters.',
  },
  RED: {
    name: 'Edge Architect',
    description: 'You bring sharp intensity and strong direction when stakes rise.',
  },
}

const Result = () => {
  const token = getToken()

  const [data, setData] = useState<{
    band: string
    scores: { N: number; M: number; P: number; MD: number }
    dtiBase: number
    dtiFinal: number
    archetype: string
    integrity: number
  } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!token) {
      return
    }
    const decode = async () => {
      try {
        const raw = base64UrlDecode(token)
        const parts = raw.split('|')
        const checksum = parts.pop()
        const core = parts.join('|')
        if (!checksum) {
          setError(true)
          return
        }
        const hash = await sha256Checksum(core)
        if (hash.slice(0, 8) !== checksum) {
          setError(true)
          return
        }
        setData({
          band: parts[3],
          dtiBase: Number(parts[4]),
          dtiFinal: Number(parts[5]),
          scores: {
            N: Number(parts[6]),
            M: Number(parts[7]),
            P: Number(parts[8]),
            MD: Number(parts[9]),
          },
          integrity: Number(parts[10]),
          archetype: parts[11],
        })
      } catch {
        setError(true)
      }
    }

    decode()
  }, [token])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-pink-200">
        <Sparkle size={18} />
        Vibe Prism Results
      </div>
      {!token && (
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold">No profile found yet</h2>
          <p className="mt-2 text-sm text-slate-400">
            Take the quiz to generate your vibe profile.
          </p>
          <Link to="/quiz" className="button-primary mt-6">
            Start the quiz
          </Link>
        </div>
      )}
      {token && !data && !error && <div className="glass-panel p-6">Loading profile...</div>}
      {token && (data || error) && <AsyncResult data={data} token={token} error={error} />}
    </div>
  )
}

const AsyncResult = ({
  data,
  token,
  error,
}: {
  data: {
    band: string
    scores: { N: number; M: number; P: number; MD: number }
    dtiBase: number
    dtiFinal: number
    archetype: string
    integrity: number
  } | null
  token: string
  error: boolean
}) => {
  if (error || !data) {
    return (
      <div className="glass-panel p-6">
        <p className="text-sm text-slate-400">
          Token validation failed. Please restore a valid profile.
        </p>
        <Link to="/quiz" className="button-primary mt-4">
          Retake quiz
        </Link>
      </div>
    )
  }

  const persona = personaMap[data.band] ?? personaMap.GREEN

  const radarData = {
    labels: vibeLabels,
    datasets: [
      {
        label: 'Vibe',
        data: [data.scores.N, data.scores.M, data.scores.P, data.scores.MD],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 0.7)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(16, 185, 129, 0.9)',
      },
    ],
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-3">
          <ChartPie size={24} className="text-sky-300" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Persona</p>
            <h2 className="text-2xl font-semibold text-slate-50">{persona.name}</h2>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-300">{persona.description}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Momentum</p>
            <p className="mt-2 text-lg font-semibold text-slate-50">{data.dtiFinal}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Integrity</p>
            <p className="mt-2 text-lg font-semibold text-slate-50">{data.integrity}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Archetype</p>
            <p className="mt-2 text-sm font-semibold text-slate-50">{data.archetype}</p>
          </div>
        </div>
        <div className="mt-6 h-64">
          <Radar
            data={radarData}
            options={{
              scales: {
                r: {
                  ticks: { display: false },
                  grid: { color: 'rgba(148, 163, 184, 0.2)' },
                  pointLabels: { color: 'rgba(226, 232, 240, 0.8)' },
                  suggestedMin: 0,
                  suggestedMax: 100,
                },
              },
              plugins: { legend: { display: false } },
              animation: { duration: 800 },
            }}
          />
        </div>
      </motion.div>
      <div className="flex flex-col gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold">Profile Readout</h3>
          <p className="mt-2 text-sm text-slate-400">
            Base DTI: {data.dtiBase} → Final DTI: {data.dtiFinal}
          </p>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
              <span>Presence</span>
              <span>{data.scores.N}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
              <span>Strategy</span>
              <span>{data.scores.M}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
              <span>Composure</span>
              <span>{data.scores.P}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
              <span>Guidance</span>
              <span>{data.scores.MD}</span>
            </div>
          </div>
        </div>
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <QrCode size={22} className="text-sky-300" />
            <div>
              <h3 className="text-lg font-semibold">Private QR token</h3>
              <p className="text-sm text-slate-400">
                Store this token to restore your profile later.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <QRCodeCanvas value={token} size={160} bgColor="#0f172a" fgColor="#e2e8f0" />
          </div>
          <p className="mt-4 text-xs text-slate-500">Token preview: {token.slice(0, 32)}...</p>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold">Need the full profile?</h3>
          <p className="mt-2 text-sm text-slate-400">
            Restore your profile with the secure decoder.
          </p>
          <Link to="/restore" className="button-secondary mt-4">
            Restore Profile
          </Link>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold">Next actions</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {[
              'Save your QR token to a secure note.',
              'Share the persona name with your team.',
              'Use the decoder to review trait-level insights.',
            ].map((item) => (
              <li key={item} className="list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Result

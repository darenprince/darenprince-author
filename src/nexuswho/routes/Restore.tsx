import React, { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChartPie, Gauge, QrCode, Shield, Warning, Eye, EyeSlash, Download } from 'phosphor-react'
import { Bar, Line, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
} from 'chart.js'
import PinPad from '../components/PinPad'
import TokenScanner from '../components/TokenScanner'
import { ANSWER_LABELS, QUESTIONS } from '../data/questions'
import { base64UrlDecode, sha256Checksum } from '../utils/encoding'
import { getToken } from '../utils/storage'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend
)

interface DecodedPayload {
  band: string
  dtiBase: number
  dtiFinal: number
  scores: { N: number; M: number; P: number; MD: number }
  integrity: number
  archetype: string
  maskFlags: string[]
  overrideFlags: string[]
  answers: { questionId: number; answer: number; rtMs: number }[]
}

type TraitScoreKey = keyof DecodedPayload['scores']

interface TraitThreshold {
  normalMax: number
  elevatedMax: number
  highMax: number
  concerningReason: string
}

const bandStyles: Record<string, string> = {
  GREEN: 'bg-sky-500/10 text-sky-200 border-sky-400/30',
  YELLOW: 'bg-violet-500/10 text-violet-200 border-violet-400/30',
  RED: 'bg-rose-500/10 text-rose-200 border-rose-400/30',
}

const traitLabels: Record<TraitScoreKey, string> = {
  N: 'Narcissism',
  M: 'Machiavellianism',
  P: 'Psychopathy',
  MD: 'Manipulation Doctrine',
}

const traitThresholds: Record<TraitScoreKey, TraitThreshold> = {
  N: {
    normalMax: 34,
    elevatedMax: 54,
    highMax: 74,
    concerningReason:
      'high external validation needs can create status-friction, reactivity, or image-first decisions in close relationships.',
  },
  M: {
    normalMax: 32,
    elevatedMax: 52,
    highMax: 72,
    concerningReason:
      'heavy strategic positioning can reduce trust and increase instrumental behavior when pressure rises.',
  },
  P: {
    normalMax: 29,
    elevatedMax: 47,
    highMax: 64,
    concerningReason:
      'high detachment and low guilt tolerance can raise interpersonal harm risk when outcomes are prioritized over people.',
  },
  MD: {
    normalMax: 34,
    elevatedMax: 56,
    highMax: 76,
    concerningReason:
      'persistent influence-shaping can drift into coercive dynamics if empathy and consent signals are underweighted.',
  },
}

const maskFlagDescriptions: Record<string, string> = {
  masking: 'Rapid defensive responses detected under 450ms.',
  contradictions: 'Lie-trap items returned high agreement.',
  halo: 'Response pattern suggests overly idealized self-presentation.',
}

const archetypeExplanations: Record<string, { label: string; description: string }> = {
  APX: {
    label: 'Apex Strategist',
    description:
      'High psychopathy and Machiavellian scores signal a calculated, high-control profile that prioritizes outcomes over relational cost.',
  },
  PUP: {
    label: 'Pressure Operator',
    description:
      'Strong Machiavellian + MD pairing suggests strategic influence, persuasive pacing, and a focus on leverage in group dynamics.',
  },
  EGO: {
    label: 'Ego Beacon',
    description:
      'Narcissism-forward readout indicates visibility seeking, status awareness, and heightened sensitivity to reputation.',
  },
  SMR: {
    label: 'Social Mirrorer',
    description:
      'Balanced N + M scores show adaptive social calibration, reading the room before applying influence.',
  },
  LOW: {
    label: 'Low Signal',
    description:
      'Sub-45 trait strengths point to a low-intensity profile with minimal dominance or manipulation imprint.',
  },
  DRM: {
    label: 'Drift Resonator',
    description:
      'Mixed traits without dominant spikes suggest a flexible, situational pattern that shifts with context.',
  },
}

const Restore = () => {
  const [unlocked, setUnlocked] = useState(sessionStorage.getItem('VP_DECODE_UNLOCK') === '1')
  const [tokenInput, setTokenInput] = useState(getToken() ?? '')
  const [decoded, setDecoded] = useState<DecodedPayload | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDecode = useCallback(async (token: string) => {
    try {
      const raw = base64UrlDecode(token.trim())
      const parts = raw.split('|')
      const checksum = parts.pop()
      const core = parts.join('|')
      if (!checksum) {
        throw new Error('Checksum missing')
      }
      const hash = await sha256Checksum(core)
      if (hash.slice(0, 8) !== checksum) {
        throw new Error('Checksum mismatch')
      }
      if (parts[0] !== 'VP1') {
        throw new Error('Unsupported payload')
      }
      const answersJson = parts[14]
      const answers = JSON.parse(answersJson) as DecodedPayload['answers']
      const maskFlags = parts[12]
        .split(';')
        .map((entry) => entry.split(':'))
        .filter((pair) => pair[1] === 'true')
        .map((pair) => pair[0])
      const overrideFlags = parts[13] === 'none' ? [] : parts[13].split('~')

      setDecoded({
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
        maskFlags,
        overrideFlags,
        answers,
      })
      setError(null)
    } catch (err) {
      setError(String(err))
      setDecoded(null)
    }
  }, [])

  const handleSubmit = () => {
    if (!tokenInput.trim()) {
      setError('Paste a token or scan a QR code.')
      return
    }
    handleDecode(tokenInput.trim())
  }

  const responseMap = useMemo(() => {
    if (!decoded) {
      return new Map()
    }
    return new Map(decoded.answers.map((answer) => [answer.questionId, answer]))
  }, [decoded])

  const reportSections = useMemo(() => {
    if (!decoded) {
      return null
    }
    const radarData = {
      labels: [traitLabels.N, traitLabels.M, traitLabels.P, traitLabels.MD],
      datasets: [
        {
          label: 'Trait Strength',
          data: [decoded.scores.N, decoded.scores.M, decoded.scores.P, decoded.scores.MD],
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          borderColor: 'rgba(56, 189, 248, 0.6)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(56, 189, 248, 0.9)',
        },
      ],
    }

    const barData = {
      labels: [traitLabels.N, traitLabels.M, traitLabels.P, traitLabels.MD],
      datasets: [
        {
          label: 'Intensity',
          data: [decoded.scores.N, decoded.scores.M, decoded.scores.P, decoded.scores.MD],
          backgroundColor: [
            'rgba(16, 185, 129, 0.4)',
            'rgba(59, 130, 246, 0.4)',
            'rgba(239, 68, 68, 0.4)',
            'rgba(251, 191, 36, 0.4)',
          ],
          borderRadius: 8,
        },
      ],
    }

    const responseTimes = decoded.answers.map((answer) => answer.rtMs)
    const lineData = {
      labels: decoded.answers.map((answer) => `Q${answer.questionId}`),
      datasets: [
        {
          label: 'Response Time (ms)',
          data: responseTimes,
          borderColor: 'rgba(148, 163, 184, 0.8)',
          backgroundColor: 'rgba(148, 163, 184, 0.2)',
          pointBackgroundColor: responseTimes.map((value) =>
            value < 450 ? 'rgba(248, 113, 113, 0.9)' : 'rgba(148, 163, 184, 0.9)'
          ),
          tension: 0.3,
        },
      ],
    }

    const traitHighlights = (Object.keys(decoded.scores) as TraitScoreKey[]).map((key) => {
      const score = decoded.scores[key]
      const threshold = traitThresholds[key]
      const label = traitLabels[key]

      if (score <= threshold.normalMax) {
        return {
          key,
          label,
          score,
          level: 'Normal range',
          tone: 'text-emerald-100 border-emerald-400/30 bg-emerald-500/10',
          explanation:
            'This score sits in a controlled band with low signal for disruptive behavioral intensity in this trait.',
        }
      }
      if (score <= threshold.elevatedMax) {
        return {
          key,
          label,
          score,
          level: 'Watch zone',
          tone: 'text-sky-100 border-sky-400/30 bg-sky-500/10',
          explanation:
            'This is above baseline and worth monitoring across contexts. It may be situationally useful but can become costly under stress.',
        }
      }
      if (score <= threshold.highMax) {
        return {
          key,
          label,
          score,
          level: 'High',
          tone: 'text-amber-100 border-amber-400/30 bg-amber-500/10',
          explanation: `This is a strong trait signal. It can improve decisiveness and control, but should be balanced to avoid over-indexing.`,
        }
      }
      return {
        key,
        label,
        score,
        level: 'Concerning',
        tone: 'text-rose-100 border-rose-400/30 bg-rose-500/10',
        explanation: `This crosses the concerning threshold because ${threshold.concerningReason}`,
      }
    })

    return { radarData, barData, lineData, traitHighlights }
  }, [decoded])

  const archetypeInsight = decoded
    ? (archetypeExplanations[decoded.archetype] ?? archetypeExplanations.DRM)
    : null

  const editorialSummary = useMemo(() => {
    if (!decoded || !reportSections) {
      return null
    }
    const concerning = reportSections.traitHighlights.filter(
      (trait) => trait.level === 'Concerning'
    )
    const high = reportSections.traitHighlights.filter((trait) => trait.level === 'High')

    const opener =
      decoded.band === 'RED'
        ? 'This profile reads as high-voltage and strategically forceful, with enough intensity to warrant active boundaries and careful context checks.'
        : decoded.band === 'YELLOW'
          ? 'This profile reads as adaptive and ambitious, but not fully neutral—there are signals that merit deliberate self-monitoring.'
          : 'This profile reads as comparatively stable and lower-risk, with trait expressions that appear controlled across most domains.'

    const traitClause =
      concerning.length > 0
        ? `The most concerning concentration is in ${concerning.map((trait) => trait.label).join(', ')}, which likely drives the strongest interpersonal friction risk.`
        : high.length > 0
          ? `The strongest expression is in ${high.map((trait) => trait.label).join(', ')}, which can be productive in leadership settings but may become costly when empathy bandwidth drops.`
          : 'No single trait crosses into a high-concern zone, suggesting a relatively even distribution without a dominant distortion pattern.'

    const integrityClause =
      decoded.maskFlags.length > 0
        ? `Integrity checks also flagged ${decoded.maskFlags.length} pattern(s), so interpretation should account for possible masking or defensiveness during responses.`
        : 'Integrity checks did not flag masking patterns, so confidence in the readout is comparatively stronger.'

    return `${opener} ${traitClause} ${integrityClause}`
  }, [decoded, reportSections])

  const handleExport = () => {
    if (!decoded) {
      return
    }
    const reportWindow = window.open('', '_blank')
    if (!reportWindow) {
      return
    }
    reportWindow.document.write(`
      <html>
        <head>
          <title>Nexus Who Report</title>
          <style>
            body { font-family: Inter, sans-serif; padding: 32px; background: #0f172a; color: #e2e8f0; }
            h1, h2 { color: #f8fafc; }
            .badge { display: inline-block; padding: 6px 12px; border-radius: 999px; background: #1e293b; margin-right: 8px; }
            .section { margin-bottom: 24px; }
          </style>
        </head>
        <body>
          <h1>Nexus Who Forensic Report</h1>
          <div class="section">
            <h2>Summary</h2>
            <p><span class="badge">Band: ${decoded.band}</span><span class="badge">Archetype: ${decoded.archetype}</span></p>
            <p>DTI Base: ${decoded.dtiBase} | DTI Final: ${decoded.dtiFinal}</p>
            <p>Integrity: ${decoded.integrity}</p>
          </div>
          <div class="section">
            <h2>Overrides</h2>
            <p>${decoded.overrideFlags.join('; ') || 'None'}</p>
          </div>
          <div class="section">
            <h2>Masking & Integrity Flags</h2>
            <p>${decoded.maskFlags.join(', ') || 'None'}</p>
          </div>
        </body>
      </html>
    `)
    reportWindow.document.close()
    reportWindow.focus()
    reportWindow.print()
  }

  if (!unlocked) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <PinPad onUnlock={() => setUnlocked(true)} />
        <p className="mt-4 text-xs text-slate-500">
          Decoder access is restricted. Unlocking stores a session flag in the browser only.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Nexus Who — forensic decoder
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Restore & Decode</h1>
          <p className="mt-2 text-sm text-slate-400">
            Paste a token or scan your QR to rebuild the full report in seconds.
          </p>
        </div>
        <button type="button" onClick={handleExport} className="button-secondary">
          <Download size={18} />
          Download Report
        </button>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <Shield size={22} className="text-sky-300" />
            <div>
              <h3 className="text-lg font-semibold">Decoder Status</h3>
              <p className="text-sm text-slate-400">
                Your session is authenticated for secure profile restoration.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
              <span>Session</span>
              <span className="text-sky-200">Unlocked</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
              <span>Storage</span>
              <span className="text-slate-300">Local only</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
              <span>Report</span>
              <span className="text-slate-300">Full forensic</span>
            </div>
          </div>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold">Decode checklist</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {[
              'Use the most recent token for accurate scores.',
              'Scan in a well-lit space for best QR results.',
              'Export a PDF if you need to share the report.',
            ].map((item) => (
              <li key={item} className="list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <Shield size={22} className="text-sky-300" />
            <div>
              <h3 className="text-lg font-semibold">Paste Token</h3>
              <p className="text-sm text-slate-400">
                Paste the Base64 URL-safe token to decode the full report.
              </p>
            </div>
          </div>
          <textarea
            value={tokenInput}
            onChange={(event) => setTokenInput(event.target.value)}
            className="mt-4 h-28 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-200"
          />
          {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
          <button type="button" onClick={handleSubmit} className="button-primary mt-4">
            Decode Token
          </button>
        </div>
        <TokenScanner
          onScan={(token) => {
            setTokenInput(token)
            handleDecode(token)
          }}
        />
      </div>

      {decoded && reportSections && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-8"
        >
          <section className="glass-panel p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
              Editorial synopsis
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Narrative Read</h2>
            <p className="mt-3 text-sm text-slate-200">{editorialSummary}</p>
            <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300">
              <p className="font-semibold text-slate-100">
                What this test measures and how scoring works
              </p>
              <p className="mt-2">
                Vibe Prism estimates four domains: <strong>Narcissism</strong> (status orientation),
                <strong> Machiavellianism</strong> (strategic social planning),{' '}
                <strong>Psychopathy</strong> (emotional detachment under pressure), and{' '}
                <strong>Manipulation Doctrine</strong> (influence style). Raw answers are normalized
                to 0–100, weighted per trait, then combined into DTI. Integrity checks (masking
                speed, contradiction traps, halo patterns) and safety overrides can increase risk
                interpretation and elevate the final band.
              </p>
            </div>
          </section>

          <section className="glass-panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Summary</p>
                <h2 className="text-2xl font-semibold">Forensic Snapshot</h2>
              </div>
              <span className={`badge border ${bandStyles[decoded.band] ?? bandStyles.GREEN}`}>
                {decoded.band}
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">DTI</p>
                <p className="mt-2 text-lg font-semibold">
                  Base {decoded.dtiBase} → Final {decoded.dtiFinal}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Archetype</p>
                <p className="mt-2 text-lg font-semibold">{decoded.archetype}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Gauge size={18} />
                  Integrity Score
                </div>
                <p className="mt-2 text-lg font-semibold">{decoded.integrity}</p>
              </div>
            </div>
            {archetypeInsight && (
              <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Archetype explanation
                </p>
                <p className="mt-2 text-lg font-semibold">{archetypeInsight.label}</p>
                <p className="mt-2 text-sm text-slate-300">{archetypeInsight.description}</p>
              </div>
            )}
          </section>

          <section className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <Warning size={22} className="text-rose-300" />
              <div>
                <h2 className="text-xl font-semibold">Overrides & Safety Triggers</h2>
                <p className="text-sm text-slate-400">
                  Immediate escalations based on safety thresholds.
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {decoded.overrideFlags.length === 0 && (
                <p className="text-sm text-slate-400">No overrides triggered.</p>
              )}
              {decoded.overrideFlags.map((trigger) => (
                <motion.div
                  key={trigger}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3"
                >
                  <Warning size={18} className="text-rose-300" />
                  <span className="text-sm text-rose-100">{trigger}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Overrides trigger when Q11, Q15, or Q18 score ≥ 2, or when Psychopathy exceeds 64 and
              Manipulation Doctrine exceeds 76.
            </p>
            {decoded.overrideFlags.length > 0 && (
              <p className="mt-3 text-xs text-rose-200">
                Band escalated to RED due to active overrides.
              </p>
            )}
          </section>

          <section className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <ChartPie size={22} className="text-sky-300" />
              <div>
                <h2 className="text-xl font-semibold">Trait Analysis</h2>
                <p className="text-sm text-slate-400">
                  Weighted trait intensities with threshold calibration.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="h-64">
                <Radar
                  data={reportSections.radarData}
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
                    animation: { duration: 900 },
                  }}
                />
              </div>
              <div className="h-64">
                <Bar
                  data={reportSections.barData}
                  options={{
                    scales: {
                      y: {
                        grid: { color: 'rgba(148, 163, 184, 0.2)' },
                        ticks: { color: 'rgba(226, 232, 240, 0.7)' },
                        suggestedMin: 0,
                        suggestedMax: 100,
                      },
                      x: {
                        ticks: { color: 'rgba(226, 232, 240, 0.7)' },
                      },
                    },
                    plugins: { legend: { display: false } },
                    animation: { duration: 900 },
                  }}
                />
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  key: 'N',
                  label: 'Narcissism',
                  copy: 'Elevated focus on visibility, status control, and perceived centrality in group dynamics.',
                },
                {
                  key: 'M',
                  label: 'Machiavellianism',
                  copy: 'Strategic, long-horizon planning with emphasis on leverage, timing, and advantage.',
                },
                {
                  key: 'P',
                  label: 'Psychopathy',
                  copy: 'Emotional detachment, intensity, and willingness to prioritize outcomes over social cost.',
                },
                {
                  key: 'MD',
                  label: 'Manipulation Doctrine',
                  copy: 'Preferred influence tactics, persuasion confidence, and group-shaping behaviors.',
                },
              ].map((trait) => (
                <div
                  key={trait.key}
                  className="rounded-xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{trait.label}</p>
                  <p className="mt-2 text-sm text-slate-300">{trait.copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {reportSections.traitHighlights.map((trait) => (
                <div key={trait.key} className={`rounded-xl border p-4 ${trait.tone}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{trait.label}</p>
                    <span className="text-xs uppercase tracking-[0.25em]">{trait.level}</span>
                  </div>
                  <p className="mt-2 text-sm opacity-95">Score: {trait.score}</p>
                  <p className="mt-2 text-xs opacity-90">{trait.explanation}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel p-6">
            <div className="flex items-center gap-3">
              {decoded.maskFlags.length > 0 ? (
                <EyeSlash size={22} className="text-amber-300" />
              ) : (
                <Eye size={22} className="text-sky-300" />
              )}
              <div>
                <h2 className="text-xl font-semibold">Integrity & Masking</h2>
                <p className="text-sm text-slate-400">
                  Flags highlight defensive responding, contradictions, and halo effects.
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {decoded.maskFlags.length === 0 && (
                <p className="text-sm text-slate-400">No integrity flags detected.</p>
              )}
              {decoded.maskFlags.map((flag) => (
                <div
                  key={flag}
                  className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em]">{flag}</p>
                  <p className="mt-1 text-xs text-amber-200">
                    {maskFlagDescriptions[flag] ?? 'Integrity signal observed.'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <QrCode size={20} className="text-slate-300" />
              <div>
                <h2 className="text-xl font-semibold">Response Time Analysis</h2>
                <p className="text-sm text-slate-400">Highlights rapid responses under 450ms.</p>
              </div>
            </div>
            <div className="mt-6 h-64">
              <Line
                data={reportSections.lineData}
                options={{
                  scales: {
                    y: {
                      ticks: { color: 'rgba(226, 232, 240, 0.7)' },
                      grid: { color: 'rgba(148, 163, 184, 0.2)' },
                    },
                    x: {
                      ticks: { color: 'rgba(226, 232, 240, 0.7)' },
                    },
                  },
                  plugins: { legend: { display: false } },
                  animation: { duration: 900 },
                }}
              />
            </div>
          </section>

          <section className="glass-panel p-6">
            <h2 className="text-xl font-semibold">Full Answer Breakdown</h2>
            <p className="text-sm text-slate-400">
              Detailed view of each response, timing, and trait impact.
            </p>
            <div className="mt-6 space-y-4">
              {QUESTIONS.map((question) => {
                const response = responseMap.get(question.id)
                if (!response) {
                  return null
                }
                const adjusted = question.reverse ? 3 - response.answer : response.answer
                const traitImpact = `${traitLabels[question.trait]} +${adjusted}`
                const rtWarning = response.rtMs < 450
                const selectedAnswer =
                  ANSWER_LABELS[response.answer] ?? `Answer ${response.answer + 1}`
                return (
                  <div
                    key={question.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                          Q{question.id}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-50">
                          {question.text}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        {question.lieTrap && (
                          <span className="badge gap-2 border border-amber-400/40 bg-amber-500/10 text-amber-200">
                            <EyeSlash size={12} />
                            Lie Trap
                          </span>
                        )}
                        {question.safetyTrigger && (
                          <span className="badge gap-2 border border-rose-400/40 bg-rose-500/10 text-rose-200">
                            <Warning size={12} />
                            Safety Trigger
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                      <span>
                        Selected answer: <span className="text-slate-100">{selectedAnswer}</span>
                      </span>
                      <span>Answer index: {response.answer + 1}</span>
                      <span>RT: {response.rtMs}ms</span>
                      <span>Impact: {traitImpact}</span>
                      {rtWarning && <span className="text-rose-300">Fast response</span>}
                    </div>
                    <p className="mt-3 text-sm text-slate-300">
                      This response suggests a {traitLabels[question.trait]}-aligned behavior with a
                      measured intensity of {adjusted} on the internal scale. The pacing indicates{' '}
                      {rtWarning ? 'defensive' : 'deliberate'} engagement.
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        </motion.div>
      )}
    </div>
  )
}

export default Restore

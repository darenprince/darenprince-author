import {
  r as o,
  j as e,
  h as R,
  Q as F,
  D as z,
  m as C,
  G as $,
  W as E,
  i as A,
  E as T,
  n as B,
} from './vendor.js'
import {
  R as W,
  B as O,
  b as U,
  C as Q,
  a as _,
  P as H,
  L as G,
  i as V,
  p as Y,
  c as J,
  d as K,
  e as X,
  f as Z,
} from './charts.js'
import { H as q } from './scanner.js'
import { Q as ee, A as se } from './questions.js'
import { g as te, d as ae, s as re } from './storage.js'
const ne = '55486423',
  ie = (h) => (h <= 0 ? 0 : Math.min(6e4, 3e3 * h * h)),
  le = ({ onUnlock: h }) => {
    const [u, c] = o.useState(''),
      [p, s] = o.useState(0),
      [j, f] = o.useState(null),
      i = j !== null && j > Date.now(),
      d = o.useMemo(() => Array.from({ length: 8 }, (n, g) => (g < u.length ? '•' : '◦')), [u]),
      D = (n) => {
        i || u.length >= 8 || c((g) => g + n)
      },
      S = () => {
        i || c((n) => n.slice(0, -1))
      },
      m = () => {
        i || c('')
      },
      k = () => {
        if (i || u.length < 8) return
        if (u === ne) {
          ;(sessionStorage.setItem('VP_DECODE_UNLOCK', '1'), h())
          return
        }
        const n = p + 1
        if ((s(n), c(''), n >= 3)) {
          const g = ie(n)
          ;(f(Date.now() + g), setTimeout(() => f(null), g + 200))
        }
      }
    return e.jsxs('div', {
      className: 'glass-panel p-6',
      children: [
        e.jsxs('div', {
          className: 'flex items-center gap-3',
          children: [
            e.jsx(R, { size: 28, className: 'text-sky-300' }),
            e.jsxs('div', {
              children: [
                e.jsx('p', {
                  className: 'text-sm uppercase tracking-[0.2em] text-slate-400',
                  children: 'Nexus Who Access',
                }),
                e.jsx('h2', { className: 'text-xl font-semibold', children: 'Enter 8-digit PIN' }),
              ],
            }),
          ],
        }),
        e.jsxs('div', {
          className:
            'mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3',
          children: [
            e.jsx('div', {
              className: 'flex items-center gap-2 text-xl',
              children: d.map((n, g) =>
                e.jsx(
                  'span',
                  {
                    className:
                      n === '•'
                        ? 'inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-400/20 text-emerald-100'
                        : 'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-slate-800/70 text-slate-500',
                    children: n,
                  },
                  `${n}-${g}`
                )
              ),
            }),
            i &&
              e.jsx('span', {
                className: 'text-xs uppercase tracking-[0.3em] text-rose-300',
                children: 'Locked',
              }),
          ],
        }),
        e.jsxs('div', {
          className: 'mt-6 grid grid-cols-3 gap-3',
          children: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) =>
              e.jsx(
                'button',
                {
                  type: 'button',
                  onClick: () => D(n),
                  className:
                    'rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-semibold text-slate-100 transition hover:border-sky-300/50',
                  children: n,
                },
                n
              )
            ),
            e.jsx('button', {
              type: 'button',
              onClick: m,
              className:
                'rounded-xl border border-white/10 bg-white/5 py-3 text-xs uppercase tracking-[0.3em] text-slate-400',
              children: 'Clear',
            }),
            e.jsx('button', {
              type: 'button',
              onClick: () => D('0'),
              className:
                'rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-semibold text-slate-100 transition hover:border-sky-300/50',
              children: '0',
            }),
            e.jsx('button', {
              type: 'button',
              onClick: S,
              className:
                'rounded-xl border border-white/10 bg-white/5 py-3 text-xs uppercase tracking-[0.3em] text-slate-400',
              children: 'Delete',
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'mt-6 flex flex-wrap gap-3',
          children: [
            e.jsx('button', {
              type: 'button',
              onClick: k,
              className: 'button-primary',
              children: 'Unlock',
            }),
            p > 0 &&
              e.jsxs('span', {
                className: 'text-xs text-slate-400',
                children: ['Attempts: ', p, ' / 3'],
              }),
          ],
        }),
      ],
    })
  },
  oe = ({ onScan: h }) => {
    const u = o.useRef(null),
      [c, p] = o.useState(!1),
      [s, j] = o.useState(null),
      f = 'vibe-prism-scanner'
    return (
      o.useEffect(() => {
        if (!c) return
        const i = new q(f)
        return (
          (u.current = i),
          i
            .start(
              { facingMode: 'environment' },
              { fps: 10, qrbox: { width: 220, height: 220 } },
              (d) => {
                ;(h(d), i.stop().catch(() => {}), p(!1))
              },
              (d) => {
                ;(typeof d == 'string' && d.includes('NotFound')) ||
                  j('Camera scan is active. Align the QR token.')
              }
            )
            .catch((d) => {
              ;(j(String(d)), p(!1))
            }),
          () => {
            i.stop()
              .then(() => i.clear())
              .catch(() => {})
          }
        )
      }, [c, h]),
      e.jsxs('div', {
        className: 'glass-panel p-6',
        children: [
          e.jsxs('div', {
            className: 'flex items-center gap-3',
            children: [
              e.jsx(F, { size: 24, className: 'text-sky-300' }),
              e.jsxs('div', {
                children: [
                  e.jsx('h3', { className: 'text-lg font-semibold', children: 'Scan Token' }),
                  e.jsx('p', {
                    className: 'text-sm text-slate-400',
                    children: 'Use your camera to restore a Nexus Who payload.',
                  }),
                ],
              }),
            ],
          }),
          e.jsx('div', {
            className: 'mt-4',
            children: e.jsx('button', {
              type: 'button',
              onClick: () => p((i) => !i),
              className: 'button-secondary',
              children: c ? 'Stop Scanner' : 'Start Scanner',
            }),
          }),
          c && e.jsx('div', { id: f, className: 'mt-4 overflow-hidden rounded-xl' }),
          s && e.jsx('p', { className: 'mt-3 text-xs text-rose-300', children: s }),
        ],
      })
    )
  }
Q.register(_, H, G, V, Y, J, K, X, Z)
const P = {
    GREEN: 'bg-sky-500/10 text-sky-200 border-sky-400/30',
    YELLOW: 'bg-violet-500/10 text-violet-200 border-violet-400/30',
    RED: 'bg-rose-500/10 text-rose-200 border-rose-400/30',
  },
  x = { N: 'Narcissism', M: 'Machiavellianism', P: 'Psychopathy', MD: 'Manipulation Doctrine' },
  ce = {
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
  },
  de = {
    masking: 'Rapid defensive responses detected under 450ms.',
    contradictions: 'Lie-trap items returned high agreement.',
    halo: 'Response pattern suggests overly idealized self-presentation.',
  },
  I = {
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
  },
  ue = () => {
    const [h, u] = o.useState(sessionStorage.getItem('VP_DECODE_UNLOCK') === '1'),
      [c, p] = o.useState(te() ?? ''),
      [s, j] = o.useState(null),
      [f, i] = o.useState(null),
      d = o.useCallback(async (t) => {
        try {
          const a = ae(t.trim()).split('|'),
            N = a.pop(),
            y = a.join('|')
          if (!N) throw new Error('Checksum missing')
          if ((await re(y)).slice(0, 8) !== N) throw new Error('Checksum mismatch')
          if (a[0] !== 'VP1') throw new Error('Unsupported payload')
          const b = a[14],
            v = JSON.parse(b),
            w = a[12]
              .split(';')
              .map((M) => M.split(':'))
              .filter((M) => M[1] === 'true')
              .map((M) => M[0]),
            L = a[13] === 'none' ? [] : a[13].split('~')
          ;(j({
            band: a[3],
            dtiBase: Number(a[4]),
            dtiFinal: Number(a[5]),
            scores: { N: Number(a[6]), M: Number(a[7]), P: Number(a[8]), MD: Number(a[9]) },
            integrity: Number(a[10]),
            archetype: a[11],
            maskFlags: w,
            overrideFlags: L,
            answers: v,
          }),
            i(null))
        } catch (l) {
          ;(i(String(l)), j(null))
        }
      }, []),
      D = () => {
        if (!c.trim()) {
          i('Paste a token or scan a QR code.')
          return
        }
        d(c.trim())
      },
      S = o.useMemo(() => (s ? new Map(s.answers.map((t) => [t.questionId, t])) : new Map()), [s]),
      m = o.useMemo(() => {
        if (!s) return null
        const t = {
            labels: [x.N, x.M, x.P, x.MD],
            datasets: [
              {
                label: 'Trait Strength',
                data: [s.scores.N, s.scores.M, s.scores.P, s.scores.MD],
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                borderColor: 'rgba(56, 189, 248, 0.6)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(56, 189, 248, 0.9)',
              },
            ],
          },
          l = {
            labels: [x.N, x.M, x.P, x.MD],
            datasets: [
              {
                label: 'Intensity',
                data: [s.scores.N, s.scores.M, s.scores.P, s.scores.MD],
                backgroundColor: [
                  'rgba(16, 185, 129, 0.4)',
                  'rgba(59, 130, 246, 0.4)',
                  'rgba(239, 68, 68, 0.4)',
                  'rgba(251, 191, 36, 0.4)',
                ],
                borderRadius: 8,
              },
            ],
          },
          a = s.answers.map((r) => r.rtMs),
          N = {
            labels: s.answers.map((r) => `Q${r.questionId}`),
            datasets: [
              {
                label: 'Response Time (ms)',
                data: a,
                borderColor: 'rgba(148, 163, 184, 0.8)',
                backgroundColor: 'rgba(148, 163, 184, 0.2)',
                pointBackgroundColor: a.map((r) =>
                  r < 450 ? 'rgba(248, 113, 113, 0.9)' : 'rgba(148, 163, 184, 0.9)'
                ),
                tension: 0.3,
              },
            ],
          },
          y = Object.keys(s.scores).map((r) => {
            const b = s.scores[r],
              v = ce[r],
              w = x[r]
            return b <= v.normalMax
              ? {
                  key: r,
                  label: w,
                  score: b,
                  level: 'Normal range',
                  tone: 'text-emerald-100 border-emerald-400/30 bg-emerald-500/10',
                  explanation:
                    'This score sits in a controlled band with low signal for disruptive behavioral intensity in this trait.',
                }
              : b <= v.elevatedMax
                ? {
                    key: r,
                    label: w,
                    score: b,
                    level: 'Watch zone',
                    tone: 'text-sky-100 border-sky-400/30 bg-sky-500/10',
                    explanation:
                      'This is above baseline and worth monitoring across contexts. It may be situationally useful but can become costly under stress.',
                  }
                : b <= v.highMax
                  ? {
                      key: r,
                      label: w,
                      score: b,
                      level: 'High',
                      tone: 'text-amber-100 border-amber-400/30 bg-amber-500/10',
                      explanation:
                        'This is a strong trait signal. It can improve decisiveness and control, but should be balanced to avoid over-indexing.',
                    }
                  : {
                      key: r,
                      label: w,
                      score: b,
                      level: 'Concerning',
                      tone: 'text-rose-100 border-rose-400/30 bg-rose-500/10',
                      explanation: `This crosses the concerning threshold because ${v.concerningReason}`,
                    }
          })
        return { radarData: t, barData: l, lineData: N, traitHighlights: y }
      }, [s]),
      k = s ? (I[s.archetype] ?? I.DRM) : null,
      n = o.useMemo(() => {
        if (!s || !m) return null
        const t = m.traitHighlights.filter((r) => r.level === 'Concerning'),
          l = m.traitHighlights.filter((r) => r.level === 'High'),
          a =
            s.band === 'RED'
              ? 'This profile reads as high-voltage and strategically forceful, with enough intensity to warrant active boundaries and careful context checks.'
              : s.band === 'YELLOW'
                ? 'This profile reads as adaptive and ambitious, but not fully neutral—there are signals that merit deliberate self-monitoring.'
                : 'This profile reads as comparatively stable and lower-risk, with trait expressions that appear controlled across most domains.',
          N =
            t.length > 0
              ? `The most concerning concentration is in ${t.map((r) => r.label).join(', ')}, which likely drives the strongest interpersonal friction risk.`
              : l.length > 0
                ? `The strongest expression is in ${l.map((r) => r.label).join(', ')}, which can be productive in leadership settings but may become costly when empathy bandwidth drops.`
                : 'No single trait crosses into a high-concern zone, suggesting a relatively even distribution without a dominant distortion pattern.',
          y =
            s.maskFlags.length > 0
              ? `Integrity checks also flagged ${s.maskFlags.length} pattern(s), so interpretation should account for possible masking or defensiveness during responses.`
              : 'Integrity checks did not flag masking patterns, so confidence in the readout is comparatively stronger.'
        return `${a} ${N} ${y}`
      }, [s, m]),
      g = () => {
        if (!s) return
        const t = window.open('', '_blank')
        t &&
          (t.document.write(`
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
            <p><span class="badge">Band: ${s.band}</span><span class="badge">Archetype: ${s.archetype}</span></p>
            <p>DTI Base: ${s.dtiBase} | DTI Final: ${s.dtiFinal}</p>
            <p>Integrity: ${s.integrity}</p>
          </div>
          <div class="section">
            <h2>Overrides</h2>
            <p>${s.overrideFlags.join('; ') || 'None'}</p>
          </div>
          <div class="section">
            <h2>Masking & Integrity Flags</h2>
            <p>${s.maskFlags.join(', ') || 'None'}</p>
          </div>
        </body>
      </html>
    `),
          t.document.close(),
          t.focus(),
          t.print())
      }
    return h
      ? e.jsxs('div', {
          className: 'mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16',
          children: [
            e.jsxs('div', {
              className: 'flex flex-wrap items-center justify-between gap-4',
              children: [
                e.jsxs('div', {
                  children: [
                    e.jsx('p', {
                      className: 'text-xs uppercase tracking-[0.4em] text-slate-400',
                      children: 'Nexus Who — forensic decoder',
                    }),
                    e.jsx('h1', {
                      className: 'mt-3 text-3xl font-semibold',
                      children: 'Restore & Decode',
                    }),
                    e.jsx('p', {
                      className: 'mt-2 text-sm text-slate-400',
                      children:
                        'Paste a token or scan your QR to rebuild the full report in seconds.',
                    }),
                  ],
                }),
                e.jsxs('button', {
                  type: 'button',
                  onClick: g,
                  className: 'button-secondary',
                  children: [e.jsx(z, { size: 18 }), 'Download Report'],
                }),
              ],
            }),
            e.jsxs('section', {
              className: 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr]',
              children: [
                e.jsxs('div', {
                  className: 'glass-panel p-6',
                  children: [
                    e.jsxs('div', {
                      className: 'flex items-center gap-3',
                      children: [
                        e.jsx(R, { size: 22, className: 'text-sky-300' }),
                        e.jsxs('div', {
                          children: [
                            e.jsx('h3', {
                              className: 'text-lg font-semibold',
                              children: 'Decoder Status',
                            }),
                            e.jsx('p', {
                              className: 'text-sm text-slate-400',
                              children:
                                'Your session is authenticated for secure profile restoration.',
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'mt-4 grid gap-3 text-sm text-slate-300',
                      children: [
                        e.jsxs('div', {
                          className:
                            'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                          children: [
                            e.jsx('span', { children: 'Session' }),
                            e.jsx('span', { className: 'text-sky-200', children: 'Unlocked' }),
                          ],
                        }),
                        e.jsxs('div', {
                          className:
                            'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                          children: [
                            e.jsx('span', { children: 'Storage' }),
                            e.jsx('span', { className: 'text-slate-300', children: 'Local only' }),
                          ],
                        }),
                        e.jsxs('div', {
                          className:
                            'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                          children: [
                            e.jsx('span', { children: 'Report' }),
                            e.jsx('span', {
                              className: 'text-slate-300',
                              children: 'Full forensic',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'glass-panel p-6',
                  children: [
                    e.jsx('h3', {
                      className: 'text-lg font-semibold',
                      children: 'Decode checklist',
                    }),
                    e.jsx('ul', {
                      className: 'mt-4 space-y-2 text-sm text-slate-300',
                      children: [
                        'Use the most recent token for accurate scores.',
                        'Scan in a well-lit space for best QR results.',
                        'Export a PDF if you need to share the report.',
                      ].map((t) => e.jsx('li', { className: 'list-item', children: t }, t)),
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr]',
              children: [
                e.jsxs('div', {
                  className: 'glass-panel p-6',
                  children: [
                    e.jsxs('div', {
                      className: 'flex items-center gap-3',
                      children: [
                        e.jsx(R, { size: 22, className: 'text-sky-300' }),
                        e.jsxs('div', {
                          children: [
                            e.jsx('h3', {
                              className: 'text-lg font-semibold',
                              children: 'Paste Token',
                            }),
                            e.jsx('p', {
                              className: 'text-sm text-slate-400',
                              children:
                                'Paste the Base64 URL-safe token to decode the full report.',
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsx('textarea', {
                      value: c,
                      onChange: (t) => p(t.target.value),
                      className:
                        'mt-4 h-28 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-200',
                    }),
                    f && e.jsx('p', { className: 'mt-2 text-xs text-rose-300', children: f }),
                    e.jsx('button', {
                      type: 'button',
                      onClick: D,
                      className: 'button-primary mt-4',
                      children: 'Decode Token',
                    }),
                  ],
                }),
                e.jsx(oe, {
                  onScan: (t) => {
                    ;(p(t), d(t))
                  },
                }),
              ],
            }),
            s &&
              m &&
              e.jsxs(C.div, {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.4 },
                className: 'flex flex-col gap-8',
                children: [
                  e.jsxs('section', {
                    className: 'glass-panel p-6',
                    children: [
                      e.jsx('p', {
                        className: 'text-xs uppercase tracking-[0.3em] text-emerald-200',
                        children: 'Editorial synopsis',
                      }),
                      e.jsx('h2', {
                        className: 'mt-2 text-2xl font-semibold',
                        children: 'Narrative Read',
                      }),
                      e.jsx('p', { className: 'mt-3 text-sm text-slate-200', children: n }),
                      e.jsxs('div', {
                        className:
                          'mt-4 rounded-xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300',
                        children: [
                          e.jsx('p', {
                            className: 'font-semibold text-slate-100',
                            children: 'What this test measures and how scoring works',
                          }),
                          e.jsxs('p', {
                            className: 'mt-2',
                            children: [
                              'Vibe Prism estimates four domains: ',
                              e.jsx('strong', { children: 'Narcissism' }),
                              ' (status orientation),',
                              e.jsx('strong', { children: ' Machiavellianism' }),
                              ' (strategic social planning), ',
                              e.jsx('strong', { children: 'Psychopathy' }),
                              ' ',
                              '(emotional detachment under pressure), and ',
                              e.jsx('strong', { children: 'Manipulation Doctrine' }),
                              ' (influence style). Raw answers are normalized to 0–100, weighted per trait, then combined into DTI. Integrity checks (masking speed, contradiction traps, halo patterns) and safety overrides can increase risk interpretation and elevate the final band.',
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('section', {
                    className: 'glass-panel p-6',
                    children: [
                      e.jsxs('div', {
                        className: 'flex flex-wrap items-center justify-between gap-4',
                        children: [
                          e.jsxs('div', {
                            children: [
                              e.jsx('p', {
                                className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                                children: 'Summary',
                              }),
                              e.jsx('h2', {
                                className: 'text-2xl font-semibold',
                                children: 'Forensic Snapshot',
                              }),
                            ],
                          }),
                          e.jsx('span', {
                            className: `badge border ${P[s.band] ?? P.GREEN}`,
                            children: s.band,
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'mt-4 grid gap-4 md:grid-cols-2',
                        children: [
                          e.jsxs('div', {
                            className: 'rounded-xl border border-white/10 bg-slate-900/60 p-4',
                            children: [
                              e.jsx('p', {
                                className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                                children: 'DTI',
                              }),
                              e.jsxs('p', {
                                className: 'mt-2 text-lg font-semibold',
                                children: ['Base ', s.dtiBase, ' → Final ', s.dtiFinal],
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            className: 'rounded-xl border border-white/10 bg-slate-900/60 p-4',
                            children: [
                              e.jsx('p', {
                                className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                                children: 'Archetype',
                              }),
                              e.jsx('p', {
                                className: 'mt-2 text-lg font-semibold',
                                children: s.archetype,
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            className: 'rounded-xl border border-white/10 bg-slate-900/60 p-4',
                            children: [
                              e.jsxs('div', {
                                className: 'flex items-center gap-2 text-sm text-slate-400',
                                children: [e.jsx($, { size: 18 }), 'Integrity Score'],
                              }),
                              e.jsx('p', {
                                className: 'mt-2 text-lg font-semibold',
                                children: s.integrity,
                              }),
                            ],
                          }),
                        ],
                      }),
                      k &&
                        e.jsxs('div', {
                          className: 'mt-4 rounded-xl border border-white/10 bg-slate-900/60 p-4',
                          children: [
                            e.jsx('p', {
                              className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                              children: 'Archetype explanation',
                            }),
                            e.jsx('p', {
                              className: 'mt-2 text-lg font-semibold',
                              children: k.label,
                            }),
                            e.jsx('p', {
                              className: 'mt-2 text-sm text-slate-300',
                              children: k.description,
                            }),
                          ],
                        }),
                    ],
                  }),
                  e.jsxs('section', {
                    className: 'glass-panel p-6',
                    children: [
                      e.jsxs('div', {
                        className: 'flex items-center gap-3',
                        children: [
                          e.jsx(E, { size: 22, className: 'text-rose-300' }),
                          e.jsxs('div', {
                            children: [
                              e.jsx('h2', {
                                className: 'text-xl font-semibold',
                                children: 'Overrides & Safety Triggers',
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-slate-400',
                                children: 'Immediate escalations based on safety thresholds.',
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'mt-4 space-y-2',
                        children: [
                          s.overrideFlags.length === 0 &&
                            e.jsx('p', {
                              className: 'text-sm text-slate-400',
                              children: 'No overrides triggered.',
                            }),
                          s.overrideFlags.map((t) =>
                            e.jsxs(
                              C.div,
                              {
                                initial: { opacity: 0 },
                                animate: { opacity: [0.7, 1, 0.7] },
                                transition: { duration: 2.4, repeat: 1 / 0, ease: 'easeInOut' },
                                className:
                                  'flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3',
                                children: [
                                  e.jsx(E, { size: 18, className: 'text-rose-300' }),
                                  e.jsx('span', {
                                    className: 'text-sm text-rose-100',
                                    children: t,
                                  }),
                                ],
                              },
                              t
                            )
                          ),
                        ],
                      }),
                      e.jsx('p', {
                        className: 'mt-3 text-xs text-slate-400',
                        children:
                          'Overrides trigger when Q11, Q15, or Q18 score ≥ 2, or when Psychopathy exceeds 64 and Manipulation Doctrine exceeds 76.',
                      }),
                      s.overrideFlags.length > 0 &&
                        e.jsx('p', {
                          className: 'mt-3 text-xs text-rose-200',
                          children: 'Band escalated to RED due to active overrides.',
                        }),
                    ],
                  }),
                  e.jsxs('section', {
                    className: 'glass-panel p-6',
                    children: [
                      e.jsxs('div', {
                        className: 'flex items-center gap-3',
                        children: [
                          e.jsx(A, { size: 22, className: 'text-sky-300' }),
                          e.jsxs('div', {
                            children: [
                              e.jsx('h2', {
                                className: 'text-xl font-semibold',
                                children: 'Trait Analysis',
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-slate-400',
                                children: 'Weighted trait intensities with threshold calibration.',
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'mt-6 grid gap-6 lg:grid-cols-2',
                        children: [
                          e.jsx('div', {
                            className: 'h-64',
                            children: e.jsx(W, {
                              data: m.radarData,
                              options: {
                                scales: {
                                  r: {
                                    ticks: { display: !1 },
                                    grid: { color: 'rgba(148, 163, 184, 0.2)' },
                                    pointLabels: { color: 'rgba(226, 232, 240, 0.8)' },
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                  },
                                },
                                plugins: { legend: { display: !1 } },
                                animation: { duration: 900 },
                              },
                            }),
                          }),
                          e.jsx('div', {
                            className: 'h-64',
                            children: e.jsx(O, {
                              data: m.barData,
                              options: {
                                scales: {
                                  y: {
                                    grid: { color: 'rgba(148, 163, 184, 0.2)' },
                                    ticks: { color: 'rgba(226, 232, 240, 0.7)' },
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                  },
                                  x: { ticks: { color: 'rgba(226, 232, 240, 0.7)' } },
                                },
                                plugins: { legend: { display: !1 } },
                                animation: { duration: 900 },
                              },
                            }),
                          }),
                        ],
                      }),
                      e.jsx('div', {
                        className: 'mt-6 grid gap-4 md:grid-cols-2',
                        children: [
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
                        ].map((t) =>
                          e.jsxs(
                            'div',
                            {
                              className: 'rounded-xl border border-white/10 bg-slate-900/60 p-4',
                              children: [
                                e.jsx('p', {
                                  className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                                  children: t.label,
                                }),
                                e.jsx('p', {
                                  className: 'mt-2 text-sm text-slate-300',
                                  children: t.copy,
                                }),
                              ],
                            },
                            t.key
                          )
                        ),
                      }),
                      e.jsx('div', {
                        className: 'mt-6 grid gap-3 md:grid-cols-2',
                        children: m.traitHighlights.map((t) =>
                          e.jsxs(
                            'div',
                            {
                              className: `rounded-xl border p-4 ${t.tone}`,
                              children: [
                                e.jsxs('div', {
                                  className: 'flex items-center justify-between gap-3',
                                  children: [
                                    e.jsx('p', {
                                      className: 'text-sm font-semibold',
                                      children: t.label,
                                    }),
                                    e.jsx('span', {
                                      className: 'text-xs uppercase tracking-[0.25em]',
                                      children: t.level,
                                    }),
                                  ],
                                }),
                                e.jsxs('p', {
                                  className: 'mt-2 text-sm opacity-95',
                                  children: ['Score: ', t.score],
                                }),
                                e.jsx('p', {
                                  className: 'mt-2 text-xs opacity-90',
                                  children: t.explanation,
                                }),
                              ],
                            },
                            t.key
                          )
                        ),
                      }),
                    ],
                  }),
                  e.jsxs('section', {
                    className: 'glass-panel p-6',
                    children: [
                      e.jsxs('div', {
                        className: 'flex items-center gap-3',
                        children: [
                          s.maskFlags.length > 0
                            ? e.jsx(T, { size: 22, className: 'text-amber-300' })
                            : e.jsx(B, { size: 22, className: 'text-sky-300' }),
                          e.jsxs('div', {
                            children: [
                              e.jsx('h2', {
                                className: 'text-xl font-semibold',
                                children: 'Integrity & Masking',
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-slate-400',
                                children:
                                  'Flags highlight defensive responding, contradictions, and halo effects.',
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs('div', {
                        className: 'mt-4 space-y-2',
                        children: [
                          s.maskFlags.length === 0 &&
                            e.jsx('p', {
                              className: 'text-sm text-slate-400',
                              children: 'No integrity flags detected.',
                            }),
                          s.maskFlags.map((t) =>
                            e.jsxs(
                              'div',
                              {
                                className:
                                  'rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100',
                                children: [
                                  e.jsx('p', {
                                    className: 'text-sm font-semibold uppercase tracking-[0.2em]',
                                    children: t,
                                  }),
                                  e.jsx('p', {
                                    className: 'mt-1 text-xs text-amber-200',
                                    children: de[t] ?? 'Integrity signal observed.',
                                  }),
                                ],
                              },
                              t
                            )
                          ),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('section', {
                    className: 'glass-panel p-6',
                    children: [
                      e.jsxs('div', {
                        className: 'flex items-center gap-3',
                        children: [
                          e.jsx(F, { size: 20, className: 'text-slate-300' }),
                          e.jsxs('div', {
                            children: [
                              e.jsx('h2', {
                                className: 'text-xl font-semibold',
                                children: 'Response Time Analysis',
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-slate-400',
                                children: 'Highlights rapid responses under 450ms.',
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsx('div', {
                        className: 'mt-6 h-64',
                        children: e.jsx(U, {
                          data: m.lineData,
                          options: {
                            scales: {
                              y: {
                                ticks: { color: 'rgba(226, 232, 240, 0.7)' },
                                grid: { color: 'rgba(148, 163, 184, 0.2)' },
                              },
                              x: { ticks: { color: 'rgba(226, 232, 240, 0.7)' } },
                            },
                            plugins: { legend: { display: !1 } },
                            animation: { duration: 900 },
                          },
                        }),
                      }),
                    ],
                  }),
                  e.jsxs('section', {
                    className: 'glass-panel p-6',
                    children: [
                      e.jsx('h2', {
                        className: 'text-xl font-semibold',
                        children: 'Full Answer Breakdown',
                      }),
                      e.jsx('p', {
                        className: 'text-sm text-slate-400',
                        children: 'Detailed view of each response, timing, and trait impact.',
                      }),
                      e.jsx('div', {
                        className: 'mt-6 space-y-4',
                        children: ee.map((t) => {
                          const l = S.get(t.id)
                          if (!l) return null
                          const a = t.reverse ? 3 - l.answer : l.answer,
                            N = `${x[t.trait]} +${a}`,
                            y = l.rtMs < 450,
                            r = se[l.answer] ?? `Answer ${l.answer + 1}`
                          return e.jsxs(
                            'div',
                            {
                              className: 'rounded-2xl border border-white/10 bg-slate-900/60 p-4',
                              children: [
                                e.jsxs('div', {
                                  className: 'flex flex-wrap items-start justify-between gap-3',
                                  children: [
                                    e.jsxs('div', {
                                      children: [
                                        e.jsxs('p', {
                                          className:
                                            'text-xs uppercase tracking-[0.3em] text-slate-400',
                                          children: ['Q', t.id],
                                        }),
                                        e.jsx('h3', {
                                          className: 'mt-1 text-lg font-semibold text-slate-50',
                                          children: t.text,
                                        }),
                                      ],
                                    }),
                                    e.jsxs('div', {
                                      className: 'flex gap-2',
                                      children: [
                                        t.lieTrap &&
                                          e.jsxs('span', {
                                            className:
                                              'badge gap-2 border border-amber-400/40 bg-amber-500/10 text-amber-200',
                                            children: [e.jsx(T, { size: 12 }), 'Lie Trap'],
                                          }),
                                        t.safetyTrigger &&
                                          e.jsxs('span', {
                                            className:
                                              'badge gap-2 border border-rose-400/40 bg-rose-500/10 text-rose-200',
                                            children: [e.jsx(E, { size: 12 }), 'Safety Trigger'],
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsxs('div', {
                                  className: 'mt-3 flex flex-wrap gap-3 text-xs text-slate-400',
                                  children: [
                                    e.jsxs('span', {
                                      children: [
                                        'Selected answer: ',
                                        e.jsx('span', { className: 'text-slate-100', children: r }),
                                      ],
                                    }),
                                    e.jsxs('span', { children: ['Answer index: ', l.answer + 1] }),
                                    e.jsxs('span', { children: ['RT: ', l.rtMs, 'ms'] }),
                                    e.jsxs('span', { children: ['Impact: ', N] }),
                                    y &&
                                      e.jsx('span', {
                                        className: 'text-rose-300',
                                        children: 'Fast response',
                                      }),
                                  ],
                                }),
                                e.jsxs('p', {
                                  className: 'mt-3 text-sm text-slate-300',
                                  children: [
                                    'This response suggests a ',
                                    x[t.trait],
                                    '-aligned behavior with a measured intensity of ',
                                    a,
                                    ' on the internal scale. The pacing indicates',
                                    ' ',
                                    y ? 'defensive' : 'deliberate',
                                    ' engagement.',
                                  ],
                                }),
                              ],
                            },
                            t.id
                          )
                        }),
                      }),
                    ],
                  }),
                ],
              }),
          ],
        })
      : e.jsxs('div', {
          className: 'mx-auto w-full max-w-3xl px-6 py-16',
          children: [
            e.jsx(le, { onUnlock: () => u(!0) }),
            e.jsx('p', {
              className: 'mt-4 text-xs text-slate-500',
              children:
                'Decoder access is restricted. Unlocking stores a session flag in the browser only.',
            }),
          ],
        })
  }
export { ue as default }

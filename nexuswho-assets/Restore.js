import {
  r as l,
  j as e,
  g as k,
  Q as E,
  D as F,
  m as w,
  G as T,
  W as v,
  h as L,
  E as D,
  l as z,
} from './vendor.js'
import {
  R as B,
  B as U,
  b as A,
  C as O,
  a as Q,
  P as W,
  L as _,
  i as $,
  p as G,
  c as H,
  d as V,
  e as J,
  f as K,
} from './charts.js'
import { H as Y } from './scanner.js'
import { Q as X } from './questions.js'
import { g as Z, d as q, s as ee } from './storage.js'
const se = '55486423',
  te = (d) => (d <= 0 ? 0 : Math.min(6e4, 3e3 * d * d)),
  ae = ({ onUnlock: d }) => {
    const [p, n] = l.useState(''),
      [x, t] = l.useState(0),
      [h, g] = l.useState(null),
      r = h !== null && h > Date.now(),
      c = l.useMemo(() => '•'.repeat(p.length).padEnd(8, '•'), [p]),
      f = (i) => {
        r || p.length >= 8 || n((s) => s + i)
      },
      y = () => {
        r || n((i) => i.slice(0, -1))
      },
      u = () => {
        r || n('')
      },
      j = () => {
        if (r || p.length < 8) return
        if (p === se) {
          ;(sessionStorage.setItem('VP_DECODE_UNLOCK', '1'), d())
          return
        }
        const i = x + 1
        if ((t(i), n(''), i >= 3)) {
          const s = te(i)
          ;(g(Date.now() + s), setTimeout(() => g(null), s + 200))
        }
      }
    return e.jsxs('div', {
      className: 'glass-panel p-6',
      children: [
        e.jsxs('div', {
          className: 'flex items-center gap-3',
          children: [
            e.jsx(k, { size: 28, className: 'text-sky-300' }),
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
            'mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-lg tracking-[0.3em]',
          children: [
            e.jsx('span', { children: c }),
            r &&
              e.jsx('span', {
                className: 'text-xs uppercase tracking-[0.3em] text-rose-300',
                children: 'Locked',
              }),
          ],
        }),
        e.jsxs('div', {
          className: 'mt-6 grid grid-cols-3 gap-3',
          children: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((i) =>
              e.jsx(
                'button',
                {
                  type: 'button',
                  onClick: () => f(i),
                  className:
                    'rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-semibold text-slate-100 transition hover:border-sky-300/50',
                  children: i,
                },
                i
              )
            ),
            e.jsx('button', {
              type: 'button',
              onClick: u,
              className:
                'rounded-xl border border-white/10 bg-white/5 py-3 text-xs uppercase tracking-[0.3em] text-slate-400',
              children: 'Clear',
            }),
            e.jsx('button', {
              type: 'button',
              onClick: () => f('0'),
              className:
                'rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-semibold text-slate-100 transition hover:border-sky-300/50',
              children: '0',
            }),
            e.jsx('button', {
              type: 'button',
              onClick: y,
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
              onClick: j,
              className: 'button-primary',
              children: 'Unlock',
            }),
            x > 0 &&
              e.jsxs('span', {
                className: 'text-xs text-slate-400',
                children: ['Attempts: ', x, ' / 3'],
              }),
          ],
        }),
      ],
    })
  },
  re = ({ onScan: d }) => {
    const p = l.useRef(null),
      [n, x] = l.useState(!1),
      [t, h] = l.useState(null),
      g = 'vibe-prism-scanner'
    return (
      l.useEffect(() => {
        if (!n) return
        const r = new Y(g)
        return (
          (p.current = r),
          r
            .start(
              { facingMode: 'environment' },
              { fps: 10, qrbox: { width: 220, height: 220 } },
              (c) => {
                ;(d(c), r.stop().catch(() => {}), x(!1))
              },
              (c) => {
                ;(typeof c == 'string' && c.includes('NotFound')) ||
                  h('Camera scan is active. Align the QR token.')
              }
            )
            .catch((c) => {
              ;(h(String(c)), x(!1))
            }),
          () => {
            r.stop()
              .then(() => r.clear())
              .catch(() => {})
          }
        )
      }, [n, d]),
      e.jsxs('div', {
        className: 'glass-panel p-6',
        children: [
          e.jsxs('div', {
            className: 'flex items-center gap-3',
            children: [
              e.jsx(E, { size: 24, className: 'text-sky-300' }),
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
              onClick: () => x((r) => !r),
              className: 'button-secondary',
              children: n ? 'Stop Scanner' : 'Start Scanner',
            }),
          }),
          n && e.jsx('div', { id: g, className: 'mt-4 overflow-hidden rounded-xl' }),
          t && e.jsx('p', { className: 'mt-3 text-xs text-rose-300', children: t }),
        ],
      })
    )
  }
O.register(Q, W, _, $, G, H, V, J, K)
const S = {
    GREEN: 'bg-sky-500/10 text-sky-200 border-sky-400/30',
    YELLOW: 'bg-violet-500/10 text-violet-200 border-violet-400/30',
    RED: 'bg-rose-500/10 text-rose-200 border-rose-400/30',
  },
  le = {
    masking: 'Rapid defensive responses detected under 450ms.',
    contradictions: 'Lie-trap items returned high agreement.',
    halo: 'Response pattern suggests overly idealized self-presentation.',
  },
  M = {
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
  me = () => {
    const [d, p] = l.useState(sessionStorage.getItem('VP_DECODE_UNLOCK') === '1'),
      [n, x] = l.useState(Z() ?? ''),
      [t, h] = l.useState(null),
      [g, r] = l.useState(null),
      c = l.useCallback(async (s) => {
        try {
          const a = q(s.trim()).split('|'),
            b = a.pop(),
            m = a.join('|')
          if (!b) throw new Error('Checksum missing')
          if ((await ee(m)).slice(0, 8) !== b) throw new Error('Checksum mismatch')
          if (a[0] !== 'VP1') throw new Error('Unsupported payload')
          const C = a[14],
            R = JSON.parse(C),
            P = a[12]
              .split(';')
              .map((N) => N.split(':'))
              .filter((N) => N[1] === 'true')
              .map((N) => N[0]),
            I = a[13] === 'none' ? [] : a[13].split('~')
          ;(h({
            band: a[3],
            dtiBase: Number(a[4]),
            dtiFinal: Number(a[5]),
            scores: { N: Number(a[6]), M: Number(a[7]), P: Number(a[8]), MD: Number(a[9]) },
            integrity: Number(a[10]),
            archetype: a[11],
            maskFlags: P,
            overrideFlags: I,
            answers: R,
          }),
            r(null))
        } catch (o) {
          ;(r(String(o)), h(null))
        }
      }, []),
      f = () => {
        if (!n.trim()) {
          r('Paste a token or scan a QR code.')
          return
        }
        c(n.trim())
      },
      y = l.useMemo(() => (t ? new Map(t.answers.map((s) => [s.questionId, s])) : new Map()), [t]),
      u = l.useMemo(() => {
        if (!t) return null
        const s = {
            labels: ['N', 'M', 'P', 'MD'],
            datasets: [
              {
                label: 'Trait Strength',
                data: [t.scores.N, t.scores.M, t.scores.P, t.scores.MD],
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                borderColor: 'rgba(56, 189, 248, 0.6)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(56, 189, 248, 0.9)',
              },
            ],
          },
          o = {
            labels: ['N', 'M', 'P', 'MD'],
            datasets: [
              {
                label: 'Intensity',
                data: [t.scores.N, t.scores.M, t.scores.P, t.scores.MD],
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
          a = t.answers.map((m) => m.rtMs),
          b = {
            labels: t.answers.map((m) => `Q${m.questionId}`),
            datasets: [
              {
                label: 'Response Time (ms)',
                data: a,
                borderColor: 'rgba(148, 163, 184, 0.8)',
                backgroundColor: 'rgba(148, 163, 184, 0.2)',
                pointBackgroundColor: a.map((m) =>
                  m < 450 ? 'rgba(248, 113, 113, 0.9)' : 'rgba(148, 163, 184, 0.9)'
                ),
                tension: 0.3,
              },
            ],
          }
        return { radarData: s, barData: o, lineData: b }
      }, [t]),
      j = t ? (M[t.archetype] ?? M.DRM) : null,
      i = () => {
        if (!t) return
        const s = window.open('', '_blank')
        s &&
          (s.document.write(`
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
            <p><span class="badge">Band: ${t.band}</span><span class="badge">Archetype: ${t.archetype}</span></p>
            <p>DTI Base: ${t.dtiBase} | DTI Final: ${t.dtiFinal}</p>
            <p>Integrity: ${t.integrity}</p>
          </div>
          <div class="section">
            <h2>Overrides</h2>
            <p>${t.overrideFlags.join('; ') || 'None'}</p>
          </div>
          <div class="section">
            <h2>Masking & Integrity Flags</h2>
            <p>${t.maskFlags.join(', ') || 'None'}</p>
          </div>
        </body>
      </html>
    `),
          s.document.close(),
          s.focus(),
          s.print())
      }
    return d
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
                  onClick: i,
                  className: 'button-secondary',
                  children: [e.jsx(F, { size: 18 }), 'Download Report'],
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
                        e.jsx(k, { size: 22, className: 'text-sky-300' }),
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
                      ].map((s) => e.jsx('li', { className: 'list-item', children: s }, s)),
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
                        e.jsx(k, { size: 22, className: 'text-sky-300' }),
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
                      value: n,
                      onChange: (s) => x(s.target.value),
                      className:
                        'mt-4 h-28 w-full rounded-xl border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-200',
                    }),
                    g && e.jsx('p', { className: 'mt-2 text-xs text-rose-300', children: g }),
                    e.jsx('button', {
                      type: 'button',
                      onClick: f,
                      className: 'button-primary mt-4',
                      children: 'Decode Token',
                    }),
                  ],
                }),
                e.jsx(re, {
                  onScan: (s) => {
                    ;(x(s), c(s))
                  },
                }),
              ],
            }),
            t &&
              u &&
              e.jsxs(w.div, {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.4 },
                className: 'flex flex-col gap-8',
                children: [
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
                            className: `badge border ${S[t.band] ?? S.GREEN}`,
                            children: t.band,
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
                                children: ['Base ', t.dtiBase, ' → Final ', t.dtiFinal],
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
                                children: t.archetype,
                              }),
                            ],
                          }),
                          e.jsxs('div', {
                            className: 'rounded-xl border border-white/10 bg-slate-900/60 p-4',
                            children: [
                              e.jsxs('div', {
                                className: 'flex items-center gap-2 text-sm text-slate-400',
                                children: [e.jsx(T, { size: 18 }), 'Integrity Score'],
                              }),
                              e.jsx('p', {
                                className: 'mt-2 text-lg font-semibold',
                                children: t.integrity,
                              }),
                            ],
                          }),
                        ],
                      }),
                      j &&
                        e.jsxs('div', {
                          className: 'mt-4 rounded-xl border border-white/10 bg-slate-900/60 p-4',
                          children: [
                            e.jsx('p', {
                              className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                              children: 'Archetype explanation',
                            }),
                            e.jsx('p', {
                              className: 'mt-2 text-lg font-semibold',
                              children: j.label,
                            }),
                            e.jsx('p', {
                              className: 'mt-2 text-sm text-slate-300',
                              children: j.description,
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
                          e.jsx(v, { size: 22, className: 'text-rose-300' }),
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
                          t.overrideFlags.length === 0 &&
                            e.jsx('p', {
                              className: 'text-sm text-slate-400',
                              children: 'No overrides triggered.',
                            }),
                          t.overrideFlags.map((s) =>
                            e.jsxs(
                              w.div,
                              {
                                initial: { opacity: 0 },
                                animate: { opacity: [0.7, 1, 0.7] },
                                transition: { duration: 2.4, repeat: 1 / 0, ease: 'easeInOut' },
                                className:
                                  'flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3',
                                children: [
                                  e.jsx(v, { size: 18, className: 'text-rose-300' }),
                                  e.jsx('span', {
                                    className: 'text-sm text-rose-100',
                                    children: s,
                                  }),
                                ],
                              },
                              s
                            )
                          ),
                        ],
                      }),
                      e.jsx('p', {
                        className: 'mt-3 text-xs text-slate-400',
                        children:
                          'Overrides trigger when Q11, Q15, or Q18 score ≥ 2, or when trait levels cross the P > 75 and MD > 60 threshold.',
                      }),
                      t.overrideFlags.length > 0 &&
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
                          e.jsx(L, { size: 22, className: 'text-sky-300' }),
                          e.jsxs('div', {
                            children: [
                              e.jsx('h2', {
                                className: 'text-xl font-semibold',
                                children: 'Trait Analysis',
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-slate-400',
                                children: 'Weighted trait intensities.',
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
                            children: e.jsx(B, {
                              data: u.radarData,
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
                            children: e.jsx(U, {
                              data: u.barData,
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
                            label: 'Narcissism (N)',
                            copy: 'Elevated focus on visibility, status control, and perceived centrality in group dynamics.',
                          },
                          {
                            key: 'M',
                            label: 'Machiavellianism (M)',
                            copy: 'Strategic, long-horizon planning with emphasis on leverage, timing, and advantage.',
                          },
                          {
                            key: 'P',
                            label: 'Psychopathy (P)',
                            copy: 'Emotional detachment, intensity, and willingness to prioritize outcomes over social cost.',
                          },
                          {
                            key: 'MD',
                            label: 'Manipulation Doctrine (MD)',
                            copy: 'Preferred influence tactics, persuasion confidence, and group-shaping behaviors.',
                          },
                        ].map((s) =>
                          e.jsxs(
                            'div',
                            {
                              className: 'rounded-xl border border-white/10 bg-slate-900/60 p-4',
                              children: [
                                e.jsx('p', {
                                  className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                                  children: s.label,
                                }),
                                e.jsx('p', {
                                  className: 'mt-2 text-sm text-slate-300',
                                  children: s.copy,
                                }),
                              ],
                            },
                            s.key
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
                          t.maskFlags.length > 0
                            ? e.jsx(D, { size: 22, className: 'text-amber-300' })
                            : e.jsx(z, { size: 22, className: 'text-sky-300' }),
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
                          t.maskFlags.length === 0 &&
                            e.jsx('p', {
                              className: 'text-sm text-slate-400',
                              children: 'No integrity flags detected.',
                            }),
                          t.maskFlags.map((s) =>
                            e.jsxs(
                              'div',
                              {
                                className:
                                  'rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100',
                                children: [
                                  e.jsx('p', {
                                    className: 'text-sm font-semibold uppercase tracking-[0.2em]',
                                    children: s,
                                  }),
                                  e.jsx('p', {
                                    className: 'mt-1 text-xs text-amber-200',
                                    children: le[s] ?? 'Integrity signal observed.',
                                  }),
                                ],
                              },
                              s
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
                          e.jsx(E, { size: 20, className: 'text-slate-300' }),
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
                        children: e.jsx(A, {
                          data: u.lineData,
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
                        children: X.map((s) => {
                          const o = y.get(s.id)
                          if (!o) return null
                          const a = s.reverse ? 3 - o.answer : o.answer,
                            b = `${s.trait} +${a}`,
                            m = o.rtMs < 450
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
                                          children: ['Q', s.id],
                                        }),
                                        e.jsx('h3', {
                                          className: 'mt-1 text-lg font-semibold text-slate-50',
                                          children: s.text,
                                        }),
                                      ],
                                    }),
                                    e.jsxs('div', {
                                      className: 'flex gap-2',
                                      children: [
                                        s.lieTrap &&
                                          e.jsxs('span', {
                                            className:
                                              'badge gap-2 border border-amber-400/40 bg-amber-500/10 text-amber-200',
                                            children: [e.jsx(D, { size: 12 }), 'Lie Trap'],
                                          }),
                                        s.safetyTrigger &&
                                          e.jsxs('span', {
                                            className:
                                              'badge gap-2 border border-rose-400/40 bg-rose-500/10 text-rose-200',
                                            children: [e.jsx(v, { size: 12 }), 'Safety Trigger'],
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsxs('div', {
                                  className: 'mt-3 flex flex-wrap gap-3 text-xs text-slate-400',
                                  children: [
                                    e.jsxs('span', { children: ['Answer: ', o.answer] }),
                                    e.jsxs('span', { children: ['RT: ', o.rtMs, 'ms'] }),
                                    e.jsxs('span', { children: ['Impact: ', b] }),
                                    m &&
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
                                    s.trait,
                                    '-aligned behavior with a measured intensity of ',
                                    a,
                                    ' on the internal scale. The pacing indicates',
                                    ' ',
                                    m ? 'defensive' : 'deliberate',
                                    ' engagement.',
                                  ],
                                }),
                              ],
                            },
                            s.id
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
            e.jsx(ae, { onUnlock: () => p(!0) }),
            e.jsx('p', {
              className: 'mt-4 text-xs text-slate-500',
              children:
                'Decoder access is restricted. Unlocking stores a session flag in the browser only.',
            }),
          ],
        })
  }
export { me as default }

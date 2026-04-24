import {
  r as i,
  j as e,
  h as T,
  Q as F,
  D as L,
  m as C,
  G as $,
  W as R,
  i as z,
  E as I,
  n as U,
} from './vendor.js'
import {
  R as B,
  B as W,
  b as O,
  C as Q,
  a as _,
  P as H,
  L as G,
  i as V,
  p as Y,
  c as K,
  d as J,
  e as X,
  f as Z,
} from './charts.js'
import { H as q } from './scanner.js'
import { Q as ee, A as se } from './questions.js'
import { g as te, d as ae, s as re } from './storage.js'
const ne = '55486423',
  ie = (l) => (l <= 0 ? 0 : Math.min(6e4, 3e3 * l * l)),
  le = () => {
    try {
      return (sessionStorage.setItem('VP_DECODE_UNLOCK', '1'), !0)
    } catch {
      return !1
    }
  },
  oe = ({ onUnlock: l }) => {
    const [m, n] = i.useState(''),
      [x, t] = i.useState(0),
      [N, y] = i.useState(null),
      [c, h] = i.useState(null),
      w = N !== null && N > Date.now(),
      D = i.useMemo(() => Array.from({ length: 8 }, (s, a) => (a < m.length ? '•' : '◦')), [m]),
      p = (s) => {
        w || m.length >= 8 || n((a) => a + s)
      },
      M = () => {
        w || n((s) => s.slice(0, -1))
      },
      S = () => {
        w || n('')
      },
      E = () => {
        if (w || m.length < 8) return
        if (m === ne) {
          const a = le()
          ;(h(
            a
              ? null
              : 'Unlocked for this view, but private browser settings blocked session storage.'
          ),
            l())
          return
        }
        const s = x + 1
        if ((t(s), n(''), s >= 3)) {
          const a = ie(s)
          ;(y(Date.now() + a), setTimeout(() => y(null), a + 200))
        }
      }
    return e.jsxs('div', {
      className: 'glass-panel p-6',
      children: [
        e.jsxs('div', {
          className: 'flex items-center gap-3',
          children: [
            e.jsx(T, { size: 28, className: 'text-sky-300' }),
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
              children: D.map((s, a) =>
                e.jsx(
                  'span',
                  {
                    className:
                      s === '•'
                        ? 'inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-400/20 text-emerald-100'
                        : 'inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-slate-800/70 text-slate-500',
                    children: s,
                  },
                  `${s}-${a}`
                )
              ),
            }),
            w &&
              e.jsx('span', {
                className: 'text-xs uppercase tracking-[0.3em] text-rose-300',
                children: 'Locked',
              }),
          ],
        }),
        e.jsxs('div', {
          className: 'mt-6 grid grid-cols-3 gap-3',
          children: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((s) =>
              e.jsx(
                'button',
                {
                  type: 'button',
                  onClick: () => p(s),
                  className:
                    'rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-semibold text-slate-100 transition hover:border-sky-300/50',
                  children: s,
                },
                s
              )
            ),
            e.jsx('button', {
              type: 'button',
              onClick: S,
              className:
                'rounded-xl border border-white/10 bg-white/5 py-3 text-xs uppercase tracking-[0.3em] text-slate-400',
              children: 'Clear',
            }),
            e.jsx('button', {
              type: 'button',
              onClick: () => p('0'),
              className:
                'rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-semibold text-slate-100 transition hover:border-sky-300/50',
              children: '0',
            }),
            e.jsx('button', {
              type: 'button',
              onClick: M,
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
              onClick: E,
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
        c && e.jsx('p', { className: 'mt-3 text-xs text-amber-200', children: c }),
      ],
    })
  },
  ce = ({ onScan: l }) => {
    const m = i.useRef(null),
      [n, x] = i.useState(!1),
      [t, N] = i.useState(null),
      y = 'vibe-prism-scanner'
    return (
      i.useEffect(() => {
        if (!n) return
        const c = new q(y)
        return (
          (m.current = c),
          c
            .start(
              { facingMode: 'environment' },
              { fps: 10, qrbox: { width: 220, height: 220 } },
              (h) => {
                ;(l(h), c.stop().catch(() => {}), x(!1))
              },
              (h) => {
                ;(typeof h == 'string' && h.includes('NotFound')) ||
                  N('Camera scan is active. Align the QR token.')
              }
            )
            .catch((h) => {
              ;(N(String(h)), x(!1))
            }),
          () => {
            c.stop()
              .then(() => c.clear())
              .catch(() => {})
          }
        )
      }, [n, l]),
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
              onClick: () => x((c) => !c),
              className: 'button-secondary',
              children: n ? 'Stop Scanner' : 'Start Scanner',
            }),
          }),
          n && e.jsx('div', { id: y, className: 'mt-4 overflow-hidden rounded-xl' }),
          t && e.jsx('p', { className: 'mt-3 text-xs text-rose-300', children: t }),
        ],
      })
    )
  }
Q.register(_, H, G, V, Y, K, J, X, Z)
const P = {
    GREEN: 'bg-sky-500/10 text-sky-200 border-sky-400/30',
    YELLOW: 'bg-violet-500/10 text-violet-200 border-violet-400/30',
    RED: 'bg-rose-500/10 text-rose-200 border-rose-400/30',
  },
  u = { N: 'Narcissism', M: 'Machiavellianism', P: 'Psychopathy', MD: 'Manipulation Doctrine' },
  de = {
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
  me = {
    masking: 'Rapid defensive responses detected under 450ms.',
    contradictions: 'Lie-trap items returned high agreement.',
    halo: 'Response pattern suggests overly idealized self-presentation.',
  },
  A = {
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
  xe = () => {
    try {
      return sessionStorage.getItem('VP_DECODE_UNLOCK') === '1'
    } catch {
      return !1
    }
  },
  he = (l) => (l instanceof Error ? l.message : 'Unable to decode this token.'),
  pe = (l) => {
    const m = JSON.parse(l)
    if (!Array.isArray(m)) throw new Error('Answer payload must be a list.')
    return m.map((n, x) => {
      if (
        typeof n != 'object' ||
        n === null ||
        typeof n.questionId != 'number' ||
        typeof n.answer != 'number' ||
        typeof n.rtMs != 'number'
      )
        throw new Error(`Invalid answer payload at index ${x}.`)
      return { questionId: n.questionId, answer: n.answer, rtMs: n.rtMs }
    })
  },
  Ne = () => {
    const [l, m] = i.useState(xe),
      [n, x] = i.useState(te() ?? ''),
      [t, N] = i.useState(null),
      [y, c] = i.useState(null),
      h = i.useCallback(async (s) => {
        try {
          const r = ae(s.trim()).split('|'),
            b = r.pop(),
            v = r.join('|')
          if (!b) throw new Error('Checksum missing')
          if ((await re(v)).slice(0, 8) !== b) throw new Error('Checksum mismatch')
          if (r[0] !== 'VP1') throw new Error('Unsupported payload')
          if (r.length < 15) throw new Error('Token payload is incomplete.')
          const o = pe(r[14]),
            f = (r[12] ?? '')
              .split(';')
              .map((j) => j.split(':'))
              .filter((j) => j[1] === 'true')
              .map((j) => j[0])
              .filter(Boolean),
            k = !r[13] || r[13] === 'none' ? [] : r[13].split('~'),
            d = [r[4], r[5], r[6], r[7], r[8], r[9], r[10]].map((j) => Number(j))
          if (d.some((j) => Number.isNaN(j))) throw new Error('Token has invalid numeric fields.')
          ;(N({
            band: r[3],
            dtiBase: d[0],
            dtiFinal: d[1],
            scores: { N: d[2], M: d[3], P: d[4], MD: d[5] },
            integrity: d[6],
            archetype: r[11],
            maskFlags: f,
            overrideFlags: k,
            answers: o,
          }),
            c(null))
        } catch (a) {
          ;(c(he(a)), N(null))
        }
      }, []),
      w = () => {
        if (!n.trim()) {
          c('Paste a token or scan a QR code.')
          return
        }
        h(n.trim())
      },
      D = i.useMemo(() => {
        if (!t) return new Map()
        const s = Array.isArray(t.answers) ? t.answers : []
        return new Map(s.map((a) => [a.questionId, a]))
      }, [t]),
      p = i.useMemo(() => {
        if (!t) return null
        const s = {
            labels: [u.N, u.M, u.P, u.MD],
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
          a = {
            labels: [u.N, u.M, u.P, u.MD],
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
          r = Array.isArray(t.answers) ? t.answers : [],
          b = r.map((o) => o.rtMs),
          v = {
            labels: r.map((o) => `Q${o.questionId}`),
            datasets: [
              {
                label: 'Response Time (ms)',
                data: b,
                borderColor: 'rgba(148, 163, 184, 0.8)',
                backgroundColor: 'rgba(148, 163, 184, 0.2)',
                pointBackgroundColor: b.map((o) =>
                  o < 450 ? 'rgba(248, 113, 113, 0.9)' : 'rgba(148, 163, 184, 0.9)'
                ),
                tension: 0.3,
              },
            ],
          },
          g = Object.keys(t.scores).map((o) => {
            const f = t.scores[o],
              k = de[o],
              d = u[o]
            return f <= k.normalMax
              ? {
                  key: o,
                  label: d,
                  score: f,
                  level: 'Normal range',
                  tone: 'text-emerald-100 border-emerald-400/30 bg-emerald-500/10',
                  explanation:
                    'This score sits in a controlled band with low signal for disruptive behavioral intensity in this trait.',
                }
              : f <= k.elevatedMax
                ? {
                    key: o,
                    label: d,
                    score: f,
                    level: 'Watch zone',
                    tone: 'text-sky-100 border-sky-400/30 bg-sky-500/10',
                    explanation:
                      'This is above baseline and worth monitoring across contexts. It may be situationally useful but can become costly under stress.',
                  }
                : f <= k.highMax
                  ? {
                      key: o,
                      label: d,
                      score: f,
                      level: 'High',
                      tone: 'text-amber-100 border-amber-400/30 bg-amber-500/10',
                      explanation:
                        'This is a strong trait signal. It can improve decisiveness and control, but should be balanced to avoid over-indexing.',
                    }
                  : {
                      key: o,
                      label: d,
                      score: f,
                      level: 'Concerning',
                      tone: 'text-rose-100 border-rose-400/30 bg-rose-500/10',
                      explanation: `This crosses the concerning threshold because ${k.concerningReason}`,
                    }
          })
        return { radarData: s, barData: a, lineData: v, traitHighlights: g }
      }, [t]),
      M = t ? (A[t.archetype] ?? A.DRM) : null,
      S = i.useMemo(() => {
        if (!t || !p) return null
        const s = p.traitHighlights.filter((g) => g.level === 'Concerning'),
          a = p.traitHighlights.filter((g) => g.level === 'High'),
          r =
            t.band === 'RED'
              ? 'This profile reads as high-voltage and strategically forceful, with enough intensity to warrant active boundaries and careful context checks.'
              : t.band === 'YELLOW'
                ? 'This profile reads as adaptive and ambitious, but not fully neutral—there are signals that merit deliberate self-monitoring.'
                : 'This profile reads as comparatively stable and lower-risk, with trait expressions that appear controlled across most domains.',
          b =
            s.length > 0
              ? `The most concerning concentration is in ${s.map((g) => g.label).join(', ')}, which likely drives the strongest interpersonal friction risk.`
              : a.length > 0
                ? `The strongest expression is in ${a.map((g) => g.label).join(', ')}, which can be productive in leadership settings but may become costly when empathy bandwidth drops.`
                : 'No single trait crosses into a high-concern zone, suggesting a relatively even distribution without a dominant distortion pattern.',
          v =
            t.maskFlags.length > 0
              ? `Integrity checks also flagged ${t.maskFlags.length} pattern(s), so interpretation should account for possible masking or defensiveness during responses.`
              : 'Integrity checks did not flag masking patterns, so confidence in the readout is comparatively stronger.'
        return `${r} ${b} ${v}`
      }, [t, p]),
      E = () => {
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
    return l
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
                  onClick: E,
                  className: 'button-secondary',
                  children: [e.jsx(L, { size: 18 }), 'Download Report'],
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
                        e.jsx(T, { size: 22, className: 'text-sky-300' }),
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
                        e.jsx(T, { size: 22, className: 'text-sky-300' }),
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
                    y && e.jsx('p', { className: 'mt-2 text-xs text-rose-300', children: y }),
                    e.jsx('button', {
                      type: 'button',
                      onClick: w,
                      className: 'button-primary mt-4',
                      children: 'Decode Token',
                    }),
                  ],
                }),
                e.jsx(ce, {
                  onScan: (s) => {
                    ;(x(s), h(s))
                  },
                }),
              ],
            }),
            t &&
              p &&
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
                      e.jsx('p', { className: 'mt-3 text-sm text-slate-200', children: S }),
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
                              ' (strategic social planning),',
                              ' ',
                              e.jsx('strong', { children: 'Psychopathy' }),
                              ' (emotional detachment under pressure), and',
                              ' ',
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
                            className: `badge border ${P[t.band] ?? P.GREEN}`,
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
                                children: [e.jsx($, { size: 18 }), 'Integrity Score'],
                              }),
                              e.jsx('p', {
                                className: 'mt-2 text-lg font-semibold',
                                children: t.integrity,
                              }),
                            ],
                          }),
                        ],
                      }),
                      M &&
                        e.jsxs('div', {
                          className: 'mt-4 rounded-xl border border-white/10 bg-slate-900/60 p-4',
                          children: [
                            e.jsx('p', {
                              className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                              children: 'Archetype explanation',
                            }),
                            e.jsx('p', {
                              className: 'mt-2 text-lg font-semibold',
                              children: M.label,
                            }),
                            e.jsx('p', {
                              className: 'mt-2 text-sm text-slate-300',
                              children: M.description,
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
                          e.jsx(R, { size: 22, className: 'text-rose-300' }),
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
                              C.div,
                              {
                                initial: { opacity: 0 },
                                animate: { opacity: [0.7, 1, 0.7] },
                                transition: { duration: 2.4, repeat: 1 / 0, ease: 'easeInOut' },
                                className:
                                  'flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3',
                                children: [
                                  e.jsx(R, { size: 18, className: 'text-rose-300' }),
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
                          'Overrides trigger when Q11, Q15, or Q18 score ≥ 2, or when Psychopathy exceeds 64 and Manipulation Doctrine exceeds 76.',
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
                          e.jsx(z, { size: 22, className: 'text-sky-300' }),
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
                            children: e.jsx(B, {
                              data: p.radarData,
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
                            children: e.jsx(W, {
                              data: p.barData,
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
                      e.jsx('div', {
                        className: 'mt-6 grid gap-3 md:grid-cols-2',
                        children: p.traitHighlights.map((s) =>
                          e.jsxs(
                            'div',
                            {
                              className: `rounded-xl border p-4 ${s.tone}`,
                              children: [
                                e.jsxs('div', {
                                  className: 'flex items-center justify-between gap-3',
                                  children: [
                                    e.jsx('p', {
                                      className: 'text-sm font-semibold',
                                      children: s.label,
                                    }),
                                    e.jsx('span', {
                                      className: 'text-xs uppercase tracking-[0.25em]',
                                      children: s.level,
                                    }),
                                  ],
                                }),
                                e.jsxs('p', {
                                  className: 'mt-2 text-sm opacity-95',
                                  children: ['Score: ', s.score],
                                }),
                                e.jsx('p', {
                                  className: 'mt-2 text-xs opacity-90',
                                  children: s.explanation,
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
                            ? e.jsx(I, { size: 22, className: 'text-amber-300' })
                            : e.jsx(U, { size: 22, className: 'text-sky-300' }),
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
                                    children: me[s] ?? 'Integrity signal observed.',
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
                        children: e.jsx(O, {
                          data: p.lineData,
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
                        children: ee.map((s) => {
                          const a = D.get(s.id)
                          if (!a) return null
                          const r = s.reverse ? 3 - a.answer : a.answer,
                            b = `${u[s.trait]} +${r}`,
                            v = a.rtMs < 450,
                            g = se[a.answer] ?? `Answer ${a.answer + 1}`
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
                                            children: [e.jsx(I, { size: 12 }), 'Lie Trap'],
                                          }),
                                        s.safetyTrigger &&
                                          e.jsxs('span', {
                                            className:
                                              'badge gap-2 border border-rose-400/40 bg-rose-500/10 text-rose-200',
                                            children: [e.jsx(R, { size: 12 }), 'Safety Trigger'],
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
                                        e.jsx('span', { className: 'text-slate-100', children: g }),
                                      ],
                                    }),
                                    e.jsxs('span', { children: ['Answer index: ', a.answer + 1] }),
                                    e.jsxs('span', { children: ['RT: ', a.rtMs, 'ms'] }),
                                    e.jsxs('span', { children: ['Impact: ', b] }),
                                    v &&
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
                                    u[s.trait],
                                    '-aligned behavior with a measured intensity of ',
                                    r,
                                    ' on the internal scale. The pacing indicates',
                                    ' ',
                                    v ? 'defensive' : 'deliberate',
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
            e.jsx(oe, { onUnlock: () => m(!0) }),
            e.jsx('p', {
              className: 'mt-4 text-xs text-slate-500',
              children:
                'Decoder access is restricted. Unlocking stores a session flag in the browser only.',
            }),
          ],
        })
  }
export { Ne as default }

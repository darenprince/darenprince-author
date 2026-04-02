import { j as e, m as v, u as I, r as x, h as $, L as A, S as P, k as z } from './vendor.js'
import { A as H, Q as T } from './questions.js'
import { h as L, s as C, b as B, a as F, c as Q } from './storage.js'
const Y = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i } }),
  },
  G = ({ question: i, sequence: l, total: o, onAnswer: d }) =>
    e.jsxs(
      v.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.3 },
        className: 'glass-panel p-6',
        children: [
          e.jsxs('div', {
            className:
              'flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400',
            children: [
              e.jsxs('span', { children: ['Question ', l, ' of ', o] }),
              e.jsx('span', {
                className: 'rounded-full bg-white/10 px-3 py-1',
                children: 'Vibe Prism',
              }),
            ],
          }),
          e.jsx('h2', { className: 'mt-4 text-2xl font-semibold text-slate-50', children: i.text }),
          e.jsx('div', {
            className: 'mt-6 grid gap-3',
            children: H.map((h, c) =>
              e.jsx(
                v.button,
                {
                  type: 'button',
                  custom: c,
                  variants: Y,
                  initial: 'hidden',
                  animate: 'visible',
                  onClick: () => d(c),
                  className:
                    'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:border-sky-300/50 hover:bg-sky-500/10',
                  children: e.jsx('span', { children: h }),
                },
                h
              )
            ),
          }),
        ],
      },
      i.id
    ),
  U = ({ value: i }) =>
    e.jsx('div', {
      className: 'h-2 w-full overflow-hidden rounded-full bg-white/10',
      children: e.jsx(v.div, {
        className: 'h-full bg-gradient-to-r from-pink-400/50 via-sky-300/60 to-emerald-200/70',
        initial: { width: 0 },
        animate: { width: `${i}%` },
        transition: { duration: 0.4 },
      }),
    }),
  V = (i) => {
    const l = [...i]
    for (let o = l.length - 1; o > 0; o -= 1) {
      const d = Math.floor(Math.random() * (o + 1))
      ;[l[o], l[d]] = [l[d], l[o]]
    }
    return l
  },
  D = (i) => Math.min(100, Math.max(0, Math.round(i))),
  W = { N: 1, M: 1.2, P: 1.4, MD: 1.3 },
  g = { bandYellowMin: 32, bandRedMin: 58, psychopathyHigh: 64, manipulationDoctrineHigh: 76 },
  _ = (i, l) => {
    const o = { N: 0, M: 0, P: 0, MD: 0 },
      d = { N: 0, M: 0, P: 0, MD: 0 },
      h = new Map(l.map((t) => [t.questionId, t]))
    let c = !1,
      j = !1,
      N = 0
    i.forEach((t) => {
      const n = h.get(t.id)
      if (!n) return
      const p = t.reverse ? 3 - n.answer : n.answer
      ;((o[t.trait] += p),
        (d[t.trait] += 1),
        (N += n.answer),
        n.rtMs < 450 && n.answer >= 2 && (c = !0),
        t.lieTrap && n.answer >= 2 && (j = !0))
    })
    const b = N / l.length >= 2.7,
      s = Object.keys(o).reduce(
        (t, n) => {
          const p = d[n] * 3,
            R = (p > 0 ? (o[n] / p) * 100 : 0) * W[n]
          return ((t[n] = D(R)), t)
        },
        { N: 0, M: 0, P: 0, MD: 0 }
      ),
      m = { masking: c, contradictions: j, halo: b },
      w = Object.values(m).filter(Boolean).length,
      M = Math.max(70, 100 - w * 10),
      k = 0.9 * s.N + 1.1 * s.M + 1.3 * s.P,
      r = D(k / 3),
      f = w >= 2 ? D(r * 1.25) : r,
      y = i
        .filter((t) => t.safetyTrigger)
        .map((t) => {
          const n = h.get(t.id)
          return n && n.answer >= 2 ? `Q${t.id}: ${t.text}` : null
        })
        .filter((t) => !!t)
    s.P > g.psychopathyHigh &&
      s.MD > g.manipulationDoctrineHigh &&
      y.push(
        `Trait combination: Psychopathy > ${g.psychopathyHigh} and Manipulation Doctrine > ${g.manipulationDoctrineHigh}`
      )
    const u = { triggered: y.length > 0, triggers: y }
    let a = 'GREEN'
    f >= g.bandRedMin || u.triggered ? (a = 'RED') : f >= g.bandYellowMin && (a = 'YELLOW')
    const S =
      s.P >= 70 && s.M >= 70
        ? 'APX'
        : s.M >= 70 && s.MD >= 70
          ? 'PUP'
          : s.N >= 70
            ? 'EGO'
            : s.M >= 60 && s.N >= 55
              ? 'SMR'
              : Math.max(s.N, s.M, s.P, s.MD) < 45
                ? 'LOW'
                : 'DRM'
    return {
      scores: s,
      dtiBase: r,
      dtiFinal: f,
      band: a,
      archetype: S,
      integrity: M,
      integrityFlags: m,
      safetyOverrides: u,
    }
  },
  X = () => {
    const i = I(),
      [l, o] = x.useState(!1),
      [d, h] = x.useState(!1),
      [c, j] = x.useState(0),
      [N, O] = x.useState([]),
      b = x.useRef(crypto.randomUUID()),
      s = x.useRef(0)
    x.useEffect(() => {
      o(L())
    }, [])
    const m = x.useMemo(() => V(T), []),
      w = d ? ((c + 1) / m.length) * 100 : 0,
      M = () => {
        ;(h(!0), (s.current = performance.now()))
      },
      k = async (r) => {
        const f = m[c],
          y = Math.round(performance.now() - s.current),
          u = [...N, { questionId: f.id, answer: r, rtMs: y }]
        if ((O(u), c === m.length - 1)) {
          const a = _(T, u),
            S = JSON.stringify(u),
            t = `masking:${a.integrityFlags.masking};contradictions:${a.integrityFlags.contradictions};halo:${a.integrityFlags.halo}`,
            n = a.safetyOverrides.triggers.join('~') || 'none',
            p = [
              'VP1',
              b.current,
              new Date().toISOString(),
              a.band,
              a.dtiBase.toString(),
              a.dtiFinal.toString(),
              a.scores.N.toString(),
              a.scores.M.toString(),
              a.scores.P.toString(),
              a.scores.MD.toString(),
              a.integrity.toString(),
              a.archetype,
              t,
              n,
              S,
            ].join('|'),
            E = (await C(p)).slice(0, 8),
            R = B(`${p}|${E}`)
          ;(F(R), Q(), i('/result'))
          return
        }
        ;(j((a) => a + 1), (s.current = performance.now()))
      }
    return l
      ? e.jsx('div', {
          className: 'mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16',
          children: e.jsxs('div', {
            className: 'glass-panel p-6',
            children: [
              e.jsxs('div', {
                className: 'flex items-center gap-3',
                children: [
                  e.jsx($, { size: 24, className: 'text-sky-300' }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('h2', {
                        className: 'text-xl font-semibold',
                        children: 'One attempt per session',
                      }),
                      e.jsx('p', {
                        className: 'text-sm text-slate-400',
                        children:
                          'This quiz allows only a single pass. You can restore your latest profile or continue to the decoder if you have a token.',
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'mt-6 flex flex-wrap gap-3',
                children: [
                  e.jsx(A, {
                    to: '/result',
                    className: 'button-primary',
                    children: 'View results',
                  }),
                  e.jsx(A, {
                    to: '/restore',
                    className: 'button-secondary',
                    children: 'Restore profile',
                  }),
                ],
              }),
            ],
          }),
        })
      : e.jsxs('div', {
          className: 'mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16',
          children: [
            e.jsxs('div', {
              className:
                'flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-slate-400',
              children: [
                e.jsx('span', { children: 'Vibe Prism — quiz flow' }),
                e.jsx('span', { children: d ? `${c + 1} / ${m.length}` : 'Ready' }),
              ],
            }),
            e.jsx(U, { value: w }),
            e.jsxs('div', {
              className: 'grid gap-6 lg:grid-cols-[1.2fr_0.8fr]',
              children: [
                e.jsx(v.div, {
                  layout: !0,
                  children: d
                    ? e.jsx(G, { question: m[c], sequence: c + 1, total: m.length, onAnswer: k })
                    : e.jsxs('div', {
                        className: 'glass-panel p-6',
                        children: [
                          e.jsxs('div', {
                            className: 'flex items-center gap-3',
                            children: [
                              e.jsx(P, { size: 22, className: 'text-sky-300' }),
                              e.jsxs('div', {
                                children: [
                                  e.jsx('h2', {
                                    className: 'text-xl font-semibold text-slate-50',
                                    children: 'Before you begin',
                                  }),
                                  e.jsx('p', {
                                    className: 'text-sm text-slate-400',
                                    children:
                                      'Read the quick notes below. The session begins when you press start.',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsx('ul', {
                            className: 'mt-5 space-y-2 text-sm text-slate-300',
                            children: [
                              'Go with your first instinct for each prompt.',
                              'One pass only, with no backtracking.',
                              'Your profile token stays on this device.',
                            ].map((r) => e.jsx('li', { className: 'list-item', children: r }, r)),
                          }),
                          e.jsxs('button', {
                            type: 'button',
                            onClick: M,
                            className: 'button-primary mt-6',
                            children: [e.jsx(P, { size: 18 }), 'Start the quiz'],
                          }),
                        ],
                      }),
                }),
                e.jsxs('div', {
                  className: 'flex flex-col gap-4',
                  children: [
                    e.jsxs('div', {
                      className: 'glass-panel p-6',
                      children: [
                        e.jsxs('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            e.jsx(P, { size: 20, className: 'text-sky-300' }),
                            e.jsxs('div', {
                              children: [
                                e.jsx('h3', {
                                  className: 'text-lg font-semibold',
                                  children: 'Session Guidance',
                                }),
                                e.jsx('p', {
                                  className: 'text-sm text-slate-400',
                                  children:
                                    'Stay honest and stay present. Let your instincts lead.',
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsx('ul', {
                          className: 'mt-4 space-y-2 text-sm text-slate-300',
                          children: [
                            'No backtracking once you move forward.',
                            'Keep the pace that feels natural to you.',
                            'Your token stays on this device only.',
                          ].map((r) => e.jsx('li', { className: 'list-item', children: r }, r)),
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'glass-panel p-6',
                      children: [
                        e.jsxs('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            e.jsx(z, { size: 20, className: 'text-sky-300' }),
                            e.jsxs('div', {
                              children: [
                                e.jsx('h3', {
                                  className: 'text-lg font-semibold',
                                  children: 'Answer Choices',
                                }),
                                e.jsx('p', {
                                  className: 'text-sm text-slate-400',
                                  children: 'Choose the response that feels closest to you.',
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsx('div', {
                          className: 'mt-4 grid gap-2 text-sm text-slate-300',
                          children: ['Not me', 'Rarely me', 'Often me', 'Definitely me'].map((r) =>
                            e.jsx(
                              'div',
                              {
                                className:
                                  'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                                children: e.jsx('span', {
                                  className: 'text-slate-100',
                                  children: r,
                                }),
                              },
                              r
                            )
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
  }
export { X as default }

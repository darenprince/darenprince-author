import { j as e, m as w, u as T, r as m, g as z, L as E, S as P, i as I } from './vendor.js'
import { A as C, Q as A } from './questions.js'
import { h as L, s as $, b as B, a as F, c as Q } from './storage.js'
import './scanner.js'
const G = {
    hidden: { opacity: 0, y: 12 },
    visible: (r) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * r } }),
  },
  U = ({ question: r, sequence: l, total: o, onAnswer: d }) =>
    e.jsxs(
      w.div,
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
          e.jsx('h2', { className: 'mt-4 text-2xl font-semibold text-slate-50', children: r.text }),
          e.jsx('div', {
            className: 'mt-6 grid gap-3',
            children: C.map((h, c) =>
              e.jsx(
                w.button,
                {
                  type: 'button',
                  custom: c,
                  variants: G,
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
      r.id
    ),
  V = ({ value: r }) =>
    e.jsx('div', {
      className: 'h-2 w-full overflow-hidden rounded-full bg-white/10',
      children: e.jsx(w.div, {
        className: 'h-full bg-gradient-to-r from-pink-400/50 via-sky-300/60 to-emerald-200/70',
        initial: { width: 0 },
        animate: { width: `${r}%` },
        transition: { duration: 0.4 },
      }),
    }),
  W = (r) => {
    const l = [...r]
    for (let o = l.length - 1; o > 0; o -= 1) {
      const d = Math.floor(Math.random() * (o + 1))
      ;[l[o], l[d]] = [l[d], l[o]]
    }
    return l
  },
  R = (r) => Math.min(100, Math.max(0, Math.round(r))),
  Y = { N: 1, M: 1.2, P: 1.4, MD: 1.3 },
  H = (r, l) => {
    const o = { N: 0, M: 0, P: 0, MD: 0 },
      d = { N: 0, M: 0, P: 0, MD: 0 },
      h = new Map(l.map((t) => [t.questionId, t]))
    let c = !1,
      y = !1,
      j = 0
    r.forEach((t) => {
      const n = h.get(t.id)
      if (!n) return
      const u = t.reverse ? 3 - n.answer : n.answer
      ;((o[t.trait] += u),
        (d[t.trait] += 1),
        (j += n.answer),
        n.rtMs < 450 && n.answer >= 2 && (c = !0),
        t.lieTrap && n.answer >= 2 && (y = !0))
    })
    const v = j / l.length >= 2.7,
      s = Object.keys(o).reduce(
        (t, n) => {
          const u = d[n] * 3,
            S = (u > 0 ? (o[n] / u) * 100 : 0) * Y[n]
          return ((t[n] = R(S)), t)
        },
        { N: 0, M: 0, P: 0, MD: 0 }
      ),
      x = { masking: c, contradictions: y, halo: v },
      N = Object.values(x).filter(Boolean).length,
      b = Math.max(70, 100 - N * 10),
      k = 0.9 * s.N + 1.1 * s.M + 1.3 * s.P,
      i = R(k / 3),
      f = N >= 2 ? R(i * 1.25) : i,
      g = r
        .filter((t) => t.safetyTrigger)
        .map((t) => {
          const n = h.get(t.id)
          return n && n.answer >= 2 ? `Q${t.id}: ${t.text}` : null
        })
        .filter((t) => !!t)
    s.P > 75 && s.MD > 60 && g.push('Trait combination: P > 75 and MD > 60')
    const p = { triggered: g.length > 0, triggers: g }
    let a = 'GREEN'
    f >= 60 || p.triggered ? (a = 'RED') : f >= 35 && (a = 'YELLOW')
    const M =
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
      dtiBase: i,
      dtiFinal: f,
      band: a,
      archetype: M,
      integrity: b,
      integrityFlags: x,
      safetyOverrides: p,
    }
  },
  X = () => {
    const r = T(),
      [l, o] = m.useState(!1),
      [d, h] = m.useState(!1),
      [c, y] = m.useState(0),
      [j, O] = m.useState([]),
      v = m.useRef(crypto.randomUUID()),
      s = m.useRef(0)
    m.useEffect(() => {
      o(L())
    }, [])
    const x = m.useMemo(() => W(A), []),
      N = d ? ((c + 1) / x.length) * 100 : 0,
      b = () => {
        ;(h(!0), (s.current = performance.now()))
      },
      k = async (i) => {
        const f = x[c],
          g = Math.round(performance.now() - s.current),
          p = [...j, { questionId: f.id, answer: i, rtMs: g }]
        if ((O(p), c === x.length - 1)) {
          const a = H(A, p),
            M = JSON.stringify(p),
            t = `masking:${a.integrityFlags.masking};contradictions:${a.integrityFlags.contradictions};halo:${a.integrityFlags.halo}`,
            n = a.safetyOverrides.triggers.join('~') || 'none',
            u = [
              'VP1',
              v.current,
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
              M,
            ].join('|'),
            D = (await $(u)).slice(0, 8),
            S = B(`${u}|${D}`)
          ;(F(S), Q(), r('/result'))
          return
        }
        ;(y((a) => a + 1), (s.current = performance.now()))
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
                  e.jsx(z, { size: 24, className: 'text-sky-300' }),
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
                  e.jsx(E, {
                    to: '/result',
                    className: 'button-primary',
                    children: 'View results',
                  }),
                  e.jsx(E, {
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
                e.jsx('span', { children: d ? `${c + 1} / ${x.length}` : 'Ready' }),
              ],
            }),
            e.jsx(V, { value: N }),
            e.jsxs('div', {
              className: 'grid gap-6 lg:grid-cols-[1.2fr_0.8fr]',
              children: [
                e.jsx(w.div, {
                  layout: !0,
                  children: d
                    ? e.jsx(U, { question: x[c], sequence: c + 1, total: x.length, onAnswer: k })
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
                            ].map((i) => e.jsx('li', { className: 'list-item', children: i }, i)),
                          }),
                          e.jsxs('button', {
                            type: 'button',
                            onClick: b,
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
                          ].map((i) => e.jsx('li', { className: 'list-item', children: i }, i)),
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'glass-panel p-6',
                      children: [
                        e.jsxs('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            e.jsx(I, { size: 20, className: 'text-sky-300' }),
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
                          children: ['Not me', 'Rarely me', 'Often me', 'Definitely me'].map((i) =>
                            e.jsx(
                              'div',
                              {
                                className:
                                  'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                                children: e.jsx('span', {
                                  className: 'text-slate-100',
                                  children: i,
                                }),
                              },
                              i
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

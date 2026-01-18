import { j as e, m as v, u as O, r as p, g as D, L as R, S as T, i as I } from './vendor.js'
import { A as z, Q as A } from './questions.js'
import { h as F, s as L, b as $, a as B, c as Q } from './storage.js'
import './scanner.js'
const C = {
    hidden: { opacity: 0, y: 12 },
    visible: (r) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * r } }),
  },
  U = ({ question: r, sequence: l, total: o, onAnswer: i }) =>
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
          e.jsx('h2', { className: 'mt-4 text-2xl font-semibold text-slate-50', children: r.text }),
          e.jsx('p', { className: 'mt-2 text-sm text-slate-400', children: r.rationale }),
          e.jsx('div', {
            className: 'mt-6 grid gap-3',
            children: z.map((x, c) =>
              e.jsxs(
                v.button,
                {
                  type: 'button',
                  custom: c,
                  variants: C,
                  initial: 'hidden',
                  animate: 'visible',
                  onClick: () => i(c),
                  className:
                    'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:border-sky-300/50 hover:bg-sky-500/10',
                  children: [
                    e.jsx('span', { children: x }),
                    e.jsx('span', { className: 'text-xs text-slate-400', children: c }),
                  ],
                },
                x
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
      children: e.jsx(v.div, {
        className: 'h-full bg-gradient-to-r from-pink-400/50 via-sky-300/60 to-emerald-200/70',
        initial: { width: 0 },
        animate: { width: `${r}%` },
        transition: { duration: 0.4 },
      }),
    }),
  G = (r) => {
    const l = [...r]
    for (let o = l.length - 1; o > 0; o -= 1) {
      const i = Math.floor(Math.random() * (o + 1))
      ;[l[o], l[i]] = [l[i], l[o]]
    }
    return l
  },
  P = (r) => Math.min(100, Math.max(0, Math.round(r))),
  W = { N: 1, M: 1.2, P: 1.4, MD: 1.3 },
  Y = (r, l) => {
    const o = { N: 0, M: 0, P: 0, MD: 0 },
      i = { N: 0, M: 0, P: 0, MD: 0 },
      x = new Map(l.map((s) => [s.questionId, s]))
    let c = !1,
      g = !1,
      j = 0
    r.forEach((s) => {
      const n = x.get(s.id)
      if (!n) return
      const b = s.reverse ? 3 - n.answer : n.answer
      ;((o[s.trait] += b),
        (i[s.trait] += 1),
        (j += n.answer),
        n.rtMs < 450 && n.answer >= 2 && (c = !0),
        s.lieTrap && n.answer >= 2 && (g = !0))
    })
    const d = j / l.length >= 2.7,
      t = Object.keys(o).reduce(
        (s, n) => {
          const b = i[n] * 3,
            E = (b > 0 ? (o[n] / b) * 100 : 0) * W[n]
          return ((s[n] = P(E)), s)
        },
        { N: 0, M: 0, P: 0, MD: 0 }
      ),
      y = { masking: c, contradictions: g, halo: d },
      m = Object.values(y).filter(Boolean).length,
      k = Math.max(70, 100 - m * 10),
      S = 0.9 * t.N + 1.1 * t.M + 1.3 * t.P,
      h = P(S / 3),
      a = m >= 2 ? P(h * 1.25) : h,
      u = r
        .filter((s) => s.safetyTrigger)
        .map((s) => {
          const n = x.get(s.id)
          return n && n.answer >= 2 ? `Q${s.id}: ${s.text}` : null
        })
        .filter((s) => !!s)
    t.P > 75 && t.MD > 60 && u.push('Trait combination: P > 75 and MD > 60')
    const N = { triggered: u.length > 0, triggers: u }
    let f = 'GREEN'
    a >= 60 || N.triggered ? (f = 'RED') : a >= 35 && (f = 'YELLOW')
    const w =
      t.P >= 70 && t.M >= 70
        ? 'APX'
        : t.M >= 70 && t.MD >= 70
          ? 'PUP'
          : t.N >= 70
            ? 'EGO'
            : t.M >= 60 && t.N >= 55
              ? 'SMR'
              : Math.max(t.N, t.M, t.P, t.MD) < 45
                ? 'LOW'
                : 'DRM'
    return {
      scores: t,
      dtiBase: h,
      dtiFinal: a,
      band: f,
      archetype: w,
      integrity: k,
      integrityFlags: y,
      safetyOverrides: N,
    }
  },
  K = () => {
    const r = O(),
      [l, o] = p.useState(!1),
      [i, x] = p.useState(0),
      [c, g] = p.useState([]),
      j = p.useRef(crypto.randomUUID()),
      M = p.useRef(performance.now())
    p.useEffect(() => {
      o(F())
    }, [])
    const d = p.useMemo(() => G(A), []),
      t = ((i + 1) / d.length) * 100,
      y = async (m) => {
        const k = d[i],
          S = Math.round(performance.now() - M.current),
          h = [...c, { questionId: k.id, answer: m, rtMs: S }]
        if ((g(h), i === d.length - 1)) {
          const a = Y(A, h),
            u = JSON.stringify(h),
            N = `masking:${a.integrityFlags.masking};contradictions:${a.integrityFlags.contradictions};halo:${a.integrityFlags.halo}`,
            f = a.safetyOverrides.triggers.join('~') || 'none',
            w = [
              'VP1',
              j.current,
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
              N,
              f,
              u,
            ].join('|'),
            s = (await L(w)).slice(0, 8),
            n = $(`${w}|${s}`)
          ;(B(n), Q(), r('/result'))
          return
        }
        ;(x((a) => a + 1), (M.current = performance.now()))
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
                  e.jsx(D, { size: 24, className: 'text-sky-300' }),
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
                  e.jsx(R, {
                    to: '/result',
                    className: 'button-primary',
                    children: 'View results',
                  }),
                  e.jsx(R, {
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
                e.jsxs('span', { children: [i + 1, ' / ', d.length] }),
              ],
            }),
            e.jsx(V, { value: t }),
            e.jsxs('div', {
              className: 'grid gap-6 lg:grid-cols-[1.2fr_0.8fr]',
              children: [
                e.jsx(v.div, {
                  layout: !0,
                  children: e.jsx(U, {
                    question: d[i],
                    sequence: i + 1,
                    total: d.length,
                    onAnswer: y,
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
                            e.jsx(T, { size: 20, className: 'text-sky-300' }),
                            e.jsxs('div', {
                              children: [
                                e.jsx('h3', {
                                  className: 'text-lg font-semibold',
                                  children: 'Session Guidance',
                                }),
                                e.jsx('p', {
                                  className: 'text-sm text-slate-400',
                                  children:
                                    'Answer quickly, but stay honest. The system listens for clarity.',
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsx('ul', {
                          className: 'mt-4 space-y-2 text-sm text-slate-300',
                          children: [
                            'No backtracking once you move forward.',
                            'Response timing shapes integrity scores.',
                            'Your token is stored on this device only.',
                          ].map((m) => e.jsx('li', { className: 'list-item', children: m }, m)),
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
                                  children: 'Answer Scale',
                                }),
                                e.jsx('p', {
                                  className: 'text-sm text-slate-400',
                                  children: 'Score 0-3 based on how true each statement feels.',
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsxs('div', {
                          className: 'mt-4 grid gap-2 text-sm text-slate-300',
                          children: [
                            e.jsxs('div', {
                              className:
                                'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                              children: [
                                e.jsx('span', { children: '0' }),
                                e.jsx('span', { className: 'text-slate-400', children: 'Not me' }),
                              ],
                            }),
                            e.jsxs('div', {
                              className:
                                'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                              children: [
                                e.jsx('span', { children: '1' }),
                                e.jsx('span', {
                                  className: 'text-slate-400',
                                  children: 'Rarely true',
                                }),
                              ],
                            }),
                            e.jsxs('div', {
                              className:
                                'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                              children: [
                                e.jsx('span', { children: '2' }),
                                e.jsx('span', {
                                  className: 'text-slate-400',
                                  children: 'Often true',
                                }),
                              ],
                            }),
                            e.jsxs('div', {
                              className:
                                'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                              children: [
                                e.jsx('span', { children: '3' }),
                                e.jsx('span', {
                                  className: 'text-slate-400',
                                  children: 'Always true',
                                }),
                              ],
                            }),
                          ],
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
export { K as default }

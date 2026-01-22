import { r as o, j as e, S as j, L as m, m as N, h as f, Q as y, k as v } from './vendor.js'
import { R as w, C as k, a as C, P as R, L as S, i as P, p as E } from './charts.js'
import { g as D, d as M, s as T } from './storage.js'
import './scanner.js'
k.register(C, R, S, P, E)
const z = ['Presence', 'Strategy', 'Composure', 'Guidance'],
  g = {
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
  },
  Q = () => {
    const s = D(),
      [r, c] = o.useState(null),
      [i, l] = o.useState(!1)
    return (
      o.useEffect(() => {
        if (!s) return
        ;(async () => {
          try {
            const t = M(s).split('|'),
              n = t.pop(),
              a = t.join('|')
            if (!n) {
              l(!0)
              return
            }
            if ((await T(a)).slice(0, 8) !== n) {
              l(!0)
              return
            }
            c({
              band: t[3],
              dtiBase: Number(t[4]),
              dtiFinal: Number(t[5]),
              scores: { N: Number(t[6]), M: Number(t[7]), P: Number(t[8]), MD: Number(t[9]) },
              integrity: Number(t[10]),
              archetype: t[11],
            })
          } catch {
            l(!0)
          }
        })()
      }, [s]),
      e.jsxs('div', {
        className: 'mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16',
        children: [
          e.jsxs('div', {
            className: 'flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-pink-200',
            children: [e.jsx(j, { size: 18 }), 'Vibe Prism Results'],
          }),
          !s &&
            e.jsxs('div', {
              className: 'glass-panel p-6',
              children: [
                e.jsx('h2', {
                  className: 'text-xl font-semibold',
                  children: 'No profile found yet',
                }),
                e.jsx('p', {
                  className: 'mt-2 text-sm text-slate-400',
                  children: 'Take the quiz to generate your vibe profile.',
                }),
                e.jsx(m, {
                  to: '/quiz',
                  className: 'button-primary mt-6',
                  children: 'Start the quiz',
                }),
              ],
            }),
          s &&
            !r &&
            !i &&
            e.jsx('div', { className: 'glass-panel p-6', children: 'Loading profile...' }),
          s && (r || i) && e.jsx(L, { data: r, token: s, error: i }),
        ],
      })
    )
  },
  L = ({ data: s, token: r, error: c }) => {
    const [i, l] = o.useState([]),
      d = (a, h = 'success') => {
        const u =
          typeof crypto < 'u' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`
        ;(l((x) => [...x, { id: u, message: a, tone: h }]),
          window.setTimeout(() => {
            l((x) => x.filter((b) => b.id !== u))
          }, 2600))
      },
      p = async () => {
        try {
          ;(await navigator.clipboard.writeText(r), d('Token copied to clipboard.', 'success'))
        } catch {
          d('Copy failed. Select the token and copy manually.', 'error')
        }
      }
    if (c || !s)
      return e.jsxs('div', {
        className: 'glass-panel p-6',
        children: [
          e.jsx('p', {
            className: 'text-sm text-slate-400',
            children: 'Token validation failed. Please restore a valid profile.',
          }),
          e.jsx(m, { to: '/quiz', className: 'button-primary mt-4', children: 'Retake quiz' }),
        ],
      })
    const t = g[s.band] ?? g.GREEN,
      n = {
        labels: z,
        datasets: [
          {
            label: 'Vibe',
            data: [s.scores.N, s.scores.M, s.scores.P, s.scores.MD],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgba(16, 185, 129, 0.7)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(16, 185, 129, 0.9)',
          },
        ],
      }
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx('div', {
          className: 'fixed right-6 top-6 z-50 flex flex-col gap-2',
          children: i.map((a) =>
            e.jsx(
              'div',
              {
                className: `rounded-xl border px-4 py-3 text-sm shadow-xl ${a.tone === 'success' ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100' : 'border-rose-400/30 bg-rose-500/10 text-rose-100'}`,
                children: a.message,
              },
              a.id
            )
          ),
        }),
        e.jsxs('div', {
          className: 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr]',
          children: [
            e.jsxs(N.div, {
              initial: { opacity: 0, scale: 0.98 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.4 },
              className: 'glass-panel p-6',
              children: [
                e.jsxs('div', {
                  className: 'flex items-center gap-3',
                  children: [
                    e.jsx(f, { size: 24, className: 'text-sky-300' }),
                    e.jsxs('div', {
                      children: [
                        e.jsx('p', {
                          className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                          children: 'Persona',
                        }),
                        e.jsx('h2', {
                          className: 'text-2xl font-semibold text-slate-50',
                          children: t.name,
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsx('p', { className: 'mt-4 text-sm text-slate-300', children: t.description }),
                e.jsxs('div', {
                  className: 'mt-6 grid gap-3 sm:grid-cols-3',
                  children: [
                    e.jsxs('div', {
                      className: 'rounded-xl border border-white/10 bg-slate-900/60 p-3',
                      children: [
                        e.jsx('p', {
                          className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                          children: 'Momentum',
                        }),
                        e.jsx('p', {
                          className: 'mt-2 text-lg font-semibold text-slate-50',
                          children: s.dtiFinal,
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'rounded-xl border border-white/10 bg-slate-900/60 p-3',
                      children: [
                        e.jsx('p', {
                          className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                          children: 'Integrity',
                        }),
                        e.jsx('p', {
                          className: 'mt-2 text-lg font-semibold text-slate-50',
                          children: s.integrity,
                        }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'rounded-xl border border-white/10 bg-slate-900/60 p-3',
                      children: [
                        e.jsx('p', {
                          className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                          children: 'Archetype',
                        }),
                        e.jsx('p', {
                          className: 'mt-2 text-sm font-semibold text-slate-50',
                          children: s.archetype,
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsx('div', {
                  className: 'mt-6 h-64',
                  children: e.jsx(w, {
                    data: n,
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
                      animation: { duration: 800 },
                    },
                  }),
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'flex flex-col gap-6',
              children: [
                e.jsxs('div', {
                  className: 'glass-panel p-6',
                  children: [
                    e.jsx('h3', {
                      className: 'text-lg font-semibold',
                      children: 'Profile Readout',
                    }),
                    e.jsxs('p', {
                      className: 'mt-2 text-sm text-slate-400',
                      children: ['Base DTI: ', s.dtiBase, ' → Final DTI: ', s.dtiFinal],
                    }),
                    e.jsxs('div', {
                      className: 'mt-4 grid gap-2 text-sm text-slate-300',
                      children: [
                        e.jsxs('div', {
                          className:
                            'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                          children: [
                            e.jsx('span', { children: 'Presence' }),
                            e.jsx('span', { children: s.scores.N }),
                          ],
                        }),
                        e.jsxs('div', {
                          className:
                            'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                          children: [
                            e.jsx('span', { children: 'Strategy' }),
                            e.jsx('span', { children: s.scores.M }),
                          ],
                        }),
                        e.jsxs('div', {
                          className:
                            'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                          children: [
                            e.jsx('span', { children: 'Composure' }),
                            e.jsx('span', { children: s.scores.P }),
                          ],
                        }),
                        e.jsxs('div', {
                          className:
                            'flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2',
                          children: [
                            e.jsx('span', { children: 'Guidance' }),
                            e.jsx('span', { children: s.scores.MD }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'glass-panel p-6',
                  children: [
                    e.jsxs('div', {
                      className: 'flex items-center gap-3',
                      children: [
                        e.jsx(y, { size: 22, className: 'text-sky-300' }),
                        e.jsxs('div', {
                          children: [
                            e.jsx('h3', {
                              className: 'text-lg font-semibold',
                              children: 'Private QR token',
                            }),
                            e.jsx('p', {
                              className: 'text-sm text-slate-400',
                              children: 'Store this token to restore your profile later.',
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsx('div', {
                      className:
                        'mt-4 flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 p-4',
                      children: e.jsx(v, {
                        value: r,
                        size: 160,
                        bgColor: '#0f172a',
                        fgColor: '#e2e8f0',
                      }),
                    }),
                    e.jsxs('div', {
                      className:
                        'mt-4 overflow-hidden rounded-xl border border-white/10 bg-slate-900/60',
                      children: [
                        e.jsxs('div', {
                          className:
                            'flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-3 py-2',
                          children: [
                            e.jsx('span', {
                              className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                              children: 'Full token',
                            }),
                            e.jsx('button', {
                              type: 'button',
                              onClick: p,
                              className: 'button-secondary text-xs',
                              children: 'Copy token',
                            }),
                          ],
                        }),
                        e.jsx('pre', {
                          className:
                            'max-h-40 overflow-auto whitespace-pre-wrap break-all p-3 text-xs text-slate-200',
                          children: e.jsx('code', { children: r }),
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
                      children: 'Need the full profile?',
                    }),
                    e.jsx('p', {
                      className: 'mt-2 text-sm text-slate-400',
                      children: 'Restore your profile with the secure decoder.',
                    }),
                    e.jsx(m, {
                      to: '/restore',
                      className: 'button-secondary mt-4',
                      children: 'Restore Profile',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'glass-panel p-6',
                  children: [
                    e.jsx('h3', { className: 'text-lg font-semibold', children: 'Next actions' }),
                    e.jsx('ul', {
                      className: 'mt-3 space-y-2 text-sm text-slate-300',
                      children: [
                        'Save your QR token to a secure note.',
                        'Share the persona name with your team.',
                        'Use the decoder to review trait-level insights.',
                      ].map((a) => e.jsx('li', { className: 'list-item', children: a }, a)),
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
export { Q as default }

import { r as c, j as e, S as p, L as o, m as h, h as u, Q as g, k as j } from './vendor.js'
import { R as b, C as N, a as f, P as y, L as v, i as k, p as w } from './charts.js'
import { g as R, d as C, s as P } from './storage.js'
import './scanner.js'
N.register(f, y, v, k, w)
const E = ['Presence', 'Strategy', 'Composure', 'Guidance'],
  x = {
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
    const s = R(),
      [a, i] = c.useState(null),
      [r, l] = c.useState(!1)
    return (
      c.useEffect(() => {
        if (!s) return
        ;(async () => {
          try {
            const t = C(s).split('|'),
              d = t.pop(),
              m = t.join('|')
            if (!d) {
              l(!0)
              return
            }
            if ((await P(m)).slice(0, 8) !== d) {
              l(!0)
              return
            }
            i({
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
            children: [e.jsx(p, { size: 18 }), 'Vibe Prism Results'],
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
                e.jsx(o, {
                  to: '/quiz',
                  className: 'button-primary mt-6',
                  children: 'Start the quiz',
                }),
              ],
            }),
          s &&
            !a &&
            !r &&
            e.jsx('div', { className: 'glass-panel p-6', children: 'Loading profile...' }),
          s && (a || r) && e.jsx(S, { data: a, token: s, error: r }),
        ],
      })
    )
  },
  S = ({ data: s, token: a, error: i }) => {
    if (i || !s)
      return e.jsxs('div', {
        className: 'glass-panel p-6',
        children: [
          e.jsx('p', {
            className: 'text-sm text-slate-400',
            children: 'Token validation failed. Please restore a valid profile.',
          }),
          e.jsx(o, { to: '/quiz', className: 'button-primary mt-4', children: 'Retake quiz' }),
        ],
      })
    const r = x[s.band] ?? x.GREEN,
      l = {
        labels: E,
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
    return e.jsxs('div', {
      className: 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr]',
      children: [
        e.jsxs(h.div, {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          className: 'glass-panel p-6',
          children: [
            e.jsxs('div', {
              className: 'flex items-center gap-3',
              children: [
                e.jsx(u, { size: 24, className: 'text-sky-300' }),
                e.jsxs('div', {
                  children: [
                    e.jsx('p', {
                      className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                      children: 'Persona',
                    }),
                    e.jsx('h2', {
                      className: 'text-2xl font-semibold text-slate-50',
                      children: r.name,
                    }),
                  ],
                }),
              ],
            }),
            e.jsx('p', { className: 'mt-4 text-sm text-slate-300', children: r.description }),
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
              children: e.jsx(b, {
                data: l,
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
                e.jsx('h3', { className: 'text-lg font-semibold', children: 'Profile Readout' }),
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
                    e.jsx(g, { size: 22, className: 'text-sky-300' }),
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
                  children: e.jsx(j, {
                    value: a,
                    size: 160,
                    bgColor: '#0f172a',
                    fgColor: '#e2e8f0',
                  }),
                }),
                e.jsxs('p', {
                  className: 'mt-4 text-xs text-slate-500',
                  children: ['Token preview: ', a.slice(0, 32), '...'],
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
                e.jsx(o, {
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
                  ].map((n) => e.jsx('li', { className: 'list-item', children: n }, n)),
                }),
              ],
            }),
          ],
        }),
      ],
    })
  }
export { Q as default }

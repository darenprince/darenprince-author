const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './Landing.js',
      './vendor.js',
      './Quiz.js',
      './questions.js',
      './storage.js',
      './Result.js',
      './charts.js',
      './Restore.js',
      './scanner.js',
    ])
) => i.map((i) => d[i])
import {
  j as e,
  S as v,
  T as k,
  a as E,
  b as _,
  L as j,
  N as z,
  R as h,
  m as L,
  r as R,
  d as P,
  e as p,
  f as S,
  g as O,
  H as q,
} from './vendor.js'
;(function () {
  const i = document.createElement('link').relList
  if (i && i.supports && i.supports('modulepreload')) return
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) x(t)
  new MutationObserver((t) => {
    for (const s of t)
      if (s.type === 'childList')
        for (const r of s.addedNodes) r.tagName === 'LINK' && r.rel === 'modulepreload' && x(r)
  }).observe(document, { childList: !0, subtree: !0 })
  function d(t) {
    const s = {}
    return (
      t.integrity && (s.integrity = t.integrity),
      t.referrerPolicy && (s.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : t.crossOrigin === 'anonymous'
          ? (s.credentials = 'omit')
          : (s.credentials = 'same-origin'),
      s
    )
  }
  function x(t) {
    if (t.ep) return
    t.ep = !0
    const s = d(t)
    fetch(t.href, s)
  }
})()
const A = 'modulepreload',
  V = function (o, i) {
    return new URL(o, i).href
  },
  N = {},
  y = function (i, d, x) {
    let t = Promise.resolve()
    if (d && d.length > 0) {
      let w = function (a) {
        return Promise.all(
          a.map((c) =>
            Promise.resolve(c).then(
              (m) => ({ status: 'fulfilled', value: m }),
              (m) => ({ status: 'rejected', reason: m })
            )
          )
        )
      }
      const r = document.getElementsByTagName('link'),
        n = document.querySelector('meta[property=csp-nonce]'),
        g = n?.nonce || n?.getAttribute('nonce')
      t = w(
        d.map((a) => {
          if (((a = V(a, x)), a in N)) return
          N[a] = !0
          const c = a.endsWith('.css'),
            m = c ? '[rel="stylesheet"]' : ''
          if (x)
            for (let u = r.length - 1; u >= 0; u--) {
              const f = r[u]
              if (f.href === a && (!c || f.rel === 'stylesheet')) return
            }
          else if (document.querySelector(`link[href="${a}"]${m}`)) return
          const l = document.createElement('link')
          if (
            ((l.rel = c ? 'stylesheet' : A),
            c || (l.as = 'script'),
            (l.crossOrigin = ''),
            (l.href = a),
            g && l.setAttribute('nonce', g),
            document.head.appendChild(l),
            c)
          )
            return new Promise((u, f) => {
              ;(l.addEventListener('load', u),
                l.addEventListener('error', () => f(new Error(`Unable to preload CSS for ${a}`))))
            })
        })
      )
    }
    function s(r) {
      const n = new Event('vite:preloadError', { cancelable: !0 })
      if (((n.payload = r), window.dispatchEvent(n), !n.defaultPrevented)) throw r
    }
    return t.then((r) => {
      for (const n of r || []) n.status === 'rejected' && s(n.reason)
      return i().catch(s)
    })
  },
  T = () =>
    e.jsx('footer', {
      className: 'mt-16 border-t border-white/5 bg-slate-950/70',
      children: e.jsxs('div', {
        className: 'mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12',
        children: [
          e.jsxs('div', {
            className: 'grid gap-8 lg:grid-cols-[1.2fr_0.9fr_0.9fr]',
            children: [
              e.jsxs('div', {
                className: 'space-y-4',
                children: [
                  e.jsxs('div', {
                    className: 'flex items-center gap-3',
                    children: [
                      e.jsx('span', {
                        className:
                          'flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/15 text-sky-200',
                        children: e.jsx(v, { size: 18 }),
                      }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('p', {
                            className: 'text-xs uppercase tracking-[0.3em] text-pink-200',
                            children: 'Vibe Prism',
                          }),
                          e.jsx('p', {
                            className: 'text-sm font-semibold text-slate-50',
                            children: 'Nexus Who Vibe Lab',
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsx('p', {
                    className: 'text-sm text-slate-400',
                    children:
                      'A playful personality quiz for people who want to understand the energy they bring into every room. Light, fun, and private by design.',
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'space-y-3',
                children: [
                  e.jsx('p', {
                    className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                    children: 'Vibe Highlights',
                  }),
                  e.jsxs('ul', {
                    className: 'space-y-2 text-sm text-slate-300',
                    children: [
                      e.jsxs('li', {
                        className: 'flex items-center gap-2',
                        children: [
                          e.jsx(k, { size: 16, className: 'text-sky-300' }),
                          'Mood-friendly personality mapping',
                        ],
                      }),
                      e.jsxs('li', {
                        className: 'flex items-center gap-2',
                        children: [
                          e.jsx(E, { size: 16, className: 'text-sky-300' }),
                          'Signature archetypes with playful cues',
                        ],
                      }),
                      e.jsxs('li', {
                        className: 'flex items-center gap-2',
                        children: [
                          e.jsx(_, { size: 16, className: 'text-sky-300' }),
                          'Private-by-default results you control',
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs('div', {
                className: 'glass-panel p-5',
                children: [
                  e.jsx('p', {
                    className: 'text-sm font-semibold text-slate-100',
                    children: 'Ready to capture your profile?',
                  }),
                  e.jsx('p', {
                    className: 'mt-2 text-xs text-slate-400',
                    children: 'Launch the quiz, lock in your token, and decode whenever you want.',
                  }),
                  e.jsxs('div', {
                    className: 'mt-4 flex flex-wrap gap-3',
                    children: [
                      e.jsx(j, {
                        to: '/quiz',
                        className: 'button-primary',
                        children: 'Start the quiz',
                      }),
                      e.jsx(j, {
                        to: '/restore',
                        className: 'button-secondary',
                        children: 'Decode token',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500',
            children: [
              e.jsx('span', {
                children: '© 2026 Vibe Prism — Nexus Who Minisite. All rights reserved.',
              }),
              e.jsx('span', {
                children: 'Encrypted locally. Nothing leaves your device without permission.',
              }),
            ],
          }),
        ],
      }),
    }),
  I = [
    { label: 'Overview', to: '/' },
    { label: 'Quiz', to: '/quiz' },
    { label: 'Results', to: '/result' },
    { label: 'Restore', to: '/restore' },
  ],
  $ = () =>
    e.jsx('header', {
      className: 'sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur',
      children: e.jsxs('div', {
        className: 'mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4',
        children: [
          e.jsxs(j, {
            to: '/',
            className: 'flex items-center gap-3',
            children: [
              e.jsx('span', {
                className:
                  'flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/15 text-sky-200',
                children: e.jsx(v, { size: 18 }),
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('p', {
                    className: 'text-xs uppercase tracking-[0.3em] text-pink-200',
                    children: 'Vibe Prism',
                  }),
                  e.jsx('p', {
                    className: 'text-sm font-semibold text-slate-50',
                    children: 'Nexus Who Quiz',
                  }),
                ],
              }),
            ],
          }),
          e.jsx('nav', {
            className: 'hidden items-center gap-6 text-sm text-slate-300 md:flex',
            children: I.map((o) =>
              e.jsx(
                z,
                {
                  to: o.to,
                  className: ({ isActive: i }) => `nav-link ${i ? 'nav-link-active' : ''}`,
                  children: o.label,
                },
                o.to
              )
            ),
          }),
          e.jsx('div', {
            className: 'flex items-center gap-3',
            children: e.jsx(j, {
              to: '/quiz',
              className: 'button-primary hidden sm:inline-flex',
              children: 'Start the quiz',
            }),
          }),
        ],
      }),
    }),
  D = h.lazy(() => y(() => import('./Landing.js'), __vite__mapDeps([0, 1]), import.meta.url)),
  M = h.lazy(() => y(() => import('./Quiz.js'), __vite__mapDeps([2, 1, 3, 4]), import.meta.url)),
  C = h.lazy(() => y(() => import('./Result.js'), __vite__mapDeps([5, 1, 6, 4]), import.meta.url)),
  H = h.lazy(() =>
    y(() => import('./Restore.js'), __vite__mapDeps([7, 1, 6, 8, 3, 4]), import.meta.url)
  ),
  W = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  },
  Q = () =>
    e.jsxs('div', {
      className: 'nexuswho-shell',
      children: [
        e.jsx('div', { className: 'nexuswho-aurora', 'aria-hidden': 'true' }),
        e.jsx('div', { className: 'nexuswho-sparkle-field', 'aria-hidden': 'true' }),
        e.jsxs('div', {
          className: 'relative z-10 flex min-h-screen flex-col text-slate-100',
          children: [
            e.jsx($, {}),
            e.jsx(L.main, {
              variants: W,
              initial: 'initial',
              animate: 'animate',
              exit: 'exit',
              className: 'flex-1',
              children: e.jsx(R.Suspense, {
                fallback: e.jsx('div', {
                  className: 'mx-auto w-full max-w-5xl px-6 py-16',
                  children: 'Loading…',
                }),
                children: e.jsxs(P, {
                  children: [
                    e.jsx(p, { path: '/', element: e.jsx(D, {}) }),
                    e.jsx(p, { path: '/quiz', element: e.jsx(M, {}) }),
                    e.jsx(p, { path: '/result', element: e.jsx(C, {}) }),
                    e.jsx(p, { path: '/restore', element: e.jsx(H, {}) }),
                    e.jsx(p, { path: '*', element: e.jsx(S, { to: '/', replace: !0 }) }),
                  ],
                }),
              }),
            }),
            e.jsx(T, {}),
          ],
        }),
      ],
    }),
  b = document.getElementById('root')
if (!b) throw new Error('Root container missing')
O.createRoot(b).render(e.jsx(h.StrictMode, { children: e.jsx(q, { children: e.jsx(Q, {}) }) }))

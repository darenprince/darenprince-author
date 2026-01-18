const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './Landing.js',
      './vendor.js',
      './scanner.js',
      './Quiz.js',
      './questions.js',
      './storage.js',
      './Result.js',
      './charts.js',
      './Restore.js',
    ])
) => i.map((i) => d[i])
import {
  j as e,
  S as b,
  T as w,
  a as k,
  b as _,
  L as f,
  N as E,
  R as p,
  m as R,
  r as z,
  c as L,
  d as u,
  e as P,
  f as S,
  H as O,
} from './vendor.js'
import './scanner.js'
;(function () {
  const a = document.createElement('link').relList
  if (a && a.supports && a.supports('modulepreload')) return
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) d(t)
  new MutationObserver((t) => {
    for (const s of t)
      if (s.type === 'childList')
        for (const i of s.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && d(i)
  }).observe(document, { childList: !0, subtree: !0 })
  function c(t) {
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
  function d(t) {
    if (t.ep) return
    t.ep = !0
    const s = c(t)
    fetch(t.href, s)
  }
})()
const q = 'modulepreload',
  A = function (o, a) {
    return new URL(o, a).href
  },
  g = {},
  y = function (a, c, d) {
    let t = Promise.resolve()
    if (c && c.length > 0) {
      const i = document.getElementsByTagName('link'),
        r = document.querySelector('meta[property=csp-nonce]'),
        j = (r == null ? void 0 : r.nonce) || (r == null ? void 0 : r.getAttribute('nonce'))
      t = Promise.allSettled(
        c.map((n) => {
          if (((n = A(n, d)), n in g)) return
          g[n] = !0
          const m = n.endsWith('.css'),
            N = m ? '[rel="stylesheet"]' : ''
          if (!!d)
            for (let x = i.length - 1; x >= 0; x--) {
              const h = i[x]
              if (h.href === n && (!m || h.rel === 'stylesheet')) return
            }
          else if (document.querySelector(`link[href="${n}"]${N}`)) return
          const l = document.createElement('link')
          if (
            ((l.rel = m ? 'stylesheet' : q),
            m || (l.as = 'script'),
            (l.crossOrigin = ''),
            (l.href = n),
            j && l.setAttribute('nonce', j),
            document.head.appendChild(l),
            m)
          )
            return new Promise((x, h) => {
              ;(l.addEventListener('load', x),
                l.addEventListener('error', () => h(new Error(`Unable to preload CSS for ${n}`))))
            })
        })
      )
    }
    function s(i) {
      const r = new Event('vite:preloadError', { cancelable: !0 })
      if (((r.payload = i), window.dispatchEvent(r), !r.defaultPrevented)) throw i
    }
    return t.then((i) => {
      for (const r of i || []) r.status === 'rejected' && s(r.reason)
      return a().catch(s)
    })
  },
  V = () =>
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
                        children: e.jsx(b, { size: 18 }),
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
                          e.jsx(w, { size: 16, className: 'text-sky-300' }),
                          'Mood-friendly personality mapping',
                        ],
                      }),
                      e.jsxs('li', {
                        className: 'flex items-center gap-2',
                        children: [
                          e.jsx(k, { size: 16, className: 'text-sky-300' }),
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
                      e.jsx(f, {
                        to: '/quiz',
                        className: 'button-primary',
                        children: 'Start the quiz',
                      }),
                      e.jsx(f, {
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
  T = [
    { label: 'Overview', to: '/' },
    { label: 'Quiz', to: '/quiz' },
    { label: 'Results', to: '/result' },
    { label: 'Restore', to: '/restore' },
  ],
  I = () =>
    e.jsx('header', {
      className: 'sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur',
      children: e.jsxs('div', {
        className: 'mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4',
        children: [
          e.jsxs(f, {
            to: '/',
            className: 'flex items-center gap-3',
            children: [
              e.jsx('span', {
                className:
                  'flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/15 text-sky-200',
                children: e.jsx(b, { size: 18 }),
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
            children: T.map((o) =>
              e.jsx(
                E,
                {
                  to: o.to,
                  className: ({ isActive: a }) => `nav-link ${a ? 'nav-link-active' : ''}`,
                  children: o.label,
                },
                o.to
              )
            ),
          }),
          e.jsx('div', {
            className: 'flex items-center gap-3',
            children: e.jsx(f, {
              to: '/quiz',
              className: 'button-primary hidden sm:inline-flex',
              children: 'Start the quiz',
            }),
          }),
        ],
      }),
    }),
  D = p.lazy(() => y(() => import('./Landing.js'), __vite__mapDeps([0, 1, 2]), import.meta.url)),
  B = p.lazy(() => y(() => import('./Quiz.js'), __vite__mapDeps([3, 1, 2, 4, 5]), import.meta.url)),
  C = p.lazy(() =>
    y(() => import('./Result.js'), __vite__mapDeps([6, 1, 2, 7, 5]), import.meta.url)
  ),
  H = p.lazy(() =>
    y(() => import('./Restore.js'), __vite__mapDeps([8, 1, 2, 7, 4, 5]), import.meta.url)
  ),
  W = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  },
  $ = () =>
    e.jsxs('div', {
      className:
        'flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-sky-950 to-pink-950 text-slate-100',
      children: [
        e.jsx(I, {}),
        e.jsx(R.main, {
          variants: W,
          initial: 'initial',
          animate: 'animate',
          exit: 'exit',
          className: 'flex-1',
          children: e.jsx(z.Suspense, {
            fallback: e.jsx('div', {
              className: 'mx-auto w-full max-w-5xl px-6 py-16',
              children: 'Loading…',
            }),
            children: e.jsxs(L, {
              children: [
                e.jsx(u, { path: '/', element: e.jsx(D, {}) }),
                e.jsx(u, { path: '/quiz', element: e.jsx(B, {}) }),
                e.jsx(u, { path: '/result', element: e.jsx(C, {}) }),
                e.jsx(u, { path: '/restore', element: e.jsx(H, {}) }),
                e.jsx(u, { path: '*', element: e.jsx(P, { to: '/', replace: !0 }) }),
              ],
            }),
          }),
        }),
        e.jsx(V, {}),
      ],
    }),
  v = document.getElementById('root')
if (!v) throw new Error('Root container missing')
S(v).render(e.jsx(p.StrictMode, { children: e.jsx(O, { children: e.jsx($, {}) }) }))

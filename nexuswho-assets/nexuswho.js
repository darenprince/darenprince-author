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
      t.integrity && (s.integrity = t.integrity),
      t.referrerPolicy && (s.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : t.crossOrigin === 'anonymous'
          ? (s.credentials = 'omit')
          : (s.credentials = 'same-origin'),
      s
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
            ((l.rel = m ? 'stylesheet' : q),
            m || (l.as = 'script'),
            (l.crossOrigin = ''),
            (l.href = n),
            j && l.setAttribute('nonce', j),
            document.head.appendChild(l),
            m)
            return new Promise((x, h) => {
              ;(l.addEventListener('load', x),
                l.addEventListener('error', () => h(new Error(`Unable to preload CSS for ${n}`))))
            })
    function s(i) {
      const r = new Event('vite:preloadError', { cancelable: !0 })
      if (((r.payload = i), window.dispatchEvent(r), !r.defaultPrevented)) throw i
    return t.then((i) => {
      for (const r of i || []) r.status === 'rejected' && s(r.reason)
      return a().catch(s)
  V = () =>
    e.jsx('footer', {
      children: e.jsxs('div', {
          e.jsxs('div', {
              e.jsxs('div', {
                  e.jsxs('div', {
                      e.jsx('span', {
                          'flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/15 text-sky-200',
                        children: e.jsx(b, { size: 18 }),
                      e.jsxs('div', {
                          e.jsx('p', {
                            className: 'text-xs uppercase tracking-[0.3em] text-pink-200',
                          e.jsx('p', {
                            children: 'Nexus Who Vibe Lab',
                  e.jsx('p', {
                      'A playful personality quiz for people who want to understand the energy they bring into every room. Light, fun, and private by design.',
              e.jsxs('div', {
                  e.jsx('p', {
                    children: 'Vibe Highlights',
                  e.jsxs('ul', {
                      e.jsxs('li', {
                          e.jsx(w, { size: 16, className: 'text-sky-300' }),
                          'Mood-friendly personality mapping',
                      e.jsxs('li', {
                          e.jsx(k, { size: 16, className: 'text-sky-300' }),
                          'Signature archetypes with playful cues',
                      e.jsxs('li', {
                          e.jsx(_, { size: 16, className: 'text-sky-300' }),
                          'Private-by-default results you control',
              e.jsxs('div', {
                  e.jsx('p', {
                  e.jsx('p', {
                  e.jsxs('div', {
                      e.jsx(f, {
                      e.jsx(f, {
          e.jsxs('div', {
              e.jsx('span', {
              e.jsx('span', {
  T = [
  I = () =>
    e.jsx('header', {
      children: e.jsxs('div', {
          e.jsxs(f, {
              e.jsx('span', {
                  'flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-300/30 bg-sky-400/15 text-sky-200',
                children: e.jsx(b, { size: 18 }),
              e.jsxs('div', {
                  e.jsx('p', {
                    className: 'text-xs uppercase tracking-[0.3em] text-pink-200',
                  e.jsx('p', {
                    children: 'Nexus Who Quiz',
                  }),
          e.jsx('nav', {
            children: T.map((o) =>
              e.jsx(
                E,
                  to: o.to,
                  className: ({ isActive: a }) => `nav-link ${a ? 'nav-link-active' : ''}`,
                  children: o.label,
                o.to
          e.jsx('div', {
            children: e.jsx(f, {
  D = p.lazy(() => y(() => import('./Landing.js'), __vite__mapDeps([0, 1, 2]), import.meta.url)),
  B = p.lazy(() => y(() => import('./Quiz.js'), __vite__mapDeps([3, 1, 2, 4, 5]), import.meta.url)),
  C = p.lazy(() =>
    y(() => import('./Result.js'), __vite__mapDeps([6, 1, 2, 7, 5]), import.meta.url)
  ),
  H = p.lazy(() =>
    y(() => import('./Restore.js'), __vite__mapDeps([8, 1, 2, 7, 4, 5]), import.meta.url)
  ),
  W = {
  $ = () =>
    e.jsxs('div', {
        'flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-sky-950 to-pink-950 text-slate-100',
        e.jsx(I, {}),
        e.jsx(R.main, {
          variants: W,
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
        e.jsx(V, {}),
  v = document.getElementById('root')
if (!v) throw new Error('Root container missing')
S(v).render(e.jsx(p.StrictMode, { children: e.jsx(O, { children: e.jsx($, {}) }) }))
                        ],
                      }),
                      N.jsxs('li', {
                        className: 'flex items-center gap-2',
                        children: [
                          N.jsx(Q6, { size: 16, className: 'text-emerald-300' }),
                          'Integrity signals baked into every score',
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              N.jsxs('div', {
                className: 'glass-panel p-5',
                children: [
                  N.jsx('p', {
                    className: 'text-sm font-semibold text-slate-100',
                    children: 'Ready to capture your profile?',
                  }),
                  N.jsx('p', {
                    className: 'mt-2 text-xs text-slate-400',
                    children: 'Launch the quiz, lock in your token, and decode whenever you want.',
                  }),
                  N.jsxs('div', {
                    className: 'mt-4 flex flex-wrap gap-3',
                    children: [
                      N.jsx(er, {
                        to: '/quiz',
                        className: 'button-primary',
                        children: 'Start the quiz',
                      }),
                      N.jsx(er, {
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
          N.jsxs('div', {
            className: 'flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500',
            children: [
              N.jsx('span', {
                children: '© 2026 Vibe Prism — Nexus Who Minisite. All rights reserved.',
              }),
              N.jsx('span', {
                children: 'Encrypted locally. Nothing leaves your device without permission.',
              }),
            ],
          }),
        ],
      }),
    }),
  rR = [
    { label: 'Overview', to: '/' },
    { label: 'Quiz', to: '/quiz' },
    { label: 'Results', to: '/result' },
    { label: 'Restore', to: '/restore' },
  ],
  iR = () =>
    N.jsx('header', {
      className: 'sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur',
      children: N.jsxs('div', {
        className: 'mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4',
        children: [
          N.jsxs(er, {
            to: '/',
            className: 'flex items-center gap-3',
            children: [
              N.jsx('span', {
                className:
                  'flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
                children: N.jsx(Qo, { size: 18 }),
              }),
              N.jsxs('div', {
                children: [
                  N.jsx('p', {
                    className: 'text-xs uppercase tracking-[0.3em] text-emerald-200',
                    children: 'Vibe Prism',
                  }),
                  N.jsx('p', {
                    className: 'text-sm font-semibold text-slate-50',
                    children: 'Nexus Who Minisite',
                  }),
                ],
              }),
            ],
          }),
          N.jsx('nav', {
            className: 'hidden items-center gap-6 text-sm text-slate-300 md:flex',
            children: rR.map((e) =>
              N.jsx(
                gC,
                {
                  to: e.to,
                  className: ({ isActive: t }) => `nav-link ${t ? 'nav-link-active' : ''}`,
                  children: e.label,
                },
                e.to
              )
            ),
          }),
          N.jsx('div', {
            className: 'flex items-center gap-3',
            children: N.jsx(er, {
              to: '/quiz',
              className: 'button-primary hidden sm:inline-flex',
              children: 'Start the quiz',
            }),
          }),
        ],
      }),
    }),
  sR = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  },
  oR = () =>
    N.jsxs('div', {
      className:
        'flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100',
      children: [
        N.jsx(iR, {}),
        N.jsx(qn.main, {
          variants: sR,
          initial: 'initial',
          animate: 'animate',
          exit: 'exit',
          className: 'flex-1',
          children: N.jsxs(iC, {
            children: [
              N.jsx(no, { path: '/', element: N.jsx(sk, {}) }),
              N.jsx(no, { path: '/quiz', element: N.jsx(yk, {}) }),
              N.jsx(no, { path: '/result', element: N.jsx(CT, {}) }),
              N.jsx(no, { path: '/restore', element: N.jsx(tR, {}) }),
              N.jsx(no, { path: '*', element: N.jsx(nC, { to: '/', replace: !0 }) }),
            ],
          }),
        }),
        N.jsx(nR, {}),
      ],
    }),
  ab = document.getElementById('root')
if (!ab) throw new Error('Root container missing')
cw(ab).render(N.jsx(A.StrictMode, { children: N.jsx(dC, { children: N.jsx(oR, {}) }) }))

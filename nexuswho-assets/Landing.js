import {
  j as e,
  m as t,
  L as a,
  S as i,
  g as l,
  h as r,
  G as n,
  Q as c,
  U as o,
  a as d,
  T as m,
} from './vendor.js'
import './scanner.js'
const h = () =>
  e.jsxs('div', {
    className: 'mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16',
    children: [
      e.jsxs('header', {
        className: 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center',
        children: [
          e.jsxs('div', {
            children: [
              e.jsx(t.p, {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                className: 'text-sm uppercase tracking-[0.3em] text-pink-200',
                children: 'Vibe Prism',
              }),
              e.jsx(t.h1, {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1 },
                className: 'mt-4 text-4xl font-semibold text-slate-50 md:text-5xl',
                children: 'See your personality sparkle back at you in under six minutes.',
              }),
              e.jsx(t.p, {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2 },
                className: 'mt-4 text-base text-slate-300',
                children:
                  'Nexus Who is a fun, public personality quiz for Vibe Prism. Answer 32 fast, feel-good prompts to reveal your social style, get playful insights, and generate a private token you can restore on demand.',
              }),
              e.jsxs('div', {
                className: 'mt-8 flex flex-wrap gap-3',
                children: [
                  e.jsxs(a, {
                    to: '/quiz',
                    className: 'button-primary',
                    children: [e.jsx(i, { size: 20 }), 'Start the quiz'],
                  }),
                  e.jsxs(a, {
                    to: '/restore',
                    className: 'button-secondary',
                    children: [e.jsx(l, { size: 20 }), 'Restore a profile'],
                  }),
                ],
              }),
              e.jsx('div', {
                className: 'mt-8 grid gap-4 sm:grid-cols-3',
                children: [
                  { label: 'Questions', value: '32' },
                  { label: 'Personality Modes', value: '3' },
                  { label: 'Vibe Traits', value: '4' },
                ].map((s) =>
                  e.jsxs(
                    'div',
                    {
                      className: 'stat-card',
                      children: [
                        e.jsx('p', {
                          className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                          children: s.label,
                        }),
                        e.jsx('p', {
                          className: 'mt-2 text-2xl font-semibold text-slate-50',
                          children: s.value,
                        }),
                      ],
                    },
                    s.label
                  )
                ),
              }),
            ],
          }),
          e.jsx('div', {
            className: 'glass-panel p-6',
            children: e.jsxs('div', {
              className: 'grid gap-4',
              children: [
                e.jsxs('div', {
                  className: 'flex items-start gap-3',
                  children: [
                    e.jsx(r, { size: 24, className: 'text-sky-300' }),
                    e.jsxs('div', {
                      children: [
                        e.jsx('h3', {
                          className: 'text-lg font-semibold',
                          children: 'Balanced insights',
                        }),
                        e.jsx('p', {
                          className: 'text-sm text-slate-400',
                          children:
                            'See a radar snapshot of your vibe strengths without heavy jargon.',
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-start gap-3',
                  children: [
                    e.jsx(n, { size: 24, className: 'text-sky-300' }),
                    e.jsxs('div', {
                      children: [
                        e.jsx('h3', {
                          className: 'text-lg font-semibold',
                          children: 'Momentum score',
                        }),
                        e.jsx('p', {
                          className: 'text-sm text-slate-400',
                          children: 'Track how your energy reads to others in social settings.',
                        }),
                      ],
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-start gap-3',
                  children: [
                    e.jsx(c, { size: 24, className: 'text-sky-300' }),
                    e.jsxs('div', {
                      children: [
                        e.jsx('h3', {
                          className: 'text-lg font-semibold',
                          children: 'Portable profile',
                        }),
                        e.jsx('p', {
                          className: 'text-sm text-slate-400',
                          children:
                            'Save your results as a private QR token for later restoration.',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      e.jsxs('section', {
        className: 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr]',
        children: [
          e.jsxs('div', {
            children: [
              e.jsx('p', { className: 'section-title', children: 'How the quiz feels' }),
              e.jsx('p', {
                className: 'section-lead',
                children:
                  'Each section is designed to feel light, intuitive, and a little magical while still surfacing your natural rhythm.',
              }),
              e.jsx('div', {
                className: 'mt-6 grid gap-4 md:grid-cols-3',
                children: [
                  { title: 'Pulse', copy: 'Quick taps catch your instinctive tempo.' },
                  { title: 'Balance', copy: 'Surprise flips keep the quiz playful and honest.' },
                  { title: 'Integrity', copy: 'Gentle checks keep the vibe consistent.' },
                ].map((s) =>
                  e.jsxs(
                    'div',
                    {
                      className: 'glass-panel p-5',
                      children: [
                        e.jsx('h3', {
                          className: 'text-lg font-semibold text-slate-50',
                          children: s.title,
                        }),
                        e.jsx('p', { className: 'mt-2 text-sm text-slate-400', children: s.copy }),
                      ],
                    },
                    s.title
                  )
                ),
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'glass-panel p-6',
            children: [
              e.jsx('p', {
                className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                children: 'Personality Spectrum',
              }),
              e.jsx('h3', {
                className: 'mt-2 text-xl font-semibold text-slate-50',
                children: 'Four traits, one vibe.',
              }),
              e.jsx('p', {
                className: 'mt-3 text-sm text-slate-400',
                children:
                  'Presence, Strategy, Composure, and Guidance form the core of the Vibe Prism personality map.',
              }),
              e.jsx('div', {
                className: 'mt-6 space-y-4',
                children: [
                  { label: 'Presence', icon: o, copy: 'How visible and expressive you feel.' },
                  { label: 'Strategy', icon: d, copy: 'How intentional your moves are.' },
                  { label: 'Composure', icon: l, copy: 'How steady you stay when things shift.' },
                  { label: 'Guidance', icon: m, copy: 'How you steer the group vibe.' },
                ].map((s) =>
                  e.jsxs(
                    'div',
                    {
                      className: 'flex items-start gap-3',
                      children: [
                        e.jsx(s.icon, { size: 20, className: 'text-sky-300' }),
                        e.jsxs('div', {
                          children: [
                            e.jsx('p', {
                              className: 'text-sm font-semibold text-slate-100',
                              children: s.label,
                            }),
                            e.jsx('p', { className: 'text-xs text-slate-400', children: s.copy }),
                          ],
                        }),
                      ],
                    },
                    s.label
                  )
                ),
              }),
            ],
          }),
        ],
      }),
      e.jsxs('section', {
        children: [
          e.jsx('p', { className: 'section-title', children: 'What you discover' }),
          e.jsx('p', {
            className: 'section-lead',
            children:
              'A friendly, shareable profile you can keep to yourself or pass along with a QR token.',
          }),
          e.jsx('div', {
            className: 'mt-6 grid gap-6 md:grid-cols-2',
            children: [
              {
                title: 'Social Flow',
                copy: 'Discover the pace you set when you walk into a room.',
              },
              {
                title: 'Connection Style',
                copy: 'See how you naturally build rapport and alignment.',
              },
              {
                title: 'Decision Energy',
                copy: 'Track how you balance outcomes, feelings, and follow-through.',
              },
              { title: 'Influence Pattern', copy: 'Understand the way you guide group momentum.' },
            ].map((s) =>
              e.jsxs(
                t.div,
                {
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: !0 },
                  className: 'glass-panel p-5',
                  children: [
                    e.jsx('h3', {
                      className: 'text-lg font-semibold text-slate-50',
                      children: s.title,
                    }),
                    e.jsx('p', { className: 'mt-2 text-sm text-slate-400', children: s.copy }),
                  ],
                },
                s.title
              )
            ),
          }),
        ],
      }),
      e.jsxs('section', {
        className: 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr]',
        children: [
          e.jsxs('div', {
            className: 'glass-panel p-6',
            children: [
              e.jsx('p', {
                className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                children: 'Who it is for',
              }),
              e.jsx('h3', {
                className: 'mt-2 text-xl font-semibold',
                children: 'Designed for curious humans.',
              }),
              e.jsx('ul', {
                className: 'mt-4 space-y-3 text-sm text-slate-300',
                children: [
                  'Friends comparing the way they show up socially.',
                  'Teams looking for a fun, low-stakes read on group energy.',
                  'Creators curious about how their vibe lands with audiences.',
                ].map((s) => e.jsx('li', { className: 'list-item', children: s }, s)),
              }),
            ],
          }),
          e.jsxs('div', {
            className: 'glass-panel p-6',
            children: [
              e.jsx('p', {
                className: 'text-xs uppercase tracking-[0.3em] text-slate-400',
                children: 'Mini FAQ',
              }),
              e.jsxs('div', {
                className: 'mt-4 space-y-4 text-sm text-slate-300',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx('p', {
                        className: 'font-semibold text-slate-100',
                        children: 'Is this stored in the cloud?',
                      }),
                      e.jsx('p', {
                        className: 'mt-1 text-slate-400',
                        children:
                          'No. Tokens are stored locally in your browser and encrypted in transit.',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('p', {
                        className: 'font-semibold text-slate-100',
                        children: 'Can I retake the quiz?',
                      }),
                      e.jsx('p', {
                        className: 'mt-1 text-slate-400',
                        children:
                          'One session per pass. Use the restore tool to revisit your profile any time.',
                      }),
                    ],
                  }),
                  e.jsxs('div', {
                    children: [
                      e.jsx('p', {
                        className: 'font-semibold text-slate-100',
                        children: 'How long does it take?',
                      }),
                      e.jsx('p', {
                        className: 'mt-1 text-slate-400',
                        children: 'Less than 6 minutes for most people.',
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
export { h as default }

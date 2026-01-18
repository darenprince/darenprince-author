const c = (t) => btoa(t).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
  r = (t) => {
    const e = t.replace(/-/g, '+').replace(/_/g, '/'),
      o = (4 - (e.length % 4)) % 4,
      s = e + '='.repeat(o)
    return atob(s)
  },
  l = async (t) => {
    const e = new TextEncoder().encode(t),
      o = await crypto.subtle.digest('SHA-256', e)
    return Array.from(new Uint8Array(o))
      .map((n) => n.toString(16).padStart(2, '0'))
      .join('')
  },
  a = { attempt: 'VIBE_PRISM_ATTEMPT', token: 'VIBE_PRISM_LAST_TOKEN' },
  g = () => {
    localStorage.setItem(a.attempt, new Date().toISOString())
  },
  p = () => !!localStorage.getItem(a.attempt),
  d = (t) => {
    localStorage.setItem(a.token, t)
  },
  S = () => localStorage.getItem(a.token)
export { d as a, c as b, g as c, r as d, S as g, p as h, l as s }

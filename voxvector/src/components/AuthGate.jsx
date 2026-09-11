import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, ArrowLeft, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { wakeApi } from '../lib/api'
import { getVoxVectorRole, roleAllowed, routeForVoxVectorRole, supabase, supabaseConfigured } from '../lib/supabase'
import Button from './ui/Button'

const VIEWER = '/docs/crownlabsbible/docs/viewer.html'

export default function AuthGate({ children, allowedRoles = [], redirectByRole = false, onBack }) {
  const [session, setSession] = useState(null)
  const [status, setStatus] = useState('checking')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setStatus('ready')
      return undefined
    }
    let mounted = true
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!mounted) return
      if (sessionError) setError(sessionError.message)
      setSession(data?.session || null)
      setStatus('ready')
    })
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return
      setSession(nextSession)
      setStatus('ready')
    })
    return () => {
      mounted = false
      data.subscription.unsubscribe()
    }
  }, [])

  const role = getVoxVectorRole(session?.user)
  const targetRoute = useMemo(() => routeForVoxVectorRole(session?.user), [session?.user])

  useEffect(() => {
    if (busy || !redirectByRole || status !== 'ready' || !session || !role) return
    if (window.location.pathname.replace(/\/+$/, '') === targetRoute.replace(/\/+$/, '')) return
    window.location.replace(targetRoute)
  }, [busy, redirectByRole, role, session, status, targetRoute])

  const signOut = async () => {
    if (!supabase || signingOut) return
    setSigningOut(true)
    setError('')
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      setError(signOutError.message)
      setSigningOut(false)
      return
    }
    window.location.replace('/voxvector/')
  }

  const signIn = async event => {
    event.preventDefault()
    if (!supabase || busy) return
    setBusy(true)
    setError('')
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (authError) setError(authError.message)
    else {
      void wakeApi().catch(() => {})
      if (authData?.session) setSession(authData.session)
    }
    setBusy(false)
  }

  if (!supabaseConfigured) {
    return <GateShell onBack={onBack}><GateAlert icon={AlertTriangle} title="Account access is not configured">The application requires its configured Supabase authentication environment. No credentials or authorization are hard coded into VoxVector.</GateAlert></GateShell>
  }

  if (status === 'checking') {
    return <GateShell onBack={onBack}><div className="border border-white/10 bg-white/[.025] p-7 text-center sm:p-8" role="status" aria-live="polite"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/80"/><h1 className="mt-6 text-2xl font-semibold">Restoring your session</h1><p className="mt-2 text-sm leading-6 text-white/50">Checking secure VoxVector account access…</p></div></GateShell>
  }

  if (!session) {
    return <GateShell onBack={onBack} login><LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} busy={busy} error={error} onSubmit={signIn}/></GateShell>
  }

  if (!role) {
    return <GateShell onBack={onBack}><GateAlert icon={ShieldCheck} title="VoxVector access is not assigned" tone="red">This account is authenticated, but its trusted application role does not grant access to a protected VoxVector workspace.{error && <div className="mt-4 text-sm text-red-100">{error}</div>}<Button type="button" variant="secondary" disabled={signingOut} onClick={signOut} className="mt-6">{signingOut ? 'Signing out…' : 'Sign out'}</Button></GateAlert></GateShell>
  }

  if (redirectByRole) {
    return <GateShell onBack={onBack}><div className="border border-white/10 bg-white/[.025] p-7 text-center sm:p-8" role="status" aria-live="polite"><ShieldCheck className="mx-auto text-[var(--vv-accent-bright)]"/><h1 className="mt-6 text-2xl font-semibold">Opening your workspace</h1><p className="mt-2 text-sm leading-6 text-white/50">Your trusted {role} role is routing to the authorized VoxVector surface.</p></div></GateShell>
  }

  if (!roleAllowed(session.user, allowedRoles)) {
    return <GateShell onBack={onBack}><GateAlert icon={ShieldCheck} title="This workspace is not available for your role" tone="red">Your authenticated {role} account does not have permission to open this protected route. Use Login to enter the workspace assigned to your role.{error && <div className="mt-4 text-sm text-red-100">{error}</div>}<div className="mt-6 flex flex-wrap gap-2"><Button type="button" variant="accent" onClick={() => window.location.replace(targetRoute)}>Open assigned workspace</Button><Button type="button" variant="secondary" disabled={signingOut} onClick={signOut}>{signingOut ? 'Signing out…' : 'Sign out'}</Button></div></GateAlert></GateShell>
  }

  return children({ session, signOut, role })
}

function GateAlert({ icon: Icon, title, tone = 'amber', children }) {
  const classes = tone === 'red' ? 'border-red-300/20 bg-red-300/[.04]' : 'border-amber-300/20 bg-amber-300/[.05]'
  const iconClass = tone === 'red' ? 'text-red-200' : 'text-amber-200'
  return <div role="alert" className={`border p-6 ${classes}`}><Icon className={iconClass}/><h2 className="mt-5 text-xl font-semibold">{title}</h2><div className="mt-2 text-sm leading-6 text-white/55">{children}</div></div>
}

function GateShell({ children, onBack, login = false }) {
  if (login) {
    return <div className="relative min-h-[100svh] overflow-hidden bg-[#08090a] text-white" style={{ backgroundImage: 'radial-gradient(circle at 50% 15%, rgba(185,120,66,.09), transparent 30%), linear-gradient(180deg, #0b0d0f 0%, #08090a 54%, #050606 100%)' }}>{onBack && <button type="button" onClick={onBack} className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 bg-transparent p-0 text-xs font-medium text-white/35 transition hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A06B]/60 sm:left-8 sm:top-7"><ArrowLeft size={15}/>Public application</button>}<main className="mx-auto flex min-h-[100svh] w-full max-w-[620px] items-center justify-center px-5 py-16 sm:px-8 sm:py-20"><motion.div className="w-full" initial={{ opacity: 1, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32 }}>{children}</motion.div></main></div>
  }
  return <div className="flex min-h-screen flex-col bg-[#080a0e] text-white"><header className="border-b border-white/10 bg-black/75 backdrop-blur-md"><div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8"><a href="/voxvector/" aria-label="VoxVector home" className="inline-flex items-center no-underline"><img src="/voxvector/voxvector_logo_icon.png" alt="" className="h-9 w-9 object-contain"/></a><a href={VIEWER} className="text-xs text-white/45 no-underline transition hover:text-white">Documentation</a></div></header><main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8 sm:py-16"><div className="w-full max-w-[470px]">{onBack && <button type="button" onClick={onBack} className="mb-7 inline-flex items-center gap-2 bg-transparent p-0 text-sm text-white/50 transition hover:text-white"><ArrowLeft size={16}/>Public application</button>}<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>{children}</motion.div></div></main><footer className="border-t border-white/10 px-5 pb-7 pt-6 text-center"><img src="/voxvector/VoxVector-logo-word.png" alt="VoxVector" className="mx-auto h-5 w-auto opacity-45"/><div className="mt-3 text-[10px] uppercase tracking-[.08em] text-white/30">Secure account access · VoxVector</div></footer></div>
}

function AuthBrandFooter() {
  return <div className="mt-10 text-center sm:mt-12"><img src="/voxvector/VoxVector-logo-word.png" alt="VoxVector" className="mx-auto h-5 w-auto opacity-65 sm:h-[22px]"/><div className="mt-3 text-[9px] font-medium uppercase tracking-[.34em] text-white/30">Advanced vocal intelligence</div></div>
}

function LoginForm({ email, password, setEmail, setPassword, busy, error, onSubmit }) {
  const [mode, setMode] = useState('login')
  const [resetBusy, setResetBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [resetError, setResetError] = useState('')

  const requestReset = async event => {
    event.preventDefault()
    setMessage('')
    setResetError('')
    if (!email.trim()) {
      setResetError('Enter your account email first.')
      return
    }
    setResetBusy(true)
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/voxvector/login` })
    if (authError) setResetError(authError.message)
    else setMessage('If that VoxVector account exists, a password reset email has been sent.')
    setResetBusy(false)
  }

  if (mode === 'forgot') {
    return <div><div className="text-center"><img src="/voxvector/voxvector_icon_2_cropped.png" alt="" className="mx-auto h-[76px] w-[76px] object-contain sm:h-[84px] sm:w-[84px]"/><h1 className="mt-7 text-[2.35rem] font-semibold leading-none tracking-[-.035em] sm:text-[2.7rem]">Reset your password</h1><p className="mt-3 text-base text-white/52 sm:text-lg">Enter the email attached to your account.</p></div><section className="mt-9 rounded-[22px] border border-white/[.13] bg-[#0b0c0e]/85 p-6 shadow-[0_28px_90px_rgba(0,0,0,.35)] backdrop-blur-sm sm:mt-10 sm:p-8">{resetError && <div role="alert" className="mb-5 rounded-[8px] border border-red-300/20 bg-red-300/[.04] p-3 text-sm text-red-100">{resetError}</div>}{message && <div role="status" className="mb-5 rounded-[8px] border border-emerald-300/20 bg-emerald-300/[.04] p-3 text-sm text-emerald-100">{message}</div>}<form onSubmit={requestReset}><label className="block text-[15px] font-medium text-white/82">Email<div className="relative mt-2.5"><Mail size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45" aria-hidden="true"/><input value={email} onChange={event => setEmail(event.target.value)} type="email" autoComplete="email" required placeholder="you@example.com" className="h-14 w-full rounded-[10px] border border-white/[.16] bg-black/20 pl-12 pr-4 text-base text-white outline-none placeholder:text-white/30 transition focus:border-[#D9A06B]/65 focus:ring-2 focus:ring-[#B97842]/15"/></div></label><Button type="submit" disabled={resetBusy} focusableWhenDisabled className="mt-6 h-14 w-full rounded-[10px] border border-[#D9A06B]/30 bg-[linear-gradient(135deg,#D9A06B_0%,#B97842_100%)] px-4 text-base font-semibold text-[#140d08] shadow-[0_10px_28px_rgba(185,120,66,.16)] hover:brightness-105">{resetBusy ? 'Sending…' : 'Send reset link'}</Button></form><button type="button" onClick={() => { setMode('login'); setMessage(''); setResetError('') }} className="mt-5 inline-flex items-center gap-2 bg-transparent p-0 text-sm text-white/48 transition hover:text-white"><ArrowLeft size={15}/>Back to login</button></section><AuthBrandFooter/></div>
  }

  return <div><div className="text-center"><img src="/voxvector/voxvector_icon_2_cropped.png" alt="" className="mx-auto h-[76px] w-[76px] object-contain sm:h-[84px] sm:w-[84px]"/><h1 className="mt-7 text-[2.55rem] font-semibold leading-none tracking-[-.04em] sm:text-[3rem]">Welcome back</h1><p className="mt-3 text-base text-white/52 sm:text-lg">Log in to your account</p></div><form onSubmit={onSubmit} className="mt-9 rounded-[22px] border border-white/[.13] bg-[#0b0c0e]/85 p-6 shadow-[0_28px_90px_rgba(0,0,0,.35)] backdrop-blur-sm sm:mt-10 sm:p-8">{error && <div role="alert" aria-live="polite" className="mb-5 rounded-[8px] border border-red-300/20 bg-red-300/[.04] p-3 text-sm text-red-100">{error}</div>}<label className="block text-[15px] font-medium text-white/82">Email<div className="relative mt-2.5"><Mail size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45" aria-hidden="true"/><input value={email} onChange={event => setEmail(event.target.value)} type="email" autoComplete="username" required aria-invalid={Boolean(error)} placeholder="you@example.com" className="h-14 w-full rounded-[10px] border border-white/[.16] bg-black/20 pl-12 pr-4 text-base text-white outline-none placeholder:text-white/30 transition focus:border-[#D9A06B]/65 focus:ring-2 focus:ring-[#B97842]/15"/></div></label><div className="mt-5 flex items-center justify-between gap-4"><label htmlFor="voxvector-login-password" className="text-[15px] font-medium text-white/82">Password</label><button type="button" onClick={() => { setMode('forgot'); setMessage(''); setResetError('') }} className="bg-transparent p-0 text-sm font-medium text-[#D9A06B] transition hover:text-[#e4b17f]">Forgot password?</button></div><div className="relative mt-2.5"><LockKeyhole size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45" aria-hidden="true"/><input id="voxvector-login-password" value={password} onChange={event => setPassword(event.target.value)} type="password" autoComplete="current-password" required aria-invalid={Boolean(error)} placeholder="••••••••" className="h-14 w-full rounded-[10px] border border-white/[.16] bg-black/20 pl-12 pr-4 text-base text-white outline-none placeholder:text-white/30 transition focus:border-[#D9A06B]/65 focus:ring-2 focus:ring-[#B97842]/15"/></div><Button type="submit" disabled={busy} focusableWhenDisabled className="mt-6 h-14 w-full rounded-[10px] border border-[#D9A06B]/30 bg-[linear-gradient(135deg,#D9A06B_0%,#B97842_100%)] px-4 text-base font-semibold text-[#140d08] shadow-[0_10px_28px_rgba(185,120,66,.16)] hover:brightness-105">{busy ? 'Authenticating…' : 'Log in'}</Button></form><AuthBrandFooter/></div>
}

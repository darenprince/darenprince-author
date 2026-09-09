import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, ArrowLeft, KeyRound, LogIn, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
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
    if (!redirectByRole || status !== 'ready' || !session || !role) return
    if (window.location.pathname.replace(/\/+$/, '') === targetRoute.replace(/\/+$/, '')) return
    window.location.replace(targetRoute)
  }, [redirectByRole, role, session, status, targetRoute])

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
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (authError) setError(authError.message)
    setBusy(false)
  }

  if (!supabaseConfigured) {
    return <GateShell onBack={onBack}><GateAlert icon={AlertTriangle} title="Account access is not configured">The application requires its configured Supabase authentication environment. No credentials or authorization are hard coded into VoxVector.</GateAlert></GateShell>
  }

  if (status === 'checking') {
    return <GateShell onBack={onBack}><div className="border border-white/10 bg-white/[.025] p-7 text-center sm:p-8" role="status" aria-live="polite"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/80"/><h1 className="mt-6 text-2xl font-semibold">Restoring your session</h1><p className="mt-2 text-sm leading-6 text-white/50">Checking secure VoxVector account access…</p></div></GateShell>
  }

  if (!session) {
    return <GateShell onBack={onBack}><LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} busy={busy} error={error} onSubmit={signIn}/></GateShell>
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

function GateShell({ children, onBack }) {
  return <div className="flex min-h-screen flex-col bg-[#080a0e] text-white"><header className="border-b border-white/10 bg-black/75 backdrop-blur-md"><div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8"><a href="/voxvector/" aria-label="VoxVector home" className="inline-flex items-center no-underline"><img src="/voxvector/voxvector-icon-final-color.png.PNG" alt="" className="h-9 w-9 object-contain"/></a><a href={VIEWER} className="text-xs text-white/45 no-underline transition hover:text-white">Documentation</a></div></header><main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8 sm:py-16"><div className="w-full max-w-[470px]">{onBack && <button type="button" onClick={onBack} className="mb-7 inline-flex items-center gap-2 bg-transparent p-0 text-sm text-white/50 transition hover:text-white"><ArrowLeft size={16}/>Public application</button>}<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>{children}</motion.div></div></main><footer className="border-t border-white/10 px-5 pb-7 pt-6 text-center"><img src="/voxvector/VoxVector-logo-word.png" alt="VoxVector" className="mx-auto h-5 w-auto opacity-45"/><div className="mt-3 text-[10px] uppercase tracking-[.08em] text-white/30">Secure account access · VoxVector</div></footer></div>
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
    return <section className="border border-white/10 bg-white/[.025] p-7 sm:p-8"><KeyRound size={21} className="text-[var(--vv-accent-bright)]"/><h1 className="mt-6 text-2xl font-semibold">Reset your password</h1><p className="mt-2 text-sm leading-6 text-white/50">Enter the email attached to your VoxVector account.</p>{resetError && <div role="alert" className="mt-5 border border-red-300/20 bg-red-300/[.04] p-3 text-sm text-red-100">{resetError}</div>}{message && <div role="status" className="mt-5 border border-emerald-300/20 bg-emerald-300/[.04] p-3 text-sm text-emerald-100">{message}</div>}<form onSubmit={requestReset}><label className="mt-6 block text-sm text-white/65">Email<input value={email} onChange={event => setEmail(event.target.value)} type="email" autoComplete="email" required className="mt-2 w-full rounded-[5px] border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-white/30"/></label><Button type="submit" disabled={resetBusy} focusableWhenDisabled className="mt-6 w-full bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90">{resetBusy ? 'Sending…' : 'Send reset link'}</Button></form><button type="button" onClick={() => { setMode('login'); setMessage(''); setResetError('') }} className="mt-5 text-sm text-white/50 transition hover:text-white">Back to login</button></section>
  }

  return <form onSubmit={onSubmit} className="border border-white/10 bg-white/[.025] p-7 sm:p-8"><div className="flex h-10 w-10 items-center justify-center"><img src="/voxvector/voxvector-icon-final-color.png.PNG" alt="" className="h-8 w-8 object-contain"/></div><h1 className="mt-5 text-3xl font-semibold tracking-[-.035em]">Welcome back</h1><p className="mt-2 text-sm leading-6 text-white/50">Log in to your VoxVector account.</p>{error && <div role="alert" aria-live="polite" className="mt-5 border border-red-300/20 bg-red-300/[.04] p-3 text-sm text-red-100">{error}</div>}<label className="mt-6 block text-sm text-white/65">Email<input value={email} onChange={event => setEmail(event.target.value)} type="email" autoComplete="username" required aria-invalid={Boolean(error)} className="mt-2 w-full rounded-[5px] border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-white/30"/></label><label className="mt-4 block text-sm text-white/65">Password<input value={password} onChange={event => setPassword(event.target.value)} type="password" autoComplete="current-password" required aria-invalid={Boolean(error)} className="mt-2 w-full rounded-[5px] border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-white/30"/></label><button type="button" onClick={() => { setMode('forgot'); setMessage(''); setResetError('') }} className="mt-3 text-left text-xs text-white/50 transition hover:text-white">Forgot password?</button><Button type="submit" disabled={busy} focusableWhenDisabled className="mt-6 w-full bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"><LogIn size={16}/>{busy ? 'Authenticating…' : 'Log in'}</Button><p className="mt-5 text-xs leading-5 text-white/35">Access is assigned from trusted account roles. Protected workspaces remain unavailable until authorization is confirmed.</p></form>
}

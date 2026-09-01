import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, ArrowLeft, BookOpen, KeyRound, LogIn, ShieldCheck } from 'lucide-react'
import { isDeveloper, supabase, supabaseConfigured } from '../lib/supabase'
import { getHealth } from '../lib/api'
import ApiStartup from './ApiStartup'
import Button from './ui/Button'

const VIEWER = '/docs/crownlabsbible/docs/viewer.html'

export default function DeveloperGate({ children, onBack }) {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => { if (!supabase) return undefined; let mounted = true; supabase.auth.getSession().then(({ data }) => mounted && setSession(data.session)); const { data } = supabase.auth.onAuthStateChange((_event, next) => mounted && setSession(next)); return () => { mounted = false; data.subscription.unsubscribe() } }, [])
  const handleSignOut = async () => { if (!supabase || signingOut) return; setSigningOut(true); setError(''); const { error: signOutError } = await supabase.auth.signOut(); if (signOutError) { setError(signOutError.message); setSigningOut(false) } }
  if (!supabaseConfigured) return <GateShell onBack={onBack}><div role="alert" className="border border-amber-300/20 bg-amber-300/[.05] p-6"><AlertTriangle className="text-amber-200" /><h2 className="mt-5 text-xl font-semibold">Developer access is not configured</h2><p className="mt-2 text-sm leading-6 text-white/55">The frontend requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. No developer identity is hard coded into the application.</p></div></GateShell>
  if (!session) return <GateShell onBack={onBack}><LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} busy={busy} error={error} onSubmit={async (event) => { event.preventDefault(); setBusy(true); setError(''); const { error: authError } = await supabase.auth.signInWithPassword({ email, password }); if (authError) setError(authError.message); setBusy(false) }} /></GateShell>
  if (!isDeveloper(session.user)) return <GateShell onBack={onBack}><div role="alert" className="border border-red-300/20 bg-red-300/[.04] p-6"><ShieldCheck className="text-red-200" /><h2 className="mt-5 text-xl font-semibold">Developer role required</h2><p className="mt-2 text-sm leading-6 text-white/55">This account is authenticated, but its trusted Supabase <code>app_metadata</code> does not grant the VoxVector developer role.</p>{error && <div className="mt-4 text-sm text-red-100">{error}</div>}<Button type="button" disabled={signingOut} onClick={handleSignOut} className="mt-6 border border-white/15 bg-transparent px-4 py-2 text-sm hover:bg-white/[.06]">{signingOut ? 'Signing out…' : 'Sign out'}</Button></div></GateShell>
  return <DeveloperStartup session={session} signOut={handleSignOut}>{children}</DeveloperStartup>
}

function DeveloperStartup({ session, signOut, children }) {
  const [phase, setPhase] = useState('startup')
  const health = useQuery({ queryKey: ['developer-startup-health'], queryFn: getHealth, refetchInterval: 1500, retry: false, staleTime: 0 })
  const apiReady = health.isSuccess && health.data?.payload?.status === 'ok' && health.data?.payload?.runtime_self_test === 'passed'

  useEffect(() => {
    if (phase !== 'startup' || !apiReady) return undefined
    setPhase('leaving')
    return undefined
  }, [apiReady, phase])

  useEffect(() => {
    if (phase !== 'leaving') return undefined
    const timer = window.setTimeout(() => setPhase('preloader'), 520)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'preloader') return undefined
    const timer = window.setTimeout(() => setPhase('ready'), 730)
    return () => window.clearTimeout(timer)
  }, [phase])

  if (phase === 'startup' || phase === 'leaving') return <ApiStartup health={health} session={session} leaving={phase === 'leaving'} />
  if (phase === 'preloader') return <StartupPreloader />
  return children({ session, signOut })
}

function StartupPreloader() {
  return <motion.main className="vv-console-preloader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" aria-live="polite" aria-label="Loading VoxVector developer dashboard"><div className="vv-console-preloader__mark"><img src="/voxvector/assets/voxvector-icon-final-color.png" alt=""/><span /></div><div className="vv-console-preloader__eyebrow">VOXVECTOR DEVELOPER CONSOLE</div><div className="vv-console-preloader__title">Loading dashboard</div><div className="vv-console-preloader__bar"><div /></div><div className="vv-console-preloader__detail">API ready · restoring the developer workspace</div></motion.main>
}

function GateShell({ children, onBack }) { return <div className="min-h-screen bg-[#080a0e] text-white flex flex-col"><header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-md"><div className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 max-[640px]:h-[68px]"><a href="/voxvector/" aria-label="VoxVector home" className="inline-flex items-center no-underline"><img src="/voxvector/assets/voxvector-icon-final-color.png" alt="" className="h-[42px] w-[42px] object-contain max-[640px]:h-9 max-[640px]:w-9" /><img src="/voxvector/assets/voxvector-wordmark-final-white.png" alt="VoxVector" className="ml-2 h-[35.7px] w-auto object-contain max-[640px]:h-[30.6px]" /></a><a href={VIEWER} className="inline-flex items-center gap-2 text-xs text-white/50 no-underline transition hover:text-white"><BookOpen size={14} /> Documentation</a></div></header><main className="flex flex-1 items-center justify-center px-5 py-14 sm:px-8 sm:py-[72px]"><div className="w-full max-w-[500px]"><Button type="button" onClick={onBack} className="mb-8 bg-transparent p-0 text-sm text-white/50 hover:text-white"><ArrowLeft size={16} /> Public application</Button><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{children}</motion.div></div></main><footer className="border-t border-white/10 px-5 pb-7 pt-6 text-center text-[10px] uppercase tracking-[.07em] text-white/35"><a href={VIEWER} aria-label="Crown Labs documents" className="mb-3 inline-flex opacity-60 transition hover:opacity-80"><img src="/labs/assets/crown-labs-logo.png" alt="Crown Labs" className="h-9 w-auto max-w-[145px] object-contain" /></a><div>© 2026 Crown Labs · VoxVector Developer Console</div></footer></div> }

function LoginForm({ email, password, setEmail, setPassword, busy, error, onSubmit }) { const [mode, setMode] = useState('login'); const [resetBusy, setResetBusy] = useState(false); const [message, setMessage] = useState(''); const [resetError, setResetError] = useState(''); const requestReset = async (event) => { event.preventDefault(); setMessage(''); setResetError(''); if (!email.trim()) { setResetError('Enter your developer email first.'); return } setResetBusy(true); const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/voxvector/developer` }); if (authError) setResetError(authError.message); else setMessage('If that developer account exists, a password reset email has been sent.'); setResetBusy(false) }; if (mode === 'forgot') return <section className="border border-white/10 bg-white/[.025] p-7 sm:p-8"><div className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[.04]"><KeyRound size={20} /></div><h1 className="mt-6 text-2xl font-semibold">Reset developer password</h1><p className="mt-2 text-sm leading-6 text-white/50">Enter your approved developer email and we’ll send a secure password reset link.</p>{resetError && <div role="alert" className="mt-5 border border-red-300/20 bg-red-300/[.04] p-3 text-sm text-red-100">{resetError}</div>}{message && <div role="status" className="mt-5 border border-emerald-300/20 bg-emerald-300/[.04] p-3 text-sm text-emerald-100">{message}</div>}<form onSubmit={requestReset}><label className="mt-6 block text-sm text-white/65">Developer email<input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="email" required className="mt-2 w-full rounded-[5px] border border-white/10 bg-black/30 px-3 py-3 outline-none" /></label><Button type="submit" disabled={resetBusy} focusableWhenDisabled className="mt-6 w-full bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90">{resetBusy ? 'Sending…' : 'Send reset link'}</Button></form><button type="button" onClick={() => { setMode('login'); setMessage(''); setResetError('') }} className="mt-5 text-sm text-white/50 hover:text-white">Back to sign in</button></section>; return <form onSubmit={onSubmit} className="border border-white/10 bg-white/[.025] p-7 sm:p-8"><div className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[.04]"><KeyRound size={20} /></div><h1 className="mt-6 text-2xl font-semibold">VoxVector Developer Console</h1><p className="mt-2 text-sm leading-6 text-white/50">Sign in with an approved developer account. Access is controlled by Supabase Auth and the user's trusted application metadata.</p>{error && <div role="alert" aria-live="polite" className="mt-5 border border-red-300/20 bg-red-300/[.04] p-3 text-sm text-red-100">{error}</div>}<label className="mt-6 block text-sm text-white/65">Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="username" required aria-invalid={Boolean(error)} className="mt-2 w-full rounded-[5px] border border-white/10 bg-black/30 px-3 py-3 outline-none" /></label><label className="mt-4 block text-sm text-white/65">Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" autoComplete="current-password" required aria-invalid={Boolean(error)} className="mt-2 w-full rounded-[5px] border border-white/10 bg-black/30 px-3 py-3 outline-none" /></label><button type="button" onClick={() => { setMode('forgot'); setMessage(''); setResetError('') }} className="mt-3 text-left text-xs text-white/50 transition hover:text-white">Forgot password?</button><Button type="submit" disabled={busy} focusableWhenDisabled className="mt-6 w-full bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"><LogIn size={16} />{busy ? 'Authenticating…' : 'Sign in'}</Button></form> }

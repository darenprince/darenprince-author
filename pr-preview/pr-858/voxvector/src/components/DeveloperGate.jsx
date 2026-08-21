import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, ArrowLeft, KeyRound, LogIn, ShieldCheck } from 'lucide-react'
import { isDeveloper, supabase, supabaseConfigured } from '../lib/supabase'
import Button from './ui/Button'

export default function DeveloperGate({ children, onBack }) {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return undefined
    let mounted = true
    supabase.auth.getSession().then(({ data }) => mounted && setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, next) => mounted && setSession(next))
    return () => { mounted = false; data.subscription.unsubscribe() }
  }, [])

  const handleSignOut = async () => {
    if (!supabase || signingOut) return
    setSigningOut(true)
    setError('')
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      setError(signOutError.message)
      setSigningOut(false)
    }
  }

  if (!supabaseConfigured) return <GateShell onBack={onBack}><div role="alert" className="border border-amber-300/20 bg-amber-300/[.05] p-6"><AlertTriangle className="text-amber-200" /><h2 className="mt-5 text-xl font-semibold">Developer access is not configured</h2><p className="mt-2 text-sm leading-6 text-white/55">The frontend requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. No developer identity is hard coded into the application.</p></div></GateShell>

  if (!session) return <GateShell onBack={onBack}><LoginForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} busy={busy} error={error} onSubmit={async (event) => { event.preventDefault(); setBusy(true); setError(''); const { error: authError } = await supabase.auth.signInWithPassword({ email, password }); if (authError) setError(authError.message); setBusy(false) }} /></GateShell>

  if (!isDeveloper(session.user)) return <GateShell onBack={onBack}><div role="alert" className="border border-red-300/20 bg-red-300/[.04] p-6"><ShieldCheck className="text-red-200" /><h2 className="mt-5 text-xl font-semibold">Developer role required</h2><p className="mt-2 text-sm leading-6 text-white/55">This account is authenticated, but its trusted Supabase <code>app_metadata</code> does not grant the VoxVector developer role.</p>{error && <div className="mt-4 text-sm text-red-100">{error}</div>}<Button type="button" disabled={signingOut} onClick={handleSignOut} className="mt-6 border border-white/15 bg-transparent px-4 py-2 text-sm hover:bg-white/[.06]">{signingOut ? 'Signing out…' : 'Sign out'}</Button></div></GateShell>

  return children({ session, signOut: handleSignOut })
}

function GateShell({ children, onBack }) { return <div className="min-h-screen bg-[#080a0e] px-5 py-8 text-white"><div className="mx-auto max-w-lg"><Button type="button" onClick={onBack} className="mb-10 bg-transparent p-0 text-sm text-white/50 hover:text-white"><ArrowLeft size={16} /> Public application</Button><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{children}</motion.div></div></div> }

function LoginForm({ email, password, setEmail, setPassword, busy, error, onSubmit }) { return <form onSubmit={onSubmit} className="border border-white/10 bg-white/[.025] p-7"><div className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[.04]"><KeyRound size={20} /></div><h1 className="mt-6 text-2xl font-semibold">VoxVector Developer Console</h1><p className="mt-2 text-sm leading-6 text-white/50">Sign in with an approved developer account. Access is controlled by Supabase Auth and the user's trusted application metadata.</p>{error && <div role="alert" aria-live="polite" className="mt-5 border border-red-300/20 bg-red-300/[.04] p-3 text-sm text-red-100">{error}</div>}<label className="mt-6 block text-sm text-white/65">Email<input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="username" required aria-invalid={Boolean(error)} className="mt-2 w-full border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-blue-300/60 focus:ring-2 focus:ring-blue-400/20" /></label><label className="mt-4 block text-sm text-white/65">Password<input value={password} onChange={e => setPassword(e.target.value)} type="password" autoComplete="current-password" required className="mt-2 w-full border border-white/10 bg-black/30 px-3 py-3 outline-none focus:border-blue-300/60 focus:ring-2 focus:ring-blue-400/20" /></label><Button type="submit" disabled={busy} focusableWhenDisabled className="mt-6 w-full bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"> <LogIn size={16} />{busy ? 'Authenticating…' : 'Sign in'}</Button></form> }

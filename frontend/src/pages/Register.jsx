import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import { UserPlus, AlertCircle, MailCheck } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { AuthField } from './Login'

export default function Register() {
  const { register } = useAuth()
  const [params] = useSearchParams()
  const next = params.get('next') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setBusy(true)
    try {
      await register(email.trim(), password)
      setDone(true)
    } catch (err) {
      // DRF field errors come back as { password: [...] } / { email: [...] }.
      const d = err.data
      const fieldMsg = d && typeof d === 'object'
        ? (d.password?.[0] || d.email?.[0] || d.detail)
        : null
      setError(fieldMsg || err.message || 'Could not create your account. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-sm mx-auto px-4 py-16 text-center">
        <Helmet><title>Confirm your email | UtilKit</title><meta name="robots" content="noindex" /></Helmet>
        <MailCheck size={44} className="text-emerald-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Check your inbox</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account and start advertising.
        </p>
        <p className="text-sm text-zinc-400 mt-4">The link expires in 48 hours.</p>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <Helmet>
        <title>Create an account | UtilKit</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 mb-4">
          <UserPlus size={22} />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Create your account</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">to advertise on UtilKit</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <AuthField label="Email" type="email" value={email} onChange={setEmail} required autoComplete="email" placeholder="you@company.com" />
        <AuthField label="Password" type="password" value={password} onChange={setPassword} required autoComplete="new-password" placeholder="At least 8 characters" />

        {error && (
          <div className="flex items-start gap-2 text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg px-4 py-3">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" /> {error}
          </div>
        )}

        <button type="submit" disabled={busy}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold transition-colors">
          {busy ? 'Creating…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-6">
        Already have an account?{' '}
        <Link to={`/login?next=${encodeURIComponent(next)}`} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

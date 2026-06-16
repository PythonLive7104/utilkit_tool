import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function Login() {
  const { login, resendVerification } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [needsVerify, setNeedsVerify] = useState(false)
  const [resent, setResent] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError(''); setNeedsVerify(false); setResent(false)
    setBusy(true)
    try {
      await login(email.trim(), password)
      navigate(next, { replace: true })
    } catch (err) {
      if (err.status === 403 && err.data?.unverified) {
        setNeedsVerify(true)
        setError('Please confirm your email before logging in.')
      } else {
        setError(err.message || 'Could not log in. Please try again.')
      }
    } finally {
      setBusy(false)
    }
  }

  async function onResend() {
    try { await resendVerification(email.trim()); setResent(true) } catch {}
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <Helmet>
        <title>Log in | UtilKit</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 mb-4">
          <LogIn size={22} />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Log in</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">to manage your UtilKit adverts</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <AuthField label="Email" type="email" value={email} onChange={setEmail} required autoComplete="email" placeholder="you@company.com" />
        <AuthField label="Password" type="password" value={password} onChange={setPassword} required autoComplete="current-password" placeholder="••••••••" />

        {error && (
          <div className="flex items-start gap-2 text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg px-4 py-3">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              {error}
              {needsVerify && (
                <button type="button" onClick={onResend} className="block mt-1 underline font-medium">
                  {resent ? 'Verification email sent ✓' : 'Resend verification email'}
                </button>
              )}
            </div>
          </div>
        )}

        <button type="submit" disabled={busy}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold transition-colors">
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-6">
        No account?{' '}
        <Link to={`/register?next=${encodeURIComponent(next)}`} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  )
}

export function AuthField({ label, value, onChange, type = 'text', required = false, placeholder = '', autoComplete }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</label>
      <input
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  )
}

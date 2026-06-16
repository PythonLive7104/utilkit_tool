import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function VerifyEmail() {
  const { verifyEmail } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [state, setState] = useState('verifying') // verifying | success | error
  const [error, setError] = useState('')
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return // guard against StrictMode double-invoke
    ran.current = true

    const token = params.get('token')
    if (!token) { setState('error'); setError('This verification link is missing its token.'); return }

    verifyEmail(token)
      .then(() => {
        setState('success')
        setTimeout(() => navigate('/dashboard', { replace: true }), 1500)
      })
      .catch((err) => { setState('error'); setError(err.message || 'This link is invalid or has expired.') })
  }, [params, verifyEmail, navigate])

  return (
    <div className="max-w-sm mx-auto px-4 py-20 text-center">
      <Helmet><title>Confirming your email | UtilKit</title><meta name="robots" content="noindex" /></Helmet>

      {state === 'verifying' && (
        <>
          <Loader2 size={44} className="text-indigo-500 mx-auto mb-4 animate-spin" />
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Confirming your email…</h1>
        </>
      )}

      {state === 'success' && (
        <>
          <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Email confirmed! 🎉</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Taking you to your dashboard…</p>
        </>
      )}

      {state === 'error' && (
        <>
          <AlertCircle size={48} className="text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Couldn't confirm</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">{error}</p>
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
            Register again
          </Link>
        </>
      )}
    </div>
  )
}

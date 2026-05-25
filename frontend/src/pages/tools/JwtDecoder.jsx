import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, ShieldCheck, ShieldAlert, Clock } from 'lucide-react'

const ABOUT = [
  'JWT Decoder decodes JSON Web Tokens (JWTs) to reveal their header, payload, and signature — no server required.',
  'Paste any JWT to instantly see the algorithm, issuer, subject, expiry timestamp, custom claims, and whether the token is currently expired.',
  'Useful for debugging authentication issues, inspecting API tokens, and understanding the structure of JWTs without needing a separate tool.',
]

function b64decode(str) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return JSON.parse(new TextDecoder().decode(bytes))
}

function formatDate(ts) {
  return new Date(ts * 1000).toLocaleString()
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(null)

  function decode() {
    if (!token.trim()) return
    try {
      const parts = token.trim().split('.')
      if (parts.length !== 3) throw new Error('Invalid JWT: expected 3 parts separated by dots')
      const header = b64decode(parts[0])
      const payload = b64decode(parts[1])
      const now = Math.floor(Date.now() / 1000)
      setDecoded({
        header,
        payload,
        signature: parts[2],
        expired: payload.exp ? payload.exp < now : false,
        expiresIn: payload.exp ? payload.exp - now : null,
      })
      setError('')
    } catch (e) {
      setError(e.message)
      setDecoded(null)
    }
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text)
    setCopied(key); setTimeout(() => setCopied(null), 1500)
  }

  function CopyBtn({ text, id }) {
    return (
      <button className="btn-ghost text-xs py-1 px-2" onClick={() => copy(text, id)}>
        {copied === id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
      </button>
    )
  }

  return (
    <ToolLayout title="JWT Decoder" description="Decode and inspect any JWT token instantly — header, payload, expiry, and claims." toolId="jwt-decoder" about={ABOUT}>
      <div className="mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">JWT Token</label>
        <textarea
          value={token}
          onChange={e => { setToken(e.target.value); setDecoded(null); setError('') }}
          placeholder="Paste your JWT token here… eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U"
          rows={4}
          className="textarea text-sm font-mono"
        />
      </div>
      <button className="btn-primary mb-6" onClick={decode} disabled={!token.trim()}>
        Decode Token
      </button>
      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      {decoded && (
        <div className="space-y-4">
          {decoded.expired !== undefined && (
            <div className={`flex items-center gap-2 p-3 rounded-xl border text-sm ${decoded.expired ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
              {decoded.expired ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
              {decoded.expired ? 'Token expired' : 'Token valid'}
              {decoded.payload.exp && (
                <span className="ml-auto text-xs opacity-80">
                  {decoded.expired ? `Expired ${formatDate(decoded.payload.exp)}` : `Expires ${formatDate(decoded.payload.exp)}`}
                </span>
              )}
            </div>
          )}
          <Section title="Header" data={decoded.header} copyKey="header" onCopy={copy} copied={copied} />
          <Section title="Payload" data={decoded.payload} copyKey="payload" onCopy={copy} copied={copied} />
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Signature</span>
              <button className="btn-ghost text-xs py-1 px-2" onClick={() => copy(decoded.signature, 'sig')}>
                {copied === 'sig' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>
            <p className="text-xs text-zinc-500 font-mono break-all">{decoded.signature}</p>
            <p className="text-xs text-zinc-600 mt-2">Signature verification requires the secret key and cannot be done client-side.</p>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

function Section({ title, data, copyKey, onCopy, copied }) {
  const json = JSON.stringify(data, null, 2)
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{title}</span>
        <button className="btn-ghost text-xs py-1 px-2" onClick={() => onCopy(json, copyKey)}>
          {copied === copyKey ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
        </button>
      </div>
      <pre className="text-sm text-zinc-200 font-mono overflow-x-auto">{json}</pre>
    </div>
  )
}

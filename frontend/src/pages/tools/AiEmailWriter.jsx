import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { aiTool } from '../../lib/api'
import { Loader2, Copy, Check, Sparkles, Mail } from 'lucide-react'

const TONES = ['Professional', 'Friendly', 'Formal', 'Apologetic', 'Persuasive', 'Follow-up']

const ABOUT = [
  'AI Email Writer composes complete, professional emails based on a short description of what you need to say.',
  'Describe the purpose, recipient, and key points — the AI structures it into a proper email with subject line, greeting, body, call to action, and sign-off.',
  'Great for cold outreach, follow-ups, apologies, job applications, client communication, and any situation where you need a polished email quickly.',
]

export default function AiEmailWriter() {
  const [input, setInput] = useState('')
  const [tone, setTone] = useState('Professional')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function run() {
    if (!input.trim()) return
    setLoading(true); setError(''); setResult('')
    try {
      const data = await aiTool('email', `Tone: ${tone}\n\n${input}`)
      setResult(data.result)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <ToolLayout title="AI Email Writer" description="Write professional emails from a short description. Subject, body, and sign-off included." toolId="ai-email-writer" about={ABOUT}>
      <div className="card mb-4">
        <div className="mb-4">
          <label className="block text-xs text-zinc-500 mb-2">Tone</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map(t => (
              <button key={t} onClick={() => setTone(t)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${tone === t ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Email brief</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Describe what the email should say... e.g. 'Write a follow-up email to a client who hasn't responded to my proposal in 2 weeks. Be polite but direct.'" rows={5} className="textarea text-sm" />
        </div>
      </div>
      <button className="btn-primary mb-6" onClick={run} disabled={!input.trim() || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Writing…</> : <><Mail size={15} /> Write Email</>}
      </button>
      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      {result && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-200">Generated Email</span>
            <button className="btn-ghost text-xs py-1 px-2" onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans">{result}</pre>
        </div>
      )}
    </ToolLayout>
  )
}

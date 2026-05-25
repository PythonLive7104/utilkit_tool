import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { aiTool } from '../../lib/api'
import { Loader2, Copy, Check, Sparkles, RefreshCw } from 'lucide-react'

const ABOUT = [
  'AI Text Humanizer rewrites AI-generated content to sound natural, engaging, and human-written. It removes robotic phrasing, varies sentence structure, and adds personality.',
  'Content detectors (GPTZero, Originality.ai, Turnitin) flag repetitive patterns and overly formal language. This tool restructures text to pass those checks by mimicking natural human writing style.',
  'Paste any AI-generated paragraph, essay, or article and get a rewritten version that flows naturally with contractions, varied rhythm, and conversational tone.',
]

export default function AiHumanizer() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function run() {
    if (!input.trim()) return
    setLoading(true); setError(''); setResult('')
    try {
      const data = await aiTool('humanize', input)
      setResult(data.result)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  function copy() {
    navigator.clipboard.writeText(result)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  const words = input.trim() ? input.trim().split(/\s+/).length : 0

  return (
    <ToolLayout title="AI Text Humanizer" description="Rewrite AI-generated text to sound natural and human. Bypass AI content detectors." toolId="ai-humanizer" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">AI-generated text</label>
            <span className="text-xs text-zinc-600">{words} words</span>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste AI-generated text here..." rows={14} className="textarea text-sm" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">Humanized result</label>
            {result && (
              <div className="flex gap-2">
                <button className="btn-ghost text-xs py-1 px-2" onClick={() => { setInput(result); setResult('') }}><RefreshCw size={12} /> Re-humanize</button>
                <button className="btn-ghost text-xs py-1 px-2" onClick={copy}>{copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}</button>
              </div>
            )}
          </div>
          <div className={`min-h-[224px] rounded-xl border text-sm p-3 leading-relaxed ${result ? 'border-zinc-700 bg-zinc-950 text-zinc-200' : 'border-zinc-800 bg-zinc-900 text-zinc-600'}`}>
            {loading ? <div className="flex items-center gap-2 text-indigo-400 pt-2"><Loader2 size={15} className="animate-spin" /> Humanizing…</div>
              : result || 'Humanized text will appear here…'}
          </div>
        </div>
      </div>
      {error && <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      <button className="btn-primary mt-4" onClick={run} disabled={!input.trim() || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Humanizing…</> : <><Sparkles size={15} /> Humanize Text</>}
      </button>
    </ToolLayout>
  )
}

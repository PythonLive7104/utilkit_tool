import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { aiTool } from '../../lib/api'
import { Loader2, Copy, Check, Sparkles, AlertCircle } from 'lucide-react'

const ABOUT = [
  'AI Grammar Fixer corrects all grammar, spelling, punctuation, and style errors in your text while preserving your original meaning and tone.',
  'It handles complex errors that basic spell-checkers miss: subject-verb disagreement, dangling modifiers, incorrect tense, misplaced apostrophes, and comma splices.',
  'Ideal for emails, essays, cover letters, blog posts, and any professional writing where errors create a poor impression.',
]

export default function AiGrammarFixer() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function run() {
    if (!input.trim()) return
    setLoading(true); setError(''); setResult('')
    try { const data = await aiTool('grammar', input); setResult(data.result) }
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <ToolLayout title="AI Grammar Fixer" description="Fix all grammar, spelling, and punctuation errors instantly using AI." toolId="ai-grammar-fixer" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Text with errors</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your text here to fix grammar and spelling..." rows={14} className="textarea text-sm" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">Corrected text</label>
            {result && <button className="btn-ghost text-xs py-1 px-2" onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}</button>}
          </div>
          <div className={`min-h-[224px] rounded-xl border text-sm p-3 leading-relaxed ${result ? 'border-emerald-500/30 bg-zinc-950 text-zinc-200' : 'border-zinc-800 bg-zinc-900 text-zinc-600'}`}>
            {loading ? <div className="flex items-center gap-2 text-indigo-400 pt-2"><Loader2 size={15} className="animate-spin" /> Fixing grammar…</div> : result || 'Corrected text will appear here…'}
          </div>
        </div>
      </div>
      {error && <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex gap-2"><AlertCircle size={14} className="shrink-0 mt-0.5" />{error}</div>}
      <button className="btn-primary mt-4" onClick={run} disabled={!input.trim() || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Fixing…</> : <><Sparkles size={15} /> Fix Grammar</>}
      </button>
    </ToolLayout>
  )
}

import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { aiTool } from '../../lib/api'
import { Loader2, Copy, Check, Sparkles } from 'lucide-react'

const ABOUT = [
  'AI Paraphraser rewrites any text using different words and sentence structures while preserving the original meaning. Useful for avoiding plagiarism, varying content, or simplifying complex passages.',
  'Unlike a simple synonym replacer, this tool rewrites full sentences and restructures paragraphs to produce fluent, natural-sounding output.',
  'Works on academic essays, articles, emails, and any written content up to 8,000 characters.',
]

export default function AiParaphraser() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function run() {
    if (!input.trim()) return
    setLoading(true); setError(''); setResult('')
    try { const data = await aiTool('paraphrase', input); setResult(data.result) }
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <ToolLayout title="AI Paraphraser" description="Rewrite any text with different words and structure. Preserve meaning, avoid plagiarism." toolId="ai-paraphraser" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Original text</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text to paraphrase..." rows={14} className="textarea text-sm" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">Paraphrased result</label>
            {result && <button className="btn-ghost text-xs py-1 px-2" onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}</button>}
          </div>
          <div className={`min-h-[224px] rounded-xl border text-sm p-3 leading-relaxed ${result ? 'border-zinc-700 bg-zinc-950 text-zinc-200' : 'border-zinc-800 bg-zinc-900 text-zinc-600'}`}>
            {loading ? <div className="flex items-center gap-2 text-indigo-400 pt-2"><Loader2 size={15} className="animate-spin" /> Paraphrasing…</div> : result || 'Result will appear here…'}
          </div>
        </div>
      </div>
      {error && <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      <button className="btn-primary mt-4" onClick={run} disabled={!input.trim() || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Paraphrasing…</> : <><Sparkles size={15} /> Paraphrase</>}
      </button>
    </ToolLayout>
  )
}

import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { aiTool } from '../../lib/api'
import { Loader2, Copy, Check, Sparkles } from 'lucide-react'

const ABOUT = [
  'AI Summarizer condenses long articles, reports, essays, or any text into a concise summary that captures the key points.',
  'The AI analyzes the content structure and extracts the most important information, giving you the gist in seconds without reading the full document.',
  'Useful for research papers, news articles, meeting notes, legal documents, and any lengthy content where you need a quick overview.',
]

export default function AiSummarizer() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function run() {
    if (!input.trim()) return
    setLoading(true); setError(''); setResult('')
    try { const data = await aiTool('summarize', input); setResult(data.result) }
    catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  const words = input.trim() ? input.trim().split(/\s+/).length : 0

  return (
    <ToolLayout title="AI Summarizer" description="Summarize long articles, reports, and documents into key points instantly." toolId="ai-summarizer" about={ABOUT}>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs text-zinc-500">Text to summarize</label>
          <span className="text-xs text-zinc-600">{words} words</span>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a long article, report, or document to summarize..." rows={10} className="textarea text-sm mb-4" />
      </div>
      <button className="btn-primary mb-6" onClick={run} disabled={!input.trim() || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Summarizing…</> : <><Sparkles size={15} /> Summarize</>}
      </button>
      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      {result && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-200">Summary</span>
            <button className="btn-ghost text-xs py-1 px-2" onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          </div>
          <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </ToolLayout>
  )
}

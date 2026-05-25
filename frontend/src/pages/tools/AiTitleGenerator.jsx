import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { aiTool } from '../../lib/api'
import { Loader2, Copy, Check, Sparkles, RefreshCw } from 'lucide-react'

const ABOUT = [
  'AI Title Generator creates 8 compelling, click-worthy titles or headlines for any topic, article, or piece of content.',
  'It generates a variety of styles: how-to guides, listicles, question headlines, statement headlines, and curiosity-gap titles — mixing formats so you can pick the best fit.',
  'Use it for blog posts, YouTube videos, social media posts, email subject lines, podcast episodes, and any content where the headline drives clicks.',
]

export default function AiTitleGenerator() {
  const [input, setInput] = useState('')
  const [titles, setTitles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(null)

  async function run() {
    if (!input.trim()) return
    setLoading(true); setError(''); setTitles([])
    try {
      const data = await aiTool('title', input)
      setTitles(data.result.split('\n').filter(t => t.trim()))
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  function copy(text, idx) {
    navigator.clipboard.writeText(text)
    setCopied(idx); setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolLayout title="AI Title Generator" description="Generate 8 compelling headlines and titles for any topic or content." toolId="ai-title-generator" about={ABOUT}>
      <div className="mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">Topic or content description</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. A blog post about productivity tips for remote workers..." rows={4} className="textarea text-sm" />
      </div>
      <button className="btn-primary mb-6" onClick={run} disabled={!input.trim() || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Generating…</> : <><Sparkles size={15} /> Generate Titles</>}
      </button>
      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      {titles.length > 0 && (
        <div className="space-y-2">
          {titles.map((title, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-zinc-800/60 border border-zinc-700 rounded-xl group">
              <span className="text-xs text-zinc-600 w-5 text-right shrink-0">{i + 1}</span>
              <span className="flex-1 text-sm text-zinc-200">{title}</span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity btn-ghost py-1 px-2 text-xs" onClick={() => copy(title, i)}>
                {copied === i ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          ))}
          <button className="btn-secondary text-xs mt-2" onClick={run}><RefreshCw size={13} /> Regenerate</button>
        </div>
      )}
    </ToolLayout>
  )
}

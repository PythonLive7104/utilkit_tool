import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Sort Text Lines arranges a list of lines alphabetically, numerically, or in reverse, in one click.',
  'Choose ascending or descending order, ignore case, sort numbers correctly, and optionally remove duplicate lines — ideal for tidying lists, keywords, and CSV columns.',
  'Sorting happens instantly in your browser; nothing is uploaded.',
]

export default function SortTextLines() {
  const [text, setText] = useState('')
  const [order, setOrder] = useState('asc')
  const [mode, setMode] = useState('alpha')
  const [ignoreCase, setIgnoreCase] = useState(true)
  const [dedupe, setDedupe] = useState(false)
  const [copied, setCopied] = useState(false)

  let lines = text.length ? text.split('\n') : []
  if (dedupe) lines = [...new Set(lines)]

  const sorted = [...lines].sort((a, b) => {
    if (mode === 'numeric') {
      return (parseFloat(a) || 0) - (parseFloat(b) || 0)
    }
    const x = ignoreCase ? a.toLowerCase() : a
    const y = ignoreCase ? b.toLowerCase() : b
    return x.localeCompare(y)
  })
  if (order === 'desc') sorted.reverse()
  const output = sorted.join('\n')

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      title="Sort Text Lines"
      description="Sort lines of text alphabetically or numerically, ascending or descending, with optional de-duplication."
      toolId="sort-text-lines"
      about={ABOUT}
    >
      <div className="card mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">Your list (one item per line)</label>
        <textarea className="input text-sm min-h-[140px]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your list here…" />
      </div>

      <div className="card mb-4 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Sort by</label>
            <select className="input" value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="alpha">Alphabetical</option>
              <option value="numeric">Numerical</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Order</label>
            <select className="input" value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="asc">Ascending (A→Z, 0→9)</option>
              <option value="desc">Descending (Z→A, 9→0)</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} /> Ignore case
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <input type="checkbox" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} /> Remove duplicates
          </label>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs text-zinc-500">Result</label>
          <button onClick={copy} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors">
            {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea readOnly className="input text-sm min-h-[140px]" value={output} />
      </div>
    </ToolLayout>
  )
}

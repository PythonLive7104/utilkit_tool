import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Remove Duplicate Lines deletes repeated lines from a list, keeping only one copy of each unique line.',
  'Optionally ignore case, trim surrounding whitespace before comparing, and remove blank lines — useful for cleaning up email lists, keyword lists, logs, and CSV columns.',
  'It reports how many duplicates were removed and runs entirely in your browser.',
]

export default function RemoveDuplicateLines() {
  const [text, setText] = useState('')
  const [ignoreCase, setIgnoreCase] = useState(false)
  const [trim, setTrim] = useState(true)
  const [removeBlank, setRemoveBlank] = useState(true)
  const [copied, setCopied] = useState(false)

  const lines = text.length ? text.split('\n') : []
  const seen = new Set()
  const out = []
  for (let line of lines) {
    let key = trim ? line.trim() : line
    if (removeBlank && key === '') continue
    const cmp = ignoreCase ? key.toLowerCase() : key
    if (seen.has(cmp)) continue
    seen.add(cmp)
    out.push(trim ? key : line)
  }
  const output = out.join('\n')
  const removed = lines.length - out.length

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Remove duplicate lines from a list, with options to ignore case, trim whitespace, and drop blank lines."
      toolId="remove-duplicate-lines"
      about={ABOUT}
    >
      <div className="card mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">Your list (one item per line)</label>
        <textarea className="input text-sm min-h-[140px]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your list here…" />
      </div>

      <div className="card mb-4">
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} /> Ignore case
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} /> Trim whitespace
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <input type="checkbox" checked={removeBlank} onChange={(e) => setRemoveBlank(e.target.checked)} /> Remove blank lines
          </label>
        </div>
        {text && <p className="text-xs text-zinc-500 mt-3">{out.length} unique line{out.length !== 1 ? 's' : ''} · {removed} removed</p>}
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

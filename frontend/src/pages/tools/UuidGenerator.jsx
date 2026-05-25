import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, RefreshCw, Trash2 } from 'lucide-react'

const ABOUT = [
  'UUID Generator creates cryptographically random version 4 UUIDs using the browser\'s built-in crypto.randomUUID() API.',
  'UUIDs (Universally Unique Identifiers) are 128-bit IDs used in databases, APIs, and distributed systems to ensure uniqueness without a central authority.',
  'Generate a single UUID or a batch of up to 100 at once. Copy individual UUIDs or copy the entire list.',
]

export default function UuidGenerator() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState([])
  const [format, setFormat] = useState('standard')
  const [copied, setCopied] = useState(null)

  function generate() {
    const list = Array.from({ length: count }, () => {
      const id = crypto.randomUUID()
      if (format === 'upper') return id.toUpperCase()
      if (format === 'nohyphen') return id.replace(/-/g, '')
      if (format === 'braces') return `{${id}}`
      return id
    })
    setUuids(list)
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text)
    setCopied(key); setTimeout(() => setCopied(null), 1500)
  }

  function copyAll() {
    copy(uuids.join('\n'), 'all')
  }

  return (
    <ToolLayout title="UUID Generator" description="Generate cryptographically random v4 UUIDs instantly. Single or batch up to 100." toolId="uuid-generator" about={ABOUT}>
      <div className="card mb-4 space-y-4">
        <div className="flex items-end gap-4 flex-wrap">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Number of UUIDs</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setCount(c => Math.max(1, c - 1))} className="btn-ghost px-2 py-1 text-sm">−</button>
              <input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={e => setCount(Math.min(100, Math.max(1, +e.target.value || 1)))}
                className="input w-20 text-center"
              />
              <button onClick={() => setCount(c => Math.min(100, c + 1))} className="btn-ghost px-2 py-1 text-sm">+</button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Format</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'standard', label: 'Standard' },
                { value: 'upper', label: 'UPPERCASE' },
                { value: 'nohyphen', label: 'No Hyphens' },
                { value: 'braces', label: '{Braces}' },
              ].map(f => (
                <button key={f.value} onClick={() => setFormat(f.value)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${format === f.value ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <button className="btn-primary" onClick={generate}>
          <RefreshCw size={15} /> Generate
        </button>
        {uuids.length > 1 && (
          <button className="btn-secondary" onClick={copyAll}>
            {copied === 'all' ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />} Copy All
          </button>
        )}
        {uuids.length > 0 && (
          <button className="btn-ghost" onClick={() => setUuids([])}>
            <Trash2 size={15} /> Clear
          </button>
        )}
      </div>
      {uuids.length > 0 && (
        <div className="space-y-1.5">
          {uuids.map((id, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 bg-zinc-800/60 border border-zinc-700 rounded-lg group">
              <span className="text-xs text-zinc-600 w-6 text-right shrink-0">{i + 1}</span>
              <span className="flex-1 text-sm text-zinc-200 font-mono">{id}</span>
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity btn-ghost py-1 px-2 text-xs"
                onClick={() => copy(id, i)}
              >
                {copied === i ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  )
}

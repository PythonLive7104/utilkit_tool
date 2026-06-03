import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, Download } from 'lucide-react'

const ABOUT = [
  'CSV to JSON Converter turns comma-separated data into a clean JSON array of objects, using the first row as keys.',
  'It handles quoted fields, escaped quotes, and commas inside quotes, and lets you pick the delimiter (comma, semicolon, or tab).',
  'Conversion runs entirely in your browser — your data is never uploaded.',
]

function parseCSV(text, delim) {
  const rows = []
  let row = [], field = '', inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQuotes = false
      } else field += c
    } else {
      if (c === '"') inQuotes = true
      else if (c === delim) { row.push(field); field = '' }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (c === '\r') { /* skip */ }
      else field += c
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  return rows.filter(r => r.length > 1 || (r.length === 1 && r[0] !== ''))
}

function maybeNumber(v) {
  if (v !== '' && !isNaN(v) && /^-?\d*\.?\d+$/.test(v.trim())) return Number(v)
  return v
}

export default function CsvToJson() {
  const [input, setInput] = useState('name,age,city\nAlice,30,London\nBob,25,Paris')
  const [delim, setDelim] = useState(',')
  const [castNumbers, setCast] = useState(true)
  const [copied, setCopied] = useState(false)

  let output = '', error = ''
  try {
    if (input.trim()) {
      const rows = parseCSV(input, delim)
      if (rows.length < 1) throw new Error('No data')
      const headers = rows[0]
      const objects = rows.slice(1).map(r => {
        const o = {}
        headers.forEach((h, i) => {
          const val = r[i] ?? ''
          o[h] = castNumbers ? maybeNumber(val) : val
        })
        return o
      })
      output = JSON.stringify(objects, null, 2)
    }
  } catch (e) {
    error = 'Could not parse CSV. Check your delimiter and formatting.'
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }
  function download() {
    const blob = new Blob([output], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'data.json'; a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <ToolLayout
      title="CSV to JSON Converter"
      description="Convert CSV data into a JSON array of objects. Handles quoted fields, custom delimiters, and number casting."
      toolId="csv-to-json"
      about={ABOUT}
    >
      <div className="card mb-4">
        <div className="flex items-center gap-4 flex-wrap mb-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-500">Delimiter</label>
            <select className="input w-auto py-1.5" value={delim} onChange={e => setDelim(e.target.value)}>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value={'\t'}>Tab</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
            <input type="checkbox" checked={castNumbers} onChange={e => setCast(e.target.checked)} className="accent-indigo-500" />
            Convert numeric values to numbers
          </label>
        </div>
        <textarea className="input font-mono text-sm min-h-[140px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Paste CSV here…" />
      </div>

      {error && <p className="text-sm text-rose-400 mb-4">{error}</p>}

      {output && !error && (
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-indigo-400">JSON output</span>
            <div className="flex gap-2">
              <button className="btn-ghost py-1 px-2 text-xs" onClick={copy}>{copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}</button>
              <button className="btn-ghost py-1 px-2 text-xs" onClick={download}><Download size={12} /></button>
            </div>
          </div>
          <pre className="text-xs text-zinc-200 font-mono overflow-x-auto max-h-[400px]">{output}</pre>
        </div>
      )}
    </ToolLayout>
  )
}

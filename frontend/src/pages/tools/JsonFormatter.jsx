import { useState, useRef, useMemo } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, Upload, Download, AlertCircle, CheckCircle2, BarChart2 } from 'lucide-react'

const ABOUT = [
  'JSON Formatter prettifies, minifies, and validates JSON in your browser. Paste raw JSON from an API, a config file, or a database response to instantly make it readable.',
  'The sort keys option recursively alphabetizes all object keys — useful for comparing two JSON blobs that have the same data but in different key orders, or for producing deterministic output.',
  'The stats panel counts every value type in the JSON tree: strings, numbers, booleans, nulls, arrays, and objects. It also reports the total key count and nesting depth — helpful for understanding large or complex payloads.',
  'All processing is done entirely in your browser using the native JSON.parse() and JSON.stringify() APIs. No data ever leaves your machine.',
]

function getStats(obj, depth = 0) {
  const stats = { strings: 0, numbers: 0, booleans: 0, nulls: 0, arrays: 0, objects: 0, keys: 0, depth }
  function walk(val, d) {
    if (Array.isArray(val)) {
      stats.arrays++
      if (d > stats.depth) stats.depth = d
      val.forEach((v) => walk(v, d + 1))
    } else if (val === null) {
      stats.nulls++
    } else if (typeof val === 'object') {
      stats.objects++
      if (d > stats.depth) stats.depth = d
      const keys = Object.keys(val)
      stats.keys += keys.length
      keys.forEach((k) => walk(val[k], d + 1))
    } else if (typeof val === 'string') {
      stats.strings++
    } else if (typeof val === 'number') {
      stats.numbers++
    } else if (typeof val === 'boolean') {
      stats.booleans++
    }
  }
  walk(obj, 0)
  return stats
}

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const [sortKeys, setSortKeys] = useState(false)
  const [copied, setCopied] = useState(false)
  const [valid, setValid] = useState(null)
  const [parsedData, setParsedData] = useState(null)
  const [showStats, setShowStats] = useState(false)
  const inputRef = useRef()

  function parse() {
    try {
      return JSON.parse(input)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  function sortObject(obj) {
    if (Array.isArray(obj)) return obj.map(sortObject)
    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).sort().reduce((acc, k) => { acc[k] = sortObject(obj[k]); return acc }, {})
    }
    return obj
  }

  function prettify() {
    try {
      let parsed = parse()
      setParsedData(parsed)
      if (sortKeys) parsed = sortObject(parsed)
      const spaces = indent === 0 ? '\t' : indent
      setOutput(JSON.stringify(parsed, null, spaces))
      setError(''); setValid(true)
    } catch (e) {
      setError(e.message); setValid(false); setOutput(''); setParsedData(null)
    }
  }

  function minify() {
    try {
      const parsed = parse()
      setParsedData(parsed)
      setOutput(JSON.stringify(parsed))
      setError(''); setValid(true)
    } catch (e) {
      setError(e.message); setValid(false); setOutput(''); setParsedData(null)
    }
  }

  function validate() {
    try {
      const parsed = parse()
      setParsedData(parsed)
      setError(''); setValid(true); setOutput('')
    } catch (e) {
      setError(e.message); setValid(false); setParsedData(null)
    }
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function download() {
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'formatted.json'; a.click()
    URL.revokeObjectURL(url)
  }

  function loadFile(e) {
    const f = e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = (ev) => setInput(ev.target.result)
    reader.readAsText(f)
  }

  const stats = useMemo(() => parsedData !== null ? getStats(parsedData) : null, [parsedData])

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Prettify, minify, and validate JSON. Syntax checking with error position. All client-side."
      toolId="json-formatter"
      about={ABOUT}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex gap-1.5">
          {[
            { label: 'Prettify', fn: prettify },
            { label: 'Minify', fn: minify },
            { label: 'Validate', fn: validate },
          ].map(({ label, fn }) => (
            <button key={label} onClick={fn} disabled={!input.trim()} className="btn-secondary text-sm px-3 py-1.5">
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs text-zinc-500">Indent:</label>
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="input w-auto text-sm py-1">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Tab</option>
          </select>
        </div>

        <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={sortKeys} onChange={() => setSortKeys(!sortKeys)} className="accent-indigo-500" />
          Sort keys
        </label>

        {stats && (
          <button className={`btn-ghost text-xs ${showStats ? 'text-indigo-400' : ''}`} onClick={() => setShowStats(!showStats)}>
            <BarChart2 size={13} /> Stats
          </button>
        )}

        <label className="btn-ghost text-xs cursor-pointer">
          <Upload size={13} /> Load file
          <input type="file" accept=".json,text/plain" className="hidden" onChange={loadFile} ref={inputRef} />
        </label>
      </div>

      {valid === true && !error && (
        <div className="flex items-center gap-2 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs mb-4">
          <CheckCircle2 size={13} /> Valid JSON
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
          <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
          <code className="text-xs font-mono">{error}</code>
        </div>
      )}

      {showStats && stats && (
        <div className="card mb-4">
          <p className="text-xs text-zinc-500 mb-3 font-medium">JSON Structure Stats</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {[
              { label: 'Keys', value: stats.keys, color: 'text-indigo-400' },
              { label: 'Depth', value: stats.depth, color: 'text-purple-400' },
              { label: 'Objects', value: stats.objects, color: 'text-sky-400' },
              { label: 'Arrays', value: stats.arrays, color: 'text-cyan-400' },
              { label: 'Strings', value: stats.strings, color: 'text-emerald-400' },
              { label: 'Numbers', value: stats.numbers, color: 'text-amber-400' },
              { label: 'Booleans', value: stats.booleans, color: 'text-rose-400' },
              { label: 'Nulls', value: stats.nulls, color: 'text-zinc-500' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center p-2 bg-zinc-800/50 rounded-lg">
                <p className={`text-lg font-bold ${color}`}>{value}</p>
                <p className="text-xs text-zinc-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`grid gap-4 ${output ? 'lg:grid-cols-2' : ''}`}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-zinc-500">Input</label>
            <span className="text-xs text-zinc-600">{input.length.toLocaleString()} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setValid(null); setError(''); setParsedData(null) }}
            placeholder={'{\n  "key": "value"\n}'}
            rows={18}
            className="textarea text-xs leading-relaxed"
            spellCheck={false}
          />
        </div>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-zinc-500">Output</label>
              <div className="flex gap-2">
                <button className="btn-ghost text-xs py-1 px-2" onClick={download}>
                  <Download size={12} /> .json
                </button>
                <button className="btn-ghost text-xs py-1 px-2" onClick={copy}>
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              rows={18}
              className="textarea text-xs leading-relaxed bg-zinc-950"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

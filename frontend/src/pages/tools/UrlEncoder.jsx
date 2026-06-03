import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, ArrowDownUp } from 'lucide-react'

const ABOUT = [
  'URL Encoder / Decoder percent-encodes text so it is safe to use inside a URL, query string, or form data — and decodes encoded URLs back to readable text.',
  'Encoding replaces reserved and unsafe characters (spaces, &, ?, /, #, and non-ASCII) with %XX escape sequences.',
  'Choose component encoding (encodeURIComponent) for query values, or full-URL encoding (encodeURI) to preserve the URL structure. Runs entirely in your browser.',
]

export default function UrlEncoder() {
  const [mode, setMode] = useState('encode')
  const [component, setComponent] = useState(true)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  let output = ''
  let error = ''
  try {
    if (input) {
      if (mode === 'encode') {
        output = component ? encodeURIComponent(input) : encodeURI(input)
      } else {
        output = component ? decodeURIComponent(input) : decodeURI(input)
      }
    }
  } catch (e) {
    error = 'Invalid input for decoding (malformed % sequence).'
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      title="URL Encoder / Decoder"
      description="Percent-encode text for safe use in URLs and query strings, or decode encoded URLs back to readable text."
      toolId="url-encoder"
      about={ABOUT}
    >
      <div className="card mb-4">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div className="flex gap-2">
            {['encode', 'decode'].map(m => (
              <button key={m} onClick={() => setMode(m)} className={`px-3 py-1.5 text-sm rounded-lg border capitalize transition-colors ${mode === m ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{m}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
            <input type="checkbox" checked={component} onChange={e => setComponent(e.target.checked)} className="accent-indigo-500" />
            Component encoding (query values)
          </label>
        </div>
        <textarea
          className="input font-mono text-sm min-h-[120px]"
          placeholder={mode === 'encode' ? 'Type text or a URL to encode…' : 'Paste an encoded URL to decode…'}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-rose-400 mb-4">{error}</p>}

      {output && !error && (
        <div className="card">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-indigo-400 capitalize">{mode}d output</span>
            <button className="btn-ghost py-1 px-2 text-xs" onClick={copy}>
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          </div>
          <p className="text-sm text-zinc-200 font-mono break-all">{output}</p>
        </div>
      )}
    </ToolLayout>
  )
}

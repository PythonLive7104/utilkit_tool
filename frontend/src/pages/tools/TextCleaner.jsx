import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, Sparkles } from 'lucide-react'

const ABOUT = [
  'Text Cleaner tidies up messy text by removing extra spaces, blank lines, line breaks, and special characters in one click.',
  'It is perfect for cleaning text copied from PDFs, emails, or websites that arrives with broken formatting.',
  'Toggle exactly which clean-up rules to apply. Everything runs in your browser.',
]

const OPTIONS = [
  { key: 'trim', label: 'Trim leading/trailing spaces on each line' },
  { key: 'extraSpaces', label: 'Collapse multiple spaces into one' },
  { key: 'lineBreaks', label: 'Remove all line breaks (join into one paragraph)' },
  { key: 'blankLines', label: 'Remove blank lines' },
  { key: 'tabs', label: 'Convert tabs to spaces' },
  { key: 'special', label: 'Remove non-printable/special characters' },
  { key: 'lower', label: 'Convert to lowercase' },
]

export default function TextCleaner() {
  const [input, setInput] = useState('')
  const [opts, setOpts] = useState({ trim: true, extraSpaces: true, blankLines: true, tabs: true })
  const [copied, setCopied] = useState(false)

  function clean(text) {
    let t = text
    if (opts.tabs) t = t.replace(/\t/g, ' ')
    if (opts.special) t = t.replace(/[^\x20-\x7E\n\r]/g, '')
    if (opts.extraSpaces) t = t.replace(/ {2,}/g, ' ')
    if (opts.trim) t = t.split('\n').map(l => l.trim()).join('\n')
    if (opts.blankLines) t = t.replace(/\n\s*\n+/g, '\n')
    if (opts.lineBreaks) t = t.replace(/\s*\n\s*/g, ' ').trim()
    if (opts.lower) t = t.toLowerCase()
    return t
  }

  const output = clean(input)

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      title="Text Cleaner"
      description="Remove extra spaces, blank lines, line breaks, and special characters from messy text in one click."
      toolId="text-cleaner"
      about={ABOUT}
    >
      <div className="card mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">Input text</label>
        <textarea className="input text-sm min-h-[140px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your messy text here…" />
      </div>

      <div className="card mb-4">
        <p className="text-xs text-zinc-500 mb-2">Clean-up options</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {OPTIONS.map(o => (
            <label key={o.key} className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
              <input type="checkbox" className="accent-indigo-500" checked={!!opts[o.key]} onChange={e => setOpts(p => ({ ...p, [o.key]: e.target.checked }))} />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      {input && (
        <div className="card">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5"><Sparkles size={12} /> Cleaned text</span>
            <button className="btn-ghost py-1 px-2 text-xs" onClick={copy}>{copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}</button>
          </div>
          <pre className="text-sm text-zinc-200 whitespace-pre-wrap break-words">{output}</pre>
        </div>
      )}
    </ToolLayout>
  )
}

import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Find and Replace swaps every occurrence of a word or phrase in your text with another, all at once.',
  'Turn on case-insensitive matching, or enable regular expressions for advanced find-and-replace patterns.',
  'It counts how many replacements were made and runs entirely in your browser — your text is never uploaded.',
]

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default function FindAndReplace() {
  const [text, setText] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [caseInsensitive, setCaseInsensitive] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [copied, setCopied] = useState(false)

  let output = text
  let count = 0
  let error = ''

  if (find) {
    try {
      const flags = 'g' + (caseInsensitive ? 'i' : '')
      const pattern = useRegex ? find : escapeRegExp(find)
      const re = new RegExp(pattern, flags)
      count = (text.match(re) || []).length
      output = text.replace(re, replace)
    } catch {
      error = 'Invalid regular expression.'
    }
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      title="Find and Replace"
      description="Find and replace all occurrences of text, with optional case-insensitive matching and regular expressions."
      toolId="find-and-replace"
      about={ABOUT}
    >
      <div className="card mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">Your text</label>
        <textarea className="input text-sm min-h-[140px]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text here…" />
      </div>

      <div className="card mb-4 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Find</label>
            <input className="input" value={find} onChange={(e) => setFind(e.target.value)} placeholder="Text to find" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Replace with</label>
            <input className="input" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replacement text" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <input type="checkbox" checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} />
            Case-insensitive
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} />
            Regular expression
          </label>
        </div>
        {error && <p className="text-sm text-rose-500">{error}</p>}
        {find && !error && <p className="text-xs text-zinc-500">{count} match{count !== 1 ? 'es' : ''} replaced.</p>}
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

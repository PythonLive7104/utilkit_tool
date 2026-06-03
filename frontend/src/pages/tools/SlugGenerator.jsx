import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Slug Generator converts any title or sentence into a clean, URL-friendly slug — lowercase, hyphen-separated, and free of accents and special characters.',
  'Good slugs make URLs readable and SEO-friendly. This tool transliterates accented letters (é → e), strips punctuation, and collapses spaces into hyphens.',
  'Choose your separator and case. Everything runs in your browser.',
]

function slugify(text, { sep, lower, strip }) {
  let t = text.normalize('NFKD').replace(/[̀-ͯ]/g, '') // remove accents
  if (lower) t = t.toLowerCase()
  t = t.replace(/[^a-zA-Z0-9\s-_]/g, strip ? '' : ' ')
  t = t.trim().replace(/[\s_-]+/g, sep)
  t = t.replace(new RegExp(`^${sep}+|${sep}+$`, 'g'), '')
  return t
}

export default function SlugGenerator() {
  const [input, setInput] = useState('10 Best Tips for Café Owners in 2026!')
  const [sep, setSep] = useState('-')
  const [lower, setLower] = useState(true)
  const [copied, setCopied] = useState(false)

  const slug = slugify(input, { sep, lower, strip: true })

  function copy() {
    navigator.clipboard.writeText(slug)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      title="Slug Generator"
      description="Turn any title into a clean, SEO-friendly URL slug. Removes accents and special characters automatically."
      toolId="slug-generator"
      about={ABOUT}
    >
      <div className="card mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">Title or text</label>
        <textarea className="input text-sm min-h-[80px]" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a title…" />
      </div>

      <div className="card mb-4 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500">Separator</label>
          <select className="input w-auto py-1.5" value={sep} onChange={e => setSep(e.target.value)}>
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
          <input type="checkbox" className="accent-indigo-500" checked={lower} onChange={e => setLower(e.target.checked)} />
          Lowercase
        </label>
      </div>

      {slug && (
        <div className="card flex items-center justify-between gap-3">
          <p className="text-sm text-indigo-300 font-mono break-all">{slug}</p>
          <button className="btn-ghost py-1 px-2 text-xs shrink-0" onClick={copy}>{copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}</button>
        </div>
      )}
    </ToolLayout>
  )
}

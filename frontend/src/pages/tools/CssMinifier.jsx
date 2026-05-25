import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, Minimize2 } from 'lucide-react'

const ABOUT = [
  'CSS Minifier removes comments, whitespace, and redundant characters from CSS stylesheets to shrink file size.',
  'Minified CSS downloads faster and is commonly used as part of a production build process to improve page performance.',
  'Paste your CSS, click Minify, and copy the compact single-line output ready for deployment.',
]

function fmt(bytes) {
  if (bytes < 1024) return bytes + ' B'
  return (bytes / 1024).toFixed(1) + ' KB'
}

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')     // remove block comments
    .replace(/\s*\n\s*/g, ' ')            // collapse newlines
    .replace(/\s{2,}/g, ' ')             // collapse whitespace
    .replace(/\s*([{};:,>+~])\s*/g, '$1') // trim around special chars
    .replace(/;}/g, '}')                 // remove last semicolon in block
    .trim()
}

export default function CssMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState(null)

  function minify() {
    if (!input.trim()) return
    const result = minifyCSS(input)
    setOutput(result)
    setStats({
      before: input.length,
      after: result.length,
      pct: Math.round((1 - result.length / input.length) * 100),
      saved: input.length - result.length,
    })
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="CSS Minifier" description="Remove comments and whitespace from CSS stylesheets to reduce file size for production." toolId="css-minifier" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Original CSS</label>
          <textarea value={input} onChange={e => { setInput(e.target.value); setOutput(''); setStats(null) }} placeholder="Paste your CSS here…" rows={16} className="textarea text-sm font-mono" />
          <p className="text-xs text-zinc-600 mt-1">{input.length} chars</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">Minified CSS</label>
            {output && (
              <button className="btn-ghost text-xs py-1 px-2" onClick={copy}>
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Minified output will appear here…"
            rows={16}
            className={`textarea text-sm font-mono resize-none ${output ? 'text-zinc-200' : 'text-zinc-600'}`}
          />
          {stats && (
            <p className="text-xs text-zinc-500 mt-1">
              {fmt(stats.before)} → {fmt(stats.after)}
              <span className="text-emerald-500 ml-1">({stats.pct}% smaller, saved {fmt(stats.saved)})</span>
            </p>
          )}
        </div>
      </div>
      <button className="btn-primary mt-4" onClick={minify} disabled={!input.trim()}>
        <Minimize2 size={15} /> Minify CSS
      </button>
    </ToolLayout>
  )
}

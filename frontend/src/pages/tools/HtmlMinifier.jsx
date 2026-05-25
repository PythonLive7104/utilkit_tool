import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, Minimize2 } from 'lucide-react'

const ABOUT = [
  'HTML Minifier removes unnecessary whitespace, comments, and blank lines from HTML code to reduce file size.',
  'Smaller HTML files load faster, reducing Time to First Byte (TTFB) and improving Core Web Vitals scores.',
  'Paste your HTML, click Minify, and copy the compact output for production deployment.',
]

function fmt(bytes) {
  if (bytes < 1024) return bytes + ' B'
  return (bytes / 1024).toFixed(1) + ' KB'
}

function minifyHTML(html) {
  return html
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')   // remove HTML comments (keep IE conditionals)
    .replace(/\s*\n\s*/g, ' ')                  // collapse newlines + surrounding spaces
    .replace(/\s{2,}/g, ' ')                    // collapse multiple spaces
    .replace(/>\s+</g, '><')                    // remove space between tags
    .replace(/\s+>/g, '>')                      // trim space before >
    .replace(/<\s+/g, '<')                      // trim space after <
    .trim()
}

export default function HtmlMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState(null)

  function minify() {
    if (!input.trim()) return
    const result = minifyHTML(input)
    setOutput(result)
    setStats({
      before: input.length,
      after: result.length,
      saved: input.length - result.length,
      pct: Math.round((1 - result.length / input.length) * 100),
    })
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="HTML Minifier" description="Remove whitespace, comments, and redundant spaces from HTML to reduce file size." toolId="html-minifier" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Original HTML</label>
          <textarea value={input} onChange={e => { setInput(e.target.value); setOutput(''); setStats(null) }} placeholder="Paste your HTML here…" rows={16} className="textarea text-sm font-mono" />
          <p className="text-xs text-zinc-600 mt-1">{input.length} chars</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">Minified HTML</label>
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
        <Minimize2 size={15} /> Minify HTML
      </button>
    </ToolLayout>
  )
}

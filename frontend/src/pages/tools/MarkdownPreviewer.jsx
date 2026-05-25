import { useState, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, Eye, Code2 } from 'lucide-react'

const ABOUT = [
  'Markdown Previewer renders Markdown text to formatted HTML in real time, so you can see exactly how your content will look.',
  'Supports headings, bold, italic, lists, code blocks, blockquotes, tables, links, and images — the full CommonMark specification via the marked library.',
  'Useful for writing README files, documentation, blog posts, and any content that uses Markdown formatting.',
]

const DEMO = `# Welcome to Markdown Previewer

Write Markdown on the left — see the **live preview** on the right.

## Features

- **Bold** and *italic* text
- \`Inline code\` and code blocks
- > Blockquotes
- [Links](https://example.com)
- Ordered and unordered lists

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

## Table

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell A   | Cell B   | Cell C   |
| Cell D   | Cell E   | Cell F   |
`

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(DEMO)
  const [html, setHtml] = useState('')
  const [view, setView] = useState('split')
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    let cancelled = false
    import('marked').then(({ marked }) => {
      if (!cancelled) setHtml(marked.parse(markdown))
    })
    return () => { cancelled = true }
  }, [markdown])

  function copy(text, key) {
    navigator.clipboard.writeText(text)
    setCopied(key); setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolLayout title="Markdown Previewer" description="Write Markdown and see a live HTML preview. Supports tables, code blocks, and more." toolId="markdown-previewer" about={ABOUT}>
      <div className="flex gap-2 mb-4">
        {[
          { value: 'split', label: 'Split', icon: <Code2 size={13} /> },
          { value: 'preview', label: 'Preview', icon: <Eye size={13} /> },
        ].map(v => (
          <button key={v.value} onClick={() => setView(v.value)} className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors ${view === v.value ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
            {v.icon}{v.label}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button className="btn-ghost text-xs py-1 px-2" onClick={() => copy(markdown, 'md')}>
            {copied === 'md' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />} Copy MD
          </button>
          <button className="btn-ghost text-xs py-1 px-2" onClick={() => copy(html, 'html')}>
            {copied === 'html' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />} Copy HTML
          </button>
        </div>
      </div>
      <div className={`${view === 'split' ? 'grid lg:grid-cols-2' : ''} gap-4`}>
        {view !== 'preview' && (
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Markdown</label>
            <textarea
              value={markdown}
              onChange={e => setMarkdown(e.target.value)}
              rows={24}
              className="textarea text-sm font-mono"
            />
          </div>
        )}
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Preview</label>
          <div
            className="min-h-[200px] rounded-xl border border-zinc-700 bg-zinc-950 p-4 prose prose-sm prose-invert max-w-none overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ToolLayout>
  )
}

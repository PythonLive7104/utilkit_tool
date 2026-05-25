import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, Wand2, Minimize2 } from 'lucide-react'

const ABOUT = [
  'SQL Formatter prettifies and standardises SQL queries with consistent indentation, keyword casing, and line breaks.',
  'Paste messy, single-line, or poorly-indented SQL and get cleanly formatted output that is easy to read and review.',
  'Supports SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER, JOIN, WHERE, GROUP BY, ORDER BY, and more.',
]

const KEYWORDS = [
  'SELECT', 'DISTINCT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT',
  'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'JOIN',
  'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'DELETE',
  'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'CREATE INDEX', 'DROP INDEX',
  'UNION ALL', 'UNION', 'INTERSECT', 'EXCEPT',
  'WITH', 'AS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'EXISTS', 'IN', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL',
  'ASC', 'DESC', 'RETURNING',
]

const NEWLINE_BEFORE = new Set([
  'SELECT','FROM','WHERE','GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET',
  'INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN','CROSS JOIN','JOIN',
  'UNION ALL','UNION','INTERSECT','EXCEPT','INSERT INTO','VALUES',
  'UPDATE','SET','DELETE FROM','DELETE','CREATE TABLE','ALTER TABLE',
  'WITH','AND','OR','RETURNING',
])

function formatSQL(raw) {
  let sql = raw.trim()

  // Uppercase all keywords
  const escaped = sql.replace(/'[^']*'/g, m => '\x00'.repeat(m.length))
  let upper = sql
  for (const kw of [...KEYWORDS].sort((a, b) => b.length - a.length)) {
    const re = new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi')
    upper = upper.replace(re, kw)
  }
  sql = upper

  // Insert newlines before major keywords
  for (const kw of NEWLINE_BEFORE) {
    const re = new RegExp(`(^|\\s)(${kw.replace(/ /g, '\\s+')})\\b`, 'g')
    sql = sql.replace(re, (_, pre, match) => '\n' + match)
  }

  // Indent AND/OR inside WHERE
  sql = sql.replace(/\n(AND|OR)\b/g, '\n  $1')

  // Format commas in SELECT — add newline + indent
  let inSelect = false
  const lines = sql.split('\n').map(line => {
    const t = line.trim()
    if (t.startsWith('SELECT')) inSelect = true
    if (/^(FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|UNION|INSERT|UPDATE|DELETE|CREATE|ALTER|WITH)\b/.test(t)) inSelect = false
    if (inSelect && t !== 'SELECT' && t !== 'SELECT DISTINCT') {
      return line.replace(/,\s*/g, ',\n  ')
    }
    return line
  })
  sql = lines.join('\n')

  // Clean up extra blank lines
  sql = sql.replace(/\n{3,}/g, '\n\n').trim()

  return sql
}

export default function SqlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function format() {
    if (!input.trim()) return
    setOutput(formatSQL(input))
  }

  function minify() {
    if (!input.trim()) return
    setOutput(input.replace(/\s+/g, ' ').trim())
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="SQL Formatter" description="Format and prettify SQL queries with consistent indentation and uppercase keywords." toolId="sql-formatter" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Raw SQL</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your SQL query here…" rows={16} className="textarea text-sm font-mono" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">Formatted SQL</label>
            {output && (
              <button className="btn-ghost text-xs py-1 px-2" onClick={copy}>
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <pre className={`min-h-[224px] rounded-xl border text-sm p-3 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap ${output ? 'border-zinc-700 bg-zinc-950 text-zinc-200' : 'border-zinc-800 bg-zinc-900 text-zinc-600'}`}>
            {output || 'Formatted SQL will appear here…'}
          </pre>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button className="btn-primary" onClick={format} disabled={!input.trim()}>
          <Wand2 size={15} /> Format SQL
        </button>
        <button className="btn-secondary" onClick={minify} disabled={!input.trim()}>
          <Minimize2 size={15} /> Minify
        </button>
      </div>
    </ToolLayout>
  )
}

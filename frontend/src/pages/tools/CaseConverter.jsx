import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Case Converter transforms text into any of 13 common case formats simultaneously — from plain uppercase and lowercase to programming-specific formats like camelCase, snake_case, and CONSTANT_CASE.',
  'Programming case formats are especially useful when renaming variables, database columns, or API keys across different language conventions. Paste a name once and copy whichever variant your target language requires.',
  'ROT13 is a simple substitution cipher that rotates each letter by 13 positions. It\'s often used to obscure spoilers or puzzle answers in online communities. Applying ROT13 twice returns the original text.',
  'Reverse text flips the entire string character by character — useful for creative text effects, checking palindromes, or playing around with reflected text in designs.',
]

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
}

function toSentenceCase(str) {
  return str.toLowerCase().replace(/(^|[.!?]\s+)([a-z])/g, (m, sep, ch) => sep + ch.toUpperCase())
}

function toCamelCase(str) {
  const words = str.split(/[\s_\-./\\]+/).filter(Boolean)
  return words.map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join('')
}

function toPascalCase(str) {
  return str.split(/[\s_\-./\\]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')
}

function toSnakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').split(/[\s\-./\\]+/).filter(Boolean).join('_').toLowerCase()
}

function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').split(/[\s_./\\]+/).filter(Boolean).join('-').toLowerCase()
}

function toConstantCase(str) { return toSnakeCase(str).toUpperCase() }

function toDotCase(str) { return toSnakeCase(str).replace(/_/g, '.') }

function toAlternating(str) {
  return str.split('').map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join('')
}

function toRot13(str) {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

function toReverse(str) { return str.split('').reverse().join('') }

const CONVERSIONS = [
  { key: 'upper', label: 'UPPERCASE', fn: (s) => s.toUpperCase() },
  { key: 'lower', label: 'lowercase', fn: (s) => s.toLowerCase() },
  { key: 'title', label: 'Title Case', fn: toTitleCase },
  { key: 'sentence', label: 'Sentence case', fn: toSentenceCase },
  { key: 'camel', label: 'camelCase', fn: toCamelCase },
  { key: 'pascal', label: 'PascalCase', fn: toPascalCase },
  { key: 'snake', label: 'snake_case', fn: toSnakeCase },
  { key: 'kebab', label: 'kebab-case', fn: toKebabCase },
  { key: 'constant', label: 'CONSTANT_CASE', fn: toConstantCase },
  { key: 'dot', label: 'dot.case', fn: toDotCase },
  { key: 'alternating', label: 'aLtErNaTiNg', fn: toAlternating },
  { key: 'rot13', label: 'ROT13', fn: toRot13 },
  { key: 'reverse', label: '↩ Reverse', fn: toReverse },
]

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(null)

  function copy(text, key) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text to any case format instantly. All 13 variants shown simultaneously."
      toolId="case-converter"
      about={ABOUT}
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or paste text to convert..."
        rows={4}
        className="textarea text-sm mb-6"
      />

      {!input.trim() ? (
        <p className="text-sm text-zinc-600 text-center py-6">Enter text above to see all case variants</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CONVERSIONS.map(({ key, label, fn }) => {
            const result = fn(input)
            return (
              <div key={key} className="card group relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-500 font-mono">{label}</span>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-zinc-200"
                    onClick={() => copy(result, key)}
                  >
                    {copied === key ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-sm font-mono text-zinc-200 break-all leading-relaxed">{result}</p>
                <button
                  className="mt-2 text-xs text-zinc-600 hover:text-indigo-400 transition-colors"
                  onClick={() => setInput(result)}
                >
                  Use as input →
                </button>
              </div>
            )
          })}
        </div>
      )}
    </ToolLayout>
  )
}

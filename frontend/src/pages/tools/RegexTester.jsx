import { useState, useMemo } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Share2, Copy, Check, ChevronDown, ChevronUp, Replace } from 'lucide-react'

const PRESETS = [
  { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { label: 'URL', pattern: 'https?:\\/\\/[^\\s/$.?#].[^\\s]*', flags: 'gi' },
  { label: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}', flags: 'g' },
  { label: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])', flags: 'g' },
  { label: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b', flags: 'gi' },
]

const HIGHLIGHT_COLORS = [
  'bg-yellow-400/30 border-b-2 border-yellow-400',
  'bg-sky-400/30 border-b-2 border-sky-400',
  'bg-rose-400/30 border-b-2 border-rose-400',
  'bg-emerald-400/30 border-b-2 border-emerald-400',
  'bg-violet-400/30 border-b-2 border-violet-400',
]

const ABOUT = [
  'Regex Tester evaluates JavaScript regular expressions in real time as you type. Matches are highlighted in the test string with colour-coded spans so you can see exactly what your pattern captures.',
  'Six preset patterns (email, URL, phone, IPv4, date, hex colour) let you quickly load common expressions and modify them for your specific needs rather than writing from scratch.',
  'The Find & Replace tab applies your pattern and a replacement string across the entire test input — previewing the result before you use the regex in your code. Back-references like $1 work for captured groups.',
  'The regex cheatsheet at the bottom covers all major constructs: anchors, quantifiers, groups, character classes, and look-arounds — a quick reference without leaving the page.',
]

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testStr, setTestStr] = useState('')
  const [replacement, setReplacement] = useState('')
  const [activeTab, setActiveTab] = useState('test')
  const [showCheatsheet, setShowCheatsheet] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleFlag = (f) => {
    setFlags((prev) => prev.includes(f) ? prev.replace(f, '') : prev + f)
  }

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern) return { matches: [], error: null, highlighted: testStr }
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      const allMatches = []
      let m
      while ((m = re.exec(testStr)) !== null) {
        allMatches.push({ index: m.index, value: m[0], groups: m.slice(1) })
        if (!flags.includes('g')) break
        if (re.lastIndex === m.index) { re.lastIndex++; continue }
      }
      let result = ''
      let last = 0
      allMatches.forEach((match, i) => {
        result += escapeHtml(testStr.slice(last, match.index))
        const color = HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length]
        result += `<mark class="${color} rounded-sm px-0.5">${escapeHtml(match.value)}</mark>`
        last = match.index + match.value.length
      })
      result += escapeHtml(testStr.slice(last))
      return { matches: allMatches, error: null, highlighted: result }
    } catch (e) {
      return { matches: [], error: e.message, highlighted: escapeHtml(testStr) }
    }
  }, [pattern, flags, testStr])

  const replaceResult = useMemo(() => {
    if (!pattern || !testStr) return ''
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      return testStr.replace(re, replacement)
    } catch {
      return ''
    }
  }, [pattern, flags, testStr, replacement])

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  function shareUrl() {
    const params = new URLSearchParams({ pattern, flags, test: testStr })
    const url = `${window.location.href}?${params}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function applyPreset(p) {
    setPattern(p.pattern)
    setFlags(p.flags)
  }

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test regular expressions with live match highlighting. Supports all JavaScript regex flags."
      toolId="regex-tester"
      about={ABOUT}
    >
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-zinc-500 text-lg">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="your pattern here..."
            className="input flex-1 font-mono text-sm"
            spellCheck={false}
          />
          <span className="text-zinc-500 text-lg">/</span>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ''))}
            className="input w-16 font-mono text-sm text-center"
            maxLength={6}
            placeholder="gi"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {['g', 'i', 'm', 's', 'u'].map((f) => (
            <button key={f} onClick={() => toggleFlag(f)}
              className={`px-2 py-0.5 text-xs font-mono rounded border transition-colors ${
                flags.includes(f) ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'border-zinc-700 text-zinc-500 hover:border-zinc-600'
              }`}>
              {f}
            </button>
          ))}
          <span className="text-xs text-zinc-600 self-center ml-1">
            {['g→all', 'i→case', 'm→multiline', 's→dotall', 'u→unicode'].filter((x) => flags.includes(x[0])).join(', ')}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => applyPreset(p)}
              className="px-2 py-1 text-xs border border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 rounded transition-colors">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs mb-4 font-mono">
          Invalid regex: {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border border-zinc-700 rounded-lg overflow-hidden w-fit mb-4">
        {[{ key: 'test', label: 'Test' }, { key: 'replace', label: 'Find & Replace' }].map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`px-4 py-2 text-sm transition-colors ${activeTab === key ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'test' && (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-zinc-500">Test string</label>
              {matches.length > 0 && (
                <span className="text-xs font-semibold text-indigo-400">{matches.length} match{matches.length !== 1 ? 'es' : ''}</span>
              )}
            </div>
            <textarea
              value={testStr}
              onChange={(e) => setTestStr(e.target.value)}
              placeholder="Paste text to test against..."
              rows={6}
              className="textarea text-sm"
              spellCheck={false}
            />
          </div>

          {testStr && pattern && !error && (
            <div className="card mb-4">
              <p className="text-xs text-zinc-500 mb-2">Highlighted matches</p>
              <pre
                className="text-sm font-mono text-zinc-300 whitespace-pre-wrap break-words leading-7"
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </div>
          )}

          {matches.length > 0 && (
            <div className="card mb-4">
              <p className="text-xs text-zinc-500 mb-2">Match details</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {matches.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 py-1 px-2 rounded text-xs">
                    <span className="text-zinc-600 w-6 text-right">{i + 1}</span>
                    <code className="text-zinc-100 flex-1 font-mono">{m.value}</code>
                    <span className="text-zinc-600">@{m.index}</span>
                    {m.groups.length > 0 && (
                      <span className="text-indigo-400">[{m.groups.map((g) => JSON.stringify(g)).join(', ')}]</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'replace' && (
        <>
          <div className="grid lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Input text</label>
              <textarea
                value={testStr}
                onChange={(e) => setTestStr(e.target.value)}
                placeholder="Paste text to perform replacement on..."
                rows={8}
                className="textarea text-sm"
                spellCheck={false}
              />
            </div>
            <div>
              <div className="mb-3">
                <label className="block text-xs text-zinc-500 mb-1.5">Replacement string <span className="text-zinc-600">(use $1, $2 for groups)</span></label>
                <input
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                  placeholder="Replacement (leave empty to delete matches)"
                  className="input font-mono text-sm"
                />
              </div>
              <label className="block text-xs text-zinc-500 mb-1.5">Result preview</label>
              <textarea
                readOnly
                value={replaceResult}
                rows={5}
                className="textarea text-sm bg-zinc-950"
                spellCheck={false}
                placeholder="Result will appear here..."
              />
              {replaceResult && (
                <button className="btn-ghost text-xs mt-2" onClick={() => navigator.clipboard.writeText(replaceResult)}>
                  <Copy size={12} /> Copy result
                </button>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-2 mb-6">
        <button className="btn-ghost text-xs" onClick={shareUrl}>
          {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      <div>
        <button className="btn-ghost text-xs" onClick={() => setShowCheatsheet(!showCheatsheet)}>
          {showCheatsheet ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          Regex cheatsheet
        </button>
        {showCheatsheet && (
          <div className="mt-3 card grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
            {[
              ['.', 'Any character'], ['\\d', 'Digit [0-9]'], ['\\w', 'Word [a-zA-Z0-9_]'],
              ['\\s', 'Whitespace'], ['^', 'Start of line'], ['$', 'End of line'],
              ['*', '0 or more'], ['+', '1 or more'], ['?', '0 or 1'],
              ['{n,m}', 'n to m times'], ['(abc)', 'Capture group'], ['(?:abc)', 'Non-capturing'],
              ['[abc]', 'Character class'], ['[^abc]', 'Negated class'], ['a|b', 'a or b'],
              ['(?=abc)', 'Lookahead'], ['(?!abc)', 'Neg. lookahead'], ['\\b', 'Word boundary'],
            ].map(([sym, desc]) => (
              <div key={sym} className="flex items-center gap-2">
                <code className="text-indigo-300 w-16">{sym}</code>
                <span className="text-zinc-500">{desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

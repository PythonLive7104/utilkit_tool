import { useState, useMemo } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, Download, Columns, AlignLeft } from 'lucide-react'

const ABOUT = [
  'Code Diff Checker compares two blocks of text line by line using the LCS (Longest Common Subsequence) algorithm — the same technique used by git diff. Added lines appear in green, removed lines in red.',
  'Split view shows original and modified side by side for easy editing. Unified view displays the full diff inline, which is more compact when reviewing large changesets.',
  'The ignore whitespace option trims leading and trailing spaces from each line before comparing — useful when code has been reformatted or indented differently without logic changes.',
  'Download the result as a .patch file in standard unified diff format that can be applied with the `patch` command or shared for code review without exposing the full source.',
]

export default function CodeDiff() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [splitView, setSplitView] = useState(true)
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)

  const diff = useMemo(() => {
    if (!original && !modified) return []
    return computeDiff(original, modified, ignoreWhitespace)
  }, [original, modified, ignoreWhitespace])

  const stats = useMemo(() => {
    const added = diff.filter((l) => l.type === 'add').length
    const removed = diff.filter((l) => l.type === 'remove').length
    return { added, removed }
  }, [diff])

  function loadFile(side, e) {
    const f = e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (side === 'original') setOriginal(ev.target.result)
      else setModified(ev.target.result)
    }
    reader.readAsText(f)
  }

  function downloadPatch() {
    const lines = diff.map((l) => {
      if (l.type === 'add') return `+ ${l.content}`
      if (l.type === 'remove') return `- ${l.content}`
      return `  ${l.content}`
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'changes.patch'; a.click()
    URL.revokeObjectURL(url)
  }

  const inputArea = (label, value, set, side) => (
    <div key={side}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs text-zinc-500">{label}</label>
        <label className="btn-ghost text-xs cursor-pointer py-1 px-2">
          <Upload size={11} /> Load
          <input type="file" className="hidden" onChange={(e) => loadFile(side, e)} />
        </label>
      </div>
      <textarea
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder={`Paste ${label.toLowerCase()} code here...`}
        rows={12}
        className="textarea text-xs leading-relaxed"
        spellCheck={false}
      />
    </div>
  )

  return (
    <ToolLayout
      title="Code Diff Checker"
      description="Compare two code blocks line by line. Added lines in green, removed in red."
      toolId="code-diff"
      about={ABOUT}
    >
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <button onClick={() => setSplitView(!splitView)} className="btn-secondary text-xs">
          {splitView ? <AlignLeft size={13} /> : <Columns size={13} />}
          {splitView ? 'Unified view' : 'Split view'}
        </button>

        <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={ignoreWhitespace} onChange={() => setIgnoreWhitespace(!ignoreWhitespace)} className="accent-indigo-500" />
          Ignore leading/trailing whitespace
        </label>

        {(stats.added > 0 || stats.removed > 0) && (
          <div className="flex items-center gap-3 text-xs ml-auto">
            <span className="text-emerald-400">+{stats.added} added</span>
            <span className="text-red-400">−{stats.removed} removed</span>
          </div>
        )}

        {diff.length > 0 && (
          <button className="btn-ghost text-xs" onClick={downloadPatch}>
            <Download size={13} /> Download .patch
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        {inputArea('Original', original, setOriginal, 'original')}
        {inputArea('Modified', modified, setModified, 'modified')}
      </div>

      {diff.length > 0 && (
        <div className="card overflow-hidden">
          <p className="text-xs text-zinc-500 mb-3">Diff</p>
          {diff.every((l) => l.type === 'unchanged') ? (
            <p className="text-sm text-zinc-500 text-center py-4">No differences found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse">
                <tbody>
                  {diff.map((line, i) => (
                    <DiffLine key={i} line={line} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {(!original && !modified) && (
        <div className="text-center py-10 text-zinc-600 text-sm">
          Paste code into both panels to see the diff
        </div>
      )}
    </ToolLayout>
  )
}

function DiffLine({ line }) {
  const bg = line.type === 'add' ? 'bg-emerald-500/10' : line.type === 'remove' ? 'bg-red-500/10' : ''
  const symbol = line.type === 'add' ? '+' : line.type === 'remove' ? '−' : ' '
  const textColor = line.type === 'add' ? 'text-emerald-400' : line.type === 'remove' ? 'text-red-400' : 'text-zinc-500'

  return (
    <tr className={bg}>
      <td className={`px-2 py-0.5 select-none w-6 text-center ${textColor}`}>{symbol}</td>
      <td className={`px-2 py-0.5 ${line.type === 'unchanged' ? 'text-zinc-400' : line.type === 'add' ? 'text-emerald-300' : 'text-red-300'} whitespace-pre`}>
        {line.content || ' '}
      </td>
    </tr>
  )
}

function computeDiff(a, b, ignoreWs = false) {
  const normalize = (s) => ignoreWs ? s.trim() : s
  const aLines = a.split('\n')
  const bLines = b.split('\n')
  const result = []

  const m = aLines.length
  const n = bLines.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = normalize(aLines[i - 1]) === normalize(bLines[j - 1])
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  function trace(i, j) {
    if (i === 0 && j === 0) return
    if (i > 0 && j > 0 && normalize(aLines[i - 1]) === normalize(bLines[j - 1])) {
      trace(i - 1, j - 1)
      result.push({ type: 'unchanged', content: aLines[i - 1] })
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      trace(i, j - 1)
      result.push({ type: 'add', content: bLines[j - 1] })
    } else {
      trace(i - 1, j)
      result.push({ type: 'remove', content: aLines[i - 1] })
    }
  }

  trace(m, n)
  return result
}

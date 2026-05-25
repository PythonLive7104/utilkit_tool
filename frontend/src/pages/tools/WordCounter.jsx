import { useState, useMemo } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Download } from 'lucide-react'

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by','from',
  'is','are','was','were','be','been','being','have','has','had','do','does','did',
  'will','would','could','should','may','might','shall','can','need','dare','ought',
  'i','you','he','she','it','we','they','me','him','her','us','them','my','your',
  'his','its','our','their','this','that','these','those','not','no','nor','so','yet',
])

const ABOUT = [
  'Word Counter analyses text in real time and reports word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading and speaking times.',
  'Reading time is estimated at 200 words per minute (average adult silent reading speed). Speaking time uses 130 words per minute — a comfortable presentation pace. Both are rough guides, not precise measurements.',
  'The Flesch-Kincaid Reading Ease score rates how easy the text is to read on a 0–100 scale. Scores above 70 are easy for most adults; below 30 is university-level difficulty. The score considers average sentence length and syllable count per word.',
  'The keyword density panel lists the top 10 most-used words after filtering out common stop words (the, a, in, etc.), giving you a quick view of which concepts dominate your text.',
]

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!word) return 0
  if (word.length <= 3) return 1
  word = word.replace(/e$/, '')
  const m = word.match(/[aeiouy]+/g)
  return m ? Math.max(1, m.length) : 1
}

function fleschKincaid(words, sentences, syllables) {
  if (!words || !sentences) return null
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  const clamped = Math.max(0, Math.min(100, score))
  let label, color
  if (clamped >= 90) { label = 'Very Easy'; color = 'text-emerald-400' }
  else if (clamped >= 70) { label = 'Easy'; color = 'text-emerald-400' }
  else if (clamped >= 60) { label = 'Standard'; color = 'text-amber-400' }
  else if (clamped >= 50) { label = 'Fairly Difficult'; color = 'text-amber-500' }
  else if (clamped >= 30) { label = 'Difficult'; color = 'text-red-400' }
  else { label = 'Very Difficult'; color = 'text-red-500' }
  return { score: clamped.toFixed(1), label, color }
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const [target, setTarget] = useState('')

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/) : []
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length || (text.trim() ? 1 : 0)
    const readingTime = Math.max(1, Math.ceil(words.length / 200))
    const speakingTime = Math.max(1, Math.ceil(words.length / 130))

    const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0)
    const fk = fleschKincaid(words.length, sentences, totalSyllables)

    const freq = {}
    words.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '')
      if (clean && !STOP_WORDS.has(clean)) freq[clean] = (freq[clean] || 0) + 1
    })
    const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10)

    return { wordCount: words.length, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime, topWords, fk, totalSyllables }
  }, [text])

  const targetNum = parseInt(target)
  const hasTarget = !isNaN(targetNum) && targetNum > 0
  const progress = hasTarget ? Math.min(100, (stats.wordCount / targetNum) * 100) : 0

  function exportCsv() {
    const rows = [
      ['Metric', 'Value'],
      ['Words', stats.wordCount],
      ['Characters', stats.chars],
      ['Characters (no spaces)', stats.charsNoSpace],
      ['Sentences', stats.sentences],
      ['Paragraphs', stats.paragraphs],
      ['Syllables', stats.totalSyllables],
      ['Reading time (min)', stats.readingTime],
      ['Speaking time (min)', stats.speakingTime],
      stats.fk ? ['Flesch-Kincaid score', stats.fk.score] : null,
      stats.fk ? ['Readability', stats.fk.label] : null,
    ].filter(Boolean)
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'word_stats.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Word Counter"
      description="Real-time word count, character count, sentences, paragraphs, readability score, and reading time."
      toolId="word-counter"
      about={ABOUT}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">Your text</label>
            {text && <button className="btn-ghost text-xs" onClick={() => setText('')}>Clear</button>}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            rows={18}
            className="textarea text-sm leading-relaxed"
          />
        </div>

        <div className="space-y-3">
          {[
            { label: 'Words', value: stats.wordCount.toLocaleString(), highlight: true },
            { label: 'Characters', value: stats.chars.toLocaleString() },
            { label: 'Chars (no spaces)', value: stats.charsNoSpace.toLocaleString() },
            { label: 'Sentences', value: stats.sentences.toLocaleString() },
            { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
            { label: 'Reading time', value: `~${stats.readingTime} min` },
            { label: 'Speaking time', value: `~${stats.speakingTime} min` },
          ].map(({ label, value, highlight }) => (
            <div key={label} className={`card py-3 ${highlight ? 'border-indigo-500/30' : ''}`}>
              <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
              <p className={`text-xl font-bold ${highlight ? 'text-indigo-400' : 'text-zinc-100'}`}>{value}</p>
            </div>
          ))}

          {stats.fk && (
            <div className="card py-3 border-purple-500/30">
              <p className="text-xs text-zinc-500 mb-0.5">Readability (Flesch-Kincaid)</p>
              <p className={`text-xl font-bold ${stats.fk.color}`}>{stats.fk.score}</p>
              <p className={`text-xs mt-0.5 ${stats.fk.color}`}>{stats.fk.label}</p>
            </div>
          )}

          <div className="card">
            <label className="block text-xs text-zinc-500 mb-2">Word target</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 2000"
              className="input text-sm mb-2"
            />
            {hasTarget && (
              <>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full transition-all ${progress >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500">
                  {stats.wordCount} / {targetNum} words ({progress.toFixed(0)}%)
                </p>
              </>
            )}
          </div>

          <button className="btn-secondary text-xs w-full" onClick={exportCsv} disabled={!text.trim()}>
            <Download size={13} /> Export stats CSV
          </button>
        </div>
      </div>

      {stats.topWords.length > 0 && (
        <div className="card mt-6">
          <p className="text-sm font-medium text-zinc-300 mb-3">Top words (excluding stop words)</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {stats.topWords.map(([word, count]) => (
              <div key={word} className="flex items-center justify-between px-2 py-1 bg-zinc-800 rounded text-xs">
                <span className="text-zinc-300 truncate">{word}</span>
                <span className="text-zinc-500 ml-1">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

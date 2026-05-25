import { useState, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { RefreshCw, Copy, Check } from 'lucide-react'

const LOREM_WORDS = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do',
  'eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim',
  'ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi',
  'aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit',
  'voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint',
  'occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt',
  'mollit','anim','id','est','laborum','curabitur','pretium','tincidunt','lacus',
  'nunc','pulvinar','sapien','ligula','egestas','rutrum','eros','mauris','blandit',
  'porta','facilisis','varius','tempus','vitae','accumsan','neque','volutpat','justo',
]

const BUZZ_SUBJECTS = ['our platform','the ecosystem','key stakeholders','the team','our solution','the roadmap','the pipeline','our value proposition','the core product']
const BUZZ_VERBS = ['leverages','disrupts','synergizes','pivots toward','unlocks','activates','scales','reimagines','optimizes','gamifies']
const BUZZ_OBJECTS = ['synergies','paradigm shifts','actionable insights','scalable solutions','holistic frameworks','north-star metrics','seamless experiences','bleeding-edge technology','low-hanging fruit','the agile mindset','cross-functional alignment','data-driven narratives']
const BUZZ_ADVERBS = ['proactively','strategically','disruptively','holistically','iteratively','collaboratively','organically','exponentially']

const CLASSIC_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const ABOUT = [
  'Lorem Ipsum Generator produces placeholder text for mockups, wireframes, layouts, and design templates where the actual content isn\'t ready yet.',
  'Classic Lorem Ipsum traces back to a scrambled passage from Cicero\'s "de Finibus Bonorum et Malorum" (45 BC). Design tools have used it since the 1960s because it mimics the natural look of real text without distracting the viewer with readable content.',
  'Corporate Buzzword mode generates satirical startup-speak sentences — useful for internal memes, placeholder pitch decks, or anywhere you want placeholder text with a bit of personality. Each sentence is randomly assembled from real jargon.',
  'HTML mode wraps each paragraph in <p> tags, so you can paste the output directly into HTML source without extra wrapping. The word and character counts update in real time so you can hit a specific copy length.',
]

function randEl(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function generateSentence(words) {
  const len = 6 + Math.floor(Math.random() * 14)
  const sentence = Array.from({ length: len }, () => randEl(words))
  return sentence[0][0].toUpperCase() + sentence[0].slice(1) + ' ' + sentence.slice(1).join(' ') + '.'
}

function generateParagraph(words) {
  const count = 3 + Math.floor(Math.random() * 5)
  return Array.from({ length: count }, () => generateSentence(words)).join(' ')
}

function generateBuzzSentence() {
  const adv = Math.random() > 0.5 ? `${randEl(BUZZ_ADVERBS)} ` : ''
  return `${adv}${randEl(BUZZ_SUBJECTS).charAt(0).toUpperCase() + randEl(BUZZ_SUBJECTS).slice(1)} ${randEl(BUZZ_VERBS)} ${randEl(BUZZ_OBJECTS)}.`
}

function generateBuzzParagraph() {
  const count = 3 + Math.floor(Math.random() * 4)
  return Array.from({ length: count }, generateBuzzSentence).join(' ')
}

export default function LoremIpsum() {
  const [type, setType] = useState('paragraphs')
  const [count, setCount] = useState(3)
  const [classic, setClassic] = useState(true)
  const [htmlMode, setHtmlMode] = useState(false)
  const [buzzMode, setBuzzMode] = useState(false)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const words = [...LOREM_WORDS]
    let result = ''

    if (buzzMode) {
      const paras = Array.from({ length: type === 'paragraphs' ? count : 1 }, generateBuzzParagraph)
      if (type === 'sentences') {
        result = Array.from({ length: count }, generateBuzzSentence).join(' ')
      } else if (type === 'words') {
        const pool = [...BUZZ_SUBJECTS, ...BUZZ_VERBS, ...BUZZ_OBJECTS, ...BUZZ_ADVERBS]
        result = Array.from({ length: count }, () => randEl(pool)).join(' ')
      } else {
        result = htmlMode ? paras.map((p) => `<p>${p}</p>`).join('\n') : paras.join('\n\n')
      }
      setOutput(result)
      return
    }

    if (type === 'paragraphs') {
      const paras = []
      for (let i = 0; i < count; i++) {
        let para = generateParagraph(words)
        if (i === 0 && classic) para = CLASSIC_START + ' ' + para
        paras.push(para)
      }
      result = htmlMode ? paras.map((p) => `<p>${p}</p>`).join('\n') : paras.join('\n\n')
    } else if (type === 'sentences') {
      const sentences = Array.from({ length: count }, () => generateSentence(words))
      if (classic && sentences.length > 0) sentences[0] = CLASSIC_START
      result = sentences.join(' ')
    } else {
      const wordArr = Array.from({ length: count }, () => randEl(words))
      if (classic && wordArr.length >= 2) { wordArr[0] = 'Lorem'; wordArr[1] = 'ipsum' }
      result = wordArr.join(' ')
    }

    setOutput(result)
  }, [type, count, classic, htmlMode, buzzMode])

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const maxCount = type === 'words' ? 500 : 50

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for mockups and layouts. Configurable by paragraphs, sentences, or words."
      toolId="lorem-ipsum"
      about={ABOUT}
    >
      <div className="card mb-4">
        <div className="flex flex-wrap gap-6 mb-4">
          <div>
            <p className="text-xs text-zinc-500 mb-2">Generate by</p>
            <div className="flex gap-1.5">
              {['paragraphs', 'sentences', 'words'].map((t) => (
                <button key={t} onClick={() => { setType(t); setCount(t === 'words' ? 50 : 3) }}
                  className={`px-3 py-1.5 text-sm rounded-lg border capitalize transition-colors ${type === t ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-2">Count: <span className="text-zinc-300">{count}</span></p>
            <input
              type="range" min={1} max={maxCount} value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-40 accent-indigo-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          {!buzzMode && (
            <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
              <input type="checkbox" checked={classic} onChange={() => setClassic(!classic)} className="accent-indigo-500 w-4 h-4" />
              Start with &quot;Lorem ipsum...&quot;
            </label>
          )}
          {type === 'paragraphs' && (
            <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
              <input type="checkbox" checked={htmlMode} onChange={() => setHtmlMode(!htmlMode)} className="accent-indigo-500 w-4 h-4" />
              Wrap in &lt;p&gt; tags
            </label>
          )}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={buzzMode} onChange={() => setBuzzMode(!buzzMode)} className="accent-indigo-500 w-4 h-4" />
            <span className={`${buzzMode ? 'text-amber-400' : 'text-zinc-300'}`}>💼 Corporate buzzword mode</span>
          </label>
        </div>

        <button className="btn-primary" onClick={generate}>
          <RefreshCw size={15} />
          Generate {count} {type}
        </button>
      </div>

      {output && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-zinc-500">
              {output.split(/\s+/).filter(Boolean).length} words · {output.length} chars
            </span>
            <button className="btn-secondary text-xs" onClick={copy}>
              {copied ? <><Check size={13} className="text-emerald-400" /> Copied</> : <><Copy size={13} /> Copy all</>}
            </button>
          </div>
          {htmlMode ? (
            <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">{output}</pre>
          ) : (
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{output}</p>
          )}
        </div>
      )}
    </ToolLayout>
  )
}

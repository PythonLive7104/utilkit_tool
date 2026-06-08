import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'CSS Gradient Generator lets you build linear and radial CSS gradients visually and copy the ready-to-use code.',
  'Pick your colours, adjust the angle, and switch between linear and radial styles — the live preview updates instantly.',
  'The generated CSS works in every modern browser. Nothing leaves your device.',
]

export default function CssGradientGenerator() {
  const [type, setType] = useState('linear')
  const [angle, setAngle] = useState(90)
  const [c1, setC1] = useState('#6366f1')
  const [c2, setC2] = useState('#ec4899')
  const [copied, setCopied] = useState(false)

  const value = type === 'linear'
    ? `linear-gradient(${angle}deg, ${c1}, ${c2})`
    : `radial-gradient(circle, ${c1}, ${c2})`
  const css = `background: ${value};`

  function copy() {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      description="Create linear and radial CSS gradients visually and copy the code, with a live preview."
      toolId="css-gradient-generator"
      about={ABOUT}
    >
      <div className="rounded-xl h-48 mb-4 border border-zinc-200 dark:border-zinc-800" style={{ background: value }} />

      <div className="card mb-4 space-y-4">
        <div className="flex gap-2">
          {['linear', 'radial'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                type === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Colour 1</label>
            <input type="color" className="w-full h-10 rounded-lg cursor-pointer bg-transparent" value={c1} onChange={(e) => setC1(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Colour 2</label>
            <input type="color" className="w-full h-10 rounded-lg cursor-pointer bg-transparent" value={c2} onChange={(e) => setC2(e.target.value)} />
          </div>
        </div>

        {type === 'linear' && (
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Angle: {angle}°</label>
            <input type="range" min="0" max="360" className="w-full" value={angle} onChange={(e) => setAngle(parseInt(e.target.value, 10))} />
          </div>
        )}
      </div>

      <div className="card flex items-center justify-between gap-3">
        <code className="text-sm text-zinc-700 dark:text-zinc-200 break-all">{css}</code>
        <button onClick={copy} className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </ToolLayout>
  )
}

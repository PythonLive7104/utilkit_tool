import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Box Shadow Generator builds CSS box-shadow values visually, with a live preview of the result.',
  'Adjust the horizontal and vertical offset, blur, spread, colour, and opacity, and toggle inset shadows — then copy the ready-to-use CSS.',
  'The generated code works in every modern browser. Everything runs locally in your browser.',
]

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function BoxShadowGenerator() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(10)
  const [blur, setBlur] = useState(20)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('#000000')
  const [opacity, setOpacity] = useState(25)
  const [inset, setInset] = useState(false)
  const [copied, setCopied] = useState(false)

  const rgba = hexToRgba(color, (opacity / 100).toFixed(2))
  const value = `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${rgba}`
  const css = `box-shadow: ${value};`

  function copy() {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const sliders = [
    { label: 'Horizontal offset', value: x, set: setX, min: -100, max: 100 },
    { label: 'Vertical offset', value: y, set: setY, min: -100, max: 100 },
    { label: 'Blur', value: blur, set: setBlur, min: 0, max: 150 },
    { label: 'Spread', value: spread, set: setSpread, min: -50, max: 100 },
  ]

  return (
    <ToolLayout
      title="Box Shadow Generator"
      description="Generate CSS box-shadow code visually with a live preview — offset, blur, spread, colour, and inset."
      toolId="box-shadow-generator"
      about={ABOUT}
    >
      <div className="rounded-xl h-48 mb-4 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
        <div className="w-32 h-32 rounded-xl bg-white dark:bg-zinc-700" style={{ boxShadow: value }} />
      </div>

      <div className="card mb-4 space-y-4">
        {sliders.map((s) => (
          <div key={s.label}>
            <label className="block text-xs text-zinc-500 mb-1.5">{s.label}: {s.value}px</label>
            <input type="range" min={s.min} max={s.max} className="w-full" value={s.value} onChange={(e) => s.set(parseInt(e.target.value, 10))} />
          </div>
        ))}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Shadow colour</label>
            <input type="color" className="w-full h-10 rounded-lg cursor-pointer bg-transparent" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Opacity: {opacity}%</label>
            <input type="range" min="0" max="100" className="w-full" value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value, 10))} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
          <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
          Inset shadow
        </label>
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

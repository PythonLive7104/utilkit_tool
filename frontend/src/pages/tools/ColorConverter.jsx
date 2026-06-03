import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Color Converter converts a colour between HEX, RGB, and HSL formats and shows a live preview as you adjust it.',
  'Pick a colour with the swatch or type any HEX, RGB, or HSL value — all three formats update together.',
  'Everything runs in your browser. Copy the format you need with one click.',
]

function hexToRgb(hex) {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map(c => c + c).join('')
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
}
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('')
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366f1')
  const [copied, setCopied] = useState(null)

  const rgb = hexToRgb(hex)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  const formats = rgb ? [
    { key: 'hex', label: 'HEX', value: rgbToHex(rgb.r, rgb.g, rgb.b) },
    { key: 'rgb', label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { key: 'hsl', label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ] : []

  function copy(key, value) {
    navigator.clipboard.writeText(value)
    setCopied(key); setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats with a live preview. Pick or type any value."
      toolId="color-converter"
      about={ABOUT}
    >
      <div className="card mb-4 flex items-center gap-4 flex-wrap">
        <input
          type="color"
          value={rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : '#000000'}
          onChange={e => setHex(e.target.value)}
          className="w-16 h-16 rounded-lg bg-transparent cursor-pointer border border-zinc-700"
        />
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs text-zinc-500 mb-1.5">HEX value</label>
          <input className="input font-mono" value={hex} onChange={e => setHex(e.target.value)} placeholder="#6366f1" />
        </div>
        <div
          className="w-full h-12 rounded-lg border border-zinc-700"
          style={{ background: rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : 'transparent' }}
        />
      </div>

      {rgb ? (
        <div className="space-y-3">
          {formats.map(f => (
            <div key={f.key} className="card flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-400">{f.label}</span>
                <p className="text-sm text-zinc-200 font-mono">{f.value}</p>
              </div>
              <button className="btn-ghost py-1 px-2 text-xs" onClick={() => copy(f.key, f.value)}>
                {copied === f.key ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-rose-400 card">Enter a valid HEX colour like #6366f1 or #63f.</p>
      )}
    </ToolLayout>
  )
}

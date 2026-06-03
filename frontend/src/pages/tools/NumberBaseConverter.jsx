import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Number Base Converter converts a whole number between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16).',
  'Type a value in any field and the other three update instantly. Useful for low-level programming, bitmasks, colour codes, and permissions.',
  'All conversion happens in your browser using arbitrary-precision BigInt, so very large numbers stay accurate.',
]

const BASES = [
  { key: 'bin', label: 'Binary', base: 2, valid: /^[01]*$/ },
  { key: 'oct', label: 'Octal', base: 8, valid: /^[0-7]*$/ },
  { key: 'dec', label: 'Decimal', base: 10, valid: /^[0-9]*$/ },
  { key: 'hex', label: 'Hex', base: 16, valid: /^[0-9a-fA-F]*$/ },
]

export default function NumberBaseConverter() {
  const [value, setValue] = useState(0n)
  const [active, setActive] = useState('dec')
  const [raw, setRaw] = useState('0')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(null)

  function onChange(b, str) {
    setActive(b.key); setRaw(str)
    if (str === '') { setValue(0n); setError(''); return }
    if (!b.valid.test(str)) { setError(`Invalid ${b.label.toLowerCase()} digit`); return }
    try {
      const prefix = { 2: '0b', 8: '0o', 16: '0x', 10: '' }[b.base]
      setValue(BigInt(prefix + str)); setError('')
    } catch { setError('Invalid number') }
  }

  function display(b) {
    if (active === b.key) return raw
    return value.toString(b.base)
  }

  function copy(b) {
    navigator.clipboard.writeText(display(b))
    setCopied(b.key); setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolLayout
      title="Number Base Converter"
      description="Convert numbers between binary, octal, decimal, and hexadecimal instantly. Powered by BigInt for large values."
      toolId="number-base-converter"
      about={ABOUT}
    >
      <div className="space-y-3">
        {BASES.map(b => (
          <div key={b.key} className="card">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-indigo-400">{b.label} <span className="text-zinc-600">(base {b.base})</span></span>
              <button className="btn-ghost py-1 px-2 text-xs" onClick={() => copy(b)}>
                {copied === b.key ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>
            <input
              className="input font-mono"
              value={display(b)}
              onChange={e => onChange(b, e.target.value.trim())}
              spellCheck={false}
            />
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-rose-400 mt-3">{error}</p>}
    </ToolLayout>
  )
}

import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Ruler, ArrowRightLeft } from 'lucide-react'

const ABOUT = [
  'Unit Converter converts between common units of length, weight, temperature, area, volume, and speed — all in one tool.',
  'Pick a category, choose the units to convert from and to, and the result updates instantly as you type.',
  'All conversions run in your browser using standard SI factors. No data is sent anywhere.',
]

// factor = how many base units in 1 of this unit
const CATEGORIES = {
  Length: { base: 'm', units: { Millimeter: 0.001, Centimeter: 0.01, Meter: 1, Kilometer: 1000, Inch: 0.0254, Foot: 0.3048, Yard: 0.9144, Mile: 1609.344 } },
  Weight: { base: 'kg', units: { Milligram: 1e-6, Gram: 0.001, Kilogram: 1, Tonne: 1000, Ounce: 0.0283495, Pound: 0.453592, Stone: 6.35029 } },
  Area: { base: 'm²', units: { 'Sq meter': 1, 'Sq kilometer': 1e6, 'Sq foot': 0.092903, 'Sq yard': 0.836127, Acre: 4046.86, Hectare: 10000 } },
  Volume: { base: 'L', units: { Milliliter: 0.001, Liter: 1, 'Cubic meter': 1000, Gallon: 3.78541, Quart: 0.946353, Pint: 0.473176, Cup: 0.24 } },
  Speed: { base: 'm/s', units: { 'Meter/sec': 1, 'Km/hour': 0.277778, 'Mile/hour': 0.44704, Knot: 0.514444, 'Foot/sec': 0.3048 } },
}

function convertTemp(v, from, to) {
  let c
  if (from === 'Celsius') c = v
  else if (from === 'Fahrenheit') c = (v - 32) * 5 / 9
  else c = v - 273.15
  if (to === 'Celsius') return c
  if (to === 'Fahrenheit') return c * 9 / 5 + 32
  return c + 273.15
}

export default function UnitConverter() {
  const [cat, setCat] = useState('Length')
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState('Meter')
  const [to, setTo] = useState('Foot')

  const isTemp = cat === 'Temperature'
  const unitNames = isTemp ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(CATEGORIES[cat].units)

  function pickCategory(c) {
    setCat(c)
    const names = c === 'Temperature' ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(CATEGORIES[c].units)
    setFrom(names[0])
    setTo(names[1] || names[0])
  }

  const v = parseFloat(value)
  let result = null
  if (Number.isFinite(v)) {
    if (isTemp) {
      result = convertTemp(v, from, to)
    } else {
      const u = CATEGORIES[cat].units
      result = (v * u[from]) / u[to]
    }
    result = Math.round(result * 1e6) / 1e6
  }

  function swap() { setFrom(to); setTo(from) }

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert length, weight, temperature, area, volume, and speed between metric and imperial units instantly."
      toolId="unit-converter"
      about={ABOUT}
    >
      <div className="card mb-4">
        <div className="flex gap-2 flex-wrap mb-4">
          {[...Object.keys(CATEGORIES), 'Temperature'].map(c => (
            <button key={c} onClick={() => pickCategory(c)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${cat === c ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{c}</button>
          ))}
        </div>

        <div className="flex items-end gap-2 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-zinc-500 mb-1.5">Value</label>
            <input type="number" className="input" value={value} onChange={e => setValue(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-zinc-500 mb-1.5">From</label>
            <select className="input" value={from} onChange={e => setFrom(e.target.value)}>
              {unitNames.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <button onClick={swap} className="btn-ghost p-2.5 mb-0.5" title="Swap"><ArrowRightLeft size={15} /></button>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-zinc-500 mb-1.5">To</label>
            <select className="input" value={to} onChange={e => setTo(e.target.value)}>
              {unitNames.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>

      {result !== null && (
        <div className="card text-center">
          <p className="text-sm text-zinc-400">{value} {from} =</p>
          <p className="text-3xl font-bold text-indigo-400 my-1">{result.toLocaleString(undefined, { maximumFractionDigits: 6 })}</p>
          <p className="text-sm text-zinc-400">{to}</p>
        </div>
      )}
    </ToolLayout>
  )
}

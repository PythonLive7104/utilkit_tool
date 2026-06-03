import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Scale } from 'lucide-react'

const ABOUT = [
  'BMI Calculator computes your Body Mass Index from height and weight using the standard WHO formula, in either metric or imperial units.',
  'BMI is a simple screening measure of whether your weight is in a healthy range for your height. It does not account for muscle mass, so athletes may read high.',
  'Calculation is instant and fully private — nothing leaves your browser.',
]

const CATS = [
  { max: 18.5, label: 'Underweight', color: 'text-sky-400' },
  { max: 25, label: 'Normal weight', color: 'text-emerald-400' },
  { max: 30, label: 'Overweight', color: 'text-amber-400' },
  { max: Infinity, label: 'Obese', color: 'text-rose-400' },
]

export default function BmiCalculator() {
  const [unit, setUnit] = useState('metric')
  const [cm, setCm] = useState('175')
  const [kg, setKg] = useState('70')
  const [ft, setFt] = useState('5')
  const [inch, setIn] = useState('9')
  const [lb, setLb] = useState('154')

  let bmi = null
  if (unit === 'metric') {
    const h = parseFloat(cm) / 100
    const w = parseFloat(kg)
    if (h > 0 && w > 0) bmi = w / (h * h)
  } else {
    const totalIn = parseFloat(ft) * 12 + parseFloat(inch || 0)
    const w = parseFloat(lb)
    if (totalIn > 0 && w > 0) bmi = (w / (totalIn * totalIn)) * 703
  }

  const rounded = bmi ? Math.round(bmi * 10) / 10 : null
  const cat = rounded !== null ? CATS.find(c => rounded < c.max) : null

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index in metric or imperial units and see your weight category instantly."
      toolId="bmi-calculator"
      about={ABOUT}
    >
      <div className="card mb-4">
        <div className="flex gap-2 mb-4">
          {['metric', 'imperial'].map(u => (
            <button key={u} onClick={() => setUnit(u)} className={`px-3 py-1.5 text-sm rounded-lg border capitalize transition-colors ${unit === u ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{u}</button>
          ))}
        </div>

        {unit === 'metric' ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Height (cm)</label>
              <input type="number" className="input" value={cm} onChange={e => setCm(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Weight (kg)</label>
              <input type="number" className="input" value={kg} onChange={e => setKg(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Height (ft)</label>
              <input type="number" className="input" value={ft} onChange={e => setFt(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Height (in)</label>
              <input type="number" className="input" value={inch} onChange={e => setIn(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Weight (lb)</label>
              <input type="number" className="input" value={lb} onChange={e => setLb(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {rounded !== null && cat && (
        <div className="card text-center">
          <p className="text-xs text-zinc-500 mb-1">Your BMI is</p>
          <p className="text-4xl font-bold text-indigo-400 mb-2">{rounded}</p>
          <p className={`text-sm font-semibold ${cat.color}`}>{cat.label}</p>
          <div className="flex items-center justify-center gap-1 mt-4 text-[11px]">
            <span className="px-2 py-1 rounded bg-sky-500/10 text-sky-400">&lt;18.5</span>
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">18.5–25</span>
            <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400">25–30</span>
            <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-400">30+</span>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

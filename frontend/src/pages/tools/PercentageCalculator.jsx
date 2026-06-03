import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Percent } from 'lucide-react'

const ABOUT = [
  'Percentage Calculator handles the three most common percentage questions in one place — what is X% of Y, X is what percent of Y, and percentage increase or decrease between two numbers.',
  'Every calculation runs instantly in your browser as you type. Nothing is sent to a server.',
  'Use it for discounts, tips, tax, grades, statistics, and any everyday percentage maths.',
]

function num(v) {
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : null
}

function round(n) {
  return Math.round(n * 100) / 100
}

export default function PercentageCalculator() {
  // X% of Y
  const [pa, setPa] = useState('15')
  const [pb, setPb] = useState('200')
  // X is what % of Y
  const [ca, setCa] = useState('30')
  const [cb, setCb] = useState('150')
  // change from X to Y
  const [da, setDa] = useState('80')
  const [db, setDb] = useState('100')

  const r1 = num(pa) !== null && num(pb) !== null ? round((num(pa) / 100) * num(pb)) : null
  const r2 = num(ca) !== null && num(cb) !== null && num(cb) !== 0 ? round((num(ca) / num(cb)) * 100) : null
  const r3 = num(da) !== null && num(db) !== null && num(da) !== 0 ? round(((num(db) - num(da)) / Math.abs(num(da))) * 100) : null

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentages instantly: what is X% of Y, X is what percent of Y, and percentage increase or decrease."
      toolId="percentage-calculator"
      about={ABOUT}
    >
      <div className="space-y-4">
        <div className="card">
          <p className="text-sm font-semibold text-zinc-200 mb-3">What is <span className="text-indigo-400">X%</span> of a number?</p>
          <div className="flex items-center gap-2 flex-wrap text-sm text-zinc-400">
            <input className="input w-24" value={pa} onChange={e => setPa(e.target.value)} type="number" />
            <span>% of</span>
            <input className="input w-32" value={pb} onChange={e => setPb(e.target.value)} type="number" />
            <span>=</span>
            <span className="text-lg font-bold text-emerald-400">{r1 ?? '—'}</span>
          </div>
        </div>

        <div className="card">
          <p className="text-sm font-semibold text-zinc-200 mb-3">X is what <span className="text-indigo-400">percent</span> of Y?</p>
          <div className="flex items-center gap-2 flex-wrap text-sm text-zinc-400">
            <input className="input w-24" value={ca} onChange={e => setCa(e.target.value)} type="number" />
            <span>is what % of</span>
            <input className="input w-32" value={cb} onChange={e => setCb(e.target.value)} type="number" />
            <span>=</span>
            <span className="text-lg font-bold text-emerald-400">{r2 !== null ? r2 + '%' : '—'}</span>
          </div>
        </div>

        <div className="card">
          <p className="text-sm font-semibold text-zinc-200 mb-3">Percentage <span className="text-indigo-400">increase / decrease</span></p>
          <div className="flex items-center gap-2 flex-wrap text-sm text-zinc-400">
            <span>from</span>
            <input className="input w-28" value={da} onChange={e => setDa(e.target.value)} type="number" />
            <span>to</span>
            <input className="input w-28" value={db} onChange={e => setDb(e.target.value)} type="number" />
            <span>=</span>
            <span className={`text-lg font-bold ${r3 !== null && r3 < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {r3 !== null ? (r3 > 0 ? '+' : '') + r3 + '%' : '—'}
            </span>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

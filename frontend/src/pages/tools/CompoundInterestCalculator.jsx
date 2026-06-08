import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'

const ABOUT = [
  'Compound Interest Calculator shows how your savings or investment grows over time as interest earns interest.',
  'Enter a starting amount, an annual interest rate, how long you will invest, and an optional regular monthly contribution to see the final balance and how much of it is interest.',
  'All maths runs locally in your browser using the standard compound interest formula.',
]

const FREQ = [
  { label: 'Annually', value: 1 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 },
]

function money(n) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('1000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [freq, setFreq] = useState(12)
  const [monthly, setMonthly] = useState('100')

  const P = parseFloat(principal) || 0
  const r = (parseFloat(rate) || 0) / 100
  const yPart = parseFloat(years) || 0
  const n = freq
  const PMT = parseFloat(monthly) || 0

  // Lump sum compounded + future value of monthly contributions.
  const base = P * Math.pow(1 + r / n, n * yPart)
  // Contributions are monthly; compound them monthly for simplicity.
  const monthsTotal = yPart * 12
  const monthlyRate = r / 12
  const contrib = monthlyRate === 0
    ? PMT * monthsTotal
    : PMT * ((Math.pow(1 + monthlyRate, monthsTotal) - 1) / monthlyRate)

  const finalBalance = base + contrib
  const totalContributed = P + PMT * monthsTotal
  const interestEarned = finalBalance - totalContributed
  const valid = yPart > 0

  return (
    <ToolLayout
      title="Compound Interest Calculator"
      description="See how savings and investments grow with compound interest, including regular monthly contributions."
      toolId="compound-interest-calculator"
      about={ABOUT}
    >
      <div className="card mb-4 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Starting amount</label>
            <input type="number" min="0" className="input" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Monthly contribution</label>
            <input type="number" min="0" className="input" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Annual interest rate (%)</label>
            <input type="number" min="0" step="0.1" className="input" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Years</label>
            <input type="number" min="0" className="input" value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Compound frequency</label>
          <select className="input" value={freq} onChange={(e) => setFreq(parseInt(e.target.value, 10))}>
            {FREQ.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>

      {valid && (
        <div className="space-y-3">
          <div className="card text-center">
            <p className="text-xs text-zinc-500 mb-1">Final balance</p>
            <p className="text-3xl font-bold text-emerald-400">{money(finalBalance)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-indigo-400">{money(interestEarned)}</p>
              <p className="text-xs text-zinc-500">Interest earned</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-zinc-200">{money(totalContributed)}</p>
              <p className="text-xs text-zinc-500">Total contributed</p>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

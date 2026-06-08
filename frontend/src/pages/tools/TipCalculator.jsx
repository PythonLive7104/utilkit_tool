import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'

const ABOUT = [
  'Tip Calculator works out the tip and total bill for any service, and splits the total evenly between any number of people.',
  'Choose a quick tip percentage or enter your own, then see the tip amount, grand total, and the exact amount each person owes.',
  'Everything is calculated instantly in your browser — no data is sent anywhere.',
]

const PRESETS = [10, 15, 18, 20, 25]

function money(n) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function TipCalculator() {
  const [bill, setBill] = useState('50')
  const [tip, setTip] = useState('18')
  const [people, setPeople] = useState('1')

  const b = parseFloat(bill)
  const t = parseFloat(tip)
  const p = Math.max(parseInt(people, 10) || 1, 1)

  const valid = b >= 0 && t >= 0
  const tipAmount = valid ? (b * t) / 100 : 0
  const total = valid ? b + tipAmount : 0
  const perPerson = total / p

  return (
    <ToolLayout
      title="Tip Calculator"
      description="Calculate the tip and total for any bill, then split it evenly between any number of people."
      toolId="tip-calculator"
      about={ABOUT}
    >
      <div className="card mb-4 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Bill amount</label>
            <input type="number" min="0" className="input" value={bill} onChange={(e) => setBill(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Split between (people)</label>
            <input type="number" min="1" className="input" value={people} onChange={(e) => setPeople(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-2">Tip percentage</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {PRESETS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setTip(String(v))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  String(v) === tip
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {v}%
              </button>
            ))}
          </div>
          <input type="number" min="0" className="input" value={tip} onChange={(e) => setTip(e.target.value)} placeholder="Custom %" />
        </div>
      </div>

      {valid && (
        <div className="space-y-3">
          <div className="card text-center">
            <p className="text-xs text-zinc-500 mb-1">Each person pays</p>
            <p className="text-3xl font-bold text-emerald-400">{money(perPerson)}</p>
            {p > 1 && <p className="text-xs text-zinc-500 mt-1">{p} people</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-indigo-400">{money(tipAmount)}</p>
              <p className="text-xs text-zinc-500">Tip amount</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-zinc-200">{money(total)}</p>
              <p className="text-xs text-zinc-500">Total bill</p>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

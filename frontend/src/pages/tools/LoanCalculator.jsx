import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Landmark } from 'lucide-react'

const ABOUT = [
  'Loan / EMI Calculator works out your fixed monthly repayment (EMI), total interest paid, and total amount payable for any amortising loan.',
  'It uses the standard amortisation formula: EMI = P·r·(1+r)^n / ((1+r)^n − 1), where r is the monthly interest rate and n the number of months.',
  'Adjust the loan amount, interest rate, and term to instantly compare scenarios. Everything is computed in your browser.',
]

function money(n) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState('20000')
  const [rate, setRate] = useState('7.5')
  const [years, setYears] = useState('5')

  const P = parseFloat(amount)
  const annual = parseFloat(rate)
  const n = parseFloat(years) * 12
  let emi = null, total = null, interest = null

  if (P > 0 && n > 0 && annual >= 0) {
    const r = annual / 100 / 12
    if (r === 0) {
      emi = P / n
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }
    total = emi * n
    interest = total - P
  }

  return (
    <ToolLayout
      title="Loan / EMI Calculator"
      description="Calculate your monthly loan repayment (EMI), total interest, and total cost for any loan amount, rate, and term."
      toolId="loan-calculator"
      about={ABOUT}
    >
      <div className="card mb-4 space-y-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Loan amount</label>
          <input type="number" className="input" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Annual interest rate (%)</label>
            <input type="number" step="0.1" className="input" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Term (years)</label>
            <input type="number" className="input" value={years} onChange={e => setYears(e.target.value)} />
          </div>
        </div>
      </div>

      {emi !== null && (
        <div className="space-y-3">
          <div className="card text-center">
            <p className="text-xs text-zinc-500 mb-1">Monthly payment (EMI)</p>
            <p className="text-3xl font-bold text-indigo-400">{money(Math.round(emi * 100) / 100)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-amber-400">{money(Math.round(interest))}</p>
              <p className="text-xs text-zinc-500">Total interest</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-zinc-200">{money(Math.round(total))}</p>
              <p className="text-xs text-zinc-500">Total payable</p>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

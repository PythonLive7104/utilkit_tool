import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { BadgePercent } from 'lucide-react'

const ABOUT = [
  'Discount Calculator shows the final price after a percentage discount, the exact amount you save, and an optional sales-tax line added on top.',
  'Enter the original price and discount percentage to see your savings instantly — perfect for sales, coupons, and Black Friday deals.',
  'Everything is calculated locally in your browser.',
]

function money(n) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function DiscountCalculator() {
  const [price, setPrice] = useState('120')
  const [discount, setDiscount] = useState('25')
  const [tax, setTax] = useState('0')

  const p = parseFloat(price)
  const d = parseFloat(discount)
  const t = parseFloat(tax) || 0

  let saved = null, afterDiscount = null, final = null
  if (p >= 0 && d >= 0) {
    saved = (p * d) / 100
    afterDiscount = p - saved
    final = afterDiscount * (1 + t / 100)
  }

  return (
    <ToolLayout
      title="Discount Calculator"
      description="Calculate the sale price after a percentage discount, how much you save, and the final total with tax."
      toolId="discount-calculator"
      about={ABOUT}
    >
      <div className="card mb-4 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Original price</label>
            <input type="number" className="input" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Discount (%)</label>
            <input type="number" className="input" value={discount} onChange={e => setDiscount(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Tax (%) optional</label>
            <input type="number" className="input" value={tax} onChange={e => setTax(e.target.value)} />
          </div>
        </div>
      </div>

      {final !== null && (
        <div className="space-y-3">
          <div className="card text-center">
            <p className="text-xs text-zinc-500 mb-1">Final price</p>
            <p className="text-3xl font-bold text-emerald-400">{money(final)}</p>
            {t > 0 && <p className="text-xs text-zinc-500 mt-1">incl. {t}% tax</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-rose-400">−{money(saved)}</p>
              <p className="text-xs text-zinc-500">You save</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-zinc-200">{money(afterDiscount)}</p>
              <p className="text-xs text-zinc-500">Price after discount</p>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

import { useState } from 'react'
import { X, Coffee } from 'lucide-react'

const PK = 'pk_live_c993a64d0b90760e2f42a25889360af489694486'
const CURRENCY = 'USD'
const SYMBOL   = '$'
const PRESETS  = [2, 5, 10, 20]

function Modal({ onClose }) {
  const [email, setEmail]   = useState('')
  const [preset, setPreset] = useState(5)
  const [custom, setCustom] = useState('')
  const [busy, setBusy]     = useState(false)
  const [done, setDone]     = useState(false)

  const amount = custom ? parseInt(custom, 10) || 0 : preset

  function pay(e) {
    e.preventDefault()
    if (!email || !amount) return
    if (!window.PaystackPop) {
      alert('Payment script not loaded yet. Please refresh and try again.')
      return
    }
    setBusy(true)
    const handler = window.PaystackPop.setup({
      key: PK,
      email,
      amount: amount * 100,
      currency: CURRENCY,
      ref: `utilkit_${Date.now()}`,
      callback: () => { setBusy(false); setDone(true) },
      onClose:  () => setBusy(false),
    })
    handler.openIframe()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {done ? (
          <div className="text-center py-4">
            <p className="text-3xl mb-3">🎉</p>
            <p className="font-bold text-zinc-800 dark:text-zinc-100 mb-1">Thank you!</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Your support keeps UtilKit free for everyone.</p>
            <button
              onClick={onClose}
              className="mt-5 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="font-bold text-zinc-800 dark:text-zinc-100 mb-1">Support UtilKit ☕</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
              All 72 tools are free. A small support keeps the lights on.
            </p>

            <form onSubmit={pay} className="space-y-4">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Amount (USD)</p>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {PRESETS.map(a => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setPreset(a); setCustom('') }}
                      className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                        preset === a && !custom
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {SYMBOL}{a}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  placeholder="Custom amount"
                  value={custom}
                  onChange={e => { setCustom(e.target.value); setPreset(0) }}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={busy || !email || !amount}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                {busy ? 'Opening Paystack…' : `Pay ${SYMBOL}${amount}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// variant="floating" → fixed icon button, stacked above the Contact widget
// variant="inline"   → normal button (used inside CoffeeBox)
export default function PaystackButton({ variant = 'inline', label = '☕ Support UtilKit' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {variant === 'floating' ? (
        <button
          onClick={() => setOpen(true)}
          aria-label={label}
          title={label}
          className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <Coffee size={20} />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
        >
          {label}
        </button>
      )}

      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  )
}

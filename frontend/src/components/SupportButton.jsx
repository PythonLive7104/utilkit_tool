import { useState } from 'react'
import { X, Coffee } from 'lucide-react'

// "Support our team" runs on a Dodo Payments "Pay What You Want" product.
// Set these from your Dodo dashboard (see frontend/.env.example):
//   VITE_DODO_CHECKOUT_BASE   — checkout host (test vs live)
//   VITE_DODO_SUPPORT_PRODUCT  — the PWYW product id, e.g. 'pdt_...'
const CHECKOUT_BASE = import.meta.env.VITE_DODO_CHECKOUT_BASE || 'https://checkout.dodopayments.com'
const PRODUCT_ID    = import.meta.env.VITE_DODO_SUPPORT_PRODUCT || ''
const SYMBOL  = '$'
const PRESETS = [2, 5, 10, 20]

// Build a static "Pay What You Want" checkout link. Despite Dodo's docs saying
// paymentAmount is in cents, the hosted /buy/ link treats it as whole dollars
// (passing 500 renders as $500.00), so we pass the dollar amount directly.
function supportLink(amount) {
  const params = new URLSearchParams({
    quantity: '1',
    redirect_url: window.location.href,
  })
  if (amount > 0) params.set('paymentAmount', String(Math.round(amount)))
  return `${CHECKOUT_BASE}/buy/${PRODUCT_ID}?${params.toString()}`
}

function Modal({ onClose }) {
  const [preset, setPreset] = useState(5)
  const [custom, setCustom] = useState('')
  const [opened, setOpened] = useState(false)

  const amount = custom ? Math.min(parseInt(custom, 10) || 0, 999) : preset

  function pay(e) {
    e.preventDefault()
    if (!amount) return
    if (!PRODUCT_ID) {
      alert('Support is not configured yet. Please try again later.')
      return
    }
    // Dodo's hosted checkout opens in a new tab so the user keeps their place.
    window.open(supportLink(amount), '_blank', 'noopener')
    setOpened(true)
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

        {opened ? (
          <div className="text-center py-4">
            <p className="text-3xl mb-3">💜</p>
            <p className="font-bold text-zinc-800 dark:text-zinc-100 mb-1">Thank you!</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Finish your support in the checkout tab that just opened. It keeps UtilKit free for everyone.
            </p>
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
                  max="999"
                  placeholder="Custom amount (USD)"
                  value={custom}
                  onChange={e => { setCustom(e.target.value); setPreset(0) }}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={!amount}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                {`Support ${SYMBOL}${amount}`}
              </button>
              <p className="text-[11px] text-zinc-400 text-center">Secure checkout via Dodo Payments.</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// variant="floating" → fixed icon button, stacked above the Contact widget
// variant="inline"   → normal button (used inside CoffeeBox)
export default function SupportButton({ variant = 'inline', label = '☕ Support UtilKit' }) {
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

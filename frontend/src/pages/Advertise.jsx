import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { Megaphone, CheckCircle2, AlertCircle, Upload, ChevronDown } from 'lucide-react'
import { ads } from '../lib/api'

const CURRENCY = 'USD'
const SYMBOL = '$'

function formatDate(d) {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return d
  }
}

export default function Advertise() {
  const [params] = useSearchParams()
  const [slots, setSlots] = useState([])
  const [slotsErr, setSlotsErr] = useState('')
  const [selected, setSelected] = useState(params.get('category') || '')

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [targetUrl, setTargetUrl] = useState('')
  const [altText, setAltText] = useState('')
  const [image, setImage] = useState(null)

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(null) // { endDate }

  const formRef = useRef(null)

  useEffect(() => {
    ads.slots()
      .then(setSlots)
      .catch(() => setSlotsErr('Could not load advertising slots. Please try again later.'))
  }, [])

  // When a category is chosen, bring its form into view (important on mobile).
  useEffect(() => {
    if (selected && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selected])

  const slot = slots.find((s) => s.code === selected)

  function onFile(e) {
    const f = e.target.files?.[0]
    setError('')
    if (!f) { setImage(null); return }
    if (!f.type.startsWith('image/')) { setError('Please choose an image file.'); return }
    if (f.size > 3 * 1024 * 1024) { setError('Image must be 3 MB or smaller.'); return }
    setImage(f)
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (!slot) { setError('Please choose a category.'); return }
    if (!slot.available) { setError('That category is fully booked right now.'); return }
    if (!image) { setError('Please upload your banner image.'); return }
    if (!window.PaystackPop) {
      setError('Payment script is still loading — please wait a moment and try again.')
      return
    }

    setBusy(true)
    try {
      const form = new FormData()
      form.append('slot', slot.code)
      form.append('advertiser_name', name)
      form.append('company', company)
      form.append('advertiser_email', email)
      form.append('target_url', targetUrl)
      form.append('alt_text', altText)
      form.append('image', image)

      const res = await ads.submit(form)

      const handler = window.PaystackPop.setup({
        key: res.public_key,
        email: res.email,
        amount: Math.round(parseFloat(res.amount) * 100),
        currency: CURRENCY,
        ref: res.reference,
        callback: (response) => {
          ads.verify(response.reference)
            .then((v) => setDone({ endDate: v.end_date }))
            .catch(() => setError('Payment received but activation failed. Please contact support with your reference: ' + response.reference))
            .finally(() => setBusy(false))
        },
        onClose: () => setBusy(false),
      })
      handler.openIframe()
    } catch (err) {
      setBusy(false)
      if (err.status === 409) {
        const date = err.data?.next_available_date
        setError(date
          ? `This category is fully booked. Check back around ${formatDate(date)}, when the current advert expires.`
          : 'This category is fully booked right now. Please check back soon.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    }
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <Helmet><title>Advertisement booked | UtilKit</title></Helmet>
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">Your advert is live! 🎉</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Thanks for advertising with UtilKit. Your banner is now showing on the{' '}
          <strong>{slot?.name}</strong> pages
          {done.endDate && <> until <strong>{formatDate(done.endDate)}</strong></>}.
        </p>
        <p className="text-sm text-zinc-400 mt-4">A confirmation has been sent to {email}.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Helmet>
        <title>Advertise on UtilKit — Reach Thousands of Users</title>
        <meta name="description" content="Place a banner advert on UtilKit's tool pages. Pick a tool category, pay by the week, and go live instantly after payment." />
      </Helmet>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-medium mb-4">
          <Megaphone size={13} /> Advertise with us
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Advertise on UtilKit</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          Reach thousands of people using our free tools. Choose a tool category, upload your banner,
          and your advert goes live the moment your weekly payment is confirmed.
        </p>
      </div>

      {slotsErr && (
        <div className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg px-4 py-3 mb-6">
          <AlertCircle size={16} /> {slotsErr}
        </div>
      )}

      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-2">
        Tap a category — the booking form opens right below it
      </p>

      {/* Accordion: each category expands its own form directly beneath it */}
      <div className="space-y-2">
        {slots.map((s) => {
          const isSel = s.code === selected
          const disabled = !s.available
          return (
            <div
              key={s.code}
              className={`rounded-xl border overflow-hidden transition-colors ${
                isSel
                  ? 'border-indigo-500'
                  : disabled
                    ? 'border-zinc-200 dark:border-zinc-800 opacity-60'
                    : 'border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <button
                type="button"
                onClick={() => !disabled && setSelected(isSel ? '' : s.code)}
                disabled={disabled}
                className={`w-full text-left p-3.5 transition-colors ${
                  isSel
                    ? 'bg-indigo-50 dark:bg-indigo-950/30'
                    : disabled
                      ? 'cursor-not-allowed'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{s.name}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      {SYMBOL}{parseFloat(s.price_usd)}<span className="text-xs font-normal text-zinc-400">/wk</span>
                    </span>
                    {!disabled && (
                      <ChevronDown
                        size={16}
                        className={`text-zinc-400 transition-transform ${isSel ? 'rotate-180' : ''}`}
                      />
                    )}
                  </span>
                </div>
                {disabled ? (
                  <span className="text-xs text-rose-500 dark:text-rose-400">
                    Booked{ s.next_available_date ? ` — free from ${formatDate(s.next_available_date)}` : '' }
                  </span>
                ) : (
                  <span className="text-xs text-zinc-400">
                    {s.recommended_size} banner · {s.spots_left} of {s.capacity} spot{s.capacity > 1 ? 's' : ''} open
                  </span>
                )}
              </button>

              {/* The form for the selected category, inline beneath its header */}
              {isSel && (
                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  className="border-t border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-950/10 p-4 space-y-5 scroll-mt-4"
                >
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Upload your banner</label>
                    <label className="flex items-center justify-center gap-2 w-full px-4 py-5 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-400 cursor-pointer transition-colors bg-white/60 dark:bg-zinc-900/30">
                      <Upload size={16} className="text-zinc-400" />
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                        {image ? image.name : `Choose image (recommended ${s.recommended_size}, max 3 MB)`}
                      </span>
                      <input type="file" accept="image/*" onChange={onFile} className="hidden" />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your name" value={name} onChange={setName} required placeholder="Jane Doe" />
                    <Field label="Company (optional)" value={company} onChange={setCompany} placeholder="Acme Inc." />
                    <Field label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@company.com" />
                    <Field label="Link URL" type="url" value={targetUrl} onChange={setTargetUrl} required placeholder="https://your-site.com" />
                  </div>
                  <Field label="Banner alt text (optional)" value={altText} onChange={setAltText} placeholder="Describe your banner for accessibility" />

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg px-4 py-3">
                      <AlertCircle size={16} className="flex-shrink-0" /> {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                  >
                    {busy ? 'Processing…' : `Pay ${SYMBOL}${parseFloat(s.price_usd)} & go live for 1 week`}
                  </button>
                  <p className="text-xs text-zinc-400 text-center">
                    Secure payment via Paystack. Your advert goes live automatically once payment is confirmed.
                  </p>
                </form>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  )
}

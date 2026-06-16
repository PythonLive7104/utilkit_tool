import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Megaphone, Eye, MousePointerClick, Plus, AlertCircle, LogOut } from 'lucide-react'
import { ads } from '../lib/api'
import { useAuth } from '../lib/auth'

function formatDate(d) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch { return d }
}

const STATUS_STYLES = {
  live: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  pending_payment: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  expired: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  rejected: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
}
const STATUS_LABELS = {
  live: 'Live',
  pending_payment: 'Awaiting payment',
  expired: 'Expired',
  rejected: 'Taken down',
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [items, setItems] = useState(null) // null = loading
  const [error, setError] = useState('')

  useEffect(() => {
    ads.mine()
      .then(setItems)
      .catch(() => { setError('Could not load your adverts. Please refresh.'); setItems([]) })
  }, [])

  const totals = (items || []).reduce(
    (acc, a) => ({ impressions: acc.impressions + a.impressions, clicks: acc.clicks + a.clicks }),
    { impressions: 0, clicks: 0 },
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Helmet><title>Your dashboard | UtilKit</title><meta name="robots" content="noindex" /></Helmet>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Your adverts</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{user?.email}</p>
        </div>
        <button onClick={logout}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200">
          <LogOut size={15} /> Log out
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat label="Adverts" value={items ? items.length : '—'} icon={<Megaphone size={16} />} />
        <Stat label="Impressions" value={totals.impressions.toLocaleString()} icon={<Eye size={16} />} />
        <Stat label="Clicks" value={totals.clicks.toLocaleString()} icon={<MousePointerClick size={16} />} />
      </div>

      <Link to="/advertise"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
        <Plus size={16} /> Book a new advert
      </Link>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-lg px-4 py-3 mb-6">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {items === null ? (
        <p className="text-sm text-zinc-400">Loading…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
          <Megaphone size={28} className="text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500 dark:text-zinc-400">You haven't booked any adverts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <AdRow key={a.id} ad={a} />
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3.5">
      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">{icon}{label}</div>
      <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
    </div>
  )
}

function AdRow({ ad }) {
  const expired = ad.status === 'expired' || (ad.status === 'live' && !ad.is_live)
  return (
    <div className="flex gap-4 items-center rounded-xl border border-zinc-200 dark:border-zinc-800 p-3.5">
      {ad.image_url
        ? <img src={ad.image_url} alt={ad.alt_text || ''} className="w-24 h-14 object-cover rounded-lg border border-zinc-200 dark:border-zinc-700 flex-shrink-0" />
        : <div className="w-24 h-14 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex-shrink-0" />}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">{ad.slot_name}</span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[ad.status] || ''}`}>
            {STATUS_LABELS[ad.status] || ad.status}
          </span>
          <span className="text-[11px] text-zinc-400 capitalize">{ad.billing_period}</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {ad.start_date ? `${formatDate(ad.start_date)} → ${formatDate(ad.end_date)}` : 'Not yet live'}
          <span className="mx-2">·</span>
          {ad.impressions.toLocaleString()} views · {ad.clicks.toLocaleString()} clicks
        </p>
      </div>

      {expired && (
        <Link to={`/advertise?category=${encodeURIComponent(ad.slot_code)}`}
          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0">
          Book again
        </Link>
      )}
    </div>
  )
}

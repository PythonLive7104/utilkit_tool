import { Link } from 'react-router-dom'
import { Megaphone, ArrowRight } from 'lucide-react'

// "Advertise Here" placeholder. Shown on the homepage (always) and in empty
// category slots on tool pages. Links to the advertise form.
export default function AdvertiseHere({ category = '', compact = false }) {
  const to = category ? `/advertise?category=${encodeURIComponent(category)}` : '/advertise'

  return (
    <Link
      to={to}
      className={`group flex items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors text-center ${
        compact ? 'px-4 py-3' : 'px-4 py-5'
      }`}
    >
      <Megaphone size={compact ? 15 : 18} className="text-zinc-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
      <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
        <span className="font-semibold">Advertise here</span>
        <span className="hidden sm:inline"> — reach thousands of users on UtilKit</span>
      </span>
      <ArrowRight size={14} className="text-zinc-300 dark:text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
    </Link>
  )
}

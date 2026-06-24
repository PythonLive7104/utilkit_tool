import { Link } from 'react-router-dom'
import { Megaphone, ArrowRight } from 'lucide-react'

const SHELL =
  'group relative rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-700/70 ' +
  'bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/40 dark:via-zinc-900/30 dark:to-violet-950/30 ' +
  'hover:border-indigo-500 hover:shadow-md transition-all'

// Eye-catching "Advertise Here" placeholder. Shown on the homepage and in any
// empty category ad box on tool pages. Links to the advertise form.
// `boxed` makes it fill a 600×300 (2:1) ad box with a compact, short layout;
// otherwise it sizes to content with the taller stacked layout.
export default function AdvertiseHere({ category = '', boxed = false }) {
  const to = category ? `/advertise?category=${encodeURIComponent(category)}` : '/advertise'

  if (boxed) {
    return (
      <Link to={to} className={`${SHELL} aspect-[2/1] h-full flex items-center justify-center gap-3 px-4`}>
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition-transform shrink-0">
          <Megaphone size={18} />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-sm font-bold text-indigo-700 dark:text-indigo-200">Advertise Here</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
            Get started
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </span>
      </Link>
    )
  }

  return (
    <Link
      to={to}
      className={`${SHELL} flex flex-col items-center justify-center gap-2 text-center px-5 py-6 min-h-[124px]`}
    >
      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition-transform">
        <Megaphone size={20} />
      </span>
      <span className="text-base font-bold text-indigo-700 dark:text-indigo-200">Advertise Here</span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs">
        Put your brand in front of thousands of UtilKit users
      </span>
      <span className="inline-flex items-center gap-1.5 mt-1 px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold group-hover:bg-indigo-500 transition-colors">
        Get started
        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  )
}

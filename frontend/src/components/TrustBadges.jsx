import { Link } from 'react-router-dom'
import { ShieldCheck, Clock, Lock, UploadCloud, Database, Wifi } from 'lucide-react'

const BROWSER_BADGES = [
  { icon: Lock,        text: 'Runs in your browser' },
  { icon: UploadCloud, text: 'No files uploaded' },
  { icon: Database,    text: 'Zero data stored' },
]

const SERVER_BADGES = [
  { icon: Wifi,        text: 'HTTPS encrypted' },
  { icon: Clock,       text: 'Deleted after processing' },
  { icon: Database,    text: 'No data retained' },
]

export default function TrustBadges({ clientSide = true }) {
  const badges = clientSide ? BROWSER_BADGES : SERVER_BADGES
  const color = clientSide
    ? 'text-emerald-600 dark:text-emerald-400'
    : 'text-sky-600 dark:text-sky-400'
  const bg = clientSide
    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50'
    : 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800/50'

  return (
    <div className={`rounded-xl border px-4 py-3 mb-6 ${bg}`}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {badges.map(({ icon: Icon, text }) => (
          <span key={text} className={`flex items-center gap-1.5 text-xs font-medium ${color}`}>
            <Icon size={13} className="flex-shrink-0" />
            {text}
          </span>
        ))}
        <Link
          to="/privacy"
          className="ml-auto text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 underline underline-offset-2 transition-colors flex-shrink-0"
        >
          Privacy policy
        </Link>
      </div>
    </div>
  )
}

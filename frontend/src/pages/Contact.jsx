import { Link } from 'react-router-dom'
import { Mail, Zap, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-medium mb-5">
          <Mail size={12} />
          Contact
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
          Get in touch
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Questions, bug reports, or tool requests — email us and we'll get back to you. Whether you've
          spotted a bug, want a tool we don't have yet, or need help using one of our utilities, email is
          the fastest way to reach a human.
        </p>
        <p className="inline-flex items-center gap-1.5 text-xs text-zinc-400 mt-3">
          <Clock size={12} /> We aim to reply within 48 hours.
        </p>
      </div>

      <a
        href="mailto:support@utilkit.us"
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors"
      >
        <Mail size={15} />
        support@utilkit.us
      </a>

      {/* Back */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-500 transition-colors">
          <Zap size={14} className="text-indigo-500" fill="currentColor" />
          Back to UtilKit
        </Link>
        <span className="text-xs text-zinc-400">© 2026 UtilKit. All rights reserved.</span>
      </div>
    </div>
  )
}

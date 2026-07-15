import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Send, Zap, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { contact } from '../lib/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await contact(form)
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'Something went wrong. Please try again.')
    }
  }

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
          Questions, bug reports, tool requests, or advertising enquiries — send us a message and we'll
          get back to you. You can also email us directly at{' '}
          <a href="mailto:support@utilkit.us" className="underline hover:text-indigo-500">support@utilkit.us</a>.
        </p>
        <p className="inline-flex items-center gap-1.5 text-xs text-zinc-400 mt-3">
          <Clock size={12} /> We aim to reply within 48 hours.
        </p>
      </div>

      {status === 'sent' ? (
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/30 p-6 text-center">
          <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-3" />
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Message sent</p>
          <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">
            Thanks for reaching out — we'll get back to you at the email address you provided.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 text-xs text-emerald-700 dark:text-emerald-300 underline hover:no-underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Name</label>
              <input
                id="name" type="text" required value={form.name} onChange={update('name')}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Email</label>
              <input
                id="email" type="email" required value={form.email} onChange={update('email')}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Subject</label>
            <input
              id="subject" type="text" required value={form.subject} onChange={update('subject')}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Message</label>
            <textarea
              id="message" required rows={6} value={form.message} onChange={update('message')}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-y"
              placeholder="Tell us what's on your mind…"
            />
          </div>

          {status === 'error' && (
            <div className="flex items-start gap-2 rounded-lg border border-rose-200 dark:border-rose-800/50 bg-rose-50 dark:bg-rose-950/30 px-3 py-2.5 text-sm text-rose-600 dark:text-rose-400">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2.5 text-sm font-medium text-white transition-colors"
          >
            <Send size={15} />
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}

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

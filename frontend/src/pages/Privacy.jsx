import { Shield, Lock, Server, Eye, Clock, Trash2, Mail, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

function Section({ icon: Icon, color, title, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${color.bg}`}>
          <Icon size={18} className={color.text} />
        </div>
        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{title}</h2>
      </div>
      <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-1">
        {children}
      </div>
    </div>
  )
}

export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-5">
          <Shield size={12} />
          Privacy Policy
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
          Your privacy is not a trade-off
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          UtilKit is built on a simple principle: process your data, return the result, forget it ever happened.
          No accounts. No tracking. No selling data.
        </p>
        <p className="text-xs text-zinc-400 mt-3">Last updated: May 2026</p>
      </div>

      {/* TL;DR */}
      <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-950/30 p-5 mb-10">
        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">TL;DR — The short version</p>
        <ul className="space-y-2">
          {[
            'Most tools run entirely in your browser — your files never touch our servers.',
            'For the few tools that use our server (AI tools, Background Remover), your data is processed and immediately discarded.',
            'We collect no analytics, use no tracking cookies, and have no ad network.',
            'We will never sell, share, or monetise your data.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-indigo-700 dark:text-indigo-300">
              <span className="mt-1 text-indigo-400">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Section icon={Lock} color={{ bg: 'bg-emerald-500/10', text: 'text-emerald-500' }} title="Browser-side tools — no upload ever">
        <p>
          The majority of UtilKit tools run entirely inside your web browser using JavaScript. This includes
          all PDF tools, most image tools, and all developer and text tools.
        </p>
        <p>
          When you use these tools, your files and data never leave your device. No bytes are transmitted
          to any server — not ours, not anyone else's. Processing happens locally using the same CPU and
          memory your browser already has access to.
        </p>
        <p className="font-medium text-zinc-700 dark:text-zinc-300">
          Browser-only tools: all PDF tools, image converter/compressor/resizer/upscaler/converters,
          all developer tools, word counter, case converter, lorem ipsum, and all viral tools.
        </p>
      </Section>

      <Section icon={Server} color={{ bg: 'bg-sky-500/10', text: 'text-sky-500' }} title="Server-side tools — HTTPS, processed, deleted">
        <p>
          A small number of tools require our server to process your request. These are:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong className="text-zinc-700 dark:text-zinc-300">AI Tools</strong> (AI Humanizer, Paraphraser, Grammar Fixer, Summarizer, Title Generator, Email Writer) — your text is sent over HTTPS to our API, which forwards it to OpenAI's GPT-4o model. The text is processed and the result is returned. We do not store the text you submit.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Background Remover</strong> — your image is sent over HTTPS to the remove.bg API for AI background removal, then returned to you. We do not store the image.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">URL Shortener</strong> — the URL you shorten is stored in our database to enable redirects. Only the URL is stored, along with a click count. No IP addresses or personal identifiers are stored.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Temp Email</strong> — a temporary email address and incoming message content is stored for up to 30 minutes, then permanently deleted.</li>
        </ul>
        <p>
          All server-to-server communication uses HTTPS/TLS encryption. Data in transit is encrypted.
        </p>
      </Section>

      <Section icon={Clock} color={{ bg: 'bg-amber-500/10', text: 'text-amber-500' }} title="Data retention">
        <p>
          For server-side tools, data is discarded immediately or within a short, fixed window:
        </p>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700/50">
          <table className="w-full text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="text-left px-4 py-2.5 text-zinc-600 dark:text-zinc-300 font-semibold">Tool</th>
                <th className="text-left px-4 py-2.5 text-zinc-600 dark:text-zinc-300 font-semibold">Data stored</th>
                <th className="text-left px-4 py-2.5 text-zinc-600 dark:text-zinc-300 font-semibold">Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700/50">
              {[
                ['AI Tools', 'Text input', 'Not stored'],
                ['Background Remover', 'Uploaded image', 'Not stored'],
                ['URL Shortener', 'Shortened URL', 'Until deleted by user'],
                ['Temp Email', 'Inbox messages', '30 minutes'],
              ].map(([tool, data, retention]) => (
                <tr key={tool} className="bg-white dark:bg-zinc-900">
                  <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300 font-medium">{tool}</td>
                  <td className="px-4 py-2.5 text-zinc-500">{data}</td>
                  <td className="px-4 py-2.5 text-zinc-500">{retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section icon={Eye} color={{ bg: 'bg-violet-500/10', text: 'text-violet-500' }} title="Cookies & analytics">
        <p>
          UtilKit uses one cookie: a theme preference (light/dark mode) stored in <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">localStorage</code>. It is never transmitted to any server.
        </p>
        <p>
          We do not use Google Analytics, Meta Pixel, or any other third-party tracking service.
          We do not serve advertisements. We do not fingerprint browsers.
        </p>
      </Section>

      <Section icon={Trash2} color={{ bg: 'bg-rose-500/10', text: 'text-rose-500' }} title="Third-party services">
        <p>
          We use the following third-party services for specific tool functionality only:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong className="text-zinc-700 dark:text-zinc-300">OpenAI</strong> — processes text for AI tools. Subject to <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500">OpenAI's privacy policy</a>. Text is not used to train models under the API terms.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">remove.bg</strong> — processes images for the Background Remover. Subject to <a href="https://www.remove.bg/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500">remove.bg's privacy policy</a>.</li>
        </ul>
        <p>
          No other third-party services receive your data.
        </p>
      </Section>

      <Section icon={Mail} color={{ bg: 'bg-pink-500/10', text: 'text-pink-500' }} title="Contact">
        <p>
          Questions about this privacy policy? Reach us at{' '}
          <a href="mailto:privacy@utilkit.io" className="underline hover:text-indigo-500">
            privacy@utilkit.io
          </a>
          . We aim to respond within 48 hours.
        </p>
      </Section>

      {/* Back */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-500 transition-colors">
          <Zap size={14} className="text-indigo-500" fill="currentColor" />
          Back to UtilKit
        </Link>
        <span className="text-xs text-zinc-400">© 2026 UtilKit. All rights reserved.</span>
      </div>
    </div>
  )
}

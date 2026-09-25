import { Shield, Lock, Server, Eye, Megaphone, Mail, Zap } from 'lucide-react'
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
          Your files stay yours
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          UtilKit is built on a simple principle: process your data, return the result, keep as little as
          possible. Every tool runs entirely in your browser, so your files never reach our servers. This
          policy explains exactly what we collect, the third-party services we use — including advertising —
          and the choices you have.
        </p>
        <p className="text-xs text-zinc-400 mt-3">Last updated: July 2026</p>
      </div>

      {/* TL;DR */}
      <div className="rounded-xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-950/30 p-5 mb-10">
        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">TL;DR — The short version</p>
        <ul className="space-y-2">
          {[
            'Every tool runs entirely in your browser — your files never touch our servers.',
            'We show ads through Google AdSense, which may use cookies to make ads more relevant.',
            'We never sell your personal data, and you can opt out of personalised ads at any time.',
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
          Every UtilKit tool runs entirely inside your web browser using JavaScript — PDF, image,
          developer, text, calculator and generator tools alike.
        </p>
        <p>
          When you use these tools, your files and data never leave your device. No bytes are transmitted
          to any server — not ours, not anyone else's. Processing happens locally using the same CPU and
          memory your browser already has access to.
        </p>
      </Section>

      <Section icon={Eye} color={{ bg: 'bg-violet-500/10', text: 'text-violet-500' }} title="Cookies & local storage">
        <p>
          UtilKit itself uses a single browser <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">localStorage</code> value
          to remember your theme preference (light/dark mode). It is never transmitted to any server.
        </p>
        <p>
          In addition, our advertising partner (Google) and its vendors may set cookies in your browser to
          serve and measure ads — see the Advertising section below for details and your opt-out choices.
          We do not run Google Analytics, Meta Pixel, or other independent tracking or fingerprinting scripts.
        </p>
      </Section>

      <Section icon={Megaphone} color={{ bg: 'bg-rose-500/10', text: 'text-rose-500' }} title="Advertising (Google AdSense)">
        <p>
          UtilKit is a free service supported by advertising. We use{' '}
          <strong className="text-zinc-700 dark:text-zinc-300">Google AdSense</strong> to display ads on some pages.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to UtilKit and other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this and other sites.</li>
          <li>Third-party vendors and ad networks may also use cookies to serve ads based on your interests.</li>
        </ul>
        <p>
          You can opt out of personalised advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500">Google Ads Settings</a>.
          You can also opt out of many third-party vendors' use of cookies for personalised advertising at{' '}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500">aboutads.info/choices</a>.
          For more information, see{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-500">Google's advertising policies</a>.
        </p>
        <p>
          Visitors in the EEA, UK and Switzerland are shown a consent prompt for personalised ads where required.
        </p>
      </Section>

      <Section icon={Server} color={{ bg: 'bg-sky-500/10', text: 'text-sky-500' }} title="Other third-party services">
        <p>
          Besides advertising, we use one other provider, strictly to power a specific feature:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong className="text-zinc-700 dark:text-zinc-300">Google Fonts</strong> — serves the site's typefaces; your browser requests font files from Google's servers.</li>
        </ul>
      </Section>

      <Section icon={Mail} color={{ bg: 'bg-pink-500/10', text: 'text-pink-500' }} title="Your rights & contact">
        <p>
          We don't store personal data on our servers, so there is very little for us to hold about you.
          If you email us, we keep that correspondence only as long as needed to reply, and you can ask us
          to delete it at any time.
        </p>
        <p>
          Questions about this privacy policy, or a request about your data? Reach us via the{' '}
          <Link to="/contact" className="underline hover:text-indigo-500">Contact page</Link> or at{' '}
          <a href="mailto:support@utilkit.us" className="underline hover:text-indigo-500">support@utilkit.us</a>.
          We aim to respond within 48 hours.
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

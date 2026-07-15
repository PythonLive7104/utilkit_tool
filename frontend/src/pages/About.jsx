import { Info, Zap, Shield, Layers, Server, Heart, Mail } from 'lucide-react'
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

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-5">
          <Info size={12} />
          About UtilKit
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
          One tab for the tools you keep re-searching
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          UtilKit brings together 68 of the everyday utilities people bounce between a dozen websites to
          find — PDF conversion, image editing, QR codes, password generation, JSON formatting, unit
          conversion and more — under one fast, ad-light, no-sign-up roof.
        </p>
      </div>

      <Section icon={Zap} color={{ bg: 'bg-amber-500/10', text: 'text-amber-500' }} title="Why we built it">
        <p>
          The web is full of single-purpose tool sites, and most of them make a simple task feel like a
          chore: pop-ups, forced sign-ups, watermarks, upload limits, and a wall of ads between you and
          the download button. If you convert a PDF on Monday and compress an image on Tuesday, you're
          learning two different clunky interfaces on two different sites.
        </p>
        <p>
          UtilKit exists to remove that friction. Every tool lives at a predictable address, opens
          instantly, and does exactly one job well. No account, no install, no “upgrade to continue.”
          You get in, get the result, and get on with your day.
        </p>
      </Section>

      <Section icon={Server} color={{ bg: 'bg-sky-500/10', text: 'text-sky-500' }} title="How it actually works">
        <p>
          Wherever it's technically possible, our tools run <strong className="text-zinc-700 dark:text-zinc-300">entirely
          inside your browser</strong>. When you merge two PDFs or resize a photo, the work happens on your
          own device using JavaScript — the file never travels to a server. That makes the tools fast,
          keeps them working even on flaky connections, and means your documents stay private by default.
        </p>
        <p>
          A small number of tools genuinely need a server — for example anything powered by an AI model,
          or the background remover. For those, data is sent over encrypted HTTPS, processed, and returned,
          and we don't retain it. Which tools use a server (and what happens to your data) is spelled out
          in full on our <Link to="/privacy" className="underline hover:text-indigo-500">Privacy Policy</Link>.
        </p>
      </Section>

      <Section icon={Layers} color={{ bg: 'bg-violet-500/10', text: 'text-violet-500' }} title="What's inside">
        <p>The catalogue is grouped into a handful of practical categories:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong className="text-zinc-700 dark:text-zinc-300">PDF tools</strong> — convert, merge, split, compress, watermark, rotate, OCR and e-sign.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Image tools</strong> — convert formats, compress, resize, upscale and remove backgrounds.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Developer tools</strong> — JSON/SQL/HTML/CSS formatters, Base64, JWT, regex, hashing and UUIDs.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Generators</strong> — QR codes, passwords, short links and more.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Calculators &amp; converters</strong> — percentages, loans, BMI, age, units and number bases.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Text tools</strong> — word counting, case conversion, lorem ipsum and more.</li>
        </ul>
        <p>
          New tools are added regularly, and each one ships with a short guide and FAQ so you're never
          guessing what a button does.
        </p>
      </Section>

      <Section icon={Shield} color={{ bg: 'bg-emerald-500/10', text: 'text-emerald-500' }} title="What we stand for">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong className="text-zinc-700 dark:text-zinc-300">Privacy first.</strong> Client-side by default; nothing stored that doesn't have to be.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Free to use.</strong> The core tools are, and will stay, free.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">No friction.</strong> No sign-up wall to run a tool, no watermarks on your output.</li>
          <li><strong className="text-zinc-700 dark:text-zinc-300">Honest UX.</strong> Clear labels, no dark patterns, no fake “scanning” timers.</li>
        </ul>
      </Section>

      <Section icon={Heart} color={{ bg: 'bg-rose-500/10', text: 'text-rose-500' }} title="How UtilKit is funded">
        <p>
          Keeping the tools free and running costs money — servers, domains, and the AI services behind a
          few of the tools. We cover that through light, clearly-marked advertising and optional paid
          upgrades for heavier users. We don't sell your data, and we never will; advertising is how the
          free tier stays free for everyone else.
        </p>
      </Section>

      <Section icon={Mail} color={{ bg: 'bg-pink-500/10', text: 'text-pink-500' }} title="Get in touch">
        <p>
          Found a bug, want a tool we don't have yet, or just want to say hi? We'd genuinely like to hear
          it — head to our <Link to="/contact" className="underline hover:text-indigo-500">Contact page</Link> or
          email <a href="mailto:support@utilkit.us" className="underline hover:text-indigo-500">support@utilkit.us</a>.
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

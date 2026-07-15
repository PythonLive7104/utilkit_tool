import { FileText, Check, Ban, AlertTriangle, Scale, RefreshCw, Mail, Zap } from 'lucide-react'
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

export default function Terms() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-medium mb-5">
          <FileText size={12} />
          Terms of Service
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
          Terms of Service &amp; Disclaimer
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          These terms govern your use of UtilKit (utilkit.us). By using the site and its tools, you agree
          to them. We've kept the language as plain as we reasonably can.
        </p>
        <p className="text-xs text-zinc-400 mt-3">Last updated: July 2026</p>
      </div>

      <Section icon={Check} color={{ bg: 'bg-emerald-500/10', text: 'text-emerald-500' }} title="Using UtilKit">
        <p>
          UtilKit provides a collection of free online utility tools. You may use them for personal or
          commercial purposes, free of charge, without creating an account. Some optional features may
          require an account or a paid plan; where they do, that will be made clear before you sign up or pay.
        </p>
        <p>
          You are responsible for the files and content you process with the tools, and for making sure you
          have the right to use them. Many of our tools run entirely in your browser, so the output you
          generate is yours to keep and use.
        </p>
      </Section>

      <Section icon={Ban} color={{ bg: 'bg-rose-500/10', text: 'text-rose-500' }} title="Acceptable use">
        <p>When using UtilKit, you agree that you will not:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Use the tools to process content that is illegal, infringing, malicious, or that you don't have the rights to.</li>
          <li>Attempt to disrupt, overload, reverse-engineer, or gain unauthorised access to the service or its infrastructure.</li>
          <li>Use automated means to abuse rate limits or resell access to server-side tools as your own service.</li>
          <li>Use the site in any way that violates applicable laws or the rights of others.</li>
        </ul>
        <p>
          We may restrict or suspend access that breaches these terms or that threatens the stability of the
          service for others.
        </p>
      </Section>

      <Section icon={AlertTriangle} color={{ bg: 'bg-amber-500/10', text: 'text-amber-500' }} title="Disclaimer — “as is”">
        <p>
          UtilKit and all of its tools are provided <strong className="text-zinc-700 dark:text-zinc-300">“as is”
          and “as available,”</strong> without warranties of any kind, whether express or implied. We do not
          guarantee that any tool will be accurate, error-free, uninterrupted, or fit for a particular purpose.
        </p>
        <p>
          Results from calculators, converters, generators, and AI-assisted tools are provided for convenience
          and should not be relied upon as professional, legal, financial, or medical advice. Always verify
          important results independently. You use the tools at your own risk, and you are responsible for
          keeping your own backups of any files you value.
        </p>
      </Section>

      <Section icon={Scale} color={{ bg: 'bg-violet-500/10', text: 'text-violet-500' }} title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, UtilKit and its operators will not be liable for any
          indirect, incidental, or consequential damages — including lost data, lost profits, or business
          interruption — arising from your use of, or inability to use, the site or its tools.
        </p>
      </Section>

      <Section icon={FileText} color={{ bg: 'bg-indigo-500/10', text: 'text-indigo-500' }} title="Advertising & third-party services">
        <p>
          UtilKit is supported in part by advertising, which may be served by third-party ad networks. Those
          networks may use cookies and similar technologies to show and measure ads; how that works, and your
          choices, are described in our{' '}
          <Link to="/privacy" className="underline hover:text-indigo-500">Privacy Policy</Link>. A few tools rely
          on third-party providers to function — links to those providers' own terms are noted where relevant.
          We are not responsible for the content or practices of external sites we link to.
        </p>
      </Section>

      <Section icon={RefreshCw} color={{ bg: 'bg-sky-500/10', text: 'text-sky-500' }} title="Changes to these terms">
        <p>
          We may update these terms from time to time as the service evolves. When we do, we'll revise the
          “last updated” date above. Continuing to use UtilKit after a change means you accept the updated terms.
        </p>
      </Section>

      <Section icon={Mail} color={{ bg: 'bg-pink-500/10', text: 'text-pink-500' }} title="Contact">
        <p>
          Questions about these terms? Reach us via the{' '}
          <Link to="/contact" className="underline hover:text-indigo-500">Contact page</Link> or at{' '}
          <a href="mailto:support@utilkit.us" className="underline hover:text-indigo-500">support@utilkit.us</a>.
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

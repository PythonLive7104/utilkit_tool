import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { tools, categories } from '../data/tools'
import AdvertiseHere from '../components/AdvertiseHere'
import {
  Zap, Shield, Lock, Search, ArrowRight, Check,
  FileText, FileOutput, Scissors, PackageOpen, Combine,
  ImageIcon, Minimize2, Eraser, Maximize, QrCode,
  Link as LinkIcon, KeyRound, Braces, Binary, SearchCode,
  GitCompare, AlignLeft, CaseSensitive, FileType, Mail,
  Globe,
  // AI tools
  Bot, RefreshCw, SpellCheck, Heading,
  // New PDF tools
  Unlock, Stamp, RotateCw, ScanText, Pen,
  // New image tools
  ZoomIn,
  // New developer tools
  ShieldCheck, Database, Code, Hash, FileCode,
  // New viral tools
  MessageSquare, Receipt, ClipboardList, Link2, Keyboard,
  // Calculators
  Percent, Cake, Scale, Landmark, BadgePercent, Ruler,
  // More dev / image / text tools
  Fingerprint, Clock, Table, Palette, FileImage, Crop, Sparkles, Spline,
  // Newest additions
  Coins, TrendingUp, CalendarDays, Blend, Square, Replace, ListMinus, ArrowDownAZ, Wand2,
} from 'lucide-react'

const iconMap = {
  FileText, FileOutput, Scissors, PackageOpen, Combine,
  ImageIcon, Minimize2, Eraser, Maximize, QrCode,
  Link: LinkIcon, KeyRound, Braces, Binary, SearchCode,
  GitCompare, AlignLeft, CaseSensitive, FileType, Mail,
  // AI tools
  Bot, RefreshCw, SpellCheck, Heading,
  // New PDF tools
  Unlock, Stamp, RotateCw, ScanText, Pen,
  // New image tools
  ZoomIn,
  // New developer tools
  ShieldCheck, Database, Code, Hash, FileCode,
  // New viral tools
  MessageSquare, Receipt, ClipboardList, Link2, Keyboard,
  // Calculators
  Percent, Cake, Scale, Landmark, BadgePercent, Ruler,
  // More dev / image / text tools
  Fingerprint, Clock, Globe, Table, Palette, FileImage, Crop, Sparkles, Spline,
  // Newest additions
  Coins, TrendingUp, CalendarDays, Blend, Square, Replace, ListMinus, ArrowDownAZ, Wand2,
}

const categoryTheme = {
  pdf:       { badge: 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20',         bar: 'bg-rose-500',       ring: 'ring-rose-500/20',      hover: 'hover:border-rose-300 dark:hover:border-rose-800' },
  image:     { badge: 'bg-sky-500/10 text-sky-500 dark:text-sky-400 border-sky-500/20',             bar: 'bg-sky-500',         ring: 'ring-sky-500/20',       hover: 'hover:border-sky-300 dark:hover:border-sky-800' },
  generator: { badge: 'bg-violet-500/10 text-violet-500 dark:text-violet-400 border-violet-500/20', bar: 'bg-violet-500',      ring: 'ring-violet-500/20',    hover: 'hover:border-violet-300 dark:hover:border-violet-800' },
  developer: { badge: 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20',     bar: 'bg-amber-500',       ring: 'ring-amber-500/20',     hover: 'hover:border-amber-300 dark:hover:border-amber-800' },
  text:      { badge: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20', bar: 'bg-emerald-500', ring: 'ring-emerald-500/20',   hover: 'hover:border-emerald-300 dark:hover:border-emerald-800' },
  ai:        { badge: 'bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20', bar: 'bg-purple-500',      ring: 'ring-purple-500/20',    hover: 'hover:border-purple-300 dark:hover:border-purple-800' },
  viral:     { badge: 'bg-pink-500/10 text-pink-500 dark:text-pink-400 border-pink-500/20',         bar: 'bg-pink-500',        ring: 'ring-pink-500/20',      hover: 'hover:border-pink-300 dark:hover:border-pink-800' },
  calculator:{ badge: 'bg-teal-500/10 text-teal-500 dark:text-teal-400 border-teal-500/20',         bar: 'bg-teal-500',        ring: 'ring-teal-500/20',      hover: 'hover:border-teal-300 dark:hover:border-teal-800' },
}

const STATS = [
  { value: '68', label: 'Free tools' },
  { value: '8', label: 'Categories' },
  { value: '0', label: 'Sign-ups needed' },
  { value: '∞', label: 'Uses per day' },
]

const WHY = [
  {
    icon: Lock,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    title: 'Privacy by design',
    body: 'Most tools run entirely inside your browser. Files are never uploaded to any server — they never leave your device.',
  },
  {
    icon: Zap,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    title: 'Instant, no friction',
    body: 'No account, no email, no waiting. Open any tool and it works immediately — results in seconds, not minutes.',
  },
  {
    icon: Globe,
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    title: 'Works everywhere',
    body: 'Fully responsive on mobile and desktop. Tested on Chrome, Firefox, Safari, and Edge across iOS and Android.',
  },
]

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://utilkit.us'
const OG_IMAGE = `${SITE_URL}/og-image.png`

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'UtilKit',
  url: SITE_URL,
  description: '68 free online tools — PDF, image, AI, developer, calculator, and text utilities. No sign-up required.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UtilKit',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description: 'Free online utility tools for everyone — PDF conversion, image editing, AI writing tools, and developer utilities.',
  sameAs: [],
}

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filtered = query.trim()
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.features?.some((f) => f.toLowerCase().includes(query.toLowerCase())),
      )
    : null

  function handleKey(e) {
    if (e.key === 'Enter' && filtered?.length) {
      navigate(filtered[0].path)
    }
  }

  return (
    <div className="min-h-screen">

      <Helmet>
        <title>UtilKit — 68 Free Online Tools. No Sign-Up Required.</title>
        <meta name="description" content="Free PDF converter, image compressor, AI writing tools, calculators, QR code generator, password generator, and 62 more utilities. All browser-based, all free, no account needed." />
        <meta property="og:type"         content="website" />
        <meta property="og:site_name"    content="UtilKit" />
        <meta property="og:url"          content={SITE_URL} />
        <meta property="og:title"        content="UtilKit — 68 Free Online Tools. No Sign-Up Required." />
        <meta property="og:description"  content="Free PDF, image, AI, developer, and text tools. All browser-based. No account required." />
        <meta property="og:image"        content={OG_IMAGE} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:site"        content="@utilkit" />
        <meta name="twitter:title"       content="UtilKit — 68 Free Online Tools" />
        <meta name="twitter:description" content="PDF, image, AI, developer, and text tools. Free, no sign-up." />
        <meta name="twitter:image"       content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight tracking-tight">
          Every utility tool you<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
            actually need, in one place
          </span>
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mx-auto mb-8">
          PDF conversion, image editing, QR codes, developer utilities, and text tools — all browser-based, all free, all private.
        </p>

        {/* Search */}
        <div className="relative max-w-lg mx-auto mb-4">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search tools — e.g. 'compress', 'Base64', 'QR code'…"
            className="input pl-11 py-3.5 text-base rounded-xl shadow-sm"
          />
          {query && filtered && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-400">
          Press <kbd className="px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-[11px]">Enter</kbd> to open the first result
        </p>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      {!filtered && (
        <section className="px-4 pb-10">
          <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map(({ value, label }) => (
              <div key={label} className="card text-center py-4">
                <p className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">{value}</p>
                <p className="text-xs text-zinc-500 mt-0.5 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Advertise here CTA (no ads on the homepage) ─────── */}
      {!filtered && (
        <section className="px-4 pb-10">
          <div className="max-w-3xl mx-auto">
            <AdvertiseHere />
          </div>
        </section>
      )}

      {/* ── Search results ─────────────────────────────────── */}
      {filtered && (
        <section className="px-4 pb-16 max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400 text-sm mb-2">No tools match "{query}"</p>
              <button onClick={() => setQuery('')} className="btn-ghost text-xs">Clear search</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Why UtilKit ────────────────────────────────────── */}
      {!filtered && (
        <section className="px-4 pb-12">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4">
            {WHY.map(({ icon: Icon, color, bg, title, body }) => (
              <div key={title} className="card">
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                  <Icon size={17} className={color} />
                </div>
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm mb-1">{title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Category sections ──────────────────────────────── */}
      {!filtered &&
        categories.map((cat) => {
          const catTools = tools.filter((t) => t.category === cat.id)
          return (
            <section key={cat.id} className="px-4 pb-14">
              <div className="max-w-5xl mx-auto">
                {/* Category header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className={`text-base font-bold mb-1 ${cat.color}`}>
                      {cat.name}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
                      {cat.description}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-zinc-400 mt-1">
                    {catTools.length} tool{catTools.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Divider */}
                <div className={`h-px mb-6 ${categoryTheme[cat.id].bar} opacity-20`} />

                {/* Tool cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}

      {/* ── How it works ───────────────────────────────────── */}
      {!filtered && (
        <section className="px-4 py-14 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">How it works</h2>
            <p className="text-sm text-zinc-500 mb-10">Three steps — that's all it takes.</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Pick a tool', body: 'Browse by category or search by name. Every tool is one click away from the sidebar.' },
                { step: '02', title: 'Drop your file or paste text', body: 'Upload a file, paste content, or fill in a form. No account, no email verification.' },
                { step: '03', title: 'Download your result', body: 'Processing happens instantly — usually under 3 seconds. Download your result directly.' },
              ].map(({ step, title, body }) => (
                <div key={step} className="text-left">
                  <div className="text-3xl font-black text-indigo-500/20 dark:text-indigo-400/20 mb-2 font-mono">{step}</div>
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mb-1">{title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="px-4 py-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap size={14} className="text-indigo-500" fill="currentColor" />
          <span className="font-bold text-sm text-zinc-700 dark:text-zinc-300">UtilKit</span>
        </div>
        <p className="text-xs text-zinc-400">
          68 free utility tools · No account required ·{' '}
          <NavLink to="/blog" className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            Blog
          </NavLink>
          {' '}·{' '}
          <NavLink to="/privacy" className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            Privacy policy
          </NavLink>
        </p>
      </footer>

    </div>
  )
}

/* ── Tool Card ─────────────────────────────────────────────── */
function ToolCard({ tool }) {
  const Icon = iconMap[tool.icon] || FileText
  const theme = categoryTheme[tool.category]

  return (
    <Link
      to={tool.path}
      className={`card flex flex-col gap-3 transition-all group ${theme.hover} hover:shadow-sm`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg border flex-shrink-0 ${theme.badge}`}>
            <Icon size={15} />
          </div>
          <div>
            <p className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm leading-tight group-hover:text-zinc-900 dark:group-hover:text-white">
              {tool.name}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-500 leading-relaxed">{tool.description}</p>

      {/* Feature list */}
      {tool.features && (
        <ul className="space-y-1.5">
          {tool.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <Check size={11} className={`flex-shrink-0 mt-0.5 ${theme.badge.split(' ')[1]}`} />
              <span className="leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Use case */}
      {tool.useCase && (
        <p className="text-[11px] text-zinc-400 italic leading-snug border-t border-zinc-100 dark:border-zinc-800 pt-3">
          💡 {tool.useCase}
        </p>
      )}

      {/* CTA */}
      <div className="flex items-center gap-1 text-xs font-medium text-indigo-500 dark:text-indigo-400 mt-auto pt-1">
        Open tool
        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  )
}

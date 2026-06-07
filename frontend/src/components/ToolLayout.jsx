import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, ArrowRight, Check } from 'lucide-react'
import ToolSEO from './ToolSEO'
import TrustBadges from './TrustBadges'
import AdSlot from './AdSlot'
import PaystackButton from './PaystackButton'
import { useSeoOverride } from '../context/SeoOverrideContext'
import { tools } from '../data/tools'
import { toolContent } from '../data/toolContent'

const categoryColors = {
  ai:        'text-purple-500 dark:text-purple-400',
  pdf:       'text-rose-500 dark:text-rose-400',
  image:     'text-sky-500 dark:text-sky-400',
  generator: 'text-violet-500 dark:text-violet-400',
  developer: 'text-amber-500 dark:text-amber-400',
  text:      'text-emerald-500 dark:text-emerald-400',
  calculator:'text-teal-500 dark:text-teal-400',
  viral:     'text-pink-500 dark:text-pink-400',
}

// ── How to use ────────────────────────────────────────────────────────────────
function HowTo({ steps, toolName }) {
  return (
    <div className="mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-8">
      <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-6">
        How to use {toolName}
      </h2>
      <ol className="space-y-5">
        {steps.map(({ step, title, body }) => (
          <li key={step} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
              {step}
            </span>
            <div className="pt-1">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-0.5">{title}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ── Why use this tool ────────────────────────────────────────────────────────
function Why({ text }) {
  return (
    <div className="mt-8">
      <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-3">Why use this tool?</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{text}</p>
    </div>
  )
}

// ── Common use cases ──────────────────────────────────────────────────────────
function UseCases({ cases }) {
  return (
    <div className="mt-8">
      <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-4">Common use cases</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {cases.map(({ title, body }) => (
          <div key={title} className="rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check size={13} className="text-indigo-500 flex-shrink-0" />
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{title}</p>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="mt-8">
      <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-4">Frequently asked questions</h2>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-700/60 border border-zinc-200 dark:border-zinc-700/60 rounded-xl overflow-hidden">
        {items.map(({ q, a }, i) => (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{q}</span>
              {open === i
                ? <ChevronUp size={15} className="flex-shrink-0 text-zinc-400" />
                : <ChevronDown size={15} className="flex-shrink-0 text-zinc-400" />}
            </button>
            {open === i && (
              <div className="px-4 pb-4 bg-zinc-50 dark:bg-zinc-800/40">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Related tools ─────────────────────────────────────────────────────────────
function RelatedTools({ toolId }) {
  const tool = tools.find((t) => t.id === toolId)
  if (!tool?.related?.length) return null

  const related = tool.related.map((id) => tools.find((t) => t.id === id)).filter(Boolean)
  if (!related.length) return null

  return (
    <div className="mt-8">
      <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-4">Related tools</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {related.map((t) => (
          <Link
            key={t.id}
            to={t.path}
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all group"
          >
            <div>
              <p className={`text-xs font-semibold mb-0.5 ${categoryColors[t.category]}`}>
                {t.category.toUpperCase()}
              </p>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-snug">
                {t.name}
              </p>
            </div>
            <ArrowRight size={14} className="flex-shrink-0 text-zinc-300 dark:text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Support CTA ───────────────────────────────────────────────────────────────
function CoffeeBox() {
  return (
    <div className="mt-10 rounded-2xl border border-indigo-400/20 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 text-center">
      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-1">Enjoying UtilKit?</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        All 63 tools are free. If we saved you time, a small support keeps the lights on.
      </p>
      <PaystackButton />
    </div>
  )
}

// ── Main layout ───────────────────────────────────────────────────────────────
export default function ToolLayout({ title, description, about, toolId, children }) {
  const [showAbout, setShowAbout] = useState(false)
  const override = useSeoOverride()
  const programmatic = !!override?.programmatic

  const tool = tools.find((t) => t.id === toolId)
  const clientSide = tool?.clientSide ?? true
  const content = toolId ? toolContent[toolId] : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!programmatic && (
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">{title}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{description}</p>
        </div>
      )}

      {toolId && <TrustBadges clientSide={clientSide} />}

      {children}

      {/* Category-targeted advert (or "Advertise here" when the slot is empty) */}
      {tool?.category && <AdSlot category={tool.category} />}

      {content?.howTo    && <HowTo steps={content.howTo} toolName={title} />}
      {content?.why      && <Why text={content.why} />}
      {content?.useCases && <UseCases cases={content.useCases} />}
      {content?.faq      && <FAQ items={content.faq} />}
      {toolId            && <RelatedTools toolId={toolId} />}

      {about && (
        <div className="mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="flex items-center justify-between w-full text-left group mb-1"
          >
            <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors">
              About this tool
            </h2>
            {showAbout
              ? <ChevronUp size={15} className="text-zinc-400" />
              : <ChevronDown size={15} className="text-zinc-400" />}
          </button>
          {showAbout && (
            <div className="mt-4 space-y-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
              {(Array.isArray(about) ? about : [about]).map((para, i) => (
                <p key={i} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{para}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <CoffeeBox />

      {toolId && <ToolSEO toolId={toolId} />}
    </div>
  )
}

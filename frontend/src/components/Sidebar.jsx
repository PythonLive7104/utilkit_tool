import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { tools, categories } from '../data/tools'
import {
  Zap, Search, FileText, FileOutput, Scissors, PackageOpen, Combine,
  ImageIcon, Minimize2, Eraser, Maximize, QrCode, Link, KeyRound,
  Braces, Binary, SearchCode, GitCompare, AlignLeft, CaseSensitive,
  FileType, Mail, X,
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
} from 'lucide-react'

const iconMap = {
  // Original tools
  FileText, FileOutput, Scissors, PackageOpen, Combine,
  ImageIcon, Minimize2, Eraser, Maximize, QrCode, Link, KeyRound,
  Braces, Binary, SearchCode, GitCompare, AlignLeft, CaseSensitive,
  FileType, Mail,
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
}

const categoryColors = {
  ai: 'text-purple-500 dark:text-purple-400',
  pdf: 'text-rose-500 dark:text-rose-400',
  image: 'text-sky-500 dark:text-sky-400',
  generator: 'text-violet-500 dark:text-violet-400',
  developer: 'text-amber-500 dark:text-amber-400',
  text: 'text-emerald-500 dark:text-emerald-400',
  calculator: 'text-teal-500 dark:text-teal-400',
  viral: 'text-pink-500 dark:text-pink-400',
}

export default function Sidebar({ onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filtered = query.trim()
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()),
      )
    : null

  function handleKey(e) {
    if (e.key === 'Enter' && filtered?.length) {
      navigate(filtered[0].path)
      onClose?.()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 transition-colors duration-150">
      {/* Brand */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
        <NavLink to="/" className="flex items-center gap-2" onClick={onClose}>
          <Zap size={20} className="text-indigo-500" fill="currentColor" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">UtilKit</span>
        </NavLink>
        <button className="lg:hidden btn-ghost p-1.5" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search tools..."
            className="input pl-8 py-1.5 text-sm"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {filtered ? (
          <div>
            <p className="px-2 py-1 text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
              Results
            </p>
            {filtered.length === 0 && (
              <p className="px-2 py-3 text-sm text-zinc-500">No tools found</p>
            )}
            {filtered.map((tool) => (
              <SidebarLink key={tool.id} tool={tool} onClose={onClose} />
            ))}
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="mb-4">
              <p className={`px-2 py-1 text-xs font-semibold uppercase tracking-wider mb-1 ${categoryColors[cat.id]}`}>
                {cat.name}
              </p>
              {tools
                .filter((t) => t.category === cat.id)
                .map((tool) => (
                  <SidebarLink key={tool.id} tool={tool} onClose={onClose} />
                ))}
            </div>
          ))
        )}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 flex-shrink-0">
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          63 tools · All free ·{' '}
          <NavLink to="/blog" onClick={onClose} className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
            Blog
          </NavLink>
          {' '}·{' '}
          <NavLink to="/advertise" onClick={onClose} className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
            Advertise
          </NavLink>
          {' '}·{' '}
          <NavLink to="/privacy" onClick={onClose} className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
            Privacy
          </NavLink>
        </p>
      </div>
    </div>
  )
}

function SidebarLink({ tool, onClose }) {
  const Icon = iconMap[tool.icon] || FileText

  return (
    <NavLink
      to={tool.path}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors group ${
          isActive
            ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`
      }
    >
      <Icon size={15} className="flex-shrink-0 opacity-70 group-hover:opacity-100" />
      <span className="truncate">{tool.name}</span>
    </NavLink>
  )
}

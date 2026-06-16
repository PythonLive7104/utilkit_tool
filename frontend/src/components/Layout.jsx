import { useState, useEffect, Suspense } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import SupportButton from './SupportButton'
import ContactWidget from './ContactWidget'
import { useAuth } from '../lib/auth'
import { Menu, Moon, Sun, Zap, LayoutDashboard, LogIn } from 'lucide-react'

export default function Layout() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-150">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0 lg:flex-shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex-shrink-0 transition-colors duration-150">
          <button
            className="lg:hidden btn-ghost p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            <Zap size={18} className="text-indigo-500" fill="currentColor" />
            <span className="font-bold text-zinc-900 dark:text-zinc-100">UtilKit</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <LayoutDashboard size={16} /> <span className="hidden sm:inline">Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <LogIn size={16} /> <span className="hidden sm:inline">Log in</span>
              </Link>
            )}
            <button
              onClick={() => setDark(!dark)}
              className="btn-ghost p-2 rounded-lg"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-500" />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 transition-colors duration-150">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      <SupportButton variant="floating" label="☕ Support our Team" />
      <ContactWidget />
    </div>
  )
}

// Shown while a lazy-loaded route chunk downloads. Lightweight and centered so
// the app shell (sidebar + top bar) stays visible during the brief load.
function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24" aria-label="Loading">
      <span className="w-7 h-7 rounded-full border-[3px] border-indigo-500/30 border-t-indigo-500 animate-spin" />
    </div>
  )
}

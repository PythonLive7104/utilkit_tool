import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { urlShortener } from '../../lib/api'
import { Link, Copy, Check, Trash2, QrCode, AlertCircle, Loader2, BarChart2 } from 'lucide-react'

const ABOUT = [
  'URL Shortener converts long URLs into compact, shareable links. Each link gets a unique code that redirects anyone who visits it to the original destination.',
  'Optional custom slugs let you create memorable links like /s/my-project instead of a random code. Slugs can only contain letters, numbers, hyphens, and underscores — no spaces or special characters.',
  'Set an expiration date so links automatically stop working after a chosen period — useful for time-limited promotions, event invites, temporary file shares, or any URL you don\'t want to remain active indefinitely.',
  'The QR code button generates a scannable QR code for any short link, making it easy to share URLs at events, in presentations, or printed materials. Live click counts let you see how popular each link is.',
]

export default function UrlShortener() {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [expiresInDays, setExpiresInDays] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(null)
  const [showQr, setShowQr] = useState(null)

  function normalizeUrl(raw) {
    const t = raw.trim()
    if (!t) return ''
    return /^https?:\/\//i.test(t) ? t : `https://${t}`
  }

  async function shorten() {
    if (!url.trim()) return
    setStatus('loading')
    setError('')
    try {
      const days = parseInt(expiresInDays) || null
      const data = await urlShortener.shorten(normalizeUrl(url), slug.trim(), days)
      setResult(data)
      setHistory((prev) => [data, ...prev.filter((h) => h.code !== data.code)])
      setSlug('')
      setExpiresInDays('')
    } catch (err) {
      setError(err.message)
    } finally {
      setStatus('idle')
    }
  }

  async function deleteLink(code) {
    try {
      await urlShortener.delete(code)
      setHistory((prev) => prev.filter((h) => h.code !== code))
      if (result?.code === code) setResult(null)
    } catch {}
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  async function generateQr(shortUrl) {
    const QRCode = (await import('qrcode')).default
    const dataUrl = await QRCode.toDataURL(shortUrl, { width: 300, margin: 2 })
    setShowQr(dataUrl)
  }

  const totalClicks = history.reduce((sum, h) => sum + (h.clicks || 0), 0)

  return (
    <ToolLayout
      title="URL Shortener"
      description="Turn any long URL into a short, shareable link with optional custom slug and click tracking."
      toolId="url-shortener"
      about={ABOUT}
    >
      <div className="card mb-4">
        <div className="mb-3">
          <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Long URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && shorten()}
            placeholder="https://example.com/very/long/url/that/needs/shortening"
            className="input"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
              Custom slug <span className="text-zinc-400">(optional)</span>
            </label>
            <div className="flex">
              <span className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-r-0 border-zinc-200 dark:border-zinc-700 rounded-l-lg text-xs text-zinc-500 whitespace-nowrap">
                /s/
              </span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                placeholder="my-link"
                className="input rounded-l-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
              Expires in <span className="text-zinc-400">(optional)</span>
            </label>
            <select
              value={expiresInDays}
              onChange={(e) => setExpiresInDays(e.target.value)}
              className="input"
            >
              <option value="">Never</option>
              <option value="1">1 day</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 dark:text-red-400 text-sm mb-3">
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        <button
          className="btn-primary"
          onClick={shorten}
          disabled={!url.trim() || status === 'loading'}
        >
          {status === 'loading'
            ? <><Loader2 size={15} className="animate-spin" /> Shortening...</>
            : <><Link size={15} /> Shorten URL</>}
        </button>
      </div>

      {result && (
        <div className="card mb-6 border-indigo-500/30">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">Your short link</p>
          <div className="flex items-center gap-2 mb-2">
            <input readOnly value={result.short_url} className="input flex-1 font-mono text-indigo-600 dark:text-indigo-300 text-sm" />
            <button className="btn-secondary px-3" onClick={() => copy(result.short_url, 'result')}>
              {copied === 'result' ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            </button>
            <button className="btn-secondary px-3" onClick={() => generateQr(result.short_url)} title="QR code">
              <QrCode size={15} />
            </button>
          </div>
          <p className="text-xs text-zinc-400 truncate">→ {result.original_url}</p>
          {result.expires_at && (
            <p className="text-xs text-amber-500 dark:text-amber-400 mt-1">
              Expires {new Date(result.expires_at).toLocaleDateString()}
            </p>
          )}

          {showQr && (
            <div className="mt-3 flex items-center gap-3">
              <img src={showQr} alt="QR" className="w-24 h-24 rounded" />
              <div>
                <p className="text-xs text-zinc-500 mb-1">QR code for your short link</p>
                <a href={showQr} download="qrcode.png" className="btn-secondary text-xs">
                  Download
                </a>
                <button className="btn-ghost text-xs ml-2" onClick={() => setShowQr(null)}>Close</button>
              </div>
            </div>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Recent links <span className="text-xs font-normal text-zinc-400 ml-1">this session</span>
            </p>
            {totalClicks > 0 && (
              <span className="flex items-center gap-1 text-xs text-indigo-400">
                <BarChart2 size={12} /> {totalClicks} total click{totalClicks !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="space-y-2">
            {history.map((item) => (
              <div key={item.code} className="flex items-center gap-3 py-2 px-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-indigo-600 dark:text-indigo-300 font-mono truncate">{item.short_url}</p>
                  <p className="text-xs text-zinc-400 truncate">{item.original_url}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-xs text-zinc-400">{item.clicks} clicks</span>
                  <button className="btn-ghost p-1.5" onClick={() => copy(item.short_url, item.code)}>
                    {copied === item.code ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  </button>
                  <button className="btn-ghost p-1.5" onClick={() => generateQr(item.short_url)} title="QR code">
                    <QrCode size={13} />
                  </button>
                  <button className="btn-ghost p-1.5 text-red-400 hover:text-red-500" onClick={() => deleteLink(item.code)}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

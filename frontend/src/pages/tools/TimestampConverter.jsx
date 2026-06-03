import { useState, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, Clock } from 'lucide-react'

const ABOUT = [
  'Timestamp Converter turns a Unix epoch timestamp (seconds or milliseconds) into a human-readable date, and converts any date back to a Unix timestamp.',
  'Unix time counts the seconds since 1 January 1970 UTC and is the standard time format in databases, APIs, and logs.',
  'Conversions happen instantly in your browser, showing both your local time and UTC.',
]

function pad(n) { return String(n).padStart(2, '0') }
function fmt(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export default function TimestampConverter() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000))
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)))
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 19))
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000)
    return () => clearInterval(id)
  }, [])

  // parse timestamp -> date
  let parsedDate = null
  const tsNum = parseInt(ts, 10)
  if (Number.isFinite(tsNum)) {
    const ms = ts.trim().length > 11 ? tsNum : tsNum * 1000
    const d = new Date(ms)
    if (!isNaN(d)) parsedDate = d
  }

  // parse date -> timestamp
  const dateToTs = (() => {
    const d = new Date(dateStr)
    return isNaN(d) ? null : Math.floor(d.getTime() / 1000)
  })()

  function copy(text, key) {
    navigator.clipboard.writeText(String(text))
    setCopied(key); setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert Unix epoch timestamps to human-readable dates and back. Supports seconds and milliseconds."
      toolId="timestamp-converter"
      about={ABOUT}
    >
      <div className="card mb-4 flex items-center justify-between">
        <span className="text-sm text-zinc-400 flex items-center gap-2"><Clock size={14} /> Current Unix time</span>
        <button className="text-lg font-bold text-indigo-400 font-mono flex items-center gap-2" onClick={() => copy(now, 'now')}>
          {now} {copied === 'now' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-zinc-500" />}
        </button>
      </div>

      <div className="card mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">Timestamp → Date</label>
        <input className="input font-mono mb-3" value={ts} onChange={e => setTs(e.target.value)} placeholder="1700000000" />
        {parsedDate && (
          <div className="space-y-1.5 text-sm">
            <p className="text-zinc-400">Local: <span className="text-zinc-200 font-mono">{fmt(parsedDate)}</span></p>
            <p className="text-zinc-400">UTC: <span className="text-zinc-200 font-mono">{parsedDate.toUTCString()}</span></p>
            <p className="text-zinc-400">ISO: <span className="text-zinc-200 font-mono">{parsedDate.toISOString()}</span></p>
          </div>
        )}
      </div>

      <div className="card">
        <label className="block text-xs text-zinc-500 mb-1.5">Date → Timestamp</label>
        <input type="datetime-local" step="1" className="input mb-3" value={dateStr} onChange={e => setDateStr(e.target.value)} />
        {dateToTs !== null && (
          <button className="text-lg font-bold text-emerald-400 font-mono flex items-center gap-2" onClick={() => copy(dateToTs, 'd')}>
            {dateToTs} {copied === 'd' ? <Check size={14} /> : <Copy size={14} className="text-zinc-500" />}
          </button>
        )}
      </div>
    </ToolLayout>
  )
}

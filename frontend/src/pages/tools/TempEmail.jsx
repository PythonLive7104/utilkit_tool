import { useState, useEffect, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { tempEmail as api } from '../../lib/api'
import { Copy, Check, RefreshCw, Mail, Clock, Inbox, Loader2, AlertCircle } from 'lucide-react'

const POLL_INTERVAL = 10_000

const ABOUT = [
  'Temp Email generates a disposable email address that you can use to sign up for websites, receive verification codes, or test email workflows — without exposing your real address to spam.',
  'The inbox polls for new messages automatically every 10 seconds. All messages remain visible for 30 minutes from when the address was created. Use the +15 min button to extend the lifetime as needed.',
  'Each address is private to your session. When the inbox expires, all associated messages are permanently deleted — nothing is kept after the timer runs out.',
  'The manual refresh button lets you check for new messages immediately without waiting for the next automatic poll — useful when you\'re waiting for a time-sensitive verification email.',
]

export default function TempEmail() {
  const [address, setAddress] = useState(null)
  const [domains, setDomains] = useState([])
  const [selectedDomain, setSelectedDomain] = useState('')
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState('idle')
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const pollRef = useRef()
  const timerRef = useRef()
  const seenRef = useRef(new Set())

  useEffect(() => {
    api.domains()
      .then((d) => {
        setDomains(d.domains || [])
        setSelectedDomain(d.domains?.[0] || '')
      })
      .catch(() => {
        setDomains(['tempmail.dev', 'mailnull.io', 'throwaway.email'])
        setSelectedDomain('tempmail.dev')
      })
    return () => { clearInterval(pollRef.current); clearInterval(timerRef.current) }
  }, [])

  useEffect(() => {
    clearInterval(timerRef.current)
    if (!address) return
    setTimeLeft(address.seconds_remaining)
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [address?.expires_at])

  useEffect(() => {
    clearInterval(pollRef.current)
    if (!address || address.is_expired) return
    pollRef.current = setInterval(async () => {
      await fetchMessages()
    }, POLL_INTERVAL)
    return () => clearInterval(pollRef.current)
  }, [address?.address])

  async function fetchMessages() {
    if (!address) return
    try {
      const msgs = await api.messages(address.address)
      setMessages(msgs)
      const newUnread = msgs.filter((m) => !seenRef.current.has(m.id) && !m.read).length
      if (newUnread > 0) setUnreadCount((u) => u + newUnread)
      msgs.forEach((m) => seenRef.current.add(m.id))
    } catch {}
  }

  async function manualRefresh() {
    setRefreshing(true)
    await fetchMessages()
    setTimeout(() => setRefreshing(false), 600)
  }

  async function createAddress() {
    setStatus('creating')
    setError('')
    clearInterval(pollRef.current)
    seenRef.current = new Set()
    setUnreadCount(0)
    try {
      const data = await api.create(selectedDomain)
      setAddress(data)
      setMessages([])
      setSelected(null)
      setStatus('idle')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  async function extendAddress() {
    if (!address) return
    try {
      const updated = await api.extend(address.address)
      setAddress(updated)
    } catch (err) {
      setError(err.message)
    }
  }

  async function openMessage(msg) {
    seenRef.current.add(msg.id)
    setUnreadCount(0)
    try {
      const full = await api.getMessage(address.address, msg.id)
      setSelected(full)
    } catch {
      setSelected(msg)
    }
  }

  function copy() {
    if (!address) return
    navigator.clipboard.writeText(address.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function fmtTime(secs) {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  function fmtTs(iso) {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const expired = timeLeft === 0 && !!address

  return (
    <ToolLayout
      title="Temp Email"
      description="Get a disposable email address with a live inbox. Auto-expires in 30 minutes."
      toolId="temp-email"
      about={ABOUT}
    >
      {!address && (
        <div className="card mb-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-3">
            Generate a disposable address
          </p>
          <div className="flex gap-3 mb-4">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="input"
              disabled={domains.length === 0}
            >
              {domains.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <button
              className="btn-primary flex-shrink-0"
              onClick={createAddress}
              disabled={status === 'creating'}
            >
              {status === 'creating'
                ? <><Loader2 size={15} className="animate-spin" /> Creating...</>
                : <><Mail size={15} /> Get Address</>}
            </button>
          </div>
          <p className="text-xs text-zinc-400">Inbox is active for 30 minutes. Extend as needed.</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 dark:text-red-400 text-sm mb-4">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {address && (
        <div className="card mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail size={15} className="text-indigo-500" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Your temporary address</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <input
              readOnly
              value={address.address}
              className="input flex-1 font-mono text-indigo-600 dark:text-indigo-300 text-sm"
            />
            <button className="btn-secondary px-3" onClick={copy}>
              {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            </button>
            <button className="btn-secondary px-3" onClick={createAddress} title="New address">
              <RefreshCw size={15} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-1.5 text-sm ${expired ? 'text-red-500' : timeLeft < 300 ? 'text-amber-500' : 'text-zinc-500 dark:text-zinc-400'}`}>
              <Clock size={14} />
              {expired ? 'Inbox expired' : `Expires in ${fmtTime(timeLeft)}`}
            </div>
            {!expired && (
              <button className="btn-ghost text-xs" onClick={extendAddress}>
                +15 min
              </button>
            )}
          </div>
        </div>
      )}

      {address && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Inbox size={15} className="text-zinc-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Inbox</span>
              {messages.length > 0 && (
                <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs rounded-full">
                  {messages.length}
                </span>
              )}
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-semibold">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Auto-polls every 10s</span>
              {!expired && (
                <button className="btn-ghost text-xs py-1 px-2" onClick={manualRefresh} disabled={refreshing}>
                  <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} /> Refresh
                </button>
              )}
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-10 text-zinc-400">
              <Mail size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No emails yet</p>
              <p className="text-xs mt-1">Waiting for messages…</p>
            </div>
          ) : (
            <div className="space-y-1">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selected?.id === msg.id
                      ? 'border-indigo-500/40 bg-indigo-50 dark:bg-indigo-500/5'
                      : 'border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm font-medium truncate ${msg.read ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-800 dark:text-zinc-100'}`}>
                      {!msg.read && <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1.5 mb-0.5" />}
                      {msg.subject || '(no subject)'}
                    </span>
                    <span className="text-xs text-zinc-400 flex-shrink-0 ml-2">{fmtTs(msg.received_at)}</span>
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{msg.sender}</p>
                </button>
              ))}
            </div>
          )}

          {selected && (
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="mb-3">
                <p className="font-medium text-zinc-800 dark:text-zinc-100 text-sm mb-1">
                  {selected.subject || '(no subject)'}
                </p>
                <p className="text-xs text-zinc-500">From: {selected.sender}</p>
                <p className="text-xs text-zinc-400">{new Date(selected.received_at).toLocaleString()}</p>
              </div>
              {selected.body_html ? (
                <div
                  className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selected.body_html }}
                />
              ) : (
                <pre className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                  {selected.body_text || '(empty message)'}
                </pre>
              )}
              <button className="btn-ghost text-xs mt-3" onClick={() => setSelected(null)}>
                Close message
              </button>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  )
}

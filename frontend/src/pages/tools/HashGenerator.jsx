import { useState, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check } from 'lucide-react'

const ABOUT = [
  'Hash Generator computes SHA-1, SHA-256, SHA-384, and SHA-512 digests of any text using the browser\'s native Web Crypto API.',
  'Cryptographic hashes turn input of any length into a fixed-length fingerprint. The same input always produces the same hash, but the original text cannot be recovered from it.',
  'Hashing happens entirely in your browser — your input never leaves your device.',
]

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

async function hashText(algo, text) {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest(algo, data)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function HashGenerator() {
  const [text, setText] = useState('')
  const [hashes, setHashes] = useState({})
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    let active = true
    if (!text) { setHashes({}); return }
    Promise.all(ALGOS.map(a => hashText(a, text).then(h => [a, h]))).then(entries => {
      if (active) setHashes(Object.fromEntries(entries))
    })
    return () => { active = false }
  }, [text])

  function copy(algo) {
    navigator.clipboard.writeText(hashes[algo])
    setCopied(algo); setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text instantly in your browser."
      toolId="hash-generator"
      about={ABOUT}
    >
      <div className="card mb-4">
        <label className="block text-xs text-zinc-500 mb-1.5">Text to hash</label>
        <textarea
          className="input font-mono text-sm min-h-[120px]"
          placeholder="Type or paste text…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      {text && (
        <div className="space-y-3">
          {ALGOS.map(algo => (
            <div key={algo} className="card">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-indigo-400">{algo}</span>
                <button className="btn-ghost py-1 px-2 text-xs" onClick={() => copy(algo)}>
                  {copied === algo ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>
              <p className="text-xs text-zinc-300 font-mono break-all">{hashes[algo] || '…'}</p>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  )
}

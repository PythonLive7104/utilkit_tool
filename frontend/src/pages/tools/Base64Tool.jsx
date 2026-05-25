import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, ArrowLeftRight, Upload, Download, AlertCircle } from 'lucide-react'

const ABOUT = [
  'Base64 Encoder / Decoder converts text or binary files to and from Base64 — a standard encoding that represents binary data as ASCII text using 64 printable characters.',
  'Base64 is widely used in data URLs (embedding images in HTML/CSS), JWT tokens, email attachments (MIME), and HTTP Basic Authentication headers. Encoding increases size by approximately 33%.',
  'URL-safe mode replaces the standard + and / characters with - and _ and removes padding (=) — producing output that can be included directly in URLs and filenames without percent-encoding.',
  'The file encode button reads any file and outputs its Base64 representation — useful for embedding small assets in JSON configs, data URIs, or API payloads. The decode + save button reverses this.',
]

export default function Base64Tool() {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [urlSafe, setUrlSafe] = useState(false)
  const [lineWrap, setLineWrap] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileRef = useRef()

  function encode(text) {
    try {
      let result = btoa(unescape(encodeURIComponent(text)))
      if (urlSafe) result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
      if (lineWrap) result = result.match(/.{1,76}/g).join('\n')
      return result
    } catch {
      throw new Error('Encoding failed. Input contains invalid characters.')
    }
  }

  function decode(b64) {
    try {
      let str = b64.trim().replace(/\s+/g, '')
      if (urlSafe) str = str.replace(/-/g, '+').replace(/_/g, '/')
      while (str.length % 4 !== 0) str += '='
      return decodeURIComponent(escape(atob(str)))
    } catch {
      throw new Error('Invalid Base64 string. Make sure the input is valid Base64.')
    }
  }

  function run() {
    setError('')
    try {
      setOutput(mode === 'encode' ? encode(input) : decode(input))
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  function swap() {
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'))
    setInput(output)
    setOutput('')
    setError('')
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function loadFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFileName(f.name)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const b64 = ev.target.result.split(',')[1]
      if (mode === 'encode') {
        setInput(`[File: ${f.name}]`)
        setOutput(b64)
        setError('')
      } else {
        setInput(b64)
      }
    }
    reader.readAsDataURL(f)
  }

  function downloadDecoded() {
    const bytes = atob(output.trim().replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/'))
    const arr = new Uint8Array(bytes.length)
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
    const blob = new Blob([arr])
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName ? `decoded_${fileName}` : 'decoded_file'
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputBytes = new Blob([input]).size
  const outputBytes = output ? new Blob([output]).size : 0

  return (
    <ToolLayout
      title="Base64 Encoder / Decoder"
      description="Encode text or files to Base64 and decode Base64 back to content. Supports URL-safe variant."
      toolId="base64-tool"
      about={ABOUT}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex rounded-lg border border-zinc-700 overflow-hidden">
          <button
            onClick={() => { setMode('encode'); setInput(''); setOutput(''); setError('') }}
            className={`px-4 py-2 text-sm transition-colors ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode('decode'); setInput(''); setOutput(''); setError('') }}
            className={`px-4 py-2 text-sm transition-colors ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Decode
          </button>
        </div>

        <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={urlSafe} onChange={() => setUrlSafe(!urlSafe)} className="accent-indigo-500" />
          URL-safe Base64
        </label>

        {mode === 'encode' && (
          <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
            <input type="checkbox" checked={lineWrap} onChange={() => setLineWrap(!lineWrap)} className="accent-indigo-500" />
            76-char line wrap (MIME)
          </label>
        )}

        {mode === 'encode' && (
          <label className="btn-ghost text-xs cursor-pointer ml-auto">
            <Upload size={13} /> Encode file
            <input ref={fileRef} type="file" className="hidden" onChange={loadFile} />
          </label>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">
              {mode === 'encode' ? 'Plain text input' : 'Base64 input'}
            </label>
            <span className="text-xs text-zinc-600">{inputBytes.toLocaleString()} bytes</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError('') }}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'}
            rows={10}
            className="textarea text-sm"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-zinc-500">
              {mode === 'encode' ? 'Base64 output' : 'Decoded output'}
            </label>
            <div className="flex items-center gap-3">
              {output && <span className="text-xs text-zinc-600">{outputBytes.toLocaleString()} bytes</span>}
              <div className="flex gap-1">
                {mode === 'decode' && output && (
                  <button className="btn-ghost text-xs py-1 px-2" onClick={downloadDecoded}>
                    <Download size={12} /> Save file
                  </button>
                )}
                {output && (
                  <button className="btn-ghost text-xs py-1 px-2" onClick={copy}>
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                )}
              </div>
            </div>
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Output will appear here..."
            rows={10}
            className="textarea text-sm bg-zinc-950"
            spellCheck={false}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mt-4">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      <div className="flex gap-3 mt-4">
        <button className="btn-primary" onClick={run} disabled={!input.trim()}>
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        {output && (
          <button className="btn-secondary" onClick={swap} title="Swap input/output and toggle mode">
            <ArrowLeftRight size={15} /> Swap
          </button>
        )}
      </div>
    </ToolLayout>
  )
}

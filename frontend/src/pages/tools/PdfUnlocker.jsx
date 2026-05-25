import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Loader2, Upload, Unlock, Download, FileText, Eye, EyeOff } from 'lucide-react'

const ABOUT = [
  'PDF Unlocker removes the open password from a password-protected PDF so you can view it freely without re-entering credentials every time.',
  'Enter the correct password, click Unlock, and download the unlocked copy — all processing happens entirely in your browser using pdf-lib.',
  'The original file is never modified or uploaded to any server. Useful for PDFs you own but find inconvenient to open repeatedly.',
]

export default function PdfUnlocker() {
  const [file, setFile] = useState(null)
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [filename, setFilename] = useState('')

  function onFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setDownloadUrl(null)
    setError('')
    setFilename(f.name.replace(/\.pdf$/i, '') + '-unlocked.pdf')
  }

  async function unlock() {
    if (!file || !password) return
    setLoading(true); setError(''); setDownloadUrl(null)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes, { password, ignoreEncryption: false })
      const out = await pdf.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      setDownloadUrl(URL.createObjectURL(blob))
    } catch (e) {
      const msg = e.message || ''
      if (msg.toLowerCase().includes('password') || msg.toLowerCase().includes('encrypt')) {
        setError('Incorrect password or this PDF uses unsupported encryption. Try a different password.')
      } else {
        setError(`Failed to unlock: ${msg}`)
      }
    } finally { setLoading(false) }
  }

  return (
    <ToolLayout title="PDF Unlocker" description="Remove the open password from any PDF file. Works entirely in your browser — no uploads." toolId="pdf-unlocker" about={ABOUT}>
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
          <Upload size={24} className="text-zinc-500" />
          <span className="text-sm text-zinc-400">{file ? file.name : 'Click or drag a password-protected PDF here'}</span>
          <input type="file" accept=".pdf" className="hidden" onChange={onFile} />
        </label>
      </div>
      {file && (
        <div className="card mb-4">
          <label className="block text-xs text-zinc-500 mb-1.5">PDF Password</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && unlock()}
                placeholder="Enter the PDF password…"
                className="input w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
        </div>
      )}
      <button className="btn-primary mb-4" onClick={unlock} disabled={!file || !password || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Unlocking…</> : <><Unlock size={15} /> Unlock PDF</>}
      </button>
      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      {downloadUrl && (
        <div className="card flex items-center gap-3">
          <FileText size={20} className="text-rose-400 shrink-0" />
          <span className="flex-1 text-sm text-zinc-300 truncate">{filename}</span>
          <a href={downloadUrl} download={filename} className="btn-primary text-sm shrink-0">
            <Download size={14} /> Download
          </a>
        </div>
      )}
    </ToolLayout>
  )
}

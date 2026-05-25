import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Loader2, Upload, Download, RotateCw, FileText } from 'lucide-react'

const ABOUT = [
  'Rotate PDF lets you rotate all pages or specific pages of a PDF by 90°, 180°, or 270°.',
  'Useful for fixing scanned documents that were saved in the wrong orientation. Rotation is applied using pdf-lib entirely in your browser.',
  'Specify individual pages (e.g. "1,3,5") or page ranges (e.g. "2-6") to rotate only the pages you need.',
]

function parsePageRanges(input, max) {
  const indices = new Set()
  for (const part of input.split(',')) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const range = trimmed.split('-').map(n => parseInt(n.trim(), 10))
    if (range.length === 1 && !isNaN(range[0])) {
      const i = range[0] - 1
      if (i >= 0 && i < max) indices.add(i)
    } else if (range.length === 2 && !isNaN(range[0]) && !isNaN(range[1])) {
      for (let i = range[0] - 1; i <= range[1] - 1; i++) {
        if (i >= 0 && i < max) indices.add(i)
      }
    }
  }
  return [...indices]
}

export default function RotatePdf() {
  const [file, setFile] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [rotation, setRotation] = useState(90)
  const [mode, setMode] = useState('all')
  const [pages, setPages] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [filename, setFilename] = useState('')

  async function onFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f); setDownloadUrl(null); setError('')
    setFilename(f.name.replace(/\.pdf$/i, '') + '-rotated.pdf')
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
      const buf = await f.arrayBuffer()
      const doc = await pdfjsLib.getDocument({ data: buf }).promise
      setPageCount(doc.numPages)
    } catch { setPageCount(0) }
  }

  async function apply() {
    if (!file) return
    setLoading(true); setError(''); setDownloadUrl(null)
    try {
      const { PDFDocument, degrees } = await import('pdf-lib')
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      const allPages = pdf.getPages()

      const indices = mode === 'all'
        ? allPages.map((_, i) => i)
        : parsePageRanges(pages, allPages.length)

      if (indices.length === 0) { setError('No valid pages selected.'); setLoading(false); return }

      for (const i of indices) {
        const page = allPages[i]
        const current = page.getRotation().angle
        page.setRotation(degrees((current + rotation) % 360))
      }

      const out = await pdf.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      setDownloadUrl(URL.createObjectURL(blob))
    } catch (e) {
      setError(`Failed to rotate PDF: ${e.message}`)
    } finally { setLoading(false) }
  }

  return (
    <ToolLayout title="Rotate PDF" description="Rotate all pages or specific pages of a PDF by 90°, 180°, or 270°. Works in your browser." toolId="rotate-pdf" about={ABOUT}>
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
          <Upload size={24} className="text-zinc-500" />
          <span className="text-sm text-zinc-400">
            {file ? `${file.name}${pageCount ? ` — ${pageCount} page${pageCount !== 1 ? 's' : ''}` : ''}` : 'Click or drag a PDF here'}
          </span>
          <input type="file" accept=".pdf" className="hidden" onChange={onFile} />
        </label>
      </div>
      {file && (
        <div className="card mb-4 space-y-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Rotation</label>
            <div className="flex gap-2 flex-wrap">
              {[90, 180, 270].map(r => (
                <button key={r} onClick={() => setRotation(r)} className={`px-4 py-2 text-sm rounded-lg border transition-colors ${rotation === r ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  <RotateCw size={13} className="inline mr-1" />{r}°
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Pages to Rotate</label>
            <div className="flex gap-2 mb-2">
              {['all', 'specific'].map(m => (
                <button key={m} onClick={() => setMode(m)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode === m ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  {m === 'all' ? 'All Pages' : 'Specific Pages'}
                </button>
              ))}
            </div>
            {mode === 'specific' && (
              <input
                value={pages}
                onChange={e => setPages(e.target.value)}
                placeholder={`e.g. 1,3,5-8 (PDF has ${pageCount} pages)`}
                className="input w-full"
              />
            )}
          </div>
        </div>
      )}
      <button className="btn-primary mb-4" onClick={apply} disabled={!file || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Rotating…</> : <><RotateCw size={15} /> Rotate PDF</>}
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

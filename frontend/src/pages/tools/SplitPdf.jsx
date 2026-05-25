import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, FileText, X, Download, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

const ABOUT = [
  'PDF Splitter extracts specific pages from a PDF and saves them as a separate document. You can specify individual pages, ranges, or a mix of both.',
  'Use comma-separated ranges like "1-3, 5, 7-9" to extract non-contiguous sections. Pages are extracted in the order you specify.',
  'This is useful for extracting a single chapter from a book, separating invoices from a batch export, or creating a highlights document from a longer report.',
  'All processing happens in-browser with pdf-lib. Your original file is never modified; a new PDF containing only the pages you selected is generated and downloaded.',
]

function parsePageRanges(input, maxPages) {
  const pages = new Set()
  const parts = input.split(',').map((s) => s.trim())
  for (const part of parts) {
    if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number)
      if (isNaN(a) || isNaN(b) || a < 1 || b > maxPages || a > b) return null
      for (let i = a; i <= b; i++) pages.add(i - 1)
    } else {
      const n = Number(part)
      if (isNaN(n) || n < 1 || n > maxPages) return null
      pages.add(n - 1)
    }
  }
  return Array.from(pages).sort((a, b) => a - b)
}

export default function SplitPdf() {
  const [file, setFile] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [range, setRange] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const inputRef = useRef()

  async function handleFile(f) {
    if (!f || f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return }
    setError('')
    setStatus('idle')
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
      const buf = await f.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise
      setPageCount(pdf.numPages)
      setFile(f)
    } catch {
      setError('Could not read this PDF.')
    }
  }

  function applyPreset(n) {
    if (!pageCount) return
    const parts = []
    for (let i = 1; i <= pageCount; i += n) {
      const end = Math.min(i + n - 1, pageCount)
      parts.push(i === end ? String(i) : `${i}-${end}`)
    }
    setRange(parts.join(', '))
  }

  async function split() {
    if (!file || !range.trim()) return
    const indices = parsePageRanges(range, pageCount)
    if (!indices || indices.length === 0) {
      setError(`Invalid range. Enter pages 1–${pageCount}, e.g. "1,3,5-8".`)
      return
    }
    setStatus('loading')
    setError('')
    try {
      const { PDFDocument } = await import('pdf-lib')
      const bytes = await file.arrayBuffer()
      const srcDoc = await PDFDocument.load(bytes)
      const outDoc = await PDFDocument.create()
      const pages = await outDoc.copyPages(srcDoc, indices)
      pages.forEach((p) => outDoc.addPage(p))
      const pdfBytes = await outDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name.replace('.pdf', '_split.pdf')
      a.click()
      URL.revokeObjectURL(url)
      setStatus('done')
    } catch {
      setError('Failed to split PDF.')
      setStatus('error')
    }
  }

  const previewCount = range.trim() ? (parsePageRanges(range, pageCount) || []).length : 0

  return (
    <ToolLayout
      title="Split PDF"
      description="Extract specific pages or ranges from a PDF into a new file. Use quick presets or custom ranges."
      toolId="split-pdf"
      about={ABOUT}
    >
      <div
        className={`upload-zone mb-4 ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
        onClick={() => inputRef.current.click()}
      >
        <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText size={22} className="text-rose-400" />
            <div className="text-left">
              <p className="text-sm text-zinc-100">{file.name}</p>
              <p className="text-xs text-zinc-500">{pageCount} pages · {(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button className="text-zinc-500 hover:text-zinc-300" onClick={(e) => { e.stopPropagation(); setFile(null); setPageCount(0); setRange('') }}>
              <X size={15} />
            </button>
          </div>
        ) : (
          <div>
            <Upload size={24} className="mx-auto mb-2 text-zinc-500" />
            <p className="text-sm text-zinc-400">Drop a PDF or <span className="text-indigo-400">browse</span></p>
          </div>
        )}
      </div>

      {file && (
        <div className="card mb-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Page range
              <span className="ml-2 text-xs font-normal text-zinc-400">{pageCount} pages total</span>
            </label>
            {previewCount > 0 && (
              <span className="text-xs text-indigo-400 font-medium">{previewCount} pages selected</span>
            )}
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs text-zinc-500 self-center">Quick split:</span>
            {[1, 2, 5, 10].map((n) => (
              <button
                key={n}
                onClick={() => applyPreset(n)}
                disabled={!pageCount}
                className="px-2.5 py-1 text-xs rounded border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors disabled:opacity-40"
              >
                Every {n} page{n > 1 ? 's' : ''}
              </button>
            ))}
          </div>

          <input
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder={`e.g. 1,3,5-8  (max page: ${pageCount})`}
            className="input"
          />
          <p className="text-xs text-zinc-500 mt-2">
            Commas for single pages, hyphens for ranges. Example: <code className="text-zinc-400">1,3,5-8,12</code>
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
          <AlertCircle size={15} /> {error}
        </div>
      )}
      {status === 'done' && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm mb-4">
          <CheckCircle2 size={15} /> PDF split and downloaded!
        </div>
      )}

      <button className="btn-primary" onClick={split} disabled={!file || !range.trim() || status === 'loading'}>
        {status === 'loading' ? <><Loader2 size={15} className="animate-spin" /> Splitting…</> : <><Download size={15} /> Split &amp; Download</>}
      </button>
    </ToolLayout>
  )
}

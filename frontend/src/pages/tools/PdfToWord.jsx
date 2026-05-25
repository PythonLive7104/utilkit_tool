import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, FileText, Download, X, AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react'

const ABOUT = [
  'PDF to Word extracts the text content from any PDF document and saves it as a plain-text file you can open in Word, Google Docs, Notion, or any text editor.',
  'Extraction runs entirely in your browser via PDF.js — the same engine built into Firefox. Your file is never uploaded anywhere; everything stays on your device.',
  'Use the page range filter to extract only the pages you need — great for pulling a single chapter from a long document without processing the entire file.',
  'This tool works best with text-based PDFs (reports, articles, research papers). Scanned PDFs (photos of pages) and password-protected documents cannot be extracted without OCR software.',
]

export default function PdfToWord() {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [fromPage, setFromPage] = useState('')
  const [toPage, setToPage] = useState('')
  const inputRef = useRef()

  function handleFile(f) {
    if (!f || f.type !== 'application/pdf') { setError('Please upload a valid PDF file.'); return }
    if (f.size > 10 * 1024 * 1024) { setError('Maximum file size is 10 MB.'); return }
    setError('')
    setFile(f)
    setStatus('idle')
    setResult(null)
    setFromPage('')
    setToPage('')
  }

  async function extract() {
    if (!file) return
    setStatus('loading')
    setError('')
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const total = pdf.numPages
      const from = fromPage ? Math.max(1, parseInt(fromPage) || 1) : 1
      const to = toPage ? Math.min(total, parseInt(toPage) || total) : total
      if (from > to) { setError(`"From" page (${from}) must be ≤ "To" page (${to}).`); setStatus('error'); return }
      const lines = []
      for (let i = from; i <= to; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        lines.push(content.items.map((item) => item.str).join(' '))
      }
      const fullText = lines.join('\n\n')
      setResult({ text: fullText, pageCount: to - from + 1, wordCount: fullText.split(/\s+/).filter(Boolean).length, charCount: fullText.length })
      setStatus('done')
    } catch {
      setError('Failed to extract text. The PDF may be scanned or password-protected.')
      setStatus('error')
    }
  }

  function download() {
    const blob = new Blob([result.text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name.replace('.pdf', '.txt')
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyAll() {
    navigator.clipboard.writeText(result.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout
      title="PDF → Word"
      description="Extract text from any PDF into a downloadable .txt file. Filter by page range. Runs entirely in your browser."
      toolId="pdf-to-word"
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
            <FileText size={24} className="text-indigo-400" />
            <div className="text-left">
              <p className="text-sm font-medium text-zinc-100">{file.name}</p>
              <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button className="ml-2 text-zinc-500 hover:text-zinc-300" onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); setStatus('idle') }}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <div>
            <Upload size={28} className="mx-auto mb-3 text-zinc-500" />
            <p className="text-sm text-zinc-400 mb-1">Drag &amp; drop a PDF or <span className="text-indigo-400">browse</span></p>
            <p className="text-xs text-zinc-500">Max 10 MB · PDF only</p>
          </div>
        )}
      </div>

      {file && (
        <div className="card mb-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-3">
            Page range <span className="text-xs font-normal text-zinc-400">(leave blank to extract all pages)</span>
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs text-zinc-500 mb-1.5">From page</label>
              <input value={fromPage} onChange={(e) => setFromPage(e.target.value)} placeholder="1" type="number" min="1" className="input" />
            </div>
            <span className="text-zinc-400 mt-5">→</span>
            <div className="flex-1">
              <label className="block text-xs text-zinc-500 mb-1.5">To page</label>
              <input value={toPage} onChange={(e) => setToPage(e.target.value)} placeholder="end" type="number" min="1" className="input" />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <button className="btn-primary mb-6" onClick={extract} disabled={!file || status === 'loading'}>
        {status === 'loading' ? 'Extracting…' : 'Extract Text'}
      </button>

      {status === 'done' && result && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <CheckCircle2 size={15} /> Extraction complete
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span>{result.pageCount} pages</span>
              <span>{result.wordCount.toLocaleString()} words</span>
              <span>{result.charCount.toLocaleString()} chars</span>
            </div>
          </div>
          <textarea readOnly value={result.text} rows={10} className="textarea mb-4 text-sm" />
          <div className="flex gap-2">
            <button className="btn-primary flex-1" onClick={download}><Download size={15} /> Download .txt</button>
            <button className="btn-secondary px-4" onClick={copyAll} title="Copy all text">
              {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

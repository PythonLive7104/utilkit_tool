import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, FileText, X, Download, AlertCircle, CheckCircle2, Loader2, TrendingDown } from 'lucide-react'

const QUALITY_PRESETS = {
  low:    { scale: 0.5,  quality: 0.45, label: 'Low — max reduction (~70%)' },
  medium: { scale: 0.75, quality: 0.65, label: 'Medium — balanced (~50%)' },
  high:   { scale: 1.0,  quality: 0.88, label: 'High — near-original (~20%)' },
}

const ABOUT = [
  'PDF Compressor reduces the file size of PDF documents by re-rendering each page as a compressed image at your chosen quality setting.',
  'Low quality (~70% reduction) is ideal for email attachments. Medium (~50%) balances readability and size. High (~20%) preserves near-print quality for archiving.',
  'Note: this tool re-renders pages as images, which means hyperlinks, form fields, and editable text in the original PDF will not be preserved in the output.',
  'Because page rendering uses the HTML Canvas API, output quality also depends on your screen\'s pixel density. On high-DPI (Retina) displays, results are sharper at the same compression setting.',
]

export default function CompressPdf() {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [quality, setQuality] = useState('medium')
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const inputRef = useRef()

  function handleFile(f) {
    if (!f || f.type !== 'application/pdf') { setError('Please upload a PDF file.'); return }
    if (f.size > 10 * 1024 * 1024) { setError('Max file size is 10 MB.'); return }
    setError(''); setFile(f); setStatus('idle'); setResult(null); setProgress(0)
  }

  async function compress() {
    if (!file) return
    setStatus('loading'); setError(''); setProgress(0)
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
      const { PDFDocument } = await import('pdf-lib')
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const { scale, quality: q } = QUALITY_PRESETS[quality]
      const outDoc = await PDFDocument.create()

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = viewport.width
        canvas.height = viewport.height
        await page.render({ canvasContext: ctx, viewport }).promise
        const imgData = canvas.toDataURL('image/jpeg', q)
        const base64 = imgData.split(',')[1]
        const imgBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
        const jpgImage = await outDoc.embedJpg(imgBytes)
        const newPage = outDoc.addPage([canvas.width, canvas.height])
        newPage.drawImage(jpgImage, { x: 0, y: 0, width: canvas.width, height: canvas.height })
        setProgress(Math.round((i / pdf.numPages) * 100))
      }

      const pdfBytes = await outDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      setResult({
        blob,
        originalSize: file.size,
        compressedSize: pdfBytes.length,
        reduction: (((file.size - pdfBytes.length) / file.size) * 100).toFixed(1),
        name: file.name.replace('.pdf', '_compressed.pdf'),
      })
      setStatus('done')
    } catch {
      setError('Compression failed. The PDF may be corrupted or password-protected.')
      setStatus('error')
    }
  }

  function download() {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url; a.download = result.name; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF file size by re-rendering pages at lower resolution. Three quality presets. All in-browser."
      toolId="compress-pdf"
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
              <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button className="text-zinc-500 hover:text-zinc-300" onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null) }}>
              <X size={15} />
            </button>
          </div>
        ) : (
          <div>
            <Upload size={24} className="mx-auto mb-2 text-zinc-500" />
            <p className="text-sm text-zinc-400">Drop a PDF or <span className="text-indigo-400">browse</span></p>
            <p className="text-xs text-zinc-600 mt-1">Max 10 MB</p>
          </div>
        )}
      </div>

      <div className="card mb-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-3">Compression level</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(QUALITY_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => setQuality(key)}
              className={`py-2.5 px-3 rounded-lg border text-sm text-left transition-colors ${
                quality === key ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }`}
            >
              <p className="font-medium capitalize mb-0.5">{key}</p>
              <p className="text-xs opacity-60 leading-tight">{preset.label}</p>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {status === 'loading' && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span>Compressing pages…</span><span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <button className="btn-primary mb-6" onClick={compress} disabled={!file || status === 'loading'}>
        {status === 'loading' ? <><Loader2 size={15} className="animate-spin" /> Compressing…</> : <><TrendingDown size={15} /> Compress PDF</>}
      </button>

      {status === 'done' && result && (
        <div className="card">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
            <CheckCircle2 size={15} /> Compression complete
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div className="p-3 rounded-lg bg-zinc-800/50">
              <p className="text-xs text-zinc-500 mb-1">Original</p>
              <p className="text-lg font-bold text-zinc-100">{(result.originalSize / 1024).toFixed(0)} KB</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <p className="text-xs text-zinc-500 mb-1">Compressed</p>
              <p className="text-lg font-bold text-emerald-400">{(result.compressedSize / 1024).toFixed(0)} KB</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-500/10">
              <p className="text-xs text-zinc-500 mb-1">Reduction</p>
              <p className="text-lg font-bold text-indigo-400">{result.reduction}%</p>
            </div>
          </div>
          <button className="btn-primary" onClick={download}><Download size={15} /> Download Compressed PDF</button>
        </div>
      )}
    </ToolLayout>
  )
}

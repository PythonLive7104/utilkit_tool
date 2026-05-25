import { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Loader2, Upload, Download, Pen, Trash2, FileText } from 'lucide-react'

const ABOUT = [
  'eSign PDF lets you draw a handwritten signature and embed it directly into your PDF document.',
  'Draw your signature on the canvas pad, choose which page and corner to place it, then download the signed PDF — all in your browser.',
  'No account or external service needed. Your signature and document never leave your device.',
]

const POSITIONS = [
  { label: 'Bottom Right', value: 'br' },
  { label: 'Bottom Left', value: 'bl' },
  { label: 'Bottom Centre', value: 'bc' },
]

export default function EsignPdf() {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [file, setFile] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [position, setPosition] = useState('br')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [filename, setFilename] = useState('')
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = '#3b3bf5'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const src = e.touches ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top) * scaleY,
    }
  }

  function startDraw(e) {
    e.preventDefault()
    const canvas = canvasRef.current
    const pos = getPos(e, canvas)
    lastPos.current = pos
    setDrawing(true)
    setHasSignature(true)
  }

  function draw(e) {
    e.preventDefault()
    if (!drawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPos.current = pos
  }

  function stopDraw() { setDrawing(false) }

  function clearSig() {
    const canvas = canvasRef.current
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
    setDownloadUrl(null)
  }

  async function onFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f); setDownloadUrl(null); setError('')
    setFilename(f.name.replace(/\.pdf$/i, '') + '-signed.pdf')
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
      const buf = await f.arrayBuffer()
      const doc = await pdfjsLib.getDocument({ data: buf }).promise
      setPageCount(doc.numPages)
      setPageNum(doc.numPages)
    } catch { setPageCount(1); setPageNum(1) }
  }

  async function apply() {
    if (!file || !hasSignature) return
    setLoading(true); setError(''); setDownloadUrl(null)
    try {
      const { PDFDocument } = await import('pdf-lib')

      const canvas = canvasRef.current
      const dataUrl = canvas.toDataURL('image/png')
      const sigRes = await fetch(dataUrl)
      const sigBytes = await sigRes.arrayBuffer()

      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      const pages = pdf.getPages()
      const targetPage = pages[Math.min(pageNum - 1, pages.length - 1)]
      const { width, height } = targetPage.getSize()

      const sigImage = await pdf.embedPng(sigBytes)
      const sigW = 160
      const sigH = (sigImage.height / sigImage.width) * sigW

      let x, y
      if (position === 'br') { x = width - sigW - 20; y = 20 }
      else if (position === 'bl') { x = 20; y = 20 }
      else { x = (width - sigW) / 2; y = 20 }

      targetPage.drawImage(sigImage, { x, y, width: sigW, height: sigH })

      const out = await pdf.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      setDownloadUrl(URL.createObjectURL(blob))
    } catch (e) {
      setError(`Failed to sign PDF: ${e.message}`)
    } finally { setLoading(false) }
  }

  return (
    <ToolLayout title="eSign PDF" description="Draw your signature and embed it into any PDF. No account needed — works in your browser." toolId="esign-pdf" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs text-zinc-500 mb-2">Draw Your Signature</label>
          <div className="relative rounded-xl border border-zinc-700 bg-white overflow-hidden" style={{ aspectRatio: '3/1' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className="w-full h-full cursor-crosshair touch-none"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
            {!hasSignature && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-zinc-400 text-sm">Sign here</span>
              </div>
            )}
          </div>
          <button className="btn-ghost text-xs mt-2" onClick={clearSig}><Trash2 size={12} /> Clear</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Upload PDF</label>
            <label className="flex items-center gap-3 p-4 border border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
              <Upload size={18} className="text-zinc-500 shrink-0" />
              <span className="text-sm text-zinc-400 truncate">{file ? file.name : 'Click to select a PDF'}</span>
              <input type="file" accept=".pdf" className="hidden" onChange={onFile} />
            </label>
          </div>
          {file && pageCount > 1 && (
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Place on Page</label>
              <div className="flex items-center gap-2">
                <button onClick={() => setPageNum(p => Math.max(1, p - 1))} className="btn-ghost px-2 py-1 text-xs" disabled={pageNum <= 1}>−</button>
                <span className="text-sm text-zinc-300 w-16 text-center">Page {pageNum} / {pageCount}</span>
                <button onClick={() => setPageNum(p => Math.min(pageCount, p + 1))} className="btn-ghost px-2 py-1 text-xs" disabled={pageNum >= pageCount}>+</button>
              </div>
            </div>
          )}
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Signature Position</label>
            <div className="flex flex-wrap gap-2">
              {POSITIONS.map(p => (
                <button key={p.value} onClick={() => setPosition(p.value)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${position === p.value ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{p.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className="btn-primary mt-6" onClick={apply} disabled={!file || !hasSignature || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Embedding…</> : <><Pen size={15} /> Sign & Download</>}
      </button>
      {error && <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      {downloadUrl && (
        <div className="card mt-4 flex items-center gap-3">
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

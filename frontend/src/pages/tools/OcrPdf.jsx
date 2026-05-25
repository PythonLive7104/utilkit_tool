import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Loader2, Upload, Copy, Check, Download, ScanText } from 'lucide-react'

const ABOUT = [
  'OCR PDF extracts readable text from scanned PDFs or image-based PDFs where normal text selection does not work.',
  'Each PDF page is rendered to a canvas image, then Tesseract.js runs optical character recognition to extract the text.',
  'Works with scanned documents, receipts, forms, and any PDF that contains images of text rather than selectable text.',
]

export default function OcrPdf() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function onFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f); setResult(''); setError('')
  }

  async function run() {
    if (!file) return
    setLoading(true); setError(''); setResult(''); setProgress('Loading PDF…')
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

      const bytes = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise
      const numPages = pdf.numPages

      setProgress('Initialising OCR engine…')
      const { createWorker } = await import('tesseract.js')
      const worker = await createWorker('eng', 1, {
        logger: () => {},
      })

      let fullText = ''
      for (let i = 1; i <= numPages; i++) {
        setProgress(`Scanning page ${i} of ${numPages}…`)
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
        await page.render({ canvasContext: ctx, viewport }).promise

        const { data: { text } } = await worker.recognize(canvas)
        if (text.trim()) {
          fullText += `--- Page ${i} ---\n${text.trim()}\n\n`
        }
      }

      await worker.terminate()
      setResult(fullText.trim() || 'No readable text found in this PDF.')
    } catch (e) {
      setError(`OCR failed: ${e.message}`)
    } finally { setLoading(false); setProgress('') }
  }

  function copy() {
    navigator.clipboard.writeText(result)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  function download() {
    const blob = new Blob([result], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = (file?.name.replace(/\.pdf$/i, '') || 'ocr-result') + '.txt'
    a.click()
  }

  return (
    <ToolLayout title="OCR PDF" description="Extract text from scanned PDFs using optical character recognition. No upload required." toolId="ocr-pdf" about={ABOUT}>
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
          <Upload size={24} className="text-zinc-500" />
          <span className="text-sm text-zinc-400">{file ? file.name : 'Click or drag a scanned PDF here'}</span>
          <input type="file" accept=".pdf" className="hidden" onChange={onFile} />
        </label>
      </div>
      {file && (
        <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 text-xs">
          OCR may take 10–30 seconds per page depending on your device. Multi-page PDFs will take longer.
        </div>
      )}
      <button className="btn-primary mb-6" onClick={run} disabled={!file || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> {progress || 'Processing…'}</> : <><ScanText size={15} /> Extract Text</>}
      </button>
      {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>}
      {result && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-200">Extracted Text</span>
            <div className="flex gap-2">
              <button className="btn-ghost text-xs py-1 px-2" onClick={copy}>
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="btn-ghost text-xs py-1 px-2" onClick={download}>
                <Download size={12} /> .txt
              </button>
            </div>
          </div>
          <pre className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans max-h-96 overflow-y-auto">{result}</pre>
        </div>
      )}
    </ToolLayout>
  )
}

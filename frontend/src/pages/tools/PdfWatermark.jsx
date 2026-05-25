import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Loader2, Upload, Download, Stamp, FileText } from 'lucide-react'

const ABOUT = [
  'PDF Watermark adds a diagonal text watermark (e.g. CONFIDENTIAL, DRAFT) to every page of your PDF.',
  'Customise the watermark text, font size, opacity, and colour. All processing runs in your browser using pdf-lib — no file ever leaves your device.',
  'Useful for marking document drafts, protecting sensitive reports, or branding PDFs before sharing.',
]

const COLORS = [
  { label: 'Grey', value: [0.5, 0.5, 0.5] },
  { label: 'Red', value: [0.8, 0.1, 0.1] },
  { label: 'Blue', value: [0.1, 0.1, 0.8] },
  { label: 'Green', value: [0.1, 0.6, 0.1] },
]

export default function PdfWatermark() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('CONFIDENTIAL')
  const [opacity, setOpacity] = useState(0.2)
  const [fontSize, setFontSize] = useState(48)
  const [colorIdx, setColorIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [filename, setFilename] = useState('')

  function onFile(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f); setDownloadUrl(null); setError('')
    setFilename(f.name.replace(/\.pdf$/i, '') + '-watermarked.pdf')
  }

  async function apply() {
    if (!file || !text.trim()) return
    setLoading(true); setError(''); setDownloadUrl(null)
    try {
      const { PDFDocument, StandardFonts, rgb, degrees } = await import('pdf-lib')
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      const font = await pdf.embedFont(StandardFonts.HelveticaBold)
      const [r, g, b] = COLORS[colorIdx].value
      const color = rgb(r, g, b)

      for (const page of pdf.getPages()) {
        const { width, height } = page.getSize()
        const textWidth = font.widthOfTextAtSize(text, fontSize)
        page.drawText(text, {
          x: (width - textWidth) / 2,
          y: height / 2 - fontSize / 2,
          size: fontSize,
          font,
          color,
          opacity,
          rotate: degrees(45),
        })
      }

      const out = await pdf.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      setDownloadUrl(URL.createObjectURL(blob))
    } catch (e) {
      setError(`Failed to watermark PDF: ${e.message}`)
    } finally { setLoading(false) }
  }

  return (
    <ToolLayout title="PDF Watermark" description="Add a diagonal text watermark to every page of your PDF. No upload required." toolId="pdf-watermark" about={ABOUT}>
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
          <Upload size={24} className="text-zinc-500" />
          <span className="text-sm text-zinc-400">{file ? file.name : 'Click or drag a PDF here'}</span>
          <input type="file" accept=".pdf" className="hidden" onChange={onFile} />
        </label>
      </div>
      <div className="card mb-4 space-y-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Watermark Text</label>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="e.g. CONFIDENTIAL" className="input w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Font Size: {fontSize}px</label>
            <input type="range" min={24} max={96} step={4} value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full accent-indigo-500" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Opacity: {Math.round(opacity * 100)}%</label>
            <input type="range" min={0.05} max={0.6} step={0.05} value={opacity} onChange={e => setOpacity(+e.target.value)} className="w-full accent-indigo-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-2">Colour</label>
          <div className="flex gap-2">
            {COLORS.map((c, i) => (
              <button key={c.label} onClick={() => setColorIdx(i)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${colorIdx === i ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{c.label}</button>
            ))}
          </div>
        </div>
      </div>
      <button className="btn-primary mb-4" onClick={apply} disabled={!file || !text.trim() || loading}>
        {loading ? <><Loader2 size={15} className="animate-spin" /> Applying…</> : <><Stamp size={15} /> Add Watermark</>}
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

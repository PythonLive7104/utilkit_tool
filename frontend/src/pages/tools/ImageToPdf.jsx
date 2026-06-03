import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, Download, X, FileImage, Loader2 } from 'lucide-react'

const ABOUT = [
  'Image to PDF combines one or more JPG and PNG images into a single PDF document, one image per page.',
  'Drag to reorder your images, choose page size (fit-to-image, A4, or Letter) and orientation, then download the finished PDF.',
  'Everything is generated in your browser with pdf-lib — your images are never uploaded to a server.',
]

export default function ImageToPdf() {
  const [images, setImages] = useState([])
  const [pageSize, setPageSize] = useState('fit')
  const [building, setBuilding] = useState(false)

  function onFiles(e) {
    const accepted = Array.from(e.target.files).filter(f => /image\/(png|jpeg)/.test(f.type))
    setImages(prev => [...prev, ...accepted.map(f => ({ file: f, url: URL.createObjectURL(f), id: Math.random() }))])
    e.target.value = ''
  }

  function remove(id) {
    setImages(prev => prev.filter(i => i.id !== id))
  }

  function move(idx, dir) {
    setImages(prev => {
      const next = [...prev]
      const j = idx + dir
      if (j < 0 || j >= next.length) return prev
      ;[next[idx], next[j]] = [next[j], next[idx]]
      return next
    })
  }

  async function build() {
    if (!images.length) return
    setBuilding(true)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const pdf = await PDFDocument.create()
      const A4 = [595.28, 841.89], LETTER = [612, 792]

      for (const img of images) {
        const bytes = await img.file.arrayBuffer()
        const embedded = /png/.test(img.file.type)
          ? await pdf.embedPng(bytes)
          : await pdf.embedJpg(bytes)
        const { width, height } = embedded

        if (pageSize === 'fit') {
          const page = pdf.addPage([width, height])
          page.drawImage(embedded, { x: 0, y: 0, width, height })
        } else {
          const [pw, ph] = pageSize === 'a4' ? A4 : LETTER
          const page = pdf.addPage([pw, ph])
          const scale = Math.min(pw / width, ph / height)
          const w = width * scale, h = height * scale
          page.drawImage(embedded, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h })
        }
      }

      const out = await pdf.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'images.pdf'; a.click()
      URL.revokeObjectURL(a.href)
    } finally {
      setBuilding(false)
    }
  }

  return (
    <ToolLayout
      title="Image to PDF"
      description="Combine JPG and PNG images into a single PDF, one image per page. Reorder, choose page size, and download."
      toolId="image-to-pdf"
      about={ABOUT}
    >
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
          <Upload size={24} className="text-zinc-500" />
          <span className="text-sm text-zinc-400">{images.length ? `${images.length} image${images.length !== 1 ? 's' : ''} added — click to add more` : 'Click or drag JPG / PNG images here'}</span>
          <input type="file" accept="image/png,image/jpeg" multiple className="hidden" onChange={onFiles} />
        </label>
      </div>

      {images.length > 0 && (
        <div className="card mb-4">
          <label className="block text-xs text-zinc-500 mb-1.5">Page size</label>
          <div className="flex gap-2">
            {[{ k: 'fit', l: 'Fit to image' }, { k: 'a4', l: 'A4' }, { k: 'letter', l: 'Letter' }].map(o => (
              <button key={o.k} onClick={() => setPageSize(o.k)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${pageSize === o.k ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{o.l}</button>
            ))}
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {images.map((img, i) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-zinc-700 bg-zinc-800/60">
              <img src={img.url} alt="" className="w-full h-28 object-cover" />
              <span className="absolute top-1 left-1 text-[11px] bg-black/60 text-white rounded px-1.5">{i + 1}</span>
              <button onClick={() => remove(img.id)} className="absolute top-1 right-1 bg-black/60 text-white rounded p-1"><X size={12} /></button>
              <div className="flex">
                <button onClick={() => move(i, -1)} className="flex-1 text-xs py-1 text-zinc-400 hover:bg-zinc-700">←</button>
                <button onClick={() => move(i, 1)} className="flex-1 text-xs py-1 text-zinc-400 hover:bg-zinc-700">→</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn-primary" onClick={build} disabled={!images.length || building}>
        {building ? <><Loader2 size={15} className="animate-spin" /> Building…</> : <><FileImage size={15} /> Create PDF</>}
      </button>
    </ToolLayout>
  )
}

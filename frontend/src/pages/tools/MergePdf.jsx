import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, FileText, GripVertical, X, Download, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

const ABOUT = [
  'Merge PDF combines multiple PDF files into a single document in the order you choose. Upload up to 20 files and drag them into any order before merging.',
  'All processing is done inside your browser using pdf-lib — a pure JavaScript PDF library. No files are uploaded to any server.',
  'This is useful for combining contracts, reports, invoices, and presentations into a single package before sharing. The merged file is downloaded directly to your computer.',
  'Password-protected or corrupted PDFs may cause errors. If a merge fails, try removing individual files one at a time to identify the problematic document.',
]

export default function MergePdf() {
  const [files, setFiles] = useState([])
  const [pageCounts, setPageCounts] = useState({})
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [outputName, setOutputName] = useState('merged.pdf')
  const inputRef = useRef()
  const dragItem = useRef(null)
  const dragOver = useRef(null)

  async function loadPageCount(file) {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
      const buf = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise
      return pdf.numPages
    } catch {
      return null
    }
  }

  async function addFiles(newFiles) {
    const pdfs = Array.from(newFiles).filter((f) => f.type === 'application/pdf')
    if (!pdfs.length) { setError('Please select PDF files only.'); return }
    setError('')
    setFiles((prev) => {
      const combined = [...prev, ...pdfs]
      if (combined.length > 20) { setError('Maximum 20 files allowed.'); return prev }
      return combined
    })
    for (const pdf of pdfs) {
      const count = await loadPageCount(pdf)
      if (count !== null) {
        setPageCounts((prev) => ({ ...prev, [pdf.name + pdf.size]: count }))
      }
    }
  }

  function removeFile(idx) {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  function reorder() {
    if (dragItem.current === null || dragOver.current === null) return
    setFiles((prev) => {
      const copy = [...prev]
      const [moved] = copy.splice(dragItem.current, 1)
      copy.splice(dragOver.current, 0, moved)
      return copy
    })
    dragItem.current = null
    dragOver.current = null
  }

  async function merge() {
    if (files.length < 2) { setError('Please add at least 2 PDF files.'); return }
    setStatus('loading')
    setError('')
    try {
      const { PDFDocument } = await import('pdf-lib')
      const merged = await PDFDocument.create()
      for (const file of files) {
        const bytes = await file.arrayBuffer()
        const doc = await PDFDocument.load(bytes)
        const pages = await merged.copyPages(doc, doc.getPageIndices())
        pages.forEach((p) => merged.addPage(p))
      }
      const pdfBytes = await merged.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = outputName
      a.click()
      URL.revokeObjectURL(url)
      setStatus('done')
    } catch {
      setError('Failed to merge PDFs. One or more files may be corrupted or password-protected.')
      setStatus('error')
    }
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0)
  const totalPages = files.reduce((sum, f) => sum + (pageCounts[f.name + f.size] || 0), 0)

  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDFs into one. Drag files to reorder, see page counts, then download the merged result."
      toolId="merge-pdf"
      about={ABOUT}
    >
      <div
        className={`upload-zone mb-4 ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current.click()}
      >
        <input ref={inputRef} type="file" accept=".pdf" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
        <Upload size={24} className="mx-auto mb-2 text-zinc-500" />
        <p className="text-sm text-zinc-400 mb-1">Drag &amp; drop PDFs or <span className="text-indigo-400">browse</span></p>
        <p className="text-xs text-zinc-600">Up to 20 files · PDF only</p>
      </div>

      {files.length > 0 && (
        <div className="card mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-zinc-400">
              {files.length} file{files.length !== 1 ? 's' : ''} · {(totalSize / 1024).toFixed(0)} KB total
              {totalPages > 0 && <span className="text-zinc-500"> · {totalPages} pages</span>}
            </p>
            <p className="text-xs text-zinc-600">Drag rows to reorder</p>
          </div>
          <div className="space-y-1.5">
            {files.map((f, i) => {
              const pc = pageCounts[f.name + f.size]
              return (
                <div
                  key={i}
                  draggable
                  onDragStart={() => { dragItem.current = i }}
                  onDragEnter={() => { dragOver.current = i }}
                  onDragEnd={reorder}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-lg cursor-grab group"
                >
                  <GripVertical size={14} className="text-zinc-600 flex-shrink-0" />
                  <span className="text-xs text-zinc-600 w-5">{i + 1}</span>
                  <FileText size={14} className="text-rose-400 flex-shrink-0" />
                  <span className="flex-1 text-sm text-zinc-300 truncate">{f.name}</span>
                  <span className="text-xs text-zinc-600">{(f.size / 1024).toFixed(0)} KB</span>
                  {pc != null && (
                    <span className="text-xs px-1.5 py-0.5 bg-zinc-700 rounded text-zinc-400">{pc}p</span>
                  )}
                  <button className="text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100" onClick={() => removeFile(i)}>
                    <X size={14} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <input value={outputName} onChange={(e) => setOutputName(e.target.value)} className="input max-w-xs text-sm" placeholder="Output filename..." />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
          <AlertCircle size={15} /> {error}
        </div>
      )}
      {status === 'done' && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm mb-4">
          <CheckCircle2 size={15} /> PDFs merged and downloaded!
        </div>
      )}

      <button className="btn-primary" onClick={merge} disabled={files.length < 2 || status === 'loading'}>
        {status === 'loading' ? <><Loader2 size={15} className="animate-spin" /> Merging…</> : <><Download size={15} /> Merge &amp; Download</>}
      </button>
    </ToolLayout>
  )
}

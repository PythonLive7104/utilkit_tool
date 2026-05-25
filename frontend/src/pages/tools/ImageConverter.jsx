import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, X, Download, AlertCircle, CheckCircle2, ImageIcon } from 'lucide-react'

const FORMATS = ['jpeg', 'png', 'webp']
const FORMAT_LABELS = { jpeg: 'JPG', png: 'PNG', webp: 'WebP' }
const MIME = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }

const ABOUT = [
  'Image Converter changes the file format of images between JPEG, PNG, and WebP — the three most widely supported web image formats.',
  'JPEG is best for photographs and complex images with gradients. PNG is ideal for images requiring transparency, logos, and screenshots. WebP offers the best compression for both types and is supported in all modern browsers.',
  'All conversions happen entirely in your browser using the HTML Canvas API. Convert up to 10 images at once in a single batch.',
  'Converting from PNG to JPEG or WebP (lossy) will discard any transparency, replacing it with a white background. Converting from JPEG to PNG increases file size without improving quality.',
]

export default function ImageConverter() {
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const [targetFormat, setTargetFormat] = useState('webp')
  const [quality, setQuality] = useState(85)
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const inputRef = useRef()

  function addFiles(newFiles) {
    const imgs = Array.from(newFiles).filter((f) => f.type.startsWith('image/'))
    if (!imgs.length) { setError('Please select image files (JPG, PNG, WebP, GIF).'); return }
    setError('')
    setFiles((prev) => [...prev, ...imgs].slice(0, 10))
    setResults([])
  }

  async function convert() {
    if (!files.length) return
    setStatus('loading'); setError(''); setResults([])
    try {
      const converted = []
      for (const file of files) {
        const bitmap = await createImageBitmap(file)
        const canvas = document.createElement('canvas')
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        const ctx = canvas.getContext('2d')
        if (targetFormat === 'jpeg') {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
        ctx.drawImage(bitmap, 0, 0)
        bitmap.close()
        const q = ['jpeg', 'webp'].includes(targetFormat) ? quality / 100 : undefined
        const dataURL = canvas.toDataURL(MIME[targetFormat], q)
        const bytes = atob(dataURL.split(',')[1])
        const arr = new Uint8Array(bytes.length)
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
        const blob = new Blob([arr], { type: MIME[targetFormat] })
        const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat
        const name = file.name.replace(/\.[^.]+$/, `.${ext}`)
        const sizeDiff = ((file.size - blob.size) / file.size * 100).toFixed(0)
        converted.push({ blob, name, originalSize: file.size, convertedSize: blob.size, sizeDiff })
      }
      setResults(converted)
      setStatus('done')
    } catch {
      setError('Conversion failed. Please try again.')
      setStatus('error')
    }
  }

  function downloadAll() {
    results.forEach(({ blob, name }) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = name; a.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <ToolLayout
      title="Image Converter"
      description="Convert images between JPG, PNG, and WebP. Adjust quality for lossy formats. Batch up to 10 files."
      toolId="image-converter"
      about={ABOUT}
    >
      <div
        className={`upload-zone mb-4 ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
        {files.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 rounded-md text-xs text-zinc-300">
                <ImageIcon size={12} className="text-sky-400" />
                {f.name}
                <button className="text-zinc-600 hover:text-zinc-300" onClick={(e) => { e.stopPropagation(); setFiles((p) => p.filter((_, j) => j !== i)); setResults([]) }}>
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Upload size={24} className="mx-auto mb-2 text-zinc-500" />
            <p className="text-sm text-zinc-400">Drop images or <span className="text-indigo-400">browse</span></p>
            <p className="text-xs text-zinc-600 mt-1">JPG, PNG, WebP, GIF · up to 10 files</p>
          </div>
        )}
      </div>

      <div className="card mb-4">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-xs text-zinc-500 mb-2">Convert to</p>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button key={f} onClick={() => setTargetFormat(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${targetFormat === f ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  {FORMAT_LABELS[f]}
                </button>
              ))}
            </div>
          </div>
          {['jpeg', 'webp'].includes(targetFormat) && (
            <div className="flex-1 min-w-[200px]">
              <div className="flex justify-between mb-2">
                <p className="text-xs text-zinc-500">Quality</p>
                <span className={`text-xs font-semibold ${quality >= 80 ? 'text-emerald-400' : quality >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{quality}%</span>
              </div>
              <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-indigo-500" />
              <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>Smaller</span><span>Better quality</span></div>
            </div>
          )}
        </div>
        {targetFormat === 'jpeg' && (
          <p className="text-xs text-amber-500 dark:text-amber-400 mt-3">Note: Converting to JPEG replaces transparency with a white background.</p>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <button className="btn-primary mb-6" onClick={convert} disabled={!files.length || status === 'loading'}>
        {status === 'loading' ? 'Converting…' : `Convert to ${FORMAT_LABELS[targetFormat]}`}
      </button>

      {status === 'done' && results.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <CheckCircle2 size={15} /> {results.length} file{results.length > 1 ? 's' : ''} converted
            </span>
            {results.length > 1 && <button className="btn-secondary text-xs" onClick={downloadAll}>Download All</button>}
          </div>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 bg-zinc-800 rounded-lg">
                <div>
                  <p className="text-sm text-zinc-200">{r.name}</p>
                  <p className="text-xs text-zinc-500">
                    {(r.originalSize / 1024).toFixed(0)} KB → <span className="text-emerald-400">{(r.convertedSize / 1024).toFixed(0)} KB</span>
                    {Number(r.sizeDiff) !== 0 && <span className={Number(r.sizeDiff) > 0 ? ' text-emerald-400' : ' text-amber-400'}> ({r.sizeDiff > 0 ? '−' : '+'}{Math.abs(r.sizeDiff)}%)</span>}
                  </p>
                </div>
                <button className="btn-ghost text-xs" onClick={() => { const url = URL.createObjectURL(r.blob); const a = document.createElement('a'); a.href = url; a.download = r.name; a.click(); URL.revokeObjectURL(url) }}>
                  <Download size={13} /> Save
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

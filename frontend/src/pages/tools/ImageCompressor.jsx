import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, X, Download, AlertCircle, CheckCircle2 } from 'lucide-react'

const ABOUT = [
  'Image Compressor reduces JPEG and PNG file sizes by re-encoding them at a lower quality setting, making images faster to load and easier to share.',
  'The quality slider (5–100) controls the compression level. Values between 65–80 typically give the best balance between visual quality and file size reduction.',
  'All compression happens inside your browser using the Canvas API — no file is ever uploaded to a server. Your original file remains untouched.',
  'For photographic images, quality 70–85 is generally indistinguishable from the original at normal viewing sizes. For PNG, the canvas always outputs JPEG unless quality is 95+.',
]

export default function ImageCompressor() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [quality, setQuality] = useState(75)
  const [targetKb, setTargetKb] = useState('')
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const inputRef = useRef()

  function handleFile(f) {
    if (!f || !f.type.startsWith('image/')) { setError('Please upload a JPG or PNG image.'); return }
    if (f.size > 10 * 1024 * 1024) { setError('Max 10 MB.'); return }
    setError(''); setFile(f); setResult(null)
    setPreview(URL.createObjectURL(f))
  }

  async function compressAt(q, bitmap) {
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(bitmap, 0, 0)
    const mime = q >= 95 ? 'image/png' : 'image/jpeg'
    const dataURL = canvas.toDataURL(mime, q / 100)
    const bytes = atob(dataURL.split(',')[1])
    const arr = new Uint8Array(bytes.length)
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
    return { blob: new Blob([arr], { type: mime }), mime, width: canvas.width, height: canvas.height }
  }

  async function compress() {
    if (!file) return
    setStatus('loading'); setError('')
    try {
      const bitmap = await createImageBitmap(file)
      let finalQ = quality
      const target = parseInt(targetKb)

      if (!isNaN(target) && target > 0) {
        let lo = 5, hi = 95
        for (let iter = 0; iter < 8; iter++) {
          const mid = Math.round((lo + hi) / 2)
          const { blob } = await compressAt(mid, bitmap)
          if (blob.size / 1024 > target) hi = mid - 1
          else { lo = mid + 1; finalQ = mid }
        }
      }

      const { blob, mime, width, height } = await compressAt(finalQ, bitmap)
      bitmap.close()
      const ext = mime === 'image/png' ? 'png' : 'jpg'
      setResult({
        blob, url: URL.createObjectURL(blob),
        name: file.name.replace(/\.[^.]+$/, `_compressed.${ext}`),
        originalSize: file.size, compressedSize: blob.size,
        reduction: (((file.size - blob.size) / file.size) * 100).toFixed(1),
        width, height, usedQuality: finalQ,
      })
      setStatus('done')
    } catch {
      setError('Compression failed.')
      setStatus('error')
    }
  }

  function download() {
    const a = document.createElement('a')
    a.href = result.url; a.download = result.name; a.click()
  }

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file size while preserving visual quality. Set a target file size or choose quality manually."
      toolId="image-compressor"
      about={ABOUT}
    >
      <div
        className={`upload-zone mb-4 ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
        onClick={() => inputRef.current.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            {preview && <img src={preview} alt="" className="w-12 h-12 object-cover rounded" />}
            <div className="text-left">
              <p className="text-sm text-zinc-100">{file.name}</p>
              <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button className="text-zinc-500 hover:text-zinc-300" onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null) }}>
              <X size={15} />
            </button>
          </div>
        ) : (
          <div>
            <Upload size={24} className="mx-auto mb-2 text-zinc-500" />
            <p className="text-sm text-zinc-400">Drop image or <span className="text-indigo-400">browse</span></p>
            <p className="text-xs text-zinc-600 mt-1">JPG, PNG · Max 10 MB</p>
          </div>
        )}
      </div>

      <div className="card mb-4">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Quality</p>
              <span className={`text-sm font-semibold ${quality >= 80 ? 'text-emerald-400' : quality >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{quality}%</span>
            </div>
            <input type="range" min={5} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-indigo-500 mb-1" />
            <div className="flex justify-between text-xs text-zinc-600"><span>Smaller</span><span>Better quality</span></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
              Target size <span className="text-xs font-normal text-zinc-400">(optional — auto-adjusts quality)</span>
            </label>
            <div className="flex items-center gap-2">
              <input type="number" value={targetKb} onChange={(e) => setTargetKb(e.target.value)} placeholder="e.g. 150" min="1" className="input flex-1" />
              <span className="text-sm text-zinc-500">KB</span>
            </div>
            {targetKb && <p className="text-xs text-indigo-400 mt-1">Quality slider will be overridden</p>}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <button className="btn-primary mb-6" onClick={compress} disabled={!file || status === 'loading'}>
        {status === 'loading' ? 'Compressing…' : 'Compress Image'}
      </button>

      {status === 'done' && result && (
        <div className="card">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
            <CheckCircle2 size={15} /> Compression complete · quality used: {result.usedQuality}%
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {preview && <div>
              <p className="text-xs text-zinc-500 mb-1">Original</p>
              <img src={preview} alt="original" className="w-full rounded-lg border border-zinc-700 object-cover max-h-40" />
              <p className="text-xs text-zinc-500 mt-1">{(file.size / 1024).toFixed(0)} KB</p>
            </div>}
            <div>
              <p className="text-xs text-zinc-500 mb-1">Compressed</p>
              <img src={result.url} alt="compressed" className="w-full rounded-lg border border-zinc-700 object-cover max-h-40" />
              <p className="text-xs text-emerald-400 mt-1">{(result.compressedSize / 1024).toFixed(0)} KB (−{result.reduction}%)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-primary" onClick={download}><Download size={15} /> Download</button>
            <span className="text-xs text-zinc-500">{result.width} × {result.height}px</span>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, X, Download, AlertCircle, Lock, Unlock } from 'lucide-react'

const PRESETS = [
  { label: 'Instagram Square', w: 1080, h: 1080 },
  { label: 'Twitter/X Post', w: 1200, h: 675 },
  { label: 'YouTube Thumbnail', w: 1280, h: 720 },
  { label: 'Facebook Cover', w: 820, h: 312 },
  { label: 'LinkedIn Banner', w: 1584, h: 396 },
  { label: 'OG Image', w: 1200, h: 630 },
]

const ABOUT = [
  'Image Resizer changes the pixel dimensions of an image to any custom size or one of the built-in social media presets.',
  'Use the lock icon to maintain the original aspect ratio while resizing — this prevents the image from appearing stretched or squished.',
  'Fit mode places your image inside the target dimensions while preserving aspect ratio (may add background padding). Fill stretches to cover. Exact ignores the ratio and uses your exact dimensions.',
  'Resizing happens entirely in-browser using the Canvas API. The output is downloaded as a PNG regardless of the original format.',
]

export default function ImageResizer() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [origDims, setOrigDims] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [lockRatio, setLockRatio] = useState(true)
  const [ratio, setRatio] = useState(1)
  const [resizeMode, setResizeMode] = useState('exact')
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const inputRef = useRef()

  function handleFile(f) {
    if (!f || !f.type.startsWith('image/')) { setError('Please upload an image file.'); return }
    setError(''); setFile(f); setResult(null)
    const url = URL.createObjectURL(f)
    setPreview(url)
    const img = new Image()
    img.onload = () => {
      setWidth(String(img.naturalWidth))
      setHeight(String(img.naturalHeight))
      setRatio(img.naturalWidth / img.naturalHeight)
      setOrigDims({ w: img.naturalWidth, h: img.naturalHeight })
    }
    img.src = url
  }

  function onWidthChange(val) {
    setWidth(val)
    if (lockRatio && ratio && !isNaN(Number(val))) setHeight(String(Math.round(Number(val) / ratio)))
  }

  function onHeightChange(val) {
    setHeight(val)
    if (lockRatio && ratio && !isNaN(Number(val))) setWidth(String(Math.round(Number(val) * ratio)))
  }

  function applyPreset(w, h) {
    setWidth(String(w)); setHeight(String(h)); setLockRatio(false)
  }

  async function resize() {
    const w = parseInt(width)
    const h = parseInt(height)
    if (!file || isNaN(w) || isNaN(h) || w < 1 || h < 1) { setError('Please enter valid dimensions.'); return }
    setStatus('loading'); setError('')
    try {
      const bitmap = await createImageBitmap(file)
      const canvas = document.createElement('canvas')
      canvas.width = w; canvas.height = h
      const ctx = canvas.getContext('2d')

      if (resizeMode === 'fit') {
        const scale = Math.min(w / bitmap.width, h / bitmap.height)
        const sw = bitmap.width * scale, sh = bitmap.height * scale
        const ox = (w - sw) / 2, oy = (h - sh) / 2
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, w, h)
        ctx.drawImage(bitmap, ox, oy, sw, sh)
      } else if (resizeMode === 'fill') {
        const scale = Math.max(w / bitmap.width, h / bitmap.height)
        const sw = bitmap.width * scale, sh = bitmap.height * scale
        const ox = (w - sw) / 2, oy = (h - sh) / 2
        ctx.drawImage(bitmap, ox, oy, sw, sh)
      } else {
        ctx.drawImage(bitmap, 0, 0, w, h)
      }
      bitmap.close()

      const dataURL = canvas.toDataURL('image/png')
      const bytes = atob(dataURL.split(',')[1])
      const arr = new Uint8Array(bytes.length)
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
      const blob = new Blob([arr], { type: 'image/png' })
      setResult({ blob, url: URL.createObjectURL(blob), name: file.name.replace(/\.[^.]+$/, `_${w}x${h}.png`), w, h })
      setStatus('done')
    } catch {
      setError('Resize failed.')
      setStatus('error')
    }
  }

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to exact dimensions or social media presets. Fit, fill, or exact resize modes."
      toolId="image-resizer"
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
            {preview && <img src={preview} alt="" className="w-14 h-14 object-cover rounded" />}
            <div className="text-left">
              <p className="text-sm text-zinc-100">{file.name}</p>
              <p className="text-xs text-zinc-500">{origDims ? `${origDims.w} × ${origDims.h}px · ` : ''}{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button className="text-zinc-500 hover:text-zinc-300" onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null); setOrigDims(null) }}>
              <X size={15} />
            </button>
          </div>
        ) : (
          <div>
            <Upload size={24} className="mx-auto mb-2 text-zinc-500" />
            <p className="text-sm text-zinc-400">Drop an image or <span className="text-indigo-400">browse</span></p>
          </div>
        )}
      </div>

      <div className="card mb-4">
        {/* Resize mode */}
        <div className="mb-4">
          <p className="text-xs text-zinc-500 mb-2">Resize mode</p>
          <div className="flex gap-2">
            {[
              { value: 'exact', label: 'Exact', desc: 'Stretch to fill' },
              { value: 'fit',   label: 'Fit',   desc: 'Inside box + padding' },
              { value: 'fill',  label: 'Fill',  desc: 'Cover & crop' },
            ].map(({ value, label, desc }) => (
              <button key={value} onClick={() => setResizeMode(value)}
                className={`flex-1 py-2 px-2 rounded-lg border text-xs text-left transition-colors ${resizeMode === value ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                <p className="font-medium">{label}</p>
                <p className="opacity-60">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <p className="text-xs text-zinc-500 mb-2">Dimensions</p>
        <div className="flex items-center gap-3 mb-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Width (px)</label>
            <input value={width} onChange={(e) => onWidthChange(e.target.value)} className="input w-28" placeholder="1080" />
          </div>
          <button className="mt-4 p-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors" onClick={() => setLockRatio(!lockRatio)} title={lockRatio ? 'Locked' : 'Unlocked'}>
            {lockRatio ? <Lock size={15} /> : <Unlock size={15} />}
          </button>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Height (px)</label>
            <input value={height} onChange={(e) => onHeightChange(e.target.value)} className="input w-28" placeholder="1080" />
          </div>
        </div>

        <p className="text-xs text-zinc-500 mb-2">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => applyPreset(p.w, p.h)}
              className="px-2 py-1 text-xs border border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 rounded-md transition-colors">
              {p.label} <span className="opacity-50">{p.w}×{p.h}</span>
            </button>
          ))}
        </div>
      </div>

      {error && <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4"><AlertCircle size={15} /> {error}</div>}

      <button className="btn-primary mb-6" onClick={resize} disabled={!file || status === 'loading'}>
        {status === 'loading' ? 'Resizing…' : 'Resize Image'}
      </button>

      {status === 'done' && result && (
        <div className="card">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Original</p>
              <img src={preview} alt="original" className="w-full rounded border border-zinc-700 max-h-40 object-contain bg-zinc-800" />
              {origDims && <p className="text-xs text-zinc-500 mt-1">{origDims.w}×{origDims.h}px</p>}
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Resized</p>
              <img src={result.url} alt="resized" className="w-full rounded border border-zinc-700 max-h-40 object-contain bg-zinc-800" />
              <p className="text-xs text-emerald-400 mt-1">{result.w}×{result.h}px</p>
            </div>
          </div>
          <button className="btn-primary" onClick={() => { const a = document.createElement('a'); a.href = result.url; a.download = result.name; a.click() }}>
            <Download size={15} /> Download PNG
          </button>
        </div>
      )}
    </ToolLayout>
  )
}

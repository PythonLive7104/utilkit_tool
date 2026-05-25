import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { removeBackground } from '../../lib/api'
import { Upload, X, Download, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'

const ABOUT = [
  'Background Remover uses AI to automatically detect and isolate the subject of any photo — no manual selection, masking, or editing required.',
  'Simply upload a photo and the background is removed in seconds. The result is returned as a transparent PNG so you can place the subject on any background you choose.',
  'After removal, choose a replacement background: keep it transparent (ideal for stickers and product shots), replace with white or black, or pick any custom hex colour using the colour picker.',
  'Download the result as PNG to preserve transparency — great for placing the subject on any background later. Or choose JPEG if you selected a solid background colour and want a smaller file.',
]

export default function BackgroundRemover() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [bgColor, setBgColor] = useState('transparent')
  const [customHex, setCustomHex] = useState('#ffffff')
  const [downloadFormat, setDownloadFormat] = useState('png')
  const [status, setStatus] = useState('idle')
  const [resultBlob, setResultBlob] = useState(null)
  const [resultUrl, setResultUrl] = useState(null)
  const [dimensions, setDimensions] = useState(null)
  const [error, setError] = useState('')
  const inputRef = useRef()
  const canvasRef = useRef()

  function handleFile(f) {
    if (!f || !f.type.startsWith('image/')) { setError('Please upload a JPG or PNG image.'); return }
    if (f.size > 5 * 1024 * 1024) { setError('Max 5 MB per image.'); return }
    setError('')
    setFile(f)
    setResultBlob(null)
    setResultUrl(null)
    setDimensions(null)
    setPreview(URL.createObjectURL(f))
  }

  async function remove() {
    if (!file) return
    setStatus('loading')
    setError('')
    try {
      const blob = await removeBackground(file)
      setResultBlob(blob)
      applyBackground(blob, bgColor === 'custom' ? customHex : bgColor)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  function applyBackground(blob, color) {
    const img = new Image()
    img.onload = () => {
      setDimensions({ w: img.naturalWidth, h: img.naturalHeight })
      const canvas = canvasRef.current || document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (color !== 'transparent') {
        ctx.fillStyle = color
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, 0)
      canvas.toBlob((b) => {
        if (resultUrl) URL.revokeObjectURL(resultUrl)
        setResultUrl(URL.createObjectURL(b))
      }, 'image/png')
    }
    img.src = URL.createObjectURL(blob)
  }

  function onBgChange(val) {
    setBgColor(val)
    if (resultBlob) applyBackground(resultBlob, val === 'custom' ? customHex : val)
  }

  function onHexChange(val) {
    setCustomHex(val)
    if (resultBlob && bgColor === 'custom') applyBackground(resultBlob, val)
  }

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    const mime = downloadFormat === 'jpeg' ? 'image/jpeg' : 'image/png'
    const ext = downloadFormat === 'jpeg' ? 'jpg' : 'png'
    canvas.toBlob((b) => {
      const url = URL.createObjectURL(b)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name.replace(/\.[^.]+$/, `_nobg.${ext}`)
      a.click()
      URL.revokeObjectURL(url)
    }, mime, downloadFormat === 'jpeg' ? 0.92 : undefined)
  }

  const bgOptions = [
    { value: 'transparent', label: 'Transparent' },
    { value: '#ffffff', label: 'White' },
    { value: '#000000', label: 'Black' },
    { value: 'custom', label: 'Custom colour' },
  ]

  return (
    <ToolLayout
      title="Background Remover"
      description="Remove the background from any photo using AI. Supports transparent, white, black, or any custom colour output."
      toolId="background-remover"
      about={ABOUT}
    >
      <div
        className={`upload-zone mb-4 ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            {preview && <img src={preview} alt="" className="w-16 h-16 object-cover rounded-lg border border-zinc-200 dark:border-zinc-700" />}
            <div className="text-left">
              <p className="text-sm text-zinc-700 dark:text-zinc-200">{file.name}</p>
              <p className="text-xs text-zinc-400">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              className="text-zinc-400 hover:text-zinc-600"
              onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResultBlob(null); setResultUrl(null); setStatus('idle'); setDimensions(null) }}
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <div>
            <Upload size={24} className="mx-auto mb-2 text-zinc-400" />
            <p className="text-sm text-zinc-500 mb-1">Drop a JPG or PNG, or <span className="text-indigo-500">browse</span></p>
            <p className="text-xs text-zinc-400">Max 5 MB</p>
          </div>
        )}
      </div>

      <div className="card mb-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-3">Output background</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {bgOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onBgChange(value)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                bgColor === value
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300'
                  : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {bgColor === 'custom' && (
          <div className="flex items-center gap-3 mb-3">
            <input
              type="color"
              value={customHex}
              onChange={(e) => onHexChange(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-zinc-200 dark:border-zinc-700 bg-transparent"
            />
            <input
              value={customHex}
              onChange={(e) => onHexChange(e.target.value)}
              placeholder="#ffffff"
              className="input w-32 font-mono text-sm"
            />
          </div>
        )}
        <div>
          <p className="text-xs text-zinc-500 mb-2">Download format</p>
          <div className="flex gap-2">
            {[{ value: 'png', label: 'PNG (preserves transparency)' }, { value: 'jpeg', label: 'JPEG (smaller, flat)' }].map(({ value, label }) => (
              <button key={value} onClick={() => setDownloadFormat(value)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${downloadFormat === value ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                {label}
              </button>
            ))}
          </div>
          {downloadFormat === 'jpeg' && bgColor === 'transparent' && (
            <p className="text-xs text-amber-500 mt-1">JPEG doesn't support transparency — transparent areas will appear black. Choose a background colour first.</p>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 dark:text-red-400 text-sm mb-4">
          <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <button
        className="btn-primary mb-6"
        onClick={remove}
        disabled={!file || status === 'loading'}
      >
        {status === 'loading'
          ? <><Loader2 size={15} className="animate-spin" /> Removing background…</>
          : 'Remove Background'}
      </button>

      {status === 'done' && resultUrl && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              <CheckCircle2 size={15} /> Background removed
            </span>
            {dimensions && <span className="text-xs text-zinc-500">{dimensions.w} × {dimensions.h}px</span>}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-zinc-400 mb-1">Original</p>
              <img
                src={preview}
                alt="original"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 max-h-48 object-contain bg-zinc-100 dark:bg-zinc-800"
              />
            </div>
            <div>
              <p className="text-xs text-zinc-400 mb-1">Result</p>
              <img
                src={resultUrl}
                alt="result"
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 max-h-48 object-contain"
                style={{
                  background:
                    bgColor === 'transparent'
                      ? 'repeating-conic-gradient(#d4d4d8 0% 25%, transparent 0% 50%) 0 0/16px 16px'
                      : bgColor === 'custom' ? customHex : bgColor,
                }}
              />
            </div>
          </div>
          <button className="btn-primary" onClick={download}>
            <Download size={15} />
            Download {downloadFormat.toUpperCase()}
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  )
}

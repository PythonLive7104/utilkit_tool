import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, Download, ZoomIn, ImageIcon } from 'lucide-react'

const ABOUT = [
  'AI Image Upscaler enlarges your images to 2×, 3×, or 4× their original size using high-quality canvas interpolation.',
  'The upscaler uses the browser\'s built-in high-quality image smoothing to produce clean, sharp results when enlarging photos, icons, and illustrations.',
  'Useful for printing small images at larger sizes, creating display-ready versions of small assets, or fixing low-resolution thumbnails.',
]

const SCALES = [2, 3, 4]

export default function AiImageUpscaler() {
  const [imgEl, setImgEl] = useState(null)
  const [preview, setPreview] = useState(null)
  const [scale, setScale] = useState(2)
  const [result, setResult] = useState(null)
  const [info, setInfo] = useState(null)
  const [origSize, setOrigSize] = useState(null)

  function onFile(e) {
    const f = e.target.files[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    const img = new Image()
    img.onload = () => {
      setImgEl(img)
      setOrigSize({ w: img.naturalWidth, h: img.naturalHeight })
      setResult(null); setInfo(null)
    }
    img.src = url
  }

  function upscale() {
    if (!imgEl) return
    const canvas = document.createElement('canvas')
    canvas.width = imgEl.naturalWidth * scale
    canvas.height = imgEl.naturalHeight * scale
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/png')
    setResult(dataUrl)
    setInfo({
      from: `${imgEl.naturalWidth} × ${imgEl.naturalHeight}`,
      to: `${canvas.width} × ${canvas.height}`,
    })
  }

  function download() {
    const a = document.createElement('a')
    a.href = result
    a.download = `upscaled-${scale}x.png`
    a.click()
  }

  return (
    <ToolLayout title="Image Upscaler" description="Enlarge images 2×, 3×, or 4× with high-quality interpolation. No upload to servers." toolId="ai-image-upscaler" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Upload Image</label>
            <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
              <Upload size={20} className="text-zinc-500" />
              <span className="text-sm text-zinc-400">{imgEl ? `${origSize?.w} × ${origSize?.h}px — click to change` : 'Click or drag an image here'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={onFile} />
            </label>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Upscale Factor</label>
            <div className="flex gap-2">
              {SCALES.map(s => (
                <button key={s} onClick={() => setScale(s)} className={`px-4 py-2 text-sm rounded-lg border transition-colors ${scale === s ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  {s}×
                </button>
              ))}
            </div>
            {origSize && (
              <p className="text-xs text-zinc-600 mt-2">
                Output: {origSize.w * scale} × {origSize.h * scale}px
              </p>
            )}
          </div>
          <button className="btn-primary" onClick={upscale} disabled={!imgEl}>
            <ZoomIn size={15} /> Upscale Image
          </button>
          {result && (
            <button className="btn-secondary" onClick={download}>
              <Download size={15} /> Download {scale}× Image
            </button>
          )}
          {info && (
            <div className="text-xs text-zinc-500 space-y-0.5">
              <div>Original: {info.from}px</div>
              <div>Upscaled: {info.to}px</div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-2">{result ? 'Upscaled Preview' : 'Original'}</label>
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 overflow-hidden flex items-center justify-center min-h-48">
            {result ? (
              <img src={result} alt="Upscaled" className="max-w-full h-auto max-h-80 object-contain" />
            ) : preview ? (
              <img src={preview} alt="Original" className="max-w-full h-auto max-h-80 object-contain" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-600 py-12">
                <ImageIcon size={32} />
                <span className="text-sm">Upload an image to start</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

import { useState, useEffect, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { removeBackground } from '../../lib/api'
import { Upload, Download, Loader2, ImageIcon } from 'lucide-react'

const ABOUT = [
  'Background Changer removes the background from your photo and replaces it with a solid colour or a background image of your choice.',
  'Upload a photo, the subject is cut out automatically, then pick a new background colour or upload your own background — perfect for profile pictures, product shots, and ID photos.',
  'The cutout is processed securely; the final image is composited in your browser and never stored.',
]

const PRESET_COLORS = ['#ffffff', '#000000', '#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#ef4444']

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function drawCover(ctx, img, w, h) {
  const ir = img.width / img.height
  const cr = w / h
  let dw, dh, dx, dy
  if (ir > cr) { dh = h; dw = h * ir; dx = (w - dw) / 2; dy = 0 }
  else { dw = w; dh = w / ir; dx = 0; dy = (h - dh) / 2 }
  ctx.drawImage(img, dx, dy, dw, dh)
}

export default function BackgroundChanger() {
  const [cutoutUrl, setCutoutUrl] = useState('')
  const [bgType, setBgType] = useState('color')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [bgImageUrl, setBgImageUrl] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef(null)

  async function onForeground(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setResultUrl('')
    setBusy(true)
    try {
      const blob = await removeBackground(file)
      setCutoutUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err.message || 'Could not remove the background. Please try another image.')
    } finally {
      setBusy(false)
    }
  }

  function onBackgroundImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setBgType('image')
    setBgImageUrl(URL.createObjectURL(file))
  }

  // Re-composite whenever the cutout or chosen background changes.
  useEffect(() => {
    if (!cutoutUrl) return
    let cancelled = false

    async function compose() {
      try {
        const cutout = await loadImage(cutoutUrl)
        const w = cutout.naturalWidth
        const h = cutout.naturalHeight
        const canvas = canvasRef.current
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, w, h)

        if (bgType === 'image' && bgImageUrl) {
          const bg = await loadImage(bgImageUrl)
          drawCover(ctx, bg, w, h)
        } else {
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, w, h)
        }
        ctx.drawImage(cutout, 0, 0)

        canvas.toBlob((blob) => {
          if (!cancelled && blob) setResultUrl(URL.createObjectURL(blob))
        }, 'image/png')
      } catch {
        if (!cancelled) setError('Could not render the image.')
      }
    }
    compose()
    return () => { cancelled = true }
  }, [cutoutUrl, bgType, bgColor, bgImageUrl])

  return (
    <ToolLayout
      title="Background Changer"
      description="Remove a photo's background and replace it with a solid colour or your own background image."
      toolId="background-changer"
      about={ABOUT}
    >
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-2 w-full px-4 py-8 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-400 cursor-pointer transition-colors">
          {busy ? <Loader2 size={20} className="animate-spin text-indigo-500" /> : <Upload size={20} className="text-zinc-400" />}
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {busy ? 'Removing background…' : 'Upload a photo to change its background'}
          </span>
          <input type="file" accept="image/*" onChange={onForeground} className="hidden" disabled={busy} />
        </label>
        {error && <p className="text-sm text-rose-500 mt-3">{error}</p>}
      </div>

      {cutoutUrl && (
        <>
          <div className="card mb-4 space-y-4">
            <div className="flex gap-2">
              {['color', 'image'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setBgType(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                    bgType === t
                      ? 'bg-indigo-600 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {t === 'color' ? 'Solid colour' : 'Background image'}
                </button>
              ))}
            </div>

            {bgType === 'color' ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setBgColor(c)}
                      className={`w-8 h-8 rounded-lg border ${bgColor === c ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900' : 'border-zinc-300 dark:border-zinc-700'}`}
                      style={{ backgroundColor: c }}
                      aria-label={c}
                    />
                  ))}
                </div>
                <input type="color" className="w-full h-10 rounded-lg cursor-pointer bg-transparent" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 w-full px-4 py-5 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-400 cursor-pointer transition-colors">
                <ImageIcon size={16} className="text-zinc-400" />
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Upload a background image</span>
                <input type="file" accept="image/*" onChange={onBackgroundImage} className="hidden" />
              </label>
            )}
          </div>

          <div className="card text-center">
            {/* Checkerboard backdrop so transparency is visible while compositing */}
            <div className="rounded-xl overflow-hidden inline-block bg-[length:20px_20px] bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%),linear-gradient(-45deg,#e5e7eb_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e5e7eb_75%),linear-gradient(-45deg,transparent_75%,#e5e7eb_75%)]">
              {resultUrl
                ? <img src={resultUrl} alt="Result" className="max-h-80 w-auto" />
                : <div className="px-12 py-12 text-sm text-zinc-400">Rendering…</div>}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            {resultUrl && (
              <div className="mt-4">
                <a
                  href={resultUrl}
                  download="background-changed.png"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
                >
                  <Download size={16} /> Download PNG
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </ToolLayout>
  )
}

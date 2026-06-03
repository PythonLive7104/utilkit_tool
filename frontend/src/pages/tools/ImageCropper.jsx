import { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, Download, Crop as CropIcon } from 'lucide-react'

const ABOUT = [
  'Image Cropper lets you select any rectangular region of an image and export just that part as a PNG or JPG.',
  'Drag the handles or the selection box over the preview to choose the crop area, with an optional fixed aspect ratio (1:1, 4:3, 16:9).',
  'Cropping is done on a canvas entirely in your browser — your image never leaves your device.',
]

const RATIOS = { Free: null, '1:1': 1, '4:3': 4 / 3, '16:9': 16 / 9, '3:4': 3 / 4 }

export default function ImageCropper() {
  const [src, setSrc] = useState(null)
  const [img, setImg] = useState(null)
  const [ratio, setRatio] = useState('Free')
  const [sel, setSel] = useState(null) // {x,y,w,h} in display coords
  const [format, setFormat] = useState('image/png')
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const dragRef = useRef(null)

  function onFile(e) {
    const f = e.target.files[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    const image = new Image()
    image.onload = () => { setImg(image); setSrc(url); setSel(null) }
    image.src = url
  }

  // initialise selection once image displayed
  useEffect(() => {
    if (!img || !imgRef.current) return
    const r = imgRef.current.getBoundingClientRect()
    let w = r.width * 0.6, h = r.height * 0.6
    if (RATIOS[ratio]) h = w / RATIOS[ratio]
    setSel({ x: (r.width - w) / 2, y: (r.height - h) / 2, w, h })
  }, [img, ratio])

  function onPointerDown(e, mode) {
    e.preventDefault()
    const rect = imgRef.current.getBoundingClientRect()
    dragRef.current = { mode, startX: e.clientX, startY: e.clientY, orig: { ...sel }, rect }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }
  function onPointerMove(e) {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.startX, dy = e.clientY - d.startY
    const { width: cw, height: ch } = d.rect
    let { x, y, w, h } = d.orig
    if (d.mode === 'move') {
      x = Math.max(0, Math.min(cw - w, x + dx))
      y = Math.max(0, Math.min(ch - h, y + dy))
    } else {
      w = Math.max(20, w + dx)
      if (RATIOS[ratio]) h = w / RATIOS[ratio]
      else h = Math.max(20, h + dy)
      w = Math.min(w, cw - x); h = Math.min(h, ch - y)
      if (RATIOS[ratio]) w = h * RATIOS[ratio]
    }
    setSel({ x, y, w, h })
  }
  function onPointerUp() {
    dragRef.current = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }

  function exportCrop() {
    if (!img || !sel || !imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const scaleX = img.naturalWidth / rect.width
    const scaleY = img.naturalHeight / rect.height
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(sel.w * scaleX)
    canvas.height = Math.round(sel.h * scaleY)
    const ctx = canvas.getContext('2d')
    if (format === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height) }
    ctx.drawImage(img, sel.x * scaleX, sel.y * scaleY, sel.w * scaleX, sel.h * scaleY, 0, 0, canvas.width, canvas.height)
    const a = document.createElement('a')
    a.href = canvas.toDataURL(format, 0.92)
    a.download = format === 'image/png' ? 'cropped.png' : 'cropped.jpg'
    a.click()
  }

  return (
    <ToolLayout
      title="Image Cropper"
      description="Crop any image to a custom region or fixed aspect ratio and download it as PNG or JPG — all in your browser."
      toolId="image-cropper"
      about={ABOUT}
    >
      {!src && (
        <div className="card mb-4">
          <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
            <Upload size={24} className="text-zinc-500" />
            <span className="text-sm text-zinc-400">Click or drag an image here</span>
            <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
        </div>
      )}

      {src && (
        <>
          <div className="card mb-4 flex items-center gap-4 flex-wrap">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Aspect ratio</label>
              <div className="flex gap-1.5 flex-wrap">
                {Object.keys(RATIOS).map(r => (
                  <button key={r} onClick={() => setRatio(r)} className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${ratio === r ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{r}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Format</label>
              <select className="input w-auto py-1.5" value={format} onChange={e => setFormat(e.target.value)}>
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
              </select>
            </div>
          </div>

          <div ref={containerRef} className="card mb-4 flex justify-center overflow-hidden">
            <div className="relative inline-block select-none touch-none">
              <img ref={imgRef} src={src} alt="" className="max-h-[420px] block" draggable={false} />
              {sel && (
                <div
                  className="absolute border-2 border-indigo-400 cursor-move"
                  style={{ left: sel.x, top: sel.y, width: sel.w, height: sel.h, boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)' }}
                  onPointerDown={e => onPointerDown(e, 'move')}
                >
                  <div
                    className="absolute -right-2 -bottom-2 w-4 h-4 bg-indigo-400 rounded-full cursor-se-resize"
                    onPointerDown={e => { e.stopPropagation(); onPointerDown(e, 'resize') }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn-primary" onClick={exportCrop}><Download size={15} /> Download crop</button>
            <button className="btn-ghost" onClick={() => { setSrc(null); setImg(null); setSel(null) }}>Choose another</button>
          </div>
        </>
      )}
    </ToolLayout>
  )
}

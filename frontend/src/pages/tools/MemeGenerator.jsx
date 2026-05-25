import { useState, useRef, useEffect, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, Download, ImageIcon } from 'lucide-react'

const ABOUT = [
  'Meme Generator lets you add bold top and bottom text to any image, just like a classic internet meme.',
  'Upload your image, type your caption, adjust font size and text colour, then download the result as a PNG.',
  'No watermarks, no sign-up. Everything runs in your browser — your images stay private.',
]

const TEXT_COLORS = ['white', 'black', 'yellow', 'red']

export default function MemeGenerator() {
  const canvasRef = useRef(null)
  const [imgEl, setImgEl] = useState(null)
  const [topText, setTopText] = useState('TOP TEXT')
  const [bottomText, setBottomText] = useState('BOTTOM TEXT')
  const [fontSize, setFontSize] = useState(36)
  const [color, setColor] = useState('white')

  const drawMeme = useCallback((img, top, bottom, size, clr) => {
    if (!img) return
    const canvas = canvasRef.current
    if (!canvas) return
    const maxW = 800
    const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1
    canvas.width = img.naturalWidth * scale
    canvas.height = img.naturalHeight * scale
    const ctx = canvas.getContext('2d')

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    ctx.font = `bold ${size}px Impact, "Arial Black", sans-serif`
    ctx.textAlign = 'center'
    ctx.lineWidth = Math.max(2, size / 12)
    ctx.strokeStyle = clr === 'white' ? '#000' : clr === 'black' ? '#fff' : '#000'
    ctx.fillStyle = clr
    ctx.lineJoin = 'round'

    if (top) {
      const lines = wrapText(ctx, top.toUpperCase(), canvas.width - 20, size)
      lines.forEach((line, i) => {
        const y = size + 8 + i * (size + 4)
        ctx.strokeText(line, canvas.width / 2, y)
        ctx.fillText(line, canvas.width / 2, y)
      })
    }
    if (bottom) {
      const lines = wrapText(ctx, bottom.toUpperCase(), canvas.width - 20, size)
      lines.reverse().forEach((line, i) => {
        const y = canvas.height - 10 - i * (size + 4)
        ctx.strokeText(line, canvas.width / 2, y)
        ctx.fillText(line, canvas.width / 2, y)
      })
    }
  }, [])

  function wrapText(ctx, text, maxWidth, size) {
    const words = text.split(' ')
    const lines = []
    let current = ''
    for (const word of words) {
      const test = current ? current + ' ' + word : word
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current); current = word
      } else { current = test }
    }
    if (current) lines.push(current)
    return lines
  }

  useEffect(() => {
    drawMeme(imgEl, topText, bottomText, fontSize, color)
  }, [imgEl, topText, bottomText, fontSize, color, drawMeme])

  function onFile(e) {
    const f = e.target.files[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    const img = new Image()
    img.onload = () => setImgEl(img)
    img.src = url
  }

  function download() {
    const canvas = canvasRef.current
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = 'meme.png'
    a.click()
  }

  return (
    <ToolLayout title="Meme Generator" description="Add bold top and bottom text to any image. Download your meme as PNG instantly." toolId="meme-generator" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Upload Image</label>
            <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
              <Upload size={20} className="text-zinc-500" />
              <span className="text-sm text-zinc-400">{imgEl ? 'Click to change image' : 'Click or drag image here'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={onFile} />
            </label>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Top Text</label>
            <input value={topText} onChange={e => setTopText(e.target.value)} placeholder="TOP TEXT" className="input w-full" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Bottom Text</label>
            <input value={bottomText} onChange={e => setBottomText(e.target.value)} placeholder="BOTTOM TEXT" className="input w-full" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Font Size: {fontSize}px</label>
            <input type="range" min={16} max={72} step={2} value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full accent-indigo-500" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-2">Text Colour</label>
            <div className="flex gap-2">
              {TEXT_COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)} className={`px-3 py-1.5 text-sm rounded-lg border capitalize transition-colors ${color === c ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{c}</button>
              ))}
            </div>
          </div>
          {imgEl && (
            <button className="btn-primary w-full" onClick={download}>
              <Download size={15} /> Download Meme
            </button>
          )}
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-2">Preview</label>
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 overflow-hidden flex items-center justify-center min-h-48">
            {imgEl ? (
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-600 py-12">
                <ImageIcon size={32} />
                <span className="text-sm">Upload an image to start</span>
              </div>
            )}
          </div>
          {!imgEl && <canvas ref={canvasRef} className="hidden" />}
        </div>
      </div>
    </ToolLayout>
  )
}

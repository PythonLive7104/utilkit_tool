import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, Download, X, ImageIcon } from 'lucide-react'

const ABOUT = [
  'PNG to JPG converts your PNG images to JPEG format with a quality slider, reducing file size for web and sharing.',
  'Transparent PNG backgrounds are filled with white before conversion, since JPEG does not support transparency.',
  'Convert multiple PNGs at once — all processing happens in your browser, with no file uploads to any server.',
]

function fmt(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(2) + ' MB'
}

export default function PngToJpg() {
  const [files, setFiles] = useState([])
  const [quality, setQuality] = useState(92)
  const [results, setResults] = useState([])
  const [converting, setConverting] = useState(false)

  function onFiles(e) {
    const accepted = Array.from(e.target.files).filter(f => f.type === 'image/png')
    setFiles(accepted); setResults([])
  }

  function convert() {
    if (!files.length) return
    setConverting(true)
    const out = []
    let done = 0

    files.forEach((f, idx) => {
      const url = URL.createObjectURL(f)
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL('image/jpeg', quality / 100)
        const byteLen = Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 0.75)
        out[idx] = {
          name: f.name.replace(/\.png$/i, '.jpg'),
          url: dataUrl,
          originalSize: f.size,
          newSize: byteLen,
          dims: `${img.naturalWidth} × ${img.naturalHeight}`,
        }
        URL.revokeObjectURL(url)
        done++
        if (done === files.length) { setResults([...out]); setConverting(false) }
      }
      img.src = url
    })
  }

  function downloadAll() {
    results.forEach(r => {
      const a = document.createElement('a')
      a.href = r.url; a.download = r.name; a.click()
    })
  }

  return (
    <ToolLayout title="PNG to JPG Converter" description="Convert PNG images to JPEG with quality control. Fast, free, and private — no uploads." toolId="png-to-jpg" about={ABOUT}>
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
          <Upload size={24} className="text-zinc-500" />
          <span className="text-sm text-zinc-400">{files.length ? `${files.length} PNG file${files.length !== 1 ? 's' : ''} selected` : 'Click or drag PNG files here'}</span>
          <input type="file" accept=".png,image/png" multiple className="hidden" onChange={onFiles} />
        </label>
      </div>
      {files.length > 0 && (
        <div className="card mb-4">
          <label className="block text-xs text-zinc-500 mb-1.5">JPEG Quality: {quality}%</label>
          <input type="range" min={50} max={100} step={1} value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-indigo-500" />
          <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>50% (smaller)</span><span>100% (best quality)</span></div>
        </div>
      )}
      <button className="btn-primary mb-6" onClick={convert} disabled={!files.length || converting}>
        {converting ? 'Converting…' : <><ImageIcon size={15} /> Convert to JPG</>}
      </button>
      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-200">{results.length} file{results.length !== 1 ? 's' : ''} converted</span>
            {results.length > 1 && <button className="btn-secondary text-xs" onClick={downloadAll}><Download size={12} /> Download All</button>}
          </div>
          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-zinc-800/60 border border-zinc-700 rounded-xl">
              <img src={r.url} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-200 truncate">{r.name}</p>
                <p className="text-xs text-zinc-500">{r.dims} · {fmt(r.originalSize)} → {fmt(r.newSize)} ({Math.round((1 - r.newSize / r.originalSize) * 100)}% smaller)</p>
              </div>
              <a href={r.url} download={r.name} className="btn-ghost py-1 px-2 text-xs shrink-0"><Download size={12} /></a>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  )
}

import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, Download, ImageIcon } from 'lucide-react'

const ABOUT = [
  'WebP Converter converts JPG, PNG, and other images to WebP format — Google\'s modern image format that achieves 25–35% smaller file sizes compared to JPEG at the same quality.',
  'WebP is now supported by all modern browsers and is the recommended format for web images, improving page load speeds.',
  'Adjust quality, convert multiple files at once, and download them all — entirely in your browser with no server upload.',
]

function fmt(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(2) + ' MB'
}

export default function WebpConverter() {
  const [files, setFiles] = useState([])
  const [quality, setQuality] = useState(85)
  const [results, setResults] = useState([])
  const [converting, setConverting] = useState(false)

  function onFiles(e) {
    const accepted = Array.from(e.target.files).filter(f => f.type.startsWith('image/'))
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
        canvas.getContext('2d').drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL('image/webp', quality / 100)
        const byteLen = Math.round((dataUrl.length - 'data:image/webp;base64,'.length) * 0.75)
        const baseName = f.name.replace(/\.[^.]+$/, '')
        out[idx] = {
          name: baseName + '.webp',
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
    <ToolLayout title="WebP Converter" description="Convert JPG and PNG images to WebP for smaller file sizes and faster web pages." toolId="webp-converter" about={ABOUT}>
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
          <Upload size={24} className="text-zinc-500" />
          <span className="text-sm text-zinc-400">{files.length ? `${files.length} image${files.length !== 1 ? 's' : ''} selected` : 'Click or drag JPG / PNG files here'}</span>
          <input type="file" accept="image/jpeg,image/png,image/gif,image/bmp" multiple className="hidden" onChange={onFiles} />
        </label>
      </div>
      {files.length > 0 && (
        <div className="card mb-4">
          <label className="block text-xs text-zinc-500 mb-1.5">WebP Quality: {quality}%</label>
          <input type="range" min={50} max={100} step={1} value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-indigo-500" />
          <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>50% (smallest)</span><span>100% (lossless)</span></div>
        </div>
      )}
      <button className="btn-primary mb-6" onClick={convert} disabled={!files.length || converting}>
        {converting ? 'Converting…' : <><ImageIcon size={15} /> Convert to WebP</>}
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
                <p className="text-xs text-zinc-500">
                  {r.dims} · {fmt(r.originalSize)} → {fmt(r.newSize)}
                  {r.newSize < r.originalSize && <span className="text-emerald-500 ml-1">({Math.round((1 - r.newSize / r.originalSize) * 100)}% smaller)</span>}
                </p>
              </div>
              <a href={r.url} download={r.name} className="btn-ghost py-1 px-2 text-xs shrink-0"><Download size={12} /></a>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  )
}

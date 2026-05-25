import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Upload, Download, ImageIcon } from 'lucide-react'

const ABOUT = [
  'JPG to PNG converts JPEG images to PNG format, which supports lossless compression and full transparency.',
  'Use PNG when you need sharp text, logos, icons, or screenshots without the compression artifacts that JPEG introduces.',
  'Convert multiple files at once — all done locally in your browser with no file uploads.',
]

function fmt(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(2) + ' MB'
}

export default function JpgToPng() {
  const [files, setFiles] = useState([])
  const [results, setResults] = useState([])
  const [converting, setConverting] = useState(false)

  function onFiles(e) {
    const accepted = Array.from(e.target.files).filter(f => /image\/(jpeg|jpg)/.test(f.type))
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
        const dataUrl = canvas.toDataURL('image/png')
        const byteLen = Math.round((dataUrl.length - 'data:image/png;base64,'.length) * 0.75)
        out[idx] = {
          name: f.name.replace(/\.(jpg|jpeg)$/i, '.png'),
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
    <ToolLayout title="JPG to PNG Converter" description="Convert JPEG images to lossless PNG format. Free, private, runs in your browser." toolId="jpg-to-png" about={ABOUT}>
      <div className="card mb-4">
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-zinc-500 transition-colors">
          <Upload size={24} className="text-zinc-500" />
          <span className="text-sm text-zinc-400">{files.length ? `${files.length} JPG file${files.length !== 1 ? 's' : ''} selected` : 'Click or drag JPG/JPEG files here'}</span>
          <input type="file" accept=".jpg,.jpeg,image/jpeg" multiple className="hidden" onChange={onFiles} />
        </label>
      </div>
      <button className="btn-primary mb-6" onClick={convert} disabled={!files.length || converting}>
        {converting ? 'Converting…' : <><ImageIcon size={15} /> Convert to PNG</>}
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
                <p className="text-xs text-zinc-500">{r.dims} · {fmt(r.originalSize)} → {fmt(r.newSize)}</p>
              </div>
              <a href={r.url} download={r.name} className="btn-ghost py-1 px-2 text-xs shrink-0"><Download size={12} /></a>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  )
}

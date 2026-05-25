import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Printer, AlertCircle } from 'lucide-react'

const ABOUT = [
  'Word to PDF takes whatever you type or paste into the editor and converts it to a PDF using your browser\'s built-in print engine — no server upload required.',
  'Because the conversion uses the browser\'s native PDF renderer, fonts, line-breaks, and spacing are preserved exactly as they appear on screen.',
  'This is ideal for quickly creating PDFs without Word, LibreOffice, or Google Docs. Type your content, adjust the formatting settings, and hit "Print / Save as PDF".',
  'In the print dialog, choose "Save as PDF" (Chrome) or "Microsoft Print to PDF" (Edge). Uncheck "Headers and footers" for a clean full-page result.',
]

const FONT_FAMILIES = [
  { value: 'Georgia, serif', label: 'Georgia (serif)' },
  { value: '"Times New Roman", serif', label: 'Times New Roman' },
  { value: 'Arial, sans-serif', label: 'Arial (sans-serif)' },
  { value: '"Helvetica Neue", sans-serif', label: 'Helvetica Neue' },
  { value: '"Courier New", monospace', label: 'Courier New (mono)' },
]

export default function WordToPdf() {
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState('14')
  const [lineHeight, setLineHeight] = useState('1.6')
  const [margin, setMargin] = useState('20')
  const [fontFamily, setFontFamily] = useState('Georgia, serif')
  const [error, setError] = useState('')
  const previewRef = useRef()

  function printToPdf() {
    if (!text.trim()) { setError('Please enter some text first.'); return }
    setError('')
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    const content = text
      .split('\n')
      .map((line) => line.trim() === '' ? '<br/>' : `<p style="margin:0 0 0.5em">${line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
      .join('')
    iframe.contentDocument.write(`<!DOCTYPE html><html><head><style>
      body { font-family: ${fontFamily}; font-size: ${fontSize}px; line-height: ${lineHeight}; margin: ${margin}mm; color: #111; }
      p { margin: 0 0 0.5em; }
      @media print { @page { margin: ${margin}mm; } body { margin: 0; } }
    </style></head><body>${content}</body></html>`)
    iframe.contentDocument.close()
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
    setTimeout(() => document.body.removeChild(iframe), 1000)
  }

  return (
    <ToolLayout
      title="Word → PDF"
      description="Type or paste content and print it as a PDF. Uses your browser's native print-to-PDF engine."
      toolId="word-to-pdf"
      about={ABOUT}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Font family</label>
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="input text-sm">
            {FONT_FAMILIES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Font size</label>
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="input text-sm">
            {['10', '12', '13', '14', '16', '18', '20'].map((s) => <option key={s} value={s}>{s}px</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Line height</label>
          <select value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} className="input text-sm">
            {['1.2', '1.4', '1.5', '1.6', '1.8', '2.0'].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Margin (mm)</label>
          <select value={margin} onChange={(e) => setMargin(e.target.value)} className="input text-sm">
            {['10', '15', '20', '25', '30'].map((s) => <option key={s} value={s}>{s}mm</option>)}
          </select>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your document content here..."
        rows={16}
        className="textarea mb-4 leading-relaxed"
      />

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button className="btn-primary" onClick={printToPdf} disabled={!text.trim()}>
          <Printer size={15} /> Print / Save as PDF
        </button>
        <p className="text-xs text-zinc-500">Your browser's print dialog will open. Choose "Save as PDF".</p>
      </div>
    </ToolLayout>
  )
}

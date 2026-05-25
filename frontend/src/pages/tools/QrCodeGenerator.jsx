import { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Download, Copy, Check } from 'lucide-react'

const INPUT_TYPES = [
  { value: 'url',   label: 'URL',   placeholder: 'https://example.com' },
  { value: 'text',  label: 'Text',  placeholder: 'Enter any text...' },
  { value: 'email', label: 'Email', placeholder: 'user@example.com' },
  { value: 'phone', label: 'Phone', placeholder: '+1234567890' },
  { value: 'wifi',  label: 'Wi-Fi', placeholder: '' },
]

const SIZES = [200, 400, 600, 800]
const EC_LEVELS = [
  { value: 'L', label: 'L', desc: '~7% recovery' },
  { value: 'M', label: 'M', desc: '~15% recovery' },
  { value: 'Q', label: 'Q', desc: '~25% recovery' },
  { value: 'H', label: 'H', desc: '~30% recovery' },
]

const ABOUT = [
  'QR Code Generator creates scannable QR codes for URLs, plain text, email addresses, phone numbers, and Wi-Fi network credentials.',
  'QR codes are generated entirely in your browser using the qrcode library. They can be scanned by any smartphone camera app — no dedicated scanner required.',
  'Higher error correction levels (Q, H) allow the code to be read even if up to 30% of it is obscured or damaged — useful when adding a logo on top.',
  'Wi-Fi QR codes encode SSID, password, and encryption type in a format that lets Android and iOS automatically join the network when scanned.',
]

export default function QrCodeGenerator() {
  const [inputType, setInputType] = useState('url')
  const [value, setValue] = useState('')
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState('WPA')
  const [size, setSize] = useState(400)
  const [fgColor, setFgColor] = useState('#000000')
  const [ecLevel, setEcLevel] = useState('M')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const debounceRef = useRef()

  function buildContent() {
    if (inputType === 'wifi') { if (!ssid) return ''; return `WIFI:T:${encryption};S:${ssid};P:${password};;` }
    if (inputType === 'email') return value ? `mailto:${value}` : ''
    if (inputType === 'phone') return value ? `tel:${value}` : ''
    return value
  }

  async function generate(content) {
    if (!content) { setQrDataUrl(''); return }
    try {
      const QRCode = (await import('qrcode')).default
      const dataUrl = await QRCode.toDataURL(content, {
        width: size, margin: 2,
        color: { dark: fgColor, light: '#ffffff' },
        errorCorrectionLevel: ecLevel,
      })
      setQrDataUrl(dataUrl); setError('')
    } catch {
      setError('Failed to generate QR code. Input may be too long.')
    }
  }

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => generate(buildContent()), 200)
    return () => clearTimeout(debounceRef.current)
  }, [value, ssid, password, encryption, inputType, size, fgColor, ecLevel])

  function download() {
    const a = document.createElement('a')
    a.href = qrDataUrl; a.download = `qrcode_${size}px.png`; a.click()
  }

  function copyUrl() {
    if (qrDataUrl) { navigator.clipboard.writeText(buildContent()); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  }

  const content = buildContent()

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes for URLs, text, email, phone, and Wi-Fi. Customize colors and error correction level."
      toolId="qr-code-generator"
      about={ABOUT}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex flex-wrap gap-1 mb-4">
            {INPUT_TYPES.map((t) => (
              <button key={t.value} onClick={() => { setInputType(t.value); setValue('') }}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${inputType === t.value ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {inputType === 'wifi' ? (
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Network name (SSID)</label>
                <input value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="MyWiFi" className="input" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Encryption</label>
                <select value={encryption} onChange={(e) => setEncryption(e.target.value)} className="input">
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            </div>
          ) : (
            <textarea value={value} onChange={(e) => setValue(e.target.value)}
              placeholder={INPUT_TYPES.find((t) => t.value === inputType)?.placeholder}
              rows={4} className="textarea mb-4" />
          )}

          {/* Size */}
          <div className="mb-4">
            <p className="text-xs text-zinc-500 mb-2">Size</p>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${size === s ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  {s}px
                </button>
              ))}
            </div>
          </div>

          {/* Color + EC level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 mb-2">Foreground color</p>
              <div className="flex items-center gap-2">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-zinc-700 bg-transparent" />
                <input value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                  className="input w-24 font-mono text-sm" maxLength={7} />
              </div>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-2">Error correction</p>
              <div className="flex gap-1.5">
                {EC_LEVELS.map(({ value: v, label, desc }) => (
                  <button key={v} onClick={() => setEcLevel(v)} title={desc}
                    className={`px-2.5 py-1.5 text-xs font-mono rounded border transition-colors ${ecLevel === v ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-600 mt-1">{EC_LEVELS.find((e) => e.value === ecLevel)?.desc}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-xl p-4 flex items-center justify-center mb-4" style={{ aspectRatio: '1' }}>
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Code" className="w-full h-full object-contain" />
            ) : (
              <div className="text-zinc-400 text-sm text-center"><p>Enter content to</p><p>generate QR code</p></div>
            )}
          </div>
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <div className="flex gap-2 w-full">
            <button className="btn-primary flex-1" onClick={download} disabled={!qrDataUrl}><Download size={15} /> Download PNG</button>
            <button className="btn-secondary" onClick={copyUrl} disabled={!content} title="Copy content">
              {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

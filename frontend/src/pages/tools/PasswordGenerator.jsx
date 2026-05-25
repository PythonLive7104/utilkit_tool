import { useState, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { RefreshCw, Copy, Check, Shield, Hash, AlignLeft } from 'lucide-react'

const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}
const AMBIGUOUS = /[0Ol1I]/g

const WORDLIST = [
  'apple','beach','cabin','dance','eagle','flame','grace','honey','ivory','joker',
  'kite','lemon','maple','night','ocean','piano','quartz','river','stone','tiger',
  'ultra','vivid','water','xenon','yield','zebra','amber','brave','cloud','drift',
  'ember','frost','giant','humid','indie','joint','knack','lunar','metro','noble',
  'orbit','prism','quest','radar','spark','thorn','unity','vault','whirl','crisp',
  'blaze','charm','delta','elite','forge','glide','haven','input','jazzy','karma',
  'laser','magic','nerve','olive','peace','queen','royal','swift','tonic','upper',
  'vivid','widow','xenon','yacht','zonal','angry','blunt','crimp','dusty','enjoy',
  'flint','grind','happy','index','jumpy','kneel','lodge','mount','notch','ounce',
  'pixel','quirk','ridge','skill','trust','umbra','valid','windy','xerox','young',
]

function calcEntropy(length, poolSize) {
  return Math.floor(length * Math.log2(poolSize))
}

function strengthLabel(entropy) {
  if (entropy < 40) return { label: 'Weak', color: 'text-red-400', bg: 'bg-red-500', width: '25%' }
  if (entropy < 60) return { label: 'Fair', color: 'text-amber-400', bg: 'bg-amber-500', width: '50%' }
  if (entropy < 80) return { label: 'Strong', color: 'text-emerald-400', bg: 'bg-emerald-500', width: '75%' }
  return { label: 'Very Strong', color: 'text-indigo-400', bg: 'bg-indigo-500', width: '100%' }
}

function randInt(max) {
  const r = new Uint32Array(1)
  crypto.getRandomValues(r)
  return r[0] % max
}

const ABOUT = [
  'Password Generator creates cryptographically strong passwords using the browser\'s built-in crypto.getRandomValues() — the same entropy source used by password managers. Nothing is ever sent to a server.',
  'The random password mode guarantees that at least one character from each enabled character class is always included, then fills the remaining length randomly from the combined pool — preventing weak all-lowercase or all-numeric results.',
  'Passphrase mode generates memorable multi-word passwords (e.g. "river-maple-frost-beacon") that are both strong and easier to type. A 4-word passphrase from a 100-word list has over 26 bits of entropy per word.',
  'PIN mode generates a numeric-only code — useful for device PINs, lock combinations, or any service that only accepts digits. Even a 6-digit PIN has 1-million possibilities; 8 digits gives 100 million.',
]

export default function PasswordGenerator() {
  const [mode, setMode] = useState('password')
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: false })
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [wordCount, setWordCount] = useState(4)
  const [separator, setSeparator] = useState('-')
  const [pinLength, setPinLength] = useState(6)
  const [count, setCount] = useState(1)
  const [passwords, setPasswords] = useState([])
  const [copied, setCopied] = useState(null)

  const toggleOption = (key) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      if (!Object.values(next).some(Boolean)) return prev
      return next
    })
  }

  const generatePassword = useCallback(() => {
    const generated = []
    let pool = Object.entries(options).filter(([, v]) => v).map(([k]) => CHARS[k]).join('')
    if (excludeAmbiguous) pool = pool.replace(AMBIGUOUS, '')
    if (!pool) return []
    for (let p = 0; p < count; p++) {
      const required = Object.entries(options).filter(([, v]) => v).map(([k]) => {
        let ch = CHARS[k]
        if (excludeAmbiguous) ch = ch.replace(AMBIGUOUS, '')
        return ch[randInt(ch.length)]
      })
      const remaining = length - required.length
      const rest = Array.from({ length: remaining }, () => pool[randInt(pool.length)])
      const combined = [...required, ...rest]
      for (let i = combined.length - 1; i > 0; i--) {
        const j = randInt(i + 1);
        [combined[i], combined[j]] = [combined[j], combined[i]]
      }
      generated.push(combined.join(''))
    }
    return generated
  }, [length, options, excludeAmbiguous, count])

  const generatePassphrase = useCallback(() => {
    return Array.from({ length: count }, () =>
      Array.from({ length: wordCount }, () => WORDLIST[randInt(WORDLIST.length)]).join(separator)
    )
  }, [wordCount, separator, count])

  const generatePin = useCallback(() => {
    return Array.from({ length: count }, () =>
      Array.from({ length: pinLength }, () => String(randInt(10))).join('')
    )
  }, [pinLength, count])

  function generate() {
    let result = []
    if (mode === 'password') result = generatePassword()
    else if (mode === 'passphrase') result = generatePassphrase()
    else result = generatePin()
    setPasswords(result)
  }

  function copy(pw, idx) {
    navigator.clipboard.writeText(pw)
    setCopied(idx)
    setTimeout(() => setCopied(null), 1500)
  }

  const poolSize = Object.entries(options).filter(([, v]) => v).reduce((sum, [k]) => {
    let ch = CHARS[k]
    if (excludeAmbiguous) ch = ch.replace(AMBIGUOUS, '')
    return sum + ch.length
  }, 0)

  const entropy = mode === 'password'
    ? calcEntropy(length, poolSize || 1)
    : mode === 'passphrase'
    ? Math.floor(wordCount * Math.log2(WORDLIST.length))
    : Math.floor(pinLength * Math.log2(10))

  const strength = strengthLabel(entropy)

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate cryptographically strong passwords using crypto.getRandomValues(). Nothing is sent to any server."
      toolId="password-generator"
      about={ABOUT}
    >
      {/* Mode selector */}
      <div className="flex gap-1 mb-4 border border-zinc-700 rounded-lg overflow-hidden w-fit">
        {[
          { key: 'password', icon: <Shield size={13} />, label: 'Password' },
          { key: 'passphrase', icon: <AlignLeft size={13} />, label: 'Passphrase' },
          { key: 'pin', icon: <Hash size={13} />, label: 'PIN' },
        ].map(({ key, icon, label }) => (
          <button key={key} onClick={() => { setMode(key); setPasswords([]) }}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm transition-colors ${mode === key ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>
            {icon}{label}
          </button>
        ))}
      </div>

      <div className="card mb-4">
        {mode === 'password' && (
          <>
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-zinc-300">Length</span>
                <span className="text-lg font-bold text-indigo-400">{length}</span>
              </div>
              <input type="range" min={6} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-indigo-500" />
              <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>6</span><span>128</span></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { key: 'upper', label: 'Uppercase (A–Z)' },
                { key: 'lower', label: 'Lowercase (a–z)' },
                { key: 'numbers', label: 'Numbers (0–9)' },
                { key: 'symbols', label: 'Symbols (!@#...)' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={options[key]} onChange={() => toggleOption(key)} className="accent-indigo-500 w-4 h-4" />
                  <span className="text-sm text-zinc-300">{label}</span>
                </label>
              ))}
            </div>
            <label className="flex items-center gap-2 mb-5 cursor-pointer">
              <input type="checkbox" checked={excludeAmbiguous} onChange={() => setExcludeAmbiguous(!excludeAmbiguous)} className="accent-indigo-500 w-4 h-4" />
              <span className="text-sm text-zinc-300">Exclude ambiguous characters (0, O, l, 1)</span>
            </label>
          </>
        )}

        {mode === 'passphrase' && (
          <div className="mb-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-zinc-300">Word count</span>
                <span className="text-lg font-bold text-indigo-400">{wordCount}</span>
              </div>
              <input type="range" min={3} max={8} value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Word separator</label>
              <div className="flex gap-2">
                {['-', '_', '.', ' ', ''].map((s) => (
                  <button key={s} onClick={() => setSeparator(s)}
                    className={`px-3 py-1.5 text-sm font-mono rounded-lg border transition-colors ${separator === s ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                    {s === '' ? 'none' : s === ' ' ? '·space' : `"${s}"`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {mode === 'pin' && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-zinc-300">PIN length</span>
              <span className="text-lg font-bold text-indigo-400">{pinLength} digits</span>
            </div>
            <div className="flex gap-2">
              {[4, 6, 8, 10].map((n) => (
                <button key={n} onClick={() => setPinLength(n)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${pinLength === n ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm text-zinc-400 mb-2">Generate how many?</label>
          <div className="flex gap-2">
            {[1, 3, 5, 10].map((n) => (
              <button key={n} onClick={() => setCount(n)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${count === n ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-zinc-500">Strength</span>
            <span className={`text-xs font-semibold ${strength.color}`}>{strength.label} · {entropy} bits</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className={`h-full ${strength.bg} rounded-full transition-all`} style={{ width: strength.width }} />
          </div>
        </div>

        <button className="btn-primary" onClick={generate}>
          <RefreshCw size={15} /> Generate {count > 1 ? `${count} ` : ''}{mode === 'passphrase' ? 'Passphrase' : mode === 'pin' ? 'PIN' : 'Password'}{count > 1 ? 's' : ''}
        </button>
      </div>

      {passwords.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
            <Shield size={13} className="text-emerald-400" />
            Generated using crypto.getRandomValues() — never sent anywhere
          </div>
          <div className="space-y-2">
            {passwords.map((pw, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg">
                <code className="flex-1 text-sm font-mono text-zinc-100 break-all">{pw}</code>
                <button className="flex-shrink-0 text-zinc-500 hover:text-zinc-200" onClick={() => copy(pw, i)}>
                  {copied === i ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </div>
            ))}
          </div>
          {passwords.length > 1 && (
            <button className="btn-ghost text-xs mt-3" onClick={() => navigator.clipboard.writeText(passwords.join('\n'))}>
              Copy all
            </button>
          )}
        </div>
      )}
    </ToolLayout>
  )
}

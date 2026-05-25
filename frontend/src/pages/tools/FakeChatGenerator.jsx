import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Plus, Trash2, Download, MessageCircle, Check, CheckCheck } from 'lucide-react'

const ABOUT = [
  'Fake Chat Generator lets you create a WhatsApp-style conversation screenshot with custom messages from any two parties.',
  'Add messages, set the sender, write the text, and assign a time. The chat renders in a realistic messenger style and can be exported as a PNG image.',
  'Great for content creation, memes, presentations, storytelling, and social media posts.',
]

let nextId = 3
const INIT_MESSAGES = [
  { id: 1, sender: 'them', text: 'Hey! Are you coming tonight? 🎉', time: '6:30 PM', status: 'read' },
  { id: 2, sender: 'me', text: 'Yes! I\'ll be there around 8. Can\'t wait 😊', time: '6:32 PM', status: 'sent' },
]

export default function FakeChatGenerator() {
  const [contactName, setContactName] = useState('Sarah')
  const [messages, setMessages] = useState(INIT_MESSAGES)
  const [text, setText] = useState('')
  const [sender, setSender] = useState('them')
  const [time, setTime] = useState('6:33 PM')
  const [theme, setTheme] = useState('dark')
  const chatRef = useRef(null)

  function addMessage() {
    if (!text.trim()) return
    setMessages(prev => [...prev, { id: nextId++, sender, text: text.trim(), time }])
    setText('')
  }

  function removeMessage(id) {
    setMessages(prev => prev.filter(m => m.id !== id))
  }

  async function exportPng() {
    const node = chatRef.current
    if (!node) return

    const canvas = document.createElement('canvas')
    const scale = 2
    canvas.width = node.offsetWidth * scale
    canvas.height = node.offsetHeight * scale
    const ctx = canvas.getContext('2d')
    ctx.scale(scale, scale)

    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${node.offsetWidth}" height="${node.offsetHeight}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">${node.outerHTML}</div>
      </foreignObject>
    </svg>`

    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'chat-screenshot.png'
      a.click()
    }
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData)
  }

  const isDark = theme === 'dark'
  const bgColor = isDark ? '#0b141a' : '#efeae2'
  const headerBg = isDark ? '#202c33' : '#075e54'
  const meBubble = isDark ? '#005c4b' : '#dcf8c6'
  const themBubble = isDark ? '#202c33' : '#ffffff'
  const meText = isDark ? '#e9edef' : '#000'
  const themText = isDark ? '#e9edef' : '#000'
  const timeColor = isDark ? '#8696a0' : '#667781'

  return (
    <ToolLayout title="Fake Chat Generator" description="Create WhatsApp-style chat screenshots with custom messages. Export as PNG." toolId="fake-chat-generator" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Contact Name</label>
              <input value={contactName} onChange={e => setContactName(e.target.value)} className="input w-full" />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Theme</label>
              <div className="flex gap-2">
                {['dark', 'light'].map(t => (
                  <button key={t} onClick={() => setTheme(t)} className={`flex-1 px-3 py-2 text-sm rounded-lg border capitalize transition-colors ${theme === t ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{t}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="card space-y-3">
            <p className="text-xs text-zinc-500 font-medium">Add Message</p>
            <div className="flex gap-2">
              {['me', 'them'].map(s => (
                <button key={s} onClick={() => setSender(s)} className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${sender === s ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>
                  {s === 'me' ? 'Me' : contactName}
                </button>
              ))}
            </div>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Message text…" rows={3} className="textarea text-sm" onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), addMessage())} />
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-xs text-zinc-500 mb-1">Time</label>
                <input value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 6:33 PM" className="input w-full text-sm" />
              </div>
              <button className="btn-primary" onClick={addMessage} disabled={!text.trim()}>
                <Plus size={15} /> Add
              </button>
            </div>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={m.id} className="flex items-start gap-2 p-2 bg-zinc-800/60 border border-zinc-700 rounded-lg group">
                <span className={`text-xs shrink-0 mt-0.5 px-1.5 py-0.5 rounded font-medium ${m.sender === 'me' ? 'bg-green-900 text-green-300' : 'bg-zinc-700 text-zinc-300'}`}>{m.sender === 'me' ? 'Me' : contactName}</span>
                <span className="flex-1 text-sm text-zinc-300 text-wrap break-words min-w-0">{m.text}</span>
                <span className="text-xs text-zinc-600 shrink-0">{m.time}</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-red-400 shrink-0" onClick={() => removeMessage(m.id)}><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
          <button className="btn-primary w-full" onClick={exportPng}>
            <Download size={15} /> Export as PNG
          </button>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-2">Preview</label>
          <div
            ref={chatRef}
            style={{ background: bgColor, borderRadius: '12px', overflow: 'hidden', fontFamily: 'system-ui, sans-serif', maxWidth: '380px' }}
          >
            <div style={{ background: headerBg, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#54656f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700 }}>
                {contactName[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ color: '#e9edef', fontSize: 15, fontWeight: 500 }}>{contactName}</div>
                <div style={{ color: '#8696a0', fontSize: 12 }}>online</div>
              </div>
            </div>
            <div style={{ padding: '12px', minHeight: 200, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {messages.map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    background: m.sender === 'me' ? meBubble : themBubble,
                    color: m.sender === 'me' ? meText : themText,
                    borderRadius: m.sender === 'me' ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
                    padding: '6px 10px',
                    maxWidth: '75%',
                    fontSize: 14,
                    lineHeight: 1.4,
                  }}>
                    <span>{m.text}</span>
                    <span style={{ fontSize: 11, color: timeColor, marginLeft: 8, float: 'right', marginTop: 2 }}>{m.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

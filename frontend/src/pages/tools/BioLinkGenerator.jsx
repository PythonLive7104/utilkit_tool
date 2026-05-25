import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Plus, Trash2, Copy, Check, ExternalLink, Download } from 'lucide-react'

const ABOUT = [
  'Bio Link Generator creates a "link in bio" page with your name, photo, bio, and all your important links — like Linktree but free and without restrictions.',
  'Customise the page theme, add unlimited links, and preview it live. Download the HTML file and host it anywhere for free.',
  'Perfect for content creators, influencers, freelancers, and anyone who needs a single landing page for all their social links.',
]

const THEMES = [
  { id: 'dark', label: 'Dark', bg: '#0f172a', card: '#1e293b', text: '#f1f5f9', accent: '#6366f1', sub: '#94a3b8' },
  { id: 'light', label: 'Light', bg: '#f8fafc', card: '#ffffff', text: '#0f172a', accent: '#6366f1', sub: '#64748b' },
  { id: 'purple', label: 'Purple', bg: '#2d1b69', card: '#3d2b79', text: '#f5f3ff', accent: '#a78bfa', sub: '#c4b5fd' },
  { id: 'green', label: 'Green', bg: '#052e16', card: '#14532d', text: '#f0fdf4', accent: '#4ade80', sub: '#86efac' },
]

let nextId = 10
function uid() { return nextId++ }

export default function BioLinkGenerator() {
  const [name, setName] = useState('Alex Johnson')
  const [username, setUsername] = useState('@alexjohnson')
  const [bio, setBio] = useState('Creator · Developer · Coffee enthusiast ☕')
  const [avatar, setAvatar] = useState('')
  const [themeId, setThemeId] = useState('dark')
  const [links, setLinks] = useState([
    { id: uid(), label: 'My Website', url: 'https://example.com', emoji: '🌐' },
    { id: uid(), label: 'YouTube', url: 'https://youtube.com', emoji: '▶️' },
    { id: uid(), label: 'Twitter / X', url: 'https://twitter.com', emoji: '𝕏' },
    { id: uid(), label: 'Instagram', url: 'https://instagram.com', emoji: '📸' },
  ])
  const [copied, setCopied] = useState(false)

  const theme = THEMES.find(t => t.id === themeId) || THEMES[0]

  function addLink() { setLinks(prev => [...prev, { id: uid(), label: '', url: '', emoji: '🔗' }]) }
  function updLink(id, f, v) { setLinks(prev => prev.map(l => l.id === id ? { ...l, [f]: v } : l)) }
  function delLink(id) { setLinks(prev => prev.filter(l => l.id !== id)) }

  function generateHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Links</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { min-height:100vh; background:${theme.bg}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; display:flex; align-items:flex-start; justify-content:center; padding:48px 16px; }
  .container { width:100%; max-width:480px; }
  .profile { text-align:center; margin-bottom:28px; }
  .avatar { width:80px; height:80px; border-radius:50%; object-fit:cover; margin:0 auto 12px; background:${theme.card}; display:flex; align-items:center; justify-content:center; font-size:32px; border:2px solid ${theme.accent}30; }
  .name { color:${theme.text}; font-size:22px; font-weight:700; margin-bottom:4px; }
  .username { color:${theme.sub}; font-size:14px; margin-bottom:8px; }
  .bio { color:${theme.sub}; font-size:14px; line-height:1.6; max-width:360px; margin:0 auto; }
  .links { display:flex; flex-direction:column; gap:12px; }
  a.link-btn { display:flex; align-items:center; gap:12px; background:${theme.card}; color:${theme.text}; border:1px solid ${theme.accent}30; border-radius:12px; padding:14px 20px; text-decoration:none; font-size:15px; font-weight:500; transition:transform 0.15s,border-color 0.15s; }
  a.link-btn:hover { transform:translateY(-2px); border-color:${theme.accent}; }
  .emoji { font-size:20px; width:28px; text-align:center; }
  .footer { text-align:center; margin-top:32px; color:${theme.sub}; font-size:12px; }
</style>
</head>
<body>
<div class="container">
  <div class="profile">
    ${avatar ? `<img src="${avatar}" alt="${name}" class="avatar" />` : `<div class="avatar">👤</div>`}
    <div class="name">${name}</div>
    ${username ? `<div class="username">${username}</div>` : ''}
    ${bio ? `<p class="bio">${bio}</p>` : ''}
  </div>
  <div class="links">
    ${links.filter(l => l.label && l.url).map(l => `
    <a href="${l.url}" class="link-btn" target="_blank" rel="noopener">
      <span class="emoji">${l.emoji}</span>
      <span>${l.label}</span>
    </a>`).join('')}
  </div>
  <div class="footer">Made with UtilKit Bio Link Generator</div>
</div>
</body>
</html>`
  }

  function downloadHTML() {
    const blob = new Blob([generateHTML()], { type: 'text/html' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'bio-link.html'
    a.click()
  }

  function copyHTML() {
    navigator.clipboard.writeText(generateHTML())
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="Bio Link Generator" description="Create a free link-in-bio page with all your social links. Download the HTML and host anywhere." toolId="bio-link-generator" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card space-y-3">
            <p className="text-xs text-zinc-500 font-medium">Profile</p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="input w-full text-sm" />
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="@username (optional)" className="input w-full text-sm" />
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Short bio…" rows={2} className="textarea text-sm" />
            <input value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Avatar image URL (optional)" className="input w-full text-sm" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">Theme</p>
            <div className="flex gap-2 flex-wrap">
              {THEMES.map(t => (
                <button key={t.id} onClick={() => setThemeId(t.id)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${themeId === t.id ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}>{t.label}</button>
              ))}
            </div>
          </div>
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500 font-medium">Links</p>
              <button className="btn-ghost text-xs" onClick={addLink}><Plus size={12} /> Add Link</button>
            </div>
            {links.map(l => (
              <div key={l.id} className="flex gap-2 items-center">
                <input value={l.emoji} onChange={e => updLink(l.id, 'emoji', e.target.value)} className="input w-12 text-center text-sm" />
                <input value={l.label} onChange={e => updLink(l.id, 'label', e.target.value)} placeholder="Label" className="input flex-1 text-sm min-w-0" />
                <input value={l.url} onChange={e => updLink(l.id, 'url', e.target.value)} placeholder="URL" className="input flex-1 text-sm min-w-0" />
                {links.length > 1 && <button onClick={() => delLink(l.id)} className="text-zinc-600 hover:text-red-400 shrink-0"><Trash2 size={13} /></button>}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="btn-primary flex-1" onClick={downloadHTML}><Download size={14} /> Download HTML</button>
            <button className="btn-secondary flex-1" onClick={copyHTML}>
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy HTML'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-2">Live Preview</label>
          <div className="rounded-xl overflow-hidden border border-zinc-700" style={{ background: theme.bg, minHeight: 300, padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              {avatar
                ? <img src={avatar} alt={name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px', border: `2px solid ${theme.accent}` }} />
                : <div style={{ width: 64, height: 64, borderRadius: '50%', background: theme.card, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👤</div>
              }
              <div style={{ color: theme.text, fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{name}</div>
              {username && <div style={{ color: theme.sub, fontSize: 12, marginBottom: 4 }}>{username}</div>}
              {bio && <div style={{ color: theme.sub, fontSize: 12, maxWidth: 300, margin: '0 auto' }}>{bio}</div>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320, margin: '0 auto' }}>
              {links.filter(l => l.label).map(l => (
                <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: theme.card, color: theme.text, borderRadius: 10, padding: '11px 16px', fontSize: 14, fontWeight: 500, border: `1px solid ${theme.accent}25` }}>
                  <span style={{ fontSize: 18 }}>{l.emoji}</span>
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

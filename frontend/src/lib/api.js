// In dev, Vite proxies /api → localhost:8000 so BASE can be empty.
// In prod, VITE_API_URL is the backend origin (e.g. https://api.utilkit.io).
const BASE = import.meta.env.VITE_API_URL ?? ''

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options)
  if (res.status === 204) return null
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = text }
  if (!res.ok) {
    const msg = data?.detail || (typeof data === 'string' ? data : `HTTP ${res.status}`)
    throw new Error(msg)
  }
  return data
}

// ── URL Shortener ────────────────────────────────────────────
export const urlShortener = {
  shorten: (url, slug = '', expiresInDays = null) =>
    request('/api/urls/shorten/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        ...(slug ? { slug } : {}),
        ...(expiresInDays ? { expires_in_days: expiresInDays } : {}),
      }),
    }),

  get: (code) => request(`/api/urls/${code}/`),

  delete: (code) =>
    request(`/api/urls/${code}/`, { method: 'DELETE' }),
}

// ── Temp Email ───────────────────────────────────────────────
export const tempEmail = {
  domains: () => request('/api/email/domains/'),

  create: (domain = '', username = '') =>
    request('/api/email/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, username }),
    }),

  info: (address) => request(`/api/email/${encodeURIComponent(address)}/`),

  extend: (address, minutes = 15) =>
    request(`/api/email/${encodeURIComponent(address)}/extend/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ minutes }),
    }),

  messages: (address) =>
    request(`/api/email/${encodeURIComponent(address)}/messages/`),

  getMessage: (address, id) =>
    request(`/api/email/${encodeURIComponent(address)}/messages/${id}/`),

  delete: (address) =>
    request(`/api/email/${encodeURIComponent(address)}/`, { method: 'DELETE' }),
}

// ── AI Tools ─────────────────────────────────────────────────
export const aiTool = (action, text) =>
  request('/api/ai/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, text }),
  })

// ── Background Remover ───────────────────────────────────────
export async function removeBackground(file, size = 'auto') {
  const form = new FormData()
  form.append('image', file)
  form.append('size', size)

  const res = await fetch(`${BASE}/api/bg/remove/`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try { const d = await res.json(); msg = d.detail || msg } catch {}
    throw new Error(msg)
  }

  return res.blob()
}

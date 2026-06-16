// In dev, Vite proxies /api → localhost:8000 so BASE can be empty.
// In prod, VITE_API_URL is the backend origin (e.g. https://api.utilkit.io).
const BASE = import.meta.env.VITE_API_URL ?? ''

// ── Auth token storage ───────────────────────────────────────
// The DRF auth token is kept in localStorage and attached to every request.
const TOKEN_KEY = 'utilkit_token'
export const tokenStore = {
  get: () => { try { return localStorage.getItem(TOKEN_KEY) } catch { return null } },
  set: (t) => { try { localStorage.setItem(TOKEN_KEY, t) } catch {} },
  clear: () => { try { localStorage.removeItem(TOKEN_KEY) } catch {} },
}

function authHeaders(extra = {}) {
  const token = tokenStore.get()
  return token ? { ...extra, Authorization: `Token ${token}` } : extra
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: authHeaders(options.headers || {}),
  })
  if (res.status === 204) return null
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = text }
  if (!res.ok) {
    const isHtml = typeof data === 'string' && data.trimStart().startsWith('<')
    const msg = data?.detail || (isHtml ? `Server error (${res.status})` : (typeof data === 'string' ? data : `HTTP ${res.status}`))
    const err = new Error(msg)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

// ── Auth ─────────────────────────────────────────────────────
export const auth = {
  register: (email, password) =>
    request('/api/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  verifyEmail: (token) =>
    request('/api/auth/verify-email/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    }),

  resendVerification: (email) =>
    request('/api/auth/resend-verification/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }),

  login: (email, password) =>
    request('/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }),

  logout: () => request('/api/auth/logout/', { method: 'POST' }),

  me: () => request('/api/auth/me/'),
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

// ── Contact ──────────────────────────────────────────────────
export const contact = ({ name, email, subject, message }) =>
  request('/api/contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  })

// ── Advertising ──────────────────────────────────────────────
export const ads = {
  // List bookable category slots with weekly price + availability.
  slots: () => request('/api/ads/slots/'),

  // Currently-live ad for a tool category (or null).
  active: (category) => request(`/api/ads/active/?slot=${encodeURIComponent(category)}`),

  // The logged-in advertiser's own adverts (requires auth).
  mine: () => request('/api/ads/mine/'),

  // Submit a new advert (multipart: slot, billing_period, advertiser_name,
  // company, image, target_url, alt_text). Requires auth. Returns { reference,
  // checkout_url } for the Dodo Payments overlay checkout.
  submit: async (formData) => {
    const res = await fetch(`${BASE}/api/ads/submit/`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    })
    const text = await res.text()
    let data
    try { data = JSON.parse(text) } catch { data = text }
    if (!res.ok) {
      const err = new Error(data?.detail || `HTTP ${res.status}`)
      err.status = res.status
      err.data = data
      throw err
    }
    return data
  },

  // Confirm a Dodo payment and place the advert live.
  verify: (reference) =>
    request('/api/ads/verify/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference }),
    }),
}

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

import { createContext, useContext, useEffect, useState } from 'react'
import { auth as authApi, tokenStore } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // user is { email } when logged in, null when logged out.
  const [user, setUser] = useState(null)
  // While we validate an existing token on first load, gate auth-only UI.
  const [loading, setLoading] = useState(Boolean(tokenStore.get()))

  // On first mount, if we have a stored token, confirm it's still valid.
  useEffect(() => {
    if (!tokenStore.get()) return
    authApi.me()
      .then((u) => setUser(u))
      .catch(() => { tokenStore.clear() })
      .finally(() => setLoading(false))
  }, [])

  function applyToken(data) {
    // data = { token, email } from login / verify-email
    tokenStore.set(data.token)
    setUser({ email: data.email })
    return data
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register: (email, password) => authApi.register(email, password),
    resendVerification: (email) => authApi.resendVerification(email),
    login: (email, password) => authApi.login(email, password).then(applyToken),
    verifyEmail: (token) => authApi.verifyEmail(token).then(applyToken),
    logout: async () => {
      try { await authApi.logout() } catch {}
      tokenStore.clear()
      setUser(null)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

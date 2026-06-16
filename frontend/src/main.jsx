import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './lib/auth'

// Remove the pre-React splash (see index.html) once the app has mounted, so the
// real UI is revealed cleanly instead of flashing the static prerendered HTML.
function Root() {
  useEffect(() => {
    document.getElementById('app-splash')?.remove()
  }, [])
  return (
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

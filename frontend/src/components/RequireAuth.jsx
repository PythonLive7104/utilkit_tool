import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'

// Gates a route behind login. While we're still validating a stored token we
// render nothing (avoids a flash of the login page for already-logged-in users);
// once resolved, unauthenticated visitors are sent to /login with a ?next back.
export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return null
  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }
  return children
}

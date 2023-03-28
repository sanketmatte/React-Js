import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'

export const RequireAuth = ({ children }) => {
  // const location = useLocation()
  const auth = useAuth()
  console.log('authentication required and auth state is')
  console.log(auth.isAuthenticated)
  if (!auth.isAuthenticated) {
    return <Navigate to='/' />
  }
  return children
}

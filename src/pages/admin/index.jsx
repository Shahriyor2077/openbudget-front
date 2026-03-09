import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('admin_token'))

  function handleLogin(t) { setToken(t) }
  function handleLogout() { localStorage.removeItem('admin_token'); setToken(null) }

  if (!token) return <AdminLogin onLogin={handleLogin} />
  return <AdminPanel token={token} onLogout={handleLogout} />
}

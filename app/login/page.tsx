'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#f5f0e8', borderRadius: '8px', padding: '48px', width: '100%', maxWidth: '400px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>Member Access</p>
        <h1 style={{ fontSize: '28px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px', textAlign: 'center' }}>Coalition Dashboard</h1>
        <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif', textAlign: 'center', marginBottom: '32px' }}>Coalition to Protect Frederick County</p>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#fff', boxSizing: 'border-box' }} />
          </div>
          {error && <p style={{ color: '#7a2a2a', fontSize: '13px', fontFamily: 'sans-serif', marginBottom: '16px', background: '#f0e4e4', padding: '10px 12px', borderRadius: '4px' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '12px', borderRadius: '4px', fontSize: '15px', fontFamily: 'Georgia, serif', cursor: 'pointer' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', textAlign: 'center', marginTop: '24px' }}>
          <a href="/" style={{ color: '#4a7c3f', textDecoration: 'none' }}>Back to Public Site</a>
        </p>
      </div>
    </div>
  )
}

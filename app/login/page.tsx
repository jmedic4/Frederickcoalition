'use client'
import { supabase } from '../../lib/supabase'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#1a2e1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '48px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Members Only</p>
          <h1 style={{ fontSize: '28px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Coalition Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Sign in to access the member portal</p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ width: '100%', padding: '12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}
            />
          </div>
          {error && (
            <div style={{ background: '#f0e4e4', border: '1px solid #d4a0a0', borderRadius: '6px', padding: '12px', marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: '#7a2a2a', fontFamily: 'sans-serif', margin: 0 }}>{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '14px', borderRadius: '6px', fontSize: '15px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>
          <a href="/" style={{ color: '#4a7c3f', textDecoration: 'none' }}>← Back to public site</a>
        </p>
      </div>
    </main>
  )
}

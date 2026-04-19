'use client'
import { supabase } from '../../lib/supabase'
import { useState } from 'react'

export default function MailingListSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.from('mailing_list').insert([{ email, name }])
    if (error) {
      if (error.code === '23505') {
        setError('That email is already on our list!')
      } else {
        setError('Something went wrong. Please try again.')
      }
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p style={{ fontSize: '24px', marginBottom: '8px' }}>✓</p>
      <p style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif', fontSize: '18px' }}>You are on the list!</p>
      <p style={{ color: '#b8b09a', fontFamily: 'sans-serif', fontSize: '14px', marginTop: '8px' }}>We will notify you when votes are scheduled and action is needed.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ padding: '12px 16px', borderRadius: '4px', border: '1px solid #3d5a3d', background: '#2d4a2d', color: '#f5f0e8', fontSize: '14px', fontFamily: 'sans-serif', width: '200px' }} />
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ padding: '12px 16px', borderRadius: '4px', border: '1px solid #3d5a3d', background: '#2d4a2d', color: '#f5f0e8', fontSize: '14px', fontFamily: 'sans-serif', width: '240px' }} />
        <button type="submit" disabled={loading} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>
          {loading ? 'Joining...' : 'Notify Me →'}
        </button>
      </div>
      {error && <p style={{ color: '#f0a0a0', fontFamily: 'sans-serif', fontSize: '13px', textAlign: 'center' }}>{error}</p>}
    </form>
  )
}

'use client'
import { supabase } from '../../lib/supabase'
import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '', type: 'general' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.from('contact_messages').insert([form])
    if (error) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <main>
      <Nav />
      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Get in Touch</p>
        <h1 style={{ fontSize: '52px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Contact the Coalition</h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto' }}>
          Media inquiries, partnership requests, or general questions — we want to hear from you.
        </p>
      </section>
      <section style={{ padding: '80px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {success ? (
            <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>✓</p>
              <h2 style={{ fontSize: '28px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>Message Received!</h2>
              <p style={{ fontSize: '16px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '24px' }}>Thank you for reaching out. We will be in touch shortly.</p>
              <a href="/" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '14px' }}>Back to Home</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Name *</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Organization</label>
                  <input value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} placeholder="Optional" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif' }}>
                    <option value="general">General</option>
                    <option value="press">Press / Media</option>
                    <option value="partner">Partnership</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Message *</label>
                <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="How can we help?" rows={6} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              {error && <p style={{ fontSize: '13px', color: '#7a2a2a', fontFamily: 'sans-serif', marginBottom: '16px', background: '#f0e4e4', padding: '10px 12px', borderRadius: '4px' }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ width: '100%', background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '14px', borderRadius: '6px', fontSize: '15px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}

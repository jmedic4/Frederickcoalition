'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RequestSign() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', district: '', street_address: '', city: '', zip: '', quantity: 1, sponsor_quantity: 0, notes: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.from('sign_requests').insert([form])
    if (error) { setError('Something went wrong. Please try again.'); setLoading(false) }
    else { setSuccess(true); setLoading(false) }
  }

  return (
    <main>
      <Nav />
      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Take Action</p>
        <h1 style={{ fontSize: '52px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Request a Yard Sign</h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto' }}>Make your position visible. When neighbors see signs, they know they are not alone.</p>
      </section>
      <section style={{ padding: '80px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {success ? (
            <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>✓</p>
              <h2 style={{ fontSize: '28px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>Request Received!</h2>
              <p style={{ fontSize: '16px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '400px', margin: '0 auto 24px' }}>Thank you! Our signs coordinator will contact you within 48 hours to confirm delivery details.</p>
              <a href="/" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '14px' }}>Back to Home</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '32px', marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>Your Information</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Full Name *</label>
                    <input name="full_name" type="text" required placeholder="Jane Smith" onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Email Address *</label>
                    <input name="email" type="email" required placeholder="jane@example.com" onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Phone Number *</label>
                    <input name="phone" type="tel" required placeholder="(540) 555-0100" onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>District *</label>
                    <select name="district" required onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }}>
                      <option value="">Select your district...</option>
                      <option>Shawnee District</option>
                      <option>Gainesboro District</option>
                      <option>Back Creek District</option>
                      <option>Opequon District</option>
                      <option>Red Bud District</option>
                      <option>Stonewall District</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '32px', marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>Delivery Address</p>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Street Address *</label>
                  <input name="street_address" type="text" required placeholder="123 Apple Blossom Ln" onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>City / Town *</label>
                    <input name="city" type="text" required placeholder="Stephens City" onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>ZIP *</label>
                    <input name="zip" type="text" required placeholder="22655" onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '32px', marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>Order Details</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>How Many Signs? *</label>
                    <select name="quantity" onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Sponsor Signs for Neighbors</label>
                    <select name="sponsor_quantity" onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }}>
                      <option value="0">None</option>
                      <option value="1">1 extra</option>
                      <option value="2">2 extra</option>
                      <option value="5">5 extra</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Notes (optional)</label>
                  <textarea name="notes" placeholder="Gate code, best time to deliver..." rows={3} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>
              </div>
              {error && <p style={{ color: '#7a2a2a', fontSize: '13px', fontFamily: 'sans-serif', marginBottom: '16px', background: '#f0e4e4', padding: '10px 12px', borderRadius: '4px' }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ width: '100%', background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '16px', borderRadius: '4px', fontSize: '16px', fontFamily: 'Georgia, serif', cursor: 'pointer' }}>
                {loading ? 'Submitting...' : 'Submit Sign Request →'}
              </button>
              <p style={{ fontSize: '13px', color: '#8a7a6a', fontFamily: 'sans-serif', textAlign: 'center', marginTop: '12px' }}>Our signs coordinator will contact you within 48 hours.</p>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}

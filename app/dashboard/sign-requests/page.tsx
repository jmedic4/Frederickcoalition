'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type SignRequest = {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string
  district: string
  street_address: string
  city: string
  zip: string
  quantity: number
  notes: string
  status: string
}

export default function SignRequests() {
  const [requests, setRequests] = useState<SignRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  async function fetchRequests() {
    const { data } = await supabase
      .from('sign_requests')
      .select('*')
      .order('created_at', { ascending: false })
    setRequests(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('sign_requests').update({ status }).eq('id', id)
    fetchRequests()
  }

  const statusColor: Record<string, { bg: string, color: string }> = {
    pending: { bg: '#f0e8d4', color: '#7a5a1a' },
    fulfilled: { bg: '#e8f0d4', color: '#2a5a1a' },
    cancelled: { bg: '#f0e4e4', color: '#7a2a2a' },
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Sign Requests</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{requests.length} total requests</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['all', 'pending', 'fulfilled'].map(f => (
            <button key={f} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd8cc', background: '#fff', fontSize: '13px', fontFamily: 'sans-serif', cursor: 'pointer', textTransform: 'capitalize' }}>{f}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p>
      ) : requests.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>No sign requests yet</p>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Requests will appear here when residents submit the form.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {requests.map(req => (
            <div key={req.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', margin: 0 }}>{req.full_name}</h3>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'sans-serif', padding: '3px 8px', borderRadius: '3px', background: statusColor[req.status]?.bg || '#f5f0e8', color: statusColor[req.status]?.color || '#5a5040' }}>{req.status}</span>
                  <span style={{ fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif', background: '#e8f0d4', padding: '3px 8px', borderRadius: '3px' }}>{req.quantity} sign{req.quantity > 1 ? 's' : ''}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '4px' }}>{req.email} · {req.phone}</p>
                <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '4px' }}>{req.street_address}, {req.city}, VA {req.zip}</p>
                <p style={{ fontSize: '13px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{req.district} · Submitted {new Date(req.created_at).toLocaleDateString()}</p>
                {req.notes && <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif', marginTop: '8px', fontStyle: 'italic' }}>Note: {req.notes}</p>}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginLeft: '24px', flexShrink: 0 }}>
                <button onClick={() => updateStatus(req.id, 'fulfilled')} style={{ padding: '8px 14px', background: '#e8f0d4', color: '#2a5a1a', border: 'none', borderRadius: '4px', fontSize: '12px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Mark Fulfilled</button>
                <button onClick={() => updateStatus(req.id, 'pending')} style={{ padding: '8px 14px', background: '#f5f0e8', color: '#5a5040', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '12px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Mark Pending</button>
                <a href={`mailto:${req.email}`} style={{ padding: '8px 14px', background: '#1a2e1a', color: '#f5f0e8', border: 'none', borderRadius: '4px', fontSize: '12px', fontFamily: 'sans-serif', textDecoration: 'none', display: 'inline-block' }}>Email →</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

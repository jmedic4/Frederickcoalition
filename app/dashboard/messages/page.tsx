'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

type Message = {
  id: string
  created_at: string
  name: string
  email: string
  organization: string
  message: string
  type: string
}

type MailingEntry = {
  id: string
  created_at: string
  email: string
  name: string
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [mailingList, setMailingList] = useState<MailingEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'messages' | 'mailing'>('messages')

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    const [{ data: msgs }, { data: mail }] = await Promise.all([
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      supabase.from('mailing_list').select('*').order('created_at', { ascending: false })
    ])
    setMessages(msgs || [])
    setMailingList(mail || [])
    setLoading(false)
  }

  const typeColors: Record<string, { bg: string, color: string }> = {
    press: { bg: '#d4e8f0', color: '#1a5a7a' },
    partner: { bg: '#e8e4f0', color: '#4a3a7a' },
    volunteer: { bg: '#e8f0d4', color: '#2a5a1a' },
    legal: { bg: '#f0e4e4', color: '#7a2a2a' },
    general: { bg: '#f0e8d4', color: '#7a5a1a' },
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
        <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Messages & Mailing List</h1>
        <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{messages.length} messages · {mailingList.length} subscribers</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setTab('messages')} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: tab === 'messages' ? '#4a7c3f' : '#f5f0e8', color: tab === 'messages' ? '#f5f0e8' : '#5a5040', fontFamily: 'sans-serif', fontSize: '14px' }}>
          Messages ({messages.length})
        </button>
        <button onClick={() => setTab('mailing')} style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: tab === 'mailing' ? '#4a7c3f' : '#f5f0e8', color: tab === 'mailing' ? '#f5f0e8' : '#5a5040', fontFamily: 'sans-serif', fontSize: '14px' }}>
          Mailing List ({mailingList.length})
        </button>
      </div>

      {loading ? <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p> : (
        <>
          {tab === 'messages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.length === 0 ? (
                <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
                  <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif' }}>No messages yet</p>
                </div>
              ) : messages.map(msg => (
                <div key={msg.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <p style={{ fontSize: '16px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '2px' }}>{msg.name}</p>
                      <p style={{ fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif' }}>{msg.email}{msg.organization ? ` · ${msg.organization}` : ''}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontFamily: 'sans-serif', background: typeColors[msg.type]?.bg || '#f5f0e8', color: typeColors[msg.type]?.color || '#5a5040' }}>{msg.type}</span>
                      <span style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#2a2a2a', fontFamily: 'sans-serif', lineHeight: '1.6', background: '#faf8f2', padding: '12px', borderRadius: '6px' }}>{msg.message}</p>
                  <a href={`mailto:${msg.email}`} style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif', textDecoration: 'none' }}>Reply →</a>
                </div>
              ))}
            </div>
          )}

          {tab === 'mailing' && (
            <div>
              <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #ddd8cc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#1a2e1a', fontFamily: 'sans-serif', fontWeight: 500, margin: 0 }}>{mailingList.length} subscribers</p>
                  <button onClick={() => {
                    const csv = 'Name,Email,Date\n' + mailingList.map(m => `${m.name || ''},${m.email},${new Date(m.created_at).toLocaleDateString()}`).join('\n')
                    const blob = new Blob([csv], { type: 'text/csv' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'mailing-list.csv'
                    a.click()
                  }} style={{ background: '#f5f0e8', color: '#5a5040', border: '1px solid #ddd8cc', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontFamily: 'sans-serif', cursor: 'pointer' }}>
                    Export CSV
                  </button>
                </div>
                {mailingList.length === 0 ? (
                  <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif' }}>No subscribers yet</p>
                  </div>
                ) : mailingList.map((entry, i) => (
                  <div key={entry.id} style={{ padding: '14px 20px', borderBottom: i < mailingList.length - 1 ? '1px solid #ede8df' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      {entry.name && <p style={{ fontSize: '14px', color: '#1a2e1a', fontFamily: 'sans-serif', margin: '0 0 2px' }}>{entry.name}</p>}
                      <p style={{ fontSize: '14px', color: '#4a7c3f', fontFamily: 'sans-serif', margin: 0 }}>{entry.email}</p>
                    </div>
                    <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', margin: 0 }}>{new Date(entry.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

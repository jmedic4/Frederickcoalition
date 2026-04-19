'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../../lib/supabase'



type Message = {
  id: string
  created_at: string
  display_name: string
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [nameSet, setNameSet] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('coalition_display_name')
    if (saved) { setDisplayName(saved); setNameSet(true) }
    fetchMessages()
    const channel = supabase.channel('messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
      setMessages(prev => [...prev, payload.new as Message])
    }).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function fetchMessages() {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true }).limit(100)
    setMessages(data || [])
  }

  async function sendMessage(e: React.FormEvent) {
  e.preventDefault()
  if (!newMessage.trim()) return
  const { error } = await supabase.from('messages').insert([{ display_name: displayName, content: newMessage.trim() }])
  if (error) {
    alert(error.message)
  } else {
    setNewMessage('')
    fetchMessages()
  }
}

  function saveName(e: React.FormEvent) {
    e.preventDefault()
    if (!displayName.trim()) return
    localStorage.setItem('coalition_display_name', displayName)
    setNameSet(true)
  }

  if (!nameSet) {
    return (
      <div style={{ padding: '40px', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Coalition Chat</h1>
        <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif', marginBottom: '24px' }}>Enter your name to start chatting.</p>
        <form onSubmit={saveName}>
          <input required value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', marginBottom: '12px', boxSizing: 'border-box' }} />
          <button type="submit" style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Enter Chat</button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
        <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Coalition Chat</h1>
        <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Chatting as <strong>{displayName}</strong> · <button onClick={() => { localStorage.removeItem('coalition_display_name'); setNameSet(false) }} style={{ background: 'none', border: 'none', color: '#4a7c3f', cursor: 'pointer', fontSize: '14px', fontFamily: 'sans-serif', padding: 0 }}>Change name</button></p>
      </div>

      <div style={{ flex: 1, background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', overflowY: 'auto', marginBottom: '16px' }}>
        {messages.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif', textAlign: 'center', marginTop: '40px' }}>No messages yet. Start the conversation!</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <p style={{ fontSize: '14px', color: '#1a2e1a', fontFamily: 'Georgia, serif', fontWeight: 'bold', margin: 0 }}>{msg.display_name}</p>
                <p style={{ fontSize: '11px', color: '#8a7a6a', fontFamily: 'sans-serif', margin: 0 }}>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', margin: 0, lineHeight: '1.5' }}>{msg.content}</p>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '12px' }}>
        <input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '12px 16px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif' }} />
        <button type="submit" style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  )
}

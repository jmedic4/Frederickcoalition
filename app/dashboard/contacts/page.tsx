'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Contact = {
  id: string
  name: string
  role: string
  organization: string
  email: string
  phone: string
  category: string
  notes: string
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', organization: '', email: '', phone: '', category: 'supervisor', notes: '' })

  useEffect(() => { fetchContacts() }, [])

  async function fetchContacts() {
    const { data } = await supabase.from('contacts').select('*').order('category')
    setContacts(data || [])
    setLoading(false)
  }

  async function addContact(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from('contacts').insert([form])
    if (error) { alert(error.message) } else {
      setForm({ name: '', role: '', organization: '', email: '', phone: '', category: 'supervisor', notes: '' })
      setShowForm(false)
      fetchContacts()
    }
  }

  async function deleteContact(id: string) {
    await supabase.from('contacts').delete().eq('id', id)
    fetchContacts()
  }

  const categories = [...new Set(contacts.map(c => c.category))]

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Contacts</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{contacts.length} saved</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>+ Add Contact</button>
      </div>

      {showForm && (
        <form onSubmit={addContact} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '16px', fontWeight: 'bold' }}>New Contact</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Name *</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Role</label>
              <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="e.g. Board Supervisor" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Phone</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(540) 555-0100" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Organization</label>
              <input value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} placeholder="e.g. Frederick County BOS" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif' }}>
                <option value="supervisor">Board Supervisor</option>
                <option value="planning">Planning Commission</option>
                <option value="press">Press</option>
                <option value="legal">Legal</option>
                <option value="ally">Community Ally</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Notes</label>
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Any additional notes..." rows={2} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Save Contact</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: '#fff', color: '#5a5040', border: '1px solid #ddd8cc', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p> : contacts.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>No contacts yet</p>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Add supervisors, press contacts, and community allies.</p>
        </div>
      ) : (
        <div>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{cat}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
                {contacts.filter(c => c.category === cat).map(contact => (
                  <div key={contact.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: '16px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '2px' }}>{contact.name}</p>
                        {contact.role && <p style={{ fontSize: '12px', color: '#4a7c3f', fontFamily: 'sans-serif', marginBottom: '8px' }}>{contact.role}{contact.organization ? ` · ${contact.organization}` : ''}</p>}
                        {contact.email && <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '2px' }}><a href={`mailto:${contact.email}`} style={{ color: '#4a7c3f', textDecoration: 'none' }}>{contact.email}</a></p>}
                        {contact.phone && <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif' }}>{contact.phone}</p>}
                        {contact.notes && <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', marginTop: '8px', fontStyle: 'italic' }}>{contact.notes}</p>}
                      </div>
                      <button onClick={() => deleteContact(contact.id)} style={{ background: 'none', border: 'none', color: '#8a7a6a', cursor: 'pointer', fontSize: '18px' }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

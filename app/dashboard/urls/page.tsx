'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type SavedUrl = {
  id: string
  title: string
  url: string
  description: string
  category: string
  created_at: string
}

export default function SavedUrls() {
  const [urls, setUrls] = useState<SavedUrl[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', url: '', description: '', category: 'research' })

  useEffect(() => { fetchUrls() }, [])

  async function fetchUrls() {
    const { data } = await supabase.from('saved_urls').select('*').order('created_at', { ascending: false })
    setUrls(data || [])
    setLoading(false)
  }

  async function addUrl(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from('saved_urls').insert([form])
    if (error) { alert(error.message) } else {
      setForm({ title: '', url: '', description: '', category: 'research' })
      setShowForm(false)
      fetchUrls()
    }
  }

  async function deleteUrl(id: string) {
    await supabase.from('saved_urls').delete().eq('id', id)
    fetchUrls()
  }

  const categories = [...new Set(urls.map(u => u.category))]

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Saved URLs</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{urls.length} bookmarked</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>+ Add URL</button>
      </div>

      {showForm && (
        <form onSubmit={addUrl} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '16px', fontWeight: 'bold' }}>New Bookmark</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Article or page title" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif' }}>
                <option value="research">Research</option>
                <option value="news">News</option>
                <option value="legal">Legal</option>
                <option value="government">Government</option>
                <option value="tools">Tools</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>URL *</label>
            <input required type="url" value={form.url} onChange={e => setForm({...form, url: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Why is this link useful?" rows={2} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Save URL</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: '#fff', color: '#5a5040', border: '1px solid #ddd8cc', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p> : urls.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>No saved URLs yet</p>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Save important articles, government pages, and research links here.</p>
        </div>
      ) : (
        <div>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{cat}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {urls.filter(u => u.category === cat).map(url => (
                  <div key={url.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <a href={url.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#1a2e1a', fontFamily: 'Georgia, serif', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>{url.title} →</a>
                      {url.description && <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '4px' }}>{url.description}</p>}
                      <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{url.url.length > 60 ? url.url.substring(0, 60) + '...' : url.url}</p>
                    </div>
                    <button onClick={() => deleteUrl(url.id)} style={{ background: 'none', border: 'none', color: '#8a7a6a', cursor: 'pointer', fontSize: '18px', marginLeft: '16px' }}>×</button>
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

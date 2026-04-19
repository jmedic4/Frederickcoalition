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

const emptyForm = { title: '', url: '', description: '', category: 'research' }

function UrlModal({ url, onSave, onClose, onDelete, isEdit }: {
  url: Partial<SavedUrl>
  onSave: (u: Partial<SavedUrl>) => void
  onClose: () => void
  onDelete?: () => void
  isEdit: boolean
}) {
  const [form, setForm] = useState(url)

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '10px', padding: '32px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h2 style={{ fontSize: '20px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>{isEdit ? 'Edit Bookmark' : 'New Bookmark'}</h2>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Title *</label>
          <input required value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} placeholder="Article or page title" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>URL *</label>
          <input required type="url" value={form.url || ''} onChange={e => setForm({...form, url: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Category</label>
          <select value={form.category || 'research'} onChange={e => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif' }}>
            <option value="research">Research</option>
            <option value="news">News</option>
            <option value="legal">Legal</option>
            <option value="government">Government</option>
            <option value="tools">Tools</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Description</label>
          <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} placeholder="Why is this link useful?" rows={3} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => onSave(form)} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 24px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}>
            {isEdit ? 'Save Changes' : 'Save URL'}
          </button>
          <button onClick={onClose} style={{ background: '#f5f0e8', color: '#5a5040', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
          {isEdit && onDelete && (
            <button onClick={onDelete} style={{ background: '#f0e4e4', color: '#7a2a2a', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', marginLeft: 'auto' }}>Delete</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SavedUrls() {
  const [urls, setUrls] = useState<SavedUrl[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editUrl, setEditUrl] = useState<Partial<SavedUrl> | null>(null)

  useEffect(() => { fetchUrls() }, [])

  async function fetchUrls() {
    const { data } = await supabase.from('saved_urls').select('*').order('created_at', { ascending: false })
    setUrls(data || [])
    setLoading(false)
  }

  async function saveUrl(form: Partial<SavedUrl>) {
    if (!form.title || !form.url) return
    if (editUrl?.id) {
      const { error } = await supabase.from('saved_urls').update(form).eq('id', editUrl.id)
      if (error) { alert(error.message); return }
    } else {
      const { error } = await supabase.from('saved_urls').insert([form])
      if (error) { alert(error.message); return }
    }
    setShowModal(false)
    setEditUrl(null)
    fetchUrls()
  }

  async function deleteUrl(id: string) {
    if (!confirm('Delete this bookmark?')) return
    await supabase.from('saved_urls').delete().eq('id', id)
    setShowModal(false)
    setEditUrl(null)
    fetchUrls()
  }

  function openNew() {
    setEditUrl(emptyForm)
    setShowModal(true)
  }

  function openEdit(url: SavedUrl) {
    setEditUrl(url)
    setShowModal(true)
  }

  const categories = [...new Set(urls.map(u => u.category))]

  const categoryColors: Record<string, string> = {
    research: '#3f6e7a',
    news: '#7a3f6e',
    legal: '#7a3f3f',
    government: '#4a7c3f',
    tools: '#7a5a3f',
    other: '#5a5a7a',
  }

  return (
    <div style={{ padding: '40px' }}>
      {showModal && editUrl && (
        <UrlModal
          url={editUrl}
          onSave={saveUrl}
          onClose={() => { setShowModal(false); setEditUrl(null) }}
          onDelete={editUrl.id ? () => deleteUrl(editUrl.id!) : undefined}
          isEdit={!!editUrl.id}
        />
      )}

      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Saved URLs</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{urls.length} bookmarked</p>
        </div>
        <button onClick={openNew} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}>+ Add URL</button>
      </div>

      {loading ? <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p> : urls.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>No saved URLs yet</p>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Save important articles, government pages, and research links here.</p>
        </div>
      ) : (
        <div>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: categoryColors[cat] || '#8a7a6a' }} />
                <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>{cat}</p>
                <span style={{ fontSize: '11px', color: '#aaa', fontFamily: 'sans-serif' }}>{urls.filter(u => u.category === cat).length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {urls.filter(u => u.category === cat).map(url => (
                  <div key={url.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#4a7c3f')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#ddd8cc')}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '15px', color: '#1a2e1a', fontFamily: 'sans-serif', fontWeight: 500, margin: '0 0 4px' }}>{url.title}</p>
                      {url.description && <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif', margin: '0 0 6px' }}>{url.description}</p>}
                      <p style={{ fontSize: '12px', color: '#aaa', fontFamily: 'sans-serif', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url.url}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginLeft: '16px', flexShrink: 0 }}>
                      <a href={url.url} target="_blank" rel="noopener noreferrer" style={{ background: '#f5f0e8', color: '#4a7c3f', padding: '7px 14px', borderRadius: '6px', fontSize: '13px', fontFamily: 'sans-serif', textDecoration: 'none', fontWeight: 500 }}>Open →</a>
                      <button onClick={() => openEdit(url)} style={{ background: '#f5f0e8', color: '#5a5040', border: 'none', padding: '7px 14px', borderRadius: '6px', fontSize: '13px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Edit</button>
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

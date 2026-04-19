'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Document = {
  id: string
  created_at: string
  title: string
  description: string
  file_url: string
  file_type: string
  category: string
}

function PreviewModal({ doc, onClose, onDelete }: { doc: Document, onClose: () => void, onDelete: () => void }) {
  const isImage = doc.file_type?.includes('image')
  const isPdf = doc.file_type?.includes('pdf')
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '10px', width: '100%', maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #ede8df', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', margin: 0 }}>{doc.title}</h2>
            {doc.description && <p style={{ fontSize: '13px', color: '#8a7a6a', fontFamily: 'sans-serif', margin: '4px 0 0' }}>{doc.description}</p>}
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a href={doc.file_url} target="_blank" rel="noopener noreferrer" download style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontFamily: 'sans-serif', textDecoration: 'none' }}>Download</a>
            <a href={doc.file_url} target="_blank" rel="noopener noreferrer" style={{ background: '#f5f0e8', color: '#5a5040', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontFamily: 'sans-serif', textDecoration: 'none' }}>Open in New Tab</a>
            <button onClick={onDelete} style={{ background: '#f0e4e4', color: '#7a2a2a', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Delete</button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#8a7a6a', cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}>×</button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf8f2', minHeight: '400px' }}>
          {isImage ? (
            <img src={doc.file_url} alt={doc.title} style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain', borderRadius: '6px' }} />
          ) : isPdf ? (
            <iframe src={doc.file_url} style={{ width: '100%', height: '600px', border: 'none', borderRadius: '6px' }} />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>📎</p>
              <p style={{ fontSize: '16px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>Preview not available for this file type.</p>
              <a href={doc.file_url} target="_blank" rel="noopener noreferrer" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '10px 24px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', textDecoration: 'none' }}>Open File →</a>
            </div>
          )}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid #ede8df', flexShrink: 0 }}>
          <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', margin: 0 }}>Uploaded {new Date(doc.created_at).toLocaleDateString()} · {doc.category} · {doc.file_type}</p>
        </div>
      </div>
    </div>
  )
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ title: '', description: '', category: 'general', file_url: '', file_type: '' })

  useEffect(() => { fetchDocuments() }, [])

  async function fetchDocuments() {
    const { data } = await supabase.from('documents').select('*').order('created_at', { ascending: false })
    setDocuments(data || [])
    setLoading(false)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { error } = await supabase.storage.from('documents').upload(fileName, file)
    if (error) { alert('Upload error: ' + error.message); setUploading(false); return }
    const { data: urlData } = supabase.storage.from('documents').getPublicUrl(fileName)
    setForm(prev => ({ ...prev, file_url: urlData.publicUrl, file_type: file.type, title: prev.title || file.name }))
    setUploading(false)
  }

  async function addDocument(e: React.FormEvent) {
    e.preventDefault()
    if (!form.file_url) { alert('Please upload a file first'); return }
    const { error } = await supabase.from('documents').insert([form])
    if (error) { alert(error.message) } else {
      setForm({ title: '', description: '', category: 'general', file_url: '', file_type: '' })
      setShowForm(false)
      fetchDocuments()
    }
  }

  async function deleteDocument(id: string, fileUrl: string) {
    if (!confirm('Delete this document?')) return
    const fileName = fileUrl.split('/').pop()
    if (fileName) await supabase.storage.from('documents').remove([fileName])
    await supabase.from('documents').delete().eq('id', id)
    setPreviewDoc(null)
    fetchDocuments()
  }

  function getFileIcon(fileType: string) {
    if (fileType?.includes('image')) return '🖼'
    if (fileType?.includes('pdf')) return '📄'
    if (fileType?.includes('video')) return '🎥'
    if (fileType?.includes('word') || fileType?.includes('document')) return '📝'
    return '📎'
  }

  const filtered = documents.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.description?.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  )
  const categories = [...new Set(filtered.map(d => d.category))]

  return (
    <div style={{ padding: '40px' }}>
      {previewDoc && (
        <PreviewModal
          doc={previewDoc}
          onClose={() => setPreviewDoc(null)}
          onDelete={() => deleteDocument(previewDoc.id, previewDoc.file_url)}
        />
      )}

      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Document Library</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{documents.length} files · {filtered.length} shown</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}>+ Upload File</button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title, description or category..." style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #ddd8cc', borderRadius: '8px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box', background: '#fff' }} />
      </div>

      {showForm && (
        <form onSubmit={addDocument} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '16px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Upload Document</p>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>File *</label>
            <input type="file" onChange={handleFileUpload} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            {uploading && <p style={{ fontSize: '12px', color: '#4a7c3f', fontFamily: 'sans-serif', marginTop: '4px' }}>Uploading...</p>}
            {form.file_url && <p style={{ fontSize: '12px', color: '#4a7c3f', fontFamily: 'sans-serif', marginTop: '4px' }}>✓ File uploaded successfully</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Document title" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif' }}>
                <option value="general">General</option>
                <option value="legal">Legal</option>
                <option value="water">Water</option>
                <option value="power">Power</option>
                <option value="meetings">Meetings</option>
                <option value="press">Press</option>
                <option value="photos">Photos</option>
                <option value="emails">Emails</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Brief description..." rows={2} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={uploading} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Save Document</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: '#f5f0e8', color: '#5a5040', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p> : filtered.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>{search ? 'No results found' : 'No documents yet'}</p>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{search ? 'Try a different search term.' : 'Upload PDFs, photos, screenshots, and emails to share with the coalition.'}</p>
        </div>
      ) : (
        <div>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{cat}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {filtered.filter(d => d.category === cat).map(doc => (
                  <div key={doc.id} onClick={() => setPreviewDoc(doc)} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#4a7c3f')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#ddd8cc')}
                  >
                    <div style={{ height: '140px', background: '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {doc.file_type?.includes('image') ? (
                        <img src={doc.file_url} alt={doc.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '48px' }}>{getFileIcon(doc.file_type)}</span>
                      )}
                    </div>
                    <div style={{ padding: '12px' }}>
                      <p style={{ fontSize: '14px', color: '#1a2e1a', fontFamily: 'sans-serif', fontWeight: 500, margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.title}</p>
                      {doc.description && <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.description}</p>}
                      <p style={{ fontSize: '11px', color: '#aaa', fontFamily: 'sans-serif', margin: 0 }}>{new Date(doc.created_at).toLocaleDateString()}</p>
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

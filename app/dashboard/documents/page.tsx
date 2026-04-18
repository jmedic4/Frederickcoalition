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

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
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
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from('documents').upload(fileName, file)
    if (error) {
      alert('Upload error: ' + error.message)
      setUploading(false)
      return
    }
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
    const fileName = fileUrl.split('/').pop()
    if (fileName) await supabase.storage.from('documents').remove([fileName])
    await supabase.from('documents').delete().eq('id', id)
    fetchDocuments()
  }

  const categories = [...new Set(documents.map(d => d.category))]

  function getFileIcon(fileType: string) {
    if (fileType?.includes('image')) return '🖼'
    if (fileType?.includes('pdf')) return '📄'
    if (fileType?.includes('video')) return '🎥'
    return '📎'
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Document Library</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{documents.length} files</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>+ Upload File</button>
      </div>

      {showForm && (
        <form onSubmit={addDocument} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '16px', fontWeight: 'bold' }}>Upload Document</p>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>File *</label>
            <input type="file" onChange={handleFileUpload} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            {uploading && <p style={{ fontSize: '12px', color: '#4a7c3f', fontFamily: 'sans-serif', marginTop: '4px' }}>Uploading...</p>}
            {form.file_url && <p style={{ fontSize: '12px', color: '#4a7c3f', fontFamily: 'sans-serif', marginTop: '4px' }}>✓ File uploaded successfully</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Document title" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif' }}>
                <option value="general">General</option>
                <option value="legal">Legal</option>
                <option value="water">Water</option>
                <option value="power">Power</option>
                <option value="meetings">Meetings</option>
                <option value="press">Press</option>
                <option value="photos">Photos</option>
                <option value="emails">Emails</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Brief description of this document..." rows={2} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={uploading} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Save Document</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: '#fff', color: '#5a5040', border: '1px solid #ddd8cc', padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p> : documents.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>No documents yet</p>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Upload PDFs, photos, screenshots, and emails to share with the coalition.</p>
        </div>
      ) : (
        <div>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{cat}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {documents.filter(d => d.category === cat).map(doc => (
                  <div key={doc.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '20px' }}>{getFileIcon(doc.file_type)}</span>
                          <a href={doc.file_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: '#1a2e1a', fontFamily: 'Georgia, serif', textDecoration: 'none' }}>{doc.title}</a>
                        </div>
                        {doc.description && <p style={{ fontSize: '13px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '4px' }}>{doc.description}</p>}
                        <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{new Date(doc.created_at).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => deleteDocument(doc.id, doc.file_url)} style={{ background: 'none', border: 'none', color: '#8a7a6a', cursor: 'pointer', fontSize: '18px', marginLeft: '8px' }}>×</button>
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

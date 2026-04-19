'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Post = {
  id: string
  created_at: string
  title: string
  slug: string
  author: string
  category: string
  content: string
  cover_image_url: string
  published: boolean
  published_at: string
}

const emptyForm = { title: '', slug: '', author: '', category: 'update', content: '', cover_image_url: '', published: false }

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function BlogDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editPost, setEditPost] = useState<Partial<Post> | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchPosts() }, [])

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  function openNew() {
    setEditPost(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  function openEdit(post: Post) {
    setEditPost(post)
    setForm({ title: post.title, slug: post.slug || '', author: post.author || '', category: post.category || 'update', content: post.content || '', cover_image_url: post.cover_image_url || '', published: post.published || false })
    setShowForm(true)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const { error } = await supabase.storage.from('documents').upload(`blog/${fileName}`, file)
    if (error) { alert('Upload error: ' + error.message); setUploading(false); return }
    const { data: urlData } = supabase.storage.from('documents').getPublicUrl(`blog/${fileName}`)
    setForm(prev => ({ ...prev, cover_image_url: urlData.publicUrl }))
    setUploading(false)
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const postData = {
      ...form,
      slug: form.slug || slugify(form.title),
      published_at: form.published ? new Date().toISOString() : null,
    }
    if (editPost?.id) {
      const { error } = await supabase.from('posts').update(postData).eq('id', editPost.id)
      if (error) { alert(error.message); setSaving(false); return }
    } else {
      const { error } = await supabase.from('posts').insert([postData])
      if (error) { alert(error.message); setSaving(false); return }
    }
    setSaving(false)
    setShowForm(false)
    setEditPost(null)
    fetchPosts()
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this post?')) return
    await supabase.from('posts').delete().eq('id', id)
    fetchPosts()
  }

  async function togglePublished(post: Post) {
    await supabase.from('posts').update({ published: !post.published, published_at: !post.published ? new Date().toISOString() : null }).eq('id', post.id)
    fetchPosts()
  }

  const categoryColors: Record<string, { bg: string, color: string }> = {
    update: { bg: '#e8f0d4', color: '#2a5a1a' },
    news: { bg: '#d4e8f0', color: '#1a5a7a' },
    action: { bg: '#f0e4e4', color: '#7a2a2a' },
    recap: { bg: '#f0e8d4', color: '#7a5a1a' },
    resource: { bg: '#e8e4f0', color: '#4a3a7a' },
  }

  if (showForm) {
    return (
      <div style={{ padding: '40px', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', color: '#1a2e1a', fontFamily: 'Georgia, serif', margin: 0 }}>{editPost ? 'Edit Post' : 'New Post'}</h1>
          <button onClick={() => setShowForm(false)} style={{ background: '#f5f0e8', color: '#5a5040', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>← Back</button>
        </div>
        <form onSubmit={savePost}>
          <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '28px', marginBottom: '20px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '20px' }}>Post Details</p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value, slug: slugify(e.target.value)})} placeholder="Post title" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '15px', fontFamily: 'Georgia, serif', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Author</label>
                <input value={form.author} onChange={e => setForm({...form, author: e.target.value})} placeholder="Your name" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif' }}>
                  <option value="update">Coalition Update</option>
                  <option value="news">News</option>
                  <option value="action">Action Alert</option>
                  <option value="recap">Event Recap</option>
                  <option value="resource">Resource</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px', fontWeight: 500 }}>URL Slug</label>
              <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="auto-generated-from-title" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '13px', fontFamily: 'sans-serif', boxSizing: 'border-box', color: '#8a7a6a' }} />
              <p style={{ fontSize: '11px', color: '#aaa', fontFamily: 'sans-serif', marginTop: '4px' }}>frederickcoalition.org/blog/{form.slug || 'your-post-title'}</p>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '28px', marginBottom: '20px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '20px' }}>Cover Image</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', boxSizing: 'border-box', marginBottom: '8px' }} />
            {uploading && <p style={{ fontSize: '12px', color: '#4a7c3f', fontFamily: 'sans-serif' }}>Uploading...</p>}
            {form.cover_image_url && (
              <div>
                <p style={{ fontSize: '12px', color: '#4a7c3f', fontFamily: 'sans-serif', marginBottom: '8px' }}>✓ Image uploaded</p>
                <img src={form.cover_image_url} alt="Cover" style={{ maxWidth: '200px', borderRadius: '6px', border: '1px solid #ddd8cc' }} />
              </div>
            )}
          </div>

          <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '28px', marginBottom: '20px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '20px' }}>Content</p>
            <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', marginBottom: '12px' }}>You can use line breaks to separate paragraphs. Links can be added as full URLs.</p>
            <textarea
              required
              value={form.content}
              onChange={e => setForm({...form, content: e.target.value})}
              placeholder="Write your post content here...

Start a new paragraph by pressing Enter twice.

You can include links like https://example.com and they will be clickable."
              rows={16}
              style={{ width: '100%', padding: '12px', border: '1.5px solid #ddd8cc', borderRadius: '6px', fontSize: '15px', fontFamily: 'Georgia, serif', lineHeight: '1.7', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <input type="checkbox" id="published" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} style={{ width: '20px', height: '20px', accentColor: '#4a7c3f', cursor: 'pointer' }} />
            <div>
              <label htmlFor="published" style={{ fontSize: '15px', color: '#1a2e1a', fontFamily: 'sans-serif', fontWeight: 500, cursor: 'pointer' }}>Publish immediately</label>
              <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', margin: '2px 0 0' }}>Uncheck to save as draft — only visible to dashboard members</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={saving || uploading} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '12px 28px', borderRadius: '6px', fontSize: '15px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}>
              {saving ? 'Saving...' : editPost ? 'Save Changes' : 'Create Post'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: '#f5f0e8', color: '#5a5040', border: 'none', padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Cancel</button>
            {editPost && <button type="button" onClick={() => { deletePost(editPost.id!); setShowForm(false) }} style={{ background: '#f0e4e4', color: '#7a2a2a', border: 'none', padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', marginLeft: 'auto' }}>Delete Post</button>}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Dashboard</p>
          <h1 style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>Blog & Newsletter</h1>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} drafts</p>
        </div>
        <button onClick={openNew} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer', fontWeight: 500 }}>+ New Post</button>
      </div>

      {loading ? <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a' }}>Loading...</p> : posts.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>No posts yet</p>
          <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif', marginBottom: '24px' }}>Create your first blog post or newsletter update.</p>
          <button onClick={openNew} style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>+ New Post</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map(post => (
            <div key={post.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '3px', fontFamily: 'sans-serif', background: categoryColors[post.category]?.bg || '#f5f0e8', color: categoryColors[post.category]?.color || '#5a5040' }}>{post.category}</span>
                  <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '3px', fontFamily: 'sans-serif', background: post.published ? '#e8f0d4' : '#f5f0e8', color: post.published ? '#2a5a1a' : '#8a7a6a' }}>{post.published ? 'Published' : 'Draft'}</span>
                </div>
                <h3 style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>{post.title}</h3>
                <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>
                  {post.author && `By ${post.author} · `}{new Date(post.created_at).toLocaleDateString()}
                  {post.published && ` · `}
                  {post.published && <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4a7c3f', textDecoration: 'none' }}>View live →</a>}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => togglePublished(post)} style={{ padding: '8px 14px', background: post.published ? '#f0e8d4' : '#e8f0d4', color: post.published ? '#7a5a1a' : '#2a5a1a', border: 'none', borderRadius: '6px', fontSize: '12px', fontFamily: 'sans-serif', cursor: 'pointer' }}>
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => openEdit(post)} style={{ padding: '8px 14px', background: '#f5f0e8', color: '#5a5040', border: '1px solid #ddd8cc', borderRadius: '6px', fontSize: '12px', fontFamily: 'sans-serif', cursor: 'pointer' }}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

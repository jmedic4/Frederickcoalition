'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

type Post = {
  id: string
  title: string
  slug: string
  author: string
  category: string
  content: string
  cover_image_url: string
  published: boolean
  published_at: string
}

const categoryColors: Record<string, { bg: string, color: string }> = {
  update: { bg: '#e8f0d4', color: '#2a5a1a' },
  news: { bg: '#d4e8f0', color: '#1a5a7a' },
  action: { bg: '#f0e4e4', color: '#7a2a2a' },
  recap: { bg: '#f0e8d4', color: '#7a5a1a' },
  resource: { bg: '#e8e4f0', color: '#4a3a7a' },
}

const categoryLabels: Record<string, string> = {
  update: 'Coalition Update',
  news: 'News',
  action: 'Action Alert',
  recap: 'Event Recap',
  resource: 'Resource',
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <main>
      <Nav />
      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Stay Informed</p>
        <h1 style={{ fontSize: '52px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Blog & Updates</h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto' }}>The latest news, action alerts, and updates from the Coalition to Protect Frederick County.</p>
      </section>
      <section style={{ padding: '80px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {loading ? (
            <p style={{ fontFamily: 'sans-serif', color: '#8a7a6a', textAlign: 'center' }}>Loading posts...</p>
          ) : posts.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '48px', textAlign: 'center' }}>
              <p style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>No posts yet</p>
              <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>Check back soon for updates from the coalition.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {posts.map((post, index) => (
                <a key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div key={post.id} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', overflow: 'hidden', display: index === 0 ? 'block' : 'flex' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#4a7c3f')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#ddd8cc')}
                  >
                    {post.cover_image_url && (
                      <div style={{ height: index === 0 ? '320px' : '160px', minWidth: index === 0 ? 'auto' : '240px', overflow: 'hidden' }}>
                        <img src={post.cover_image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div style={{ padding: '28px', flex: 1 }}>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '3px', fontFamily: 'sans-serif', background: categoryColors[post.category]?.bg || '#f5f0e8', color: categoryColors[post.category]?.color || '#5a5040' }}>{categoryLabels[post.category] || post.category}</span>
                        <span style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h2 style={{ fontSize: index === 0 ? '28px' : '20px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '10px', lineHeight: '1.3' }}>{post.title}</h2>
                      <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.6', marginBottom: '16px' }}>
                        {post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
                      </p>
                      <p style={{ fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif' }}>
                        {post.author && `By ${post.author} · `}Read more →
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}

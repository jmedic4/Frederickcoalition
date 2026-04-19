'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { label: 'Dashboard', href: '/dashboard', icon: '⊞' },
  { label: 'Sign Requests', href: '/dashboard/sign-requests', icon: '↗' },
  { label: 'Blog & Newsletter', href: '/dashboard/blog', icon: '✍' },
  { label: 'Documents', href: '/dashboard/documents', icon: '▤' },
  { label: 'Tasks', href: '/dashboard/tasks', icon: '✓' },
  { label: 'Chat', href: '/dashboard/chat', icon: '◉' },
  { label: 'Contacts', href: '/dashboard/contacts', icon: '◎' },
  { label: 'Saved URLs', href: '/dashboard/urls', icon: '⊕' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-mobile-bar { display: flex !important; }
        }
        @media (min-width: 769px) {
          .sidebar-mobile-bar { display: none !important; }
          .sidebar-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Desktop sidebar */}
      <div className="sidebar-desktop" style={{ width: '240px', minHeight: '100vh', background: '#1a2e1a', borderRight: '1px solid #2d4a2d', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #2d4a2d' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <p style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 'bold', margin: 0 }}>COALITION TO PROTECT</p>
            <p style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 'bold', margin: 0 }}>FREDERICK COUNTY</p>
          </a>
          <p style={{ color: '#6a8a6a', fontFamily: 'sans-serif', fontSize: '11px', marginTop: '4px' }}>Member Dashboard</p>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {links.map(link => (
            <a key={link.href} href={link.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', marginBottom: '4px', textDecoration: 'none', background: pathname === link.href ? '#2d4a2d' : 'transparent', color: pathname === link.href ? '#f5f0e8' : '#b8b09a', fontSize: '14px', fontFamily: 'sans-serif' }}>
              <span style={{ fontSize: '16px' }}>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #2d4a2d' }}>
          <a href="/" style={{ color: '#6a8a6a', fontFamily: 'sans-serif', fontSize: '12px', textDecoration: 'none' }}>← Back to Public Site</a>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="sidebar-mobile-bar" style={{ display: 'none', position: 'fixed', top: 0, left: 0, right: 0, background: '#1a2e1a', borderBottom: '1px solid #2d4a2d', padding: '12px 16px', justifyContent: 'space-between', alignItems: 'center', zIndex: 200 }}>
        <a href="/" style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>COALITION DASHBOARD</a>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#c8b97a' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#c8b97a' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#c8b97a' }} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="sidebar-mobile-menu" style={{ position: 'fixed', top: '49px', left: 0, right: 0, background: '#1a2e1a', borderBottom: '1px solid #2d4a2d', zIndex: 199, padding: '8px 16px 16px' }}>
          {links.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #2d4a2d', textDecoration: 'none', color: pathname === link.href ? '#f5f0e8' : '#b8b09a', fontSize: '15px', fontFamily: 'sans-serif' }}>
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
          <a href="/" style={{ display: 'block', marginTop: '12px', color: '#6a8a6a', fontFamily: 'sans-serif', fontSize: '13px', textDecoration: 'none' }}>← Back to Public Site</a>
        </div>
      )}
    </>
  )
}

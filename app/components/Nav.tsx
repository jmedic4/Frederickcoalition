'use client'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'What Are Data Centers', href: '/what-are-data-centers' },
    { label: 'The Facts', href: '/facts' },
    { label: 'Community Event', href: '/community-event' },
    { label: 'News', href: '/news' },
    { label: 'Blog', href: '/blog' },
    { label: 'Events', href: '/events' },
    { label: 'Request a Sign', href: '/request-sign' },
  ]

  return (
    <nav style={{ background: '#1a2e1a', borderBottom: '1px solid #2d4a2d', position: 'relative', zIndex: 100 }}>
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ color: '#c8b97a', fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px', fontFamily: 'Georgia, serif', textDecoration: 'none', lineHeight: '1.3', maxWidth: '200px' }}>
          COALITION TO PROTECT FREDERICK COUNTY
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="desktop-nav">
          {links.map(link => (
            <a key={link.label} href={link.href} style={{ color: '#d4cdb8', fontSize: '13px', textDecoration: 'none', fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
              {link.label}
            </a>
          ))}
          <a href="/#contact" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontFamily: 'sans-serif', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Contact Officials →
          </a>
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none', flexDirection: 'column', gap: '5px' }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#c8b97a', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#c8b97a', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#c8b97a', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#1a2e1a', borderTop: '1px solid #2d4a2d', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }} className="mobile-menu">
          {links.map(link => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ color: '#d4cdb8', fontSize: '15px', textDecoration: 'none', fontFamily: 'sans-serif', padding: '12px 0', borderBottom: '1px solid #2d4a2d' }}>
              {link.label}
            </a>
          ))}
          <a href="/#contact" onClick={() => setMenuOpen(false)} style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '14px 16px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', textDecoration: 'none', textAlign: 'center', marginTop: '12px' }}>
            Contact Officials →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  )
}

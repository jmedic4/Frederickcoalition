export default function Nav() {
  return (
    <nav style={{
      background: '#1a2e1a',
      padding: '16px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #2d4a2d'
    }}>
      <a href="/" style={{ color: '#c8b97a', fontSize: '16px', fontWeight: 'bold', letterSpacing: '1px', fontFamily: 'Georgia, serif', textDecoration: 'none' }}>
        COALITION TO PROTECT FREDERICK COUNTY
      </a>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {[
          { label: 'What Are Data Centers', href: '/what-are-data-centers' },
          { label: 'The Facts', href: '/facts' },
          { label: 'Community Event', href: '/community-event' },
          { label: 'News', href: '/news' },
          { label: 'Blog', href: '/blog' },
          { label: 'Events', href: '/events' },
          { label: 'Request a Sign', href: '/request-sign' },
        ].map(link => (
          <a key={link.label} href={link.href} style={{ color: '#d4cdb8', fontSize: '13px', textDecoration: 'none', fontFamily: 'sans-serif' }}>
            {link.label}
          </a>
        ))}
        <a href="/#contact" style={{
          background: '#4a7c3f',
          color: '#f5f0e8',
          padding: '8px 18px',
          borderRadius: '4px',
          fontSize: '13px',
          fontFamily: 'sans-serif',
          textDecoration: 'none'
        }}>
          Contact Officials →
        </a>
      </div>
    </nav>
  )
}

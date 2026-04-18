export default function Dashboard() {
  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>Welcome Back</p>
        <h1 style={{ fontSize: '36px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Coalition Dashboard</h1>
        <p style={{ fontSize: '15px', color: '#5a5040', fontFamily: 'sans-serif' }}>Everything you need to protect Frederick County in one place.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {[
          { label: 'Sign Requests', value: '0', sub: 'pending', href: '/dashboard/sign-requests' },
          { label: 'Documents', value: '0', sub: 'uploaded', href: '/dashboard/documents' },
          { label: 'Open Tasks', value: '0', sub: 'assigned', href: '/dashboard/tasks' },
          { label: 'Contacts', value: '0', sub: 'saved', href: '/dashboard/contacts' },
          { label: 'Saved URLs', value: '0', sub: 'bookmarked', href: '/dashboard/urls' },
          { label: 'Chat', value: '0', sub: 'messages', href: '/dashboard/chat' },
        ].map(card => (
          <a key={card.label} href={card.href} style={{ textDecoration: 'none', background: '#fff', border: '1px solid #ddd8cc', borderRadius: '8px', padding: '20px', display: 'block' }}>
            <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', marginBottom: '8px' }}>{card.label}</p>
            <p style={{ fontSize: '32px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>{card.value}</p>
            <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{card.sub}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

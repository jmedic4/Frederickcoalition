export default function Footer() {
  return (
    <footer style={{ background: '#1a2e1a', padding: '32px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1100px', margin: '0 auto', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '16px', marginBottom: '4px' }}>Coalition to Protect Frederick County</p>
          <p style={{ color: '#6a8a6a', fontFamily: 'sans-serif', fontSize: '13px' }}>frederickcoalition.org · Frederick County, Virginia</p>
        </div>
        <a href="/login" style={{ color: '#4a6a4a', fontFamily: 'sans-serif', fontSize: '12px', textDecoration: 'none', letterSpacing: '0.5px' }}>Member Login →</a>
      </div>
    </footer>
  )
}

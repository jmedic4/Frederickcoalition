import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function TheFacts() {
  return (
    <main>
      <Nav />
      <section style={{ background: '#1a2e1a', padding: '60px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Know the Facts</p>
        <h1 style={{ fontSize: '48px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>The Real Cost to Our County</h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto' }}>These are documented impacts hitting every Virginia county that said yes to data centers.</p>
      </section>
      <section style={{ padding: '60px 40px', background: '#f5f0e8', display: 'flex', justifyContent: 'center' }}>
        <img src="/cost-to-community.png" alt="The Real Cost to Our County" style={{ maxWidth: '900px', width: '100%', borderRadius: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} />
      </section>
      <section style={{ padding: '60px 40px', background: '#1a2e1a', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Your County. Your Choice.</h2>
        <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 32px' }}>The vote has not happened yet. There is still time — but only if residents show up and make their voices heard.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/#contact" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>Contact Your Supervisor →</a>
          <a href="/events" style={{ background: 'transparent', color: '#f5f0e8', border: '1px solid #c8b97a', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>See Upcoming Events →</a>
        </div>
      </section>
      <Footer />
    </main>
  )
}

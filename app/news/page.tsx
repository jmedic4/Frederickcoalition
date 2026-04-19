import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function News() {
  return (
    <main>
      <Nav />
      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Stay Informed</p>
        <h1 style={{ fontSize: '52px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>In the News</h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto' }}>Media coverage, press releases, and updates on the fight to protect Frederick County.</p>
      </section>
      <section style={{ padding: '80px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>Press Coverage</p>
          {[
            { date: 'April 2026', source: 'The Winchester Star', title: "We're on the same team here: Citizen-organized data center forum draws large crowd", description: 'The Winchester Star covered the Coalition to Protect Frederick County community forum, which drew a large crowd of residents concerned about proposed data center development in Frederick County, Virginia.', url: 'https://www.winchesterstar.com/winchester_star/were-on-the-same-team-here-citizen-organized-data-center-forum-draws-large-crowd/article_51799fe8-252a-5d9b-9ade-3aaed2f3614a.html', tag: 'Press Coverage' },
            { date: 'April 2026', source: 'The Winchester Star', title: 'Frederick County residents to hold their own data center forum', description: 'The Winchester Star reported on plans by Frederick County residents to organize their own community forum on data center development, ahead of official county meetings on the topic.', url: 'https://www.winchesterstar.com/winchester_star/frederick-county-residents-to-hold-their-own-data-center-forum/article_465925fd-9660-56bc-946c-677e83beae72.html', tag: 'Press Coverage' },
          ].map(article => (
            <div key={article.title} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '28px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', padding: '3px 8px', borderRadius: '3px', background: '#e8f0d4', color: '#2a5a1a' }}>{article.tag}</span>
                  <span style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{article.source}</span>
                </div>
                <span style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif' }}>{article.date}</span>
              </div>
              <h3 style={{ fontSize: '20px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '10px' }}>{article.title}</h3>
              <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.6', marginBottom: '16px' }}>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif', textDecoration: 'none', borderBottom: '1px solid #4a7c3f', paddingBottom: '2px' }}>Read the full article →</a>
            </div>
          ))}
          <div style={{ background: '#1a2e1a', borderRadius: '6px', padding: '40px', textAlign: 'center', marginTop: '48px' }}>
            <h3 style={{ fontSize: '24px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>Are You a Member of the Press?</h3>
            <p style={{ fontSize: '15px', color: '#b8b09a', fontFamily: 'sans-serif', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>We welcome media inquiries. Contact us to speak with coalition leadership or our panel of experts.</p>
            <a href="/contact" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '14px' }}>Contact the Coalition →</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

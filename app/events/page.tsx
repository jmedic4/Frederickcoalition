import Nav from '../components/Nav'
export default function Events() {
  return (
    <main>
      {/* NAV */}
      <Nav />

      {/* HERO */}
      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>
          Stay Informed
        </p>
        <h1 style={{ fontSize: '52px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
          Upcoming Events
        </h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto' }}>
          Show up in person. Your presence at public meetings is the most powerful statement you can make.
        </p>
      </section>

      {/* EVENTS LIST */}
      <section style={{ padding: '80px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          {/* UPCOMING */}
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>
            Upcoming
          </p>
          {[
            {
              date: 'TBD',
              month: '',
              title: 'Board of Supervisors Meeting',
              location: 'Frederick County Government Center · Winchester, VA',
              description: 'Public comment period open. Residents are encouraged to attend and speak during the public comment portion. Written comments may also be submitted in advance.',
              type: 'Board Meeting',
              typeBg: '#e8f0d4',
              typeColor: '#2a5a1a'
            },
            {
              date: 'TBD',
              month: '',
              title: 'Planning Commission Meeting',
              location: 'Frederick County Government Center · Winchester, VA',
              description: 'The Planning Commission reviews all zoning applications before they reach the Board of Supervisors. This is a critical opportunity to get your comments on the record.',
              type: 'Planning Commission',
              typeBg: '#d4e8f0',
              typeColor: '#1a5a7a'
            },
            {
              date: 'TBD',
              month: '',
              title: 'Coalition Community Meeting',
              location: 'Location TBD · Frederick County, VA',
              description: 'Join fellow residents to share information, coordinate efforts, and prepare for upcoming public meetings. All Frederick County residents welcome.',
              type: 'Community Meeting',
              typeBg: '#f0e8d4',
              typeColor: '#7a5a1a'
            },
          ].map(event => (
            <div key={event.title} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '28px', marginBottom: '16px', display: 'flex', gap: '24px' }}>
              <div style={{ minWidth: '80px', textAlign: 'center', background: '#1a2e1a', borderRadius: '6px', padding: '16px 12px' }}>
                <p style={{ fontSize: '24px', color: '#c8b97a', fontFamily: 'Georgia, serif', margin: '0' }}>{event.date}</p>
                <p style={{ fontSize: '12px', color: '#b8b09a', fontFamily: 'sans-serif', margin: '4px 0 0' }}>{event.month}</p>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ display: 'inline-block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', padding: '3px 8px', borderRadius: '3px', marginBottom: '10px', background: event.typeBg, color: event.typeColor }}>
                  {event.type}
                </span>
                <h3 style={{ fontSize: '20px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '6px' }}>{event.title}</h3>
                <p style={{ fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif', marginBottom: '10px' }}>{event.location}</p>
                <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.6' }}>{event.description}</p>
              </div>
            </div>
          ))}

          {/* STAY UPDATED */}
          <div style={{ background: '#1a2e1a', borderRadius: '6px', padding: '40px', textAlign: 'center', marginTop: '48px' }}>
            <h3 style={{ fontSize: '28px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>
              Get Event Alerts
            </h3>
            <p style={{ fontSize: '15px', color: '#b8b09a', fontFamily: 'sans-serif', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
              When meetings are scheduled and votes are announced, you will be the first to know.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{ padding: '12px 16px', borderRadius: '4px', border: '1px solid #3d5a3d', background: '#2d4a2d', color: '#f5f0e8', fontSize: '14px', fontFamily: 'sans-serif', width: '260px' }}
              />
              <button style={{ background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '12px 24px', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', cursor: 'pointer' }}>
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1a2e1a', padding: '32px 40px', textAlign: 'center' }}>
        <p style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '16px', marginBottom: '8px' }}>Coalition to Protect Frederick County</p>
        <p style={{ color: '#6a8a6a', fontFamily: 'sans-serif', fontSize: '13px' }}>frederickcoalition.org · Frederick County, Virginia</p>
      </footer>
    </main>
  )
}
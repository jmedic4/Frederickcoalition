import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function WhatAreDataCenters() {
  return (
    <main>
      <Nav />
      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Know the Facts</p>
        <h1 style={{ fontSize: '52px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>What Are Data Centers?</h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>Before you can fight something, you need to understand what it is. Here is what the industry does not put in its brochures.</p>
      </section>
      <section style={{ padding: '80px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>The Basics</p>
          <h2 style={{ fontSize: '36px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>The Simple Version</h2>
          <p style={{ fontSize: '16px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.8', marginBottom: '24px' }}>A data center is a large industrial building — or campus of buildings — filled with tens of thousands of computer servers. These servers store and process data for companies like Amazon, Google, Microsoft, and Meta. Every time you stream a video, use social media, or store a file in the cloud, that data lives in a data center somewhere.</p>
          <p style={{ fontSize: '16px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.8', marginBottom: '24px' }}>They are not office buildings. They employ very few local people — typically 30 to 50 full-time employees for a facility that covers hundreds of acres. They operate 24 hours a day, 7 days a week, 365 days a year. They never stop running.</p>
          <p style={{ fontSize: '16px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.8' }}>The industry promises economic benefits — tax revenue, jobs, infrastructure investment. But the Virginia counties that said yes a decade ago are now telling a very different story.</p>
        </div>
      </section>
      <section style={{ padding: '80px 40px', background: '#1a2e1a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>By the Numbers</p>
          <h2 style={{ fontSize: '36px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '48px' }}>What One Large Data Center Actually Requires</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { number: '500,000+', label: 'Gallons of water consumed daily for cooling' },
              { number: '100+ MW', label: 'Electricity demand — equal to a small city' },
              { number: '30-50', label: 'Full-time local jobs created on average' },
              { number: '24/7/365', label: 'Hours of continuous industrial operation' },
              { number: '1,000s', label: 'Diesel generators required for backup power' },
              { number: '85+ dB', label: 'Noise level — equivalent to heavy traffic' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#2d4a2d', border: '1px solid #3d5a3d', borderRadius: '6px', padding: '28px' }}>
                <p style={{ fontSize: '36px', color: '#c8b97a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>{stat.number}</p>
                <p style={{ fontSize: '13px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.5' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '80px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>How It Happens</p>
          <h2 style={{ fontSize: '36px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '24px' }}>How Data Centers Get Approved</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { step: '1', title: 'A developer identifies your county', body: 'Data center developers target rural counties with available land, access to power transmission lines, and local governments that may not yet understand the full impact of what they are approving.' },
              { step: '2', title: 'They apply for a zoning change', body: 'Most rural agricultural land is not zoned for industrial use. Developers apply to rezone farmland as industrial or data center use. This is the critical moment — once rezoning is approved, it is nearly impossible to reverse.' },
              { step: '3', title: 'The Planning Commission reviews it', body: 'The Planning Commission holds public hearings and makes a recommendation to the Board of Supervisors. This is one of the most important opportunities for public comment.' },
              { step: '4', title: 'The Board of Supervisors votes', body: 'The Board of Supervisors makes the final decision. Elected officials respond to constituent pressure — which is why your voice, your email, and your presence at meetings matters.' },
              { step: '5', title: 'Once approved, it cannot be undone', body: 'This is what Loudoun County learned. Once data centers are built and operating, the economic investment makes reversal politically and financially impossible. The time to act is before the vote, not after.' },
            ].map((item, index) => (
              <div key={item.step} style={{ display: 'flex', gap: '24px', paddingBottom: '32px', borderLeft: index < 4 ? '2px solid #4a7c3f' : 'none', marginLeft: '20px', paddingLeft: '32px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-12px', top: '0', width: '24px', height: '24px', background: '#4a7c3f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#f5f0e8', fontSize: '12px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>{item.step}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.6' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '80px 40px', background: '#2d4a2d', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>Frederick County Is at That Moment Right Now</h2>
        <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 40px' }}>The vote has not happened yet. The rezoning has not been approved. There is still time — but only if residents show up and make their voices heard.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/#contact" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>Contact Your Supervisor →</a>
          <a href="/events" style={{ background: 'transparent', color: '#f5f0e8', border: '1px solid #c8b97a', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>See Upcoming Events →</a>
        </div>
      </section>
      <Footer />
    </main>
  )
}

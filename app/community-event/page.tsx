import Nav from '../components/Nav'

export default function CommunityEvent() {
  return (
    <main>
      <Nav />

      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Community Event · April 2026</p>
        <h1 style={{ fontSize: '52px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px', lineHeight: '1.1' }}>
          400 Residents.<br />
          <em style={{ color: '#c8b97a' }}>Six Experts.</em><br />
          One Clear Message.
        </h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          Frederick County residents packed the room to hear from geologists, industrial hygienists, public policy experts, and community leaders who have fought this battle before — and won.
        </p>
      </section>

      <section style={{ padding: '64px 40px', background: '#2d4a2d', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>Watch the Full Event</p>
        <div style={{ maxWidth: '860px', margin: '0 auto 40px' }}>
          <p style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '16px', textAlign: 'left' }}>Part 1</p>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              src="https://www.youtube.com/embed/jlRhRjAGMMA"
              title="Coalition to Protect Frederick County Community Forum Part 1"
              allowFullScreen
            />
          </div>
        </div>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <p style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '16px', textAlign: 'left' }}>Part 2</p>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              src="https://www.youtube.com/embed/bF3nsJWFk9A"
              title="Coalition to Protect Frederick County Community Forum Part 2"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Master of Ceremonies</p>
          <div style={{ background: '#1a2e1a', borderRadius: '6px', padding: '40px', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <div style={{ minWidth: '80px', height: '80px', borderRadius: '50%', background: '#2d4a2d', border: '2px solid #c8b97a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '24px' }}>TC</span>
            </div>
            <div>
              <h2 style={{ fontSize: '28px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '6px' }}>Tony Cole</h2>
              <p style={{ fontSize: '13px', color: '#c8b97a', fontFamily: 'sans-serif', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Cybersecurity & Technology Leadership · Frederick County Resident</p>
              <p style={{ fontSize: '15px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7' }}>
                With nearly 40 years of experience at the highest levels of cybersecurity, global risk, and technology leadership, Tony Cole brings a depth of insight that few can match — from helping stand up the Pentagon&apos;s cyber response team to advising international organizations and major corporations on digital risk. As a Frederick County resident, Mr. Cole guided our panel of experts through discussions spanning industrial hygiene, water, noise, air quality, electric grid management, karst geology, and small business and economic impacts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 40px', background: '#faf8f2' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>Expert Speakers</p>
          <h2 style={{ fontSize: '36px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '48px', textAlign: 'center' }}>Our Panel of Experts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { initials: 'MS', name: 'Martha Sadlick', title: 'Geologist · James Madison University', location: 'Raised in Strasburg, VA', bio: "With 45+ years of experience as a senior geophysicist and geologist, Martha has worked with Shell, Total, and Conoco on exploration and development projects across the North Sea, Philippines, Côte d'Ivoire, Gulf of America, and Pennsylvania. Raised on a family farm near Strasburg, Virginia, she brings deep knowledge of Shenandoah Valley geology and a strong understanding of subsurface systems, fluid flow, and the environmental considerations that are directly relevant to Frederick County's karst landscape." },
              { initials: 'NR', name: 'Nathan Russell', title: 'Public Policy & Government Finance Specialist', location: 'Flown in from Michigan', bio: "Nathan Russell specializes in public policy and government finance. He shared insights on the economic impacts to local businesses and brought his expertise on government finance and viable alternatives that Frederick County can explore. His analysis challenges the narrative that data centers are an economic windfall — and presents what the numbers actually show." },
              { initials: 'KK', name: 'Kristen Meghan Kelly', title: 'Senior Industrial Hygienist & Environmental Specialist', location: 'Flown in from Michigan', bio: "Kristen Meghan Kelly holds a Master of Science in Occupational Safety and Health and brings 20+ years of experience as a senior industrial hygienist and environmental specialist. A consultant and nationally recognized expert, she has been featured in media and documentary work for her advocacy and professional insight. Her expertise spans the human health and environmental impacts of industrial operations — an essential lens for evaluating what large-scale data center infrastructure means for Frederick County residents, water, and land." },
              { initials: 'TC', name: 'Tammy K. Herrema Clark', title: 'Health, Safety & Compliance Expert', location: 'Surrounding Community Speaker', bio: "With over 20 years of experience managing health, safety, and compliance programs across multiple industries, Tammy Clark brings expertise from both regulatory and litigation settings. Her work has informed employers, manufacturers, healthcare systems, and government agencies on occupational safety, regulatory compliance, and risk analysis. Her breadth of industrial context gives her a grounded, evidence-based perspective on how large-scale industrial development affects surrounding communities, workers, and the environment." },
              { initials: 'ES', name: 'Elena Schlossberg-Kunkel', title: 'Coalition Leader & Smart Growth Advocate', location: 'Prince William County, VA', bio: "Elena holds a BA in Psychology and an MA in School Counseling from Marymount University. After moving to the Rural Crescent in Prince William County in 2002, she witnessed firsthand how land use decisions can permanently alter the quality of life for entire communities. She established The Coalition to Protect Prince William County and has since become a leading voice on smart growth policy and conservation. Her work offers Frederick County residents a direct window into how similar fights have unfolded in neighboring jurisdictions — and what strategies have been most effective." },
            ].map(speaker => (
              <div key={speaker.name} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '64px', height: '64px', borderRadius: '50%', background: '#2d4a2d', border: '2px solid #c8b97a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '18px' }}>{speaker.initials}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '22px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>{speaker.name}</h3>
                  <p style={{ fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif', letterSpacing: '0.5px', marginBottom: '4px' }}>{speaker.title}</p>
                  <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', marginBottom: '14px', fontStyle: 'italic' }}>{speaker.location}</p>
                  <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.7' }}>{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 40px', background: '#1a2e1a', textAlign: 'center' }}>
        <h2 style={{ fontSize: '40px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
          The Experts Have Spoken.<br />
          <em style={{ color: '#c8b97a' }}>Now It Is Your Turn.</em>
        </h2>
        <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 40px' }}>
          400 of your neighbors showed up. Now take action — contact your supervisor, sign the petition, and make your voice part of the official record.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/#contact" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>Contact Your Supervisor →</a>
          <a href="/events" style={{ background: 'transparent', color: '#f5f0e8', border: '1px solid #c8b97a', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>See Upcoming Events →</a>
          <a href="/request-sign" style={{ background: 'transparent', color: '#f5f0e8', border: '1px solid #c8b97a', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>Request a Yard Sign →</a>
        </div>
      </section>

      <footer style={{ background: '#1a2e1a', padding: '32px 40px', textAlign: 'center' }}>
        <p style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '16px', marginBottom: '8px' }}>Coalition to Protect Frederick County</p>
        <p style={{ color: '#6a8a6a', fontFamily: 'sans-serif', fontSize: '13px' }}>frederickcoalition.org · Frederick County, Virginia</p>
      </footer>
    </main>
  )
}

import Nav from './components/Nav'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* NAV */}
      <Nav />
      {/* HERO */}
      <section style={{
        background: '#1a2e1a',
        color: '#f5f0e8',
        padding: '100px 40px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '12px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', marginBottom: '20px', textTransform: 'uppercase' }}>
          Frederick County, Virginia
        </p>
        <h1 style={{ fontSize: '64px', lineHeight: '1.1', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
          Your Water.<br />
          <em style={{ color: '#c8b97a' }}>Your Land.</em><br />
          Your Voice.
        </h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', maxWidth: '560px', margin: '0 auto 40px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
          Large-scale data centers are being proposed for Frederick County. Before our farmland and way of life disappear, know the facts.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#action" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>
            Take Action Now
          </a>
          <a href="#facts" style={{ background: 'transparent', color: '#f5f0e8', border: '1px solid #c8b97a', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>
            Read the Facts
          </a>
          <a href="#contact" style={{ background: 'transparent', color: '#f5f0e8', border: '1px solid #c8b97a', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>
            Contact Officials
          </a>
        </div>
      </section>
{/* GET INVOLVED */}
<section style={{ padding: '80px 40px', background: '#2d4a2d' }}>
  <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '56px' }}>
      <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>
        Get Involved
      </p>
      <h2 style={{ fontSize: '40px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
        How to Make Your Voice Count
      </h2>
      <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto' }}>
        Every action matters. Here is exactly what you can do right now to protect Frederick County.
      </p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
      {[
        {
          step: '01',
          title: 'Sign the Petition',
          body: 'Add your name to the official record. Every signature demonstrates to the Board of Supervisors that Frederick County residents are paying attention and standing together.',
          action: 'Sign Now →',
          href: '#petition'
        },
        {
          step: '02',
          title: 'Email the Board of Supervisors',
          body: 'Written correspondence becomes part of the official public record. Use our pre-written email tool to contact your supervisor in under 60 seconds.',
          action: 'Email Your Supervisor →',
          href: '#contact'
        },
        {
          step: '03',
          title: 'Email the Planning Commission',
          body: 'The Planning Commission reviews all zoning changes before they reach the Board. Make sure they hear from you directly — their recommendation carries significant weight.',
          action: 'Email the Commission →',
          href: '#contact'
        },
        {
          step: '04',
          title: 'Attend Local Meetings',
          body: 'Show up in person. Public comment at Board of Supervisors and Planning Commission meetings is the most powerful statement you can make. See our upcoming events for dates.',
          action: 'See Upcoming Events →',
          href: '/events'
        },
        {
          step: '05',
          title: 'Request a Yard Sign',
          body: 'Put a sign in your yard and make your position visible to your neighbors and to anyone driving through. Signs create community — when neighbors see them, they know they are not alone.',
          action: 'Request a Sign →',
          href: '/request-sign'
        },
        {
          step: '06',
          title: 'Sign Up for Updates',
          body: 'Stay informed. When votes are scheduled, when meetings are announced, when action is needed — you will be the first to know. Enter your email to join our mailing list.',
          action: 'Join the Mailing List →',
          href: '#newsletter'
        },
      ].map(item => (
        <div key={item.step} style={{ background: '#1a2e1a', border: '1px solid #3d5a3d', borderRadius: '6px', padding: '28px' }}>
          <p style={{ fontSize: '32px', color: '#c8b97a', fontFamily: 'Georgia, serif', marginBottom: '12px', opacity: 0.6 }}>{item.step}</p>
          <h3 style={{ fontSize: '20px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '10px' }}>{item.title}</h3>
          <p style={{ fontSize: '14px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', marginBottom: '20px' }}>{item.body}</p>
          <a href={item.href} style={{ fontSize: '13px', color: '#c8b97a', fontFamily: 'sans-serif', textDecoration: 'none', borderBottom: '1px solid #c8b97a', paddingBottom: '2px' }}>
            {item.action}
          </a>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* EIGHT THREATS */}
      <section id="facts" style={{ padding: '80px 40px', background: '#f5f0e8', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>
          What&apos;s at stake
        </p>
        <h2 style={{ fontSize: '40px', color: '#1a2e1a', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>
          The Real Cost to Our County
        </h2>
        <p style={{ fontSize: '16px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 48px' }}>
          These aren&apos;t abstract concerns. They are documented impacts hitting every Virginia county that said yes to data centers.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {[
  {
    tag: 'Water', tagBg: '#d4e8f0', tagColor: '#1a5a7a',
    title: 'Your Wells & Farms',
    body: 'Data centers consume millions of gallons of water daily for cooling. In Frederick County, that means direct competition with your wells, your farms, and increased drought risk.'
  },
  {
    tag: 'Power', tagBg: '#e8f0d4', tagColor: '#2a5a1a',
    title: 'Your Electric Bills',
    body: 'Every county that welcomed data centers saw electric rates rise. Your co-op rates will not be immune. Industrial-scale power demand has real consequences for residents.'
  },
  {
    tag: 'Land', tagBg: '#f0e8d4', tagColor: '#7a5a1a',
    title: 'Your Farmland',
    body: 'Once agricultural land is rezoned and developed, it never returns. The Shenandoah Valley\'s character and heritage is on the line — permanently.'
  },
  {
    tag: 'Air', tagBg: '#e8e4f0', tagColor: '#4a3a7a',
    title: 'Your Air Quality',
    body: 'Diesel backup generators — required by the thousands at large data center campuses — run during outages and testing, releasing particulate matter and pollutants into the air our families breathe.'
  },
  {
    tag: 'Sound', tagBg: '#f0e4e4', tagColor: '#7a2a2a',
    title: 'Your Peace & Sleep',
    body: 'Data centers generate constant industrial noise 24 hours a day, 7 days a week — cooling systems, generators, and fans that never stop. Residents near facilities in Loudoun report chronic sleep disruption and declining quality of life.'
  },
  {
    tag: 'Property', tagBg: '#e4f0e8', tagColor: '#1a5a2a',
    title: 'Your Property Values',
    body: 'Homes near data center facilities in Loudoun and Prince William have seen declining resale interest. Realtors report buyers actively avoiding those neighborhoods — your investment is at risk.'
  },
  {
    tag: 'Traffic', tagBg: '#f0ece4', tagColor: '#5a4a1a',
    title: 'Your Roads',
    body: 'Construction and ongoing operations bring heavy truck traffic on rural roads not built for it. Frederick County\'s two-lane roads would bear the cost of that wear with no guarantee of reimbursement.'
  },
  {
    tag: 'Taxes', tagBg: '#e4e8f0', tagColor: '#1a2a5a',
    title: 'Your Tax Burden',
    body: 'Data centers negotiate large tax incentives before they\'re built. The promised revenue rarely materializes — leaving residents to make up the difference while the county still bears the cost of expanded services.'
  },
].map(card => (
  <div key={card.tag} style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '28px', textAlign: 'left' }}>
    <span style={{ display: 'inline-block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', padding: '4px 10px', borderRadius: '3px', marginBottom: '14px', background: card.tagBg, color: card.tagColor }}>
      {card.tag}
    </span>
    <h3 style={{ fontSize: '20px', color: '#1a2e1a', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>{card.title}</h3>
    <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.6' }}>{card.body}</p>
  </div>
))}
        </div>
      </section>

      {/* COMMUNITY VOICES */}
      <section style={{ padding: '80px 40px', background: '#2d4a2d', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>
          Our Community
        </p>
        <h2 style={{ fontSize: '40px', color: '#f5f0e8', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>
          Frederick County Residents Standing Together
        </h2>
        <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 48px' }}>
          Farmers, families, business owners, and neighbors — united to protect what makes Frederick County worth fighting for.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { name: 'Samantha Armel', src: '/members/samantha.jpg', position: 'right top' },
{ name: 'Erin Boyer Fox', src: '/members/erin.jpg', position: 'center top' },
{ name: 'Darla McCrary', src: '/members/darla.jpg', position: 'center top' },
{ name: 'Holly Harrington', src: '/members/holly.jpg', position: 'center top' },
{ name: 'Ashley Matchett', src: '/members/ashley.jpg', position: 'center -20%' },
{ name: 'Jennifer Frey', src: '/members/jennifer.jpg', position: 'center 30%' },
          ].map(person => (
            <div key={person.name} style={{ textAlign: 'center' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 16px',
                border: '3px solid #c8b97a',
                position: 'relative'
              }}>
                <Image
                  src={person.src}
                  alt={person.name}
                  fill
                 style={{ objectFit: 'cover', objectPosition: person.position || 'center top' }}
                />
              </div>
              <p style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif', fontSize: '16px' }}>{person.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEIGHBORS */}
      <section style={{ padding: '80px 40px', background: '#1a2e1a', color: '#f5f0e8', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>
          What neighbors are living with
        </p>
        <h2 style={{ fontSize: '40px', color: '#f5f0e8', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>
          Virginia Counties That Said Yes
        </h2>
        <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 48px' }}>
          Loudoun County is now the world&apos;s largest data center market. Prince William residents are fighting noise and sprawl. Warren County voted no. Frederick County has that same choice — right now.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            {
  county: 'Loudoun County, Virginia',
  label: 'World\'s Largest Data Center Market',
  body: '200+ data centers. 43 million square feet. Drinking water use jumped 250% in four years. High-voltage lines carved through farmland. Supervisors now deny applications — but for most neighborhoods, it\'s already too late.'
},
{
  county: 'Culpeper County, Virginia',
  label: 'Rural County · Now Industrialized',
  body: 'Once a quiet agricultural county, Culpeper approved data center zoning and watched industrial development consume farmland along its major corridors. Residents say the rural character they moved there for is gone.'
},
{
  county: 'Montgomery County, Maryland',
  label: 'Noise & Water Complaints',
  body: 'Residents near data center campuses in Montgomery County have filed repeated complaints about industrial noise, increased truck traffic, and strain on local water resources. Officials acknowledge the concerns but say approvals cannot be reversed.'
},
{
  county: 'Mesa, Arizona',
  label: 'Water Crisis · Drought Region',
  body: 'In one of America\'s driest regions, data centers consume billions of gallons annually. Local farmers and municipalities have fought data center water permits as aquifer levels drop. Frederick County\'s farming community faces the same risk.'
},
{
  county: 'Warren County, Virginia',
  label: 'Voted No · January 2023',
  body: 'The Board of Supervisors voted 5-0 against a zoning change that would have opened the door to data centers. Residents cited threats to water supply and community character. Frederick County has that same choice right now.'
},
{
  county: 'Prince William County, Virginia',
  label: 'Active Community Resistance',
  body: 'Data centers built adjacent to subdivisions generated years of noise complaints and national news coverage. Residents report no one warned them about the noise, the lights, or the traffic. A Loudoun realtor noted in 2025 that no one has ever asked to find a home near a data center. The damage is done.'
},
          ].map(item => (
            <div key={item.county} style={{ background: '#2d4a2d', border: '1px solid #3d5a3d', borderRadius: '6px', padding: '28px', textAlign: 'left' }}>
              <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#c8b97a', marginBottom: '8px' }}>{item.label}</p>
              <h3 style={{ fontSize: '20px', color: '#f5f0e8', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>{item.county}</h3>
              <p style={{ fontSize: '14px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT OFFICIALS */}
      <section id="contact" style={{ padding: '80px 40px', background: '#f5f0e8', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>
          Take action
        </p>
        <h2 style={{ fontSize: '40px', color: '#1a2e1a', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>
          Contact Your Supervisor Today
        </h2>
        <p style={{ fontSize: '16px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 40px' }}>
          Written correspondence becomes part of the official public record. Click any supervisor below to open a pre-written email you can send in seconds.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { name: 'Supervisor Name', district: 'Shawnee District', email: 'supervisor@fcva.us' },
            { name: 'Supervisor Name', district: 'Gainesboro District', email: 'supervisor@fcva.us' },
            { name: 'Supervisor Name', district: 'Back Creek District', email: 'supervisor@fcva.us' },
            { name: 'Supervisor Name', district: 'Opequon District', email: 'supervisor@fcva.us' },
            { name: 'Supervisor Name', district: 'Red Bud District', email: 'supervisor@fcva.us' },
          ].map(sup => (
            <a key={sup.district}
              href={`mailto:${sup.email}?subject=Oppose%20Data%20Center%20Zoning%20in%20Frederick%20County&body=Dear%20${encodeURIComponent(sup.name)}%2C%0A%0AI%20am%20writing%20to%20express%20my%20strong%20opposition%20to%20proposed%20data%20center%20development%20in%20Frederick%20County%2C%20Virginia.%20I%20am%20deeply%20concerned%20about%20the%20impact%20on%20our%20water%20supply%2C%20farmland%2C%20electric%20rates%2C%20and%20rural%20character.%0A%0APlease%20vote%20no%20on%20any%20zoning%20changes%20that%20would%20allow%20large-scale%20data%20centers%20in%20our%20county.%0A%0ASincerely%2C%0A%5BYour%20Name%5D`}
              style={{ display: 'block', background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '20px', textDecoration: 'none', textAlign: 'left' }}>
              <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#4a7c3f', marginBottom: '6px' }}>{sup.district}</p>
              <p style={{ fontSize: '16px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>{sup.name}</p>
              <p style={{ fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif' }}>Click to email →</p>
            </a>
          ))}
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
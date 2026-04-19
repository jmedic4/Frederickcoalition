import Nav from './components/Nav'
import MailingListSignup from './components/MailingListSignup'
import Footer from './components/Footer'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Nav />
      <section style={{ background: '#1a2e1a', color: '#f5f0e8', padding: '100px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', marginBottom: '20px', textTransform: 'uppercase' }}>Frederick County, Virginia</p>
        <h1 style={{ fontSize: '64px', lineHeight: '1.1', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
          Your Water.<br />
          <em style={{ color: '#c8b97a' }}>Your Land.</em><br />
          Your Voice.
        </h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', maxWidth: '560px', margin: '0 auto 40px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>Large-scale data centers are being proposed for Frederick County. Before our farmland and way of life disappear, know the facts.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#action" style={{ background: '#4a7c3f', color: '#f5f0e8', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>Take Action Now</a>
          <a href="/facts" style={{ background: 'transparent', color: '#f5f0e8', border: '1px solid #c8b97a', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>Read the Facts</a>
          <a href="#contact" style={{ background: 'transparent', color: '#f5f0e8', border: '1px solid #c8b97a', padding: '14px 28px', fontSize: '14px', fontFamily: 'sans-serif', borderRadius: '4px', textDecoration: 'none' }}>Contact Officials</a>
        </div>
      </section>

      <div style={{ width: '100%', overflow: 'hidden' }}>
        <img src="/hero-banner.png" alt="Protect Frederick County" style={{ width: '100%', display: 'block' }} />
      </div>

      <section style={{ padding: '80px 40px', background: '#2d4a2d' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Get Involved</p>
            <h2 style={{ fontSize: '40px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>How to Make Your Voice Count</h2>
            <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto' }}>Every action matters. Here is exactly what you can do right now to protect Frederick County.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { step: '01', title: 'Sign the Petition', body: 'Add your name to the official record. Every signature demonstrates to the Board of Supervisors that Frederick County residents are paying attention and standing together.', action: 'Sign Now →', href: '#petition' },
              { step: '02', title: 'Email the Board of Supervisors', body: 'Written correspondence becomes part of the official public record. Use our pre-written email tool to contact your supervisor in under 60 seconds.', action: 'Email Your Supervisor →', href: '#contact' },
              { step: '03', title: 'Email the Planning Commission', body: 'The Planning Commission reviews all zoning changes before they reach the Board. Make sure they hear from you directly — their recommendation carries significant weight.', action: 'Email the Commission →', href: '#planning' },
              { step: '04', title: 'Attend Local Meetings', body: 'Show up in person. Public comment at Board of Supervisors and Planning Commission meetings is the most powerful statement you can make. See our upcoming events for dates.', action: 'See Upcoming Events →', href: '/events' },
              { step: '05', title: 'Request a Yard Sign', body: 'Put a sign in your yard and make your position visible to your neighbors and to anyone driving through. Signs create community — when neighbors see them, they know they are not alone.', action: 'Request a Sign →', href: '/request-sign' },
              { step: '06', title: 'Sign Up for Updates', body: 'Stay informed. When votes are scheduled, when meetings are announced, when action is needed — you will be the first to know. Enter your email to join our mailing list.', action: 'Join the Mailing List →', href: '#newsletter' },
            ].map(item => (
              <div key={item.step} style={{ background: '#1a2e1a', border: '1px solid #3d5a3d', borderRadius: '6px', padding: '28px' }}>
                <p style={{ fontSize: '32px', color: '#c8b97a', fontFamily: 'Georgia, serif', marginBottom: '12px', opacity: 0.6 }}>{item.step}</p>
                <h3 style={{ fontSize: '20px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', marginBottom: '20px' }}>{item.body}</p>
                <a href={item.href} style={{ fontSize: '13px', color: '#c8b97a', fontFamily: 'sans-serif', textDecoration: 'none', borderBottom: '1px solid #c8b97a', paddingBottom: '2px' }}>{item.action}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 40px', background: '#2d4a2d', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Our Community</p>
        <h2 style={{ fontSize: '40px', color: '#f5f0e8', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>Frederick County Residents Standing Together</h2>
        <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 48px' }}>Farmers, families, business owners, and neighbors — united to protect what makes Frederick County worth fighting for.</p>
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
              <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', border: '3px solid #c8b97a', position: 'relative' }}>
                <Image src={person.src} alt={person.name} fill style={{ objectFit: 'cover', objectPosition: person.position || 'center top' }} />
              </div>
              <p style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif', fontSize: '16px' }}>{person.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 40px', background: '#1a2e1a', color: '#f5f0e8', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>What neighbors are living with</p>
        <h2 style={{ fontSize: '40px', color: '#f5f0e8', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>Virginia Counties That Said Yes</h2>
        <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 48px' }}>Loudoun County is now the world&apos;s largest data center market. Prince William residents are fighting noise and sprawl. Warren County voted no. Frederick County has that same choice — right now.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { county: 'Loudoun County, Virginia', label: "World's Largest Data Center Market", body: "200+ data centers. 43 million square feet. Drinking water use jumped 250% in four years. High-voltage lines carved through farmland. Supervisors now deny applications — but for most neighborhoods, it's already too late." },
            { county: 'Culpeper County, Virginia', label: 'Rural County · Now Industrialized', body: 'Once a quiet agricultural county, Culpeper approved data center zoning and watched industrial development consume farmland along its major corridors. Residents say the rural character they moved there for is gone.' },
            { county: 'Montgomery County, Maryland', label: 'Noise & Water Complaints', body: 'Residents near data center campuses in Montgomery County have filed repeated complaints about industrial noise, increased truck traffic, and strain on local water resources. Officials acknowledge the concerns but say approvals cannot be reversed.' },
            { county: 'Mesa, Arizona', label: 'Water Crisis · Drought Region', body: "In one of America's driest regions, data centers consume billions of gallons annually. Local farmers and municipalities have fought data center water permits as aquifer levels drop. Frederick County's farming community faces the same risk." },
            { county: 'Warren County, Virginia', label: 'Voted No · January 2023', body: 'The Board of Supervisors voted 5-0 against a zoning change that would have opened the door to data centers. Residents cited threats to water supply and community character. Frederick County has that same choice right now.' },
            { county: 'Prince William County, Virginia', label: 'Active Community Resistance', body: "Data centers built adjacent to subdivisions generated years of noise complaints and national news coverage. Residents report no one warned them about the noise, the lights, or the traffic. The damage is done." },
          ].map(item => (
            <div key={item.county} style={{ background: '#2d4a2d', border: '1px solid #3d5a3d', borderRadius: '6px', padding: '28px', textAlign: 'left' }}>
              <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#c8b97a', marginBottom: '8px' }}>{item.label}</p>
              <h3 style={{ fontSize: '20px', color: '#f5f0e8', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>{item.county}</h3>
              <p style={{ fontSize: '14px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: '80px 40px', background: '#f5f0e8', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Take action</p>
        <h2 style={{ fontSize: '40px', color: '#1a2e1a', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>Contact the Board of Supervisors</h2>
        <p style={{ fontSize: '16px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 16px' }}>Written correspondence becomes part of the official public record. Click any name below to open a pre-written email addressed directly to them.</p>
        <p style={{ fontSize: '14px', color: '#8a7a6a', fontFamily: 'sans-serif', marginBottom: '40px' }}>107 North Kent Street, Winchester, VA 22601 · (540) 665-6382</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { name: 'John Jewell', district: 'Chairman At-Large', email: 'john.jewell@fcva.us', phone: '540-669-8784' },
            { name: 'Robert Liero', district: 'Shawnee District', email: 'robert.liero@fcva.us', phone: '540-669-8783' },
            { name: 'Al Orndorff', district: 'Back Creek District', email: 'al.orndorff@fcva.us', phone: '540-336-9410' },
            { name: 'Jason C. Aikens', district: 'Gainesboro District', email: 'jason.aikens@fcva.us', phone: '540-336-6234' },
            { name: 'Robert W. Wells', district: 'Opequon District', email: 'rwells@fcva.us', phone: '540-669-8782' },
            { name: 'Mike Guevremont', district: 'Red Bud District', email: 'mike.guevremont@fcva.us', phone: '540-336-8100' },
            { name: 'Gary Oates', district: 'Stonewall District', email: 'gary.oates@fcva.us', phone: '' },
            { name: 'Mike Bollhoefer', district: 'County Administrator', email: 'michael.bollhoefer@fcva.us', phone: '' },
            { name: 'Jay E. Tibbs', district: 'Deputy County Administrator', email: 'jtibbs@fcva.us', phone: '' },
            { name: 'Ann W. Phillips', district: 'Deputy Clerk to the Board', email: 'ann.phillips@fcva.us', phone: '' },
          ].map(sup => (
            <a key={sup.district} href={`mailto:${sup.email}?subject=Oppose%20Data%20Center%20Zoning%20in%20Frederick%20County%2C%20Virginia&body=Dear%20${encodeURIComponent(sup.name)}%2C%0A%0AI%20am%20a%20resident%20of%20Frederick%20County%2C%20Virginia%2C%20and%20I%20am%20writing%20to%20express%20my%20strong%20opposition%20to%20proposed%20large-scale%20data%20center%20development%20in%20our%20county.%0A%0AI%20am%20deeply%20concerned%20about%20the%20documented%20impacts%20on%20our%20water%20supply%2C%20farmland%2C%20electric%20rates%2C%20air%20quality%2C%20and%20rural%20character.%0A%0APlease%20vote%20no%20on%20any%20zoning%20changes%20that%20would%20allow%20large-scale%20data%20centers%20in%20Frederick%20County.%0A%0ASincerely%2C%0A%5BYour%20Name%5D%0A%5BYour%20Address%5D%0AFrederick%20County%2C%20Virginia`}
              style={{ display: 'block', background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '20px', textDecoration: 'none', textAlign: 'left' }}>
              <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#4a7c3f', marginBottom: '6px' }}>{sup.district}</p>
              <p style={{ fontSize: '16px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>{sup.name}</p>
              {sup.phone && <p style={{ fontSize: '12px', color: '#8a7a6a', fontFamily: 'sans-serif', marginBottom: '8px' }}>{sup.phone}</p>}
              <p style={{ fontSize: '13px', color: '#4a7c3f', fontFamily: 'sans-serif' }}>Click to email →</p>
            </a>
          ))}
        </div>
      </section>

      <section id="planning" style={{ padding: '80px 40px', background: '#1a2e1a', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>Also critical</p>
        <h2 style={{ fontSize: '40px', color: '#f5f0e8', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>Contact the Planning Commission</h2>
        <p style={{ fontSize: '16px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 40px' }}>The Planning Commission reviews all zoning applications before they reach the Board of Supervisors. Their recommendation carries significant weight. Make sure they hear from you.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { name: 'Tim Stowe', role: 'Chairman', district: 'Red Bud District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-tim-stowe' },
            { name: 'Roger L. Thomas', role: 'Vice Chairman', district: 'Shawnee District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-roger-thomas' },
            { name: 'Betsy Brumback', role: 'Commissioner', district: 'Back Creek District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-betsy-brumback' },
            { name: 'Jeff McKay', role: 'Commissioner', district: 'Back Creek District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-jeff-mckay' },
            { name: 'Vaughn Whitacre', role: 'Commissioner', district: 'Gainesboro District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-vaughn-whitacre' },
            { name: 'Joseph Crane', role: 'Commissioner', district: 'Gainesboro District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-joseph-crane' },
            { name: 'John Lamanna', role: 'Member at Large', district: 'At Large', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-john-lamanna' },
            { name: 'Thomas Bottorf', role: 'Commissioner', district: 'Opequon District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-thomas-bottorf' },
            { name: 'Kevin Sneddon', role: 'Commissioner', district: 'Opequon District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-kevin-sneddon' },
            { name: 'Charles Markert', role: 'Commissioner', district: 'Red Bud District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-charles-markert' },
            { name: 'Elizabeth Kozel', role: 'Commissioner', district: 'Shawnee District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-elizabeth-kozel' },
            { name: 'Justin Kerns', role: 'Commissioner', district: 'Stonewall District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-justin-kerns' },
            { name: 'Charles S. DeHaven III', role: 'Commissioner', district: 'Stonewall District', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-charles-dehaven' },
            { name: 'Wyatt G. Pearson', role: 'Staff Contact', district: '107 North Kent St', url: 'https://www.fcva.us/departments/planning-development/boards-committees/planning-commission/email-planning-commissioner-wyatt-pearson' },
          ].map(pc => (
            <a key={pc.name} href={pc.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', background: '#2d4a2d', border: '1px solid #3d5a3d', borderRadius: '6px', padding: '20px', textDecoration: 'none', textAlign: 'left' }}>
              <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#c8b97a', marginBottom: '6px' }}>{pc.district}</p>
              <p style={{ fontSize: '16px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>{pc.name}</p>
              <p style={{ fontSize: '12px', color: '#b8b09a', fontFamily: 'sans-serif', marginBottom: '8px' }}>{pc.role}</p>
              <p style={{ fontSize: '13px', color: '#c8b97a', fontFamily: 'sans-serif' }}>Click to contact →</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

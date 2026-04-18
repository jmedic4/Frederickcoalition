import Nav from '../components/Nav'
export default function RequestSign() {
  return (
    <main>
      {/* NAV */}
      <Nav />

      {/* HERO */}
      <section style={{ background: '#1a2e1a', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#c8b97a', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '12px' }}>
          Take Action
        </p>
        <h1 style={{ fontSize: '52px', color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '16px' }}>
          Request a Yard Sign
        </h1>
        <p style={{ fontSize: '18px', color: '#b8b09a', fontFamily: 'sans-serif', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto' }}>
          Make your position visible. When neighbors see signs, they know they are not alone.
        </p>
      </section>

      {/* FORM */}
      <section style={{ padding: '80px 40px', background: '#f5f0e8' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>

          {/* SIGN INFO */}
          <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '28px', marginBottom: '32px', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '120px', height: '120px', background: '#1a2e1a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center', padding: '12px' }}>
                <p style={{ color: '#c8b97a', fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 'bold', lineHeight: '1.3', margin: 0 }}>NO DATA<br/>CENTERS<br/>IN FREDERICK<br/>COUNTY</p>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', color: '#1a2e1a', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>18" × 24" Corrugated Yard Sign</h3>
              <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
                Heavy duty corrugated plastic with metal H-stake. Our signs coordinator will follow up to confirm delivery details. Signs are available for Frederick County residents only.
              </p>
            </div>
          </div>

          {/* YOUR INFO */}
          <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '32px', marginBottom: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>
              Your Information
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Full Name *</label>
                <input type="text" placeholder="Jane Smith" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Email Address *</label>
                <input type="email" placeholder="jane@example.com" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Phone Number *</label>
                <input type="tel" placeholder="(540) 555-0100" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>District *</label>
                <select style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }}>
                  <option>Select your district...</option>
                  <option>Shawnee District</option>
                  <option>Gainesboro District</option>
                  <option>Back Creek District</option>
                  <option>Opequon District</option>
                  <option>Red Bud District</option>
                </select>
              </div>
            </div>
          </div>

          {/* DELIVERY ADDRESS */}
          <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '32px', marginBottom: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '8px' }}>
              Delivery Address
            </p>
            <p style={{ fontSize: '14px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '24px' }}>
              Please provide a valid Frederick County street address. Our coordinator will be in touch to confirm delivery details.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Street Address *</label>
              <input type="text" placeholder="123 Apple Blossom Ln" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>City / Town *</label>
                <input type="text" placeholder="Stephens City" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>ZIP *</label>
                <input type="text" placeholder="22655" style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }} />
              </div>
            </div>
          </div>

          {/* ORDER DETAILS */}
          <div style={{ background: '#fff', border: '1px solid #ddd8cc', borderRadius: '6px', padding: '32px', marginBottom: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#4a7c3f', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '24px' }}>
              Order Details
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>How Many Signs? *</label>
                <select style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Sponsor Signs for Neighbors (optional)</label>
                <select style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2' }}>
                  <option>None</option>
                  <option>1 extra sign</option>
                  <option>2 extra signs</option>
                  <option>5 extra signs</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#5a5040', fontFamily: 'sans-serif', marginBottom: '6px' }}>Anything else we should know? (optional)</label>
              <textarea placeholder="Gate code, best time to deliver, accessibility notes..." rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd8cc', borderRadius: '4px', fontSize: '14px', fontFamily: 'sans-serif', background: '#faf8f2', resize: 'vertical' }} />
            </div>
          </div>

          {/* SUBMIT */}
          <button style={{ width: '100%', background: '#4a7c3f', color: '#f5f0e8', border: 'none', padding: '16px', borderRadius: '4px', fontSize: '16px', fontFamily: 'Georgia, serif', cursor: 'pointer', letterSpacing: '0.5px' }}>
            Submit Sign Request →
          </button>
          <p style={{ fontSize: '13px', color: '#8a7a6a', fontFamily: 'sans-serif', textAlign: 'center', marginTop: '12px' }}>
            Our signs coordinator will contact you within 48 hours to confirm details.
          </p>
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
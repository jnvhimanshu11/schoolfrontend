import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/about',      label: 'About Us' },
  { to: '/programs',   label: 'Programs' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/gallery',    label: 'Gallery' },
  { to: '/admission',  label: 'Admission' },
  { to: '/contact',    label: 'Contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0A1628', color: 'rgba(255,255,255,.75)', paddingTop: 60 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 40, paddingBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800,
              fontSize: 20, color: '#fff', marginBottom: 4 }}>
              ATLAS Playschool & Academy
            </div>
            <div style={{ color: '#FFD600', fontStyle: 'italic',
              fontSize: 13, marginBottom: 16 }}>
              Where Learning Begins
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,.55)',
              marginBottom: 20 }}>
              A premier educational institution providing quality education from
              playschool to Class 10, with special coaching for Navodaya &amp;
              Sainik School entrances.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 10 }}>
              {['💬','📘','📷','▶️'].map((icon, i) => (
                <button key={i} style={{
                  width: 38, height: 38, borderRadius: 10, border: 'none',
                  background: 'rgba(255,255,255,.1)', color: '#fff',
                  fontSize: 16, cursor: 'pointer', transition: '.2s',
                }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'Poppins,sans-serif',
              fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to} style={{ marginBottom: 10 }}>
                  <Link to={to} style={{
                    color: 'rgba(255,255,255,.55)', fontSize: 13,
                    textDecoration: 'none', transition: '.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#FFD600'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.55)'}
                  >
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'Poppins,sans-serif',
              fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
              Programs
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Playschool','Nursery · LKG · UKG','Day Care',
                'Tuition (Class 1–10)','Navodaya Coaching','Sainik School Coaching',
                'CBSE & UP Board'].map(item => (
                <li key={item} style={{
                  color: 'rgba(255,255,255,.55)', fontSize: 13, marginBottom: 10,
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontFamily: 'Poppins,sans-serif',
              fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
              Contact Us
            </h4>
            {[
              { icon: '📍', text: 'Jeevan Singh Building, Near Main Chauraha Highway & Prathma Grameen Bank, Junawai' },
              { icon: '📞', text: '7906446598' },
              { icon: '👨‍🏫', text: 'Pushpendra Yadav (B.Sc | B.Ed | M.Ed)' },
              { icon: '⏰', text: 'Mon–Sat: 8:00 AM – 5:00 PM' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 10,
                marginBottom: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                <span style={{ color: 'rgba(255,255,255,.55)', fontSize: 13,
                  lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
            <button onClick={() => window.open('https://wa.me/917906446598', '_blank')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#25D366', color: '#fff', border: 'none',
                borderRadius: 10, padding: '10px 18px', fontWeight: 700,
                fontSize: 13, cursor: 'pointer', marginTop: 8,
                fontFamily: 'Nunito,sans-serif',
              }}>
              💬 WhatsApp Us
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,.08)',
        padding: '24px 20px', textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', lineHeight: 1.8 }}>
          © 2026 ATLAS Playschool &amp; Academy. All Rights Reserved. |
          Jeevan Singh Building, Near Main Chauraha Highway &amp; Prathma Grameen Bank, Junawai
        </p>

        {/* Developer card */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(255,255,255,.05)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 10, padding: '8px 16px', marginTop: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#0057D9', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 14,
          }}>💻</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>
              Himanshu Soni
            </div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11 }}>
              Full Stack Developer · 📞 9548190094
            </div>
          </div>
        </div>

        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
          Website Designed &amp; Developed by{' '}
          <strong style={{ color: '#FFD600' }}>Himanshu Soni</strong>{' '}
          | Contact:{' '}
          <a href="tel:9548190094"
            style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'none' }}>
            9548190094
          </a>
        </p>
      </div>
    </footer>
  );
}

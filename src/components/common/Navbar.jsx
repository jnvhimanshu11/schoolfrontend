import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { path: '/',           label: 'Home' },
  { path: '/about',      label: 'About' },
  { path: '/programs',   label: 'Programs' },
  { path: '/facilities', label: 'Facilities' },
  { path: '/gallery',    label: 'Gallery' },
  { path: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled,  setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? 'rgba(0,57,163,.97)' : '#0057D9',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.25)' : 'none',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: '.3s',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px', height: 64,
        }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 44, height: 44, background: '#FFD600',
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: 900, fontSize: 18,
              color: '#003FA3', fontFamily: 'Poppins,sans-serif', flexShrink: 0,
            }}>A</div>
            <div>
              <div style={{ color: '#fff', fontFamily: 'Poppins,sans-serif',
                fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>
                ATLAS Playschool & Academy
              </div>
              <div style={{ color: 'rgba(255,255,255,.75)', fontSize: 10, fontStyle: 'italic' }}>
                Where Learning Begins
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}
            className="desktop-nav">
            {NAV_LINKS.map(({ path, label }) => (
              <Link key={path} to={path} style={{
                color: location.pathname === path ? '#FFD600' : 'rgba(255,255,255,.9)',
                textDecoration: 'none', fontWeight: 600, fontSize: 13,
                padding: '8px 12px', borderRadius: 8,
                background: location.pathname === path ? 'rgba(255,255,255,.15)' : 'transparent',
                transition: '.2s',
              }}>
                {label}
              </Link>
            ))}
            <Link to="/admission" style={{
              background: '#FFD600', color: '#003FA3', fontWeight: 700,
              fontSize: 13, padding: '8px 18px', borderRadius: 24,
              textDecoration: 'none', transition: '.2s', marginLeft: 4,
            }}>
              Admission Open!
            </Link>
            <Link to="/admin" style={{
              color: 'rgba(255,255,255,.8)', fontWeight: 600, fontSize: 13,
              padding: '8px 12px', borderRadius: 8, textDecoration: 'none',
              background: 'rgba(255,255,255,.1)', marginLeft: 4,
            }}>
              Admin
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(v => !v)} style={{
            display: 'none', background: 'none', border: 'none',
            color: '#fff', fontSize: 26, cursor: 'pointer',
          }} className="hamburger">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 998,
          background: '#003FA3', padding: '12px 0', boxShadow: '0 8px 24px rgba(0,0,0,.3)',
        }}>
          {NAV_LINKS.map(({ path, label }) => (
            <Link key={path} to={path} style={{
              display: 'block', color: '#fff', textDecoration: 'none',
              fontWeight: 600, fontSize: 15, padding: '12px 24px',
              borderLeft: location.pathname === path ? '4px solid #FFD600' : '4px solid transparent',
              background: location.pathname === path ? 'rgba(255,255,255,.1)' : 'transparent',
            }}>
              {label}
            </Link>
          ))}
          <Link to="/admission" style={{
            display: 'block', margin: '12px 20px 8px', background: '#FFD600',
            color: '#003FA3', textDecoration: 'none', fontWeight: 700,
            padding: '12px 20px', borderRadius: 10, textAlign: 'center',
          }}>
            🎓 Admission Open!
          </Link>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .desktop-nav{display:none!important}
          .hamburger{display:block!important}
        }
      `}</style>
    </>
  );
}

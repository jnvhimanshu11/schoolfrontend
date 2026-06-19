import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MENU = [
  { path: '/admin',             icon: '📊', label: 'Dashboard' },
  { path: '/admin/admissions',  icon: '🎓', label: 'Admissions' },
  { path: '/admin/inquiries',   icon: '📋', label: 'Inquiries' },
  { path: '/admin/gallery',     icon: '🖼️', label: 'Gallery' },
  { path: '/admin/notices',     icon: '📌', label: 'Notices' },
  { path: '/admin/faculty',     icon: '👨‍🏫', label: 'Faculty' },
  { path: '/admin/testimonials',icon: '⭐', label: 'Testimonials' },
  { path: '/admin/settings',    icon: '⚙️', label: 'Settings' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location          = useLocation();
  const navigate          = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) =>
    path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', paddingTop: 0 }}>

      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 60, zIndex: 100,
        background: '#003FA3', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 20px',
        boxShadow: '0 2px 12px rgba(0,0,0,.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setSidebarOpen(v => !v)} style={{
            background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff',
            width: 36, height: 36, borderRadius: 8, cursor: 'pointer', fontSize: 18,
          }}>☰</button>
          <span style={{ color: '#FFD600', fontFamily: 'Poppins,sans-serif',
            fontWeight: 800, fontSize: 16 }}>ATLAS</span>
          <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 13 }}>Admin Panel</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,.7)', fontSize: 13,
            textDecoration: 'none' }}>← View Website</Link>
          <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 13 }}>
            👤 {user?.email}
          </div>
          <button onClick={handleLogout} style={{
            background: 'rgba(239,68,68,.2)', border: '1px solid rgba(239,68,68,.4)',
            color: '#FCA5A5', borderRadius: 8, padding: '6px 14px',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 220 : 60, background: '#001D4A',
        flexShrink: 0, transition: '.3s', overflowX: 'hidden',
        paddingTop: 60, position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 99,
      }}>
        {sidebarOpen && (
          <div style={{ padding: '20px 16px 8px' }}>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              Management
            </div>
          </div>
        )}

        {MENU.map(({ path, icon, label }) => (
          <Link key={path} to={path} style={{
            display: 'flex', alignItems: 'center',
            gap: sidebarOpen ? 12 : 0,
            justifyContent: sidebarOpen ? 'flex-start' : 'center',
            padding: sidebarOpen ? '11px 16px' : '14px 0',
            color: isActive(path) ? '#FFD600' : 'rgba(255,255,255,.7)',
            textDecoration: 'none', fontWeight: 600, fontSize: 14,
            borderLeft: isActive(path) ? '3px solid #FFD600' : '3px solid transparent',
            background: isActive(path) ? 'rgba(255,255,255,.08)' : 'transparent',
            transition: '.2s',
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
            {sidebarOpen && <span>{label}</span>}
          </Link>
        ))}

        {/* Developer credit */}
        {sidebarOpen && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '16px', borderTop: '1px solid rgba(255,255,255,.08)',
          }}>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11, lineHeight: 1.7 }}>
              Designed & Developed by<br />
              <span style={{ color: '#FFD600', fontWeight: 700 }}>Himanshu Soni</span><br />
              <a href="tel:9548190094"
                style={{ color: 'rgba(255,255,255,.35)', fontSize: 10, textDecoration: 'none' }}>
                📞 9548190094
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{
        marginLeft: sidebarOpen ? 220 : 60, flex: 1,
        padding: '80px 28px 40px', transition: '.3s', minWidth: 0,
      }}>
        <Outlet />
        <div style={{
          borderTop: '1px solid #E2E8F0', marginTop: 48,
          paddingTop: 16, textAlign: 'center',
          color: '#94A3B8', fontSize: 12,
        }}>
          Designed &amp; Developed by{' '}
          <strong style={{ color: '#0057D9' }}>Himanshu Soni</strong>{' '}
          | Contact:{' '}
          <a href="tel:9548190094" style={{ color: '#0057D9' }}>9548190094</a>
        </div>
      </div>
    </div>
  );
}

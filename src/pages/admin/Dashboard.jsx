import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

const STATS = [
  { key: 'admissions',  icon: '🎓', label: 'Total Admissions', color: '#0057D9', bg: '#EFF6FF' },
  { key: 'inquiries',   icon: '📋', label: 'Total Inquiries',  color: '#22C55E', bg: '#F0FDF4' },
  { key: 'gallery',     icon: '🖼️', label: 'Gallery Images',  color: '#FF6B00', bg: '#FFF7ED' },
  { key: 'notices',     icon: '📌', label: 'Active Notices',   color: '#7C3AED', bg: '#F3E8FF' },
];

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: '20px 24px',
      boxShadow: '0 2px 12px rgba(0,0,0,.06)',
      borderLeft: `4px solid ${color}`,
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div style={{
        fontFamily: 'Poppins,sans-serif', fontSize: 34,
        fontWeight: 800, color,
      }}>{value ?? '–'}</div>
      <div style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

const RECENT = [
  { name: 'Aarav Sharma',  cls: 'Class 3',  mobile: '9876543210', date: '12 Jun', status: 'CONFIRMED' },
  { name: 'Priya Verma',   cls: 'LKG',      mobile: '9765432109', date: '11 Jun', status: 'PENDING' },
  { name: 'Rohan Yadav',   cls: 'Navodaya', mobile: '9654321098', date: '10 Jun', status: 'CONFIRMED' },
  { name: 'Sneha Patel',   cls: 'Nursery',  mobile: '9543210987', date: '9 Jun',  status: 'UNDER_REVIEW' },
  { name: 'Karan Singh',   cls: 'Class 7',  mobile: '9432109876', date: '8 Jun',  status: 'CONFIRMED' },
];

const STATUS_STYLE = {
  CONFIRMED:    { bg: '#DCFCE7', color: '#166534' },
  PENDING:      { bg: '#FEF9C3', color: '#854D0E' },
  UNDER_REVIEW: { bg: '#DBEAFE', color: '#1E40AF' },
  REJECTED:     { bg: '#FEE2E2', color: '#991B1B' },
};

export default function Dashboard() {
  // In production these would come from API
  const counts = { admissions: 47, inquiries: 23, gallery: 86, notices: 5 };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 22,
            fontWeight: 700, marginBottom: 4 }}>Dashboard</h2>
          <p style={{ color: '#64748B', fontSize: 13 }}>
            Welcome back! Here's what's happening at ATLAS today.
          </p>
        </div>
        <div style={{ color: '#64748B', fontSize: 13 }}>
          📅 {new Date().toLocaleDateString('en-IN', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
        gap: 16, marginBottom: 32 }}>
        {STATS.map(s => (
          <StatCard key={s.key} {...s} value={counts[s.key]} />
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
        gap: 12, marginBottom: 32 }}>
        {[
          { icon: '🎓', label: 'Add Admission',  path: '/admin/admissions' },
          { icon: '📋', label: 'View Inquiries', path: '/admin/inquiries' },
          { icon: '🖼️', label: 'Upload Image',  path: '/admin/gallery' },
          { icon: '📌', label: 'Add Notice',     path: '/admin/notices' },
        ].map(({ icon, label }) => (
          <button key={label} style={{
            background: '#fff', border: '2px solid #E2E8F0',
            borderRadius: 12, padding: '16px 12px', textAlign: 'center',
            cursor: 'pointer', transition: '.2s', fontFamily: 'Nunito,sans-serif',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#0057D9'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontWeight: 700, fontSize: 12, color: '#1E293B' }}>{label}</div>
          </button>
        ))}
      </div>

      {/* Recent admissions table */}
      <div style={{ background: '#fff', borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,.06)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F1F5F9',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 15 }}>
            Recent Admissions
          </h3>
          <span style={{ background: '#EFF6FF', color: '#0057D9', fontSize: 12,
            fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
            Latest 5
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                {['Student Name','Class','Mobile','Date','Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left',
                    color: '#64748B', fontSize: 12, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: .5 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT.map((row, i) => {
                const s = STATUS_STYLE[row.status] || STATUS_STYLE.PENDING;
                return (
                  <tr key={i} style={{ borderTop: '1px solid #F1F5F9' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFBFF'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 600 }}>{row.name}</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>{row.cls}</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>{row.mobile}</td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>{row.date}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: s.bg, color: s.color,
                        fontSize: 11, fontWeight: 700,
                        padding: '4px 10px', borderRadius: 20,
                      }}>
                        {row.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

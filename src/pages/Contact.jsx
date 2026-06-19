import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // await inquiryApi.submit(data)
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <div style={{ paddingTop:64 }}>
      {/* Hero */}
      <div style={{
        background:'linear-gradient(135deg,#0057D9,#003FA3)',
        padding:'80px 20px 60px', textAlign:'center',
      }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(28px,4vw,48px)',
          fontWeight:800, color:'#fff' }}>
          Contact <span style={{color:'#FFD600'}}>Us</span>
        </h1>
        <p style={{ color:'rgba(255,255,255,.8)', fontSize:17, marginTop:12 }}>
          We're here to help — reach out anytime
        </p>
      </div>

      {/* Info cards row */}
      <section style={{ padding:'48px 20px', background:'#F0F4FF' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:48 }}>
            {[
              { icon:'📍', title:'Address', val:'Jeevan Singh Building, Near Main Chauraha Highway & Prathma Grameen Bank, Junawai', color:'#0057D9' },
              { icon:'📞', title:'Phone',   val:'7906446598', color:'#22C55E' },
              { icon:'⏰', title:'Hours',   val:'Mon–Sat: 8:00 AM – 5:00 PM\nSunday: Closed', color:'#FF6B00' },
              { icon:'👨‍🏫', title:'Director', val:'Pushpendra Yadav\nB.Sc | B.Ed | M.Ed', color:'#7C3AED' },
            ].map(({ icon, title, val, color }) => (
              <div key={title} style={{
                background:'#fff', borderRadius:16, padding:24,
                boxShadow:'0 4px 20px rgba(0,87,217,.08)',
                borderTop:`4px solid ${color}`, textAlign:'center',
              }}>
                <div style={{ fontSize:36, marginBottom:10 }}>{icon}</div>
                <h4 style={{ fontFamily:'Poppins,sans-serif', fontWeight:700,
                  fontSize:14, color, marginBottom:8 }}>{title}</h4>
                <p style={{ color:'#475569', fontSize:13, lineHeight:1.6, whiteSpace:'pre-line' }}>
                  {val}
                </p>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>

            {/* Left: info + map */}
            <div>
              <div style={{ background:'#fff', borderRadius:20, padding:32,
                boxShadow:'0 4px 24px rgba(0,87,217,.08)', marginBottom:20 }}>
                <h3 style={{ fontFamily:'Poppins,sans-serif', fontSize:20,
                  fontWeight:700, color:'#0057D9', marginBottom:24 }}>
                  📞 Connect With Us
                </h3>

                <a href="tel:7906446598" style={{
                  display:'flex', alignItems:'center', gap:10, background:'#0057D9',
                  color:'#fff', textDecoration:'none', borderRadius:12,
                  padding:'14px 20px', fontWeight:700, fontSize:15,
                  marginBottom:12, justifyContent:'center',
                }}>
                  📞 Call Now: 7906446598
                </a>
                <button onClick={() => window.open('https://wa.me/917906446598?text=Hello%20ATLAS%20Academy','_blank')} style={{
                  display:'flex', alignItems:'center', gap:10, background:'#25D366',
                  color:'#fff', border:'none', borderRadius:12, padding:'14px 20px',
                  fontWeight:700, fontSize:15, cursor:'pointer', width:'100%',
                  justifyContent:'center', marginBottom:12, fontFamily:'Nunito,sans-serif',
                }}>
                  💬 WhatsApp: 7906446598
                </button>

                <div style={{ borderTop:'1px solid #F1F5F9', paddingTop:20, marginTop:8 }}>
                  <p style={{ fontWeight:700, fontSize:13, marginBottom:8, color:'#1E293B' }}>
                    🔗 Follow Us
                  </p>
                  <div style={{ display:'flex', gap:10 }}>
                    {['📘 Facebook','📷 Instagram','▶️ YouTube'].map(s => (
                      <button key={s} style={{
                        background:'#EFF6FF', color:'#0057D9', border:'none',
                        borderRadius:8, padding:'8px 12px', fontWeight:700,
                        fontSize:12, cursor:'pointer', fontFamily:'Nunito,sans-serif',
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                onClick={() => window.open('https://maps.google.com/?q=Junawai+Uttar+Pradesh','_blank')}
                style={{
                  background:'linear-gradient(135deg,#EFF6FF,#E0F2FE)',
                  borderRadius:20, padding:40, textAlign:'center',
                  cursor:'pointer', border:'2px dashed #BAD0FF', transition:'.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,#DBEAFE,#E0F2FE)'}
                onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg,#EFF6FF,#E0F2FE)'}
              >
                <div style={{ fontSize:48, marginBottom:12 }}>🗺️</div>
                <h4 style={{ fontFamily:'Poppins,sans-serif', fontWeight:700,
                  color:'#0057D9', marginBottom:8 }}>View on Google Maps</h4>
                <p style={{ color:'#475569', fontSize:13, lineHeight:1.6 }}>
                  Jeevan Singh Building, Near Main Chauraha Highway<br/>
                  & Prathma Grameen Bank, Junawai, Uttar Pradesh
                </p>
                <div style={{ marginTop:12, background:'#0057D9', color:'#fff',
                  fontSize:12, fontWeight:700, padding:'6px 16px',
                  borderRadius:20, display:'inline-block' }}>
                  Open in Maps →
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ background:'#fff', borderRadius:20, padding:32,
              boxShadow:'0 4px 24px rgba(0,87,217,.08)' }}>
              <h3 style={{ fontFamily:'Poppins,sans-serif', fontSize:20,
                fontWeight:700, color:'#0057D9', marginBottom:24 }}>
                ✉️ Send Us a Message
              </h3>

              {sent && (
                <div style={{ background:'#DCFCE7', border:'1px solid #86EFAC',
                  borderRadius:10, padding:'12px 16px', color:'#166534',
                  fontWeight:600, fontSize:14, marginBottom:20 }}>
                  ✅ Message sent! We'll reply within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                {[
                  { name:'name',   label:'Your Name *',     type:'text',  ph:'Enter your full name',      req:true },
                  { name:'mobile', label:'Mobile Number *',  type:'tel',   ph:'10-digit mobile number',    req:true },
                  { name:'email',  label:'Email',            type:'email', ph:'Your email address',         req:false },
                ].map(({ name, label, type, ph, req }) => (
                  <div key={name} style={{ marginBottom:16 }}>
                    <label style={{ display:'block', fontWeight:700,
                      fontSize:13, marginBottom:6, color:'#1E293B' }}>{label}</label>
                    <input
                      {...register(name, req ? { required:`${label.replace(' *','')} is required` } : {})}
                      type={type}
                      placeholder={ph}
                      style={{
                        width:'100%', padding:'12px 16px', boxSizing:'border-box',
                        border:`2px solid ${errors[name] ? '#EF4444' : '#E2E8F0'}`,
                        borderRadius:10, fontSize:14, outline:'none',
                        fontFamily:'Nunito,sans-serif',
                      }}
                    />
                    {errors[name] && (
                      <span style={{ color:'#EF4444', fontSize:12, marginTop:4, display:'block' }}>
                        ⚠ {errors[name].message}
                      </span>
                    )}
                  </div>
                ))}

                <div style={{ marginBottom:16 }}>
                  <label style={{ display:'block', fontWeight:700,
                    fontSize:13, marginBottom:6, color:'#1E293B' }}>Subject</label>
                  <select {...register('subject')} style={{
                    width:'100%', padding:'12px 16px', boxSizing:'border-box',
                    border:'2px solid #E2E8F0', borderRadius:10, fontSize:14,
                    outline:'none', fontFamily:'Nunito,sans-serif', background:'#fff',
                  }}>
                    <option>General Inquiry</option>
                    <option>Admission Inquiry</option>
                    <option>Program Details</option>
                    <option>Fee Structure</option>
                    <option>Other</option>
                  </select>
                </div>

                <div style={{ marginBottom:20 }}>
                  <label style={{ display:'block', fontWeight:700,
                    fontSize:13, marginBottom:6, color:'#1E293B' }}>Message *</label>
                  <textarea
                    {...register('message', { required:'Message is required' })}
                    placeholder="Write your message here..."
                    rows={5}
                    style={{
                      width:'100%', padding:'12px 16px', boxSizing:'border-box',
                      border:`2px solid ${errors.message ? '#EF4444' : '#E2E8F0'}`,
                      borderRadius:10, fontSize:14, outline:'none',
                      fontFamily:'Nunito,sans-serif', resize:'vertical',
                    }}
                  />
                  {errors.message && (
                    <span style={{ color:'#EF4444', fontSize:12, marginTop:4, display:'block' }}>
                      ⚠ {errors.message.message}
                    </span>
                  )}
                </div>

                <button type="submit" style={{
                  width:'100%', background:'#0057D9', color:'#fff',
                  fontWeight:700, fontSize:16, padding:'14px',
                  borderRadius:12, border:'none', cursor:'pointer',
                  fontFamily:'Nunito,sans-serif',
                }}>
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:760px){
          div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}
        `}</style>
      </section>
    </div>
  );
}

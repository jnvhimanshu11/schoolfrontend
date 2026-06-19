import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FACILITIES = [
  { icon:'🎭', name:'Activity Based Education', desc:'Learning through fun activities & play', color:'#EFF6FF', accent:'#0057D9' },
  { icon:'💻', name:'E-Learning School',         desc:'Smart classes for smart learning',      color:'#F0FDF4', accent:'#22C55E' },
  { icon:'💡', name:'Creative Education Plan',   desc:'Nurturing imagination & curiosity',     color:'#FFF7ED', accent:'#FF6B00' },
  { icon:'🎁', name:'Surprise Activities',        desc:'Exciting surprises to boost joy',       color:'#F3E8FF', accent:'#7C3AED' },
  { icon:'🔢', name:'Abacus Classes',             desc:'Better calculation, sharper mind',     color:'#FEF9C3', accent:'#CA8A04' },
  { icon:'💃', name:'Dance Classes',              desc:'Rhythm, confidence & expression',      color:'#FDF2F8', accent:'#EC4899' },
  { icon:'🧘', name:'Yoga Classes',              desc:'Healthy body, peaceful mind',           color:'#ECFDF5', accent:'#059669' },
  { icon:'🍎', name:'Afternoon Fruit Serving',   desc:'For health & happy minds',             color:'#FFF1F2', accent:'#E11D48' },
  { icon:'📹', name:'CCTV Surveillance',         desc:'Safe & monitored campus 24/7',         color:'#EFF6FF', accent:'#0057D9' },
  { icon:'👨‍🏫', name:'Best Faculties',            desc:'Experienced, passionate teachers',     color:'#F0FDF4', accent:'#22C55E' },
  { icon:'🛡️', name:'Safe & Secure Environment', desc:'Nurturing environment for all',        color:'#F3E8FF', accent:'#7C3AED' },
];

const PROGRAMS = [
  { icon:'🎒', title:'Playschool',       desc:'Nursery, LKG, UKG & Day Care',                 color:'#0057D9', bg:'#EFF6FF',  path:'/programs', tags:['Nursery','LKG','UKG','Day Care'] },
  { icon:'📖', title:'Academy',          desc:'Academic support & skill development programs', color:'#22C55E', bg:'#F0FDF4',  path:'/programs', tags:['Academic Support','Skill Dev'] },
  { icon:'📐', title:'Tuition Center',   desc:'Classes 1–10 | CBSE & UP Board',               color:'#FF6B00', bg:'#FFF7ED',  path:'/programs', tags:['Maths','Science','English','SST'] },
  { icon:'🏅', title:'Special Coaching', desc:'Navodaya & Sainik School Entrance',             color:'#7C3AED', bg:'#F3E8FF',  path:'/programs', tags:['Navodaya','Sainik School'] },
];

const TESTIMONIALS = [
  { name:'Rajesh Kumar',  role:'Parent of Class 3',  text:'My child has shown tremendous improvement since joining ATLAS. The activity-based learning approach is fantastic!', avatar:'RK' },
  { name:'Priya Sharma',  role:'Parent of Navodaya', text:'The Navodaya coaching is exceptional! My son cleared the entrance exam in the first attempt. Thank you ATLAS!',    avatar:'PS' },
  { name:'Anjali Mishra', role:'Parent of LKG',      text:'ATLAS Playschool made my daughter\'s early learning so joyful. The CCTV and safe environment give us peace of mind.', avatar:'AM' },
];

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}{suffix}</span>;
}

export default function Home() {
  const [activeFac, setActiveFac] = useState(null);

  return (
    <div style={{ paddingTop: 64 }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg,#0057D9 0%,#003FA3 60%,#1a0080 100%)',
        minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* background dots */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)',
          backgroundSize:'32px 32px', pointerEvents:'none',
        }}/>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 20px',
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:48,
          alignItems:'center', width:'100%' }}>

          {/* Left */}
          <div>
            <div style={{
              display:'inline-block', background:'#FFD600', color:'#003FA3',
              fontWeight:700, fontSize:12, padding:'6px 16px', borderRadius:20,
              marginBottom:20, textTransform:'uppercase', letterSpacing:1,
              animation:'pulse 2s infinite',
            }}>
              🎉 Admissions Open 2026–27
            </div>
            <h1 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(30px,4vw,56px)',
              fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:12 }}>
              ATLAS <span style={{color:'#FFD600'}}>Playschool</span><br/>& Academy
            </h1>
            <p style={{ color:'#FFD600', fontStyle:'italic', fontWeight:700,
              fontSize:20, marginBottom:16 }}>✨ Where Learning Begins</p>
            <p style={{ color:'rgba(255,255,255,.85)', fontSize:16, lineHeight:1.8,
              marginBottom:28, maxWidth:480 }}>
              A premier educational institution combining playschool, academy,
              tuition center & special coaching programs. Building strong
              foundations for a bright future.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:36 }}>
              <Link to="/admission" style={{
                background:'#FFD600', color:'#003FA3', fontWeight:700,
                fontSize:16, padding:'14px 28px', borderRadius:30,
                textDecoration:'none', transition:'.2s', display:'inline-block',
              }}>🎓 Apply Now</Link>
              <a href="tel:7906446598" style={{
                display:'flex', alignItems:'center', gap:8,
                background:'transparent', color:'#fff', fontWeight:700,
                fontSize:16, padding:'13px 28px', borderRadius:30,
                border:'2px solid rgba(255,255,255,.6)', textDecoration:'none',
              }}>📞 7906446598</a>
            </div>
            {/* Stats */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
              {[
                { num:1000, suf:'+', lbl:'Happy Students' },
                { num:10,  suf:'+', lbl:'Expert Faculty' },
                { num:10,   suf:'+',  lbl:'Programs' },
              ].map(({ num, suf, lbl }) => (
                <div key={lbl} style={{
                  background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.2)',
                  borderRadius:14, padding:'16px 12px', textAlign:'center',
                  backdropFilter:'blur(8px)',
                }}>
                  <div style={{ fontFamily:'Poppins,sans-serif', fontSize:28,
                    fontWeight:800, color:'#FFD600' }}>
                    <Counter target={num} suffix={suf} />
                  </div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,.8)', fontWeight:600 }}>
                    {lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div style={{
            background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)',
            borderRadius:24, padding:28, backdropFilter:'blur(12px)',
            animation:'float 3s ease-in-out infinite',
          }}>
            <h3 style={{ color:'#FFD600', fontFamily:'Poppins,sans-serif',
              fontSize:18, fontWeight:700, marginBottom:16 }}>
              🏫 Our Programs
            </h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {PROGRAMS.map(p => (
                <div key={p.title} style={{
                  background:'rgba(255,255,255,.12)', borderRadius:12,
                  padding:14, textAlign:'center',
                }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>{p.icon}</div>
                  <div style={{ color:'#fff', fontWeight:700, fontSize:13 }}>{p.title}</div>
                  <div style={{ color:'rgba(255,255,255,.7)', fontSize:11, marginTop:2 }}>{p.desc}</div>
                </div>
              ))}
            </div>
            
          
              
              
             
            
          </div>
        </div>

        <style>{`
          @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,214,0,.5)}50%{box-shadow:0 0 0 10px rgba(255,214,0,0)}}
          @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
          @media(max-width:860px){
            .hero-grid{grid-template-columns:1fr!important}
            .hero-right{display:none!important}
          }
        `}</style>
      </section>

      {/* ── PROGRAMS ─────────────────────────────────── */}
      <section style={{ padding:'80px 20px', background:'#fff' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-block', background:'#EFF6FF', color:'#0057D9',
              fontWeight:700, fontSize:12, padding:'6px 16px', borderRadius:20,
              marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>
              What We Offer
            </div>
            <h2 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(24px,3vw,38px)',
              fontWeight:800, marginBottom:12 }}>
              Our <span style={{color:'#0057D9'}}>Programs</span>
            </h2>
            <p style={{ color:'#475569', fontSize:16, maxWidth:540, margin:'0 auto', lineHeight:1.7 }}>
              Comprehensive educational programs designed for every stage of learning.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:24 }}>
            {PROGRAMS.map(p => (
              <div key={p.title} style={{
                background:'#fff', borderRadius:20, padding:28,
                boxShadow:'0 4px 24px rgba(0,87,217,.1)',
                border:`2px solid transparent`,
                transition:'.3s', cursor:'default',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = p.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
              >
                <div style={{ width:60, height:60, borderRadius:16, background:p.bg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:28, marginBottom:16 }}>
                  {p.icon}
                </div>
                <h3 style={{ fontFamily:'Poppins,sans-serif', fontSize:18,
                  fontWeight:700, color:p.color, marginBottom:8 }}>{p.title}</h3>
                <p style={{ color:'#475569', fontSize:14, lineHeight:1.6, marginBottom:14 }}>
                  {p.desc}
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      background:p.bg, color:p.color,
                      fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ───────────────────────────────── */}
      <section style={{ padding:'80px 20px', background:'#F0F4FF' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-block', background:'#EFF6FF', color:'#0057D9',
              fontWeight:700, fontSize:12, padding:'6px 16px', borderRadius:20,
              marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>
              Why We're Special
            </div>
            <h2 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(24px,3vw,38px)',
              fontWeight:800, marginBottom:12 }}>
              Our Unique <span style={{color:'#0057D9'}}>Facilities</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:20 }}>
            {FACILITIES.map(f => (
              <div key={f.name}
                onMouseEnter={() => setActiveFac(f.name)}
                onMouseLeave={() => setActiveFac(null)}
                style={{
                  background:'#fff', borderRadius:16, padding:'24px 18px',
                  textAlign:'center', cursor:'default',
                  boxShadow: activeFac === f.name
                    ? `0 8px 32px ${f.accent}30`
                    : '0 2px 12px rgba(0,0,0,.06)',
                  transform: activeFac === f.name ? 'translateY(-6px)' : 'none',
                  transition:'.3s', border:`2px solid ${activeFac === f.name ? f.accent : 'transparent'}`,
                }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:f.color,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:26, margin:'0 auto 12px' }}>
                  {f.icon}
                </div>
                <h4 style={{ fontFamily:'Poppins,sans-serif', fontSize:13,
                  fontWeight:700, marginBottom:6, color:'#1E293B' }}>{f.name}</h4>
                <p style={{ fontSize:12, color:'#64748B', lineHeight:1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECTOR ─────────────────────────────────── */}
      <section style={{
        background:'linear-gradient(135deg,#0057D9,#003FA3)',
        padding:'80px 20px',
      }}>
        <div style={{ maxWidth:960, margin:'0 auto',
          display:'grid', gridTemplateColumns:'auto 1fr',
          gap:48, alignItems:'center' }}>
          <div style={{ textAlign:'center' }}>
            <div style={{
              width:180, height:180, borderRadius:'50%',
              background:'rgba(255,255,255,.15)',
              border:'4px solid #FFD600',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:72, margin:'0 auto 16px',
            }}>👨‍🏫</div>
            <div style={{ color:'#FFD600', fontFamily:'Poppins,sans-serif',
              fontWeight:800, fontSize:18 }}>Pushpendra Yadav</div>
            <div style={{ color:'rgba(255,255,255,.75)', fontSize:13, fontWeight:600 }}>
              B.Sc | B.Ed | M.Ed
            </div>
            <div style={{ marginTop:10, background:'#FFD600', color:'#003FA3',
              fontSize:12, fontWeight:700, padding:'4px 16px',
              borderRadius:20, display:'inline-block' }}>Director</div>
          </div>
          <div>
            <div style={{ fontSize:72, color:'#FFD600', fontFamily:'Poppins,sans-serif',
              lineHeight:.8, marginBottom:12 }}>"</div>
            <blockquote style={{ color:'#fff', fontSize:'clamp(16px,2vw,22px)',
              fontStyle:'italic', lineHeight:1.6, marginBottom:20, fontWeight:600 }}>
              Education is the most powerful weapon which you can use to change the world.
            </blockquote>
            <p style={{ color:'rgba(255,255,255,.8)', fontSize:15, lineHeight:1.8 }}>
              At ATLAS Playschool & Academy, we believe every child has infinite potential.
              Our mission is to provide a safe, nurturing, and stimulating environment
              where children develop academically, socially, and emotionally. We combine
              modern teaching methodologies with traditional values to create well-rounded
              individuals ready to face tomorrow's challenges.
            </p>
          </div>
        </div>
        <style>{`@media(max-width:700px){
          section>div[style*="grid-template-columns:auto"]{grid-template-columns:1fr!important}
        `}</style>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section style={{ padding:'80px 20px', background:'#fff' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'inline-block', background:'#EFF6FF', color:'#0057D9',
              fontWeight:700, fontSize:12, padding:'6px 16px', borderRadius:20,
              marginBottom:12, textTransform:'uppercase', letterSpacing:1 }}>
              Parent Reviews
            </div>
            <h2 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(24px,3vw,38px)', fontWeight:800 }}>
              What <span style={{color:'#0057D9'}}>Parents Say</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{
                background:'#fff', borderRadius:20, padding:28,
                boxShadow:'0 4px 24px rgba(0,87,217,.1)',
                position:'relative', overflow:'hidden',
              }}>
                <div style={{ position:'absolute', top:8, right:20, fontSize:80,
                  color:'#EFF6FF', fontFamily:'Poppins,sans-serif', lineHeight:1 }}>"</div>
                <div style={{ color:'#FFD600', fontSize:18, marginBottom:12 }}>★★★★★</div>
                <p style={{ color:'#475569', fontSize:14, lineHeight:1.8, marginBottom:20 }}>
                  {t.text}
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{
                    width:44, height:44, borderRadius:'50%',
                    background:'#EFF6FF', display:'flex', alignItems:'center',
                    justifyContent:'center', fontWeight:700, color:'#0057D9', fontSize:16,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14 }}>{t.name}</div>
                    <div style={{ color:'#64748B', fontSize:12 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADMISSION CTA ────────────────────────────── */}
      <section style={{
        background:'linear-gradient(135deg,#FF6B00,#FFD600)',
        padding:'72px 20px', textAlign:'center',
      }}>
        <div style={{ maxWidth:700, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(24px,4vw,44px)',
            fontWeight:900, color:'#fff', marginBottom:12, textShadow:'0 2px 8px rgba(0,0,0,.1)' }}>
            🎓 Admissions Open 2026–27!
          </h2>
          <p style={{ color:'rgba(255,255,255,.95)', fontSize:17, marginBottom:28, fontWeight:600 }}>
            Limited seats available! Secure your child's future today.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/admission" style={{
              background:'#fff', color:'#0057D9', fontWeight:700, fontSize:16,
              padding:'14px 32px', borderRadius:30, textDecoration:'none', transition:'.2s',
            }}>Apply for Admission</Link>
            <a href="tel:7906446598" style={{
              background:'transparent', color:'#fff', fontWeight:700, fontSize:16,
              padding:'13px 28px', borderRadius:30,
              border:'2px solid rgba(255,255,255,.8)', textDecoration:'none',
            }}>📞 Call: 7906446598</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT QUICK ────────────────────────────── */}
      <section style={{ padding:'80px 20px', background:'#F0F4FF' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(22px,3vw,36px)', fontWeight:800 }}>
              Quick <span style={{color:'#0057D9'}}>Inquiry</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            {/* Info */}
            <div style={{ background:'#fff', borderRadius:20, padding:32,
              boxShadow:'0 4px 24px rgba(0,87,217,.08)' }}>
              <h3 style={{ fontFamily:'Poppins,sans-serif', fontSize:20,
                fontWeight:700, color:'#0057D9', marginBottom:24 }}>📞 Get In Touch</h3>
              {[
                { icon:'📍', label:'Address', val:'Jeevan Singh Building, Near Main Chauraha Highway & Prathma Grameen Bank, Junawai' },
                { icon:'📞', label:'Phone',   val:'7906446598' },
                { icon:'👨‍🏫', label:'Director', val:'Pushpendra Yadav (B.Sc | B.Ed | M.Ed)' },
                { icon:'⏰', label:'Hours',   val:'Mon–Sat: 8:00 AM – 5:00 PM' },
              ].map(({ icon, label, val }) => (
                <div key={label} style={{ display:'flex', gap:14,
                  alignItems:'flex-start', marginBottom:18 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:'#EFF6FF',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:18, flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, marginBottom:2 }}>{label}</div>
                    <div style={{ color:'#475569', fontSize:14, lineHeight:1.5 }}>{val}</div>
                  </div>
                </div>
              ))}
              <button onClick={() => window.open('https://wa.me/917906446598','_blank')} style={{
                display:'flex', alignItems:'center', gap:10, background:'#25D366',
                color:'#fff', border:'none', borderRadius:12, padding:'13px 20px',
                fontWeight:700, fontSize:15, cursor:'pointer', width:'100%',
                justifyContent:'center', fontFamily:'Nunito,sans-serif',
              }}>
                💬 WhatsApp: 7906446598
              </button>
            </div>
            {/* Form */}
            <QuickInquiryForm />
          </div>
        </div>
        <style>{`@media(max-width:760px){
          section div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}
        `}</style>
      </section>
    </div>
  );
}

function QuickInquiryForm() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ studentName:'', parentName:'', mobile:'', program:'', message:'' });

  const handle = async (e) => {
    e.preventDefault();
    // await inquiryApi.submit(form)
    setDone(true);
    setTimeout(() => setDone(false), 5000);
    setForm({ studentName:'', parentName:'', mobile:'', program:'', message:'' });
  };

  return (
    <div style={{ background:'#fff', borderRadius:20, padding:32,
      boxShadow:'0 4px 24px rgba(0,87,217,.08)' }}>
      <h3 style={{ fontFamily:'Poppins,sans-serif', fontSize:20,
        fontWeight:700, color:'#0057D9', marginBottom:24 }}>✉️ Quick Inquiry</h3>
      {done && (
        <div style={{ background:'#DCFCE7', border:'1px solid #86EFAC', borderRadius:10,
          padding:'12px 16px', color:'#166534', fontWeight:600, fontSize:14, marginBottom:16 }}>
          ✅ Thank you! We'll contact you within 24 hours.
        </div>
      )}
      <form onSubmit={handle}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
          <input value={form.studentName} onChange={e => setForm(f => ({...f, studentName:e.target.value}))}
            placeholder="Student Name *" required style={inp} />
          <input value={form.parentName} onChange={e => setForm(f => ({...f, parentName:e.target.value}))}
            placeholder="Parent Name *" required style={inp} />
        </div>
        <input value={form.mobile} onChange={e => setForm(f => ({...f, mobile:e.target.value}))}
          placeholder="Mobile Number *" required style={{...inp, width:'100%', marginBottom:12, boxSizing:'border-box'}} />
        <select value={form.program} onChange={e => setForm(f => ({...f, program:e.target.value}))}
          style={{...inp, width:'100%', marginBottom:12, boxSizing:'border-box'}}>
          <option value="">Select Program</option>
          <option>Playschool (Nursery/LKG/UKG)</option>
          <option>Tuition Center (Class 1-10)</option>
          <option>Navodaya Coaching</option>
          <option>Sainik School Coaching</option>
        </select>
        <textarea value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))}
          placeholder="Your message..." rows={3}
          style={{...inp, width:'100%', marginBottom:16, resize:'vertical', boxSizing:'border-box'}} />
        <button type="submit" style={{
          width:'100%', background:'#0057D9', color:'#fff', fontWeight:700,
          fontSize:15, padding:'14px', borderRadius:12, border:'none',
          cursor:'pointer', fontFamily:'Nunito,sans-serif',
        }}>Send Inquiry →</button>
      </form>
    </div>
  );
}

const inp = {
  padding:'12px 16px', border:'2px solid #E2E8F0', borderRadius:10,
  fontSize:14, fontFamily:'Nunito,sans-serif', color:'#1E293B',
  outline:'none', background:'#fff',
};

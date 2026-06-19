import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { admissionApi } from '../services/api';

const PROGRAMS = [
  'Nursery', 'LKG', 'UKG', 'Day Care',
  'Class 1','Class 2','Class 3','Class 4','Class 5',
  'Class 6','Class 7','Class 8','Class 9','Class 10',
  'Navodaya Coaching (Class 6)', 'Navodaya Coaching (Class 9)',
  'Sainik School Coaching (Class 6)', 'Sainik School Coaching (Class 9)',
];

export default function Admission() {
  const [submitted, setSubmitted]   = useState(false);
  const [serverErr, setServerErr]   = useState('');
  const [loading,   setLoading]     = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerErr('');
      await admissionApi.submit(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerErr(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg,#FF6B00,#FFD600)',
        padding: '80px 20px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(28px,4vw,48px)',
          fontWeight:900, color:'#fff' }}>
          🎓 Admissions <span style={{ background:'#0057D9', padding:'0 12px',
            borderRadius:8 }}>Open!</span>
        </h1>
        <p style={{ color:'rgba(255,255,255,.95)', fontSize:17,
          marginTop:12, fontWeight:600 }}>
          🎉 Limited Seats Available — Hurry Up! | Academic Year 2026–27
        </p>
      </div>

      {/* Form */}
      <div style={{ maxWidth:800, margin:'0 auto', padding:'60px 20px' }}>
        {submitted ? (
          <div style={{ background:'#DCFCE7', border:'1px solid #86EFAC',
            borderRadius:16, padding:40, textAlign:'center' }}>
            <div style={{ fontSize:64 }}>✅</div>
            <h2 style={{ fontFamily:'Poppins,sans-serif', color:'#166534',
              fontSize:24, marginTop:16 }}>
              Application Submitted!
            </h2>
            <p style={{ color:'#166534', marginTop:8, fontSize:16 }}>
              Thank you! Our team will contact you within 24 hours to confirm your admission.
            </p>
            <p style={{ color:'#166534', fontWeight:700, marginTop:12 }}>
              📞 You can also call us directly: 7906446598
            </p>
            <button onClick={() => setSubmitted(false)} style={{
              marginTop:24, background:'#166534', color:'#fff',
              border:'none', borderRadius:10, padding:'12px 32px',
              fontWeight:700, cursor:'pointer', fontSize:15,
            }}>
              Submit Another Application
            </button>
          </div>
        ) : (
          <div style={{ background:'#fff', borderRadius:20,
            boxShadow:'0 4px 24px rgba(0,87,217,.1)', padding:40 }}>
            <h2 style={{ fontFamily:'Poppins,sans-serif', fontSize:24,
              fontWeight:700, color:'#0057D9', marginBottom:28 }}>
              Online Admission Form
            </h2>

            {serverErr && (
              <div style={{ background:'#FEE2E2', border:'1px solid #FCA5A5',
                borderRadius:10, padding:'12px 16px', color:'#991B1B',
                marginBottom:20, fontSize:14 }}>
                ❌ {serverErr}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <Field label="Student Full Name *" error={errors.studentName?.message}>
                  <input {...register('studentName', {
                    required: 'Student name is required',
                    minLength: { value:2, message:'Minimum 2 characters' }
                  })} placeholder="Enter student's full name" />
                </Field>
                <Field label="Parent/Guardian Name *" error={errors.parentName?.message}>
                  <input {...register('parentName', { required: 'Parent name is required' })}
                    placeholder="Enter parent's name" />
                </Field>
                <Field label="Mobile Number *" error={errors.mobile?.message}>
                  <input {...register('mobile', {
                    required: 'Mobile is required',
                    pattern: { value:/^[6-9]\d{9}$/, message:'Enter valid 10-digit number' }
                  })} placeholder="10-digit mobile number" maxLength={10} />
                </Field>
                <Field label="Email Address" error={errors.email?.message}>
                  <input {...register('email', {
                    pattern: { value:/^\S+@\S+$/i, message:'Invalid email' }
                  })} placeholder="Email (optional)" type="email" />
                </Field>
                <Field label="Class / Program *" error={errors.classProgram?.message}>
                  <select {...register('classProgram', { required: 'Please select a program' })}>
                    <option value="">Select Program</option>
                    {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Date of Birth" error={errors.dateOfBirth?.message}>
                  <input {...register('dateOfBirth')} type="date" />
                </Field>
              </div>

              <Field label="Home Address *" error={errors.address?.message} style={{ marginTop:16 }}>
                <textarea {...register('address', { required: 'Address is required' })}
                  placeholder="Enter complete home address" rows={3} />
              </Field>
              <Field label="Previous School (if any)" style={{ marginTop:16 }}>
                <input {...register('prevSchool')} placeholder="Name of previous school" />
              </Field>
              <Field label="Message / Special Requirements" style={{ marginTop:16 }}>
                <textarea {...register('message')} placeholder="Any queries or special requirements..."
                  rows={3} />
              </Field>

              {/* Documents notice */}
              <div style={{ background:'#F0F9FF', borderRadius:10,
                padding:16, margin:'20px 0', border:'1px solid #BAE6FD' }}>
                <p style={{ fontWeight:700, color:'#0369A1', fontSize:13 }}>
                  📋 Documents Required at Admission:
                </p>
                <ul style={{ color:'#0369A1', fontSize:12, marginTop:8,
                  paddingLeft:20, lineHeight:1.8 }}>
                  <li>Birth Certificate</li>
                  <li>Aadhar Card (Student & Parent)</li>
                  <li>Previous School Transfer Certificate (if applicable)</li>
                  <li>Passport Size Photographs (4 copies)</li>
                </ul>
              </div>

              <button type="submit" disabled={loading} style={{
                width:'100%', background: loading ? '#94A3B8' : '#FF6B00',
                color:'#fff', fontWeight:700, fontSize:16,
                padding:'16px 32px', borderRadius:12, border:'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily:'Nunito,sans-serif', transition:'.2s',
              }}>
                {loading ? '⏳ Submitting...' : '🎓 Submit Admission Request →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable field wrapper
function Field({ label, error, children, style = {} }) {
  const inputStyle = {
    width:'100%', padding:'12px 16px',
    border: `2px solid ${error ? '#EF4444' : '#E2E8F0'}`,
    borderRadius:10, fontSize:14, fontFamily:'Nunito,sans-serif',
    color:'#1E293B', outline:'none', background:'#fff',
  };
  return (
    <div style={style}>
      <label style={{ display:'block', fontWeight:700, fontSize:13,
        marginBottom:6, color:'#1E293B' }}>
        {label}
      </label>
      {/* Clone child with style */}
      {typeof children.type === 'string'
        ? { ...children, props: { ...children.props, style: inputStyle } }
        : children
      }
      <div style={{ display:'block', fontWeight:700, fontSize:13,
        marginBottom:6, color:'#1E293B' }}>
        {/* rendered by cloneElement approach below */}
      </div>
      {/* Simple render */}
      <style>{`
        input,select,textarea{
          width:100%;padding:12px 16px;
          border:2px solid ${error ? '#EF4444' : '#E2E8F0'};
          border-radius:10px;font-size:14px;
          font-family:Nunito,sans-serif;color:#1E293B;
          outline:none;background:#fff;box-sizing:border-box;
          transition:.2s;
        }
        input:focus,select:focus,textarea:focus{
          border-color:#0057D9;
        }
        textarea{resize:vertical;min-height:80px}
      `}</style>
      {error && (
        <span style={{ color:'#EF4444', fontSize:12, marginTop:4, display:'block' }}>
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

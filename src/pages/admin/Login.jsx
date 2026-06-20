import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  // step 1 = enter email, step 2 = enter OTP
  const [step, setStep]       = useState(1);
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [info, setInfo]       = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const otpForm = useForm();

  const onSubmitEmail = async ({ email }) => {
    try {
      setLoading(true);
      setError('');
      const res = await requestOtp(email);
      setEmail(email);
      setInfo(res.message || 'OTP sent to your email');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = async ({ otp }) => {
    try {
      setLoading(true);
      setError('');
      await verifyOtp(email, otp);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await requestOtp(email);
      setInfo(res.message || 'A new OTP has been sent');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not resend code right now');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'linear-gradient(135deg,#0057D9,#001D4A)',
      padding: 20,
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '48px 40px',
        width: '100%', maxWidth: 420,
        boxShadow: '0 24px 64px rgba(0,0,0,.3)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, background: '#0057D9', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Poppins,sans-serif', fontWeight: 900, fontSize: 22,
            color: '#FFD600', margin: '0 auto 16px',
          }}>Alas</div>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 22,
            fontWeight: 800, color: '#0057D9', marginBottom: 4 }}>
            ATLAS Admin Panel
          </h1>
          <p style={{ color: '#64748B', fontSize: 14 }}>
            {step === 1
              ? 'Sign in with a one-time code sent to your email'
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#FEE2E2', border: '1px solid #FCA5A5',
            borderRadius: 10, padding: '12px 16px', color: '#991B1B',
            fontSize: 14, marginBottom: 20, textAlign: 'center',
          }}>
            ❌ {error}
          </div>
        )}

        {info && !error && (
          <div style={{
            background: '#DCFCE7', border: '1px solid #86EFAC',
            borderRadius: 10, padding: '12px 16px', color: '#166534',
            fontSize: 14, marginBottom: 20, textAlign: 'center',
          }}>
            ✅ {info}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmitEmail)}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700,
                fontSize: 13, marginBottom: 6, color: '#1E293B' }}>
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
                })}
                type="email"
                placeholder="admin@atlasacademy.in"
                style={{
                  width: '100%', padding: '13px 16px',
                  border: `2px solid ${errors.email ? '#EF4444' : '#E2E8F0'}`,
                  borderRadius: 10, fontSize: 15, outline: 'none',
                  fontFamily: 'Nunito,sans-serif', boxSizing: 'border-box',
                }}
              />
              {errors.email && (
                <span style={{ color: '#EF4444', fontSize: 12, marginTop: 4, display: 'block' }}>
                  ⚠ {errors.email.message}
                </span>
              )}
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', background: loading ? '#94A3B8' : '#0057D9',
              color: '#fff', fontWeight: 700, fontSize: 16,
              padding: '14px 32px', borderRadius: 12, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Nunito,sans-serif', transition: '.2s',
            }}>
              {loading ? '⏳ Sending code...' : '📧 Send Login Code'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={otpForm.handleSubmit(onSubmitOtp)}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700,
                fontSize: 13, marginBottom: 6, color: '#1E293B' }}>
                6-Digit Code
              </label>
              <input
                {...otpForm.register('otp', {
                  required: 'OTP is required',
                  pattern: { value: /^\d{6}$/, message: 'Enter the 6-digit code' },
                })}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="••••••"
                autoFocus
                style={{
                  width: '100%', padding: '13px 16px', letterSpacing: 6,
                  textAlign: 'center', fontSize: 22, fontWeight: 700,
                  border: `2px solid ${otpForm.formState.errors.otp ? '#EF4444' : '#E2E8F0'}`,
                  borderRadius: 10, outline: 'none',
                  fontFamily: 'Nunito,sans-serif', boxSizing: 'border-box',
                }}
              />
              {otpForm.formState.errors.otp && (
                <span style={{ color: '#EF4444', fontSize: 12, marginTop: 4, display: 'block' }}>
                  ⚠ {otpForm.formState.errors.otp.message}
                </span>
              )}
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', background: loading ? '#94A3B8' : '#0057D9',
              color: '#fff', fontWeight: 700, fontSize: 16,
              padding: '14px 32px', borderRadius: 12, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Nunito,sans-serif', transition: '.2s', marginBottom: 12,
            }}>
              {loading ? '⏳ Verifying...' : '🔐 Verify & Sign In'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" onClick={() => setStep(1)} style={{
                background: 'none', border: 'none', color: '#64748B',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Nunito,sans-serif',
              }}>
                ← Use a different email
              </button>
              <button type="button" onClick={handleResend} disabled={loading} style={{
                background: 'none', border: 'none', color: '#0057D9',
                fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Nunito,sans-serif',
              }}>
                Resend code
              </button>
            </div>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: 24, color: '#94A3B8', fontSize: 12 }}>
          Developed by <strong style={{ color: '#0057D9' }}>Himanshu Soni</strong> | 9548190094
        </p>
      </div>
    </div>
  );
}

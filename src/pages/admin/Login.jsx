import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

// ---------------------------------------------------------------------------
// Design notes (kept here so future edits stay consistent):
//
// - Palette: deep navy stage (#001433 -> #002B6B) so the white card reads as
//   a physical object lifted off the page, brand blue (#0057D9) for primary
//   actions, the logo's gold (#FFD600) as a single accent used only for the
//   "unlocked" moment, success green (#0EA95C).
// - Signature element: the whole card has real 3D depth - it tilts toward
//   the cursor (subtle, capped, disabled on touch/reduced-motion), each OTP
//   digit is its own physical "key" that lifts on hover and presses down on
//   focus, and a successful verification triggers a single orchestrated 3D
//   card-flip "unlock" rather than a flat toast.
// - Motion is spent in one place (the unlock moment) and otherwise kept
//   quiet and fast so the form still feels efficient to actually use.
// ---------------------------------------------------------------------------

const OTP_LENGTH = 6;

export default function Login() {
  const { requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = email, 2 = otp
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false); // drives the success flip

  const { register, handleSubmit, formState: { errors } } = useForm();

  // OTP is modeled as an array of single characters so each box can be
  // styled/animated independently, like physical keys.
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState(false);
  const otpRefs = useRef([]);

  // ---- 3D tilt for the card, following the cursor -------------------------
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 0.5, py: 0.5 });
  const reduceMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );

  const handlePointerMove = useCallback((e) => {
    if (reduceMotion.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const maxTilt = 11; // degrees - real parallax needs more swing than a hint of tilt
    setTilt({
      ry: (px - 0.5) * maxTilt * 2,
      rx: -(py - 0.5) * maxTilt * 2,
      px,
      py,
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, px: 0.5, py: 0.5 });
  }, []);

  // how far each layer drifts opposite/with the cursor, in px - bigger
  // number = layer reads as "closer" to the viewer (parallax depth)
  const layerOffset = (depth) => ({
    transform: `translate3d(${(tilt.px - 0.5) * depth}px, ${(tilt.py - 0.5) * depth}px, ${depth}px)`,
  });

  // ---- OTP key handling -----------------------------------------------------
  const focusBox = (i) => otpRefs.current[i]?.focus();

  const handleOtpChange = (i, raw) => {
    const val = raw.replace(/\D/g, '').slice(-1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
    setOtpError(false);
    if (val && i < OTP_LENGTH - 1) focusBox(i + 1);
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      if (otpDigits[i]) {
        // clear current, stay put
        setOtpDigits((prev) => {
          const next = [...prev];
          next[i] = '';
          return next;
        });
      } else if (i > 0) {
        focusBox(i - 1);
        setOtpDigits((prev) => {
          const next = [...prev];
          next[i - 1] = '';
          return next;
        });
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      focusBox(i - 1);
    } else if (e.key === 'ArrowRight' && i < OTP_LENGTH - 1) {
      focusBox(i + 1);
    }
  };

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill('');
    text.split('').forEach((ch, idx) => { next[idx] = ch; });
    setOtpDigits(next);
    focusBox(Math.min(text.length, OTP_LENGTH - 1));
  };

  // ---- submit handlers ------------------------------------------------------
  const onSubmitEmail = async ({ email }) => {
    try {
      setLoading(true);
      setError('');
      const res = await requestOtp(email);
      setEmail(email);
      setInfo(res.message || 'OTP sent to your email');
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      setStep(2);
      setTimeout(() => focusBox(0), 50);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (code) => {
    try {
      setLoading(true);
      setError('');
      await verifyOtp(email, code);
      setUnlocked(true); // play the 3D unlock sequence
    } catch (err) {
      setOtpError(true);
      setError(err.response?.data?.message || 'Invalid or expired code');
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      focusBox(0);
    } finally {
      setLoading(false);
    }
  };

  // auto-submit the instant all 6 digits are present
  useEffect(() => {
    const code = otpDigits.join('');
    if (code.length === OTP_LENGTH && !loading && !unlocked) {
      submitOtp(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpDigits]);

  // once the unlock animation has played, hand off to the app
  useEffect(() => {
    if (!unlocked) return;
    const t = setTimeout(() => navigate('/admin'), 1450);
    return () => clearTimeout(t);
  }, [unlocked, navigate]);

  const handleResend = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await requestOtp(email);
      setInfo(res.message || 'A new OTP has been sent');
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      focusBox(0);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not resend code right now');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.stage}>
      <Backdrop />

      <div
        ref={cardRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        style={{
          ...styles.cardWrap,
          perspective: 900,
        }}
      >
        <div
          style={{
            ...styles.card,
            transform: unlocked
              ? 'rotateY(360deg) rotateX(0deg) scale(1.02)'
              : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: unlocked
              ? 'transform 1.1s cubic-bezier(.22,1,.36,1)'
              : 'transform .15s ease-out',
          }}
        >
          {unlocked ? (
            <UnlockedPanel email={email} />
          ) : (
            <div style={{ ...layerOffset(14), transformStyle: 'preserve-3d' }}>
              <Header step={step} email={email} logoDepth={layerOffset} />

              {error && <Banner tone="error">{error}</Banner>}
              {info && !error && <Banner tone="success">{info}</Banner>}

              {step === 1 && (
                <form onSubmit={handleSubmit(onSubmitEmail)} noValidate>
                  <label style={styles.label}>Email Address</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
                    })}
                    type="email"
                    placeholder="admin@atlasacademy.in"
                    autoFocus
                    style={{
                      ...styles.input,
                      borderColor: errors.email ? '#EF4444' : '#E2E8F0',
                    }}
                  />
                  {errors.email && <FieldError text={errors.email.message} />}

                  <button type="submit" disabled={loading} style={primaryButtonStyle(loading)}>
                    <span style={styles.btnInner}>
                      {loading ? 'Sending code…' : (
                        <>
                          <MailIcon /> Send Login Code
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}

              {step === 2 && (
                <div>
                  <label style={styles.label}>6-Digit Code</label>
                  <div style={styles.otpRow} onPaste={handleOtpPaste}>
                    {otpDigits.map((digit, i) => (
                      <OtpKey
                        key={i}
                        index={i}
                        value={digit}
                        hasError={otpError}
                        disabled={loading}
                        innerRef={(el) => (otpRefs.current[i] = el)}
                        onChange={(v) => handleOtpChange(i, v)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      />
                    ))}
                  </div>

                  {loading && (
                    <p style={styles.verifyingHint}>
                      <Spinner /> Verifying…
                    </p>
                  )}

                  <div style={styles.linkRow}>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setError(''); setInfo(''); }}
                      style={styles.linkBtn}
                    >
                      ← Use a different email
                    </button>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={loading}
                      style={{ ...styles.linkBtn, ...styles.linkBtnStrong, opacity: loading ? .5 : 1 }}
                    >
                      Resend code
                    </button>
                  </div>
                </div>
              )}

              <p style={styles.footer}>
                Developed by <strong style={{ color: '#0057D9' }}>Himanshu Soni</strong> | 9548190094
              </p>
            </div>
          )}
        </div>

        {/* soft contact shadow that scales with tilt, sells the lift */}
        <div
          style={{
            ...styles.shadow,
            transform: `translate(${tilt.ry * 1.4}px, ${10 - tilt.rx * 0.6}px) scale(${unlocked ? 1.06 : 1})`,
            opacity: unlocked ? 0.5 : 0.38,
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function Header({ step, email, logoDepth }) {
  const [logoHover, setLogoHover] = useState(false);

  return (
    <div style={styles.headerWrap}>
      <div
        style={{ position: 'relative', display: 'inline-block', ...logoDepth(26) }}
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
      >
        <div
          style={{
            ...styles.logoBadge,
            transform: logoHover ? 'translateY(-3px) scale(1.06)' : 'translateY(0) scale(1)',
            boxShadow: logoHover
              ? '0 18px 30px rgba(0,87,217,.5)'
              : '0 10px 20px rgba(0,87,217,.35)',
          }}
        >
          Alas
        </div>

        <div
          role="tooltip"
          style={{
            ...styles.logoPopup,
            opacity: logoHover ? 1 : 0,
            transform: logoHover
              ? 'translate(-50%, 0) scale(1)'
              : 'translate(-50%, 6px) scale(.94)',
            pointerEvents: 'none',
          }}
        >
          <div style={styles.logoPopupTitle}>ATLAS Playschool &amp; Academy</div>
          <div style={styles.logoPopupSub}>Secure admin access · verified domain</div>
          <div style={styles.logoPopupArrow} />
        </div>
      </div>

      <h1 style={styles.title}>ATLAS Admin Panel</h1>
      <p style={styles.subtitle}>
        {step === 1
          ? 'Sign in with a one-time code sent to your email'
          : <>Enter the code sent to <strong style={{ color: '#1E293B' }}>{email}</strong></>}
      </p>
    </div>
  );
}

function Banner({ tone, children }) {
  const isError = tone === 'error';
  return (
    <div
      style={{
        background: isError ? '#FEE2E2' : '#DCFCE7',
        border: `1px solid ${isError ? '#FCA5A5' : '#86EFAC'}`,
        color: isError ? '#991B1B' : '#166534',
        borderRadius: 10,
        padding: '12px 16px',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
      }}
    >
      {isError ? '⚠ ' : '✓ '}{children}
    </div>
  );
}

function FieldError({ text }) {
  return (
    <span style={{ color: '#EF4444', fontSize: 12, marginTop: 4, display: 'block' }}>
      ⚠ {text}
    </span>
  );
}

function OtpKey({ index, value, hasError, disabled, innerRef, onChange, onKeyDown }) {
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [justFilled, setJustFilled] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value && !prevValue.current) {
      // digit just landed - trigger a brief 3D "pop" so each keystroke
      // visibly registers, not just a flat color change
      setJustFilled(true);
      const t = setTimeout(() => setJustFilled(false), 220);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
    prevValue.current = value;
  }, [value]);

  // Each digit behaves like a physical key: rests slightly "up", lifts
  // further on hover, presses down while focused, and pops toward the
  // viewer for an instant when a digit actually lands.
  let translateY = focused ? 2 : hover ? -6 : 0;
  let scale = focused ? 0.96 : hover ? 1.07 : 1;
  let rotateX = hover && !focused ? -8 : 0;

  if (justFilled) {
    translateY = -10;
    scale = 1.16;
    rotateX = 14;
  }

  return (
    <input
      ref={innerRef}
      value={value}
      disabled={disabled}
      inputMode="numeric"
      maxLength={1}
      aria-label={`Digit ${index + 1}`}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: 46,
        height: 56,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 800,
        fontFamily: 'Nunito, sans-serif',
        color: '#1E293B',
        borderRadius: 12,
        border: `2px solid ${hasError ? '#EF4444' : focused ? '#0057D9' : justFilled ? '#0057D9' : '#E2E8F0'}`,
        outline: 'none',
        background: '#fff',
        boxSizing: 'border-box',
        transformStyle: 'preserve-3d',
        transform: `perspective(300px) translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`,
        boxShadow: justFilled
          ? '0 18px 26px rgba(0,87,217,.38)'
          : focused
            ? '0 2px 4px rgba(0,87,217,.25)'
            : hover
              ? '0 14px 22px rgba(15,23,42,.2)'
              : '0 3px 8px rgba(15,23,42,.08)',
        transition: justFilled
          ? 'transform .22s cubic-bezier(.34,1.76,.64,1), box-shadow .22s ease, border-color .15s ease'
          : 'transform .15s cubic-bezier(.34,1.56,.64,1), box-shadow .15s ease, border-color .15s ease',
      }}
    />
  );
}

function UnlockedPanel({ email }) {
  return (
    <div style={styles.unlockedWrap}>
      <div style={styles.unlockBadge}>
        <CheckIcon />
      </div>
      <h2 style={styles.unlockTitle}>Access granted</h2>
      <p style={styles.unlockSubtitle}>
        Signed in as <strong style={{ color: '#1E293B' }}>{email}</strong>
      </p>
      <p style={styles.unlockHint}>Taking you to the dashboard…</p>
    </div>
  );
}

function Backdrop() {
  // a couple of soft, slow-drifting glows - ambient only, never distracting
  return (
    <div aria-hidden="true" style={styles.backdrop}>
      <div style={{ ...styles.glow, top: '-10%', left: '-8%', background: '#0057D9' }} />
      <div style={{ ...styles.glow, bottom: '-14%', right: '-10%', background: '#FFD600', opacity: 0.12 }} />
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8, flexShrink: 0 }}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2" />
      <path d="M3 7l9 6 9-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <span style={styles.spinner}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}

function primaryButtonStyle(loading) {
  return {
    width: '100%',
    background: loading ? '#94A3B8' : '#0057D9',
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
    padding: '14px 32px',
    borderRadius: 12,
    border: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontFamily: 'Nunito, sans-serif',
    boxShadow: loading ? 'none' : '0 10px 24px rgba(0,87,217,.32)',
    transition: 'transform .12s ease, box-shadow .12s ease, background .2s ease',
  };
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = {
  stage: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(120% 120% at 50% 0%, #002B6B 0%, #001433 60%, #000B1F 100%)',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  glow: {
    position: 'absolute',
    width: '50vw',
    height: '50vw',
    maxWidth: 600,
    maxHeight: 600,
    borderRadius: '50%',
    filter: 'blur(90px)',
    opacity: 0.18,
  },
  cardWrap: {
    position: 'relative',
    width: '100%',
    maxWidth: 420,
  },
  card: {
    position: 'relative',
    background: '#fff',
    borderRadius: 20,
    padding: '48px 40px',
    width: '100%',
    boxShadow: '0 30px 70px rgba(0,8,30,.55), 0 2px 0 rgba(255,255,255,.6) inset',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  },
  shadow: {
    position: 'absolute',
    left: '6%',
    right: '6%',
    bottom: -22,
    height: 36,
    borderRadius: '50%',
    background: '#000',
    filter: 'blur(22px)',
    transition: 'transform .15s ease-out, opacity .3s ease',
    zIndex: -1,
  },
  headerWrap: { textAlign: 'center', marginBottom: 32, position: 'relative' },
  logoBadge: {
    width: 64,
    height: 64,
    background: '#0057D9',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 900,
    fontSize: 22,
    color: '#FFD600',
    margin: '0 auto 16px',
    boxShadow: '0 10px 20px rgba(0,87,217,.35)',
    transition: 'transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease',
    cursor: 'default',
  },
  logoPopup: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    marginTop: 10,
    width: 220,
    background: '#0F172A',
    borderRadius: 12,
    padding: '12px 14px',
    boxShadow: '0 18px 36px rgba(0,8,30,.4)',
    transition: 'opacity .18s ease, transform .18s cubic-bezier(.34,1.56,.64,1)',
    zIndex: 5,
  },
  logoPopupTitle: {
    color: '#fff',
    fontSize: 12.5,
    fontWeight: 700,
    fontFamily: 'Nunito, sans-serif',
    marginBottom: 3,
  },
  logoPopupSub: {
    color: '#94A3B8',
    fontSize: 11,
    fontFamily: 'Nunito, sans-serif',
  },
  logoPopupArrow: {
    position: 'absolute',
    top: -5,
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: 10,
    height: 10,
    background: '#0F172A',
  },
  title: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 22,
    fontWeight: 800,
    color: '#0057D9',
    marginBottom: 4,
  },
  subtitle: { color: '#64748B', fontSize: 14, lineHeight: 1.5 },
  label: {
    display: 'block',
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 10,
    color: '#1E293B',
  },
  input: {
    width: '100%',
    padding: '13px 16px',
    border: '2px solid #E2E8F0',
    borderRadius: 10,
    fontSize: 15,
    outline: 'none',
    fontFamily: 'Nunito, sans-serif',
    boxSizing: 'border-box',
    marginBottom: 24,
  },
  otpRow: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 16,
  },
  verifyingHint: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748B',
    fontFamily: 'Nunito, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  spinner: {
    width: 14,
    height: 14,
    border: '2px solid #CBD5E1',
    borderTopColor: '#0057D9',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin .7s linear infinite',
  },
  linkRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#64748B',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Nunito, sans-serif',
    padding: 0,
  },
  linkBtnStrong: { color: '#0057D9', fontWeight: 700 },
  footer: { textAlign: 'center', marginTop: 24, color: '#94A3B8', fontSize: 12 },
  btnInner: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },

  unlockedWrap: { textAlign: 'center', padding: '24px 0' },
  unlockBadge: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0EA95C, #0C8A4B)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    boxShadow: '0 14px 28px rgba(14,169,92,.4)',
  },
  unlockTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 22,
    fontWeight: 800,
    color: '#0F172A',
    marginBottom: 8,
  },
  unlockSubtitle: { color: '#475569', fontSize: 14, marginBottom: 4 },
  unlockHint: { color: '#94A3B8', fontSize: 13, marginTop: 16 },
};
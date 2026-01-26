import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import CONFIG from '../config';

const Auth = ({ onAuthSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let endpoint = isSignup
      ? `${CONFIG.API_BASE_URL}/api/signup`
      : `${CONFIG.API_BASE_URL}/api/login`;

    if (isReset) endpoint = `${CONFIG.API_BASE_URL}/api/reset_password`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        if (isReset) {
          alert("Password Reset Successful! Please login with your new password.");
          setIsReset(false);
          setLoading(false);
          return;
        }
        onAuthSuccess(data.user); // Pass full user object
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      if (!isReset) setLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Successfully signed in with Google
      // Ideally you would send this token to your backend to verify and create a session
      // For now, we simulate the 'user object' our app expects
      onAuthSuccess({
        id: "google_" + user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL
      });

    } catch (error) {
      console.error(error);
      setError("Google Sign-In failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background (Consistent with Landing Page) */}
      <div style={styles.gradientOrb1} />
      <div style={styles.gradientOrb2} />
      <div style={styles.gridOverlay} />

      <div style={styles.card}>
        <div style={styles.blob} /> {/* Inner card glow */}

        <h2 style={styles.title}>
          {isReset ? 'Reset Password' : (isSignup ? 'Create Account' : 'Welcome Back')}
        </h2>
        <p style={styles.subtitle}>
          {isReset ? 'Enter your email and new password.' : (isSignup ? 'Join the paperless revolution.' : 'Your digital library awaits.')}
        </p>

        {/* Google Login Button - Hidden during reset */}
        {!isReset && (
          <button
            onClick={handleGoogleLogin}
            style={styles.googleBtn}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="G"
              style={{ width: '20px', height: '20px' }}
            />
            {loading ? 'Connecting...' : 'Continue with Google'}
          </button>
        )}

        {!isReset && (
          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>OR</span>
            <span style={styles.dividerLine}></span>
          </div>
        )}

        {error && <div style={{ color: '#FF6B6B', textAlign: 'center', marginBottom: '15px', background: 'rgba(255,107,107,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignup && !isReset && (
            <input
              type="text"
              placeholder="Full Name"
              style={styles.input}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            style={styles.input}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder={isReset ? "New Password" : "Password"}
            style={styles.input}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <button type="submit" style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Processing...' : (isReset ? 'Update Password' : (isSignup ? 'Sign Up' : 'Sign In'))}
          </button>
        </form>

        {/* Forgot Password Link */}
        {!isSignup && !isReset && (
          <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '13px', color: '#aaa', cursor: 'pointer' }} onClick={() => setIsReset(true)}>
            Forgot Password?
          </p>
        )}

        {/* Toggle View */}
        <p style={styles.toggleText}>
          {isReset ? (
            <span onClick={() => { setIsReset(false); setError(''); }} style={styles.link}>Back to Login</span>
          ) : (
            <>
              {isSignup ? 'Already a member?' : 'New to Papero?'}
              <span onClick={() => { setIsSignup(!isSignup); setError(''); }} style={styles.link}>
                {isSignup ? ' Login here' : ' Create account'}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505',
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif"
  },
  // Background Effects (Matching Landing Page)
  gradientOrb1: {
    position: 'absolute',
    top: '-20%',
    left: '-10%',
    width: '60vw',
    height: '60vw',
    background: 'radial-gradient(circle, rgba(125, 60, 255, 0.2) 0%, rgba(0,0,0,0) 70%)',
    filter: 'blur(80px)',
    zIndex: 1
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '-20%',
    right: '-10%',
    width: '70vw',
    height: '70vw',
    background: 'radial-gradient(circle, rgba(255, 60, 120, 0.15) 0%, rgba(0,0,0,0) 70%)',
    filter: 'blur(80px)',
    zIndex: 1
  },
  gridOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
    backgroundSize: '50px 50px',
    zIndex: 2,
    pointerEvents: 'none'
  },
  // Glassmorphic Card
  card: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '420px',
    padding: '50px',
    borderRadius: '30px',
    background: 'rgba(20, 20, 20, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    animation: 'fadeUp 0.6s ease-out'
  },
  blob: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0,0,0,0) 70%)',
    filter: 'blur(30px)',
    zIndex: -1
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '10px',
    textAlign: 'center',
    letterSpacing: '-1px'
  },
  subtitle: {
    color: '#888',
    marginBottom: '40px',
    textAlign: 'center',
    fontSize: '15px',
    lineHeight: '1.5'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  input: {
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '15px',
    outline: 'none',
    transition: 'border 0.2s',
  },
  submitBtn: {
    marginTop: '10px',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: 'white',
    color: 'black',
    fontWeight: '700',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
  },
  toggleText: { marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#666' },
  link: { color: 'white', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' },

  // Google Btn
  googleBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'white',
    color: '#333',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '25px',
    transition: 'transform 0.2s',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '25px',
    opacity: 0.5
  },
  dividerLine: { height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  dividerText: { color: 'white', fontSize: '12px', fontWeight: 'bold' }
};

// Add Animation Keyframes
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  input:focus { border-color: rgba(255, 255, 255, 0.4) !important; }
`;
document.head.appendChild(styleTag);

export default Auth;
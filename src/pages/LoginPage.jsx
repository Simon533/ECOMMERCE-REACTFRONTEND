import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5192/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        // fallback
      }

      if (!res.ok) throw new Error(data.message || 'Invalid email or password');
      
      // Store JWT Token
      localStorage.setItem('token', data.token || data.accessToken || text);
      
      // Redirect directly to the Products UI
      navigate('/products');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      overflowY: 'auto',
      padding: '20px'
    }}>
      {/* Main White Card Wrapper */}
      <div style={{
        width: '100%',
        maxWidth: '960px',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '40px',
        boxSizing: 'border-box'
      }}>
        
        {/* Left Column: Floating Login Card */}
        <div style={{ flex: '0 0 42%', paddingRight: '30px', zIndex: 10 }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            border: '1px solid #f3f4f6'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>Login</h2>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 24px 0' }}>
              Doesn't have an account yet?{' '}
              <Link to="/signup" style={{ fontWeight: 600, color: '#9333ea', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </p>

            {error && (
              <div style={{ background: '#fff1f2', borderLeft: '4px solid #ef4444', padding: '10px', fontSize: '12px', color: '#b91c1c', marginBottom: '16px', borderRadius: '4px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#374151' }}>Password</label>
                  <Link to="/forgot-password" style={{ fontSize: '11px', fontWeight: 600, color: '#9333ea', textDecoration: 'none' }}>
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter 6 character or more"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: '14px', height: '14px', accentColor: '#9333ea' }}
                />
                <label htmlFor="remember" style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer' }}>
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#9333ea',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
                }}
              >
                {loading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
            </form>

            <div style={{ textAlign: 'center', margin: '20px 0 16px 0', position: 'relative' }}>
              <div style={{ borderTop: '1px solid #e5e7eb', position: 'absolute', top: '50%', width: '100%' }}></div>
              <span style={{ background: '#ffffff', position: 'relative', padding: '0 10px', fontSize: '11px', color: '#9ca3af' }}>or login with</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#4b5563' }}>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>G</span> Google
              </button>
              <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: '#4b5563' }}>
                <span style={{ color: '#2563eb', fontWeight: 700 }}>f</span> Facebook
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Desk Workspace Illustration */}
        <div style={{ flex: '0 0 58%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/female-developer-working-on-project-4488062-3738484.png"
            alt="Developer Illustration"
            style={{ width: '100%', maxWidth: '480px', height: 'auto', objectFit: 'contain' }}
          />
        </div>

      </div>
    </div>
  );
}
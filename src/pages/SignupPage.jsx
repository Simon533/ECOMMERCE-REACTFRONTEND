import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5192/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
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
        
        {/* Left Column: Signup Card */}
        <div style={{ flex: '0 0 45%', paddingRight: '30px', zIndex: 10 }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            border: '1px solid #f3f4f6'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>Sign Up</h2>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 20px 0' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ fontWeight: 600, color: '#9333ea', textDecoration: 'none' }}>
                Login
              </Link>
            </p>

            {error && (
              <div style={{ background: '#fff1f2', borderLeft: '4px solid #ef4444', padding: '10px', fontSize: '12px', color: '#b91c1c', marginBottom: '14px', borderRadius: '4px' }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ background: '#ecfdf5', borderLeft: '4px solid #10b981', padding: '10px', fontSize: '12px', color: '#047857', marginBottom: '14px', borderRadius: '4px' }}>
                {success}
              </div>
            )}

            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '12px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '12px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '12px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '11px',
                  background: '#9333ea',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  marginTop: '6px',
                  boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
                }}
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div style={{ flex: '0 0 55%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-4488056-3738478.png"
            alt="Signup Illustration"
            style={{ width: '100%', maxWidth: '460px', height: 'auto', objectFit: 'contain' }}
          />
        </div>

      </div>
    </div>
  );
}
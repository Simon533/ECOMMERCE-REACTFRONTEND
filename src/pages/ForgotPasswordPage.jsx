import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter New Password
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(''); // Stored silently behind the scenes! token
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Request Password Reset & Automatically Capture Token
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5192/api/Auth/ForgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {}

      if (!res.ok) {
        throw new Error(data.message || 'Failed to process password reset request.');
      }

      // Automatically capture the token from the backend JSON response
      const receivedToken = data.token || data.resetToken;
      if (receivedToken) {
        setToken(receivedToken);
      } else {
        throw new Error('No reset token returned from server.');
      }

      setMessage('Email verified successfully! Please enter your new password.');
      setStep(2); // Automatically advance to Step 2
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit New Password Using the Silently Stored Token
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5192/api/Auth/ResetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          token: token,         // Automatically pulled from state!
          newPassword: newPassword
        })
      });

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {}

      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password.');
      }

      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
        maxWidth: '480px',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '40px',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>
          {step === 1 ? 'Forgot Password' : 'Reset Password'}
        </h2>
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 24px 0' }}>
          {step === 1 
            ? "Enter your registered email address to receive reset instructions."
            : "Enter your new secure password below."}
        </p>

        {error && (
          <div style={{ background: '#fff1f2', borderLeft: '4px solid #ef4444', padding: '10px', fontSize: '12px', color: '#b91c1c', marginBottom: '16px', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ background: '#f0fdf4', borderLeft: '4px solid #22c55e', padding: '10px', fontSize: '12px', color: '#15803d', marginBottom: '16px', borderRadius: '4px' }}>
            {message}
          </div>
        )}

        {step === 1 ? (
          // STEP 1 FORM: Email Input Only
          <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                placeholder="2admin@gmail.com"
              />
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
              {loading ? 'VERIFYING...' : 'CONTINUE'}
            </button>
          </form>
        ) : (
          // STEP 2 FORM: New Password Input Only (Token hidden in background state)
          <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                placeholder="Enter new password (min 6 characters)"
              />
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
              {loading ? 'RESETTING...' : 'UPDATE PASSWORD'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" style={{ fontSize: '12px', fontWeight: 600, color: '#9333ea', textDecoration: 'none' }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
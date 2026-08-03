import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Shield, Eye, EyeOff, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginPage({ onNavigate }) {
  const { login } = useContext(AppContext);
  const [role, setRole] = useState('Hospital');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simulated validations
    if (!username || username.trim().length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    login(role, username);
    
    // Redirect based on role
    if (role === 'Hospital') {
      onNavigate('hospital');
    } else if (role === 'Driver') {
      onNavigate('driver');
    } else if (role === 'Police') {
      onNavigate('police');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      setError('Please fill in your username/email.');
      return;
    }
    setResetSent(true);
    setError('');
  };

  return (
    <div className="animate-fade" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      padding: '2rem'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        
        {/* Back Link */}
        <button 
          onClick={() => forgotPassword ? setForgotPassword(false) : onNavigate('landing')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            padding: 0
          }}
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Shield size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Officer Verification Portal</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Smart Corridor Management Credentials
          </p>
        </div>

        {error && (
          <div className="animate-fade" style={{
            backgroundColor: 'var(--danger-light)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem',
            color: 'var(--danger)',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {forgotPassword ? (
          resetSent ? (
            <div className="animate-fade" style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
                Reset Instruction Dispatched!
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Temporary token credentials sent to registered device linked with "{username}".
              </p>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => {
                setForgotPassword(false);
                setResetSent(false);
              }}>
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit}>
              <div className="form-group">
                <label className="form-label">Username or Registered Email</label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} size={16} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter email or ID"
                    style={{ paddingLeft: '2.25rem' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Send Password Reset Token
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Role Selection Tabs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0.25rem',
              backgroundColor: '#f1f5f9',
              padding: '0.25rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem'
            }}>
              {['Hospital', 'Driver', 'Police'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={{
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: role === r ? '#ffffff' : 'transparent',
                    color: role === r ? 'var(--text-main)' : 'var(--text-muted)',
                    boxShadow: role === r ? 'var(--shadow-sm)' : 'none',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Input Details */}
            <div className="form-group">
              <label className="form-label">Officer Username</label>
              <div style={{ position: 'relative' }}>
                <User style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} size={16} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dr. Robert Vance"
                  style={{ paddingLeft: '2.25rem' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Security Key</label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="••••••••"
                  style={{ paddingLeft: '2.25rem', paddingRight: '2.25rem' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me / Forgot */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Session</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
              >
                Forgot Credentials?
              </button>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Verify and Access Workspace
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  X,
  ShieldCheck
} from 'lucide-react';
import { signInUser, signUpUser } from '../services/supabaseService';

export const LoginPage = ({ onLoginSuccess, onClose, isModal = false }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [noticeMsg, setNoticeMsg] = useState('');

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setNoticeMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const res = await signUpUser(email, password);
        if (res.success) {
          if (res.notice) setNoticeMsg(res.notice);
          setTimeout(() => {
            onLoginSuccess(res.user);
          }, res.notice ? 1200 : 300);
        } else {
          setErrorMsg(res.error || 'Failed to sign up.');
        }
      } else {
        const res = await signInUser(email, password);
        if (res.success) {
          if (res.notice) setNoticeMsg(res.notice);
          setTimeout(() => {
            onLoginSuccess(res.user);
          }, res.notice ? 1200 : 300);
        } else {
          setErrorMsg(res.error || 'Invalid credentials or user not found.');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail = 'mathan@caprae.com') => {
    setEmail(demoEmail);
    setPassword('demoPass123!');
    setLoading(true);
    setErrorMsg('');

    const res = await signInUser(demoEmail, 'demoPass123!');
    if (res.success) {
      onLoginSuccess(res.user);
    }
    setLoading(false);
  };

  return (
    <div className={isModal ? "login-modal-backdrop" : "login-page-container"}>
      <div className="login-card">
        {isModal && onClose && (
          <button className="login-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        )}

        <div className="login-header">
          <div className="login-logo-badge">
            <Database className="badge-logo-icon" />
          </div>
          <h1 className="login-main-title">
            SaaSquatch <span className="highlight-text">Leads</span>
          </h1>
          <p className="login-subtitle">
            {isSignUp ? 'Create your account to get started' : 'Sign in to access your leads and searches'}
          </p>
        </div>

        {errorMsg && (
          <div className="auth-alert error-alert">
            <AlertCircle size={16} className="alert-icon" />
            <span>{errorMsg}</span>
          </div>
        )}

        {noticeMsg && (
          <div className="auth-alert notice-alert">
            <Sparkles size={16} className="alert-icon" />
            <span>{noticeMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <div className="form-field">
              <label className="field-label">Full Name</label>
              <div className="input-with-icon">
                <User className="input-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="e.g. Mathan Kumar" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="auth-input"
                />
              </div>
            </div>
          )}

          <div className="form-field">
            <label className="field-label">Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="field-label">Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder="••••••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="auth-submit-btn"
          >
            {loading ? (
              <>
                <RefreshCw className="spinning" size={18} /> Authenticating...
              </>
            ) : (
              <>
                {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Demo Fast Login */}
        <div className="demo-actions">
          <button 
            type="button" 
            onClick={() => handleDemoLogin('mathan@caprae.com')}
            className="demo-login-btn"
          >
            <Sparkles size={16} className="btn-sparkle" /> Quick Login as Mathan (Demo)
          </button>
        </div>

        <div className="toggle-auth-footer">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => { setIsSignUp(false); setErrorMsg(''); setNoticeMsg(''); }} 
                className="link-switch-btn"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => { setIsSignUp(true); setErrorMsg(''); setNoticeMsg(''); }} 
                className="link-switch-btn"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

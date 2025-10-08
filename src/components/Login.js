import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    // Simulate login API call with delay
    setTimeout(() => {
      if (email && password) {
        // Store user info in localStorage to simulate login
        const userName = email.split('@')[0];
        localStorage.setItem('user', JSON.stringify({ 
          email, 
          name: userName.charAt(0).toUpperCase() + userName.slice(1),
          avatar: null,
          joinedDate: new Date().toISOString()
        }));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Trigger auth change event immediately
        window.dispatchEvent(new Event('authChange'));
        
        // Use replace instead of push to prevent back button issues
        navigate('/', { replace: true });
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* StoryWave Brand Header */}
        <div className="auth-brand">
          <div className="auth-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sw-grad-auth" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa"/>
                  <stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="20" fill="url(#sw-grad-auth)" opacity="0.25"/>
              <path d="M10 26c4-2 6-4 10-4s6 2 10 2 6-2 8-3" fill="none" stroke="url(#sw-grad-auth)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M16 18l6-6" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="22" cy="12" r="2" fill="#0ea5e9"/>
            </svg>
          </div>
          <h1 className="auth-title">
            <span className="brand-primary">Story</span>
            <span className="brand-accent">Wave</span>
          </h1>
          <p className="auth-subtitle">Share your stories, inspire the world</p>
        </div>
        
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" className={`auth-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Signing In...
              </>
            ) : 'Sign In'}
          </button>
        </form>
        <div className="auth-footer">
          <p>New to StoryWave? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
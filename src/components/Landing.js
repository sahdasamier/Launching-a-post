import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        {/* StoryWave Brand Header */}
        <div className="landing-brand">
          <div className="landing-logo">
            <svg width="80" height="80" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sw-grad-landing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa"/>
                  <stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="20" fill="url(#sw-grad-landing)" opacity="0.25"/>
              <path d="M10 26c4-2 6-4 10-4s6 2 10 2 6-2 8-3" fill="none" stroke="url(#sw-grad-landing)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M16 18l6-6" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="22" cy="12" r="2" fill="#0ea5e9"/>
            </svg>
          </div>
          <h1 className="landing-title">
            <span className="brand-primary">Story</span>
            <span className="brand-accent">Wave</span>
          </h1>
          <p className="landing-subtitle">
            Share your stories, inspire the world, and connect with a community of passionate storytellers.
          </p>
        </div>
        
        <div className="landing-actions">
          <button 
            className="landing-btn primary" 
            onClick={() => navigate('/signup')}
          >
            Join StoryWave
          </button>
          <button 
            className="landing-btn secondary" 
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
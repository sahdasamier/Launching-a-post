import React, { useEffect, useState } from 'react';

const NavBar = ({ dark, setDark, onCreateClick, onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="main navigation">
      <div className="brand">
        <div className="logo" aria-hidden>
          <svg width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sw-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60a5fa"/>
                <stop offset="100%" stopColor="#6366f1"/>
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="20" fill="url(#sw-grad)" opacity="0.25"/>
            <path d="M10 26c4-2 6-4 10-4s6 2 10 2 6-2 8-3" fill="none" stroke="url(#sw-grad)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M16 18l6-6" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="22" cy="12" r="2" fill="#0ea5e9"/>
          </svg>
        </div>
        <div className="name"><span className="brand-primary">Story</span><span className="brand-accent">Wave</span></div>
      </div>
      <form className="nav-search" onSubmit={submitSearch} role="search">
        <input
          type="search"
          placeholder="Search stories..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          aria-label="Search stories"
        />
      </form>
      <div className="nav-actions">
        <button className="create-btn" onClick={onCreateClick}>Create</button>
        <button className="toggle-theme" onClick={() => setDark(!dark)}>
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;



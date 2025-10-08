import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ dark, setDark, onCreateClick, onSearch, compact = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    avatar: null,
    isLoggedIn: false
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);
    
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (storedUser && isLoggedIn) {
      const userData = JSON.parse(storedUser);
      setUser({
        name: userData.name || 'User',
        avatar: userData.avatar || null,
        isLoggedIn: true
      });
    }
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setUser({
      name: 'John Doe',
      avatar: null,
      isLoggedIn: false
    });
    
    // Trigger auth change event
    window.dispatchEvent(new Event('authChange'));
    
    navigate('/welcome', { replace: true });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${compact ? 'compact' : ''}`} role="navigation" aria-label="main navigation">
      <div className="navbar-inner">
        {!compact && (
          <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} title="Go to Home">
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
            {!isMobile && (
              <div className="name">
                <span className="brand-primary">Story</span>
                <span className="brand-accent">Wave</span>
              </div>
            )}
          </div>
        )}
        
        {!isMobile && (
          <form className="nav-search" onSubmit={submitSearch} role="search">
            <input
              type="search"
              placeholder="Search stories..."
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              aria-label="Search stories"
            />
          </form>
        )}
        
        <div className="nav-actions">
          <button className="create-btn" onClick={() => onCreateClick ? onCreateClick() : navigate('/create')} title="Create a new post">
            {isMobile ? '+' : 'Create'}
          </button>
          {user.isLoggedIn ? (
            <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <button onClick={() => navigate('/profile')}>Profile</button>
                  <button onClick={() => setDark(!dark)}>
                    {dark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className="toggle-theme" onClick={() => navigate('/login')}>
              Login
            </button>
          )}
        </div>
      </div>
      
      {isMobile && (
        <div className="mobile-search-container">
          <form className="nav-search" onSubmit={submitSearch} role="search">
            <input
              type="search"
              placeholder="Search stories..."
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              aria-label="Search stories"
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
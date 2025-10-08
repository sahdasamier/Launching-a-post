import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ dark, setDark }) => {
  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (storedUser && isLoggedIn) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('authChange'));
    navigate('/welcome', { replace: true });
  };

  const menuItems = [
    {
      icon: '🏠',
      label: 'Home',
      path: '/',
      active: location.pathname === '/'
    },
    {
      icon: '🔍',
      label: 'Discover',
      path: '/discover',
      active: location.pathname === '/discover'
    },
    {
      icon: '✏️',
      label: 'Create Story',
      path: '/create',
      active: location.pathname === '/create'
    },
    {
      icon: '👤',
      label: 'Profile',
      path: '/profile',
      active: location.pathname === '/profile'
    }
  ];

  const getUserInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand" onClick={() => navigate('/')}>
          <div className="sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sw-grad-sidebar" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa"/>
                  <stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="20" fill="url(#sw-grad-sidebar)" opacity="0.25"/>
              <path d="M10 26c4-2 6-4 10-4s6 2 10 2 6-2 8-3" fill="none" stroke="url(#sw-grad-sidebar)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M16 18l6-6" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="22" cy="12" r="2" fill="#0ea5e9"/>
            </svg>
          </div>
          {!isCollapsed && (
            <div className="sidebar-brand-text">
              <span className="brand-primary">Story</span>
              <span className="brand-accent">Wave</span>
            </div>
          )}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className={`sidebar-nav-item ${item.active ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {user && (
          <div className="sidebar-user">
            <div className="sidebar-user-info">
              <div className="sidebar-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  getUserInitial()
                )}
              </div>
              {!isCollapsed && (
                <div className="sidebar-user-details">
                  <div className="sidebar-user-name">{user.name}</div>
                  <div className="sidebar-user-email">{user.email}</div>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div className="sidebar-user-actions">
                <button 
                  className="sidebar-action-btn"
                  onClick={() => setDark(!dark)}
                  title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {dark ? '☀️' : '🌙'}
                </button>
                <button 
                  className="sidebar-action-btn logout"
                  onClick={handleLogout}
                  title="Logout"
                >
                  🚪
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
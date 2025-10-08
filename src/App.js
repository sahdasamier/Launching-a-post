import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import NavBar from './components/NavBar';

function App() {
  const [dark, setDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const user = localStorage.getItem('user');
      setIsLoggedIn(loggedIn && user);
      setIsLoading(false);
    };
    
    checkAuthStatus();
    
    // Listen for storage changes (e.g., login/logout in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      );
    }
    return isLoggedIn ? children : <Navigate to="/welcome" replace />;
  };
  
  // Public route component (redirects to dashboard if logged in)
  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      );
    }
    return !isLoggedIn ? children : <Navigate to="/" replace />;
  };
  
  if (isLoading) {
    return (
      <div className={`App ${dark ? 'dark' : ''}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`App ${dark ? 'dark' : ''}`}>
      <Routes>
        {/* Public Routes */}
        <Route path="/welcome" element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard dark={dark} setDark={setDark} />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <>
              <NavBar dark={dark} setDark={setDark} onCreateClick={() => {}} onSearch={() => {}} />
              <Profile />
            </>
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={
          isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/welcome" replace />
        } />
      </Routes>
    </div>
  );
}

export default App;
import React from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

const Layout = ({ children, dark, setDark, onCreateClick, onSearch, showSidebar = true }) => {
  return (
    <div className="app-layout">
      {showSidebar && <Sidebar dark={dark} setDark={setDark} />}
      <div className={`main-content ${showSidebar ? 'with-sidebar' : 'full-width'}`}>
        <NavBar 
          dark={dark} 
          setDark={setDark} 
          onCreateClick={onCreateClick} 
          onSearch={onSearch}
          compact={showSidebar}
        />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
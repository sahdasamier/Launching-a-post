import React from 'react';
import NavBar from './NavBar';
import ToPost from './ToPost';
import TodoForm from './Todoform';

const Dashboard = ({ dark, setDark }) => {
  const scrollToForm = () => {
    const el = document.getElementById('create-form');
    if (el) { 
      el.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    }
  };
  
  const onSearch = (q) => {
    // Placeholder hook for future search integration
    console.log('Search query:', q);
  };

  return (
    <>
      <NavBar 
        dark={dark} 
        setDark={setDark} 
        onCreateClick={scrollToForm} 
        onSearch={onSearch} 
      />
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1 style={{display:'none'}}>Share your favorite story</h1>
          <p className="subtitle">
            Inspire others with moments that matter — add a title, your story, and an optional photo.
          </p>
        </div>
        
        {/* Post Creation Form */}
        <ToPost />
        
        {/* Posts Feed */}
        <div className="posts-feed">
          <TodoForm />
        </div>
        
        {/* Floating Action Button */}
        <button 
          className="fab" 
          onClick={scrollToForm} 
          aria-label="Create Post"
        >
          ＋
        </button>
      </div>
    </>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import TodoForm from './Todoform';

const Dashboard = ({ dark, setDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleCreateClick = () => {
    navigate('/create');
  };
  
  const onSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  return (
    <Layout 
      dark={dark} 
      setDark={setDark} 
      onCreateClick={handleCreateClick} 
      onSearch={onSearch}
    >
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1 className="page-title">Discover Stories</h1>
          <p className="page-subtitle">
            Explore amazing stories from our community of storytellers
          </p>
        </div>
        
        {/* Story Prompt */}
        <div className="story-prompt" onClick={handleCreateClick}>
          <div className="prompt-content">
            <div className="prompt-icon">✏️</div>
            <div className="prompt-text">
              <h3>I want to add my story</h3>
              <p>Share your thoughts, experiences, and stories with the community</p>
            </div>
            <div className="prompt-arrow">→</div>
          </div>
        </div>
        
        {/* Posts Feed */}
        <div className="posts-section">
          <div className="section-header">
            <h2>Latest Stories</h2>
            {searchQuery && (
              <span className="search-indicator">
                Showing results for "{searchQuery}"
              </span>
            )}
          </div>
          <div className="posts-feed">
            <TodoForm searchQuery={searchQuery} />
          </div>
        </div>
        
        {/* Floating Action Button */}
        <button 
          className="fab" 
          onClick={handleCreateClick} 
          aria-label="Create Post"
        >
          ＋
        </button>
      </div>
    </Layout>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { followUser, unfollowUser } from '../redux/UserSlice';
import Layout from './Layout';

const Discover = ({ dark, setDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { users } = useSelector(state => state.users);
  const allPosts = useSelector(state => state.toposts);

  useEffect(() => {
    // Load current user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUser(userData);
    }
  }, []);

  const filteredUsers = users.filter(user => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return user.name.toLowerCase().includes(query) ||
           user.bio.toLowerCase().includes(query);
  }).filter(user => user.email !== currentUser?.email); // Exclude current user

  const isFollowing = (userId) => {
    if (!currentUser) return false;
    const currentUserData = users.find(u => u.email === currentUser.email);
    return currentUserData?.following?.includes(userId) || false;
  };

  const handleFollow = (userId) => {
    if (!currentUser) return;
    const currentUserData = users.find(u => u.email === currentUser.email);
    if (!currentUserData) return;

    if (isFollowing(userId)) {
      dispatch(unfollowUser({ 
        followerId: currentUserData.id, 
        followeeId: userId 
      }));
    } else {
      dispatch(followUser({ 
        followerId: currentUserData.id, 
        followeeId: userId 
      }));
    }
  };

  const getUserPostCount = (userName) => {
    return allPosts.filter(post => post.author === userName).length;
  };

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleCreateClick = () => {
    navigate('/create');
  };

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Layout 
      dark={dark} 
      setDark={setDark} 
      onCreateClick={handleCreateClick} 
      onSearch={onSearch}
    >
      <div className="discover-page">
        <div className="discover-header">
          <h1 className="page-title">Discover Storytellers</h1>
          <p className="page-subtitle">
            Connect with amazing writers and discover new voices in our community
          </p>
        </div>

        <div className="discover-search">
          <input
            type="search"
            placeholder="Search for users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="discover-search-input"
          />
        </div>

        <div className="users-grid">
          {filteredUsers.length === 0 ? (
            <div className="no-users">
              <p>{searchQuery ? 'No users found matching your search.' : 'No users to discover.'}</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-card-header">
                  <div className="user-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      getUserInitial(user.name)
                    )}
                    {user.isVerified && (
                      <div className="verified-badge" title="Verified User">✓</div>
                    )}
                  </div>
                  <div className="user-info">
                    <h3 className="user-name">{user.name}</h3>
                    <p className="user-bio">{user.bio}</p>
                  </div>
                </div>

                <div className="user-stats">
                  <div className="stat">
                    <span className="stat-number">{getUserPostCount(user.name)}</span>
                    <span className="stat-label">Stories</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{user.followers?.length || 0}</span>
                    <span className="stat-label">Followers</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{user.following?.length || 0}</span>
                    <span className="stat-label">Following</span>
                  </div>
                </div>

                <div className="user-actions">
                  <button 
                    className={`follow-btn ${isFollowing(user.id) ? 'following' : ''}`}
                    onClick={() => handleFollow(user.id)}
                  >
                    {isFollowing(user.id) ? 'Following' : 'Follow'}
                  </button>
                  <button 
                    className="view-profile-btn"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    View Profile
                  </button>
                </div>

                <div className="user-joined">
                  <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
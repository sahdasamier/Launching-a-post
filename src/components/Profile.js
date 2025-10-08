import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'user@example.com',
    avatar: null,
    bio: 'Share your story with the world'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBio, setEditBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  
  // Get all posts from Redux store
  const allPosts = useSelector(state => state.toposts);
  const { users } = useSelector(state => state.users);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setEditName(userData.name || '');
      setEditEmail(userData.email || '');
      setEditBio(userData.bio || 'Share your story with the world');
    }
    
    // Filter posts by current user (for demo, we'll show all posts)
    // In a real app, you would filter by user ID
    setUserPosts(allPosts);
  }, [allPosts]);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };
  
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditBio(user.bio || 'Share your story with the world');
  };
  
  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      name: editName,
      email: editEmail,
      bio: editBio,
      avatar: avatarPreview || user.avatar
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditBio(user.bio || 'Share your story with the world');
    setAvatarPreview(null);
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get user's social stats
  const getCurrentUserData = () => {
    return users.find(u => u.email === user.email) || { followers: [], following: [] };
  };

  const userSocialData = getCurrentUserData();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-large">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Preview" />
            ) : user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span>{user.name.charAt(0)}</span>
            )}
          </div>
          
          {isEditing ? (
            <div className="edit-profile-form">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Full Name"
                className="profile-input"
              />
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Email"
                className="profile-input"
              />
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="profile-input profile-bio"
                rows="3"
              />
              <div className="avatar-upload">
                <label htmlFor="avatar-upload" className="profile-btn">
                  Change Photo
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p className="user-email">{user.email}</p>
              <p className="user-bio">{user.bio || 'Share your story with the world'}</p>
              
              {/* Social Stats */}
              <div className="social-stats">
                <div className="stat">
                  <span className="stat-number">{userPosts.length}</span>
                  <span className="stat-label">Stories</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{userSocialData.followers?.length || 0}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{userSocialData.following?.length || 0}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="profile-btn" onClick={handleSaveProfile}>Save Changes</button>
              <button className="profile-btn" onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <button className="profile-btn" onClick={handleEditProfile}>Edit Profile</button>
          )}
          <button className="profile-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <h3>My Posts ({userPosts.length})</h3>
          {userPosts.length === 0 ? (
            <p>You haven't created any posts yet.</p>
          ) : (
            <div className="user-posts">
              {userPosts.map(post => (
                <div key={post.id} className="item">
                  <div className="post-header">
                    <div className="avatar">{post.title?.[0]?.toUpperCase() || 'P'}</div>
                    <div className="meta">
                      <h2>{post.title}</h2>
                      {post.createdAt && (
                        <span className="time-ago">{new Date(post.createdAt).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  {post.image && (
                    <div className="image-wrapper">
                      <img src={post.image} alt={post.title} className="post-image" />
                    </div>
                  )}
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTopost } from '../redux/TodoSlice';
import Layout from './Layout';

const CreatePost = ({ dark, setDark }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [body, setBody] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load current user data
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (value && body && currentUser && !isSubmitting) {
      setIsSubmitting(true);
      
      dispatch(
        addTopost({
          title: value,
          body: body,
          image: imagePreviewUrl || null,
          author: currentUser.name
        }),
      );
      
      // Show success message and redirect
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);
    }
  };

  const handleCancel = () => {
    navigate('/', { replace: true });
  };

  // Get user's first letter for avatar
  const getUserInitial = () => {
    return currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U';
  };

  if (!currentUser) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <Layout 
      dark={dark} 
      setDark={setDark} 
      onCreateClick={() => {}} 
      onSearch={() => {}}
    >
      <div className="create-post-page">
        <div className="create-post-header">
          <button className="back-btn" onClick={handleCancel}>
            ← Back to Stories
          </button>
          <h1 className="page-title">Share Your Story</h1>
          <p className="page-subtitle">
            Inspire others with moments that matter — add a title, your story, and an optional photo.
          </p>
        </div>

        <form onSubmit={onSubmit} className='create-post-form' aria-labelledby='create-post-title'>
          <div className='post-header'>
            <div className='avatar'>
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} />
              ) : (
                getUserInitial()
              )}
            </div>
            <div className='meta'>
              <h2>{currentUser.name}</h2>
              <span className='time-ago'>Just now</span>
            </div>
          </div>
           
          <div className="form-section">
            <label htmlFor='post-title' id='create-post-title'>Story Title</label>
            <input
              id='post-title'
              type='text' 
              placeholder='Add a catchy title for your story'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-section">
            <label htmlFor='post-body'>Your Story</label>
            <textarea
              id='post-body'
              placeholder='What story would you like to share with the world?'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              required
            />
          </div>

          <div className="form-section">
            <label htmlFor='post-image'>Add a Photo (Optional)</label>
            <input
              id='post-image'
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) { return; }
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const dataUrl = ev.target && ev.target.result;
                  setImagePreviewUrl(dataUrl);
                };
                reader.readAsDataURL(file);
              }}
            />
            {imagePreviewUrl && (
              <div className='image-preview'>
                <img src={imagePreviewUrl} alt='preview' className='post-image' />
                <button 
                  type="button" 
                  className="remove-image-btn"
                  onClick={() => setImagePreviewUrl(null)}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className={`publish-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={!value || !body || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner small"></span>
                  Publishing...
                </>
              ) : 'Publish Story'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addTopost } from '../redux/TodoSlice';

const ToPost = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('')
  const [body, setBody] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load current user data
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (value && body && currentUser) {
      dispatch(
        addTopost({
          title: value,
          body: body,
          image: imagePreviewUrl || null,
          author: currentUser.name,
          authorAvatar: currentUser.avatar
        }),
      );
      setValue('');
      setBody('');
      setImagePreviewUrl(null);
    }
  };

  // Get user's first letter for avatar
  const getUserInitial = () => {
    return currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U';
  };

  if (!currentUser) {
    return (
      <div className='sub' style={{ textAlign: 'center', padding: '40px' }}>
        <p>Please log in to create posts.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className='sub' id='create-form' aria-labelledby='create-post-title'>
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
       
      <label htmlFor='post-title' id='create-post-title' style={{display:'none'}}>Title</label>
      <input
        id='post-title'
        type='text' 
        placeholder='Add a catchy title'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label htmlFor='post-body' style={{display:'none'}}>Story</label>
      <textarea
        id='post-body'
        placeholder='What is on your mind?'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
      />
      <input
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
        </div>
      )}
      <button 
        type="submit"
        disabled={!value || !body}
      >
        Post
      </button>
    </form>
  )
}

export default ToPost
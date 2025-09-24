import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTopost, toggleLike, addComment, updateTopost } from '../redux/TodoSlice';

// Fallback function for older browsers
const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('Link copied to clipboard!');
    } else {
      alert('Failed to copy link');
    }
  } catch (err) {
    alert('Failed to copy link');
  }
  
  document.body.removeChild(textArea);
};

const TodoItems = ({id,title,body, image, liked, likeCount, comments, createdAt}) => {
  const dispatch =useDispatch();
  const [commentText, setCommentText] = useState('');
 
   function likef (){
     dispatch(toggleLike({ id }));
   }
   function onAddComment(e){
     e.preventDefault();
     if (!commentText.trim()) return;
     dispatch(addComment({ id, text: commentText.trim() }));
     setCommentText('');
   }
  const handleDeleteClick = () => {
    dispatch( deleteTopost({ id:id }));
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [showComments, setShowComments] = useState(false);
  const onSaveEdit = () => {
    if (!editTitle.trim() || !editBody.trim()) return;
    dispatch(updateTopost({ id, title: editTitle.trim(), body: editBody.trim() }));
    setIsEditing(false);
    setMenuOpen(false);
  };
  const onCancelEdit = () => {
    setEditTitle(title);
    setEditBody(body);
    setIsEditing(false);
    setMenuOpen(false);
  };
  return (
   
        <div className='item' > 
          <div className='post-header'>
            <div className='avatar'>{title?.[0]?.toUpperCase() || 'P'}</div>
            <div className='meta'>
              <h2>{title}</h2>
              {createdAt && (
                <span className='time-ago'>{new Date(createdAt).toLocaleString()}</span>
              )}
            </div>
            <div className='post-menu'>
              <button className='menu-btn' onClick={()=>setMenuOpen(!menuOpen)}>⋯</button>
              {menuOpen && (
                <div className='menu-dropdown'>
                  <button onClick={()=>{ setIsEditing(true); }}>Edit</button>
                  <button onClick={handleDeleteClick}>Remove</button>
                </div>
              )}
            </div>
          </div>
          {image && (
            <div className='image-wrapper'>
              <img src={image} alt={title} className='post-image' />
            </div>
          )}
          {isEditing ? (
            <div className='edit-area'>
              <input type='text' value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />
              <textarea value={editBody} onChange={(e)=>setEditBody(e.target.value)} />
              <div className='actions'>
                <button onClick={onSaveEdit}>Save</button>
                <button onClick={onCancelEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <p>{body}</p>
          )}
          <div className='actions'>
            <button className={`action-btn like ${liked ? 'liked' : ''}`} onClick={likef}>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
                <path d='M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z'/>
              </svg>
              <span>{liked ? 'Liked' : 'Like'} {likeCount || 0}</span>
            </button>
            <button className='action-btn comment-toggle' onClick={()=> setShowComments(!showComments)}>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
                <path d='M21 6H3v9a2 2 0 0 0 2 2h9l4 3v-3h3a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z'/>
              </svg>
              <span>{showComments ? 'Hide' : 'Comment'}</span>
            </button>
            <button className='action-btn share' onClick={()=>{
              const postUrl = `${window.location.origin}${window.location.pathname}#post-${id}`;
              if (navigator.clipboard) {
                navigator.clipboard.writeText(postUrl).then(() => {
                  alert('Link copied to clipboard!');
                }).catch(() => {
                  // Fallback for older browsers
                  fallbackCopyTextToClipboard(postUrl);
                });
              } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(postUrl);
              }
            }}>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
                <path d='M18 8l-6-5v3H6v4h6v3l6-5zM6 14h2v6H6v-6zm4 0h2v6h-2v-6zm4 0h2v6h-2v-6z'/>
              </svg>
              <span>Share</span>
            </button>
          </div>

          {showComments && (
            <div className='comments'>
              <form onSubmit={onAddComment} className='comment-form'>
                <input
                  type='text'
                  placeholder='Write a comment...'
                  value={commentText}
                  onChange={(e)=>setCommentText(e.target.value)}
                />
                <button type='submit' disabled={!commentText.trim()}>Post</button>
              </form>
              {comments && comments.length > 0 && (
                <ul className='comment-list'>
                  {comments.map((c)=> (
                    <li key={c.id} className='comment-item'>
                      <span className='comment-text'>{c.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
       </div>
      
   
  )
}

export default TodoItems;

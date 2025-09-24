import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTopost, toggleLike, addComment, updateTopost } from '../redux/TodoSlice';

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
            <button className={`like ${liked ? 'liked' : ''}`} onClick={likef}>
              {liked ? '♥ Liked' : '♡ Like'} {likeCount || 0}
            </button>
            <button className='comment-toggle' onClick={()=> setShowComments(!showComments)}>
              {showComments ? 'Hide comments' : 'Comment'}
            </button>
            <button className='share' onClick={()=>{
              const shareData = { title: title || 'Post', text: body || '', url: window.location.href };
              if (navigator.share) {
                navigator.share(shareData).catch(()=>{});
              } else {
                navigator.clipboard && navigator.clipboard.writeText(shareData.url);
                alert('Link copied');
              }
            }}>Share</button>
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

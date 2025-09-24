import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTopost } from '../redux/TodoSlice';

const ToPost =() => {
  const dispatch =useDispatch();
  const [value , setValue] = useState('')
  const [body, setBody] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const onSubmit = (event) =>{
  event.preventDefault();
  if (value && body){
 dispatch (
   addTopost({
   title:value,
   body:body,
   image: imagePreviewUrl || null,
 }),
 );
 setValue('');
 setBody('');
 if (imagePreviewUrl) {
   URL.revokeObjectURL(imagePreviewUrl);
 }
 setImageFile(null);
 setImagePreviewUrl(null);
}
};
  return (
   <form onSubmit={onSubmit} className='sub' id='create-form' aria-labelledby='create-post-title'>
 
       
    <label htmlFor='post-title' id='create-post-title' style={{display:'none'}}>Title</label>
    <input
      id='post-title'
      type='text' 
      placeholder='Add a catchy title'
      value={value}
      onChange ={(e) =>setValue(e.target.value)}
    />
    <label htmlFor='post-body' style={{display:'none'}}>Story</label>
    <textarea
      id='post-body'
      placeholder='Write your story...'
      value={body}
      onChange ={(e) =>setBody(e.target.value)}
      rows={5}
    />
        <input
        type='file'
        accept='image/*'
        onChange={(e)=>{
          const file = e.target.files && e.target.files[0];
          if (!file) { return; }
          setImageFile(file);
          const preview = URL.createObjectURL(file);
          setImagePreviewUrl(preview);
        }}
        />
        {imagePreviewUrl && (
          <div className='image-preview'>
            <img src={imagePreviewUrl} alt='preview' className='post-image' />
          </div>
        )}
<button 
type= "submit"
disabled={!value || !body}
>
  POST
</button>
   </form>
  )
}

export default ToPost



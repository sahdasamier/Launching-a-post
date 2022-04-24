import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTopost} from '../redux/TodoSlice';

const TodoItems = ({id,title,body}) => {
  const dispatch =useDispatch();
  const [like , setLike]=useState(100);
  const [likeactive ,setLikeactive]=useState("");
 
   function likef (){
     if (likeactive){
       setLikeactive(false)
       setLike(like-1)}
       else {
         setLikeactive(true)
         setLike(like+1)
       }
     }
  const handleDeleteClick = () => {
		dispatch( deleteTopost({ id:id }));
	};
  return (
   
       <div className='item' > 
          <h2>{title}</h2>
          <p>{body}</p>
          <button className='like' onClick={likef} >like{like}</button>

          <button onClick={handleDeleteClick}
          > Remove</button>
       </div>
      
   
  )
}

export default TodoItems;

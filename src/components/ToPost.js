import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTopost } from '../redux/TodoSlice';

const ToPost =() => {
  const dispatch =useDispatch();
  const [value , setValue] = useState('')
  const [body, setBody] = useState('');

  const onSubmit = (event) =>{
  event.preventDefault();
  if (value,body){
 dispatch (
   addTopost({
   title:value,
   body:body,
 }),
 );
{ setValue ('') || setBody('') }

}
};
  return (
   <form onSubmit={onSubmit} className='sub'>
 
       
     <textarea
       type=' text' 
       placeholder='Give us appropriate title '
       value={value}
       onChange ={(e) =>setValue(e.target.value)}
       >
       </textarea>
         <input
       type=' text' 
       placeholder='add story '
       value={body}
       onChange ={(e) =>setBody(e.target.value)}
       >

       </input>
<button 
type= "submit"
disabled={!value+!body}
>
  POST
</button>
   </form>
  )
}

export default ToPost



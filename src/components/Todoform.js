import React from 'react'
import TodoItems from './TodoItems'
import { useDispatch, useSelector } from 'react-redux'


const TodoForm=()=> {
const toposts = useSelector((state) =>state.toposts);

  
  return (
  <div>
      {toposts.map((topost)=>(
          <TodoItems key={topost.id} id={topost.id} title={topost.title} body ={topost.body} like={topost.like} />
      ))}; 
    </div>
  )
}

export default TodoForm;

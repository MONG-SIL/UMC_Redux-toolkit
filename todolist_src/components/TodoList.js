import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { remove , complete } from '../redux/todoSlice'

export default function TodoList() {
    const todolist = useSelector(state => state.todo)
    const dispatch = useDispatch()



    const todolistView = todolist.map((todo, idx) => (
        
    <li key={todolist[idx].id}>
        <input  type="checkbox" 
        onChange={()=> dispatch(complete(todolist[idx].id))}/>
        <div>{todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}</div>
        <button  type="button" onClick={() => dispatch(remove(todolist[idx].id))}> - </button>
    </li> 
    )
    )


  return (
      <>
     <ul>{todolistView}</ul>   
      </>
  )
}
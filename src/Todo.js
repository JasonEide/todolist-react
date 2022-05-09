import React from 'react'

export default function Todo({todo, toggleTodo}) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (
    <div id='tasks'>
        <label> 
          {todo.name}
        </label>     
        <label id={todo.complete? 'alt-delete' : 'delete'}>
          <input type='checkbox' checked={todo.complete} onChange={handleTodoClick} /> 
          delete
        </label>  
    </div>
  )
}
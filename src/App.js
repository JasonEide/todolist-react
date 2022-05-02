import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'

const { v4: uuidv4 } = require('uuid');
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []) 
  const todoNameRef = useRef()

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(){
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
        <input ref={todoNameRef} 
          type='text' 
          placeholder='Add a Todo'
        />
        <button onClick={handleAddTodo}>
          Add Todo
        </button>
        <button onClick={handleClearTodos}>
          Clear Completed
        </button>
        <div>
          {todos.filter(todo => !todo.complete).length} left to do
        </div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;
import React, { useState, useRef, useEffect } from 'react';
import Todo from './Todo';
import './App.css';

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
  function handleLengthTodos(){
    if (todos.filter(todo => !todo.complete).length > 1) {
      return 'things'
    }
    return 'thing'
  }

  return (
    <section>
      <div> 
        <header>
          <h1>Todo List</h1>
          <input id='task-input' ref={todoNameRef} 
          type='text' 
          placeholder='Add a Todo'
          />
          <button id='task-submit' onClick={handleAddTodo}>
            Add Todo
          </button>
        </header>
        <div id='body'>
          <h2>
              {todos.filter(todo => !todo.complete).length} {' '}
              {handleLengthTodos()} {' '}
              left to do
          </h2>
          <button id='clear' onClick={handleClearTodos}>
            clear deleted
          </button>
            <div class='content'>
              {todos.map(todo => {
                return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />})}
          </div>
        </div>
      </div>
    </section>
  )
}

export default App;

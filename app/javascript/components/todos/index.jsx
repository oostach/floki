'use strict'

import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import TodoForm from './form'
import TodoList from './list'

const Todo = () => {
  const [items, setItems] = useState([])

  const addItem = (item) => {
    setItems(prevState => [...prevState, item])
  }

  return (
    <div className='todos'>
        <TodoForm addItem={addItem} />
        { items?.length > 0 && <TodoList items={items} /> }
    </div>
  )
}

const root = createRoot(document.getElementById('todos-root'))

root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
)

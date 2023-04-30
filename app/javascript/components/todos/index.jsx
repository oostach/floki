'use strict'

import React from 'react'
import { createRoot } from 'react-dom/client'
import TodoForm from './form'

const root = createRoot(document.getElementById('todos-root'))

const addItem = (item) => {
  console.log(item)
}

root.render(
  <React.StrictMode>
    <h2>My Tasks List</h2>
    <TodoForm addItem={addItem} />
  </React.StrictMode>
)

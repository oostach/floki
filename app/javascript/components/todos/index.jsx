'use strict'

import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import TodoForm from './form'
import TodoEditForm from './edit-form'
import TodoList from './list'

const Todo = () => {
  const [items, setItems] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const addItem = (item) => {
    setItems(prevState => [...prevState, item])
  }

  const deleteItem = (id) => {
    setItems(prevState => prevState.filter(item => item.id !== id))
  }

  const toggleItem = (id) => {
    setItems(prevState => prevState.map(item => item.id === id ? { ...item, completed: !item.completed } : item))
  }

  const updateItem = (updatedItem) => {
    setItems(prevState => prevState.map(item => item.id === updatedItem.id ? { ...item, title: updatedItem.title } : item))
    disableEditMode()
  }

  const disableEditMode = () => {
    setIsEditMode(false)
  }

  const enableEditMode = (item) => {
    setCurrentItem(item)
    setIsEditMode(true)
  }

  return (
    <div className='todos'>
        <TodoForm addItem={addItem} />
        { isEditMode && <TodoEditForm currentItem={currentItem} updateItem={updateItem} disableEditMode={disableEditMode} /> }
        { items?.length > 0 && <TodoList items={items} deleteItem={deleteItem} toggleItem={toggleItem} enableEditMode={enableEditMode} /> }
    </div>
  )
}

const root = createRoot(document.getElementById('todos-root'))

root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
)

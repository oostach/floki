'use strict'

import React, { useState } from 'react'
import TodoForm from './form'
import TodoEditForm from './edit-form'
import TodoList from './list'
import Loader from './loader'
import { useQuery } from '@apollo/client'
import { todoList } from './graphql/queries'

const Todos = () => {
  const [items, setItems] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const { loading, data } = useQuery(todoList)

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
        { loading && <Loader /> }
        { isEditMode && <TodoEditForm currentItem={currentItem} updateItem={updateItem} disableEditMode={disableEditMode} /> }
        { data && <TodoForm listId={data.todosList.id} /> }
        { data && data.todosList.todos?.length > 0 && <TodoList items={[...data.todosList.todos]} deleteItem={deleteItem} toggleItem={toggleItem} enableEditMode={enableEditMode} /> }
    </div>
  )
}

export default Todos

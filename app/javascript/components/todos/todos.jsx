'use strict'

import React, { useState, useEffect } from 'react'
import TodoForm from './form'
import TodoEditForm from './edit-form'
import TodoList from './list'
// import useLocalStorage from './hooks/use-local-storage'
import { useQuery } from '@apollo/client'
import { todoList } from './graphql/queries'

const Todos = () => {
  // const [items, setItems] = useLocalStorage('floki-app-todos', [])
  const [items, setItems] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const { loading, data } = useQuery(todoList)

  useEffect(() => {
    data && setItems([...data.todosList.todos])
  }, [data])

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
        { loading && (
            <div className='flex justify-center items-center my-4'>
              <span className='loader mr-2'></span>
              <span className='text-sky-700 italic font-semibold'>Loading......</span>
            </div>
        )}
        { isEditMode && <TodoEditForm currentItem={currentItem} updateItem={updateItem} disableEditMode={disableEditMode} /> }
        { items?.length > 0 && <TodoList items={items} deleteItem={deleteItem} toggleItem={toggleItem} enableEditMode={enableEditMode} /> }
    </div>
  )
}

export default Todos

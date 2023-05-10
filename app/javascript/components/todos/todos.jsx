'use strict'

import React, { useEffect, useState } from 'react'
import TodoForm from './form'
import TodoEditForm from './edit-form'
import TodoList from './list'
import Loader from './loader'
import { useQuery } from '@apollo/client'
import { TODO_LIST } from './graphql/queries'

const Todos = () => {
  const [items, setItems] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const { loading, data } = useQuery(TODO_LIST)

  useEffect(() => {
    data && setItems([...data.todosList.todos])
  }, [data])

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

  const addItem = (item) => {
    setItems(prevState => [...prevState, item])
  }

  const deleteItem = (id) => {
    console.log(id)
    setItems(prevState => prevState.filter(item => item.id !== id))
  }

  return (
    <div className='todos'>
        { loading && <Loader /> }
        { isEditMode && <TodoEditForm currentItem={currentItem} updateItem={updateItem} disableEditMode={disableEditMode} /> }
        { data && <TodoForm listId={data.todosList.id} addItem={addItem} /> }
        { data && items?.length > 0 && <TodoList items={items} listId={data.todosList.id} deleteItem={deleteItem} enableEditMode={enableEditMode} /> }
    </div>
  )
}

export default Todos

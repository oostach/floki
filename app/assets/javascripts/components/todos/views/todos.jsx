'use strict'

import React, { useState } from 'react'
import TodoForm from '../sections/form'
import TodoEditForm from '../sections/edit-form'
import TodoList from '../sections/list'
import Loader from '../sections/loader'
import { useQuery } from '@apollo/client'
import { TODO_LIST } from '../graphql/queries'
import { useParams } from 'react-router-dom'

const Todos = () => {
  const [items, setItems] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const { id } = useParams()

  const { loading, data } = useQuery(TODO_LIST, {
    variables: { id },
    onCompleted(data) {
      setItems([...data.todosList.todos])
    }
  })

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
        { data && isEditMode && <TodoEditForm listId={data.todosList.id} currentItem={currentItem} disableEditMode={disableEditMode} /> }
        { data && <TodoForm listId={data.todosList.id} /> }
        { data && items?.length > 0 && <TodoList items={items} list={data.todosList} enableEditMode={enableEditMode} /> }
    </div>
  )
}

export default Todos

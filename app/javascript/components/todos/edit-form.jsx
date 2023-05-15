'use strict'

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'

import { UPDATE_TODO } from './graphql/mutations'
import { TODO_LIST } from './graphql/queries'

const TodoEditForm = ({ listId, currentItem, disableEditMode }) => {
  const [editedItemTitle, setEditedItemTitle] = useState(currentItem.title)
  const [updateTodo] = useMutation(UPDATE_TODO, {
    variables: { id: currentItem.id, listId, title: editedItemTitle },
    update(cache, { data }) {
      const { id, title } = data.updateTodo.todo
      const { todosList } = cache.readQuery({
        query: TODO_LIST,
        variables: { id: listId }
      })
      cache.writeQuery({
        query: TODO_LIST,
        variables: { id: listId },
        data: {
          todosList: {
            id: todosList.id,
            name: todosList.name,
            todos: todosList.todos.map(item => item.id === id ? { ...item, title } : item)
          }
        }
      })
    },
    onCompleted() {
      disableEditMode()
    }
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()

    updateTodo()
  }

  return (
    <div
      className='edit-wrapper absolute z-10 bg-gray-200 bg-opacity-90 bg-blend-overlay top-0 bottom-0 left-0 right-0 h-screen'
      onClick={(e) => { return e.target === e.currentTarget && disableEditMode() }}
      >
      <form className='todo-edit-form mx-auto mt-[40vh] w-1/2 p-4 border-2 border-sky-500 bg-sky-100 rounded-lg shadow-md shadow-sky-500/50' onSubmit={handleFormSubmit}>
        <div className='form-group flex'>
          <input type='text' className='form-input mr-2' value={editedItemTitle} onInput={(e) => setEditedItemTitle(e.target.value)} required autoFocus />
          <button className='button-primary mr-2' aria-label='Update Task' type='submit'>Update</button>
          <button className='button-secondary' aria-label='Update Task' type='button' onClick={() => disableEditMode()}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

TodoEditForm.propTypes = {
  listId: PropTypes.string.isRequired,
  currentItem: PropTypes.object.isRequired,
  disableEditMode: PropTypes.func
}

export default TodoEditForm

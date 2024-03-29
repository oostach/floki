'use strict'

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import moment from 'moment'

import { UPDATE_TODO } from '../graphql/mutations'

const TodoEditForm = ({ listId, currentItem, disableEditMode }) => {
  const [editedItemTitle, setEditedItemTitle] = useState(currentItem.title)
  const [editedItemDate, setEditedItemDate] = useState(() => {
    return currentItem.dueDate ? moment(new Date(currentItem.dueDate)).format('YYYY-MM-DD') : ''
  })

  const [editedItemTime, setEditedItemTime] = useState(() => {
    return currentItem.dueDate ? moment(new Date(currentItem.dueDate)).format('hh:mm') : ''
  })

  const [updateTodo] = useMutation(UPDATE_TODO, {
    variables: { id: currentItem.id, listId, title: editedItemTitle, date: editedItemDate, time: editedItemTime },
    update(cache, { data }) {
      const { id, title } = data.updateTodo.todo
      cache.modify({
        id: cache.identify({ __typename: 'Todo', id }),
        fields: {
          title() { return title }
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
          <input type='date' className='form-input mr-2 !w-min' value={editedItemDate} onChange={(e) => setEditedItemDate(e.target.value)} />
          <input type='time' className='form-input  mr-2 !w-min' value={editedItemTime} onChange={(e) => setEditedItemTime(e.target.value)} />
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

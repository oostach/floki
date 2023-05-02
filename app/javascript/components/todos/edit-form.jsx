'use strict'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TodoEditForm = ({ currentItem, updateItem, disableEditMode }) => {
  const [editedItemTitle, setEditedItemTitle] = useState(currentItem.title)

  const handleFormSubmit = (e) => {
    e.preventDefault()

    updateItem({ ...currentItem, title: editedItemTitle })
  }

  return (
    <div className='edit-wrapper absolute z-10 bg-gray-200 bg-opacity-90 top-0 bottom-0 left-0 right-0 h-screen'>
      <form className='todo-edit-form mx-auto mt-[50vh] w-1/2' onSubmit={handleFormSubmit}>
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
  currentItem: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired,
  disableEditMode: PropTypes.func
}

export default TodoEditForm

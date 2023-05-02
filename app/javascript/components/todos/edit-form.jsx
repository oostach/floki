'use strict'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TodoEditForm = ({ currentItem, updateItem }) => {
  const [editedItemTitle, setEditedItemTitle] = useState(currentItem.title)

  const handleFormSubmit = (e) => {
    e.preventDefault()

    updateItem({ ...currentItem, title: editedItemTitle })
  }

  return (
    <form className='todoForm' onSubmit={handleFormSubmit}>
      <div className='form-group flex'>
        <input type='text' className='form-input mr-2' value={editedItemTitle} onInput={(e) => setEditedItemTitle(e.target.value)} required autoFocus />
        <button className='button-primary' aria-label='Add Task' type='submit'>Update</button>
      </div>
    </form>
  )
}

TodoEditForm.propTypes = {
  currentItem: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired
}

export default TodoEditForm

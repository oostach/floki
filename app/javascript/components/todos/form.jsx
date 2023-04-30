'use strict'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TodoForm = ({ addItem }) => {
  const [item, setItem] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()

    addItem({ id: Date.now(), title: item, completed: false })
    setItem('')
  }

  return (
    <form className='todoForm' onSubmit={handleFormSubmit}>
      <div className='form-group flex'>
        <input type='text' className='form-input mr-2' value={item} onInput={(e) => setItem(e.target.value)} required autoFocus />
        <button className='button-primary' aria-label='Add Task' type='submit'>Save</button>
      </div>
    </form>
  )
}

TodoForm.propTypes = {
  addItem: PropTypes.func.isRequired
}

export default TodoForm

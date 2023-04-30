'use strict'

import React, { useState } from 'react'

const TodoForm = ({ addItem }) => {
  const [item, setItem] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
    addItem({
      id: Date.now(),
      item,
      completed: false
    })
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

export default TodoForm

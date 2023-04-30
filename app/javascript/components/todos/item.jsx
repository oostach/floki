'use strict'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({ item }) => {
  const [isChecked, setIsChecked] = useState(item.completed)

  const toggleCompletion = (e) => {
    setIsChecked(!isChecked)
  }

  return (
    <div className='todo-item flex'>
      <div className='form-group inline-checkbox mb-2'>
        <input type='checkbox' checked={isChecked} onChange={toggleCompletion} name={item.id} className='form-input' />
        <label htmlFor={item.id}>{item.title}</label>
      </div>
      <div className='actions'>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default TodoItem

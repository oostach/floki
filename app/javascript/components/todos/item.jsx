'use strict'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const TodoItem = ({ item, deleteItem }) => {
  const [isChecked, setIsChecked] = useState(item.completed)

  const toggleCompletion = (e) => {
    setIsChecked(!isChecked)
  }

  return (
    <div className='todo-item flex content-center flex-wrap mb-2'>
      <div className='form-group inline-checkbox !mb-0'>
        <input type='checkbox' checked={isChecked} onChange={toggleCompletion} id={item.id} name={`todo-${item.id}`} className='form-input' />
        <label htmlFor={item.id}>{item.title}</label>
      </div>
      <div className='actions flex ml-auto'>
        <button className='badge-button-primary mr-2 badge-normal'>
          <PencilSquareIcon width={'20px'} />
        </button>
        <button className='badge-button-alert badge-normal' onClick={() => deleteItem(item.id)} >
          <TrashIcon width={'20px'} />
        </button>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItem: PropTypes.func
}

export default TodoItem

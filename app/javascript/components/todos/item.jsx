'use strict'

import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { TOGGLE_TODO } from './graphql/mutations'

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const TodoItem = ({ item, deleteItem, toggleItem, enableEditMode }) => {
  const [isChecked, setIsChecked] = useState(item.completed)
  const [toggleTodo, { data, loading, error }] = useMutation(TOGGLE_TODO)

  const toggleCompletion = (e) => {
    toggleTodo({ variables: { id: item.id, completed: !isChecked } })
  }

  useEffect(() => {
    if (data) {
      setIsChecked(data.item.completed)
      toggleItem(data.item.id)
    }
  }, [data])

  return (
    <div className='todo-item flex content-center flex-wrap mb-2'>
      <div className='form-group inline-checkbox !mb-0'>
        <input type='checkbox' checked={isChecked} onChange={toggleCompletion} id={item.id} name={`todo-${item.id}`} className='form-input' />
        <label className={isChecked ? 'line-through' : ''} htmlFor={item.id}>{item.title}</label>
      </div>
      <div className='actions flex ml-auto'>
        <button className='badge-button-primary mr-2 badge-normal' onClick={() => enableEditMode(item)}>
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
  deleteItem: PropTypes.func,
  toggleItem: PropTypes.func.isRequired,
  enableEditMode: PropTypes.func.isRequired
}

export default TodoItem

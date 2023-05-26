'use strict'

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'

import { DELETE_TODO, TOGGLE_TODO } from '../graphql/mutations'
import { handleDrag } from '../utils/draggable'

import { PencilSquareIcon, TrashIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'

const TodoItem = ({ item, listId, enableEditMode }) => {
  const [isChecked, setIsChecked] = useState(item.completed)

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    variables: { id: item.id, status: !isChecked },
    update(cache, { data }) {
      const { id, completed } = data.toggleTodo.todo
      cache.modify({
        id: cache.identify({ __typename: 'Todo', id }),
        fields: {
          completed() { return completed }
        }
      })
    },
    onCompleted(data) {
      const { completed } = data.toggleTodo.todo
      setIsChecked(completed)
    }
  })

  const [deleteTodo] = useMutation(DELETE_TODO, {
    variables: { id: item.id, listId },
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({ __typename: 'TodosList', id: listId }),
        fields: {
          todos(cachedTodos, { readField }) {
            return cachedTodos.filter(ref => readField('id', ref) !== data.deleteTodo.id)
          }
        }
      })
    }
  })

  return (
    <div className='todo-item flex content-center items-center flex-wrap p-2 box-border' id={`todo-${item.id}`}
         draggable='true'
         onDragStart={handleDrag}>
      <div className='text-zinc-500 mr-2 cursor-move' >
        <ArrowsUpDownIcon width={'20px'} />
        <input type='hidden' id={`todo-position-${item.id}`} name={`todo[position][${item.id}]`} className='hidden todo-position' value={item.position} />
      </div>
      <div className='form-group inline-checkbox !mb-0'>
        <input type='checkbox' checked={isChecked} onChange={toggleTodo} id={item.id} name={`todo[${item.id}]`} className='form-input todo-checkbox' />
        <label className={isChecked ? 'line-through' : ''} htmlFor={item.id}>{item.title}</label>
      </div>
      <div className='actions flex ml-auto'>
        <button className='badge-button-primary mr-2 badge-normal' onClick={() => enableEditMode(item)}>
          <PencilSquareIcon width={'20px'} />
        </button>
        <button className='badge-button-alert badge-normal' onClick={deleteTodo} >
          <TrashIcon width={'20px'} />
        </button>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  listId: PropTypes.string.isRequired,
  enableEditMode: PropTypes.func.isRequired
}

export default TodoItem

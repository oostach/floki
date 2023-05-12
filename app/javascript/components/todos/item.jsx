'use strict'

import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { DELETE_TODO, TOGGLE_TODO } from './graphql/mutations'
import { TODO_LIST } from './graphql/queries'

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const TodoItem = ({ item, listId, enableEditMode }) => {
  const [isChecked, setIsChecked] = useState(item.completed)
  const [toggleTodo, toggleTodoRes] = useMutation(TOGGLE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO, {
    variables: { id: item.id, listId },
    update(cache, { data }) {
      const { todosList } = cache.readQuery({
        query: TODO_LIST,
        variables: { id: parseInt(listId) }
      })
      cache.writeQuery({
        query: TODO_LIST,
        variables: { id: parseInt(listId) },
        data: {
          todosList: {
            id: todosList.id,
            name: todosList.name,
            todos: todosList.todos.filter(todo => todo.id !== data.deleteTodo.id)
          }
        }
      })
    }
  })

  const toggleCompletion = (e) => {
    toggleTodo({ variables: { id: item.id, status: !isChecked } })
  }

  useEffect(() => {
    toggleTodoRes.data && setIsChecked(toggleTodoRes.data.toggleTodo.todo.completed)
  }, [toggleTodoRes])

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

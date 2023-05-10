'use strict'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import { CREATE_TODO } from './graphql/mutations'

const TodoForm = ({ listId }) => {
  const [createTodo, { data, loading, error }] = useMutation(CREATE_TODO)
  const [todoTitle, setTodoTitle] = useState('')
  const [todoListId] = useState(listId)

  const handleFormSubmit = (e) => {
    e.preventDefault()

    createTodo({ variables: { title: todoTitle, listId: todoListId } })
    setTodoTitle('')
  }

  return (
    <form className='todo-form' onSubmit={handleFormSubmit}>
      <div className='form-group flex'>
        <input type='text' className='form-input mr-2' value={todoTitle} onInput={(e) => setTodoTitle(e.target.value)} required autoFocus />
        <button className='button-primary' aria-label='Add Task' type='submit'>Save</button>
      </div>
    </form>
  )
}

TodoForm.propTypes = {
  listId: PropTypes.string.isRequired
}

export default TodoForm

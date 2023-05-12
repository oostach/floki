'use strict'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import { CREATE_TODO } from './graphql/mutations'
import { TODO_LIST } from './graphql/queries'

const TodoForm = ({ listId }) => {
  const [todoTitle, setTodoTitle] = useState('')
  const [createTodo] = useMutation(CREATE_TODO, {
    update(cache, { data }) {
      const { list } = cache.readQuery({
        query: TODO_LIST,
        variables: { id: parseInt(listId) }
      })
      cache.writeQuery({
        query: TODO_LIST,
        variables: { id: parseInt(listId) },
        data: {
          list: {
            id: list.id,
            name: list.name,
            todos: [
              data.createTodo.todo,
              ...list.todos
            ]
          }
        }
      })
    },
    onCompleted() {
      setTodoTitle('')
    }
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()

    createTodo({ variables: { title: todoTitle, listId } })
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

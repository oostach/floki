'use strict'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import { CREATE_TODO } from '../graphql/mutations'
import { TODO_FIELDS } from '../graphql/fragments'

const TodoForm = ({ listId }) => {
  const [todoTitle, setTodoTitle] = useState('')
  const [todoDate, setTodoDate] = useState('')
  const [todoTime, setTodoTime] = useState('')

  const [createTodo] = useMutation(CREATE_TODO, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({ __typename: 'TodosList', id: listId }),
        fields: {
          todos(existingTodosRefs, { readField }) {
            const newTodoRef = cache.writeFragment({
              data: data.createTodo.todo,
              fragment: TODO_FIELDS
            })

            return [newTodoRef, ...existingTodosRefs]
          }
        }
      })
    },
    onCompleted() {
      setTodoTitle(prevTodoTitle => '')
      setTodoDate(prevTodoDate => '')
      setTodoTime(prevTodoTime => '')
    }
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()

    createTodo({ variables: { title: todoTitle, date: todoDate, time: todoTime, listId } })
  }

  return (
    <form className='todo-form' onSubmit={handleFormSubmit}>
      <div className='form-group flex'>
        <input type='text' className='form-input mr-2' value={todoTitle} onInput={(e) => setTodoTitle(e.target.value)} required autoFocus />
        <input type='date' className='form-input mr-2 !w-min' value={todoDate} onChange={(e) => setTodoDate(e.target.value)} />
        <input type='time' className='form-input  mr-2 !w-min' value={todoTime} onChange={(e) => setTodoTime(e.target.value)} />
        <button className='button-primary' aria-label='Add Task' type='submit'>Save</button>
      </div>
    </form>
  )
}

TodoForm.propTypes = {
  listId: PropTypes.string.isRequired
}

export default TodoForm

'use strict'

import React from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'

const TodoList = ({ items, list, enableEditMode }) => {
  const handleDragover = (e) => {
    e.preventDefault()

    const activeTodo = e.target.closest('.todo-item')
    const movingTodo = e.currentTarget.querySelector('.moving-todo')
    const activeMiddle = activeTodo.offsetTop + activeTodo.clientHeight / 2

    if (activeTodo && movingTodo.getAttribute('id') !== activeTodo.getAttribute('id')) {
      const movingCopy = movingTodo.cloneNode(true)
      movingCopy.classList.add('copy-todo', 'border', 'opacity-50', 'bg-sky-100', 'rounded-lg')

      if (e.clientY < activeMiddle) {
        const prevEl = activeTodo.previousSibling
        if (prevEl.classList.contains('copy-todo')) {
          return
        }
        removePlaceholder(e)
        activeTodo.before(movingCopy)
      } else {
        removePlaceholder(e)
        activeTodo.after(movingCopy)
      }
    }
  }

  const removePlaceholder = (event, activeMiddle) => {
    const clones = event.currentTarget.querySelectorAll('.copy-todo')
    clones.forEach(clone => clone.remove())
  }

  return (
    <div className='todos-list mt-4' onDragOver={handleDragover}>
      <div className='todos-list-name mb-2 font-semibold text-lg text-sky-900'>{list.name}</div>
      {
        items.map(item => {
          return <TodoItem key={item.id} item={item} listId={list.id} enableEditMode={enableEditMode} />
        })
      }
    </div>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  list: PropTypes.object.isRequired,
  enableEditMode: PropTypes.func
}

export default TodoList

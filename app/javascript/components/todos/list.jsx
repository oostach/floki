'use strict'

import React from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'

const TodoList = ({ items, list, enableEditMode }) => {
  const handleDragover = (e) => {
    e.preventDefault()
    removePlaceholder(e.currentTarget)

    const activeTodo = e.target.closest('.todo-item')
    const movingTodo = e.currentTarget.querySelector('.moving-todo')
    console.log(activeTodo)
    if (activeTodo && movingTodo.getAttribute('id') !== activeTodo.getAttribute('id')) {
      const activeMiddle = activeTodo.offsetTop + activeTodo.clientHeight / 2
      const movingCopy = movingTodo.cloneNode(true)
      movingCopy.classList.add('copy-todo', 'border', 'opacity-50', 'bg-sky-100', 'rounded-lg')

      if (e.clientY < activeMiddle) {
        activeTodo.before(movingCopy)
        e.clientY = e.clientY + movingCopy.clientHeight
      } else {
        activeTodo.after(movingCopy)
      }
    }
  }

  const removePlaceholder = (container) => {
    const clones = container.querySelectorAll('.copy-todo')
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

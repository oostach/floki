'use strict'

import React from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import { UPDATE_POSITION } from './graphql/mutations'

const TodoList = ({ items, list, enableEditMode }) => {
  const [updatePosition] = useMutation(UPDATE_POSITION, {
    update(cache, { data }) {
      const { todos } = data.updatePosition
      cache.modify({
        id: cache.identify({ __typename: 'TodosList', id: list.id }),
        fields: {
          todos() { return [...todos] }
        }
      })
    }
  })

  const updateUIPosition = (event) => {
    event.currentTarget.querySelectorAll('.todo-position').forEach((item, index) => item.value = index)
  }

  const pasteItem = (event) => {
    const id = event.dataTransfer.getData('text')
    const movingItem = document.querySelector(`#${id}.moving-todo`)
    const placeholders = event.currentTarget.querySelectorAll('.copy-todo')

    if (placeholders.length !== 1) {
      return
    }

    event.currentTarget.replaceChild(movingItem, placeholders[0])
  }

  const collectIds = (element) => {
    return Array.from(element.querySelectorAll('.todo-checkbox')).map(node => node.getAttribute('id'))
  }

  const removePlaceholder = (event, activeMiddle) => {
    const clones = event.currentTarget.querySelectorAll('.copy-todo')
    clones.forEach(clone => clone.remove())
  }

  const handleDragover = (e) => {
    e.preventDefault()

    const activeTodo = e.target.closest('.todo-item')
    const movingTodo = e.currentTarget.querySelector('.moving-todo')
    const activeMiddle = activeTodo.offsetTop + activeTodo.clientHeight / 2

    if (activeTodo && movingTodo.getAttribute('id') !== activeTodo.getAttribute('id')) {
      const movingCopy = movingTodo.cloneNode(true)
      movingCopy.classList.add('copy-todo', 'border', 'opacity-50', 'bg-sky-100', 'rounded-lg')
      movingCopy.classList.remove('moving-todo')

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

  const handleDrop = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    pasteItem(e)
    updateUIPosition(e)
    updatePosition({ variables: { ids: collectIds(e.currentTarget), listId: list.id } })
  }

  return (
    <div className='todos-list mt-4' onDragOver={handleDragover} onDrop={handleDrop}>
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

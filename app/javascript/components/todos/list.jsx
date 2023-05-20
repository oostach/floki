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

  const updateUIPosition = ({ currentTarget }) => {
    currentTarget.querySelectorAll('.todo-position').forEach((item, index) => item.value = index)
  }

  const pasteItem = ({ dataTransfer, currentTarget }) => {
    const id = dataTransfer.getData('text')
    const movingItem = document.querySelector(`#${id}.moving-todo`)
    const placeholders = currentTarget.querySelectorAll('.copy-todo')

    if (placeholders.length !== 1) {
      return
    }

    currentTarget.replaceChild(movingItem, placeholders[0])
    movingItem.classList.remove('moving-todo')
  }

  const collectIds = (element) => {
    return Array.from(element.querySelectorAll('.todo-checkbox')).map(node => node.getAttribute('id'))
  }

  const removePlaceholder = ({ currentTarget }) => {
    currentTarget.querySelectorAll('.copy-todo').forEach(clone => clone.remove())
  }

  const createPlaceholder = (movingTodo) => {
    const clone = movingTodo.cloneNode(true)
    clone.classList.add('copy-todo', 'border', 'opacity-50', 'bg-sky-100', 'rounded-lg')
    clone.classList.remove('moving-todo')
    return clone
  }

  const calculateElementMiddle = (element) => {
    return element.offsetTop + element.clientHeight / 2
  }

  const shouldHighlightIt = (activeTodo, movingTodo) => activeTodo && movingTodo.getAttribute('id') !== activeTodo.getAttribute('id')

  const renderPlaceholder = (event, activeTodo, movingTodo) => {
    const movingCopy = createPlaceholder(movingTodo)
    const activeMiddle = calculateElementMiddle(activeTodo)

    if (event.clientY < activeMiddle) {
      const prevEl = activeTodo.previousSibling
      if (prevEl.classList.contains('copy-todo')) {
        return
      }

      removePlaceholder(event)
      activeTodo.before(movingCopy)
    } else {
      removePlaceholder(event)
      activeTodo.after(movingCopy)
    }
  }

  const handleDragover = (e) => {
    e.preventDefault()

    const activeTodo = e.target.closest('.todo-item')
    const movingTodo = e.currentTarget.querySelector('.moving-todo')

    if (shouldHighlightIt(activeTodo, movingTodo)) {
      renderPlaceholder(e, activeTodo, movingTodo)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    pasteItem(e)
    updateUIPosition(e)
    updatePosition({ variables: { ids: collectIds(e.currentTarget), listId: list.id } })
  }

  const handleDragEnd = (e) => removePlaceholder(e)

  return (
    <div className='todos-list mt-4' onDragOver={handleDragover} onDrop={handleDrop} onDragEnd={handleDragEnd}>
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

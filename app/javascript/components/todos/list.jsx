'use strict'

import React from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'

const TodoList = ({ items, list, toggleItem, enableEditMode }) => {
  return (
    <div className='todos-list mt-4'>
      <div className='todos-list-name mb-2 font-semibold text-lg text-sky-900'>{list.name}</div>
      {
        items.sort((a, b) => b.id - a.id).map(item => {
          return <TodoItem key={item.id} item={item} listId={list.id} toggleItem={toggleItem} enableEditMode={enableEditMode} />
        })
      }
    </div>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  list: PropTypes.object.isRequired,
  toggleItem: PropTypes.func,
  enableEditMode: PropTypes.func
}

export default TodoList

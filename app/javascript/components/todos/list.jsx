'use strict'

import React from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'

const TodoList = ({ items, listId, deleteItem, toggleItem, enableEditMode }) => {
  return (
    <div className='todos-list mt-4'>
      <div className='todos-list-name mb-2 font-semibold text-lg text-sky-900'>My List</div>
      {
        items.sort((a, b) => b.id - a.id).map(item => {
          return <TodoItem key={item.id} item={item} listId={listId} deleteItem={deleteItem} toggleItem={toggleItem} enableEditMode={enableEditMode} />
        })
      }
    </div>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  listId: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
  toggleItem: PropTypes.func,
  enableEditMode: PropTypes.func
}

export default TodoList

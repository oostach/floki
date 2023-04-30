'use strict'

import React from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'

const TodoList = ({ items }) => {
  return (
    <div className='todos-list mt-4'>
      <div className='todos-list-name mb-2 font-semibold text-lg text-sky-900'>My List</div>
      {
        items.sort((a, b) => b.id - a.id).map(item => <TodoItem key={item.id} item={item} />)
      }
    </div>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
}

export default TodoList

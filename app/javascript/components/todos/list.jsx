'use strict'

import React from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'

const TodoList = ({ items }) => {
  return (
    <div className='todos-list'>
      {
        items.map(item => <TodoItem key={item.id} item={item} />)
      }
    </div>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element)
}

export default TodoList

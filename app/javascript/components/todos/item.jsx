'use strict'

import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({ item }) => {
  return (
    <div>
      { item.title }
    </div>
  )
}

TodoItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default TodoItem

'use strict'

import React, { useState } from 'react'
import TodoItem from './item'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import TodosFilter from './filter'
import { UPDATE_POSITION } from '../graphql/mutations'
import { handleDragover, handleDrop, handleDragEnd } from '../utils/draggable'

const TodoList = ({ items, list, enableEditMode }) => {
  const [hidden, setHidden] = useState(false)

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

  const filterCompleted = hiddenState => setHidden(hiddenState)

  return (
    <div className='todos-list mt-4 pb-2' onDragOver={handleDragover} onDrop={(e) => handleDrop(e, updatePosition, { listId: list.id })} onDragEnd={handleDragEnd}>
      <div className='flex content-center mb-2 flex-wrap'>
        <div className='todos-list-name font-semibold text-lg text-sky-900'>{list.name}</div>
        <TodosFilter filterCompleted={filterCompleted} />
      </div>
      {
        items.map(item => {
          return <TodoItem key={item.id} item={item} listId={list.id} enableEditMode={enableEditMode} hidden={item.completed && hidden} />
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
